/**
 * The order ROUTE hands Razorpay the student's saved mobile (2026-11-12).
 * Razorpay's checkout opens on "Enter mobile & email to continue" when it has
 * no mobile, and we used to send the email alone, so every first-time buyer
 * typed a number before seeing UPI. The route now returns `contact` for a
 * student with a mobile on file, never fails a checkout over a profile read,
 * and records on the checkout_opened row whether a mobile went out, so the
 * effect can be read per checkout.
 *
 * Razorpay, the session, the plan read, the points read and the profile read
 * are mocked.
 */
import { vi, describe, it, expect, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import type { Plan } from "@/lib/billing/plans";

vi.mock("@/lib/auth", () => ({ getSessionUser: vi.fn(async () => ({ id: "u1", email: "asha@example.com" })) }));
vi.mock("@/lib/supabase/server", () => ({ createSupabaseServerClient: vi.fn(() => ({})) }));
vi.mock("@/lib/supabase/admin", () => ({ createSupabaseAdminClient: vi.fn(() => ({})) }));
vi.mock("@/lib/activity/service", () => ({ logActivity: vi.fn(async () => undefined) }));
vi.mock("@/lib/billing/razorpay", () => ({
  createOrder: vi.fn(async (input: { amountPaise: number; currency: string }) => ({
    ok: true, orderId: "order_1", amount: input.amountPaise, currency: input.currency,
  })),
}));
vi.mock("@/lib/billing/fixPointsService", () => ({ readFixPoints: vi.fn(async () => ({ points: 0, pct: 0, oldestAt: null })) }));
vi.mock("@/lib/profile/service", () => ({ getOwnMobile: vi.fn() }));
vi.mock("@/lib/ebooks/checkout", () => ({
  ebookOrderTerms: vi.fn(async () => ({
    ok: true, slug: "cgl-maths", title: "CGL Maths", listPaise: 9900, amountPaise: 9900, passHolder: false,
  })),
}));

const practice: Plan = {
  id: "practice-pass-6m", label: "Practice Pass", blurb: "b", perks: [], urlKey: "practice", amountPaise: 19900,
  currency: "INR", site: "pyqvault", durationDays: 182, scope: "practice", active: true, sortOrder: 0, countries: null,
};

vi.mock("@/lib/billing/plansQuery", () => ({ listActivePlans: vi.fn(async () => [practice]) }));

import { logActivity } from "@/lib/activity/service";
import { getOwnMobile } from "@/lib/profile/service";
import { POST as order } from "@/app/api/billing/order/route";

const post = (body: unknown) =>
  new NextRequest("http://localhost/api/billing/order", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "content-type": "application/json", "x-vercel-ip-country": "IN" },
  });

/** The metadata of the checkout_opened row the route logged. */
function openedMetadata(): Record<string, unknown> {
  const call = vi.mocked(logActivity).mock.calls.find(
    (c) => (c[2] as { metadata?: { step?: string } }).metadata?.step === "checkout_opened"
  );
  expect(call).toBeDefined();
  return (call![2] as { metadata: Record<string, unknown> }).metadata;
}

beforeEach(() => {
  vi.clearAllMocks();
  process.env.RAZORPAY_KEY_ID = "rzp_test";
});

describe("/api/billing/order sends the saved mobile to Razorpay", () => {
  it("returns the mobile in Razorpay's +91 form and records that it went out", async () => {
    vi.mocked(getOwnMobile).mockResolvedValue({ mobile: "919876543210" });
    const res = await order(post({ planId: "practice-pass-6m", gate: "reveals" }));
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ email: "asha@example.com", contact: "+919876543210" });
    expect(openedMetadata()).toMatchObject({ step: "checkout_opened", gate: "reveals", hasContact: true });
  });

  it("returns no contact for a student with no mobile, and records that", async () => {
    vi.mocked(getOwnMobile).mockResolvedValue({ mobile: null });
    const res = await order(post({ planId: "practice-pass-6m" }));
    expect(res.status).toBe(200);
    expect(await res.json()).not.toHaveProperty("contact");
    expect(openedMetadata()).toMatchObject({ hasContact: false });
  });

  it("still opens checkout when the mobile cannot be read", async () => {
    vi.mocked(getOwnMobile).mockRejectedValue(new Error("db down"));
    const res = await order(post({ planId: "practice-pass-6m" }));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toMatchObject({ orderId: "order_1" });
    expect(json).not.toHaveProperty("contact");
  });

  it("sends the mobile for a book checkout too", async () => {
    vi.mocked(getOwnMobile).mockResolvedValue({ mobile: "919876543210" });
    const res = await order(post({ ebookSlug: "cgl-maths" }));
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ contact: "+919876543210" });
  });
});
