'use strict';
/**
 * 78. Subsets - Medium - https://leetcode.com/problems/subsets/
 *
 * Đề bài: Liệt kê mọi tập con (power set) của mảng số phân biệt.
 *
 * Ý tưởng: Với mỗi phần tử ta có đúng 2 lựa chọn: lấy hoặc không lấy -> 2^n tập con.
 * Backtracking với `start` để không sinh trùng. Điểm khác bài Combination Sum:
 * ở ĐÂY MỌI node của cây đệ quy đều là một đáp án, không chỉ node lá.
 *
 * Cách 2 (lặp, rất gọn): bắt đầu với [[]], với mỗi số thì nhân đôi danh sách
 * hiện có bằng cách thêm số đó vào mỗi tập con.
 *
 * Độ phức tạp: O(2^n * n) thời gian, O(n) ngăn xếp.
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
function subsets(nums) {
  const result = [];
  const path = [];

  function backtrack(start) {
    result.push([...path]); // mọi trạng thái đều là một tập con hợp lệ

    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(i + 1);
      path.pop();
    }
  }

  backtrack(0);
  return result;
}

// Cách lặp
function subsetsIterative(nums) {
  let result = [[]];
  for (const n of nums) {
    result = result.concat(result.map((sub) => [...sub, n]));
  }
  return result;
}
// <<< SOLUTION

const cases = [
  [[[1, 2, 3]], [[], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]], 'sorted2d'],
  [[[0]], [[], [0]], 'sorted2d'],
  [[[]], [[]], 'sorted2d'],
  [[[1, 2, 3, 4]], null, (a) => a.length === 16],
];

test('78. Subsets', subsets, cases);
test('78. Subsets (lặp)', subsetsIterative, cases);

module.exports = { subsets, subsetsIterative };
