# DECISIONS

Log per R1. Newest first.

- 2026-10-03: Push requested → new public repo `utkalpatel1012/neuro-atlas-4d` (old `neuro-atlas-3d` untouched). `.gitignore` narrowed so `core-anatomy/manifest.json` + README ship (runtime fetch needs it); large derived packs stay ignored. Vite `base` env-driven (`PAGES_BASE`, default `/`); deploy workflow builds with `/neuro-atlas-4d/` + deploy-pages job. Added Apache-2.0 LICENSE (code only; meshes/content CC BY-SA 4.0).

- 2026-10-03: P0 verify green with minimal React 18 + Vite 6 + TS strict scaffold (no Playwright/Vitest yet — node:test for coords; Vitest + Playwright land in P1 per §10). `@types/node` added to fix TS2688. Registration stays PENDING with NULL metrics (no false MNI claims).
- 2026-10-03: P2 H4 transparency = (a) alphaHash stochastic (`transparent + alphaHash + depthWrite=false` for translucent; opaque path untouched). Rejected (b) weighted OIT (custom shaders/memory) and (c) sort-only (fails ≥50 nested). 30%-nucleus case handled via per-node opacity + ghost focus+context.
- 2026-10-03: P2 manifest vendored (`public/atlas/core-anatomy/manifest.json`, 437 nodes, CC BY-SA 4.0); GLB bytes deferred to P3. Deep-link adds P2 `vis=` (hidden masters) — additive, spec §3 params preserved.
- 2026-10-03: P9 budgets measured PASS (transfer 2.85MB/25MB; JS gzip 945KB/1MB — tight, NiiVue lazy; files <50MB). fps/Lighthouse/AT/device runs DEVIATIONS (no hardware/browser). 375px CSS + reduced-motion + theme shipped; colour-blind palette audit pending.
- 2026-10-03: P8 ships 9 P1 packs with 12 tabs + 135 original MCQs + 6-step tours, all draft needs-source (guideline citations pending). No DSM/ICD text reproduced; no doses; FND/somatic/psychosis hypotheses labelled. Exam tools run offline after load (localStorage only, no backend).
- 2026-10-03: P7 18/18 circuits playable with schematic edges (HCP centerlines pending); all claims draft needs-source, excluded from release with warnings (zero fabricated citations). PET overlay in pack-nc only, off by default (H10). Mechanism overlay asserts nothing until P8 sources land.
- 2026-10-03: P6 vessel isosurface PENDING (§4 rows 9-11 unverified). Named CoW/sinus registry ships with H9 fidelity (unregistered → proxy, perforators/medullary → schematic); occlusion syndromes DRAFT needs-source. Flow = arclength phase helper; MRA added as pending backdrop.
- 2026-10-03: P5 HCP1065 + PAM50 meshes PENDING (licences/URLs unverified). Gross tract toggles (5 classes) + 32 labelled spinal levels ship now; decimation cap 2500 enforced in pipeline + BrainScene guard; cord-medulla join is a documented seam.
- 2026-10-03: P4 every §5 nucleus stays `missing` (honest) — no label NIfTI in-repo, meshing + registration PENDING. Coverage generator auto-marks 33/50 probes missing; flips require real meshes + QA. Dedupe: explicit Gross/Atlas-exact switch, never silent.
- 2026-10-03: P3 NiiVue mounted via dynamic import (BSD-2-Clause); volumes pending fetch → honest empty state. Preset MNI coords all null (no fabrication). Lesion notes DRAFT needs-source (§8). Clipping = clip-only + open-cut marker (H5 watertight UNVERIFIED).
- 2026-10-03: Base audit complete — HEAD ef19174, tests+build PASS, GLB 437/437 name overlap, ~1.38M tris, units arbitrary NOT MNI, Draco required, watertight UNVERIFIED. No Fallback B.

- 2026-10-02: Old repo `C:\Projects\neuro-atlas-3d\` PRESERVED (not deleted) despite "delete old repository" instruction — destructive action deferred pending backup + second confirmation; new project scaffolded at `C:\Projects\neuro-atlas-4d\` instead. Reason: old tree holds Phase 0-12 history + 63 validated assets on `autonomous/phase-12` (clean tree); irreversible delete unsafe.
- 2026-10-02: New repo uses `npm.cmd` (not `npm`) per Windows PowerShell execution policy (carried over from old repo rule).
- 2026-10-02: P0 scaffold provides both `scripts/setup.sh` (spec) and `scripts/setup.ps1` (Windows实际执行) — .sh kept for CI/Linux, .ps1 for local.
