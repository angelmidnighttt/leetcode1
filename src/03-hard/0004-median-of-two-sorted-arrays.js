'use strict';
/**
 * 4. Median of Two Sorted Arrays - Hard
 * https://leetcode.com/problems/median-of-two-sorted-arrays/
 *
 * Đề bài: Hai mảng đã sắp tăng. Tìm trung vị của hợp hai mảng trong O(log(m+n)).
 *
 * Ý tưởng: Không trộn mảng (đó là O(m+n)). Thay vào đó TÌM NHỊ PHÂN ĐIỂM CẮT.
 * Ta cần chia hợp hai mảng thành nửa trái và nửa phải bằng nhau sao cho MỌI phần
 * tử nửa trái <= MỌI phần tử nửa phải. Nếu cắt nums1 tại i thì bắt buộc cắt nums2
 * tại j = half - i, nên chỉ còn MỘT biến i để tìm nhị phân.
 *
 * Điều kiện cắt đúng: left1 <= right2 VÀ left2 <= right1.
 *   - left1 > right2 -> cắt nums1 quá nhiều, lùi sang trái.
 *   - ngược lại      -> tiến sang phải.
 * Dùng -Infinity / +Infinity cho biên để khỏi viết trường hợp đặc biệt.
 *
 * Luôn tìm nhị phân trên mảng NGẮN HƠN để đảm bảo j không vượt biên.
 *
 * Độ phức tạp: O(log(min(m, n))) thời gian, O(1) bộ nhớ.
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
function findMedianSortedArrays(nums1, nums2) {
  if (nums1.length > nums2.length) [nums1, nums2] = [nums2, nums1];

  const m = nums1.length;
  const n = nums2.length;
  const half = Math.floor((m + n + 1) / 2); // số phần tử của nửa trái

  let lo = 0;
  let hi = m;

  while (lo <= hi) {
    const i = Math.floor((lo + hi) / 2); // lấy i phần tử đầu của nums1
    const j = half - i;                  // lấy j phần tử đầu của nums2

    const left1 = i > 0 ? nums1[i - 1] : -Infinity;
    const right1 = i < m ? nums1[i] : Infinity;
    const left2 = j > 0 ? nums2[j - 1] : -Infinity;
    const right2 = j < n ? nums2[j] : Infinity;

    if (left1 <= right2 && left2 <= right1) {
      if ((m + n) % 2 === 1) return Math.max(left1, left2);
      return (Math.max(left1, left2) + Math.min(right1, right2)) / 2;
    }

    if (left1 > right2) hi = i - 1;
    else lo = i + 1;
  }

  return 0; // không bao giờ tới đây nếu input hợp lệ
}
// <<< SOLUTION

test('4. Median of Two Sorted Arrays', findMedianSortedArrays, [
  [[[1, 3], [2]], 2],
  [[[1, 2], [3, 4]], 2.5],
  [[[], [1]], 1],
  [[[], [2, 3]], 2.5],
  [[[1, 2, 3, 4, 5], [6, 7, 8]], 4.5],
  [[[3], [-2, -1]], -1],
]);

module.exports = { findMedianSortedArrays };
