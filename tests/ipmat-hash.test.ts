// Spec for the IPMAT dedup hash (scripts/ipmat/hash.ts).
//
// WHY A LOCAL HASH AT ALL. The shared `contentHash(question, options, answer)`
// deliberately excludes CONTEXT. That is fine for a corpus where the stem
// carries the question, and wrong for this one: a MATCH-LIST question has a
// bare directive for a stem and the actual question in the context.
//
// JIPMAT 2024 VA Q29 and Q33 are the proof. Both have the stem "Choose the
// correct answer from the options given below :", both offer the same four
// permutation strings "(A) - (I), (B) - (II)…", and both key D. One asks about
// the word "all" as a part of speech; the other about four idioms. They are
// completely different questions that hash IDENTICALLY.
//
// `commitStaged` dedups by UPSERT on (org_id, exam_id, content_hash), so a
// collision does not error — one row silently replaces the other and the
// inserted count comes back short with no explanation. The pre-flight caught
// this before the load; this spec keeps it caught.
import { describe, it, expect } from "vitest";
import { ipmatContentHash } from "../scripts/ipmat/hash";
import { contentHash, numericContentHash } from "../src/lib/upload/hash";

const PERMUTATIONS = [
  "(A) - (I), (B) - (II), (C) - (III), (D) - (IV)",
  "(A) - (II), (B) - (III), (C) - (IV), (D) - (I)",
  "(A) - (III), (B) - (IV), (C) - (I), (D) - (II)",
  "(A) - (IV), (B) - (III), (C) - (II), (D) - (I)",
];
const DIRECTIVE = "Choose the correct answer from the options given below :";
const PARTS_OF_SPEECH = "Match List I with II\n\n| | List I (Underlined word) | | List II (Meaning) |";
const IDIOMS = "Match List I with II\n\n| | List I (Phrase) | | List II (Meaning) |";

describe("ipmatContentHash", () => {
  it("separates two match-list questions the shared hash collides", () => {
    // The exact real pair. This is the whole reason the module exists.
    const a = ipmatContentHash({ format: "mcq", text: DIRECTIVE, context: PARTS_OF_SPEECH, options: PERMUTATIONS, answer: "D" });
    const b = ipmatContentHash({ format: "mcq", text: DIRECTIVE, context: IDIOMS, options: PERMUTATIONS, answer: "D" });
    expect(a).not.toBe(b);
    // and confirm the shared helper really does collide, so this test is not
    // guarding against an imaginary problem
    expect(contentHash(DIRECTIVE, PERMUTATIONS, "D")).toBe(contentHash(DIRECTIVE, PERMUTATIONS, "D"));
  });

  it("still separates rows that differ only in their options", () => {
    const a = ipmatContentHash({ format: "mcq", text: "stem", context: null, options: ["1", "2", "3", "4"], answer: "A" });
    const b = ipmatContentHash({ format: "mcq", text: "stem", context: null, options: ["1", "2", "3", "5"], answer: "A" });
    expect(a).not.toBe(b);
  });

  it("still separates rows that differ only in their answer", () => {
    const base = { format: "mcq" as const, text: "stem", context: null, options: ["1", "2", "3", "4"] };
    expect(ipmatContentHash({ ...base, answer: "A" })).not.toBe(ipmatContentHash({ ...base, answer: "B" }));
  });

  it("is STABLE for identical input, so a re-ingest dedups instead of duplicating", () => {
    const input = { format: "mcq" as const, text: DIRECTIVE, context: IDIOMS, options: PERMUTATIONS, answer: "D" };
    expect(ipmatContentHash(input)).toBe(ipmatContentHash({ ...input }));
  });

  it("is insensitive to option ORDER, matching the shared helper's behaviour", () => {
    // The shared hash sorts options; a shuffled option set is the same question.
    const a = ipmatContentHash({ format: "mcq", text: "s", context: null, options: ["a", "b", "c", "d"], answer: "A" });
    const b = ipmatContentHash({ format: "mcq", text: "s", context: null, options: ["d", "c", "b", "a"], answer: "A" });
    expect(a).toBe(b);
  });

  it("treats an absent context and an empty context as the same", () => {
    const a = ipmatContentHash({ format: "mcq", text: "s", context: null, options: ["1", "2"], answer: "A" });
    const b = ipmatContentHash({ format: "mcq", text: "s", context: "", options: ["1", "2"], answer: "A" });
    expect(a).toBe(b);
  });

  it("delegates a numeric row to the shared numeric hash, which is already context-aware", () => {
    expect(ipmatContentHash({ format: "numeric", text: "q", context: "ctx", options: [], answer: "" })).toBe(
      numericContentHash("q", "ctx")
    );
  });

  it("separates two numeric rows that share a stem but not a context", () => {
    const a = ipmatContentHash({ format: "numeric", text: "Order the sentences.", context: "set one", options: [], answer: "" });
    const b = ipmatContentHash({ format: "numeric", text: "Order the sentences.", context: "set two", options: [], answer: "" });
    expect(a).not.toBe(b);
  });

  it("is namespaced, so it can never be mistaken for a shared-helper hash", () => {
    // Same preimage components, different digest — a row hashed by one scheme
    // must not appear already-present to the other.
    expect(ipmatContentHash({ format: "mcq", text: "q", context: null, options: ["1"], answer: "A" })).not.toBe(
      contentHash("q", ["1"], "A")
    );
  });

  it("returns a 64-char hex digest", () => {
    const h = ipmatContentHash({ format: "mcq", text: "q", context: null, options: ["1"], answer: "A" });
    expect(h).toMatch(/^[0-9a-f]{64}$/);
  });
});
