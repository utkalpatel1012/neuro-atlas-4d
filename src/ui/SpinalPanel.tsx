import React from 'react';
import { useAtlas } from '../state/store';
import { SPINAL_LEVELS, SPINAL_TRACT_SLOTS, BRAINSTEM_SEAM } from '../state/spinal';

// Spinal levels labelled (P5 done-when). Meshes pending PAM50 → levels render as labelled list with
// explicit seam record to the medulla (documented, never silently welded).
export default function SpinalPanel() {
  const { spinalVisible, setSpinalVisible } = useAtlas();
  return (
    <section aria-label="Spinal cord">
      <label>
        <input aria-label="spinal cord visible" type="checkbox" checked={spinalVisible} onChange={(e) => setSpinalVisible(e.target.checked)} />
        Spinal cord (C1–S5 + conus/filum)
      </label>
      <ol data-testid="spinal-levels">
        {SPINAL_LEVELS.map((l) => <li key={l.id}>{l.id} ({l.region})</li>)}
      </ol>
      <p>Tract slots: {SPINAL_TRACT_SLOTS.join(', ')} — meshes pending (PAM50).</p>
      <p data-testid="brainstem-seam">Join: {BRAINSTEM_SEAM.from} → {BRAINSTEM_SEAM.to} — {BRAINSTEM_SEAM.status}.</p>
    </section>
  );
}
