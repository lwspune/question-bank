/**
 * Join an ebook's printed parts (cover + contents, then one PDF per chapter)
 * into the master, and number its pages. Used by scripts/ebooks/build.ts.
 *
 * WHY THE PAGES ARE NUMBERED HERE and not by the printer: each chapter is
 * printed on its own (a whole book in one browser page is too much for one
 * print), so the printer's own counter would restart at 1 in every chapter.
 * The cover carries no number.
 */
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { safePdfText } from "./stamp";

export async function assembleMaster(parts: Uint8Array[], opts: { footer: string }): Promise<Uint8Array> {
  const out = await PDFDocument.create();
  for (const part of parts) {
    const src = await PDFDocument.load(part);
    const pages = await out.copyPages(src, src.getPageIndices());
    for (const p of pages) out.addPage(p);
  }
  const font = await out.embedFont(StandardFonts.Helvetica);
  const total = out.getPageCount();
  const size = 7.5;
  out.getPages().forEach((page, i) => {
    if (i === 0) return;
    const text = safePdfText(`${opts.footer}  ·  Page ${i + 1} of ${total}`);
    const { width } = page.getSize();
    page.drawText(text, {
      x: (width - font.widthOfTextAtSize(text, size)) / 2,
      y: 24,
      size,
      font,
      color: rgb(0.42, 0.45, 0.5),
    });
  });
  out.setProducer("PYQ Vault");
  return out.save();
}

/** Page counts of each part, for the contents page's page numbers. */
export async function pageCounts(parts: Uint8Array[]): Promise<number[]> {
  return Promise.all(parts.map(async (p) => (await PDFDocument.load(p)).getPageCount()));
}
