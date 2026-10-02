// Vascular registry (P6, H9). Named segments registrable to CoW/sinus meshes; everything else is
// `proxy` ("cerebral artery branch"); perforators + medullary veins are `schematic` unless data found.
// Occlusion syndromes are DRAFT needs-source (§8: paraphrased concepts, never reproduced criteria).
export type Fidelity = 'named' | 'proxy' | 'schematic';
export interface Vessel {
  id: string; name: string; kind: 'artery' | 'vein' | 'sinus';
  supply: string; syndrome: string; fidelity: Fidelity;
}

const ARTERIES: Vessel[] = [
  { id: 'ica', name: 'Internal carotid artery (segments)', kind: 'artery', supply: 'Anterior circulation', syndrome: 'DRAFT — verify: ipsilateral visual + contralateral motor/sensory pattern.', fidelity: 'named' },
  { id: 'va', name: 'Vertebral artery', kind: 'artery', supply: 'Posterior circulation', syndrome: 'DRAFT — verify: lateral medullary pattern.', fidelity: 'named' },
  { id: 'ba', name: 'Basilar artery', kind: 'artery', supply: 'Pons / midbrain / SCA-AICA territories', syndrome: 'DRAFT — verify: locked-in vs top-of-basilar patterns.', fidelity: 'named' },
  { id: 'a1', name: 'A1 (anterior cerebral)', kind: 'artery', supply: 'Medial frontal', syndrome: 'DRAFT — verify: contralateral leg weakness.', fidelity: 'proxy' },
  { id: 'a2', name: 'A2 (pericallosal)', kind: 'artery', supply: 'Medial frontal/parietal', syndrome: 'DRAFT — verify: leg-dominant signs.', fidelity: 'proxy' },
  { id: 'acomm', name: 'Anterior communicating artery', kind: 'artery', supply: 'CoW collateral', syndrome: 'DRAFT — verify: memory/behavioural pattern when lesioned.', fidelity: 'named' },
  { id: 'm1', name: 'M1 (middle cerebral)', kind: 'artery', supply: 'Lateral convexity', syndrome: 'DRAFT — verify: face/arm-dominant signs + aphasia/neglect by side.', fidelity: 'proxy' },
  { id: 'm2m4', name: 'M2–M4 branches', kind: 'artery', supply: 'Opercular / cortical MCA', syndrome: 'DRAFT — verify: cortical stroke patterns.', fidelity: 'proxy' },
  { id: 'pcomm', name: 'Posterior communicating artery', kind: 'artery', supply: 'CoW collateral / thalamus', syndrome: 'DRAFT — verify: CN III palsy pattern.', fidelity: 'proxy' },
  { id: 'p1p3', name: 'P1–P3 (posterior cerebral)', kind: 'artery', supply: 'Occipital / medial temporal', syndrome: 'DRAFT — verify: hemianopia + memory pattern.', fidelity: 'proxy' },
  { id: 'achor', name: 'Anterior choroidal artery', kind: 'artery', supply: 'Posterior limb / optic tract / hippocampus', syndrome: 'DRAFT — verify: classic triad pattern.', fidelity: 'proxy' },
  { id: 'aica', name: 'AICA', kind: 'artery', supply: 'Lateral pons / inner ear', syndrome: 'DRAFT — verify: lateral pontine pattern.', fidelity: 'proxy' },
  { id: 'pica', name: 'PICA', kind: 'artery', supply: 'Lateral medulla / cerebellum', syndrome: 'DRAFT — verify: Wallenberg pattern.', fidelity: 'proxy' },
  { id: 'sca', name: 'SCA', kind: 'artery', supply: 'Superior cerebellum / midbrain', syndrome: 'DRAFT — verify: superior cerebellar pattern.', fidelity: 'proxy' },
  { id: 'lenticulostriate', name: 'Lenticulostriate perforators', kind: 'artery', supply: 'Striatocapsular', syndrome: 'DRAFT — verify: pure-motor lacunar pattern.', fidelity: 'schematic' },
  { id: 'pontine-perf', name: 'Pontine perforators', kind: 'artery', supply: 'Basis pontis', syndrome: 'DRAFT — verify: ataxic hemiparesis pattern.', fidelity: 'schematic' },
];

const VEINS_SINUSES: Vessel[] = [
  { id: 'sss', name: 'Superior sagittal sinus', kind: 'sinus', supply: 'Venous drainage', syndrome: 'DRAFT — verify: venous hypertension pattern.', fidelity: 'named' },
  { id: 'iss', name: 'Inferior sagittal sinus', kind: 'sinus', supply: 'Venous drainage', syndrome: 'DRAFT — verify.', fidelity: 'proxy' },
  { id: 'transverse', name: 'Transverse sinus', kind: 'sinus', supply: 'Venous drainage', syndrome: 'DRAFT — verify.', fidelity: 'named' },
  { id: 'sigmoid', name: 'Sigmoid sinus', kind: 'sinus', supply: 'Venous drainage → IJV', syndrome: 'DRAFT — verify.', fidelity: 'named' },
  { id: 'cavernous', name: 'Cavernous sinus', kind: 'sinus', supply: 'Orbito-cavernous drainage', syndrome: 'DRAFT — verify: ophthalmoplegia pattern.', fidelity: 'named' },
  { id: 'petrosal', name: 'Petrosal sinuses', kind: 'sinus', supply: 'Posterior fossa drainage', syndrome: 'DRAFT — verify.', fidelity: 'proxy' },
  { id: 'confluence', name: 'Confluence of sinuses', kind: 'sinus', supply: 'Venous confluence', syndrome: 'DRAFT — verify.', fidelity: 'proxy' },
  { id: 'ijv', name: 'Internal jugular vein', kind: 'vein', supply: 'Extracranial outflow', syndrome: 'DRAFT — verify.', fidelity: 'named' },
  { id: 'labbe', name: 'Vein of Labbé', kind: 'vein', supply: 'Lateral temporal drainage', syndrome: 'DRAFT — verify: aphasia/seizure pattern.', fidelity: 'proxy' },
  { id: 'trolard', name: 'Vein of Trolard', kind: 'vein', supply: 'Frontoparietal drainage', syndrome: 'DRAFT — verify.', fidelity: 'proxy' },
  { id: 'icv', name: 'Internal cerebral veins', kind: 'vein', supply: 'Deep drainage', syndrome: 'DRAFT — verify.', fidelity: 'proxy' },
  { id: 'rosenthal', name: 'Basal vein of Rosenthal', kind: 'vein', supply: 'Deep drainage', syndrome: 'DRAFT — verify.', fidelity: 'proxy' },
  { id: 'galen', name: 'Vein of Galen', kind: 'vein', supply: 'Deep confluence', syndrome: 'DRAFT — verify: developmental pattern.', fidelity: 'proxy' },
  { id: 'straight', name: 'Straight sinus', kind: 'sinus', supply: 'Deep drainage', syndrome: 'DRAFT — verify.', fidelity: 'named' },
  { id: 'medullary-vein', name: 'Medullary veins', kind: 'vein', supply: 'Superficial drainage', syndrome: 'DRAFT — verify.', fidelity: 'schematic' },
];

export const VESSELS: Vessel[] = [...ARTERIES, ...VEINS_SINUSES];

export const TERRITORIES = ['ACA', 'MCA', 'PCA', 'vertebrobasilar'] as const;
export type Territory = (typeof TERRITORIES)[number];

// H9 rule: named only with CoW/sinus registration or topology justification; else proxy; perforators schematic.
export function labelFidelity(id: string, registered: boolean): Fidelity {
  const v = VESSELS.find((x) => x.id === id);
  if (!v) return 'proxy';
  if (v.fidelity === 'schematic') return 'schematic';
  return registered ? 'named' : 'proxy';
}

export function proxyLabel(v: Vessel): string {
  return v.fidelity === 'named' ? v.name : v.kind === 'artery' ? `${v.name} — cerebral artery branch (proxy)` : `${v.name} (proxy)`;
}
