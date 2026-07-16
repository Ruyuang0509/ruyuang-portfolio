param(
  [Parameter(Mandatory = $true)]
  [ValidateSet("draft", "submission")]
  [string] $Mode,

  [Parameter(ValueFromRemainingArguments = $true)]
  [string[]] $NodeArgs
)

$ErrorActionPreference = "Stop"
$env:VITE_PORTFOLIO_MODE = $Mode

& (Join-Path $PSScriptRoot "run-node.ps1") @NodeArgs
exit $LASTEXITCODE

