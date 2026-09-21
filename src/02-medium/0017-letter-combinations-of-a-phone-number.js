'use strict';
/**
 * 17. Letter Combinations of a Phone Number - Medium
 * https://leetcode.com/problems/letter-combinations-of-a-phone-number/
 *
 * Đề bài: Cho chuỗi số điện thoại (2-9), liệt kê mọi tổ hợp chữ cái bấm ra được
 * (bàn phím điện thoại cũ).
 *
 * Ý tưởng: Quay lui (backtracking) - bài nhập môn tốt nhất cho kỹ thuật này.
 * Ở mỗi vị trí số, thử lần lượt từng chữ cái, đi sâu xuống, rồi "rút lui"
 * (bỏ chữ vừa chọn) để thử chữ tiếp theo. Cây đệ quy sâu bằng độ dài chuỗi số.
 *
 * Khuôn mẫu chung của backtracking:
 *   chọn -> đệ quy -> bỏ chọn
 *
 * Độ phức tạp: O(4^n * n) thời gian, O(n) ngăn xếp.
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
const KEYPAD = {
  2: 'abc', 3: 'def', 4: 'ghi', 5: 'jkl',
  6: 'mno', 7: 'pqrs', 8: 'tuv', 9: 'wxyz',
};

function letterCombinations(digits) {
  if (!digits || digits.length === 0) return [];

  const result = [];
  const path = [];

  function backtrack(index) {
    if (index === digits.length) {
      result.push(path.join(''));
      return;
    }

    for (const letter of KEYPAD[digits[index]]) {
      path.push(letter);
      backtrack(index + 1);
      path.pop();
    }
  }

  backtrack(0);
  return result;
}
// <<< SOLUTION

test('17. Letter Combinations of a Phone Number', letterCombinations, [
  [['23'], ['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf'], 'sorted'],
  [[''], []],
  [['2'], ['a', 'b', 'c'], 'sorted'],
  [['9'], ['w', 'x', 'y', 'z'], 'sorted'],
]);

module.exports = { letterCombinations };
