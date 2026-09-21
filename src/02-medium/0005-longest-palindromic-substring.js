'use strict';
/**
 * 5. Longest Palindromic Substring - Medium
 * https://leetcode.com/problems/longest-palindromic-substring/
 *
 * Đề bài: Tìm chuỗi con đối xứng dài nhất.
 *
 * Ý tưởng: "Nở ra từ tâm". Mọi chuỗi đối xứng đều có một tâm: hoặc 1 ký tự
 * (độ dài lẻ, ví dụ "aba") hoặc khe giữa 2 ký tự (độ dài chẵn, ví dụ "abba").
 * Có 2n-1 tâm; với mỗi tâm ta nở hai phía chừng nào còn khớp. Cách này dễ nhớ
 * hơn DP và chỉ tốn O(1) bộ nhớ.
 *
 * Độ phức tạp: O(n^2) thời gian, O(1) bộ nhớ.
 * (Có thuật toán Manacher O(n) nhưng hiếm khi cần khi phỏng vấn.)
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
function longestPalindrome(s) {
  if (s.length < 2) return s;

  let start = 0;
  let maxLen = 1;

  function expand(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }
    // vòng lặp dừng khi đã vượt quá biên nên độ dài thật là right - left - 1
    const len = right - left - 1;
    if (len > maxLen) {
      maxLen = len;
      start = left + 1;
    }
  }

  for (let i = 0; i < s.length; i++) {
    expand(i, i);     // tâm lẻ
    expand(i, i + 1); // tâm chẵn
  }

  return s.slice(start, start + maxLen);
}
// <<< SOLUTION

test('5. Longest Palindromic Substring', longestPalindrome, [
  [['babad'], 'bab'],
  [['cbbd'], 'bb'],
  [['a'], 'a'],
  [['ac'], 'a'],
  [['forgeeksskeegfor'], 'geeksskeeg'],
  [['aaaa'], 'aaaa'],
]);

module.exports = { longestPalindrome };
