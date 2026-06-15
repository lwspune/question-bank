/**
 * Pure section-template helpers for the collaborative paper builder.
 * A template is an ordered list of editable sections (subjects). These helpers
 * are the data layer the editor UI + server actions wrap — the React/DB side is
 * smoke-tested; this file pins the semantics.
 */
import { describe, it, expect } from "vitest";
import {
  DEFAULT_GAT_TEMPLATE,
  UNASSIGNED_KEY,
  slugifySectionKey,
  addSection,
  removeSection,
  renameSection,
  setSectionTarget,
  reorderSections,
  subjectToSectionKey,
} from "@/lib/papers/template";

describe("DEFAULT_GAT_TEMPLATE", () => {
  it("covers the GAT subjects with stable, unique keys", () => {
    const keys = DEFAULT_GAT_TEMPLATE.map((s) => s.key);
    expect(new Set(keys).size).toBe(keys.length); // unique
    expect(keys).toContain("english");
    expect(keys).toContain("current-affairs");
    // No Mathematics — GAT excludes it (Maths is its own paper).
    expect(keys).not.toContain("mathematics");
  });

  it("every section has a positive target and a label", () => {
    for (const s of DEFAULT_GAT_TEMPLATE) {
      expect(s.label.length).toBeGreaterThan(0);
      expect(s.targetCount).toBeGreaterThan(0);
    }
  });
});

describe("slugifySectionKey", () => {
  it("lowercases, hyphenates spaces, strips punctuation", () => {
    expect(slugifySectionKey("Current Affairs")).toBe("current-affairs");
    expect(slugifySectionKey("  General Science!! ")).toBe("general-science");
    expect(slugifySectionKey("Maths & Reasoning")).toBe("maths-reasoning");
  });

  it("collapses repeated separators and trims dashes", () => {
    expect(slugifySectionKey("A   B")).toBe("a-b");
    expect(slugifySectionKey("--x--")).toBe("x");
  });

  it("returns empty string for punctuation-only input", () => {
    expect(slugifySectionKey("!!!")).toBe("");
  });
});

describe("addSection", () => {
  it("appends a new section with a slugified key", () => {
    const t = addSection([], { label: "Physics", targetCount: 20 });
    expect(t).toHaveLength(1);
    expect(t[0]).toMatchObject({ key: "physics", label: "Physics", targetCount: 20 });
  });

  it("disambiguates a colliding key with a numeric suffix", () => {
    const t1 = addSection([], { label: "Physics", targetCount: 10 });
    const t2 = addSection(t1, { label: "Physics", targetCount: 5 });
    expect(t2.map((s) => s.key)).toEqual(["physics", "physics-2"]);
  });

  it("falls back to a generated key when the label has no slug", () => {
    const t = addSection([], { label: "!!!", targetCount: 5 });
    expect(t[0].key.length).toBeGreaterThan(0);
  });

  it("does not mutate the input template", () => {
    const input = DEFAULT_GAT_TEMPLATE;
    const len = input.length;
    addSection(input, { label: "New", targetCount: 1 });
    expect(input).toHaveLength(len);
  });
});

describe("removeSection", () => {
  it("drops the section with the given key", () => {
    const t = removeSection(DEFAULT_GAT_TEMPLATE, "english");
    expect(t.map((s) => s.key)).not.toContain("english");
    expect(t).toHaveLength(DEFAULT_GAT_TEMPLATE.length - 1);
  });

  it("is a no-op for an unknown key", () => {
    const t = removeSection(DEFAULT_GAT_TEMPLATE, "nope");
    expect(t).toHaveLength(DEFAULT_GAT_TEMPLATE.length);
  });
});

describe("renameSection", () => {
  it("changes the label but KEEPS the key stable (key is the membership FK)", () => {
    const t = renameSection(DEFAULT_GAT_TEMPLATE, "english", "English (Comprehension)");
    const sec = t.find((s) => s.key === "english");
    expect(sec?.label).toBe("English (Comprehension)");
    expect(sec?.key).toBe("english"); // unchanged — paper_questions.section_key still resolves
  });
});

describe("setSectionTarget", () => {
  it("updates only the target of the named section", () => {
    const t = setSectionTarget(DEFAULT_GAT_TEMPLATE, "physics", 30);
    expect(t.find((s) => s.key === "physics")?.targetCount).toBe(30);
    expect(t.find((s) => s.key === "english")?.targetCount).toBe(
      DEFAULT_GAT_TEMPLATE.find((s) => s.key === "english")?.targetCount
    );
  });
});

describe("reorderSections", () => {
  it("reorders by the supplied key order, ignoring unknown keys", () => {
    const t = reorderSections(DEFAULT_GAT_TEMPLATE, ["physics", "english"]);
    expect(t[0].key).toBe("physics");
    expect(t[1].key).toBe("english");
    // remaining sections keep their relative order after the named ones
    expect(t).toHaveLength(DEFAULT_GAT_TEMPLATE.length);
    expect(new Set(t.map((s) => s.key)).size).toBe(t.length);
  });
});

describe("subjectToSectionKey", () => {
  it("maps a question's subject to the section whose label matches (case-insensitive)", () => {
    expect(subjectToSectionKey("Physics", DEFAULT_GAT_TEMPLATE)).toBe("physics");
    expect(subjectToSectionKey("current affairs", DEFAULT_GAT_TEMPLATE)).toBe("current-affairs");
  });

  it("returns null when no section matches (e.g. Mathematics in a GAT paper)", () => {
    expect(subjectToSectionKey("Mathematics", DEFAULT_GAT_TEMPLATE)).toBeNull();
  });

  it("UNASSIGNED_KEY is reserved and never collides with a real subject slug", () => {
    expect(DEFAULT_GAT_TEMPLATE.map((s) => s.key)).not.toContain(UNASSIGNED_KEY);
  });
});
