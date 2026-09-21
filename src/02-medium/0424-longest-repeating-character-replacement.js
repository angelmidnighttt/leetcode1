'use strict';
/**
 * 424. Longest Repeating Character Replacement - Medium
 * https://leetcode.com/problems/longest-repeating-character-replacement/
 *
 * Đề bài: Chuỗi chữ in hoa. Được phép đổi tối đa k ký tự thành ký tự bất kỳ.
 * Tìm độ dài đoạn liên tiếp dài nhất mà mọi ký tự giống nhau sau khi đổi.
 *
 * Ý tưởng: Cửa sổ trượt. Một cửa sổ là HỢP LỆ khi:
 *   (độ dài cửa sổ) - (số lần xuất hiện của ký tự nhiều nhất trong cửa sổ) <= k
 * tức là số ký tự cần thay không vượt quá k. Mở rộng right, nếu vi phạm thì
 * co left lại.
 *
 * Mẹo hay: có thể KHÔNG cần giảm maxCount khi co cửa sổ. Cửa sổ chỉ lớn lên khi
 * tìm được maxCount lớn hơn, nên dùng giá trị maxCount "cũ" không làm sai đáp án
 * và tiết kiệm một vòng quét.
 *
 * Độ phức tạp: O(n) thời gian, O(26) bộ nhớ.
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
function characterReplacement(s, k) {
  const count = new Array(26).fill(0);
  let left = 0;
  let maxCount = 0;
  let best = 0;

  for (let right = 0; right < s.length; right++) {
    const index = s.charCodeAt(right) - 65; // 'A' = 65
    count[index]++;
    maxCount = Math.max(maxCount, count[index]);

    // cần thay quá k ký tự -> co cửa sổ
    while (right - left + 1 - maxCount > k) {
      count[s.charCodeAt(left) - 65]--;
      left++;
    }

    best = Math.max(best, right - left + 1);
  }

  return best;
}
// <<< SOLUTION

test('424. Longest Repeating Character Replacement', characterReplacement, [
  [['ABAB', 2], 4],
  [['AABABBA', 1], 4],
  [['AAAA', 0], 4],
  [['ABCDE', 1], 2],
  [['A', 0], 1],
  [[''], 0],
]);

module.exports = { characterReplacement };
