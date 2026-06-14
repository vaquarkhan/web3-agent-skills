param(
  [string]$Target = ".",
  [string]$Tool = "auto"
)
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
python "$root/scripts/install_toolkit.py" --tool $Tool --target $Target
