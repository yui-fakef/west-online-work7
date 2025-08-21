---
title: "快速排序算法解析"
date: "2025-01-20"
---

快速排序是一种高效的排序算法，采用分治策略将一个数组分成两个子数组，然后递归地排序两个子数组。

## 算法原理

1. 从数列中挑出一个元素，称为"基准"（pivot）。
2. 重新排序数列，所有比基准值小的元素摆放在基准前面，所有比基准值大的元素摆在基准后面。
3. 递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序。

## 代码实现

```javascript
function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    // 分区操作，返回基准索引
    const pivotIndex = partition(arr, low, high);
    
    // 递归排序左子数组和右子数组
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
  
  return arr;
}

function partition(arr, low, high) {
  // 选择最后一个元素作为基准
  const pivot = arr[high];
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}

// 示例
const arr = [10, 7, 8, 9, 1, 5];
console.log(quickSort(arr)); // [1, 5, 7, 8, 9, 10]