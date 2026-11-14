/**
 * The one line under a bank answer (owner, 2026-11-14): at most ONE teaching
 * moment per answer, chosen here in a fixed order, so offers never stack. The
 * practice route decides it and sends it back as `moment`; the card draws it
 * in one place (components/reveal/MomentLine). The repeat line ("Asked in N
 * papers") stays outside on purpose: it is a fact about the question, shown
 * at once, not an offer (owner's call).
 *
 * WHY ONE LINE. Measured over the 14 days to 2026-11-14: an answered card
 * could carry the repeat line, the Fix nudge and the stuck offer together (12
 * of the first 60 stuck offers came with the Fix nudge), and the owner had
 * already removed one line under V for being distracting. The Fix nudge was
 * retired with this change: a wrong answer already goes to Fix your mistakes.
 *
 * ORDER. Same mistake again, then the stuck offer. A question missed before
 * and missed again is the narrower, more certain signal; the stuck offer only
 * returns on the next new 3 of 4.
 *
 * SAME MISTAKE AGAIN. The student misses a bank question they missed before
 * (any surface, a mock included). The line names the earlier miss: the same
 * option, another option, or a mock (mocks record no option). About 170 a
 * month on the bank; 59% picked the same wrong option again. Self-marks
 * ("Review later") are not misses: nobody checked them.
 *
 * Pure. Spec: tests/teaching-moment.test.ts.
 */
import { parseStuckOffer, type StuckOffer } from "./stuckOffer";
import { istDayKey } from "@/lib/email/dueNudge";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const LABEL_RE = /^[A-E]$/;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAY_MS = 24 * 60 * 60 * 1000;

/** The student's last miss on a question, before this answer. */
export type PriorMiss = { at: string; chose: string | null; inMock: boolean };

export type SameMistake = { kind: "same_mistake"; questionId: string; chose: string; prior: PriorMiss };
export type StuckMoment = { kind: "stuck"; questionId: string; offer: StuckOffer };
export type TeachingMoment = SameMistake | StuckMoment;

type ActivityRow = { kind: string; metadata: Record<string, unknown> | null; created_at: string };

/** The newest real miss among a question's activity rows, or null. */
export function priorMissFrom(rows: readonly ActivityRow[]): PriorMiss | null {
  let newest: ActivityRow | null = null;
  for (const r of rows) {
    if (r.kind !== "answer_wrong") continue;
    if (r.metadata && "selfMark" in r.metadata) continue;
    if (!newest || Date.parse(r.created_at) > Date.parse(newest.created_at)) newest = r;
  }
  if (!newest) return null;
  const m = newest.metadata ?? {};
  const chose = typeof m.chose === "string" && LABEL_RE.test(m.chose) ? m.chose : null;
  return { at: newest.created_at, chose, inMock: typeof m.mockId === "string" };
}

export function sameMistakeFor(questionId: string, chose: string, prior: PriorMiss | null): SameMistake | null {
  return prior ? { kind: "same_mistake", questionId, chose, prior } : null;
}

/** The one moment for this answer, in the fixed order, or null. */
export function pickMoment(input: { sameMistake: SameMistake | null; stuck: StuckOffer | null }): TeachingMoment | null {
  if (input.sameMistake) return input.sameMistake;
  if (input.stuck) return { kind: "stuck", questionId: input.stuck.questionId, offer: input.stuck };
  return null;
}

/** "earlier today", "yesterday" or "12 Nov", by the day in India. */
function dayWord(atIso: string, now: Date): { bare: string; on: string } {
  const at = new Date(atIso);
  const today = istDayKey(now);
  const day = istDayKey(at);
  if (day === today) return { bare: "earlier today", on: "earlier today" };
  if (day === istDayKey(new Date(now.getTime() - DAY_MS))) return { bare: "yesterday", on: "yesterday" };
  const [, mm, dd] = day.split("-");
  const date = `${Number(dd)} ${MONTHS[Number(mm) - 1]}`;
  return { bare: date, on: `on ${date}` };
}

/** The words, split so the card can bold the lead. */
export function sameMistakeLine(m: SameMistake, opts: { now: Date; hasSolution: boolean }): { lead: string; rest: string } {
  const when = dayWord(m.prior.at, opts.now);
  const tail = opts.hasSolution ? " Take the solution step by step this time." : "";
  if (m.prior.inMock) return { lead: `You missed this one in a mock ${when.on} too`, rest: `.${tail}` };
  if (m.prior.chose === m.chose) return { lead: `You picked ${m.chose} here last time too`, rest: ` (${when.bare}).${tail}` };
  if (m.prior.chose) return { lead: `You missed this one ${when.on} too`, rest: `, with ${m.prior.chose} that time.${tail}` };
  return { lead: `You missed this one ${when.on} too`, rest: `.${tail}` };
}

function parsePrior(raw: unknown): PriorMiss | null {
  if (!raw || typeof raw !== "object") return null;
  const { at, chose, inMock } = raw as Record<string, unknown>;
  if (typeof at !== "string" || Number.isNaN(Date.parse(at))) return null;
  if (chose !== null && (typeof chose !== "string" || !LABEL_RE.test(chose))) return null;
  if (typeof inMock !== "boolean") return null;
  return { at, chose, inMock };
}

/** The moment from the practice route's reply, or null. */
export function parseMoment(raw: unknown): TeachingMoment | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  if (typeof r.questionId !== "string" || !UUID_RE.test(r.questionId)) return null;
  if (r.kind === "same_mistake") {
    if (typeof r.chose !== "string" || !LABEL_RE.test(r.chose)) return null;
    const prior = parsePrior(r.prior);
    return prior ? { kind: "same_mistake", questionId: r.questionId, chose: r.chose, prior } : null;
  }
  if (r.kind === "stuck") {
    const offer = parseStuckOffer(r.offer);
    return offer && offer.questionId === r.questionId ? { kind: "stuck", questionId: r.questionId, offer } : null;
  }
  return null;
}
