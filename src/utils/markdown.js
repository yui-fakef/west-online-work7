const matter = require('gray-matter');
const marked = require('marked');

/**
 * 解析Markdown文件内容
 * @param {string} source 文件内容
 * @returns {Object} { data: 元数据, content: 渲染后的HTML, excerpt: 摘要 }
 */
function parseMarkdown(source) {
  const { data, content } = matter(source);//解析博客内容，分为元数据和内容
  const htmlContent = marked.parse(content);
  
  // 生成摘要：取第一段
  let excerpt = '';
  const match = content.match(/^(.+?)\n\n/);
  if (match) {
    excerpt = marked.parse(match[1]);
  } else {
    excerpt = marked.parse(content.slice(0, 100) + '...');
  }
  
  return {
    data,
    content: htmlContent,
    excerpt
  };
}

module.exports = {
  parseMarkdown
};