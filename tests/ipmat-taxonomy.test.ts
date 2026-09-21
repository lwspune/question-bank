// Spec for the IPMAT taxonomy mapping (scripts/ipmat/taxonomy.ts).
//
// The source ships its own topic/subtopic labels. They are afterboards'
// editorial work, and they are also DIRTY: three spellings of Active & Passive,
// two of Linear Equation(s), two of Direct & Indirect, singular and plural Bar
// Graph(s), and `Tabular Data` living under two different topics. So the map
// re-authors every pair to our own names, in the house style the CDS corpus
// already uses (spell "and" out, no ampersands) because CDS is the closest
// analogue in the bank — an aptitude exam over the same ground.
//
// TWO AXES, KEPT SEPARATE. The SUBJECT comes from the paper's SECTION, and the
// CHAPTER/SUBTOPIC from the source topic. They are independent: a question
// tagged `Logical Reasoning > Logical Sequence` can sit in the QA section (it
// does, three times), and the section is where the exam actually put it.
//
// THE TEST THAT MATTERS IS COMPLETENESS IN BOTH DIRECTIONS. A forward-only
// check cannot catch an omission — an unmapped source pair would silently lose
// its questions — and a reverse-only check cannot catch a mapping entry that
// matches nothing, which is how a map rots after the source is re-fetched.
import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import {
  SECTION_SUBJECTS,
  TAXONOMY_MAP,
  sourceKey,
  resolveTaxonomy,
  mappedChapters,
  mappedSubtopics,
} from "../scripts/ipmat/taxonomy";
import { IPMAT_EXAMS, type IpmatExamSlug } from "../scripts/ipmat/config";

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

describe("SECTION_SUBJECTS", () => {
  it("names a subject for every section of every exam", () => {
    for (const exam of IPMAT_EXAMS) {
      for (const section of exam.sections) {
        expect(SECTION_SUBJECTS[exam.slug][section], `${exam.slug}/${section}`).toBeTruthy();
      }
    }
  });

  it("declares no section an exam does not have", () => {
    for (const exam of IPMAT_EXAMS) {
      for (const section of Object.keys(SECTION_SUBJECTS[exam.slug])) {
        expect(exam.sections, `${exam.slug}/${section}`).toContain(section);
      }
    }
  });

  it("splits Indore's quant by answer format, which is what its sections mean", () => {
    // SA and MCQ carry the same seven quant topics; the split is typed answer vs
    // four options. The subject NAMES have to say so, or the duplication looks
    // like an error rather than the paper's own structure.
    expect(SECTION_SUBJECTS["ipmat-indore"].SA).toMatch(/Quantitative/);
    expect(SECTION_SUBJECTS["ipmat-indore"].MCQ).toMatch(/Quantitative/);
    expect(SECTION_SUBJECTS["ipmat-indore"].SA).not.toBe(SECTION_SUBJECTS["ipmat-indore"].MCQ);
  });

  it("gives the other two exams a plain subject per section", () => {
    for (const slug of ["ipmat-rohtak", "jipmat"] as const) {
      expect(SECTION_SUBJECTS[slug].QA).toBe("Quantitative Ability");
      expect(SECTION_SUBJECTS[slug].LR).toBe("Logical Reasoning");
      expect(SECTION_SUBJECTS[slug].VA).toBe("Verbal Ability");
    }
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
      const t = resolveTaxonomy(r.exam, r.section, r.sourceTopic, r.sourceSubTopic);
      if (!t || !t.subject || !t.chapter || !t.subtopic) {
        bad.push(`${r.exam}/${r.section}/${sourceKey(r.sourceTopic, r.sourceSubTopic)}`);
      }
    }
    expect(bad).toEqual([]);
  });
});

describe("TAXONOMY_MAP completeness — reverse", () => {
  it("has NO entry that matches nothing in the corpus", () => {
    // Catches a map that has rotted against a re-fetched source. A forward-only
    // check is blind to this.
    const present = new Set(builtRows().map((r) => sourceKey(r.sourceTopic, r.sourceSubTopic)));
    const dead = Object.keys(TAXONOMY_MAP).filter((k) => !present.has(k));
    expect(dead.sort()).toEqual([]);
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
    // JIPMAT files it under Logical Reasoning, Indore under Data
    // Interpretation. It is the same skill and belongs in one place.
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
    // CDS spells "and" out; NDA's "Matrices & Determinants" is the older style
    // and is not being copied into a new corpus.
    const offenders: string[] = [];
    for (const t of Object.values(TAXONOMY_MAP)) {
      if (t.chapter.includes("&")) offenders.push(`chapter: ${t.chapter}`);
      if (t.subtopic.includes("&")) offenders.push(`subtopic: ${t.subtopic}`);
    }
    expect([...new Set(offenders)].sort()).toEqual([]);
  });

  it("has no chapter named Miscellaneous", () => {
    // A catch-all chapter collects everything that does not fit and rots the
    // bank's usefulness — a standing lesson in this project. A catch-all
    // SUBTOPIC inside a real chapter is tolerated; a chapter is not.
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
    // CDS Mathematics runs 26 chapters over a comparable syllabus. Far more
    // than that means the map is echoing the source's subtopics as chapters.
    expect(names.length).toBeGreaterThan(20);
    expect(names.length).toBeLessThan(60);
  });
});

describe("resolveTaxonomy", () => {
  it("takes the subject from the SECTION, not from the topic", () => {
    // The same source topic lands in a different subject depending on which
    // section of the paper it appeared in.
    const asQa = resolveTaxonomy("jipmat", "QA", "Logical Reasoning", "Logical Sequence");
    const asLr = resolveTaxonomy("jipmat", "LR", "Logical Reasoning", "Logical Sequence");
    expect(asQa!.subject).toBe("Quantitative Ability");
    expect(asLr!.subject).toBe("Logical Reasoning");
    expect(asQa!.chapter).toBe(asLr!.chapter);
  });

  it("returns null for an unknown section rather than guessing a subject", () => {
    expect(resolveTaxonomy("jipmat", "SA", "Algebra", "Indices")).toBeNull();
  });

  it("returns null for an unmapped source pair", () => {
    expect(resolveTaxonomy("jipmat", "QA", "Astrology", "Star Signs")).toBeNull();
  });
});

describe("no two chapters are confusable", () => {
  // Caught by the taxonomy report, not by any check above: the map had
  // "Sequence and Series" (the maths chapter) AND "Series and Sequences" (the
  // reasoning chapter), and BOTH landed in Rohtak's Quantitative Ability
  // subject — 4 questions and 1 question, under two names a reader cannot
  // tell apart. Two chapter names that differ only in word order or plurals
  // are a naming bug, not two chapters.
  const bag = (name: string) =>
    name
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, " ")
      .split(/\s+/)
      .filter((w) => w && w !== "and" && w !== "the" && w !== "of")
      // Stemming must make "sequence"/"sequences" and "series"/"series" agree.
      // The first version stripped (ies|es|s), which turns "sequence" into
      // "sequence" but "sequences" into "sequenc" -- so the bags differed and
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
    const clashes = [...seen.values()].filter((v) => v.length > 1);
    expect(clashes).toEqual([]);
  });

  it("has no two subtopics with the same word bag inside one chapter", () => {
    const seen = new Map<string, string[]>();
    for (const { chapter, subtopic } of mappedSubtopics()) {
      const k = `${chapter}||${bag(subtopic)}`;
      (seen.get(k) ?? seen.set(k, []).get(k)!).push(`${chapter} / ${subtopic}`);
    }
    const clashes = [...seen.values()].filter((v) => v.length > 1);
    expect(clashes).toEqual([]);
  });
});
