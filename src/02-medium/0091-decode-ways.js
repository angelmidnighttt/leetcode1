'use strict';
/**
 * 91. Decode Ways - Medium - https://leetcode.com/problems/decode-ways/
 *
 * Đề bài: 'A'->"1", ... 'Z'->"26". Cho chuỗi số, có bao nhiêu cách giải mã?
 * Ví dụ "226" -> "BZ"(2 26), "VF"(22 6), "BBF"(2 2 6) = 3 cách.
 *
 * Ý tưởng: DP kiểu Fibonacci có điều kiện. Gọi f(i) là số cách giải mã i ký tự đầu:
 *   - Nếu ký tự thứ i khác '0' thì nó tự đứng một mình  -> cộng f(i-1).
 *   - Nếu 2 ký tự cuối tạo thành số trong [10, 26]      -> cộng f(i-2).
 * Bẫy: số 0 chỉ hợp lệ khi đi kèm phía sau 1 hoặc 2 ("10", "20"); "0", "30", "06"
 * đều vô nghĩa.
 *
 * Độ phức tạp: O(n) thời gian, O(1) bộ nhớ.
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
function numDecodings(s) {
  if (!s || s[0] === '0') return 0;

  let prev2 = 1; // f(i-2)
  let prev1 = 1; // f(i-1)

  for (let i = 1; i < s.length; i++) {
    let current = 0;

    if (s[i] !== '0') current += prev1;

    const twoDigit = Number(s[i - 1] + s[i]);
    if (twoDigit >= 10 && twoDigit <= 26) current += prev2;

    if (current === 0) return 0; // kẹt, không có cách nào

    prev2 = prev1;
    prev1 = current;
  }

  return prev1;
}
// <<< SOLUTION

test('91. Decode Ways', numDecodings, [
  [['12'], 2],
  [['226'], 3],
  [['06'], 0],
  [['0'], 0],
  [['10'], 1],
  [['100'], 0],
  [['2101'], 1],
  [['11106'], 2],
  [['1'], 1],
]);

module.exports = { numDecodings };
