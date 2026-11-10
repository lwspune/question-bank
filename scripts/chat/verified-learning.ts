/**
 * Verified learning, a week at a time (V_LEARNING_LOOP.md step 1): of the
 * students who showed a learning need (a graded miss, or an Ask V
 * explanation), how many then got a DIFFERENT question in the same subtopic
 * right within 7 days, with their accuracy in that subtopic before and after.
 * The rules are in src/lib/chat/verifiedLearning.ts.
 *
 *   npm run v:learning               # the last 4 weeks, 7 days each, ending now
 *   npm run v:learning -- --weeks=8
 *
 * Read-only, service role. Staff (org members, platform admins) are left out.
 * Read on Thursdays with v:followups and v:cost (V_SPEC.md section 7).
 */
import "../lib/serverOnly";
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  BEFORE_WINDOW_MS,
  VERIFY_WINDOW_MS,
  answerFromActivity,
  followUpWeek,
  mockAnswer,
  needFromActivity,
  verifiedLearning,
  type BeforeAfter,
  type FollowUpLink,
  type LoopAnswer,
  type LoopNeed,
  type VerifiedLearningWeek,
} from "../../src/lib/chat/verifiedLearning";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const DAY = 86_400_000;
const PAGE = 1000;
/** `.in()` puts the list in the URL: ~200 ids is the safe size (CLAUDE.md, PostgREST pitfalls). */
const CHUNK = 200;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type Row = Record<string, unknown>;

/** Every row of a query, a page at a time (PostgREST returns at most 1000). */
async function pages(build: (from: number, to: number) => PromiseLike<{ data: Row[] | null; error: { message: string } | null }>) {
  const out: Row[] = [];
  for (let offset = 0; ; offset += PAGE) {
    const { data, error } = await build(offset, offset + PAGE - 1);
    if (error) throw new Error(error.message);
    out.push(...(data ?? []));
    if ((data ?? []).length < PAGE) return out;
  }
}

function chunks<T>(list: readonly T[]): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < list.length; i += CHUNK) out.push(list.slice(i, i + CHUNK));
  return out;
}

async function staffIds(db: SupabaseClient): Promise<Set<string>> {
  const staff = new Set<string>();
  for (const table of ["org_members", "platform_admins"] as const) {
    const { data, error } = await db.from(table).select("user_id");
    if (error) throw new Error(`${table}: ${error.message}`);
    for (const r of data ?? []) staff.add(r.user_id as string);
  }
  return staff;
}

async function subtopicsOf(db: SupabaseClient, ids: readonly string[]): Promise<Map<string, string>> {
  const out = new Map<string, string>();
  for (const part of chunks(ids)) {
    const { data, error } = await db.from("questions").select("id, subtopic_id").in("id", part);
    if (error) throw new Error(`questions: ${error.message}`);
    for (const r of data ?? []) if (r.subtopic_id) out.set(r.id as string, r.subtopic_id as string);
  }
  return out;
}

const pct = (n: number, d: number) => (d === 0 ? "-" : `${Math.round((100 * n) / d)}%`);
const day = (t: number) => new Date(t).toISOString().slice(0, 10);

function weekLine(from: number, to: number, r: VerifiedLearningWeek): string {
  const ba: BeforeAfter = r.beforeAfter;
  const open = r.stillOpen ? ` (still open until ${day(to + VERIFY_WINDOW_MS)})` : "";
  return [
    `  ${day(from)} to ${day(to)}: ${r.verifiedStudents} of ${r.students} students (${pct(r.verifiedStudents, r.students)})`,
    `${r.verifiedNeeds} of ${r.needs} needs (${pct(r.verifiedNeeds, r.needs)})`,
    `subtopic accuracy ${pct(ba.beforeRight, ba.beforeTotal)} before -> ${pct(ba.afterRight, ba.afterTotal)} after (${ba.pairs} student-subtopics, ${ba.beforeTotal} + ${ba.afterTotal} answers)${open}`,
  ].join(" · ");
}

async function main() {
  const weeksArg = process.argv.find((a) => a.startsWith("--weeks="));
  const weeks = weeksArg ? Number(weeksArg.split("=")[1]) : 4;
  if (!Number.isInteger(weeks) || weeks < 1 || weeks > 26) throw new Error("--weeks must be 1 to 26");

  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const staff = await staffIds(db);
  const now = Date.now();
  const firstWeek = now - weeks * 7 * DAY;
  // Answers reach back 30 days before the first week, for its before-accuracy.
  const since = new Date(firstWeek - BEFORE_WINDOW_MS).toISOString();
  const keep = (userId: unknown): userId is string => typeof userId === "string" && !staff.has(userId);

  // 1. Activity: misses, the drill's ladder rows and every verdict row.
  const ladder = await pages((a, b) =>
    db
      .from("user_activity")
      .select("user_id, kind, ref_id, metadata, created_at")
      .in("kind", ["answer_wrong", "answer_correct"])
      .gte("created_at", since)
      .order("created_at")
      .order("id")
      .range(a, b)
  );
  const verdicts = await pages((a, b) =>
    db
      .from("user_activity")
      .select("user_id, kind, ref_id, metadata, created_at")
      .eq("kind", "question_practiced")
      .not("metadata->>correct", "is", null)
      .gte("created_at", since)
      .order("created_at")
      .order("id")
      .range(a, b)
  );

  // 2. Ask V explanations: an AI reply to a tap on a bank question.
  const taps = await pages((a, b) =>
    db
      .from("chat_interactions")
      .select("user_id, asked_question_id, created_at")
      .eq("event_type", "typed_question")
      .eq("reply_source", "ai")
      .not("asked_question_id", "is", null)
      .gte("created_at", new Date(firstWeek).toISOString())
      .order("created_at")
      .order("id")
      .range(a, b)
  );

  // 3. Mocks: every graded pick, at the attempt's submit time.
  const attempts = (
    await pages((a, b) =>
      db
        .from("mock_attempts")
        .select("id, user_id, submitted_at")
        .not("submitted_at", "is", null)
        .gte("submitted_at", since)
        .order("submitted_at")
        .order("id")
        .range(a, b)
    )
  ).filter((r) => keep(r.user_id));
  const attemptById = new Map(attempts.map((r) => [r.id as string, r]));
  const picks: Row[] = [];
  for (const part of chunks(attempts.map((r) => r.id as string))) {
    picks.push(
      ...(await pages((a, b) =>
        db
          .from("attempt_answers")
          .select("attempt_id, question_id, selected_label")
          .in("attempt_id", part)
          .not("selected_label", "is", null)
          .order("attempt_id")
          .order("question_id")
          .range(a, b)
      ))
    );
  }
  const keyOf = new Map<string, string[]>();
  for (const part of chunks([...new Set(picks.map((p) => p.question_id as string))])) {
    const { data, error } = await db.from("options").select("question_id, label").eq("is_correct", true).in("question_id", part);
    if (error) throw new Error(`options: ${error.message}`);
    for (const r of data ?? []) keyOf.set(r.question_id as string, [...(keyOf.get(r.question_id as string) ?? []), String(r.label)]);
  }

  // 4. Every question's subtopic.
  const ids = new Set<string>();
  for (const r of [...ladder, ...verdicts]) if (typeof r.ref_id === "string" && UUID.test(r.ref_id)) ids.add(r.ref_id);
  for (const r of taps) ids.add(r.asked_question_id as string);
  for (const p of picks) ids.add(p.question_id as string);
  const subtopic = await subtopicsOf(db, [...ids]);

  // 5. Into needs and answers.
  const missNeeds: LoopNeed[] = [];
  const answers: LoopAnswer[] = [];
  let tryCards = 0;
  let tryCardsRight = 0;
  for (const r of [...ladder, ...verdicts]) {
    if (!keep(r.user_id) || typeof r.ref_id !== "string") continue;
    const s = subtopic.get(r.ref_id);
    if (!s) continue;
    const at = Date.parse(r.created_at as string);
    const row = { kind: r.kind as string, metadata: (r.metadata ?? null) as Record<string, unknown> | null };
    if (needFromActivity(row)) missNeeds.push({ userId: r.user_id, questionId: r.ref_id, subtopicId: s, at });
    const graded = answerFromActivity(row);
    if (graded) {
      answers.push({ userId: r.user_id, questionId: r.ref_id, subtopicId: s, at, correct: graded.correct });
      if (row.metadata?.surface === "v" && at >= firstWeek) {
        tryCards += 1;
        if (graded.correct) tryCardsRight += 1;
      }
    }
  }
  for (const p of picks) {
    const attempt = attemptById.get(p.attempt_id as string);
    const s = subtopic.get(p.question_id as string);
    const correct = mockAnswer(p.selected_label as string | null, keyOf.get(p.question_id as string) ?? []);
    if (!attempt || !s || correct === null) continue;
    answers.push({
      userId: attempt.user_id as string,
      questionId: p.question_id as string,
      subtopicId: s,
      at: Date.parse(attempt.submitted_at as string),
      correct,
    });
  }
  const vNeeds: LoopNeed[] = [];
  for (const r of taps) {
    const s = subtopic.get(r.asked_question_id as string);
    if (keep(r.user_id) && s) {
      vNeeds.push({ userId: r.user_id, questionId: r.asked_question_id as string, subtopicId: s, at: Date.parse(r.created_at as string) });
    }
  }

  // 6. The report.
  console.log("Verified learning: a need, then a DIFFERENT question in the same subtopic answered right within 7 days");
  console.log("(subtopic accuracy: the student's answers on other questions there, in the 30 days before the week vs the 7 days after their first need)\n");
  for (const [title, needs] of [
    ["After a graded miss", missNeeds],
    ["After an Ask V explanation", vNeeds],
  ] as const) {
    console.log(title);
    for (let w = weeks; w >= 1; w--) {
      const from = now - w * 7 * DAY;
      const to = now - (w - 1) * 7 * DAY;
      console.log(weekLine(from, to, verifiedLearning(needs, answers, { from, to, now })));
    }
    console.log("");
  }
  // 7. Follow-ups linked to their explanation (v_followups, 0250, V_LEARNING_LOOP.md step 2).
  const links: FollowUpLink[] = (
    await pages((a, b) =>
      db
        .from("v_followups")
        .select("user_id, followup_question_id, free, created_at")
        .gte("created_at", new Date(firstWeek).toISOString())
        .order("created_at")
        .order("user_id")
        .range(a, b)
    )
  )
    .filter((r) => keep(r.user_id))
    .map((r) => ({ userId: r.user_id as string, followUpId: r.followup_question_id as string, free: r.free === true, at: Date.parse(r.created_at as string) }));
  console.log("Follow-ups after an explanation (the first try card answered after V explained a question, per day)");
  for (let w = weeks; w >= 1; w--) {
    const from = now - w * 7 * DAY;
    const to = now - (w - 1) * 7 * DAY;
    const f = followUpWeek(links, answers, { from, to });
    console.log(
      `  ${day(from)} to ${day(to)}: ${f.followUps} follow-ups from ${f.students} students, ${f.answeredRight} right (${pct(f.answeredRight, f.followUps)}), ${f.free} free`
    );
  }
  console.log("");
  console.log(`V's try cards answered in all, last ${weeks} weeks: ${tryCards}, ${tryCardsRight} right. Taps on "One more like this" are counted in Vercel Analytics (v_more_like_this_tap), not here.`);
  console.log(`Read: ${ladder.length + verdicts.length} activity rows, ${taps.length} Ask V replies, ${picks.length} mock picks from ${attempts.length} attempts.`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
