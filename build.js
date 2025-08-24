const fs = require('fs').promises;
const path = require('path');
const ejs = require('ejs');
const { parseMarkdown } = require('./src/utils/markdown');
const { paginate } = require('./src/utils/pagination');


// 路径常量
const POSTS_DIR = path.join(__dirname, 'posts');
const TEMPLATE_DIR = path.join(__dirname, 'src', 'template');
const PUBLIC_DIR = path.join(__dirname, 'src', 'public');
const STYLE_DIR = path.join(__dirname, 'src', 'style');
const DIST_DIR = path.join(__dirname, 'dist');
const DIST_PUBLIC_DIR = path.join(DIST_DIR, 'public');
const DIST_STYLE_DIR = path.join(DIST_DIR, 'style');
const DIST_POSTS_DIR = path.join(DIST_DIR, 'posts');

async function build() {
  try {
    // 确保dist目录存在
    await fs.mkdir(DIST_DIR, { recursive: true });
    await fs.mkdir(DIST_PUBLIC_DIR, { recursive: true });
    await fs.mkdir(DIST_STYLE_DIR, { recursive: true });
    await fs.mkdir(DIST_POSTS_DIR, { recursive: true });
    
    // 复制公共资源（图片）
    await copyDir(PUBLIC_DIR, path.join(DIST_DIR,'public'));
    
    // 复制样式
    await copyDir(STYLE_DIR, path.join(DIST_DIR,'style'));
    
    // 读取所有Markdown文件
    const postFiles = await fs.readdir(POSTS_DIR);
    const posts = [];
    
    for (const file of postFiles) {
      if (path.extname(file) !== '.md') continue;
      
      const filePath = path.join(POSTS_DIR, file);
      const fileContent = await fs.readFile(filePath, 'utf-8');
      
      // 解析Markdown
      const { data, content, excerpt } = parseMarkdown(fileContent);
      
      // 生成文章唯一标识（slug）
      const slug = path.basename(file, '.md');
      const postUrl = `/posts/${slug}`;
      
      // 文章数据
      const post = {
        title: data.title || '未命名文章',
        date: data.date || new Date().toISOString().split('T')[0],
        content,
        excerpt,
        url: postUrl,
        slug
      };
      posts.push(post);
      
      // 生成文章详情页
      await renderPost(post);
    }
    
    // 按日期降序排列
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // 分页处理
    const pages = paginate(posts);
    
    // 生成首页（第一页）
    await renderHome(pages[0]);
    
    // 生成其他分页
    for (let i = 1; i < pages.length; i++) {
      await renderHome(pages[i], i + 1);
    }
    console.log('🎉 构建成功！');
  } catch (error) {
    console.error('❌ 构建失败:', error);
    process.exit(1);
  }
}
async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);//源路径
    const destPath = path.join(dest, entry.name);//目标路径
    
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}
async function renderHome(pageData,pageNumber = 1) {
  const templatePath = path.join(TEMPLATE_DIR, 'homepage.ejs');
  const template = await fs.readFile(templatePath, 'utf-8');
  
  
  const html = ejs.render(template, { 
    posts: pageData.posts,
    pagination:pageData,
  }, {
    views: [TEMPLATE_DIR]
  });
  
    // 第一页为 index.html，其他页为 page/2/index.html
  let outputPath;
  if (pageNumber === 1) {
    outputPath = path.join(DIST_DIR, 'index.html');
  } else {
    outputPath = path.join(DIST_DIR, 'page', pageNumber.toString(), 'index.html');
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
  }
  
 await fs.writeFile(outputPath, html);
}
async function renderPost(post) {
  const templatePath = path.join(TEMPLATE_DIR, 'detail.ejs');
  const template = await fs.readFile(templatePath, 'utf-8');
  
  const html = ejs.render(template, { post }, {
    views: [TEMPLATE_DIR]
  });
  const postDir = path.join(DIST_POSTS_DIR, post.slug);
  await fs.mkdir(postDir, { recursive: true });
  await fs.writeFile(path.join(postDir , `index.html`), html);
}
build();