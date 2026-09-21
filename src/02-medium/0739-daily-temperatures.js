'use strict';
/**
 * 739. Daily Temperatures - Medium
 * https://leetcode.com/problems/daily-temperatures/
 *
 * Đề bài: answer[i] = phải chờ bao nhiêu ngày kể từ ngày i để gặp ngày ẤM HƠN.
 * Không có thì bằng 0.
 *
 * Ý tưởng: NGĂN XẾP ĐƠN ĐIỆU (monotonic stack) - khuôn mẫu cho mọi bài dạng
 * "phần tử lớn hơn/nhỏ hơn kế tiếp". Ta giữ một stack các CHỈ SỐ có nhiệt độ
 * giảm dần. Khi gặp ngày nóng hơn đỉnh stack, ngày đó chính là câu trả lời cho
 * đỉnh -> pop ra và ghi kết quả. Mỗi chỉ số vào và ra stack đúng một lần -> O(n).
 *
 * Độ phức tạp: O(n) thời gian, O(n) bộ nhớ.
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
function dailyTemperatures(temperatures) {
  const answer = new Array(temperatures.length).fill(0);
  const stack = []; // chứa CHỈ SỐ, nhiệt độ giảm dần từ đáy lên đỉnh

  for (let i = 0; i < temperatures.length; i++) {
    while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
      const prev = stack.pop();
      answer[prev] = i - prev;
    }
    stack.push(i);
  }

  return answer; // các chỉ số còn kẹt trong stack giữ giá trị 0
}
// <<< SOLUTION

test('739. Daily Temperatures', dailyTemperatures, [
  [[[73, 74, 75, 71, 69, 72, 76, 73]], [1, 1, 4, 2, 1, 1, 0, 0]],
  [[[30, 40, 50, 60]], [1, 1, 1, 0]],
  [[[30, 60, 90]], [1, 1, 0]],
  [[[90, 80, 70]], [0, 0, 0]],
  [[[50]], [0]],
]);

module.exports = { dailyTemperatures };
