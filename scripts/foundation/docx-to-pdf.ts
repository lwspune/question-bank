/**
 * Convert a docx-only worksheet to PDF (Word COM) so the vision pipeline can
 * render it. The Foundation worksheets' WS2/WS3 (and Carbon) ship only as .docx,
 * whose text layer is lossy (collapsed chem subscripts, figures-as-images) — so
 * we convert to PDF, then render/transcribe exactly like the PDF worksheets.
 * Same Word-COM approach as the MHT-CET source-render pipeline.
 *
 *   npx tsx scripts/foundation/docx-to-pdf.ts <worksheetId>
 *
 * Reads ws.docxSource and writes ws.pdf (under SOURCE_ROOT/_converted). Requires
 * Microsoft Word installed (COM automation). No-op-safe: overwrites the PDF.
 */
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { spawnSync } from "node:child_process";
import { requireWorksheet } from "./config";

function main() {
  const id = process.argv[2];
  const ws = requireWorksheet(id);
  if (!ws.docxSource) throw new Error(`worksheet "${id}" has no docxSource — it is already a PDF worksheet.`);
  mkdirSync(dirname(ws.pdf), { recursive: true });

  // Word COM: open the docx, SaveAs wdFormatPDF (17), close. Paths passed via
  // env vars (not args) to dodge PowerShell -Command quoting + $args issues.
  const ps = `
$ErrorActionPreference = 'Stop'
$word = New-Object -ComObject Word.Application
$word.Visible = $false
try {
  $doc = $word.Documents.Open($env:DOCX_IN)
  $doc.SaveAs([ref]$env:PDF_OUT, [ref]17)
  $doc.Close()
  Write-Output ('converted -> ' + $env:PDF_OUT)
} finally { $word.Quit() }
`;
  const res = spawnSync(
    "powershell",
    ["-NoProfile", "-NonInteractive", "-Command", ps],
    { encoding: "utf8", maxBuffer: 32 * 1024 * 1024, env: { ...process.env, DOCX_IN: ws.docxSource, PDF_OUT: ws.pdf } }
  );
  if (res.status !== 0) throw new Error(`docx->pdf failed: ${res.stderr || res.stdout}`);
  console.log(res.stdout.trim());
  console.log(`wrote ${ws.pdf}`);
}

main();
