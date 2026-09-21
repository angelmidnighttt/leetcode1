'use strict';
/**
 * 143. Reorder List - Medium - https://leetcode.com/problems/reorder-list/
 *
 * Đề bài: Biến L0 -> L1 -> ... -> Ln thành L0 -> Ln -> L1 -> Ln-1 -> ...
 * Phải đổi liên kết, không được đổi giá trị.
 *
 * Ý tưởng: Ghép 3 kỹ thuật linked list cơ bản - bài này là "bài tổng hợp" rất
 * hay để ôn:
 *   1) Tìm GIỮA danh sách bằng rùa/thỏ (bài 876).
 *   2) ĐẢO NGƯỢC nửa sau (bài 206).
 *   3) TRỘN XEN KẼ hai nửa.
 *
 * Độ phức tạp: O(n) thời gian, O(1) bộ nhớ.
 */
const { test } = require('../../lib/test');
const { buildList, listToArray } = require('../../lib/ds');

// >>> SOLUTION
function reorderList(head) {
  if (head === null || head.next === null) return head;

  // 1) tìm giữa: khi fast tới cuối thì slow ở giữa
  let slow = head;
  let fast = head;
  while (fast.next !== null && fast.next.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // 2) đảo ngược nửa sau, đồng thời cắt rời khỏi nửa đầu
  let second = slow.next;
  slow.next = null;
  let prev = null;
  while (second !== null) {
    const next = second.next;
    second.next = prev;
    prev = second;
    second = next;
  }

  // 3) trộn xen kẽ nửa đầu và nửa sau đã đảo
  let first = head;
  second = prev;
  while (second !== null) {
    const n1 = first.next;
    const n2 = second.next;
    first.next = second;
    second.next = n1;
    first = n1;
    second = n2;
  }

  return head;
}
// <<< SOLUTION

const run = (arr) => listToArray(reorderList(buildList(arr)));

test('143. Reorder List', run, [
  [[[1, 2, 3, 4]], [1, 4, 2, 3]],
  [[[1, 2, 3, 4, 5]], [1, 5, 2, 4, 3]],
  [[[1, 2]], [1, 2]],
  [[[1]], [1]],
  [[[1, 2, 3]], [1, 3, 2]],
]);

module.exports = { reorderList };
