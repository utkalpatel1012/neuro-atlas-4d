// World space: MNI152 mm, RAS+ (+x right, +y anterior, +z superior). 1 Three.js unit = 1 mm.
// All axis swaps live here (spec §3). Registration matrix is PENDING (pipeline/qc/registration.json
// status REGISTRATION_PENDING, matrix null) → P3 uses identity and documents it; no false MNI claims.
export type Mni = [number, number, number];
export type Mat4 = [
  number, number, number, number,
  number, number, number, number,
  number, number, number, number,
  number, number, number, number,
];
export const IDENTITY_4X4: Mat4 = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
export function applyMatrix([x, y, z]: Mni, m: Mat4): Mni {
  return [
    m[0] * x + m[1] * y + m[2] * z + m[3],
    m[4] * x + m[5] * y + m[6] * z + m[7],
    m[8] * x + m[9] * y + m[10] * z + m[11],
  ];
}
export function mniToThree([x, y, z]: Mni): [number, number, number] {
  return [x, y, z];
}
export function threeToMni([x, y, z]: [number, number, number]): Mni {
  return [x, y, z];
}
