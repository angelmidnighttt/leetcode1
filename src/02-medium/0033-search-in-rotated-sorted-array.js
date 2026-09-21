'use strict';
/**
 * 33. Search in Rotated Sorted Array - Medium
 * https://leetcode.com/problems/search-in-rotated-sorted-array/
 *
 * Đề bài: Mảng đã sắp tăng nhưng bị XOAY tại một điểm chưa biết (vd [4,5,6,7,0,1,2]).
 * Tìm chỉ số của target trong O(log n).
 *
 * Ý tưởng: Vẫn là tìm kiếm nhị phân, nhưng thêm một nhận xét: khi cắt đôi mảng
 * xoay, LUÔN có ít nhất một nửa đã sắp xếp hoàn chỉnh. Ta xác định nửa nào sắp
 * xếp (so nums[left] với nums[mid]), kiểm tra target có nằm trong khoảng đó
 * không, rồi quyết định đi tiếp về phía nào.
 *
 * Độ phức tạp: O(log n) thời gian, O(1) bộ nhớ.
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) return mid;

    if (nums[left] <= nums[mid]) {
      // nửa trái [left..mid] đã sắp xếp
      if (nums[left] <= target && target < nums[mid]) right = mid - 1;
      else left = mid + 1;
    } else {
      // nửa phải [mid..right] đã sắp xếp
      if (nums[mid] < target && target <= nums[right]) left = mid + 1;
      else right = mid - 1;
    }
  }

  return -1;
}
// <<< SOLUTION

test('33. Search in Rotated Sorted Array', search, [
  [[[4, 5, 6, 7, 0, 1, 2], 0], 4],
  [[[4, 5, 6, 7, 0, 1, 2], 3], -1],
  [[[1], 0], -1],
  [[[1], 1], 0],
  [[[3, 1], 1], 1],
  [[[5, 1, 3], 3], 2],
  [[[1, 2, 3, 4, 5], 4], 3],
]);

module.exports = { search };
