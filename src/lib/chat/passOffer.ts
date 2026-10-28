/**
 * The Premium Pass offer under V's reply (2026-10-28). When explain_question
 * meets the day's free answers, the server sends `passOffer` with the reply:
 * the limit and the pass on sale, and the window shows the same in-place offer
 * the bank's wall shows (components/reveal/RevealDailyLimit). Before this V
 * only said "the Premium Pass at /pricing", 26 times to 16 students in a week,
 * and none of it reached the paywall numbers.
 *
 * `pass` is null when none is on sale or the plans read failed: the window
 * then links to /pricing. Pure, and safe in client code. Spec:
 * tests/chat-pass-offer.test.ts.
 */
import type { PassCta } from "@/lib/billing/plans";

export type VPassOffer = { limit: number; pass: PassCta | null };

function isPassCta(raw: unknown): raw is PassCta {
  const p = raw as Partial<Record<keyof PassCta, unknown>> | null;
  return (
    !!p &&
    typeof p === "object" &&
    (["planId", "label", "price", "length", "urlKey"] as const).every((k) => typeof p[k] === "string") &&
    Array.isArray(p.perks) &&
    p.perks.every((x) => typeof x === "string")
  );
}

/** The offer from a reply, or null. A malformed pass is dropped, keeping the limit. */
export function parseVPassOffer(raw: unknown): VPassOffer | null {
  const o = raw as { limit?: unknown; pass?: unknown } | null | undefined;
  if (!o || typeof o !== "object") return null;
  if (typeof o.limit !== "number" || !Number.isInteger(o.limit) || o.limit < 1) return null;
  return { limit: o.limit, pass: isPassCta(o.pass) ? o.pass : null };
}
