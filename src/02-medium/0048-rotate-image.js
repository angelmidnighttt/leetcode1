'use strict';
/**
 * 48. Rotate Image - Medium - https://leetcode.com/problems/rotate-image/
 *
 * Đề bài: Xoay ma trận vuông n x n đi 90 độ THEO CHIỀU KIM ĐỒNG HỒ, TẠI CHỖ.
 *
 * Ý tưởng: Mẹo hai bước, dễ nhớ hơn hẳn việc tính công thức chỉ số:
 *   1) Chuyển vị (transpose): đổi chỗ matrix[i][j] với matrix[j][i]
 *      -> chỉ duyệt nửa trên đường chéo, nếu duyệt cả thì đổi 2 lần thành ra không đổi.
 *   2) Đảo ngược từng hàng.
 * Muốn xoay ngược chiều kim đồng hồ thì: chuyển vị rồi đảo ngược từng CỘT.
 *
 * Độ phức tạp: O(n^2) thời gian, O(1) bộ nhớ.
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
function rotate(matrix) {
  const n = matrix.length;

  // Bước 1: chuyển vị
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }

  // Bước 2: đảo ngược từng hàng
  for (const row of matrix) row.reverse();
}
// <<< SOLUTION

const run = (m) => {
  rotate(m);
  return m;
};

test('48. Rotate Image', run, [
  [[[[1, 2, 3], [4, 5, 6], [7, 8, 9]]], [[7, 4, 1], [8, 5, 2], [9, 6, 3]]],
  [[[[1]]], [[1]]],
  [[[[1, 2], [3, 4]]], [[3, 1], [4, 2]]],
  [
    [[[5, 1, 9, 11], [2, 4, 8, 10], [13, 3, 6, 7], [15, 14, 12, 16]]],
    [[15, 13, 2, 5], [14, 3, 4, 1], [12, 6, 8, 9], [16, 7, 10, 11]],
  ],
]);

module.exports = { rotate };
