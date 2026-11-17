import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { printPdf } from "@/lib/export/pdf/printPdf";

// 2026-11-17 (SUGGESTIONS 2026-10-26): an ordinary RGB PNG near a page break hung
// Chrome's PDF print for good while building the ebooks; the same picture as a
// JPEG printed in about 2 s. The paper and answer-key downloads use this printer,
// so printOnce now redraws every PNG figure as a JPEG in the page before printing
// (no new dependency: a canvas in the browser that prints anyway).
const PNG_1PX =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";

const hasBrowser =
  !!process.env.PDF_BROWSER ||
  (process.platform === "win32" &&
    [
      "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
      "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
      "C:/Program Files/Google/Chrome/Application/chrome.exe",
    ].some((p) => existsSync(p)));

describe.skipIf(!hasBrowser)("printPdf embeds PNG figures as JPEG", () => {
  it("a PNG figure reaches the PDF as a JPEG (DCTDecode)", async () => {
    const html = `<!doctype html><html><body><p>Figure:</p><img class="fig" style="width:200px;height:200px" src="data:image/png;base64,${PNG_1PX}"></body></html>`;
    const pdf = (await printPdf(html, { timeoutMs: 40_000 })).toString("latin1");
    expect(pdf).toContain("/DCTDecode");
  }, 60_000);

  it("a transparent watermark is left a PNG", async () => {
    const html = `<!doctype html><html><body><img class="watermark" style="width:200px;height:200px" src="data:image/png;base64,${PNG_1PX}"></body></html>`;
    const pdf = (await printPdf(html, { timeoutMs: 40_000 })).toString("latin1");
    expect(pdf).not.toContain("/DCTDecode");
  }, 60_000);
});
