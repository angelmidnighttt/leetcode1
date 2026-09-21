'use strict';
/**
 * 9. Palindrome Number - Easy - https://leetcode.com/problems/palindrome-number/
 *
 * Đề bài: Cho số nguyên x, kiểm tra x có phải số đối xứng (đọc xuôi ngược giống nhau).
 * Yêu cầu nâng cao: không đổi số sang chuỗi.
 *
 * Ý tưởng: Số âm luôn sai (dấu trừ). Số kết thúc bằng 0 (trừ chính số 0) cũng sai.
 * Ta đảo ngược NỬA SAU của số rồi so với nửa đầu còn lại - tránh tràn số và
 * chỉ cần lặp một nửa số chữ số.
 *
 * Độ phức tạp: O(log10(x)) thời gian, O(1) bộ nhớ.
 */
const { test } = require('../lib/test');

// >>> SOLUTION
// TODO: tu viet loi giai o day.
// Dap an goc: src/01-easy/0009-palindrome-number.js

function isPalindrome(x) {
  // TODO
  while (x < 0 || (x % 10 === 0 && x !== 0)) {
    return false;
  }
  let revertedNumber = 0;
  while (x > revertedNumber) {
    revertedNumber = revertedNumber * 10 + (x % 10);
    x = Math.floor(x / 10);
  }
  return x === revertedNumber || x === Math.floor(revertedNumber / 10);
}

// <<< SOLUTION

test('9. Palindrome Number', isPalindrome, [
  [[121], true],
  [[-121], false],
  [[10], false],
  [[0], true],
  [[1221], true],
  [[12321], true],
  [[123], false],
]);

module.exports = { isPalindrome };
