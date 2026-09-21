'use strict';
/**
 * 84. Largest Rectangle in Histogram - Hard
 * https://leetcode.com/problems/largest-rectangle-in-histogram/
 *
 * Đề bài: Các cột cao heights[i] rộng 1 đơn vị. Tìm diện tích hình chữ nhật lớn
 * nhất nằm gọn trong biểu đồ.
 *
 * Ý tưởng: NGĂN XẾP ĐƠN ĐIỆU TĂNG. Với mỗi cột, hình chữ nhật cao bằng nó kéo
 * dài được tới đâu? Tới cột thấp hơn đầu tiên ở mỗi bên. Ta giữ stack các chỉ số
 * có chiều cao TĂNG DẦN; khi gặp cột thấp hơn đỉnh stack, đó chính là "biên phải"
 * của đỉnh -> pop ra và tính diện tích ngay. Biên trái là phần tử ngay dưới nó
 * trong stack.
 *
 * Mẹo: chạy vòng lặp thêm một bước với chiều cao ảo bằng 0 ở cuối, để mọi cột
 * còn kẹt trong stack đều được tính, khỏi phải viết đoạn dọn dẹp riêng.
 *
 * Độ phức tạp: O(n) thời gian, O(n) bộ nhớ.
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
function largestRectangleArea(heights) {
  const stack = []; // chỉ số, chiều cao tăng dần
  let best = 0;

  for (let i = 0; i <= heights.length; i++) {
    const h = i === heights.length ? 0 : heights[i]; // cột ảo chiều cao 0 ở cuối

    while (stack.length > 0 && heights[stack[stack.length - 1]] >= h) {
      const height = heights[stack.pop()];
      const leftBoundary = stack.length > 0 ? stack[stack.length - 1] + 1 : 0;
      best = Math.max(best, height * (i - leftBoundary));
    }

    stack.push(i);
  }

  return best;
}
// <<< SOLUTION

test('84. Largest Rectangle in Histogram', largestRectangleArea, [
  [[[2, 1, 5, 6, 2, 3]], 10],
  [[[2, 4]], 4],
  [[[1]], 1],
  [[[]], 0],
  [[[2, 2, 2]], 6],
  [[[5, 4, 3, 2, 1]], 9],
  [[[1, 2, 3, 4, 5]], 9],
]);

module.exports = { largestRectangleArea };
