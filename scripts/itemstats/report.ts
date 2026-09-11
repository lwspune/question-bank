/**
 * Read `question_item_stats` back THROUGH the pure core and report on it.
 *
 *   npx tsx scripts/itemstats/report.ts            # coverage + the leads queue
 *   npx tsx scripts/itemstats/report.ts --ratio=3  # narrow the queue
 *   npx tsx scripts/itemstats/report.ts --all      # every lead, not just >= ratio
 *
 * Read-only. Two jobs:
 *
 *  1. COVERAGE — how many questions actually clear each threshold, per source.
 *     Expect this to be small; at the time of writing it is ~2% of the bank, and
 *     that is the honest state, not a defect.
 *
 *  2. THE LEADS QUEUE — questions where a distractor outpulled the keyed answer.
 *     A LEAD, NEVER A VERDICT: it means the key is wrong, OR the question is
 *     hard and the distractor is a well-built trap (which is what a good PYQ
 *     does), OR there is a systematic misconception worth teaching to. The data
 *     cannot separate them. Adjudication is a human reading the question, and
 *     the outcome belongs in `question_reviews` (migration 0074).
 *
 * Going through `aggregateItemStats`/`computeLead` rather than re-deriving in
 * SQL is deliberate: it means this report and the /browse card can never
 * disagree about what a question's number is.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { aggregateItemStats } from "@/lib/itemStats/aggregate";
import {
  computeLead,
  rankLeads,
  LEAD_RATIO_DEFAULT,
  MIN_N_CHIP,
  MIN_N_HEADLINE,
  type Lead,
} from "@/lib/itemStats/leads";
import type { ItemStatRow, OptionLabel } from "@/lib/itemStats/types";
import { chunk, pageAll, IN_CHUNK } from "./db";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

function flagNumber(name: string, fallback: number): number {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  if (!hit) return fallback;
  const v = Number(hit.split("=")[1]);
  return Number.isFinite(v) ? v : fallback;
}

async function main() {
  const minRatio = process.argv.includes("--all") ? 0 : flagNumber("ratio", LEAD_RATIO_DEFAULT);
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const raw = (await pageAll((f, t) =>
    db
      .from("question_item_stats")
      .select(
        "question_id, source, source_ref, org_id, cohort_label, seen, attempted, correct, skipped, choice_counts, disc_top_correct, disc_top_n, disc_bottom_correct, disc_bottom_n, key_at_measurement, measured_content_hash, measured_at"
      )
      .order("question_id", { ascending: true })
      .range(f, t)
  )) as unknown as {
    question_id: string;
    source: "tracker" | "vault_mock";
    source_ref: string;
    org_id: string | null;
    cohort_label: string | null;
    seen: number;
    attempted: number;
    correct: number;
    skipped: number;
    choice_counts: Record<string, number>;
    disc_top_correct: number | null;
    disc_top_n: number | null;
    disc_bottom_correct: number | null;
    disc_bottom_n: number | null;
    key_at_measurement: OptionLabel | null;
    measured_content_hash: string;
    measured_at: string;
  }[];

  const byQuestion = new Map<string, ItemStatRow[]>();
  for (const r of raw) {
    const rows = byQuestion.get(r.question_id) ?? [];
    rows.push({
      questionId: r.question_id,
      source: r.source,
      sourceRef: r.source_ref,
      orgId: r.org_id,
      cohortLabel: r.cohort_label,
      seen: r.seen,
      attempted: r.attempted,
      correct: r.correct,
      skipped: r.skipped,
      choiceCounts: r.choice_counts ?? {},
      discTopCorrect: r.disc_top_correct,
      discTopN: r.disc_top_n,
      discBottomCorrect: r.disc_bottom_correct,
      discBottomN: r.disc_bottom_n,
      keyAtMeasurement: r.key_at_measurement,
      measuredContentHash: r.measured_content_hash,
      measuredAt: r.measured_at,
    });
    byQuestion.set(r.question_id, rows);
  }

  // The LIVE hash and the LIVE key. A row measured against a different version
  // of the question is stale and contributes nothing — that filtering is inside
  // aggregateItemStats, which is why the hash is passed rather than assumed.
  const ids = [...byQuestion.keys()];
  const hashById = new Map<string, string>();
  const textById = new Map<string, string>();
  for (const part of chunk(ids, IN_CHUNK)) {
    const qs = (await pageAll((f, t) =>
      db.from("questions").select("id, content_hash, text").in("id", part).range(f, t)
    )) as unknown as { id: string; content_hash: string; text: string }[];
    for (const q of qs) {
      hashById.set(q.id, q.content_hash);
      textById.set(q.id, q.text);
    }
  }
  const keyById = new Map<string, OptionLabel>();
  const multi = new Set<string>();
  for (const part of chunk(ids, IN_CHUNK)) {
    const opts = (await pageAll((f, t) =>
      db
        .from("options")
        .select("question_id, label")
        .in("question_id", part)
        .eq("is_correct", true)
        .range(f, t)
    )) as unknown as { question_id: string; label: OptionLabel }[];
    for (const o of opts) {
      if (keyById.has(o.question_id)) multi.add(o.question_id);
      keyById.set(o.question_id, o.label);
    }
  }

  let withData = 0;
  let nChip = 0;
  let nHeadline = 0;
  let staleQuestions = 0;
  const perSource = new Map<string, { sittings: number; attempted: number }>();
  const leads: Lead[] = [];

  for (const [qid, rows] of byQuestion) {
    const hash = hashById.get(qid);
    if (!hash) continue;
    const agg = aggregateItemStats(rows, hash);
    if (agg === null) {
      if (rows.every((r) => r.measuredContentHash !== hash)) staleQuestions += 1;
      continue;
    }
    withData += 1;
    if (agg.attempted >= MIN_N_CHIP) nChip += 1;
    if (agg.attempted >= MIN_N_HEADLINE) nHeadline += 1;
    for (const s of agg.bySource) {
      const b = perSource.get(s.source) ?? { sittings: 0, attempted: 0 };
      b.sittings += s.sittings;
      b.attempted += s.attempted;
      perSource.set(s.source, b);
    }
    const lead = computeLead(qid, agg, multi.has(qid) ? null : (keyById.get(qid) ?? null));
    if (lead) leads.push(lead);
  }

  const ranked = rankLeads(leads);
  const shown = ranked.filter((l) => l.ratio === null || l.ratio >= minRatio);

  console.log("COVERAGE");
  console.log(`  questions with usable data   ${withData}`);
  console.log(`  ... at n>=${MIN_N_CHIP} (chip shows)      ${nChip}`);
  console.log(`  ... at n>=${MIN_N_HEADLINE} (firm)             ${nHeadline}`);
  console.log(`  questions entirely stale     ${staleQuestions}`);
  for (const [source, b] of [...perSource.entries()].sort()) {
    console.log(`  ${source.padEnd(12)} ${b.sittings} sittings, ${b.attempted} attempts`);
  }

  console.log(`\nLEADS  (ratio >= ${minRatio || "any"}; a lead is not a verdict)`);
  console.log(`  total leads                  ${ranked.length}`);
  console.log(`  key chosen by NOBODY         ${ranked.filter((l) => l.ratio === null).length}`);
  console.log(`  ratio >= 2                   ${ranked.filter((l) => l.ratio !== null && l.ratio >= 2).length}`);
  console.log(`  ratio >= 3                   ${ranked.filter((l) => l.ratio !== null && l.ratio >= 3).length}`);

  console.log(`\n  top ${Math.min(15, shown.length)} of ${shown.length}:`);
  for (const l of shown.slice(0, 15)) {
    const ratio = l.ratio === null ? "KEY NEVER CHOSEN" : `${l.ratio.toFixed(1)}x`;
    const stem = (textById.get(l.questionId) ?? "").replace(/\s+/g, " ").slice(0, 60);
    console.log(
      `    ${ratio.padEnd(17)} n=${String(l.attempted).padEnd(4)} key=${l.keyCount} vs ${l.topDistractor?.label}=${l.topDistractor?.count}  ${l.questionId.slice(0, 8)}  ${stem}`
    );
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
