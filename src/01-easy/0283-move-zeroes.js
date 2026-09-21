'use strict';
/**
 * 283. Move Zeroes - Easy - https://leetcode.com/problems/move-zeroes/
 *
 * Đề bài: Dồn tất cả số 0 về cuối mảng, GIỮ NGUYÊN thứ tự tương đối của các
 * phần tử khác 0. Phải làm tại chỗ, không tạo mảng mới.
 *
 * Ý tưởng: Hai con trỏ. `insert` là vị trí ghi phần tử khác 0 tiếp theo.
 * Lượt 1 dồn hết số khác 0 lên đầu, lượt 2 điền 0 vào phần đuôi còn lại.
 * (Biến thể 1 lượt: hoán đổi nums[i] với nums[insert] khi gặp phần tử khác 0.)
 *
 * Độ phức tạp: O(n) thời gian, O(1) bộ nhớ.
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
function moveZeroes(nums) {
  let insert = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[insert] = nums[i];
      insert++;
    }
  }

  while (insert < nums.length) {
    nums[insert] = 0;
    insert++;
  }
}
// <<< SOLUTION

const run = (nums) => {
  moveZeroes(nums);
  return nums;
};

test('283. Move Zeroes', run, [
  [[[0, 1, 0, 3, 12]], [1, 3, 12, 0, 0]],
  [[[0]], [0]],
  [[[1, 2, 3]], [1, 2, 3]],
  [[[0, 0, 1]], [1, 0, 0]],
  [[[]], []],
]);

module.exports = { moveZeroes };
