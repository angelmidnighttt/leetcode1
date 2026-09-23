'use strict';
/**
 * 242. Valid Anagram - Easy - https://leetcode.com/problems/valid-anagram/
 *
 * Đề bài: t có phải là phép đảo chữ (anagram) của s không - tức cùng tập ký tự
 * với cùng số lần xuất hiện?
 *
 * Ý tưởng: Đếm tần suất. Duyệt s thì +1, duyệt t thì -1. Nếu mọi bộ đếm về 0
 * thì hai chuỗi giống nhau về tần suất. Chỉ cần một Map duy nhất và một lượt duyệt.
 * (Cách sắp xếp hai chuỗi rồi so sánh cũng đúng nhưng chậm hơn: O(n log n).)
 *
 * Độ phức tạp: O(n) thời gian, O(k) bộ nhớ (k = số ký tự khác nhau).
 */
const { test } = require('../lib/test');

// >>> SOLUTION
// TODO: tu viet loi giai o day.
// Dap an goc: src/01-easy/0242-valid-anagram.js

function isAnagram(s, t) {
  // TODO
  const count = new Map();
  for (const c of s) {
    count.set(c, (count.get(c) || 0) + 1);
  }
  for (const c of t) {
    if (!count.has(c)) return false;
    count.set(c, count.get(c) - 1);
    if (count.get(c) < 0) return false;
  }
  return true;
}

// <<< SOLUTION

test('242. Valid Anagram', isAnagram, [
  [['anagram', 'nagaram'], true],
  [['rat', 'car'], false],
  [['a', 'ab'], false],
  [['', ''], true],
  [['aacc', 'ccac'], false],
]);

module.exports = { isAnagram };
