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
import { SITE_URL } from "@/lib/brand";
import { EXAM_REGISTRY, type ExamEntry, type ExamSlug } from "@/lib/exam/examContext";
import { examFromPath } from "@/lib/exam/examFromPath";
import type { PlanSite } from "@/lib/billing/plans";
import { MOST_ASKED } from "@/lib/homework/links";

export const INTL_ORIGIN = "https://intl.pyqvault.com";
export const WWW_ORIGIN = SITE_URL;

/** Host names the intl site used to live on; each 301s to INTL_ORIGIN. */
export const FORMER_INTL_HOSTS: readonly string[] = [];

const INTL_HOSTNAME = new URL(INTL_ORIGIN).hostname;
/** Local development: browsers resolve any *.localhost name to this machine. */
const LOCAL_INTL_HOSTNAME = "intl.localhost";
const WWW_HOSTNAMES = new Set(["www.pyqvault.com", "pyqvault.com"]);
const LOCAL_HOSTNAMES = new Set(["localhost", "127.0.0.1"]);

/** The international exams, in registry order. */
export const INTL_EXAMS: readonly ExamEntry[] = EXAM_REGISTRY.filter((e) => e.site === "intl");

/**
 * The intl exams students may SEE: those with public content. Routing uses
 * INTL_EXAMS (an exam on its way in already belongs to intl); every list a
 * student reads, and the bare section links, use this (2026-11-15, ENEM was
 * registered and deployed before its rows went in). tests/intl-live-exams.
 */
export const LIVE_INTL_EXAMS: readonly ExamEntry[] = INTL_EXAMS.filter((e) => !e.noPublicContent);

/** A live intl exam's slug, or null for anything else. */
function liveIntlSlug(slug: string | null | undefined): ExamSlug | null {
  return LIVE_INTL_EXAMS.find((e) => e.slug === slug)?.slug ?? null;
}

/**
 * The ONE intl exam to record on a new student's profile at the intl welcome
 * step (owner, 2026-11-18): the live exam named by the page they are headed
 * to, else by the page they first landed on (the qb_acq cookie), else the only
 * live exam when there is one. Otherwise null, and the student picks on
 * /welcome/exam. Saving every live exam when the page named none counted an
 * IMAT student as an ENEM student (18 Nov: signed in from a page naming no
 * exam, after landing on /notes/imat-chemistry).
 */
export function intlWelcomeExam(input: { next: string; landing: string | null | undefined }): ExamSlug | null {
  for (const path of [input.next, input.landing]) {
    const slug = liveIntlSlug(examFromPath(path));
    if (slug) return slug;
  }
  return LIVE_INTL_EXAMS.length === 1 ? LIVE_INTL_EXAMS[0].slug : null;
}

/** The exam a student tapped on /welcome/exam, if it is a live intl exam. */
export function intlPickedExam(raw: unknown): ExamSlug | null {
  return typeof raw === "string" ? liveIntlSlug(raw) : null;
}

/** The intl exam picker, sending the student on to `next` once they choose. */
export function intlExamPickerPath(next: string): string {
  return `/welcome/exam?next=${encodeURIComponent(next)}`;
}

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
 * `<slug>-<sitting>`), the per-chapter question landings, and its homework
 * page and plans (plan slugs are `<slug>-<subject>`, 2026-11-17).
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
      within(`/questions/${s}`) ||
      within(`/homework/exam/${s}`) ||
      pathname.startsWith(`/homework/${s}-`)
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
  "/opengraph-image",
  // A student's progress (2026-11-06). Site-aware rather than identical: on
  // intl the map and the drill hold the international exams alone
  // (lib/sites/siteScope). /go/practice only redirects to /browse.
  "/me/map",
  "/drill",
  "/go/practice",
  // The Review tab (2026-11-08), where /saved now lands: its To fix list holds
  // the international exams alone here, like the drill.
  "/review",
]);
// /unsubscribe/<token>: an intl email's unsubscribe link must land on intl (2026-11-11).
const SHARED_PREFIXES = ["/account", "/mock/attempt", "/api", "/_next", "/intl", "/unsubscribe"];

function isShared(pathname: string): boolean {
  if (SHARED_EXACT.has(pathname)) return true;
  if (SHARED_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))) return true;
  // A static file (icons, favicon, manifest, OG images): served from public/.
  return /\/[^/]+\.[a-z0-9]+$/i.test(pathname);
}

/**
 * A student's whole-progress page on `site`: www's /performance, which intl
 * does not serve (a link there sent an intl student to www, signed out:
 * each site keeps its own login cookie), so intl's is the map (2026-11-15).
 */
export function progressPathFor(site: PlanSite): string {
  return site === "intl" ? "/me/map" : "/performance";
}

/**
 * A section index on intl: the one exam's own page while one exam has that
 * section, else the intl home. Notes and formula sheets count only the live
 * exams WITH notes (ENEM has none, so they stay on IMAT's); mocks count every
 * live exam.
 */
function sectionIndex(pathname: string): string | null {
  const one = (list: readonly ExamEntry[]) => (list.length === 1 ? list[0] : null);
  const only = one(LIVE_INTL_EXAMS);
  const onlyWithNotes = one(LIVE_INTL_EXAMS.filter((e) => e.notesPath));
  const onlyWithHomework = one(LIVE_INTL_EXAMS.filter((e) => e.homework));
  switch (pathname) {
    case "/notes":
      return onlyWithNotes?.notesPath ?? "/";
    case "/mock":
      return only ? `/mock/exam/${only.slug}` : "/";
    case "/formula":
      return onlyWithNotes ? `/formula/${onlyWithNotes.slug}` : "/";
    // The homework pages' "Daily Homework" crumb links /homework (2026-11-17).
    case "/homework":
      return onlyWithHomework ? `/homework/exam/${onlyWithHomework.slug}` : "/";
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
  // When the handler cannot tell the student's exam, they pick it here (2026-11-18).
  if (pathname === "/welcome/exam") return { kind: "rewrite", path: `/intl/welcome/exam${search}` };
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

/**
 * The canonical of a SHARED page (served on www and intl, e.g. /browse) for the
 * host the request came to: absolute on the intl origin there, relative
 * elsewhere. A relative canonical alone resolves against the www metadataBase,
 * which pointed intl's /browse at www's (2026-11-10).
 */
export function canonicalOnHost(path: string, host: string | null | undefined): string {
  return isIntlHost(host) ? `${INTL_ORIGIN}${path}` : path;
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

/** The intl header's tabs: the current exam's notes, mocks, homework and bank (the first intl exam on a shared page). */
export function intlNavFor(pathname: string, opts: { signedIn?: boolean } = {}): IntlNavLink[] {
  const slug = intlExamOfPath(pathname);
  const exam = INTL_EXAMS.find((e) => e.slug === slug) ?? INTL_EXAMS[0];
  if (!exam) return [];
  const section = (p: string) => pathname === p || pathname.startsWith(`${p}/`);
  // An exam without notes (ENEM, 2026-11-15) gets no Notes tab, not a dead link.
  const notes = exam.notesPath
    ? [
        {
          label: "Notes",
          href: exam.notesPath,
          active: pathname === `/notes/${exam.slug}` || pathname.startsWith(`/notes/${exam.slug}-`) || section(`/formula/${exam.slug}`),
        },
      ]
    : [];
  return [
    ...notes,
    {
      label: "Mocks",
      href: `/mock/exam/${exam.slug}`,
      active: section(`/mock/exam/${exam.slug}`) || pathname.startsWith(`/mock/${exam.slug}-`) || section("/mock/attempt"),
    },
    // Daily homework (2026-11-17): only an exam with plans gets the tab.
    ...(exam.homework
      ? [
          {
            label: MOST_ASKED,
            href: `/homework/exam/${exam.slug}`,
            active: section(`/homework/exam/${exam.slug}`) || pathname.startsWith(`/homework/${exam.slug}-`),
          },
        ]
      : []),
    {
      label: "Questions",
      href: "/browse",
      active: section("/browse") || section(`/questions/${exam.slug}`),
    },
    // A signed-in student's map and drill (2026-11-06); a visitor has neither.
    ...(opts.signedIn
      ? [{ label: "Progress", href: "/me/map", active: section("/me/map") || section("/drill") }]
      : []),
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
