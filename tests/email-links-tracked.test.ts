/**
 * CONTRACT: when a builder is given a click token, EVERY content link in
 * BOTH bodies goes through /api/e/<token> — the unsubscribe pair is the one
 * exception, because a student leaving must never be asked to sign in first.
 *
 * Why a contract and not a per-template case: the welcome shipped with its
 * three coloured buttons untracked and only the grey footer line tracked, so
 * "0 clicks from 167 welcomes" measured the link nobody would tap (found
 * 2026-09-30). One template fixed by hand leaves the next one free to drift;
 * this test fails the day a builder adds a raw SITE_URL link.
 */
import { describe, it, expect } from "vitest";
import {
  buildEmail,
  buildDueNudgeEmail,
  buildMockReportEmail,
  buildWelcomeEmail,
  SITE_URL,
  type BuiltEmail,
} from "@/lib/email/templates";
import { loopFor } from "@/lib/education/howItWorks";
import { getExamBySlug } from "@/lib/exam/examContext";
import type { MockReport } from "@/lib/email/mockReport";
import type { Recipient } from "@/lib/email/recommend";

const UNSUB = "11111111-2222-3333-4444-555555555555";
const CLICK = "AbCdEfGhIjKlMnOpQrStUvWxYz012345";

const MOCK = {
  id: "mm25s",
  slug: "nda-2025-sep-maths",
  title: "NDA 2025 (II) — Mathematics",
  examId: "exam-nda",
  paperCode: "maths",
  pyqYear: 2025,
  pyqMonth: "Sep",
  totalQuestions: 120,
  durationSecs: 9000,
};

const RECIPIENT: Recipient = {
  userId: "u1",
  email: "asha@example.com",
  name: "Asha",
  kind: "next_mock",
  mock: MOCK,
  dedupeKey: "next_mock:u1:mm25s",
  lastScore: null,
};

const REPORT: MockReport = {
  attemptId: "att-1",
  mockSlug: "nda-2025-sep-maths",
  mockTitle: "NDA 2025 (II) — Mathematics",
  examName: "NDA",
  score: 84,
  maxScore: 300,
  pct: 28,
  correct: 40,
  wrong: 30,
  seenBlank: 5,
  easyWrong: [{ questionId: "q1", position: 1, chapter: "Algebra", subtopic: "Quadratics", secs: 40, peerPct: 70 }],
  easyLeft: [],
  pacing: null,
  subtopics: [{ subject: "Mathematics", chapter: "Algebra", subtopic: "Quadratics", gap: 6, accuracy: 30, judged: 8 }],
  hasFindings: true,
};

/** Every absolute same-site URL in a body, in order. */
function siteLinks(body: string): string[] {
  const escaped = SITE_URL.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(escaped + "[^\\s\"'<>]*", "g");
  return [...body.matchAll(re)].map((m) => m[0]);
}

const isUnsubscribe = (url: string) => url.includes("/unsubscribe/");
const isTracked = (url: string) => url.startsWith(`${SITE_URL}/api/e/${CLICK}?to=`);

function assertAllContentLinksTracked(name: string, email: BuiltEmail) {
  for (const body of [email.html, email.text] as const) {
    const links = siteLinks(body);
    const content = links.filter((u) => !isUnsubscribe(u));
    expect(content.length, `${name}: no content links found`).toBeGreaterThan(0);
    const raw = content.filter((u) => !isTracked(u));
    expect(raw, `${name}: untracked content links`).toEqual([]);
    expect(links.some(isUnsubscribe), `${name}: unsubscribe link missing`).toBe(true);
  }
}

describe("every content link goes through the click tracker", () => {
  it("next_mock / first_mock", () => {
    assertAllContentLinksTracked("next_mock", buildEmail(RECIPIENT, UNSUB, CLICK));
    assertAllContentLinksTracked("first_mock", buildEmail({ ...RECIPIENT, kind: "first_mock" }, UNSUB, CLICK));
  });

  it("mock report", () => {
    assertAllContentLinksTracked(
      "mock_report",
      buildMockReportEmail({ report: REPORT, name: "Asha", unsubscribeToken: UNSUB, clickToken: CLICK })
    );
  });

  it("due nudge", () => {
    assertAllContentLinksTracked(
      "due_nudge",
      buildDueNudgeEmail({
        name: "Asha",
        summary: { total: 3, chapters: [{ chapter: "Trigonometry", count: 2 }, { chapter: "Vectors", count: 1 }] },
        unsubscribeToken: UNSUB,
        clickToken: CLICK,
      })
    );
  });

  it("welcome — both loops, every step button", () => {
    for (const slug of ["nda", "mh-hsc-12"] as const) {
      assertAllContentLinksTracked(
        `welcome:${slug}`,
        buildWelcomeEmail({ name: "Asha", loop: loopFor(getExamBySlug(slug)), unsubscribeToken: UNSUB, clickToken: CLICK })
      );
    }
  });

  it("without a token (a sample) links stay direct, so a reviewer's copy never mints a click", () => {
    const e = buildWelcomeEmail({ name: "Asha", loop: loopFor(getExamBySlug("nda")), unsubscribeToken: UNSUB });
    expect(siteLinks(e.html).some((u) => u.includes("/api/e/"))).toBe(false);
  });
});
