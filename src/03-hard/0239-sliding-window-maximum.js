'use strict';
/**
 * 239. Sliding Window Maximum - Hard
 * https://leetcode.com/problems/sliding-window-maximum/
 *
 * Đề bài: Cửa sổ kích thước k trượt từ trái sang phải. Trả về giá trị lớn nhất
 * của mỗi vị trí cửa sổ.
 *
 * Ý tưởng: HÀNG ĐỢI HAI ĐẦU ĐƠN ĐIỆU (monotonic deque) chứa CHỈ SỐ, với giá trị
 * giảm dần từ đầu tới cuối. Hai quy tắc:
 *   1) Trước khi thêm i, bỏ khỏi ĐUÔI mọi chỉ số có giá trị <= nums[i]. Chúng
 *      vĩnh viễn vô dụng: nằm trước i mà lại nhỏ hơn i, nên không bao giờ là max nữa.
 *   2) Bỏ khỏi ĐẦU chỉ số đã trượt ra khỏi cửa sổ (<= i - k).
 * Đầu hàng đợi luôn là max của cửa sổ hiện tại. Mỗi chỉ số vào/ra đúng một lần -> O(n).
 *
 * Lưu ý JS: array.shift() là O(n). Ở đây ta dùng con trỏ `head` để giữ đúng O(n).
 *
 * Độ phức tạp: O(n) thời gian, O(k) bộ nhớ hữu ích.
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
function maxSlidingWindow(nums, k) {
  const result = [];
  const deque = []; // chỉ số, giá trị giảm dần
  let head = 0;     // thay cho shift()

  for (let i = 0; i < nums.length; i++) {
    // 1) bỏ đuôi những chỉ số nhỏ hơn hoặc bằng nums[i]
    while (deque.length > head && nums[deque[deque.length - 1]] <= nums[i]) {
      deque.pop();
    }
    deque.push(i);

    // 2) bỏ đầu nếu đã trượt khỏi cửa sổ
    if (deque[head] <= i - k) head++;

    if (i >= k - 1) result.push(nums[deque[head]]);
  }

  return result;
}
// <<< SOLUTION

test('239. Sliding Window Maximum', maxSlidingWindow, [
  [[[1, 3, -1, -3, 5, 3, 6, 7], 3], [3, 3, 5, 5, 6, 7]],
  [[[1], 1], [1]],
  [[[1, -1], 1], [1, -1]],
  [[[9, 11], 2], [11]],
  [[[4, -2], 2], [4]],
  [[[7, 2, 4], 2], [7, 4]],
]);

module.exports = { maxSlidingWindow };
