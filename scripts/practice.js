'use strict';
/**
 * Tao ban "de trong" de tu luyen:   npm run practice -- 0001
 *
 * Script copy bai sang practice/, xoa phan giua 2 moc
 *   // >>> SOLUTION  ...  // <<< SOLUTION
 * va thay bang KHUNG HAM RONG (dung ten + tham so nhu ban goc) de ban tu dien vao.
 * Test van chay nguyen ven, nen chay se thay FAIL cho toi khi ban lam dung.
 *
 * Chay thu:  node practice/0001-two-sum.js
 * Xem dap an: src/01-easy/0001-two-sum.js
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

/** Sinh khung rong tu phan loi giai goc */
function makeStub(solutionBody, sourceRelPath) {
  const lines = ['// >>> SOLUTION', '// TODO: tu viet loi giai o day.', '// Dap an goc: ' + sourceRelPath, ''];

  // Tach cac lop ra truoc de khong bi ham ben trong lop lam nhieu
  const classRegex = /^class\s+(\w+)[\s\S]*?^\}/gm;
  const classes = solutionBody.match(classRegex) || [];
  const withoutClasses = solutionBody.replace(classRegex, '');

  for (const cls of classes) {
    const name = cls.match(/^class\s+(\w+)/)[1];
    const methods = [...cls.matchAll(/^ {2}(?:get\s+)?(\w+)\s*\(([^)]*)\)\s*\{/gm)];
    lines.push(`class ${name} {`);
    for (const [, method, args] of methods) {
      lines.push(`  ${method}(${args}) {`);
      lines.push('    // TODO');
      lines.push('  }');
      lines.push('');
    }
    lines.push('}');
    lines.push('');
  }

  for (const [, name, args] of withoutClasses.matchAll(/^function\s+(\w+)\s*\(([^)]*)\)/gm)) {
    lines.push(`function ${name}(${args}) {`);
    lines.push('  // TODO');
    lines.push('}');
    lines.push('');
  }

  lines.push('// <<< SOLUTION');
  return lines.join('\n');
}

const matches = walk(srcDir).filter((f) => path.basename(f).toLowerCase().includes(key.toLowerCase()));
if (matches.length === 0) {
  console.error('Khong tim thay bai nao khop: ' + key);
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });

for (const file of matches) {
  const rel = path.relative(root, file).split(path.sep).join('/');
  const code = fs.readFileSync(file, 'utf8');

  const patched = code.replace(/\/\/ >>> SOLUTION\n([\s\S]*?)\/\/ <<< SOLUTION/g, (_, body) =>
    makeStub(body, rel)
  );

  const dest = path.join(outDir, path.basename(file));
  fs.writeFileSync(dest, patched.replace(/\.\.\/\.\.\/lib\//g, '../lib/'), 'utf8');
  console.log('Da tao: practice/' + path.basename(file));
}
