'use strict';
/**
 * 329. Longest Increasing Path in a Matrix - Hard
 * https://leetcode.com/problems/longest-increasing-path-in-a-matrix/
 *
 * Đề bài: Tìm đường đi dài nhất mà giá trị TĂNG NGẶT, đi theo 4 hướng.
 *
 * Ý tưởng: DFS + GHI NHỚ (memoization). Vì đường đi bắt buộc tăng ngặt nên không
 * bao giờ quay lại ô cũ -> đồ thị ngầm này KHÔNG CÓ CHU TRÌNH, ta được phép ghi
 * nhớ kết quả mà không sợ đệ quy vòng tròn (đây là lý do không cần mảng visited).
 *
 * memo[r][c] = độ dài đường tăng dài nhất BẮT ĐẦU từ ô (r, c). Mỗi ô chỉ tính
 * một lần rồi tái sử dụng -> O(m*n) thay vì bùng nổ mũ.
 *
 * Độ phức tạp: O(m * n) thời gian, O(m * n) bộ nhớ.
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
const DIRS = [[1, 0], [-1, 0], [0, 1], [0, -1]];

function longestIncreasingPath(matrix) {
  if (!matrix || matrix.length === 0) return 0;

  const m = matrix.length;
  const n = matrix[0].length;
  const memo = Array.from({ length: m }, () => new Array(n).fill(0));

  function dfs(r, c) {
    if (memo[r][c] !== 0) return memo[r][c];

    let best = 1; // ít nhất là chính ô này
    for (const [dr, dc] of DIRS) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < m && nc >= 0 && nc < n && matrix[nr][nc] > matrix[r][c]) {
        best = Math.max(best, 1 + dfs(nr, nc));
      }
    }

    memo[r][c] = best;
    return best;
  }

  let answer = 0;
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) answer = Math.max(answer, dfs(r, c));
  }

  return answer;
}
// <<< SOLUTION

test('329. Longest Increasing Path in a Matrix', longestIncreasingPath, [
  [[[[9, 9, 4], [6, 6, 8], [2, 1, 1]]], 4],
  [[[[3, 4, 5], [3, 2, 6], [2, 2, 1]]], 4],
  [[[[1]]], 1],
  [[[]], 0],
  [[[[1, 2, 3, 4, 5]]], 5],
  [[[[7, 7], [7, 7]]], 1],
]);

module.exports = { longestIncreasingPath };
