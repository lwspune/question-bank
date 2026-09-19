/**
 * Proves the provenance redaction is actually WIRED, not merely implemented.
 *
 * WHY THIS EXISTS SEPARATELY FROM tests/public-pyq-note.test.ts. That suite
 * proves the pure rule and would pass in full even if `queryQuestionsByIds`
 * never called the helper — the defect this guards against is an omission at
 * the call site, which a test of the function alone cannot see. So this one
 * inserts real rows, reads them back through the real query, and asserts on
 * what the page would actually receive.
 *
 * Three properties, each load-bearing:
 *   1. A `practice` row's source blurb NEVER reaches a default caller. That is
 *      the whole point: 11,330 Balbharati / 7,359 LWS / 1,396 Oswaal mentions
 *      leave the public surfaces via this one path.
 *   2. A `pyq` row's short sitting identifier SURVIVES. Redaction that also ate
 *      "10th May Shift 1" would be a regression, not a fix — one MHT-CET month
 *      holds 14 distinct papers and that string is how a student tells them
 *      apart.
 *   3. `includeRawProvenance` returns the column verbatim, so a superadmin can
 *      still audit the source.
 *
 * Fixtures are written, so this runs against the dedicated test project only
 * (tests/setup.ts hard-refuses prod) and cleans up after itself.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { queryQuestionsByIds } from "@/lib/questions/query";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const RUN_ID = randomUUID().slice(0, 8);

/** A real leak from the live bank, not an invented string. */
const PRACTICE_NOTE =
  "Maharashtra State Board (Class 9) — Triangles (Balbharati textbook, Part 2 Geometry)";
/** A real sitting identifier from the live bank. */
const PYQ_NOTE = "10th May Shift 1";

describe.skipIf(!HAS_ENV)("provenance redaction is wired into the read path", () => {
  let admin: SupabaseClient;
  let practiceId: string;
  let pyqId: string;

  beforeAll(async () => {
    admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );

    // Borrow taxonomy from a live row rather than seeding our own — the FKs
    // just need to resolve, and the redaction does not read any of them.
    const { data: donor, error: dErr } = await admin
      .from("questions")
      .select("org_id, exam_id, subject_id, chapter_id, created_by")
      .limit(1)
      .single();
    if (dErr) throw dErr;

    const base = {
      org_id: donor.org_id,
      exam_id: donor.exam_id,
      subject_id: donor.subject_id,
      chapter_id: donor.chapter_id,
      created_by: donor.created_by,
      difficulty: "EASY" as const,
      visibility: "PUBLIC" as const,
    };

    const { data: rows, error: iErr } = await admin
      .from("questions")
      .insert([
        {
          ...base,
          text: `provenance practice fixture ${RUN_ID}`,
          content_hash: `prov-practice-${RUN_ID}`,
          question_kind: "practice",
          pyq_note: PRACTICE_NOTE,
        },
        {
          ...base,
          text: `provenance pyq fixture ${RUN_ID}`,
          content_hash: `prov-pyq-${RUN_ID}`,
          question_kind: "pyq",
          pyq_note: PYQ_NOTE,
        },
      ])
      .select("id, question_kind");
    if (iErr) throw iErr;

    practiceId = rows!.find((r) => r.question_kind === "practice")!.id;
    pyqId = rows!.find((r) => r.question_kind === "pyq")!.id;
  });

  afterAll(async () => {
    if (!admin) return;
    const ids = [practiceId, pyqId].filter(Boolean);
    if (ids.length) await admin.from("questions").delete().in("id", ids);
  });

  it("redacts a practice row's source blurb for a default caller", async () => {
    const [row] = await queryQuestionsByIds(admin, [practiceId]);
    expect(row.pyqNote).toBeNull();
  });

  it("keeps a pyq row's sitting identifier for a default caller", async () => {
    const [row] = await queryQuestionsByIds(admin, [pyqId]);
    expect(row.pyqNote).toBe(PYQ_NOTE);
  });

  it("returns the raw blurb when the caller asks for it (superadmin)", async () => {
    const [row] = await queryQuestionsByIds(admin, [practiceId], {
      includeRawProvenance: true,
    });
    expect(row.pyqNote).toBe(PRACTICE_NOTE);
  });

  // The redaction must not be mistaken for "practice rows are dropped" — the
  // question itself still renders, only its note is withheld.
  it("still returns the practice row itself, note aside", async () => {
    const [row] = await queryQuestionsByIds(admin, [practiceId]);
    expect(row.id).toBe(practiceId);
    expect(row.text).toContain(RUN_ID);
    expect(row.questionKind).toBe("practice");
  });

  // Guards the fail-closed default at the SITE, not just in the helper: an
  // explicit `false` must behave exactly like omitting the option.
  it("treats includeRawProvenance:false the same as omitting it", async () => {
    const [row] = await queryQuestionsByIds(admin, [practiceId], {
      includeRawProvenance: false,
    });
    expect(row.pyqNote).toBeNull();
  });
});
