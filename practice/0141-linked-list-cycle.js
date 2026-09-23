'use strict';
/**
 * 141. Linked List Cycle - Easy - https://leetcode.com/problems/linked-list-cycle/
 *
 * Đề bài: Danh sách liên kết có chứa chu trình không?
 *
 * Ý tưởng: Thuật toán "rùa và thỏ" của Floyd. Cho con trỏ chậm đi 1 bước,
 * con trỏ nhanh đi 2 bước. Nếu có chu trình, con nhanh sẽ đuổi kịp con chậm
 * (mỗi vòng lặp khoảng cách giữa chúng giảm đúng 1). Không có chu trình thì
 * con nhanh sẽ chạm null.
 *
 * Độ phức tạp: O(n) thời gian, O(1) bộ nhớ (dùng Set cũng đúng nhưng tốn O(n)).
 */
const { test } = require('../lib/test');
const { buildCycleList } = require('../lib/ds');

// >>> SOLUTION
// TODO: tu viet loi giai o day.
// Dap an goc: src/01-easy/0141-linked-list-cycle.js

function hasCycle(head) {
  // TODO
  let slow = head;
  let fast = head;
  
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  
  return false;
}

// <<< SOLUTION

const run = (arr, pos) => hasCycle(buildCycleList(arr, pos));

test('141. Linked List Cycle', run, [
  [[[3, 2, 0, -4], 1], true],
  [[[1, 2], 0], true],
  [[[1], -1], false],
  [[[], -1], false],
  [[[1, 2, 3, 4, 5], 4], true],
  [[[1, 2, 3], -1], false],
]);

module.exports = { hasCycle };
