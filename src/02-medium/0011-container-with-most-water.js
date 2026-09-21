'use strict';
/**
 * 11. Container With Most Water - Medium
 * https://leetcode.com/problems/container-with-most-water/
 *
 * Đề bài: height[i] là chiều cao cột thứ i. Chọn 2 cột tạo thùng chứa nước lớn nhất.
 * Diện tích = khoảng cách * chiều cao cột THẤP HƠN.
 *
 * Ý tưởng: Hai con trỏ ở hai đầu (bề rộng lớn nhất). Mỗi bước dịch con trỏ ở phía
 * cột THẤP HƠN vào trong. Vì sao đúng? Diện tích bị giới hạn bởi cột thấp; nếu dịch
 * cột cao vào thì bề rộng giảm mà chiều cao không thể tăng -> chắc chắn tệ hơn.
 * Vậy mọi phương án tốt hơn chỉ có thể nằm ở phía cột thấp.
 *
 * Độ phức tạp: O(n) thời gian, O(1) bộ nhớ.
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let best = 0;

  while (left < right) {
    const h = Math.min(height[left], height[right]);
    best = Math.max(best, h * (right - left));

    if (height[left] < height[right]) left++;
    else right--;
  }

  return best;
}
// <<< SOLUTION

test('11. Container With Most Water', maxArea, [
  [[[1, 8, 6, 2, 5, 4, 8, 3, 7]], 49],
  [[[1, 1]], 1],
  [[[4, 3, 2, 1, 4]], 16],
  [[[1, 2, 1]], 2],
]);

module.exports = { maxArea };
