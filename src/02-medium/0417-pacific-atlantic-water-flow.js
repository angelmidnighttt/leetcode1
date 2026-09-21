'use strict';
/**
 * 417. Pacific Atlantic Water Flow - Medium
 * https://leetcode.com/problems/pacific-atlantic-water-flow/
 *
 * Đề bài: Lưới độ cao. Thái Bình Dương chạm mép TRÊN và TRÁI, Đại Tây Dương chạm
 * mép DƯỚI và PHẢI. Nước chảy từ ô cao sang ô thấp hơn hoặc BẰNG. Tìm mọi ô mà
 * từ đó nước chảy được ra CẢ HAI đại dương.
 *
 * Ý tưởng: Thử từng ô rồi loang xuôi dòng thì rất tốn. Mẹo là LOANG NGƯỢC:
 * xuất phát từ các ô ven biển và đi lên chỗ CAO HƠN HOẶC BẰNG. Tập ô chạm được
 * chính là tập ô chảy ra được đại dương đó. Làm 2 lần (một cho mỗi đại dương)
 * rồi lấy giao.
 *
 * Độ phức tạp: O(m * n) thời gian, O(m * n) bộ nhớ.
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
function pacificAtlantic(heights) {
  if (!heights || heights.length === 0) return [];

  const m = heights.length;
  const n = heights[0].length;
  const pacific = Array.from({ length: m }, () => new Array(n).fill(false));
  const atlantic = Array.from({ length: m }, () => new Array(n).fill(false));

  function dfs(r, c, visited, prevHeight) {
    if (r < 0 || r >= m || c < 0 || c >= n) return;
    if (visited[r][c]) return;
    if (heights[r][c] < prevHeight) return; // đi ngược dòng: phải cao hơn hoặc bằng

    visited[r][c] = true;
    const h = heights[r][c];
    dfs(r + 1, c, visited, h);
    dfs(r - 1, c, visited, h);
    dfs(r, c + 1, visited, h);
    dfs(r, c - 1, visited, h);
  }

  for (let c = 0; c < n; c++) {
    dfs(0, c, pacific, -Infinity);       // mép trên
    dfs(m - 1, c, atlantic, -Infinity);  // mép dưới
  }
  for (let r = 0; r < m; r++) {
    dfs(r, 0, pacific, -Infinity);       // mép trái
    dfs(r, n - 1, atlantic, -Infinity);  // mép phải
  }

  const result = [];
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (pacific[r][c] && atlantic[r][c]) result.push([r, c]);
    }
  }

  return result;
}
// <<< SOLUTION

test('417. Pacific Atlantic Water Flow', pacificAtlantic, [
  [
    [[[1, 2, 2, 3, 5], [3, 2, 3, 4, 4], [2, 4, 5, 3, 1], [6, 7, 1, 4, 5], [5, 1, 1, 2, 4]]],
    [[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]],
    'sorted2d',
  ],
  [[[[1]]], [[0, 0]], 'sorted2d'],
  [[[[1, 1], [1, 1]]], [[0, 0], [0, 1], [1, 0], [1, 1]], 'sorted2d'],
]);

module.exports = { pacificAtlantic };
