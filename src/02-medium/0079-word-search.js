'use strict';
/**
 * 79. Word Search - Medium - https://leetcode.com/problems/word-search/
 *
 * Đề bài: Từ `word` có tồn tại trong lưới ký tự không? Các ô phải kề nhau theo
 * chiều ngang/dọc và MỖI Ô CHỈ DÙNG MỘT LẦN trong cùng một đường đi.
 *
 * Ý tưởng: DFS + backtracking từ mọi ô. Mẹo quan trọng: thay vì tạo mảng
 * `visited` riêng, ta ghi đè tạm ô hiện tại bằng ký tự lạ ('#') trước khi đi sâu,
 * rồi KHÔI PHỤC lại sau khi quay lui. Vừa tiết kiệm bộ nhớ vừa gọn.
 *
 * Độ phức tạp: O(m * n * 4^L) thời gian với L = độ dài word, O(L) ngăn xếp.
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
function exist(board, word) {
  const m = board.length;
  const n = board[0].length;

  function dfs(i, j, k) {
    if (k === word.length) return true; // đã khớp hết
    if (i < 0 || i >= m || j < 0 || j >= n) return false;
    if (board[i][j] !== word[k]) return false;

    const saved = board[i][j];
    board[i][j] = '#'; // đánh dấu đang dùng

    const found =
      dfs(i + 1, j, k + 1) ||
      dfs(i - 1, j, k + 1) ||
      dfs(i, j + 1, k + 1) ||
      dfs(i, j - 1, k + 1);

    board[i][j] = saved; // khôi phục
    return found;
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (dfs(i, j, 0)) return true;
    }
  }

  return false;
}
// <<< SOLUTION

const B = () => [['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']];

test('79. Word Search', exist, [
  [[B(), 'ABCCED'], true],
  [[B(), 'SEE'], true],
  [[B(), 'ABCB'], false],
  [[[['a']], 'a'], true],
  [[[['a', 'b']], 'ba'], true],
]);

module.exports = { exist };
