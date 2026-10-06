/**
 * The saved file's extension comes from what the server SENT, not from what the
 * download box expected. Since 2026-10-07 a PDF download can arrive as Word
 * (the printer's safety net), and a Word file saved as ".pdf" does not open.
 */
import { describe, it, expect } from "vitest";
import {
  extensionForContentType,
  filenameFromDisposition,
  PDF_CONTENT_TYPE,
  DOCX_CONTENT_TYPE,
  XLSX_CONTENT_TYPE,
} from "@/lib/export/fileType";
import { PPTX_CONTENT_TYPE } from "@/lib/export/pptxParts";

describe("filenameFromDisposition", () => {
  it("takes the name the server chose", () => {
    expect(filenameFromDisposition('attachment; filename="QP_JEE_Mains_2026.pdf"', "x.pdf")).toBe(
      "QP_JEE_Mains_2026.pdf"
    );
  });

  it("keeps the fallback when the header is missing or has no name", () => {
    expect(filenameFromDisposition(null, "Answers.pdf")).toBe("Answers.pdf");
    expect(filenameFromDisposition("attachment", "Answers.pdf")).toBe("Answers.pdf");
  });
});

describe("extensionForContentType", () => {
  it("maps each file the route serves", () => {
    expect(extensionForContentType(PDF_CONTENT_TYPE, "docx")).toBe("pdf");
    expect(extensionForContentType(DOCX_CONTENT_TYPE, "pdf")).toBe("docx");
    expect(extensionForContentType(XLSX_CONTENT_TYPE, "docx")).toBe("xlsx");
    expect(extensionForContentType(PPTX_CONTENT_TYPE, "docx")).toBe("pptx");
  });

  it("ignores parameters and case", () => {
    expect(extensionForContentType("Application/PDF; charset=binary", "docx")).toBe("pdf");
  });

  it("keeps the expected extension when the type is missing or unknown", () => {
    expect(extensionForContentType(null, "pdf")).toBe("pdf");
    expect(extensionForContentType("application/octet-stream", "docx")).toBe("docx");
  });
});
