'use strict';
/**
 * 3. Longest Substring Without Repeating Characters - Medium
 * https://leetcode.com/problems/longest-substring-without-repeating-characters/
 *
 * Đề bài: Tìm độ dài chuỗi con LIÊN TIẾP dài nhất không có ký tự lặp lại.
 *
 * Ý tưởng: Cửa sổ trượt (sliding window). Giữ cửa sổ [left..right] luôn hợp lệ.
 * Mở rộng right từng bước; khi ký tự mới đã xuất hiện TRONG cửa sổ, nhảy left
 * tới ngay sau lần xuất hiện trước đó. Map lưu "ký tự -> chỉ số cuối cùng" cho
 * phép nhảy một phát thay vì lùi từng bước.
 *
 * Bẫy hay gặp: phải kiểm tra lastIndex >= left, vì ký tự có thể đã nằm ngoài cửa sổ
 * (thử chuỗi "abba" để thấy).
 *
 * Độ phức tạp: O(n) thời gian, O(k) bộ nhớ.
 */
const { test } = require('../lib/test');

// >>> SOLUTION
// TODO: tu viet loi giai o day.
// Dap an goc: src/02-medium/0003-longest-substring-without-repeating-characters.js

function lengthOfLongestSubstring(s) {
  // TODO
  const lastIndex = new Map();
  let left = 0;
  let maxLength = 0;
  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    if (lastIndex.has(c) && lastIndex.get(c) >= left) {
      left = lastIndex.get(c) + 1;
    }
    lastIndex.set(c, right);
    maxLength = Math.max(maxLength, right - left + 1);
  }
  return maxLength;
}

// <<< SOLUTION

test('3. Longest Substring Without Repeating Characters', lengthOfLongestSubstring, [
  [['abcabcbb'], 3],
  [['bbbbb'], 1],
  [['pwwkew'], 3],
  [[''], 0],
  [[' '], 1],
  [['dvdf'], 3],
  [['abba'], 2],
]);

module.exports = { lengthOfLongestSubstring };
