/**
 * GET /api/me/header — the viewer's header identity.
 *
 * Exists so AppHeader can stop resolving the session during server render. That
 * render is what forced every page on the site to be per-request and uncached;
 * fetching the identity from the browser instead lets pages be built once and
 * shared, with the personal part filled in client-side.
 *
 * Only signed-in browsers call this (the client skips it when no Supabase
 * cookie is present), so anon traffic — the bulk of it — pays nothing.
 *
 * `no-store` is essential: this response is per-user and must never be held by
 * a CDN or a shared cache. The whole point of the change is that user data
 * lives HERE, in an uncacheable per-request response, and not in the cached
 * page HTML.
 */
import { NextResponse } from "next/server";
import { getHeaderSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getHeaderSession();
    return NextResponse.json(
      { session },
      { headers: { "Cache-Control": "no-store, private" } }
    );
  } catch {
    // The header must render even if identity lookup fails — degrade to signed-out
    // chrome rather than throwing on every page of the site.
    return NextResponse.json(
      { session: null },
      { headers: { "Cache-Control": "no-store, private" } }
    );
  }
}
