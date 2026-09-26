/**
 * RLS + write-path test for question/option translations (migration 0118).
 *
 * A translation is a PRESENTATION of a question, never a second question, so it
 * must be exactly as visible as its parent and exactly as editable as content:
 *   - anon reads the Marathi of a PUBLIC question and its options
 *   - anon CANNOT read the Marathi of a PRIVATE question, nor its options
 *   - an org ADMIN (not superadmin) CANNOT write a translation — content is
 *     superadmin-only since 0056
 *   - a SUPERADMIN writes one atomically through put_question_translation
 *   - the RPC refuses an option id that belongs to a different question, and
 *     writes NOTHING when it does (all-or-nothing)
 *   - an unsupported language is rejected by the table itself
 *
 * Skipped when env is missing.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { mustDo, mustSignIn } from "./helpers/fixture";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const PASSWORD = "translations-rls-test-1234";
const RUN_ID = randomUUID().slice(0, 8);
const ADMIN_EMAIL = `tr-admin-${RUN_ID}@test.local`;
const SUPER_EMAIL = `tr-super-${RUN_ID}@test.local`;
const ORG_NAME = `Translations Org ${RUN_ID}`;

describe.skipIf(!HAS_ENV)("question/option translations", () => {
  let admin: SupabaseClient;
  let anonClient: SupabaseClient;
  let adminClient: SupabaseClient;
  let superClient: SupabaseClient;
  let adminId: string;
  let superId: string;
  let orgId: string;
  let pubId: string;
  let privId: string;
  let pubOptionIds: string[] = [];
  let privOptionIds: string[] = [];

  async function seedQuestion(visibility: "PUBLIC" | "PRIVATE", ex: string, sb: string, ch: string) {
    const { data: q } = await admin
      .from("questions")
      .insert({
        org_id: orgId,
        exam_id: ex,
        subject_id: sb,
        chapter_id: ch,
        text: `tr-rls ${visibility} ${RUN_ID}`,
        difficulty: "EASY",
        content_hash: `tr-rls-${visibility}-${RUN_ID}`,
        created_by: adminId,
        visibility,
      })
      .select("id")
      .single();
    const { data: opts } = await admin
      .from("options")
      .insert(["A", "B", "C", "D"].map((label, i) => ({ question_id: q!.id, label, text: `opt ${label}`, is_correct: i === 0 })))
      .select("id, label");
    const ids = (opts ?? []).sort((a, b) => a.label.localeCompare(b.label)).map((o) => o.id);
    return { id: q!.id as string, optionIds: ids };
  }

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });

    const [{ data: a }, { data: s }] = await Promise.all([
      admin.auth.admin.createUser({ email: ADMIN_EMAIL, password: PASSWORD, email_confirm: true }),
      admin.auth.admin.createUser({ email: SUPER_EMAIL, password: PASSWORD, email_confirm: true }),
    ]);
    adminId = a.user!.id;
    superId = s.user!.id;

    const { data: org } = await admin.from("organizations").insert({ name: ORG_NAME }).select("id").single();
    orgId = org!.id;
    await mustDo("org_members", () => admin.from("org_members").insert({ org_id: orgId, user_id: adminId, role: "ADMIN" }));
    await mustDo("platform_admins", () => admin.from("platform_admins").insert({ user_id: superId }));

    const { data: ex } = await admin.from("exams").select("id").limit(1).single();
    const { data: sb } = await admin.from("subjects").select("id").eq("exam_id", ex!.id).limit(1).single();
    const { data: ch } = await admin.from("chapters").select("id").eq("subject_id", sb!.id).limit(1).single();

    const pub = await seedQuestion("PUBLIC", ex!.id, sb!.id, ch!.id);
    const priv = await seedQuestion("PRIVATE", ex!.id, sb!.id, ch!.id);
    pubId = pub.id;
    pubOptionIds = pub.optionIds;
    privId = priv.id;
    privOptionIds = priv.optionIds;

    // Seed Marathi on both as service-role (bypasses RLS).
    await mustDo("seed question_translations", () =>
      admin.from("question_translations").insert([
        { question_id: pubId, lang: "mr", text: "सार्वजनिक प्रश्न" },
        { question_id: privId, lang: "mr", text: "खाजगी प्रश्न" },
      ])
    );
    await mustDo("seed option_translations", () =>
      admin.from("option_translations").insert([
        ...pubOptionIds.map((id, i) => ({ option_id: id, lang: "mr", text: `पर्याय ${i + 1}` })),
        ...privOptionIds.map((id, i) => ({ option_id: id, lang: "mr", text: `पर्याय ${i + 1}` })),
      ])
    );

    anonClient = createClient(url, anon, { auth: { persistSession: false } });
    adminClient = createClient(url, anon, { auth: { persistSession: false } });
    superClient = createClient(url, anon, { auth: { persistSession: false } });
    await mustSignIn("admin", adminClient, { email: ADMIN_EMAIL, password: PASSWORD });
    await mustSignIn("super", superClient, { email: SUPER_EMAIL, password: PASSWORD });
  });

  afterAll(async () => {
    for (const id of [pubId, privId]) if (id) await admin.from("questions").delete().eq("id", id); // cascades
    if (orgId) await admin.from("organizations").delete().eq("id", orgId);
    for (const id of [adminId, superId]) if (id) await admin.auth.admin.deleteUser(id);
  });

  it("anon reads the Marathi of a PUBLIC question and its options", async () => {
    const { data: q } = await anonClient.from("question_translations").select("text").eq("question_id", pubId);
    expect(q?.map((r) => r.text)).toEqual(["सार्वजनिक प्रश्न"]);
    const { data: o } = await anonClient.from("option_translations").select("option_id").in("option_id", pubOptionIds);
    expect(o?.length).toBe(4);
  });

  it("anon cannot read the Marathi of a PRIVATE question or its options", async () => {
    const { data: q } = await anonClient.from("question_translations").select("text").eq("question_id", privId);
    expect(q).toEqual([]);
    const { data: o } = await anonClient.from("option_translations").select("option_id").in("option_id", privOptionIds);
    expect(o).toEqual([]);
  });

  it("an org ADMIN cannot write a translation (content is superadmin-only)", async () => {
    const { error } = await adminClient
      .from("question_translations")
      .update({ text: "हॅक" })
      .eq("question_id", pubId)
      .select();
    // RLS turns an unauthorised UPDATE into zero rows, not an error — so read back.
    expect(error).toBeNull();
    const { data } = await admin.from("question_translations").select("text").eq("question_id", pubId).single();
    expect(data!.text).toBe("सार्वजनिक प्रश्न");

    const { error: rpcErr } = await adminClient.rpc("put_question_translation", {
      p_question_id: pubId,
      p_lang: "mr",
      p_text: "हॅक",
      p_context: null,
      p_solution: null,
      p_options: [],
    });
    expect(rpcErr).not.toBeNull();
  });

  it("a SUPERADMIN writes question + options atomically through the RPC", async () => {
    const { error } = await superClient.rpc("put_question_translation", {
      p_question_id: pubId,
      p_lang: "mr",
      p_text: "सुधारित प्रश्न",
      p_context: "संदर्भ",
      p_solution: null,
      p_options: pubOptionIds.map((id, i) => ({ option_id: id, text: `नवा पर्याय ${i + 1}` })),
    });
    expect(error).toBeNull();
    const { data: q } = await admin.from("question_translations").select("text, context").eq("question_id", pubId).single();
    expect(q).toEqual({ text: "सुधारित प्रश्न", context: "संदर्भ" });
    const { data: o } = await admin.from("option_translations").select("text").eq("option_id", pubOptionIds[0]).single();
    expect(o!.text).toBe("नवा पर्याय 1");
  });

  it("refuses an option from another question and writes nothing at all", async () => {
    const { error } = await superClient.rpc("put_question_translation", {
      p_question_id: pubId,
      p_lang: "mr",
      p_text: "अर्धवट लेखन",
      p_context: null,
      p_solution: null,
      p_options: [{ option_id: privOptionIds[0], text: "चुकीचा पर्याय" }],
    });
    expect(error).not.toBeNull();
    const { data: q } = await admin.from("question_translations").select("text").eq("question_id", pubId).single();
    expect(q!.text).toBe("सुधारित प्रश्न");
    const { data: o } = await admin.from("option_translations").select("text").eq("option_id", privOptionIds[0]).single();
    expect(o!.text).toBe("पर्याय 1");
  });

  it("rejects an unsupported language at the table", async () => {
    const { error } = await admin.from("question_translations").insert({ question_id: privId, lang: "fr", text: "x" });
    expect(error?.code).toBe("23514");
  });
});
