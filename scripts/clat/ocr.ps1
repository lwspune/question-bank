# Windows' built-in OCR (Windows.Media.Ocr, en-US) over page images, writing each
# page's WORD BOXES as JSON in PDF points, the shape PyMuPDF's get_text("words")
# gives, so extract.py reads an OCR'd page exactly as it reads a text layer.
#
#   powershell -NoProfile -File scripts/clat/ocr.ps1 <imageDir> <dpi>
#     reads <imageDir>\pNNN.png, writes <imageDir>\pNNN.words.json
#
# Used for CLAT 2022 only: that booklet's text layer substitutes glyphs
# ("commiVVingVhe" for "committing the"), so the page is read from its picture.
param([Parameter(Mandatory = $true)][string]$Dir, [int]$Dpi = 300)
$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Runtime.WindowsRuntime
$null = [Windows.Storage.StorageFile, Windows.Storage, ContentType = WindowsRuntime]
$null = [Windows.Media.Ocr.OcrEngine, Windows.Foundation, ContentType = WindowsRuntime]
$null = [Windows.Graphics.Imaging.BitmapDecoder, Windows.Graphics.Imaging, ContentType = WindowsRuntime]
$null = [Windows.Globalization.Language, Windows.Globalization, ContentType = WindowsRuntime]

$asTaskGeneric = ([System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object {
    $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1'
  })[0]
function Await($task, $type) {
  $t = $asTaskGeneric.MakeGenericMethod($type).Invoke($null, @($task))
  $t.Wait(-1) | Out-Null
  $t.Result
}

$engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromLanguage((New-Object Windows.Globalization.Language 'en-US'))
if (-not $engine) { throw "no en-US OCR engine on this machine" }
$scale = 72.0 / $Dpi

Get-ChildItem -LiteralPath $Dir -Filter 'p*.png' | Sort-Object Name | ForEach-Object {
  $file = Await ([Windows.Storage.StorageFile]::GetFileFromPathAsync($_.FullName)) ([Windows.Storage.StorageFile])
  $stream = Await ($file.OpenAsync([Windows.Storage.FileAccessMode]::Read)) ([Windows.Storage.Streams.IRandomAccessStream])
  $decoder = Await ([Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)) ([Windows.Graphics.Imaging.BitmapDecoder])
  $bitmap = Await ($decoder.GetSoftwareBitmapAsync()) ([Windows.Graphics.Imaging.SoftwareBitmap])
  $result = Await ($engine.RecognizeAsync($bitmap)) ([Windows.Media.Ocr.OcrResult])
  $words = New-Object System.Collections.ArrayList
  foreach ($line in $result.Lines) {
    foreach ($w in $line.Words) {
      $r = $w.BoundingRect
      [void]$words.Add(@([math]::Round($r.X * $scale, 2), [math]::Round($r.Y * $scale, 2),
          [math]::Round(($r.X + $r.Width) * $scale, 2), [math]::Round(($r.Y + $r.Height) * $scale, 2), $w.Text))
    }
  }
  $stream.Dispose()
  $out = Join-Path $_.DirectoryName ($_.BaseName + '.words.json')
  [System.IO.File]::WriteAllText($out, (ConvertTo-Json -InputObject $words.ToArray() -Depth 3 -Compress), (New-Object System.Text.UTF8Encoding $false))
  Write-Output ("{0}: {1} words" -f $_.Name, $words.Count)
}
