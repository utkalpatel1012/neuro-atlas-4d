import test from 'node:test';
import assert from 'node:assert/strict';
// Coords round-trip (spec §3, R7). Duplicated in TS form in P1 Vitest; P0 uses node:test.
const mniToThree = ([x, y, z]) => [x, y, z];
const threeToMni = ([x, y, z]) => [x, y, z];
test('mni round-trip', () => {
  const p = [12.5, -8, 33];
  assert.deepEqual(threeToMni(mniToThree(p)), p);
});
test('origin maps to origin (P0 identity; P3 adds registration matrix)', () => {
  assert.deepEqual(mniToThree([0, 0, 0]), [0, 0, 0]);
});
