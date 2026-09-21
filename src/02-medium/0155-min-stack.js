'use strict';
/**
 * 155. Min Stack - Medium - https://leetcode.com/problems/min-stack/
 *
 * Đề bài: Thiết kế stack hỗ trợ push, pop, top và getMin - TẤT CẢ trong O(1).
 *
 * Ý tưởng: Không thể quét tìm min mỗi lần (O(n)). Mẹo: với mỗi phần tử, lưu kèm
 * "giá trị nhỏ nhất của stack TÍNH ĐẾN thời điểm phần tử đó được đẩy vào".
 * Khi pop, thông tin min của trạng thái trước tự động lộ ra ở phần tử bên dưới.
 *
 * Cách khác tiết kiệm hơn: dùng một stack phụ chỉ đẩy khi giá trị mới <= min hiện tại.
 *
 * Độ phức tạp: O(1) mọi thao tác, O(n) bộ nhớ.
 */
const { suite } = require('../../lib/test');

// >>> SOLUTION
class MinStack {
  constructor() {
    this.stack = []; // mỗi phần tử: { value, min }
  }

  push(val) {
    const min = this.stack.length === 0 ? val : Math.min(val, this.getMin());
    this.stack.push({ value: val, min });
  }

  pop() {
    this.stack.pop();
  }

  top() {
    return this.stack[this.stack.length - 1].value;
  }

  getMin() {
    return this.stack[this.stack.length - 1].min;
  }
}
// <<< SOLUTION

function simulate(ops) {
  const st = new MinStack();
  const out = [];
  for (const [name, arg] of ops) {
    if (name === 'push') st.push(arg);
    else if (name === 'pop') st.pop();
    else out.push(st[name]());
  }
  return out;
}

suite('155. Min Stack', [
  [
    'ví dụ trong đề',
    () =>
      simulate([
        ['push', -2], ['push', 0], ['push', -3],
        ['getMin'], ['pop'], ['top'], ['getMin'],
      ]),
    [-3, 0, -2],
  ],
  ['min lặp lại', () => simulate([['push', 1], ['push', 1], ['pop'], ['getMin']]), [1]],
  ['một phần tử', () => simulate([['push', 5], ['top'], ['getMin']]), [5, 5]],
  [
    'min tăng dần trở lại',
    () => simulate([['push', 3], ['push', 1], ['getMin'], ['pop'], ['getMin']]),
    [1, 3],
  ],
]);

module.exports = { MinStack };
