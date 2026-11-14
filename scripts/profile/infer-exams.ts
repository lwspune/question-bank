/**
 * Work out and store the exam guess of students who never chose an exam
 * (migration 0254, owner 2026-11-14). The guess is the Home card's "Your exam:
 * X (our guess)" and, later, what other surfaces may follow; it never touches
 * `target_exams`, which means the student CHOSE it.
 *
 * DRY RUN BY DEFAULT: prints who would get which guess and writes nothing.
 *   --apply            write (only here and in .github/workflows/infer-exams.yml)
 *   --all              the backfill: every no-exam student not yet answered,
 *                      whatever their age or activity
 *   --before=YYYY-MM-DD  only accounts created before this day (IST)
 *   --limit=N          at most N students
 *   --report           the readout: guesses, sightings, taps, and how often
 *                      the guess matched the exam a student later chose
 *
 * The daily run (no --all) takes, per lib/profile/examGuess `guessDue`: a
 * 3-5 day old account with no guess, and anyone who answered a question in
 * the last 26 hours. A guess is written only when it is new or names a
 * different exam; no guess (too little or mixed practice, or a failed read)
 * never clears one. Staff are left out. Safe to re-run.
 */
import { join } from "node:path";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

import type { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { EXAM_REGISTRY } from "@/lib/exam/examContext";
import type { ExamIdMap } from "@/lib/exam/examNav";
import { loadSuggestedExam } from "@/lib/profile/suggestExamServer";
import { guessDue, planGuessWrite } from "@/lib/profile/examGuess";

const args = process.argv.slice(2);
const APPLY = args.includes("--apply");
const ALL = args.includes("--all");
const REPORT = args.includes("--report");
const LIMIT = Number(args.find((a) => a.startsWith("--limit="))?.split("=")[1] ?? 0);
const BEFORE_ARG = args.find((a) => a.startsWith("--before="))?.split("=")[1];
const BEFORE = BEFORE_ARG ? new Date(`${BEFORE_ARG}T00:00:00+05:30`) : null;
if (BEFORE && Number.isNaN(BEFORE.getTime())) throw new Error(`Bad --before: ${BEFORE_ARG}`);

const PAGE = 1000;
const ID_CHUNK = 150;
const ACTIVE_WINDOW_MS = 26 * 60 * 60 * 1000;
const CONCURRENCY = 4;

type GuessRow = {
  user_id: string;
  exam: string;
  source: string;
  card_seen_at: string | null;
  card_answer: string | null;
};

/** Every row of a select, paged: PostgREST stops at 1000 without an error. */
async function pageAll<T>(
  build: (from: number, to: number) => PromiseLike<{ data: T[] | null; error: { message: string } | null }>
): Promise<T[]> {
  const out: T[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await build(from, from + PAGE - 1);
    if (error) throw new Error(error.message);
    out.push(...(data ?? []));
    if (!data || data.length < PAGE) return out;
  }
}

async function examIdMap(db: SupabaseClient): Promise<ExamIdMap> {
  const { data, error } = await db.from("exams").select("id, name");
  if (error) throw new Error(error.message);
  const byName = new Map((data ?? []).map((e) => [e.name as string, e.id as string]));
  const map: ExamIdMap = {};
  for (const e of EXAM_REGISTRY) map[e.slug] = byName.get(e.examName) ?? null;
  return map;
}

async function accountsCreated(db: SupabaseClient): Promise<Map<string, string>> {
  const out = new Map<string, string>();
  for (let page = 1; ; page++) {
    const { data, error } = await db.auth.admin.listUsers({ page, perPage: 1000 });
    if (error) throw new Error(error.message);
    for (const u of data.users) out.set(u.id, u.created_at);
    if (data.users.length < 1000) return out;
  }
}

async function staffIds(db: SupabaseClient): Promise<Set<string>> {
  const [members, admins] = await Promise.all([
    pageAll<{ user_id: string }>((a, b) => db.from("org_members").select("user_id").range(a, b)),
    pageAll<{ user_id: string }>((a, b) => db.from("platform_admins").select("user_id").range(a, b)),
  ]);
  return new Set([...members, ...admins].map((r) => r.user_id));
}

async function loadGuesses(db: SupabaseClient): Promise<Map<string, GuessRow>> {
  const rows = await pageAll<GuessRow>((a, b) =>
    db
      .from("student_exam_guesses")
      .select("user_id, exam, source, card_seen_at, card_answer")
      .order("user_id")
      .range(a, b)
  );
  return new Map(rows.map((r) => [r.user_id, r]));
}

async function runGuesses(db: SupabaseClient) {
  const now = new Date();
  const [created, staff, noExam, guesses, active, examIds] = await Promise.all([
    accountsCreated(db),
    staffIds(db),
    pageAll<{ user_id: string }>((a, b) =>
      db.from("student_profiles").select("user_id").filter("target_exams", "eq", "{}").order("user_id").range(a, b)
    ),
    loadGuesses(db),
    pageAll<{ user_id: string }>((a, b) =>
      db
        .from("user_activity")
        .select("user_id")
        .eq("ref_kind", "question")
        .in("kind", ["question_practiced", "answer_wrong", "answer_correct"])
        .gte("created_at", new Date(now.getTime() - ACTIVE_WINDOW_MS).toISOString())
        .order("id")
        .range(a, b)
    ).then((rows) => new Set(rows.map((r) => r.user_id))),
    examIdMap(db),
  ]);

  let due = noExam
    .map((r) => r.user_id)
    .filter((id) => !staff.has(id))
    .filter((id) => {
      const c = created.get(id) ?? null;
      if (BEFORE && !(c && Date.parse(c) < BEFORE.getTime())) return false;
      const g = guesses.get(id);
      return guessDue({
        createdAt: c,
        now,
        row: g ? { answered: g.card_answer !== null } : null,
        activeRecently: active.has(id),
        all: ALL,
      });
    });
  if (LIMIT > 0) due = due.slice(0, LIMIT);

  console.log(
    `${APPLY ? "APPLY" : "DRY RUN"}${ALL ? " --all" : ""}${BEFORE_ARG ? ` --before=${BEFORE_ARG}` : ""}: ` +
      `${noExam.length} profiles with no exam, ${due.length} due today (${active.size} students answered in the last 26 h)`
  );

  const tally = { insert: 0, update: 0, same: 0, none: 0, failed: 0 };
  const bySource: Record<string, number> = {};
  const byExam: Record<string, number> = {};
  let next = 0;
  async function worker() {
    for (;;) {
      const i = next++;
      if (i >= due.length) return;
      const id = due[i];
      const g = await loadSuggestedExam(db, id, examIds);
      const row = guesses.get(id) ?? null;
      const plan = planGuessWrite(row, g, now);
      if (!g) tally.none++;
      else {
        bySource[g.source] = (bySource[g.source] ?? 0) + 1;
        byExam[g.slug] = (byExam[g.slug] ?? 0) + 1;
      }
      if (plan.kind === "none") {
        if (g) tally.same++;
        continue;
      }
      if (!APPLY) {
        tally[plan.kind]++;
        continue;
      }
      const res =
        plan.kind === "insert"
          ? await db
              .from("student_exam_guesses")
              .upsert({ user_id: id, ...plan.values }, { onConflict: "user_id", ignoreDuplicates: true })
          : await db.from("student_exam_guesses").update(plan.values).eq("user_id", id).is("card_answer", null);
      if (res.error) {
        tally.failed++;
        console.error(`write failed for one student: ${res.error.message}`);
      } else tally[plan.kind]++;
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  console.log(
    `new guesses ${tally.insert} · changed ${tally.update} · unchanged ${tally.same} · no signal ${tally.none}` +
      (tally.failed ? ` · FAILED ${tally.failed}` : "")
  );
  console.log("by source:", JSON.stringify(bySource));
  const top = Object.entries(byExam).sort((a, b) => b[1] - a[1]);
  console.log("by exam:", top.map(([s, n]) => `${s} ${n}`).join(" · ") || "none");
  if (tally.failed) process.exitCode = 1;
}

async function report(db: SupabaseClient) {
  const guesses = [...(await loadGuesses(db)).values()];
  const ids = guesses.map((g) => g.user_id);
  const chosen = new Map<string, string[]>();
  for (let i = 0; i < ids.length; i += ID_CHUNK) {
    const { data, error } = await db
      .from("student_profiles")
      .select("user_id, target_exams")
      .in("user_id", ids.slice(i, i + ID_CHUNK));
    if (error) throw new Error(error.message);
    for (const r of data ?? []) chosen.set(r.user_id as string, (r.target_exams as string[]) ?? []);
  }
  const seen = guesses.filter((g) => g.card_seen_at);
  const correct = guesses.filter((g) => g.card_answer === "correct").length;
  const change = guesses.filter((g) => g.card_answer === "change").length;
  const picked = guesses.filter((g) => (chosen.get(g.user_id) ?? []).length > 0);
  const matched = picked.filter((g) => chosen.get(g.user_id)!.includes(g.exam)).length;
  const pct = (a: number, b: number) => (b ? `${Math.round((a / b) * 100)}%` : "n/a");
  console.log(`guesses stored: ${guesses.length}`);
  for (const src of ["practice", "landing"]) {
    console.log(`  from ${src}: ${guesses.filter((g) => g.source === src).length}`);
  }
  console.log(`card seen by: ${seen.length}`);
  console.log(`  Correct ${correct} (${pct(correct, seen.length)}) · Change ${change} (${pct(change, seen.length)})`);
  console.log(`now have a chosen exam: ${picked.length} (${pct(picked.length, guesses.length)} of guessed students)`);
  console.log(`  the guess was among their exams: ${matched} of ${picked.length} (${pct(matched, picked.length)})`);
}

async function main() {
  const db = createSupabaseAdminClient();
  if (REPORT) await report(db);
  else await runGuesses(db);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
