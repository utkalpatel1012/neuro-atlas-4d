import { describe, it, expect } from 'vitest';
import { buildHierarchy, masterMembers, searchNodes, PRESETS, MASTER_TOGGLES, explodeOffset, peelHidden, type ManifestNode } from '../src/state/layers';

const N: ManifestNode[] = [
  { id: 1, name: 'a1', label: 'Anterior cerebral artery A1', category: 'arteries', side: 'left', region: 'Vessels', ta2: ['artery'] },
  { id: 2, name: 'v1', label: 'Superior sagittal sinus', category: 'veins_sinuses', side: 'median', region: 'Vessels' },
  { id: 3, name: 'c1', label: 'Precentral gyrus', category: 'cortex', side: 'left', region: 'Telencephalon' },
  { id: 4, name: 'd1', label: 'Caudate head', category: 'deep_grey', side: 'left', region: 'Telencephalon' },
];

describe('layers', () => {
  it('hierarchy groups system → region → structure', () => {
    const t = buildHierarchy(N);
    expect(t['arteries']['Vessels']).toHaveLength(1);
    expect(t['cortex']['Telencephalon'][0].label).toBe('Precentral gyrus');
  });
  it('Vasculature covers arteries + veins + sinuses', () => {
    const got = masterMembers(N, 'Vasculature').map((n) => n.category).sort();
    expect(got).toEqual(['arteries', 'veins_sinuses']);
  });
  it('all master toggles resolve to categories', () => {
    for (const [m, cats] of Object.entries(MASTER_TOGGLES)) {
      expect(cats.length, m).toBeGreaterThan(0);
    }
  });
  it('search matches name/label/TA2', () => {
    expect(searchNodes(N, 'sagittal').map((n) => n.id)).toEqual([2]);
    expect(searchNodes(N, 'artery').map((n) => n.id)).toEqual([1]);
    expect(searchNodes(N, 'precentral').map((n) => n.id)).toEqual([3]);
  });
  it('presets reference known categories', () => {
    expect(PRESETS['Vascular']).toContain('arteries');
    expect(PRESETS['Cortex only']).toEqual(['cortex']);
  });
  it('explode resets exactly at 0', () => {
    expect(explodeOffset('cortex', 0)).toEqual([0, 0, 0]);
    expect(explodeOffset('cortex', 1)[1]).toBeGreaterThan(0);
  });
  it('peel hides outside-in', () => {
    expect(peelHidden(0)).toEqual([]);
    expect(peelHidden(1)).toEqual(['meninges_dura']);
  });
});
