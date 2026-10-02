import { describe, it, expect } from 'vitest';
import { mniToThree, threeToMni } from '../src/coords';

describe('coords', () => {
  it('round-trips MNI RAS+', () => {
    const p: [number, number, number] = [12.5, -8, 33];
    expect(threeToMni(mniToThree(p))).toEqual(p);
  });
  it('origin maps to origin', () => {
    expect(mniToThree([0, 0, 0])).toEqual([0, 0, 0]);
  });
});
