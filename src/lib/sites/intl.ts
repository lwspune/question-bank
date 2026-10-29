/**
 * intl.pyqvault.com — the international site (2026-10-30, NICHE_SITES_SPEC.md).
 *
 * One codebase serves two hosts. International exams (`site: "intl"` in
 * EXAM_REGISTRY, IMAT first) are served only on the intl host; PYQ Vault's own
 * pages only on www. The middleware asks the two decision functions below on
 * every request it sees, and moves a page to the right host with a permanent
 * redirect, so each page has exactly one public address.
 *
 * Everything is decided from the PATH and the HOST HEADER in the middleware,
 * never by reading the host inside a shared layout: that would make every page
 * on both sites dynamic (CLAUDE.md, "One cookies() read in a SHARED SHELL").
 *
 * MOVING TO ITS OWN DOMAIN later: change INTL_ORIGIN, add the old host name to
 * FORMER_INTL_HOSTS (the middleware then 301s every old URL to the same path on
 * the new origin), attach the new domain in Vercel and add its auth callback in
 * Supabase. Nothing else names the host.
 */
import { EXAM_REGISTRY, type ExamEntry, type ExamSlug } from "@/lib/exam/examContext";
import type { PlanSite } from "@/lib/billing/plans";

export const INTL_ORIGIN = "https://intl.pyqvault.com";
export const WWW_ORIGIN = "https://www.pyqvault.com";

/** Host names the intl site used to live on; each 301s to INTL_ORIGIN. */
export const FORMER_INTL_HOSTS: readonly string[] = [];

const INTL_HOSTNAME = new URL(INTL_ORIGIN).hostname;
/** Local development: browsers resolve any *.localhost name to this machine. */
const LOCAL_INTL_HOSTNAME = "intl.localhost";
const WWW_HOSTNAMES = new Set(["www.pyqvault.com", "pyqvault.com"]);
const LOCAL_HOSTNAMES = new Set(["localhost", "127.0.0.1"]);

/** The international exams, in registry order. */
export const INTL_EXAMS: readonly ExamEntry[] = EXAM_REGISTRY.filter((e) => e.site === "intl");

function splitHost(host: string | null | undefined): { name: string; port: string } {
  const [name = "", port = ""] = (host ?? "").trim().toLowerCase().split(":");
  return { name, port };
}

export function isIntlHost(host: string | null | undefined): boolean {
  const { name } = splitHost(host);
  return name === INTL_HOSTNAME || name === LOCAL_INTL_HOSTNAME;
}

export function isFormerIntlHost(host: string | null | undefined): boolean {
  const { name } = splitHost(host);
  return name !== "" && FORMER_INTL_HOSTS.includes(name);
}

/**
 * Where a non-intl host's international pages move to: production www to the
 * intl origin, localhost to intl.localhost on the same port. null for any other
 * host (a Vercel preview), which then serves every page as-is.
 */
export function intlOriginFor(host: string | null | undefined): string | null {
  const { name, port } = splitHost(host);
  if (WWW_HOSTNAMES.has(name)) return INTL_ORIGIN;
  if (LOCAL_HOSTNAMES.has(name)) return `http://${LOCAL_INTL_HOSTNAME}:${port || "3000"}`;
  return null;
}

/**
 * The international exam a path belongs to, or null. Covers every URL family
 * that serves one exam: its hub, notes (subject routes are `<slug>-<subject>`),
 * printable notes, formula pages, mock hub, mock papers (slugs are
 * `<slug>-<sitting>`) and the per-chapter question landings.
 */
export function intlExamOfPath(pathname: string): ExamSlug | null {
  for (const exam of INTL_EXAMS) {
    const s = exam.slug;
    const within = (base: string) => pathname === base || pathname.startsWith(`${base}/`);
    if (
      pathname === `/exams/${s}` ||
      pathname === `/notes/${s}` ||
      pathname.startsWith(`/notes/${s}-`) ||
      pathname.startsWith(`/notes/print/${s}-`) ||
      within(`/formula/${s}`) ||
      within(`/mock/exam/${s}`) ||
      pathname.startsWith(`/mock/${s}-`) ||
      within(`/questions/${s}`)
    ) {
      return s;
    }
  }
  return null;
}

export type HostDecision =
  | { kind: "next" }
  | { kind: "rewrite"; path: string }
  | { kind: "redirect"; url: string; permanent: boolean };

const NEXT: HostDecision = { kind: "next" };

/** Pages that work the same on both hosts: sign-in, the pass, the account, an attempt, legal. */
const SHARED_EXACT = new Set([
  "/login",
  "/signup",
  "/pricing",
  "/browse",
  "/saved",
  "/terms",
  "/privacy",
  "/refunds",
  "/contact",
  "/unsubscribe",
  "/opengraph-image",
]);
const SHARED_PREFIXES = ["/account", "/mock/attempt", "/api", "/_next", "/intl"];

function isShared(pathname: string): boolean {
  if (SHARED_EXACT.has(pathname)) return true;
  if (SHARED_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))) return true;
  // A static file (icons, favicon, manifest, OG images): served from public/.
  return /\/[^/]+\.[a-z0-9]+$/i.test(pathname);
}

/** A section index on intl: the one exam's own page while there is one exam, else the intl home. */
function sectionIndex(pathname: string): string | null {
  const only = INTL_EXAMS.length === 1 ? INTL_EXAMS[0] : null;
  switch (pathname) {
    case "/notes":
      return only?.notesPath ?? "/";
    case "/mock":
      return only ? `/mock/exam/${only.slug}` : "/";
    case "/formula":
      return only ? `/formula/${only.slug}` : "/";
    case "/exams":
    case "/questions":
    case "/me":
      return "/";
    default:
      return null;
  }
}

/** A same-site relative path from a `next` parameter, or "/" for anything else. */
export function safeNextFrom(search: string): string {
  const next = new URLSearchParams(search).get("next");
  if (!next || !next.startsWith("/") || next.startsWith("//") || next.startsWith("/\\")) return "/";
  return next;
}

/** What the intl host does with a request for `pathname` (+ its `search`, "?..." or ""). */
export function intlHostDecision(pathname: string, search: string): HostDecision {
  if (pathname === "/") return { kind: "rewrite", path: "/intl" };
  if (pathname === "/sitemap.xml") return { kind: "rewrite", path: "/intl/sitemap.xml" };
  if (pathname === "/robots.txt") return { kind: "rewrite", path: "/intl/robots.txt" };
  if (intlExamOfPath(pathname) || isShared(pathname)) return NEXT;
  // PYQ Vault's onboarding asks for Indian exams and a mobile number. On intl a
  // handler records the international exams instead and sends the student on.
  if (pathname === "/welcome") return { kind: "rewrite", path: `/intl/welcome${search}` };
  const index = sectionIndex(pathname);
  if (index) return { kind: "redirect", url: `${index}${search}`, permanent: false };
  return { kind: "redirect", url: `${WWW_ORIGIN}${pathname}${search}`, permanent: true };
}

/** What any other host (www, localhost, a preview) does with a request. */
export function wwwHostDecision(host: string | null | undefined, pathname: string, search: string): HostDecision {
  const origin = intlOriginFor(host);
  if (!origin) return NEXT;
  if (pathname === "/intl" || pathname.startsWith("/intl/")) {
    return { kind: "redirect", url: `${origin}${pathname.slice("/intl".length) || "/"}${search}`, permanent: true };
  }
  if (intlExamOfPath(pathname)) {
    return { kind: "redirect", url: `${origin}${pathname}${search}`, permanent: true };
  }
  return NEXT;
}

/**
 * A page's canonical: absolute on the intl origin for an international page,
 * unchanged (relative, resolved by the root layout's www metadataBase) otherwise.
 */
export function canonicalFor(path: string): string {
  return intlExamOfPath(path) ? `${INTL_ORIGIN}${path}` : path;
}

/** Whether a sitemap URL (absolute or a path) is an international page. */
export function isIntlUrl(url: string): boolean {
  const pathname = url.startsWith("/") ? url : new URL(url).pathname;
  return intlExamOfPath(pathname) !== null;
}

/**
 * Whether a path is an intl page by its path alone: an international exam's
 * pages or the intl-only /intl tree. The header, footer and chatbot use it to
 * pick the intl look without reading the host on the server; a SHARED page
 * (/login, /pricing) is false here and asks the browser's host instead.
 */
export function isIntlPagePath(pathname: string): boolean {
  return intlExamOfPath(pathname) !== null || pathname === "/intl" || pathname.startsWith("/intl/");
}

export type IntlNavLink = { label: string; href: string; active: boolean };

/** The intl header's tabs: the current exam's notes, mocks and bank (the first intl exam on a shared page). */
export function intlNavFor(pathname: string): IntlNavLink[] {
  const slug = intlExamOfPath(pathname);
  const exam = INTL_EXAMS.find((e) => e.slug === slug) ?? INTL_EXAMS[0];
  if (!exam) return [];
  const notesHref = exam.notesPath ?? `/notes/${exam.slug}`;
  const section = (p: string) => pathname === p || pathname.startsWith(`${p}/`);
  return [
    {
      label: "Notes",
      href: notesHref,
      active: pathname === `/notes/${exam.slug}` || pathname.startsWith(`/notes/${exam.slug}-`) || section(`/formula/${exam.slug}`),
    },
    {
      label: "Mocks",
      href: `/mock/exam/${exam.slug}`,
      active: section(`/mock/exam/${exam.slug}`) || pathname.startsWith(`/mock/${exam.slug}-`) || section("/mock/attempt"),
    },
    {
      label: "Questions",
      href: "/browse",
      active: section("/browse") || section(`/questions/${exam.slug}`),
    },
  ];
}

/** Which site's pass a request on this host is offered (migration 0203): intl sells in USD. */
export function planSiteForHost(host: string | null | undefined): PlanSite {
  return isIntlHost(host) ? "intl" : "pyqvault";
}

/** Which site's pass a page at this path offers; for cached pages, which cannot read the host. */
export function planSiteForPath(pathname: string): PlanSite {
  return intlExamOfPath(pathname) ? "intl" : "pyqvault";
}

/**
 * A student whose chosen exams are all international (an intl.pyqvault.com
 * sign-up records them, app/intl/welcome). PYQ Vault's emails and pushes are
 * written for its Indian students and link to www, so they leave these out
 * (lib/email/service `readStudents`). No exam chosen is NOT intl-only.
 */
export function isIntlOnlyStudent(targetExams: readonly string[]): boolean {
  const intl = new Set<string>(INTL_EXAMS.map((e) => e.slug));
  return targetExams.length > 0 && targetExams.every((s) => intl.has(s));
}
