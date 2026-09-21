'use strict';
/**
 * 200. Number of Islands - Medium - https://leetcode.com/problems/number-of-islands/
 *
 * Đề bài: Lưới gồm '1' (đất) và '0' (nước). Đếm số đảo - đảo là vùng đất liên
 * thông theo 4 hướng ngang/dọc.
 *
 * Ý tưởng: Duyệt từng ô; gặp ô đất chưa thăm thì tăng bộ đếm rồi "dìm" cả đảo đó
 * bằng DFS/BFS (đổi '1' thành '0'). Việc đánh dấu tại chỗ thay cho mảng visited
 * giúp mỗi ô chỉ được xử lý một lần.
 *
 * Bên dưới dùng BFS lặp thay vì DFS đệ quy để tránh tràn ngăn xếp với lưới lớn.
 *
 * Độ phức tạp: O(m * n) thời gian, O(min(m, n)) bộ nhớ cho hàng đợi.
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
function numIslands(grid) {
  if (!grid || grid.length === 0) return 0;

  const m = grid.length;
  const n = grid[0].length;
  const DIRS = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  let islands = 0;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] !== '1') continue;

      islands++;
      const queue = [[i, j]];
      grid[i][j] = '0'; // dìm ngay khi đưa vào hàng đợi

      for (let head = 0; head < queue.length; head++) {
        const [r, c] = queue[head];
        for (const [dr, dc] of DIRS) {
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] === '1') {
            grid[nr][nc] = '0';
            queue.push([nr, nc]);
          }
        }
      }
    }
  }

  return islands;
}
// <<< SOLUTION

const g = (rows) => rows.map((r) => r.split(''));

test('200. Number of Islands', numIslands, [
  [[g(['11110', '11010', '11000', '00000'])], 1],
  [[g(['11000', '11000', '00100', '00011'])], 3],
  [[g(['000'])], 0],
  [[g(['1'])], 1],
  [[g(['101', '010', '101'])], 5],
]);

module.exports = { numIslands };
