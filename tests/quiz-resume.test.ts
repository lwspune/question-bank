/**
 * Resuming a quiz across a sign-in round-trip.
 *
 * WHY THIS IS NEEDED AT ALL: quiz answers live in React state only. The existing
 * localStorage key (`qb:lead:v1`) stores the visitor's IDENTITY, never the
 * attempt. So adding a "Sign in" link to the reveal gate — the obvious fix for
 * the 5-of-13 lead mobiles that already belong to an account — would navigate
 * away and silently destroy a quiz the student had just finished answering.
 *
 * The blob is read back from sessionStorage, which the user can edit, so
 * parseResume treats it as untrusted input rather than as something we wrote.
 */
import { describe, it, expect } from "vitest";
import { quizResumeKey, serialiseResume, parseResume, MAX_RESUME_ANSWERS } from "@/lib/quiz/resume";

describe("quizResumeKey", () => {
  it("namespaces and versions the key", () => {
    expect(quizResumeKey("nda-maths-01")).toBe("qb:quiz:nda-maths-01:v1");
  });

  it("encodes the slug so it cannot inject separators into the key namespace", () => {
    // A slug is a DB value, not a constant. One containing ':' would otherwise
    // let it address a key belonging to a different quiz.
    expect(quizResumeKey("a:b")).toBe("qb:quiz:a%3Ab:v1");
  });

  it("gives different quizzes different keys", () => {
    expect(quizResumeKey("one")).not.toBe(quizResumeKey("two"));
  });
});

describe("parseResume — sessionStorage is user-writable, so this is untrusted input", () => {
  it("round-trips what serialiseResume wrote", () => {
    expect(parseResume(serialiseResume({ "1": "A", "2": "C" }))).toEqual({ "1": "A", "2": "C" });
  });

  it("returns null for a missing key", () => {
    expect(parseResume(null)).toBeNull();
  });

  it("returns null for malformed JSON rather than throwing", () => {
    expect(parseResume("{not json")).toBeNull();
  });

  it.each([["[]", "an array"], ['"str"', "a string"], ["7", "a number"], ["null", "null"]])(
    "returns null when the payload is %s (%s), not an answer map",
    (raw) => {
      expect(parseResume(raw)).toBeNull();
    }
  );

  it("drops values that are not option letters", () => {
    // A hand-edited 'E' or an object would otherwise reach the grader.
    expect(parseResume('{"1":"A","2":"E","3":"z","4":{"x":1}}')).toEqual({ "1": "A" });
  });

  it("drops keys that are not question positions", () => {
    expect(parseResume('{"1":"A","__proto__":"B","q2":"C"}')).toEqual({ "1": "A" });
  });

  it("returns null when nothing survives filtering", () => {
    // An empty restore must not bounce the student to the review screen with a
    // blank answer sheet — that is worse than starting over.
    expect(parseResume('{"1":"E"}')).toBeNull();
    expect(parseResume("{}")).toBeNull();
  });

  it("caps the entry count so a crafted blob cannot balloon the page", () => {
    const huge: Record<string, string> = {};
    for (let i = 0; i < MAX_RESUME_ANSWERS + 50; i++) huge[String(i)] = "A";
    const out = parseResume(JSON.stringify(huge));
    expect(Object.keys(out ?? {}).length).toBe(MAX_RESUME_ANSWERS);
  });
});
