/**
 * Review-coverage report — read-only.
 *
 *   npm run reviews:report              # whole bank
 *   npm run reviews:report -- --exam=NDA
 *   npm run reviews:report -- --stale   # only the stale-review section
 *
 * Answers the three questions the Decisions log cannot:
 *
 *   1. WHICH QUESTIONS HAS NOBODY CHECKED?  A question with no review row is not
 *      "reviewed and fine" — it is unexamined, and until 0074 the two were
 *      indistinguishable. NOTE the honest wording used throughout: no row means
 *      NOT RECORDED, which for anything predating the table is not the same as
 *      not reviewed.
 *   2. WHERE IS OUR CORRECTION RATE SUSPICIOUS?  Per run, `corrected` (we were
 *      wrong) is kept apart from `defects` (the source was wrong). The Decisions
 *      log asserts in prose that the Balbharati key is wrong ~4x as often as our
 *      authored answers; this is that claim as data.
 *   3. WHICH REVIEWS NO LONGER DESCRIBE THEIR QUESTION?  A review carries the
 *      content_hash it was made against, so a stem repaired afterwards makes the
 *      verdict stale — visible here rather than silently trusted.
 *
 * COUNTING DISCIPLINE: totals come from the get_chapter_facets aggregate called
 * on the ANON client (RLS scopes it to PUBLIC, which is what we want to report),
 * never from a row-derived .select() — see the PostgREST 1000-row cap in
 * CLAUDE.md. Review rows are paged for the same reason.
 */
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { summarizeRuns } from "../../src/lib/reviews/summary";
import { isReviewStale, latestReviewByQuestion } from "../../src/lib/reviews/staleness";
import { REVIEW_VERDICT_LABELS, type ReviewVerdict } from "../../src/lib/reviews/types";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const PAGE = 1000;
/**
 * Chunk size for `.in("id", [...])`. Far smaller than PAGE because PostgREST
 * passes the list in the URL: ~833 uuids exceeds the request-line limit and the
 * server answers "Bad Request". Paging the RESULT and chunking the FILTER are
 * two different limits and only one of them is 1000.
 */
const IN_CHUNK = 200;

type ReviewRow = {
  question_id: string;
  reviewed_at: string;
  reviewed_content_hash: string;
  method: string;
  verdict: string;
  run_label: string;
  source: string;
};

async function pageAll<T>(
  fetchPage: (from: number, to: number) => PromiseLike<{ data: T[] | null; error: unknown }>
): Promise<T[]> {
  const out: T[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await fetchPage(from, from + PAGE - 1);
    if (error) throw error;
    const rows = data ?? [];
    out.push(...rows);
    if (rows.length < PAGE) return out;
  }
}

function pct(part: number, whole: number): string {
  if (whole === 0) return "—";
  return `${((100 * part) / whole).toFixed(1)}%`;
}

async function main() {
  const args = process.argv.slice(2);
  const examFilter = args.find((a) => a.startsWith("--exam="))?.split("=")[1] ?? null;
  const staleOnly = args.includes("--stale");

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const admin: SupabaseClient = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  // Anon so the facet aggregate is RLS-scoped to PUBLIC — the corpus students
  // actually see, and the one the coverage claim is about.
  const anon: SupabaseClient = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    auth: { persistSession: false },
  });

  const reviews = await pageAll<ReviewRow>((from, to) =>
    admin
      .from("question_reviews")
      .select("question_id, reviewed_at, reviewed_content_hash, method, verdict, run_label, source")
      .order("reviewed_at", { ascending: true })
      .range(from, to)
  );

  console.log(`\n=== Review provenance (question_reviews, migration 0074) ===\n`);
  if (reviews.length === 0) {
    console.log("No reviews recorded yet.");
    console.log("A question with no row is NOT RECORDED as reviewed — which, for");
    console.log("anything ingested before this table existed, is not the same as");
    console.log("not reviewed. See the Decisions log for the narrative record.\n");
  }

  // ---- 2. Per-run rollup -------------------------------------------------
  if (!staleOnly && reviews.length > 0) {
    const summaries = summarizeRuns(reviews);
    console.log(`Runs (${summaries.length}), most-corrected first:\n`);
    console.log(
      "  run".padEnd(52) + "revd".padStart(6) + "conf".padStart(6) + "corr".padStart(6) +
      "defect".padStart(8) + "unver".padStart(7) + "%corr".padStart(8)
    );
    for (const s of summaries) {
      console.log(
        `  ${s.runLabel.slice(0, 49).padEnd(50)}` +
          String(s.reviewed).padStart(6) +
          String(s.confirmed).padStart(6) +
          String(s.corrected).padStart(6) +
          String(s.defects).padStart(8) +
          String(s.unverifiable).padStart(7) +
          `${s.pctCorrected}%`.padStart(8)
      );
    }
    const backfilled = reviews.filter((r) => r.source === "backfilled").length;
    if (backfilled > 0) {
      console.log(
        `\n  (${backfilled} of ${reviews.length} rows are source='backfilled' — reconstructed` +
          `\n   from a committed artifact, not written by the reviewing pass.)`
      );
    }
    console.log("");
  }

  // ---- 3. Stale reviews --------------------------------------------------
  const reviewedIds = [...new Set(reviews.map((r) => r.question_id))];
  const questionById = new Map<
    string,
    { content_hash: string; chapter_id: string | null; question_number: string | null }
  >();
  for (let i = 0; i < reviewedIds.length; i += IN_CHUNK) {
    const { data, error } = await admin
      .from("questions")
      .select("id, content_hash, chapter_id, question_number")
      .in("id", reviewedIds.slice(i, i + IN_CHUNK));
    if (error) throw error;
    for (const q of data ?? []) {
      questionById.set(q.id as string, {
        content_hash: q.content_hash as string,
        chapter_id: (q.chapter_id as string) ?? null,
        question_number: (q.question_number as string) ?? null,
      });
    }
  }

  const latest = latestReviewByQuestion(reviews);
  const stale = [...latest.values()].filter((r) =>
    isReviewStale(r, questionById.get(r.question_id)?.content_hash)
  );
  console.log(`Stale reviews: ${stale.length} (the question changed after review)`);
  for (const r of stale.slice(0, 25)) {
    const q = questionById.get(r.question_id);
    console.log(
      `  ${r.question_id.slice(0, 8)}  ${(q?.question_number ?? "?").padEnd(14)} ` +
        `${REVIEW_VERDICT_LABELS[r.verdict as ReviewVerdict] ?? r.verdict}  (${r.run_label})`
    );
  }
  if (stale.length > 25) console.log(`  … and ${stale.length - 25} more`);
  console.log("");
  if (staleOnly) return;

  // ---- 1. Coverage -------------------------------------------------------
  const [{ data: exams }, { data: subjects }, { data: chapters }] = await Promise.all([
    anon.from("exams").select("id, name").order("name"),
    anon.from("subjects").select("id, name, exam_id"),
    anon.from("chapters").select("id, name, subject_id"),
  ]);
  if ((chapters ?? []).length >= PAGE) {
    console.log(
      `⚠ ${chapters!.length} chapters returned — at/over the PostgREST page cap.\n` +
        `  Coverage below may be incomplete; this query needs paging.\n`
    );
  }

  const { data: facets, error: facetErr } = await anon.rpc("get_chapter_facets", {
    p_exam_id: null,
    p_subject_id: null,
    p_kind: "all",
  });
  if (facetErr) throw facetErr;

  const publicByChapter = new Map<string, number>();
  for (const f of (facets ?? []) as { chapter_id: string; q_count: number }[]) {
    if (f.chapter_id) publicByChapter.set(f.chapter_id, f.q_count);
  }

  const reviewedByChapter = new Map<string, number>();
  for (const id of reviewedIds) {
    const chapterId = questionById.get(id)?.chapter_id;
    if (chapterId) reviewedByChapter.set(chapterId, (reviewedByChapter.get(chapterId) ?? 0) + 1);
  }

  const subjectById = new Map((subjects ?? []).map((s) => [s.id as string, s]));
  const examById = new Map((exams ?? []).map((e) => [e.id as string, e]));

  type Bucket = { exam: string; subject: string; total: number; reviewed: number };
  const bySubject = new Map<string, Bucket>();
  for (const c of chapters ?? []) {
    const total = publicByChapter.get(c.id as string) ?? 0;
    if (total === 0) continue;
    const subject = subjectById.get(c.subject_id as string);
    const exam = subject ? examById.get(subject.exam_id as string) : null;
    const examName = (exam?.name as string) ?? "—";
    if (examFilter && examName.toLowerCase() !== examFilter.toLowerCase()) continue;
    const key = `${examName} ${subject?.name ?? "—"}`;
    const bucket = bySubject.get(key) ?? {
      exam: examName,
      subject: (subject?.name as string) ?? "—",
      total: 0,
      reviewed: 0,
    };
    bucket.total += total;
    bucket.reviewed += reviewedByChapter.get(c.id as string) ?? 0;
    bySubject.set(key, bucket);
  }

  const buckets = [...bySubject.values()].sort(
    (a, b) => b.total - a.total || a.exam.localeCompare(b.exam)
  );
  const grandTotal = buckets.reduce((n, b) => n + b.total, 0);
  const grandReviewed = buckets.reduce((n, b) => n + b.reviewed, 0);

  console.log(`Coverage — PUBLIC questions with at least one review on record:\n`);
  console.log("  exam / subject".padEnd(52) + "public".padStart(9) + "recorded".padStart(10) + "%".padStart(8));
  for (const b of buckets) {
    console.log(
      `  ${`${b.exam} · ${b.subject}`.slice(0, 49).padEnd(50)}` +
        String(b.total).padStart(9) +
        String(b.reviewed).padStart(10) +
        pct(b.reviewed, b.total).padStart(8)
    );
  }
  console.log(
    `\n  ${"TOTAL".padEnd(50)}` +
      String(grandTotal).padStart(9) +
      String(grandReviewed).padStart(10) +
      pct(grandReviewed, grandTotal).padStart(8)
  );
  console.log(
    `\n  "recorded" counts rows in question_reviews. A 0 means NOT RECORDED —\n` +
      `  for corpora audited before 2026-08-11 the review happened but was only\n` +
      `  ever written to the Decisions log. It does not mean unexamined.\n`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
