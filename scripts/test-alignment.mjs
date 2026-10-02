// P0 alignment placeholder: reports actuals only, never targets-as-results (R8). No registration computed yet → PENDING, exit 0.
import fs from 'node:fs';
const report = { glbToMni: 'PENDING', atlasDice: 'PENDING', note: 'No matrix computed in P0; see docs/AUDIT.md §2 (units arbitrary, NOT MNI).' };
fs.mkdirSync('pipeline/qc', { recursive: true });
fs.writeFileSync('pipeline/qc/alignment.json', JSON.stringify(report, null, 2));
console.log('test:alignment: PENDING (no false metrics) — see pipeline/qc/alignment.json');
