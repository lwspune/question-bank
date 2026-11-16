/**
 * POST /api/admin/class-leads: the team ticks a lead as called (migration
 * 0265). The table is service-role only, so the superadmin check is the only
 * thing between a caller and the leads: it must run before anything is read.
 */
import { vi, describe, it, expect, beforeEach } from "vitest";
import { NextRequest } from "next/server";

vi.mock("server-only", () => ({}));
class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}
const gate = { current: "ok" as "ok" | "anon" | "student" };
const requireSuperadmin = vi.fn(async () => {
  if (gate.current === "anon") throw new HttpError(401, "Not signed in");
  if (gate.current === "student") throw new HttpError(403, "Superadmin only.");
  return { id: "admin", email: "a@b.c" };
});
vi.mock("@/lib/auth", () => ({ requireSuperadmin, HttpError }));
const result = { current: { data: [{ id: "x" }] as unknown[], error: null as null | { message: string } } };
const select = vi.fn(async () => result.current);
const eq = vi.fn(() => ({ select }));
const update = vi.fn(() => ({ eq }));
const from = vi.fn(() => ({ update }));
vi.mock("@/lib/supabase/admin", () => ({ createSupabaseAdminClient: vi.fn(() => ({ from })) }));

const { POST } = await import("@/app/api/admin/class-leads/route");

const ID = "11111111-1111-4111-8111-111111111111";
const post = (body: unknown) =>
  new NextRequest("http://localhost/api/admin/class-leads", { method: "POST", body: JSON.stringify(body) });

beforeEach(() => {
  vi.clearAllMocks();
  gate.current = "ok";
  result.current = { data: [{ id: ID }], error: null };
});

describe("POST /api/admin/class-leads", () => {
  it("refuses anyone but the superadmin before touching the table", async () => {
    gate.current = "student";
    const res = await POST(post({ id: ID, called: true }));
    expect(res.status).toBe(403);
    gate.current = "anon";
    expect((await POST(post({ id: ID, called: true }))).status).toBe(401);
    expect(from).not.toHaveBeenCalled();
  });

  it("stamps called_at on a tick and clears it on an untick", async () => {
    await POST(post({ id: ID, called: true }));
    const [set] = update.mock.calls[0] as unknown as [Record<string, unknown>];
    expect(typeof set.called_at).toBe("string");
    expect(eq).toHaveBeenCalledWith("id", ID);

    await POST(post({ id: ID, called: false }));
    const [unset] = update.mock.calls[1] as unknown as [Record<string, unknown>];
    expect(unset.called_at).toBeNull();
  });

  it("refuses a body without an id and a yes/no", async () => {
    const res = await POST(post({ id: "nope", called: "yes" }));
    expect(res.status).toBe(400);
    expect(update).not.toHaveBeenCalled();
  });

  it("answers 404 for a lead that is not there", async () => {
    result.current = { data: [], error: null };
    expect((await POST(post({ id: ID, called: true }))).status).toBe(404);
  });
});
