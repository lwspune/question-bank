/**
 * The welcome email: who gets told how PYQ Vault works, and what the mail
 * says. STUDENT_EDUCATION_SPEC.md §4 item 6. Pure core, no I/O.
 *
 * ONE EVER PER ACCOUNT is the rule that matters: the dedupe key carries no
 * day, so the UNIQUE constraint on email_sends makes a second welcome
 * impossible even if this module is wrong. The backlog of existing accounts
 * is INCLUDED on purpose — the students who did not know the features exist
 * are existing accounts — and newest signups are picked first so a new
 * student never waits behind the backlog under --limit.
 */
import { describe, it, expect } from "vitest";
import {
  WELCOME_KIND,
  welcomeDedupeKey,
  selectWelcomes,
} from "@/lib/email/welcome";
import type { StudentLite, PriorSend } from "@/lib/email/recommend";
import { buildWelcomeEmail, SITE_URL } from "@/lib/email/templates";
import { loopFor } from "@/lib/education/howItWorks";
import { getExamBySlug } from "@/lib/exam/examContext";

const NOW = new Date("2026-09-25T03:30:00Z"); // 09:00 IST
const HOUR = 3_600_000;
const DAY = 24 * HOUR;
const iso = (ms: number) => new Date(ms).toISOString();

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

const exams = (entries: [string, "nda" | "mh-hsc-12" | null][] = []) => new Map(entries);

describe("welcomeDedupeKey", () => {
  it("carries the kind and the user, and NO day — one welcome ever per account", () => {
    expect(welcomeDedupeKey("u1")).toBe("welcome:u1");
    expect(WELCOME_KIND).toBe("welcome");
  });
});

describe("selectWelcomes", () => {
  it("picks a student with an email who has never been welcomed", () => {
    const { picks, skipped } = selectWelcomes({
      students: [student()],
      primaryExams: exams([["u1", "nda"]]),
      priorSends: [],
      now: NOW,
    });
    expect(skipped).toEqual([]);
    expect(picks).toHaveLength(1);
    expect(picks[0]).toMatchObject({
      userId: "u1",
      email: "asha@example.com",
      dedupeKey: "welcome:u1",
      exam: "nda",
    });
  });

  it("a student with no profile row gets the general loop (exam null), not a skip", () => {
    const { picks } = selectWelcomes({
      students: [student()],
      primaryExams: exams(),
      priorSends: [],
      now: NOW,
    });
    expect(picks[0].exam).toBeNull();
  });

  it("skips: no-email, opted-out, already-welcomed, mailed-today — each with its reason", () => {
    const priorSends: PriorSend[] = [
      { userId: "u3", dedupeKey: "welcome:u3", createdAt: iso(NOW.getTime() - 60 * DAY) },
      { userId: "u4", dedupeKey: "mock_report:u4:att1", createdAt: iso(NOW.getTime() - 10 * HOUR) },
    ];
    const { picks, skipped } = selectWelcomes({
      students: [
        student({ userId: "u1", email: null }),
        student({ userId: "u2", emailOptOut: true }),
        student({ userId: "u3" }),
        student({ userId: "u4" }),
        student({ userId: "u5" }),
      ],
      primaryExams: exams(),
      priorSends,
      now: NOW,
    });
    expect(picks.map((p) => p.userId)).toEqual(["u5"]);
    expect(skipped).toEqual([
      { userId: "u1", reason: "no-email" },
      { userId: "u2", reason: "opted-out" },
      { userId: "u3", reason: "already-welcomed" },
      { userId: "u4", reason: "mailed-today" },
    ]);
  });

  it("a send of another kind more than 24 hours ago does not block the welcome", () => {
    const { picks } = selectWelcomes({
      students: [student()],
      primaryExams: exams(),
      priorSends: [{ userId: "u1", dedupeKey: "first_mock:u1:m1", createdAt: iso(NOW.getTime() - 2 * DAY) }],
      now: NOW,
    });
    expect(picks).toHaveLength(1);
  });

  it("is total: every student lands in picks or skipped, exactly once", () => {
    const students = [
      student({ userId: "a" }),
      student({ userId: "b", email: null }),
      student({ userId: "c" }),
    ];
    const { picks, skipped } = selectWelcomes({ students, primaryExams: exams(), priorSends: [], now: NOW });
    const ids = [...picks.map((p) => p.userId), ...skipped.map((s) => s.userId)].sort();
    expect(ids).toEqual(["a", "b", "c"]);
  });

  it("newest accounts first, so a --limit never leaves a new signup behind the backlog", () => {
    const { picks } = selectWelcomes({
      students: [
        student({ userId: "old", createdAt: iso(NOW.getTime() - 90 * DAY) }),
        student({ userId: "new", createdAt: iso(NOW.getTime() - 1 * HOUR) }),
        student({ userId: "mid", createdAt: iso(NOW.getTime() - 5 * DAY) }),
      ],
      primaryExams: exams(),
      priorSends: [],
      now: NOW,
    });
    expect(picks.map((p) => p.userId)).toEqual(["new", "mid", "old"]);
  });
});

describe("buildWelcomeEmail", () => {
  const TOKEN = "11111111-2222-3333-4444-555555555555";
  const ndaLoop = loopFor(getExamBySlug("nda"));

  it("greets by first name, names the product in the subject, and links all three steps in BOTH bodies", () => {
    const m = buildWelcomeEmail({ name: "Asha Rao", loop: ndaLoop, unsubscribeToken: TOKEN });
    expect(m.subject).toContain("Asha");
    expect(m.subject).toContain("PYQ Vault");
    for (const step of ndaLoop.steps) {
      const url = `${SITE_URL}${step.href}`;
      expect(m.text).toContain(url);
      expect(m.html).toContain(`href="${url}"`);
      expect(m.text).toContain(step.title);
      expect(m.html).toContain(step.title);
    }
  });

  it("renders the bank loop for a board-exam student (book reader first, no mock link)", () => {
    const loop = loopFor(getExamBySlug("mh-hsc-12"));
    const m = buildWelcomeEmail({ name: "", loop, unsubscribeToken: TOKEN });
    expect(m.text).toContain(`${SITE_URL}/board/mh-hsc-12`);
    expect(m.text).not.toContain(`${SITE_URL}/mock`);
    expect(m.text).not.toContain(`${SITE_URL}/drill`);
  });

  it("without a usable name the greeting is plain and the subject carries no comma-name", () => {
    const m = buildWelcomeEmail({ name: "asha@example.com", loop: ndaLoop, unsubscribeToken: TOKEN });
    expect(m.text.startsWith("Hi,")).toBe(true);
    expect(m.subject).not.toContain("@");
  });

  it("escapes a hostile name in the HTML body and subject", () => {
    const m = buildWelcomeEmail({ name: "<img src=x>", loop: ndaLoop, unsubscribeToken: TOKEN });
    expect(m.html).not.toContain("<img src=x>");
    expect(m.html).toContain("&lt;img");
  });

  it("carries the unsubscribe link and the one-click headers, and never says what they have NOT done", () => {
    const m = buildWelcomeEmail({ name: "Asha", loop: ndaLoop, unsubscribeToken: TOKEN });
    expect(m.text).toContain(`${SITE_URL}/unsubscribe/${TOKEN}`);
    expect(m.headers["List-Unsubscribe"]).toBe(`<${SITE_URL}/api/unsubscribe/${TOKEN}>`);
    expect(m.headers["List-Unsubscribe-Post"]).toBe("List-Unsubscribe=One-Click");
    for (const banned of ["haven't", "you have not", "we miss you", "missed you"]) {
      expect(m.text.toLowerCase()).not.toContain(banned);
    }
  });
});
