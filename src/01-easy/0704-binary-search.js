'use strict';
/**
 * 704. Binary Search - Easy - https://leetcode.com/problems/binary-search/
 *
 * Đề bài: Mảng đã sắp tăng, tìm chỉ số của target. Không có thì trả -1.
 * Bắt buộc O(log n).
 *
 * Ý tưởng: Tìm kiếm nhị phân. Hai điều hay sai:
 *   1) Tính mid bằng left + (right - left) / 2 thay vì (left + right) / 2
 *      (tránh tràn số ở ngôn ngữ số nguyên 32-bit; JS thì an toàn nhưng nên
 *      giữ thói quen này khi đi phỏng vấn).
 *   2) Dùng while (left <= right) với right = n - 1, để không bỏ sót phần tử cuối.
 *
 * Độ phức tạp: O(log n) thời gian, O(1) bộ nhớ.
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] === target) return mid;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return -1;
}
// <<< SOLUTION

test('704. Binary Search', search, [
  [[[-1, 0, 3, 5, 9, 12], 9], 4],
  [[[-1, 0, 3, 5, 9, 12], 2], -1],
  [[[5], 5], 0],
  [[[5], -5], -1],
  [[[], 1], -1],
  [[[1, 2, 3, 4, 5], 1], 0],
  [[[1, 2, 3, 4, 5], 5], 4],
]);

module.exports = { search };
