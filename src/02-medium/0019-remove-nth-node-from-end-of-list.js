'use strict';
/**
 * 19. Remove Nth Node From End of List - Medium
 * https://leetcode.com/problems/remove-nth-node-from-end-of-list/
 *
 * Đề bài: Xoá node thứ n TÍNH TỪ CUỐI danh sách, trả về đầu danh sách.
 * Yêu cầu nâng cao: chỉ duyệt một lượt.
 *
 * Ý tưởng: Hai con trỏ cách nhau đúng n bước. Cho con trỏ nhanh đi trước n bước,
 * rồi cho cả hai cùng đi. Khi con nhanh chạm cuối, con chậm đang đứng NGAY TRƯỚC
 * node cần xoá. Dùng dummy node để xử lý gọn trường hợp xoá chính node đầu.
 *
 * Độ phức tạp: O(L) thời gian một lượt, O(1) bộ nhớ.
 */
const { test } = require('../../lib/test');
const { ListNode, buildList, listToArray } = require('../../lib/ds');

// >>> SOLUTION
function removeNthFromEnd(head, n) {
  const dummy = new ListNode(0, head);
  let slow = dummy;
  let fast = dummy;

  for (let i = 0; i < n; i++) fast = fast.next; // tạo khoảng cách n

  while (fast.next !== null) {
    slow = slow.next;
    fast = fast.next;
  }

  slow.next = slow.next.next; // bỏ qua node cần xoá
  return dummy.next;
}
// <<< SOLUTION

const run = (arr, n) => listToArray(removeNthFromEnd(buildList(arr), n));

test('19. Remove Nth Node From End of List', run, [
  [[[1, 2, 3, 4, 5], 2], [1, 2, 3, 5]],
  [[[1], 1], []],
  [[[1, 2], 1], [1]],
  [[[1, 2], 2], [2]],
  [[[1, 2, 3], 3], [2, 3]],
]);

module.exports = { removeNthFromEnd };
