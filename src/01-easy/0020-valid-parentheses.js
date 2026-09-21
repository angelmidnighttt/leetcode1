'use strict';
/**
 * 20. Valid Parentheses - Easy - https://leetcode.com/problems/valid-parentheses/
 *
 * Đề bài: Chuỗi chỉ gồm '(', ')', '{', '}', '[', ']'. Kiểm tra chuỗi hợp lệ:
 * mỗi dấu mở phải được đóng đúng loại và đúng thứ tự.
 *
 * Ý tưởng: Kinh điển của Stack. Gặp dấu mở thì push. Gặp dấu đóng thì pop ra và
 * kiểm tra có khớp cặp không. Cuối cùng stack phải rỗng.
 *
 * Độ phức tạp: O(n) thời gian, O(n) bộ nhớ.
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
function isValid(s) {
  const pairs = { ')': '(', ']': '[', '}': '{' };
  const stack = [];

  for (const ch of s) {
    if (ch in pairs) {
      // dấu đóng: phải khớp với dấu mở gần nhất
      if (stack.pop() !== pairs[ch]) return false;
    } else {
      stack.push(ch);
    }
  }

  return stack.length === 0;
}
// <<< SOLUTION

test('20. Valid Parentheses', isValid, [
  [['()'], true],
  [['()[]{}'], true],
  [['(]'], false],
  [['([)]'], false],
  [['{[]}'], true],
  [['('], false],
  [[']'], false],
  [[''], true],
]);

module.exports = { isValid };
