/**
 * /llms.txt (2026-09-29) — a plain-text index for language-model crawlers,
 * per the llmstxt.org convention. GENERATED from the exam registry and the
 * live catalogue rather than kept as a static file, so it cannot rot the way
 * the README's typed exam list did. Unconfirmed as a ranking signal; cheap
 * insurance. Spec for the pure builder.
 */
import { describe, it, expect } from "vitest";
import { buildLlmsTxt } from "../src/lib/seo/llmsTxt";

const exams = [
  { slug: "nda", displayName: "NDA", examName: "NDA", totalPublicQuestions: 14024, practiceOnly: false, noPublicContent: false },
  { slug: "jee-mains", displayName: "JEE Mains", examName: "JEE Mains", totalPublicQuestions: 10667, practiceOnly: false, noPublicContent: false },
  { slug: "cbse-10", displayName: "CBSE Class 10", examName: "CBSE Class 10", totalPublicQuestions: 1008, practiceOnly: true, noPublicContent: false },
  { slug: "isc-12", displayName: "ISC Class 12", examName: "ISC Class 12", totalPublicQuestions: 0, practiceOnly: false, noPublicContent: true },
  { slug: "neet", displayName: "NEET", examName: "NEET", totalPublicQuestions: 0, practiceOnly: false, noPublicContent: false },
];

const text = buildLlmsTxt({ exams, totalPublicQuestions: 25699 });
const lines = text.split("\n");

describe("buildLlmsTxt", () => {
  it("opens with the H1 and a one-paragraph description carrying the live total", () => {
    expect(lines[0]).toBe("# PYQ Vault");
    expect(text).toMatch(/^> .*25,699 questions/m);
  });

  it("lists every section hub as an absolute link with a one-line description", () => {
    for (const path of ["/questions", "/notes", "/guide", "/guide/reports", "/mock", "/board", "/about"]) {
      expect(text).toContain(`](https://www.pyqvault.com${path})`);
    }
  });

  it("lists one line per exam home, count included, NDA on its hand-built home", () => {
    expect(text).toContain("- [NDA](https://www.pyqvault.com/nda): 14,024 past-year questions");
    expect(text).toContain("- [JEE Mains](https://www.pyqvault.com/exams/jee-mains): 10,667 past-year questions");
    expect(text).toContain("- [CBSE Class 10](https://www.pyqvault.com/exams/cbse-10): 1,008 practice questions");
  });

  it("leaves out an exam with no public content or no questions yet", () => {
    expect(text).not.toContain("ISC");
    expect(text).not.toContain("/exams/neet");
  });

  it("ends with a newline and uses LF only", () => {
    expect(text.endsWith("\n")).toBe(true);
    expect(text).not.toContain("\r");
  });
});
