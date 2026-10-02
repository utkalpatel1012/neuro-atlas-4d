# NeuroAtlas 4D

Free, open-source, browser-based interactive 3D/4D atlas of the human nervous system for
neuroanatomy teaching (neurology + psychiatry lens). **Educational use — not for clinical decisions.**

All medical text is **DRAFT until verified** against textbooks/guidelines (visible “Draft — verify” badges).

## Quick start (Windows PowerShell 5.1)

- `npm.cmd ci`
- `npm.cmd run verify` (typecheck + lint + strict content + tests + mapping + alignment + build)
- `npm.cmd run dev` / `npm.cmd run build` / `npm.cmd run preview`
- `python pipeline/fetch.py --core` (after §4 licences/URLs verified; currently skips honestly)

## Docs

- Spec: `docs/MASTER_SPEC.md` · Progress: `docs/PROGRESS.md` · Decisions/Blockers/Audit/Coverage/Alignment/Self-review in `docs/`
- Architecture: `docs/ARCHITECTURE.md` · Pipeline: `docs/DATA_PIPELINE.md` · Content: `docs/CONTENT_GUIDE.md`
- Licences: `DATA_LICENSES.md` (per-asset, all UNVERIFIED → NC-optional) · `THIRD-PARTY-NOTICES.md`

## Licences

New code Apache-2.0; new content/models CC BY-SA 4.0. Upstream base assets CC BY-SA 4.0 (Z-Anatomy/BodyParts3D).
NC data only in optional `pack-nc` (off by default); ND data excluded.
