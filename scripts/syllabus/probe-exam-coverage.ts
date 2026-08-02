/**
 * Does the State Board syllabus cover what each exam actually ASKS?
 *
 *   npx tsx scripts/syllabus/probe-exam-coverage.ts [exam]
 *
 * Spine = each exam's OWN subtopics in the question bank (what it demonstrably
 * asks), not a syllabus document. For each subtopic we take the vocabulary of its
 * real PYQs and ask how much of it appears in the State Board Std XI+XII
 * Chemistry books.
 *
 * TRIAGE, NOT A VERDICT. A low score means "read these questions" — the probe
 * cannot tell a genuine gap from a wording difference, and every candidate it
 * raises must be adjudicated by hand before it becomes a ruling.
 *
 * Known bias, stated so nobody over-reads the output: the spine is what an exam
 * asked in the YEARS THE BANK HOLDS. CET has 2,166 PYQs and is a good proxy;
 * NDA has 261 and is not. Absence from a thin bank is not absence from a syllabus.
 */
import { writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { EXAM_CHAPTER_TO_SB } from "./exam-chapter-map";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

const BOOKS = [
  String.raw`C:\Vilas\LWS_Pune\NDA_Subjects_Content\Subjects\Chem\State_Board\Book\11th`,
  String.raw`C:\Vilas\LWS_Pune\NDA_Subjects_Content\Subjects\Chem\State_Board\Book\12th`,
];

/** Words that carry no discriminating power in a chemistry stem. */
const STOP = new Set(`the a an of and or in on to for with from by is are was were be been
which what who whom whose that this these those it its as at into than then thus so if
following given below above correct incorrect true false not none all any both each
statement statements option options answer identify select choose consider match list
among following one two three four five reaction reactions compound compounds element
elements property properties value values number numbers formula type types used using
use uses form forms formed forming will can may would should could has have had does do
did will shall must respectively also only same different between when where why how
mol mole g kg cm mm ml litre lit atm bar pa kj j cal k c ph
list-i list-ii list-iii list- statement-i statement-ii statement- column-i column-ii
correctly respectively arrangement sequence order codes code assertion reason`.split(/\s+/));

/**
 * Question-FORMAT noise, not chemistry. "list-i" is how a match-the-following is
 * typeset; an element-plus-mass token like "eu-63" is a one-off from a single
 * configuration question. Both are absent from any textbook and would otherwise
 * dominate the "missing" list and fake a gap.
 */
const NOISE = (w: string) =>
  /^(list|statement|column|group|set)-?[iv]*$/.test(w) ||
  /^[a-z]{1,2}-\d{1,3}$/.test(w) ||
  /^\d/.test(w);

const CLEAN = (s: string) =>
  s
    .toLowerCase()
    .replace(/\\\(|\\\)|\\\[|\\\]/g, " ")
    .replace(/\\[a-z]+/g, " ")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ");

async function main() {
  loadEnv();
  const only = process.argv[2];
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("supabase env required");
  const db = createClient(url, key, { auth: { persistSession: false } });

  // Per-chapter, so each subtopic is tested against the chapter that would teach it.
  const corpus = await loadCorpus();
  console.log(`State Board corpus: ${Object.keys(corpus.chapters).length} chapters\n`);

  type Row = { exam: string; chapter: string; subtopic: string; text: string; solution: string | null };
  const rows: Row[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db
      .from("questions")
      .select("text,solution,exams!inner(name),subjects!inner(name),chapters!inner(name),subtopics(name)")
      .eq("visibility", "PUBLIC")
      .eq("question_kind", "pyq")
      .range(from, from + 999);
    if (error) throw new Error(error.message);
    const batch = (data ?? []) as unknown as Record<string, never>[];
    for (const r of batch) {
      const subject = (r as never as { subjects: { name: string } }).subjects?.name ?? "";
      if (!/chem/i.test(subject)) continue;
      const exam = (r as never as { exams: { name: string } }).exams?.name ?? "";
      if (!["MHT-CET", "JEE Mains", "NDA"].includes(exam)) continue;
      if (only && exam !== only) continue;
      rows.push({
        exam,
        chapter: (r as never as { chapters: { name: string } }).chapters?.name ?? "",
        subtopic: (r as never as { subtopics: { name: string } | null }).subtopics?.name ?? "(none)",
        text: (r as never as { text: string }).text ?? "",
        solution: (r as never as { solution: string | null }).solution ?? null,
      });
    }
    if (batch.length < 1000) break;
  }

  const groups = new Map<string, Row[]>();
  for (const r of rows) {
    const k = `${r.exam}\u0000${r.chapter}\u0000${r.subtopic}`;
    (groups.get(k) ?? groups.set(k, []).get(k)!).push(r);
  }

  const unmapped = new Set<string>();
  const out: {
    exam: string; chapter: string; subtopic: string; n: number;
    score: number; missing: string[]; probed: number;
  }[] = [];

  for (const [k, list] of groups) {
    const [exam, chapter, subtopic] = k.split("\u0000");
    // Vocabulary of what this subtopic actually asks: terms appearing in at least
    // two of its questions, so a one-off distractor cannot define the subtopic.
    const freq = new Map<string, number>();
    for (const q of list) {
      const seen = new Set(
        CLEAN(`${q.text} ${q.subtopic}`)
          .split(" ")
          .filter((w) => w.length > 4 && !STOP.has(w) && !NOISE(w)),
      );
      for (const w of seen) freq.set(w, (freq.get(w) ?? 0) + 1);
    }
    const minDocs = list.length >= 4 ? 2 : 1;
    const terms = [...freq.entries()]
      .filter(([, n]) => n >= minDocs)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 25)
      .map(([w]) => w);
    if (terms.length === 0) continue;
    // Scope the search to the State Board chapter that would TEACH this, never
    // the whole corpus — a passing mention elsewhere is not coverage.
    const mapped = EXAM_CHAPTER_TO_SB[exam]?.[chapter];
    if (mapped === null) {
      out.push({ exam, chapter, subtopic, n: list.length, score: 0, missing: ["(no State Board chapter teaches this)"], probed: terms.length });
      continue;
    }
    const haystack = mapped
      ? mapped.map((c) => corpus.chapters[c] ?? "").join("\n")
      : corpus.all;
    if (!mapped) unmapped.add(`${exam} :: ${chapter}`);
    const missing = terms.filter((t) => !haystack.includes(t));
    out.push({
      exam, chapter, subtopic, n: list.length,
      score: Math.round(((terms.length - missing.length) / terms.length) * 100),
      missing: missing.slice(0, 12),
      probed: terms.length,
    });
  }

  out.sort((a, b) => a.score - b.score || b.n - a.n);
  if (unmapped.size) {
    console.log(`\nWARNING — ${unmapped.size} exam chapter(s) have no entry in exam-chapter-map.ts;`);
    console.log("they fell back to a whole-corpus search, which is too lenient:");
    for (const u of unmapped) console.log("  " + u);
  }

  const lines: string[] = [];
  lines.push("EXAM-SUBTOPIC COVERAGE BY THE STATE BOARD BOOKS (triage, not a verdict)\n");
  for (const exam of ["MHT-CET", "JEE Mains", "NDA"]) {
    const mine = out.filter((r) => r.exam === exam);
    if (!mine.length) continue;
    const low = mine.filter((r) => r.score < 70);
    lines.push(`\n=== ${exam} — ${mine.length} subtopics, ${low.length} scoring under 70% ===`);
    for (const r of mine.filter((x) => x.score < 85)) {
      lines.push(
        `  ${String(r.score).padStart(3)}%  ${String(r.n).padStart(3)}q  ${r.chapter.slice(0, 28).padEnd(28)} ${r.subtopic.slice(0, 44)}`,
      );
      if (r.missing.length) lines.push(`         absent from books: ${r.missing.join(", ")}`);
    }
  }
  const dest = join(process.cwd(), "generated-papers", "exam-coverage-probe.txt");
  writeFileSync(dest, lines.join("\n"), "utf8");
  console.log(lines.join("\n").slice(0, 3000));
  console.log(`\n\nWROTE ${dest}`);
}

async function loadCorpus(): Promise<{ all: string; chapters: Record<string,string> }> {
  const { execSync } = await import("node:child_process");
  const { readFileSync, existsSync } = await import("node:fs");
  const cache = join(process.cwd(), "generated-papers", "sb-corpus.json");
  if (!existsSync(cache)) {
    // Regenerating takes ~20s across 32 PDFs, so it is cached; delete the file
    // to force a refresh after the books change.
    execSync(`python ${JSON.stringify(join(process.cwd(), "scripts", "syllabus", "dump_sb_corpus.py"))}`, {
      stdio: "inherit",
    });
  }
  const raw = JSON.parse(readFileSync(cache, "utf8")) as { all: string; chapters: Record<string,string> };
  if (!raw.chapters) throw new Error("sb-corpus.json is the old whole-blob format — re-run dump_sb_corpus.py");
  return raw;
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
