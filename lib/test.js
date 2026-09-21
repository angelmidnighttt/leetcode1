'use strict';
/**
 * Test runner sieu nhe cho cac bai LeetCode.
 *
 *   test('1. Two Sum', twoSum, [
 *     [[[2, 7, 11, 15], 9], [0, 1]],   // [danh sach tham so, ket qua mong doi]
 *     [[[3, 2, 4], 6], [1, 2]],
 *   ]);
 *
 * Tham so thu 3 cua moi case (tuy chon) la cach so sanh:
 *   undefined   -> so sanh sau (deepStrictEqual)
 *   'sorted'    -> sap xep mang 1 chieu roi so sanh (thu tu khong quan trong)
 *   'sorted2d'  -> sap xep ca phan tu ben trong lan mang ngoai
 *   ham(a, e)   -> tu viet, tra ve true/false
 */

const { deepStrictEqual } = require('assert');

const stats = { total: 0, passed: 0, failed: 0, suites: 0 };
let summaryInstalled = false;

function installSummary() {
  if (summaryInstalled) return;
  summaryInstalled = true;
  process.on('exit', () => {
    if (stats.total === 0) return;
    console.log('-'.repeat(60));
    console.log(
      `TOTAL: ${stats.passed}/${stats.total} assertions in ${stats.suites} problem(s)` +
        (stats.failed ? `  |  ${stats.failed} FAILED` : '  |  all green')
    );
  });
}

function sortAny(arr) {
  return [...arr].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
}

function sort2d(arr) {
  return arr
    .map((row) => (Array.isArray(row) ? sortAny(row) : row))
    .sort((a, b) => {
      const x = JSON.stringify(a);
      const y = JSON.stringify(b);
      return x < y ? -1 : x > y ? 1 : 0;
    });
}

function equals(actual, expected, cmp) {
  if (typeof cmp === 'function') return !!cmp(actual, expected);
  let a = actual;
  let e = expected;
  if (cmp === 'sorted') {
    a = sortAny(a);
    e = sortAny(e);
  } else if (cmp === 'sorted2d') {
    a = sort2d(a);
    e = sort2d(e);
  }
  try {
    deepStrictEqual(a, e);
    return true;
  } catch {
    return false;
  }
}

function show(value) {
  try {
    const s = JSON.stringify(value);
    if (s === undefined) return String(value);
    return s.length > 160 ? s.slice(0, 157) + '...' : s;
  } catch {
    return String(value);
  }
}

function report(title, ok, total, failures) {
  const status = failures.length === 0 ? 'PASS' : 'FAIL';
  console.log(`[${status}] ${title}  (${ok}/${total})`);
  for (const f of failures) console.log(f);
}

/** Chay mot bo test cho 1 ham. cases = [[args[], expected, cmp?], ...] */
function test(title, fn, cases) {
  installSummary();
  stats.suites++;
  const failures = [];
  let ok = 0;

  cases.forEach(([args, expected, cmp], idx) => {
    stats.total++;
    let actual;
    try {
      actual = fn(...args);
    } catch (err) {
      stats.failed++;
      process.exitCode = 1;
      failures.push(`  #${idx + 1} THREW: ${err && err.message}`);
      return;
    }
    if (equals(actual, expected, cmp)) {
      ok++;
      stats.passed++;
    } else {
      stats.failed++;
      process.exitCode = 1;
      failures.push(
        `  #${idx + 1} input: ${show(args)}\n     got     : ${show(actual)}\n     expected: ${show(expected)}`
      );
    }
  });

  report(title, ok, cases.length, failures);
}

/** Cho bai thiet ke (LRU Cache, Min Stack...): cases = [[label, thunk, expected, cmp?], ...] */
function suite(title, cases) {
  installSummary();
  stats.suites++;
  const failures = [];
  let ok = 0;

  cases.forEach(([label, thunk, expected, cmp]) => {
    stats.total++;
    let actual;
    try {
      actual = thunk();
    } catch (err) {
      stats.failed++;
      process.exitCode = 1;
      failures.push(`  ${label} THREW: ${err && err.message}`);
      return;
    }
    if (equals(actual, expected, cmp)) {
      ok++;
      stats.passed++;
    } else {
      stats.failed++;
      process.exitCode = 1;
      failures.push(`  ${label}\n     got     : ${show(actual)}\n     expected: ${show(expected)}`);
    }
  });

  report(title, ok, cases.length, failures);
}

module.exports = { test, suite, stats };
