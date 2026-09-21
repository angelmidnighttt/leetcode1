'use strict';
/**
 * 54. Spiral Matrix - Medium - https://leetcode.com/problems/spiral-matrix/
 *
 * Đề bài: Duyệt ma trận theo hình xoắn ốc (phải -> xuống -> trái -> lên -> ...).
 *
 * Ý tưởng: Giữ 4 biên top / bottom / left / right rồi bóc từng "vòng" một, sau
 * mỗi cạnh thì thu biên lại. Bẫy lớn nhất là ma trận không vuông: sau khi đi
 * cạnh trên và cạnh phải, phải KIỂM TRA LẠI biên còn hợp lệ không trước khi đi
 * cạnh dưới và cạnh trái - nếu không sẽ đọc lặp phần tử.
 *
 * Độ phức tạp: O(m * n) thời gian, O(1) bộ nhớ phụ.
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
function spiralOrder(matrix) {
  if (!matrix || matrix.length === 0) return [];

  const result = [];
  let top = 0;
  let bottom = matrix.length - 1;
  let left = 0;
  let right = matrix[0].length - 1;

  while (top <= bottom && left <= right) {
    for (let j = left; j <= right; j++) result.push(matrix[top][j]);
    top++;

    for (let i = top; i <= bottom; i++) result.push(matrix[i][right]);
    right--;

    if (top <= bottom) {
      for (let j = right; j >= left; j--) result.push(matrix[bottom][j]);
      bottom--;
    }

    if (left <= right) {
      for (let i = bottom; i >= top; i--) result.push(matrix[i][left]);
      left++;
    }
  }

  return result;
}
// <<< SOLUTION

test('54. Spiral Matrix', spiralOrder, [
  [[[[1, 2, 3], [4, 5, 6], [7, 8, 9]]], [1, 2, 3, 6, 9, 8, 7, 4, 5]],
  [[[[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]], [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]],
  [[[[1]]], [1]],
  [[[[1], [2], [3]]], [1, 2, 3]],
  [[[[1, 2, 3]]], [1, 2, 3]],
  [[[]], []],
]);

module.exports = { spiralOrder };
