/**
 * Stamp a buyer's copy of an ebook (owner, 2026-10-20): a licence page behind
 * the cover, and on every page a footer line and a faint diagonal mark carrying
 * the buyer's email. A cover printed with a name line (`namePlate`, 2026-10-28)
 * gets the buyer's name written on it, in gold.
 *
 * WHY STAMP A MASTER instead of printing per buyer: a whole book is several
 * hundred pages and takes minutes to print, far past a request's time. The
 * master is printed once (scripts/ebooks/build.ts); writing a few lines onto
 * each page of it takes seconds.
 *
 * WHAT IT DOES AND DOES NOT DO: it tells a reader whose copy this is, and it
 * tells us whose copy leaked. It does not stop a determined person from
 * removing it. That is the honest claim, and the store page makes no other.
 *
 * Text is drawn in Helvetica, a standard PDF font, so nothing is embedded and
 * the file barely grows. A standard font only draws Latin-1, so anything else
 * in an email prints as "?" rather than failing the download. The name is in
 * Times Bold, the serif the PDF format carries, to sit with the cover's own
 * serif; lib/ebooks/coverName only lets through names it can draw.
 */
import { PDFDocument, StandardFonts, degrees, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import { NAME_PLATE } from "./theme";

export type Licence = {
  email: string;
  /** The name to print (lib/ebooks/coverName); null when there is none the font can draw. */
  name?: string | null;
  /** The master's cover has a line for the name (`ebooks.name_plate`). */
  namePlate?: boolean;
  /** The payment id, so a leaked copy names its purchase. */
  orderRef: string;
  /** Purchase date as printed, e.g. "20 Oct 2026". */
  date: string;
  /** The book's title, for the licence page. */
  title: string;
  /** The book's paper colour, so the licence page matches its pages. */
  paper?: string;
};

const NAVY = rgb(0.059, 0.114, 0.29);
const GREY = rgb(0.42, 0.45, 0.5);
const GOLD = rgb(0.941, 0.769, 0.431); // #f0c46e, the cover's gold
const PALE = rgb(0.576, 0.639, 0.82); // #93a3d1, the cover's muted text
const MM = 72 / 25.4;

/** Latin-1 only: Helvetica cannot draw anything else. */
export function safePdfText(s: string): string {
  return Array.from(s)
    .map((c) => (c.charCodeAt(0) <= 0xff && c.charCodeAt(0) >= 0x20 ? c : "?"))
    .join("");
}

/** The licence page's paragraphs, in order. */
export function licenceLines(l: Licence): string[] {
  return [
    `This copy of "${l.title}" was bought by ${l.name ? `${l.name} (${l.email})` : l.email} on ${l.date} (order ${l.orderRef}).`,
    "It is licensed for that person's own study only.",
    "Sharing this file, copying it, printing it for others or reselling it is not allowed. Every page carries the buyer's email address.",
    "Thank you for buying it. It keeps PYQ Vault going.",
  ];
}

function footerLine(l: Licence): string {
  return `Licensed to ${l.email}  ·  Order ${l.orderRef}  ·  Not for sharing or resale`;
}

function wrap(text: string, font: PDFFont, size: number, width: number): string[] {
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(/\s+/)) {
    const next = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(next, size) > width && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function drawLicencePage(page: PDFPage, l: Licence, regular: PDFFont, bold: PDFFont): void {
  const { width, height } = page.getSize();
  if (l.paper) {
    const [r, g, b] = [1, 3, 5].map((i) => parseInt(l.paper!.slice(i, i + 2), 16) / 255);
    page.drawRectangle({ x: 0, y: 0, width, height, color: rgb(r, g, b) });
  }
  const left = 64;
  const textWidth = width - left * 2;
  let y = height - 120;
  page.drawText("PYQ VAULT", { x: left, y, size: 9, font: bold, color: rgb(0.114, 0.306, 0.847) });
  y -= 34;
  page.drawText("Licensed copy", { x: left, y, size: 26, font: bold, color: NAVY });
  y -= 40;
  for (const para of licenceLines(l)) {
    for (const line of wrap(safePdfText(para), regular, 12, textWidth)) {
      page.drawText(line, { x: left, y, size: 12, font: regular, color: NAVY });
      y -= 18;
    }
    y -= 10;
  }
  page.drawText("www.pyqvault.com", { x: left, y: 80, size: 10, font: regular, color: GREY });
}

function markPage(page: PDFPage, l: Licence, font: PDFFont): void {
  const { width, height } = page.getSize();
  const email = safePdfText(l.email);

  // The faint diagonal mark, centred on the page.
  const size = 24;
  const w = font.widthOfTextAtSize(email, size);
  const angle = Math.PI / 4;
  page.drawText(email, {
    x: width / 2 - (w / 2) * Math.cos(angle),
    y: height / 2 - (w / 2) * Math.sin(angle),
    size,
    font,
    color: NAVY,
    opacity: 0.07,
    rotate: degrees(45),
  });

  // The footer line, under the master's own page-number footer.
  const footer = safePdfText(footerLine(l));
  const fsize = 6.5;
  page.drawText(footer, {
    x: (width - font.widthOfTextAtSize(footer, fsize)) / 2,
    y: 11,
    size: fsize,
    font,
    color: GREY,
  });
}

/** Write a name on the cover's name line, shrunk to fit its width. */
function drawCoverName(page: PDFPage, text: string, font: PDFFont, color = GOLD): void {
  const safe = safePdfText(text);
  const width = NAME_PLATE.widthMm * MM;
  let size: number = NAME_PLATE.maxPt;
  while (size > NAME_PLATE.minPt && font.widthOfTextAtSize(safe, size) > width) size -= 0.5;
  page.drawText(safe, {
    x: NAME_PLATE.leftMm * MM,
    y: (NAME_PLATE.bottomMm + NAME_PLATE.baselineMm) * MM,
    size,
    font,
    color,
  });
}

/** The free sample's cover: a placeholder on the name line, so a visitor sees where their name goes. */
export async function stampCoverName(pdf: Uint8Array, text: string, style: "placeholder"): Promise<Uint8Array> {
  const doc = await PDFDocument.load(pdf);
  if (doc.getPageCount() === 0) return pdf;
  const font = await doc.embedFont(style === "placeholder" ? StandardFonts.TimesRomanBoldItalic : StandardFonts.TimesRomanBold);
  drawCoverName(doc.getPage(0), text, font, PALE);
  return doc.save();
}

export async function stampEbook(master: Uint8Array, licence: Licence): Promise<Uint8Array> {
  const doc = await PDFDocument.load(master);
  const regular = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  if (licence.namePlate && doc.getPageCount() > 0) {
    drawCoverName(doc.getPage(0), licence.name ?? licence.email, await doc.embedFont(StandardFonts.TimesRomanBold));
  }
  // The book opens on its cover, as a printed book does; the licence page follows it.
  const first = doc.getPageCount() > 0 ? doc.getPage(0).getSize() : { width: 595.28, height: 841.89 };
  const licencePage = doc.insertPage(Math.min(1, doc.getPageCount()), [first.width, first.height]);
  drawLicencePage(licencePage, licence, regular, bold);
  for (const page of doc.getPages()) markPage(page, licence, regular);
  doc.setTitle(licence.title);
  doc.setAuthor("PYQ Vault");
  doc.setSubject(`Licensed to ${safePdfText(licence.email)}`);
  return doc.save();
}
