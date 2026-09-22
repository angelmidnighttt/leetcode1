'use strict';
/**
 * 100. Same Tree - Easy - https://leetcode.com/problems/same-tree/
 *
 * Đề bài: Cho gốc của hai cây nhị phân, kiểm tra chúng có giống hệt nhau không
 * (cùng cấu trúc và cùng giá trị).
 *
 * Ý tưởng: Đệ quy - "cây giống nhau" định nghĩa bằng chính nó:
 *   - Cả hai đều rỗng -> giống.
 *   - Một rỗng một không, hoặc giá trị khác nhau -> khác.
 *   - Còn lại: cây trái phải giống VÀ cây phải phải giống.
 *
 * Độ phức tạp: O(n) thời gian, O(h) bộ nhớ (h = chiều cao, do ngăn xếp đệ quy).
 */
const { test } = require('../lib/test');
const { buildTree } = require('../lib/ds');

// >>> SOLUTION
// TODO: tu viet loi giai o day.
// Dap an goc: src/01-easy/0100-same-tree.js

function isSameTree(p, q) {
  // TODO
  if (!p && !q) return true; // cả hai rỗng
  if (!p || !q) return false;
  if (p.val !== q.val) return false;
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}

// <<< SOLUTION

const run = (a, b) => isSameTree(buildTree(a), buildTree(b));

test('100. Same Tree', run, [
  [[[1, 2, 3], [1, 2, 3]], true],
  [[[1, 2], [1, null, 2]], false],
  [[[1, 2, 1], [1, 1, 2]], false],
  [[[], []], true],
  [[[1], []], false],
]);

module.exports = { isSameTree };
