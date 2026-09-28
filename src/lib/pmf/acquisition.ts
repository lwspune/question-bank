/**
 * "Where students come from" — pure core for the /dashboard/pmf channel section
 * and the channel line on a student's own page (2026-09-28).
 *
 * First-touch channel has been stored on `student_profiles.acq_*` since
 * 2026-09-17 (migration 0106) but no page showed it; the only read was a SQL
 * query run by hand. The counting happens in `get_acquisition_snapshot`
 * (migration 0125); this module turns its rows into what the page shows.
 *
 * The rules are the page's rules:
 *  · "No referrer recorded" (after tracking began) and "before tracking" are
 *    two separate buckets, and neither is folded into "direct".
 *  · Rates are withheld below MIN_SEGMENT_N students; counts always show.
 *  · Downstream columns are counts of students who DID something (a learning
 *    signal, a finished mock, a payment) — not page views.
 * Spec: tests/pmf-acquisition.test.ts.
 */
import { MIN_SEGMENT_N } from "@/lib/pmf/snapshot";
import { SHARE_CAMPAIGN } from "@/lib/mocks/share";

/** First-touch capture began here (migration 0106). */
export const ACQUISITION_START = "2026-09-17";

export type Downstream = { students: number; signalled: number; mocked: number; paid: number };

/** One row of get_acquisition_snapshot's `channels`. */
export type AcqRow = Downstream & {
  source: string | null;
  medium: string | null;
  campaign: string | null;
  beforeTracking: boolean;
};

export type Channel = { key: string; label: string };

const AI_ASSISTANTS = ["perplexity", "gemini", "copilot", "claude", "deepseek"];

export function channelOf(r: Pick<AcqRow, "source" | "medium" | "campaign" | "beforeTracking">): Channel {
  if (r.beforeTracking) return { key: "before-tracking", label: "Before 17 Sep (never recorded)" };
  if (r.campaign === SHARE_CAMPAIGN) return { key: "shared-result", label: "Shared mock result" };
  const source = (r.source ?? "").toLowerCase();
  if (!source) return { key: "none", label: "No referrer recorded" };
  if (source.includes("chatgpt")) return { key: "chatgpt", label: "ChatGPT" };
  if (AI_ASSISTANTS.some((a) => source.includes(a))) return { key: "other-ai", label: "Other AI assistants" };
  if (source === "google") return { key: "google", label: "Google" };
  if (source === "bing") return { key: "bing", label: "Bing" };
  if (r.medium === "organic") return { key: "other-search", label: "Other search" };
  if (r.medium === "social") return { key: "social", label: "Social" };
  if (r.medium === "referral") return { key: "referral", label: "Other websites" };
  return { key: "tagged", label: "Tagged links" };
}

export type ChannelSummary = Channel &
  Downstream & { signalledRate: number | null; mockedRate: number | null; paidRate: number | null };

const rate = (n: number, d: number) => (d >= MIN_SEGMENT_N ? n / d : null);

function sum<T extends Downstream>(into: T, r: Downstream): T {
  into.students += r.students;
  into.signalled += r.signalled;
  into.mocked += r.mocked;
  into.paid += r.paid;
  return into;
}

/** Channels largest first; "before tracking" always last (it is a different question). */
export function summariseChannels(rows: AcqRow[]): ChannelSummary[] {
  const by = new Map<string, Channel & Downstream>();
  for (const r of rows) {
    const c = channelOf(r);
    by.set(c.key, sum(by.get(c.key) ?? { ...c, students: 0, signalled: 0, mocked: 0, paid: 0 }, r));
  }
  return [...by.values()]
    .map((c) => ({
      ...c,
      signalledRate: rate(c.signalled, c.students),
      mockedRate: rate(c.mocked, c.students),
      paidRate: rate(c.paid, c.students),
    }))
    .sort((a, b) =>
      a.key === "before-tracking" ? 1 : b.key === "before-tracking" ? -1 : b.students - a.students
    );
}

const SECTIONS_WITH_EXAM = new Set(["notes", "questions", "board", "guide", "mock", "quiz"]);

/** "/notes/mht-cet-maths/differentiation/x" → "/notes/mht-cet-maths". */
export function landingGroup(path: string | null): string {
  if (!path) return "(not recorded)";
  const seg = path.split("?")[0].split("/").filter(Boolean);
  if (seg.length === 0) return "/";
  if (SECTIONS_WITH_EXAM.has(seg[0]) && seg[1]) return `/${seg[0]}/${seg[1]}`;
  return `/${seg[0]}`;
}

export type LandingSummary = Downstream & { group: string };

export function summariseLandings(rows: (Downstream & { landing: string | null })[], top = 15): LandingSummary[] {
  const by = new Map<string, LandingSummary>();
  for (const r of rows) {
    const g = landingGroup(r.landing);
    by.set(g, sum(by.get(g) ?? { group: g, students: 0, signalled: 0, mocked: 0, paid: 0 }, r));
  }
  return [...by.values()].sort((a, b) => b.students - a.students).slice(0, top);
}

// ── The page's URL filters ──────────────────────────────────────────────────

/** 17 Sep 2026, midnight IST — the SQL function uses the same instant. */
const TRACKING_START_ISO = "2026-09-16T18:30:00.000Z";

export type AcqWindow = { key: "7" | "30" | "tracked"; since: string; label: string };

/** `?acqDays=` → a window. Default 30 days: long enough to have numbers. */
export function parseAcqWindow(raw: string | string[] | undefined, now: Date = new Date()): AcqWindow {
  const v = Array.isArray(raw) ? raw[0] : raw;
  if (v === "tracked") return { key: "tracked", since: TRACKING_START_ISO, label: "Since tracking began (17 Sep)" };
  const days = v === "7" ? 7 : 30;
  return {
    key: days === 7 ? "7" : "30",
    since: new Date(now.getTime() - days * 86_400_000).toISOString(),
    label: `Last ${days} days`,
  };
}

/** Exams the channel table can be narrowed to. MHT-CET is the current focus. */
export const ACQ_EXAMS = [{ slug: "mht-cet", label: "MHT-CET" }] as const;

/** `?acqExam=` → an exam slug on offer, or null for everyone. */
export function parseAcqExam(raw: string | string[] | undefined): string | null {
  const v = Array.isArray(raw) ? raw[0] : raw;
  return ACQ_EXAMS.find((e) => e.slug === v)?.slug ?? null;
}

/** The one-line channel on /dashboard/students/[id]. */
export function describeSource(p: {
  source: string | null;
  medium: string | null;
  campaign: string | null;
  landing: string | null;
  createdAt: string;
}): string {
  const beforeTracking = !p.source && p.createdAt.slice(0, 10) < ACQUISITION_START;
  const { label } = channelOf({ source: p.source, medium: p.medium, campaign: p.campaign, beforeTracking });
  return p.landing ? `${label} → ${p.landing}` : label;
}
