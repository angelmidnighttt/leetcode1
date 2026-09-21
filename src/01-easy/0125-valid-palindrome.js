'use strict';
/**
 * 125. Valid Palindrome - Easy - https://leetcode.com/problems/valid-palindrome/
 *
 * Đề bài: Bỏ qua ký tự không phải chữ/số và bỏ qua hoa thường, chuỗi có đối xứng không?
 *
 * Ý tưởng: Hai con trỏ từ hai đầu đi vào giữa. Mỗi bước nhảy qua các ký tự rác
 * rồi so sánh cặp ký tự hợp lệ. Cách này chỉ tốn O(1) bộ nhớ - hơn hẳn việc
 * tạo chuỗi mới bằng replace + reverse (dễ viết nhưng tốn O(n) bộ nhớ).
 *
 * Độ phức tạp: O(n) thời gian, O(1) bộ nhớ.
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
function isAlphanumeric(ch) {
  if (ch === undefined) return false;
  const c = ch.charCodeAt(0);
  return (c >= 48 && c <= 57) || (c >= 97 && c <= 122) || (c >= 65 && c <= 90);
}

function isPalindrome(s) {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    while (left < right && !isAlphanumeric(s[left])) left++;
    while (left < right && !isAlphanumeric(s[right])) right--;

    if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;
    left++;
    right--;
  }

  return true;
}
// <<< SOLUTION

test('125. Valid Palindrome', isPalindrome, [
  [['A man, a plan, a canal: Panama'], true],
  [['race a car'], false],
  [[' '], true],
  [[''], true],
  [['0P'], false],
  [['ab_a'], true],
]);

module.exports = { isPalindrome };
