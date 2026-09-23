'use strict';
/**
 * 110. Balanced Binary Tree - Easy - https://leetcode.com/problems/balanced-binary-tree/
 *
 * Đề bài: Cây nhị phân có "cân bằng chiều cao" không? Tức là với MỌI node,
 * chênh lệch chiều cao hai cây con không quá 1.
 *
 * Ý tưởng: Cách ngây thơ tính chiều cao lại ở mỗi node -> O(n^2). Mẹo hay là
 * dùng một hàm đệ quy vừa trả về chiều cao vừa báo lỗi: trả -1 nghĩa là
 * "cây con này đã mất cân bằng", và giá trị -1 lan ngược lên trên ngay lập tức.
 *
 * Độ phức tạp: O(n) thời gian, O(h) bộ nhớ.
 */
const { test } = require('../lib/test');
const { buildTree } = require('../lib/ds');

// >>> SOLUTION
// TODO: tu viet loi giai o day.
// Dap an goc: src/01-easy/0110-balanced-binary-tree.js

function isBalanced(root) {
  // TODO
  return height(root) !== -1;
}

function height(node) {
  // TODO
  if (!node) return 0;
  const leftHeight = height(node.left);
  if (leftHeight === -1) return -1; // cây con trái mất cân bằng
  const rightHeight = height(node.right);
  if (rightHeight === -1) return -1; // cây con phải mất cân bằng

  if (Math.abs(leftHeight - rightHeight) > 1) return -1; // node này mất cân bằng
  return 1 + Math.max(leftHeight, rightHeight); // trả về chiều cao
}

// <<< SOLUTION

test('110. Balanced Binary Tree', (a) => isBalanced(buildTree(a)), [
  [[[3, 9, 20, null, null, 15, 7]], true],
  [[[1, 2, 2, 3, 3, null, null, 4, 4]], false],
  [[[]], true],
  [[[1, 2, null, 3]], false],
]);

module.exports = { isBalanced };
