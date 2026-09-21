'use strict';
/**
 * 295. Find Median from Data Stream - Hard
 * https://leetcode.com/problems/find-median-from-data-stream/
 *
 * Đề bài: Thiết kế cấu trúc nhận số liên tục và trả về TRUNG VỊ bất cứ lúc nào.
 *
 * Ý tưởng: HAI HEAP. Chia dãy số thành hai nửa:
 *   - `low`  : max-heap giữ nửa NHỎ  -> đỉnh là số lớn nhất của nửa nhỏ
 *   - `high` : min-heap giữ nửa LỚN  -> đỉnh là số nhỏ nhất của nửa lớn
 * Trung vị luôn nằm ngay ở hai đỉnh này. Giữ bất biến:
 *   mọi phần tử low <= mọi phần tử high, và  low.size === high.size hoặc +1.
 *
 * Mẹo thêm số mà luôn đúng bất biến: đẩy vào low, lấy đỉnh low chuyển sang high,
 * rồi nếu high đông hơn thì chuyển ngược một phần tử lại.
 *
 * JavaScript không có heap sẵn nên bên dưới có luôn một lớp Heap nhị phân
 * dùng chung được cho nhiều bài khác.
 *
 * Độ phức tạp: addNum O(log n), findMedian O(1), bộ nhớ O(n).
 */
const { suite } = require('../../lib/test');

// >>> SOLUTION
class Heap {
  // compare(a, b) < 0 nghĩa là a được ưu tiên đứng trên b
  constructor(compare) {
    this.data = [];
    this.compare = compare;
  }

  get size() {
    return this.data.length;
  }

  peek() {
    return this.data[0];
  }

  push(value) {
    this.data.push(value);
    this._siftUp(this.data.length - 1);
  }

  pop() {
    const top = this.data[0];
    const last = this.data.pop();
    if (this.data.length > 0) {
      this.data[0] = last;
      this._siftDown(0);
    }
    return top;
  }

  _siftUp(i) {
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (this.compare(this.data[i], this.data[parent]) >= 0) break;
      [this.data[i], this.data[parent]] = [this.data[parent], this.data[i]];
      i = parent;
    }
  }

  _siftDown(i) {
    const n = this.data.length;
    while (true) {
      const left = 2 * i + 1;
      const right = left + 1;
      let best = i;

      if (left < n && this.compare(this.data[left], this.data[best]) < 0) best = left;
      if (right < n && this.compare(this.data[right], this.data[best]) < 0) best = right;
      if (best === i) break;

      [this.data[i], this.data[best]] = [this.data[best], this.data[i]];
      i = best;
    }
  }
}

class MedianFinder {
  constructor() {
    this.low = new Heap((a, b) => b - a);  // max-heap: nửa nhỏ
    this.high = new Heap((a, b) => a - b); // min-heap: nửa lớn
  }

  addNum(num) {
    this.low.push(num);
    this.high.push(this.low.pop());          // giữ thứ tự giữa hai nửa
    if (this.high.size > this.low.size) {
      this.low.push(this.high.pop());        // giữ cân bằng kích thước
    }
  }

  findMedian() {
    if (this.low.size > this.high.size) return this.low.peek();
    return (this.low.peek() + this.high.peek()) / 2;
  }
}
// <<< SOLUTION

function simulate(ops) {
  const mf = new MedianFinder();
  const out = [];
  for (const [name, arg] of ops) {
    if (name === 'add') mf.addNum(arg);
    else out.push(mf.findMedian());
  }
  return out;
}

suite('295. Find Median from Data Stream', [
  [
    'ví dụ trong đề',
    () => simulate([['add', 1], ['add', 2], ['median'], ['add', 3], ['median']]),
    [1.5, 2],
  ],
  ['một phần tử', () => simulate([['add', 5], ['median']]), [5]],
  [
    'số âm và thứ tự ngẫu nhiên',
    () => simulate([['add', -1], ['median'], ['add', -2], ['median'], ['add', -3], ['median']]),
    [-1, -1.5, -2],
  ],
  [
    'dãy 1..10 thêm ngược',
    () => simulate([...[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((n) => ['add', n]), ['median']]),
    [5.5],
  ],
]);

module.exports = { MedianFinder, Heap };
