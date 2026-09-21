'use strict';
/** Liet ke tat ca bai tap: npm run list */
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');
let count = 0;

for (const group of fs.readdirSync(srcDir).sort()) {
  const dir = path.join(srcDir, group);
  if (!fs.statSync(dir).isDirectory()) continue;
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.js')).sort();
  console.log('\n' + group + '  (' + files.length + ' bai)');
  for (const f of files) {
    count++;
    const lines = fs.readFileSync(path.join(dir, f), 'utf8').split('\n');
    const head = lines.find((l) => l.includes('leetcode.com'));
    console.log('  ' + (head ? head.replace(/^\s*\*\s*/, '').trim() : f));
  }
}
console.log('\nTong cong: ' + count + ' bai');
