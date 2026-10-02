#!/usr/bin/env python3
"""tracts_to_meshes.py (P5) — HCP1065 TRK → decimated bundles as tubes + centerlines (H6).

Honest status: HCP1065 bundle files NOT yet fetched (§4 row 7 UNVERIFIED). Validates inputs,
writes PENDING report, exits 2. When TRK exist in data-raw/hcp1065/, runs the H6 path
(clustering/centroid reduction, <=2500 streamlines per bundle, instanced tubes / fat lines with
arclength flow shader, centerline polylines for circuit edges) with nibabel.streamlines and
orientation check by T1 overlay. NiiVue tractography option consumes the same centerlines.

Usage: python pipeline/tracts_to_meshes.py
Output: public/atlas/tracts/*.glb + centerlines/*.json + pipeline/qc/tracts.json
"""
from __future__ import annotations
import json, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
QC = os.path.join(ROOT, "pipeline", "qc")
RAW = os.path.join(ROOT, "data-raw", "hcp1065")

def main() -> int:
    os.makedirs(QC, exist_ok=True)
    present = os.path.isdir(RAW) and len(os.listdir(RAW)) > 0
    report = {
        "status": "TRACTS_PENDING",
        "budget": {"max_streamlines_per_bundle": 2500, "render": "instanced tubes / fat lines + arclength flow; centerlines for circuits"},
        "inputs": {"dir": "data-raw/hcp1065", "present": present},
        "manual_steps": [
            "Verify HCP1065 licence on the releases page (CC BY-SA 4.0 claimed) + WU-Minn open-access terms",
            "Fill pipeline/fetch.py URL/sha256 -> python pipeline/fetch.py --core",
            "python pipeline/tracts_to_meshes.py (decimate, verify orientation on T1 overlay)",
        ],
    }
    with open(os.path.join(QC, "tracts.json"), "w") as f:
        json.dump(report, f, indent=2)
    if not present:
        print("TRACTS_PENDING - data-raw/hcp1065 missing; wrote pipeline/qc/tracts.json.")
        return 2
    print("Inputs present but decimation solver not yet implemented (P5 scope: contract only).")
    return 3

if __name__ == "__main__":
    sys.exit(main())
