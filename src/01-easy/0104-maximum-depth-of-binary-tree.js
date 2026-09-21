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
const { test } = require('../../lib/test');
const { buildTree } = require('../../lib/ds');

// >>> SOLUTION
function maxDepth(root) {
  if (root === null) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

// Cách 2: BFS duyệt theo tầng, đếm số tầng. Không lo tràn ngăn xếp với cây rất sâu.
function maxDepthBFS(root) {
  if (root === null) return 0;

  let queue = [root];
  let depth = 0;

  while (queue.length > 0) {
    const next = [];
    for (const node of queue) {
      if (node.left) next.push(node.left);
      if (node.right) next.push(node.right);
    }
    queue = next;
    depth++;
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
