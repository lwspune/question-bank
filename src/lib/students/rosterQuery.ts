/**
 * Reads the /dashboard/students roster through the get_student_roster RPC
 * (migration 0098) and maps it onto the view-model.
 *
 * Takes the Supabase client as an argument rather than creating one, so the probe
 * in scripts/students/smoke.ts can drive this exact code path outside Next. The
 * `server-only` wrapper that supplies the service-role client is admin.ts.
 *
 * The aggregate lives in SQL on purpose: attempt_answers is ~53k rows, and counting
 * per-user from a row payload would silently truncate at the PostgREST 1000-row cap.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { displayName, providerLabel } from "./derive";
import type { StudentRosterRow } from "./roster";
import { checkInExamSlug, countMockExams } from "./checkIn";
import { getExamByName } from "@/lib/exam/examContext";
import { rosterExamGuess, type StoredExamGuess } from "./rosterExamGuess";

/** One row as the RPC returns it (snake_case, straight from Postgres). */
export type RosterRpcRow = {
  user_id: string;
  email: string | null;
  raw_user_meta: { full_name?: string; name?: string } | null;
  provider: string | null;
  signed_up: string;
  last_sign_in: string | null;
  mobile: string | null;
  city: string | null;
  stage: string | null;
  target_exams: string[] | null;
  whatsapp_opt_in: boolean;
  mocks_submitted: number;
  mocks_started: number;
  avg_pct: number | string | null;
  qs_answered: number;
  notes_subtopics: number;
  notes_subjects: number;
  notes_mastered: number;
  notes_checkpoints: number;
  bookmarks: number;
  last_active: string | null;
};

/** Postgres `numeric` arrives over PostgREST as a string — coerce, keeping null as null. */
function num(v: number | string | null): number | null {
  if (v === null) return null;
  const n = typeof v === "string" ? Number(v) : v;
  return Number.isFinite(n) ? n : null;
}

const PAGE = 1000;

/** A to-one embed: PostgREST returns an object, but the untyped client infers an array. */
type Embedded<T> = T | T[] | null;
type FinishedMockRow = { user_id: string; mock_tests: Embedded<{ exams: Embedded<{ name: string }> }> };

function one<T>(v: Embedded<T>): T | null {
  return Array.isArray(v) ? (v[0] ?? null) : v;
}

/**
 * Every finished mock as (student, exam), for the check-in message's exam. Paged
 * like the roster: ~1,800 rows today, past the 1000-row cap. Two columns each,
 * so the read stays small however long the table grows.
 */
async function fetchFinishedMockExams(db: SupabaseClient): Promise<{ userId: string; examSlug: string }[]> {
  const out: { userId: string; examSlug: string }[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await db
      .from("mock_attempts")
      .select("user_id, mock_tests!inner(exams!inner(name))")
      .not("submitted_at", "is", null)
      .order("id")
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`fetchFinishedMockExams: ${error.message}`);
    const batch = (data ?? []) as FinishedMockRow[];
    for (const r of batch) {
      const test = one(r.mock_tests);
      // The DB names an exam; the registry maps that name to the slug the message reads.
      const slug = getExamByName(test ? one(test.exams)?.name : null)?.slug;
      if (slug) out.push({ userId: r.user_id, examSlug: slug });
    }
    if (batch.length < PAGE) break;
  }
  return out;
}

/** Pages a two-column read past the 1000-row cap. */
async function pageAll<T>(
  build: (from: number, to: number) => PromiseLike<{ data: unknown[] | null; error: { message: string } | null }>,
  label: string
): Promise<T[]> {
  const out: T[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await build(from, from + PAGE - 1);
    if (error) throw new Error(`${label}: ${error.message}`);
    const batch = (data ?? []) as T[];
    out.push(...batch);
    if (batch.length < PAGE) return out;
  }
}

/**
 * What the exam guess needs (rosterExamGuess.ts): every stored guess (migration
 * 0254) and the landing page of every student with no target exam. Two narrow
 * reads, whole tables, so no per-student query and no `.in()` list in the URL.
 */
async function fetchExamGuessInputs(db: SupabaseClient): Promise<{
  stored: Map<string, StoredExamGuess>;
  landing: Map<string, string>;
}> {
  const [guesses, landings] = await Promise.all([
    pageAll<{ user_id: string; exam: string; source: StoredExamGuess["source"]; card_answer: string | null }>(
      (a, b) =>
        db.from("student_exam_guesses").select("user_id, exam, source, card_answer").order("user_id").range(a, b),
      "fetchExamGuesses"
    ),
    pageAll<{ user_id: string; acq_landing: string | null }>(
      (a, b) =>
        db
          .from("student_profiles")
          .select("user_id, acq_landing")
          .filter("target_exams", "eq", "{}")
          .not("acq_landing", "is", null)
          .order("user_id")
          .range(a, b),
      "fetchLandings"
    ),
  ]);
  return {
    stored: new Map(guesses.map((g) => [g.user_id, { exam: g.exam, source: g.source, answer: g.card_answer }])),
    landing: new Map(landings.flatMap((l) => (l.acq_landing ? [[l.user_id, l.acq_landing] as const] : []))),
  };
}

export async function fetchStudentRoster(db: SupabaseClient): Promise<StudentRosterRow[]> {
  // Paged in 1000-row windows: a set-returning RPC is subject to the same PostgREST
  // row cap as a table select, so reading it in one shot would start silently
  // dropping students once the roster outgrows the cap.
  const raw: RosterRpcRow[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await db.rpc("get_student_roster").range(from, from + PAGE - 1);
    if (error) throw new Error(`fetchStudentRoster: ${error.message}`);
    // Cast: the generated DB types don't carry this RPC's signature, so supabase-js
    // infers a single object for an unknown function. The shape is asserted by the
    // migration's RETURNS TABLE and exercised by `npm run students:smoke`.
    const batch = (data ?? []) as unknown as RosterRpcRow[];
    raw.push(...batch);
    if (batch.length < PAGE) break;
  }

  const [finishedMocks, guessInputs] = await Promise.all([fetchFinishedMockExams(db), fetchExamGuessInputs(db)]);
  const mockExams = countMockExams(finishedMocks);

  return raw
    .map((r) => ({
      id: r.user_id,
      name: displayName(r.raw_user_meta, r.email),
      email: r.email ?? "(no email)",
      provider: providerLabel(r.provider),
      signedUp: r.signed_up,
      lastSignIn: r.last_sign_in,
      mobile: r.mobile,
      city: r.city,
      stage: r.stage,
      targetExams: r.target_exams ?? [],
      checkInExam: checkInExamSlug(mockExams.get(r.user_id), r.target_exams ?? []),
      guessedExam: rosterExamGuess({
        targetExams: r.target_exams ?? [],
        stored: guessInputs.stored.get(r.user_id) ?? null,
        landing: guessInputs.landing.get(r.user_id) ?? null,
      }),
      whatsappOptIn: r.whatsapp_opt_in,
      mocksSubmitted: r.mocks_submitted,
      mocksStarted: r.mocks_started,
      avgPct: num(r.avg_pct),
      qsAnswered: r.qs_answered,
      notesSubtopics: r.notes_subtopics,
      notesSubjects: r.notes_subjects,
      notesMastered: r.notes_mastered,
      notesCheckpoints: r.notes_checkpoints,
      bookmarks: r.bookmarks,
      lastActive: r.last_active,
    }))
    // Default order = the engagement leaderboard the roster is read for. The client
    // re-sorts; this only decides what the first paint shows.
    .sort((a, b) => b.mocksSubmitted - a.mocksSubmitted);
}
