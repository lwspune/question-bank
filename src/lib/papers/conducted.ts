/**
 * Exposure — has this question already been CONDUCTED for a cohort?
 *
 * The sibling of `usage.ts`, and deliberately a separate fact. `usage.ts`
 * answers "is this question in another VAULT paper", which a question can be
 * without a single student ever seeing it. This answers "did students actually
 * sit it", which the vault only learned when the nda-tracker item-statistics
 * export landed (ITEM_STATS.md). A teacher needs both and they are not
 * interchangeable — nor are they merged, because one is a drafting fact and the
 * other is a classroom one.
 *
 * ORG-SCOPED, EXPLICITLY, and this is the one thing to get right here. The RLS
 * policy on `question_item_stats` is deliberately global — the displayed
 * STATISTIC pools across every institute, because how hard an item is is a
 * property of the item. Exposure is not: another institute's batch names are
 * their internal data and mean nothing here. So the org filter lives in the
 * QUERY, and cannot be inherited from the policy.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { parseCohortLabel } from "@/lib/itemStats/exposure";

/** One sitting this question was conducted in. */
export type ConductedRef = {
  /** The tracker's exam id. Opaque — shown to nobody, used to dedupe. */
  sittingId: string;
  /** Batch names as the source spelled them; one sitting often runs for several. */
  cohorts: string[];
  date: string | null;
};

/** Raw row shape from `question_item_stats`. */
export type ConductedQueryRow = {
  question_id: string;
  source_ref: string;
  cohort_label: string | null;
  measured_at: string | null;
};

/**
 * Group raw rows into question_id → ConductedRef[], deduped by sitting and
 * sorted most-recent first. Pure — the round-trip lives in
 * getConductedExposure.
 *
 * A row naming no cohort is DROPPED rather than kept with an empty list: an
 * online mock records no cohort, and "nobody sat it in a class" is a different
 * claim from "we do not record who sat it".
 */
export function summarizeConducted(
  rows: ConductedQueryRow[]
): Map<string, ConductedRef[]> {
  const byQuestion = new Map<string, Map<string, ConductedRef>>();
  for (const r of rows) {
    const cohorts = parseCohortLabel(r.cohort_label);
    if (cohorts.length === 0) continue;
    let sittings = byQuestion.get(r.question_id);
    if (!sittings) {
      sittings = new Map();
      byQuestion.set(r.question_id, sittings);
    }
    sittings.set(r.source_ref, {
      sittingId: r.source_ref,
      cohorts,
      date: r.measured_at,
    });
  }

  const out = new Map<string, ConductedRef[]>();
  for (const [questionId, sittings] of byQuestion) {
    out.set(
      questionId,
      Array.from(sittings.values()).sort((a, b) =>
        (b.date ?? "").localeCompare(a.date ?? "")
      )
    );
  }
  return out;
}

function fmtDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * A short chip label.
 *
 * When THIS paper's batch is among the cohorts of ANY sitting, that is the
 * strong case and says so: the cohort in front of you has already seen this
 * question. Otherwise it is informational — a question may legitimately recur
 * across cohorts, which is the same rule the cross-paper warning follows.
 *
 * The batch is matched across EVERY sitting, not just the most recent: a repeat
 * three papers ago is still a repeat.
 */
export function formatConductedLabel(
  refs: ConductedRef[],
  opts: { batchName?: string | null } = {}
): string {
  if (refs.length === 0) return "";
  const [first, ...rest] = refs;
  const extra = rest.length > 0 ? ` +${rest.length}` : "";

  const batchName = opts.batchName?.trim();
  if (batchName) {
    const own = refs.find((r) => r.cohorts.includes(batchName));
    if (own) {
      const when = fmtDate(own.date);
      return `Already sat by this batch${when ? ` — ${when}` : ""}${extra}`;
    }
  }

  const when = fmtDate(first.date);
  return `Conducted for ${first.cohorts.join(", ")}${when ? ` — ${when}` : ""}${extra}`;
}

/**
 * Which of `candidateIds` this org has already conducted, and for whom.
 *
 * Keyed by the candidate id list (bounded by page/cart size), so it is immune to
 * the PostgREST 1000-row cap. Reads through the caller's client, so a non-member
 * gets nothing from RLS regardless of the org filter.
 */
export async function getConductedExposure(
  client: SupabaseClient,
  candidateIds: string[],
  orgId: string
): Promise<Map<string, ConductedRef[]>> {
  const ids = Array.from(new Set(candidateIds.filter(Boolean)));
  if (ids.length === 0) return new Map();

  const { data, error } = await client
    .from("question_item_stats")
    .select("question_id, source_ref, cohort_label, measured_at")
    .in("question_id", ids)
    // See the header: the statistic is global, the exposure is not.
    .eq("org_id", orgId)
    .not("cohort_label", "is", null);

  if (error) throw new Error(`getConductedExposure: ${error.message}`);
  return summarizeConducted((data ?? []) as unknown as ConductedQueryRow[]);
}
