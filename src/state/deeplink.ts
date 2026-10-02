// Deep links: #s=<structureId> #c=<circuitId> #d=<disorderId> #x=<x,y,z> #p=<preset> (spec §3).
export interface DeepLink {
  s: string | null; c: string | null; d: string | null;
  x: [number, number, number] | null; p: string | null;
  vis: string[]; // P2 additive: hidden master-toggle groups (e.g. ["Vasculature"]). Absent = all visible.
}
export function parseHash(hash: string): DeepLink {
  const h = hash.startsWith('#') ? hash.slice(1) : hash;
  const q = new URLSearchParams(h);
  const s = q.get('s');
  const c = q.get('c');
  const d = q.get('d');
  const p = q.get('p');
  let x: DeepLink['x'] = null;
  const xs = q.get('x');
  if (xs) {
    const parts = xs.split(',').map(Number);
    if (parts.length === 3 && parts.every((n) => Number.isFinite(n))) x = [parts[0], parts[1], parts[2]];
  }
  const vis = (q.get('vis') ?? '').split(',').map((s) => s.trim()).filter(Boolean);
  return { s, c, d, x, p, vis };
}
export function buildHash(dl: DeepLink): string {
  const q = new URLSearchParams();
  if (dl.s) q.set('s', dl.s);
  if (dl.c) q.set('c', dl.c);
  if (dl.d) q.set('d', dl.d);
  if (dl.x) q.set('x', dl.x.join(','));
  if (dl.p) q.set('p', dl.p);
  if (dl.vis.length) q.set('vis', dl.vis.join(','));
  const s = q.toString();
  return s ? `#${s}` : '';
}
