/**
 * /api/me/referral (migration 0249): the inviter's card. GET reads the
 * student's code (null until they ask for one) and their counts; POST makes
 * the code on the first tap of "Get my invite link", so "links made" counts
 * students who asked, not page views (the flaw in the practise-together
 * numbers). Rupee passes only, so nothing on the intl site.
 */
import { vi, describe, it, expect, beforeEach } from "vitest";
import { NextRequest } from "next/server";

const session = vi.fn();
vi.mock("@/lib/auth", () => ({ getSessionUser: () => session() }));
vi.mock("@/lib/supabase/admin", () => ({ createSupabaseAdminClient: vi.fn(() => ({})) }));
vi.mock("@/lib/referrals/service", () => ({
  readReferralCode: vi.fn(async () => null),
  getOrCreateReferralCode: vi.fn(async () => "K7QM2XPA"),
  readReferralStats: vi.fn(async () => ({ joined: 0, bought: 0, rewards: 0 })),
}));

import { getOrCreateReferralCode, readReferralCode, readReferralStats } from "@/lib/referrals/service";
import { GET, POST } from "@/app/api/me/referral/route";

const req = (method: "GET" | "POST", host = "www.pyqvault.com") =>
  new NextRequest(`https://${host}/api/me/referral`, { method, headers: { host } });

beforeEach(() => {
  vi.clearAllMocks();
  session.mockResolvedValue({ id: "u1" });
});

describe("GET /api/me/referral", () => {
  it("is 401 signed out", async () => {
    session.mockResolvedValue(null);
    expect((await GET(req("GET"))).status).toBe(401);
  });

  it("answers no link before the student asks, with the offer line", async () => {
    const body = await (await GET(req("GET"))).json();
    expect(body).toMatchObject({ eligible: true, code: null, link: null });
    expect(body.line).toContain("25% off");
    expect(getOrCreateReferralCode).not.toHaveBeenCalled();
  });

  it("answers the link and counts once there is a code", async () => {
    vi.mocked(readReferralCode).mockResolvedValueOnce("K7QM2XPA");
    vi.mocked(readReferralStats).mockResolvedValueOnce({ joined: 2, bought: 1, rewards: 1 });
    const body = await (await GET(req("GET"))).json();
    expect(body).toMatchObject({
      code: "K7QM2XPA",
      link: "https://www.pyqvault.com/r/K7QM2XPA",
      line: "2 friends joined · 1 bought a pass · 30 of 180 free days earned.",
    });
    expect(body.shareText).toContain("https://www.pyqvault.com/r/K7QM2XPA");
  });

  it("is 503 when it cannot read", async () => {
    vi.mocked(readReferralCode).mockRejectedValueOnce(new Error("db down"));
    expect((await GET(req("GET"))).status).toBe(503);
  });

  it("is not offered on the intl site", async () => {
    expect(await (await GET(req("GET", "intl.pyqvault.com"))).json()).toEqual({ eligible: false });
  });
});

describe("POST /api/me/referral", () => {
  it("makes the code and answers the link", async () => {
    const res = await POST(req("POST"));
    expect(res.status).toBe(200);
    expect(getOrCreateReferralCode).toHaveBeenCalledWith(expect.anything(), "u1");
    expect(await res.json()).toMatchObject({ code: "K7QM2XPA", link: "https://www.pyqvault.com/r/K7QM2XPA" });
  });

  it("is 401 signed out and 404 on intl", async () => {
    expect((await POST(req("POST", "intl.pyqvault.com"))).status).toBe(404);
    session.mockResolvedValue(null);
    expect((await POST(req("POST"))).status).toBe(401);
  });
});
