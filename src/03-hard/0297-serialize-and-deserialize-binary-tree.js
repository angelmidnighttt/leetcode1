'use strict';
/**
 * 297. Serialize and Deserialize Binary Tree - Hard
 * https://leetcode.com/problems/serialize-and-deserialize-binary-tree/
 *
 * Đề bài: Viết hai hàm biến cây nhị phân thành chuỗi và khôi phục lại y nguyên.
 *
 * Ý tưởng: Điểm mấu chốt - chỉ ghi giá trị các node là KHÔNG ĐỦ để khôi phục cây
 * (nhiều cây khác nhau cho cùng một chuỗi preorder). Phải ghi cả các Ô TRỐNG.
 * Với preorder có đánh dấu null ('#'), cấu trúc cây được xác định duy nhất.
 *
 * serialize:   DFS preorder, gặp null thì ghi '#'.
 * deserialize: đọc chuỗi theo đúng thứ tự đó bằng một con trỏ chạy; gặp '#' trả
 *              null, ngược lại tạo node rồi đệ quy dựng con trái TRƯỚC, con phải SAU
 *              - đúng thứ tự lúc ghi.
 *
 * Độ phức tạp: O(n) cho cả hai chiều, O(n) bộ nhớ.
 */
const { test } = require('../../lib/test');
const { TreeNode, buildTree, treeToArray } = require('../../lib/ds');

// >>> SOLUTION
const NULL_MARK = '#';

function serialize(root) {
  const parts = [];

  function dfs(node) {
    if (node === null) {
      parts.push(NULL_MARK);
      return;
    }
    parts.push(String(node.val));
    dfs(node.left);
    dfs(node.right);
  }

  dfs(root);
  return parts.join(',');
}

function deserialize(data) {
  const parts = data.split(',');
  let index = 0;

  function build() {
    const token = parts[index++];
    if (token === NULL_MARK) return null;

    const node = new TreeNode(Number(token));
    node.left = build();
    node.right = build();
    return node;
  }

  return build();
}
// <<< SOLUTION

// Đi một vòng: mảng -> cây -> chuỗi -> cây -> mảng. Ra đúng mảng ban đầu là đạt.
const roundTrip = (arr) => treeToArray(deserialize(serialize(buildTree(arr))));

test('297. Serialize and Deserialize Binary Tree', roundTrip, [
  [[[1, 2, 3, null, null, 4, 5]], [1, 2, 3, null, null, 4, 5]],
  [[[]], []],
  [[[1]], [1]],
  [[[1, 2]], [1, 2]],
  [[[1, null, 2]], [1, null, 2]],
  [[[-1, 0, 1]], [-1, 0, 1]],
  [[[5, 2, 3, null, null, 2, 4, 3, 1]], [5, 2, 3, null, null, 2, 4, 3, 1]],
]);

test('297. Chuỗi sinh ra đúng định dạng', (arr) => serialize(buildTree(arr)), [
  [[[1, 2, 3]], '1,2,#,#,3,#,#'],
  [[[]], '#'],
]);

module.exports = { serialize, deserialize };
