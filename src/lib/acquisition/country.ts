import type { ActivityEvent } from "@/lib/activity/events";

/** The header Vercel's edge sets on every request: ISO 3166-1 alpha-2. */
export const COUNTRY_HEADER = "x-vercel-ip-country";

/**
 * The visitor's country, or null. Null is normal: the header is absent in
 * local dev and on any host that is not Vercel. Anything but two letters is
 * refused here, so migration 0142's CHECK is never what catches it.
 */
export function readCountry(headers: Pick<Headers, "get">): string | null {
  const v = headers.get(COUNTRY_HEADER)?.trim().toUpperCase();
  return v && /^[A-Z]{2}$/.test(v) ? v : null;
}

/**
 * The event with `country` added to its metadata. Stamped on the server, after
 * the client's event is parsed, so a browser can never supply its own.
 */
export function withCountry(event: ActivityEvent, country: string | null): ActivityEvent {
  if (!country) return event;
  return { ...event, metadata: { ...event.metadata, country } };
}
