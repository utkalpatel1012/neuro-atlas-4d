import { describe, it, expect, beforeEach } from 'vitest';
import { VESSELS, TERRITORIES, labelFidelity, proxyLabel } from '../src/state/vascular';
import { BrainScene } from '../src/engine/BrainScene';
import { useAtlas } from '../src/state/store';
import fs from 'node:fs';

beforeEach(() => {
  useAtlas.getState().reset();
});

describe('P6 vasculature', () => {
  it('one-button Vasculature intent covers arteries + veins + sinuses', () => {
    const kinds = new Set(VESSELS.map((v) => v.kind));
    expect(kinds.has('artery')).toBe(true);
    expect(kinds.has('vein')).toBe(true);
    expect(kinds.has('sinus')).toBe(true);
  });
  it('H9: unregistered segments flagged proxy; perforators schematic', () => {
    expect(labelFidelity('m1', false)).toBe('proxy');
    expect(labelFidelity('m1', true)).toBe('named');
    expect(labelFidelity('lenticulostriate', true)).toBe('schematic');
    expect(labelFidelity('unknown-id', true)).toBe('proxy');
    const m1 = VESSELS.find((v) => v.id === 'm1')!;
    expect(proxyLabel(m1)).toContain('proxy');
  });
  it('territory overlay toggles (4 territories)', () => {
    expect(TERRITORIES).toEqual(['ACA', 'MCA', 'PCA', 'vertebrobasilar']);
    useAtlas.getState().setTerritoryOverlay(true);
    expect(useAtlas.getState().territoryOverlay).toBe(true);
  });
  it('flow animation phase is deterministic', () => {
    expect(BrainScene.flowPhase(0)).toBe(0);
    expect(BrainScene.flowPhase(1.5)).toBeCloseTo(0.5);
    expect(BrainScene.flowPhase(2)).toBe(0);
  });
  it('vessels qc PENDING (no fabrication)', () => {
    expect(JSON.parse(fs.readFileSync('pipeline/qc/vessels.json', 'utf8')).status).toBe('VESSELS_PENDING');
  });
});
