/**
 * The "Secure payment via ..." line under the passes on /pricing (0271).
 * It follows the passes SHOWN, not the site: on intl a visitor in India sees
 * the rupee IMAT pass (Razorpay, UPI), everyone else the dollar pass sold by
 * Paddle as Merchant of Record. Pure; tests/billing-payment-line.test.ts.
 */
import type { Plan } from "./plans";

const CURRENCY_NAME = { INR: "Indian rupees", USD: "US dollars" } as const;

export function paymentLine(plans: readonly Plan[]): string | null {
  if (plans.length === 0) return null;
  const paddle = plans.find((p) => p.paymentProvider === "paddle");
  if (paddle) {
    return `Secure checkout by Paddle, our reseller and Merchant of Record · cards and other payment methods, in ${CURRENCY_NAME[paddle.currency]}`;
  }
  return plans.every((p) => p.currency === "INR")
    ? "Secure payment via Razorpay · UPI, cards, netbanking"
    : "Secure payment via Razorpay · international debit and credit cards, in US dollars";
}

const NOT_STORED = "We do not see or store your card, UPI or bank details.";
const PADDLE_ROLE =
  "Paddle takes the payment, collects any sales tax and issues the receipt, and Paddle's buyer terms apply to the payment.";

/**
 * The Terms' payment sentence, from the passes on sale. Paddle reviews the
 * site before a plan can move to it, so while a dollar pass is still sold
 * through Razorpay the sentence is true for both gateways; once every dollar
 * pass is Paddle's, it names Paddle alone.
 */
export function paymentTerms(plans: readonly Plan[]): string {
  const usd = plans.filter((p) => p.currency === "USD");
  if (usd.length === 0) return `Payments are processed by Razorpay. ${NOT_STORED}`;
  const rupees = plans.some((p) => p.currency === "INR") ? "Payments in Indian rupees are processed by Razorpay. " : "";
  const dollars = usd.every((p) => p.paymentProvider === "paddle")
    ? `Orders in US dollars on intl.pyqvault.com are processed by our online reseller Paddle.com, the Merchant of Record for those orders. ${PADDLE_ROLE}`
    : `Payments in US dollars on intl.pyqvault.com are processed by Razorpay or, where the checkout says so, by our online reseller Paddle.com, the Merchant of Record for the orders it processes. ${PADDLE_ROLE}`;
  return `${rupees}${dollars} ${NOT_STORED}`;
}
