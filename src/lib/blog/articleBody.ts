/**
 * Articles kept in the database (migration 0263): the body format, its parser,
 * and the checks an article must pass before it is saved.
 *
 * WHY A DATABASE ROW AND NOT A CODE FILE (2026-11-16): the owner wants an
 * article live without a git push. The three code posts in posts.ts stay where
 * they are; a database article is merged in beside them (lib/blog/catalog.ts).
 *
 * THE BODY FORMAT is a small markdown subset, nothing more:
 *   `## Heading` · `### Subheading` · paragraphs (blank-line separated) ·
 *   `- ` bullets · `1. ` numbered steps · `> ` a note box · GFM pipe tables ·
 *   `[words](/path)` or `[words](https://...)` links · and, inside any text,
 *   the bank's own **bold**, *italic* and \( maths \).
 * There is no raw HTML: every block becomes a React element, so a body can
 * never put a script or a style on the page.
 *
 * Links: a path on this site, or https anywhere. An https link to an official
 * host (a .gov.in, .nic.in or .ac.in site, the CET Cell, CISCE...) is marked
 * `official`; anything else is still allowed, but the page gives it
 * rel="nofollow". A link that is neither a path nor https renders as its plain
 * words, and validateArticle refuses it before it is saved.
 *
 * Pure. Spec: tests/blog-article-body.test.ts.
 */
import { maskMathZones } from "@/components/math/parseLatex";
import { parseTableBlocks } from "@/components/math/parseTableBlocks";
import { EXAM_REGISTRY } from "@/lib/exam/examContext";
import { slugify } from "@/lib/slug";
import { BLOG_SLUGS } from "./posts";
import type { FaqEntry } from "./faq";
import { ARTICLE_KINDS, type ArticleKind } from "./kinds";

export { ARTICLE_KINDS, type ArticleKind };

/** The same limits the database CHECKs enforce (migration 0263). */
export const LIMITS = {
  slugMax: 90,
  titleMin: 20,
  titleMax: 70,
  descriptionMin: 70,
  descriptionMax: 160,
  bodyMin: 100,
  tagsMax: 8,
  faqMax: 10,
  watchMax: 300,
} as const;

export const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** An em dash, or the spaced en dash / double hyphen that reads the same (CLAUDE.md, owner 2026-10-05). */
export const DASH_RE = /—|\s–\s|\s--\s/;

export type ArticleSource = { label: string; url: string };

export type ArticleInput = {
  slug: string;
  kind: ArticleKind;
  examSlug: string | null;
  title: string;
  description: string;
  tags: string[];
  sources: ArticleSource[];
  watch?: string | null;
  faq: FaqEntry[];
  body: string;
};

// ---------------------------------------------------------------------------
// Links

const OFFICIAL_SUFFIXES = [".gov.in", ".nic.in", ".ac.in", ".edu.in", ".res.in", ".gov", ".gov.it"];
/** Official bodies whose sites sit outside those suffixes. A host or any sub-host of it. */
const OFFICIAL_HOSTS = [
  "mahacet.org",
  "cisce.org",
  "mahahsscboard.in",
  "ugcnetonline.in",
  "aamc.org",
  "universitaly.it",
  "mur.gov.it",
  // The Services Preparatory Institute (Government of Maharashtra), boys' and girls' sites.
  "spicsn.com",
];

const INTERNAL_RE = /^\/(?!\/)[A-Za-z0-9\-._~/?#&=%+:,]*$/;

export type HrefCheck = { ok: true; external: boolean; official: boolean } | { ok: false };

export function checkHref(href: string): HrefCheck {
  if (INTERNAL_RE.test(href)) return { ok: true, external: false, official: false };
  if (!href.startsWith("https://") || /\s/.test(href)) return { ok: false };
  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return { ok: false };
  }
  if (url.protocol !== "https:" || url.username || url.password || !url.hostname.includes(".")) return { ok: false };
  const host = url.hostname.toLowerCase();
  const official =
    OFFICIAL_SUFFIXES.some((s) => host.endsWith(s)) ||
    OFFICIAL_HOSTS.some((h) => host === h || host.endsWith(`.${h}`));
  return { ok: true, external: true, official };
}

export type Inline =
  | { kind: "text"; text: string }
  | { kind: "link"; text: string; href: string; external: boolean; official: boolean };

/** `[words](href)`, allowing one level of brackets inside the href so `alert(1)` is read whole. */
const LINK_RE = /\[([^\]\n]+)\]\(((?:[^()\s]|\([^()\s]*\))+)\)/g;

/** Text with its links split out. Maths is masked first, so `\([0,1](x)\)` is never a link. */
export function splitLinks(text: string): Inline[] {
  const { masked, unmask } = maskMathZones(text);
  const out: Inline[] = [];
  const pushText = (s: string) => {
    if (!s) return;
    const last = out[out.length - 1];
    if (last && last.kind === "text") last.text += s;
    else out.push({ kind: "text", text: s });
  };
  let at = 0;
  for (const m of masked.matchAll(LINK_RE)) {
    pushText(unmask(masked.slice(at, m.index)));
    const words = unmask(m[1]);
    const href = unmask(m[2]);
    const check = checkHref(href);
    if (check.ok) out.push({ kind: "link", text: words, href, external: check.external, official: check.official });
    else pushText(words);
    at = (m.index ?? 0) + m[0].length;
  }
  pushText(unmask(masked.slice(at)));
  return out;
}

// ---------------------------------------------------------------------------
// Blocks

export type ArticleBlock =
  | { kind: "h2"; text: string; id: string }
  | { kind: "h3"; text: string; id: string }
  | { kind: "p"; inlines: Inline[] }
  | { kind: "ul"; items: Inline[][] }
  | { kind: "ol"; items: Inline[][] }
  | { kind: "note"; inlines: Inline[] }
  // Cells are runs like a paragraph's, so a link in a cell is a link (2026-11-16: it printed as raw markdown).
  | { kind: "table"; headers: Inline[][]; rows: Inline[][][] };

export function headingId(text: string): string {
  return slugify(text) || "section";
}

const BULLET_RE = /^[-*]\s+(.*)$/;
const NUMBERED_RE = /^\d+[.)]\s+(.*)$/;

export function parseArticleBody(body: string): ArticleBlock[] {
  const lines = body.replace(/\r\n?/g, "\n").split("\n");
  const blocks: ArticleBlock[] = [];
  const usedIds = new Map<string, number>();

  let para: string[] = [];
  let note: string[] = [];
  let list: { kind: "ul" | "ol"; items: string[] } | null = null;

  const flush = () => {
    if (para.length) blocks.push({ kind: "p", inlines: splitLinks(para.join(" ")) });
    if (note.length) blocks.push({ kind: "note", inlines: splitLinks(note.join(" ")) });
    if (list) blocks.push({ kind: list.kind, items: list.items.map(splitLinks) });
    para = [];
    note = [];
    list = null;
  };

  const heading = (kind: "h2" | "h3", text: string) => {
    const base = headingId(text);
    const n = (usedIds.get(base) ?? 0) + 1;
    usedIds.set(base, n);
    blocks.push({ kind, text, id: n === 1 ? base : `${base}-${n}` });
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) {
      flush();
      continue;
    }

    if (line.startsWith("|")) {
      const run: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) run.push(lines[i++].trim());
      i--;
      const parsed = parseTableBlocks(run.join("\n"));
      if (parsed.some((b) => b.kind === "table")) {
        flush();
        for (const b of parsed) {
          if (b.kind === "table") {
            blocks.push({ kind: "table", headers: b.headers.map(splitLinks), rows: b.rows.map((r) => r.map(splitLinks)) });
          }
          else if (b.text.trim()) blocks.push({ kind: "p", inlines: splitLinks(b.text.trim().replace(/\n/g, " ")) });
        }
      } else {
        para.push(...run);
      }
      continue;
    }

    const h = /^(#{2,3})\s+(.*)$/.exec(line);
    if (h) {
      flush();
      heading(h[1] === "##" ? "h2" : "h3", h[2].trim());
      continue;
    }

    if (line.startsWith(">")) {
      if (para.length || list) flush();
      note.push(line.replace(/^>\s?/, ""));
      continue;
    }

    const bullet = BULLET_RE.exec(line);
    const numbered = bullet ? null : NUMBERED_RE.exec(line);
    if (bullet || numbered) {
      const kind = bullet ? "ul" : "ol";
      if (!list || list.kind !== kind) {
        flush();
        list = { kind, items: [] };
      }
      list.items.push((bullet ?? numbered)![1]);
      continue;
    }

    if (list) {
      // A line under a list item continues that item.
      list.items[list.items.length - 1] += ` ${line}`;
      continue;
    }
    if (note.length) {
      flush();
    }
    para.push(line);
  }
  flush();
  return blocks;
}

/** About 200 words a minute, never under 1. */
export function readingMinutes(body: string): number {
  const words = body.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

// ---------------------------------------------------------------------------
// Validation

const EXAM_SLUGS = new Set<string>(EXAM_REGISTRY.map((e) => e.slug));

function lengthProblem(field: string, value: string, min: number, max: number): string | null {
  const n = value.trim().length;
  if (n < min || n > max) return `${field} must be ${min}-${max} characters (it is ${n}).`;
  return null;
}

/** Every problem with an article, in words. Empty = fit to save. */
export function validateArticle(a: ArticleInput): string[] {
  const problems: string[] = [];
  const add = (p: string | null) => {
    if (p) problems.push(p);
  };

  if (!SLUG_RE.test(a.slug) || a.slug.length > LIMITS.slugMax) {
    add(`The slug "${a.slug}" must be lowercase words joined by hyphens, at most ${LIMITS.slugMax} characters.`);
  } else if (BLOG_SLUGS.includes(a.slug)) {
    add(`The slug "${a.slug}" is already used by a post in code (src/lib/blog/posts.ts).`);
  }
  if (!(ARTICLE_KINDS as readonly string[]).includes(a.kind)) add(`The kind must be one of ${ARTICLE_KINDS.join(", ")}.`);

  if (a.examSlug !== null && !EXAM_SLUGS.has(a.examSlug)) add(`Unknown exam "${a.examSlug}" (not in EXAM_REGISTRY).`);
  if (a.kind === "evergreen" && !a.examSlug) add("An evergreen page needs an exam.");

  add(lengthProblem("The title", a.title, LIMITS.titleMin, LIMITS.titleMax));
  add(lengthProblem("The description", a.description, LIMITS.descriptionMin, LIMITS.descriptionMax));
  if (a.body.trim().length < LIMITS.bodyMin) add(`The body must be at least ${LIMITS.bodyMin} characters.`);

  if (a.tags.length < 1 || a.tags.length > LIMITS.tagsMax) add(`Give 1-${LIMITS.tagsMax} tags.`);
  if (a.tags.some((t) => t.trim().length < 2 || t.length > 30)) add("Each tag must be 2-30 characters.");

  if (a.watch && a.watch.length > LIMITS.watchMax) add(`The watch note must be at most ${LIMITS.watchMax} characters.`);

  for (const s of a.sources) {
    const c = checkHref(s.url);
    if (!c.ok || !c.external) add(`Source "${s.label}" needs an https link (got "${s.url}").`);
    if (s.label.trim().length < 2) add("Every source needs a label.");
  }
  if (a.kind !== "data" && !a.sources.some((s) => checkHref(s.url).ok && (checkHref(s.url) as { official: boolean }).official)) {
    add("A news or evergreen article needs at least one official source (the notice itself).");
  }

  // Body structure.
  const lines = a.body.replace(/\r\n?/g, "\n").split("\n");
  if (lines.some((l) => /^#\s/.test(l.trim()))) add("No # heading in the body: the title is the page's only top heading. Use ## heading.");
  if (!lines.some((l) => /^##\s/.test(l.trim()))) add("The body needs at least one ## heading.");
  if (lines.some((l) => /^#{4,}\s/.test(l.trim()))) add("Use only ## heading and ### heading.");
  const { masked, unmask } = maskMathZones(a.body);
  for (const m of masked.matchAll(LINK_RE)) {
    const href = unmask(m[2]);
    if (!checkHref(href).ok) add(`Bad link "${href}": use a path on this site (/mock) or an https address.`);
  }

  // FAQ.
  if (a.faq.length > LIMITS.faqMax) add(`At most ${LIMITS.faqMax} FAQ entries.`);
  for (const f of a.faq) {
    if (!f.q.trim().endsWith("?") || f.q.length > 200) add(`FAQ question "${f.q}" must end with ? and be at most 200 characters.`);
    if (!f.a.trim() || f.a.length > 700) add(`FAQ answer for "${f.q}" must be 1-700 characters.`);
  }

  // Voice: no em dashes anywhere a reader sees.
  const visible: [string, string][] = [
    ["title", a.title],
    ["description", a.description],
    ["body", a.body],
    ...a.faq.flatMap((f): [string, string][] => [
      ["an FAQ question", f.q],
      ["an FAQ answer", f.a],
    ]),
  ];
  for (const [field, value] of visible) {
    if (DASH_RE.test(value)) add(`An em dash in ${field}: write a full stop, colon, comma or brackets instead.`);
  }

  return problems;
}
