/**
 * Report which questions on a transcribed paper the bank has ALREADY seen.
 *
 *   npx tsx scripts/mh-hsc-12-pyq/paper/probe-reuse.ts <paperId>
 *   npx tsx scripts/mh-hsc-12-pyq/paper/probe-reuse.ts --bank    # whole corpus
 *
 * TRIAGE, not a gate — it always exits 0.
 *
 * A board reusing a question across sittings is signal, not a defect: it tells a
 * student this is worth knowing. The point is to SEE it rather than discover it
 * by accident, which is how it was discovered (see ./reuse.ts for the Feb-2026
 * Q.6 case that `content_hash` missed on one character of typography).
 *
 * Run it BEFORE commit. Two useful readings of a hit:
 *  - the older row is a compilation transcription and yours is from the printed
 *    page, so a difference between them may be a DEFECT IN THE OLDER ROW
 *  - the pair will not be deduped by content_hash unless the text matches
 *    exactly, so expect both to land and to appear together on /browse
 *
 * ## ITS OUTPUT IS A FLOOR, NOT A COUNT
 *
 * This compares TEXT. It sees through typography and nothing else, so it finds a
 * repeat the board re-typeset and misses one the board re-WORDED — and the board
 * re-words constantly. The standing counter-example is the pair-of-lines
 * bookwork, set in 2016, 2018, 2020, 2025 and 2026 as:
 *
 *     "Show that every homogeneous equation of degree two ..."
 *     "Show that a homogeneous equation of degree two ..."
 *     "Prove that a homogeneous equation of degree two ..."
 *     "Prove that homogeneous equation of degree two ..."
 *
 * One theorem, five sittings, five phrasings, and this probe reports NONE of
 * them. Across 361 Maths PYQ rows it finds exactly one group. Read that as "at
 * least one", never as "the bank contains one repeat" — the true figure is
 * higher and is not measurable from text alone.
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { EXAM_ID, PAPERS, requirePaper, questionsJsonPath } from "./config";
import { reuseKey, groupByReuseKey, type ReuseRow } from "./reuse";
import type { PaperQuestion } from "../../mh-ssc-10/lib";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

/** One factory so the loader below can name the client's exact inferred type.
 *  `SupabaseClient` with default generics is a DIFFERENT type from what
 *  createClient returns here, and using it collapses every selected row to
 *  `never` — which surfaces as "property does not exist", not as a type error
 *  about the client. Same trap as attach-figures.ts. */
function makeClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
}
type Db = ReturnType<typeof makeClient>;

type BankRow = ReuseRow & {
  pyqYear: number | null;
  pyqMonth: string | null;
  questionNumber: string | null;
  chapter: string;
  sourceFile: string | null;
};

async function loadBank(client: Db): Promise<BankRow[]> {
  // Paged: this exam's Maths PYQ corpus is past the PostgREST 1000-row cap, and
  // a bare .select() would silently return the first 1000 and look complete.
  const out: BankRow[] = [];
  const PAGE = 500;
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await client
      .from("questions")
      .select("id, text, pyq_year, pyq_month, question_number, source_file, chapters(name), subjects!inner(name)")
      .eq("exam_id", EXAM_ID)
      .eq("question_kind", "pyq")
      .eq("subjects.name", "Mathematics")
      .range(from, from + PAGE - 1);
    if (error) throw new Error(error.message);
    const rows = data ?? [];
    for (const r of rows) {
      out.push({
        id: String(r.id),
        text: String(r.text),
        pyqYear: (r.pyq_year as number) ?? null,
        pyqMonth: (r.pyq_month as string) ?? null,
        questionNumber: (r.question_number as string) ?? null,
        sourceFile: (r.source_file as string) ?? null,
        chapter: (r as { chapters?: { name?: string } }).chapters?.name ?? "?",
      });
    }
    if (rows.length < PAGE) break;
  }
  return out;
}

const label = (r: BankRow) =>
  `${r.pyqMonth ?? "?"} ${r.pyqYear ?? "?"} ${r.questionNumber ?? "?"}`.replace(/\s+/g, " ").trim();

async function main() {
  const arg = process.argv[2];
  if (!arg) {
    console.error(`usage: tsx scripts/mh-hsc-12-pyq/paper/probe-reuse.ts <paperId|--bank>`);
    console.error(`known: ${Object.keys(PAPERS).join(", ")}`);
    process.exit(1);
  }
  loadEnv();
  const bank = await loadBank(makeClient());

  if (arg === "--bank") {
    const groups = groupByReuseKey(bank);
    console.log(`bank: ${bank.length} Maths PYQ rows · ${groups.length} recurring question(s)`);
    for (const g of groups.sort((a, b) => b.length - a.length)) {
      console.log(`\n  x${g.length}  ${g[0].chapter}`);
      console.log(`      ${g[0].text.slice(0, 100).replace(/\s+/g, " ")}`);
      for (const r of g) console.log(`        ${label(r)}`);
    }
    return;
  }

  const paper = requirePaper(arg);
  const path = questionsJsonPath(arg);
  if (!existsSync(path)) throw new Error(`${arg}: no transcription at ${path}`);
  const qs = JSON.parse(readFileSync(path, "utf8")) as PaperQuestion[];

  const byKey = new Map<string, BankRow[]>();
  for (const r of bank) {
    // Do not report the paper against itself on a re-run.
    if (r.sourceFile === paper.sourceFile) continue;
    const k = reuseKey(r.text);
    (byKey.get(k) ?? byKey.set(k, []).get(k)!).push(r);
  }

  let hits = 0;
  console.log(`${paper.id}  ${paper.month} ${paper.year}  vs ${bank.length} Maths PYQ rows already in the bank\n`);
  for (const q of qs) {
    const prior = byKey.get(reuseKey(q.stem));
    if (!prior?.length) continue;
    hits++;
    console.log(`  ${q.ref.padEnd(13)} ALSO ASKED: ${prior.map(label).join(" · ")}`);
    console.log(`      ${q.stem.slice(0, 100).replace(/\s+/g, " ")}`);
    for (const p of prior) {
      if (p.text.trim() !== q.stem.trim()) {
        console.log(`      ⚠ text differs from ${label(p)} — content_hash will NOT dedupe, and the`);
        console.log(`         older row came from the compilation, so the difference may be ITS defect:`);
        console.log(`         old: ${p.text.slice(0, 96).replace(/\s+/g, " ")}`);
      }
    }
  }
  console.log(
    hits
      ? `\n${hits} of ${qs.length} question(s) have been asked before. That is recurrence, not a defect.`
      : `no recurrence found.`,
  );
}

main().catch((e) => {
  console.error(e.message ?? e);
  process.exit(1);
});
