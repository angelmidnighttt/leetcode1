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
const { test } = require('../../lib/test');

// >>> SOLUTION
function containsDuplicate(nums) {
  const seen = new Set();

  for (const n of nums) {
    if (seen.has(n)) return true;
    seen.add(n);
  }

  return false;
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
