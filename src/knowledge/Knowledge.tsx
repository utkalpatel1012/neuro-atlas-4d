import React, { useEffect, useState } from 'react';
import { useAtlas } from '../state/store';

const base = () => import.meta.env.BASE_URL;
async function getJSON(p: string) {
  const r = await fetch(`${base()}content/${p}`);
  if (!resOk(r)) throw new Error('missing');
  return r.json();
}
function resOk(r: Response) { return r.ok; }

function DraftBadge() {
  return <span data-testid="draft-badge" style={{ border: '1px solid', padding: '0 4px' }}>Draft — verify</span>;
}

// Entity card (§8.2 template): one-liner → location → function → connections → chemistry →
// neurology → psychiatry → imaging → pearls → sources. Minor structures stay blank over loose text.
export function EntityCard({ kind, id }: { kind: string; id: string }) {
  return (
    <article aria-label="Entity card" data-testid="entity-card">
      <h3>{kind}: {id}</h3>
      <DraftBadge />
      <p>Function summary shown for major structures; minor entries intentionally blank.</p>
    </article>
  );
}

export function SymptomExplorer() {
  const [syms, setSyms] = useState<any[]>([]);
  const [q, setQ] = useState('');
  const { setCircuit, select } = useAtlas();
  useEffect(() => { getJSON('symptoms.json').then((j) => setSyms(j.symptoms)).catch(() => setSyms([])); }, []);
  const list = syms.filter((s) => !q || `${s.name} ${s.id}`.toLowerCase().includes(q.toLowerCase()));
  return (
    <section aria-label="Symptom explorer">
      <input aria-label="Search symptoms" value={q} onChange={(e) => setQ(e.target.value)} placeholder="symptom ↔ circuit" />
      <ul>
        {list.map((s) => (
          <li key={s.id}>
            <strong>{s.name}</strong> <DraftBadge />
            <div>{s.definition}</div>
            {(s.substrates ?? []).map((sub: any, i: number) => (
              <button key={i} type="button" onClick={() => setCircuit(sub.circuit)}>
                {sub.circuit} ({sub.level})
              </button>
            ))}
            {(s.structures ?? []).slice(0, 2).map((st: string) => (
              <button key={st} type="button" onClick={() => select(st)}>{st}</button>
            ))}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function SyndromeLibrary() {
  const [syns, setSyns] = useState<any[]>([]);
  const { select } = useAtlas();
  useEffect(() => { getJSON('syndromes.json').then((j) => setSyns(j.syndromes)).catch(() => setSyns([])); }, []);
  return (
    <section aria-label="Syndrome library">
      <ul>
        {syns.map((s) => (
          <li key={s.id}>
            <strong>{s.name}</strong> <DraftBadge />
            <span> {s.features}</span>
            {s.territory && <span> [territory: {s.territory}]</span>}
            {(s.structures ?? []).slice(0, 1).map((st: string) => (
              <button key={st} type="button" onClick={() => select(st)}>locate</button>
            ))}
          </li>
        ))}
      </ul>
    </section>
  );
}

const TABS = ['overview', 'neuroanatomy', 'circuits', 'psychopathology', 'clinical', 'differential', 'investigations', 'management', 'neuromodulation', 'course', 'pearls', 'vignette'] as const;

export function DisorderView() {
  const [packs, setPacks] = useState<any[]>([]);
  const [did, setDid] = useState<string | null>(null);
  const [tab, setTab] = useState<string>('overview');
  const [tourIdx, setTourIdx] = useState(0);
  const { activeDisorder, setDisorder } = useAtlas();
  useEffect(() => { getJSON('disorders/p1.json').then((j) => setPacks(j.disorders)).catch(() => setPacks([])); }, []);
  const d = packs.find((p) => p.id === (did ?? activeDisorder));
  return (
    <section aria-label="Disorder packs">
      <div aria-label="Disorder list">
        {packs.map((p) => (
          <button key={p.id} type="button" aria-pressed={did === p.id} onClick={() => { setDid(p.id); setDisorder(p.id); setTourIdx(0); }}>
            {p.name}
          </button>
        ))}
      </div>
      <p data-testid="disorder-count">{packs.length} P1 packs (draft — verify)</p>
      {d && (
        <article data-testid="disorder-detail">
          <h3>{d.name}</h3>
          <DraftBadge />
          <div role="tablist" aria-label="Disorder tabs">
            {TABS.map((t) => (
              <button key={t} role="tab" aria-selected={tab === t} type="button" onClick={() => setTab(t)}>{t}</button>
            ))}
          </div>
          <p data-testid="disorder-tab-body">{d.tabs[tab]}</p>
          <div aria-label="Guided tour" data-testid="guided-tour">
            <p>Step {tourIdx + 1}/{d.tour.length}: {d.tour[tourIdx]}</p>
            <button type="button" onClick={() => setTourIdx((i) => Math.max(0, i - 1))}>Back</button>
            <button type="button" onClick={() => setTourIdx((i) => Math.min(d.tour.length - 1, i + 1))}>Next</button>
          </div>
          <p>MCQs: {d.mcqs.length} in bank (see Exam tools).</p>
        </article>
      )}
    </section>
  );
}
