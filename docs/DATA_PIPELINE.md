# DATA_PIPELINE

All downloads via `pipeline/fetch.py` (pinned URLs + sha256, `data-raw/` git-ignored, idempotent).
§4 licences/URLs currently UNVERIFIED → fetch skips honestly (exit 2), app builds offline from `public/atlas/`.

Stages: `register_glb_to_mni.py` (7-DoF ICP → `pipeline/qc/registration.json`) ·
`labels_to_meshes.py` (→ `meshing.json`) · `tracts_to_meshes.py` (→ `tracts.json`, ≤2500/bundle) ·
`spinal.py` (→ `spinal.json`) · `vessels.py` (→ `vessels.json`, H9).
QC: `pipeline/qc/` (NULL metrics = PENDING, never illustrative).
Derived: `coverage-gen.mjs` → `docs/COVERAGE.md`; `alignment-gen.mjs` → `docs/ALIGNMENT.md`;
`copy-content.mjs` → `public/content/`; `budget-check.mjs` → §9 report.
