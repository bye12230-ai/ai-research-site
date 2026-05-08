import { promises as fs } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const notesDir = path.join(root, 'notes');
const siteDir = path.join(root, 'src', 'site');
const distDir = path.join(root, 'dist');

async function exists(filePath) {
  try { await fs.access(filePath); return true; } catch { return false; }
}

async function emptyDir(dir) {
  await fs.rm(dir, { recursive: true, force: true });
  await fs.mkdir(dir, { recursive: true });
}

async function copyDir(from, to) {
  await fs.mkdir(to, { recursive: true });
  const entries = await fs.readdir(from, { withFileTypes: true });
  for (const entry of entries) {
    const src = path.join(from, entry.name);
    const dest = path.join(to, entry.name);
    if (entry.isDirectory()) await copyDir(src, dest);
    else await fs.copyFile(src, dest);
  }
}

async function walkMarkdown(dir) {
  if (!(await exists(dir))) return [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walkMarkdown(fullPath));
    } else if (/\.md$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

function slugify(input) {
  return input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '') || 'note';
}

function titleFromMarkdown(markdown, fallback) {
  const match = markdown.match(/^#\s+(.+)$/m);
  return (match?.[1] || fallback).replace(/[#*_`\[\]]/g, '').trim();
}

function excerptFromMarkdown(markdown) {
  return markdown
    .replace(/^---[\s\S]*?---\s*/,'')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/^#+\s+/gm, '')
    .replace(/[>*_`\-\[\]()]/g, '')
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 2)
    .join(' ')
    .slice(0, 180);
}

const markdownFiles = await walkMarkdown(notesDir);
await emptyDir(distDir);
await copyDir(siteDir, distDir);
await copyDir(notesDir, path.join(distDir, 'notes'));

const usedSlugs = new Map();
const manifest = [];

for (const file of markdownFiles.sort((a, b) => a.localeCompare(b, 'zh-Hans-CN'))) {
  const rel = path.relative(notesDir, file).split(path.sep).join('/');
  const markdown = await fs.readFile(file, 'utf8');
  const baseName = path.basename(file, '.md');
  const title = titleFromMarkdown(markdown, baseName);
  const folder = path.dirname(rel) === '.' ? '' : path.dirname(rel).split('/').join(' / ');
  let slug = slugify(rel.replace(/\.md$/i, ''));
  const count = usedSlugs.get(slug) || 0;
  usedSlugs.set(slug, count + 1);
  if (count > 0) slug = `${slug}-${count + 1}`;

  manifest.push({
    title,
    folder,
    slug,
    path: `notes/${encodeURI(rel)}`,
    sourcePath: `notes/${rel}`,
    excerpt: excerptFromMarkdown(markdown)
  });
}

await fs.writeFile(
  path.join(distDir, 'notes-manifest.json'),
  JSON.stringify({ generatedAt: new Date().toISOString(), notes: manifest }, null, 2),
  'utf8'
);

console.log(`Built ${manifest.length} markdown note(s) into dist/`);
