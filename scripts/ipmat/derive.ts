/**
 * Phase 3 pure core: the blind re-derivation loop.
 *
 * WHY. IIM Indore publishes no IPMAT answer key and afterboards claims none, so
 * all 1,445 keys are the source's own derivation — the BLIND lane in this
 * project's key-trust triage. A confidently wrong key is worse than no key, so
 * they have to be re-derived before anything ships PUBLIC.
 *
 * TWO RULES PROTECT THE MEASUREMENT.
 *
 * 1. A PACKET MUST NOT CARRY THE ANSWER. `buildPacket` emits stem, context and
 *    option TEXT and nothing else — no key, no `isCorrect`, no
 *    `numericAnswer`, and not the source's `difficulty` either, since that is
 *    their editorial judgement about the question and a hint we did not earn.
 *    A test walks every field name in the emitted object and fails on anything
 *    that reads like an answer, because the leak that matters is the one nobody
 *    thought to exclude by name. On CDS this project learned that "out of the
 *    repo" is not "out of reach": a quarantined key file still got listed by
 *    name from a shared scratchpad.
 *
 * 2. AGREEMENT IS NOT ACCURACY. `scoreDerivation` reports AGREEMENT with the
 *    source and nothing more, and the field is named so. On CDS General
 *    Knowledge the measured score was 91.6% where dual-blind agreement read
 *    98-99% — agreement bounds disagreement risk, never correlated error. A
 *    disagreement is a LEAD to adjudicate, not a verdict on either side.
 *
 * The blindness available here is ORDERING, which is weaker than the two-reader
 * setup it imitates: one agent cannot be two parties. Derive, freeze the
 * answers against a commit, then score. Adjudicating a disagreement destroys
 * the measurement for that row, so the score is pinned before any adjudication.
 *
 * Spec: tests/ipmat-derive.test.ts.
 */

export type PacketOption = { label: string; text: string };

export type PacketRow = {
  id: string;
  exam: string;
  year: number;
  section: string;
  questionNumber: number;
  format: "mcq" | "numeric";
  text: string;
  context: string | null;
  /** Absent for a numeric row — there is nothing to choose between. */
  options?: PacketOption[];
  /** Sampling stratum, e.g. "VA/Reading Comprehension". Not a hint about the answer. */
  strata?: string;
};

export type Packet = {
  builtAt: string;
  /** The commit the corpus was frozen at, so a score can be reproduced. */
  commit: string | null;
  note: string;
  rows: PacketRow[];
};

/** The shape `build.ts` writes. Only the fields this module reads. */
type BuiltLike = {
  sourceId: string;
  exam: string;
  year: number;
  section: string;
  questionNumber: number;
  sourceTopic: string | null;
  sourceSubTopic: string | null;
  format: "mcq" | "numeric";
  text: string;
  context: string | null;
  options: { label: string; text: string; isCorrect: boolean; imageUrl: string | null }[];
  numericAnswer: string | null;
  dropped: boolean;
  reconstructed: boolean;
  problems: string[];
};

/** A row is derivable only if it is one we would actually commit. */
export function isDerivable(r: BuiltLike): boolean {
  return !r.reconstructed && !r.dropped && r.problems.length === 0;
}

export function strataOf(r: BuiltLike): string {
  return `${r.section}/${r.sourceSubTopic ?? r.sourceTopic ?? "?"}`;
}

/**
 * Build a blind derivation packet.
 *
 * Fields are listed EXPLICITLY rather than spread-and-deleted: a spread carries
 * whatever the source row grows next, and the next field could be the answer.
 */
export function buildPacket(
  built: readonly BuiltLike[],
  opts: { commit?: string | null; note?: string } = {}
): Packet {
  const rows: PacketRow[] = built.filter(isDerivable).map((r) => {
    const row: PacketRow = {
      id: r.sourceId,
      exam: r.exam,
      year: r.year,
      section: r.section,
      questionNumber: r.questionNumber,
      format: r.format,
      text: r.text,
      context: r.context,
      strata: strataOf(r),
    };
    if (r.format === "mcq") {
      row.options = r.options.map((o) => ({ label: o.label, text: o.text }));
    }
    return row;
  });

  return {
    builtAt: new Date().toISOString(),
    commit: opts.commit ?? null,
    note:
      opts.note ??
      "Blind derivation packet. No answer key is present, by design. Derive each row " +
        "independently and record the answer against its id; do not open the corpus.",
    rows,
  };
}

// ----------------------------------------------------------------- scoring

export type Lead = {
  id: string;
  exam: string;
  year: number;
  section: string;
  questionNumber: number;
  format: "mcq" | "numeric";
  ours: string;
  source: string;
  /** Always "LEAD": a disagreement implicates transcription, us, or them. */
  verdict: "LEAD";
};

export type ScoreResult = {
  /** Rows an answer was supplied for AND that parsed. */
  scored: number;
  agreed: number;
  /** Agreement with the source, as a percentage of `scored`. Null when nothing was scored. */
  agreementPct: number | null;
  disagreed: Lead[];
  unanswered: number;
  unknownIds: string[];
  invalid: { id: string; given: string }[];
  bySection: Record<string, { scored: number; agreed: number }>;
};

const LETTERS = ["A", "B", "C", "D", "E", "F"] as const;

/** Normalise an MCQ answer to a letter, accepting "C", "c", " c ", or "3". */
function toLetter(given: string, optionCount: number): string | null {
  const s = given.trim().toUpperCase();
  if (/^[A-F]$/.test(s)) {
    return LETTERS.indexOf(s as (typeof LETTERS)[number]) < optionCount ? s : null;
  }
  if (/^[1-6]$/.test(s)) {
    const i = Number(s) - 1;
    return i < optionCount ? LETTERS[i] : null;
  }
  return null;
}

/** Numeric answers compare by VALUE: "7", "07" and "7.0" are one answer. */
function sameNumber(a: string, b: string): boolean {
  const x = Number(a.trim());
  const y = Number(b.trim());
  if (Number.isNaN(x) || Number.isNaN(y)) return false;
  return x === y;
}

export function scoreDerivation(
  built: readonly BuiltLike[],
  answers: Record<string, string>
): ScoreResult {
  const byId = new Map(built.map((r) => [r.sourceId, r]));
  const disagreed: Lead[] = [];
  const invalid: { id: string; given: string }[] = [];
  const bySection: Record<string, { scored: number; agreed: number }> = {};
  let scored = 0;
  let agreed = 0;

  const unknownIds = Object.keys(answers).filter((id) => !byId.has(id));

  for (const [id, givenRaw] of Object.entries(answers)) {
    const row = byId.get(id);
    if (!row) continue;
    const given = String(givenRaw);

    let ours: string | null;
    let source: string | null;
    if (row.format === "mcq") {
      ours = toLetter(given, row.options.length);
      const idx = row.options.findIndex((o) => o.isCorrect);
      source = idx >= 0 ? LETTERS[idx] : null;
    } else {
      ours = given.trim() === "" ? null : given.trim();
      source = row.numericAnswer;
    }

    if (ours === null || source === null) {
      invalid.push({ id, given });
      continue;
    }

    scored++;
    const slot = (bySection[row.section] ??= { scored: 0, agreed: 0 });
    slot.scored++;

    const match = row.format === "numeric" ? sameNumber(ours, source) : ours === source;
    if (match) {
      agreed++;
      slot.agreed++;
    } else {
      disagreed.push({
        id,
        exam: row.exam,
        year: row.year,
        section: row.section,
        questionNumber: row.questionNumber,
        format: row.format,
        ours,
        source,
        verdict: "LEAD",
      });
    }
  }

  const derivable = built.filter(isDerivable).length;

  return {
    scored,
    agreed,
    // 0/0 is not 100%. Reporting a percentage off an empty sample would be the
    // most confident wrong number available.
    agreementPct: scored === 0 ? null : Math.round((agreed / scored) * 1000) / 10,
    disagreed: disagreed.sort(
      (a, b) => a.exam.localeCompare(b.exam) || a.year - b.year || a.questionNumber - b.questionNumber
    ),
    unanswered: derivable - scored - invalid.length,
    unknownIds,
    invalid,
    bySection,
  };
}

// ---------------------------------------------------------------- sampling

/** Deterministic PRNG, so a sample and therefore a score is reproducible. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Sample `size` rows spread across strata.
 *
 * Round-robins the strata so every one is represented before any is sampled
 * twice — a plain random sample of 60 over 205 subtopics leaves most subtopics
 * unmeasured and lets a whole question type go unchecked.
 */
export function stratifiedSample<T extends { strata?: string; id: string }>(
  pool: readonly T[],
  size: number,
  seed: number
): T[] {
  if (size >= pool.length) return [...pool];
  const rand = mulberry32(seed);

  const buckets = new Map<string, T[]>();
  for (const r of pool) {
    const k = r.strata ?? "?";
    (buckets.get(k) ?? buckets.set(k, []).get(k)!).push(r);
  }
  // Shuffle within each bucket, and shuffle the bucket order too.
  const shuffle = (arr: T[]) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  };
  for (const b of buckets.values()) shuffle(b);
  const order = [...buckets.keys()].sort();
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }

  const out: T[] = [];
  let round = 0;
  while (out.length < size) {
    let took = 0;
    for (const k of order) {
      const b = buckets.get(k)!;
      if (round < b.length) {
        out.push(b[round]);
        took++;
        if (out.length === size) break;
      }
    }
    if (took === 0) break;
    round++;
  }
  return out;
}
