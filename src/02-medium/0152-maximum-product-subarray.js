'use strict';
/**
 * 152. Maximum Product Subarray - Medium
 * https://leetcode.com/problems/maximum-product-subarray/
 *
 * Đề bài: Tìm TÍCH lớn nhất của một mảng con liên tiếp không rỗng.
 *
 * Ý tưởng: Giống Kadane nhưng có một bẫy: SỐ ÂM. Một tích rất ÂM nhân thêm một
 * số âm nữa sẽ thành rất DƯƠNG. Vì vậy phải theo dõi ĐỒNG THỜI tích lớn nhất và
 * tích nhỏ nhất kết thúc tại vị trí hiện tại. Mỗi bước, ứng viên mới gồm 3 giá trị:
 *   nums[i],  curMax * nums[i],  curMin * nums[i]
 * Số 0 cũng được xử lý tự nhiên vì nums[i] đứng riêng luôn là một ứng viên.
 *
 * Độ phức tạp: O(n) thời gian, O(1) bộ nhớ.
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
function maxProduct(nums) {
  let best = nums[0];
  let curMax = nums[0];
  let curMin = nums[0];

  for (let i = 1; i < nums.length; i++) {
    const n = nums[i];
    const a = curMax * n;
    const b = curMin * n;

    curMax = Math.max(n, a, b);
    curMin = Math.min(n, a, b);

    best = Math.max(best, curMax);
  }

  return best;
}
// <<< SOLUTION

test('152. Maximum Product Subarray', maxProduct, [
  [[[2, 3, -2, 4]], 6],
  [[[-2, 0, -1]], 0],
  [[[-2, 3, -4]], 24],
  [[[-2]], -2],
  [[[0, 2]], 2],
  [[[2, -5, -2, -4, 3]], 24],
]);

module.exports = { maxProduct };
