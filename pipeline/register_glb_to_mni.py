#!/usr/bin/env python3
"""register_glb_to_mni.py (P3) — GLB (Z-Anatomy body space) → MNI152NLin2009cAsym 7-DoF similarity ICP.

Honest status: reference template + GLB surface NOT yet available in-repo (§4 UNVERIFIED,
brain.glb bytes deferred to P3). This script therefore writes a PENDING QA report with NULL
metrics (R2/R8: never illustrative numbers) and prints exact manual steps. When inputs exist,
it performs the H2 path (outer cerebrum + cerebellum surface → MNI brain-mask surface, 7-DoF,
no non-rigid warp unless unavoidable) and writes the matrix + QC overlays.

Usage: python pipeline/register_glb_to_mni.py
Output: pipeline/qc/registration.json (+ matrix file when computed)
"""
from __future__ import annotations
import json, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
QC = os.path.join(ROOT, "pipeline", "qc")
GLB = os.path.join(ROOT, "public", "atlas", "core-anatomy", "brain.glb")
MASK = os.path.join(ROOT, "data-raw", "mni152lin2009casym", "mni_brain_mask.nii.gz")

def main() -> int:
    os.makedirs(QC, exist_ok=True)
    report = {
        "method": "7-DoF similarity ICP (scale+rotation+translation), outer cerebrum + cerebellum → MNI brain-mask surface",
        "status": "REGISTRATION_PENDING",
        "matrix": None,
        "mean_surface_distance_mm": None,
        "p95_distance_mm": None,
        "dice": None,
        "inputs": {"glb": GLB, "glb_present": os.path.exists(GLB), "mni_mask": MASK, "mask_present": os.path.exists(MASK)},
        "manual_steps": [
            "python pipeline/fetch.py --core  (after §4 URLs/sha256 verified; TemplateFlow MNI152NLin2009cAsym T1w + mask)",
            "Vendor brain.glb into public/atlas/core-anatomy/ (CC BY-SA 4.0 attribution intact)",
            "python pipeline/register_glb_to_mni.py  (computes matrix, writes pipeline/qc/registration.json + overlays)",
            "Review pipeline/qc/ overlay PNGs before flipping any fidelity label to `registered`",
        ],
    }
    if not (os.path.exists(GLB) and os.path.exists(MASK)):
        with open(os.path.join(QC, "registration.json"), "w") as f:
            json.dump(report, f, indent=2)
        print("REGISTRATION_PENDING — inputs missing; wrote pipeline/qc/registration.json with NULL metrics.")
        print("Manual steps:")
        for s in report["manual_steps"]:
            print("  - " + s)
        return 2
    # Real computation lands here (ICP + QC overlays). Never reached in P3.
    print("Inputs present but ICP solver not yet implemented (P3 scope: backbone only).")
    return 3

if __name__ == "__main__":
    sys.exit(main())
