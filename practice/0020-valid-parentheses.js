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
const { test } = require('../lib/test');

// >>> SOLUTION
// TODO: tu viet loi giai o day.
// Dap an goc: src/01-easy/0020-valid-parentheses.js

function isValid(s) {
  // TODO
  const stack = [];
  const map = {
    '(': ')',
    '{': '}',
    '[': ']',
  };

  for (const char of s) {
    if (map[char]) {
      stack.push(char);
    } else {
      const last = stack.pop();
      if (map[last] !== char) {
        return false;
      }
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
