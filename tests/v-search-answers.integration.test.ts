/**
 * v_search_answers (migration 0177) through searchBankAnswers, the read V's
 * explain_concept tool makes with the ANON client: a public question is found
 * by its words, with its exam and chapter; a written answer outranks an MCQ
 * holding the same words; a private question never comes back; words no
 * question holds return nothing, not an error.
 *
 * Fixtures: copies of a seeded question with made-up words, deleted after.
 * Skipped when env is missing.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { searchBankAnswers } from "@/lib/chat/conceptSearchServer";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const RUN_ID = randomUUID().slice(0, 8);
const SOLUTION =
  "The zorvantic flux of a quellish dynamo is the product of its field and its area, so it doubles when either doubles. " +
  "This is the model answer the board expects.";

describe.skipIf(!HAS_ENV)("v_search_answers", () => {
  let admin: SupabaseClient;
  let anon: SupabaseClient;
  const made: string[] = [];
  let examName = "";
  let chapterName = "";

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
    anon = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { auth: { persistSession: false } });
    const { data: seed, error } = await admin
      .from("questions")
      .select("*, chapter:chapters(name, subject:subjects(exam:exams(name)))")
      .eq("visibility", "PUBLIC")
      .limit(1)
      .single();
    if (error) throw new Error(`seed question: ${error.message}`);
    const { chapter, ...row } = seed as Record<string, unknown> & { chapter: { name: string; subject: { exam: { name: string } } } };
    chapterName = chapter.name;
    examName = chapter.subject.exam.name;
    for (const k of ["id", "created_at", "updated_at", "search_vector"]) delete row[k];

    const fixtures = [
      { visibility: "PUBLIC", question_format: "mcq", text: `Which is the zorvantic flux of a quellish dynamo? (${RUN_ID})`, solution: SOLUTION },
      { visibility: "PUBLIC", question_format: "subjective", text: `Explain the zorvantic flux of a quellish dynamo. (${RUN_ID})`, solution: SOLUTION },
      { visibility: "PRIVATE", question_format: "subjective", text: `Explain the brimlocke vantoric of a dynamo. (${RUN_ID})`, solution: SOLUTION.replace(/zorvantic flux|quellish/g, "brimlocke vantoric") },
    ];
    for (const [i, f] of fixtures.entries()) {
      const { data, error: insErr } = await admin
        .from("questions")
        .insert({ ...row, ...f, content_hash: `v-search-test-${RUN_ID}-${i}` })
        .select("id")
        .single();
      if (insErr) throw new Error(`fixture ${i}: ${insErr.message}`);
      made.push(data!.id as string);
    }
  });

  afterAll(async () => {
    if (made.length) await admin.from("questions").delete().in("id", made);
  });

  it("finds public questions by their words, with exam and chapter, the written answer first", async () => {
    const hits = await searchBankAnswers(anon, "zorvantic & quellish", [], null);
    const mine = hits.filter((h) => h.text.includes(RUN_ID));
    expect(mine.map((h) => h.format)).toEqual(["subjective", "mcq"]);
    expect(mine[0].examName).toBe(examName);
    expect(mine[0].chapterName).toBe(chapterName);
    expect(mine[0].solution).toBe(SOLUTION);
  });

  it("never returns a private question to the anon client", async () => {
    const hits = await searchBankAnswers(anon, "brimlocke & vantoric", [], null);
    expect(hits.filter((h) => h.text.includes(RUN_ID))).toEqual([]);
  });

  it("returns nothing, not an error, for words no question holds", async () => {
    expect(await searchBankAnswers(anon, "zzqxw & qqzzv", [], null)).toEqual([]);
  });

  it("returns at most 3 rows", async () => {
    expect((await searchBankAnswers(anon, "dynamo", [], null)).length).toBeLessThanOrEqual(3);
  });
});
