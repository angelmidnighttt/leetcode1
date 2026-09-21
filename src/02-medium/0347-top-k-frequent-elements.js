'use strict';
/**
 * 347. Top K Frequent Elements - Medium
 * https://leetcode.com/problems/top-k-frequent-elements/
 *
 * Đề bài: Trả về k phần tử xuất hiện nhiều nhất (thứ tự tuỳ ý).
 * Đề yêu cầu tốt hơn O(n log n).
 *
 * Ý tưởng: Đếm tần suất bằng Map, sau đó thay vì sắp xếp, dùng BUCKET SORT:
 * tần suất tối đa chỉ có thể là n, nên tạo n+1 "xô", xô thứ f chứa mọi giá trị
 * xuất hiện đúng f lần. Duyệt xô từ cao xuống thấp, lấy đủ k phần tử -> O(n).
 * (Cách heap kích thước k cho O(n log k), cũng được chấp nhận.)
 *
 * Độ phức tạp: O(n) thời gian, O(n) bộ nhớ.
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
function topKFrequent(nums, k) {
  const freq = new Map();
  for (const n of nums) freq.set(n, (freq.get(n) || 0) + 1);

  // buckets[f] = danh sách các giá trị xuất hiện đúng f lần
  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  for (const [value, count] of freq) buckets[count].push(value);

  const result = [];
  for (let f = buckets.length - 1; f >= 1 && result.length < k; f--) {
    for (const value of buckets[f]) {
      result.push(value);
      if (result.length === k) break;
    }
  }

  return result;
}
// <<< SOLUTION

test('347. Top K Frequent Elements', topKFrequent, [
  [[[1, 1, 1, 2, 2, 3], 2], [1, 2], 'sorted'],
  [[[1], 1], [1], 'sorted'],
  [[[4, 1, -1, 2, -1, 2, 3], 2], [-1, 2], 'sorted'],
  [[[1, 2, 3, 4], 4], [1, 2, 3, 4], 'sorted'],
  [[[3, 0, 1, 0], 1], [0], 'sorted'],
]);

module.exports = { topKFrequent };
