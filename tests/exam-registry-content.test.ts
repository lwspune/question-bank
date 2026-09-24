/**
 * PROD-CONTRACT: `EXAM_REGISTRY.noPublicContent` vs the live bank.
 *
 * The student exam chips on /welcome + /account are a module-level const built
 * from static TS, so whether an exam has any content is HAND-DECLARED — there
 * is no request in which to count rows. That is the same bargain `mixedFormats`
 * makes, and it carries the same obligation: a declared fact rots unless
 * something re-measures it. This is that probe.
 *
 * WHY IT MATTERS MORE THAN THE FORMAT FLAG. A stale `mixedFormats` draws or
 * hides a filter control, and `shouldShowFormatFilter` pins the control on
 * whenever the filter is active, so it can never strand a viewer. This flag
 * decides what a student may set as their TARGET EXAM, which is persisted to
 * `student_profiles.target_exams` and then steers `/drill`, the mock
 * recommendations and the report email. Wrong here follows the student around.
 *
 * It fails in BOTH directions, and both have already happened or are about to:
 *   - flag MISSING on an empty exam → `isc-12` shipped as a live chip pointing
 *     at an exam with no `exams` row at all.
 *   - flag STALE after a PUBLIC flip → the IPMAT exams enter the registry
 *     flagged, and removing the flag is the launch step. If someone flips the
 *     questions PUBLIC and forgets, the exam is silently unpickable.
 *
 * Read-only, service_role (no statement_timeout), 15-odd indexed counts.
 */
import { describe, it, expect, beforeAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { retryOnStatementTimeout } from "./helpers/retryTimeout";
import { EXAM_REGISTRY } from "@/lib/exam/examContext";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

describe.skipIf(!HAS_ENV)("EXAM_REGISTRY.noPublicContent vs the live bank", () => {
  let client: SupabaseClient;
  /** registry slug → PUBLIC question count. A missing `exams` row counts as 0. */
  const publicCount = new Map<string, number>();
  /** registry slug → whether `examName` resolved to an `exams` row at all. */
  const hasExamRow = new Map<string, boolean>();

  beforeAll(async () => {
    client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );

    const { data: exams, error } = await retryOnStatementTimeout(() =>
      client.from("exams").select("id, name")
    );
    expect(error).toBeNull();
    const idByName = new Map((exams ?? []).map((e) => [e.name as string, e.id as string]));

    for (const entry of EXAM_REGISTRY) {
      const id = idByName.get(entry.examName);
      hasExamRow.set(entry.slug, !!id);
      if (!id) {
        publicCount.set(entry.slug, 0);
        continue;
      }
      // count via the response header, never from a row payload — the
      // PostgREST 1000-row truncation trap has bitten this codebase five times.
      const { count, error: cErr } = await retryOnStatementTimeout(() =>
        client
          .from("questions")
          .select("id", { count: "exact", head: true })
          .eq("exam_id", id)
          .eq("visibility", "PUBLIC")
      );
      expect(cErr).toBeNull();
      publicCount.set(entry.slug, count ?? 0);
    }
  }, 120_000);

  it("flags every exam that has no PUBLIC questions", () => {
    const shouldBeFlagged = EXAM_REGISTRY.filter(
      (e) => (publicCount.get(e.slug) ?? 0) === 0 && !e.noPublicContent
    ).map((e) => `${e.slug} (0 PUBLIC, examRow=${hasExamRow.get(e.slug)})`);

    // An empty, unflagged exam is offered to students as a target that resolves
    // to nothing. Add `noPublicContent: true` to its registry entry.
    expect(shouldBeFlagged).toEqual([]);
  });

  it("does not flag an exam that HAS PUBLIC questions", () => {
    const staleFlag = EXAM_REGISTRY.filter(
      (e) => e.noPublicContent && (publicCount.get(e.slug) ?? 0) > 0
    ).map((e) => `${e.slug} (${publicCount.get(e.slug)} PUBLIC — remove the flag)`);

    // The launch direction. Content went PUBLIC and the flag was left behind,
    // so the exam is live everywhere except the one control that lets a student
    // choose it.
    expect(staleFlag).toEqual([]);
  });

  it("resolves every unflagged exam's examName to an exams row", () => {
    // `examName` is the join key `loadActiveExam` uses to turn a slug into a
    // UUID. A name that matches nothing is the isc-12 failure, and it is
    // invisible to typecheck because the name is just a string.
    const unresolved = EXAM_REGISTRY.filter(
      (e) => !e.noPublicContent && !hasExamRow.get(e.slug)
    ).map((e) => `${e.slug} -> "${e.examName}"`);
    expect(unresolved).toEqual([]);
  });

  it("reports the live split, so a reviewer can see what is withheld", () => {
    const withheld = EXAM_REGISTRY.filter((e) => e.noPublicContent).map((e) => e.slug);
    const offered = EXAM_REGISTRY.filter((e) => !e.noPublicContent).map((e) => e.slug);
    // Not an assertion about which exams — that is the job of the three above.
    // This pins the INVARIANT that the two sets partition the registry, which
    // is what `buildExamChips` relies on when it filters.
    expect([...withheld, ...offered].sort()).toEqual(EXAM_REGISTRY.map((e) => e.slug).sort());
    console.log(
      `  offered: ${offered.length} · withheld: ${withheld.length}` +
        (withheld.length ? ` (${withheld.join(", ")})` : "")
    );
  });
});
