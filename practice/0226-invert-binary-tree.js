'use strict';
/**
 * 226. Invert Binary Tree - Easy - https://leetcode.com/problems/invert-binary-tree/
 *
 * Đề bài: Lật gương cây nhị phân (đổi chỗ cây con trái và phải ở mọi node).
 *
 * Ý tưởng: Đệ quy. Ở mỗi node, hoán đổi left/right rồi gọi tiếp xuống hai con.
 * Thứ tự "đổi trước hay đệ quy trước" đều đúng, miễn là đổi đúng một lần.
 *
 * Độ phức tạp: O(n) thời gian, O(h) bộ nhớ.
 */
const { test } = require('../lib/test');
const { buildTree, treeToArray } = require('../lib/ds');

// >>> SOLUTION
// TODO: tu viet loi giai o day.
// Dap an goc: src/01-easy/0226-invert-binary-tree.js

function invertTree(root) {
  // TODO
  if (!root) return null;
  const left = invertTree(root.left);
  const right = invertTree(root.right);
  root.left = right;
  root.right = left;
  return root;
}

// <<< SOLUTION

test('226. Invert Binary Tree', (a) => treeToArray(invertTree(buildTree(a))), [
  [[[4, 2, 7, 1, 3, 6, 9]], [4, 7, 2, 9, 6, 3, 1]],
  [[[2, 1, 3]], [2, 3, 1]],
  [[[]], []],
  [[[1, 2]], [1, null, 2]],
]);

module.exports = { invertTree };
