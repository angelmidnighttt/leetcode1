'use strict';
/**
 * 46. Permutations - Medium - https://leetcode.com/problems/permutations/
 *
 * Đề bài: Liệt kê mọi hoán vị của mảng số phân biệt.
 *
 * Ý tưởng: Backtracking với mảng đánh dấu `used`. Khác với bài tổ hợp (dùng
 * `start` để ép thứ tự tăng), hoán vị cần thử MỌI phần tử chưa dùng ở mỗi vị trí,
 * nên ta duyệt lại từ đầu và bỏ qua phần tử đã nằm trong path.
 *
 * Độ phức tạp: O(n! * n) thời gian, O(n) ngăn xếp.
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
function permute(nums) {
  const result = [];
  const path = [];
  const used = new Array(nums.length).fill(false);

  function backtrack() {
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;

      used[i] = true;
      path.push(nums[i]);

      backtrack();

      path.pop();
      used[i] = false;
    }
  }

  backtrack();
  return result;
}
// <<< SOLUTION

const asSet = (a, e) => JSON.stringify([...a].map(String).sort()) === JSON.stringify([...e].map(String).sort());

test('46. Permutations', permute, [
  [[[1, 2, 3]], [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]], asSet],
  [[[0, 1]], [[0, 1], [1, 0]], asSet],
  [[[1]], [[1]], asSet],
  [[[1, 2, 3, 4]], null, (a) => a.length === 24],
]);

module.exports = { permute };
