/**
 * Notes-coverage probe (triage aid, NOT a gate). For one /notes chapter, diff
 * the MATH used in each subtopic's PUBLIC question solutions against the math
 * taught in that subtopic's notes bodies, and report tokens that appear in
 * solutions (>=2 questions) but in NO notes concept — candidates for "the
 * solution relies on a formula the notes don't teach".
 *
 *   npx tsx scripts/notes-coverage.ts [subjectRoute] [chapterSlug]
 *   (default: nda-maths statistics)
 *
 * Two token kinds:
 *   - macros: \[a-z]+  (a notation/technique used in solutions but not notes)
 *   - structural fragments: math with operands abstracted (digits + single-
 *     letter vars -> @), so a solution's (20^2-1)/12 and notes' (n^2-1)/12 both
 *     normalise to (@^@-@)/(@) and match.
 *
 * Read-only. Noisy by design (notation variants) — it's a ranked human-review
 * list. Misses "present but under-emphasised" (it finds ABSENCE, not emphasis).
 * Requires NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in .env.local.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { NOTES_CHAPTERS } from "../src/lib/notes/chapters";
import type { SubtopicNote } from "../src/app/notes/_types";

const local = path.join(process.cwd(), ".env.local");
if (fs.existsSync(local)) require("dotenv").config({ path: local, override: true });

const COMMON_MACROS = new Set([
  // layout / common notation
  "\\dfrac", "\\frac", "\\left", "\\right", "\\text", "\\sqrt", "\\times",
  "\\cdot", "\\quad", "\\qquad", "\\sum", "\\bar", "\\begin", "\\end",
  "\\hat", "\\ldots", "\\dots",
  // relational / logical operators — prose glue, not formula CONTENT
  "\\Rightarrow", "\\rightarrow", "\\to", "\\implies", "\\iff",
  "\\leq", "\\geq", "\\neq", "\\in", "\\approx", "\\pm", "\\mp",
]);

function mathZones(s: string): string[] {
  const out: string[] = [];
  const re = /\\\(([\s\S]*?)\\\)|\\\[([\s\S]*?)\\\]/g;
  let m;
  while ((m = re.exec(s))) out.push(m[1] ?? m[2] ?? "");
  return out;
}

function skeleton(zone: string): string {
  let z = zone;
  for (let i = 0; i < 3; i++)
    z = z.replace(/\\d?frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, "($1)/($2)");
  z = z.replace(/\\sqrt\s*\{([^{}]*)\}/g, "sqrt($1)");
  z = z.replace(/\\left|\\right/g, "");
  z = z.replace(/\\[a-zA-Z]+/g, " "); // drop remaining macros (tracked separately)
  z = z.replace(/[{}\s]/g, "");
  z = z.replace(/[0-9]+/g, "@").replace(/[A-Za-z]/g, "@");
  return z;
}

// LaTeX row/line breaks `\\` (and `\\[4pt]` spacing) are NOT macros — but the
// second `\` sits right before the next row's entry, so `\\p` would match as a
// spurious `\p` macro (and pollute fragments). Strip them before tokenizing.
const stripBreaks = (zone: string) => zone.replace(/\\\\(\s*\[[^\]]*\])?/g, " ");

function tokensFromZones(zones: string[]): { macros: Set<string>; frags: Set<string> } {
  const macros = new Set<string>();
  const frags = new Set<string>();
  for (const raw of zones) {
    const zone = stripBreaks(raw);
    for (const mac of zone.match(/\\[a-zA-Z]+/g) ?? [])
      if (!COMMON_MACROS.has(mac)) macros.add(mac);
    const skel = skeleton(zone);
    for (const piece of skel.split(/[=,;]/)) {
      for (const frag of piece.match(/[@^/*+\-().]{4,}/g) ?? []) {
        // keep only fragments with a real operator (not just @ and parens)
        if (/[\^/*+\-]/.test(frag) && /@/.test(frag)) frags.add(frag);
      }
    }
  }
  return { macros, frags };
}

const tokens = (text: string) => tokensFromZones(mathZones(text));

// Collect every string field value (recursively) WITHOUT JSON-escaping — using
// JSON.stringify would double every backslash (`\cos` -> `\\cos`), which then
// trips stripBreaks and consistency with the raw (single-backslash) solution
// text. Walk the object instead so notes + solution zones are escaped alike.
function collectStrings(v: unknown, out: string[]): void {
  if (typeof v === "string") out.push(v);
  else if (Array.isArray(v)) for (const x of v) collectStrings(x, out);
  else if (v && typeof v === "object") for (const x of Object.values(v)) collectStrings(x, out);
}

// Notes math lives BOTH in \(...\) zones (intuition/definition/examples) AND in
// raw `formula.latex` / reference-table cells (NOT delimited). Gather all of it.
function noteZones(note: SubtopicNote): string[] {
  const strings: string[] = [];
  collectStrings(note, strings);
  const zones = strings.flatMap(mathZones);
  for (const c of note.concepts) {
    if (c.kind === "formula" && c.formula?.latex) zones.push(c.formula.latex);
    if (c.kind === "reference")
      for (const row of c.table.rows) zones.push(...row.cells);
  }
  return zones;
}

async function chapterId(sb: SupabaseClient, exam: string, subject: string, chapter: string) {
  const { data } = await sb
    .from("chapters")
    .select("id, name, subject:subjects!subject_id(name, exam:exams!exam_id(name))")
    .eq("name", chapter);
  const hit = (data ?? []).find((c: any) => {
    const s = Array.isArray(c.subject) ? c.subject[0] : c.subject;
    const e = Array.isArray(s?.exam) ? s.exam[0] : s?.exam;
    return s?.name === subject && e?.name === exam;
  });
  return hit?.id as string | undefined;
}

async function main() {
  const subjectRoute = process.argv[2] ?? "nda-maths";
  const chapterSlug = process.argv[3] ?? "statistics";
  const reg = NOTES_CHAPTERS.find(
    (c) => c.subjectRoute === subjectRoute && c.chapterSlug === chapterSlug
  );
  if (!reg) {
    console.error(`no NOTES_CHAPTERS entry for ${subjectRoute}/${chapterSlug}`);
    process.exit(2);
  }
  const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const cid = await chapterId(sb, reg.examName, reg.subjectName, reg.chapter.chapterName);
  if (!cid) { console.error("chapter not found in DB"); process.exit(2); }

  // notes vocab per subtopicName
  const notesVocab = new Map<string, { macros: Set<string>; frags: Set<string> }>();
  for (const note of Object.values(reg.notes) as SubtopicNote[]) {
    notesVocab.set(note.subtopicName, tokensFromZones(noteZones(note)));
  }

  // solutions per subtopic
  const { data: rows } = await sb
    .from("questions")
    .select("id, solution, subtopic:subtopics!subtopic_id(name)")
    .eq("chapter_id", cid)
    .eq("visibility", "PUBLIC")
    .not("solution", "is", null)
    .limit(1000);

  const bySub = new Map<string, string[]>();
  for (const r of (rows ?? []) as any[]) {
    const name = Array.isArray(r.subtopic) ? r.subtopic[0]?.name : r.subtopic?.name;
    if (!name || !r.solution) continue;
    if (!bySub.has(name)) bySub.set(name, []);
    bySub.get(name)!.push(r.solution);
  }

  console.log(`\nNotes-coverage probe — ${subjectRoute}/${chapterSlug}\n${"=".repeat(50)}`);
  for (const [subName, solutions] of bySub) {
    const vocab = notesVocab.get(subName);
    if (!vocab) {
      console.log(`\n## ${subName}\n  (no matching notes subtopic — skipped)`);
      continue;
    }
    // count how many distinct solutions each token appears in
    const macroCount = new Map<string, number>();
    const fragCount = new Map<string, number>();
    for (const sol of solutions) {
      const t = tokens(sol);
      for (const mac of t.macros) if (!vocab.macros.has(mac)) macroCount.set(mac, (macroCount.get(mac) ?? 0) + 1);
      for (const fr of t.frags) if (!vocab.frags.has(fr)) fragCount.set(fr, (fragCount.get(fr) ?? 0) + 1);
    }
    const flagMac = [...macroCount].filter(([, n]) => n >= 2).sort((a, b) => b[1] - a[1]);
    const flagFr = [...fragCount].filter(([, n]) => n >= 2).sort((a, b) => b[1] - a[1]);
    console.log(`\n## ${subName}  (${solutions.length} solutions, notes frags=${vocab.frags.size})`);
    console.log(`  macros in solutions but not notes (>=2 q): ${flagMac.length ? flagMac.map(([m, n]) => `${m}(${n})`).join("  ") : "none"}`);
    if (flagFr.length) {
      console.log(`  structural fragments in solutions but not notes (>=2 q), top 15:`);
      for (const [f, n] of flagFr.slice(0, 15)) console.log(`     ${n}x   ${f}`);
    } else {
      console.log(`  structural fragments: none`);
    }
  }
  console.log(`\n(Triage list — review candidates by hand; notation variants are false positives.)`);
}

main().catch((e) => { console.error(e); process.exit(1); });
