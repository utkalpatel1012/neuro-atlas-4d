# NeuroAtlas 4D — MASTER SPEC (copy of Master Prompt prepared 2 Oct 2026)

> Copy saved per §13.1 in `C:\Projects\neuro-atlas-4d\` on 2026-10-02. Base repositories, data sources and licences below were checked on the day by the prompt author; items marked "confirm" could not be verified and must be checked. Old repo `C:\Projects\neuro-atlas-3d\` preserved separately — see `docs/DECISIONS.md`.

=== PROMPT START (verbatim essentials) ===

# 0. MISSION

Senior full-stack engineer, neuroimaging engineer and medical-education designer. Build **NeuroAtlas 4D** (working name): free, open-source, browser-based interactive 3D/4D atlas of the human nervous system (cerebrum, brainstem, cerebellum, spinal cord, plus neurovasculature) teaching neuroanatomy through neurology + psychiatry lens for psychiatry resident in India preparing for DNB/MD-level exams (MCQ + viva).

- "4D" = 3D + time: animated circuits and neurotransmitter pathways, step-through timelines, 4D NIfTI (fMRI-style) playback.
- For any structure: Where (3D + MRI sections) · Connects to what (tracts, circuits) · Does what, with which chemistry (function, transmitters, receptors) · Goes wrong how (neurology syndromes, psychiatric symptoms/disorders, exam pearls).
- Non-goals: not diagnostic/clinical-decision tool; no patient data; no accounts, backend, analytics. Every screen: "Educational use — not for clinical decisions".

# 1. OPERATING RULES

R1 Autonomy — decide, log in DECISIONS.md, continue; blocked → BLOCKERS.md + manual steps, continue other work.
R2 No fabrication — fidelity `exact|registered|proxy|schematic`; missing → `missing` in COVERAGE.md; never fake geometry.
R3 Licences — core: CC0/CC BY/CC BY-SA + permissive/LGPL tools. NC only in optional `pack-nc` (off by default, separate). ND excluded. Unverifiable licence = NC-optional/excluded. Record all in DATA_LICENSES.md. New code Apache-2.0, new content/models CC BY-SA 4.0.
R4 Reproducible data — all downloads via `pipeline/fetch.py` (pinned URLs + sha256, cache git-ignored `data-raw/`, idempotent). Network blocked → manual instructions, never silent substitution. App builds offline from `public/atlas/`.
R5 Progress discipline — AGENTS.md, MASTER_SPEC.md, PROGRESS.md, DECISIONS.md, BLOCKERS.md; commit after each phase only when `npm run verify` passes; highest-priority incomplete phase first.
R6 Medical-content rules (§8) apply to every sentence.
R7 Engineering — TypeScript strict; unit tests for store/coords/validators; Playwright smoke; a11y + perf budgets (§9).
R8 Honest reporting — phases done/partial/blocked, coverage, alignment-QA actuals, known issues, next step.

# 2. BASE REPOSITORIES

- App base (fork): `Raghavsuthar/neuromap-brain-3d` — Three.js + Vite viewer; 437 structures/12 systems; slice planes; opacity slider; isolate; 7 psychiatric circuits; JSON-Schema content engine (`lint:content:strict`, `test:mapping`); 5 disorders. Code Apache-2.0; assets/content CC BY-SA 4.0 (LICENSE file authoritative).
- Anatomy upstream: `itayinbarr/brainproject` — `brain.glb` (Draco) + `manifest.json` + `export_brain.py`. Assets CC BY-SA 4.0.
- Anatomy origin: `Z-Anatomy/Models-of-human-anatomy` (BodyParts3D) — `.blend` + `TA2.csv`. CC BY-SA 4.0 overall; exclude bundled NC items (inner-ear CC BY-NC-SA, kidney CC BY-NC).
- MRI engine: `niivue/niivue` (npm `@niivue/niivue`) — WebGL2 NIfTI incl. 4D, meshes, tractography, stats, labels. BSD-2-Clause.
- Phase-0 audit → `docs/AUDIT.md`. Fallback B: rebuild GLB from Z-Anatomy `.blend` headless Blender if blocker.

# 3. ARCHITECTURE

Vite + React + TypeScript shell; Zustand store; imperative Three.js `BrainScene` (port `src/main.js` incrementally); `three-mesh-bvh`; `@niivue/niivue` in `MriPanel`; Vitest + Playwright. Static site. No backend.
World space MNI152 mm RAS+ (+x right, +y anterior, +z superior); 1 unit = 1 mm; axis swaps only in `src/coords.ts` with tests.
Master template: `MNI152NLin2009cAsym` 1 mm via TemplateFlow.
Packs (lazy, own manifest + licence): `core-anatomy`, `atlas-exact`, `tracts`, `spinal`, `vascular`, `volumes`, `circuits`, `content`, `pack-nc` (optional off by default). Runs without `pack-nc`.
Single store: per-node {visible, opacity, colorOverride}, selection, hover, crosshairMNI, activeCircuit, timelineT, activeDisorder, layerPreset, mode, sync flags.
Deep links: `#s= #c= #d= #x= #p=`; restorable from URL.

# 4. DATA SOURCES

1 Gross anatomy: brainproject brain.glb + manifest — 437 structures — Z-Anatomy body space (not MNI) — CC BY-SA 4.0.
2 Allen HRA 3D 2020 v1.0.0 (`download.alleninstitute.org/.../allen_human_reference_atlas_3d_2020/version_1/`) — 141 structures one hemisphere (mirror) — ICBM 2009b NLin Sym — CC BY 4.0.
3 CIT168 (OSF jkzwp) + amygdala subnuclei (OSF hksa6) — reward/motor subcortex — MNI152NLin2009cAsym — confirm (notes say CC BY 4.0 / CC BY-SA 4.0).
4 Harvard AAN v2.0 (Zenodo 8161638 / Dryad 10.5061/dryad.zw3r228d2) — LC/DR/MnR/VTA/PAG/PBC/PnO/PTg/LDTg/mRt — MNI152 — CC0.
5 Thalamus Najdenovska 2018 (Zenodo 1405484) — confirm CC BY-SA 4.0.
6 Hypothalamus Neudorfer 2020 (Zenodo 3942115) — confirm CC BY 4.0.
7 HCP1065 tractography (Yeh 2022, `github.com/frankyeh/data-atlas`, `brain.labsolver.org/hcp_trk_atlas.html`) — ICBM 2009a NLin Asym — CC BY-SA 4.0 (releases page).
8 PAM50 (SCT `spinalcordtoolbox/spinalcordtoolbox`, `neuropoly/template`) — cord/WM/GM/CSF + tracts + levels — ICBM152-aligned — confirm data licence (toolbox LGPLv3).
9 Cerebral arteries MRA Sci Data Dec 2025 (Zenodo 10.5281/zenodo.17393202) — 100 IXI-MRA segmentations, MNI atlases — confirm.
10 Arterial territories Sci Data 2023 (NITRC) — ACA/MCA/PCA/VB — confirm.
11 Named vessels: brain.glb CoW/sinuses + Michigan Deep Blue CoW STL cross-check — confirm STL.
12 TemplateFlow MNI152NLin2009cAsym/Sym (T1w/T2w/PDw/masks) + transforms — per TemplateFlow metadata.
13 Schaefer-Yeo (CBIG, optional) — confirm.
14 Receptor/transporter PET Hansen 2022 (`netneurolab/hansen_receptors`, via `neuromaps`) — 19 targets, 1238 subjects — neuromaps CC BY-NC-SA 4.0 → `pack-nc` only until confirmed.
15 4D demo: one small CC0 OpenNeuro dataset (<15 MB) — verify page.
16 ENIGMA + open meta-analyses — cite only.
Excluded: ND datasets; DSM/ICD/DrugBank/textbook passages cited only; BigBrain/Julich only in pack-nc after confirming terms.

# 5. PRIORITY-1 STRUCTURE CHECKLIST

Cortex / limbic-deep-grey / thalamus / brainstem / cerebellum / pathways / CSF-meninges / vasculature / spinal cord — full list per prompt §5. Every item: mesh, labelled marker, or explicit `missing` row in COVERAGE.md with fidelity + source.

# 6. FEATURES F1-F9

F1 Layer tree + master toggles (Vasculature, CN, Meninges, WM, Deep nuclei, Ventricles, Cord). F2 Variable opacity + X-ray + focus-context + presets. F3 Separate lobes/explode/peel + hemisphere split. F4 Cross-sections + MRI (clipping + NiiVue T1/T2/PD + labels, bi-directional sync, radiology presets). F5 Neurovasculature (isosurface + named CoW, territories, flow, MRA, vessel cards). F6 Circuits + transmitters 4D (≥15 circuits, fidelity-labelled edges, timeline, receptor glyphs, optional PET, mechanism overlay from sourced claims). F7 Knowledge engine (entity cards, packs, symptom↔circuit, lesion tool). F8 Exam tools (quizzes, viva, flashcards local SRS, tours, bookmarks, notes, PNG export; offline). F9 UX/a11y/mobile (keyboard, ARIA, colour-blind-safe, dark/light, 375px, reduced-motion, low-end fallback).

# 7. DATA SCHEMAS

Extend `content/schema/*`; strict validators (unresolved ids; claim without source; unsourced in release --strict; number without sourceId; claim>4 sentences; label not in manifest; circuit node/edge without geometry/marker; quiz index OOR). Structure/circuit/claim/source entry shapes per prompt §7.

# 8. PSYCHIATRY CONTENT SPEC

8.1 Rules: original wording; claims ≤4 sentences with sourceIds + evidence level; resolvable sources only (else needs-source, excluded strict); no invented numbers; no dosing v1 unless sourced; hypotheses labelled; no self-harm detail; reviewStatus draft + badge until reviewed. Preferred: IPS guidelines, NICE, WFSBP, CANMAT, APA, mhGAP, Cochrane, ENIGMA; textbooks cited only.
8.2 Entity-card template per prompt.
8.3 Circuit catalogue ≥15 + transmitter pathways (AAN source nuclei).
8.4 Disorder packs: P1 (schizophrenia, MDD, bipolar, OCD, SUD, somatic, conversion/FND, anxiety, PTSD — tabs complete, ≥15 MCQs, 6-10-step tour; audit+extend existing 5); P2 list per prompt.
8.5 Symptom↔circuit explorer + lesion-syndrome library per prompt.

# 9. QUALITY/PERF/TESTS

`npm run verify` = typecheck + lint + lint:content:strict + unit + test:mapping + test:alignment + build. Playwright E2E list per prompt. Budgets: ≥60fps desktop, ≥30fps mid Android; first interaction ≤4s @20Mbps; initial ≤25MB; JS ≤1MB gzip; file <50MB (LFS/releases above). Alignment QA targets (report actuals): GLB→MNI MSD ≤3mm; atlas→master Dice ≥0.90; QC PNGs in pipeline/qc/. Tracts ≤2500/bundle. WCAG 2.1 AA. Zero unsourced claims in release.

# 10. PHASES P0-P9

Per PROGRESS.md. Done-when per prompt §10 table. Project done when F1-F9 pass, §5 100% present-or-missing, strict lint passes, docs complete.

# 11. HARD PROBLEMS H1-H10

H1 space harmonisation (TemplateFlow → ANTs SyN → QC; ≤1.5mm assumed-aligned). H2 GLB→MNI 7-DoF ICP, matrix stored, `registered`; Atlas-exact vs Gross modes, never silent swap. H3 mirror Allen hemisphere, verify laterality. H4 transparency choice (alphaHash vs OIT vs depth pre-pass). H5 section caps (watertight only). H6 tract rendering (≤2500, instanced tubes, nibabel, overlay check). H7 crosswalk.csv (TA2 + Allen ontology, no fuzzy merges unlogged). H8 size (meshopt/Draco, lazy). H9 vessel labelling (only justified; rest proxy/schematic). H10 licence separation (separate files/manifests).

# 12. LAYOUT

Per prompt §12 tree.

# 13. FIRST ACTIONS

Per prompt §13 (MASTER_SPEC, AGENTS/PROGRESS/DECISIONS/BLOCKERS, fork/clone+build+AUIDT, setup.sh + fetch.py, DATA_LICENSES, CI, begin P1 if budget).

=== PROMPT END ===
