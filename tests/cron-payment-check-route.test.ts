/**
 * /api/cron/payment-check: the payment check on Vercel's scheduler
 * (2026-11-22). GitHub's "every 30 minutes" schedule ran it every 6 to 8 hours
 * (19-22 Nov), so a stranded buyer waited most of a day. Vercel calls the route
 * with `Authorization: Bearer <CRON_SECRET>`; nothing else may start it, since
 * it grants passes and sends email.
 */
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { NextRequest } from "next/server";

vi.mock("@/lib/supabase/admin", () => ({ createSupabaseAdminClient: vi.fn(() => ({})) }));
vi.mock("@/lib/billing/paymentCheck", () => ({
  runPaymentCheck: vi.fn(async () => ({ outcomes: [], silent: { razorpay: [], paddle: [] }, emails: [], failed: false })),
}));

import { runPaymentCheck } from "@/lib/billing/paymentCheck";
import { GET } from "@/app/api/cron/payment-check/route";

const runMock = vi.mocked(runPaymentCheck);
const call = (auth?: string) =>
  GET(new NextRequest("https://www.pyqvault.com/api/cron/payment-check", { headers: auth ? { authorization: auth } : {} }));

beforeEach(() => {
  runMock.mockClear();
  process.env.CRON_SECRET = "cron-secret-value";
});
afterEach(() => {
  delete process.env.CRON_SECRET;
});

describe("/api/cron/payment-check", () => {
  it("runs the check for real when Vercel's secret comes with the call", async () => {
    const res = await call("Bearer cron-secret-value");
    expect(res.status).toBe(200);
    expect(runMock).toHaveBeenCalledWith(expect.objectContaining({ apply: true, days: 3 }));
  });

  it("refuses a call without the secret", async () => {
    const res = await call();
    expect(res.status).toBe(401);
    expect(runMock).not.toHaveBeenCalled();
  });

  it("refuses a wrong secret", async () => {
    const res = await call("Bearer cron-secret-valuX");
    expect(res.status).toBe(401);
    expect(runMock).not.toHaveBeenCalled();
  });

  it("refuses everything while CRON_SECRET is unset, rather than running open", async () => {
    delete process.env.CRON_SECRET;
    const res = await call("Bearer ");
    expect(res.status).toBe(503);
    expect(runMock).not.toHaveBeenCalled();
  });

  it("answers 500 when a grant or an email failed, so Vercel shows the run as failed", async () => {
    runMock.mockResolvedValueOnce({ outcomes: [], silent: { razorpay: [], paddle: [] }, emails: [], failed: true });
    const res = await call("Bearer cron-secret-value");
    expect(res.status).toBe(500);
  });

  it("answers 500 when the check throws (Razorpay or the database down)", async () => {
    runMock.mockRejectedValueOnce(new Error("Razorpay payments read failed: 502"));
    const res = await call("Bearer cron-secret-value");
    expect(res.status).toBe(500);
    await expect(res.json()).resolves.toMatchObject({ ok: false });
  });
});
