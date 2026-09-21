'use strict';
/**
 * 543. Diameter of Binary Tree - Easy
 * https://leetcode.com/problems/diameter-of-binary-tree/
 *
 * Đề bài: Đường kính cây = độ dài (số CẠNH) của đường đi dài nhất giữa hai node
 * bất kỳ. Đường đi này không nhất thiết đi qua gốc.
 *
 * Ý tưởng: Với mỗi node, đường đi dài nhất "vòng qua" nó = chiều cao trái +
 * chiều cao phải. Vậy chỉ cần một lượt DFS tính chiều cao, tiện thể cập nhật
 * đáp án lớn nhất. Đây là khuôn mẫu rất hay gặp: "hàm đệ quy trả về một thứ
 * (chiều cao) nhưng cập nhật một biến toàn cục khác (đáp án)".
 *
 * Độ phức tạp: O(n) thời gian, O(h) bộ nhớ.
 */
const { test } = require('../../lib/test');
const { buildTree } = require('../../lib/ds');

// >>> SOLUTION
function diameterOfBinaryTree(root) {
  let best = 0;

  function height(node) {
    if (node === null) return 0;

    const left = height(node.left);
    const right = height(node.right);

    best = Math.max(best, left + right); // đường đi qua node này
    return 1 + Math.max(left, right);
  }

  height(root);
  return best;
}
// <<< SOLUTION

test('543. Diameter of Binary Tree', (a) => diameterOfBinaryTree(buildTree(a)), [
  [[[1, 2, 3, 4, 5]], 3],
  [[[1, 2]], 1],
  [[[]], 0],
  [[[1]], 0],
  [[[4, -7, -3, null, null, -9, -3, 9, -7, -4, null, 6, null, -6, -6]], 5],
]);

module.exports = { diameterOfBinaryTree };
