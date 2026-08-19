/**
 * Validate one transcribed CBSE board paper BEFORE it is committed.
 *
 *   npx tsx scripts/cbse-12-pyq/validate.ts 2025-65-5-1
 *
 * Everything here has caught a real defect in a sibling pipeline at least once,
 * so nothing is defensive-in-general:
 *   • duplicate ref                  — silently drops a question at commit;
 *   • section/marks disagree with the paper's printed structure — a
 *     mis-numbered question, or a pattern applied to the wrong year;
 *   • unknown chapter                — chapters AUTO-CREATE on commit, so a
 *     misspelling silently FORKS the corpus (the mh-ssc-10-text lesson);
 *   • unknown subtopic               — same hazard one level down;
 *   • MCQ without exactly 4 options, or an answer naming no option;
 *   • unbalanced \( \) delimiters    — renders as raw LaTeX on the page;
 *   • literal "\n" (backslash-n)     — commitStaged REJECTS these outright, and
 *     the fix belongs in the SOURCE, not at insert time;
 *   • control characters / double-escaped backslashes — the signature of text
 *     authored through a shell heredoc, invisible on inspection.
 * The subtopic check runs against the LIVE DB, because a hand-copied list is
 * exactly what goes stale.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { DATA, CHAPTERS, EXAM_ID_CBSE_12, SUBJECT_NAME } from "./config";
import { sectionForQuestion, type PatternName } from "./lib";
import { normalizeNewlines } from "../../src/lib/text/normalizeNewlines";

type Q = {
  ref: string;
  questionNumber: string;
  section: string;
  marks: number;
  format: "mcq" | "subjective";
  chapter: string;
  subtopic: string;
  difficulty: string;
  stem: string;
  context?: string;
  options?: { label: string; text: string }[];
  answer?: string;
  setId?: string;
  _noCorrectOption?: boolean;
};
type Paper = { paper: string; year: number; pattern: PatternName; questions: Q[] };

const DIFFICULTIES = ["EASY", "MODERATE", "HARD"];

/** Balanced \( ... \) with no nesting and no stray delimiter. */
function latexImbalance(s: string): string | null {
  let depth = 0;
  for (let i = 0; i < s.length - 1; i++) {
    if (s[i] !== "\\") continue;
    if (s[i + 1] === "(") {
      if (++depth > 1) return "nested \\(";
      i++;
    } else if (s[i + 1] === ")") {
      if (--depth < 0) return "stray \\)";
      i++;
    }
  }
  return depth === 0 ? null : "unclosed \\(";
}

/** The base question number a ref belongs to: Q36iiib -> 36, Q23a -> 23. */
function baseNumber(ref: string): number {
  const m = /^Q(\d{1,2})/.exec(ref);
  if (!m) throw new Error(`ref "${ref}" does not start with Q<number>`);
  return Number(m[1]);
}

async function main() {
  const id = process.argv[2];
  if (!id) throw new Error("usage: validate.ts <paperId>  e.g. 2025-65-5-1");
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

  const paper = JSON.parse(readFileSync(join(DATA, `${id}.questions.json`), "utf8")) as Paper;
  const problems: string[] = [];
  const note = (r: string, m: string) => problems.push(`${r}: ${m}`);

  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  // Live subtopic axis, per chapter, for THIS exam only.
  const { data: rows, error } = await client
    .from("subtopics")
    .select("name, chapters!inner(name, subjects!inner(name, exam_id))")
    .eq("chapters.subjects.exam_id", EXAM_ID_CBSE_12)
    .eq("chapters.subjects.name", SUBJECT_NAME);
  if (error) throw new Error(`subtopic load failed: ${error.message}`);
  const axis = new Map<string, Set<string>>();
  for (const r of rows as unknown as { name: string; chapters: { name: string } }[]) {
    const ch = r.chapters.name;
    if (!axis.has(ch)) axis.set(ch, new Set());
    axis.get(ch)!.add(r.name);
  }

  const seen = new Set<string>();
  for (const q of paper.questions) {
    if (seen.has(q.ref)) note(q.ref, "duplicate ref");
    seen.add(q.ref);

    // Structure must match the paper's own printed instructions.
    const expect = sectionForQuestion(baseNumber(q.ref), paper.pattern);
    if (q.section !== expect.section) {
      note(q.ref, `section "${q.section}" but the ${paper.pattern} paper puts Q${baseNumber(q.ref)} in "${expect.section}"`);
    }
    // Case-study SUB-PARTS carry their own printed marks (1/1/2), which sum to
    // the parent's 4 — so only non-case-study rows are checked against the band.
    if (expect.kind !== "case_study" && q.marks !== expect.marks) {
      note(q.ref, `marks ${q.marks} but the band says ${expect.marks}`);
    }

    if (!(CHAPTERS as readonly string[]).includes(q.chapter)) note(q.ref, `unknown chapter "${q.chapter}"`);
    else if (!axis.get(q.chapter)?.has(q.subtopic)) {
      note(q.ref, `subtopic "${q.subtopic}" is not on the live axis for "${q.chapter}"`);
    }
    if (!DIFFICULTIES.includes(q.difficulty)) note(q.ref, `difficulty "${q.difficulty}"`);

    if (q.format === "mcq") {
      const n = q.options?.length ?? 0;
      if (n !== 4) note(q.ref, `mcq has ${n} options, needs 4`);
      // Keyless MCQ allowed ONLY as an explicit assertion — see commit.ts.
      if (!q.answer && !q._noCorrectOption) note(q.ref, "mcq has no answer (set _noCorrectOption if CBSE gives none)");
      else if (q.answer && !q.options?.some((o) => o.label === q.answer)) {
        note(q.ref, `answer "${q.answer}" names no option`);
      }
      // DUPLICATE OPTIONS. `audit:keys` catches this for practice rows, but it
      // scopes to question_kind='practice' and these are 'pyq', so it reports
      // NOTHING SCANNED here (correctly - it refuses to call an empty scan
      // clean). The JEE pyq variant is hardcoded to the JEE exam id. So this is
      // the only place the check can live for this lane.
      //
      // Worth having even though all 63 papers scanned clean: the sibling
      // pipelines' dominant defect is the TWIN - the correct answer printed
      // twice, unreduced fraction beside reduced, surd beside its rationalised
      // form - which makes a key look wrong when it is right, and the repair
      // belongs to the option text rather than the key.
      const seenOpt = new Map<string, string>();
      for (const o of q.options ?? []) {
        const norm = (o.text ?? "").replace(/\s+/g, " ").trim();
        if (!norm) continue;
        const prior = seenOpt.get(norm);
        if (prior) note(q.ref, `options ${prior} and ${o.label} are identical: ${norm.slice(0, 60)}`);
        else seenOpt.set(norm, o.label);
      }
    } else if (q.options?.length) {
      note(q.ref, "subjective row carries options");
    }

    for (const [field, text] of Object.entries({ stem: q.stem, context: q.context ?? "", ...Object.fromEntries((q.options ?? []).map((o, i) => [`opt${i}`, o.text])) })) {
      if (!text) continue;
      const bad = latexImbalance(text);
      if (bad) note(q.ref, `${field}: ${bad}`);
      // Reuse the REAL normaliser, never a second regex. A hand-rolled /\\n/
      // fires on \neq, \notin, \nabla and matrix \\ separators — this validator
      // did exactly that on first run and reported 3 phantom defects. The
      // normaliser leaves math zones alone, which is the whole point.
      if (normalizeNewlines(text) !== text) {
        note(q.ref, `${field}: literal \\n — fix the SOURCE, commitStaged rejects it`);
      }
      // ⚠ TAB (\x09) IS INCLUDED, and that is the whole point. The original range
      // excluded it as ordinary whitespace — but TAB is the SIGNATURE of the
      // corruption this check exists to catch: a shell eats one backslash and
      // `\theta` arrives as TAB + "heta". The check was blind to exactly the
      // failure it was written for (spotted by a transcription agent, 2026-08-19).
      // No legitimate row carries a TAB — verified 0 occurrences across every
      // transcribed paper — so flagging it is free.
      // eslint-disable-next-line no-control-regex
      if (/[\x00-\x08\x09\x0b\x0c\x0e-\x1f]/.test(text)) {
        note(q.ref, `${field}: control character (TAB or other — the heredoc-corruption signature)`);
      }
    }
  }

  const mcq = paper.questions.filter((q) => q.format === "mcq").length;
  const answered = paper.questions.filter((q) => q.answer).length;
  console.log(`${paper.paper} (${paper.year}, ${paper.pattern}) — ${paper.questions.length} rows`);
  console.log(`  mcq ${mcq} (all answered: ${answered === mcq}) | subjective ${paper.questions.length - mcq}`);
  console.log(`  distinct base question numbers: ${new Set(paper.questions.map((q) => baseNumber(q.ref))).size}`);
  console.log(`  chapters touched: ${new Set(paper.questions.map((q) => q.chapter)).size}`);

  if (problems.length) {
    console.log(`\n${problems.length} PROBLEM(S):`);
    for (const p of problems) console.log(`  - ${p}`);
    process.exit(1);
  }
  console.log("\nvalidation clean.");
}

main().catch((e) => {
  console.error(e.message ?? e);
  process.exit(1);
});
