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
const { test } = require('../lib/test');
const { buildList, listToArray } = require('../lib/ds');

// >>> SOLUTION
// TODO: tu viet loi giai o day.
// Dap an goc: src/01-easy/0206-reverse-linked-list.js

function reverseList(head) {
  // TODO
  let prev = null;
  let curr = head;

  while (curr) {
    const next = curr.next; // lưu tạm node tiếp theo
    curr.next = prev; // đảo hướng con trỏ
    prev = curr; // di chuyển prev lên curr
    curr = next; // di chuyển curr lên node tiếp theo
  }

  return prev; // prev là node mới đầu danh sách

}

function reverseListRecursive(head) {
  // TODO
  if (!head || !head.next) return head; // base case: danh sách rỗng hoặc chỉ 1 node

  const newHead = reverseListRecursive(head.next); // đảo ngược phần còn lại
  head.next.next = head; // lật hướng con trỏ
  head.next = null; // cắt đuôi cũ

  return newHead; // trả về node đầu mới
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
