#!/usr/bin/env python3
"""fetch.py — reproducible downloader skeleton (P0). R4: pinned URLs + sha256, cache data-raw/ (git-ignored), idempotent.
Fill URLS + SHA256 only after verifying each licence on the source's own page. Unverified entries stay None and are skipped.
Usage: python pipeline/fetch.py --core | --all | --list
"""
from __future__ import annotations
import argparse, hashlib, os, sys, urllib.request

RAW = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data-raw")

# §4 manifest — URLs/SHA256 intentionally None until verified (see DATA_LICENSES.md + BLOCKERS.md).
MANIFEST = [
    {"id": "src.allen-hra3d-2020", "pack": "core", "url": None, "sha256": None, "out": "allen-hra3d-2020.zip"},
    {"id": "src.cit168", "pack": "core", "url": None, "sha256": None, "out": "cit168.zip"},
    {"id": "src.amygdala-sub", "pack": "core", "url": None, "sha256": None, "out": "amygdala-sub.zip"},
    {"id": "src.aan-v2", "pack": "core", "url": None, "sha256": None, "out": "aan-v2.zip"},
    {"id": "src.thalamus-najdenovska", "pack": "core", "url": None, "sha256": None, "out": "thalamus.zip"},
    {"id": "src.hypothalamus-neudorfer", "pack": "core", "url": None, "sha256": None, "out": "hypothalamus.zip"},
    {"id": "src.hcp1065", "pack": "core", "url": None, "sha256": None, "out": "hcp1065.zip"},
    {"id": "src.pam50", "pack": "core", "url": None, "sha256": None, "out": "pam50.zip"},
    {"id": "src.vessels-mra", "pack": "core", "url": None, "sha256": None, "out": "vessels-mra.zip"},
    {"id": "src.territories", "pack": "core", "url": None, "sha256": None, "out": "territories.zip"},
    {"id": "src.templateflow", "pack": "core", "url": None, "sha256": None, "out": "templateflow.zip"},
    {"id": "src.openneuro-4d", "pack": "core", "url": None, "sha256": None, "out": "openneuro-4d.nii.gz"},
    {"id": "src.hansen-pet", "pack": "nc", "url": None, "sha256": None, "out": "hansen-pet.zip"},
]

def sha256_file(p: str) -> str:
    h = hashlib.sha256()
    with open(p, "rb") as f:
        for b in iter(lambda: f.read(1 << 20), b""):
            h.update(b)
    return h.hexdigest()

def fetch(entry: dict) -> int:
    if not entry["url"]:
        print(f"SKIP {entry['id']}: URL unverified — see DATA_LICENSES.md; no silent substitution (R4).")
        return 2
    os.makedirs(RAW, exist_ok=True)
    out = os.path.join(RAW, entry["out"])
    if os.path.exists(out) and entry.get("sha256"):
        if sha256_file(out) == entry["sha256"]:
            print(f"OK cached {entry['id']}")
            return 0
        print(f"STALE hash mismatch {entry['id']} — re-downloading")
    print(f"GET {entry['url']} -> {out}")
    urllib.request.urlretrieve(entry["url"], out)
    if entry.get("sha256"):
        got = sha256_file(out)
        if got != entry["sha256"]:
            print(f"ERROR sha256 mismatch {entry['id']}: got {got}")
            return 1
    print(f"OK {entry['id']}")
    return 0

def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--core", action="store_true")
    ap.add_argument("--all", action="store_true")
    ap.add_argument("--list", action="store_true")
    a = ap.parse_args()
    items = [m for m in MANIFEST if (a.all or m["pack"] == "core")] if (a.core or a.all) else MANIFEST
    if a.list:
        for m in MANIFEST:
            print(m["id"], m["pack"], m["url"] or "UNVERIFIED")
        return 0
    rc = 0
    for m in items:
        r = fetch(m)
        rc = max(rc, r)
    if rc == 2:
        print("All core entries unverified — manual steps in docs/BLOCKERS.md. App must build offline from public/atlas/.")
    return rc

if __name__ == "__main__":
    sys.exit(main())
