/**
 * Pure half of `npm run audit:page-weight` (PAGE_WEIGHT_SPEC.md item 0): how a
 * request is classed and totalled, which pages the router fetched in advance,
 * what a search engine reads from a page (the spec's Rule A), and the ratchet
 * against a saved baseline. The browser half is scripts/perf/pageWeight.ts.
 * Spec: tests/page-weight-lib.test.ts.
 */

export type Kind = "html" | "js" | "css" | "font" | "image" | "prefetch" | "third-party" | "other";

/** One network request as the browser reported it. */
export type RequestRecord = {
  url: string;
  /** The DevTools resource type: Document, Script, Stylesheet, Font, Image, Fetch, XHR, Other. */
  type: string;
  /** Bytes on the wire (compressed, with headers). */
  sentBytes: number;
  /** Bytes after unpacking: what the phone has to read. */
  unpackedBytes: number;
};

export type KindTotal = { requests: number; sentKB: number; unpackedKB: number };
export type Summary = KindTotal & { byKind: Partial<Record<Kind, KindTotal>> };
export type PrefetchedPage = { path: string; requests: number; unpackedKB: number };
export type Perf = {
  /** Total blocking time: the part of each long task past 50 ms, summed. */
  blockingMs: number;
  longTasks: number;
  longestTaskMs: number;
  lcpMs: number;
  cls: number;
  elements: number;
};

/** One page, measured once (or the median of several runs). */
export type Measurement = {
  path: string;
  /** Everything loaded once the page settles, before any scrolling. */
  open: Summary;
  /** The same, after scrolling to the foot and settling again. */
  scrolled: Summary;
  prefetchOpen: PrefetchedPage[];
  prefetchScrolled: PrefetchedPage[];
  perf: Perf;
};

const kb = (bytes: number) => Math.round(bytes / 1024);

/** A router fetch of another page carries `_rsc` as its own query parameter. */
function isRouterFetch(url: string): boolean {
  try {
    return new URL(url).searchParams.has("_rsc");
  } catch {
    return false;
  }
}

/**
 * `ownHost` given: a script from any other host is "third-party" (analytics),
 * so it is not counted as our own code.
 */
export function requestKind(r: Pick<RequestRecord, "url" | "type">, ownHost?: string): Kind {
  if (isRouterFetch(r.url)) return "prefetch";
  switch (r.type) {
    case "Document":
      return "html";
    case "Script": {
      if (ownHost) {
        try {
          if (new URL(r.url).host !== ownHost) return "third-party";
        } catch {
          /* fall through */
        }
      }
      return "js";
    }
    case "Stylesheet":
      return "css";
    case "Font":
      return "font";
    case "Image":
      return "image";
    default:
      return "other";
  }
}

const isHttp = (r: RequestRecord) => /^https?:/.test(r.url);

export function summarise(reqs: RequestRecord[], ownHost?: string): Summary {
  const raw: Partial<Record<Kind, { requests: number; sent: number; unpacked: number }>> = {};
  let sent = 0;
  let unpacked = 0;
  let requests = 0;
  for (const r of reqs) {
    if (!isHttp(r)) continue;
    const k = requestKind(r, ownHost);
    const t = (raw[k] ??= { requests: 0, sent: 0, unpacked: 0 });
    t.requests++;
    t.sent += r.sentBytes;
    t.unpacked += r.unpackedBytes;
    sent += r.sentBytes;
    unpacked += r.unpackedBytes;
    requests++;
  }
  const byKind: Summary["byKind"] = {};
  for (const [k, t] of Object.entries(raw) as [Kind, { requests: number; sent: number; unpacked: number }][]) {
    byKind[k] = { requests: t.requests, sentKB: kb(t.sent), unpackedKB: kb(t.unpacked) };
  }
  return { requests, sentKB: kb(sent), unpackedKB: kb(unpacked), byKind };
}

export function prefetchedPages(reqs: RequestRecord[]): PrefetchedPage[] {
  const by = new Map<string, { requests: number; bytes: number }>();
  for (const r of reqs) {
    if (!isRouterFetch(r.url)) continue;
    const path = new URL(r.url).pathname;
    const t = by.get(path) ?? { requests: 0, bytes: 0 };
    t.requests++;
    t.bytes += r.unpackedBytes;
    by.set(path, t);
  }
  return [...by.entries()]
    .map(([path, t]) => ({ path, requests: t.requests, unpackedKB: kb(t.bytes) }))
    .sort((a, b) => b.unpackedKB - a.unpackedKB || a.path.localeCompare(b.path));
}

export function blockingTime(longTaskMs: number[]): number {
  return Math.round(longTaskMs.reduce((a, d) => a + Math.max(0, d - 50), 0));
}

// ---------------------------------------------------------------------------
// Rule A: what a search engine reads
// ---------------------------------------------------------------------------

export type SeoView = {
  title: string;
  /** Every <meta name|property> with its content, charset and viewport aside. */
  meta: Record<string, string>;
  canonical: string;
  /** Each JSON-LD block, re-serialised so spacing cannot differ. */
  jsonLd: string[];
  /** "h2: Dot product", in page order. */
  headings: string[];
  /** "href | text", plus " | rel=..." when the link has a rel, in page order. */
  links: string[];
  /** All visible text, whitespace collapsed. */
  text: string;
};

const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };

function decode(s: string): string {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (whole, e: string) => {
    if (e[0] === "#") {
      const code = e[1] === "x" || e[1] === "X" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : whole;
    }
    return ENTITIES[e.toLowerCase()] ?? whole;
  });
}

const squash = (s: string) => s.replace(/\s+/g, " ").trim();

/** Remove whole elements whose content is never read as page text. */
function dropInvisible(html: string): string {
  return html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[\s\S]*?<\/style>/gi, "")
    .replace(/<svg\b[\s\S]*?<\/svg>/gi, "")
    .replace(/<template\b[\s\S]*?<\/template>/gi, "")
    .replace(/<noscript\b[\s\S]*?<\/noscript>/gi, "")
    // Compared as its own field; Next can stream it into the body for browsers.
    .replace(/<title\b[\s\S]*?<\/title>/gi, "");
}

/** Text of an HTML fragment, tags dropped, a space where a tag was. */
function textOf(fragment: string): string {
  return squash(decode(dropInvisible(fragment).replace(/<[^>]+>/g, " ")));
}

function attrs(tag: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const m of tag.matchAll(/([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)) {
    out[m[1].toLowerCase()] = decode(m[2] ?? m[3] ?? m[4] ?? "");
  }
  return out;
}

function canonicalJson(raw: string): string {
  try {
    return JSON.stringify(JSON.parse(raw));
  } catch {
    return squash(raw);
  }
}

/**
 * A meta value as it would read on any server: this server's own origin as
 * "{origin}", and the build hash Next appends to a generated image dropped.
 * Only meta values: the canonical is a fixed site address in code, so a
 * canonical naming the wrong site must still show as a difference.
 */
function portableMeta(value: string, origin?: string): string {
  let v = origin ? value.split(origin).join("{origin}") : value;
  v = v.replace(/((?:opengraph|twitter)-image|icon|apple-icon)\?[0-9a-f]{8,}/g, "$1");
  return v;
}

/** Meta tags Next adds in one build mode and not the other: never read by a search engine. */
const BUILD_ONLY_META = new Set(["viewport", "next-size-adjust"]);

/** End index (exclusive) of the element opened by the `<div` at `start`, counting nested divs. */
function divEnd(html: string, start: number): number {
  const re = /<div\b|<\/div>/gi;
  re.lastIndex = start;
  let depth = 0;
  for (let m = re.exec(html); m; m = re.exec(html)) {
    depth += m[0] === "</div>" ? -1 : 1;
    if (depth === 0) return m.index + m[0].length;
  }
  return html.length;
}

/**
 * The page as the browser ends up showing it: each section React streamed late
 * (a `<template id="B:n">` placeholder plus fallback, the real content parked
 * in `<div hidden id="S:n">` after the footer) put back where it belongs.
 * Which sections stream depends on timing, so without this two loads of the
 * same page compare as different (2026-11-24, the question paper page).
 */
export function resolveStreamed(html: string): string {
  let out = html;
  for (let guard = 0; guard < 200; guard++) {
    const open = /<div hidden(?:="[^"]*")? id="S:([0-9a-z]+)"[^>]*>/i.exec(out);
    if (!open) break;
    const end = divEnd(out, open.index);
    const content = out.slice(open.index + open[0].length, end - "</div>".length);
    out = out.slice(0, open.index) + out.slice(end);
    const holder = new RegExp(`<!--\\$\\?--><template id="B:${open[1]}"></template>[\\s\\S]*?<!--/\\$-->`);
    out = holder.test(out) ? out.replace(holder, () => content) : out;
  }
  return out;
}

/** `origin` = the server the HTML came from, so two servers compare as one. */
export function seoView(rawHtml: string, origin?: string): SeoView {
  const html = resolveStreamed(rawHtml);
  const title = textOf(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "");

  const meta: Record<string, string> = {};
  for (const m of html.matchAll(/<meta\b[^>]*>/gi)) {
    const a = attrs(m[0]);
    const key = a.name ?? a.property;
    if (!key || BUILD_ONLY_META.has(key)) continue;
    meta[key] = portableMeta(a.content ?? "", origin);
  }

  let canonical = "";
  for (const m of html.matchAll(/<link\b[^>]*>/gi)) {
    const a = attrs(m[0]);
    if (a.rel === "canonical") canonical = a.href ?? "";
  }

  const jsonLd = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map((m) =>
    canonicalJson(m[1]),
  );

  const body = dropInvisible(html.match(/<body\b[^>]*>([\s\S]*)<\/body>/i)?.[1] ?? html);

  const headings = [...body.matchAll(/<(h[1-6])\b[^>]*>([\s\S]*?)<\/\1>/gi)].map((m) => `${m[1].toLowerCase()}: ${textOf(m[2])}`);

  const links = [...body.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)].flatMap((m) => {
    const a = attrs(`<a ${m[1]}>`);
    if (a.href === undefined) return [];
    return [`${a.href} | ${textOf(m[2])}${a.rel ? ` | rel=${a.rel}` : ""}`];
  });

  return { title, meta, canonical, jsonLd, headings, links, text: textOf(body) };
}

function diffList(name: string, a: string[], b: string[]): string[] {
  if (a.length === b.length && a.every((x, i) => x === b[i])) return [];
  const removed = a.filter((x) => !b.includes(x));
  const added = b.filter((x) => !a.includes(x));
  const lines = [`${name}: ${a.length} before, ${b.length} after`];
  for (const x of removed.slice(0, 10)) lines.push(`  - ${x}`);
  for (const x of added.slice(0, 10)) lines.push(`  + ${x}`);
  if (!removed.length && !added.length) lines.push("  (same entries, different order or count)");
  return lines;
}

/** Every way two views differ, as readable lines. Empty = a search engine reads the same page. */
export function diffSeoViews(before: SeoView, after: SeoView): string[] {
  const out: string[] = [];
  if (before.title !== after.title) out.push(`title: "${before.title}" -> "${after.title}"`);
  if (before.canonical !== after.canonical) out.push(`canonical: "${before.canonical}" -> "${after.canonical}"`);
  for (const k of new Set([...Object.keys(before.meta), ...Object.keys(after.meta)])) {
    if (before.meta[k] !== after.meta[k]) out.push(`meta ${k}: "${before.meta[k] ?? "(none)"}" -> "${after.meta[k] ?? "(none)"}"`);
  }
  out.push(...diffList("jsonLd", before.jsonLd, after.jsonLd));
  out.push(...diffList("headings", before.headings, after.headings));
  out.push(...diffList("links", before.links, after.links));
  if (before.text !== after.text) {
    let i = 0;
    while (i < before.text.length && before.text[i] === after.text[i]) i++;
    const at = Math.max(0, i - 40);
    out.push(`text: first difference at character ${i}`);
    out.push(`  before: ...${before.text.slice(at, i + 60)}`);
    out.push(`  after:  ...${after.text.slice(at, i + 60)}`);
  }
  return out;
}

// ---------------------------------------------------------------------------
// The ratchet
// ---------------------------------------------------------------------------

/** Pages whose sent bytes or request count rose more than `tolerance` over their baseline. */
export function compareToBaseline(current: Measurement[], baseline: Measurement[], tolerance = 0.1): string[] {
  const out: string[] = [];
  for (const c of current) {
    const b = baseline.find((x) => x.path === c.path);
    if (!b) continue;
    const reasons: string[] = [];
    for (const [label, now, was] of [
      ["sent KB at open", c.open.sentKB, b.open.sentKB],
      ["sent KB scrolled", c.scrolled.sentKB, b.scrolled.sentKB],
      ["requests at open", c.open.requests, b.open.requests],
      ["requests scrolled", c.scrolled.requests, b.scrolled.requests],
    ] as const) {
      if (now > was * (1 + tolerance)) reasons.push(`${label} ${was} -> ${now}`);
    }
    if (reasons.length) out.push(`${c.path}: ${reasons.join(", ")}`);
  }
  return out;
}

// ---------------------------------------------------------------------------
// Arguments
// ---------------------------------------------------------------------------

/**
 * One real page of each type (PAGE_WEIGHT_SPEC.md section 5). The intl home
 * page is a different host, so it is measured by passing it as a full URL.
 */
export const DEFAULT_PAGES = [
  "/",
  "/browse",
  "/questions/nda/mathematics/3d-geometry",
  "/mock",
  "/notes",
  "/notes/nda",
  "/notes/mh-hsc-12-maths/vectors",
  "/notes/mh-hsc-12-maths/vectors/hscm-ve-triple",
  "/board/mh-hsc-12/mathematics/vectors",
  "/question-papers/cbse-10/mathematics/2022-30-1",
  "/guide/nda-maths",
  "/blog/mht-cet-2027-exam-dates",
  "/pricing",
  "/store",
];

export type PageWeightArgs = {
  mode: "weigh" | "check" | "save-baseline" | "html-diff" | "save-html";
  base: string;
  pages: string[];
  cpu: number;
  runs: number;
  /** --html-diff sides: a server URL, or a folder written by --save-html. */
  before: string | null;
  after: string | null;
  out: string | null;
  /** --save-html=<dir>: write each page's server HTML there (and nothing else). */
  saveHtml: string | null;
};

const trimSlash = (u: string) => u.replace(/\/+$/, "");

/**
 * A --html-diff side that is a folder of saved pages rather than a server.
 * Saving lets two builds be compared one dev server at a time: two at once
 * filled the disk on 2026-11-24 (each webpack cache ~1-2 GB).
 */
export function isSavedFolder(side: string): boolean {
  return !/^https?:\/\//i.test(side);
}

export function parsePageWeightArgs(argv: string[]): PageWeightArgs {
  const a: PageWeightArgs = {
    mode: "weigh",
    base: "https://www.pyqvault.com",
    pages: DEFAULT_PAGES,
    cpu: 4,
    runs: 1,
    before: null,
    after: null,
    out: null,
    saveHtml: null,
  };
  for (const arg of argv) {
    const [flag, value] = arg.includes("=") ? [arg.slice(0, arg.indexOf("=")), arg.slice(arg.indexOf("=") + 1)] : [arg, ""];
    switch (flag) {
      case "--pages":
        a.pages = value.split(",").map((p) => p.trim()).filter(Boolean);
        break;
      case "--base":
        a.base = trimSlash(value);
        break;
      case "--cpu":
        a.cpu = Number(value);
        break;
      case "--runs":
        a.runs = Number(value);
        break;
      case "--out":
        a.out = value;
        break;
      case "--before":
        a.before = trimSlash(value);
        break;
      case "--after":
        a.after = trimSlash(value);
        break;
      case "--check":
        a.mode = "check";
        break;
      case "--save-baseline":
        a.mode = "save-baseline";
        break;
      case "--html-diff":
        a.mode = "html-diff";
        break;
      case "--save-html":
        a.mode = "save-html";
        a.saveHtml = value;
        break;
      default:
        throw new Error(`unknown flag ${flag} (see the header of scripts/perf/pageWeight.ts)`);
    }
  }
  if (!(a.cpu >= 1) || !(a.runs >= 1)) throw new Error("--cpu and --runs must be 1 or more");
  if (a.mode === "html-diff" && (!a.before || !a.after)) throw new Error("--html-diff needs --before=<url|folder> and --after=<url|folder>");
  if (a.mode === "save-html" && !a.saveHtml) throw new Error("--save-html needs a folder: --save-html=<dir>");
  return a;
}
