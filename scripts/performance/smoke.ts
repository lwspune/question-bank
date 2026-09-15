/**
 * Drive the /dashboard/students/[id]/performance loader + pure core against
 * LIVE data.
 *
 *   npm run perf:smoke                # heaviest, emptiest, and a GAT student
 *   npm run perf:smoke -- <userId>    # one specific student
 *
 * That page is auth-gated and `force-dynamic`, so `next build` never executes
 * it: a green build proves it COMPILES and nothing more. This runs what the page
 * actually calls — the RPC read plus every pure helper over the real payload —
 * which is the half that fails against real data (a numeric arriving as a
 * string, a dims index out of range, a paper whose snapshot disagrees with its
 * total_questions).
 *
 * It does NOT prove the page lays out. That is owed to a browser.
 */
import { join } from "node:path";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

async function main() {
  const { createClient } = await import("@supabase/supabase-js");
  const { fetchStudentPerformance } = await import("@/lib/performance/query");
  const { buildPerformance } = await import("@/lib/performance/compute");
  const { buildFocusAreas } = await import("@/lib/performance/focusAreas");

  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const explicit = process.argv[2];
  const targets: { label: string; id: string }[] = [];

  if (explicit) {
    targets.push({ label: "requested", id: explicit });
  } else {
    // Heaviest: the payload-size and cap worst case. Emptiest: the empty-state
    // path, which is where a "no data" page most often throws instead.
    const { data: heavy } = await db
      .from("mock_attempts")
      .select("user_id")
      .in("status", ["submitted", "expired"])
      .not("score", "is", null)
      .limit(2000);
    const tally = new Map<string, number>();
    for (const r of (heavy ?? []) as { user_id: string }[]) {
      tally.set(r.user_id, (tally.get(r.user_id) ?? 0) + 1);
    }
    const ranked = [...tally.entries()].sort((a, b) => b[1] - a[1]);
    if (ranked.length === 0) throw new Error("no graded attempts in this project — nothing to smoke");
    targets.push({ label: "heaviest", id: ranked[0][0] });
    if (ranked.length > 1) targets.push({ label: "median-ish", id: ranked[Math.floor(ranked.length / 2)][0] });

    const { data: users } = await db.auth.admin.listUsers({ page: 1, perPage: 200 });
    const withAttempts = new Set(tally.keys());
    const empty = (users?.users ?? []).find((u) => !withAttempts.has(u.id));
    if (empty) targets.push({ label: "no-attempts", id: empty.id });
  }

  for (const { label, id } of targets) {
    const t0 = Date.now();
    const payload = await fetchStudentPerformance(db, id);
    const ms = Date.now() - t0;
    const bytes = JSON.stringify(payload).length;

    console.log(
      `\n── ${label} ${id} ──  ${ms}ms  ${(bytes / 1024).toFixed(0)}kB  ` +
        `attempts=${payload.attempts.length} facts=${payload.facts.length} ` +
        `weightage=${payload.weightage.length}`
    );

    assertPayload(payload);
    const perf = buildPerformance(payload, new Date());

    console.log(
      `   graded=${perf.summary.graded} retakesDropped=${perf.summary.retakesDropped} ` +
        `belowFloor=${perf.summary.belowFloor} quality=${perf.summary.attemptQuality ?? "—"} ` +
        `consistency=${perf.summary.consistency?.label ?? "—"}`
    );
    for (const lane of perf.lanes) {
      const cov = lane.coverage;
      console.log(
        `   [${lane.exam} · ${lane.subject}] papers=${lane.attempts} ` +
          `acc=${lane.accuracy === null ? "—" : `${lane.accuracy}%`} ` +
          `chapters=${lane.chapters.length} reached=${cov.reached}/${cov.inPaper} ` +
          `neverReached=${cov.neverReached} medianSecs=${cov.medianSecs ?? "—"} ` +
          `projected=${lane.projection ? `${lane.projection.total}/${lane.projection.ceiling}` : "—"}`
      );
      // The focus card only exists for NDA Mathematics, so this is the only
      // lane that exercises the concept graph against real chapter names — the
      // path where a taxonomy rename shows up as a silently empty list.
      const focus = buildFocusAreas(lane.exam, lane.subject, lane.chapters);
      if (focus) {
        console.log(
          `        focus: startHere=${focus.startHere.map((f) => f.chapter).join(", ") || "none"}`
        );
        console.log(
          `        readyToLearn=${focus.readyToLearn.slice(0, 5).map((r) => r.chapter).join(", ") || "none"}`
        );
      }
    }
  }
  console.log("\nOK");
}

/** Invariants that can only fail against real data. Each one has already been a
 *  real defect class somewhere in this repo. */
function assertPayload(p: {
  attempts: { attemptId: string; totalQuestions: number; score: number | null; maxScore: number | null }[];
  dims: { subjects: string[]; chapters: string[]; subtopics: string[] };
  facts: { a: string; s: number; c: number; t: number; rc: boolean }[];
  weightage: { q: number }[];
}) {
  // A numeric column arriving as a string is the exact regression students:smoke
  // guards; jsonb should parse it as a number, but assert rather than assume.
  const stringy = p.attempts.find(
    (a) => typeof a.score === "string" || typeof a.maxScore === "string"
  );
  if (stringy) throw new Error(`score/maxScore arrived as a string on ${stringy.attemptId}`);
  if (p.weightage.some((w) => typeof w.q === "string")) {
    throw new Error("weightage.q arrived as a string — the numeric coercion regressed");
  }

  // Every fact must resolve in dims. An out-of-range index renders as a blank
  // label, which looks like missing taxonomy rather than a payload bug.
  for (const f of p.facts) {
    if (!p.dims.subjects[f.s] || !p.dims.chapters[f.c] || !p.dims.subtopics[f.t]) {
      throw new Error(`fact has an unresolvable dims index: s=${f.s} c=${f.c} t=${f.t}`);
    }
  }

  // Every fact must belong to a returned attempt, or the roll-up silently drops it.
  const ids = new Set(p.attempts.map((a) => a.attemptId));
  const orphan = p.facts.find((f) => !ids.has(f.a));
  if (orphan) throw new Error(`fact references an attempt not in the payload: ${orphan.a}`);

  // The snapshot must be the whole paper. If these disagree, "never reached" is
  // measured against the wrong denominator and the pacing readout lies.
  const perAttempt = new Map<string, number>();
  for (const f of p.facts) perAttempt.set(f.a, (perAttempt.get(f.a) ?? 0) + 1);
  for (const a of p.attempts) {
    const n = perAttempt.get(a.attemptId);
    if (n === undefined) continue; // in-progress attempts contribute no facts, by design
    if (n !== a.totalQuestions) {
      throw new Error(
        `attempt ${a.attemptId}: ${n} facts but the paper declares ${a.totalQuestions} questions`
      );
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
