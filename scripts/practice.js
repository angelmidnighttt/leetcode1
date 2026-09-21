'use strict';
/**
 * Tao ban "de trong" de tu luyen:   npm run practice -- 0001
 *
 * File duoc copy sang practice/ va phan giua 2 moc
 *   // >>> SOLUTION  ...  // <<< SOLUTION
 * bi thay bang TODO de ban tu code lai.
 * Chay thu:  node practice/0001-two-sum.js
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const srcDir = path.join(root, 'src');
const outDir = path.join(root, 'practice');
const key = process.argv[2];

if (!key) {
  console.log('Dung: npm run practice -- 0001');
  process.exit(1);
}

function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(full));
    else if (e.name.endsWith('.js')) out.push(full);
  }
  return out;
}

const matches = walk(srcDir).filter((f) => path.basename(f).toLowerCase().includes(key.toLowerCase()));
if (matches.length === 0) {
  console.error('Khong tim thay bai nao khop: ' + key);
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });

for (const file of matches) {
  const rel = path.relative(root, file).split(path.sep).join('/');
  let code = fs.readFileSync(file, 'utf8');
  code = code.replace(
    /\/\/ >>> SOLUTION[\s\S]*?\/\/ <<< SOLUTION/g,
    '// >>> SOLUTION\n// TODO: tu viet loi giai o day.\n// Dap an goc: ' + rel + '\n// <<< SOLUTION'
  );
  code = code.replace(/\.\.\/\.\.\/lib\//g, '../lib/');
  const dest = path.join(outDir, path.basename(file));
  fs.writeFileSync(dest, code, 'utf8');
  console.log('Da tao: practice/' + path.basename(file));
}
