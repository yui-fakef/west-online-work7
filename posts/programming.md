---
title: "动态规划入门指南"
date: "2025-02-10"
---

动态规划是一种通过把原问题分解为相对简单的子问题的方式求解复杂问题的方法。

## 基本思想

1. **最优子结构** - 问题的最优解包含其子问题的最优解
2. **重叠子问题** - 不同的子问题具有公共的子子问题

## 实现方法

### 1. 自顶向下 - 记忆化搜索

```javascript
function fibonacci(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 2) return 1;
  
  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  return memo[n];
}

console.log(fibonacci(10)); // 55