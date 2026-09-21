'use strict';
/**
 * 15. 3Sum - Medium - https://leetcode.com/problems/3sum/
 *
 * Đề bài: Tìm mọi bộ ba KHÁC NHAU có tổng bằng 0. Không trả về bộ ba trùng lặp.
 *
 * Ý tưởng: SẮP XẾP trước - đó là chìa khoá. Cố định phần tử thứ nhất arr[i],
 * phần còn lại trở thành "two sum trên mảng đã sắp" giải bằng hai con trỏ O(n).
 * Sắp xếp còn giúp khử trùng dễ dàng: bỏ qua giá trị giống phần tử liền trước.
 *
 * Mẹo thoát sớm: nếu arr[i] > 0 thì mọi số sau đều dương, tổng không thể bằng 0.
 *
 * Độ phức tạp: O(n^2) thời gian, O(1) bộ nhớ phụ (không kể mảng kết quả).
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
function threeSum(nums) {
  const arr = [...nums].sort((a, b) => a - b);
  const result = [];

  for (let i = 0; i < arr.length - 2; i++) {
    if (arr[i] > 0) break;                        // thoát sớm
    if (i > 0 && arr[i] === arr[i - 1]) continue; // khử trùng vị trí thứ nhất

    let left = i + 1;
    let right = arr.length - 1;

    while (left < right) {
      const sum = arr[i] + arr[left] + arr[right];

      if (sum < 0) {
        left++;
      } else if (sum > 0) {
        right--;
      } else {
        result.push([arr[i], arr[left], arr[right]]);
        left++;
        right--;
        while (left < right && arr[left] === arr[left - 1]) left++;
        while (left < right && arr[right] === arr[right + 1]) right--;
      }
    }
  }

  return result;
}
// <<< SOLUTION

test('15. 3Sum', threeSum, [
  [[[-1, 0, 1, 2, -1, -4]], [[-1, -1, 2], [-1, 0, 1]], 'sorted2d'],
  [[[0, 1, 1]], [], 'sorted2d'],
  [[[0, 0, 0]], [[0, 0, 0]], 'sorted2d'],
  [[[0, 0, 0, 0]], [[0, 0, 0]], 'sorted2d'],
  [[[-2, 0, 1, 1, 2]], [[-2, 0, 2], [-2, 1, 1]], 'sorted2d'],
]);

module.exports = { threeSum };
