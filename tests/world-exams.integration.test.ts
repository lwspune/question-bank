/**
 * world_exams + world_exam_notes (migration 0260) against the test database.
 * What is locked:
 *
 * - nobody but the service role can read either table: anon and a signed-in
 *   user get nothing, so the rights analysis and revenue never leave the server;
 * - the database itself refuses a rights or verdict value outside the list, a
 *   shortlisted row without its reason/risk/next step, and two rows on one rank;
 * - the page's read (fetchWorldExams) returns checked rows, shortlist included.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { fetchWorldExams } from "@/lib/worldExams/query";
import { mustSignIn } from "./helpers/fixture";
import { testRunId } from "./helpers/runId";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const STAMP = testRunId().toLowerCase().replace(/[^a-z0-9]/g, "");
const ID = (s: string) => `t${STAMP}-${s}`.slice(0, 80);
const EMAIL = `world_exams_${STAMP}@test.local`;
const PASSWORD = "test-password-12345";

const base = (id: string, over: Record<string, unknown> = {}) => ({
  id,
  region: "europe",
  country: "Testland",
  exam: "Test exam",
  category: "licensing",
  rights: "free",
  verdict: "lead",
  sources: [{ label: "Source", url: "https://example.org/source" }],
  ...over,
});

describe.skipIf(!HAS_ENV)("world_exams (0260)", () => {
  let admin: SupabaseClient;
  let anon: SupabaseClient;
  let user: SupabaseClient;
  let userId = "";

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
    anon = createClient(url, anonKey, { auth: { persistSession: false } });
    user = createClient(url, anonKey, { auth: { persistSession: false } });
    const created = await admin.auth.admin.createUser({ email: EMAIL, password: PASSWORD, email_confirm: true });
    if (created.error) throw new Error(`create user: ${created.error.message}`);
    userId = created.data.user!.id;
    await mustSignIn("world exams user", user, { email: EMAIL, password: PASSWORD });

    const ins = await admin.from("world_exams").insert([
      base(ID("a")),
      base(ID("b"), { shortlist_rank: 49, why_passes: "why", main_risk: "risk", next_step: "next" }),
    ]);
    if (ins.error) throw new Error(`seed: ${ins.error.message}`);
    const note = await admin.from("world_exam_notes").insert({ id: ID("note"), title: "Test note", paragraphs: ["P"] });
    if (note.error) throw new Error(`seed note: ${note.error.message}`);
  });

  afterAll(async () => {
    if (!admin) return;
    await admin.from("world_exams").delete().like("id", `t${STAMP}-%`);
    await admin.from("world_exam_notes").delete().like("id", `t${STAMP}-%`);
    if (userId) await admin.auth.admin.deleteUser(userId);
  });

  it("is invisible to anon and to a signed-in user", async () => {
    for (const client of [anon, user]) {
      const exams = await client.from("world_exams").select("id").like("id", `t${STAMP}-%`);
      expect(exams.data ?? []).toHaveLength(0);
      const notes = await client.from("world_exam_notes").select("id").like("id", `t${STAMP}-%`);
      expect(notes.data ?? []).toHaveLength(0);
    }
  });

  it("refuses a rights or verdict value outside the list", async () => {
    expect((await admin.from("world_exams").insert(base(ID("c"), { rights: "maybe" }))).error).not.toBeNull();
    expect((await admin.from("world_exams").insert(base(ID("d"), { verdict: "great" }))).error).not.toBeNull();
  });

  it("refuses a shortlisted row without reason, risk and next step", async () => {
    const r = await admin.from("world_exams").insert(base(ID("e"), { shortlist_rank: 48 }));
    expect(r.error).not.toBeNull();
  });

  it("refuses two rows on one shortlist rank", async () => {
    const r = await admin
      .from("world_exams")
      .insert(base(ID("f"), { shortlist_rank: 49, why_passes: "w", main_risk: "r", next_step: "n" }));
    expect(r.error).not.toBeNull();
  });

  it("refuses sources that are not a JSON array", async () => {
    const r = await admin.from("world_exams").insert(base(ID("g"), { sources: { url: "https://x.org" } }));
    expect(r.error).not.toBeNull();
  });

  describe("load_world_exams (the loader's one write)", () => {
    const full = (id: string, over: Record<string, unknown> = {}) => ({
      ...base(id),
      format: "",
      candidates: "",
      candidates_n: null,
      papers_released: "",
      rights_note: "",
      language: "",
      note: "",
      approximate: false,
      shortlist_rank: null,
      why_passes: null,
      main_risk: null,
      next_step: null,
      revenue: null,
      ...over,
    });
    const ranked = (id: string, rank: number) =>
      full(id, { shortlist_rank: rank, why_passes: "w", main_risk: "r", next_step: "n" });
    const note = (id: string) => ({ id, title: "Note", sort: 0, paragraphs: ["p"], bullets: [], sources: [] });

    it("is refused for anon and a signed-in user", async () => {
      for (const client of [anon, user]) {
        const r = await client.rpc("load_world_exams", { p_exams: [], p_notes: [], p_prune: false });
        expect(r.error).not.toBeNull();
      }
    });

    it("swaps two shortlist ranks in one call", async () => {
      const a = ID("swap-a");
      const b = ID("swap-b");
      // Ranks 46/47 keep clear of the seed rows' 49. The call clears EVERY rank
      // first, so it is the last ranking test in this file and re-sets 49 too.
      const seed = await admin.rpc("load_world_exams", {
        p_exams: [ranked(a, 46), ranked(b, 47), ranked(ID("b"), 49)],
        p_notes: [],
        p_prune: false,
      });
      expect(seed.error).toBeNull();
      const swap = await admin.rpc("load_world_exams", {
        p_exams: [ranked(a, 47), ranked(b, 46), ranked(ID("b"), 49)],
        p_notes: [],
        p_prune: false,
      });
      expect(swap.error).toBeNull();
      const { data } = await admin.from("world_exams").select("id, shortlist_rank").in("id", [a, b]);
      expect(Object.fromEntries((data ?? []).map((r) => [r.id, r.shortlist_rank]))).toEqual({ [a]: 47, [b]: 46 });
    });

    it("changes nothing when one row is bad", async () => {
      const before = await admin.from("world_exams").select("id, shortlist_rank").eq("id", ID("swap-a")).single();
      const r = await admin.rpc("load_world_exams", {
        p_exams: [ranked(ID("swap-a"), 1), full(ID("bad"), { rights: "maybe" })],
        p_notes: [note(ID("n2"))],
        p_prune: false,
      });
      expect(r.error).not.toBeNull();
      const after = await admin.from("world_exams").select("id, shortlist_rank").eq("id", ID("swap-a")).single();
      expect(after.data?.shortlist_rank).toBe(before.data?.shortlist_rank);
      const n = await admin.from("world_exam_notes").select("id").eq("id", ID("n2"));
      expect(n.data ?? []).toHaveLength(0);
    });
  });

  it("the page's read returns checked rows and notes", async () => {
    const data = await fetchWorldExams(admin);
    const mine = data.exams.filter((e) => e.id.startsWith(`t${STAMP}-`));
    expect(mine.map((e) => e.id)).toEqual(expect.arrayContaining([ID("a"), ID("b"), ID("swap-a"), ID("swap-b")]));
    expect(mine.find((e) => e.id === ID("b"))?.shortlistRank).toBe(49);
    expect(data.notes.some((n) => n.id === ID("note"))).toBe(true);
  });
});
