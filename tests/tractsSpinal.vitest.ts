import { describe, it, expect, beforeEach } from 'vitest';
import { TRACT_CLASSES, MAX_STREAMLINES_PER_BUNDLE, decimateCount, classifyTract } from '../src/state/tracts';
import { SPINAL_LEVELS, SPINAL_TRACT_SLOTS, BRAINSTEM_SEAM } from '../src/state/spinal';
import { BrainScene } from '../src/engine/BrainScene';
import { useAtlas } from '../src/state/store';
import fs from 'node:fs';

beforeEach(() => {
  useAtlas.getState().reset();
});

describe('P5 tracts + spinal', () => {
  it('5 tract classes toggle by class', () => {
    expect(TRACT_CLASSES).toHaveLength(5);
    const s = useAtlas.getState();
    s.setTractClass('association', false);
    expect(useAtlas.getState().tractVisibility['association']).toBe(false);
  });
  it('budget caps at 2500/bundle', () => {
    expect(MAX_STREAMLINES_PER_BUNDLE).toBe(2500);
    expect(decimateCount(100).kept).toBe(100);
    const d = decimateCount(10000);
    expect(d.kept).toBeLessThanOrEqual(2500);
    expect(BrainScene.capStreamlines(99999)).toBe(2500);
  });
  it('classifyTract maps gross labels honestly (null when unknown)', () => {
    expect(classifyTract('Arcuate fasciculus L')).toBe('association');
    expect(classifyTract('Corticospinal tract L')).toBe('projection');
    expect(classifyTract('Corpus callosum body')).toBe('commissural');
    expect(classifyTract('Mystery blob')).toBeNull();
  });
  it('spinal levels C1-S5 + conus/filum labelled, seam documented', () => {
    const ids = SPINAL_LEVELS.map((l) => l.id);
    for (const need of ['C1', 'C8', 'T1', 'T12', 'L1', 'L5', 'S1', 'S5', 'conus', 'filum']) {
      expect(ids).toContain(need);
    }
    expect(ids).toHaveLength(32);
    expect(SPINAL_TRACT_SLOTS).toContain('corticospinal');
    expect(BRAINSTEM_SEAM.to).toBe('C1');
  });
  it('qc reports PENDING (no fabrication)', () => {
    expect(JSON.parse(fs.readFileSync('pipeline/qc/tracts.json', 'utf8')).status).toBe('TRACTS_PENDING');
    expect(JSON.parse(fs.readFileSync('pipeline/qc/spinal.json', 'utf8')).status).toBe('SPINAL_PENDING');
  });
});
