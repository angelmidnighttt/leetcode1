'use strict';
/**
 * 51. N-Queens - Hard - https://leetcode.com/problems/n-queens/
 *
 * Đề bài: Đặt n quân hậu lên bàn cờ n x n sao cho không quân nào ăn được nhau
 * (không chung hàng, cột, hoặc đường chéo). Trả về MỌI cách đặt.
 *
 * Ý tưởng: Backtracking theo từng HÀNG - mỗi hàng đặt đúng một quân nên ràng buộc
 * hàng tự động thoả. Mấu chốt là kiểm tra xung đột trong O(1) bằng 3 tập hợp:
 *   - cols:  cột đã dùng
 *   - diag1: đường chéo "\" - mọi ô trên cùng đường có (row - col) BẰNG NHAU
 *   - diag2: đường chéo "/" - mọi ô trên cùng đường có (row + col) BẰNG NHAU
 * Hai công thức chéo này là thứ đáng nhớ nhất của bài.
 *
 * Độ phức tạp: xấp xỉ O(n!) thời gian, O(n) bộ nhớ (chưa kể kết quả).
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
function solveNQueens(n) {
  const solutions = [];
  const queenCol = [];      // queenCol[row] = cột đặt hậu ở hàng row
  const cols = new Set();
  const diag1 = new Set();  // row - col
  const diag2 = new Set();  // row + col

  function backtrack(row) {
    if (row === n) {
      solutions.push(
        queenCol.map((c) => '.'.repeat(c) + 'Q' + '.'.repeat(n - c - 1))
      );
      return;
    }

    for (let col = 0; col < n; col++) {
      if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) continue;

      cols.add(col);
      diag1.add(row - col);
      diag2.add(row + col);
      queenCol.push(col);

      backtrack(row + 1);

      queenCol.pop();
      cols.delete(col);
      diag1.delete(row - col);
      diag2.delete(row + col);
    }
  }

  backtrack(0);
  return solutions;
}

// Biến thể 52. N-Queens II: chỉ đếm số cách
function totalNQueens(n) {
  return solveNQueens(n).length;
}
// <<< SOLUTION

test('51. N-Queens', solveNQueens, [
  [[4], [['.Q..', '...Q', 'Q...', '..Q.'], ['..Q.', 'Q...', '...Q', '.Q..']], 'sorted2d'],
  [[1], [['Q']], 'sorted2d'],
  [[2], [], 'sorted2d'],
  [[3], [], 'sorted2d'],
]);

test('52. N-Queens II (đếm số cách)', totalNQueens, [
  [[4], 2],
  [[5], 10],
  [[6], 4],
  [[8], 92],
]);

module.exports = { solveNQueens, totalNQueens };
