// Layer system v2 pure logic (F1-F3). UI in src/ui/LayerTree.tsx, state in src/state/store.ts.
export interface ManifestNode {
  id: number; name: string; label: string; category: string; side: string; region: string;
  ta2?: string[]; source?: string;
}

// Master toggles (spec F1): each maps to manifest categories. Vasculature MUST cover arteries + veins + sinuses.
export const MASTER_TOGGLES: Record<string, string[]> = {
  Vasculature: ['arteries', 'veins_sinuses'],
  'Cranial nerves': ['cranial_nerves'],
  Meninges: ['meninges_dura'],
  'White matter': ['white_matter'],
  'Deep nuclei': ['deep_grey', 'diencephalon'],
  Ventricles: ['ventricles'],
  'Spinal cord': ['spinal_cord'], // absent in base manifest → honest empty set (P5 PAM50)
  Tracts: ['tracts'],
};

export const PRESETS: Record<string, string[]> = {
  'Cortex only': ['cortex'],
  Limbic: ['deep_grey', 'diencephalon'],
  'Basal ganglia': ['deep_grey'],
  'Brainstem + cerebellum': ['brainstem', 'cerebellum'],
  Vascular: ['arteries', 'veins_sinuses'],
  Tracts: ['tracts', 'white_matter'],
  Ventricles: ['ventricles'],
};

// Peel order outside-in (spec F3). Depth 0 = all visible; each step hides one layer.
export const PEEL_ORDER = ['meninges_dura', 'arteries', 'veins_sinuses', 'cortex', 'white_matter', 'tracts', 'deep_grey', 'diencephalon', 'ventricles', 'cranial_nerves', 'brainstem', 'cerebellum'];

export function buildHierarchy(nodes: ManifestNode[]): Record<string, Record<string, ManifestNode[]>> {
  const tree: Record<string, Record<string, ManifestNode[]>> = {};
  for (const n of nodes) {
    const cat = n.category || 'unknown';
    const reg = n.region || 'unspecified';
    (tree[cat] ??= {})[reg] ??= [];
    tree[cat][reg].push(n);
  }
  return tree;
}

export function masterMembers(nodes: ManifestNode[], master: string): ManifestNode[] {
  const cats = MASTER_TOGGLES[master] ?? [];
  return nodes.filter((n) => cats.includes(n.category));
}

const fold = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();

export function searchNodes(nodes: ManifestNode[], query: string): ManifestNode[] {
  const q = fold(query);
  if (!q) return nodes;
  return nodes.filter((n) =>
    fold(`${n.label} ${n.name} ${(n.ta2 ?? []).join(' ')} ${n.category}`).includes(q),
  );
}

// Explode offsets: radial displacement per category group from brain centroid.
// Returns per-category direction vectors (unit) × factor. Pure + reset-exact (factor 0 → zero vector).
export function explodeOffset(category: string, factor: number): [number, number, number] {
  const dirs: Record<string, [number, number, number]> = {
    cortex: [0, 1, 0],
    cerebellum: [0, -1, -1],
    brainstem: [0, -1, 0],
    deep_grey: [1, 0, 0],
    diencephalon: [-1, 0, 0],
    white_matter: [0, 0, 1],
    tracts: [0, 0, -1],
    ventricles: [0, 0, 0],
    arteries: [1, 1, 0],
    veins_sinuses: [-1, 1, 0],
    cranial_nerves: [0, -1, 1],
    meninges_dura: [0, 1, 1],
  };
  const d = dirs[category] ?? [0, 0, 0];
  return [d[0] * factor, d[1] * factor, d[2] * factor];
}

export function peelHidden(peel: number): string[] {
  return PEEL_ORDER.slice(0, Math.max(0, Math.min(PEEL_ORDER.length, Math.round(peel))));
}
