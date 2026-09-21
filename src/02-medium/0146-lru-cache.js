'use strict';
/**
 * 146. LRU Cache - Medium - https://leetcode.com/problems/lru-cache/
 *
 * Đề bài: Thiết kế cache dung lượng cố định, get và put đều phải O(1).
 * Khi đầy thì loại bỏ phần tử LÂU NHẤT CHƯA DÙNG (Least Recently Used).
 *
 * Ý tưởng: Lời giải kinh điển là Hash Map + danh sách liên kết đôi (map cho tra
 * cứu O(1), list cho việc đổi thứ tự O(1)). Trong JavaScript ta được tặng không:
 * `Map` GIỮ NGUYÊN THỨ TỰ CHÈN, và khoá chèn đầu tiên chính là khoá cũ nhất.
 *   - Mỗi lần truy cập: delete rồi set lại -> khoá nhảy xuống cuối (mới nhất).
 *   - Khi vượt dung lượng: xoá map.keys().next().value (khoá đầu tiên = cũ nhất).
 *
 * Nếu phỏng vấn yêu cầu "không dùng thư viện có sẵn", hãy trình bày cách
 * map + doubly linked list; nhưng nên nói rõ mình biết mẹo Map này.
 *
 * Độ phức tạp: O(1) trung bình cho cả get lẫn put, O(capacity) bộ nhớ.
 */
const { suite } = require('../../lib/test');

// >>> SOLUTION
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
  }

  get(key) {
    if (!this.map.has(key)) return -1;

    const value = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, value); // đánh dấu vừa dùng
    return value;
  }

  put(key, value) {
    if (this.map.has(key)) this.map.delete(key); // để set lại xuống cuối
    this.map.set(key, value);

    if (this.map.size > this.capacity) {
      const oldestKey = this.map.keys().next().value;
      this.map.delete(oldestKey);
    }
  }
}
// <<< SOLUTION

/* Mô phỏng chuỗi thao tác giống LeetCode và thu lại kết quả các lần get */
function simulate(capacity, ops) {
  const cache = new LRUCache(capacity);
  const out = [];
  for (const [name, ...args] of ops) {
    if (name === 'get') out.push(cache.get(args[0]));
    else cache.put(args[0], args[1]);
  }
  return out;
}

suite('146. LRU Cache', [
  [
    'ví dụ trong đề',
    () =>
      simulate(2, [
        ['put', 1, 1], ['put', 2, 2], ['get', 1],
        ['put', 3, 3], ['get', 2],
        ['put', 4, 4], ['get', 1], ['get', 3], ['get', 4],
      ]),
    [1, -1, -1, 3, 4],
  ],
  ['dung lượng 1', () => simulate(1, [['put', 2, 1], ['get', 2], ['put', 3, 2], ['get', 2], ['get', 3]]), [1, -1, 2]],
  ['ghi đè khoá cũ', () => simulate(2, [['put', 1, 1], ['put', 1, 5], ['get', 1]]), [5]],
  [
    'get làm mới thứ tự',
    () => simulate(2, [['put', 1, 1], ['put', 2, 2], ['get', 1], ['put', 3, 3], ['get', 1], ['get', 2]]),
    [1, 1, -1],
  ],
]);

module.exports = { LRUCache };
