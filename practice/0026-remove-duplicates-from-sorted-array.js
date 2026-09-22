"use strict";
/**
 * 26. Remove Duplicates from Sorted Array - Easy
 * https://leetcode.com/problems/remove-duplicates-from-sorted-array/
 *
 * Đề bài: Mảng đã sắp tăng dần. Xoá phần tử trùng TẠI CHỖ sao cho mỗi giá trị
 * chỉ còn 1 lần, trả về số phần tử k còn lại; k phần tử đầu của mảng phải đúng.
 *
 * Ý tưởng: Hai con trỏ. `k` là vị trí ghi tiếp theo, `i` là con trỏ đọc.
 * Vì mảng đã sắp xếp, phần tử trùng luôn nằm cạnh nhau nên chỉ cần so nums[i]
 * với phần tử vừa ghi nums[k-1].
 *
 * Độ phức tạp: O(n) thời gian, O(1) bộ nhớ.
 */
const { test } = require("../lib/test");

// >>> SOLUTION
// TODO: tu viet loi giai o day.
// Dap an goc: src/01-easy/0026-remove-duplicates-from-sorted-array.js

function removeDuplicates(nums) {
  if (nums.length === 0) return 0;
  let k = 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[k - 1]) {
      nums[k] = nums[i];
      k++;
    }
  }
  return k;
}

// <<< SOLUTION

// Trả về [k, k phần tử đầu] để test kiểm tra được cả hai yêu cầu
const run = (nums) => {
  const k = removeDuplicates(nums);
  return [k, nums.slice(0, k)];
};

test("26. Remove Duplicates from Sorted Array", run, [
  [[[1, 1, 2]], [2, [1, 2]]],
  [[[0, 0, 1, 1, 1, 2, 2, 3, 3, 4]], [5, [0, 1, 2, 3, 4]]],
  [[[1]], [1, [1]]],
  [[[]], [0, []]],
]);

module.exports = { removeDuplicates };
