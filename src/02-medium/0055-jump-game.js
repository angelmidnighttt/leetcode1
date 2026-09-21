'use strict';
/**
 * 55. Jump Game - Medium - https://leetcode.com/problems/jump-game/
 *
 * Đề bài: nums[i] là số bước TỐI ĐA nhảy được từ ô i. Bắt đầu ở ô 0, có tới được
 * ô cuối không?
 *
 * Ý tưởng: Tham lam. Chỉ cần theo dõi ô xa nhất có thể chạm tới (`reach`).
 * Duyệt từ trái sang: nếu i > reach thì ta đã kẹt -> false. Ngược lại cập nhật
 * reach = max(reach, i + nums[i]). Chạm được tới cuối là thành công.
 * Không cần DP - tham lam đủ vì "tới được ô i" kéo theo "tới được mọi ô trước i".
 *
 * Độ phức tạp: O(n) thời gian, O(1) bộ nhớ.
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
function canJump(nums) {
  let reach = 0;

  for (let i = 0; i < nums.length; i++) {
    if (i > reach) return false;              // có hố không vượt qua được
    reach = Math.max(reach, i + nums[i]);
    if (reach >= nums.length - 1) return true; // thoát sớm
  }

  return true;
}
// <<< SOLUTION

test('55. Jump Game', canJump, [
  [[[2, 3, 1, 1, 4]], true],
  [[[3, 2, 1, 0, 4]], false],
  [[[0]], true],
  [[[2, 0, 0]], true],
  [[[1, 0, 1, 0]], false],
]);

module.exports = { canJump };
