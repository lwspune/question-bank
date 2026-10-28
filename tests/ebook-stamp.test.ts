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
import { licenceLines, safePdfText, stampCoverName, stampEbook } from "@/lib/ebooks/stamp";

async function blankPdf(pages: number): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  for (let i = 0; i < pages; i++) doc.addPage([595.28, 841.89]);
  return doc.save();
}

/** Each content stream of a page, decoded, in drawing order. */
function pageStreams(page: PDFPage): string[] {
  const contents = page.node.Contents();
  const streams = contents instanceof PDFArray ? contents.asArray().map((r) => page.doc.context.lookup(r)) : [contents];
  return streams.map((s) => (s instanceof PDFRawStream ? Buffer.from(decodePDFRawStream(s).decode()).toString("latin1") : ""));
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

  it("names the buyer by name too, when the cover carries one", () => {
    expect(licenceLines({ ...LICENCE, name: "Asha Patil" }).join(" ")).toContain("Asha Patil (asha@example.com)");
  });
});

describe("safePdfText", () => {
  it("keeps plain email text and replaces what the standard font cannot draw", () => {
    expect(safePdfText("a.b+c@x.in")).toBe("a.b+c@x.in");
    expect(safePdfText("रमा@x.in")).toBe("???@x.in");
  });
});

describe("stampEbook", () => {
  it("paints the licence page with the book's paper too", async () => {
    const out = await stampEbook(await blankPdf(2), { ...LICENCE, paper: "#faf8f3" });
    const doc = await PDFDocument.load(out);
    expect(pageStreams(doc.getPage(1)).join(" ")).toMatch(/0\.98\d* 0\.97\d* 0\.95\d* rg/);
  });

  // The book opens on its cover, as a printed book does; the licence page follows it.
  it("adds the licence page after the cover and marks every page with the email", async () => {
    const out = await stampEbook(await blankPdf(3), LICENCE);
    const doc = await PDFDocument.load(out);
    expect(doc.getPageCount()).toBe(4);
    for (const page of doc.getPages()) {
      expect(pageContent(page)).toContain(hex("asha@example.com"));
    }
    expect(pageContent(doc.getPage(0))).not.toContain(hex("Licensed copy"));
    expect(pageContent(doc.getPage(1))).toContain(hex("Licensed copy"));
  });

  it("writes the buyer's name on a cover that has room for it", async () => {
    const out = await stampEbook(await blankPdf(3), { ...LICENCE, name: "Asha Patil", namePlate: true });
    const doc = await PDFDocument.load(out);
    expect(pageContent(doc.getPage(0))).toContain(hex("Asha Patil"));
    expect(pageContent(doc.getPage(2))).not.toContain(hex("Asha Patil"));
  });

  it("writes the email on such a cover when there is no name it can print", async () => {
    const out = await stampEbook(await blankPdf(2), { ...LICENCE, name: null, namePlate: true });
    const doc = await PDFDocument.load(out);
    // Once in the footer line, once on the plate.
    expect(pageContent(doc.getPage(0)).split(hex("asha@example.com")).length - 1).toBeGreaterThanOrEqual(3);
  });

  it("leaves a cover without room for a name as it is, and names the buyer on the licence page", async () => {
    const out = await stampEbook(await blankPdf(2), { ...LICENCE, name: "Asha Patil", namePlate: false });
    const doc = await PDFDocument.load(out);
    expect(pageContent(doc.getPage(0))).not.toContain(hex("Asha Patil"));
    expect(pageContent(doc.getPage(1))).toContain(hex("Asha Patil"));
  });
});

describe("stampCoverName", () => {
  it("writes a placeholder on the free sample's cover and adds no page", async () => {
    const out = await stampCoverName(await blankPdf(2), "Your name here", "placeholder");
    const doc = await PDFDocument.load(out);
    expect(doc.getPageCount()).toBe(2);
    expect(pageContent(doc.getPage(0))).toContain(hex("Your name here"));
    expect(pageContent(doc.getPage(1))).not.toContain(hex("Your name here"));
  });
});

describe("assembleMaster", () => {
  it("paints the paper colour under every page, before anything else is drawn", async () => {
    const out = await assembleMaster([await blankPdf(1), await blankPdf(2)], { footer: "PYQ Vault", paper: "#faf8f3" });
    const doc = await PDFDocument.load(out);
    for (const page of doc.getPages()) {
      const first = pageStreams(page)[0];
      expect(first).toMatch(/0\.98\d* 0\.97\d* 0\.95\d* rg/);
      expect(first).toMatch(/ re\n/);
    }
  });

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
