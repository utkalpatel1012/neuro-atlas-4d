# AUDIT — P0 base-repo audit (COMPLETE 2026-10-03, actuals)

Target: `Raghavsuthar/neuromap-brain-3d` @ HEAD `ef19174`, shallow clone `C:\Projects\_audit_tmp\neuromap-base\`.

## 1. Build & checks (actual runs)

- `npm.cmd ci` — PASS (0 vulnerabilities; esbuild allow-scripts warning only).
- `npm.cmd test` (= validate-disorders --strict + test-mapping + check-functions + coverage-map) — PASS:
  - lint strict: **0 errors, 0 warnings**
  - mapping: **3778 assertions, 0 failures, 555 claims checked**
  - functions: 325 manifest structures in scope, 112 left category-colour; fallback 10/325 (3.1%) under 15% threshold
  - coverage-map: **186 checks, 0 failures**, 121 entity rows → mapped 60 / not mapped 30 / partial 26 / family 4 / schematic-only 1; 415/437 meshes never referenced by receptor site map (browsable regardless)
- `npm.cmd run build` — PASS: vite 6.4.3, 14 modules, JS 705 kB (gzip 187 kB), CSS 17.6 kB, dist/content 21 files 655 kB, licences copied.
- `LICENSE` — multi-licence confirmed: code Apache-2.0, assets + content CC BY-SA 4.0, MIT-line discrepancy documented in-file. Matches spec §2.

## 2. GLB inventory (measured, not asserted)

- File: `public/brain-atlas/models/brain.glb` 4,650,816 bytes; `manifest.json` 242,851 bytes.
- glTF 2.0, generator glTF-Transform v4.3.0; extensionsUsed `KHR_draco_mesh_compression, KHR_materials_ior, KHR_materials_specular`; extensionsRequired `KHR_draco_mesh_compression` (decoder required at runtime).
- Counts: **437 nodes, 437 meshes, 563 primitives, 13 materials, 1869 accessors**. All 437 nodes carry `mesh`; 437 unique names; manifest↔GLB name overlap **437/437**.
- Categories (manifest): cortex 128, cranial_nerves 44, brainstem 30, tracts 54, diencephalon 41, arteries 48, white_matter 9, veins_sinuses 17, cerebellum 33, deep_grey 23, ventricles 7, meninges_dura 3. Sides L 202 / R 201 / median 34.
- Triangles (from index accessor counts): **≈1,383,522** total; per-primitive index count min 159 / max 405,864.
- BBox (POSITION accessor min/max, engine units): min [-0.076, 1.105, -0.112], max [0.076, 1.702, 0.088]; size [0.152, 0.597, 0.200]. **Units are normalized arbitrary, NOT mm, NOT MNI.** No axis/unit metadata in GLB. Registration to MNI152 = PENDING (H2: 7-DoF ICP + QA required). Fidelity today: `registered`-at-best, never `exact`.
- Materials (13): Artery, Cartilage, Temporal lobe, Brain-Inner, Brain, Nucleus, White matter, Nerve, LCR, Nucleus (efferent/afferent fibers), Cerebellum, Bone-4.
- Watertight/manifold per mesh: UNVERIFIED (Draco-encoded; needs decode + topology test). H5 applies: cap only watertight meshes; rest clip-only + "open cut" marker.

## 3. Gaps vs §5 (probe hits in manifest labels)

Present (≥1 hit): pineal 1, pulvinar 2, SC 2, red nucleus 2, tonsil 2, arcuate 2, uncinate 2, fornix 2, stria terminalis 2, optic radiation 2, medial lemniscus 2, aqueduct 1, choroid 2, falx 1, tentorium 2, M1 2, straight sinus 1, cavernous sinus 4.
Missing (0 hits — needs atlas-exact P4 or explicit `missing`): DLPFC/dorsolateral, Broca, subgenual, entorhinal, CA1, dentate gyrus, BLA, BNST, NAc core, claustrum, PVN, LGN, reticular nucleus, PAG, LC, DR, dentate/fastigial nuclei, genu/splenium splits, SLF, MFB, spinothalamic, A1, PComm, lenticulostriates, vein of Galen, conus/dorsal horn/DRG/Adamkiewicz, Brodmann.
Full per-structure fidelity table → `docs/COVERAGE.md` (auto-generated stub in P0; full generator in P4).

## 4. Decision

No Fallback B. Base is viable fork source for gross anatomy + validators. All §5 subdivisions, MNI registration, MRI/registration QA, and §4 licences/URLs/sha256 remain for P1-P4.
