/**
 * PROD-CONTRACT: the authored session plan vs the live syllabus spine.
 *
 * A session cites book sections by `section_no` and the page resolves the
 * titles at render time. That is what keeps the plan from rotting into a stale
 * second copy of the textbook — and it is also the one thing that can break
 * silently: a ref the spine no longer has renders as a BLANK CELL, not an
 * error. Nothing at runtime would report it, so this is the standing probe.
 *
 * It fails in both directions, because both lose content quietly:
 *
 *   - a ref that no longer resolves -> a session teaches a blank;
 *   - a book section no session covers -> the book is being taught with a hole
 *     in it, and nothing on the page says so.
 *
 * The second is a WARNING, not a failure: a section can legitimately be skipped
 * (a chapter opener with no content of its own). It is asserted as a bounded
 * list so a new omission has to be looked at, rather than accruing unnoticed.
 *
 * Read-only. It never asserts how many sessions a chapter should have — pacing
 * is a teaching judgement, not a contract.
 */
import { describe, it, expect, beforeAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { XI_MATHS_PLAN } from "@/app/dashboard/planner/_data/xi-maths";
import { findDanglingRefs, findDuplicateIds, planTotals } from "@/lib/planner/plan";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const PLANS = [XI_MATHS_PLAN];

describe("session plans — structural invariants", () => {
  it.each(PLANS)("$key: session ids are unique across the whole plan", (plan) => {
    // Plan-wide, not per-chapter: an id is what teaching notes will key on, so
    // a collision would show one class's notes in another.
    expect(findDuplicateIds(plan)).toEqual([]);
  });

  it.each(PLANS)("$key: every session teaches something", (plan) => {
    for (const chapter of plan.chapters) {
      for (const session of chapter.sessions) {
        const taught =
          session.subtopics.length + session.concepts.length + (session.beats?.length ?? 0);
        expect(taught, `${session.id} cites no section and lists no beat`).toBeGreaterThan(0);
      }
    }
  });

  it.each(PLANS)("$key: a chapter with no book chapter_no names itself", (plan) => {
    // Otherwise the block renders with no heading at all.
    for (const chapter of plan.chapters) {
      if (chapter.chapterNo === null) {
        expect(chapter.title, "a null-chapter block needs a title").toBeTruthy();
      }
    }
  });

  it.each(PLANS)("$key: an extra states its source and why the book is short", (plan) => {
    for (const chapter of plan.chapters) {
      for (const session of chapter.sessions) {
        if (!session.extra) continue;
        expect(session.extra.title, `${session.id}: extra has no title`).toBeTruthy();
        // The reason is what makes an extra auditable rather than an opinion —
        // it quotes the syllabus-map ruling this session was placed from.
        expect(
          session.extra.reason.length,
          `${session.id}: extra needs a reason a teacher can check`,
        ).toBeGreaterThan(40);
      }
    }
  });
});

describe.skipIf(!HAS_ENV)("session plans vs the live spine", () => {
  let client: SupabaseClient;

  beforeAll(() => {
    client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } },
    );
  });

  it.each(PLANS)("$key: every section ref resolves", async (plan) => {
    const { data, error } = await client
      .from("syllabus_concepts")
      .select("section_no")
      .eq("source", plan.source)
      .eq("subject", plan.subject)
      .eq("class", plan.cls);
    expect(error).toBeNull();

    const known = new Set((data ?? []).map((r) => r.section_no as string));
    expect(known.size, "the spine returned nothing — wrong subject/class?").toBeGreaterThan(0);

    const dangling = findDanglingRefs(plan, known);
    expect(
      dangling,
      `refs not in the ${plan.source} spine:\n` +
        dangling.map((d) => `  ch${d.chapterNo} ${d.sessionId} -> ${d.ref}`).join("\n"),
    ).toEqual([]);
  });

  it.each(PLANS)("$key: every chapter_no it claims exists in the book", async (plan) => {
    const { data } = await client
      .from("syllabus_concepts")
      .select("chapter_no")
      .eq("source", plan.source)
      .eq("subject", plan.subject)
      .eq("class", plan.cls);

    const known = new Set((data ?? []).map((r) => r.chapter_no as number));
    for (const chapter of plan.chapters) {
      if (chapter.chapterNo === null) continue;
      expect(known.has(chapter.chapterNo), `chapter ${chapter.chapterNo} is not in the book`).toBe(
        true,
      );
    }
  });

  it.each(PLANS)("$key: reports book sections no session covers", async (plan) => {
    const { data } = await client
      .from("syllabus_concepts")
      .select("section_no, concept, chapter_no")
      .eq("source", plan.source)
      .eq("subject", plan.subject)
      .eq("class", plan.cls);

    const covered = new Set<string>();
    for (const chapter of plan.chapters) {
      for (const session of chapter.sessions) {
        for (const ref of [...session.subtopics, ...session.concepts]) covered.add(ref);
      }
    }

    // A PARENT is covered by any of its children — teaching §2.1.1 and §2.1.2
    // is teaching §2.1, and citing the parent again would be noise.
    const all = (data ?? []) as { section_no: string; concept: string; chapter_no: number }[];
    const uncovered = all.filter(
      (s) =>
        !covered.has(s.section_no) &&
        ![...covered].some((c) => c.startsWith(`${s.section_no}.`)),
    );

    expect(
      uncovered.map((s) => `ch${s.chapter_no} §${s.section_no} ${s.concept}`),
      "book sections no session teaches — each needs a deliberate decision",
    ).toEqual([]);
  });

  it.each(PLANS)("$key: names a bank exam that exists", async (plan) => {
    // A typo here empties the practice column with no error.
    const { data } = await client.from("exams").select("id").eq("name", plan.bankExam).maybeSingle();
    expect(data, `no exam named "${plan.bankExam}"`).toBeTruthy();
  });

  it.each(PLANS)("$key: totals are reportable", (plan) => {
    const totals = planTotals(plan);
    expect(totals.sessions).toBeGreaterThan(0);
    expect(totals.core + totals.extra).toBe(totals.sessions);
    expect(totals.nda + totals.cbse).toBe(totals.extra);
  });
});
