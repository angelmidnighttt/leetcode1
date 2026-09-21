'use strict';
/**
 * 53. Maximum Subarray - Medium - https://leetcode.com/problems/maximum-subarray/
 *
 * Đề bài: Tìm tổng lớn nhất của một mảng con LIÊN TIẾP không rỗng.
 *
 * Ý tưởng: Thuật toán Kadane. Câu hỏi tại mỗi phần tử chỉ là:
 *   "nên nối vào mảng con đang có, hay vứt đi và bắt đầu lại từ chính nó?"
 * Nếu tổng đang tích luỹ mà ÂM thì nó chỉ làm hại phần sau -> vứt, bắt đầu lại.
 *   current = max(nums[i], current + nums[i])
 *   best    = max(best, current)
 *
 * Độ phức tạp: O(n) thời gian, O(1) bộ nhớ.
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
function maxSubArray(nums) {
  let current = nums[0];
  let best = nums[0];

  for (let i = 1; i < nums.length; i++) {
    current = Math.max(nums[i], current + nums[i]);
    best = Math.max(best, current);
  }

  return best;
}
// <<< SOLUTION

test('53. Maximum Subarray', maxSubArray, [
  [[[-2, 1, -3, 4, -1, 2, 1, -5, 4]], 6],
  [[[1]], 1],
  [[[5, 4, -1, 7, 8]], 23],
  [[[-1]], -1],
  [[[-2, -1]], -1],
]);

module.exports = { maxSubArray };
