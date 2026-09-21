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
const { test } = require('../../lib/test');

// >>> SOLUTION
function majorityElement(nums) {
  let candidate = null;
  let count = 0;

  for (const n of nums) {
    if (count === 0) candidate = n;
    count += n === candidate ? 1 : -1;
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
