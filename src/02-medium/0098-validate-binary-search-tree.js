'use strict';
/**
 * 98. Validate Binary Search Tree - Medium
 * https://leetcode.com/problems/validate-binary-search-tree/
 *
 * Đề bài: Cây có phải BST hợp lệ không? BST: MỌI node trong cây con trái đều nhỏ
 * hơn node cha, MỌI node trong cây con phải đều lớn hơn.
 *
 * Ý tưởng: Lỗi kinh điển là chỉ so node với 2 con trực tiếp - sai, vì ràng buộc
 * phải áp cho TOÀN BỘ cây con. Cách đúng: truyền xuống một khoảng hợp lệ
 * (min, max); đi sang trái thì siết max, sang phải thì siết min.
 *
 * Cách 2: duyệt in-order (trái - gốc - phải) phải cho dãy TĂNG NGẶT.
 *
 * Độ phức tạp: O(n) thời gian, O(h) bộ nhớ.
 */
const { test } = require('../../lib/test');
const { buildTree } = require('../../lib/ds');

// >>> SOLUTION
function isValidBST(root, min = -Infinity, max = Infinity) {
  if (root === null) return true;
  if (root.val <= min || root.val >= max) return false;

  return (
    isValidBST(root.left, min, root.val) &&
    isValidBST(root.right, root.val, max)
  );
}

// Cách 2: in-order phải tăng ngặt
function isValidBSTInorder(root) {
  let prev = -Infinity;
  let ok = true;

  function inorder(node) {
    if (node === null || !ok) return;
    inorder(node.left);
    if (node.val <= prev) ok = false;
    prev = node.val;
    inorder(node.right);
  }

  inorder(root);
  return ok;
}
// <<< SOLUTION

const cases = [
  [[[2, 1, 3]], true],
  [[[5, 1, 4, null, null, 3, 6]], false],
  [[[]], true],
  [[[1]], true],
  [[[5, 4, 6, null, null, 3, 7]], false],
  [[[2, 2, 2]], false],
];

test('98. Validate BST', (a) => isValidBST(buildTree(a)), cases);
test('98. Validate BST (in-order)', (a) => isValidBSTInorder(buildTree(a)), cases);

module.exports = { isValidBST, isValidBSTInorder };
