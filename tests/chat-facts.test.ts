import { describe, it, expect } from "vitest";
import {
  buildExamFacts,
  buildPlanFacts,
  NAV_FACTS,
  buildSystemPrompt,
  type ChatExamFact,
  type ChatPlanFact,
} from "@/lib/chat/facts";

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
});

describe("NAV_FACTS", () => {
  it("is a non-empty list of static route pointers", () => {
    expect(NAV_FACTS.length).toBeGreaterThan(0);
    expect(NAV_FACTS.some((f) => f.includes("/browse"))).toBe(true);
    expect(NAV_FACTS.some((f) => f.includes("/mock"))).toBe(true);
  });
});

describe("buildSystemPrompt", () => {
  const base = {
    exams: ["NDA — senior stage, has mocks."],
    plans: ["Teacher Pass: ₹499 for 1 year (unlocks teacher)."],
    bankTotal: 78774,
    nav: NAV_FACTS,
  };

  it("carries every fact category into the prompt", () => {
    const p = buildSystemPrompt(base);
    expect(p).toContain("NDA — senior stage, has mocks.");
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

  it("degrades gracefully with an empty plans list", () => {
    const p = buildSystemPrompt({ ...base, plans: [] });
    expect(p).not.toContain("undefined");
  });
});
