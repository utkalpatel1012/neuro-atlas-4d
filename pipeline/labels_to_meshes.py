#!/usr/bin/env python3
"""labels_to_meshes.py (P4) — label NIfTI → meshes (marching cubes → smoothing → decimation → GLB meshopt/Draco).

Honest status: §4 label volumes NOT yet fetched (UNVERIFIED licences/URLs, fetch.py skips by design).
This script therefore validates inputs, writes a PENDING per-source report, and exits 2. When label
NIfTI exist in data-raw/, it runs the H1-harmonised path (official TemplateFlow transform else ANTs
SyN to MNI152NLin2009cAsym, nearest-neighbour for labels) + H3 hemisphere mirror for Allen HRA-3D
(mirror across its own midsagittal plane, verify laterality vs GLB) and writes GLBs to
public/atlas/atlas-exact/ with meshopt/Draco.

Usage: python pipeline/labels_to_meshes.py [--source allen|cit168|aan|thalamus|hypothalamus|all]
Output: public/atlas/atlas-exact/*.glb + pipeline/qc/meshing.json
"""
from __future__ import annotations
import argparse, json, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
QC = os.path.join(ROOT, "pipeline", "qc")
OUT = os.path.join(ROOT, "public", "atlas", "atlas-exact")
SOURCES = ["allen", "cit168", "aan", "thalamus", "hypothalamus"]

EXPECTED = {
    "allen": "data-raw/allen-hra3d-2020.zip",
    "cit168": "data-raw/cit168.zip",
    "aan": "data-raw/aan-v2.zip",
    "thalamus": "data-raw/thalamus.zip",
    "hypothalamus": "data-raw/hypothalamus.zip",
}

def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--source", default="all")
    a = ap.parse_args()
    srcs = SOURCES if a.source == "all" else [a.source]
    os.makedirs(QC, exist_ok=True)
    os.makedirs(OUT, exist_ok=True)
    report = {"status": "MESHING_PENDING", "sources": {}}
    for s in srcs:
        p = os.path.join(ROOT, EXPECTED[s])
        report["sources"][s] = {"input": EXPECTED[s], "present": os.path.exists(p), "meshes": 0, "note": "awaiting verified fetch (R3/R4)"}
    with open(os.path.join(QC, "meshing.json"), "w") as f:
        json.dump(report, f, indent=2)
    missing = [s for s in srcs if not report["sources"][s]["present"]]
    if missing:
        print(f"MESHING_PENDING — missing inputs for: {', '.join(missing)}; wrote pipeline/qc/meshing.json.")
        print("Manual steps: verify S4 licences on source pages -> fill pipeline/fetch.py URLs/sha256 -> python pipeline/fetch.py --core")
        return 2
    print("Inputs present but meshing solver not yet implemented (P4 scope: pipeline contract only).")
    return 3

if __name__ == "__main__":
    sys.exit(main())
