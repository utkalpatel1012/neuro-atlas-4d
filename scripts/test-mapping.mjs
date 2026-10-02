// test:mapping (P7) — every circuit edge has geometry + fidelity; steps resolve; nodes have markers.
// Fails build on: <15 circuits, edge without geometry/fidelity, step with unknown edge/claim, node without marker.
import fs from 'node:fs';
const p = 'content/circuits/catalogue.json';
const j = JSON.parse(fs.readFileSync(p, 'utf8'));
const circuits = j.circuits;
let checks = 0;
let fails = [];
checks++;
if (circuits.length < 15) fails.push(`only ${circuits.length} circuits (<15)`);
for (const c of circuits) {
  const edgeIds = new Set(c.edges.map((e) => e.id));
  const claimIds = new Set((j.claims ?? []).map((k) => k.id));
  for (const e of c.edges) {
    checks++;
    if (!e.geometry || !e.geometry.type || !e.geometry.fidelity) fails.push(`${c.id}/${e.id}: missing geometry/fidelity`);
    if (!['tract', 'schematic-spline'].includes(e.geometry.type)) fails.push(`${c.id}/${e.id}: bad geometry type`);
  }
  for (const n of c.nodes) {
    checks++;
    if (!n.marker) fails.push(`${c.id}/${n.structureId}: node without declared marker`);
  }
  for (const s of c.steps) {
    checks++;
    for (const a of s.activeEdges) if (!edgeIds.has(a)) fails.push(`${c.id}: step references unknown edge ${a}`);
    for (const k of s.claimIds ?? []) if (!claimIds.has(k)) fails.push(`${c.id}: step references unknown claim ${k}`);
  }
  if (c.reviewStatus !== 'draft') fails.push(`${c.id}: reviewStatus must be draft until human review`);
}
console.log(`test:mapping: ${checks} assertions, ${fails.length} failure(s), ${circuits.length} circuits checked`);
for (const f of fails) console.error('  FAIL ' + f);
process.exit(fails.length ? 1 : 0);
