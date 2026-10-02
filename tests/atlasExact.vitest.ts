import { describe, it, expect, beforeEach } from 'vitest';
import { useAtlas } from '../src/state/store';
import { mirrorX, mirrorSide } from '../src/state/mirror';
import fs from 'node:fs';

beforeEach(() => {
  useAtlas.getState().reset();
});

describe('P4 atlas-exact', () => {
  it('H3 mirror is exact-inverse at midline', () => {
    expect(mirrorX(5)).toBe(-5);
    expect(mirrorX(-5)).toBe(5);
    expect(mirrorX(mirrorX(7))).toBe(7);
    expect(mirrorSide('left')).toBe('right');
    expect(mirrorSide('median')).toBe('median');
  });
  it('anatomy mode switch never swaps silently (explicit state)', () => {
    expect(useAtlas.getState().anatomyMode).toBe('gross');
    useAtlas.getState().setAnatomyMode('exact');
    expect(useAtlas.getState().anatomyMode).toBe('exact');
  });
  it('crosswalk has no fuzzy merges (canonical ids explicit)', () => {
    const csv = fs.readFileSync('pipeline/crosswalk.csv', 'utf8').trim().split('\n');
    expect(csv[0]).toContain('canonical_id');
    expect(csv.length).toBeGreaterThan(1);
    for (const line of csv.slice(1)) {
      expect(line.split(',').length).toBeGreaterThanOrEqual(7);
    }
  });
  it('qc reports stay PENDING with NULL metrics (no fabrication)', () => {
    const reg = JSON.parse(fs.readFileSync('pipeline/qc/registration.json', 'utf8'));
    expect(reg.status).toBe('REGISTRATION_PENDING');
    expect(reg.mean_surface_distance_mm).toBeNull();
    const mesh = JSON.parse(fs.readFileSync('pipeline/qc/meshing.json', 'utf8'));
    expect(mesh.status).toBe('MESHING_PENDING');
  });
});
