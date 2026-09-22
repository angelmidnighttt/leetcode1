'use strict';
/**
 * 70. Climbing Stairs - Easy - https://leetcode.com/problems/climbing-stairs/
 *
 * Đề bài: Leo n bậc thang, mỗi bước leo 1 hoặc 2 bậc. Có bao nhiêu cách leo?
 *
 * Ý tưởng: Đây là bài quy hoạch động (DP) đầu tiên nên học. Để đứng ở bậc n,
 * bước cuối cùng hoặc từ bậc n-1 (bước 1 bậc) hoặc từ bậc n-2 (bước 2 bậc):
 *      f(n) = f(n-1) + f(n-2)   -> chính là dãy Fibonacci.
 * Chỉ cần nhớ 2 giá trị gần nhất nên không cần mảng.
 *
 * Độ phức tạp: O(n) thời gian, O(1) bộ nhớ.
 */
const { test } = require('../lib/test');

// >>> SOLUTION
// TODO: tu viet loi giai o day.
// Dap an goc: src/01-easy/0070-climbing-stairs.js

function climbStairs(n) {
  // TODO
  if (n <= 2) return n;
  let a = 1, b = 2;
  for (let i = 3; i <= n; i++) {
    const temp = a + b;
    a = b;
    b = temp;
  }
  return b;
}

// <<< SOLUTION

test('70. Climbing Stairs', climbStairs, [
  [[1], 1],
  [[2], 2],
  [[3], 3],
  [[5], 8],
  [[10], 89],
  [[45], 1836311903],
]);

module.exports = { climbStairs };
