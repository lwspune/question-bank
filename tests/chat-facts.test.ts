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
  type ChatExamFact,
  type ChatPlanFact,
} from "@/lib/chat/facts";

const EM_DASH = String.fromCharCode(0x2014);

describe("buildExamFacts", () => {
  const exams: ChatExamFact[] = [
    { displayName: "NDA", tier: "senior", hasMocks: true, boardExam: false, practiceOnly: false, noPublicContent: false },
    { displayName: "MH State Board Class 10", tier: "school", hasMocks: false, boardExam: true, practiceOnly: false, noPublicContent: false },
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

  it("tells V the page the student is on, when known", () => {
    expect(buildSystemPrompt({ ...base, page: "/questions/cbse-12/physics/atoms" })).toContain(
      "The student is on the page /questions/cbse-12/physics/atoms"
    );
    expect(buildSystemPrompt(base)).not.toContain("The student is on the page");
  });

  it("tells V it can see the earlier messages of this chat", () => {
    expect(buildSystemPrompt(base).toLowerCase()).toContain("earlier messages");
  });

  it("tells V chapter numbers are not stored, so it searches by the chapter's name", () => {
    const p = buildSystemPrompt(base);
    expect(p).toMatch(/chapter numbers? (are|is) not stored/i);
    expect(p).toContain("Electric Charges and Fields");
  });

  it("has V list a subject's chapters by name when it knows the subject but not the chapter", () => {
    expect(buildSystemPrompt(base)).toMatch(/list the chapter names/i);
  });

  it("tells a signed-out visitor's V it has one reply: no questions back, best answer now", () => {
    const p = buildSystemPrompt({ ...base, signedIn: false });
    expect(p).toMatch(/only this one reply/i);
    expect(p).toMatch(/do not ask them anything back/i);
    expect(p).toContain("/questions");
  });

  it("leaves the one-reply rule out for a signed-in student", () => {
    expect(buildSystemPrompt({ ...base, signedIn: true })).not.toMatch(/only this one reply/i);
    expect(buildSystemPrompt(base)).not.toMatch(/only this one reply/i);
  });

  it("has no em dashes of its own", () => {
    expect(buildSystemPrompt(base)).not.toContain(EM_DASH);
  });

  it("degrades gracefully with an empty plans list", () => {
    const p = buildSystemPrompt({ ...base, plans: [] });
    expect(p).not.toContain("undefined");
  });
});
