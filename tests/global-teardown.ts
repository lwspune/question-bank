/**
 * Runs once after every `npm test`. Sweeps any leftover test data out of the
 * live Supabase project so the public /browse Subject + Chapter filters (and
 * the bank counts) don't show garbage values.
 *
 * Primary mechanism — ORG SWEEP. Every integration test creates throwaway
 * rows under a throwaway organization whose name carries an 8-hex run-id token
 * (see `isTestOrgName`). Deleting that org CASCADES to its questions (→ which
 * cascade to options / concept_tags / principle_tags / reports), its
 * org_members, and its upload_jobs (verified delete_rules, 2026-06-11). The
 * one non-cascading edge is `question_reports.org_id` (RESTRICT), so reports
 * are cleared first. This single signal catches EVERY leaked fixture class —
 * including the upload-flow fixtures that use a real sha256 content_hash and
 * sit under canonical taxonomy, which no content/text pattern could catch.
 *
 * Secondary sweeps:
 *  - Test taxonomy (global, no org_id, so it can't cascade from the org):
 *    subjects whose name carries a run-id token, deleted only when empty.
 *  - Canonical-adjacent auto-creates by `goodXlsxBuffer` under canonical
 *    subjects/chapters (Chemistry > "Chemical Thermodynamics",
 *    Differentiation > "Chain Rule"), deleted only when empty + exam-scoped so
 *    a real same-named chapter (e.g. JEE Mains > Chemistry > Chemical
 *    Thermodynamics) is never touched.
 *  - Auth users: the org cascade clears `org_members` but NOT the `auth.users`
 *    rows behind them, so `@test.local` fixtures are swept via the admin API.
 *
 * Guardrail: after every sweep it re-asserts zero test orgs / test subjects /
 * test auth users remain and THROWS if any survived — turning a silent prod
 * leak into a red run. (Safe to assert "zero" only because globalTeardown runs
 * after the whole suite, with no other file still mid-flight.)
 *
 * Per-suite afterAll hooks still clean up on the happy path; this is the
 * safety net for crashed / killed / parallel-interrupted runs.
 *
 * Why this rewrite (2026-06-11): the old teardown swept only test-NAMED
 * subjects by a hardcoded prefix list (which had already rotted —
 * `EditSetSubj_` was missing) and two canonical-adjacent nodes. It had NO
 * mechanism for test questions inserted under canonical taxonomy, so 18 test
 * questions (11 PUBLIC) + 12 orgs leaked into production. See the Decisions log.
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { isTestOrgName, isTestTaxonomyName, isTestAuthEmail, sweepUntilClean } from "./global-teardown-helpers";
import { resolveSupabaseTestEnv } from "./helpers/testenv";

export default async function setup() {
  return async function teardown(): Promise<void> {
    // Same env resolution as tests/setup.ts — globalSetup does NOT go through
    // setupFiles, and before this it read .env.local directly, which would
    // have swept PROD while the workers wrote to the test project.
    resolveSupabaseTestEnv();

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) return; // tests skipped — nothing to clean

    const admin = createClient(url, key, { auth: { persistSession: false } });

    await sweepTestData(admin);

    // GUARDRAIL — fail the run loudly if pollution survived. Resilient to the
    // delete-visibility race: re-sweeps + re-checks before throwing on a leak
    // that genuinely persists (see assertNoLeakedTestData).
    await assertNoLeakedTestData(admin);
  };
}

/**
 * The four-stage sweep. Idempotent + re-runnable, so the guardrail can call it
 * again when a post-sweep read still sees a (likely already-doomed) survivor.
 */
async function sweepTestData(admin: SupabaseClient): Promise<void> {
  // ── 1) ORG SWEEP (primary) ──────────────────────────────────────────────
  const { data: orgs } = await admin.from("organizations").select("id, name");
  const testOrgIds = (orgs ?? [])
    .filter((o) => isTestOrgName(o.name))
    .map((o) => o.id);

  if (testOrgIds.length > 0) {
    // question_reports.org_id is RESTRICT — clear it before the org cascade.
    await admin.from("question_reports").delete().in("org_id", testOrgIds);
    // Cascades questions (→ options/tags/reports), org_members, upload_jobs.
    await admin.from("organizations").delete().in("id", testOrgIds);
  }

  // ── 2) TEST TAXONOMY (global, no org_id) ────────────────────────────────
  const { data: subjects } = await admin.from("subjects").select("id, name");
  const testSubjectIds = (subjects ?? [])
    .filter((s) => isTestTaxonomyName(s.name))
    .map((s) => s.id);
  for (const subjectId of testSubjectIds) {
    // Only drop a test subject once the org sweep has emptied it.
    const { count } = await admin
      .from("questions")
      .select("id", { count: "exact", head: true })
      .eq("subject_id", subjectId);
    if (!count) await admin.from("subjects").delete().eq("id", subjectId);
  }

  // ── 3) CANONICAL-ADJACENT AUTO-CREATES (empty + exam-scoped) ────────────
  await deleteEmptyCanonicalAdjacentChapter(admin, "Chemistry", "Chemical Thermodynamics");
  await deleteEmptyCanonicalAdjacentSubtopic(admin, ["Maths", "Mathematics"], "Differentiation", "Chain Rule");

  // ── 4) AUTH USERS (admin API; org cascade leaves auth.users behind) ─────
  const testUserIds = await listTestAuthUserIds(admin);
  if (testUserIds.length > 0) {
    // entitlements.user_id → auth.users; clear before deleting the user.
    await admin.from("entitlements").delete().in("user_id", testUserIds);
    for (const id of testUserIds) await admin.auth.admin.deleteUser(id);
  }
}

/** Page through auth.users and collect the @test.local fixture accounts. */
async function listTestAuthUserIds(admin: SupabaseClient): Promise<string[]> {
  const ids: string[] = [];
  for (let page = 1; ; page++) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 1000 });
    if (error) break;
    const users = data?.users ?? [];
    for (const u of users) if (isTestAuthEmail(u.email)) ids.push(u.id);
    if (users.length < 1000) break;
  }
  return ids;
}

/** One read pass: the list of surviving test-signature "problems" (empty = clean). */
async function collectLeaks(admin: SupabaseClient): Promise<string[]> {
  const problems: string[] = [];

  const { data: orgs } = await admin.from("organizations").select("name");
  const leakedOrgs = (orgs ?? []).filter((o) => isTestOrgName(o.name)).map((o) => o.name);
  if (leakedOrgs.length) problems.push(`orgs: ${leakedOrgs.join(", ")}`);

  const { data: subjects } = await admin.from("subjects").select("name");
  const leakedSubjects = (subjects ?? []).filter((s) => isTestTaxonomyName(s.name)).map((s) => s.name);
  if (leakedSubjects.length) problems.push(`subjects: ${leakedSubjects.join(", ")}`);

  const leakedUsers = await listTestAuthUserIds(admin);
  if (leakedUsers.length) problems.push(`auth users: ${leakedUsers.length}`);

  return problems;
}

/**
 * Post-sweep invariant: no test-signature rows survived. Runs after the whole
 * suite (this is globalTeardown), so it CAN assert "zero test orgs" — no other
 * file is still mid-flight. Throwing here turns a silent prod leak into a red run.
 *
 * RESILIENT to the delete-visibility race (the cascade-delete can lag on the
 * shared pooled connection): `sweepUntilClean` re-sweeps + re-checks up to 3
 * times (750 ms apart) before failing, so an already-doomed survivor clears on
 * retry instead of false-throwing and blocking the push. A GENUINE leak persists
 * through every re-sweep and still fails the run.
 */
async function assertNoLeakedTestData(admin: SupabaseClient): Promise<void> {
  const problems = await sweepUntilClean(
    () => collectLeaks(admin),
    () => sweepTestData(admin),
    { attempts: 3, delayMs: 750 }
  );

  if (problems.length) {
    throw new Error(
      `global-teardown left test data in the LIVE project (persisted through 3 re-sweeps — ` +
        `not a visibility race) — ${problems.join(" | ")}. ` +
        `Investigate the sweep before trusting bank counts.`
    );
  }
}

async function deleteEmptyCanonicalAdjacentChapter(
  admin: SupabaseClient,
  subjectName: string,
  chapterName: string
): Promise<void> {
  const { data: subjects } = await admin
    .from("subjects")
    .select("id")
    .eq("name", subjectName);
  for (const s of subjects ?? []) {
    const { data: chapters } = await admin
      .from("chapters")
      .select("id")
      .eq("subject_id", s.id)
      .eq("name", chapterName);
    for (const c of chapters ?? []) {
      const { count } = await admin
        .from("questions")
        .select("id", { count: "exact", head: true })
        .eq("chapter_id", c.id);
      if (!count) await admin.from("chapters").delete().eq("id", c.id);
    }
  }
}

async function deleteEmptyCanonicalAdjacentSubtopic(
  admin: SupabaseClient,
  subjectNames: string[],
  chapterName: string,
  subtopicName: string
): Promise<void> {
  const { data: subjects } = await admin
    .from("subjects")
    .select("id")
    .in("name", subjectNames);
  for (const s of subjects ?? []) {
    const { data: chapters } = await admin
      .from("chapters")
      .select("id")
      .eq("subject_id", s.id)
      .eq("name", chapterName);
    for (const c of chapters ?? []) {
      const { data: subtopics } = await admin
        .from("subtopics")
        .select("id")
        .eq("chapter_id", c.id)
        .eq("name", subtopicName);
      for (const st of subtopics ?? []) {
        const { count } = await admin
          .from("questions")
          .select("id", { count: "exact", head: true })
          .eq("subtopic_id", st.id);
        if (!count) await admin.from("subtopics").delete().eq("id", st.id);
      }
    }
  }
}
