'use strict';
/**
 * 206. Reverse Linked List - Easy - https://leetcode.com/problems/reverse-linked-list/
 *
 * Đề bài: Đảo ngược danh sách liên kết đơn.
 *
 * Ý tưởng: Đi từ đầu tới cuối, lật hướng từng con trỏ next. Cần 3 biến:
 *   prev (phần đã đảo), curr (node đang xử lý), next (lưu tạm để không mất đuôi).
 * Đây là bài phải thuộc lòng - rất nhiều bài linked list khác dùng lại nó.
 *
 * Độ phức tạp: O(n) thời gian, O(1) bộ nhớ.
 */
const { test } = require('../../lib/test');
const { buildList, listToArray } = require('../../lib/ds');

// >>> SOLUTION
function reverseList(head) {
  let prev = null;
  let curr = head;

  while (curr !== null) {
    const next = curr.next; // nhớ phần còn lại trước khi cắt
    curr.next = prev;       // lật hướng
    prev = curr;            // dịch prev
    curr = next;            // dịch curr
  }

  return prev; // prev là đầu mới
}

// Cách 2: đệ quy - ngắn nhưng tốn O(n) ngăn xếp
function reverseListRecursive(head) {
  if (head === null || head.next === null) return head;

  const newHead = reverseListRecursive(head.next);
  head.next.next = head; // node sau trỏ ngược về node này
  head.next = null;
  return newHead;
}
// <<< SOLUTION

test('206. Reverse Linked List', (a) => listToArray(reverseList(buildList(a))), [
  [[[1, 2, 3, 4, 5]], [5, 4, 3, 2, 1]],
  [[[1, 2]], [2, 1]],
  [[[]], []],
  [[[7]], [7]],
]);

test('206. Reverse Linked List (đệ quy)', (a) => listToArray(reverseListRecursive(buildList(a))), [
  [[[1, 2, 3, 4, 5]], [5, 4, 3, 2, 1]],
  [[[]], []],
]);

module.exports = { reverseList, reverseListRecursive };
