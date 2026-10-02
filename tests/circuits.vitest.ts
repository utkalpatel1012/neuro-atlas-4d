import { describe, it, expect, beforeEach } from 'vitest';
import { activeStep, pulsePosition, TRANSMITTER_COLORS } from '../src/state/circuits';
import { useAtlas } from '../src/state/store';
import fs from 'node:fs';

beforeEach(() => {
  useAtlas.getState().reset();
});

describe('P7 circuits', () => {
  it('catalogue holds ≥15 playable circuits, all draft', () => {
    const j = JSON.parse(fs.readFileSync('content/circuits/catalogue.json', 'utf8'));
    expect(j.circuits.length).toBeGreaterThanOrEqual(15);
    for (const c of j.circuits) {
      expect(c.reviewStatus).toBe('draft');
      expect(c.steps.length).toBeGreaterThan(0);
    }
  });
  it('every edge fidelity-labelled schematic (HCP pending)', () => {
    const j = JSON.parse(fs.readFileSync('content/circuits/catalogue.json', 'utf8'));
    for (const c of j.circuits) {
      for (const e of c.edges) {
        expect(e.geometry.fidelity).toBe('schematic');
      }
    }
  });
  it('activeStep resolves by timeline t', () => {
    const steps = [
      { t: 0, caption: 'a', activeEdges: [], claimIds: [] },
      { t: 0.5, caption: 'b', activeEdges: [], claimIds: [] },
    ];
    expect(activeStep(steps, 0.25)?.caption).toBe('a');
    expect(activeStep(steps, 0.75)?.caption).toBe('b');
    expect(activeStep(steps, -1)).toBeNull();
  });
  it('pulse position deterministic', () => {
    expect(pulsePosition(0, 0, 3)).toBe(0);
    expect(pulsePosition(0.5, 0, 2)).toBeCloseTo(0);
    expect(pulsePosition(0.75, 0, 2)).toBeCloseTo(0.5);
  });
  it('transmitter colours cover catalogue', () => {
    const colors = TRANSMITTER_COLORS as Record<string, string>;
    for (const t of ['dopamine', 'GABA', 'glutamate', 'orexin', 'opioid']) {
      expect(colors[t]).toMatch(/^#/);
    }
  });
  it('circuit selection persists in store', () => {
    useAtlas.getState().setCircuit('circuit.mesolimbic-da');
    expect(useAtlas.getState().activeCircuit).toBe('circuit.mesolimbic-da');
  });
});
