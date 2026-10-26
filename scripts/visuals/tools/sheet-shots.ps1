# Check batches and screenshot their review sheets, cut into readable parts.
#
#   powershell -File scripts/visuals/tools/sheet-shots.ps1 -Batches cg-jee-line-1,s3-batch-2 [-Tag v2]
#
# Runs `npm run visuals:run -- <batch>` (dry run: writes nothing), screenshots
# generated-papers/visuals/<batch>.html with headless Edge, and cuts the
# screenshot into 1700 px parts in generated-papers/visuals/shots/
# (<batch>-<tag>-p<n>.png) to open with the Read tool. Edge stops a
# screenshot at 16000 px, about 25 visuals, so split a bigger batch into
# review halves first (README "Looking at the sheet").
param([Parameter(Mandatory)][string[]]$Batches, [string]$Tag = "v1")
$repo = (Resolve-Path "$PSScriptRoot\..\..\..").Path
$out = Join-Path $repo "generated-papers\visuals\shots"
New-Item -ItemType Directory -Force $out | Out-Null
$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$prof = Join-Path $env:TEMP "visuals-sheet-edge"
Push-Location $repo
try {
  foreach ($b in $Batches) { npm run visuals:run -- $b 2>&1 | Select-String "visuals \(|!!" }
  foreach ($b in $Batches) {
    $sheet = "file:///" + ((Join-Path $repo "generated-papers\visuals\$b.html") -replace "\\", "/")
    & $edge --headless=new --disable-gpu --hide-scrollbars --window-size=1100,16000 "--user-data-dir=$prof" "--screenshot=$out\$b.png" $sheet 2>$null | Out-Null
    Start-Sleep 2
  }
  python "$PSScriptRoot\split-sheet.py" $out $Tag @Batches
} finally { Pop-Location }
