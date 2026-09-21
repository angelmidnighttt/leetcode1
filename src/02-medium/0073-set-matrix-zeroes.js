'use strict';
/**
 * 73. Set Matrix Zeroes - Medium - https://leetcode.com/problems/set-matrix-zeroes/
 *
 * Đề bài: Nếu một ô bằng 0 thì đặt toàn bộ hàng và cột của nó bằng 0, làm TẠI CHỖ.
 *
 * Ý tưởng: Bẫy của bài này là không được set 0 ngay khi gặp (sẽ tạo ra 0 giả và
 * lan sai). Cách O(m+n) bộ nhớ là ghi nhớ danh sách hàng/cột cần xoá. Cách O(1)
 * bộ nhớ (bên dưới) dùng chính HÀNG 0 và CỘT 0 làm bảng đánh dấu, và xử lý riêng
 * hai cái đó bằng 2 biến cờ vì chúng bị ghi đè trong quá trình đánh dấu.
 *
 * Độ phức tạp: O(m * n) thời gian, O(1) bộ nhớ.
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
function setZeroes(matrix) {
  const m = matrix.length;
  if (m === 0) return;
  const n = matrix[0].length;

  let firstRowHasZero = false;
  let firstColHasZero = false;

  for (let j = 0; j < n; j++) if (matrix[0][j] === 0) firstRowHasZero = true;
  for (let i = 0; i < m; i++) if (matrix[i][0] === 0) firstColHasZero = true;

  // Đánh dấu vào hàng 0 / cột 0
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (matrix[i][j] === 0) {
        matrix[i][0] = 0;
        matrix[0][j] = 0;
      }
    }
  }

  // Áp dụng đánh dấu cho phần bên trong
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (matrix[i][0] === 0 || matrix[0][j] === 0) matrix[i][j] = 0;
    }
  }

  if (firstRowHasZero) for (let j = 0; j < n; j++) matrix[0][j] = 0;
  if (firstColHasZero) for (let i = 0; i < m; i++) matrix[i][0] = 0;
}
// <<< SOLUTION

const run = (m) => {
  setZeroes(m);
  return m;
};

test('73. Set Matrix Zeroes', run, [
  [[[[1, 1, 1], [1, 0, 1], [1, 1, 1]]], [[1, 0, 1], [0, 0, 0], [1, 0, 1]]],
  [
    [[[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]]],
    [[0, 0, 0, 0], [0, 4, 5, 0], [0, 3, 1, 0]],
  ],
  [[[[1]]], [[1]]],
  [[[[0]]], [[0]]],
]);

module.exports = { setZeroes };
