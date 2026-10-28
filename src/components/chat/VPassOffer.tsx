"use client";

import { RevealDailyLinkPrompt, RevealDailyOffer } from "@/components/reveal/RevealDailyLimit";
import type { VPassOffer as Offer } from "@/lib/chat/passOffer";

/**
 * The Premium Pass offer inside V (2026-10-28): under V's reply when the day's
 * free answers stopped an explanation, and on V's question card. The bank's
 * own offer (price, one tap to pay, "more free answers tomorrow"), counted as
 * surface "v". With no pass on sale it is the /pricing link, which closes the
 * window as it is followed.
 */
export default function VPassOffer({
  offer,
  onPaid,
  onNavigate,
}: {
  offer: Offer;
  /** Access granted: the caller asks again, so the chat stays where it is. */
  onPaid: () => void;
  onNavigate?: () => void;
}) {
  return offer.pass ? (
    <RevealDailyOffer surface="v" pass={offer.pass} limit={offer.limit} onPaid={onPaid} checkoutSurface="v_chat" />
  ) : (
    <RevealDailyLinkPrompt surface="v" limit={offer.limit} onNavigate={onNavigate} />
  );
}
