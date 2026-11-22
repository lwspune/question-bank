/**
 * Links in V's AI replies (2026-10-15). The model is told to write site paths
 * ("/pricing"), and a path becomes tappable only when V was GIVEN it: a page in
 * its facts or a chapter its search returned. A made-up address stays plain
 * text, so V can never send a student to a dead page.
 *
 * Pure. Spec: tests/chat-reply-links.test.ts.
 */

// A path starts at the start, after a space or an opening bracket, so "x/sin x"
// and "11th/12th" are not paths. It ends before trailing punctuation.
const PATH_RE = /(^|[\s(])(\/[a-z0-9][a-z0-9\-/]*[a-z0-9]|\/[a-z0-9])/gi;

export function pathsInReply(reply: string): string[] {
  return Array.from(reply.matchAll(PATH_RE), (m) => m[2]);
}

/** The paths in the reply that V was given, each once, in reply order. */
export function allowedReplyLinks(reply: string, allowed: ReadonlySet<string>): string[] {
  const out: string[] = [];
  for (const p of pathsInReply(reply)) {
    if (allowed.has(p) && !out.includes(p)) out.push(p);
  }
  return out;
}

// A markdown link to a site page: [text](/path).
const MARKDOWN_LINK_RE = /\[([^\]\n]*)\]\((\/[^)\s]*)\)/g;

/**
 * V is told to write bare paths, but given several pages it sometimes writes
 * "[Ray Optics](/questions/...)" (2026-10-19 replay), which the chat shows as
 * raw brackets. The route cleans the reply to "Ray Optics (/questions/...)",
 * or the bare path when the text is the path, before storing or showing it.
 */
export function plainLinks(reply: string): string {
  return reply.replace(MARKDOWN_LINK_RE, (_, text: string, path: string) => {
    const t = text.trim();
    return !t || t === path ? path : `${t} (${path})`;
  });
}

/** An escaped quote (\") copied into a reply shows its backslash (2026-11-07). LaTeX never needs one. */
export function plainQuotes(reply: string): string {
  return reply.replace(/\\"/g, '"');
}

const words = (slug: string) => {
  const t = slug.replace(/-+/g, " ").trim();
  return t ? t.charAt(0).toUpperCase() + t.slice(1).toLowerCase() : slug;
};

/**
 * What a link in V's reply shows (2026-11-21, owner's phone): a name, never a
 * long path ("/notes/nda-maths/probability/classical-probability-counting" ran
 * over three lines). A name the tool gave wins; a notes, questions or board
 * page reads its last part as words; any other page keeps its short path.
 */
export function linkLabel(href: string, labels?: Readonly<Record<string, string>>): string {
  const given = labels?.[href];
  if (given) return given;
  const seg = href.split("/").filter(Boolean);
  if (seg[0] === "notes" && seg.length === 3) return `${words(seg[2])} notes`;
  if (seg[0] === "notes" && seg.length >= 4) return words(seg[seg.length - 1]);
  if (seg[0] === "questions" && seg.length === 4) return `${words(seg[3])} questions`;
  if (seg[0] === "board" && seg.length >= 4) return words(seg[seg.length - 1]);
  // Learn (2026-11-22): a lesson is /learn/lesson/<chapter>/<lesson>, a chapter /learn/<course>/<chapter>.
  if (seg[0] === "learn" && seg[1] === "lesson" && seg.length === 4) return `${words(seg[3])} lesson`;
  if (seg[0] === "learn" && seg.length === 3) return `${words(seg[2])} lessons`;
  return href;
}

export type ReplySegment ={ kind: "text"; text: string } | { kind: "link"; href: string };

/** Split a reply for display; only paths in `links` become links. */
export function splitReplyLinks(reply: string, links: readonly string[]): ReplySegment[] {
  const out: ReplySegment[] = [];
  let last = 0;
  const pushText = (text: string) => {
    if (!text) return;
    const prev = out.at(-1);
    if (prev?.kind === "text") prev.text += text;
    else out.push({ kind: "text", text });
  };
  for (const m of reply.matchAll(PATH_RE)) {
    const path = m[2];
    if (!links.includes(path)) continue;
    const start = (m.index ?? 0) + m[1].length;
    pushText(reply.slice(last, start));
    out.push({ kind: "link", href: path });
    last = start + path.length;
  }
  pushText(reply.slice(last));
  return out;
}
