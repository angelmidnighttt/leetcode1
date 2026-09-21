'use strict';
/**
 * 42. Trapping Rain Water - Hard
 * https://leetcode.com/problems/trapping-rain-water/
 *
 * Đề bài: height[i] là chiều cao cột. Tính tổng lượng nước đọng lại sau mưa.
 *
 * Ý tưởng: Nhận xét cốt lõi - lượng nước trên cột i bằng
 *      min(cột cao nhất bên trái, cột cao nhất bên phải) - height[i]
 * Cách trực tiếp cần 2 mảng prefix/suffix max -> O(n) bộ nhớ.
 *
 * Cách hai con trỏ (bên dưới) chỉ tốn O(1): đi từ hai đầu vào, luôn xử lý phía
 * có "tường cao nhất đã gặp" THẤP HƠN. Vì sao đúng? Nếu leftMax < rightMax thì
 * nước trên cột trái CHẮC CHẮN do leftMax quyết định - dù bên phải sau này có ra
 * sao đi nữa, nó cũng đã >= rightMax > leftMax.
 *
 * Độ phức tạp: O(n) thời gian, O(1) bộ nhớ.
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
function trap(height) {
  if (height.length < 3) return 0;

  let left = 0;
  let right = height.length - 1;
  let leftMax = height[left];
  let rightMax = height[right];
  let water = 0;

  while (left < right) {
    if (leftMax < rightMax) {
      left++;
      leftMax = Math.max(leftMax, height[left]);
      water += leftMax - height[left];
    } else {
      right--;
      rightMax = Math.max(rightMax, height[right]);
      water += rightMax - height[right];
    }
  }

  return water;
}
// <<< SOLUTION

test('42. Trapping Rain Water', trap, [
  [[[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]], 6],
  [[[4, 2, 0, 3, 2, 5]], 9],
  [[[]], 0],
  [[[1, 2, 3]], 0],
  [[[3, 2, 1]], 0],
  [[[5, 0, 5]], 5],
  [[[2, 0, 2]], 2],
]);

module.exports = { trap };
