'use strict';
/**
 * 124. Binary Tree Maximum Path Sum - Hard
 * https://leetcode.com/problems/binary-tree-maximum-path-sum/
 *
 * Đề bài: Đường đi là dãy node nối nhau bằng cạnh, KHÔNG cần qua gốc và không
 * được lặp node. Tìm tổng giá trị lớn nhất của một đường đi.
 *
 * Ý tưởng: Cùng khuôn mẫu với bài 543 (Diameter) nhưng khó hơn vì có số ÂM.
 * Phân biệt rõ hai đại lượng - đây là điểm mấu chốt:
 *   - "Đóng góp" mà một node trả VỀ CHO CHA: node.val + nhánh con TỐT NHẤT
 *     (chỉ một nhánh, vì đường đi không thể rẽ hai hướng rồi đi tiếp lên cha).
 *   - "Đáp án" xét tại node: node.val + CẢ HAI nhánh (đường đi vòng qua node này).
 * Nhánh nào đóng góp ÂM thì cắt bỏ bằng Math.max(..., 0) - thà không đi còn hơn.
 *
 * Khởi tạo best = -Infinity chứ không phải 0, vì cây có thể toàn số âm.
 *
 * Độ phức tạp: O(n) thời gian, O(h) bộ nhớ.
 */
const { test } = require('../../lib/test');
const { buildTree } = require('../../lib/ds');

// >>> SOLUTION
function maxPathSum(root) {
  let best = -Infinity;

  function gain(node) {
    if (node === null) return 0;

    const left = Math.max(gain(node.left), 0);   // nhánh âm -> bỏ
    const right = Math.max(gain(node.right), 0);

    best = Math.max(best, node.val + left + right); // đường vòng qua node

    return node.val + Math.max(left, right); // trả cho cha: chỉ một nhánh
  }

  gain(root);
  return best;
}
// <<< SOLUTION

test('124. Binary Tree Maximum Path Sum', (a) => maxPathSum(buildTree(a)), [
  [[[1, 2, 3]], 6],
  [[[-10, 9, 20, null, null, 15, 7]], 42],
  [[[-3]], -3],
  [[[2, -1]], 2],
  [[[-2, -1]], -1],
  [[[1, -2, -3, 1, 3, -2, null, -1]], 3],
]);

module.exports = { maxPathSum };
