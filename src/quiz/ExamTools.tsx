import React, { useEffect, useMemo, useState } from 'react';

const base = () => import.meta.env.BASE_URL;

// --- local SRS flashcards (SM-2 lite, localStorage only) ---
interface Card { q: string; a: string; ease: number; due: number }
function loadCards(): Card[] {
  try { return JSON.parse(localStorage.getItem('na4d-cards') ?? '[]'); } catch { return []; }
}
function gradeCard(c: Card, good: boolean): Card {
  const ease = Math.max(1.3, c.ease + (good ? 0.1 : -0.3));
  return { ...c, ease, due: Date.now() + (good ? 86400000 * ease : 3600000) };
}

export function QuizPanel() {
  const [packs, setPacks] = useState<any[]>([]);
  const [did, setDid] = useState('schizophrenia');
  const [qi, setQi] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  useEffect(() => {
    fetch(`${base()}content/disorders/p1.json`).then((r) => r.json()).then((j) => setPacks(j.disorders)).catch(() => setPacks([]));
  }, []);
  const d = packs.find((p) => p.id === did);
  const mcq = d?.mcqs[qi % (d?.mcqs.length || 1)];
  return (
    <section aria-label="Quiz panel">
      <label>Disorder <select aria-label="Quiz disorder" value={did} onChange={(e) => { setDid(e.target.value); setQi(0); setPicked(null); }}>
        {packs.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
      </select></label>
      {mcq && (
        <article data-testid="mcq">
          <p>{mcq.q}</p>
          {mcq.o.map((o: string, i: number) => (
            <button key={i} type="button" aria-pressed={picked === i} onClick={() => { setPicked(i); if (i === mcq.a) setScore((s) => s + 1); }}>
              {o}
            </button>
          ))}
          {picked !== null && <p>{picked === mcq.a ? 'Correct. ' : 'Review. '}{mcq.e} <span>Draft — verify</span></p>}
          <button type="button" onClick={() => { setQi((q) => q + 1); setPicked(null); }}>Next</button>
        </article>
      )}
      <p data-testid="quiz-score">Score {score} (local only)</p>
    </section>
  );
}

export function VivaPanel() {
  const prompts = useMemo(() => ['Name it.', 'Function?', 'Connections?', 'Lesion?', 'Psychiatric relevance?'], []);
  const [structure, setStructure] = useState('ctx.frontal.dlpfc.L');
  const [pi, setPi] = useState(0);
  return (
    <section aria-label="Viva mode">
      <p data-testid="viva-structure">{structure}</p>
      <p data-testid="viva-prompt">{prompts[pi]}</p>
      <button type="button" onClick={() => setPi((i) => (i + 1) % prompts.length)}>Next prompt</button>
      <button type="button" onClick={() => setStructure('deep.accumbens.L')}>Random structure</button>
    </section>
  );
}

export function FlashPanel() {
  const [cards, setCards] = useState<Card[]>(() => loadCards().length ? loadCards() : [
    { q: 'Salience circuit node?', a: 'Dorsal striatum (draft)', ease: 2.5, due: 0 },
    { q: 'OFC loop disorder?', a: 'OCD (draft)', ease: 2.5, due: 0 },
  ]);
  const [show, setShow] = useState(false);
  const due = cards.filter((c) => c.due <= Date.now());
  const cur = due[0];
  const save = (cs: Card[]) => { setCards(cs); localStorage.setItem('na4d-cards', JSON.stringify(cs)); };
  return (
    <section aria-label="Flashcards">
      <p data-testid="flash-due">{due.length} due (local SRS)</p>
      {cur && (
        <article>
          <p>{cur.q}</p>
          {show && <p>{cur.a}</p>}
          <button type="button" onClick={() => setShow((s) => !s)}>Reveal</button>
          <button type="button" onClick={() => { save(cards.map((c) => (c === cur ? gradeCard(c, true) : c))); setShow(false); }}>Good</button>
          <button type="button" onClick={() => { save(cards.map((c) => (c === cur ? gradeCard(c, false) : c))); setShow(false); }}>Again</button>
        </article>
      )}
    </section>
  );
}

export function NotesPanel() {
  const [notes, setNotes] = useState(() => localStorage.getItem('na4d-notes') ?? '');
  const [marks, setMarks] = useState<string[]>(() => { try { return JSON.parse(localStorage.getItem('na4d-marks') ?? '[]'); } catch { return []; } });
  return (
    <section aria-label="Notes and bookmarks">
      <textarea aria-label="Local notes" value={notes} onChange={(e) => { setNotes(e.target.value); localStorage.setItem('na4d-notes', e.target.value); }} placeholder="Local-only notes" />
      <button type="button" onClick={() => {
        const m = [...marks, window.location.hash || '#s=ctx.frontal.dlpfc.L'];
        setMarks(m); localStorage.setItem('na4d-marks', JSON.stringify(m));
      }}>Bookmark view</button>
      <ul>{marks.map((m, i) => <li key={i}>{m}</li>)}</ul>
    </section>
  );
}

export function ExportButton() {
  return (
    <button
      type="button"
      onClick={() => {
        const c = document.querySelector('[data-testid="brain-canvas"]') as HTMLCanvasElement | null;
        const url = c?.toDataURL('image/png');
        if (!url) return;
        const a = document.createElement('a');
        a.href = url; a.download = 'neuroatlas4d.png'; a.click();
      }}
    >
      Export PNG
    </button>
  );
}
