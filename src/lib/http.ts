import type { NextRequest } from "next/server";

/** Best-effort client IP from proxy headers (Vercel/CF/ALB set x-forwarded-for).
 *  Used to key anon rate-limit buckets. Shared by the export + public-quiz routes. */
export function getClientIp(request: NextRequest): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const xri = request.headers.get("x-real-ip");
  if (xri) return xri.trim();
  return "unknown";
}
