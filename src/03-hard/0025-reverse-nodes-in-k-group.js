'use strict';
/**
 * 25. Reverse Nodes in k-Group - Hard
 * https://leetcode.com/problems/reverse-nodes-in-k-group/
 *
 * Đề bài: Đảo ngược danh sách theo từng nhóm k node. Nhóm cuối nếu KHÔNG ĐỦ k
 * node thì giữ nguyên.
 *
 * Ý tưởng: Lặp theo từng nhóm. Mỗi vòng:
 *   1) Từ groupPrev đếm tới node thứ k. Không đủ -> dừng, giữ nguyên phần đuôi.
 *   2) Đảo ngược đoạn [groupPrev.next .. kth] bằng thủ thuật bài 206, nhưng khởi
 *      tạo prev = groupNext (node ngay sau nhóm) để đuôi nhóm tự nối đúng chỗ.
 *   3) Nối lại: groupPrev.next = kth, và groupPrev mới là đầu cũ của nhóm
 *      (sau khi đảo nó thành đuôi nhóm).
 * Dùng dummy node để không phải xử lý riêng nhóm đầu tiên.
 *
 * Độ phức tạp: O(n) thời gian, O(1) bộ nhớ.
 */
const { test } = require('../../lib/test');
const { ListNode, buildList, listToArray } = require('../../lib/ds');

// >>> SOLUTION
function reverseKGroup(head, k) {
  const dummy = new ListNode(0, head);
  let groupPrev = dummy;

  while (true) {
    // 1) tìm node thứ k tính từ groupPrev
    let kth = groupPrev;
    for (let i = 0; i < k && kth !== null; i++) kth = kth.next;
    if (kth === null) break; // không đủ k node -> giữ nguyên

    const groupNext = kth.next;

    // 2) đảo ngược nhóm hiện tại
    let prev = groupNext;
    let curr = groupPrev.next;
    while (curr !== groupNext) {
      const next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    }

    // 3) nối lại và chuyển sang nhóm sau
    const newGroupPrev = groupPrev.next; // đầu cũ, giờ là đuôi nhóm
    groupPrev.next = kth;
    groupPrev = newGroupPrev;
  }

  return dummy.next;
}
// <<< SOLUTION

const run = (arr, k) => listToArray(reverseKGroup(buildList(arr), k));

test('25. Reverse Nodes in k-Group', run, [
  [[[1, 2, 3, 4, 5], 2], [2, 1, 4, 3, 5]],
  [[[1, 2, 3, 4, 5], 3], [3, 2, 1, 4, 5]],
  [[[1, 2, 3, 4, 5], 1], [1, 2, 3, 4, 5]],
  [[[1, 2, 3, 4, 5], 5], [5, 4, 3, 2, 1]],
  [[[1], 2], [1]],
  [[[], 3], []],
]);

module.exports = { reverseKGroup };
