# DATA_LICENSES — NeuroAtlas 4D

All rows UNVERIFIED as of 2026-10-02 P0 scaffold. Verify each licence on the source's own page before any download. Unverifiable = NC-optional or excluded (R3). In-app credits screen is generated from this file. Fill sha256 only after download via `pipeline/fetch.py`.

| # | id | source | URL/version/DOI | licence (claimed) | verified | retrieved | sha256 | transform |
|---|---|--------|-----------------|-------------------|----------|-----------|--------|-----------|
| base | src.neuromap-base | Raghavsuthar/neuromap-brain-3d | https://github.com/Raghavsuthar/neuromap-brain-3d — LICENSE authoritative | Code Apache-2.0; assets/content CC BY-SA 4.0 | UNVERIFIED → treated as NC-optional until checked | — | — | fork audit only |
| up | src.brainproject | itayinbarr/brainproject brain.glb+manifest+export_brain.py | https://github.com/itayinbarr/brainproject | CC BY-SA 4.0 | UNVERIFIED | — | — | none yet |
| org | src.z-anatomy | Z-Anatomy/Models-of-human-anatomy + TA2.csv (BodyParts3D) | https://github.com/Z-Anatomy/Models-of-human-anatomy | CC BY-SA 4.0 overall; exclude inner-ear CC BY-NC-SA, kidney CC BY-NC | UNVERIFIED | — | — | exclude NC items |
| mri-eng | src.niivue | niivue/niivue npm @niivue/niivue | https://github.com/niivue/niivue | BSD-2-Clause | UNVERIFIED | — | — | npm dep only |
| 2 | src.allen-hra3d-2020 | Allen HRA 3D 2020 v1.0.0 | download.alleninstitute.org/informatics-archive/allen_human_reference_atlas_3d_2020/version_1/ | CC BY 4.0 | UNVERIFIED | — | — | mirror hemisphere; labels NN |
| 3a | src.cit168 | CIT168 subcortical OSF jkzwp | OSF jkzwp | CC BY 4.0 per notes (paper page CC0) — CONFIRM | UNVERIFIED | — | — | — |
| 3b | src.amygdala-sub | Amygdala subnuclei OSF hksa6 | OSF hksa6 | CC BY-SA 4.0 — CONFIRM | UNVERIFIED | — | — | — |
| 4 | src.aan-v2 | Harvard AAN v2.0 Zenodo 8161638 / Dryad 10.5061/dryad.zw3r228d2 | Zenodo 8161638 | CC0 | UNVERIFIED | — | — | — |
| 5 | src.thalamus-najdenovska | Najdenovska 2018 Zenodo 1405484 | Zenodo 1405484 | CC BY-SA 4.0 — CONFIRM | UNVERIFIED | — | — | — |
| 6 | src.hypothalamus-neudorfer | Neudorfer 2020 Zenodo 3942115 | Zenodo 3942115 | CC BY 4.0 — CONFIRM | UNVERIFIED | — | — | — |
| 7 | src.hcp1065 | HCP1065 Yeh 2022 github frankyeh/data-atlas | https://github.com/frankyeh/data-atlas | CC BY-SA 4.0 (releases page) | UNVERIFIED | — | — | decimate ≤2500/bundle |
| 8 | src.pam50 | PAM50 SCT + neuropoly/template | https://github.com/spinalcordtoolbox/spinalcordtoolbox | Toolbox LGPLv3; DATA licence CONFIRM | UNVERIFIED | — | — | — |
| 9 | src.vessels-mra | Vessel MRA Sci Data Dec 2025 Zenodo 10.5281/zenodo.17393202 | Zenodo 17393202 | CONFIRM | UNVERIFIED | — | — | isosurface + skeleton |
| 10 | src.territories | Arterial Territories Sci Data 2023 NITRC | NITRC | CONFIRM | UNVERIFIED | — | — | — |
| 11 | src.cow-michigan | Michigan Deep Blue Circle of Willis STL | Deep Blue portal | CONFIRM (open access claimed) | UNVERIFIED | — | — | cross-check only |
| 12 | src.templateflow | TemplateFlow MNI152NLin2009cAsym/Sym | TemplateFlow | per-template metadata | UNVERIFIED | — | — | master space |
| 13 | src.schaefer-yeo | Schaefer-Yeo CBIG (optional) | CBIG | CONFIRM | UNVERIFIED | — | — | optional |
| 14 | src.hansen-pet | Hansen 2022 netneurolab/hansen_receptors via neuromaps | https://github.com/netneurolab/hansen_receptors | neuromaps CC BY-NC-SA → pack-nc only | UNVERIFIED → NC-optional | — | — | pack-nc separate |
| 15 | src.openneuro-4d | OpenNeuro CC0 4D demo (<15MB) | TBD OpenNeuro | CC0 — verify page | UNVERIFIED | — | — | — |
| 16 | src.enigma | ENIGMA meta-analyses | citations only | n/a | n/a | — | — | cite only |

New code: Apache-2.0. New content/models: CC BY-SA 4.0. Keep upstream notices. ND datasets excluded.
