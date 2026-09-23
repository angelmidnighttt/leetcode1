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
const { test } = require('../lib/test');

// >>> SOLUTION
// TODO: tu viet loi giai o day.
// Dap an goc: src/01-easy/0136-single-number.js

function singleNumber(nums) {
  let a = nums[0];
  for (let i = 1; i < nums.length; i++) {
    a ^= nums[i];
  }
  return a;
}

// <<< SOLUTION

test('136. Single Number', singleNumber, [
  [[[2, 2, 1]], 1],
  [[[4, 1, 2, 1, 2]], 4],
  [[[1]], 1],
  [[[-1, -1, 7]], 7],
]);

module.exports = { singleNumber };
