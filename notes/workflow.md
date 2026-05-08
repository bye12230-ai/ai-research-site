# AI 学术工作流完整指南（Zotero + Obsidian + Codex + Skills + Netlify）

# 前言

这份文档整理了一个完整的 AI 学术研究工作流。

目标不是学习复杂编程，而是：

* 用 AI 管理文献
* 用 AI 阅读与分析研究
* 用 AI 找研究缺口
* 用 AI 写文献综述
* 用 AI 生成个人知识网站
* 用 AI 发布研究成果

适合：

* 文科研究生
* 社科研究者
* 数字人文研究
* 建筑、艺术、博物馆研究
* AI 辅助学术写作
* 计算机小白

---

# 第一部分：整个工作流到底是什么

很多人第一次接触：

* Zotero
* Obsidian
* Codex
* Skills
* Netlify

会觉得它们是很多独立软件。

实际上它们是一条链。

整个流程是：

```text
PDF文献
↓
Zotero 管理
↓
Obsidian 整理知识
↓
Codex + Skills 分析
↓
AI生成综述/框架
↓
生成网站
↓
Netlify发布
```

这其实就是：

# AI 原生研究工作流

（AI-native Research Workflow）

---

# 第二部分：每个软件到底负责什么

# 1. Zotero 是什么

Zotero 是：

# 文献管理器

它负责：

* 存PDF
* 存文献条目
* 自动生成引用
* 管理标签
* 做文献分类
* 写批注
* 同步论文

你可以理解成：

```text
学术版收藏夹 + PDF图书馆
```

---

# Zotero 的核心作用

例如你研究：

```text
联合国虚拟博物馆
```

你会下载：

* 中文论文
* 英文论文
* PDF
* 博士论文
* 网页资料
* 图片

如果不用 Zotero：

电脑会变成：

```text
新建文件夹(1)
最终版
最终版2
真正最终版
```

彻底混乱。

而 Zotero 会帮你：

```text
主题
→ 作者
→ 年份
→ 标签
→ PDF
→ 注释
```

全部结构化。

---

# Zotero 在 AI 时代为什么重要

因为：

# AI 最怕乱文件。

AI 最喜欢：

```text
结构化知识
```

而 Zotero 正好负责：

# 结构化管理文献。

---

# 2. Obsidian 是什么

Obsidian 是：

# 知识组织工具

不是文献管理器。

很多人会误解。

---

# Obsidian 负责什么

它负责：

* 研究笔记
* 思考过程
* 理论关联
* 概念网络
* 灵感整理
* 论文框架

你可以理解成：

```text
AI时代的大脑
```

---

# Obsidian 和 Word 的区别

Word：

```text
线性写作
```

Obsidian：

```text
网络化知识
```

例如：

你有：

* 虚拟博物馆
* 数字展览
* 交互设计
* 沉浸式体验
* 数字遗产

在 Word 里：

这些是普通段落。

但在 Obsidian：

它们会互相链接。

形成：

# 知识网络

---

# Obsidian 为什么适合 AI

因为它使用：

# Markdown

Markdown 是：

```text
AI最容易读取的文本格式
```

所以：

* GPT
* Claude
* Codex

都特别喜欢 Obsidian。

---

# 3. Codex 是什么

你现在用的 Codex Desktop：

本质是：

# AI Agent 工作区

它不只是聊天。

它能：

* 读取文件
* 分析项目
* 执行工作流
* 调用 skills
* 修改代码
* 生成网站

---

# Codex 和 ChatGPT 的区别

ChatGPT：

```text
单轮聊天
```

Codex：

```text
项目级AI工作空间
```

Codex 会：

* 读取整个项目文件夹
* 理解项目结构
* 自动分析 markdown
* 自动执行任务

---

# 第三部分：Skills 到底是什么

很多人最容易误解的地方：

# skills 不是插件。

也不是软件扩展。

---

# skills 真正是什么

skills 本质上是：

# AI工作流程说明书

你可以理解成：

```text
给AI的一套专业操作方法
```

例如：

```text
Research Vault Literature Retrieval
```

它其实是在告诉 AI：

```text
如何检索知识库
如何寻找文献
如何读取markdown
如何组织结果
```

---

# skills 为什么强

因为：

普通 AI：

```text
什么都懂一点
```

skills：

```text
让 AI 在某领域专业化
```

---

# 你现在的两个 skills

# 1. Research Vault Literature Retrieval

作用：

* 检索本地知识库
* 阅读 markdown
* 搜索论文
* 提取研究主题
* 建立知识关联

适合：

```text
“帮我总结研究方向”
```

---

# 2. Zotero Analytical Workflow Skills

作用：

* 分析文献关系
* 找理论脉络
* 找研究缺口
* 比较研究方法
* 生成综述结构

适合：

```text
“帮我找选题创新点”
```

---

# 第四部分：skills 到底装在哪里

这里是你之前最困惑的地方。

---

# 重点

skills：

# 不装在软件里。

而是：

# 放在项目文件夹里。

---

# 正确结构

例如：

```text
AI-Research-Site/
│
├── notes/
├── pdfs/
│
└── .codex/
    └── skills/
        ├── Research Vault Literature Retrieval/
        └── Zotero Analytical Workflow Skills/
```

---

# 为什么这样设计

因为：

Codex 是：

# 项目级 AI

不是全局 AI。

不同项目：

可以有不同 skills。

例如：

* 学术项目
* 编程项目
* 网站项目

会有不同工作流。

---

# 第五部分：Codex 如何读取 skills

你之前有一个重要误解：

以为：

```text
上传skills
```

实际上：

# Codex 会自动扫描。

---

# 触发条件

当你：

```text
Open Local Folder
```

打开：

```text
AI-Research-Site
```

时。

Codex 会自动读取：

```text
.codex/skills
```

---

# 然后会发生什么

你问：

```text
请分析 Zotero 中关于虚拟博物馆的研究
```

Codex 会判断：

```text
这个问题适合：
Research Vault Literature Retrieval
```

于是自动调用。

---

# 自动调用 vs 显式调用

# 自动调用

你正常提问。

AI 自动判断。

---

# 显式调用

你明确说：

```text
请使用 Zotero Analytical Workflow Skills
```

这样更稳定。

---

# 第六部分：为什么你的 Codex 报错

你之前看到：

```text
403 Forbidden
用户没有有效的 codex 订阅
```

原因不是：

* skills错误
* 文件夹错误
* Zotero错误

而是：

# 第三方客户端权限问题。

你的客户端请求：

```text
claudechn.com/codex
```

不是官方 OpenAI Desktop。

所以：

可能没有 API 权限。

---

# 第七部分：Markdown 到底是什么

Markdown：

# AI时代最重要的文本格式之一。

你可以理解成：

```text
“轻量版 Word”
```

---

# Markdown 示例

```markdown
# 一级标题

## 二级标题

- 列表
- 列表

**加粗**
```

---

# 为什么 AI 喜欢 Markdown

因为：

* 干净
* 无格式污染
* 容易解析
* 易生成网页
* 易做知识库

---

# 第八部分：Windows 如何创建 .md 文件

这是你作为小白最困惑的地方之一。

---

# 方法1：记事本

步骤：

1. 右键
2. 新建
3. 文本文档
4. 改名：

```text
workflow.md
```

---

# 注意

Windows 默认隐藏扩展名。

所以你可能看到：

```text
workflow
```

实际上还是：

```text
workflow.txt
```

---

# 解决方法

资源管理器：

```text
查看
→ 显示
→ 文件扩展名
```

勾选。

---

# 第九部分：Codex 怎么读取我们的聊天

重点：

# Codex 默认读取不到 ChatGPT 聊天。

因为：

它们是两个软件。

---

# 正确做法

把聊天：

```text
复制
→ 保存成 markdown
```

例如：

```text
notes/workflow.md
```

---

# 为什么这样最好

因为：

你会逐渐形成：

# AI研究知识库

而不是临时聊天。

---

# 第十部分：为什么要做知识网站

你现在已经不只是：

# “聊天”

而是在：

# 建立个人知识系统。

---

# 传统研究的问题

以前：

* Word
* 文件夹
* PDF
* 收藏夹

全部碎片化。

几年后完全找不到。

---

# AI时代的新方式

现在：

```text
markdown
↓
知识库
↓
AI整理
↓
自动生成网站
```

---

# 第十一部分：Netlify 是什么

Netlify：

# 静态网站托管平台

作用：

```text
把本地网站变成公开网址
```

例如：

```text
https://yourresearch.netlify.app
```

---

# 为什么它适合小白

因为：

# 可以直接拖文件夹部署。

不需要服务器。

---

# 第十二部分：Codex 如何生成网站

你以后最重要的能力：

# 不是写代码。

而是：

# 描述工程目标。

---

# 例如

你对 Codex 说：

```text
请把 notes 文件夹中的 markdown 内容，
生成一个可部署到 Netlify 的知识网站。

要求：
- 左侧导航
- 自动目录
- markdown渲染
- 学术风格
- 响应式布局
```

---

# Codex 会做什么

自动生成：

```text
index.html
style.css
script.js
```

甚至：

```text
vite.config.js
package.json
```

---

# 第十三部分：本地运行网站

Codex 可能会告诉你：

```bash
npm install
npm run dev
```

---

# 这是什么意思

# npm install

安装网站需要的依赖。

---

# npm run dev

启动本地网站。

---

# 然后浏览器会出现

例如：

```text
http://localhost:5173
```

这就是你的网站。

---

# 第十四部分：最适合你的路线

你现在：

# 不应该先学复杂编程。

最推荐路线：

```text
Zotero
↓
Obsidian
↓
Markdown
↓
Codex
↓
Netlify
```

---

# 第十五部分：未来你会逐渐理解的概念

# 1. RAG

Retrieval-Augmented Generation。

意思：

```text
AI先检索知识库
再生成回答
```

---

# 2. MCP

Model Context Protocol。

意思：

```text
AI连接外部工具的标准
```

---

# 3. Digital Garden

数字花园。

不是博客。

而是：

# 持续生长的知识网络。

---

# 第十六部分：你现在已经在做什么

你现在其实已经开始进入：

# AI-native Knowledge System

（AI原生知识系统）

这和传统研究方式已经很不一样。

---

# 第十七部分：你现在真正该做什么

不是：

* 学复杂代码
* 学后端
* 学数据库

而是：

# 学会结构化知识。

因为：

AI时代：

# 知识结构

比

# 代码能力

更重要。

---

# 最终总结

整个 AI 学术工作流：

```text
文献
↓
Zotero 管理
↓
Obsidian 整理
↓
Markdown知识库
↓
Codex + Skills 分析
↓
AI生成论文结构
↓
生成知识网站
↓
Netlify部署
```

你真正要做的：

# 不是成为程序员。

而是：

# 成为能够使用 AI 构建知识系统的人。
