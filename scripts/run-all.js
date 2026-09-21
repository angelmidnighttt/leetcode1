'use strict';
/**
 * Chay toan bo bai tap:  npm test
 * Chay 1 nhom:           npm test -- 01-easy
 * Chay 1 bai:            npm test -- 0001
 */
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');
const filter = process.argv[2];

function walk(dir) {
  const out = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name));
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.name.endsWith('.js')) out.push(full);
  }
  return out;
}

if (!fs.existsSync(srcDir)) {
  console.error('Khong tim thay thu muc src/');
  process.exit(1);
}

let files = walk(srcDir);
if (filter) {
  const needle = filter.toLowerCase();
  files = files.filter((f) => f.toLowerCase().split(path.sep).join('/').includes(needle));
}

if (files.length === 0) {
  console.error('Khong co file nao khop voi: ' + filter);
  process.exit(1);
}

let current = '';
for (const file of files) {
  const group = path.basename(path.dirname(file));
  if (group !== current) {
    current = group;
    console.log('\n===== ' + group.toUpperCase() + ' =====');
  }
  require(file);
}
