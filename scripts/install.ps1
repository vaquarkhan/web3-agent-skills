#!/usr/bin/env pwsh
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
python "$scriptDir/install_toolkit.py" @args
