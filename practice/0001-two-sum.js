"use strict";
/**
 * 1. Two Sum - Easy - https://leetcode.com/problems/two-sum/
 *
 * Đề bài: Cho mảng số nguyên `nums` và số `target`. Trả về chỉ số của HAI phần tử
 * có tổng bằng target. Mỗi input có đúng một đáp án, không dùng lại cùng một phần tử.
 *
 * Ý tưởng: Cách ngây thơ là 2 vòng lặp lồng nhau -> O(n^2). Cách tốt hơn: duyệt một
 * lượt, dùng Map lưu "giá trị đã gặp -> chỉ số". Tại mỗi phần tử ta chỉ cần hỏi
 * "phần bù target - nums[i] đã từng xuất hiện chưa?" - tra Map mất O(1).
 *
 * Độ phức tạp: O(n) thời gian, O(n) bộ nhớ.
 */
const { test } = require("../lib/test");

// >>> SOLUTION
// TODO: tu viet loi giai o day.
// Dap an goc: src/01-easy/0001-two-sum.js

function twoSum(nums, target) {
  // TODO
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}

// <<< SOLUTION

test("1. Two Sum", twoSum, [
  [
    [[2, 7, 11, 15], 9],
    [0, 1],
  ],
  [
    [[3, 2, 4], 6],
    [1, 2],
  ],
  [
    [[3, 3], 6],
    [0, 1],
  ],
  [
    [[-1, -2, -3, -4, -5], -8],
    [2, 4],
  ],
]);

module.exports = { twoSum };
