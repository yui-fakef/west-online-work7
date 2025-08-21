---
title: "二叉树遍历算法"
date: "2025-02-05"
---

二叉树是每个节点最多有两个子树的树结构，通常子树被称作"左子树"和"右子树"。

## 二叉树定义

```javascript
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}