'use strict';
/**
 * 300. Longest Increasing Subsequence - Medium
 * https://leetcode.com/problems/longest-increasing-subsequence/
 *
 * Đề bài: Tìm độ dài dãy con TĂNG NGẶT dài nhất (dãy con = bỏ bớt phần tử,
 * giữ nguyên thứ tự, KHÔNG cần liên tiếp).
 *
 * Ý tưởng 1 - DP O(n^2): dp[i] = độ dài LIS kết thúc tại i. Với mỗi i, nhìn lại
 * mọi j < i có nums[j] < nums[i] rồi lấy max. Dễ hiểu, nên nắm trước.
 *
 * Ý tưởng 2 - Patience sorting O(n log n): giữ mảng `tails`, trong đó tails[k]
 * là ĐUÔI NHỎ NHẤT có thể của một dãy tăng độ dài k+1. Với mỗi số, tìm nhị phân
 * vị trí đầu tiên trong tails mà >= số đó rồi ghi đè. Đuôi càng nhỏ càng dễ nối
 * dài thêm. Độ dài tails chính là đáp án (lưu ý: tails KHÔNG phải là dãy LIS thật).
 *
 * Độ phức tạp: O(n log n) thời gian, O(n) bộ nhớ.
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
function lengthOfLIS(nums) {
  const tails = [];

  for (const num of nums) {
    // tìm vị trí đầu tiên trong tails có giá trị >= num
    let left = 0;
    let right = tails.length;

    while (left < right) {
      const mid = left + Math.floor((right - left) / 2);
      if (tails[mid] < num) left = mid + 1;
      else right = mid;
    }

    tails[left] = num; // ghi đè, hoặc nối thêm nếu left === tails.length
  }

  return tails.length;
}

// Cách DP O(n^2) - dễ hiểu hơn, nên viết được cách này trước
function lengthOfLISdp(nums) {
  if (nums.length === 0) return 0;
  const dp = new Array(nums.length).fill(1);
  let best = 1;

  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) dp[i] = Math.max(dp[i], dp[j] + 1);
    }
    best = Math.max(best, dp[i]);
  }

  return best;
}
// <<< SOLUTION

const cases = [
  [[[10, 9, 2, 5, 3, 7, 101, 18]], 4],
  [[[0, 1, 0, 3, 2, 3]], 4],
  [[[7, 7, 7, 7, 7, 7, 7]], 1],
  [[[1]], 1],
  [[[]], 0],
  [[[4, 10, 4, 3, 8, 9]], 3],
];

test('300. Longest Increasing Subsequence', lengthOfLIS, cases);
test('300. LIS (DP O(n^2))', lengthOfLISdp, cases);

module.exports = { lengthOfLIS, lengthOfLISdp };
