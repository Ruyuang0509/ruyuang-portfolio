param(
  [Parameter(ValueFromRemainingArguments = $true)]
  [string[]] $NodeArgs
)

$ErrorActionPreference = "Stop"

$nodeCommand = Get-Command node -ErrorAction SilentlyContinue
if ($nodeCommand) {
  & $nodeCommand.Source @NodeArgs
  exit $LASTEXITCODE
}

$codexNode = Join-Path $env:USERPROFILE ".cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
if (Test-Path $codexNode) {
  & $codexNode @NodeArgs
  exit $LASTEXITCODE
}

Write-Error "Node.js was not found on PATH, and the Codex bundled Node runtime was not found. Install Node.js or run through the Codex bundled runtime."
exit 1

