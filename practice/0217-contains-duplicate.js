'use strict';
/**
 * 217. Contains Duplicate - Easy - https://leetcode.com/problems/contains-duplicate/
 *
 * Đề bài: Mảng có phần tử nào xuất hiện từ 2 lần trở lên không?
 *
 * Ý tưởng: Set lưu những giá trị đã gặp. Gặp lại thì trả true ngay (thoát sớm).
 * Mẹo viết một dòng: new Set(nums).size !== nums.length - nhưng cách đó luôn
 * duyệt hết mảng, không thoát sớm được.
 *
 * Độ phức tạp: O(n) thời gian, O(n) bộ nhớ.
 */
const { test } = require('../lib/test');

// >>> SOLUTION
// TODO: tu viet loi giai o day.
// Dap an goc: src/01-easy/0217-contains-duplicate.js

function containsDuplicate(nums) {
  // TODO
  const seen = new Set();
  for (const num of nums) {
    if (seen.has(num)) return true; // gặp lại -> có duplicate
    seen.add(num);
  }
  return false; // không gặp lại -> không có duplicate
}

// <<< SOLUTION

test('217. Contains Duplicate', containsDuplicate, [
  [[[1, 2, 3, 1]], true],
  [[[1, 2, 3, 4]], false],
  [[[1, 1, 1, 3, 3, 4, 3, 2, 4, 2]], true],
  [[[]], false],
  [[[0]], false],
]);

module.exports = { containsDuplicate };
