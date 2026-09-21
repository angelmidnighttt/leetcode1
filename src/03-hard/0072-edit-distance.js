'use strict';
/**
 * 72. Edit Distance - Hard - https://leetcode.com/problems/edit-distance/
 *
 * Đề bài: Số phép biến đổi ít nhất để đổi word1 thành word2. Ba phép được dùng:
 * chèn, xoá, thay thế một ký tự. (Còn gọi là khoảng cách Levenshtein.)
 *
 * Ý tưởng: DP hai chiều. dp[i][j] = số phép ít nhất để biến i ký tự đầu của word1
 * thành j ký tự đầu của word2.
 *   - Biên: dp[i][0] = i (xoá hết), dp[0][j] = j (chèn hết).
 *   - Nếu word1[i-1] === word2[j-1]: không tốn gì -> dp[i][j] = dp[i-1][j-1]
 *   - Ngược lại, lấy min của 3 lựa chọn rồi +1:
 *       dp[i-1][j]    -> XOÁ ký tự của word1
 *       dp[i][j-1]    -> CHÈN ký tự của word2
 *       dp[i-1][j-1]  -> THAY ký tự
 *
 * Chỉ cần 2 hàng nên rút bộ nhớ xuống O(n).
 *
 * Độ phức tạp: O(m * n) thời gian, O(n) bộ nhớ.
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
function minDistance(word1, word2) {
  const m = word1.length;
  const n = word2.length;

  let prev = Array.from({ length: n + 1 }, (_, j) => j); // dp[0][j] = j
  let curr = new Array(n + 1).fill(0);

  for (let i = 1; i <= m; i++) {
    curr[0] = i; // dp[i][0] = i

    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        curr[j] = prev[j - 1];
      } else {
        curr[j] = 1 + Math.min(
          prev[j],      // xoá
          curr[j - 1],  // chèn
          prev[j - 1]   // thay
        );
      }
    }

    [prev, curr] = [curr, prev];
  }

  return prev[n];
}
// <<< SOLUTION

test('72. Edit Distance', minDistance, [
  [['horse', 'ros'], 3],
  [['intention', 'execution'], 5],
  [['', ''], 0],
  [['', 'abc'], 3],
  [['abc', ''], 3],
  [['abc', 'abc'], 0],
  [['sea', 'eat'], 2],
]);

module.exports = { minDistance };
