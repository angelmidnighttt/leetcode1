'use strict';
/**
 * 208. Implement Trie (Prefix Tree) - Medium
 * https://leetcode.com/problems/implement-trie-prefix-tree/
 *
 * Đề bài: Cài đặt cây tiền tố với 3 thao tác: insert, search (từ đầy đủ) và
 * startsWith (tiền tố).
 *
 * Ý tưởng: Mỗi node là một "ngã rẽ" chứa bảng con trỏ theo ký tự, cộng thêm cờ
 * isEnd đánh dấu "có một từ kết thúc đúng tại đây". Đi từ gốc theo từng ký tự.
 *   - search   -> đi hết chuỗi VÀ node cuối phải có isEnd.
 *   - startsWith -> chỉ cần đi hết chuỗi.
 * Trie cho phép tra cứu O(L) không phụ thuộc số lượng từ đã lưu - đó là lý do
 * nó xuất hiện trong autocomplete, kiểm tra chính tả, bài 212 Word Search II...
 *
 * Độ phức tạp: O(L) cho mọi thao tác, O(tổng số ký tự) bộ nhớ.
 */
const { suite } = require('../../lib/test');

// >>> SOLUTION
class TrieNode {
  constructor() {
    this.children = new Map(); // ký tự -> TrieNode
    this.isEnd = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) node.children.set(ch, new TrieNode());
      node = node.children.get(ch);
    }
    node.isEnd = true;
  }

  // Đi theo chuỗi, trả về node cuối hoặc null nếu đứt đường
  _walk(prefix) {
    let node = this.root;
    for (const ch of prefix) {
      if (!node.children.has(ch)) return null;
      node = node.children.get(ch);
    }
    return node;
  }

  search(word) {
    const node = this._walk(word);
    return node !== null && node.isEnd;
  }

  startsWith(prefix) {
    return this._walk(prefix) !== null;
  }
}
// <<< SOLUTION

function simulate(ops) {
  const trie = new Trie();
  const out = [];
  for (const [name, arg] of ops) {
    if (name === 'insert') trie.insert(arg);
    else out.push(trie[name](arg));
  }
  return out;
}

suite('208. Implement Trie', [
  [
    'ví dụ trong đề',
    () =>
      simulate([
        ['insert', 'apple'], ['search', 'apple'], ['search', 'app'],
        ['startsWith', 'app'], ['insert', 'app'], ['search', 'app'],
      ]),
    [true, false, true, true],
  ],
  ['chuỗi rỗng là tiền tố của mọi thứ', () => simulate([['insert', 'a'], ['startsWith', '']]), [true]],
  ['không tìm thấy', () => simulate([['insert', 'abc'], ['search', 'abcd'], ['startsWith', 'abd']]), [false, false]],
  ['nhiều từ chung tiền tố', () => simulate([['insert', 'car'], ['insert', 'card'], ['search', 'car'], ['search', 'ca']]), [true, false]],
]);

module.exports = { Trie };
