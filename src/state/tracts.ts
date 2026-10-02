// Tract classes + budgets (P5, H6). Base manifest carries 54 gross `tracts` + 9 `white_matter`.
// HCP1065 decimated bundles land in P5-pipeline; until then toggles drive the gross categories honestly.
export const TRACT_CLASSES = [
  'association',
  'projection',
  'commissural',
  'cerebellar/brainstem',
  'cranial-nerve',
] as const;
export type TractClass = (typeof TRACT_CLASSES)[number];

export const MAX_STREAMLINES_PER_BUNDLE = 2500;
export const MAX_TOTAL_VERTICES = 600000; // LOD guard (§9); enforced by decimation + tube radialSegments.

// Stride decimation: keep every kth streamline so count ≤ cap. Pure + deterministic.
export function decimateCount(count: number, cap = MAX_STREAMLINES_PER_BUNDLE): { kept: number; stride: number } {
  if (count <= cap) return { kept: count, stride: 1 };
  const stride = Math.ceil(count / cap);
  return { kept: Math.ceil(count / stride), stride };
}

// Gross-manifest mapping: base `tracts`/`white_matter` labels contain these keywords (audited P0).
const CLASS_KEYWORDS: Record<TractClass, string[]> = {
  association: ['arcuate', 'longitudinal', 'fronto-occipital', 'uncinate', 'cingulum'],
  projection: ['corticospinal', 'corticobulbar', 'corona', 'capsule', 'radiation', 'lemniscus', 'spinothalamic'],
  commissural: ['callosum', 'commissure'],
  'cerebellar/brainstem': ['cerebellar', 'peduncle', 'fornix', 'stria'],
  'cranial-nerve': ['nerve', 'optic', 'olfactory'],
};

export function classifyTract(label: string): TractClass | null {
  const l = label.toLowerCase();
  for (const [cls, kws] of Object.entries(CLASS_KEYWORDS) as [TractClass, string[]][]) {
    if (kws.some((k) => l.includes(k))) return cls;
  }
  return null;
}
