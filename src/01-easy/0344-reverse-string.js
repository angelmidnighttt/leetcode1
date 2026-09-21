'use strict';
/**
 * 344. Reverse String - Easy - https://leetcode.com/problems/reverse-string/
 *
 * Đề bài: Đảo ngược mảng ký tự TẠI CHỖ, chỉ dùng O(1) bộ nhớ phụ.
 *
 * Ý tưởng: Hai con trỏ ở hai đầu, hoán đổi rồi tiến vào giữa. Bài này nhỏ nhưng
 * là nền cho rất nhiều bài two-pointer khác.
 *
 * Độ phức tạp: O(n) thời gian, O(1) bộ nhớ.
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
function reverseString(s) {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    [s[left], s[right]] = [s[right], s[left]];
    left++;
    right--;
  }
}
// <<< SOLUTION

const run = (s) => {
  reverseString(s);
  return s;
};

test('344. Reverse String', run, [
  [[['h', 'e', 'l', 'l', 'o']], ['o', 'l', 'l', 'e', 'h']],
  [[['H', 'a', 'n', 'n', 'a', 'h']], ['h', 'a', 'n', 'n', 'a', 'H']],
  [[['a']], ['a']],
  [[[]], []],
]);

module.exports = { reverseString };
