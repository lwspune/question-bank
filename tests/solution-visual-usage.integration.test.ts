/**
 * Measuring animated solutions (2026-10-31), the database half:
 *   - migration 0208: user_activity accepts `solution_visual`, and a signed-in
 *     student's event is kept once per question, action and day;
 *   - migration 0209: questions.solution_visual_at records when a visual first
 *     went on a question (kept when the visual is rebuilt, cleared when it is
 *     removed), so a reveal can be counted as exposure only from that day.
 * Against the TEST project (tests/setup.ts refuses prod).
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { mustSignIn } from "./helpers/fixture";
import { logActivityOnce } from "@/lib/activity/service";
import { parseVisualEvent } from "@/lib/visuals/usage";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const STAMP = Date.now();
const EMAIL = `visual_usage_${STAMP}@test.local`;
const PASSWORD = `Pw-${STAMP}-visual`;

function visual(fingerprint: string) {
  return { v: 1, scene: "functionGraph", params: {}, steps: [{ at: "x", beats: [] }], fingerprint, answer: { value: 2 } };
}

describe.skipIf(!HAS_ENV)("animated-solution usage in the database", () => {
  let admin: SupabaseClient;
  let client: SupabaseClient;
  let userId = "";
  const made: string[] = [];
  let base: Record<string, unknown> = {};

  async function insertQuestion(i: number, extra: Record<string, unknown>): Promise<string> {
    const { data, error } = await admin
      .from("questions")
      .insert({ ...base, text: `Visual usage test ${i} (${STAMP})`, content_hash: `visual-usage-${STAMP}-${i}`, ...extra })
      .select("id")
      .single();
    if (error) throw new Error(`fixture ${i}: ${error.message}`);
    made.push(data!.id as string);
    return data!.id as string;
  }

  async function visualAt(id: string): Promise<string | null> {
    const { data, error } = await admin.from("questions").select("solution_visual_at").eq("id", id).single();
    if (error) throw new Error(error.message);
    return (data as { solution_visual_at: string | null }).solution_visual_at;
  }

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
    const created = await admin.auth.admin.createUser({ email: EMAIL, password: PASSWORD, email_confirm: true });
    if (created.error) throw new Error(created.error.message);
    userId = created.data.user!.id;
    client = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { auth: { persistSession: false } });
    await mustSignIn("visual-usage student", client, { email: EMAIL, password: PASSWORD });

    const { data: seed, error } = await admin.from("questions").select("*").eq("visibility", "PUBLIC").limit(1).single();
    if (error) throw new Error(`seed question: ${error.message}`);
    base = seed as Record<string, unknown>;
    for (const k of ["id", "created_at", "updated_at", "search_vector", "solution_visual", "solution_visual_at"]) delete base[k];
  });

  afterAll(async () => {
    if (!admin) return;
    if (userId) {
      await admin.from("user_activity").delete().eq("user_id", userId);
      await admin.auth.admin.deleteUser(userId);
    }
    if (made.length) await admin.from("questions").delete().in("id", made);
  });

  it("dates a visual when it first goes on, keeps the date on a rebuild, clears it on removal", async () => {
    const id = await insertQuestion(1, {});
    expect(await visualAt(id)).toBeNull();

    const before = Date.now();
    await admin.from("questions").update({ solution_visual: visual("aaaaaaaa") }).eq("id", id).throwOnError();
    const first = await visualAt(id);
    expect(first).not.toBeNull();
    expect(Date.parse(first!)).toBeGreaterThanOrEqual(before - 60_000);

    await admin.from("questions").update({ solution_visual: visual("bbbbbbbb") }).eq("id", id).throwOnError();
    expect(await visualAt(id)).toBe(first);

    await admin.from("questions").update({ text: `Visual usage test 1, edited (${STAMP})` }).eq("id", id).throwOnError();
    expect(await visualAt(id)).toBe(first);

    await admin.from("questions").update({ solution_visual: null }).eq("id", id).throwOnError();
    expect(await visualAt(id)).toBeNull();
  });

  it("dates a question inserted with a visual, and ignores a date sent by the writer", async () => {
    const id = await insertQuestion(2, { solution_visual: visual("cccccccc"), solution_visual_at: "2020-01-01T00:00:00Z" });
    const at = await visualAt(id);
    expect(at).not.toBeNull();
    expect(at!.startsWith("2020")).toBe(false);
  });

  it("keeps a signed-in student's event once per question, action and day", async () => {
    const id = await insertQuestion(3, { solution_visual: visual("dddddddd") });
    const parsed = parseVisualEvent({ questionId: id, surface: "bank", action: "shown", scene: "functionGraph" }, userId, new Date());
    if (!parsed.ok) throw new Error(parsed.error);
    await logActivityOnce(client, userId, parsed.value);
    await logActivityOnce(client, userId, parsed.value);

    const { data, error } = await admin
      .from("user_activity")
      .select("kind, ref_id, metadata")
      .eq("user_id", userId)
      .eq("kind", "solution_visual");
    if (error) throw new Error(error.message);
    expect(data).toEqual([
      { kind: "solution_visual", ref_id: id, metadata: { surface: "bank", action: "shown", scene: "functionGraph" } },
    ]);
  });
});
