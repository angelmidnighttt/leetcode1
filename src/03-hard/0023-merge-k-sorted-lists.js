'use strict';
/**
 * 23. Merge k Sorted Lists - Hard
 * https://leetcode.com/problems/merge-k-sorted-lists/
 *
 * Đề bài: Trộn k danh sách liên kết đã sắp xếp thành một danh sách sắp xếp.
 *
 * Ý tưởng: Trộn lần lượt từng list vào kết quả là O(k*N) - chậm, vì list kết quả
 * bị duyệt lại nhiều lần. Cách tốt: CHIA ĐỂ TRỊ - ghép từng cặp list với nhau,
 * mỗi vòng số list giảm một nửa. Sau log(k) vòng còn đúng 1 list, và mỗi vòng
 * chạm mỗi phần tử một lần -> O(N log k).
 *
 * Cách khác cùng độ phức tạp: min-heap kích thước k, luôn lấy node nhỏ nhất.
 * JS không có heap sẵn nên chia để trị gọn hơn khi code tay.
 *
 * Độ phức tạp: O(N log k) thời gian (N = tổng số node), O(1) bộ nhớ phụ.
 */
const { test } = require('../../lib/test');
const { ListNode, buildList, listToArray } = require('../../lib/ds');

// >>> SOLUTION
function mergeTwoLists(a, b) {
  const dummy = new ListNode(0);
  let tail = dummy;

  while (a !== null && b !== null) {
    if (a.val <= b.val) {
      tail.next = a;
      a = a.next;
    } else {
      tail.next = b;
      b = b.next;
    }
    tail = tail.next;
  }

  tail.next = a || b;
  return dummy.next;
}

function mergeKLists(lists) {
  if (!lists || lists.length === 0) return null;

  let current = lists;
  while (current.length > 1) {
    const merged = [];
    for (let i = 0; i < current.length; i += 2) {
      const second = i + 1 < current.length ? current[i + 1] : null;
      merged.push(mergeTwoLists(current[i], second));
    }
    current = merged;
  }

  return current[0];
}
// <<< SOLUTION

const run = (arrays) => listToArray(mergeKLists(arrays.map(buildList)));

test('23. Merge k Sorted Lists', run, [
  [[[[1, 4, 5], [1, 3, 4], [2, 6]]], [1, 1, 2, 3, 4, 4, 5, 6]],
  [[[]], []],
  [[[[]]], []],
  [[[[1], [0]]], [0, 1]],
  [[[[], [1], []]], [1]],
  [[[[2], [1], [3]]], [1, 2, 3]],
]);

module.exports = { mergeKLists };
