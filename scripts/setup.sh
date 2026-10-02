#!/bin/sh
# setup.sh — Linux/CI setup (spec §13.4). Local Windows: use scripts/setup.ps1 instead.
set -eu
npm ci
pip install -r pipeline/requirements.txt || true
python pipeline/fetch.py --core || true
echo "Setup done. If fetch skipped (UNVERIFIED), follow docs/BLOCKERS.md manual steps."
