import React from 'react';
import { useAtlas } from '../state/store';

// 3D clipping planes (F4a): axial / coronal / sagittal + oblique. Stencil caps apply ONLY to
// watertight meshes (H5) — watertightness UNVERIFIED in P3 → clip-only cuts + "open cut" marker.
export default function SectionControls() {
  const { clip, setClip } = useAtlas();
  const set = (k: keyof typeof clip, v: number) => setClip({ ...clip, [k]: v });
  return (
    <section aria-label="Section controls">
      <label>Axial <input aria-label="Axial clip" type="range" min={-100} max={100} value={clip.axial} onChange={(e) => set('axial', Number(e.target.value))} /></label>
      <label>Coronal <input aria-label="Coronal clip" type="range" min={-100} max={100} value={clip.coronal} onChange={(e) => set('coronal', Number(e.target.value))} /></label>
      <label>Sagittal <input aria-label="Sagittal clip" type="range" min={-100} max={100} value={clip.sagittal} onChange={(e) => set('sagittal', Number(e.target.value))} /></label>
      <label>Oblique <input aria-label="Oblique clip" type="range" min={-45} max={45} value={clip.oblique} onChange={(e) => set('oblique', Number(e.target.value))} /></label>
      <p data-testid="cut-marker">Open cut — caps pending watertight verification (H5).</p>
    </section>
  );
}
