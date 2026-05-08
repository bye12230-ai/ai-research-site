const state = { notes: [], current: null };
const noteNav = document.querySelector('#noteNav');
const searchInput = document.querySelector('#searchInput');
const content = document.querySelector('#markdownContent');
const toc = document.querySelector('#toc');
const articleMeta = document.querySelector('#articleMeta');
const breadcrumb = document.querySelector('#breadcrumb');
const sidebar = document.querySelector('#sidebar');
const menuButton = document.querySelector('#menuButton');

const escapeHtml = (value) => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;');

const slugify = (value) => value
  .toLowerCase()
  .normalize('NFKD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^\p{L}\p{N}]+/gu, '-')
  .replace(/^-+|-+$/g, '') || 'section';

function inlineMarkdown(text) {
  let html = escapeHtml(text);
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2" />');
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  html = html.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, '<span class="wiki-link">$2$1</span>');
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  return html;
}

function parseTable(lines, start) {
  const header = lines[start];
  const divider = lines[start + 1];
  if (!/^\s*\|?.+\|.+\|?\s*$/.test(header) || !/^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(divider)) return null;
  const rows = [];
  let i = start;
  while (i < lines.length && /\|/.test(lines[i]) && lines[i].trim()) {
    rows.push(lines[i].trim().replace(/^\||\|$/g, '').split('|').map((cell) => inlineMarkdown(cell.trim())));
    i++;
  }
  const head = rows.shift();
  rows.shift();
  const html = `<table><thead><tr>${head.map((c) => `<th>${c}</th>`).join('')}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
  return { html, next: i };
}

function renderMarkdown(markdown) {
  markdown = markdown.replace(/^---[\s\S]*?---\s*/, '').replace(/\r\n/g, '\n');
  const lines = markdown.split('\n');
  const html = [];
  const headings = [];
  let paragraph = [];
  let inCode = false;
  let codeBuffer = [];
  let listType = null;
  const usedIds = new Map();

  function flushParagraph() {
    if (paragraph.length) {
      html.push(`<p>${inlineMarkdown(paragraph.join(' '))}</p>`);
      paragraph = [];
    }
  }
  function closeList() {
    if (listType) {
      html.push(`</${listType}>`);
      listType = null;
    }
  }
  function uniqueId(title) {
    const base = slugify(title);
    const count = usedIds.get(base) || 0;
    usedIds.set(base, count + 1);
    return count ? `${base}-${count + 1}` : base;
  }

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trimEnd();

    if (line.startsWith('```')) {
      flushParagraph(); closeList();
      if (inCode) {
        html.push(`<pre><code>${escapeHtml(codeBuffer.join('\n'))}</code></pre>`);
        codeBuffer = [];
        inCode = false;
      } else {
        inCode = true;
      }
      continue;
    }
    if (inCode) { codeBuffer.push(rawLine); continue; }

    if (!line.trim()) { flushParagraph(); closeList(); continue; }
    if (/^---+$/.test(line.trim())) { flushParagraph(); closeList(); html.push('<hr />'); continue; }

    const table = parseTable(lines, i);
    if (table) { flushParagraph(); closeList(); html.push(table.html); i = table.next - 1; continue; }

    const heading = /^(#{1,6})\s+(.+)$/.exec(line);
    if (heading) {
      flushParagraph(); closeList();
      const level = heading[1].length;
      const text = heading[2].trim();
      const id = uniqueId(text);
      headings.push({ level, text, id });
      html.push(`<h${level} id="${id}">${inlineMarkdown(text)}</h${level}>`);
      continue;
    }

    const unordered = /^[-*+]\s+(.+)$/.exec(line.trim());
    const ordered = /^\d+\.\s+(.+)$/.exec(line.trim());
    if (unordered || ordered) {
      flushParagraph();
      const nextType = unordered ? 'ul' : 'ol';
      if (listType !== nextType) { closeList(); html.push(`<${nextType}>`); listType = nextType; }
      html.push(`<li>${inlineMarkdown((unordered || ordered)[1])}</li>`);
      continue;
    }

    const quote = /^>\s?(.*)$/.exec(line);
    if (quote) { flushParagraph(); closeList(); html.push(`<blockquote>${inlineMarkdown(quote[1])}</blockquote>`); continue; }

    paragraph.push(line.trim());
  }
  flushParagraph(); closeList();
  return { html: html.join('\n'), headings };
}

function renderNav(notes = state.notes) {
  const groups = new Map();
  for (const note of notes) {
    const group = note.folder || '根目录';
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group).push(note);
  }
  noteNav.innerHTML = [...groups.entries()].map(([group, items]) => `
    <div class="nav-group">
      <div class="nav-group-title">${escapeHtml(group)}</div>
      ${items.map((note) => `
        <a class="nav-link ${state.current?.slug === note.slug ? 'active' : ''}" href="#${note.slug}" data-slug="${note.slug}">
          <span class="nav-link-title">${escapeHtml(note.title)}</span>
          <span class="nav-link-path">${escapeHtml(note.sourcePath)}</span>
        </a>
      `).join('')}
    </div>
  `).join('');
}

function renderToc(headings) {
  const visible = headings.filter((h) => h.level <= 3);
  toc.innerHTML = visible.length
    ? visible.map((h) => `<a class="toc-level-${h.level}" href="#${h.id}">${escapeHtml(h.text)}</a>`).join('')
    : '<span class="empty-toc">暂无目录</span>';
}

async function loadNote(slug) {
  const note = state.notes.find((item) => item.slug === slug) || state.notes[0];
  if (!note) {
    content.innerHTML = '<h1>没有找到笔记</h1><p>请先在 notes/ 中添加 Markdown 文件。</p>';
    return;
  }
  state.current = note;
  const response = await fetch(note.path);
  const markdown = await response.text();
  const rendered = renderMarkdown(markdown);
  content.innerHTML = rendered.html;
  renderToc(rendered.headings);
  articleMeta.textContent = `${note.sourcePath} · ${note.excerpt || 'Markdown 知识条目'}`;
  breadcrumb.textContent = note.folder ? `${note.folder} / ${note.title}` : note.title;
  document.title = `${note.title} · Research Notes`;
  renderNav(filterNotes(searchInput.value));
}

function filterNotes(query) {
  const q = query.trim().toLowerCase();
  if (!q) return state.notes;
  return state.notes.filter((note) => [note.title, note.folder, note.sourcePath, note.excerpt].join(' ').toLowerCase().includes(q));
}

async function init() {
  try {
    const manifest = await fetch('notes-manifest.json').then((res) => res.json());
    state.notes = manifest.notes || [];
    renderNav();
    const initialSlug = location.hash.slice(1) || state.notes[0]?.slug;
    await loadNote(initialSlug);
  } catch (error) {
    content.innerHTML = `<h1>知识库加载失败</h1><p>请确认已运行构建命令，并生成 <code>dist/notes-manifest.json</code>。</p><pre><code>${escapeHtml(String(error))}</code></pre>`;
  }
}

window.addEventListener('hashchange', () => loadNote(location.hash.slice(1)));
noteNav.addEventListener('click', (event) => { if (event.target.closest('a')) sidebar.classList.remove('open'); });
searchInput.addEventListener('input', () => renderNav(filterNotes(searchInput.value)));
menuButton.addEventListener('click', () => sidebar.classList.toggle('open'));

init();
