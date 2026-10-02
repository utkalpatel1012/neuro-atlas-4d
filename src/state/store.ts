import { create } from 'zustand';

export type NodeState = { visible: boolean; opacity: number; colorOverride: string | null };
export type Mode = 'explore' | 'quiz' | 'viva';
export type Mni = [number, number, number];

export interface AtlasState {
  nodes: Record<string, NodeState>;
  selection: string | null;
  hover: string | null;
  crosshairMNI: Mni;
  activeCircuit: string | null;
  timelineT: number;
  activeDisorder: string | null;
  layerPreset: string | null;
  mode: Mode;
  sync3dMri: boolean;
  multiSelect: string[];
  explode: number;
  peel: number;
  xray: boolean;
  ghost: number;
  splitHemispheres: boolean;
  hiddenMasters: string[];
  clip: { axial: number; coronal: number; sagittal: number; oblique: number };
  mriBackdrop: 'T1w' | 'T2w' | 'PDw' | 'MRA';
  labelOpacity: number;
  anatomyMode: 'gross' | 'exact';
  tractVisibility: Record<string, boolean>;
  spinalVisible: boolean;
  mriTractography: boolean;
  territoryOverlay: boolean;
  vascularFlow: boolean;
  ensureNode: (id: string) => void;
  setNodeVisible: (id: string, visible: boolean) => void;
  setNodeOpacity: (id: string, opacity: number) => void;
  setColorOverride: (id: string, color: string | null) => void;
  select: (id: string | null) => void;
  setHover: (id: string | null) => void;
  setCrosshair: (mni: Mni) => void;
  setCircuit: (id: string | null) => void;
  setTimeline: (t: number) => void;
  setDisorder: (id: string | null) => void;
  setPreset: (p: string | null) => void;
  setMode: (m: Mode) => void;
  setSync: (on: boolean) => void;
  toggleMulti: (id: string) => void;
  clearMulti: () => void;
  setBranchVisible: (ids: string[], visible: boolean) => void;
  setBranchOpacity: (ids: string[], opacity: number) => void;
  isolate: (id: string, allIds: string[]) => void;
  showAll: (allIds: string[]) => void;
  applyPreset: (cats: string[], nodeCats: Record<string, string>) => void;
  setExplode: (v: number) => void;
  setPeel: (v: number) => void;
  setXray: (on: boolean) => void;
  setGhost: (v: number) => void;
  setSplit: (on: boolean) => void;
  setHiddenMasters: (m: string[]) => void;
  setClip: (c: { axial: number; coronal: number; sagittal: number; oblique: number }) => void;
  setMriBackdrop: (b: 'T1w' | 'T2w' | 'PDw' | 'MRA') => void;
  setLabelOpacity: (v: number) => void;
  setAnatomyMode: (m: 'gross' | 'exact') => void;
  setTractClass: (cls: string, visible: boolean) => void;
  setSpinalVisible: (v: boolean) => void;
  setMriTractography: (on: boolean) => void;
  setTerritoryOverlay: (on: boolean) => void;
  setVascularFlow: (on: boolean) => void;
  reset: () => void;
}

const DEFAULT_NODE: NodeState = { visible: true, opacity: 1, colorOverride: null };

export const useAtlas = create<AtlasState>((set) => ({
  nodes: {},
  selection: null,
  hover: null,
  crosshairMNI: [0, 0, 0],
  activeCircuit: null,
  timelineT: 0,
  activeDisorder: null,
  layerPreset: null,
  mode: 'explore',
  sync3dMri: true,
  multiSelect: [],
  explode: 0,
  peel: 0,
  xray: false,
  ghost: 0.15,
  splitHemispheres: false,
  hiddenMasters: [],
  clip: { axial: 0, coronal: 0, sagittal: 0, oblique: 0 },
  mriBackdrop: 'T1w',
  labelOpacity: 0.5,
  anatomyMode: 'gross',
  tractVisibility: { association: true, projection: true, commissural: true, 'cerebellar/brainstem': true, 'cranial-nerve': true },
  spinalVisible: true,
  mriTractography: false,
  territoryOverlay: false,
  vascularFlow: true,
  ensureNode: (id) => set((s) => (s.nodes[id] ? s : { nodes: { ...s.nodes, [id]: { ...DEFAULT_NODE } } })),
  setNodeVisible: (id, visible) => set((s) => ({
    nodes: { ...s.nodes, [id]: { ...(s.nodes[id] ?? DEFAULT_NODE), visible } },
  })),
  setNodeOpacity: (id, opacity) => set((s) => ({
    nodes: { ...s.nodes, [id]: { ...(s.nodes[id] ?? DEFAULT_NODE), opacity: Math.min(1, Math.max(0, opacity)) } },
  })),
  setColorOverride: (id, color) => set((s) => ({
    nodes: { ...s.nodes, [id]: { ...(s.nodes[id] ?? DEFAULT_NODE), colorOverride: color } },
  })),
  select: (selection) => set({ selection }),
  setHover: (hover) => set({ hover }),
  setCrosshair: (crosshairMNI) => set({ crosshairMNI }),
  setCircuit: (activeCircuit) => set({ activeCircuit }),
  setTimeline: (timelineT) => set({ timelineT: Math.min(1, Math.max(0, timelineT)) }),
  setDisorder: (activeDisorder) => set({ activeDisorder }),
  setPreset: (layerPreset) => set({ layerPreset }),
  setMode: (mode) => set({ mode }),
  setSync: (sync3dMri) => set({ sync3dMri }),
  toggleMulti: (id) => set((s) => ({
    multiSelect: s.multiSelect.includes(id) ? s.multiSelect.filter((m) => m !== id) : [...s.multiSelect, id],
  })),
  clearMulti: () => set({ multiSelect: [] }),
  setBranchVisible: (ids, visible) => set((s) => {
    const nodes = { ...s.nodes };
    for (const id of ids) nodes[id] = { ...(nodes[id] ?? DEFAULT_NODE), visible };
    return { nodes };
  }),
  setBranchOpacity: (ids, opacity) => set((s) => {
    const v = Math.min(1, Math.max(0, opacity));
    const nodes = { ...s.nodes };
    for (const id of ids) nodes[id] = { ...(nodes[id] ?? DEFAULT_NODE), opacity: v };
    return { nodes };
  }),
  isolate: (id, allIds) => set((s) => {
    const nodes = { ...s.nodes };
    for (const aid of allIds) nodes[aid] = { ...(nodes[aid] ?? DEFAULT_NODE), visible: aid === id };
    return { nodes, selection: id };
  }),
  showAll: (allIds) => set((s) => {
    const nodes = { ...s.nodes };
    for (const aid of allIds) nodes[aid] = { ...(nodes[aid] ?? DEFAULT_NODE), visible: true };
    return { nodes };
  }),
  applyPreset: (cats, nodeCats) => set((s) => {
    const nodes = { ...s.nodes };
    for (const [id, cat] of Object.entries(nodeCats)) {
      nodes[id] = { ...(nodes[id] ?? DEFAULT_NODE), visible: cats.includes(cat) };
    }
    return { nodes };
  }),
  setExplode: (explode) => set({ explode: Math.min(1, Math.max(0, explode)) }),
  setPeel: (peel) => set({ peel: Math.min(12, Math.max(0, peel)) }),
  setXray: (xray) => set({ xray }),
  setGhost: (ghost) => set({ ghost: Math.min(1, Math.max(0, ghost)) }),
  setSplit: (splitHemispheres) => set({ splitHemispheres }),
  setHiddenMasters: (hiddenMasters) => set({ hiddenMasters }),
  setClip: (clip) => set({ clip }),
  setMriBackdrop: (mriBackdrop) => set({ mriBackdrop }),
  setLabelOpacity: (labelOpacity) => set({ labelOpacity: Math.min(1, Math.max(0, labelOpacity)) }),
  setAnatomyMode: (anatomyMode) => set({ anatomyMode }),
  setTractClass: (cls, visible) => set((s) => ({ tractVisibility: { ...s.tractVisibility, [cls]: visible } })),
  setSpinalVisible: (spinalVisible) => set({ spinalVisible }),
  setMriTractography: (mriTractography) => set({ mriTractography }),
  setTerritoryOverlay: (territoryOverlay) => set({ territoryOverlay }),
  setVascularFlow: (vascularFlow) => set({ vascularFlow }),
  reset: () => set({
    nodes: {}, selection: null, hover: null, crosshairMNI: [0, 0, 0],
    activeCircuit: null, timelineT: 0, activeDisorder: null, layerPreset: null, mode: 'explore', sync3dMri: true,
    multiSelect: [], explode: 0, peel: 0, xray: false, ghost: 0.15, splitHemispheres: false, hiddenMasters: [],
    clip: { axial: 0, coronal: 0, sagittal: 0, oblique: 0 }, mriBackdrop: 'T1w', labelOpacity: 0.5, anatomyMode: 'gross',
    tractVisibility: { association: true, projection: true, commissural: true, 'cerebellar/brainstem': true, 'cranial-nerve': true },
    spinalVisible: true, mriTractography: false, territoryOverlay: false, vascularFlow: true,
  }),
}));
