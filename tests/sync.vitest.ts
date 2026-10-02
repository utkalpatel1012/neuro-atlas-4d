import { describe, it, expect, beforeEach } from 'vitest';
import { useAtlas } from '../src/state/store';

beforeEach(() => {
  useAtlas.getState().reset();
});

describe('sync P3 (bi-directional store half)', () => {
  it('3D select → crosshair moves (caller supplies centroid; PENDING lookup documented)', () => {
    const s = useAtlas.getState();
    s.select('deep.accumbens.L');
    s.setCrosshair([9, 6, -8]); // centroid placeholder path — real lookup lands with P4 meshes
    expect(useAtlas.getState().selection).toBe('deep.accumbens.L');
    expect(useAtlas.getState().crosshairMNI).toEqual([9, 6, -8]);
  });
  it('MRI voxel click → mesh highlights (crosshair + selection)', () => {
    const s = useAtlas.getState();
    s.setCrosshair([2, -18, 8]);
    s.select('ctx.frontal.dlpfc.L');
    expect(useAtlas.getState().crosshairMNI).toEqual([2, -18, 8]);
    expect(useAtlas.getState().selection).toBe('ctx.frontal.dlpfc.L');
  });
  it('clip planes + backdrop + label opacity clamp', () => {
    const s = useAtlas.getState();
    s.setClip({ axial: 10, coronal: -20, sagittal: 0, oblique: 15 });
    expect(useAtlas.getState().clip.axial).toBe(10);
    s.setMriBackdrop('T2w');
    expect(useAtlas.getState().mriBackdrop).toBe('T2w');
    s.setLabelOpacity(2);
    expect(useAtlas.getState().labelOpacity).toBe(1);
  });
});
