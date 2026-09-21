'use strict';
/**
 * 572. Subtree of Another Tree - Easy
 * https://leetcode.com/problems/subtree-of-another-tree/
 *
 * Đề bài: Cây subRoot có xuất hiện như một cây con của root không? Cây con phải
 * gồm một node của root và TOÀN BỘ hậu duệ của node đó.
 *
 * Ý tưởng: Ghép hai bài đã biết. Với mỗi node của root, hỏi "cây tại node này có
 * giống hệt subRoot không?" (chính là bài 100. Same Tree). Nếu chưa thì thử tiếp
 * ở cây con trái hoặc phải.
 *
 * Độ phức tạp: O(m * n) thời gian trong trường hợp xấu, O(h) bộ nhớ.
 */
const { test } = require('../../lib/test');
const { buildTree } = require('../../lib/ds');

// >>> SOLUTION
function isSameTree(a, b) {
  if (a === null && b === null) return true;
  if (a === null || b === null || a.val !== b.val) return false;
  return isSameTree(a.left, b.left) && isSameTree(a.right, b.right);
}

function isSubtree(root, subRoot) {
  if (subRoot === null) return true;
  if (root === null) return false;

  if (isSameTree(root, subRoot)) return true;
  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}
// <<< SOLUTION

const run = (a, b) => isSubtree(buildTree(a), buildTree(b));

test('572. Subtree of Another Tree', run, [
  [[[3, 4, 5, 1, 2], [4, 1, 2]], true],
  [[[3, 4, 5, 1, 2, null, null, null, null, 0], [4, 1, 2]], false],
  [[[1, 1], [1]], true],
  [[[], [1]], false],
]);

module.exports = { isSubtree };
