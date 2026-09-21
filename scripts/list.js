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
    // Dong tieu de co dang:  * 1. Two Sum - Easy - https://...
    const header = lines.find((l) => /^\s*\*\s*\d+\./.test(l));
    const title = header ? header.replace(/^\s*\*\s*/, '').replace(/\s*-\s*https?:\/\/\S+\s*$/, '').trim() : f;
    console.log('  ' + title);
  }
}

console.log('\nTong cong: ' + count + ' bai');
