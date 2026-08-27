/**
 * Parse NDA_MATHS_BLUEPRINT.md §4 into executable allocation rows.
 *
 * The markdown IS the spec. Encoding the 88 rows a second time in TypeScript
 * would create two sources of truth that drift silently — and the blueprint is
 * explicitly a "standing reference", so the document has to stay authoritative.
 *
 * Parsing fails LOUDLY: the caller asserts the parsed rows reconcile to
 * 120 = 30 EASY + 58 MODERATE + 32 HARD and that every chapter's rows sum to the
 * subtotal printed in its own heading. A format change therefore breaks the
 * build rather than quietly shipping a different paper.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

export type Difficulty = "EASY" | "MODERATE" | "HARD";

export type AllocRow = {
  chapter: string;
  subtopic: string;
  difficulty: Difficulty;
  n: number;
};

export type ChapterTotal = { chapter: string; n: number; e: number; m: number; h: number };

const BLUEPRINT_PATH = join(__dirname, "NDA_MATHS_BLUEPRINT.md");

/** `### Matrices & Determinants — 10 (E2 / M5 / H3)` */
const HEADING = /^###\s+(.+?)\s+—\s+(\d+)\s+\(E(\d+)\s*\/\s*M(\d+)\s*\/\s*H(\d+)\)\s*$/;
/** `| Determinant Properties… | 3 | 0 | 1 | 2 |` (a trailing ⚠ cell is allowed) */
const ROW = /^\|\s*([^|]+?)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|/;
/** `| Conics | 1/1/0 | Parabola … (1·M) · Ellipse … (1·E) |` */
const TWO_Q = /^\|\s*([^|]+?)\s*\|\s*(\d+)\/(\d+)\/(\d+)\s*\|\s*(.+?)\s*\|\s*$/;
/**
 * `Parabola — … (1·M) · Ellipse — … (1·E)`.
 *
 * The `·` separates the parts AND sits inside `(1·M)`, so a bare split on `·`
 * tears the marker in half. The discriminator is WHITESPACE: the separator is
 * ` · ` and the marker is `1·M`. Split on the spaced form, then anchor the
 * marker at the end of each part — anchoring matters because a subtopic name
 * can itself contain parentheses (`Mean, Variance, Parameter Estimation in
 * B(n,p)`), which an unanchored paren-excluding match silently truncates to
 * nothing.
 */
const TWO_Q_SPLIT = /\s+·\s+/;
const TWO_Q_PART = /^(.+?)\s*\((\d+)·([EMH])\)$/;
/** `| Height & Distance | Heights and Distances… | **HARD** ⚠ |` */
const ONE_Q = /^\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|\s*\*{0,2}(EASY|MODERATE|HARD)\*{0,2}\s*(?:⚠\s*)?\|\s*$/;

const LETTER: Record<string, Difficulty> = { E: "EASY", M: "MODERATE", H: "HARD" };

function cleanChapter(s: string): string {
  return s.replace(/\*/g, "").trim();
}
function cleanSubtopic(s: string): string {
  return s.replace(/\*/g, "").replace(/\s*⚠\s*$/, "").trim();
}

export function parseBlueprint(path = BLUEPRINT_PATH): {
  rows: AllocRow[];
  chapterTotals: ChapterTotal[];
} {
  const lines = readFileSync(path, "utf8").split(/\r?\n/);
  const rows: AllocRow[] = [];
  const chapterTotals: ChapterTotal[] = [];

  let current: ChapterTotal | null = null;
  let mode: "none" | "chapter" | "twoQ" | "oneQ" = "none";

  for (const raw of lines) {
    const line = raw.trimEnd();

    if (/^### Two-question chapters\s*$/.test(line)) { mode = "twoQ"; current = null; continue; }
    if (/^### One-question chapters\s*$/.test(line)) { mode = "oneQ"; current = null; continue; }
    if (/^### Deliberately allocated ZERO\s*$/.test(line)) { mode = "none"; current = null; continue; }
    if (/^##\s/.test(line)) { mode = "none"; current = null; continue; }

    const head = HEADING.exec(line);
    if (head) {
      mode = "chapter";
      current = {
        chapter: cleanChapter(head[1]),
        n: Number(head[2]), e: Number(head[3]), m: Number(head[4]), h: Number(head[5]),
      };
      chapterTotals.push(current);
      continue;
    }

    if (mode === "chapter" && current) {
      const r = ROW.exec(line);
      if (!r) continue;
      const sub = cleanSubtopic(r[1]);
      if (sub === "Subtopic" || /^-+$/.test(sub)) continue; // header / separator
      for (const [count, diff] of [
        [Number(r[3]), "EASY"], [Number(r[4]), "MODERATE"], [Number(r[5]), "HARD"],
      ] as [number, Difficulty][]) {
        if (count > 0) rows.push({ chapter: current.chapter, subtopic: sub, difficulty: diff, n: count });
      }
      continue;
    }

    if (mode === "twoQ") {
      const t = TWO_Q.exec(line);
      if (!t) continue;
      const chapter = cleanChapter(t[1]);
      if (chapter === "Chapter" || /^-+$/.test(chapter)) continue;
      const total: ChapterTotal = {
        chapter, n: Number(t[2]) + Number(t[3]) + Number(t[4]),
        e: Number(t[2]), m: Number(t[3]), h: Number(t[4]),
      };
      chapterTotals.push(total);
      const parts = t[5].split(TWO_Q_SPLIT).map((x) => x.trim()).filter(Boolean);
      if (!parts.length)
        throw new Error(`blueprint: no (n·D) parts in ${JSON.stringify(t[5])}`);
      for (const part of parts) {
        const p = TWO_Q_PART.exec(part);
        if (!p) throw new Error(`blueprint: unparsed part ${JSON.stringify(part)}`);
        const name = cleanSubtopic(p[1]);
        if (!name) throw new Error(`blueprint: empty subtopic in ${JSON.stringify(part)}`);
        rows.push({ chapter, subtopic: name, difficulty: LETTER[p[3]], n: Number(p[2]) });
      }
      continue;
    }

    if (mode === "oneQ") {
      const o = ONE_Q.exec(line);
      if (!o) continue;
      const chapter = cleanChapter(o[1]);
      if (chapter === "Chapter" || /^-+$/.test(chapter)) continue;
      const difficulty = o[3] as Difficulty;
      chapterTotals.push({
        chapter, n: 1,
        e: difficulty === "EASY" ? 1 : 0,
        m: difficulty === "MODERATE" ? 1 : 0,
        h: difficulty === "HARD" ? 1 : 0,
      });
      rows.push({ chapter, subtopic: cleanSubtopic(o[2]), difficulty, n: 1 });
      continue;
    }
  }

  return { rows, chapterTotals };
}

/**
 * Assert the parse reproduces the blueprint's own stated totals.
 *
 * Three independent checks, because a parser that silently drops a row would
 * otherwise ship a 117-question paper that looks fine: the grand total, the
 * difficulty split, and every chapter against the subtotal in its own heading.
 */
export function assertBlueprint(rows: AllocRow[], totals: ChapterTotal[]): string[] {
  const problems: string[] = [];
  const sum = (f: (r: AllocRow) => boolean) => rows.filter(f).reduce((a, r) => a + r.n, 0);

  const total = sum(() => true);
  if (total !== 120) problems.push(`grand total is ${total}, expected 120`);
  const e = sum((r) => r.difficulty === "EASY");
  const m = sum((r) => r.difficulty === "MODERATE");
  const h = sum((r) => r.difficulty === "HARD");
  if (e !== 30 || m !== 58 || h !== 32)
    problems.push(`difficulty split is ${e}/${m}/${h}, expected 30/58/32`);

  const declared = totals.reduce((a, t) => a + t.n, 0);
  if (declared !== 120) problems.push(`chapter headings declare ${declared}, expected 120`);

  for (const t of totals) {
    const got = rows.filter((r) => r.chapter === t.chapter);
    const gN = got.reduce((a, r) => a + r.n, 0);
    const gE = got.filter((r) => r.difficulty === "EASY").reduce((a, r) => a + r.n, 0);
    const gM = got.filter((r) => r.difficulty === "MODERATE").reduce((a, r) => a + r.n, 0);
    const gH = got.filter((r) => r.difficulty === "HARD").reduce((a, r) => a + r.n, 0);
    if (gN !== t.n || gE !== t.e || gM !== t.m || gH !== t.h)
      problems.push(
        `${t.chapter}: parsed ${gN} (${gE}/${gM}/${gH}) but heading says ${t.n} (${t.e}/${t.m}/${t.h})`
      );
  }
  return problems;
}
