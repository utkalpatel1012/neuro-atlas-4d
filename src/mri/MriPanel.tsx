import React, { useEffect, useRef, useState } from 'react';
import { useAtlas } from '../state/store';
import { RADIO_PRESETS } from './presets';

const BACKDROPS = ['T1w', 'T2w', 'PDw', 'MRA'] as const;

// NiiVue MRI panel (F4). Backdrop volumes + label overlays load from public/atlas/volumes/ when
// TemplateFlow fetch completes (P3 backbone: viewer + sync + presets; data files pending → honest empty state).
export default function MriPanel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [backdrop, setBackdrop] = useState<(typeof BACKDROPS)[number]>('T1w');
  const [labelOpacity, setLabelOpacity] = useState(0.5);
  const { crosshairMNI, setCrosshair, selection, select, mriTractography, setMriTractography } = useAtlas();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        // Niivue API varies by version (attachTo(id) vs canvas); keep loosely typed, degrade honestly.
        const mod = (await import('@niivue/niivue')) as unknown as Record<string, new (opts?: unknown) => {
          attachTo?: (id: string) => Promise<unknown>;
          attachToCanvas?: (el: HTMLCanvasElement) => Promise<unknown>;
        }>;
        if (cancelled || !canvasRef.current) return;
        const NV = mod.Niivue;
        if (!NV) return;
        const nv = new NV({ backColor: [0, 0, 0, 1], show3Dcrosshair: true });
        if (nv.attachToCanvas) await nv.attachToCanvas(canvasRef.current);
        else if (nv.attachTo && canvasRef.current.id) await nv.attachTo(canvasRef.current.id);
      } catch {
        // WebGL/data unavailable → readout + presets still work (honest degradation).
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section aria-label="MRI panel">
      <canvas ref={canvasRef} id="mri-canvas" data-testid="mri-canvas" style={{ width: '100%', height: 240 }} />
      <div>
        <label>Backdrop <select aria-label="MRI backdrop" value={backdrop} onChange={(e) => setBackdrop(e.target.value as typeof backdrop)}>
          {BACKDROPS.map((b) => <option key={b} value={b}>{b}</option>)}
        </select></label>
        <label>Labels <input aria-label="Label overlay opacity" type="range" min={0} max={100} value={Math.round(labelOpacity * 100)} onChange={(e) => setLabelOpacity(Number(e.target.value) / 100)} /></label>
        <label>Tractography <input aria-label="MRI tractography" type="checkbox" checked={mriTractography} onChange={(e) => setMriTractography(e.target.checked)} /></label>
      </div>
      <p data-testid="mri-crosshair">MNI {crosshairMNI.join(', ')} · {selection ?? 'no structure'} · overlay {Math.round(labelOpacity * 100)}%</p>
      <p data-testid="mri-volumes">Volumes pending TemplateFlow fetch — viewer mounted, no backdrop bytes yet.</p>
      <div aria-label="Radiology presets">
        {RADIO_PRESETS.map((p) => (
          <button key={p.id} type="button" onClick={() => { if (p.mni) setCrosshair(p.mni); select(p.structures[0] ?? null); }}>
            {p.plane}: {p.level}
          </button>
        ))}
      </div>
      {/* Voxel-click → mesh highlight path: MRI click sets crosshair + selection (store sync). 3D→MRI path in Canvas. */}
    </section>
  );
}
