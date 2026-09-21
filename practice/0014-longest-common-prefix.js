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
const { test } = require('../lib/test');

// >>> SOLUTION
// TODO: tu viet loi giai o day.
// Dap an goc: src/01-easy/0014-longest-common-prefix.js

function longestCommonPrefix(strs) {
  // TODO
  const map = new Map();
  for (const str of strs) {
    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      if (!map.has(i)) {
        map.set(i, char);
      } else if (map.get(i) !== char) {
        return str.slice(0, i);
      }
    }
  }
  return strs[0] || '';
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
