'use strict';
/**
 * 235. Lowest Common Ancestor of a BST - Easy
 * https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/
 *
 * Đề bài: Trong cây tìm kiếm nhị phân (BST), tìm tổ tiên chung THẤP NHẤT của hai node p, q.
 *
 * Ý tưởng: Tận dụng tính chất BST (trái < node < phải). Đứng ở node hiện tại:
 *   - Cả p và q đều nhỏ hơn  -> đi sang trái.
 *   - Cả p và q đều lớn hơn  -> đi sang phải.
 *   - Còn lại (tách hai nhánh, hoặc trùng chính node này) -> đây chính là LCA.
 *
 * Độ phức tạp: O(h) thời gian, O(1) bộ nhớ.
 */
const { test } = require('../../lib/test');
const { buildTree } = require('../../lib/ds');

// >>> SOLUTION
function lowestCommonAncestor(root, p, q) {
  let node = root;

  while (node !== null) {
    if (p.val < node.val && q.val < node.val) node = node.left;
    else if (p.val > node.val && q.val > node.val) node = node.right;
    else return node;
  }

  return null;
}
// <<< SOLUTION

// Tìm node theo giá trị để dựng test
function find(root, val) {
  if (!root) return null;
  if (root.val === val) return root;
  return val < root.val ? find(root.left, val) : find(root.right, val);
}

const run = (arr, pv, qv) => {
  const root = buildTree(arr);
  return lowestCommonAncestor(root, find(root, pv), find(root, qv)).val;
};

test('235. Lowest Common Ancestor of a BST', run, [
  [[[6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], 2, 8], 6],
  [[[6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], 2, 4], 2],
  [[[2, 1], 2, 1], 2],
  [[[6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], 3, 5], 4],
]);

module.exports = { lowestCommonAncestor };
