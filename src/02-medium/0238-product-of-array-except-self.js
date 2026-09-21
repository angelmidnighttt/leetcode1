'use strict';
/**
 * 238. Product of Array Except Self - Medium
 * https://leetcode.com/problems/product-of-array-except-self/
 *
 * Đề bài: answer[i] = tích của TẤT CẢ phần tử trừ nums[i]. KHÔNG được dùng phép
 * chia, và phải chạy O(n).
 *
 * Ý tưởng: Tích cần tìm = (tích mọi phần tử bên TRÁI i) * (tích mọi phần tử bên PHẢI i).
 * Lượt 1 đi từ trái sang, ghi thẳng tích tiền tố vào mảng kết quả.
 * Lượt 2 đi từ phải sang, nhân thêm tích hậu tố (giữ trong một biến duy nhất).
 * Nhờ vậy không cần mảng phụ -> O(1) bộ nhớ ngoài mảng trả về.
 *
 * Không dùng chia còn giúp xử lý đúng trường hợp có số 0 trong mảng.
 *
 * Độ phức tạp: O(n) thời gian, O(1) bộ nhớ phụ.
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
function productExceptSelf(nums) {
  const n = nums.length;
  const answer = new Array(n);

  // Lượt 1: answer[i] = tích các phần tử bên trái i
  let prefix = 1;
  for (let i = 0; i < n; i++) {
    answer[i] = prefix;
    prefix *= nums[i];
  }

  // Lượt 2: nhân thêm tích các phần tử bên phải i
  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    answer[i] *= suffix;
    suffix *= nums[i];
  }

  return answer;
}
// <<< SOLUTION

// Dùng === thay cho deepStrictEqual vì JS phân biệt 0 và -0 (tích có số âm nhân 0)
const numEq = (a, e) => a.length === e.length && a.every((v, i) => v === e[i]);

test('238. Product of Array Except Self', productExceptSelf, [
  [[[1, 2, 3, 4]], [24, 12, 8, 6], numEq],
  [[[-1, 1, 0, -3, 3]], [0, 0, 9, 0, 0], numEq],
  [[[2, 3]], [3, 2], numEq],
  [[[0, 0]], [0, 0], numEq],
  [[[1, 0]], [0, 1], numEq],
  [[[-1, -2, -3]], [6, 3, 2], numEq],
]);

module.exports = { productExceptSelf };
