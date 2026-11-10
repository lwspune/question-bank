/**
 * GET /r/<code> (migration 0249): the link a student sends. A well-formed code
 * parks the invite in an httpOnly qb_ref cookie (code + when it was opened)
 * and sends a signed-out visitor to /signup, tagged as a referral; a signed-in
 * visitor already has an account, so they go home. A malformed code sets
 * nothing. The code is checked against the database only at sign-up.
 */
import { vi, describe, it, expect, beforeEach } from "vitest";
import { NextRequest } from "next/server";

vi.mock("@/lib/auth", () => ({ getSessionUser: vi.fn(async () => null) }));

import { getSessionUser } from "@/lib/auth";
import { GET } from "@/app/r/[code]/route";
import { readRefCookie } from "@/lib/referrals/referral";

const open = (code: string) =>
  GET(new NextRequest(`https://www.pyqvault.com/r/${code}`), { params: Promise.resolve({ code }) });

beforeEach(() => vi.clearAllMocks());

describe("/r/<code>", () => {
  it("parks the invite and sends a new visitor to sign up", async () => {
    const res = await open("k7qm2xpa");
    expect(res.status).toBe(307);
    const to = new URL(res.headers.get("location")!);
    expect(to.pathname).toBe("/signup");
    expect(to.searchParams.get("utm_source")).toBe("referral");
    const cookie = res.cookies.get("qb_ref");
    expect(cookie?.httpOnly).toBe(true);
    expect(readRefCookie(cookie?.value)).toMatchObject({ code: "K7QM2XPA" });
  });

  it("sends a signed-in visitor home and parks nothing", async () => {
    vi.mocked(getSessionUser).mockResolvedValueOnce({ id: "u1" } as Awaited<ReturnType<typeof getSessionUser>>);
    const res = await open("K7QM2XPA");
    expect(new URL(res.headers.get("location")!).pathname).toBe("/me");
    expect(res.cookies.get("qb_ref")).toBeUndefined();
  });

  it("ignores a malformed code", async () => {
    const res = await open("not-a-code");
    expect(new URL(res.headers.get("location")!).pathname).toBe("/");
    expect(res.cookies.get("qb_ref")).toBeUndefined();
  });
});
