import { describe, it, expect } from 'vitest';
import { applyMatrix, IDENTITY_4X4, mniToThree, threeToMni } from '../src/coords';
import { RADIO_PRESETS } from '../src/mri/presets';

describe('coords P3', () => {
  it('identity matrix is a no-op', () => {
    expect(applyMatrix([4, -2, 9], IDENTITY_4X4)).toEqual([4, -2, 9]);
  });
  it('translation matrix shifts', () => {
    const m = [...IDENTITY_4X4] as typeof IDENTITY_4X4;
    m[3] = 10; m[7] = -5; m[11] = 2;
    expect(applyMatrix([0, 0, 0], m)).toEqual([10, -5, 2]);
  });
  it('mni round-trip still holds (registration PENDING → identity)', () => {
    const p: [number, number, number] = [12, -30, 18];
    expect(threeToMni(mniToThree(p))).toEqual(p);
  });
});

describe('radiology presets', () => {
  it('covers required teaching levels without invented coordinates', () => {
    const ids = RADIO_PRESETS.map((p) => p.id);
    for (const need of ['ax-bg', 'ax-mb', 'ax-pons', 'ax-medulla', 'ax-cord', 'cor-amg', 'sag-mid']) {
      expect(ids).toContain(need);
    }
    for (const p of RADIO_PRESETS) {
      expect(p.structures.length).toBeGreaterThan(0);
      expect(p.mni).toBeNull(); // PENDING template fetch — no fabrication (R2)
    }
  });
});
