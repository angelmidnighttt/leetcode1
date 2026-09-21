'use strict';
/**
 * 136. Single Number - Easy - https://leetcode.com/problems/single-number/
 *
 * Đề bài: Mọi phần tử xuất hiện đúng 2 lần, trừ một phần tử duy nhất. Tìm nó.
 * Yêu cầu: O(n) thời gian và O(1) bộ nhớ.
 *
 * Ý tưởng: Phép XOR có 3 tính chất vàng:
 *   a ^ a = 0     (cặp trùng nhau triệt tiêu)
 *   a ^ 0 = a
 *   XOR có tính giao hoán và kết hợp (thứ tự không quan trọng)
 * Nên XOR toàn bộ mảng thì mọi cặp biến mất, chỉ còn phần tử lẻ loi.
 *
 * Độ phức tạp: O(n) thời gian, O(1) bộ nhớ.
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
function singleNumber(nums) {
  let result = 0;
  for (const n of nums) result ^= n;
  return result;
}
// <<< SOLUTION

test('136. Single Number', singleNumber, [
  [[[2, 2, 1]], 1],
  [[[4, 1, 2, 1, 2]], 4],
  [[[1]], 1],
  [[[-1, -1, 7]], 7],
]);

module.exports = { singleNumber };
