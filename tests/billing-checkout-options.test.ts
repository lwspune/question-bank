/**
 * The contact part of Razorpay's checkout options (2026-11-12). Razorpay opens
 * on "Enter mobile & email to continue" when it has no mobile, so a student
 * without one saved typed a number before seeing any way to pay. We prefill
 * what we have and set `hidden.contact`, which Razorpay's docs describe as
 * making the contact field optional and not shown.
 */
import { describe, it, expect } from "vitest";
import { checkoutContactOptions } from "@/lib/billing/checkoutOptions";

describe("checkoutContactOptions", () => {
  it("prefills the saved mobile and email, and hides the contact field", () => {
    expect(checkoutContactOptions({ email: "asha@example.com", contact: "+919876543210" })).toEqual({
      prefill: { email: "asha@example.com", contact: "+919876543210" },
      hidden: { contact: true },
    });
  });

  it("hides the contact field when there is no mobile, so Razorpay does not ask for one", () => {
    expect(checkoutContactOptions({ email: "asha@example.com" })).toEqual({
      prefill: { email: "asha@example.com" },
      hidden: { contact: true },
    });
  });

  it("sends no prefill when there is nothing to prefill", () => {
    expect(checkoutContactOptions({})).toEqual({ hidden: { contact: true } });
  });
});
