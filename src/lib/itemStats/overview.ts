import type { SupabaseClient } from "@supabase/supabase-js";
import { queryQuestionsByIds, type QuestionRow } from "@/lib/questions/query";
import { aggregateItemStats } from "./aggregate";
import { computeLead, rankLeads, MIN_N_CHIP, MIN_N_HEADLINE, MIN_N_LEAD, type Lead } from "./leads";
import type { ItemStatAggregate, ItemStatRow, OptionLabel } from "./types";

/**
 * The item-statistics work list, for /dashboard/item-stats.
 *
 * Takes its client so a probe can drive it (scripts/itemstats/smoke.ts); the
 * service-role acquisition and the `server-only` guard live in admin.ts.
 *
 * SERVICE-ROLE and superadmin-gated at the page, following the platform-wide
 * dashboard precedent: this pools across every org by construction, so it is
 * cross-tenant data with no org filter. It is also the right gate on its own
 * merits — acting on a lead means editing question content, which is
 * superadmin-only since migration 0056.
 *
 * COST, stated rather than hidden: this pages every `question_item_stats` row
 * (7,100 at the time of writing, ~8 round trips) and aggregates in TS. That is
 * fine for an occasional staff page and will not stay fine forever. The trigger
 * to add a `group by question_id having sum(attempted) >= n` RPC is the same one
 * decision 6 names for the read-path ceiling — deliberately not pre-built,
 * because this project measures before optimising.
 */

const PAGE = 1000;
const IN_CHUNK = 200;

function chunk<T>(xs: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < xs.length; i += size) out.push(xs.slice(i, i + size));
  return out;
}

export type ItemStatCoverage = {
  questionsWithData: number;
  atChipThreshold: number;
  atHeadlineThreshold: number;
  totalAttempts: number;
  sittings: number;
  bySource: { source: string; sittings: number; attempts: number }[];
};

export type LeadRow = {
  lead: Lead;
  question: QuestionRow | null;
  pct: number;
};

export type ItemStatOverview = {
  coverage: ItemStatCoverage;
  leads: LeadRow[];
  /** Leads whose key was chosen by nobody — the sharpest signal, ranked first. */
  keyNeverChosen: number;
};

export async function buildItemStatOverview(
  db: SupabaseClient,
  minRatio: number
): Promise<ItemStatOverview> {

  // ---- every sitting row -----------------------------------------------------
  const raw: Record<string, unknown>[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await db
      .from("question_item_stats")
      .select(
        "question_id, source, source_ref, org_id, cohort_label, seen, attempted, correct, skipped, choice_counts, disc_top_correct, disc_top_n, disc_bottom_correct, disc_bottom_n, key_at_measurement, measured_content_hash, measured_at"
      )
      .order("question_id", { ascending: true })
      .range(from, from + PAGE - 1);
    if (error) break;
    const batch = data ?? [];
    raw.push(...batch);
    if (batch.length < PAGE) break;
  }

  const byQuestion = new Map<string, ItemStatRow[]>();
  for (const r of raw as unknown as {
    question_id: string;
    source: "tracker" | "vault_mock";
    source_ref: string;
    org_id: string | null;
    cohort_label: string | null;
    seen: number;
    attempted: number;
    correct: number;
    skipped: number;
    choice_counts: Record<string, number> | null;
    disc_top_correct: number | null;
    disc_top_n: number | null;
    disc_bottom_correct: number | null;
    disc_bottom_n: number | null;
    key_at_measurement: OptionLabel | null;
    measured_content_hash: string;
    measured_at: string;
  }[]) {
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

  // ---- the LIVE hash, so stale rows drop out ---------------------------------
  const allIds = [...byQuestion.keys()];
  const hashById = new Map<string, string>();
  for (const part of chunk(allIds, IN_CHUNK)) {
    const { data } = await db.from("questions").select("id, content_hash").in("id", part);
    for (const q of (data ?? []) as { id: string; content_hash: string }[]) {
      hashById.set(q.id, q.content_hash);
    }
  }

  const aggs = new Map<string, ItemStatAggregate>();
  for (const [qid, rows] of byQuestion) {
    const hash = hashById.get(qid);
    if (!hash) continue;
    const agg = aggregateItemStats(rows, hash);
    if (agg) aggs.set(qid, agg);
  }

  // ---- coverage ---------------------------------------------------------------
  const sourceTotals = new Map<string, { sittings: number; attempts: number }>();
  let totalAttempts = 0;
  let sittings = 0;
  let atChip = 0;
  let atHeadline = 0;
  for (const agg of aggs.values()) {
    totalAttempts += agg.attempted;
    sittings += agg.sittings;
    if (agg.attempted >= MIN_N_CHIP) atChip += 1;
    if (agg.attempted >= MIN_N_HEADLINE) atHeadline += 1;
    for (const s of agg.bySource) {
      const b = sourceTotals.get(s.source) ?? { sittings: 0, attempts: 0 };
      b.sittings += s.sittings;
      b.attempts += s.attempted;
      sourceTotals.set(s.source, b);
    }
  }

  // ---- leads ------------------------------------------------------------------
  // Only questions that could possibly qualify need a key looked up.
  const candidates = [...aggs.entries()]
    .filter(([, agg]) => agg.attempted >= MIN_N_LEAD)
    .map(([id]) => id);

  const keyById = new Map<string, OptionLabel>();
  const multiKeyed = new Set<string>();
  for (const part of chunk(candidates, IN_CHUNK)) {
    const { data } = await db
      .from("options")
      .select("question_id, label")
      .in("question_id", part)
      .eq("is_correct", true);
    for (const o of (data ?? []) as { question_id: string; label: OptionLabel }[]) {
      if (keyById.has(o.question_id)) multiKeyed.add(o.question_id);
      keyById.set(o.question_id, o.label);
    }
  }

  const leads: Lead[] = [];
  for (const qid of candidates) {
    // A question with more than one correct option has no single key to compare
    // a distractor against; skip rather than pick one arbitrarily.
    const key = multiKeyed.has(qid) ? null : (keyById.get(qid) ?? null);
    const lead = computeLead(qid, aggs.get(qid)!, key);
    if (lead) leads.push(lead);
  }

  const ranked = rankLeads(leads);
  const shown = ranked.filter((l) => l.ratio === null || l.ratio >= minRatio);

  // Display rows only for what is actually listed — the wide fetch stays small.
  const questions = await queryQuestionsByIds(
    db,
    shown.map((l) => l.questionId)
  );
  const qById = new Map(questions.map((q) => [q.id, q]));

  return {
    coverage: {
      questionsWithData: aggs.size,
      atChipThreshold: atChip,
      atHeadlineThreshold: atHeadline,
      totalAttempts,
      sittings,
      bySource: [...sourceTotals.entries()]
        .map(([source, b]) => ({ source, ...b }))
        .sort((a, b) => a.source.localeCompare(b.source)),
    },
    leads: shown.map((lead) => ({
      lead,
      question: qById.get(lead.questionId) ?? null,
      pct: Math.round((aggs.get(lead.questionId)?.pValue ?? 0) * 100),
    })),
    keyNeverChosen: ranked.filter((l) => l.ratio === null).length,
  };
}
