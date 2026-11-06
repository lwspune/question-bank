"use client";

import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";
import { dropBotEvent } from "@/lib/analytics/botFilter";

/**
 * Vercel Web Analytics with bots left out (2026-11-07). The check runs in the
 * browser before each page view or funnel event is sent, so it reads nothing
 * on the server and cached pages stay cached.
 */
function beforeSend(event: BeforeSendEvent): BeforeSendEvent | null {
  return dropBotEvent(event, { userAgent: navigator.userAgent, webdriver: navigator.webdriver });
}

export default function VercelAnalytics() {
  return <Analytics beforeSend={beforeSend} />;
}
