/**
 * Phase-1 survey: enumerate every markup shape in data/raw so the normaliser is
 * written against what is actually there rather than what I assume is there.
 *
 * Read-only. Triage, always exits 0.
 *
 *   npx tsx scripts/ipmat/survey.ts
 *   npx tsx scripts/ipmat/survey.ts -- --show=table   # dump samples of one class
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { parseLatex } from "../../src/components/math/parseLatex";
import { normalizeNewlines } from "../../src/lib/text/normalizeNewlines";
import { parsePaperFileName } from "./config";
import type { FlightRecord } from "./flight";

const RAW_DIR = join(__dirname, "data", "raw");
const TEXT_FIELDS = ["question", "comprehension", "option1", "option2", "option3", "option4"] as const;

type Row = FlightRecord & { _paper: string };

function load(): Row[] {
  const out: Row[] = [];
  for (const f of readdirSync(RAW_DIR).filter((x) => x.endsWith(".json"))) {
    const key = parsePaperFileName(f.replace(/\.json$/, ".html"));
    const label = key ? `${key.exam} ${key.year} ${key.section}` : f;
    for (const r of JSON.parse(readFileSync(join(RAW_DIR, f), "utf8")) as FlightRecord[]) {
      out.push({ ...r, _paper: label });
    }
  }
  return out;
}

function arg(name: string): string | undefined {
  return process.argv.slice(2).find((a) => a.startsWith(`--${name}=`))?.split("=").slice(1).join("=");
}

const rows = load();
const show = arg("show");
const samples: Record<string, string[]> = {};
const note = (cls: string, paper: string, qn: unknown, field: string, text: string) => {
  (samples[cls] ??= []).push(`${paper} Q${qn} ${field}: ${JSON.stringify(text.slice(0, 220))}`);
};

console.log(`surveying ${rows.length} rows from ${RAW_DIR}\n`);

// ---------------------------------------------------------------- HTML tags
const tagCount = new Map<string, number>();
const tagRows = new Map<string, Set<string>>();
for (const r of rows) {
  for (const f of TEXT_FIELDS) {
    const v = r[f];
    if (typeof v !== "string") continue;
    for (const m of v.matchAll(/<\s*(\/?)([a-zA-Z][a-zA-Z0-9]*)/g)) {
      const tag = m[2].toLowerCase();
      tagCount.set(tag, (tagCount.get(tag) ?? 0) + 1);
      (tagRows.get(tag) ?? tagRows.set(tag, new Set()).get(tag)!).add(`${r._paper}|${r.questionNumber}`);
      if (show === tag) note(tag, r._paper, r.questionNumber, f, v);
    }
  }
}
console.log("HTML TAGS (occurrences / distinct rows)");
for (const [tag, n] of [...tagCount].sort((a, b) => b[1] - a[1])) {
  console.log(`  <${tag}>`.padEnd(12) + `${String(n).padStart(5)}  ${tagRows.get(tag)!.size} rows`);
}

// ---------------------------------------------------------- HTML entities
const entCount = new Map<string, number>();
for (const r of rows) {
  for (const f of TEXT_FIELDS) {
    const v = r[f];
    if (typeof v !== "string") continue;
    for (const m of v.matchAll(/&[a-zA-Z]{2,10};|&#[0-9]{2,5};/g)) {
      entCount.set(m[0], (entCount.get(m[0]) ?? 0) + 1);
      if (show === "entity") note("entity", r._paper, r.questionNumber, f, v);
    }
  }
}
console.log("\nHTML ENTITIES");
if (entCount.size === 0) console.log("  (none)");
for (const [e, n] of [...entCount].sort((a, b) => b[1] - a[1])) console.log(`  ${e.padEnd(10)} ${n}`);

// ------------------------------------------------------------ math zones
let dollarInline = 0;
let dollarBlock = 0;
let parenInline = 0;
let imbalanced = 0;
let strayAfterParse = 0;
const imbalancedShapes = new Map<string, number>();
for (const r of rows) {
  for (const f of TEXT_FIELDS) {
    const v = r[f];
    if (typeof v !== "string" || !v.includes("$")) continue;
    if (/\\\(/.test(v)) parenInline++;
    const segs = parseLatex(v);
    for (const s of segs) {
      if (s.type === "block") dollarBlock++;
      if (s.type === "inline") dollarInline++;
      // A leftover bare `$` in a TEXT segment means a delimiter did not pair.
      if (s.type === "text" && s.content.includes("$")) {
        strayAfterParse++;
        if (show === "stray") note("stray", r._paper, r.questionNumber, f, v);
      }
    }
    // the systematic shape: opens $$ closes single $
    for (const m of v.matchAll(/\$\$[^$]*\$(?!\$)/g)) {
      imbalanced++;
      const shape = m[0].startsWith("$$") ? "$$...$" : "other";
      imbalancedShapes.set(shape, (imbalancedShapes.get(shape) ?? 0) + 1);
      if (show === "imbalanced") note("imbalanced", r._paper, r.questionNumber, f, m[0]);
    }
  }
}
console.log("\nMATH ZONES (as the REAL renderer segments them)");
console.log(`  inline zones            ${dollarInline}`);
console.log(`  block zones             ${dollarBlock}`);
console.log(`  fields already using \\( ${parenInline}`);
console.log(`  TEXT segments still holding a bare $  ${strayAfterParse}   <-- the visible defect`);
console.log(`  $$...$ occurrences      ${imbalanced}`);

// -------------------------------------------- math that FAILS to be math
// inline $...$ forbids newlines, so a multi-line dollar zone renders literally
let multilineDollar = 0;
for (const r of rows) {
  for (const f of TEXT_FIELDS) {
    const v = r[f];
    if (typeof v !== "string" || !v.includes("$")) continue;
    for (const s of parseLatex(v)) {
      if (s.type === "text" && /\$[^$]*\n[^$]*\$/.test(s.content)) {
        multilineDollar++;
        if (show === "multiline") note("multiline", r._paper, r.questionNumber, f, s.content);
      }
    }
  }
}
console.log(`  dollar zones spanning a newline (render as LITERAL text) ${multilineDollar}`);

// ------------------------------------------------------- unicode in math
const uniInMath = new Map<string, number>();
for (const r of rows) {
  for (const f of TEXT_FIELDS) {
    const v = r[f];
    if (typeof v !== "string") continue;
    for (const s of parseLatex(v)) {
      if (s.type === "text") continue;
      for (const ch of s.content) {
        if (ch.charCodeAt(0) > 127) {
          uniInMath.set(ch, (uniInMath.get(ch) ?? 0) + 1);
          if (show === "unicode-math") note("unicode-math", r._paper, r.questionNumber, f, s.content);
        }
      }
    }
  }
}
console.log("\nNON-ASCII INSIDE MATH ZONES (temml -> OMML risk)");
if (uniInMath.size === 0) console.log("  (none)");
for (const [c, n] of [...uniInMath].sort((a, b) => b[1] - a[1]).slice(0, 25)) {
  console.log(`  ${JSON.stringify(c)} U+${c.codePointAt(0)!.toString(16).toUpperCase().padStart(4, "0")}  ${n}`);
}

// -------------------------------------------------- unicode outside math
const uniInProse = new Map<string, number>();
for (const r of rows) {
  for (const f of TEXT_FIELDS) {
    const v = r[f];
    if (typeof v !== "string") continue;
    for (const s of parseLatex(v)) {
      if (s.type !== "text") continue;
      for (const ch of s.content) {
        if (ch.charCodeAt(0) > 127) uniInProse.set(ch, (uniInProse.get(ch) ?? 0) + 1);
      }
    }
  }
}
console.log("\nNON-ASCII IN PROSE (top 20; mostly legitimate typography)");
for (const [c, n] of [...uniInProse].sort((a, b) => b[1] - a[1]).slice(0, 20)) {
  console.log(`  ${JSON.stringify(c)} U+${c.codePointAt(0)!.toString(16).toUpperCase().padStart(4, "0")}  ${n}`);
}

// ----------------------------------------------------------- newlines
let literalBackslashN = 0;
let realNewline = 0;
let crlf = 0;
for (const r of rows) {
  for (const f of TEXT_FIELDS) {
    const v = r[f];
    if (typeof v !== "string") continue;
    if (normalizeNewlines(v) !== v) {
      literalBackslashN++;
      if (show === "literal-nl") note("literal-nl", r._paper, r.questionNumber, f, v);
    }
    if (v.includes("\n")) realNewline++;
    if (v.includes("\r")) crlf++;
  }
}
console.log("\nNEWLINES");
console.log(`  fields the repo's normalizeNewlines would CHANGE  ${literalBackslashN}`);
console.log(`  fields containing a real newline                 ${realNewline}`);
console.log(`  fields containing a carriage return              ${crlf}`);

// ------------------------------------------------------------- tables
let gfmSep = 0;
let htmlTable = 0;
for (const r of rows) {
  for (const f of TEXT_FIELDS) {
    const v = r[f];
    if (typeof v !== "string") continue;
    if (/^[ ]*\|?[ :-]*-{2,}[ :|-]*\|?[ ]*$/m.test(v)) {
      gfmSep++;
      if (show === "gfm") note("gfm", r._paper, r.questionNumber, f, v);
    }
    if (/<\s*table/i.test(v)) htmlTable++;
  }
}
console.log("\nTABLES");
console.log(`  fields with a GFM separator row (already our shape) ${gfmSep}`);
console.log(`  fields with an HTML <table>                         ${htmlTable}`);

// ------------------------------------------------------------- figures
const imgs = new Map<string, number>();
for (const r of rows) {
  for (const f of TEXT_FIELDS) {
    const v = r[f];
    if (typeof v !== "string") continue;
    for (const m of v.matchAll(/<img[^>]*>/gi)) {
      const src = /src\s*=\s*"?([^"\s>]+)/i.exec(m[0])?.[1] ?? "(no src)";
      imgs.set(src, (imgs.get(src) ?? 0) + 1);
      if (show === "img") note("img", r._paper, r.questionNumber, f, m[0]);
    }
  }
}
console.log("\nFIGURES");
console.log(`  distinct image URLs ${imgs.size} over ${[...imgs.values()].reduce((a, b) => a + b, 0)} references`);

// ------------------------------------------------------- answer shapes
const keyShape = new Map<string, number>();
for (const r of rows) {
  const nopts = [1, 2, 3, 4].filter((i) => r[`option${i}`] !== undefined && r[`option${i}`] !== "").length;
  const ca = String(r.correctAnswer ?? "").trim();
  let shape: string;
  if (nopts >= 2) shape = /^[1-6]$/.test(ca) ? "mcq: option index" : `mcq: OTHER (${ca})`;
  else shape = /^-?[0-9]+$/.test(ca) ? "typed: integer" : `typed: OTHER (${ca})`;
  keyShape.set(shape, (keyShape.get(shape) ?? 0) + 1);
}
console.log("\nANSWER SHAPES");
for (const [s, n] of [...keyShape].sort((a, b) => b[1] - a[1])) console.log(`  ${s.padEnd(34)} ${n}`);

if (show) {
  const bucket = samples[show] ?? [];
  console.log(`\n--- samples for --show=${show} (${bucket.length} hits, first 25) ---`);
  for (const s of bucket.slice(0, 25)) console.log("  " + s);
}
