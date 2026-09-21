'use strict';
/**
 * 56. Merge Intervals - Medium - https://leetcode.com/problems/merge-intervals/
 *
 * Đề bài: Gộp mọi khoảng [start, end] chồng lấn nhau.
 *
 * Ý tưởng: Sắp xếp theo điểm bắt đầu. Sau khi sắp xếp, mỗi khoảng chỉ có thể
 * chồng lấn với khoảng vừa gộp trước đó. Duyệt tuyến tính: nếu start hiện tại
 * <= end của khoảng cuối trong kết quả thì nới end ra (lấy max), ngược lại đẩy
 * khoảng mới vào.
 *
 * Độ phức tạp: O(n log n) vì sắp xếp, O(n) bộ nhớ.
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
function merge(intervals) {
  if (intervals.length === 0) return [];

  const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
  const result = [sorted[0].slice()];

  for (let i = 1; i < sorted.length; i++) {
    const [start, end] = sorted[i];
    const last = result[result.length - 1];

    if (start <= last[1]) {
      last[1] = Math.max(last[1], end); // chồng lấn -> nới rộng
    } else {
      result.push([start, end]);
    }
  }

  return result;
}
// <<< SOLUTION

test('56. Merge Intervals', merge, [
  [[[[1, 3], [2, 6], [8, 10], [15, 18]]], [[1, 6], [8, 10], [15, 18]]],
  [[[[1, 4], [4, 5]]], [[1, 5]]],
  [[[[1, 4], [2, 3]]], [[1, 4]]],
  [[[[1, 4], [0, 4]]], [[0, 4]]],
  [[[[1, 2]]], [[1, 2]]],
  [[[]], []],
]);

module.exports = { merge };
