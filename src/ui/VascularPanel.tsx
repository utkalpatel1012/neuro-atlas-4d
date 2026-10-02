import React from 'react';
import { useAtlas } from '../state/store';
import { VESSELS, TERRITORIES, proxyLabel } from '../state/vascular';

// Vessel cards (F5 acceptance): click vessel → name, supply, occlusion syndrome (sourced DRAFT),
// fidelity badge; unlabelled segments flagged proxy (H9).
export default function VascularPanel() {
  const { selection, select, territoryOverlay, setTerritoryOverlay, vascularFlow, setVascularFlow } = useAtlas();
  const selected = VESSELS.find((v) => v.id === selection);
  return (
    <section aria-label="Vascular panel">
      <label>Territory overlay <input aria-label="Territory overlay" type="checkbox" checked={territoryOverlay} onChange={(e) => setTerritoryOverlay(e.target.checked)} /></label>
      <label>Flow animation <input aria-label="Flow animation" type="checkbox" checked={vascularFlow} onChange={(e) => setVascularFlow(e.target.checked)} /></label>
      <div aria-label="Territories">{TERRITORIES.map((t) => <span key={t} style={{ marginRight: 8 }}>{t}</span>)}</div>
      <ul>
        {VESSELS.map((v) => (
          <li key={v.id}>
            <button type="button" onClick={() => select(v.id)} aria-pressed={selection === v.id}>
              {v.name}
            </button>
          </li>
        ))}
      </ul>
      {selected ? (
        <article data-testid="vessel-card" aria-label="Vessel card">
          <h3>{proxyLabel(selected)}</h3>
          <p>Supply: {selected.supply}</p>
          <p>{selected.syndrome}</p>
          <p data-testid="vessel-fidelity">Fidelity: {selected.fidelity}{selected.fidelity !== 'named' ? ' — flagged' : ''}</p>
        </article>
      ) : (
        <p data-testid="vessel-card">Select a vessel for name, supply and occlusion syndrome.</p>
      )}
    </section>
  );
}
