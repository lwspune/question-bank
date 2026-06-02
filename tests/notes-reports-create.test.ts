/**
 * Integration test for createConceptReport — the helper invoked by
 * POST /api/notes/reports.
 *
 * Verifies:
 *   - Happy path: a signed-in user files a report on a real shipped concept → ok
 *   - Org routing: the report's org_id is the org that owns the bank questions
 *     the concept teaches (NOT the reporter's throwaway org)
 *   - One open report per (user, concept): repeat insert → duplicate_open_report
 *   - After resolving the first, the user can file a new one
 *   - Unknown (subtopicSlug, conceptSlug) → unknown_concept
 *   - details longer than the 2000-char cap → invalid_details
 *
 * Picks a real concept from NOTES_CHAPTERS[0] so org resolution runs against
 * the live bank. Skipped when env is missing.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { createConceptReport } from "@/lib/notes-reports/createConceptReport";
import { NOTES_CHAPTERS } from "@/lib/notes/chapters";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const PASSWORD = "notes-reports-create-pw-1234";
const RUN_ID = randomUUID().slice(0, 8);

// First shipped chapter's first subtopic + first concept — a real slug pair.
const chapter = NOTES_CHAPTERS[0];
const subtopicSlug = chapter.slugs[0];
const conceptSlug = chapter.notes[subtopicSlug].concepts[0].slug;

describe.skipIf(!HAS_ENV)("createConceptReport", () => {
  let admin: SupabaseClient;
  let reporterClient: SupabaseClient;
  let reporterId: string;
  let reporterOrgId: string;

  beforeAll(async () => {
    admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );

    const { data: org } = await admin
      .from("organizations")
      .insert({ name: `Concept Reports Reporter Org ${RUN_ID}` })
      .select("id")
      .single();
    reporterOrgId = org!.id;

    const { data: u } = await admin.auth.admin.createUser({
      email: `concept-reporter-${RUN_ID}@test.local`,
      password: PASSWORD,
      email_confirm: true,
    });
    reporterId = u.user!.id;
    await admin
      .from("org_members")
      .insert({ org_id: reporterOrgId, user_id: reporterId, role: "TEACHER" });

    reporterClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { auth: { persistSession: false } }
    );
    await reporterClient.auth.signInWithPassword({
      email: `concept-reporter-${RUN_ID}@test.local`,
      password: PASSWORD,
    });
  });

  afterAll(async () => {
    await admin
      .from("concept_reports")
      .delete()
      .eq("reported_by", reporterId);
    if (reporterId) await admin.auth.admin.deleteUser(reporterId);
    if (reporterOrgId)
      await admin.from("organizations").delete().eq("id", reporterOrgId);
  });

  it("happy path → ok, routed to the content org (not the reporter's)", async () => {
    const result = await createConceptReport(reporterClient, {
      subtopicSlug,
      conceptSlug,
      reportedBy: reporterId,
      category: "incorrect-content",
      details: "The definition contradicts the worked example below it.",
    });
    expect(result.kind).toBe("ok");

    if (result.kind === "ok") {
      const { data: row } = await admin
        .from("concept_reports")
        .select(
          "org_id, category, status, reported_by, subtopic_slug, concept_slug, concept_name, subject_route, chapter_slug"
        )
        .eq("id", result.id)
        .single();
      expect(row!.reported_by).toBe(reporterId);
      expect(row!.category).toBe("incorrect-content");
      expect(row!.status).toBe("open");
      expect(row!.subtopic_slug).toBe(subtopicSlug);
      expect(row!.concept_slug).toBe(conceptSlug);
      // Denormalized breadcrumb + route segments populated for triage.
      expect(typeof row!.concept_name).toBe("string");
      expect(row!.subject_route).toBe(chapter.subjectRoute);
      expect(row!.chapter_slug).toBe(chapter.chapterSlug);
      // Routed to the org that owns the bank content, NOT the reporter's org.
      expect(typeof row!.org_id).toBe("string");
      expect(row!.org_id).not.toBe(reporterOrgId);

      await admin.from("concept_reports").delete().eq("id", result.id);
    }
  });

  it("one open report per (user, concept): repeat → duplicate_open_report", async () => {
    const first = await createConceptReport(reporterClient, {
      subtopicSlug,
      conceptSlug,
      reportedBy: reporterId,
      category: "typo-or-formatting",
      details: null,
    });
    expect(first.kind).toBe("ok");

    const second = await createConceptReport(reporterClient, {
      subtopicSlug,
      conceptSlug,
      reportedBy: reporterId,
      category: "confusing-explanation",
      details: "again",
    });
    expect(second.kind).toBe("duplicate_open_report");

    if (first.kind === "ok") {
      await admin.from("concept_reports").delete().eq("id", first.id);
    }
  });

  it("after resolving the first, user can file a new one", async () => {
    const first = await createConceptReport(reporterClient, {
      subtopicSlug,
      conceptSlug,
      reportedBy: reporterId,
      category: "other",
      details: "first",
    });
    expect(first.kind).toBe("ok");

    if (first.kind === "ok") {
      await admin
        .from("concept_reports")
        .update({ status: "resolved", resolved_at: new Date().toISOString() })
        .eq("id", first.id);
    }

    const second = await createConceptReport(reporterClient, {
      subtopicSlug,
      conceptSlug,
      reportedBy: reporterId,
      category: "other",
      details: "second — new issue",
    });
    expect(second.kind).toBe("ok");

    await admin
      .from("concept_reports")
      .delete()
      .eq("subtopic_slug", subtopicSlug)
      .eq("concept_slug", conceptSlug)
      .eq("reported_by", reporterId);
  });

  it("returns unknown_concept for a bogus slug pair", async () => {
    const result = await createConceptReport(reporterClient, {
      subtopicSlug: "no-such-subtopic-xyz",
      conceptSlug: "no-such-concept-xyz",
      reportedBy: reporterId,
      category: "other",
      details: null,
    });
    expect(result.kind).toBe("unknown_concept");
  });

  it("returns unknown_concept when the concept slug isn't in a real subtopic", async () => {
    const result = await createConceptReport(reporterClient, {
      subtopicSlug,
      conceptSlug: "definitely-not-a-real-concept-slug",
      reportedBy: reporterId,
      category: "other",
      details: null,
    });
    expect(result.kind).toBe("unknown_concept");
  });

  it("returns invalid_details when details exceeds 2000 chars", async () => {
    const result = await createConceptReport(reporterClient, {
      subtopicSlug,
      conceptSlug,
      reportedBy: reporterId,
      category: "other",
      details: "x".repeat(2001),
    });
    expect(result.kind).toBe("invalid_details");
  });

  it("returns invalid_category for an unknown category", async () => {
    const result = await createConceptReport(reporterClient, {
      subtopicSlug,
      conceptSlug,
      reportedBy: reporterId,
      // @ts-expect-error — deliberately invalid
      category: "wrong-answer",
      details: null,
    });
    expect(result.kind).toBe("invalid_category");
  });
});
