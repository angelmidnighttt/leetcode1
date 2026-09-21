'use strict';
/**
 * 1143. Longest Common Subsequence - Medium
 * https://leetcode.com/problems/longest-common-subsequence/
 *
 * Đề bài: Tìm độ dài dãy con chung dài nhất của hai chuỗi (dãy con = bỏ bớt ký tự
 * nhưng giữ thứ tự).
 *
 * Ý tưởng: DP hai chiều - bài mẫu cho cả họ bài "so khớp hai chuỗi" (Edit Distance,
 * Distinct Subsequences...). Gọi dp[i][j] = LCS của i ký tự đầu text1 và j ký tự
 * đầu text2:
 *   - Nếu text1[i-1] === text2[j-1]: dp[i][j] = dp[i-1][j-1] + 1  (ghép được cặp này)
 *   - Ngược lại:                     dp[i][j] = max(dp[i-1][j], dp[i][j-1])
 * Vì mỗi hàng chỉ dùng hàng ngay trước, ta rút xuống 2 mảng 1 chiều -> O(n) bộ nhớ.
 *
 * Độ phức tạp: O(m * n) thời gian, O(n) bộ nhớ.
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
function longestCommonSubsequence(text1, text2) {
  const n = text2.length;
  let prev = new Array(n + 1).fill(0);
  let curr = new Array(n + 1).fill(0);

  for (let i = 1; i <= text1.length; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        curr[j] = prev[j - 1] + 1;
      } else {
        curr[j] = Math.max(prev[j], curr[j - 1]);
      }
    }
    [prev, curr] = [curr, prev]; // hàng vừa tính thành hàng trước
  }

  return prev[n];
}
// <<< SOLUTION

test('1143. Longest Common Subsequence', longestCommonSubsequence, [
  [['abcde', 'ace'], 3],
  [['abc', 'abc'], 3],
  [['abc', 'def'], 0],
  [['', 'abc'], 0],
  [['bsbininm', 'jmjkbkjkv'], 1],
  [['oxcpqrsvwf', 'shmtulqrypy'], 2],
]);

module.exports = { longestCommonSubsequence };
