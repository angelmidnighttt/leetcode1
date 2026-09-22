'use strict';
/**
 * 104. Maximum Depth of Binary Tree - Easy
 * https://leetcode.com/problems/maximum-depth-of-binary-tree/
 *
 * Đề bài: Trả về độ sâu lớn nhất của cây nhị phân (số node trên đường dài nhất
 * từ gốc xuống lá).
 *
 * Ý tưởng: Đệ quy DFS. Độ sâu của một node = 1 + max(độ sâu trái, độ sâu phải).
 * Node rỗng có độ sâu 0. Bên dưới có kèm cách lặp bằng BFS theo tầng.
 *
 * Độ phức tạp: O(n) thời gian, O(h) bộ nhớ.
 */
const { test } = require('../lib/test');
const { buildTree } = require('../lib/ds');

// >>> SOLUTION
// TODO: tu viet loi giai o day.
// Dap an goc: src/01-easy/0104-maximum-depth-of-binary-tree.js

function maxDepth(root) {
  // TODO
  if (!root) return 0;
  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);
  return 1 + Math.max(leftDepth, rightDepth);
}

function maxDepthBFS(root) {
  // TODO
  if (!root) return 0;
  let depth = 0;
  const queue = [root];
  while (queue.length > 0) {
    depth++;
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  return depth;
}

// <<< SOLUTION

test('104. Maximum Depth of Binary Tree', (a) => maxDepth(buildTree(a)), [
  [[[3, 9, 20, null, null, 15, 7]], 3],
  [[[1, null, 2]], 2],
  [[[]], 0],
  [[[1, 2, 3, 4, null, null, 5, 6]], 4],
]);

test('104. Maximum Depth (BFS)', (a) => maxDepthBFS(buildTree(a)), [
  [[[3, 9, 20, null, null, 15, 7]], 3],
  [[[]], 0],
]);

module.exports = { maxDepth, maxDepthBFS };
