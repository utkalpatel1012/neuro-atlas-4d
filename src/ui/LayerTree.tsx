import React, { useEffect, useMemo, useState } from 'react';
import { useAtlas } from '../state/store';
import { buildHierarchy, masterMembers, searchNodes, PRESETS, MASTER_TOGGLES, type ManifestNode } from '../state/layers';

const BASE = import.meta.env.BASE_URL;

export default function LayerTree() {
  const [manifest, setManifest] = useState<ManifestNode[]>([]);
  const [query, setQuery] = useState('');
  const {
    nodes, setNodeVisible, setNodeOpacity, setBranchVisible, setBranchOpacity,
    selection, select, multiSelect, toggleMulti, isolate, showAll,
    setPreset, layerPreset, explode, setExplode, peel, setPeel,
    xray, setXray, ghost, setGhost, splitHemispheres, setSplit,
    hiddenMasters, setHiddenMasters, anatomyMode, setAnatomyMode,
  } = useAtlas();

  useEffect(() => {
    fetch(`${BASE}atlas/core-anatomy/manifest.json`)
      .then((r) => r.json())
      .then((m) => setManifest(m.nodes ?? []))
      .catch(() => setManifest([]));
  }, []);

  const filtered = useMemo(() => searchNodes(manifest, query), [manifest, query]);
  const tree = useMemo(() => buildHierarchy(filtered), [filtered]);
  const allIds = useMemo(() => manifest.map((n) => String(n.id)), [manifest]);
  const idToCat = useMemo(() => Object.fromEntries(manifest.map((n) => [String(n.id), n.category])), [manifest]);

  const toggleMaster = (master: string) => {
    const members = masterMembers(manifest, master).map((n) => String(n.id));
    const hide = !hiddenMasters.includes(master);
    setHiddenMasters(hide ? [...hiddenMasters, master] : hiddenMasters.filter((m: string) => m !== master));
    setBranchVisible(members, !hide);
  };

  return (
    <nav aria-label="Layer tree">
      <input aria-label="Search structures" placeholder="name / alias / TA2" value={query} onChange={(e) => setQuery(e.target.value)} />
      <div aria-label="Master toggles">
        {Object.keys(MASTER_TOGGLES).map((m) => (
          <button key={m} type="button" aria-pressed={!hiddenMasters.includes(m)} onClick={() => toggleMaster(m)}>
            {m}
          </button>
        ))}
      </div>
      <div aria-label="Anatomy mode">
        {(['gross', 'exact'] as const).map((m) => (
          <button key={m} type="button" aria-pressed={anatomyMode === m} onClick={() => setAnatomyMode(m)}>
            {m === 'gross' ? 'Gross anatomy' : 'Atlas-exact'}
          </button>
        ))}
        {anatomyMode === 'exact' && <p>Atlas-exact meshes pending (P4) — showing gross with fidelity labels.</p>}
      </div>
      <div aria-label="Presets">
        {Object.keys(PRESETS).map((p) => (
          <button key={p} type="button" aria-pressed={layerPreset === p} onClick={() => {
            const { applyPreset } = useAtlas.getState();
            applyPreset(PRESETS[p], idToCat);
            setPreset(p);
          }}>
            {p}
          </button>
        ))}
      </div>
      <div>
        <label>Separate lobes <input aria-label="Separate lobes" type="range" min={0} max={100} value={Math.round(explode * 100)} onChange={(e) => setExplode(Number(e.target.value) / 100)} /></label>
        <label>Peel <input aria-label="Peel layers" type="range" min={0} max={12} value={peel} onChange={(e) => setPeel(Number(e.target.value))} /></label>
        <label>X-ray <input aria-label="X-ray" type="checkbox" checked={xray} onChange={(e) => setXray(e.target.checked)} /></label>
        <label>Ghost <input aria-label="Ghost level" type="range" min={0} max={100} value={Math.round(ghost * 100)} onChange={(e) => setGhost(Number(e.target.value) / 100)} /></label>
        <label>Hemisphere split <input aria-label="Hemisphere split" type="checkbox" checked={splitHemispheres} onChange={(e) => setSplit(e.target.checked)} /></label>
      </div>
      <div>
        <button type="button" onClick={() => showAll(allIds)}>Reset</button>
        {selection && <button type="button" onClick={() => isolate(selection, allIds)}>Isolate</button>}
      </div>
      {Object.entries(tree).map(([cat, regions]) => {
        const catIds = Object.values(regions).flat().map((n) => String(n.id));
        return (
          <details key={cat} open>
            <summary>
              <input
                aria-label={`toggle ${cat}`}
                type="checkbox"
                checked={catIds.every((id) => nodes[id]?.visible ?? true)}
                onChange={(e) => setBranchVisible(catIds, e.target.checked)}
              />
              {cat}
              <input
                aria-label={`opacity ${cat}`}
                type="range"
                min={0}
                max={100}
                defaultValue={100}
                onChange={(e) => setBranchOpacity(catIds, Number(e.target.value) / 100)}
              />
            </summary>
            {Object.entries(regions).map(([reg, list]) => (
              <details key={reg} style={{ marginLeft: 12 }}>
                <summary>{reg} ({list.length})</summary>
                <ul>
                  {list.map((n) => {
                    const id = String(n.id);
                    return (
                      <li key={id}>
                        <input aria-label={`multiselect ${id}`} type="checkbox" checked={multiSelect.includes(id)} onChange={() => toggleMulti(id)} />
                        <input aria-label={`toggle ${id}`} type="checkbox" checked={nodes[id]?.visible ?? true} onChange={(e) => setNodeVisible(id, e.target.checked)} />
                        <button type="button" onClick={() => select(id)} aria-pressed={selection === id}>{n.label}</button>
                        <input aria-label={`opacity ${id}`} type="range" min={0} max={100} value={Math.round((nodes[id]?.opacity ?? 1) * 100)} onChange={(e) => setNodeOpacity(id, Number(e.target.value) / 100)} />
                      </li>
                    );
                  })}
                </ul>
              </details>
            ))}
          </details>
        );
      })}
    </nav>
  );
}
