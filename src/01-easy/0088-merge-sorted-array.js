'use strict';
/**
 * 88. Merge Sorted Array - Easy - https://leetcode.com/problems/merge-sorted-array/
 *
 * Đề bài: nums1 có m phần tử thật + n ô trống ở cuối, nums2 có n phần tử.
 * Cả hai đã sắp tăng. Trộn nums2 vào nums1 TẠI CHỖ, kết quả vẫn sắp tăng.
 *
 * Ý tưởng: Mẹo quan trọng là trộn TỪ PHẢI SANG TRÁI. Nếu trộn từ trái, ta sẽ
 * ghi đè lên phần tử chưa xử lý của nums1. Ghi từ cuối thì vùng ghi luôn là
 * vùng trống nên an toàn.
 *
 * Độ phức tạp: O(m + n) thời gian, O(1) bộ nhớ.
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
function merge(nums1, m, nums2, n) {
  let i = m - 1;       // con trỏ cuối phần thật của nums1
  let j = n - 1;       // con trỏ cuối nums2
  let k = m + n - 1;   // vị trí ghi

  while (j >= 0) {
    if (i >= 0 && nums1[i] > nums2[j]) {
      nums1[k--] = nums1[i--];
    } else {
      nums1[k--] = nums2[j--];
    }
  }
}
// <<< SOLUTION

const run = (nums1, m, nums2, n) => {
  merge(nums1, m, nums2, n);
  return nums1;
};

test('88. Merge Sorted Array', run, [
  [[[1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3], [1, 2, 2, 3, 5, 6]],
  [[[1], 1, [], 0], [1]],
  [[[0], 0, [1], 1], [1]],
  [[[4, 5, 6, 0, 0, 0], 3, [1, 2, 3], 3], [1, 2, 3, 4, 5, 6]],
]);

module.exports = { merge };
