/**
 * A failed Razorpay payment in plain words (2026-11-26). Since go-live 6 of 13
 * FamPay payments failed with "bank_account_invalid", and the one student who
 * hit it five times paid on the very next try each time. So a decline is
 * worth a "try again" to the student, and a name for the owner's 6 pm list.
 */
import { describe, it, expect } from "vitest";
import {
  failureKind,
  isFailureKind,
  latestFailureByUser,
  ownerFailureLabel,
  studentFailureHint,
  upiAppName,
  type FailedPayment,
} from "@/lib/billing/paymentFailure";

describe("failureKind", () => {
  it("names Razorpay's reasons the way a student would", () => {
    expect(failureKind("bank_account_invalid")).toBe("declined");
    expect(failureKind("payment_timed_out")).toBe("timed_out");
    expect(failureKind("insufficient_funds")).toBe("no_balance");
    expect(failureKind("payment_risk_check_failed")).toBe("other");
    expect(failureKind(undefined)).toBe("other");
    expect(failureKind(null)).toBe("other");
  });
});

describe("isFailureKind", () => {
  it("accepts the four kinds only", () => {
    for (const k of ["declined", "timed_out", "no_balance", "other"]) expect(isFailureKind(k)).toBe(true);
    expect(isFailureKind("bank_account_invalid")).toBe(false);
    expect(isFailureKind(3)).toBe(false);
  });
});

describe("upiAppName", () => {
  it("names the app from the UPI handle", () => {
    expect(upiAppName("742xxxx@fam")).toBe("FamPay");
    expect(upiAppName("x@ybl")).toBe("PhonePe");
    expect(upiAppName("x@axl")).toBe("PhonePe");
    expect(upiAppName("x@okaxis")).toBe("Google Pay");
    expect(upiAppName("x@ptsbi")).toBe("Paytm");
    expect(upiAppName("X@FAM")).toBe("FamPay");
  });

  it("gives null for an unknown handle or no UPI ID", () => {
    expect(upiAppName("x@someotherbank")).toBeNull();
    expect(upiAppName(null)).toBeNull();
    expect(upiAppName("no-at-sign")).toBeNull();
  });
});

describe("studentFailureHint", () => {
  it("tells a declined payer that a second try often works, naming FamPay", () => {
    const hint = studentFailureHint("declined");
    expect(hint).toMatch(/second try/);
    expect(hint).toMatch(/FamPay/);
    expect(hint).toMatch(/another UPI app/);
  });

  it("has a line for every kind, none with an em dash", () => {
    for (const k of ["declined", "timed_out", "no_balance", "other"] as const) {
      const hint = studentFailureHint(k);
      expect(hint.length).toBeGreaterThan(20);
      expect(hint).not.toMatch(/[—–]/);
    }
  });
});

describe("ownerFailureLabel", () => {
  it("names the app and what happened", () => {
    expect(ownerFailureLabel({ kind: "declined", app: "FamPay" })).toBe("payment failed: FamPay declined it");
    expect(ownerFailureLabel({ kind: "declined", app: null })).toBe("payment failed: their UPI app declined it");
    expect(ownerFailureLabel({ kind: "timed_out", app: null })).toBe("payment failed: not approved in time");
    expect(ownerFailureLabel({ kind: "no_balance", app: "PhonePe" })).toBe("payment failed: not enough balance");
    expect(ownerFailureLabel({ kind: "other", app: null })).toBe("payment failed");
  });

  it("adds the phone and browser when the order recorded them (2026-11-27)", () => {
    expect(ownerFailureLabel({ kind: "timed_out", app: null, device: "android/instagram" })).toBe(
      "payment failed: not approved in time (Android, inside Instagram)"
    );
    expect(ownerFailureLabel({ kind: "declined", app: "FamPay", device: "ios/browser" })).toBe("payment failed: FamPay declined it (iPhone)");
    expect(ownerFailureLabel({ kind: "other", app: null, device: "unknown" })).toBe("payment failed");
    expect(ownerFailureLabel({ kind: "other", app: null, device: null })).toBe("payment failed");
  });
});

describe("latestFailureByUser", () => {
  const at = (iso: string) => Math.floor(new Date(iso).getTime() / 1000);
  const pay = (p: Partial<FailedPayment> & Pick<FailedPayment, "id">): FailedPayment => ({
    status: "failed",
    created_at: at("2026-11-26T09:30:00Z"),
    error_reason: "bank_account_invalid",
    vpa: "742xxxx@fam",
    notes: { userId: "u1", planId: "mock-pass-6m" },
    ...p,
  });
  const WINDOW = { from: new Date("2026-11-25T11:30:00Z"), to: new Date("2026-11-26T11:30:00Z") };

  it("keeps each student's latest failed payment in the window, with what it was for", () => {
    const out = latestFailureByUser(
      [
        pay({ id: "p1", created_at: at("2026-11-26T08:00:00Z"), error_reason: "payment_timed_out", vpa: null }),
        pay({ id: "p2" }),
        pay({ id: "p3", notes: { userId: "u2", ebookSlug: "cbse-12-physics-repeated-pyqs" }, error_reason: "payment_timed_out", vpa: null }),
      ],
      WINDOW
    );
    expect(out.get("u1")).toEqual({ kind: "declined", app: "FamPay", at: new Date("2026-11-26T09:30:00Z"), planId: "mock-pass-6m", ebookSlug: null, device: null });
    expect(out.get("u2")).toEqual({
      kind: "timed_out",
      app: null,
      at: new Date("2026-11-26T09:30:00Z"),
      planId: null,
      ebookSlug: "cbse-12-physics-repeated-pyqs",
      device: null,
    });
  });

  it("carries the device the order was opened on (2026-11-27)", () => {
    const out = latestFailureByUser(
      [pay({ id: "p1", error_reason: "payment_timed_out", vpa: null, notes: { userId: "u1", planId: "mock-pass-6m", device: "android/instagram" } })],
      WINDOW
    );
    expect(out.get("u1")?.device).toBe("android/instagram");
  });

  it("ignores captured payments, payments outside the window and payments naming no student", () => {
    const out = latestFailureByUser(
      [
        pay({ id: "p1", status: "captured" }),
        pay({ id: "p2", created_at: at("2026-11-24T09:30:00Z") }),
        pay({ id: "p3", created_at: at("2026-11-26T12:00:00Z") }),
        pay({ id: "p4", notes: {} }),
        pay({ id: "p5", notes: null }),
      ],
      WINDOW
    );
    expect(out.size).toBe(0);
  });
});
