/**
 * Review a paper's solutions before printing, and keep the result.
 *
 *   npm run reviews:paper                                        # list papers
 *   npm run reviews:paper -- --paper=<id>                        # dump for review
 *   npm run reviews:paper -- --paper=<id> --method=blind_rederivation
 *   npm run reviews:paper -- --paper=<id> --record --apply       # write verdicts back
 *
 * WHY THIS EXISTS. Reviewing a paper's solutions before printing is the review
 * that runs most often here, and until now it recorded nothing: 50 papers, 3,431
 * placements, 3,054 distinct questions, zero rows. Worse, questions repeat across
 * papers, so the same question was being re-derived every time it appeared with
 * no way to know it had already been checked.
 *
 * TWO METHODS, and the choice is not cosmetic:
 *   --method=solution_audit      (default) read the stored solution for coherence
 *   --method=blind_rederivation  derive each answer independently
 * A read-through is cheap breadth but cannot catch a stealth wrong key, so a
 * question confirmed by one is still shown to a blind pass. See coverage.ts.
 *
 * BLIND MEANS BLIND: with --method=blind_rederivation the dump OMITS which option
 * is correct, exactly as scripts/stateboard/dump-mcq.ts does. Otherwise the
 * "independent" derivation is reading the answer it is meant to be checking.
 *
 * Round trip: dump writes data/paper-<id>.review.json with a blank `verdict` per
 * question; fill it in, then --record --apply writes the rows.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { classifyForReview, type PriorReview } from "../../src/lib/reviews/coverage";
import { recordReviews, formatRecordResult } from "../../src/lib/reviews/service";
import { isReviewMethod, isReviewVerdict, REVIEW_VERDICTS } from "../../src/lib/reviews/types";
import type { ReviewInput } from "../../src/lib/reviews/record";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const DATA = join(process.cwd(), "scripts", "reviews", "data");
const IN_CHUNK = 200;

function arg(name: string): string | null {
  return process.argv.find((a) => a.startsWith(`--${name}=`))?.split("=").slice(1).join("=") ?? null;
}

type DumpRow = {
  questionId: string;
  questionNumber: string | null;
  disposition: "review" | "flag";
  /** Present only on a `flag` row: what is already known. */
  known?: string;
  /**
   * Shared stem for a set-based question ("Consider the following for the next
   * two items…"). WITHOUT THIS a set question reads as unanswerable and a
   * reviewer will report a false defect — which is exactly what happened on the
   * first real run of this script.
   */
  context?: string | null;
  /** Siblings sharing this id depend on the same context. */
  setId?: string | null;
  text: string | null;
  options: { label: string; text: string; is_correct?: boolean }[];
  solution: string | null;
  /** FILL THIS IN: one of REVIEW_VERDICTS, or leave blank to record nothing. */
  verdict: string;
  note?: string;
};

async function listPapers(db: SupabaseClient) {
  const { data, error } = await db
    .from("papers")
    .select("id, title, created_at, paper_questions(count)")
    .order("created_at", { ascending: false })
    .limit(30);
  if (error) throw error;
  console.log(`\nRecent papers:\n`);
  for (const p of data ?? []) {
    const n = (p.paper_questions as unknown as { count: number }[])[0]?.count ?? 0;
    console.log(`  ${p.id}  ${String(n).padStart(4)} q  ${p.title}`);
  }
  console.log(`\n  npm run reviews:paper -- --paper=<id>\n`);
}

async function main() {
  const db: SupabaseClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const paperId = arg("paper");
  if (!paperId) return listPapers(db);

  const method = arg("method") ?? "solution_audit";
  if (!isReviewMethod(method)) throw new Error(`--method must be a known review method`);
  const record = process.argv.includes("--record");
  const apply = process.argv.includes("--apply");
  const outPath = join(DATA, `paper-${paperId}.review.json`);

  const { data: paper, error: pErr } = await db
    .from("papers")
    .select("id, title")
    .eq("id", paperId)
    .maybeSingle();
  if (pErr) throw pErr;
  if (!paper) throw new Error(`paper not found: ${paperId}`);

  // ---------------- record ----------------
  if (record) {
    if (!existsSync(outPath)) throw new Error(`no dump to record: ${outPath}`);
    const rows: DumpRow[] = JSON.parse(readFileSync(outPath, "utf8"));
    const filled = rows.filter((r) => r.verdict && r.verdict.trim().length > 0);
    const bad = filled.filter((r) => !isReviewVerdict(r.verdict.trim()));
    if (bad.length) {
      throw new Error(
        `unknown verdict on ${bad.length} row(s), e.g. "${bad[0].verdict}" at ${bad[0].questionNumber}\n` +
          `  allowed: ${REVIEW_VERDICTS.join(" | ")}`
      );
    }

    const hashes = new Map<string, string>();
    const ids = filled.map((r) => r.questionId);
    for (let i = 0; i < ids.length; i += IN_CHUNK) {
      const { data, error } = await db
        .from("questions")
        .select("id, content_hash")
        .in("id", ids.slice(i, i + IN_CHUNK));
      if (error) throw error;
      for (const q of data ?? []) hashes.set(q.id as string, q.content_hash as string);
    }

    const inputs: ReviewInput[] = [];
    for (const r of filled) {
      const hash = hashes.get(r.questionId);
      if (!hash) {
        console.warn(`  ! ${r.questionNumber}: question not found, skipping`);
        continue;
      }
      inputs.push({
        questionId: r.questionId,
        reviewedContentHash: hash,
        method,
        verdict: r.verdict.trim(),
        // Method-qualified: a paper can be reviewed twice at different strengths
        // (a read-through, then a blind re-derivation), and those are DIFFERENT
        // facts. Sharing one label let the dedupe key silently discard the
        // second pass — 118 blind confirmations vanished before this was fixed.
        runLabel: `paper:${paperId}:${method}`,
        note: (r.note ?? `pre-print review of "${paper.title}"`).slice(0, 2000),
      });
    }

    console.log(`\n${rows.length} row(s) in dump, ${inputs.length} carrying a verdict.`);
    const byVerdict = new Map<string, number>();
    for (const i of inputs) byVerdict.set(i.verdict as string, (byVerdict.get(i.verdict as string) ?? 0) + 1);
    for (const [v, n] of byVerdict) console.log(`    ${String(n).padStart(4)}  ${v}`);
    if (!apply) {
      console.log(`\n(dry run — nothing written. re-run with --record --apply)\n`);
      return;
    }
    console.log(`\n${formatRecordResult(await recordReviews(db, inputs), "paper review")}\n`);
    return;
  }

  // ---------------- dump ----------------
  // Re-dumping overwrites the file, so refuse if it already carries filled-in
  // verdicts — that is somebody's review work, and losing it silently is the
  // worst failure this script could have. Found by doing exactly that.
  if (existsSync(outPath) && !process.argv.includes("--force")) {
    const existing: DumpRow[] = JSON.parse(readFileSync(outPath, "utf8"));
    const filled = existing.filter((r) => r.verdict && r.verdict.trim().length > 0).length;
    if (filled > 0) {
      throw new Error(
        `${outPath}\n  already holds ${filled} filled verdict(s). Record them first:\n` +
          `    npm run reviews:paper -- --paper=${paperId} --record --apply\n` +
          `  or pass --force to discard them and re-dump.`
      );
    }
  }

  const { data: placements, error: qErr } = await db
    .from("paper_questions")
    .select(
      "question_id, questions:question_id (id, question_number, context, set_id, text, solution, options(label, text, is_correct))"
    )
    .eq("paper_id", paperId);
  if (qErr) throw qErr;

  const questionIds = (placements ?? []).map((p) => p.question_id as string);
  const priorsById = new Map<string, PriorReview[]>();
  for (let i = 0; i < questionIds.length; i += IN_CHUNK) {
    const { data, error } = await db
      .from("question_reviews")
      .select("question_id, method, verdict, note")
      .in("question_id", questionIds.slice(i, i + IN_CHUNK));
    if (error) throw error;
    for (const r of data ?? []) {
      const list = priorsById.get(r.question_id as string) ?? [];
      list.push({ method: r.method as string, verdict: r.verdict as string });
      priorsById.set(r.question_id as string, list);
    }
  }

  const blind = method === "blind_rederivation";
  const out: DumpRow[] = [];
  let skipped = 0;
  let flagged = 0;
  for (const p of placements ?? []) {
    const q = p.questions as unknown as {
      id: string;
      question_number: string | null;
      context: string | null;
      set_id: string | null;
      text: string | null;
      solution: string | null;
      options: { label: string; text: string; is_correct: boolean }[];
    } | null;
    if (!q) continue;
    const priors = priorsById.get(q.id) ?? [];
    const disposition = classifyForReview(priors, method);
    if (disposition === "skip") {
      skipped++;
      continue;
    }
    if (disposition === "flag") flagged++;
    out.push({
      questionId: q.id,
      questionNumber: q.question_number,
      disposition,
      ...(disposition === "flag"
        ? { known: priors.map((p2) => `${p2.method}=${p2.verdict}`).join(", ") }
        : {}),
      ...(q.context ? { context: q.context, setId: q.set_id } : {}),
      text: q.text,
      // Blind means blind: omit is_correct so the derivation is independent.
      options: (q.options ?? []).map((o) => (blind ? { label: o.label, text: o.text } : o)),
      solution: blind ? null : q.solution,
      verdict: "",
    });
  }
  out.sort((a, b) => (a.questionNumber ?? "").localeCompare(b.questionNumber ?? "", undefined, { numeric: true }));

  mkdirSync(DATA, { recursive: true });
  writeFileSync(outPath, JSON.stringify(out, null, 2), "utf8");

  console.log(`\npaper   ${paper.title}`);
  console.log(`method  ${method}${blind ? "  (key + solution WITHHELD from the dump)" : ""}`);
  console.log(`\n  ${(placements ?? []).length} question(s) in paper`);
  console.log(`  ${skipped} already confirmed at this strength — skipped`);
  console.log(`  ${flagged} carrying a known finding — flagged, see "known"`);
  console.log(`  ${out.length} written to review\n`);
  console.log(`  -> ${outPath}`);
  console.log(`\nFill in each "verdict" (${REVIEW_VERDICTS.join(" | ")}), leave blank to record nothing, then:`);
  console.log(`  npm run reviews:paper -- --paper=${paperId} --record --apply\n`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
