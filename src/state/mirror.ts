// H3 hemisphere mirror (Allen HRA-3D covers one hemisphere): mirror across the source space
// midsagittal plane, then verify laterality against the GLB (side metadata, never centroid sign alone).
export function mirrorX(x: number, midX = 0): number {
  return 2 * midX - x;
}
export function mirrorSide(side: 'left' | 'right' | 'median'): 'left' | 'right' | 'median' {
  return side === 'left' ? 'right' : side === 'right' ? 'left' : 'median';
}
