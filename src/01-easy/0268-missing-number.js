'use strict';
/**
 * 268. Missing Number - Easy - https://leetcode.com/problems/missing-number/
 *
 * Đề bài: Mảng có n số phân biệt lấy từ [0..n]. Tìm số duy nhất bị thiếu.
 *
 * Ý tưởng 1 (toán học): Tổng của 0..n là n*(n+1)/2. Lấy tổng đó trừ tổng mảng.
 * Ý tưởng 2 (XOR): XOR tất cả chỉ số 0..n với tất cả giá trị; các cặp trùng
 * triệt tiêu, còn lại đúng số bị thiếu. Cách XOR không bao giờ bị tràn số.
 *
 * Độ phức tạp: O(n) thời gian, O(1) bộ nhớ.
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
function missingNumber(nums) {
  const n = nums.length;
  const expected = (n * (n + 1)) / 2;
  const actual = nums.reduce((a, b) => a + b, 0);
  return expected - actual;
}

function missingNumberXor(nums) {
  let result = nums.length; // bắt đầu bằng n vì vòng lặp dưới chỉ chạy tới n-1
  for (let i = 0; i < nums.length; i++) {
    result ^= i ^ nums[i];
  }
  return result;
}
// <<< SOLUTION

const cases = [
  [[[3, 0, 1]], 2],
  [[[0, 1]], 2],
  [[[9, 6, 4, 2, 3, 5, 7, 0, 1]], 8],
  [[[0]], 1],
  [[[1]], 0],
];

test('268. Missing Number', missingNumber, cases);
test('268. Missing Number (XOR)', missingNumberXor, cases);

module.exports = { missingNumber, missingNumberXor };
