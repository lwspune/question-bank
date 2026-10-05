/**
 * The fonts and KaTeX stylesheet the PDF page links, as `file://` URLs.
 *
 * WHY bundled fonts: the Chromium that prints on Vercel has almost no fonts of
 * its own, so whatever the page does not carry prints as boxes. Source Serif 4
 * is the site's question font; it lacks 46 of the 147 non-ASCII characters the
 * bank uses (measured 2026-10-05), so Noto Sans Math and DejaVu Sans follow it
 * in the stack, and that covers all but one emoji (see richHtml). Noto Serif
 * Devanagari is for MPSC's Marathi.
 *
 * Linked from disk rather than pasted into the page as base64, so a page
 * stays small and Chromium loads only the faces a paper uses. On Vercel these
 * files reach the function through `outputFileTracingIncludes` in
 * next.config.mjs — a file that is not listed there does not exist at run time.
 */
import { join } from "node:path";
import { pathToFileURL } from "node:url";

export const PDF_FONT_DIR = join(process.cwd(), "src", "lib", "export", "pdf", "fonts");
export const KATEX_CSS = join(process.cwd(), "node_modules", "katex", "dist", "katex.min.css");

const url = (file: string) => pathToFileURL(join(PDF_FONT_DIR, file)).href;

function face(family: string, file: string, extra = ""): string {
  return `@font-face{font-family:"${family}";src:url("${url(file)}") format("woff2");font-display:block;${extra}}`;
}

// Fixed weights, cut from the variable fonts (opsz 11 for Source Serif): a
// variable font is embedded in the PDF as a Type 3 font, which some viewers
// draw blurred, and the cut files are a fifth of the size.
const DEVANAGARI_RANGE = "unicode-range:U+0900-097F,U+1CD0-1CFF,U+200C-200D,U+25CC,U+A830-A839,U+A8E0-A8FF;";

export function pdfHead(): string {
  const faces = [
    face("PV Serif", "SourceSerif4-Regular.woff2", "font-weight:400;font-style:normal;"),
    face("PV Serif", "SourceSerif4-Semibold.woff2", "font-weight:600;font-style:normal;"),
    face("PV Serif", "SourceSerif4-Bold.woff2", "font-weight:700;font-style:normal;"),
    face("PV Serif", "SourceSerif4-Italic.woff2", "font-weight:400;font-style:italic;"),
    face("PV Serif", "SourceSerif4-BoldItalic.woff2", "font-weight:700;font-style:italic;"),
    face("PV Devanagari", "NotoSerifDevanagari-Regular.woff2", `font-weight:400;${DEVANAGARI_RANGE}`),
    face("PV Devanagari", "NotoSerifDevanagari-Bold.woff2", `font-weight:700;${DEVANAGARI_RANGE}`),
    face("PV Math", "NotoSansMath.woff2"),
    face("PV Sans", "DejaVuSans.woff2"),
  ].join("");
  return `<link rel="stylesheet" href="${pathToFileURL(KATEX_CSS).href}"><style>${faces}</style>`;
}
