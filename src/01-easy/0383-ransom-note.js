'use strict';
/**
 * 383. Ransom Note - Easy - https://leetcode.com/problems/ransom-note/
 *
 * Đề bài: Có thể ghép được chuỗi ransomNote từ các chữ cái trong magazine không?
 * Mỗi chữ trong magazine chỉ dùng được một lần.
 *
 * Ý tưởng: Đếm chữ trong magazine, rồi duyệt ransomNote và trừ dần. Thiếu chữ nào
 * thì trả false. Cùng một khuôn mẫu "đếm tần suất" như bài 242 Valid Anagram,
 * khác ở chỗ đây chỉ cần magazine ĐỦ chứ không cần bằng nhau.
 *
 * Độ phức tạp: O(m + n) thời gian, O(k) bộ nhớ.
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
function canConstruct(ransomNote, magazine) {
  if (ransomNote.length > magazine.length) return false;

  const pool = new Map();
  for (const ch of magazine) pool.set(ch, (pool.get(ch) || 0) + 1);

  for (const ch of ransomNote) {
    const left = pool.get(ch);
    if (!left) return false;
    pool.set(ch, left - 1);
  }

  return true;
}
// <<< SOLUTION

test('383. Ransom Note', canConstruct, [
  [['a', 'b'], false],
  [['aa', 'ab'], false],
  [['aa', 'aab'], true],
  [['', 'abc'], true],
  [['abc', 'cba'], true],
]);

module.exports = { canConstruct };
