[CmdletBinding()]
param(
  [int]$Port = 3000
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$repoRoot = $PSScriptRoot
Push-Location $repoRoot

function Invoke-Step {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Name,

    [Parameter(Mandatory = $true)]
    [scriptblock]$ScriptBlock
  )

  Write-Host "`n==> $Name" -ForegroundColor Cyan
  & $ScriptBlock
  if ($LASTEXITCODE -ne 0) {
    throw "$Name failed with exit code $LASTEXITCODE"
  }
}

try {
  if (-not (Get-Command pnpm.cmd -ErrorAction SilentlyContinue)) {
    throw "pnpm.cmd was not found on PATH."
  }

  Invoke-Step -Name "install" -ScriptBlock { pnpm.cmd install }

  Invoke-Step -Name "lint" -ScriptBlock { pnpm.cmd run lint }

  Invoke-Step -Name "format" -ScriptBlock {
    npx.cmd -y prettier@3.5.3 --write `
      "app/**/*.{ts,tsx,css}" `
      "components/**/*.{ts,tsx,css}" `
      "hooks/**/*.{ts,tsx}" `
      "lib/**/*.{ts,tsx}" `
      "README.md" `
      "next.config.mjs" `
      "eslint.config.mjs" `
      "package.json" `
      "postcss.config.mjs" `
      "tsconfig.json"
  }

  Invoke-Step -Name "build" -ScriptBlock { pnpm.cmd run build }

  Write-Host "`n==> start" -ForegroundColor Cyan
  $env:PORT = $Port
  & pnpm.cmd run start
  if ($LASTEXITCODE -ne 0) {
    throw "start failed with exit code $LASTEXITCODE"
  }
}
finally {
  Pop-Location
}
