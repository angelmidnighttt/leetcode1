'use strict';
/**
 * 39. Combination Sum - Medium - https://leetcode.com/problems/combination-sum/
 *
 * Đề bài: Cho mảng số nguyên dương phân biệt và target. Tìm mọi tổ hợp có tổng
 * bằng target. MỖI SỐ ĐƯỢC DÙNG LẠI KHÔNG GIỚI HẠN LẦN. Hai tổ hợp khác nhau
 * nếu số lần dùng của ít nhất một số khác nhau.
 *
 * Ý tưởng: Backtracking. Mấu chốt để không sinh tổ hợp trùng (như [2,3] và [3,2])
 * là truyền `start`: ở mỗi nhánh chỉ được chọn các số từ vị trí start trở đi.
 * Vì được dùng lại số hiện tại nên gọi đệ quy với chính `i`, không phải `i + 1`.
 *
 * Độ phức tạp: O(n^(target/min)) trong trường hợp xấu, O(target/min) ngăn xếp.
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
function combinationSum(candidates, target) {
  const result = [];
  const path = [];
  const nums = [...candidates].sort((a, b) => a - b); // sắp xếp để cắt nhánh sớm

  function backtrack(start, remain) {
    if (remain === 0) {
      result.push([...path]); // nhớ COPY, không push thẳng path
      return;
    }

    for (let i = start; i < nums.length; i++) {
      if (nums[i] > remain) break; // đã sắp xếp nên các số sau còn lớn hơn

      path.push(nums[i]);
      backtrack(i, remain - nums[i]); // i chứ không phải i+1: được dùng lại
      path.pop();
    }
  }

  backtrack(0, target);
  return result;
}
// <<< SOLUTION

test('39. Combination Sum', combinationSum, [
  [[[2, 3, 6, 7], 7], [[2, 2, 3], [7]], 'sorted2d'],
  [[[2, 3, 5], 8], [[2, 2, 2, 2], [2, 3, 3], [3, 5]], 'sorted2d'],
  [[[2], 1], []],
  [[[7, 3, 2], 18], null, (a) => a.every((c) => c.reduce((x, y) => x + y, 0) === 18)],
]);

module.exports = { combinationSum };
