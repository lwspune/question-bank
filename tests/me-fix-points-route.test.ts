/**
 * GET /api/me/fix-points: the display copy of a student's Fix Points (0245).
 * Display only: the order route reads the points again at checkout. A failed
 * read is 503, never "0 points", so a card can tell "none" from "unknown".
 */
import { vi, describe, it, expect, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import type { Plan } from "@/lib/billing/plans";

const session = vi.fn();
vi.mock("@/lib/auth", () => ({ getSessionUser: () => session() }));
vi.mock("@/lib/supabase/server", () => ({ createSupabaseServerClient: vi.fn(() => ({})) }));
vi.mock("@/lib/supabase/admin", () => ({ createSupabaseAdminClient: vi.fn(() => ({})) }));
vi.mock("@/lib/entitlements/query", () => ({ userHasAnyAccess: vi.fn(async () => false), loadEntitlements: vi.fn(async () => []) }));
vi.mock("@/lib/billing/fixPointsService", () => ({ readFixPoints: vi.fn() }));
vi.mock("@/lib/referrals/service", () => ({ readReferralDiscount: vi.fn(async () => 0) }));

const premium: Plan = {
  id: "mock-pass-6m", label: "Premium Pass", blurb: "b", perks: [], urlKey: "mocks", amountPaise: 49900,
  currency: "INR", site: "pyqvault", durationDays: 182, scope: "mocks", active: true, sortOrder: 1, countries: null,
};
const practice: Plan = { ...premium, id: "practice-pass-6m", label: "Practice Pass", urlKey: "practice", amountPaise: 19900, scope: "practice", sortOrder: 0 };
vi.mock("@/lib/billing/plansQuery", () => ({ listActivePlans: vi.fn(async () => [premium, practice]) }));

import { readFixPoints } from "@/lib/billing/fixPointsService";
import { readReferralDiscount } from "@/lib/referrals/service";
import { loadEntitlements, userHasAnyAccess } from "@/lib/entitlements/query";
import { GET } from "@/app/api/me/fix-points/route";

const get = (host = "www.pyqvault.com") => new NextRequest(`https://${host}/api/me/fix-points`, { headers: { host } });

beforeEach(() => {
  vi.clearAllMocks();
  session.mockResolvedValue({ id: "u1" });
});

describe("GET /api/me/fix-points", () => {
  it("is 401 signed out", async () => {
    session.mockResolvedValue(null);
    expect((await GET(get())).status).toBe(401);
  });

  it("answers the points and the new price", async () => {
    vi.mocked(readFixPoints).mockResolvedValue({ points: 12, pct: 12, oldestAt: "2026-11-01T20:00:00.000Z" });
    const res = await GET(get());
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      eligible: true,
      points: 12,
      pct: 12,
      maxPct: 40,
      referralPct: 0,
      hasPass: false,
      lapsesOn: "2026-12-01T20:00:00.000Z",
      prices: { "mock-pass-6m": "₹439", "practice-pass-6m": "₹175" },
      credits: {},
      creditFrom: null,
    });
  });

  it("prices the Premium Pass as an upgrade for a Practice Pass holder (2026-11-11)", async () => {
    vi.mocked(readFixPoints).mockResolvedValue({ points: 12, pct: 12, oldestAt: null });
    vi.mocked(userHasAnyAccess).mockResolvedValueOnce(true);
    const granted = Date.now() - 60_000;
    vi.mocked(loadEntitlements).mockResolvedValueOnce([
      {
        id: "e1", userId: "u1", scope: "practice", source: "razorpay", status: "active",
        grantedAt: new Date(granted).toISOString(), expiresAt: new Date(granted + 182 * 86_400_000).toISOString(),
        providerRef: "pay_1", note: null, grantedBy: null, amountPaise: 19900, currency: "INR",
      },
    ]);
    const body = await (await GET(get())).json();
    expect(body).toMatchObject({
      hasPass: true,
      credits: { "mock-pass-6m": 19900 },
      creditFrom: "Practice Pass",
      prices: { "mock-pass-6m": "₹264" },
    });
  });

  it("lowers the price by a friend's invite too (0249)", async () => {
    vi.mocked(readFixPoints).mockResolvedValue({ points: 0, pct: 0, oldestAt: null });
    vi.mocked(readReferralDiscount).mockResolvedValueOnce(25);
    const body = await (await GET(get())).json();
    expect(body).toMatchObject({ referralPct: 25, prices: { "mock-pass-6m": "₹374" } });
  });

  it("shows the points price when the invite cannot be read", async () => {
    vi.mocked(readFixPoints).mockResolvedValue({ points: 12, pct: 12, oldestAt: null });
    vi.mocked(readReferralDiscount).mockRejectedValueOnce(new Error("db down"));
    const res = await GET(get());
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ referralPct: 0, prices: { "mock-pass-6m": "₹439" } });
  });

  it("shows no credit, not an error, when the passes cannot be read", async () => {
    vi.mocked(readFixPoints).mockResolvedValue({ points: 0, pct: 0, oldestAt: null });
    vi.mocked(loadEntitlements).mockRejectedValueOnce(new Error("db down"));
    const res = await GET(get());
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ credits: {}, prices: {} });
  });

  it("is 503 when the points cannot be read", async () => {
    vi.mocked(readFixPoints).mockRejectedValue(new Error("db down"));
    expect((await GET(get())).status).toBe(503);
  });

  it("is not offered on the intl site", async () => {
    const res = await GET(get("intl.pyqvault.com"));
    expect(await res.json()).toEqual({ eligible: false });
    expect(readFixPoints).not.toHaveBeenCalled();
  });
});
