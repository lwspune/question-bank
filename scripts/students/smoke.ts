/**
 * Drive the /dashboard/students roster's OWN loader against live data.
 *
 *   npm run students:smoke
 *
 * That page is auth-gated and `force-dynamic`, so `next build` never executes it:
 * a green build proves it COMPILES and nothing more. This runs the loader the page
 * actually calls, plus the pure filter/sort/CSV core over the real rows — the half
 * that can fail against real data (RPC column drift, a numeric arriving as a string,
 * a null where the view-model expects a value).
 *
 * It does NOT prove the page lays out. That is owed to a browser.
 */
import { join } from "node:path";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

async function main() {
  const { createClient } = await import("@supabase/supabase-js");
  const { fetchStudentRoster } = await import("@/lib/students/rosterQuery");
  const { filterRoster, sortRoster, summariseRoster, toRosterCsv, EXAM_UNSPECIFIED } = await import(
    "@/lib/students/roster"
  );

  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const rows = await fetchStudentRoster(db);
  const now = new Date();
  console.log(`rows: ${rows.length}`);
  if (rows.length === 0) throw new Error("roster came back EMPTY — the RPC or the grant is wrong");

  // Every field the view-model promises must actually arrive. A silently-missing
  // RPC column would otherwise surface as a blank column in the browser.
  const missing = (["id", "name", "email", "signedUp", "provider"] as const).filter(
    (k) => rows.some((r) => r[k] === undefined || r[k] === null)
  );
  if (missing.length) throw new Error(`non-nullable fields missing on some rows: ${missing.join(", ")}`);
  if (rows.some((r) => typeof r.avgPct === "string")) {
    throw new Error("avgPct arrived as a string — the numeric coercion regressed");
  }
  if (rows.some((r) => !Array.isArray(r.targetExams))) {
    throw new Error("targetExams is not an array — the text[] mapping regressed");
  }

  const all = { exams: [], window: { kind: "all" }, dateField: "lastActive", search: "" } as const;
  const summary = summariseRoster(rows, now);
  console.log(
    `students=${summary.students} active7=${summary.activeLast7} never=${summary.neverActive} ` +
      `mocks=${summary.totalMocksSubmitted} avg=${summary.avgPct ?? "—"}% mobile=${summary.withMobile}`
  );

  const d30 = filterRoster(rows, { ...all, window: { kind: "days", days: 30 } }, now);
  const never = filterRoster(rows, { ...all, window: { kind: "never" } }, now);
  const nda = filterRoster(rows, { ...all, exams: ["nda"] }, now);
  const none = filterRoster(rows, { ...all, exams: [EXAM_UNSPECIFIED] }, now);
  console.log(`active 30d=${d30.length} never=${never.length} nda=${nda.length} no-exam=${none.length}`);

  // The buckets partition the roster — if these don't add up, a filter is dropping
  // students rather than classifying them.
  if (never.length + rows.filter((r) => r.lastActive !== null).length !== rows.length) {
    throw new Error("never-active bucket does not complement the active rows");
  }

  const top = sortRoster(rows, "mocksSubmitted", "desc").slice(0, 5);
  console.log("\ntop 5 by mocks submitted:");
  for (const s of top) {
    console.log(
      `  ${String(s.mocksSubmitted).padStart(3)}  ${s.avgPct === null ? "  —  " : `${String(s.avgPct).padStart(5)}%`}` +
        `  qs=${String(s.qsAnswered).padStart(5)}  last=${s.lastActive?.slice(0, 10) ?? "never"}  ${s.name}`
    );
  }

  // Nulls-last must hold on real data, not just in the unit test's fixtures.
  const byScore = sortRoster(rows, "avgPct", "desc");
  const firstNull = byScore.findIndex((r) => r.avgPct === null);
  if (firstNull !== -1 && byScore.slice(firstNull).some((r) => r.avgPct !== null)) {
    throw new Error("nulls-last violated when sorting by avgPct over live rows");
  }

  const csv = toRosterCsv(sortRoster(rows, "mocksSubmitted", "desc"));
  const lines = csv.split("\n");
  if (lines.length !== rows.length + 1) {
    throw new Error(`CSV has ${lines.length} lines for ${rows.length} rows (+header)`);
  }
  // The defect that motivated this page: a mobile must never reach the file as a
  // bare number Excel can round into scientific notation.
  if (/(^|,)"\d{12}"/.test(csv)) throw new Error("CSV wrote a bare 12-digit mobile — Excel will mangle it");
  if (/\d\.\d+E\+\d+/i.test(csv)) throw new Error("CSV already contains scientific notation");
  console.log(`\nCSV ok: ${lines.length} lines, mobiles written as text`);

  // -- /dashboard/students/[id] -- the per-student detail loader ----------------
  // The detail page reads its engagement counts from the SAME get_student_roster
  // aggregate as the list above, filtered server-side to one row. That sharing is
  // the fix for the defect this page had (the roster row carried more than the
  // page it opened), so the invariant worth asserting is that the two AGREE.
  const { fetchStudentDetail } = await import("@/lib/students/detailQuery");
  const { examLabels, activityLabel, relativeTime } = await import("@/lib/students/profileView");

  // Probe a spread, not one row: the most engaged student, one who has a mobile,
  // and one who has never acted -- the three shapes that fail differently.
  const mostEngaged = sortRoster(rows, "mocksSubmitted", "desc")[0];
  const probes = [
    mostEngaged,
    // Explicitly NOT the row above: the top student usually has a mobile too, so
    // an unguarded find() collapses two of the three shapes into one probe.
    rows.find((r) => r.mobile !== null && r.id !== mostEngaged?.id),
    rows.find((r) => r.lastActive === null),
  ].filter((r): r is (typeof rows)[number] => Boolean(r));

  console.log("");
  console.log("detail loader:");
  for (const row of probes) {
    const detail = await fetchStudentDetail(db, row.id);
    if (!detail) throw new Error(`fetchStudentDetail returned null for a live student (${row.id})`);

    // The anti-drift assertion. A mismatch means the .eq() filter on the
    // set-returning RPC stopped matching and the page silently fell back to zeros.
    const drift = (
      [
        ["mocksSubmitted", detail.engagement.mocksSubmitted, row.mocksSubmitted],
        ["qsAnswered", detail.engagement.qsAnswered, row.qsAnswered],
        ["notesSubtopics", detail.engagement.notesSubtopics, row.notesSubtopics],
        ["bookmarks", detail.engagement.bookmarks, row.bookmarks],
        ["lastActive", detail.engagement.lastActive, row.lastActive],
      ] as const
    ).filter(([, a, b]) => a !== b);
    if (drift.length) {
      throw new Error(
        `detail disagrees with the roster row for ${row.id}: ` +
          drift.map(([k, a, b]) => `${k} ${String(a)} != ${String(b)}`).join(", ")
      );
    }

    if (!Array.isArray(detail.capture.targetExams)) {
      throw new Error("capture.targetExams is not an array -- the text[] mapping regressed");
    }
    // activityTotal comes from count:"exact"; the list is capped. If the total
    // ever reads SMALLER than the page we rendered, the count is being derived
    // from the truncated payload -- the 1000-row trap in miniature.
    if (detail.activityTotal < detail.activity.length) {
      throw new Error(`activityTotal ${detail.activityTotal} < ${detail.activity.length} rendered events`);
    }
    // Every kind must resolve to a human label, or the UI prints a raw enum.
    const rawKinds = detail.activity.filter((e) => activityLabel(e.kind) === e.kind).map((e) => e.kind);
    if (rawKinds.length) {
      throw new Error(
        `activity kinds with no label (ACTIVITY_LABELS has drifted): ${[...new Set(rawKinds)].join(", ")}`
      );
    }

    console.log(
      `  ${detail.profile.name.slice(0, 28).padEnd(28)} ` +
        `exams=${examLabels(detail.capture.targetExams).join("/") || "-"} ` +
        `mobile=${detail.capture.mobile ? "yes" : "-"} ` +
        `mocks=${detail.engagement.mocksSubmitted} events=${detail.activityTotal} ` +
        `last=${relativeTime(detail.engagement.lastActive, now)}`
    );
  }

  // A deleted/unknown id must return null so the page can notFound() rather than throw.
  if ((await fetchStudentDetail(db, "00000000-0000-0000-0000-000000000000")) !== null) {
    throw new Error("fetchStudentDetail returned a detail for a non-existent user");
  }

  console.log("\nSMOKE: PASS (loaders + pure core proven; page LAYOUT still owed to a browser)");
}

main().catch((e) => {
  console.error("SMOKE: FAIL —", e instanceof Error ? e.message : e);
  process.exit(1);
});
