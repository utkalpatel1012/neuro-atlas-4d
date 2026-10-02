# AGENTS.md — NeuroAtlas 4D (new repo, P0 scaffold)

Source spec: `docs/MASTER_SPEC.md` (Master Prompt prepared 2 Oct 2026).
Old repo `C:\Projects\neuro-atlas-3d\` is PRESERVED untouched (branch `autonomous/phase-12`, tree clean as of 2026-10-02). No delete performed. Do not delete it until user gives second explicit confirmation after backup.

## Commands (Windows PowerShell 5.1)

- `npm.cmd ci` — clean install (never `npm`, PowerShell blocks `npm.ps1`).
- `npm.cmd run verify` = typecheck + lint + `lint:content:strict` + unit tests + `test:mapping` + `test:alignment` + build. CI runs it on every push. Must be green before any phase commit.
- `python pipeline/fetch.py --core` — downloads only (network step). App must build offline from `public/atlas/` afterwards.
- Chain with `cmd1; if ($?) { cmd2 }` (no `&&`).

## Conventions (from Master Prompt R1-R8)

- R1 Autonomy: decide, log in `docs/DECISIONS.md`, continue. If blocked, write blocker + exact manual steps in `docs/BLOCKERS.md`, continue other work.
- R2 No fabrication: every structure has fidelity `exact|registered|proxy|schematic`; missing → `missing` row in `docs/COVERAGE.md`. Never fake geometry, coordinates, citations, DOIs, licences.
- R3 Licences: core allows CC0/CC BY/CC BY-SA + permissive/LGPL tools. NC only in optional `pack-nc` (off by default, separate files). ND excluded. Record every asset in `DATA_LICENSES.md`. New code Apache-2.0, new content/models CC BY-SA 4.0.
- R4 Reproducible data: all downloads via `pipeline/fetch.py` (pinned URLs + sha256, cache git-ignored `data-raw/`, idempotent). Network blocked → stop, print manual instructions, never substitute silently.
- R5 Progress discipline: maintain AGENTS.md, MASTER_SPEC.md, PROGRESS.md, DECISIONS.md, BLOCKERS.md. Commit after each phase only when `npm run verify` passes. Finish highest-priority incomplete phase fully before starting another. **Repo rule override: never commit/push unless user explicitly asks.**
- R6 Medical-content rules (§8 of spec) apply to every sentence.
- R7 Engineering: TypeScript strict, unit tests for store/coords/validators, Playwright smoke, a11y + perf budgets (§9).
- R8 Honest reporting: end every task with phases done/partial/blocked, coverage numbers, alignment-QA actuals, known issues, next step.

## Definition of Done (per phase)

Per `docs/PROGRESS.md` Done-when column + `npm run verify` green on clean clone + docs updated (PROGRESS/DECISIONS/BLOCKERS/AUDIT as applicable).
