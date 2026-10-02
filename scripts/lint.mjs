// P1 lint: fails on TODO/FIXME in src/state, src/engine, src/ui (strict TS handles the rest).
import fs from 'node:fs';
import path from 'node:path';
const roots = ['src'];
let bad = 0;
function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) { walk(p); continue; }
    if (!/\.(ts|tsx)$/.test(p)) continue;
    const t = fs.readFileSync(p, 'utf8');
    if (/TODO|FIXME/.test(t)) { console.error(`lint: ${p} contains TODO/FIXME`); bad++; }
  }
}
roots.forEach(walk);
console.log(`lint: ${bad} error(s)`);
process.exit(bad ? 1 : 0);
