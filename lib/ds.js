'use strict';
/**
 * Cac cau truc du lieu dung chung cho nhieu bai LeetCode.
 * Dung `require('../../lib/ds')` trong file bai tap.
 */

/* ------------------------------ Linked List ------------------------------ */

class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

/** [1,2,3] -> 1 -> 2 -> 3 */
function buildList(arr) {
  const dummy = new ListNode(0);
  let cur = dummy;
  for (const v of arr) {
    cur.next = new ListNode(v);
    cur = cur.next;
  }
  return dummy.next;
}

/** 1 -> 2 -> 3 => [1,2,3] (co chong lap vo han) */
function listToArray(head) {
  const out = [];
  let guard = 0;
  while (head) {
    out.push(head.val);
    head = head.next;
    if (++guard > 100000) throw new Error('Linked list bi lap vo han');
  }
  return out;
}

/** Tao list co chu ky: pos = chi so node ma duoi cung tro vao (-1 = khong co chu ky) */
function buildCycleList(arr, pos) {
  const head = buildList(arr);
  if (pos < 0 || !head) return head;
  let tail = head;
  while (tail.next) tail = tail.next;
  let target = head;
  for (let i = 0; i < pos; i++) target = target.next;
  tail.next = target;
  return head;
}

/* -------------------------------- Binary Tree ----------------------------- */

class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/** Nhan mang theo dinh dang LeetCode (level-order, null cho o trong) */
function buildTree(arr) {
  if (!Array.isArray(arr) || arr.length === 0 || arr[0] === null) return null;
  const root = new TreeNode(arr[0]);
  const queue = [root];
  let i = 1;
  while (i < arr.length && queue.length) {
    const node = queue.shift();
    if (i < arr.length) {
      const v = arr[i++];
      if (v !== null && v !== undefined) {
        node.left = new TreeNode(v);
        queue.push(node.left);
      }
    }
    if (i < arr.length) {
      const v = arr[i++];
      if (v !== null && v !== undefined) {
        node.right = new TreeNode(v);
        queue.push(node.right);
      }
    }
  }
  return root;
}

/** Nguoc lai cua buildTree - dung de so sanh ket qua trong test */
function treeToArray(root) {
  if (!root) return [];
  const out = [];
  const queue = [root];
  while (queue.length) {
    const node = queue.shift();
    if (node === null) {
      out.push(null);
      continue;
    }
    out.push(node.val);
    queue.push(node.left, node.right);
  }
  while (out.length && out[out.length - 1] === null) out.pop();
  return out;
}

module.exports = {
  ListNode,
  buildList,
  listToArray,
  buildCycleList,
  TreeNode,
  buildTree,
  treeToArray,
};
