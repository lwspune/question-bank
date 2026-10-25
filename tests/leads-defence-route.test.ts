/**
 * Integration test for GET /api/leads/defence — the feed GoPost reads hourly.
 *
 * What it guards is WHO leaves this database: only NDA/CDS/AFCAT students who
 * gave a mobile and ticked consent, only defence-quiz leads, and only the
 * defence exams of each student. Plus the secret (fails closed) and keyset
 * paging through a timestamp TIE, which a time-only cursor gets wrong.
 *
 * Fixture timestamps sit in 2099 so the cursor can start just before them and
 * page over this run's rows alone, whatever else the test project holds.
 * Runs against the dedicated test project (tests/setup.ts refuses prod).
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { NextRequest } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { formatCursor } from "@/lib/leads/defenceFeed";

const HAS_ENV = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const RUN_ID = randomUUID().slice(0, 8);
const SECRET = `defence-feed-${RUN_ID}-secret`;
// A per-run instant in 2099 (whole seconds + microseconds), so reruns never collide.
const BASE = new Date(Date.UTC(2099, 0, 1) + (parseInt(RUN_ID, 16) % 1_000_000) * 1000);
const at = (sec: number) => new Date(BASE.getTime() + sec * 1000).toISOString().replace("Z", "123+00:00");
const START = formatCursor(at(-1), "00000000-0000-4000-8000-000000000000");
const mob = (n: number) => `9190000${RUN_ID.replace(/\D/g, "0").slice(0, 3)}${String(n).padStart(2, "0")}`;

type Person = { key: string; exams: string[]; mobile: string | null; consent: boolean; updated: string; name?: string };
const PEOPLE: Person[] = [
  { key: "nda-tieA", exams: ["nda", "jee-mains"], mobile: mob(1), consent: true, updated: at(0), name: "Tie A" },
  { key: "cds-tieB", exams: ["cds"], mobile: mob(2), consent: true, updated: at(0), name: "Tie B" },
  { key: "afcat", exams: ["mht-cet", "afcat"], mobile: mob(3), consent: true, updated: at(1) },
  { key: "no-consent", exams: ["nda"], mobile: mob(4), consent: false, updated: at(2) },
  { key: "no-mobile", exams: ["nda"], mobile: null, consent: false, updated: at(3) },
  { key: "not-defence", exams: ["mht-cet"], mobile: mob(5), consent: true, updated: at(4) },
];

function req(qs: string, secret: string | null) {
  return new NextRequest(`http://localhost:3000/api/leads/defence?${qs}`, {
    headers: secret ? { authorization: `Bearer ${secret}` } : {},
  });
}

async function call(qs: string, secret: string | null = SECRET) {
  const { GET } = await import("@/app/api/leads/defence/route");
  const res = await GET(req(qs, secret));
  return { status: res.status, body: await res.json() };
}

describe.skipIf(!HAS_ENV)("/api/leads/defence", () => {
  let admin: SupabaseClient;
  const userIds = new Map<string, string>();
  const ndaQuiz = randomUUID(), cetQuiz = randomUUID();
  const prevSecret = process.env.GOPOST_LEADS_SECRET;

  beforeAll(async () => {
    process.env.GOPOST_LEADS_SECRET = SECRET;
    admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });
    for (const p of PEOPLE) {
      const { data, error } = await admin.auth.admin.createUser({
        email: `defence-feed-${p.key}-${RUN_ID}@test.local`,
        password: `pw-${RUN_ID}-${p.key}`,
        email_confirm: true,
        user_metadata: p.name ? { full_name: p.name } : {},
      });
      if (error || !data.user) throw new Error(`user create: ${error?.message}`);
      userIds.set(p.key, data.user.id);
      const { error: pErr } = await admin.from("student_profiles").insert({
        user_id: data.user.id, mobile: p.mobile, consent: p.consent, target_exams: p.exams,
        stage: p.key === "nda-tieA" ? "class-12" : null, city: p.key === "nda-tieA" ? "Pune" : null,
        updated_at: p.updated,
      });
      if (pErr) throw new Error(`profile insert: ${pErr.message}`);
    }
    const { error: qErr } = await admin.from("quizzes").insert([
      { id: ndaQuiz, slug: `defence-feed-nda-${RUN_ID}`, exam: "NDA", subject: "Maths", title: "Feed NDA", chapter: "Vectors" },
      { id: cetQuiz, slug: `defence-feed-cet-${RUN_ID}`, exam: "MHT-CET", subject: "Maths", title: "Feed CET", chapter: "Vectors" },
    ]);
    if (qErr) throw new Error(`quiz insert: ${qErr.message}`);
    const { error: lErr } = await admin.from("quiz_leads").insert([
      { quiz_id: ndaQuiz, name: " Quiz Taker ", mobile: mob(6), first_seen_at: at(-5), last_attempt_at: at(5) },
      { quiz_id: cetQuiz, name: "CET Taker", mobile: mob(7), first_seen_at: at(-5), last_attempt_at: at(6) },
    ]);
    if (lErr) throw new Error(`quiz lead insert: ${lErr.message}`);
  });

  afterAll(async () => {
    process.env.GOPOST_LEADS_SECRET = prevSecret;
    if (!admin) return;
    await admin.from("quiz_leads").delete().in("quiz_id", [ndaQuiz, cetQuiz]);
    await admin.from("quizzes").delete().in("id", [ndaQuiz, cetQuiz]);
    for (const id of userIds.values()) await admin.auth.admin.deleteUser(id);
  });

  it("refuses without the secret, with a wrong one, and when the server has none", async () => {
    expect((await call("source=account", null)).status).toBe(401);
    expect((await call("source=account", "wrong")).status).toBe(401);
    delete process.env.GOPOST_LEADS_SECRET;
    expect((await call("source=account", SECRET)).status).toBe(401);
    process.env.GOPOST_LEADS_SECRET = SECRET;
  });

  it("cannot be called with the public anon key, around the route", async () => {
    const anon = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      auth: { persistSession: false },
    });
    const { data, error } = await anon.rpc("defence_leads_after", {
      p_source: "account", p_after_at: null, p_after_id: null, p_limit: 5,
    });
    expect(data).toBeNull();
    expect(error).not.toBeNull();
  });

  it("refuses a bad request before reading anything", async () => {
    expect((await call("source=everything")).status).toBe(400);
    expect((await call("source=account&limit=10000")).status).toBe(400);
  });

  it("returns only consented defence students with a mobile, and only their defence exams", async () => {
    const { status, body } = await call(`source=account&after=${encodeURIComponent(START)}&limit=50`);
    expect(status).toBe(200);
    const mine = body.leads.filter((l: { mobile: string }) => PEOPLE.some((p) => p.mobile === l.mobile));
    expect(mine.map((l: { mobile: string }) => l.mobile).sort()).toEqual([mob(1), mob(2), mob(3)].sort());
    const a = mine.find((l: { mobile: string }) => l.mobile === mob(1));
    expect(a).toMatchObject({ name: "Tie A", exams: ["nda"], stage: "class-12", city: "Pune" });
    expect(mine.find((l: { mobile: string }) => l.mobile === mob(3))).toMatchObject({ name: null, exams: ["afcat"] });
    expect(JSON.stringify(body)).not.toContain("jee-mains");
    expect(JSON.stringify(body)).not.toContain("@test.local");
  });

  it("pages through a timestamp tie one row at a time without skipping or repeating", async () => {
    const seen: string[] = [];
    let after = START;
    for (let i = 0; i < 10; i++) {
      const { body } = await call(`source=account&after=${encodeURIComponent(after)}&limit=1`);
      if (body.leads.length === 0) break;
      seen.push(body.leads[0].mobile);
      expect(body.next).toBe(body.leads[0].cursor);
      after = body.next;
    }
    const mine = seen.filter((m) => PEOPLE.some((p) => p.mobile === m));
    expect(mine.slice(0, 2).sort()).toEqual([mob(1), mob(2)].sort());
    expect(mine).toEqual([...new Set(mine)]);
    expect(mine).toContain(mob(3));
  });

  it("keeps the cursor when nothing is new", async () => {
    const end = formatCursor(at(1000), "ffffffff-ffff-4fff-bfff-ffffffffffff");
    const { body } = await call(`source=account&after=${encodeURIComponent(end)}`);
    expect(body).toEqual({ leads: [], next: end });
  });

  it("returns defence-quiz leads only", async () => {
    const { status, body } = await call(`source=quiz&after=${encodeURIComponent(START)}`);
    expect(status).toBe(200);
    const mobiles = body.leads.map((l: { mobile: string }) => l.mobile);
    expect(mobiles).toContain(mob(6));
    expect(mobiles).not.toContain(mob(7));
    expect(body.leads.find((l: { mobile: string }) => l.mobile === mob(6))).toMatchObject({
      name: "Quiz Taker", exams: ["nda"], leadAt: expect.stringContaining("2099-"),
    });
  });
});
