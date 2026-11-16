import { describe, it, expect } from "vitest";
import {
  checkInFirstName,
  checkInExamSlug,
  checkInMessage,
  countMockExams,
} from "@/lib/students/checkIn";

describe("checkInFirstName", () => {
  it("takes the first word of a full name", () => {
    expect(checkInFirstName("Aarav Sharma")).toBe("Aarav");
  });

  it("fixes an all-caps or all-lowercase name, which Google sign-ups often carry", () => {
    expect(checkInFirstName("AARAV SHARMA")).toBe("Aarav");
    expect(checkInFirstName("aarav sharma")).toBe("Aarav");
  });

  it("keeps a name that already has its own capitals", () => {
    expect(checkInFirstName("McKenzie Rao")).toBe("McKenzie");
  });

  // The roster falls back to the email when a student has no name (~26% of
  // password sign-ups), and to "(no name)" when there is neither.
  it("gives null rather than greeting someone by their email", () => {
    expect(checkInFirstName("aarav.s@gmail.com")).toBeNull();
    expect(checkInFirstName("(no name)")).toBeNull();
    expect(checkInFirstName("   ")).toBeNull();
  });
});

describe("countMockExams", () => {
  it("counts finished mocks per student per exam", () => {
    const counts = countMockExams([
      { userId: "u1", examSlug: "nda" },
      { userId: "u1", examSlug: "nda" },
      { userId: "u1", examSlug: "cds" },
      { userId: "u2", examSlug: "neet" },
    ]);
    expect(counts.get("u1")).toEqual(new Map([["nda", 2], ["cds", 1]]));
    expect(counts.get("u2")).toEqual(new Map([["neet", 1]]));
    expect(counts.get("u3")).toBeUndefined();
  });
});

describe("checkInExamSlug", () => {
  it("names the exam the student sat most mocks in, since that is what Avg % measures", () => {
    const mocks = new Map([["cds", 1], ["nda", 3]]);
    expect(checkInExamSlug(mocks, ["cds"])).toBe("nda");
  });

  it("breaks a tie in favour of an exam the student chose", () => {
    const mocks = new Map([["nda", 2], ["cds", 2]]);
    expect(checkInExamSlug(mocks, ["cds"])).toBe("cds");
  });

  it("falls back to the first exam they chose when they sat no mocks", () => {
    expect(checkInExamSlug(undefined, ["jee-mains", "nda"])).toBe("jee-mains");
    expect(checkInExamSlug(new Map(), ["jee-mains"])).toBe("jee-mains");
  });

  it("skips a chosen exam that is no longer in the registry", () => {
    expect(checkInExamSlug(undefined, ["retired-exam", "neet"])).toBe("neet");
  });

  it("gives null when there is nothing to go on", () => {
    expect(checkInExamSlug(undefined, [])).toBeNull();
    expect(checkInExamSlug(undefined, ["retired-exam"])).toBeNull();
  });
});

describe("checkInMessage", () => {
  it("writes the owner's check-in with the student's name and exam", () => {
    expect(checkInMessage("Aarav Sharma", "nda")).toBe(
      "Hi Aarav, this is Vilas. I built PYQ Vault. You seem to be doing well in NDA. Just checking in: how is your study going?"
    );
  });

  it("uses the registry's display name for the exam", () => {
    expect(checkInMessage("Aarav", "jee-mains")).toContain("doing well in JEE Mains.");
  });

  it("says 'with your preparation' when no exam is known", () => {
    expect(checkInMessage("Aarav", null)).toContain("You seem to be doing well with your preparation.");
  });

  it("greets with a bare Hi when there is no usable name", () => {
    expect(checkInMessage("aarav@gmail.com", "nda").startsWith("Hi, this is Vilas.")).toBe(true);
  });

  it("carries no em or en dash (owner rule for visible text)", () => {
    expect(checkInMessage("Aarav", "nda")).not.toMatch(/[–—]/);
  });
});
