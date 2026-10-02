/**
 * Pure core for the Microsoft Clarity tag (session recordings + heatmaps).
 *
 * WHY A THIRD INSTRUMENT: Vercel Analytics counts routes, `funnelEvents`
 * counts in-page moments, `user_activity` records learning by a known
 * student. All three say WHAT happened and none can show WHY a student stops
 * — a rage-click on the result page, a drill button that never scrolls into
 * view. Clarity is the qualitative layer over the same funnel. Read it as
 * prompts for a question, never as a count: it is a client-side script that
 * ad blockers and JS-off suppress, so its numbers are floors like the rest.
 *
 * THE PRIVACY BOUNDARY IS THE ROUTE RULE. A recording is a replay of the
 * screen, stored by Microsoft. On public pages that is question text anyone
 * can read. On the staff surfaces it is student rosters, lead mobile numbers,
 * comp grants and every org's name — data students consented to hand PYQ
 * Vault, not to have replayed elsewhere. Clarity's masking hides typed input,
 * not a rendered table, so rather than prove every cell masked, the tag is
 * simply never loaded there. `CLARITY_EXCLUDED_PREFIXES` mirrors the
 * middleware matcher plus the superadmin console and the org-scoped paper /
 * book surfaces (the CLAUDE.md list of where `organizations.name` renders).
 * The staff sessions would also skew every heatmap: a superadmin paging
 * through fifty rows reads as a heavily engaged visitor.
 *
 * Pure (no env, no DOM, no React) so it is unit-tested; the client island
 * lives in components/analytics/ClarityScript.tsx.
 */

export const CLARITY_EXCLUDED_PREFIXES = [
  "/dashboard",
  "/superadmin",
  "/account",
  "/upload",
  "/uploads",
  "/papers",
  "/books",
] as const;

/** Segment-boundary prefix match: `/account` covers `/account/x`, not `/accounting`. */
function underPrefix(pathname: string, prefix: string): boolean {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

/**
 * Hosts that record. An allowlist, not a localhost check: `.env.local` carries
 * the production project id, so on 2026-10-01 local dev visits were landing in
 * the same Clarity project as real students (2 of 76 recorded sessions), and a
 * Vercel preview deploy would do the same. Anything not named here — localhost,
 * a LAN address, a preview URL, a lookalike — does not record.
 */
export const CLARITY_HOSTS = ["www.pyqvault.com", "pyqvault.com"] as const;

export function isClarityHost(hostname: string | null | undefined): boolean {
  const h = (hostname ?? "").toLowerCase();
  return (CLARITY_HOSTS as readonly string[]).includes(h);
}

/** May the tag load on this pathname? Fails CLOSED on anything unusable. */
export function shouldLoadClarity(pathname: string | null | undefined): boolean {
  if (!pathname || !pathname.startsWith("/")) return false;
  return !CLARITY_EXCLUDED_PREFIXES.some((p) => underPrefix(pathname, p));
}

/**
 * What to tell an already-loaded tag on a client-side navigation. Clarity is
 * loaded once per document, so a soft navigation from /browse into /dashboard
 * keeps it alive; the island issues `clarity("stop")` at the boundary and
 * `clarity("start")` on the way back out.
 */
export function clarityCommandFor(pathname: string | null | undefined): "start" | "stop" {
  return shouldLoadClarity(pathname) ? "start" : "stop";
}

/**
 * The project id is interpolated into an inline <script> body, so only a
 * plain token is accepted; anything else is treated as "not configured".
 * Unset or blank means OFF — an absent id must not inject a broken tag.
 */
const PROJECT_ID_RE = /^[a-z0-9]+$/;

export function resolveClarityProjectId(raw: string | undefined | null): string | null {
  const v = (raw ?? "").trim();
  return PROJECT_ID_RE.test(v) ? v : null;
}

/** Clarity's own loader, verbatim from the project's Getting Started page. */
export function buildClaritySnippet(projectId: string): string {
  return (
    "(function(c,l,a,r,i,t,y){" +
    "c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};" +
    't=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;' +
    "y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);" +
    `})(window, document, "clarity", "script", "${projectId}");`
  );
}
