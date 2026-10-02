/**
 * "Download as PDF" on a notes chapter opens the print handout with
 * `?print=1`, and the handout opens the browser's save screen by itself.
 *
 * Before 2026-10-02 the link opened the handout and left the visitor to find a
 * second "Save as PDF" button; Clarity recorded one tapping the handout's text,
 * then that button, three times over. The flag keeps a plain visit (a desktop
 * reader opening the handout to read it) free of a surprise print dialog.
 *
 * Pure string helpers; the effect lives in print/HandoutAutoPrint.tsx.
 */
const FLAG = "print";

export function handoutDownloadHref(href: string): string {
  return `${href}${href.includes("?") ? "&" : "?"}${FLAG}=1`;
}

export function shouldAutoPrint(search: string): boolean {
  return new URLSearchParams(search).get(FLAG) === "1";
}

/** The same path and query without the flag, so a reload or Back does not reprint. */
export function withoutPrintParam(pathWithQuery: string): string {
  const [path, query = ""] = pathWithQuery.split("?");
  const params = new URLSearchParams(query);
  params.delete(FLAG);
  const rest = params.toString();
  return rest ? `${path}?${rest}` : path;
}
