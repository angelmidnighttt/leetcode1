'use strict';
/**
 * 133. Clone Graph - Medium - https://leetcode.com/problems/clone-graph/
 *
 * Đề bài: Sao chép sâu (deep copy) một đồ thị vô hướng liên thông.
 *
 * Ý tưởng: DFS kèm một Map "node gốc -> node bản sao". Map vừa để tra cứu, vừa
 * đóng vai trò tập "đã thăm" - nhờ vậy đồ thị có chu trình cũng không lặp vô hạn.
 * Quy tắc vàng: PHẢI đưa bản sao vào Map TRƯỚC khi đệ quy sang hàng xóm, nếu
 * không sẽ vòng lại chính nó và tràn ngăn xếp.
 *
 * Độ phức tạp: O(V + E) thời gian, O(V) bộ nhớ.
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
class GraphNode {
  constructor(val, neighbors = []) {
    this.val = val;
    this.neighbors = neighbors;
  }
}

function cloneGraph(node) {
  const clones = new Map(); // gốc -> bản sao

  function dfs(original) {
    if (original === null) return null;
    if (clones.has(original)) return clones.get(original);

    const copy = new GraphNode(original.val);
    clones.set(original, copy); // đăng ký TRƯỚC khi đệ quy

    for (const neighbor of original.neighbors) {
      copy.neighbors.push(dfs(neighbor));
    }

    return copy;
  }

  return dfs(node);
}
// <<< SOLUTION

/* ---- Tiện ích dựng / đọc đồ thị cho test ---- */
function buildGraph(adjList) {
  if (adjList.length === 0) return null;
  const nodes = adjList.map((_, i) => new GraphNode(i + 1));
  adjList.forEach((nbs, i) => {
    nodes[i].neighbors = nbs.map((v) => nodes[v - 1]);
  });
  return nodes[0];
}

function serialize(node) {
  if (!node) return [];
  const visited = new Set([node]);
  const stack = [node];
  const all = [];
  while (stack.length) {
    const n = stack.pop();
    all.push(n);
    for (const nb of n.neighbors) {
      if (!visited.has(nb)) {
        visited.add(nb);
        stack.push(nb);
      }
    }
  }
  all.sort((a, b) => a.val - b.val);
  return all.map((n) => n.neighbors.map((x) => x.val).sort((a, b) => a - b));
}

const run = (adj) => serialize(cloneGraph(buildGraph(adj)));

// Kiểm tra bản sao thực sự là object khác (không trả về chính đồ thị cũ)
const isDeepCopy = () => {
  const original = buildGraph([[2], [1]]);
  const copy = cloneGraph(original);
  return copy !== original && copy.neighbors[0] !== original.neighbors[0] && copy.val === original.val;
};

test('133. Clone Graph', run, [
  [[[[2, 4], [1, 3], [2, 4], [1, 3]]], [[2, 4], [1, 3], [2, 4], [1, 3]]],
  [[[[]]], [[]]],
  [[[]], []],
  [[[[2], [1]]], [[2], [1]]],
]);

test('133. Clone Graph (đúng là bản sao sâu)', isDeepCopy, [[[], true]]);

module.exports = { cloneGraph, GraphNode };
