import { describe, it, expect, beforeEach } from 'vitest';
import { useAtlas } from '../src/state/store';

beforeEach(() => {
  useAtlas.getState().reset();
});

describe('store', () => {
  it('toggles node visibility + clamps opacity', () => {
    const { ensureNode, setNodeVisible, setNodeOpacity } = useAtlas.getState();
    ensureNode('n1');
    setNodeVisible('n1', false);
    expect(useAtlas.getState().nodes['n1'].visible).toBe(false);
    setNodeOpacity('n1', 2);
    expect(useAtlas.getState().nodes['n1'].opacity).toBe(1);
    setNodeOpacity('n1', -1);
    expect(useAtlas.getState().nodes['n1'].opacity).toBe(0);
  });
  it('selection + crosshair + timeline clamp', () => {
    const s = useAtlas.getState();
    s.select('ctx.frontal.dlpfc.L');
    s.setCrosshair([1, 2, 3]);
    s.setTimeline(5);
    expect(useAtlas.getState().selection).toBe('ctx.frontal.dlpfc.L');
    expect(useAtlas.getState().crosshairMNI).toEqual([1, 2, 3]);
    expect(useAtlas.getState().timelineT).toBe(1);
  });
  it('mode + reset', () => {
    useAtlas.getState().setMode('quiz');
    expect(useAtlas.getState().mode).toBe('quiz');
    useAtlas.getState().reset();
    expect(useAtlas.getState().selection).toBeNull();
    expect(useAtlas.getState().mode).toBe('explore');
  });
});
