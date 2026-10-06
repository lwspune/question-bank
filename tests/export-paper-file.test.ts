/**
 * The paper / key file with a safety net (2026-10-07): when printing the PDF
 * fails, the student gets the Word file instead of a 500, and the failure is
 * reported so the log still shows the PDF is broken.
 */
import { describe, it, expect, vi } from "vitest";
import { buildPaperFile } from "@/lib/export/paperFile";

const PDF = Buffer.from("%PDF");
const DOCX = Buffer.from("PK");

describe("buildPaperFile", () => {
  it("serves the PDF when it prints", async () => {
    const buildDocx = vi.fn(async () => DOCX);
    const onPdfFailure = vi.fn();
    const out = await buildPaperFile("pdf", { buildPdf: async () => PDF, buildDocx, onPdfFailure });
    expect(out).toEqual({ format: "pdf", buf: PDF });
    expect(buildDocx).not.toHaveBeenCalled();
    expect(onPdfFailure).not.toHaveBeenCalled();
  });

  it("falls back to Word when the PDF fails, and reports the failure", async () => {
    const failure = new Error("browser did not start");
    const onPdfFailure = vi.fn();
    const out = await buildPaperFile("pdf", {
      buildPdf: async () => {
        throw failure;
      },
      buildDocx: async () => DOCX,
      onPdfFailure,
    });
    expect(out).toEqual({ format: "docx", buf: DOCX });
    expect(onPdfFailure).toHaveBeenCalledWith(failure);
  });

  it("never prints a PDF for a Word download", async () => {
    const buildPdf = vi.fn(async () => PDF);
    const out = await buildPaperFile("docx", { buildPdf, buildDocx: async () => DOCX, onPdfFailure: vi.fn() });
    expect(out).toEqual({ format: "docx", buf: DOCX });
    expect(buildPdf).not.toHaveBeenCalled();
  });

  it("lets a Word failure through: there is nothing left to fall back to", async () => {
    await expect(
      buildPaperFile("pdf", {
        buildPdf: async () => {
          throw new Error("pdf");
        },
        buildDocx: async () => {
          throw new Error("docx");
        },
        onPdfFailure: vi.fn(),
      })
    ).rejects.toThrow("docx");
  });
});
