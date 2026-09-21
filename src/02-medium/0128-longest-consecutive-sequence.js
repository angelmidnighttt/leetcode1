'use strict';
/**
 * 128. Longest Consecutive Sequence - Medium
 * https://leetcode.com/problems/longest-consecutive-sequence/
 *
 * Đề bài: Tìm độ dài dãy số nguyên LIÊN TIẾP dài nhất có trong mảng (thứ tự trong
 * mảng không quan trọng). Yêu cầu O(n) - tức là không được sắp xếp.
 *
 * Ý tưởng: Đưa hết vào Set. Với mỗi số, chỉ bắt đầu đếm khi nó là ĐẦU một dãy,
 * tức là n-1 không tồn tại trong Set. Nhờ điều kiện này mà mỗi phần tử chỉ được
 * duyệt trong vòng while đúng một lần trên toàn bộ thuật toán -> tổng thể O(n)
 * chứ không phải O(n^2) như nhìn thoáng qua.
 *
 * Độ phức tạp: O(n) thời gian, O(n) bộ nhớ.
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
function longestConsecutive(nums) {
  const set = new Set(nums);
  let best = 0;

  for (const n of set) {
    if (set.has(n - 1)) continue; // không phải đầu dãy -> bỏ qua

    let length = 1;
    while (set.has(n + length)) length++;

    best = Math.max(best, length);
  }

  return best;
}
// <<< SOLUTION

test('128. Longest Consecutive Sequence', longestConsecutive, [
  [[[100, 4, 200, 1, 3, 2]], 4],
  [[[0, 3, 7, 2, 5, 8, 4, 6, 0, 1]], 9],
  [[[]], 0],
  [[[1]], 1],
  [[[1, 2, 0, 1]], 3],
]);

module.exports = { longestConsecutive };
