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
const { test } = require('../../lib/test');
const { buildTree } = require('../../lib/ds');

// >>> SOLUTION
function isBalanced(root) {
  return height(root) !== -1;
}

// Trả về chiều cao, hoặc -1 nếu phát hiện mất cân bằng
function height(node) {
  if (node === null) return 0;

  const left = height(node.left);
  if (left === -1) return -1;

  const right = height(node.right);
  if (right === -1) return -1;

  if (Math.abs(left - right) > 1) return -1;
  return 1 + Math.max(left, right);
}
// <<< SOLUTION

test('110. Balanced Binary Tree', (a) => isBalanced(buildTree(a)), [
  [[[3, 9, 20, null, null, 15, 7]], true],
  [[[1, 2, 2, 3, 3, null, null, 4, 4]], false],
  [[[]], true],
  [[[1, 2, null, 3]], false],
]);

module.exports = { isBalanced };
