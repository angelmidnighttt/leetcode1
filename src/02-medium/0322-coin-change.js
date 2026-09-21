'use strict';
/**
 * 322. Coin Change - Medium - https://leetcode.com/problems/coin-change/
 *
 * Đề bài: Cho các mệnh giá xu (dùng lại không giới hạn) và số tiền amount.
 * Cần ÍT NHẤT bao nhiêu đồng xu để đủ amount? Không thể thì trả -1.
 *
 * Ý tưởng: DP kiểu "unbounded knapsack". dp[x] = số xu ít nhất để tạo ra x.
 *   dp[0] = 0, các giá trị khác khởi tạo Infinity.
 *   dp[x] = min(dp[x - coin] + 1) với mọi coin <= x.
 * Duyệt x từ nhỏ đến lớn nên khi cần dp[x - coin] thì nó đã được tính xong.
 *
 * Lưu ý: THAM LAM (luôn chọn xu lớn nhất) là SAI. Ví dụ coins=[1,3,4], amount=6:
 * tham lam cho 4+1+1 = 3 xu, đáp án đúng là 3+3 = 2 xu.
 *
 * Độ phức tạp: O(amount * số loại xu) thời gian, O(amount) bộ nhớ.
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let x = 1; x <= amount; x++) {
    for (const coin of coins) {
      if (coin <= x && dp[x - coin] + 1 < dp[x]) {
        dp[x] = dp[x - coin] + 1;
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}
// <<< SOLUTION

test('322. Coin Change', coinChange, [
  [[[1, 2, 5], 11], 3],
  [[[2], 3], -1],
  [[[1], 0], 0],
  [[[1, 3, 4], 6], 2],
  [[[2, 5, 10, 1], 27], 4],
  [[[186, 419, 83, 408], 6249], 20],
]);

module.exports = { coinChange };
