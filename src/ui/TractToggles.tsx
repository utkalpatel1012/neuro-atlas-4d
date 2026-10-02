import React from 'react';
import { useAtlas } from '../state/store';
import { TRACT_CLASSES } from '../state/tracts';

// Tract toggles by class (P5 done-when). Drives gross manifest categories today; HCP1065 bundles bind here when meshed.
export default function TractToggles() {
  const { tractVisibility, setTractClass } = useAtlas();
  return (
    <section aria-label="Tract toggles">
      {TRACT_CLASSES.map((c) => (
        <label key={c}>
          <input
            aria-label={`tract class ${c}`}
            type="checkbox"
            checked={tractVisibility[c] ?? true}
            onChange={(e) => setTractClass(c, e.target.checked)}
          />
          {c}
        </label>
      ))}
      <p data-testid="tract-budget">Budget ≤2,500 streamlines/bundle (H6) — decimation enforced in pipeline.</p>
    </section>
  );
}
