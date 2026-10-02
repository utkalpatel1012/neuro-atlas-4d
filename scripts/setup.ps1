# setup.ps1 — Windows PowerShell 5.1 local setup (mirrors setup.sh for CI/Linux).
# Usage: powershell -ExecutionPolicy Bypass -File scripts/setup.ps1
$ErrorActionPreference = "Stop"
npm.cmd ci
if (Test-Path -LiteralPath "pipeline/requirements.txt") {
  pip install -r pipeline/requirements.txt
}
python pipeline/fetch.py --core
Write-Output "Setup done. If fetch skipped (UNVERIFIED), follow docs/BLOCKERS.md manual steps."
