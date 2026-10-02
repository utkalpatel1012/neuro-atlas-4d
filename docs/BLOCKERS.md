# BLOCKERS

- CLOSED 2026-10-03: Base fork audit — cloned, `npm test` PASS (3778 assertions), `npm run build` PASS. See `docs/AUDIT.md`.
- CLOSED 2026-10-03: CI green + Pages live (fixed npm.cmd→npm; deploy success; site serves title + educational notice).
- CLOSED 2026-10-03: E2E browser run — 15/15 PASS on system Chrome (`channel: chrome`; bundled-Chromium download bypassed). Live debugging found + fixed a real bug: same-document hash navigation never restored deep links (mount-only effect) → now `hashchange`-driven.
- OPEN 2026-10-03: Lighthouse + device fps + assistive-tech audit — no headed/device measurements yet.
- OPEN 2026-10-03: §4 label volumes + TemplateFlow — UNVERIFIED; meshing + registration blocked on fetch (see meshing.json / registration.json manual steps).
- OPEN 2026-10-02: All §4 URLs + sha256 UNVERIFIED — `pipeline/fetch.py` holds placeholders only. Fill only after checking each source's own licence page. Until then every row in `DATA_LICENSES.md` stays `UNVERIFIED → treated as NC-optional or excluded`.
- OPEN 2026-10-02: Old-repo deletion requested but NOT executed (see DECISIONS.md). Needs human second confirmation + backup location before any `Remove-Item` on `C:\Projects\neuro-atlas-3d\` or any `gh repo delete`.
