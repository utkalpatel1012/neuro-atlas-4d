import { describe, it, expect } from 'vitest';
import { parseHash, buildHash } from '../src/state/deeplink';

describe('deeplink', () => {
  it('parses s/c/d/x/p', () => {
    const dl = parseHash('#s=ctx.frontal.dlpfc.L&c=circuit.mesolimbic-da&d=mdd&x=12,-8,33&p=Limbic');
    expect(dl.s).toBe('ctx.frontal.dlpfc.L');
    expect(dl.c).toBe('circuit.mesolimbic-da');
    expect(dl.d).toBe('mdd');
    expect(dl.x).toEqual([12, -8, 33]);
    expect(dl.p).toBe('Limbic');
  });
  it('rejects malformed x', () => {
    expect(parseHash('#x=1,2').x).toBeNull();
    expect(parseHash('#x=a,b,c').x).toBeNull();
  });
  it('round-trips', () => {
    const dl = { s: 'a', c: null, d: null, x: [1, 2, 3] as [number, number, number], p: null, vis: [] as string[] };
    expect(parseHash(buildHash(dl)).x).toEqual([1, 2, 3]);
  });
  it('empty hash', () => {
    expect(parseHash('')).toEqual({ s: null, c: null, d: null, x: null, p: null, vis: [] });
  });
  it('round-trips hidden masters', () => {
    const dl = { s: null, c: null, d: null, x: null, p: 'Vascular' as string | null, vis: ['Vasculature'] };
    expect(parseHash(buildHash(dl)).vis).toEqual(['Vasculature']);
  });
});
