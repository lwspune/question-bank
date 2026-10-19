import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { pathsInReply } from "@/lib/chat/replyLinks";
import {
  buildExamFacts,
  buildPlanFacts,
  buildFreeFacts,
  NAV_FACTS,
  buildSystemPrompt,
  buildSystemTail,
  buildGuideFacts,
  GUIDE_FACTS,
  type ChatExamFact,
  type ChatPlanFact,
} from "@/lib/chat/facts";
import { GUIDE_CATALOG } from "@/lib/guide/guideCatalog";

const EM_DASH = String.fromCharCode(0x2014);

describe("buildExamFacts", () => {
  const exams: ChatExamFact[] = [
    { slug: "nda", displayName: "NDA", tier: "senior", hasMocks: true, boardExam: false, practiceOnly: false, noPublicContent: false },
    { slug: "mh-ssc-10", displayName: "MH State Board Class 10", tier: "school", hasMocks: false, boardExam: true, practiceOnly: false, noPublicContent: false },
    { displayName: "Foundation Course", tier: "school", hasMocks: false, boardExam: false, practiceOnly: true, noPublicContent: false },
    { displayName: "Not Yet Live", tier: "graduate", hasMocks: false, boardExam: false, practiceOnly: false, noPublicContent: true },
  ];

  it("lists a live exam by its display name", () => {
    const facts = buildExamFacts(exams);
    expect(facts.some((f) => f.includes("NDA"))).toBe(true);
  });

  it("mentions mocks only for an exam that has them", () => {
    const facts = buildExamFacts(exams);
    const ndaLine = facts.find((f) => f.startsWith("NDA"));
    expect(ndaLine).toMatch(/mock/i);
    const boardLine = facts.find((f) => f.startsWith("MH State Board Class 10"));
    expect(boardLine).not.toMatch(/mock/i);
  });

  // 2026-10-18: a student asked for "all chapters" five times and V listed names every time, no link.
  it("gives each exam its page that lists every chapter, so V can link it for \"all\"", () => {
    const facts = buildExamFacts(exams);
    expect(facts.find((f) => f.startsWith("NDA"))).toContain("every chapter listed at /questions");
    expect(facts.find((f) => f.startsWith("MH State Board Class 10"))).toContain("every chapter listed at /exams/mh-ssc-10");
  });

  it("flags a board exam as pointing to /board", () => {
    const facts = buildExamFacts(exams);
    const boardLine = facts.find((f) => f.startsWith("MH State Board Class 10"));
    expect(boardLine).toContain("/board");
  });

  it("flags a practice-only exam as having no past-year papers", () => {
    const facts = buildExamFacts(exams);
    const line = facts.find((f) => f.startsWith("Foundation Course"));
    expect(line).toMatch(/practice/i);
  });

  it("says no past-year papers only when the exam really has none", () => {
    const facts = buildExamFacts([
      { displayName: "Foundation Course", tier: "school", hasMocks: false, boardExam: false, practiceOnly: true, hasPastYearQuestions: false, noPublicContent: false },
      { displayName: "CBSE Class 10", tier: "school", hasMocks: true, boardExam: true, practiceOnly: true, hasPastYearQuestions: true, noPublicContent: false },
      { displayName: "Unknown", tier: "school", hasMocks: false, boardExam: false, practiceOnly: true, noPublicContent: false },
    ]);
    expect(facts[0]).toContain("no past-year papers");
    expect(facts[1]).toContain("past-year board papers and textbook practice questions");
    expect(facts[1]).not.toContain("no past-year");
    // A failed count read must not produce the claim either way.
    expect(facts[2]).not.toContain("past-year");
  });

  it("EXCLUDES an exam with no public content — it must never be recommended", () => {
    const facts = buildExamFacts(exams);
    expect(facts.some((f) => f.includes("Not Yet Live"))).toBe(false);
  });
});

describe("buildPlanFacts", () => {
  const plans: ChatPlanFact[] = [
    { label: "Student Mock Pass", amountPaise: 9900, durationDays: 182, scope: "mocks" },
    { label: "Teacher Pass", amountPaise: 49900, durationDays: 365, scope: "teacher" },
    { label: "Lifetime Pass", amountPaise: 199900, durationDays: null, scope: "teacher" },
  ];

  it("formats price in rupees", () => {
    const facts = buildPlanFacts(plans);
    expect(facts.some((f) => f.includes("₹99"))).toBe(true);
  });

  it("formats a 182-day plan as 6 months", () => {
    const facts = buildPlanFacts(plans);
    expect(facts.some((f) => f.includes("6 months"))).toBe(true);
  });

  it("formats a null duration as lifetime", () => {
    const facts = buildPlanFacts(plans);
    expect(facts.some((f) => f.includes("lifetime"))).toBe(true);
  });

  it("names what scope each plan unlocks", () => {
    const facts = buildPlanFacts(plans);
    expect(facts.some((f) => f.includes("Teacher Pass") && /teacher/i.test(f))).toBe(true);
  });

  it("returns an empty list when nothing is on sale", () => {
    expect(buildPlanFacts([])).toEqual([]);
  });

  it("carries the pass's own perks, so V quotes what /pricing says", () => {
    const facts = buildPlanFacts([
      { label: "Premium Pass", amountPaise: 9900, durationDays: 182, scope: "mocks", perks: ["Unlimited mocks", "PDF downloads"] },
    ]);
    expect(facts[0]).toContain("Unlimited mocks");
    expect(facts[0]).toContain("PDF downloads");
  });
});

describe("buildFreeFacts", () => {
  it("states each free limit that is on", () => {
    const facts = buildFreeFacts({ reveals: 30, drill: 15, saves: 100, mocks: 3, chapterTests: 5, projectionDays: 7, papersPerDay: 1 });
    expect(facts.some((f) => f.includes("30") && /answer/i.test(f))).toBe(true);
    expect(facts.some((f) => f.includes("3") && /mock/i.test(f))).toBe(true);
  });

  it("calls a limit that is off unlimited, never a number", () => {
    const facts = buildFreeFacts({ reveals: null, drill: null, saves: null, mocks: null, chapterTests: null, projectionDays: null, papersPerDay: null });
    expect(facts.join(" ")).not.toMatch(/\bnull\b/);
    expect(facts.some((f) => /mock/i.test(f) && /unlimited|no limit/i.test(f))).toBe(true);
  });

  it("claims nothing when the limits could not be read", () => {
    expect(buildFreeFacts(null)).toEqual([]);
  });
});

describe("NAV_FACTS", () => {
  it("is a non-empty list of static route pointers", () => {
    expect(NAV_FACTS.length).toBeGreaterThan(0);
    expect(NAV_FACTS.some((f) => f.includes("/browse"))).toBe(true);
    expect(NAV_FACTS.some((f) => f.includes("/mock"))).toBe(true);
  });

  it("names the pages students asked V for", () => {
    const all = NAV_FACTS.join(" ");
    for (const path of ["/pricing", "/question-papers", "/board", "/guide", "/notes", "/signup"]) {
      expect(all).toContain(path);
    }
    expect(all).toContain("Build a practice test");
  });

  it("names the student's own progress pages, so V can link them (2026-10-16)", () => {
    const all = NAV_FACTS.join(" ");
    expect(all).toContain("/performance");
    expect(all).toContain("/me/map");
  });

  it("names only pages that exist, since V links them (an /exams index never did)", () => {
    const paths = pathsInReply(NAV_FACTS.join(" "));
    expect(paths.length).toBeGreaterThan(5);
    for (const path of paths) {
      expect(existsSync(join(process.cwd(), "src/app", path, "page.tsx")), path).toBe(true);
    }
  });

  it("uses no em dashes, since V copies the style it is shown", () => {
    expect(NAV_FACTS.join(" ")).not.toContain(EM_DASH);
  });
});

// 2026-10-19: asked for NDA GAT weightage, V said "I don't have weightage data"; the guides have it.
describe("buildGuideFacts", () => {
  const catalog = {
    nda: [{ href: "/guide/nda-physics", exam: "NDA PART B Physics" }],
    "mht-cet": [{ href: "/guide/mht-cet-physics", exam: "MHT-CET Physics" }],
  };

  it("gives each subject guide one line, its page first", () => {
    expect(buildGuideFacts(catalog)).toEqual([
      "/guide/nda-physics: NDA PART B Physics, which chapters carry the most marks and what to do first.",
      "/guide/mht-cet-physics: MHT-CET Physics, which chapters carry the most marks and what to do first.",
    ]);
  });

  it("covers every guide in the catalogue, so a new guide reaches V without a code change", () => {
    const hrefs = Object.values(GUIDE_CATALOG).flatMap((cards) => (cards ?? []).map((c) => c.href));
    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of hrefs) expect(GUIDE_FACTS.some((line) => line.startsWith(`${href}: `))).toBe(true);
  });

  it("uses no em dashes, since V copies the style it is shown", () => {
    expect(GUIDE_FACTS.join(" ")).not.toContain(EM_DASH);
  });
});

describe("buildSystemPrompt", () => {
  const base = {
    exams: ["NDA: senior stage, has mocks."],
    plans: ["Teacher Pass: ₹499 for 1 year (unlocks teacher)."],
    bankTotal: 78774,
    nav: NAV_FACTS,
  };

  it("carries every fact category into the prompt", () => {
    const p = buildSystemPrompt(base);
    expect(p).toContain("NDA: senior stage, has mocks.");
    expect(p).toContain("Teacher Pass: ₹499 for 1 year (unlocks teacher).");
    expect(p).toContain("78774");
    expect(p).toContain("/browse");
  });

  it("names the assistant V", () => {
    expect(buildSystemPrompt(base)).toContain("V");
  });

  it("instructs the model to answer only from the given facts", () => {
    const p = buildSystemPrompt(base).toLowerCase();
    expect(p).toMatch(/only|solely|strictly/);
  });

  it("instructs the model to refuse explaining a specific PYQ", () => {
    const p = buildSystemPrompt(base).toLowerCase();
    expect(p).toContain("explain");
  });

  it("tells V to use the chapter search and to link only pages it was given", () => {
    const p = buildSystemPrompt(base);
    expect(p).toContain("find_chapters");
    expect(p.toLowerCase()).toMatch(/never (make up|invent)/);
  });

  it("covers what students actually typed: tests, future papers, buying, language", () => {
    const p = buildSystemPrompt(base);
    expect(p).toContain("Build a practice test");
    expect(p).toMatch(/2027|future paper|upcoming paper/i);
    expect(p).toContain("/pricing");
    expect(p).toMatch(/Hindi|Hinglish/);
  });

  it("states the free limits when given", () => {
    const p = buildSystemPrompt({ ...base, free: ["Answers: 30 a day free when signed in."] });
    expect(p).toContain("Answers: 30 a day free when signed in.");
  });

  it("keeps the page and the signed-out note out of the fixed instructions, which are cached", () => {
    const p = buildSystemPrompt(base);
    expect(p).not.toContain("The student is on the page");
    expect(p).not.toMatch(/only this one reply/i);
  });

  it("tells V it can see the earlier messages of this chat", () => {
    expect(buildSystemPrompt(base).toLowerCase()).toContain("earlier messages");
  });

  it("tells V chapter numbers are not stored, so it searches by the chapter's name", () => {
    const p = buildSystemPrompt(base);
    expect(p).toMatch(/chapter numbers? (are|is) not stored/i);
    expect(p).toContain("Electric Charges and Fields");
  });

  it("lists the subject guides and has V link the subject's own guide for strategy questions", () => {
    const p = buildSystemPrompt({ ...base, guides: ["/guide/nda-physics: NDA PART B Physics, which chapters carry the most marks and what to do first."] });
    expect(p).toMatch(/STRATEGY GUIDES\n\/guide\/nda-physics: NDA PART B Physics/);
    expect(p).toMatch(/link that subject's guide from STRATEGY GUIDES/);
    expect(p).toMatch(/never say you have no weightage/i);
  });

  it("lets V take the exam from the student's profile, which is not a guess", () => {
    expect(buildSystemPrompt(base)).toMatch(/named it, the page shows it, or their profile lists it/);
  });

  // 2026-10-18: V guessed CBSE for "class 12th physics rotational dynamics" (a Maharashtra chapter) and said "not found".
  it("has V never guess the exam, and treat a class alone as no exam", () => {
    const p = buildSystemPrompt(base);
    expect(p).toMatch(/never guess the exam/i);
    expect(p).toMatch(/a class alone \("class 12", "12th"\) is not an exam/i);
  });

  it("has V ask which exam, naming the ones found, when a chapter is in several", () => {
    const p = buildSystemPrompt(base);
    expect(p).toMatch(/ask which one they mean, naming those exams/i);
    expect(p).toMatch(/link nothing yet/i);
  });

  it("has V link the exam's every-chapter page when a student asks for all chapters", () => {
    const p = buildSystemPrompt(base);
    expect(p).toContain("सगळे");
    expect(p).toMatch(/link that exam's every-chapter page/i);
  });

  it("has V list a subject's chapters by name when it knows the subject but not the chapter", () => {
    expect(buildSystemPrompt(base)).toMatch(/list the chapter names/i);
  });

  it("has V read a student's own results with my_progress, growth-first, never against other students", () => {
    const p = buildSystemPrompt(base);
    expect(p).toContain("my_progress");
    expect(p).toMatch(/what went well first/i);
    expect(p).toMatch(/never compare/i);
    expect(p).not.toMatch(/cannot see a student's own account, scores/i);
  });

  it("has V call my_progress for how many questions a student has answered, not only for scores", () => {
    expect(buildSystemPrompt(base)).toMatch(/how many questions they have answered/i);
  });

  it("has no em dashes of its own", () => {
    expect(buildSystemPrompt(base)).not.toContain(EM_DASH);
  });

  it("degrades gracefully with an empty plans list", () => {
    const p = buildSystemPrompt({ ...base, plans: [] });
    expect(p).not.toContain("undefined");
  });
});

describe("buildSystemTail", () => {
  it("tells V the page the student is on, when known", () => {
    expect(buildSystemTail({ page: "/questions/cbse-12/physics/atoms", signedIn: true })).toContain(
      "The student is on the page /questions/cbse-12/physics/atoms"
    );
    expect(buildSystemTail({ page: null, signedIn: true })).not.toContain("The student is on the page");
  });

  // 2026-10-18: a visitor's one question went on "Hii", and the rule made V guess instead of asking.
  it("tells a signed-out visitor's V it has one answer, and may ask back when unclear without using it up", () => {
    const t = buildSystemTail({ page: null, signedIn: false });
    expect(t).toMatch(/one answer/i);
    expect(t).toMatch(/ask one short question back and link nothing/i);
    expect(t).toMatch(/does not use up/i);
    expect(t).not.toMatch(/do not ask them anything back/i);
    expect(t).not.toMatch(/pick the most likely/i);
  });

  // 2026-10-18 replay: "PYQs ke answers 10th ke science part 2" got two chapters picked at random.
  it("has a signed-out visitor who names only a subject get the every-chapter page, not picked chapters", () => {
    expect(buildSystemTail({ page: null, signedIn: false })).toMatch(/subject but no chapter, link that exam's every-chapter page/i);
  });

  it("is empty for a signed-in student on no known page", () => {
    expect(buildSystemTail({ page: null, signedIn: true })).toBe("");
  });

  // 2026-10-19: "pe pyqs 2022 to 2026" on the Solid State page was searched as Physical Education.
  it("tells V the page's chapter and to assume it when the message names none", () => {
    const t = buildSystemTail({
      page: "/board/mh-hsc-12/chemistry/solid-state",
      signedIn: true,
      pageInfo: { examName: "MH HSC 12", subjectName: "Chemistry", chapterName: "Solid State" },
    });
    expect(t).toContain("Solid State (MH HSC 12, Chemistry)");
    expect(t).toMatch(/names no chapter or is unclear, they mean this chapter/i);
  });

  it("tells V the page's exam when the page is about one exam only", () => {
    const t = buildSystemTail({ page: "/exams/mh-ssc-10", signedIn: true, pageInfo: { examName: "MH SSC 10" } });
    expect(t).toMatch(/page is about MH SSC 10/);
    expect(t).not.toMatch(/they mean this chapter/i);
  });

  // 21 of the 27 signed-in students who typed to V had exams on their profile, and V asked anyway.
  it("tells V the student's exams from their profile, page first, asking when more than one fits", () => {
    const t = buildSystemTail({ page: null, signedIn: true, profileExams: ["MHT-CET", "MH HSC 12"] });
    expect(t).toContain("Their exams, from their profile: MHT-CET, MH HSC 12.");
    expect(t).toMatch(/if more than one fits, ask which/i);
    expect(buildSystemTail({ page: null, signedIn: true, profileExams: [] })).toBe("");
  });

  it("has no em dashes of its own", () => {
    expect(buildSystemTail({ page: "/notes", signedIn: false })).not.toContain(EM_DASH);
  });
});
