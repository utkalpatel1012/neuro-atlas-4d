import { describe, it, expect, beforeEach } from 'vitest';
import { useAtlas } from '../src/state/store';

beforeEach(() => {
  useAtlas.getState().reset();
});

describe('store P2', () => {
  it('branch visibility + isolate/showAll + nested 30% opacity', () => {
    const s = useAtlas.getState();
    const ids = ['a', 'b', 'c'];
    s.setBranchVisible(ids, false);
    expect(useAtlas.getState().nodes['a'].visible).toBe(false);
    s.isolate('b', ids);
    expect(useAtlas.getState().nodes['b'].visible).toBe(true);
    expect(useAtlas.getState().nodes['a'].visible).toBe(false);
    s.setNodeOpacity('b', 0.3);
    expect(useAtlas.getState().nodes['b'].opacity).toBeCloseTo(0.3);
    s.showAll(ids);
    expect(ids.every((id) => useAtlas.getState().nodes[id].visible)).toBe(true);
  });
  it('preset applies category visibility', () => {
    const s = useAtlas.getState();
    s.applyPreset(['cortex'], { n1: 'cortex', n2: 'arteries' });
    expect(useAtlas.getState().nodes['n1'].visible).toBe(true);
    expect(useAtlas.getState().nodes['n2'].visible).toBe(false);
  });
  it('explode/peel/xray/ghost/split clamp', () => {
    const s = useAtlas.getState();
    s.setExplode(2);
    s.setPeel(99);
    s.setGhost(-1);
    expect(useAtlas.getState().explode).toBe(1);
    expect(useAtlas.getState().peel).toBe(12);
    expect(useAtlas.getState().ghost).toBe(0);
    s.setXray(true);
    s.setSplit(true);
    expect(useAtlas.getState().xray).toBe(true);
    expect(useAtlas.getState().splitHemispheres).toBe(true);
  });
  it('multi-select toggles', () => {
    const s = useAtlas.getState();
    s.toggleMulti('x');
    s.toggleMulti('y');
    expect(useAtlas.getState().multiSelect).toEqual(['x', 'y']);
    s.toggleMulti('x');
    expect(useAtlas.getState().multiSelect).toEqual(['y']);
  });
});
