import { describe, it, expect } from "vitest";
import {
  PREDEFINED_QUESTIONS,
  buildFaqAnswer,
  type ChatFaqInput,
} from "@/lib/chat/faq";
import type { ChatExamFact, ChatPlanFact } from "@/lib/chat/facts";

const exams: ChatExamFact[] = [
  { displayName: "NDA", tier: "senior", hasMocks: true, boardExam: false, practiceOnly: false, noPublicContent: false },
  { displayName: "MH State Board Class 10", tier: "school", hasMocks: false, boardExam: true, practiceOnly: false, noPublicContent: false },
  { displayName: "Hidden Exam", tier: "graduate", hasMocks: false, boardExam: false, practiceOnly: false, noPublicContent: true },
];

const plans: ChatPlanFact[] = [
  { label: "Teacher Pass", amountPaise: 49900, durationDays: 365, scope: "teacher" },
  { label: "Student Mock Pass", amountPaise: 9900, durationDays: 182, scope: "mocks" },
];

const input: ChatFaqInput = { exams, plans, bankTotal: 78774 };

describe("PREDEFINED_QUESTIONS", () => {
  it("declares exactly the 6 confirmed questions", () => {
    expect(PREDEFINED_QUESTIONS).toHaveLength(6);
    const ids = PREDEFINED_QUESTIONS.map((q) => q.id);
    expect(new Set(ids).size).toBe(6); // no duplicate ids
  });

  it("every question has a non-empty label", () => {
    for (const q of PREDEFINED_QUESTIONS) {
      expect(q.label.trim().length).toBeGreaterThan(0);
    }
  });
});

describe("buildFaqAnswer", () => {
  it("names live exams for the 'exams' question, excluding hidden ones", () => {
    const a = buildFaqAnswer("exams", input);
    expect(a).toContain("NDA");
    expect(a).not.toContain("Hidden Exam");
  });

  it("quotes the live pass price for 'mock-pass'", () => {
    const a = buildFaqAnswer("mock-pass", input);
    expect(a).toContain("₹99");
    expect(a).toMatch(/6 months/);
  });

  // 2026-10-01: the one pass also unlocks Word downloads, and its NAME is data
  // (/dashboard/pricing), so the answer reads the label rather than hardcoding one.
  it("names the pass by its live label and says it unlocks downloads", () => {
    const renamed = { ...input, plans: [{ label: "PYQ Vault Pass", amountPaise: 9900, durationDays: 182, scope: "mocks" }] };
    const a = buildFaqAnswer("mock-pass", renamed);
    expect(a).toContain("PYQ Vault Pass");
    expect(a).not.toContain("Student Mock Pass");
    expect(a).toMatch(/download/i);
  });

  it("degrades gracefully when no mock pass is on sale", () => {
    const a = buildFaqAnswer("mock-pass", { ...input, plans: [] });
    expect(a).not.toContain("undefined");
    expect(a.length).toBeGreaterThan(0);
  });

  it("explains browsing is free with no account for 'signup'", () => {
    const a = buildFaqAnswer("signup", input);
    expect(a.toLowerCase()).toContain("no account needed");
  });

  it("points at /notes for 'notes'", () => {
    expect(buildFaqAnswer("notes", input)).toContain("/notes");
  });

  it("names an exam with mocks for 'mocks'", () => {
    const a = buildFaqAnswer("mocks", input);
    expect(a).toContain("/mock");
  });

  it("quotes the live bank total for 'bank-size'", () => {
    const a = buildFaqAnswer("bank-size", input);
    expect(a).toContain("78,774");
  });

  it("returns a safe fallback for an unknown id rather than throwing", () => {
    // @ts-expect-error deliberately invalid id
    const a = buildFaqAnswer("not-a-real-id", input);
    expect(typeof a).toBe("string");
    expect(a.length).toBeGreaterThan(0);
  });
});
