/**
 * Each buyer's copy of an ebook carries their email (owner, 2026-10-20): a
 * licence page in front saying whose copy it is and that sharing is not
 * allowed, and on every page a footer line plus a faint diagonal mark with the
 * email. The master is printed once; this stamping runs per buyer.
 *
 * Checked on real PDFs made with pdf-lib: the page count, and the email
 * present in the content of every page (pdf-lib writes standard-font text as
 * hex strings, so the test looks for the hex).
 */
import { describe, it, expect } from "vitest";
import { PDFDocument, decodePDFRawStream, PDFArray, PDFRawStream, type PDFPage } from "pdf-lib";
import { assembleMaster } from "@/lib/ebooks/pdfAssemble";
import { licenceLines, safePdfText, stampEbook } from "@/lib/ebooks/stamp";

async function blankPdf(pages: number): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  for (let i = 0; i < pages; i++) doc.addPage([595.28, 841.89]);
  return doc.save();
}

/** All content-stream bytes of a page, decoded, as latin1 text. */
function pageContent(page: PDFPage): string {
  const contents = page.node.Contents();
  const streams = contents instanceof PDFArray ? contents.asArray().map((r) => page.doc.context.lookup(r)) : [contents];
  return streams
    .map((s) => (s instanceof PDFRawStream ? Buffer.from(decodePDFRawStream(s).decode()).toString("latin1") : ""))
    .join("\n");
}

const hex = (s: string) => Buffer.from(s, "latin1").toString("hex").toUpperCase();

const LICENCE = { email: "asha@example.com", orderRef: "pay_ABC123", date: "20 Oct 2026", title: "MHT-CET Mathematics" };

describe("licenceLines", () => {
  it("names the buyer, the order and the rule", () => {
    const text = licenceLines(LICENCE).join(" ");
    expect(text).toContain("asha@example.com");
    expect(text).toContain("pay_ABC123");
    expect(text).toContain("20 Oct 2026");
    expect(text).toMatch(/not allowed/i);
  });
});

describe("safePdfText", () => {
  it("keeps plain email text and replaces what the standard font cannot draw", () => {
    expect(safePdfText("a.b+c@x.in")).toBe("a.b+c@x.in");
    expect(safePdfText("रमा@x.in")).toBe("???@x.in");
  });
});

describe("stampEbook", () => {
  it("adds a licence page in front and marks every page with the email", async () => {
    const out = await stampEbook(await blankPdf(3), LICENCE);
    const doc = await PDFDocument.load(out);
    expect(doc.getPageCount()).toBe(4);
    for (const page of doc.getPages()) {
      expect(pageContent(page)).toContain(hex("asha@example.com"));
    }
    expect(pageContent(doc.getPage(0))).toContain(hex("Licensed copy"));
  });
});

describe("assembleMaster", () => {
  it("joins the parts in order and numbers every page after the cover", async () => {
    const out = await assembleMaster([await blankPdf(1), await blankPdf(2), await blankPdf(3)], {
      footer: "PYQ Vault · MHT-CET Mathematics",
    });
    const doc = await PDFDocument.load(out);
    expect(doc.getPageCount()).toBe(6);
    expect(pageContent(doc.getPage(0))).not.toContain(hex("Page "));
    expect(pageContent(doc.getPage(1))).toContain(hex("Page 2 of 6"));
    expect(pageContent(doc.getPage(5))).toContain(hex("Page 6 of 6"));
  });
});
