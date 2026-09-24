/**
 * Drive the weak-area drill's OWN read chain against live data.
 *
 * WHY THIS EXISTS. `/drill` is auth-gated `ƒ`, so `next build` never renders
 * it, AND its runner is behind a tap, so even a curl that reached the page
 * would prove nothing about the loop. The unit tests prove the ladder and the
 * interleaver; this proves that real students have real drills — that the pool
 * survives the eligibility filter, that five questions come back with four
 * options each, and that the interleaving actually spreads.
 *
 * WHAT IT DOES NOT PROVE, said plainly: it reads with the SERVICE ROLE where
 * the page uses the student's own JWT, so the own-row RLS path is untested
 * here; it renders no markup, so layout is a browser check; and it never writes,
 * so the grade → record → question-goes-quiet loop is only closed by a human
 * taking a real drill.
 *
 * Read-only. Same shape as perf:smoke / findings:smoke.
 */
import { join } from "node:path";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import {
  loadDrillEvents,
  loadDrillQuestions,
  loadQuestionRefs,
} from "@/lib/drill/query";
import { attachRefs, dueQuestions, selectDrill, DRILL_SIZE } from "@/lib/drill/select";
import { fillUnseen } from "@/lib/drill/compose";

const LIMIT = Number(process.argv[2] ?? 8);

async function main() {
  const db = createSupabaseAdminClient();
  const now = new Date();

  // The students with the most recorded mistakes — the heaviest read, and the
  // ones whose drills have to work first.
  const { data, error } = await db
    .from("user_activity")
    .select("user_id")
    .eq("kind", "answer_wrong")
    .limit(20000);
  if (error) throw new Error(error.message);

  const counts = new Map<string, number>();
  for (const r of (data ?? []) as { user_id: string }[]) {
    counts.set(r.user_id, (counts.get(r.user_id) ?? 0) + 1);
  }
  const users = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, LIMIT);

  let served = 0;
  let thin = 0;

  for (const [userId, misses] of users) {
    const events = await loadDrillEvents(db, userId);
    const due = dueQuestions(events, now);
    const refs = await loadQuestionRefs(db, due.map((d) => d.questionId));
    const drillable = attachRefs(due, refs);
    const picked = selectDrill(drillable, DRILL_SIZE);
    // The B2 fill, driven the way the page drives it (no target exam here, so
    // only the weak-subtopic half is exercised; the exam fallback needs a
    // profile). Asserted below: a filled id is never one they have met.
    const fresh = picked.length < DRILL_SIZE ? await fillUnseen(db, userId, events, DRILL_SIZE - picked.length, null) : [];
    const questions = await loadDrillQuestions(db, [...picked.map((p) => p.questionId), ...fresh]);

    const subtopics = new Set(picked.map((p) => p.subtopic));
    const optionCounts = new Set(questions.map((q) => q.options.length));
    if (questions.length === DRILL_SIZE) served++;
    else thin++;

    console.log(
      `- ${userId.slice(0, 8)}  misses=${misses} due=${due.length} drillable=${drillable.length} ` +
        `served=${questions.length} (new=${fresh.length}) subtopics=${subtopics.size} options=${[...optionCounts].join("/")}`
    );
    const met = new Set(events.map((e) => e.questionId));
    if (fresh.some((id) => met.has(id))) {
      console.error("  !! the fill served a question this student has already answered");
      process.exitCode = 1;
    }
    for (const q of questions) {
      console.log(`     ${q.chapter} · ${q.subtopic}  (${q.options.length} options)`);
    }

    // The two properties worth failing on rather than eyeballing.
    if (questions.length > 1 && subtopics.size === 1 && drillable.length > questions.length) {
      console.error("  !! all five from one subtopic despite a wider pool — interleaving is not working");
      process.exitCode = 1;
    }
    if (questions.some((q) => q.options.length === 0)) {
      console.error("  !! a served question has no options — it could be rendered but not answered");
      process.exitCode = 1;
    }
    // The payload must not carry the key. This is the property that keeps the
    // recorded verdict meaningful, so it is asserted rather than trusted.
    const leaked = questions.some((q) =>
      q.options.some((o) => Object.prototype.hasOwnProperty.call(o, "is_correct"))
    );
    if (leaked) {
      console.error("  !! the drill payload carries is_correct — the answer is readable before it is given");
      process.exitCode = 1;
    }
  }

  // The fill is only reachable on a SHORT pool, which the heaviest students
  // never have. Walk down the list until one has fewer than five due, and
  // drive the fill with the NDA exam as the fallback scope — the case a new
  // student with one sitting behind them lands in.
  const { data: nda } = await db.from("exams").select("id").eq("name", "NDA").maybeSingle();
  const all = [...counts.entries()].sort((a, b) => b[1] - a[1]);
  let probed = false;
  for (const [userId] of all.slice(LIMIT, LIMIT + 60)) {
    const events = await loadDrillEvents(db, userId);
    const due = dueQuestions(events, now);
    const refs = await loadQuestionRefs(db, due.map((d) => d.questionId));
    const drillable = attachRefs(due, refs);
    if (drillable.length >= DRILL_SIZE) continue;
    const picked = selectDrill(drillable, DRILL_SIZE);
    const fresh = await fillUnseen(db, userId, events, DRILL_SIZE - picked.length, (nda?.id as string) ?? null);
    const met = new Set(events.map((e) => e.questionId));
    const questions = await loadDrillQuestions(db, fresh);
    console.log(
      `- ${userId.slice(0, 8)}  SHORT POOL due=${drillable.length} filled=${fresh.length} loaded=${questions.length}` +
        (fresh.length + picked.length === DRILL_SIZE ? " -> full set" : " -> STILL SHORT")
    );
    for (const q of questions) console.log(`     new: ${q.chapter} \u00b7 ${q.subtopic}`);
    if (fresh.some((id) => met.has(id))) {
      console.error("  !! the fill served a question this student has already answered");
      process.exitCode = 1;
    }
    if (questions.length !== fresh.length) {
      console.error("  !! a filled id did not load as a PUBLIC MCQ");
      process.exitCode = 1;
    }
    probed = true;
    break;
  }
  if (!probed) console.log("(no short-pool student found in the next 60 — the fill was not exercised)");

  console.log(`\n${served}/${users.length} students get a full ${DRILL_SIZE}-question drill; ${thin} come up short.`);
  console.log("Not proven here: RLS (this reads service-role), layout, and the write loop.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
