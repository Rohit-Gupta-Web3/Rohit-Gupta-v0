[CmdletBinding()]
param(
  [int]$Port = 3000
)

$launcher = Join-Path (Split-Path -Parent $PSScriptRoot) "run-project.ps1"
& $launcher -Port $Port
exit $LASTEXITCODE
