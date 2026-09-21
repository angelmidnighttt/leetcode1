'use strict';
/**
 * 76. Minimum Window Substring - Hard
 * https://leetcode.com/problems/minimum-window-substring/
 *
 * Đề bài: Tìm chuỗi con NGẮN NHẤT của s chứa đủ mọi ký tự của t (kể cả số lần
 * lặp lại). Không có thì trả "".
 *
 * Ý tưởng: Cửa sổ trượt co giãn - bài "trùm cuối" của kỹ thuật này.
 *   - need: số lần mỗi ký tự CẦN có.
 *   - window: số lần mỗi ký tự ĐANG có trong cửa sổ.
 *   - formed: đếm xem đã có BAO NHIÊU LOẠI ký tự đạt đủ số lượng.
 * Mở rộng right cho tới khi formed === required (cửa sổ hợp lệ), rồi CO left
 * lại chừng nào còn hợp lệ để tìm cửa sổ ngắn nhất. Mỗi chỉ số chỉ đi qua một
 * lần theo mỗi hướng -> O(n).
 *
 * Biến `formed` là mẹo quan trọng: nó cho phép kiểm tra "cửa sổ đã đủ chưa"
 * trong O(1) thay vì so sánh toàn bộ hai map.
 *
 * Độ phức tạp: O(|s| + |t|) thời gian, O(|t|) bộ nhớ.
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
function minWindow(s, t) {
  if (t.length === 0 || s.length < t.length) return '';

  const need = new Map();
  for (const ch of t) need.set(ch, (need.get(ch) || 0) + 1);

  const window = new Map();
  const required = need.size;
  let formed = 0;

  let left = 0;
  let bestLen = Infinity;
  let bestStart = 0;

  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    if (need.has(ch)) {
      window.set(ch, (window.get(ch) || 0) + 1);
      if (window.get(ch) === need.get(ch)) formed++;
    }

    // cửa sổ hợp lệ -> co left để rút ngắn
    while (formed === required) {
      if (right - left + 1 < bestLen) {
        bestLen = right - left + 1;
        bestStart = left;
      }

      const leftCh = s[left];
      if (need.has(leftCh)) {
        window.set(leftCh, window.get(leftCh) - 1);
        if (window.get(leftCh) < need.get(leftCh)) formed--;
      }
      left++;
    }
  }

  return bestLen === Infinity ? '' : s.slice(bestStart, bestStart + bestLen);
}
// <<< SOLUTION

test('76. Minimum Window Substring', minWindow, [
  [['ADOBECODEBANC', 'ABC'], 'BANC'],
  [['a', 'a'], 'a'],
  [['a', 'aa'], ''],
  [['', 'a'], ''],
  [['ab', 'b'], 'b'],
  [['aaflslflsldkalskaaa', 'aaa'], 'aaa'],
]);

module.exports = { minWindow };
