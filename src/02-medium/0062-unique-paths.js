'use strict';
/**
 * 62. Unique Paths - Medium - https://leetcode.com/problems/unique-paths/
 *
 * Đề bài: Robot ở góc trên trái lưới m x n, chỉ đi được sang phải hoặc xuống dưới.
 * Có bao nhiêu đường khác nhau tới góc dưới phải?
 *
 * Ý tưởng: DP trên lưới - bài mẫu để hiểu "DP 2 chiều". Số cách tới ô (i, j)
 * bằng số cách tới ô bên trái cộng số cách tới ô phía trên:
 *   dp[i][j] = dp[i-1][j] + dp[i][j-1]
 * Hàng đầu và cột đầu đều bằng 1 (chỉ có một đường thẳng).
 * Tối ưu bộ nhớ: chỉ cần giữ MỘT hàng và cập nhật tại chỗ -> O(n).
 *
 * Độ phức tạp: O(m * n) thời gian, O(n) bộ nhớ.
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
function uniquePaths(m, n) {
  const row = new Array(n).fill(1);

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      // row[j] đang là giá trị hàng trên, row[j-1] là ô bên trái đã cập nhật
      row[j] = row[j] + row[j - 1];
    }
  }

  return row[n - 1];
}
// <<< SOLUTION

test('62. Unique Paths', uniquePaths, [
  [[3, 7], 28],
  [[3, 2], 3],
  [[1, 1], 1],
  [[7, 3], 28],
  [[10, 10], 48620],
]);

module.exports = { uniquePaths };
