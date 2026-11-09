/**
 * POST /api/admin/institute-prospect: the owner saves a status, note and
 * follow-up date on one institute (migration 0246). The table is read with the
 * service role, so the superadmin check in the route is the only gate: it must
 * run before anything touches the database. Session and database are mocked;
 * the decisions are real. The page's own gate is a source scan below.
 */
import { vi, describe, it, expect, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { readFileSync } from "node:fs";
import { join } from "node:path";

vi.mock("server-only", () => ({}));

class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}
const gate = { current: "ok" as "ok" | "anon" | "notSuper" };
const requireSuperadmin = vi.fn(async () => {
  if (gate.current === "anon") throw new HttpError(401, "Not signed in");
  if (gate.current === "notSuper") throw new HttpError(403, "Only the platform admin can add or edit content.");
  return { id: "owner", email: "owner@example.com" };
});
vi.mock("@/lib/auth", () => ({ requireSuperadmin, HttpError }));

const updated = { current: [{ id: "11111111-1111-4111-8111-111111111111" }] as { id: string }[] };
const select = vi.fn(async () => ({ data: updated.current, error: null }));
const eq = vi.fn(() => ({ select }));
const update = vi.fn((_: Record<string, unknown>) => ({ eq }));
const from = vi.fn(() => ({ update }));
vi.mock("@/lib/supabase/admin", () => ({ createSupabaseAdminClient: vi.fn(() => ({ from })) }));

const { POST } = await import("@/app/api/admin/institute-prospect/route");

const ID = "11111111-1111-4111-8111-111111111111";
const post = (body: unknown) =>
  new NextRequest("http://localhost/api/admin/institute-prospect", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "content-type": "application/json" },
  });

beforeEach(() => {
  vi.clearAllMocks();
  gate.current = "ok";
  updated.current = [{ id: ID }];
});

describe("POST /api/admin/institute-prospect", () => {
  it("refuses a signed-out or non-superadmin caller before touching the database", async () => {
    gate.current = "anon";
    expect((await POST(post({ id: ID, status: "contacted" }))).status).toBe(401);
    gate.current = "notSuper";
    expect((await POST(post({ id: ID, status: "contacted" }))).status).toBe(403);
    expect(from).not.toHaveBeenCalled();
  });

  it("refuses a bad body or a bad edit with 400", async () => {
    expect((await POST(post({ id: "nope", status: "contacted" }))).status).toBe(400);
    expect((await POST(post({ id: ID, status: "maybe" }))).status).toBe(400);
    expect((await POST(post({ id: ID, status: "new", followUp: "16/11/2026" }))).status).toBe(400);
    expect(from).not.toHaveBeenCalled();
  });

  it("saves the status, trimmed note and date, and stamps updated_at", async () => {
    const res = await POST(post({ id: ID, status: "interested", note: " Wants a demo ", followUp: "2026-11-16" }));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(from).toHaveBeenCalledWith("institute_prospects");
    const patch = update.mock.calls[0][0];
    expect(patch).toMatchObject({ status: "interested", note: "Wants a demo", follow_up: "2026-11-16" });
    expect(typeof patch.updated_at).toBe("string");
    expect(eq).toHaveBeenCalledWith("id", ID);
  });

  it("answers 404 when no row has that id", async () => {
    updated.current = [];
    expect((await POST(post({ id: ID, status: "new" }))).status).toBe(404);
  });
});

describe("/dashboard/institutes page gate", () => {
  it("redirects unless getSessionSuperadmin resolves", () => {
    const src = readFileSync(join(process.cwd(), "src", "app", "dashboard", "institutes", "page.tsx"), "utf8");
    expect(src).toMatch(/if \(!\(await getSessionSuperadmin\(\)\)\) redirect\(/);
  });
});
