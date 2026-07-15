import { describe, it, expect } from "vitest";
import { buildEmail, escapeHtml, formatDuration, SITE_URL } from "@/lib/email/templates";
import type { Recipient } from "@/lib/email/recommend";

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

const TOKEN = "11111111-2222-3333-4444-555555555555";

function recipient(over: Partial<Recipient> = {}): Recipient {
  return {
    userId: "u1",
    email: "asha@example.com",
    name: "Asha",
    kind: "next_mock",
    mock: MOCK,
    dedupeKey: "next_mock:u1:mm25s",
    lastScore: null,
    ...over,
  };
}

const build = (over: Partial<Recipient> = {}) => buildEmail(recipient(over), TOKEN);

describe("escapeHtml", () => {
  it("neutralises HTML-significant characters", () => {
    expect(escapeHtml(`<script>alert("x")</script>`)).toBe(
      "&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;"
    );
  });
  it("escapes ampersands and single quotes", () => {
    expect(escapeHtml("Tom & Jerry's")).toBe("Tom &amp; Jerry&#39;s");
  });
  it("leaves ordinary text alone", () => {
    expect(escapeHtml("Asha K")).toBe("Asha K");
  });
});

describe("formatDuration", () => {
  it("renders whole hours", () => {
    expect(formatDuration(7200)).toBe("2 hours");
  });
  it("renders hours + minutes", () => {
    expect(formatDuration(9000)).toBe("2 hours 30 min");
  });
  it("renders bare minutes", () => {
    expect(formatDuration(1800)).toBe("30 min");
  });
});

describe("buildEmail — both templates", () => {
  it("always ships BOTH a text and an HTML body", () => {
    // The sibling app's v9 note: the plain-text alternative is the single
    // biggest deliverability win.
    for (const kind of ["next_mock", "first_mock"] as const) {
      const e = build({ kind });
      expect(e.text.length).toBeGreaterThan(0);
      expect(e.html.length).toBeGreaterThan(0);
      expect(e.subject.length).toBeGreaterThan(0);
    }
  });

  it("links to the mock by slug in both bodies", () => {
    const e = build();
    const url = `${SITE_URL}/mock/nda-2025-sep-maths`;
    expect(e.html).toContain(url);
    expect(e.text).toContain(url);
  });

  it("carries a working unsubscribe link in both bodies", () => {
    const e = build();
    const url = `${SITE_URL}/unsubscribe/${TOKEN}`;
    expect(e.html).toContain(url);
    expect(e.text).toContain(url);
  });

  it("exposes List-Unsubscribe headers for one-click (RFC 8058)", () => {
    const e = build();
    expect(e.headers["List-Unsubscribe"]).toContain(`${SITE_URL}/api/unsubscribe/${TOKEN}`);
    expect(e.headers["List-Unsubscribe-Post"]).toBe("List-Unsubscribe=One-Click");
  });

  it("escapes the student name into the HTML body", () => {
    // No whitespace: the greeting uses the first token only, so this proves the
    // escape rather than the truncation. `name` comes from OAuth metadata and is
    // user-controlled — unescaped it injects into whatever renders the mail.
    const e = build({ name: `<script>alert(1)</script>` });
    expect(e.html).not.toContain("<script>alert(1)</script>");
    expect(e.html).toContain("&lt;script&gt;alert(1)&lt;/script&gt;");
  });

  it("escapes the mock title into the HTML body", () => {
    const e = build({ mock: { ...MOCK, title: "NDA <b>2025</b>" } });
    expect(e.html).not.toContain("NDA <b>2025</b>");
    expect(e.html).toContain("NDA &lt;b&gt;2025&lt;/b&gt;");
  });

  it("states the paper shape so the ask is honest about the time cost", () => {
    const e = build();
    expect(e.text).toContain("120 questions");
    expect(e.text).toContain("2 hours 30 min");
  });
});

describe("buildEmail — next_mock", () => {
  it("leads the subject with the last score when there is one", () => {
    const e = build({ lastScore: { score: 150, maxScore: 300, mockTitle: "NDA 2026 (I) — Mathematics" } });
    expect(e.subject).toContain("150/300");
    expect(e.subject).toContain("Asha");
  });

  it("falls back to a score-free subject when nothing was graded", () => {
    const e = build({ lastScore: null });
    expect(e.subject).not.toContain("/");
    expect(e.subject).toContain("Asha");
  });

  it("names the previous paper in the body when a score exists", () => {
    const e = build({ lastScore: { score: 150, maxScore: 300, mockTitle: "NDA 2026 (I) — Mathematics" } });
    expect(e.text).toContain("NDA 2026 (I) — Mathematics");
  });

  it("names the recommended mock", () => {
    expect(build().text).toContain("NDA 2025 (II) — Mathematics");
  });
});

describe("buildEmail — first_mock", () => {
  it("does not claim a prior score", () => {
    const e = build({ kind: "first_mock", lastScore: null });
    expect(e.subject).not.toContain("/300");
    expect(e.text).not.toMatch(/last time/i);
  });

  it("addresses the student by name", () => {
    expect(build({ kind: "first_mock" }).subject).toContain("Asha");
  });

  it("frames it as a first attempt, not a re-engagement", () => {
    const e = build({ kind: "first_mock" });
    expect(e.text.toLowerCase()).toContain("first");
  });
});
