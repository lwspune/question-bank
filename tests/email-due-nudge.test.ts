/**
 * The due-queue nudge: who gets told that mistakes are waiting, and what the
 * email says. ENGAGEMENT_SPEC.md C2. Pure core, no I/O.
 *
 * The anti-nag rules are the point: one a day at most, then a gap of
 * NUDGE_MIN_GAP_DAYS, never to someone who drilled in the last day (they know),
 * never to staff, opt-outs or accounts with no address, and never when there
 * is nothing due — an empty nudge is the "we miss you" the sibling app found
 * reads as a guilt trip.
 */
import { describe, it, expect } from "vitest";
import {
  NUDGE_KIND,
  NUDGE_MIN_GAP_DAYS,
  NUDGE_QUIET_HOURS,
  NUDGE_MAX_UNANSWERED,
  dueNudgeDedupeKey,
  summarizeDue,
  selectDueNudges,
  type NudgeCandidate,
} from "@/lib/email/dueNudge";
import type { StudentLite, PriorSend } from "@/lib/email/recommend";
import type { DueQuestion } from "@/lib/drill/select";
import { buildDueNudgeEmail } from "@/lib/email/templates";

const NOW = new Date("2026-09-25T07:00:00Z"); // 12:30 IST
const DAY = 86_400_000;
const HOUR = 3_600_000;
const iso = (ms: number) => new Date(ms).toISOString();

const due = (questionId: string, chapter: string, subtopic = "x"): DueQuestion => ({
  questionId,
  chapter,
  subtopic,
  lastWrongAt: iso(NOW.getTime() - 5 * DAY),
});

function student(over: Partial<StudentLite> = {}): StudentLite {
  return {
    userId: "u1",
    email: "asha@example.com",
    name: "Asha Rao",
    createdAt: iso(NOW.getTime() - 30 * DAY),
    emailOptOut: false,
    ...over,
  };
}

function candidate(over: Partial<NudgeCandidate> = {}): NudgeCandidate {
  return {
    userId: "u1",
    due: [due("q1", "Trigonometry"), due("q2", "Trigonometry"), due("q3", "Vectors")],
    lastDrillAt: null,
    ...over,
  };
}

const students = (...s: StudentLite[]) => new Map(s.map((x) => [x.userId, x]));

describe("dueNudgeDedupeKey", () => {
  it("is one per student per IST calendar day", () => {
    expect(dueNudgeDedupeKey("u1", NOW)).toBe("due_nudge:u1:2026-09-25");
    // 23:30 IST on the 24th is 18:00 UTC on the 24th — still the 24th in IST.
    expect(dueNudgeDedupeKey("u1", new Date("2026-09-24T18:00:00Z"))).toBe("due_nudge:u1:2026-09-24");
    // 00:30 IST on the 25th is 19:00 UTC on the 24th — the 25th in IST.
    expect(dueNudgeDedupeKey("u1", new Date("2026-09-24T19:00:00Z"))).toBe("due_nudge:u1:2026-09-25");
  });
});

describe("summarizeDue", () => {
  it("counts the total and the top chapters, biggest first, ties by name", () => {
    const s = summarizeDue([
      due("a", "Vectors"),
      due("b", "Trigonometry"),
      due("c", "Trigonometry"),
      due("d", "Algebra"),
    ]);
    expect(s.total).toBe(4);
    expect(s.chapters.slice(0, 2)).toEqual([
      { chapter: "Trigonometry", count: 2 },
      { chapter: "Algebra", count: 1 },
    ]);
  });

  it("files a question with no chapter name under a readable label", () => {
    const s = summarizeDue([due("a", "")]);
    expect(s.chapters[0].chapter).not.toBe("");
  });
});

describe("selectDueNudges", () => {
  const base = { students: students(student()), priorSends: [] as PriorSend[], now: NOW };

  it("picks a student with something due and no recent drill", () => {
    const r = selectDueNudges({ ...base, candidates: [candidate()] });
    expect(r.picks).toHaveLength(1);
    expect(r.picks[0].userId).toBe("u1");
    expect(r.picks[0].dedupeKey).toBe("due_nudge:u1:2026-09-25");
    expect(r.picks[0].summary.total).toBe(3);
  });

  it("skips when nothing is due", () => {
    const r = selectDueNudges({ ...base, candidates: [candidate({ due: [] })] });
    expect(r.picks).toHaveLength(0);
    expect(r.skipped[0].reason).toBe("nothing-due");
  });

  it("skips a student who drilled inside the quiet window — they already know", () => {
    const recent = candidate({ lastDrillAt: iso(NOW.getTime() - (NUDGE_QUIET_HOURS - 1) * HOUR) });
    const r = selectDueNudges({ ...base, candidates: [recent] });
    expect(r.picks).toHaveLength(0);
    expect(r.skipped[0].reason).toBe("drilled-recently");
  });

  it("does not skip a drill that is older than the quiet window", () => {
    const old = candidate({ lastDrillAt: iso(NOW.getTime() - (NUDGE_QUIET_HOURS + 1) * HOUR) });
    expect(selectDueNudges({ ...base, candidates: [old] }).picks).toHaveLength(1);
  });

  it("skips staff (not in the student map), opt-outs and no-address accounts", () => {
    const r = selectDueNudges({
      ...base,
      students: students(
        student({ userId: "opt", emailOptOut: true }),
        student({ userId: "noaddr", email: null })
      ),
      candidates: [candidate({ userId: "staff" }), candidate({ userId: "opt" }), candidate({ userId: "noaddr" })],
    });
    expect(r.picks).toHaveLength(0);
    expect(r.skipped.map((s) => s.reason).sort()).toEqual(["no-email", "not-a-student", "opted-out"]);
  });

  it("skips a student nudged inside the minimum gap, and allows one past it", () => {
    const prior = (daysAgo: number): PriorSend => ({
      userId: "u1",
      dedupeKey: dueNudgeDedupeKey("u1", new Date(NOW.getTime() - daysAgo * DAY)),
      createdAt: iso(NOW.getTime() - daysAgo * DAY),
    });
    const tooSoon = selectDueNudges({ ...base, candidates: [candidate()], priorSends: [prior(NUDGE_MIN_GAP_DAYS - 1)] });
    expect(tooSoon.picks).toHaveLength(0);
    expect(tooSoon.skipped[0].reason).toBe("nudged-recently");

    const ok = selectDueNudges({ ...base, candidates: [candidate()], priorSends: [prior(NUDGE_MIN_GAP_DAYS)] });
    expect(ok.picks).toHaveLength(1);
  });

  it("ignores prior sends of OTHER kinds when computing the gap", () => {
    const report: PriorSend = { userId: "u1", dedupeKey: "mock_report:abc", createdAt: iso(NOW.getTime() - HOUR) };
    expect(selectDueNudges({ ...base, candidates: [candidate()], priorSends: [report] }).picks).toHaveLength(1);
  });

  it("skips when today's key was already used (a re-run the same day)", () => {
    const today: PriorSend = { userId: "u1", dedupeKey: dueNudgeDedupeKey("u1", NOW), createdAt: iso(NOW.getTime() - HOUR) };
    const r = selectDueNudges({ ...base, candidates: [candidate()], priorSends: [today] });
    expect(r.picks).toHaveLength(0);
  });

  it("backs off after NUDGE_MAX_UNANSWERED nudges with no drill since — until they drill again", () => {
    const prior = (daysAgo: number): PriorSend => ({
      userId: "u1",
      dedupeKey: dueNudgeDedupeKey("u1", new Date(NOW.getTime() - daysAgo * DAY)),
      createdAt: iso(NOW.getTime() - daysAgo * DAY),
    });
    // Three nudges, all after their last drill (none) → stop.
    const unanswered = [prior(12), prior(8), prior(4)];
    expect(unanswered).toHaveLength(NUDGE_MAX_UNANSWERED);
    const stopped = selectDueNudges({ ...base, candidates: [candidate()], priorSends: unanswered });
    expect(stopped.picks).toHaveLength(0);
    expect(stopped.skipped[0].reason).toBe("backed-off");

    // The same three nudges, but they drilled after two of them → only one
    // is unanswered, so the nudge resumes.
    const drilled = candidate({ lastDrillAt: iso(NOW.getTime() - 6 * DAY) });
    expect(selectDueNudges({ ...base, candidates: [drilled], priorSends: unanswered }).picks).toHaveLength(1);
  });

  it("is total: every candidate lands in picks or skipped", () => {
    const r = selectDueNudges({
      ...base,
      students: students(student(), student({ userId: "u2" })),
      candidates: [candidate(), candidate({ userId: "u2", due: [] }), candidate({ userId: "ghost" })],
    });
    expect(r.picks.length + r.skipped.length).toBe(3);
  });
});

describe("buildDueNudgeEmail", () => {
  const TOKEN = "11111111-2222-3333-4444-555555555555";
  const input = {
    name: "Asha Rao",
    summary: summarizeDue([due("a", "Trigonometry"), due("b", "Trigonometry"), due("c", "Vectors")]),
    unsubscribeToken: TOKEN,
  };

  it("leads the subject with the content, not the absence", () => {
    const e = buildDueNudgeEmail(input);
    expect(e.subject).toMatch(/2 Trigonometry questions/);
    expect(e.subject).not.toMatch(/miss you|come back|haven.t/i);
  });

  it("says 'question' in the singular for one", () => {
    const e = buildDueNudgeEmail({ ...input, summary: summarizeDue([due("a", "Vectors")]) });
    expect(e.subject).toMatch(/1 Vectors question\b/);
  });

  it("names the total when it exceeds the top chapter", () => {
    const e = buildDueNudgeEmail(input);
    expect(e.text).toContain("3");
    expect(e.text).toContain("Vectors");
  });

  it("links the drill and the unsubscribe page in both bodies", () => {
    const e = buildDueNudgeEmail(input);
    for (const body of [e.text, e.html]) {
      expect(body).toContain("https://www.pyqvault.com/drill");
      expect(body).toContain(`/unsubscribe/${TOKEN}`);
    }
    expect(e.headers["List-Unsubscribe"]).toContain(TOKEN);
  });

  it("escapes the name in HTML and greets by first name in text", () => {
    const e = buildDueNudgeEmail({ ...input, name: "<b>Asha</b> Rao" });
    expect(e.html).not.toContain("<b>Asha</b>");
    expect(e.html).toContain("&lt;b&gt;Asha&lt;/b&gt;");
    expect(e.text).toMatch(/^Hi <b>Asha<\/b>,/);
  });

  it("never uses guilt-trip phrasing", () => {
    const e = buildDueNudgeEmail(input);
    expect(`${e.subject} ${e.text}`).not.toMatch(/miss you|behind|only|lazy|forgot/i);
  });

  it("records its kind for the sends table", () => {
    expect(NUDGE_KIND).toBe("due_nudge");
  });
});
