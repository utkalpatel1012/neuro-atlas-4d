// Radiology teaching presets (F4). Coordinates are PENDING template fetch — no invented MNI numbers (R2).
// Each preset names the plane + level + labelled structures + DRAFT lesion note (needs-source, §8).
export interface RadioPreset {
  id: string; plane: 'axial' | 'coronal' | 'sagittal' | 'midsagittal'; level: string;
  structures: string[]; lesionNote: string; mni: [number, number, number] | null;
}
export const RADIO_PRESETS: RadioPreset[] = [
  { id: 'ax-bg', plane: 'axial', level: 'basal ganglia / thalamus', structures: ['caudate', 'putamen', 'GPe/GPi', 'thalamus'], lesionNote: 'DRAFT — verify: striatocapsular lesions → contralateral motor signs.', mni: null },
  { id: 'ax-mb', plane: 'axial', level: 'midbrain', structures: ['cerebral peduncle', 'red nucleus', 'PAG', 'SC'], lesionNote: 'DRAFT — verify: Weber/Benedikt/Claude syndromes by level.', mni: null },
  { id: 'ax-pons', plane: 'axial', level: 'pons', structures: ['basis pontis', 'tegmentum', 'CN V-VIII'], lesionNote: 'DRAFT — verify: Millard-Gubler vs locked-in patterns.', mni: null },
  { id: 'ax-medulla', plane: 'axial', level: 'medulla', structures: ['pyramid', 'olive', 'area postrema'], lesionNote: 'DRAFT — verify: Wallenberg lateral medullary pattern.', mni: null },
  { id: 'ax-cord', plane: 'axial', level: 'cervical cord', structures: ['dorsal columns', 'corticospinal', 'spinothalamic'], lesionNote: 'DRAFT — verify: Brown-Séquard / central / anterior patterns.', mni: null },
  { id: 'cor-amg', plane: 'coronal', level: 'amygdala / hippocampus', structures: ['amygdala', 'hippocampus', 'entorhinal'], lesionNote: 'DRAFT — verify: mesial temporal sclerosis substrate.', mni: null },
  { id: 'sag-mid', plane: 'midsagittal', level: 'midline', structures: ['corpus callosum', 'cingulate', 'cerebellar vermis', 'brainstem'], lesionNote: 'DRAFT — verify: callosal / vermian midline lesions.', mni: null },
];
