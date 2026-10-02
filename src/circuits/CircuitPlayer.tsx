import React, { useEffect, useMemo, useState } from 'react';
import { useAtlas } from '../state/store';
import { activeStep, TRANSMITTER_COLORS, type Circuit } from '../state/circuits';

async function loadCatalogue(): Promise<Circuit[]> {
  const base = import.meta.env.BASE_URL;
  // Vite serves content/? No — content/ is source; copy to public in build? P7 reads via fetch from public/content.
  const res = await fetch(`${base}content/circuits/catalogue.json`);
  if (!res.ok) return [];
  const j = await res.json();
  return j.circuits ?? [];
}

// Circuit player (F6): ≥15 playable, timeline scrubber, step captions, receptor glyph note,
// mechanism overlay (pending sourced claims), optional PET-NC overlay flag (off by default, H10).
export default function CircuitPlayer() {
  const [circuits, setCircuits] = useState<Circuit[]>([]);
  const { activeCircuit, setCircuit, timelineT, setTimeline } = useAtlas();
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [petNc, setPetNc] = useState(false);
  const circuit = useMemo(() => circuits.find((c) => c.id === activeCircuit) ?? null, [circuits, activeCircuit]);

  useEffect(() => {
    loadCatalogue().then(setCircuits).catch(() => setCircuits([]));
  }, []);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      const t = useAtlas.getState().timelineT;
      setTimeline(t >= 1 ? 0 : Math.min(1, t + 0.02 * speed));
    }, 100);
    return () => window.clearInterval(id);
  }, [playing, speed, setTimeline]);

  const step = circuit ? activeStep(circuit.steps, timelineT) : null;

  return (
    <section aria-label="Circuit player">
      <div aria-label="Circuit list">
        {circuits.map((c) => (
          <button key={c.id} type="button" aria-pressed={activeCircuit === c.id} onClick={() => { setCircuit(c.id); setTimeline(0); }}>
            {c.name}
          </button>
        ))}
      </div>
      <p data-testid="circuit-count">{circuits.length} circuits (draft — verify)</p>
      {circuit && (
        <article data-testid="circuit-detail">
          <h3>{circuit.name}</h3>
          <div>
            <button type="button" onClick={() => setPlaying((p) => !p)}>{playing ? 'Pause' : 'Play'}</button>
            <label>Speed <input aria-label="Circuit speed" type="range" min={1} max={40} value={Math.round(speed * 10)} onChange={(e) => setSpeed(Number(e.target.value) / 10)} /></label>
            <input aria-label="Circuit scrubber" type="range" min={0} max={1000} value={Math.round(timelineT * 1000)} onChange={(e) => setTimeline(Number(e.target.value) / 1000)} />
          </div>
          <p data-testid="step-caption">{step?.caption ?? '—'}</p>
          <ul aria-label="Circuit edges">
            {circuit.edges.map((e) => (
              <li key={e.id}>
                <span style={{ color: (TRANSMITTER_COLORS as Record<string, string>)[e.transmitter] ?? '#000' }}>●</span>
                {' '}{e.from} → {e.to} ({e.transmitter}, {e.effect})
                <span data-testid={`edge-fidelity-${e.id}`}> [{e.geometry.fidelity}]</span>
              </li>
            ))}
          </ul>
          <p>Receptor glyphs: schematic clouds (pending PET geometry).</p>
          <label>Receptor PET overlay (pack-nc, off by default) <input aria-label="PET overlay" type="checkbox" checked={petNc} onChange={(e) => setPetNc(e.target.checked)} /></label>
          {petNc && <p data-testid="pet-note">pack-nc absent (CC BY-NC-SA) — personal/educational use only; never monetise.</p>}
          <p>Mechanism overlay: pending sourced claims (P8) — no drug→receptor→pathway effects asserted.</p>
        </article>
      )}
    </section>
  );
}
