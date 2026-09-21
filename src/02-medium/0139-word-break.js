'use strict';
/**
 * 139. Word Break - Medium - https://leetcode.com/problems/word-break/
 *
 * Đề bài: Có thể cắt chuỗi s thành dãy các từ nằm trong từ điển không?
 * (Mỗi từ được dùng lại nhiều lần.)
 *
 * Ý tưởng: DP 1 chiều. dp[i] = "i ký tự đầu của s có cắt được không".
 * dp[0] = true (chuỗi rỗng luôn cắt được). Với mỗi i, thử mọi điểm cắt j < i:
 * nếu dp[j] đúng VÀ đoạn s[j..i) là một từ trong từ điển thì dp[i] = true.
 *
 * Đây là khuôn mẫu "DP trên tiền tố chuỗi" - gặp lại ở rất nhiều bài.
 *
 * Độ phức tạp: O(n^2 * k) thời gian (k = chi phí cắt chuỗi), O(n) bộ nhớ.
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
function wordBreak(s, wordDict) {
  const words = new Set(wordDict);
  const dp = new Array(s.length + 1).fill(false);
  dp[0] = true;

  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && words.has(s.slice(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }

  return dp[s.length];
}
// <<< SOLUTION

test('139. Word Break', wordBreak, [
  [['leetcode', ['leet', 'code']], true],
  [['applepenapple', ['apple', 'pen']], true],
  [['catsandog', ['cats', 'dog', 'sand', 'and', 'cat']], false],
  [['', ['a']], true],
  [['aaaaaaa', ['aaaa', 'aaa']], true],
  [['cars', ['car', 'ca', 'rs']], true],
]);

module.exports = { wordBreak };
