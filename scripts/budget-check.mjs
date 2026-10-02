// budget-check.mjs (P9) — §9 budgets from dist/ actuals. FPS/device/Lighthouse are TARGETS until
// measured on hardware (honest DEVIATION, never asserted). Fails on hard file/transfer caps.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import zlib from 'node:zlib';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assets = path.join(root, 'dist', 'assets');
const files = fs.readdirSync(assets).map((f) => ({ name: f, bytes: fs.statSync(path.join(assets, f)).size }));
const totalRaw = files.reduce((n, f) => n + f.bytes, 0);
const gzipOf = (f) => zlib.gzipSync(fs.readFileSync(path.join(assets, f.name))).length;
const totalGzip = files.reduce((n, f) => n + gzipOf(f), 0);
const maxFile = files.reduce((m, f) => (f.bytes > m.bytes ? f : m), { name: '', bytes: 0 });

const rows = [
  ['initial transfer ≤25 MB', totalRaw, 25 * 1024 * 1024],
  ['initial JS ≤1 MB gzip (all chunks; lazy splits lower actual)', totalGzip, 1024 * 1024],
  ['each file <50 MB', maxFile.bytes, 50 * 1024 * 1024],
];
let fail = 0;
for (const [label, got, cap] of rows) {
  const ok = got <= cap;
  if (!ok) fail++;
  console.log(`budget: ${ok ? 'PASS' : 'FAIL'} ${label} — ${(got / 1024).toFixed(0)} KB (cap ${(cap / 1024).toFixed(0)} KB)`);
}
console.log('budget: DEVIATION fps desktop ≥60 / phone ≥30 — TARGETS, no device measurement in P9 (see SELF_REVIEW).');
console.log('budget: DEVIATION first-interaction ≤4s@20Mbps — ESTIMATE from transfer size only, no Lighthouse run (browser blocked).');
console.log('budget: DEVIATION Lighthouse — not run (chromium blocked); manual step in BLOCKERS.md.');
process.exit(fail ? 1 : 0);
