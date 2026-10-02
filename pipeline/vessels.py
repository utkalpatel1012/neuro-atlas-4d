#!/usr/bin/env python3
"""vessels.py (P6) — MRA vessel atlas → arterial isosurface + skeleton + centerlines; named CoW/sinus
registration; territory overlay; MRA backdrop (H9).

Honest status: vessel MRA atlas + territory atlas + Michigan STL NOT yet fetched (§4 rows 9-11
UNVERIFIED). Validates inputs, writes PENDING report, exits 2. When present: builds occurrence
probability isosurface + mean/SD radius + mean ToF-MRA, skeletonizes to centerlines, registers
named CoW/sinus meshes onto the isosurface (rule-based topology only where justified; the rest
stays `proxy`), and exports the MRA contrast volume for the MRI panel.

Usage: python pipeline/vessels.py
Output: public/atlas/vascular/*.glb + centerlines + pipeline/qc/vessels.json
"""
from __future__ import annotations
import json, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
QC = os.path.join(ROOT, "pipeline", "qc")

def main() -> int:
    os.makedirs(QC, exist_ok=True)
    need = {
        "mra": os.path.join(ROOT, "data-raw", "vessels-mra.zip"),
        "territories": os.path.join(ROOT, "data-raw", "territories.zip"),
    }
    present = {k: os.path.exists(p) for k, p in need.items()}
    report = {
        "status": "VESSELS_PENDING",
        "inputs": {k: {"path": os.path.relpath(p, ROOT), "present": present[k]} for k, p in need.items()},
        "h9": "label only what CoW/sinus registration or rule topology justifies; rest proxy; perforators schematic",
        "manual_steps": [
            "Verify §4 row 9-11 licences on source pages (Zenodo / NITRC / Deep Blue)",
            "Fill pipeline/fetch.py URL/sha256 -> python pipeline/fetch.py --core",
            "python pipeline/vessels.py (isosurface + skeleton + named registration + MRA)",
        ],
    }
    with open(os.path.join(QC, "vessels.json"), "w") as f:
        json.dump(report, f, indent=2)
    if not all(present.values()):
        print("VESSELS_PENDING - inputs missing; wrote pipeline/qc/vessels.json.")
        return 2
    print("Inputs present but vessel solver not yet implemented (P6 scope: contract only).")
    return 3

if __name__ == "__main__":
    sys.exit(main())
