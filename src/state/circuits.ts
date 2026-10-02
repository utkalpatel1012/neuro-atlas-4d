// Circuit engine (F6): JSON-driven playback. Nodes carry schematic markers until HCP centerlines
// land; every edge MUST have geometry + fidelity (validator-enforced). Travelling pulses advance with
// timelineT; step captions resolve from steps by t. Receptor glyph clouds are schematic markers.
export type Transmitter = 'dopamine' | 'serotonin' | 'noradrenaline' | 'acetylcholine' | 'histamine' | 'orexin' | 'GABA' | 'glutamate' | 'opioid' | 'endocannabinoid';
export const TRANSMITTER_COLORS: Record<Transmitter, string> = {
  dopamine: '#e08a3c', serotonin: '#7aa2e8', noradrenaline: '#9b7ede', acetylcholine: '#6fc2a5',
  histamine: '#d97b9b', orexin: '#c9b458', GABA: '#5aa9e6', glutamate: '#e05c5c',
  opioid: '#8a9ba8', endocannabinoid: '#7bc96f',
};
export interface CircuitStep { t: number; caption: string; activeEdges: string[]; claimIds: string[] }
export interface CircuitEdge { id: string; from: string; to: string; transmitter: string; effect: string; geometry: { type: string; ref: string | null; fidelity: string } }
export interface Circuit { id: string; name: string; category: string; nodes: unknown[]; edges: CircuitEdge[]; steps: CircuitStep[]; reviewStatus: string }

export function activeStep(steps: CircuitStep[], t: number): CircuitStep | null {
  let best: CircuitStep | null = null;
  for (const s of steps) {
    if (s.t <= t + 1e-9 && (!best || s.t >= best.t)) best = s;
  }
  return best;
}

// Pulse position along schematic spline [0,1] given global t and edge index (deterministic).
export function pulsePosition(t: number, edgeIndex: number, edgeCount: number): number {
  if (edgeCount <= 0) return 0;
  const local = (t * edgeCount - edgeIndex) % 1;
  return ((local % 1) + 1) % 1;
}
