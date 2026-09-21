'use strict';
/**
 * 198. House Robber - Medium - https://leetcode.com/problems/house-robber/
 *
 * Đề bài: Không được trộm HAI NHÀ LIỀN KỀ (sẽ báo động). Tối đa trộm được bao nhiêu?
 *
 * Ý tưởng: DP kinh điển "chọn hoặc không chọn". Tại nhà i có 2 lựa chọn:
 *   - Trộm nhà i     -> nums[i] + kết quả tốt nhất tới nhà i-2
 *   - Bỏ qua nhà i   -> kết quả tốt nhất tới nhà i-1
 *   dp[i] = max(dp[i-1], dp[i-2] + nums[i])
 * Chỉ cần nhớ 2 giá trị trước nên O(1) bộ nhớ.
 *
 * Bài liên quan nên làm tiếp: 213. House Robber II (nhà xếp thành vòng tròn).
 *
 * Độ phức tạp: O(n) thời gian, O(1) bộ nhớ.
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
function rob(nums) {
  let twoBack = 0; // dp[i-2]
  let oneBack = 0; // dp[i-1]

  for (const money of nums) {
    const current = Math.max(oneBack, twoBack + money);
    twoBack = oneBack;
    oneBack = current;
  }

  return oneBack;
}
// <<< SOLUTION

test('198. House Robber', rob, [
  [[[1, 2, 3, 1]], 4],
  [[[2, 7, 9, 3, 1]], 12],
  [[[2, 1, 1, 2]], 4],
  [[[5]], 5],
  [[[]], 0],
  [[[2, 3]], 3],
]);

module.exports = { rob };
