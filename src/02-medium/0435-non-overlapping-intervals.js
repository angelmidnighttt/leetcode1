'use strict';
/**
 * 435. Non-overlapping Intervals - Medium
 * https://leetcode.com/problems/non-overlapping-intervals/
 *
 * Đề bài: Cần XOÁ ít nhất bao nhiêu khoảng để các khoảng còn lại không chồng lấn?
 *
 * Ý tưởng: Đổi góc nhìn - thay vì "xoá ít nhất", hãy hỏi "GIỮ LẠI nhiều nhất bao
 * nhiêu khoảng không chồng lấn?". Đây là bài lập lịch hoạt động kinh điển: sắp
 * xếp theo ĐIỂM KẾT THÚC tăng dần rồi tham lam lấy khoảng nào kết thúc sớm nhất
 * mà còn dùng được. Kết thúc sớm chừa lại nhiều chỗ nhất cho phần sau.
 *
 * Đáp án = tổng số khoảng - số khoảng giữ lại.
 * (Lưu ý sắp theo điểm BẮT ĐẦU là sai; phải theo điểm KẾT THÚC.)
 *
 * Độ phức tạp: O(n log n) thời gian, O(1) bộ nhớ phụ.
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
function eraseOverlapIntervals(intervals) {
  if (intervals.length === 0) return 0;

  const sorted = [...intervals].sort((a, b) => a[1] - b[1]);
  let kept = 1;
  let lastEnd = sorted[0][1];

  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i][0] >= lastEnd) { // không chồng lấn -> giữ lại
      kept++;
      lastEnd = sorted[i][1];
    }
  }

  return intervals.length - kept;
}
// <<< SOLUTION

test('435. Non-overlapping Intervals', eraseOverlapIntervals, [
  [[[[1, 2], [2, 3], [3, 4], [1, 3]]], 1],
  [[[[1, 2], [1, 2], [1, 2]]], 2],
  [[[[1, 2], [2, 3]]], 0],
  [[[]], 0],
  [[[[1, 100], [11, 22], [1, 11], [2, 12]]], 2],
]);

module.exports = { eraseOverlapIntervals };
