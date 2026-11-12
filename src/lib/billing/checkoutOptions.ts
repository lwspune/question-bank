/**
 * The contact part of Razorpay's Checkout options (2026-11-12). Pure, so the
 * client hook (`useCheckout`) has a tested core.
 *
 * Razorpay opens on "Enter mobile & email to continue" when it has no mobile,
 * so every first-time buyer typed a number before seeing any way to pay. Two
 * levers: prefill the mobile we have, and `hidden.contact`, which Razorpay's
 * Standard Checkout docs describe as making the contact field optional and not
 * shown to the customer. Their docs name no account setting for it; whether a
 * buyer with no mobile now lands on the ways to pay is checked on a phone.
 */
export type CheckoutContactOptions = {
  prefill?: { email?: string; contact?: string };
  hidden: { contact: true };
};

export function checkoutContactOptions(buyer: { email?: string; contact?: string }): CheckoutContactOptions {
  const prefill = {
    ...(buyer.email ? { email: buyer.email } : {}),
    ...(buyer.contact ? { contact: buyer.contact } : {}),
  };
  return Object.keys(prefill).length > 0 ? { prefill, hidden: { contact: true } } : { hidden: { contact: true } };
}
