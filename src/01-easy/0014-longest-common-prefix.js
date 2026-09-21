'use strict';
/**
 * 14. Longest Common Prefix - Easy - https://leetcode.com/problems/longest-common-prefix/
 *
 * Đề bài: Tìm tiền tố chung dài nhất của một mảng chuỗi. Không có thì trả về "".
 *
 * Ý tưởng: Lấy chuỗi đầu làm ứng viên tiền tố. Với mỗi chuỗi tiếp theo, cắt dần
 * ứng viên từ phải sang cho tới khi chuỗi đó bắt đầu bằng ứng viên.
 *
 * Độ phức tạp: O(S) với S là tổng số ký tự, O(1) bộ nhớ phụ.
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
function longestCommonPrefix(strs) {
  if (!strs || strs.length === 0) return '';

  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    while (!strs[i].startsWith(prefix)) {
      prefix = prefix.slice(0, -1);
      if (prefix === '') return '';
    }
  }

  return prefix;
}
// <<< SOLUTION

test('14. Longest Common Prefix', longestCommonPrefix, [
  [[['flower', 'flow', 'flight']], 'fl'],
  [[['dog', 'racecar', 'car']], ''],
  [[['interspecies', 'interstellar', 'interstate']], 'inters'],
  [[['abc']], 'abc'],
  [[['', 'abc']], ''],
]);

module.exports = { longestCommonPrefix };
