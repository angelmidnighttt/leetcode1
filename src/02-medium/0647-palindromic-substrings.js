'use strict';
/**
 * 647. Palindromic Substrings - Medium
 * https://leetcode.com/problems/palindromic-substrings/
 *
 * Đề bài: Đếm số chuỗi con đối xứng (tính cả các chuỗi giống nhau nhưng ở vị trí
 * khác nhau).
 *
 * Ý tưởng: Y hệt bài 5 (Longest Palindromic Substring) - nở ra từ tâm. Khác ở
 * chỗ thay vì nhớ chuỗi dài nhất, ta ĐẾM: mỗi lần nở ra thành công là thêm một
 * chuỗi con đối xứng mới.
 *
 * Độ phức tạp: O(n^2) thời gian, O(1) bộ nhớ.
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
function countSubstrings(s) {
  let count = 0;

  function expand(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      count++;
      left--;
      right++;
    }
  }

  for (let i = 0; i < s.length; i++) {
    expand(i, i);     // tâm lẻ
    expand(i, i + 1); // tâm chẵn
  }

  return count;
}
// <<< SOLUTION

test('647. Palindromic Substrings', countSubstrings, [
  [['abc'], 3],
  [['aaa'], 6],
  [['a'], 1],
  [[''], 0],
  [['aba'], 4],
  [['abba'], 6],
]);

module.exports = { countSubstrings };
