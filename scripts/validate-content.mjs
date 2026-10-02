// validate-content (P8): circuits claims + disorder tabs/MCQs + symptoms/syndromes.
// Rules: text ≤4 sentences; sourceIds present; needs-source EXCLUDED from release (warn, 0 errors).
// P1 completeness (tabs/MCQs/tours) enforced here too — fails on short packs.
import fs from 'node:fs';
const strict = process.argv.includes('--strict');
const sents = (t) => String(t).split(/[.!?]+/).filter((s) => s.trim().length > 0).length;
let errors = 0;
let excluded = 0;
const need = (id) => { excluded++; if (strict) console.log(`warn: ${id} needs-source — excluded from release`); };

const cj = JSON.parse(fs.readFileSync('content/circuits/catalogue.json', 'utf8'));
for (const cl of cj.claims ?? []) {
  if (sents(cl.text) > 4) { console.error(`claim ${cl.id}: >4 sentences`); errors++; }
  if (!cl.sourceIds?.length) { console.error(`claim ${cl.id}: no sourceIds`); errors++; }
  if (cl.sourceIds.includes('src.needs-source')) need(cl.id);
}

const TABS = ['overview', 'neuroanatomy', 'circuits', 'psychopathology', 'clinical', 'differential', 'investigations', 'management', 'neuromodulation', 'course', 'pearls', 'vignette'];
const pj = JSON.parse(fs.readFileSync('content/disorders/p1.json', 'utf8'));
if (pj.disorders.length < 9) { console.error(`only ${pj.disorders.length} P1 packs (<9)`); errors++; }
for (const d of pj.disorders) {
  for (const t of TABS) {
    if (!d.tabs?.[t]) { console.error(`${d.id}: missing tab ${t}`); errors++; }
    else if (sents(d.tabs[t]) > 4) { console.error(`${d.id}/${t}: >4 sentences`); errors++; }
  }
  if (!d.mcqs || d.mcqs.length < 15) { console.error(`${d.id}: only ${d.mcqs?.length ?? 0} MCQs (<15)`); errors++; }
  for (const [i, m] of (d.mcqs ?? []).entries()) {
    if (!m.o || m.o.length !== 4 || m.a < 0 || m.a > 3) { console.error(`${d.id} mcq${i}: bad options/answer`); errors++; }
    if (m.a === undefined) { console.error(`${d.id} mcq${i}: quiz index missing`); errors++; }
  }
  if (!d.tour || d.tour.length < 6 || d.tour.length > 10) { console.error(`${d.id}: tour ${d.tour?.length ?? 0} steps (need 6-10)`); errors++; }
  if (d.reviewStatus !== 'draft') { console.error(`${d.id}: must be draft`); errors++; }
  for (const c of d.claims ?? []) if (c.sourceIds.includes('src.needs-source')) need(`${d.id}/${c.id}`);
}

for (const [f, key] of [['content/symptoms.json', 'symptoms'], ['content/syndromes.json', 'syndromes']]) {
  const j = JSON.parse(fs.readFileSync(f, 'utf8'));
  for (const e of j[key]) {
    const txt = e.definition ?? e.features ?? '';
    if (sents(txt) > 4) { console.error(`${e.id}: >4 sentences`); errors++; }
    if (!e.sourceIds?.length) { console.error(`${e.id}: no sourceIds`); errors++; }
    if (e.sourceIds.includes('src.needs-source')) need(e.id);
  }
}
console.log(`lint:content:strict: ${errors} error(s), ${excluded} needs-source excluded${strict ? ' [strict]' : ''}`);
process.exit(errors ? 1 : 0);
