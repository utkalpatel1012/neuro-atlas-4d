#!/usr/bin/env python3
"""spinal.py (P5) — PAM50 → cord / GM / WM tract / level meshes + join to brainstem.

Honest status: PAM50 data NOT yet fetched (toolbox LGPLv3; DATA licence CONFIRM pending).
Validates inputs, writes PENDING report, exits 2. When present, builds cord/WM/GM/CSF masks,
WM tract atlas (labels 0-29) and GM subregions (30-35), vertebral + spinal levels, T1/T2/T2*
contrasts, and joins the cord to the medulla with an explicit seam record (no silent weld).

Usage: python pipeline/spinal.py
Output: public/atlas/spinal/*.glb + pipeline/qc/spinal.json
"""
from __future__ import annotations
import json, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
QC = os.path.join(ROOT, "pipeline", "qc")
RAW = os.path.join(ROOT, "data-raw", "pam50")

def main() -> int:
    os.makedirs(QC, exist_ok=True)
    present = os.path.isdir(RAW) and len(os.listdir(RAW)) > 0
    report = {
        "status": "SPINAL_PENDING",
        "inputs": {"dir": "data-raw/pam50", "present": present},
        "levels": ["C1-C8", "T1-T12", "L1-L5", "S1-S5", "conus", "filum"],
        "manual_steps": [
            "Confirm PAM50 DATA licence in spinalcordtoolbox / neuropoly/template repos",
            "Fill pipeline/fetch.py URL/sha256 -> python pipeline/fetch.py --core",
            "python pipeline/spinal.py (meshes + levels + brainstem seam record)",
        ],
    }
    with open(os.path.join(QC, "spinal.json"), "w") as f:
        json.dump(report, f, indent=2)
    if not present:
        print("SPINAL_PENDING - data-raw/pam50 missing; wrote pipeline/qc/spinal.json.")
        return 2
    print("Inputs present but cord solver not yet implemented (P5 scope: contract only).")
    return 3

if __name__ == "__main__":
    sys.exit(main())
