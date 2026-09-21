'use strict';
/**
 * 21. Merge Two Sorted Lists - Easy - https://leetcode.com/problems/merge-two-sorted-lists/
 *
 * Đề bài: Cho đầu của hai danh sách liên kết đã sắp tăng dần. Nối chúng thành một
 * danh sách sắp tăng dần (dùng lại chính các node cũ) và trả về đầu danh sách mới.
 *
 * Ý tưởng: Kỹ thuật "dummy node" - tạo một node giả đứng trước kết quả để không
 * phải viết trường hợp đặc biệt cho phần tử đầu. Mỗi bước lấy node nhỏ hơn trong
 * hai danh sách nối vào đuôi. Hết vòng lặp, phần còn lại nối thẳng vào.
 *
 * Độ phức tạp: O(m + n) thời gian, O(1) bộ nhớ.
 */
const { test } = require('../../lib/test');
const { ListNode, buildList, listToArray } = require('../../lib/ds');

// >>> SOLUTION
function mergeTwoLists(list1, list2) {
  const dummy = new ListNode(0);
  let tail = dummy;

  while (list1 && list2) {
    if (list1.val <= list2.val) {
      tail.next = list1;
      list1 = list1.next;
    } else {
      tail.next = list2;
      list2 = list2.next;
    }
    tail = tail.next;
  }

  tail.next = list1 || list2; // nối nốt phần còn dư
  return dummy.next;
}
// <<< SOLUTION

const run = (a, b) => listToArray(mergeTwoLists(buildList(a), buildList(b)));

test('21. Merge Two Sorted Lists', run, [
  [[[1, 2, 4], [1, 3, 4]], [1, 1, 2, 3, 4, 4]],
  [[[], []], []],
  [[[], [0]], [0]],
  [[[5], [1, 2, 3]], [1, 2, 3, 5]],
]);

module.exports = { mergeTwoLists };
