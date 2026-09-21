'use strict';
/**
 * 215. Kth Largest Element in an Array - Medium
 * https://leetcode.com/problems/kth-largest-element-in-an-array/
 *
 * Đề bài: Tìm phần tử lớn thứ k (theo thứ tự sắp xếp, KHÔNG phải phần tử phân biệt).
 * Đề yêu cầu không sắp xếp toàn mảng.
 *
 * Ý tưởng: Quickselect - "người anh em" của Quicksort. Sau một lần phân hoạch
 * (partition), phần tử pivot đã nằm ĐÚNG vị trí cuối cùng của nó. So vị trí đó
 * với chỉ số cần tìm (n - k) để biết nên đi tiếp sang nửa nào - và CHỈ đi một nửa.
 * Nhờ vậy trung bình O(n) thay vì O(n log n).
 * Chọn pivot ngẫu nhiên để tránh trường hợp xấu O(n^2) với mảng đã sắp sẵn.
 *
 * Độ phức tạp: O(n) trung bình, O(1) bộ nhớ phụ.
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
function findKthLargest(nums, k) {
  const arr = [...nums];
  const target = arr.length - k; // lớn thứ k <=> chỉ số n-k khi sắp tăng dần

  let left = 0;
  let right = arr.length - 1;

  while (true) {
    const pivotIndex = partition(arr, left, right);

    if (pivotIndex === target) return arr[pivotIndex];
    if (pivotIndex < target) left = pivotIndex + 1;
    else right = pivotIndex - 1;
  }
}

// Phân hoạch Lomuto: đưa mọi số < pivot về bên trái, trả về vị trí cuối của pivot
function partition(arr, left, right) {
  const randomIndex = left + Math.floor(Math.random() * (right - left + 1));
  [arr[randomIndex], arr[right]] = [arr[right], arr[randomIndex]];

  const pivot = arr[right];
  let i = left;

  for (let j = left; j < right; j++) {
    if (arr[j] < pivot) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
    }
  }

  [arr[i], arr[right]] = [arr[right], arr[i]];
  return i;
}
// <<< SOLUTION

test('215. Kth Largest Element in an Array', findKthLargest, [
  [[[3, 2, 1, 5, 6, 4], 2], 5],
  [[[3, 2, 3, 1, 2, 4, 5, 5, 6], 4], 4],
  [[[1], 1], 1],
  [[[2, 1], 2], 1],
  [[[7, 6, 5, 4, 3, 2, 1], 7], 1],
  [[[5, 5, 5, 5], 3], 5],
]);

module.exports = { findKthLargest };
