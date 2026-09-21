'use strict';
/**
 * 207. Course Schedule - Medium - https://leetcode.com/problems/course-schedule/
 *
 * Đề bài: prerequisites[i] = [a, b] nghĩa là muốn học a phải học b trước.
 * Có thể học hết numCourses môn không?
 *
 * Ý tưởng: Đây chính là câu hỏi "đồ thị có hướng này có CHU TRÌNH không?".
 * Dùng sắp xếp tô-pô theo thuật toán Kahn (BFS):
 *   1) Tính bậc vào (indegree) của mọi đỉnh.
 *   2) Đưa các đỉnh bậc vào = 0 vào hàng đợi (môn học được ngay).
 *   3) Lấy ra, giảm bậc vào của các môn phụ thuộc; đỉnh nào về 0 thì đẩy vào.
 *   4) Nếu số đỉnh lấy ra được = numCourses thì không có chu trình.
 * Các đỉnh nằm trong chu trình sẽ không bao giờ có bậc vào bằng 0 -> bị kẹt lại.
 *
 * Độ phức tạp: O(V + E) thời gian, O(V + E) bộ nhớ.
 */
const { test } = require('../../lib/test');

// >>> SOLUTION
function canFinish(numCourses, prerequisites) {
  const graph = Array.from({ length: numCourses }, () => []);
  const indegree = new Array(numCourses).fill(0);

  for (const [course, prereq] of prerequisites) {
    graph[prereq].push(course); // học xong prereq thì mở khoá course
    indegree[course]++;
  }

  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (indegree[i] === 0) queue.push(i);
  }

  let finished = 0;
  for (let head = 0; head < queue.length; head++) {
    finished++;
    for (const next of graph[queue[head]]) {
      indegree[next]--;
      if (indegree[next] === 0) queue.push(next);
    }
  }

  return finished === numCourses;
}
// <<< SOLUTION

test('207. Course Schedule', canFinish, [
  [[2, [[1, 0]]], true],
  [[2, [[1, 0], [0, 1]]], false],
  [[1, []], true],
  [[5, [[1, 0], [2, 1], [3, 2], [4, 3]]], true],
  [[3, [[0, 1], [1, 2], [2, 0]]], false],
  [[4, [[2, 0], [1, 0], [3, 1], [3, 2]]], true],
]);

module.exports = { canFinish };
