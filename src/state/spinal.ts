// Spinal levels (P5). Ordered segment list + cord landmarks. Coordinates/vascular micro-anatomy
// (dorsal/ventral horns, DRG, Adamkiewicz) are `missing` until PAM50 meshes land — no fabrication (R2).
export const SPINAL_LEVELS = [
  ...['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8'].map((id) => ({ id, region: 'cervical' as const })),
  ...['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'].map((id) => ({ id, region: 'thoracic' as const })),
  ...['L1', 'L2', 'L3', 'L4', 'L5'].map((id) => ({ id, region: 'lumbar' as const })),
  ...['S1', 'S2', 'S3', 'S4', 'S5'].map((id) => ({ id, region: 'sacral' as const })),
  { id: 'conus', region: 'conus' as const },
  { id: 'filum', region: 'filum' as const },
];
export type SpinalLevel = (typeof SPINAL_LEVELS)[number];

export const SPINAL_TRACT_SLOTS = [
  'corticospinal', 'DCML', 'spinothalamic', 'spinocerebellar',
] as const;

// Brainstem join: cord C1 abuts medulla; seam is an explicit record, never a silent weld.
export const BRAINSTEM_SEAM = { from: 'medulla', to: 'C1', status: 'DOCUMENTED-SEAM (meshes pending)' } as const;
