/**
 * learning_games + learning_game_notes (migration 0268) against the test
 * database. What is locked:
 *
 * - nobody but the service role can read either table or call the loader:
 *   anon and a signed-in user get nothing, so the catalogue never leaves the
 *   server (the owner keeps it private; the repo is public);
 * - the database itself refuses a platform, evidence, subject or mechanic
 *   outside the list, an empty subject or mechanic list, and fits or sources
 *   that are not JSON arrays;
 * - the loader's one write changes nothing when one row is bad;
 * - the page's read (fetchGames) returns checked rows with the gate computed.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { fetchGames } from "@/lib/games/query";
import { mustSignIn } from "./helpers/fixture";
import { testRunId } from "./helpers/runId";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const STAMP = testRunId().toLowerCase().replace(/[^a-z0-9]/g, "");
const ID = (s: string) => `t${STAMP}-${s}`.slice(0, 80);
const EMAIL = `learning_games_${STAMP}@test.local`;
const PASSWORD = "test-password-12345";

const base = (id: string, over: Record<string, unknown> = {}) => ({
  id,
  name: "Test game",
  url: "https://example.org/game",
  platform: "web",
  subjects: ["history"],
  how_it_plays: "Order the events.",
  mechanics: ["ordering"],
  evidence: "none",
  fits: [],
  sources: [],
  checked_on: "2026-11-16",
  ...over,
});

const full = (id: string, over: Record<string, unknown> = {}) => ({
  ...base(id),
  maker: "",
  price: "",
  audience: "",
  evidence_note: "",
  vendor_funded: false,
  scale: "",
  scale_as_of: null,
  borrow: "",
  ...over,
});

describe.skipIf(!HAS_ENV)("learning_games (0268)", () => {
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
    await mustSignIn("learning games user", user, { email: EMAIL, password: PASSWORD });

    const ins = await admin.from("learning_games").insert([
      base(ID("a")),
      base(ID("b"), {
        mechanics: ["leaderboard", "speed_round"],
        fits: [{ goal: "government", subject: "history", strength: "core", why: "w", exams: ["upsc-cse"] }],
      }),
    ]);
    if (ins.error) throw new Error(`seed: ${ins.error.message}`);
    const note = await admin.from("learning_game_notes").insert({ id: ID("note"), title: "Test note", paragraphs: ["P"] });
    if (note.error) throw new Error(`seed note: ${note.error.message}`);
  });

  afterAll(async () => {
    if (!admin) return;
    await admin.from("learning_games").delete().like("id", `t${STAMP}-%`);
    await admin.from("learning_game_notes").delete().like("id", `t${STAMP}-%`);
    if (userId) await admin.auth.admin.deleteUser(userId);
  });

  it("is invisible to anon and to a signed-in user", async () => {
    for (const client of [anon, user]) {
      const games = await client.from("learning_games").select("id").like("id", `t${STAMP}-%`);
      expect(games.data ?? []).toHaveLength(0);
      const notes = await client.from("learning_game_notes").select("id").like("id", `t${STAMP}-%`);
      expect(notes.data ?? []).toHaveLength(0);
    }
  });

  it("refuses a platform or evidence value outside the list", async () => {
    expect((await admin.from("learning_games").insert(base(ID("c"), { platform: "vr" }))).error).not.toBeNull();
    expect((await admin.from("learning_games").insert(base(ID("d"), { evidence: "great" }))).error).not.toBeNull();
  });

  it("refuses a subject or mechanic outside the list, and an empty list", async () => {
    expect((await admin.from("learning_games").insert(base(ID("e"), { subjects: ["alchemy"] }))).error).not.toBeNull();
    expect((await admin.from("learning_games").insert(base(ID("f"), { mechanics: ["magic"] }))).error).not.toBeNull();
    expect((await admin.from("learning_games").insert(base(ID("g"), { subjects: [] }))).error).not.toBeNull();
    expect((await admin.from("learning_games").insert(base(ID("h"), { mechanics: [] }))).error).not.toBeNull();
  });

  it("refuses fits or sources that are not JSON arrays", async () => {
    expect((await admin.from("learning_games").insert(base(ID("i"), { fits: { goal: "law" } }))).error).not.toBeNull();
    expect((await admin.from("learning_games").insert(base(ID("j"), { sources: { url: "https://x.org" } }))).error).not.toBeNull();
  });

  describe("load_learning_games (the loader's one write)", () => {
    const note = (id: string) => ({ id, title: "Note", sort: 0, paragraphs: ["p"], bullets: [], sources: [] });

    it("is refused for anon and a signed-in user", async () => {
      for (const client of [anon, user]) {
        const r = await client.rpc("load_learning_games", { p_games: [], p_notes: [], p_prune: false });
        expect(r.error).not.toBeNull();
      }
    });

    it("upserts a changed row", async () => {
      const r = await admin.rpc("load_learning_games", {
        p_games: [full(ID("a"), { name: "Renamed" })],
        p_notes: [],
        p_prune: false,
      });
      expect(r.error).toBeNull();
      const { data } = await admin.from("learning_games").select("name").eq("id", ID("a")).single();
      expect(data?.name).toBe("Renamed");
    });

    it("changes nothing when one row is bad", async () => {
      const r = await admin.rpc("load_learning_games", {
        p_games: [full(ID("a"), { name: "Changed again" }), full(ID("bad"), { platform: "vr" })],
        p_notes: [note(ID("n2"))],
        p_prune: false,
      });
      expect(r.error).not.toBeNull();
      const { data } = await admin.from("learning_games").select("name").eq("id", ID("a")).single();
      expect(data?.name).toBe("Renamed");
      const n = await admin.from("learning_game_notes").select("id").eq("id", ID("n2"));
      expect(n.data ?? []).toHaveLength(0);
    });
  });

  it("the page's read returns checked rows with the gate computed", async () => {
    const data = await fetchGames(admin);
    const mine = data.games.filter((g) => g.id.startsWith(`t${STAMP}-`));
    expect(mine.map((g) => g.id)).toEqual(expect.arrayContaining([ID("a"), ID("b")]));
    expect(mine.find((g) => g.id === ID("b"))?.gate.verdict).toBe("fails");
    expect(data.notes.some((n) => n.id === ID("note"))).toBe(true);
  });
});
