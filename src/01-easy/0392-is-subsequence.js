'use strict';
/**
 * 392. Is Subsequence - Easy - https://leetcode.com/problems/is-subsequence/
 *
 * Đề bài: s có phải chuỗi con (subsequence) của t không? Chuỗi con = xoá bớt
 * một số ký tự của t mà không đổi thứ tự các ký tự còn lại.
 *
 * Ý tưởng: Hai con trỏ tham lam. Quét t một lượt; mỗi khi ký tự trùng với ký tự
 * đang cần của s thì nhảy con trỏ s. Khớp được hết s là thành công. Tham lam
 * đúng vì khớp càng sớm càng để lại nhiều lựa chọn phía sau.
 *
 * Độ phức tạp: O(|t|) thời gian, O(1) bộ nhớ.
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
function isSubsequence(s, t) {
  let i = 0;

  for (let j = 0; j < t.length && i < s.length; j++) {
    if (s[i] === t[j]) i++;
  }

  return i === s.length;
}
// <<< SOLUTION

test('392. Is Subsequence', isSubsequence, [
  [['abc', 'ahbgdc'], true],
  [['axc', 'ahbgdc'], false],
  [['', 'anything'], true],
  [['abc', ''], false],
  [['aaa', 'aa'], false],
]);

module.exports = { isSubsequence };
