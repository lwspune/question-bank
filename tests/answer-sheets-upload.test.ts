/**
 * The start-an-upload request (answer-sheet grading, migration 0153). Checked
 * before anything is read or any upload link is issued: the route is the
 * boundary, and a student's browser can send anything.
 */
import { describe, it, expect } from "vitest";
import {
  MAX_FILES,
  MAX_FILE_BYTES,
  MAX_TOTAL_BYTES,
  isScanFile,
  markedPagePath,
  reportPdfPath,
  scanPath,
  validateStartRequest,
} from "@/lib/answerSheets/upload";

const MB = 1024 * 1024;
const body = (over: Record<string, unknown> = {}) => ({
  examSlug: "cbse-12",
  paperSlug: "2025-55-1-1",
  consent: true,
  files: [
    { type: "image/jpeg", size: 2 * MB },
    { type: "application/pdf", size: 5 * MB },
  ],
  ...over,
});

describe("validateStartRequest", () => {
  it("accepts photos and PDFs and gives each file its extension", () => {
    const r = validateStartRequest(body());
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.value.files.map((f) => f.ext)).toEqual(["jpg", "pdf"]);
    expect(r.value).toMatchObject({ examSlug: "cbse-12", paperSlug: "2025-55-1-1" });
  });

  it("requires the consent tick", () => {
    expect(validateStartRequest(body({ consent: false })).ok).toBe(false);
    expect(validateStartRequest(body({ consent: "yes" })).ok).toBe(false);
  });

  it("refuses a file type the grader cannot read (HEIC, Word, anything else)", () => {
    const r = validateStartRequest(body({ files: [{ type: "image/heic", size: MB }] }));
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.error).toMatch(/JPG, PNG, WEBP or PDF/);
    expect(validateStartRequest(body({ files: [{ type: "application/msword", size: MB }] })).ok).toBe(false);
  });

  it("refuses no files, too many files, an empty file, and a file over the limit", () => {
    expect(validateStartRequest(body({ files: [] })).ok).toBe(false);
    const many = Array.from({ length: MAX_FILES + 1 }, () => ({ type: "image/png", size: MB }));
    expect(validateStartRequest(body({ files: many })).ok).toBe(false);
    expect(validateStartRequest(body({ files: [{ type: "image/png", size: 0 }] })).ok).toBe(false);
    expect(validateStartRequest(body({ files: [{ type: "image/png", size: MAX_FILE_BYTES + 1 }] })).ok).toBe(false);
  });

  it("refuses files that are each allowed but too large together", () => {
    const count = Math.floor(MAX_TOTAL_BYTES / MAX_FILE_BYTES) + 1;
    const big = Array.from({ length: count }, () => ({ type: "application/pdf", size: MAX_FILE_BYTES }));
    const r = validateStartRequest(body({ files: big }));
    expect(r.ok).toBe(false);
  });

  it("refuses a slug that is not a slug", () => {
    expect(validateStartRequest(body({ paperSlug: "../../etc" })).ok).toBe(false);
    expect(validateStartRequest(body({ examSlug: "" })).ok).toBe(false);
    expect(validateStartRequest(null).ok).toBe(false);
  });
});

describe("scanPath", () => {
  it("files every scan under the student's own folder, numbered in upload order", () => {
    expect(scanPath("u-1", "s-1", 0, "jpg")).toBe("u-1/s-1/01.jpg");
    expect(scanPath("u-1", "s-1", 11, "pdf")).toBe("u-1/s-1/12.pdf");
  });
});

describe("marked pages (migration 0175)", () => {
  it("keeps the marked pages and the report beside the scans, in their own folder", () => {
    expect(markedPagePath("u-1", "s-1", 0)).toBe("u-1/s-1/marked/01.jpg");
    expect(markedPagePath("u-1", "s-1", 9)).toBe("u-1/s-1/marked/10.jpg");
    expect(reportPdfPath("u-1", "s-1")).toBe("u-1/s-1/marked/report.pdf");
  });

  it("tells a scan from the marked folder when the student's folder is listed", () => {
    expect(isScanFile("01.jpg")).toBe(true);
    expect(isScanFile("12.PDF")).toBe(true);
    expect(isScanFile("marked")).toBe(false);
    expect(isScanFile("report.pdf")).toBe(false);
  });
});
