/**
 * Server reads for the weak-area drill. The DECISIONS live in the pure
 * select.ts; this module fetches rows and nothing else.
 *
 * NOT marked `server-only` so a smoke script can drive it, and every function
 * takes the supabase client as a PARAMETER — the lib/email/service.ts precedent
 * for a core shared by a CLI and server code.
 *
 * READ WITH THE STUDENT'S OWN JWT, never the service role. `user_activity` is
 * own-row by RLS and `questions`/`options` are PUBLIC-readable, so the whole
 * drill resolves under the viewer's own permissions and there is no gate for a
 * route to get wrong.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import type { DrillEvent, QuestionRef } from "./select";

/** PostgREST truncates a raw select at 1000 rows with no error. The heaviest
 *  student holds 629 answer events today and nobody is over the cap — but the
 *  number only goes up, and this repo has been bitten five times by exactly
 *  that reasoning. Page it. */
const PAGE = 1000;

/** An `.in()` list rides in the URL, so a few hundred uuids overflow the
 *  request line and PostgREST answers a bare Bad Request (measured at 833
 *  elsewhere here). Chunking a FILTER and paging a RESULT are different limits
 *  and only one of them is 1000. */
const IN_CHUNK = 200;

/**
 * Every answer event this student has on record, for the fold in select.ts.
 *
 * Both halves are read together on purpose: a correct answer is only meaningful
 * next to the miss it follows, and fetching them separately would mean two
 * queries that can disagree about where "now" is.
 */
export async function loadDrillEvents(
  db: SupabaseClient,
  userId: string
): Promise<DrillEvent[]> {
  const out: DrillEvent[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await db
      .from("user_activity")
      .select("kind, ref_id, created_at")
      .eq("user_id", userId)
      .in("kind", ["answer_wrong", "answer_correct"])
      .not("ref_id", "is", null)
      .order("created_at", { ascending: true })
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`loadDrillEvents: ${error.message}`);
    const rows = (data ?? []) as { kind: string; ref_id: string; created_at: string }[];
    for (const r of rows) {
      out.push({
        questionId: r.ref_id,
        correct: r.kind === "answer_correct",
        at: r.created_at,
      });
    }
    if (rows.length < PAGE) break;
  }
  return out;
}

/**
 * Chapter + subtopic for the interleaver, and the eligibility filter.
 *
 * DELIBERATELY NARROW, and not `queryQuestionsByIds`. A student's due pool runs
 * to several hundred questions and only five are served; pulling `text`,
 * `context` and `solution` for all of them to decide an ordering is the exact
 * sort-payload mistake documented in CLAUDE.md's recurring pitfalls, where one
 * wide ordered query spilled 13.9 MB to disk per call.
 *
 * A question ABSENT from the returned map is not drillable — it was flipped
 * PRIVATE (RLS hides it), deleted, or is not an MCQ. Absence is the filter:
 * the caller drops it rather than serving a question it cannot grade.
 */
export async function loadQuestionRefs(
  db: SupabaseClient,
  ids: readonly string[]
): Promise<Map<string, QuestionRef>> {
  const out = new Map<string, QuestionRef>();
  const unique = [...new Set(ids)];

  for (let i = 0; i < unique.length; i += IN_CHUNK) {
    const slice = unique.slice(i, i + IN_CHUNK);
    for (let from = 0; ; from += PAGE) {
      const { data, error } = await db
        .from("questions")
        .select("id, question_format, chapter:chapters!chapter_id(name), subtopic:subtopics!subtopic_id(name)")
        .in("id", slice)
        .eq("visibility", "PUBLIC")
        .range(from, from + PAGE - 1);
      if (error) throw new Error(`loadQuestionRefs: ${error.message}`);
      const rows = (data ?? []) as unknown as {
        id: string;
        question_format: string | null;
        chapter: { name: string } | null;
        subtopic: { name: string } | null;
      }[];
      for (const r of rows) {
        // `null` means MCQ on legacy rows, the same convention QuestionRow uses.
        if (r.question_format !== null && r.question_format !== "mcq") continue;
        out.set(r.id, {
          chapter: r.chapter?.name ?? "",
          subtopic: r.subtopic?.name ?? "",
        });
      }
      if (rows.length < PAGE) break;
    }
  }
  return out;
}

/** One option as the student sees it — no `is_correct`. */
export type DrillOption = {
  label: string;
  text: string;
  imageUrl: string | null;
};

/**
 * A question as sent to the browser: stem and options, NO KEY and NO SOLUTION.
 *
 * The same posture as `getPublicQuizBySlug`. The answer is not a secret — it is
 * one click away on /browse — but shipping it inside the payload the runner
 * renders would make the drill's own record meaningless, since the correct
 * answer would be readable before the question was answered. The key and the
 * solution come back from the grade response, after a choice is committed.
 */
export type DrillQuestion = {
  id: string;
  text: string;
  context: string | null;
  imageUrl: string | null;
  difficulty: string;
  chapter: string;
  subtopic: string;
  options: DrillOption[];
};

/**
 * The five questions of one drill, IN THE ORDER GIVEN.
 *
 * PostgREST returns rows in whatever order it likes, and the order here is the
 * interleaving the pure core just computed — losing it would silently undo the
 * one thing selectDrill exists to do.
 */
export async function loadDrillQuestions(
  db: SupabaseClient,
  ids: readonly string[]
): Promise<DrillQuestion[]> {
  if (ids.length === 0) return [];
  const { data, error } = await db
    .from("questions")
    .select(
      `id, text, context, difficulty, image_url,
       chapter:chapters!chapter_id(name), subtopic:subtopics!subtopic_id(name),
       options(label, text, image_url)`
    )
    .in("id", ids.slice(0, IN_CHUNK))
    .eq("visibility", "PUBLIC");
  if (error) throw new Error(`loadDrillQuestions: ${error.message}`);

  const byId = new Map<string, DrillQuestion>();
  for (const r of (data ?? []) as unknown as Record<string, unknown>[]) {
    const options = ((r.options ?? []) as { label: string; text: string; image_url: string | null }[])
      .map((o) => ({ label: o.label, text: o.text, imageUrl: o.image_url }))
      .sort((a, b) => (a.label < b.label ? -1 : a.label > b.label ? 1 : 0));
    byId.set(r.id as string, {
      id: r.id as string,
      text: r.text as string,
      context: (r.context as string | null) ?? null,
      imageUrl: (r.image_url as string | null) ?? null,
      difficulty: (r.difficulty as string) ?? "MODERATE",
      chapter: ((r.chapter as { name: string } | null)?.name) ?? "",
      subtopic: ((r.subtopic as { name: string } | null)?.name) ?? "",
      options,
    });
  }
  return ids.map((id) => byId.get(id)).filter((q): q is DrillQuestion => q !== undefined);
}

/** What the grade endpoint answers with — the key, revealed on commit. */
export type DrillVerdict = {
  correct: boolean;
  correctLabel: string | null;
  solution: string | null;
  solutionImageUrl: string | null;
};

/**
 * Grade one answer SERVER-SIDE, reading the key at grade time.
 *
 * Not negotiable and not a formality: the drill writes an `answer_correct` row
 * off this verdict, and that row decides whether the question is ever served
 * again. A client-asserted verdict would let the browser retire its own
 * questions, which turns the whole spaced-repetition ladder into decoration.
 *
 * Returns null when the question has no key to grade against — a row with no
 * correct option is a data defect, and inventing `correct: false` for it would
 * punish the student for it.
 */
export async function gradeDrillAnswer(
  db: SupabaseClient,
  questionId: string,
  chosenLabel: string
): Promise<DrillVerdict | null> {
  const { data, error } = await db
    .from("questions")
    .select("solution, solution_image_url, options(label, is_correct)")
    .eq("id", questionId)
    .eq("visibility", "PUBLIC")
    .maybeSingle();
  if (error) throw new Error(`gradeDrillAnswer: ${error.message}`);
  if (!data) return null;

  const row = data as unknown as {
    solution: string | null;
    solution_image_url: string | null;
    options: { label: string; is_correct: boolean }[];
  };
  const correctLabel = row.options.find((o) => o.is_correct)?.label ?? null;
  if (correctLabel === null) return null;

  return {
    correct: correctLabel.toUpperCase() === chosenLabel.toUpperCase(),
    correctLabel,
    solution: row.solution,
    solutionImageUrl: row.solution_image_url,
  };
}
