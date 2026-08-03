import { describe, expect, it } from "vitest";
import {
  DEFAULT_SYLLABUS_SUBJECT,
  SYLLABUS_SUBJECTS,
  resolveSyllabusSubject,
  syllabusSubjectKeys,
} from "@/lib/syllabus/subjects";
import { parseSubjectArg } from "../scripts/syllabus/subject-arg";

describe("syllabus subject registry", () => {
  it("resolves a known key", () => {
    const chem = resolveSyllabusSubject("chemistry");
    expect(chem?.key).toBe("chemistry");
    expect(chem?.subject).toBe("Chemistry");
  });

  it("resolves case-insensitively, so a URL segment is forgiving", () => {
    expect(resolveSyllabusSubject("Physics")?.key).toBe("physics");
    expect(resolveSyllabusSubject("PHYSICS")?.key).toBe("physics");
  });

  // Returning null rather than falling back to the default is deliberate: a
  // silent fallback would render the Chemistry map under a /biology URL and read
  // as "Biology has been mapped", which is exactly the claim we must not make.
  it("returns null for an unmapped subject instead of falling back", () => {
    expect(resolveSyllabusSubject("biology")).toBeNull();
    expect(resolveSyllabusSubject("")).toBeNull();
    expect(resolveSyllabusSubject(undefined)).toBeNull();
  });

  it("has a default that resolves", () => {
    expect(resolveSyllabusSubject(DEFAULT_SYLLABUS_SUBJECT)).not.toBeNull();
  });

  /**
   * The load-bearing per-subject value. A rationalised chapter is detected by
   * recency, so the cutoff has to match when THAT subject's dropped chapters
   * actually went silent in the papers:
   *   Chemistry — seven chapters stop at 2021, every live one reaches 2026.
   *   Physics   — Communication Systems ran through 2023 then stopped; all 27
   *               other JEE Physics chapters reach 2026.
   * Sharing Chemistry's 2023 would leave Communication Systems (63 PYQ) counted
   * as live, because the test is `lastYear < liveFromYear`.
   */
  it("carries a per-subject rationalisation cutoff", () => {
    expect(SYLLABUS_SUBJECTS.chemistry.liveFromYear).toBe(2023);
    expect(SYLLABUS_SUBJECTS.physics.liveFromYear).toBe(2024);
  });

  it("flags the State Board spiral only where it exists", () => {
    expect(SYLLABUS_SUBJECTS.chemistry.spiralChapters).toBe(false);
    expect(SYLLABUS_SUBJECTS.physics.spiralChapters).toBe(true);
  });

  it("keeps every registry entry self-consistent", () => {
    const keys = syllabusSubjectKeys();
    expect(keys.length).toBeGreaterThan(0);
    const dbNames = new Set<string>();
    for (const key of keys) {
      const s = SYLLABUS_SUBJECTS[key];
      expect(s.key).toBe(key); // the record key and the entry must agree
      expect(s.subject.length).toBeGreaterThan(0);
      expect(s.label.length).toBeGreaterThan(0);
      expect(s.liveFromYear).toBeGreaterThan(2000);
      expect(dbNames.has(s.subject)).toBe(false);
      dbNames.add(s.subject);
    }
  });

  it("names State Board seed files for each subject", () => {
    expect(SYLLABUS_SUBJECTS.chemistry.seedFiles).toEqual(["chem-sb-11.json", "chem-sb-12.json"]);
    expect(SYLLABUS_SUBJECTS.physics.seedFiles).toEqual(["phy-sb-11.json", "phy-sb-12.json"]);
  });

  // Chemistry's NCERT spine is seeded by ingest-ncert-spine.ts (which also
  // authors its rulings), so it is deliberately empty here rather than
  // duplicated into a second seeding path.
  it("keeps the NCERT spine files on their own axis", () => {
    expect(SYLLABUS_SUBJECTS.physics.ncertSeedFiles).toEqual([
      "phy-ncert-11.json",
      "phy-ncert-12.json",
    ]);
    expect(SYLLABUS_SUBJECTS.chemistry.ncertSeedFiles).toEqual([]);
  });
});

describe("parseSubjectArg", () => {
  it("reads the flag from anywhere in argv", () => {
    expect(parseSubjectArg(["node", "x.ts", "--subject=physics"])).toBe("physics");
    expect(parseSubjectArg(["node", "x.ts", "--subject=physics", "--apply"])).toBe("physics");
  });

  it("is undefined when absent, so callers can default", () => {
    expect(parseSubjectArg(["node", "x.ts"])).toBeUndefined();
    expect(parseSubjectArg(["node", "x.ts", "--apply"])).toBeUndefined();
    expect(parseSubjectArg(["node", "x.ts", "--subject="])).toBeUndefined();
  });

  // These scripts take positionals that mean other things (xlsx reads argv[2] as
  // the report name), so a positional must never be read as a subject.
  it("ignores positional arguments", () => {
    expect(parseSubjectArg(["node", "x.ts", "physics"])).toBeUndefined();
    expect(parseSubjectArg(["node", "x.ts", "jee"])).toBeUndefined();
  });
});
