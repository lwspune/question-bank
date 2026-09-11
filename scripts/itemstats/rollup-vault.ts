/**
 * Roll vault-native /mock responses up into `question_item_stats`.
 *
 *   npx tsx scripts/itemstats/rollup-vault.ts            # dry run, writes nothing
 *   npx tsx scripts/itemstats/rollup-vault.ts --apply
 *
 * One row per (question, mock). NOT one row per question — see ITEM_STATS.md
 * decision 6. Idempotent: re-running upserts the same sittings.
 *
 * THE INTAKE FILTERS ARE THE WHOLE POINT OF THIS SCRIPT, and they are what make
 * the vault's numbers poolable with a proctored OMR sitting at all. Measured on
 * production 2026-09-11:
 *
 *   • 24% of submitted attempts (135 of 565) are a RETAKE, and the review screen
 *     shows the answers — contaminated by construction. First attempt only.
 *   • 28 submitted attempts answered ZERO questions and 43 answered under 20%;
 *     mean engagement is 57.4%. An abandoned browser tab is not a student
 *     skipping a hard item. Hence the engagement floor.
 *   • 42% of all answer rows are blank. `attempted` therefore counts a FILLED
 *     answer only, and p = correct/attempted, never correct/seen.
 *
 * Grace questions are excluded outright: `grace` awards full marks to everyone
 * regardless of response, so the row is meaningless as evidence.
 *
 * Correctness comes from `verdictFor` — the app's own single source of that
 * judgement — rather than a second comparison written here. Two implementations
 * of "is this right" is the drift this repo has already paid for twice.
 */
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { verdictFor, type MockAnswerKey, type OptionLabel } from "@/lib/mocks/answers";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

/** Below this share of a paper answered, the attempt is abandonment, not evidence. */
const ENGAGEMENT_FLOOR = 0.2;

/** PostgREST truncates a `.select()` at 1000 rows with no error. Page everything. */
const PAGE = 1000;
/** A `.in()` list rides in the URL; ~833 uuids has been observed to 400. */
const IN_CHUNK = 200;

type Row = Record<string, unknown>;

async function pageAll(
  build: (from: number, to: number) => PromiseLike<{ data: Row[] | null; error: unknown }>
): Promise<Row[]> {
  const out: Row[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await build(from, from + PAGE - 1);
    if (error) throw new Error(`read failed: ${JSON.stringify(error)}`);
    const batch = data ?? [];
    out.push(...batch);
    if (batch.length < PAGE) return out;
  }
}

function chunk<T>(xs: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < xs.length; i += size) out.push(xs.slice(i, i + size));
  return out;
}

async function main() {
  const apply = process.argv.includes("--apply");
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  // ---- 1. Submitted attempts, deduped to the FIRST per (user, mock) ----------
  const attempts = (await pageAll((f, t) =>
    db
      .from("mock_attempts")
      .select("id, user_id, mock_id, started_at, score")
      .not("submitted_at", "is", null)
      .order("started_at", { ascending: true })
      .range(f, t)
  )) as unknown as {
    id: string;
    user_id: string;
    mock_id: string;
    started_at: string;
    score: number | null;
  }[];

  const firstSeen = new Set<string>();
  const firstAttempts = attempts.filter((a) => {
    const key = `${a.user_id}|${a.mock_id}`;
    if (firstSeen.has(key)) return false;
    firstSeen.add(key);
    return true;
  });
  const retakesDropped = attempts.length - firstAttempts.length;

  // ---- 2. Their answers -----------------------------------------------------
  const attemptById = new Map(firstAttempts.map((a) => [a.id, a]));
  const answers: {
    attempt_id: string;
    question_id: string;
    selected_label: OptionLabel | null;
    numeric_response: number | null;
  }[] = [];
  for (const ids of chunk([...attemptById.keys()], IN_CHUNK)) {
    const batch = (await pageAll((f, t) =>
      db
        .from("attempt_answers")
        .select("attempt_id, question_id, selected_label, numeric_response")
        .in("attempt_id", ids)
        .order("question_id", { ascending: true })
        .range(f, t)
    )) as unknown as typeof answers;
    answers.push(...batch);
  }

  // ---- 3. Engagement floor --------------------------------------------------
  const perAttempt = new Map<string, { rows: number; answered: number }>();
  for (const a of answers) {
    const e = perAttempt.get(a.attempt_id) ?? { rows: 0, answered: 0 };
    e.rows += 1;
    if (a.selected_label !== null || a.numeric_response !== null) e.answered += 1;
    perAttempt.set(a.attempt_id, e);
  }
  const kept = new Set<string>();
  for (const [id, e] of perAttempt) {
    if (e.rows > 0 && e.answered / e.rows >= ENGAGEMENT_FLOOR) kept.add(id);
  }
  const abandonedDropped = perAttempt.size - kept.size;
  const live = answers.filter((a) => kept.has(a.attempt_id));

  // ---- 4. Grace questions, from each mock's own snapshot ---------------------
  const mockIds = [...new Set(firstAttempts.map((a) => a.mock_id))];
  const graceKeys = new Set<string>();
  for (const ids of chunk(mockIds, IN_CHUNK)) {
    const mocks = (await pageAll((f, t) =>
      db.from("mock_tests").select("id, questions").in("id", ids).range(f, t)
    )) as unknown as { id: string; questions: { questionId: string; grace?: boolean }[] }[];
    for (const m of mocks) {
      for (const q of m.questions ?? []) {
        if (q.grace === true) graceKeys.add(`${m.id}|${q.questionId}`);
      }
    }
  }

  // ---- 5. Current key + content hash, per question --------------------------
  const questionIds = [...new Set(live.map((a) => a.question_id))];
  const hashById = new Map<string, string>();
  const numericById = new Map<string, number>();
  for (const ids of chunk(questionIds, IN_CHUNK)) {
    const qs = (await pageAll((f, t) =>
      db.from("questions").select("id, content_hash, numeric_answer").in("id", ids).range(f, t)
    )) as unknown as { id: string; content_hash: string; numeric_answer: number | null }[];
    for (const q of qs) {
      hashById.set(q.id, q.content_hash);
      if (q.numeric_answer !== null) numericById.set(q.id, Number(q.numeric_answer));
    }
  }
  const keyById = new Map<string, MockAnswerKey>();
  const multiKeyed = new Set<string>();
  for (const ids of chunk(questionIds, IN_CHUNK)) {
    const opts = (await pageAll((f, t) =>
      db
        .from("options")
        .select("question_id, label")
        .in("question_id", ids)
        .eq("is_correct", true)
        .range(f, t)
    )) as unknown as { question_id: string; label: OptionLabel }[];
    for (const o of opts) {
      // A question with more than one correct option cannot yield a single key.
      // 11 such rows exist in the bank and are deliberately PRIVATE; skip rather
      // than pick one arbitrarily.
      if (keyById.has(o.question_id)) multiKeyed.add(o.question_id);
      keyById.set(o.question_id, { kind: "mcq", label: o.label });
    }
  }
  for (const id of numericById.keys()) {
    if (!keyById.has(id)) keyById.set(id, { kind: "numeric", value: numericById.get(id)! });
  }

  // ---- 6. Discrimination split, WITHIN each mock ----------------------------
  // Ranking students across mocks of different difficulty would be meaningless,
  // so the top/bottom 27% is computed against each sitting's own score spread.
  const byMock = new Map<string, { id: string; score: number }[]>();
  for (const a of firstAttempts) {
    if (!kept.has(a.id)) continue;
    const list = byMock.get(a.mock_id) ?? [];
    list.push({ id: a.id, score: Number(a.score ?? 0) });
    byMock.set(a.mock_id, list);
  }
  const topAttempts = new Set<string>();
  const bottomAttempts = new Set<string>();
  for (const [, list] of byMock) {
    if (list.length < 4) continue; // a split needs enough bodies to mean anything
    const sorted = [...list].sort((a, b) => b.score - a.score);
    const cut = Math.max(1, Math.floor(sorted.length * 0.27));
    for (const a of sorted.slice(0, cut)) topAttempts.add(a.id);
    for (const a of sorted.slice(-cut)) bottomAttempts.add(a.id);
  }

  // ---- 7. Group by (question, mock) ----------------------------------------
  type Bucket = {
    questionId: string;
    mockId: string;
    seen: number;
    attempted: number;
    correct: number;
    skipped: number;
    choice: Record<string, number>;
    topCorrect: number;
    topN: number;
    bottomCorrect: number;
    bottomN: number;
  };
  const buckets = new Map<string, Bucket>();
  let graceSkipped = 0;
  let multiSkipped = 0;

  for (const a of live) {
    const gk = `${attemptById.get(a.attempt_id)!.mock_id}|${a.question_id}`;
    if (graceKeys.has(gk)) {
      graceSkipped += 1;
      continue;
    }
    if (multiKeyed.has(a.question_id)) {
      multiSkipped += 1;
      continue;
    }
    const mockId = attemptById.get(a.attempt_id)!.mock_id;
    const bk = `${a.question_id}|${mockId}`;
    const b =
      buckets.get(bk) ??
      ({
        questionId: a.question_id,
        mockId,
        seen: 0,
        attempted: 0,
        correct: 0,
        skipped: 0,
        choice: {},
        topCorrect: 0,
        topN: 0,
        bottomCorrect: 0,
        bottomN: 0,
      } as Bucket);

    b.seen += 1;
    const answered = a.selected_label !== null || a.numeric_response !== null;
    if (!answered) {
      b.skipped += 1;
      buckets.set(bk, b);
      continue;
    }
    b.attempted += 1;
    if (a.selected_label) b.choice[a.selected_label] = (b.choice[a.selected_label] ?? 0) + 1;

    const verdict = verdictFor(
      keyById.get(a.question_id) ?? null,
      { selectedLabel: a.selected_label, numericResponse: a.numeric_response },
      false
    );
    if (verdict === 1) b.correct += 1;

    if (topAttempts.has(a.attempt_id)) {
      b.topN += 1;
      if (verdict === 1) b.topCorrect += 1;
    } else if (bottomAttempts.has(a.attempt_id)) {
      b.bottomN += 1;
      if (verdict === 1) b.bottomCorrect += 1;
    }
    buckets.set(bk, b);
  }

  // ---- 8. Rows ---------------------------------------------------------------
  const now = new Date().toISOString();
  const rows = [...buckets.values()]
    .filter((b) => hashById.has(b.questionId))
    .map((b) => {
      const key = keyById.get(b.questionId);
      const hasDisc = b.topN > 0 && b.bottomN > 0;
      return {
        question_id: b.questionId,
        source: "vault_mock" as const,
        source_ref: b.mockId,
        org_id: null,
        cohort_label: null,
        seen: b.seen,
        attempted: b.attempted,
        correct: b.correct,
        skipped: b.skipped,
        choice_counts: b.choice,
        disc_top_correct: hasDisc ? b.topCorrect : null,
        disc_top_n: hasDisc ? b.topN : null,
        disc_bottom_correct: hasDisc ? b.bottomCorrect : null,
        disc_bottom_n: hasDisc ? b.bottomN : null,
        key_at_measurement: key?.kind === "mcq" ? key.label : null,
        measured_content_hash: hashById.get(b.questionId)!,
        measured_at: now,
      };
    });

  const withAttempts = rows.filter((r) => r.attempted > 0).length;
  // Every line must reconcile with the one above it. `noAnswerRows` exists
  // because an attempt can be submitted having written no answer rows at all,
  // and without it the engagement figure looks like it has lost attempts.
  const noAnswerRows = firstAttempts.length - perAttempt.size;
  console.log(
    [
      `attempts submitted      ${attempts.length}`,
      `  retakes dropped       ${retakesDropped}`,
      `  first attempts        ${firstAttempts.length}`,
      `    no answer rows      ${noAnswerRows}`,
      `    abandoned dropped   ${abandonedDropped}  (engagement < ${ENGAGEMENT_FLOOR})`,
      `    kept                ${kept.size}`,
      `answer rows live        ${live.length}`,
      `  grace skipped         ${graceSkipped}`,
      `  multi-keyed skipped   ${multiSkipped}  (${multiKeyed.size} questions)`,
      `sitting rows            ${rows.length}  (${withAttempts} with >=1 attempt)`,
      `distinct questions      ${new Set(rows.map((r) => r.question_id)).size}`,
    ].join("\n")
  );

  if (!apply) {
    console.log("\nDRY RUN — nothing written. Re-run with --apply.");
    return;
  }

  for (const batch of chunk(rows, 500)) {
    const { error } = await db
      .from("question_item_stats")
      .upsert(batch, { onConflict: "question_id,source,source_ref" });
    if (error) throw new Error(`upsert failed: ${JSON.stringify(error)}`);
  }
  console.log(`\nwrote ${rows.length} rows.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
