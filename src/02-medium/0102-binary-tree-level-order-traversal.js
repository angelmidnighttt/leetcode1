'use strict';
/**
 * 102. Binary Tree Level Order Traversal - Medium
 * https://leetcode.com/problems/binary-tree-level-order-traversal/
 *
 * Đề bài: Trả về giá trị các node theo từng TẦNG, mỗi tầng là một mảng con.
 *
 * Ý tưởng: BFS bằng hàng đợi. Mẹo để biết ranh giới tầng: trước mỗi vòng lặp,
 * ghi lại SỐ LƯỢNG node đang có trong hàng đợi - đó đúng bằng số node của tầng
 * hiện tại. Xử lý đúng bấy nhiêu node rồi đóng tầng lại.
 *
 * Lưu ý hiệu năng: array.shift() là O(n) trong JS. Với dữ liệu lớn nên dùng con
 * trỏ head như bên dưới, hoặc thay bằng "mảng tầng này -> mảng tầng sau".
 *
 * Độ phức tạp: O(n) thời gian, O(n) bộ nhớ.
 */
const { test } = require('../../lib/test');
const { buildTree } = require('../../lib/ds');

// >>> SOLUTION
function levelOrder(root) {
  if (root === null) return [];

  const result = [];
  const queue = [root];
  let head = 0; // con trỏ thay cho shift()

  while (head < queue.length) {
    const levelSize = queue.length - head;
    const level = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue[head++];
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(level);
  }

  return result;
}
// <<< SOLUTION

test('102. Binary Tree Level Order Traversal', (a) => levelOrder(buildTree(a)), [
  [[[3, 9, 20, null, null, 15, 7]], [[3], [9, 20], [15, 7]]],
  [[[1]], [[1]]],
  [[[]], []],
  [[[1, 2, 3, 4, null, null, 5]], [[1], [2, 3], [4, 5]]],
]);

module.exports = { levelOrder };
