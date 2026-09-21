'use strict';
/**
 * 13. Roman to Integer - Easy - https://leetcode.com/problems/roman-to-integer/
 *
 * Đề bài: Đổi chuỗi số La Mã (I, V, X, L, C, D, M) sang số nguyên.
 *
 * Ý tưởng: Bình thường ký tự giảm dần từ trái sang phải và ta chỉ việc cộng.
 * Ngoại lệ duy nhất là dạng trừ (IV, IX, XL, XC, CD, CM): khi ký tự hiện tại
 * NHỎ HƠN ký tự ngay sau nó thì phải trừ thay vì cộng.
 *
 * Độ phức tạp: O(n) thời gian, O(1) bộ nhớ.
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
const ROMAN = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };

function romanToInt(s) {
  let total = 0;

  for (let i = 0; i < s.length; i++) {
    const cur = ROMAN[s[i]];
    const next = ROMAN[s[i + 1]] || 0;
    total += cur < next ? -cur : cur;
  }

  return total;
}
// <<< SOLUTION

test('13. Roman to Integer', romanToInt, [
  [['III'], 3],
  [['LVIII'], 58],
  [['MCMXCIV'], 1994],
  [['IV'], 4],
  [['IX'], 9],
  [['MMMCMXCIX'], 3999],
]);

module.exports = { romanToInt };
