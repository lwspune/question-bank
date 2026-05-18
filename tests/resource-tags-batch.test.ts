/**
 * Integration tests for the batched per-question tag fetch used by /browse
 * to power tag-depth backlinks on QuestionCard. DB-backed — skipped if env
 * is not present.
 */
import { describe, it, expect, beforeAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getResourceTagsForQuestions } from "@/lib/links/getResourceTagsForQuestions";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

describe("getResourceTagsForQuestions — pure-input edge cases", () => {
  // These exercise the function without any DB round-trip — keep them
  // independent of env so they always run.
  it("returns an empty Map for an empty id list (no DB call)", async () => {
    // Pass a fake client — the function should short-circuit before any
    // .from() call. If it tries to use the client, this will throw.
    const fakeClient = {} as SupabaseClient;
    const map = await getResourceTagsForQuestions(fakeClient, []);
    expect(map.size).toBe(0);
  });
});

describe.skipIf(!HAS_ENV)("getResourceTagsForQuestions (DB)", () => {
  let client: SupabaseClient;
  // Capture some real tagged questions to assert against
  let principleTagged: { questionId: string; principleSlug: string } | null =
    null;
  let conceptTagged: {
    questionId: string;
    subtopicSlug: string;
    conceptSlug: string;
  } | null = null;

  beforeAll(async () => {
    client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );

    const { data: pRow } = await client
      .from("question_principle_tags")
      .select("question_id, principle_slug")
      .limit(1)
      .maybeSingle();
    if (pRow) {
      principleTagged = {
        questionId: (pRow as { question_id: string }).question_id,
        principleSlug: (pRow as { principle_slug: string }).principle_slug,
      };
    }

    const { data: cRow } = await client
      .from("question_concept_tags")
      .select("question_id, subtopic_slug, concept_slug")
      .limit(1)
      .maybeSingle();
    if (cRow) {
      conceptTagged = {
        questionId: (cRow as { question_id: string }).question_id,
        subtopicSlug: (cRow as { subtopic_slug: string }).subtopic_slug,
        conceptSlug: (cRow as { concept_slug: string }).concept_slug,
      };
    }
  });

  it("returns principle tags for a tagged question", async () => {
    if (!principleTagged) {
      // Bank has no principle tags yet — skip without failing
      return;
    }
    const map = await getResourceTagsForQuestions(client, [
      principleTagged.questionId,
    ]);
    const entry = map.get(principleTagged.questionId);
    expect(entry).toBeDefined();
    expect(entry!.principleSlugs).toContain(principleTagged.principleSlug);
  });

  it("returns concept tags for a tagged question", async () => {
    if (!conceptTagged) return;
    const map = await getResourceTagsForQuestions(client, [
      conceptTagged.questionId,
    ]);
    const entry = map.get(conceptTagged.questionId);
    expect(entry).toBeDefined();
    expect(
      entry!.conceptTags.some(
        (t) =>
          t.subtopicSlug === conceptTagged!.subtopicSlug &&
          t.conceptSlug === conceptTagged!.conceptSlug
      )
    ).toBe(true);
  });

  it("returns both kinds of tags for questions tagged with both", async () => {
    if (!principleTagged) return;
    // The principle-tagged question may also have concept tags — either way
    // the map entry should exist and have both arrays defined (concept may
    // be empty).
    const map = await getResourceTagsForQuestions(client, [
      principleTagged.questionId,
    ]);
    const entry = map.get(principleTagged.questionId);
    expect(entry).toBeDefined();
    expect(Array.isArray(entry!.principleSlugs)).toBe(true);
    expect(Array.isArray(entry!.conceptTags)).toBe(true);
  });

  it("omits untagged questions from the map (no entry vs empty entry)", async () => {
    // Find a question that has no tags
    const { data: anyQ } = await client
      .from("questions")
      .select("id")
      .eq("visibility", "PUBLIC")
      .limit(1)
      .maybeSingle();
    if (!anyQ) return;
    const qid = (anyQ as { id: string }).id;
    // Confirm it has zero tags in both tables
    const { data: p } = await client
      .from("question_principle_tags")
      .select("question_id")
      .eq("question_id", qid);
    const { data: c } = await client
      .from("question_concept_tags")
      .select("question_id")
      .eq("question_id", qid);
    if ((p ?? []).length > 0 || (c ?? []).length > 0) {
      // Picked a tagged question by chance; the assertion below won't apply
      return;
    }
    const map = await getResourceTagsForQuestions(client, [qid]);
    expect(map.has(qid)).toBe(false);
  });

  it("handles a mix of tagged and untagged ids in a single batch", async () => {
    if (!principleTagged && !conceptTagged) return;
    const tagged =
      principleTagged?.questionId ?? conceptTagged?.questionId ?? "";
    // Append a bogus UUID so we exercise the "not found" path too
    const bogus = "00000000-0000-0000-0000-000000000000";
    const map = await getResourceTagsForQuestions(client, [tagged, bogus]);
    expect(map.has(tagged)).toBe(true);
    expect(map.has(bogus)).toBe(false);
  });

  it("dedups duplicate ids in the input list", async () => {
    if (!principleTagged) return;
    const map = await getResourceTagsForQuestions(client, [
      principleTagged.questionId,
      principleTagged.questionId,
      principleTagged.questionId,
    ]);
    const entry = map.get(principleTagged.questionId);
    expect(entry).toBeDefined();
    // No duplicated slugs in the result
    const seen = new Set<string>();
    for (const s of entry!.principleSlugs) {
      expect(seen.has(s)).toBe(false);
      seen.add(s);
    }
  });
});
