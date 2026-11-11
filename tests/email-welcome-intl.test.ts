/**
 * The welcome email for intl.pyqvault.com students (2026-11-11).
 *
 * Until now no email reached an intl student at all: readStudents leaves them
 * out because every PYQ Vault email links to www and is written for Indian
 * exams. Of 15 IMAT signups after the move to intl, 12 took a notes PDF and 1
 * sat a mock, and none could be brought back. This is their welcome: the same
 * one-ever rule (same kind, same dedupe key), its own words and its own host.
 *
 * Pure. The roster split is isIntlOnlyStudent (tests/intl-site.test.ts).
 */
import { describe, it, expect } from "vitest";
import { buildIntlWelcomeEmail, intlWelcomeLoop } from "@/lib/email/templates";
import { getExamBySlug } from "@/lib/exam/examContext";
import { INTL_ORIGIN, intlHostDecision } from "@/lib/sites/intl";

const imat = getExamBySlug("imat")!;
const TOKEN = "A".repeat(32);

function build(name = "Elif Yilmaz") {
  return buildIntlWelcomeEmail({ name, exam: imat, unsubscribeToken: "unsub123", clickToken: TOKEN });
}

const urlsIn = (s: string) => s.match(/https?:\/\/[^\s"'<>)]+/g) ?? [];

describe("intlWelcomeLoop", () => {
  it("for IMAT: a real ministry paper first, then Review, then the notes", () => {
    const loop = intlWelcomeLoop(imat);
    expect(loop.steps.map((s) => s.href)).toEqual(["/mock/imat-2025", "/review", "/notes/imat"]);
  });
});

describe("buildIntlWelcomeEmail", () => {
  it("names the intl brand and the exam in the subject, greeting by first name", () => {
    const e = build();
    expect(e.subject).toBe("How to use PYQ Vault Global for IMAT, Elif");
    expect(e.text.startsWith("Hi Elif,")).toBe(true);
  });

  it("every link in both bodies and the headers is on intl.pyqvault.com, never www", () => {
    const e = build();
    const all = [...urlsIn(e.text), ...urlsIn(e.html), ...urlsIn(e.headers["List-Unsubscribe"])];
    expect(all.length).toBeGreaterThan(4);
    for (const u of all) expect(u.startsWith(`${INTL_ORIGIN}/`), u).toBe(true);
    expect(`${e.text}${e.html}`).not.toMatch(/www\.pyqvault\.com/);
  });

  it("links all three steps through the click redirect, in BOTH bodies", () => {
    const e = build();
    for (const path of ["/mock/imat-2025", "/review", "/notes/imat"]) {
      const href = `${INTL_ORIGIN}/api/e/${TOKEN}?to=${encodeURIComponent(path)}`;
      expect(e.text, path).toContain(href);
      expect(e.html, path).toContain(href);
    }
  });

  it("carries the unsubscribe page and the one-click header on intl", () => {
    const e = build();
    expect(e.text).toContain(`${INTL_ORIGIN}/unsubscribe/unsub123`);
    expect(e.html).toContain(`${INTL_ORIGIN}/unsubscribe/unsub123`);
    expect(e.headers["List-Unsubscribe"]).toBe(`<${INTL_ORIGIN}/api/unsubscribe/unsub123>`);
    expect(e.headers["List-Unsubscribe-Post"]).toBe("List-Unsubscribe=One-Click");
  });

  it("sells nothing and names no Indian exam", () => {
    const body = `${build().text}\n${build().html}`;
    expect(body).not.toMatch(/\$|₹|\bpass\b|premium|price|upgrade/i);
    expect(body).not.toMatch(/\b(NDA|JEE|NEET|CBSE|MHT-CET|CDS)\b/);
  });

  it("uses no em or en dashes in visible text (owner rule, 2026-10-05)", () => {
    const e = build();
    expect(`${e.subject}${e.text}`).not.toMatch(/[–—]/);
  });

  it("without a usable name: a plain greeting and no comma-name in the subject", () => {
    const e = build("(no name)");
    expect(e.subject).toBe("How to use PYQ Vault Global for IMAT");
    expect(e.text.startsWith("Hi,")).toBe(true);
  });

  it("escapes a hostile name in the HTML body", () => {
    const e = build("<script>x</script>");
    expect(e.html).not.toContain("<script>");
  });
});

describe("intl host serves the unsubscribe page", () => {
  it("/unsubscribe/<token> stays on intl, so the link in an intl email lands there", () => {
    expect(intlHostDecision("/unsubscribe/abc123", "")).toEqual({ kind: "next" });
  });
});
