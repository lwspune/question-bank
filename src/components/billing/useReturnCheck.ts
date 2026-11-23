"use client";

import { useEffect, useRef } from "react";
import { browserStorage, forgetPendingOrder, readPendingOrder } from "@/lib/billing/pendingOrder";

/**
 * The return check, browser half (2026-11-22). When the page is looked at
 * again (back from a UPI app, a reload, a tab switch) and it holds a note of an
 * open checkout (lib/billing/pendingOrder.ts), ask the server whether that
 * order was paid; if it was, the server has granted it, and `onPaid` runs.
 *
 * WHY: with UPI on a phone the checkout's success callback often never runs.
 * On 22 Nov a parent paid, the page never heard back, and they opened
 * checkout again 7 minutes later. Server half: lib/billing/confirmOrder.ts.
 */

/**
 * Each order is acted on once per page, whoever sees it first: the success
 * callback or a return check, and only one of several checkout boxes on the
 * same page.
 */
const claimed = new Set<string>();
export function claimOrder(orderId: string): boolean {
  if (claimed.has(orderId)) return false;
  claimed.add(orderId);
  return true;
}

export function useReturnCheck({
  endpoint,
  storageKey,
  extraBody,
  onPaid,
}: {
  /** /api/billing/check-order (a student) or /api/billing/parent-check (a parent). */
  endpoint: string;
  storageKey: string;
  /** The parent page's link code. */
  extraBody?: Record<string, string>;
  onPaid: (orderId: string) => void;
}): void {
  const onPaidRef = useRef(onPaid);
  useEffect(() => {
    onPaidRef.current = onPaid;
  }, [onPaid]);
  const extra = JSON.stringify(extraBody ?? {});

  useEffect(() => {
    let inFlight = false;
    const check = async () => {
      if (inFlight || document.visibilityState !== "visible") return;
      const storage = browserStorage();
      const orderId = readPendingOrder(storage, storageKey, Date.now());
      if (!orderId || claimed.has(orderId)) return;
      inFlight = true;
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...JSON.parse(extra), orderId }),
        });
        const data = (await res.json().catch(() => null)) as { state?: string } | null;
        if (res.status === 404) forgetPendingOrder(storage, storageKey);
        if (res.ok && data?.state === "paid" && claimOrder(orderId)) {
          forgetPendingOrder(storage, storageKey);
          onPaidRef.current(orderId);
        }
      } catch {
        // Offline or the server busy: the next return tries again, and the webhook remains.
      } finally {
        inFlight = false;
      }
    };
    void check();
    document.addEventListener("visibilitychange", check);
    window.addEventListener("pageshow", check);
    window.addEventListener("focus", check);
    return () => {
      document.removeEventListener("visibilitychange", check);
      window.removeEventListener("pageshow", check);
      window.removeEventListener("focus", check);
    };
  }, [endpoint, storageKey, extra]);
}
