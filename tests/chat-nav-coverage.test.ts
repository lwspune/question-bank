/**
 * V is told about every page a student can reach (owner, 2026-11-24).
 *
 * On 24 Nov a student asked V how the Homework section works and V said
 * "There is no homework section on PYQ Vault": /homework had been a header
 * tab since 2026-11-04, but V's list of places (NAV_FACTS, hand-written) was
 * never told. Play, Visuals, Store, the score calculator and Classes were
 * missing the same way.
 *
 * So every top-level page under src/app must be in exactly one of three
 * places: a line in NAV_FACTS (V can name and link it), BUILT_ELSEWHERE (V
 * learns it from a generated part of its facts), or NOT_FOR_V with the reason
 * a student never needs V to send them there. A new page fails this test
 * until someone decides which, and the header tabs are pages, so a new tab
 * does too. What it cannot catch: a page that changes what it does under the
 * same address. That half is the convention in CLAUDE.md and V_SPEC.md.
 */
import { describe, it, expect } from "vitest";
import { existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { NAV_FACTS } from "@/lib/chat/facts";

const APP = join(process.cwd(), "src", "app");

/** V learns these addresses from a generated part of its facts, not NAV_FACTS. */
const BUILT_ELSEWHERE: Record<string, string> = {
  exams: "every exam's EXAMS line links /exams/<slug> (facts.ts buildExamFacts)",
};

/** Pages V never sends a student to, each with the reason. */
const NOT_FOR_V: Record<string, string> = {
  api: "route handlers, not pages",
  dashboard: "staff only",
  superadmin: "platform staff only",
  books: "staff book editor (the public ebooks are /store)",
  upload: "staff only",
  uploads: "staff only",
  welcome: "the first-run screen after sign-up; it opens itself",
  progress: "redirects to /performance, which V names",
  score: "short link for share cards; redirects to /score-calculator, which V names",
  intl: "intl.pyqvault.com's home page; www's V links intl exams by their /exams page",
  "browse-start": "served at /browse by a rewrite; V names /browse",
  "home-exam": "served at / by a rewrite",
  nda: "the NDA hub; NDA's EXAMS line links its chapters, mocks and notes",
  pay: "a parent's payment link, opened from a message",
  practice: "a practice test a friend sent, opened from the link",
  quiz: "a public quiz, opened from a shared link",
  unsubscribe: "an email's unsubscribe link",
};

/** Top-level folders under src/app that hold a page anywhere beneath them (route groups and _private skipped). */
function topLevelPages(): string[] {
  const hasPage = (dir: string): boolean =>
    existsSync(join(dir, "page.tsx")) ||
    readdirSync(dir).some((n) => !n.startsWith("_") && statSync(join(dir, n)).isDirectory() && hasPage(join(dir, n)));
  return readdirSync(APP)
    .filter((n) => !n.startsWith("_") && !n.startsWith("(") && statSync(join(APP, n)).isDirectory())
    .filter((n) => n === "api" || hasPage(join(APP, n)))
    .sort();
}

/** A NAV_FACTS line names "/seg" as an address of its own: "/seg:", "/seg/...", "/seg," or "/seg ". */
function namedInNav(seg: string): boolean {
  const re = new RegExp(`(^|[\\s(,])/${seg.replace(/[-]/g, "\\-")}(?=[:\\s,/)]|$)`);
  return NAV_FACTS.some((line) => re.test(line));
}

describe("V knows every page a student can reach", () => {
  const pages = topLevelPages();

  it("finds the app's pages (the walk itself works)", () => {
    expect(pages).toContain("browse");
    expect(pages).toContain("homework");
    expect(pages.length).toBeGreaterThan(30);
  });

  it("puts every top-level page in exactly one place: NAV_FACTS, BUILT_ELSEWHERE or NOT_FOR_V", () => {
    const problems: string[] = [];
    for (const seg of pages) {
      const places = [namedInNav(seg), seg in BUILT_ELSEWHERE, seg in NOT_FOR_V].filter(Boolean).length;
      if (places === 0) problems.push(`/${seg}: tell V about it in NAV_FACTS (lib/chat/facts.ts), or add it to NOT_FOR_V with the reason`);
      if (places > 1) problems.push(`/${seg}: listed in more than one place`);
    }
    expect(problems).toEqual([]);
  });

  it("lists no page that no longer exists", () => {
    const stale = [...Object.keys(BUILT_ELSEWHERE), ...Object.keys(NOT_FOR_V)].filter((seg) => !pages.includes(seg));
    expect(stale).toEqual([]);
  });

  it("names the pages that were missing on 2026-11-24", () => {
    for (const seg of ["homework", "learn", "play", "visuals", "store", "score-calculator", "classes"]) {
      expect(namedInNav(seg), seg).toBe(true);
    }
  });
});
