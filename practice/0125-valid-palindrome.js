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
const { test } = require('../lib/test');

// >>> SOLUTION
// TODO: tu viet loi giai o day.
// Dap an goc: src/01-easy/0125-valid-palindrome.js

function isAlphanumeric(ch) {
  // TODO
  const code = ch.charCodeAt(0);
  return (
    (code >= 48 && code <= 57) || // 0-9
    (code >= 65 && code <= 90) || // A-Z
    (code >= 97 && code <= 122) // a-z
  );
}

function isPalindrome(s) {
  // TODO
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    // nhảy qua ký tự không hợp lệ từ trái
    while (left < right && !isAlphanumeric(s[left])) {
      left++;
    }
    // nhảy qua ký tự không hợp lệ từ phải
    while (left < right && !isAlphanumeric(s[right])) {
      right--;
    }

    // so sánh ký tự hợp lệ
    if (left < right && s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false; // không đối xứng
    }

    left++;
    right--;
  }

  return true; // đối xứng
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
