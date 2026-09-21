'use strict';
/**
 * 10. Regular Expression Matching - Hard
 * https://leetcode.com/problems/regular-expression-matching/
 *
 * Đề bài: Khớp chuỗi s với mẫu p, trong đó '.' khớp một ký tự bất kỳ và '*' khớp
 * KHÔNG hoặc NHIỀU lần ký tự ĐỨNG NGAY TRƯỚC nó. Phải khớp TOÀN BỘ chuỗi.
 *
 * Ý tưởng: DP hai chiều. dp[i][j] = "i ký tự đầu của s có khớp j ký tự đầu của p".
 *   - p[j-1] là '*': cặp (ký tự + '*') có hai lựa chọn
 *       a) dùng 0 lần  -> dp[i][j] = dp[i][j-2]   (bỏ hẳn cặp này)
 *       b) dùng >= 1 lần -> nếu p[j-2] khớp s[i-1] thì dp[i][j] |= dp[i-1][j]
 *          (giữ nguyên mẫu, "ăn" thêm một ký tự của s)
 *   - Ngược lại: khớp trực tiếp nếu p[j-1] === '.' hoặc bằng s[i-1].
 *
 * Hàng biên dp[0][j] cũng quan trọng: mẫu kiểu "a*b*c*" vẫn khớp chuỗi rỗng,
 * nên phải khởi tạo dp[0][j] = dp[0][j-2] khi gặp '*'.
 *
 * Độ phức tạp: O(m * n) thời gian, O(m * n) bộ nhớ.
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
function isMatch(s, p) {
  const m = s.length;
  const n = p.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(false));

  dp[0][0] = true; // rỗng khớp rỗng

  // chuỗi rỗng khớp các mẫu dạng x*y*z*
  for (let j = 2; j <= n; j++) {
    if (p[j - 1] === '*') dp[0][j] = dp[0][j - 2];
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (p[j - 1] === '*') {
        dp[i][j] = dp[i][j - 2]; // dùng 0 lần
        if (p[j - 2] === '.' || p[j - 2] === s[i - 1]) {
          dp[i][j] = dp[i][j] || dp[i - 1][j]; // dùng thêm một lần nữa
        }
      } else if (p[j - 1] === '.' || p[j - 1] === s[i - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      }
    }
  }

  return dp[m][n];
}
// <<< SOLUTION

test('10. Regular Expression Matching', isMatch, [
  [['aa', 'a'], false],
  [['aa', 'a*'], true],
  [['ab', '.*'], true],
  [['aab', 'c*a*b'], true],
  [['mississippi', 'mis*is*p*.'], false],
  [['', '.*'], true],
  [['', 'a*b*'], true],
  [['abc', 'abc'], true],
  [['ab', '.*c'], false],
]);

module.exports = { isMatch };
