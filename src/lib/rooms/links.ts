/**
 * Tappable links in a TEAM circle message. Students cannot post links
 * (lib/rooms/text refuses them), so only team bodies go through this.
 * The window renders the pieces as React nodes, never as HTML.
 * Pure. Spec: tests/rooms-links.test.ts.
 */
export type LinkPiece = { kind: "text"; text: string } | { kind: "link"; href: string; text: string };

const URL_RE = /https?:\/\/[^\s<>"']+/gi;
/** Sentence punctuation and closing brackets that end a sentence, not a URL. */
const TRAILING = /[.,;:!?)\]}]+$/;

export function splitLinks(body: string): LinkPiece[] {
  const pieces: LinkPiece[] = [];
  let last = 0;
  for (const m of body.matchAll(URL_RE)) {
    const raw = m[0];
    const href = raw.replace(TRAILING, "");
    const start = m.index ?? 0;
    if (start > last) pieces.push({ kind: "text", text: body.slice(last, start) });
    pieces.push({ kind: "link", href, text: href });
    last = start + href.length;
  }
  if (last < body.length) pieces.push({ kind: "text", text: body.slice(last) });
  return pieces.length ? pieces : [{ kind: "text", text: body }];
}

/** Our own pages open in the same tab; any other site opens in a new one. */
export function linkOpensHere(href: string): boolean {
  try {
    const host = new URL(href).hostname.toLowerCase();
    return host === "pyqvault.com" || host.endsWith(".pyqvault.com");
  } catch {
    return false;
  }
}
