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
  const { buildLaneNav } = await import("@/lib/performance/laneNav");
  const { pageOf, PERF_PAGE_SIZE } = await import("@/lib/paging");
  const { fetchTaxonomyLinks } = await import("@/lib/performance/taxonomyQuery");
  const { browseExtrasHref, topicHref, OPEN_LIMIT } = await import("@/lib/performance/links");

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
    // The exam/subject nav, whose default is the exam of the most recent
    // COUNTED attempt. Printed because the rule is only interesting where the
    // student spans more than one exam, which no fixture can be.
    const nav = buildLaneNav(perf.lanes, perf.summary.latest?.exam ?? null, {});
    if (nav.exams.length > 0) {
      console.log(
        `   nav: exams=[${nav.exams.map((e) => `${e.exam}:${e.judged}`).join(" ")}] ` +
          `latest=${perf.summary.latest?.exam ?? "—"} → default=${nav.selectedExam} · ${nav.selected?.subject ?? "—"}` +
          (nav.exams.length > 1 && nav.selectedExam !== nav.exams[0].exam
            ? "  (recency default differs from busiest)"
            : "")
      );
    }

    for (const lane of perf.lanes) {
      const cov = lane.coverage;
      console.log(
        `   [${lane.exam} · ${lane.subject}] papers=${lane.attempts} ` +
          `acc=${lane.accuracy === null ? "—" : `${lane.accuracy}%`} ` +
          `chapters=${lane.chapters.length} reached=${cov.reached}/${cov.inPaper} ` +
          `neverReached=${cov.neverReached} medianSecs=${cov.medianSecs ?? "—"} ` +
          `projected=${lane.projection ? `${lane.projection.total}/${lane.projection.ceiling}` : "—"}`
      );
      // Where the clock went. The buckets must partition the total exactly —
      // a page whose bars under-account for the sitting is describing a
      // different paper from the coverage card directly above it.
      const t = lane.time;
      const bucketSum = t.correctSecs + t.wrongSecs + t.blankSecs + t.unjudgedSecs;
      if (bucketSum !== t.totalSecs) {
        throw new Error(
          `time buckets do not partition the clock for ${lane.exam}·${lane.subject}: ` +
            `${bucketSum} vs ${t.totalSecs}`
        );
      }
      if (t.totalSecs > 0) {
        const share = (n: number) => `${Math.round((n / t.totalSecs) * 100)}%`;
        console.log(
          `        time: ${(t.totalSecs / 60).toFixed(0)}min  ` +
            `correct=${share(t.correctSecs)}(${t.medianCorrectSecs === null ? "—" : `${t.medianCorrectSecs}s`}) ` +
            `wrong=${share(t.wrongSecs)}(${t.medianWrongSecs === null ? "—" : `${t.medianWrongSecs}s`}) ` +
            `blank=${share(t.blankSecs)}(${t.medianBlankSecs === null ? "—" : `${t.medianBlankSecs}s`}) ` +
            `zeroDwell=${t.zeroDwell}  ` +
            `slowest=${t.slowest.slice(0, 2).map((c) => `${c.chapter} ${c.medianSecs}s@${c.accuracy ?? "—"}%`).join(", ") || "none"}`
        );
      }

      // Both projection grains. The chapter marks MUST be the exact sum of the
      // subtopic marks beneath them — they are one number read at two grains,
      // and the card puts them behind a single toggle.
      if (lane.projection) {
        const { rows, subtopicRows } = lane.projection;
        for (const chapter of rows) {
          const mine = subtopicRows.filter((r) => r.chapter === chapter.chapter);
          const summed = mine.reduce((n, r) => n + r.marksAtStake, 0);
          if (Math.abs(summed - chapter.marksAtStake) > 1e-6) {
            throw new Error(
              `subtopic marks do not sum to their chapter for ${lane.exam}·${lane.subject}` +
                ` / ${chapter.chapter}: ${summed} vs ${chapter.marksAtStake}`
            );
          }
          // ...and so must the PROJECTION, which it did not until 2026-09-15:
          // marks were summed while the projection was separately POOLED, and
          // the card showed one headline over both. 94 vs 86.55 on the heaviest
          // student. Unit-tested too; asserted here because only live data has
          // chapters whose subtopics are mostly untested, which is the term
          // that made the two diverge.
          const summedProj = mine.reduce((n, r) => n + r.projected, 0);
          if (Math.abs(summedProj - chapter.projected) > 1e-6) {
            throw new Error(
              `subtopic PROJECTION does not sum to its chapter for ${lane.exam}·${lane.subject}` +
                ` / ${chapter.chapter}: ${summedProj} vs ${chapter.projected}`
            );
          }
          // A chapter with real answers whose bank subtopics resolve to NONE of
          // the student's would silently project 0 while still reporting an
          // accuracy. It cannot happen while both sides read one taxonomy, and
          // that is exactly the kind of assumption worth asserting against live
          // data rather than believing. 899/899 clean at the last run.
          if (chapter.judged > 0 && mine.length > 0 && mine.every((r) => !r.tested)) {
            throw new Error(
              `chapter ${chapter.chapter} (${lane.exam}·${lane.subject}) has ` +
                `${chapter.judged} answers but NO bank subtopic resolved — the ` +
                `projection would read 0 against a non-null accuracy`
            );
          }
        }
        if (subtopicRows.length > 0) {
          const top = subtopicRows[0];
          console.log(
            `        projection: ${rows.length} chapters / ${subtopicRows.length} subtopics  ` +
              `top=${top.subtopic} (${top.chapter}) +${top.gap.toFixed(1)} of ${top.marksAtStake.toFixed(1)}` +
              `${top.tested ? ` · ${top.accuracy}% of ${top.reached} reached` : " · never tested"}`
          );
        }
      }

      // Paging over the real ranked lists — the cards that used to truncate
      // silently. `total` must survive paging, since that is what the footer
      // promises the reader.
      const rankedLists: [string, readonly unknown[]][] = [
        ["wrongAudit", lane.wrongAudit],
        ["skipAudit", lane.skipAudit],
        ["projection", lane.projection?.rows ?? []],
      ];
      for (const [noun, rows] of rankedLists) {
        const first = pageOf(rows, 1, PERF_PAGE_SIZE);
        const last = pageOf(rows, first.pageCount, PERF_PAGE_SIZE);
        if (first.total !== rows.length || last.page !== first.pageCount) {
          throw new Error(`paging lost rows in ${noun} for ${lane.exam}·${lane.subject}`);
        }
        if (first.pageCount > 4) {
          console.log(`        ${noun}: ${rows.length} rows → ${first.pageCount} pages`);
        }
      }

      // The audits' drill-down links, and the count/id agreement behind them.
      // The badge reads the COUNT and the href reads the ID LIST; if those can
      // disagree, a row reading "7 skipped" opens five questions and nothing
      // anywhere reports it.
      for (const [noun, rows] of [
        ["wrong", lane.wrongAudit],
        ["skipped", lane.skipAudit],
      ] as const) {
        for (const r of rows) {
          const ids = noun === "wrong" ? r.wrongQuestionIds : r.seenBlankQuestionIds;
          const count = noun === "wrong" ? r.wrong : r.seenBlank;
          if (ids.length !== count) {
            throw new Error(
              `${noun} count and id list disagree for ${lane.exam}·${lane.subject}` +
                ` / ${r.chapter} · ${r.subtopic}: ${count} vs ${ids.length}`
            );
          }
          if (new Set(ids).size !== ids.length) {
            throw new Error(`${noun} ids repeat for ${r.chapter} · ${r.subtopic}`);
          }
          if (ids.length > 0 && browseExtrasHref(ids) === null) {
            throw new Error(`${noun} link vanished for ${r.chapter} · ${r.subtopic}`);
          }
        }
        const over = rows.filter((r) =>
          (noun === "wrong" ? r.wrongQuestionIds : r.seenBlankQuestionIds).length > OPEN_LIMIT
        ).length;
        const worst = Math.max(
          0,
          ...rows.map((r) => (noun === "wrong" ? r.wrong : r.seenBlank))
        );
        if (rows.length > 0) {
          console.log(
            `        ${noun} audit: ${rows.length} subtopics, worst holds ${worst}` +
              (over > 0 ? `  ⚠ ${over} over the ${OPEN_LIMIT}-id cap (label discloses it)` : "")
          );
        }
      }

      // The PROJECTION links to the topic in the bank, and the join key is the
      // NAME. Nothing but live data can test that: a chapter renamed since the
      // attempt was sat resolves to nothing, and the row quietly loses its link.
      // This reports the resolution rate rather than asserting one, because a
      // genuinely-renamed chapter is a fact about the bank, not a bug here.
      if (lane.projection) {
        const links = await fetchTaxonomyLinks(db, lane.exam, lane.subject);
        const chapters = lane.projection.rows;
        const subtopics = lane.projection.subtopicRows;
        const chapterHits = chapters.filter((r) => topicHref(links, r.chapter) !== null);
        const subtopicHits = subtopics.filter((r) =>
          (topicHref(links, r.chapter, r.subtopic) ?? "").includes("subtopicIds=")
        );
        console.log(
          `        topic links: chapters ${chapterHits.length}/${chapters.length}, ` +
            `subtopics ${subtopicHits.length}/${subtopics.length}` +
            (links.examId === null ? "  ⚠ subject did not resolve" : "")
        );
        const missed = chapters.filter((r) => topicHref(links, r.chapter) === null).slice(0, 3);
        if (missed.length > 0) {
          console.log(`          unresolved chapters: ${missed.map((r) => r.chapter).join(", ")}`);
        }
      }

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
