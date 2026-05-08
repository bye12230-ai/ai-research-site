# AI Research Knowledge Site

这是一个由 `notes/` 中 Markdown 文件自动生成的静态知识网站，适合部署到 Netlify。

## 本地构建

```bash
npm run build
```

构建结果会生成在 `dist/`。

## Netlify 部署

1. 把整个项目上传到 GitHub/GitLab。
2. 在 Netlify 中导入该仓库。
3. Netlify 会自动读取 `netlify.toml`：
   - Build command: `npm run build`
   - Publish directory: `dist`

## 添加新笔记

把新的 `.md` 文件放入 `notes/` 或其子目录，然后重新构建即可。左侧导航会自动更新。
