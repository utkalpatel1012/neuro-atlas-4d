# Dedupe rule — gross (`brain.glb`) vs atlas-exact meshes (H2)

- Both modes coexist behind an explicit UI switch: **Gross anatomy** (GLB, `registered`-at-best) vs
  **Atlas-exact** (P4 meshes, `exact` where marching-cubed from MNI labels at stated resolution).
- Never swap silently. Default = Gross anatomy until registration QA passes.
- Same structure in both modes: show both, label fidelity per mode, keep `brain.glb` node untouched.
- Crosswalk merges ONLY on exact ids or reviewed aliases (H7). No fuzzy-name merges without a
  logged review row in `pipeline/crosswalk.csv` + `docs/DECISIONS.md`.
