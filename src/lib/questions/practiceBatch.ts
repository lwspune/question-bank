/**
 * Pure helpers for the answer-reveal practice signal.
 *
 * WHY: revealing an answer is the one discrete act of retrieval practice the
 * question bank produces — the student tried, then checked. Until now it was
 * computed client-side by revealMeter.ts and thrown away, which left the bank
 * (70k questions, 317 landing pages) recording NOTHING when it was used. A
 * "viewed" event was deliberately not chosen: scrolling past a question is not
 * practice, and it would be high-volume and low-meaning.
 *
 * Signed-in students only. Anonymous visitors are not tracked: a retention claim
 * needs a stable identity across visits, which for an anonymous visitor means
 * minting a persistent device id — and that is behavioural monitoring of an
 * audience that is largely under 18. Aggregate anon counts are already
 * approximated by Vercel Analytics.
 *
 * Batching matters: a student revealing 40 answers must be one request, not 40.
 * The client accumulates ids and flushes on an interval and on page hide.
 *
 * Spec: tests/practice-batch.test.ts.
 */

/** Most ids in one flush. Bounds both the request body and the client queue. */
export const PRACTICE_BATCH_MAX = 50;

/**
 * WHERE the reveal happened. A worked-example reveal in a /guide playbook and a
 * reveal on /browse are the same ACT on the same question row, but they are
 * different PRODUCTS — and until this field existed they were indistinguishable
 * in user_activity, which is precisely why the PMF readout could not say whether
 * the guides contribute anything to retention.
 *
 * Closed list, because the value is written into metadata and later queried BY
 * NAME in get_pmf_snapshot; a free-text surface would fragment the feature rows
 * silently. Adding one means adding it here and teaching the RPC about it.
 *
 * NOT a surface: /blog and the guide prose itself. Those emit nothing because
 * they contain no discrete act — only "viewed", which is not practice. Nor are
 * the /notes Level-1 practice reps: those DO have a reveal, but the reps are
 * authored editorial prose rather than bank rows, so there is no question id to
 * record. The act exists and the referent does not — a different problem from
 * this one, and not one a surface value can fix.
 *
 * `board` was added 2026-09-18, a day after `guide` and for the mirror-image
 * reason. The board reader shares useRevealMeter with /browse, so it had been
 * emitting since 0105 — with no surface, therefore under the bank default.
 * Recorded-but-indistinguishable is the harder failure to spot: the events are
 * all present, so nothing looks missing; they are simply filed under another
 * product, and the textbook reader cannot be measured for retention at all.
 */
export const PRACTICE_SURFACES = ["bank", "guide", "board"] as const;

export type PracticeSurface = (typeof PRACTICE_SURFACES)[number];

/**
 * What a body with no `surface` means. Back-compat is the reason this exists and
 * it is about DEPLOY, not tidiness: a tab opened before the surface field
 * shipped still sendBeacon()s the old `{questionIds}` body when the page hides,
 * and every one of those reveals genuinely was a bank reveal.
 */
export const DEFAULT_PRACTICE_SURFACE: PracticeSurface = "bank";

function isPracticeSurface(v: unknown): v is PracticeSurface {
  return typeof v === "string" && (PRACTICE_SURFACES as readonly string[]).includes(v);
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

/**
 * Add a revealed question to the pending queue. Deduped (a re-reveal is not a
 * second practice event) and capped — when full the OLDEST is dropped, so a long
 * session keeps the most recent work rather than refusing all new work.
 */
export function addToBatch(batch: readonly string[], questionId: string): string[] {
  if (batch.includes(questionId)) return [...batch];
  const next = [...batch, questionId];
  return next.length > PRACTICE_BATCH_MAX ? next.slice(next.length - PRACTICE_BATCH_MAX) : next;
}

export type ParsedBatch =
  | { ok: true; ids: string[]; surface: PracticeSurface }
  | { ok: false; error: string };

/**
 * Validate an untrusted batch body. The client is not trusted to have deduped,
 * lowercased or bounded anything.
 *
 * An oversized batch is REJECTED rather than truncated: silently dropping the
 * tail would leave the client believing it had recorded work we never stored,
 * and neither side would ever find out. An unrecognised `surface` is rejected
 * for the same reason turned inside out: defaulting it to the bank would file a
 * guide reveal under the wrong product, which is the one mistake this field
 * exists to prevent and the one neither end could ever detect.
 */
export function parsePracticeBatch(raw: unknown): ParsedBatch {
  if (typeof raw !== "object" || raw === null) return { ok: false, error: "Invalid body." };

  const rawSurface = (raw as { surface?: unknown }).surface;
  let surface: PracticeSurface = DEFAULT_PRACTICE_SURFACE;
  if (rawSurface !== undefined) {
    if (!isPracticeSurface(rawSurface)) return { ok: false, error: "Unknown surface." };
    surface = rawSurface;
  }

  const ids = (raw as { questionIds?: unknown }).questionIds;
  if (!Array.isArray(ids)) return { ok: false, error: "questionIds must be an array." };
  if (ids.length === 0) return { ok: false, error: "questionIds is empty." };
  if (ids.length > PRACTICE_BATCH_MAX) {
    return { ok: false, error: `Too many ids in one batch (max ${PRACTICE_BATCH_MAX}).` };
  }

  const out: string[] = [];
  for (const id of ids) {
    if (typeof id !== "string") return { ok: false, error: "questionIds must be strings." };
    const norm = id.trim().toLowerCase();
    if (!UUID_RE.test(norm)) return { ok: false, error: "questionIds must be uuids." };
    if (!out.includes(norm)) out.push(norm);
  }
  return { ok: true, ids: out, surface };
}
