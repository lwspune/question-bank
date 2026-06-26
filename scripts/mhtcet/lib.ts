// Pure helpers for the MHT-CET pandoc-markdown extractor.
// Reuses the JEE extractor's battle-tested LaTeX cleaners + option/AK parsers
// (identical pandoc-OMML output shape); only the subject split (50/50/50, vs JEE's
// 30/30/30) and the section-header segmentation differ.
import { cleanText, parseOptionsFromText } from "../jee/lib";

export type Subject = "Physics" | "Chemistry" | "Maths";

export type RawQuestion = {
  number: number;
  subject: Subject;
  stem: string;
  options: string[] | null; // 4 cleaned option texts (a,b,c,d order), or null when 4 markers didn't parse
  imageRefs: string[];
};

/**
 * Subject from the global question number. MHT-CET PCM numbering is continuous:
 * Physics 1-50, Chemistry 51-100, Maths 101-150.
 */
export function subjectForNumber(n: number): Subject {
  return n <= 50 ? "Physics" : n <= 100 ? "Chemistry" : "Maths";
}

/**
 * Strip pandoc hard-break artifacts that survive cleanText:
 *  - a stray `\\` immediately before a closing `\)`/`\]` (breaks KaTeX inside
 *    piecewise/`\right.` stems — `\right.\\)` -> `\right.\)`);
 *  - `\\[Npt]` row-spacing inside a cases/matrix env -> plain `\\`;
 *  - a trailing backslash run at the very end of the field (the leaked line break
 *    on nearly every stem — `... is\\` -> `... is`).
 * Idempotent. Applied to stem/option/solution text at commit, before hashing.
 */
export function cleanupArtifacts(s: string): string {
  return s
    // de-glue long arrows pandoc fused to the next atom (`\longrightarrowNO` -> `\longrightarrow NO`);
    // the JEE sanitizeLatex deglue list covers `\rightarrow` but not these longer reaction arrows.
    .replace(/\\(longrightarrow|longleftarrow|rightleftharpoons|leftrightarrow|Longrightarrow)(?=[A-Za-z])/g, "\\$1 ")
    // logic/set/relation macros pandoc fused to the next atom (`\simp`->`\sim p`, `\midZn`, `\landp`)
    .replace(/\\(mid|sim|land|lor|wedge|vee|cap|cup|subseteq|supseteq|equiv|cong|perp|parallel|notin|times|cdot|approx|angle|triangle|bigtriangleup|bigtriangledown)(?=[A-Za-z])/g, "\\$1 ")
    // `\in` glued before an UPPERCASE set symbol (`\inR` -> `\in R`); uppercase-only avoids \infty/\int
    .replace(/\\in(?=[A-Z])/g, "\\in ")
    // `\int` glued to its integrand (`\inte^{x}` -> `\int e^{x}`); guard \intercal
    .replace(/\\int(?!ercal)(?=[A-Za-z])/g, "\\int ")
    // `\leqslant`/`\geqslant` split by the deglue into `\leq slant` (LP constraints) -> rejoin
    .replace(/\\(leq|geq)\s+slant\s*/g, "\\$1slant ")
    // stray `\` + whitespace immediately before a math close (`(2-x)\ \)` -> `(2-x) \)`)
    .replace(/\\\s+(?=\\[)\]])/g, " ")
    .replace(/\\\\\[\d+pt\]/g, " \\\\ ") // \\[6pt] row-spacing -> plain \\
    .replace(/\\\\(?=[)\]])/g, "\\") // stray hard-break before a math close: `\right.\\)` -> `\right.\)`
    .replace(/\\+\s*$/, "") // trailing backslash run at field end: `... is\\` -> `... is`
    .trimEnd();
}

const Q_START = /^(\d+)\.(\s|$)/; // `$` so a number alone on its line (stem after an image) still anchors
const SECTION_HEADER = /^\**(PHYSICS|CHEMISTRY|MATHEMATICS)\**\s*$/i;

/** Segment the whole question markdown into per-question blocks (1..150). */
export function segmentQuestions(md: string): RawQuestion[] {
  const lines = md.split(/\r?\n/);
  const out: RawQuestion[] = [];

  let cur: { number: number; textParts: string[] } | null = null;
  const flush = () => {
    if (!cur) return;
    const joined = cur.textParts.join(" ").replace(/^\d+\.\s+/, "");
    // Image markdown can wrap across lines as `![](path){width="..."  height="..."}`
    // once joined. Extract refs (path only), then strip the marker + attribute block
    // so option text isn't polluted by a stray `height="..."}` fragment.
    const imageRefs = [...joined.matchAll(/!\[\]\(([^)]+)\)/g)].map((m) => m[1]);
    const textOnly = joined.replace(/!\[\]\([^)]*\)(\s*\{[^}]*\})?/g, " ");
    const cleaned = cleanText(textOnly);
    const parsed = parseOptionsFromText(cleaned);
    out.push({
      number: cur.number,
      subject: subjectForNumber(cur.number),
      stem: parsed ? parsed.stem : cleaned,
      options: parsed ? parsed.options : null,
      imageRefs,
    });
    cur = null;
  };

  for (const raw of lines) {
    const line = raw.replace(/^\s*>\s?/, "").trimEnd(); // drop leading blockquote prefix

    if (SECTION_HEADER.test(line.replace(/\*/g, "").trim())) {
      // a bare PHYSICS/CHEMISTRY/MATHEMATICS header — close the current block, ignore the line
      flush();
      continue;
    }

    const qm = line.match(Q_START);
    if (qm) {
      flush();
      cur = { number: Number(qm[1]), textParts: [] };
    }

    if (!cur) continue;
    if (line.trim() === "" || line.trim() === "<!-- -->") continue;

    cur.textParts.push(line.replace(/(?<!\\)\\$/, "").trim()); // drop a single pandoc hard-break `\`, but keep matrix `\\`
  }
  flush();
  return out;
}

// The "<paper>_AK.docx" uses `N.  **(x)** <worked solution>`, BUT the LWS source
// frequently puts a hard line-break right after the answer, so pandoc emits the
// closing bold as `**(d)\**` (a stray `\` before `**`). The JEE parsers require a
// bare `**(x)**`, so MHT-CET needs a tolerant start regex (optional `\` + space).
const AK_START = /^(\d+)\.\s+\*\*\(([abcd])\)\s*\\?\s*\*\*/gim;

/** number -> uppercase answer letter, from the AK doc's `N.  **(x)**` headers. */
export function parseAnswerKey(akMd: string): Map<number, "A" | "B" | "C" | "D"> {
  const key = new Map<number, "A" | "B" | "C" | "D">();
  for (const m of akMd.matchAll(AK_START)) {
    key.set(Number(m[1]), m[2].toUpperCase() as "A" | "B" | "C" | "D");
  }
  return key;
}

/** number -> cleaned worked-solution text (everything after the `N. **(x)**` header). */
export function splitSolutions(akMd: string): Map<number, string> {
  const starts: { num: number; index: number; markerLen: number }[] = [];
  for (const m of akMd.matchAll(AK_START)) {
    starts.push({ num: Number(m[1]), index: m.index!, markerLen: m[0].length });
  }
  const sols = new Map<number, string>();
  for (let i = 0; i < starts.length; i++) {
    const cur = starts[i];
    const end = i + 1 < starts.length ? starts[i + 1].index : akMd.length;
    sols.set(cur.num, cleanText(akMd.slice(cur.index + cur.markerLen, end)));
  }
  return sols;
}
