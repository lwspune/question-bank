/**
 * A formula-sheet download is logged with WHICH chapter (migration 0150):
 * mode 'formula', kind 'formula', and `formula_sheet` = "<subjectRoute>/<chapterSlug>".
 * The chapter is public editorial content, so naming it costs nothing and
 * answers the question the feature exists to answer: which sheets do people
 * take, free and paid.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { recordExportEvent } from "@/lib/export/log";

const HAS_ENV = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;

describe.skipIf(!HAS_ENV)("export_events: formula-sheet downloads", () => {
  let admin: SupabaseClient;
  const sheet = `test-subject/test-chapter-${randomUUID().slice(0, 8)}`;

  beforeAll(() => {
    admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });
  });

  afterAll(async () => {
    if (!admin) return;
    await admin.from("export_events").delete().eq("formula_sheet", sheet);
  });

  it("records which chapter's sheet was downloaded", async () => {
    await recordExportEvent({
      userId: null,
      orgId: null,
      kind: "formula",
      questionCount: 0,
      mode: "formula",
      formulaSheet: sheet,
      isStaff: false,
    });
    const { data, error } = await admin
      .from("export_events")
      .select("kind, mode, formula_sheet, question_count")
      .eq("formula_sheet", sheet);
    expect(error).toBeNull();
    expect(data).toEqual([{ kind: "formula", mode: "formula", formula_sheet: sheet, question_count: 0 }]);
  });

  it("refuses a sheet name on any other mode", async () => {
    const { error } = await admin
      .from("export_events")
      .insert({ kind: "paper", question_count: 1, mode: "filters", formula_sheet: sheet, is_staff: false });
    expect(error).not.toBeNull();
  });
});
