# 静态博客生成器

一个基于 Node.js 的静态博客生成器，能够将 Markdown 文件转换为结构化的静态网站。

## 功能特点

- 将 Markdown 文章转换为 HTML 页面
- 自动生成文章列表首页
- 支持分页功能
- 响应式设计
- 基础 SEO 优化

## 安装与使用

### 前置要求
- Node.js (v16+)
- npm (v8+)

### 安装步骤
1. 克隆仓库：
```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
2. 安装依赖：
```bash
npm install
3. 添加博客文章：
将Markdown文件放入posts目录
文件顶部可添加YAML front-matter:
---
title: "文章标题"
date: "2025-01-01"
---
4、运行脚本：
```bash
node build.js
```
5、运行结果：
生成的网站位于 dist 目录
打开 dist/index.html 查看首页
文章详情页位于 dist/posts/{文章名}/index.html
## 项目结构
.
├── build.js             # 主构建脚本
├── posts/               # Markdown 文章目录
├── src/
│   ├── public/          # 公共资源（图片等）
│   ├── style/           # CSS 样式文件
│   └── template/        # EJS 模板
└── dist/                # 构建输出目录
# 技术栈
- Node.js-运行时环境
- EJS-模板引擎
- Marked-Markdown 解析器
- Gray-matter-front-matter 解析器

# 许可证
MIT License