import { describe, expect, it } from "vitest";
import {
  checkHref,
  headingId,
  parseArticleBody,
  readingMinutes,
  splitLinks,
  validateArticle,
  type ArticleInput,
} from "@/lib/blog/articleBody";

describe("checkHref", () => {
  it("accepts an internal path", () => {
    expect(checkHref("/mock/clat")).toEqual({ ok: true, external: false, official: false });
    expect(checkHref("/questions/nda/maths/trigonometry?x=1#top").ok).toBe(true);
  });

  it("accepts https and marks official hosts", () => {
    expect(checkHref("https://upsc.gov.in/examinations")).toEqual({ ok: true, external: true, official: true });
    expect(checkHref("https://jeemain.nta.nic.in/")).toMatchObject({ official: true });
    expect(checkHref("https://consortiumofnlus.ac.in/clat-2027/")).toMatchObject({ official: true });
    expect(checkHref("https://cetcell.mahacet.org/")).toMatchObject({ official: true });
    // UGC's own NET site, where NTA's bulletin sends candidates for the syllabus.
    expect(checkHref("https://www.ugcnetonline.in/syllabus-new.php")).toMatchObject({ official: true });
    expect(checkHref("https://www.cisce.org/")).toMatchObject({ official: true });
    // The Indian Air Force's AFCAT site, run for it by EdCIL: only that host, not all of EdCIL.
    expect(checkHref("https://afcat.edcil.co.in/assets/images/news/x.pdf")).toMatchObject({ official: true });
    expect(checkHref("https://other.edcil.co.in/")).toMatchObject({ official: false });
    // The IISERs' joint admissions portal, where the IAT brochure lives.
    expect(checkHref("https://www.iiseradmission.in/assets/pdfs/IB_IAT_2026_ENG.pdf")).toMatchObject({ official: true });
    // The Services Preparatory Institute's own site (Government of Maharashtra),
    // which its notification names as the only place for instructions and results.
    expect(checkHref("https://spicsn.com/wp-content/uploads/2026/10/Advt-2027-SPI.pdf")).toMatchObject({ official: true });
    expect(checkHref("https://girlspinashik.spicsn.com/")).toMatchObject({ official: true });
    expect(checkHref("https://notspicsn.com/")).toMatchObject({ official: false });
    // The Greater Bombay Science Teachers' Association, which runs the Homi Bhabha
    // Balvaidnyanik Competition and publishes its rules, schedule and papers only here.
    expect(checkHref("https://msta.in/homi-bhabha-exams/")).toMatchObject({ official: true });
    expect(checkHref("https://registration.msta.in/")).toMatchObject({ official: true });
    expect(checkHref("https://notmsta.in/")).toMatchObject({ official: false });
    expect(checkHref("https://indianexpress.com/x")).toEqual({ ok: true, external: true, official: false });
  });

  it("does not let a look-alike host pass as official", () => {
    expect(checkHref("https://upsc.gov.in.evil.com/")).toMatchObject({ ok: true, official: false });
    expect(checkHref("https://fakegov.in/")).toMatchObject({ ok: true, official: false });
  });

  it("refuses anything that is not a plain path or https", () => {
    for (const bad of [
      "javascript:alert(1)",
      "http://upsc.gov.in",
      "//evil.com/x",
      "mock/clat",
      "/has space",
      "https://user:pw@upsc.gov.in/",
      "data:text/html,hi",
      "/\\evil.com",
      "",
    ]) {
      expect(checkHref(bad).ok, bad).toBe(false);
    }
  });
});

describe("splitLinks", () => {
  it("splits markdown links out of text", () => {
    expect(splitLinks("See [the notice](https://upsc.gov.in/a) and [mocks](/mock).")).toEqual([
      { kind: "text", text: "See " },
      { kind: "link", text: "the notice", href: "https://upsc.gov.in/a", external: true, official: true },
      { kind: "text", text: " and " },
      { kind: "link", text: "mocks", href: "/mock", external: false, official: false },
      { kind: "text", text: "." },
    ]);
  });

  it("leaves a bad link as its plain words", () => {
    expect(splitLinks("Click [here](javascript:alert(1)) now")).toEqual([
      { kind: "text", text: "Click here now" },
    ]);
  });

  it("never reads a link inside maths", () => {
    expect(splitLinks("On \\([0,1](x)\\) it holds")).toEqual([{ kind: "text", text: "On \\([0,1](x)\\) it holds" }]);
  });

  it("returns one text run when there is no link", () => {
    expect(splitLinks("plain **bold**")).toEqual([{ kind: "text", text: "plain **bold**" }]);
  });
});

describe("headingId", () => {
  it("makes a stable anchor", () => {
    expect(headingId("Marks and negative marking")).toBe("marks-and-negative-marking");
    expect(headingId("CLAT 2027: what changed?")).toBe("clat-2027-what-changed");
  });
});

describe("parseArticleBody", () => {
  it("reads headings, paragraphs, lists, notes and tables", () => {
    const body = [
      "Intro line one",
      "continues here.",
      "",
      "## The pattern",
      "",
      "- 120 questions",
      "- 2 hours",
      "",
      "1. Read the passage",
      "2. Answer",
      "",
      "### Marks",
      "> Reported, not yet notified.",
      "",
      "| Section | Questions |",
      "|---|---|",
      "| English | 24 |",
      "| Maths \\(|x|\\) | 12 |",
    ].join("\r\n");

    const blocks = parseArticleBody(body);
    expect(blocks.map((b) => b.kind)).toEqual(["p", "h2", "ul", "ol", "h3", "note", "table"]);
    expect(blocks[0]).toEqual({ kind: "p", inlines: [{ kind: "text", text: "Intro line one continues here." }] });
    expect(blocks[1]).toEqual({ kind: "h2", text: "The pattern", id: "the-pattern" });
    expect(blocks[2]).toMatchObject({ kind: "ul", items: [[{ kind: "text", text: "120 questions" }], [{ kind: "text", text: "2 hours" }]] });
    expect(blocks[3]).toMatchObject({ kind: "ol", items: [[{ kind: "text", text: "Read the passage" }], [{ kind: "text", text: "Answer" }]] });
    expect(blocks[5]).toEqual({ kind: "note", inlines: [{ kind: "text", text: "Reported, not yet notified." }] });
    const t = (text: string) => [{ kind: "text", text }];
    expect(blocks[6]).toEqual({
      kind: "table",
      headers: [t("Section"), t("Questions")],
      rows: [
        [t("English"), t("24")],
        [t("Maths \\(|x|\\)"), t("12")],
      ],
    });
  });

  it("reads links inside table cells, not just in prose (2026-11-16: they printed as raw markdown)", () => {
    const blocks = parseArticleBody(
      "| Subject | Chapter |\n|---|---|\n| Maths | [Conic Sections](/questions/jee-mains/maths/conic-sections) |"
    );
    expect(blocks).toEqual([
      {
        kind: "table",
        headers: [[{ kind: "text", text: "Subject" }], [{ kind: "text", text: "Chapter" }]],
        rows: [
          [
            [{ kind: "text", text: "Maths" }],
            [
              {
                kind: "link",
                text: "Conic Sections",
                href: "/questions/jee-mains/maths/conic-sections",
                external: false,
                official: false,
              },
            ],
          ],
        ],
      },
    ]);
  });

  it("keeps a pipe line without a separator row as prose", () => {
    const blocks = parseArticleBody("| not | a table |");
    expect(blocks).toEqual([{ kind: "p", inlines: [{ kind: "text", text: "| not | a table |" }] }]);
  });

  it("gives repeated headings distinct anchors", () => {
    const blocks = parseArticleBody("## Marks\n\ntext\n\n## Marks");
    expect(blocks.filter((b) => b.kind === "h2").map((b) => (b as { id: string }).id)).toEqual(["marks", "marks-2"]);
  });

  it("keeps a multi-line display equation in one paragraph", () => {
    const blocks = parseArticleBody("\\[\na+b\n\\]");
    expect(blocks).toHaveLength(1);
    expect(blocks[0].kind).toBe("p");
  });
});

describe("readingMinutes", () => {
  it("counts about 200 words a minute, at least 1", () => {
    expect(readingMinutes("one two")).toBe(1);
    expect(readingMinutes(Array(1000).fill("w").join(" "))).toBe(5);
  });
});

const GOOD: ArticleInput = {
  slug: "clat-2027-exam-date-announced",
  kind: "news",
  examSlug: "clat",
  title: "CLAT 2027 exam date announced: 6 December 2026",
  description:
    "The Consortium has set CLAT 2027 for 6 December 2026. The date, the pattern, and how to use the weeks left with real past papers.",
  tags: ["CLAT", "Exam dates"],
  sources: [{ label: "Consortium notice", url: "https://consortiumofnlus.ac.in/clat-2027/" }],
  watch: "Admit card release",
  faq: [{ q: "When is CLAT 2027?", a: "On 6 December 2026, from 2 pm to 4 pm." }],
  body: [
    "The Consortium of NLUs has announced the date.",
    "",
    "## What the paper looks like",
    "",
    "120 questions in 2 hours. Practise with [real papers](/mock).",
  ].join("\n"),
};

describe("validateArticle", () => {
  it("passes a good article", () => {
    expect(validateArticle(GOOD)).toEqual([]);
  });

  it("names every problem", () => {
    const problems = validateArticle({
      ...GOOD,
      slug: "Bad Slug",
      kind: "opinion" as never,
      examSlug: "no-such-exam",
      title: "Short",
      description: "too short",
      tags: [],
      body: "# A top heading\n\nNo h2 here — and an em dash. [x](javascript:1)",
      faq: [{ q: "No question mark", a: "" }],
    });
    const text = problems.join("\n");
    for (const needle of [
      "slug",
      "kind",
      "exam",
      "title",
      "description",
      "tag",
      "# heading",
      "## heading",
      "em dash",
      "link",
      "FAQ question",
      "FAQ answer",
    ]) {
      expect(text, needle).toContain(needle);
    }
  });

  it("needs an official source on news and evergreen, not on data", () => {
    const unofficial = [{ label: "Paper", url: "https://indianexpress.com/x" }];
    expect(validateArticle({ ...GOOD, sources: unofficial }).join()).toContain("official source");
    expect(validateArticle({ ...GOOD, kind: "evergreen", sources: [] }).join()).toContain("official source");
    expect(validateArticle({ ...GOOD, kind: "data", sources: [] })).toEqual([]);
  });

  it("needs an exam on an evergreen page", () => {
    expect(validateArticle({ ...GOOD, kind: "evergreen", examSlug: null }).join()).toContain("exam");
  });

  it("refuses a slug that a code post already uses", () => {
    expect(validateArticle({ ...GOOD, slug: "nda-2-2026-maths-paper-analysis" }).join()).toContain("already");
  });

  it("counts a spaced en dash or double hyphen as an em dash", () => {
    expect(validateArticle({ ...GOOD, title: "CLAT 2027 – the exam date is now out" }).join()).toContain("em dash");
    expect(validateArticle({ ...GOOD, body: GOOD.body + "\n\nA -- B" }).join()).toContain("em dash");
  });
});
