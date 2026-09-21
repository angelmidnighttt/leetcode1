'use strict';
/**
 * 212. Word Search II - Hard - https://leetcode.com/problems/word-search-ii/
 *
 * Đề bài: Như bài 79 nhưng phải tìm CẢ MỘT DANH SÁCH từ trong lưới cùng lúc.
 *
 * Ý tưởng: Chạy bài 79 cho từng từ là O(số từ * m * n * 4^L) - quá chậm.
 * Mẹo: nhét toàn bộ từ điển vào một TRIE rồi DFS lưới MỘT LẦN, đi song song trên
 * lưới và trên trie. Nhánh nào trie không có thì cắt ngay lập tức - các từ dùng
 * chung tiền tố được duyệt chung một lần.
 *
 * Hai chi tiết đáng nhớ:
 *   - Khi tìm thấy một từ, gán node.word = null để không thêm trùng (và khỏi
 *     phải dùng Set).
 *   - Vẫn dùng mẹo ghi đè '#' tại chỗ thay cho mảng visited.
 *
 * Độ phức tạp: O(m * n * 4^L) trường hợp xấu nhưng thực tế nhanh hơn rất nhiều
 * nhờ cắt nhánh; O(tổng số ký tự của words) bộ nhớ cho trie.
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
function findWords(board, words) {
  if (!board || board.length === 0) return [];

  // Dựng trie bằng object thường cho gọn
  const root = {};
  for (const word of words) {
    let node = root;
    for (const ch of word) {
      if (!node[ch]) node[ch] = {};
      node = node[ch];
    }
    node.word = word; // đánh dấu kết thúc từ
  }

  const m = board.length;
  const n = board[0].length;
  const result = [];

  function dfs(r, c, node) {
    const ch = board[r][c];
    const next = node[ch];
    if (!next) return; // trie không có nhánh này -> cắt

    if (next.word) {
      result.push(next.word);
      next.word = null; // tránh thêm trùng
    }

    board[r][c] = '#';
    if (r + 1 < m) dfs(r + 1, c, next);
    if (r - 1 >= 0) dfs(r - 1, c, next);
    if (c + 1 < n) dfs(r, c + 1, next);
    if (c - 1 >= 0) dfs(r, c - 1, next);
    board[r][c] = ch;
  }

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) dfs(r, c, root);
  }

  return result;
}
// <<< SOLUTION

const B = () => [
  ['o', 'a', 'a', 'n'],
  ['e', 't', 'a', 'e'],
  ['i', 'h', 'k', 'r'],
  ['i', 'f', 'l', 'v'],
];

test('212. Word Search II', findWords, [
  [[B(), ['oath', 'pea', 'eat', 'rain']], ['oath', 'eat'], 'sorted'],
  [[[['a', 'b'], ['c', 'd']], ['abcb']], [], 'sorted'],
  [[[['a']], ['a']], ['a'], 'sorted'],
  [[B(), ['oath', 'oathi', 'oathk']], ['oath', 'oathi', 'oathk'], 'sorted'],
]);

module.exports = { findWords };
