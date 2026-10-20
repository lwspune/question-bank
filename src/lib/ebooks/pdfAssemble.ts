/**
 * Join an ebook's printed parts (cover + contents, then one PDF per chapter)
 * into the master, and number its pages. Used by scripts/ebooks/build.ts.
 *
 * WHY THE PAGES ARE NUMBERED HERE and not by the printer: each chapter is
 * printed on its own (a whole book in one browser page is too much for one
 * print), so the printer's own counter would restart at 1 in every chapter.
 * The cover carries no number.
 */
import {
  PDFArray,
  PDFDocument,
  PDFName,
  PDFRef,
  StandardFonts,
  closePath,
  fill,
  popGraphicsState,
  pushGraphicsState,
  rectangle,
  rgb,
  setFillingRgbColor,
  type PDFPage,
} from "pdf-lib";
import { safePdfText } from "./stamp";

/** "#faf8f3" -> [r, g, b] in 0..1. */
export function hexToRgb(hex: string): [number, number, number] {
  return [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255) as [number, number, number];
}

/**
 * Paint a colour under everything already on the page: a filled rectangle in
 * a content stream placed FIRST. Chrome leaves @page margins white, so the
 * book's paper is laid here instead (lib/ebooks/theme).
 */
export function paintPaper(page: PDFPage, hex: string): void {
  const { width, height } = page.getSize();
  const [r, g, b] = hexToRgb(hex);
  const ctx = page.doc.context;
  const stream = ctx.contentStream([
    pushGraphicsState(),
    setFillingRgbColor(r, g, b),
    rectangle(0, 0, width, height),
    closePath(),
    fill(),
    popGraphicsState(),
  ]);
  const ref = ctx.register(stream);
  const existing = page.node.get(PDFName.of("Contents"));
  const arr = PDFArray.withContext(ctx);
  arr.push(ref);
  if (existing instanceof PDFArray) for (const item of existing.asArray()) arr.push(item);
  else if (existing instanceof PDFRef) arr.push(existing);
  else if (existing) arr.push(ctx.register(existing as never));
  page.node.set(PDFName.of("Contents"), arr);
}

export async function assembleMaster(parts: Uint8Array[], opts: { footer: string; paper?: string }): Promise<Uint8Array> {
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
      color: rgb(0.333, 0.396, 0.498), // the site's muted text, #55657F
    });
  });
  // Last, so the paper goes under everything, the footer's own wrapping included.
  if (opts.paper) for (const page of out.getPages()) paintPaper(page, opts.paper);
  out.setProducer("PYQ Vault");
  return out.save();
}

/** Page counts of each part, for the contents page's page numbers. */
export async function pageCounts(parts: Uint8Array[]): Promise<number[]> {
  return Promise.all(parts.map(async (p) => (await PDFDocument.load(p)).getPageCount()));
}
