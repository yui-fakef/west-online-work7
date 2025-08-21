---
title: "Node.js 实用技巧"
date: "2025-01-10"
---

分享一些 Node.js 开发中的实用技巧。

### 1. 异步错误处理

```javascript
async function fetchData() {
  try {
    const data = await someAsyncOperation();
    return data;
  } catch (error) {
    console.error('操作失败:', error);
    throw error;
  }
}