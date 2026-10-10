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

/**
 * When the deploy that started recording country went live (migration 0142).
 * It landed between 15:40 and 16:00 UTC on 9 Oct 2026; accounts made before
 * it have no country, so /dashboard/growth counts from here and never reports
 * them as "not recorded".
 */
export const COUNTRY_RECORDED_SINCE = "2026-10-09T16:00:00Z";

const REGION_NAMES = new Intl.DisplayNames(["en"], { type: "region" });

/**
 * The English name for a two-letter code, or the code itself when Intl does
 * not know it. Intl answers an unassigned code with the code ("XX") or with
 * "Unknown Region" ("ZZ"); both come back as the code, never a made-up name.
 */
export function countryName(code: string): string {
  let name: string | undefined;
  try {
    name = REGION_NAMES.of(code);
  } catch {
    return code;
  }
  return !name || name === code || name === "Unknown Region" ? code : name;
}
