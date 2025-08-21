module.exports = {
  paginate: (posts=[], perPage = 5) => {
    
    // 按日期降序排序
    const sortedPosts = [...posts].sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );
    
    const totalPages = Math.ceil(sortedPosts.length / perPage);
    const paginated = [];
    
    for (let i = 0; i < totalPages; i++) {
      const start = i * perPage;
      paginated.push({
        currentPage: i + 1,
        totalPages,
        posts: sortedPosts.slice(start, start + perPage),
        prev: i > 0 ? i : null,
        next: i < totalPages - 1 ? i + 2 : null
      });
    }
    
    return paginated;
  }
};