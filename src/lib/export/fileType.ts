import { PPTX_CONTENT_TYPE } from "./pptxParts";

/** The content types /api/export serves, shared with the download box. */
export const PDF_CONTENT_TYPE = "application/pdf";
export const DOCX_CONTENT_TYPE =
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
export const XLSX_CONTENT_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

const EXTENSION: Record<string, string> = {
  [PDF_CONTENT_TYPE]: "pdf",
  [DOCX_CONTENT_TYPE]: "docx",
  [XLSX_CONTENT_TYPE]: "xlsx",
  [PPTX_CONTENT_TYPE]: "pptx",
};

/**
 * The extension to save a download under, from the type the server SENT.
 * Since 2026-10-07 a PDF download can arrive as Word (the printer's safety
 * net), and a Word file saved as ".pdf" does not open. An unknown or missing
 * type keeps the extension the box expected.
 */
export function extensionForContentType(contentType: string | null, expected: string): string {
  const type = contentType?.split(";")[0].trim().toLowerCase() ?? "";
  return EXTENSION[type] ?? expected;
}
