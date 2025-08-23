module.exports = {
  paginate: (posts=[], perPage = 5) => {
    // 按日期降序排序
    const sortedPosts = [...posts].sort((a, b) => //创建副本排序
      new Date(b.date) - new Date(a.date)
    );
    
    const totalPages = Math.ceil(sortedPosts.length / perPage);//向上取整计算总页数
    const paginated = [];//存放分页结果
    
    for (let i = 0; i < totalPages; i++) {
      const start = i * perPage;//计算当前页的起始索引
      paginated.push({
        currentPage: i + 1,
        totalPages,
        posts: sortedPosts.slice(start, start + perPage),
        prev: i > 0 ? i : null,//上一页页码
        next: i < totalPages - 1 ? i + 2 : null//下一页页码
      });
    }
    
    return paginated;
  }
};