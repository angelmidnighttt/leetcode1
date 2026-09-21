'use strict';
/**
 * 49. Group Anagrams - Medium - https://leetcode.com/problems/group-anagrams/
 *
 * Đề bài: Nhóm các chuỗi là phép đảo chữ của nhau vào cùng một nhóm.
 *
 * Ý tưởng: Cần một "chữ ký" giống nhau cho mọi anagram. Hai lựa chọn:
 *   - Sắp xếp ký tự: "eat" -> "aet". Đơn giản, O(n * k log k).
 *   - Đếm tần suất 26 chữ rồi nối lại: "1#0#0#..." -> O(n * k), nhanh hơn khi k lớn.
 * Bên dưới dùng cách đếm tần suất, kèm chú thích cách sắp xếp.
 *
 * Độ phức tạp: O(n * k) thời gian, O(n * k) bộ nhớ.
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
function groupAnagrams(strs) {
  const groups = new Map();

  for (const word of strs) {
    const count = new Array(26).fill(0);
    for (const ch of word) count[ch.charCodeAt(0) - 97]++;
    const key = count.join('#'); // cách khác: [...word].sort().join('')

    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(word);
  }

  return [...groups.values()];
}
// <<< SOLUTION

test('49. Group Anagrams', groupAnagrams, [
  [
    [['eat', 'tea', 'tan', 'ate', 'nat', 'bat']],
    [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']],
    'sorted2d',
  ],
  [[['']], [['']], 'sorted2d'],
  [[['a']], [['a']], 'sorted2d'],
  [[[]], [], 'sorted2d'],
]);

module.exports = { groupAnagrams };
