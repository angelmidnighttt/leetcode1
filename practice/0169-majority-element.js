'use strict';
/**
 * 169. Majority Element - Easy - https://leetcode.com/problems/majority-element/
 *
 * Đề bài: Tìm phần tử xuất hiện NHIỀU HƠN n/2 lần (đề đảm bảo luôn tồn tại).
 *
 * Ý tưởng: Thuật toán bỏ phiếu Boyer-Moore. Hình dung mỗi phần tử khác nhau
 * "triệt tiêu" lẫn nhau từng cặp. Vì ứng viên đa số chiếm hơn một nửa nên sau
 * khi triệt tiêu hết, nó vẫn còn sót lại. Giữ 1 ứng viên + 1 bộ đếm:
 *   đếm = 0 -> đổi ứng viên;  gặp đúng ứng viên -> +1;  khác -> -1.
 *
 * Độ phức tạp: O(n) thời gian, O(1) bộ nhớ (dùng Map cũng được nhưng tốn O(n)).
 */
const { test } = require('../lib/test');

// >>> SOLUTION
// TODO: tu viet loi giai o day.
// Dap an goc: src/01-easy/0169-majority-element.js

function majorityElement(nums) {
  // TODO
  let candidate = null;
  let count = 0;

  for (const num of nums) {
    if (count === 0) {
      candidate = num; // đổi ứng viên
      count = 1;
    } else if (num === candidate) {
      count++; // gặp đúng ứng viên
    } else {
      count--; // gặp khác ứng viên
    }
  }

  return candidate;
}

// <<< SOLUTION

test('169. Majority Element', majorityElement, [
  [[[3, 2, 3]], 3],
  [[[2, 2, 1, 1, 1, 2, 2]], 2],
  [[[1]], 1],
  [[[6, 5, 5]], 5],
]);

module.exports = { majorityElement };
