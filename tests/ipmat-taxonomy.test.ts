// Spec for the IPMAT taxonomy mapping (scripts/ipmat/taxonomy.ts).
//
// THE SUBJECT AXIS FOLLOWS NDA AND CDS. Both discard the paper structure and
// name subjects academically: NDA Paper II GAT covers English plus eight GK
// subjects, and there is no "GAT" or "Paper II" subject anywhere — a Physics
// question from Paper II Part B simply sits under `Physics`. CDS does the same
// across its three papers.
//
// So an IPMAT question's subject comes from WHAT IT IS ABOUT, not from which
// section of the paper it appeared in. Three subjects, shared by all three
// exams: Mathematics, Logical Reasoning, English.
//
// THIS REPLACED A SECTION-NAMED AXIS, and the gain was measured: 147 chapter
// rows became 114. It collapsed the 26 Indore quant chapters that existed twice
// (once under a "Short Answer" subject, once under an "MCQ" one), and it fixed
// the section leaks — Rohtak used to carry a one-question "Linear Equations"
// chapter under Logical Reasoning, and "Clocks and Calendars" under
// Quantitative Ability, because the exam filed a few questions in the other
// section. Naming by subject rather than by section makes those disappear.
//
// What was given up: SA vs MCQ is no longer a subject. It is not lost —
// `question_format` records those 148 typed-answer rows as `numeric` and
// /browse's Format filter exposes them, which is the right axis for a format
// distinction.
//
// The chapter names stay in CDS house style (spell "and" out, no ampersands)
// and sixteen are taken verbatim from CDS. With `English` as a subject name,
// `English > Reading Comprehension` is now one chapter spanning NDA, CDS and
// all three IPMATs.
//
// COMPLETENESS IS CHECKED IN BOTH DIRECTIONS, IN TWO PLACES: every source pair
// must map and every map entry must match a real row; and every chapter must
// have a subject while every declared subject must own a chapter. A forward-only
// check cannot catch an omission, and a reverse-only one cannot catch an entry
// that has rotted.
import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import {
  IPMAT_SUBJECTS,
  CHAPTER_SUBJECT,
  TAXONOMY_MAP,
  sourceKey,
  resolveTaxonomy,
  mappedChapters,
  mappedSubtopics,
  subjectOf,
} from "../scripts/ipmat/taxonomy";
import type { IpmatExamSlug } from "../scripts/ipmat/config";

type Built = {
  exam: IpmatExamSlug;
  section: string;
  sourceTopic: string | null;
  sourceSubTopic: string | null;
};

const BUILD_DIR = join(__dirname, "..", "scripts", "ipmat", "data", "build");

function builtRows(): Built[] {
  const out: Built[] = [];
  for (const f of readdirSync(BUILD_DIR).filter((x) => x.endsWith(".json"))) {
    out.push(...(JSON.parse(readFileSync(join(BUILD_DIR, f), "utf8")) as Built[]));
  }
  return out;
}

describe("IPMAT_SUBJECTS", () => {
  it("is the NDA/CDS-style academic triple, not the paper's section names", () => {
    expect([...IPMAT_SUBJECTS]).toEqual(["Mathematics", "Logical Reasoning", "English"]);
  });

  it("names English the way NDA and CDS do, not 'Verbal Ability'", () => {
    // This is what makes `English > Reading Comprehension` one chapter across
    // NDA (2,549 PUBLIC), CDS (2,400) and all three IPMATs.
    expect(IPMAT_SUBJECTS).toContain("English");
    expect(IPMAT_SUBJECTS).not.toContain("Verbal Ability");
  });

  it("carries no section name and no answer format", () => {
    for (const s of IPMAT_SUBJECTS) {
      expect(s, s).not.toMatch(/\b(SA|MCQ|VA|QA|LR|Short Answer|Paper)\b/);
    }
  });
});

describe("CHAPTER_SUBJECT completeness — both directions", () => {
  it("gives every mapped chapter exactly one subject", () => {
    expect(mappedChapters().filter((c) => !CHAPTER_SUBJECT[c])).toEqual([]);
  });

  it("has NO subject assignment for a chapter the map never produces", () => {
    // Catches an entry left behind after a chapter was renamed.
    const produced = new Set(mappedChapters());
    expect(Object.keys(CHAPTER_SUBJECT).filter((c) => !produced.has(c)).sort()).toEqual([]);
  });

  it("assigns only the three declared subjects", () => {
    const bad = Object.entries(CHAPTER_SUBJECT).filter(
      ([, s]) => !(IPMAT_SUBJECTS as readonly string[]).includes(s)
    );
    expect(bad).toEqual([]);
  });

  it("gives every declared subject at least one chapter", () => {
    for (const s of IPMAT_SUBJECTS) {
      expect(Object.values(CHAPTER_SUBJECT), s).toContain(s);
    }
  });

  it("files the quant chapters under Mathematics", () => {
    for (const c of ["Sequence and Series", "Number System", "Triangles", "Logarithms", "Mensuration 3D"]) {
      expect(subjectOf(c), c).toBe("Mathematics");
    }
  });

  it("files reasoning AND data interpretation under Logical Reasoning", () => {
    // Data Interpretation is a reasoning skill, and the source already files it
    // under Logical Reasoning for JIPMAT and under its own topic for Indore.
    for (const c of ["Arrangements and Puzzles", "Data Interpretation", "Critical Reasoning", "Pattern Recognition"]) {
      expect(subjectOf(c), c).toBe("Logical Reasoning");
    }
  });

  it("files the verbal chapters under English", () => {
    for (const c of ["Reading Comprehension", "Grammar", "Vocabulary", "Sentence Rearrangement", "Spotting Errors"]) {
      expect(subjectOf(c), c).toBe("English");
    }
  });

  it("returns null from subjectOf for an unknown chapter rather than a default", () => {
    expect(subjectOf("Astrophysics")).toBeNull();
  });
});

describe("TAXONOMY_MAP completeness — forward", () => {
  it("maps EVERY source pair present in the built corpus", () => {
    const missing = new Set<string>();
    for (const r of builtRows()) {
      const key = sourceKey(r.sourceTopic, r.sourceSubTopic);
      if (!TAXONOMY_MAP[key]) missing.add(key);
    }
    expect([...missing].sort()).toEqual([]);
  });

  it("resolves every built row to a subject, chapter and subtopic", () => {
    const bad: string[] = [];
    for (const r of builtRows()) {
      const t = resolveTaxonomy(r.sourceTopic, r.sourceSubTopic);
      if (!t || !t.subject || !t.chapter || !t.subtopic) {
        bad.push(sourceKey(r.sourceTopic, r.sourceSubTopic));
      }
    }
    expect(bad).toEqual([]);
  });
});

describe("TAXONOMY_MAP completeness — reverse", () => {
  it("has NO entry that matches nothing in the corpus", () => {
    const present = new Set(builtRows().map((r) => sourceKey(r.sourceTopic, r.sourceSubTopic)));
    expect(Object.keys(TAXONOMY_MAP).filter((k) => !present.has(k)).sort()).toEqual([]);
  });
});

describe("the subject no longer depends on the section", () => {
  it("gives one source pair the same subject whichever section it appeared in", () => {
    // `Logical Reasoning > Logical Sequence` sits in the QA section three times
    // and in LR the rest. Under the old section-named axis those landed in two
    // different subjects; now the question's own topic decides.
    expect(resolveTaxonomy("Logical Reasoning", "Logical Sequence")!.subject).toBe("Logical Reasoning");
  });

  it("puts Algebra under Mathematics with no SA/MCQ split", () => {
    expect(resolveTaxonomy("Algebra", "Modulus")).toEqual({
      subject: "Mathematics",
      chapter: "Modulus",
      subtopic: "Absolute Value Equations and Inequalities",
    });
  });

  it("returns null for an unmapped source pair rather than guessing", () => {
    expect(resolveTaxonomy("Astrology", "Star Signs")).toBeNull();
  });

  it("returns null when the topic is missing", () => {
    expect(resolveTaxonomy(null, null)).toBeNull();
  });
});

describe("the map cleans the source's own duplicates", () => {
  const target = (topic: string, sub: string) => TAXONOMY_MAP[sourceKey(topic, sub)];

  it("folds three spellings of active/passive voice into one subtopic", () => {
    const a = target("Grammar", "Active & Passive");
    const b = target("Grammar", "Active & Passive Voice");
    const c = target("Grammar", "Passive & Active");
    expect(a.subtopic).toBe(b.subtopic);
    expect(b.subtopic).toBe(c.subtopic);
    expect(a.chapter).toBe(c.chapter);
  });

  it("folds both spellings of direct/indirect speech", () => {
    expect(target("Grammar", "Direct & Indirect").subtopic).toBe(
      target("Grammar", "Direct & Indirect Speech").subtopic
    );
  });

  it("folds singular and plural Linear Equation(s)", () => {
    expect(target("Algebra", "Linear Equation").subtopic).toBe(
      target("Algebra", "Linear Equations").subtopic
    );
  });

  it("folds singular and plural Bar Graph(s)", () => {
    expect(target("Data Interpretation", "Bar Graphs").subtopic).toBe(
      target("Data Interpretation", "Bar Graph").subtopic
    );
  });

  it("sends Tabular Data to one chapter however the source topics it", () => {
    expect(target("Logical Reasoning", "Tabular Data").chapter).toBe(
      target("Data Interpretation", "Tabular Data").chapter
    );
  });

  it("sends Critical Reasoning to one chapter from either parent topic", () => {
    expect(target("Verbal Ability", "Critical Reasoning").chapter).toBe(
      target("Critical Reasoning", "Statement & Conclusion").chapter
    );
  });
});

describe("house naming style", () => {
  const names = mappedChapters();

  it("uses no ampersands in a chapter or subtopic name", () => {
    const offenders: string[] = [];
    for (const t of Object.values(TAXONOMY_MAP)) {
      if (t.chapter.includes("&")) offenders.push(`chapter: ${t.chapter}`);
      if (t.subtopic.includes("&")) offenders.push(`subtopic: ${t.subtopic}`);
    }
    expect([...new Set(offenders)].sort()).toEqual([]);
  });

  it("has no chapter named Miscellaneous", () => {
    expect(names.filter((n) => /miscellaneous/i.test(n))).toEqual([]);
  });

  it("trims and single-spaces every name", () => {
    for (const t of Object.values(TAXONOMY_MAP)) {
      for (const n of [t.chapter, t.subtopic]) {
        expect(n).toBe(n.trim());
        expect(n).not.toMatch(/\s{2,}/);
      }
    }
  });

  it("keeps chapter count in a reviewable range", () => {
    expect(names.length).toBeGreaterThan(20);
    expect(names.length).toBeLessThan(60);
  });
});

describe("no two chapters are confusable", () => {
  // The map once had "Sequence and Series" (maths) AND "Series and Sequences"
  // (reasoning), and both landed in the same subject — 4 questions and 1, under
  // two names a reader cannot tell apart. The reasoning chapter is now "Pattern
  // Recognition". Two chapter names differing only in word order or plurals are
  // a naming bug, not two chapters.
  const bag = (name: string) =>
    name
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, " ")
      .split(/\s+/)
      .filter((w) => w && w !== "and" && w !== "the" && w !== "of")
      // Stemming must make "sequence"/"sequences" and "series"/"series" agree.
      // The first version stripped (ies|es|s), which turns "sequence" into
      // "sequence" but "sequences" into "sequenc" — so the bags differed and
      // the test passed WITHOUT catching the clash it was written for.
      .map((w) => w.replace(/ies$/, "y").replace(/s$/, ""))
      .sort()
      .join(" ");

  it("has no two chapter names with the same word bag", () => {
    const seen = new Map<string, string[]>();
    for (const name of mappedChapters()) {
      const k = bag(name);
      (seen.get(k) ?? seen.set(k, []).get(k)!).push(name);
    }
    expect([...seen.values()].filter((v) => v.length > 1)).toEqual([]);
  });

  it("has no two subtopics with the same word bag inside one chapter", () => {
    const seen = new Map<string, string[]>();
    for (const { chapter, subtopic } of mappedSubtopics()) {
      const k = `${chapter}||${bag(subtopic)}`;
      (seen.get(k) ?? seen.set(k, []).get(k)!).push(`${chapter} / ${subtopic}`);
    }
    expect([...seen.values()].filter((v) => v.length > 1)).toEqual([]);
  });
});
