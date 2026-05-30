import { describe, it, expect } from "vitest";
import { getQuestionResources } from "@/lib/links/questionResources";
import type { ResourceTags } from "@/lib/links/getResourceTagsForQuestions";

function call(
  input: {
    examName: string;
    subjectName: string;
    chapterName: string;
    subtopicName: string | null;
  },
  tags?: ResourceTags
) {
  return getQuestionResources(input, tags);
}

describe("getQuestionResources — exam scoping", () => {
  it("returns no resources for non-NDA exams (no MHT-CET guide yet)", () => {
    const res = call({
      examName: "MHT-CET",
      subjectName: "Maths",
      chapterName: "Integration",
      subtopicName: "Definite Integral Properties",
    });
    expect(res.guide).toBeNull();
    expect(res.notes).toBeNull();
  });

  it("returns no resources for an unknown exam", () => {
    const res = call({
      examName: "IPMAT",
      subjectName: "Maths",
      chapterName: "Algebra",
      subtopicName: "Quadratic Equations",
    });
    expect(res.guide).toBeNull();
    expect(res.notes).toBeNull();
  });
});

describe("getQuestionResources — NDA Mathematics", () => {
  it("links the NDA Maths overview for every Maths question (Template A — no per-chapter playbooks)", () => {
    const res = call({
      examName: "NDA",
      subjectName: "Mathematics",
      chapterName: "Functions",
      subtopicName: "Domain and Range",
    });
    expect(res.guide).not.toBeNull();
    expect(res.guide!.href).toBe("/guide/nda-maths");
    expect(res.guide!.label.toLowerCase()).toContain("nda maths");
  });

  it("links Statistics subtopics to their notes page", () => {
    const res = call({
      examName: "NDA",
      subjectName: "Mathematics",
      chapterName: "Statistics",
      subtopicName: "Measures of Central Tendency — Mean, Median, Mode",
    });
    expect(res.notes).not.toBeNull();
    expect(res.notes!.href).toBe(
      "/notes/nda-maths/statistics/central-tendency"
    );
  });

  it("links Vectors subtopics to their notes page", () => {
    const res = call({
      examName: "NDA",
      subjectName: "Mathematics",
      chapterName: "Vectors",
      subtopicName: "Dot Product and Angle",
    });
    expect(res.notes).not.toBeNull();
    expect(res.notes!.href).toBe(
      "/notes/nda-maths/vectors/dot-product-angle"
    );
  });

  it("returns guide-only for a Maths chapter without notes content", () => {
    const res = call({
      examName: "NDA",
      subjectName: "Mathematics",
      chapterName: "Trigonometry — I",
      subtopicName: "Compound Angle Identities",
    });
    expect(res.guide).not.toBeNull();
    expect(res.notes).toBeNull();
  });

  it("returns guide-only when subtopic is null on a notes-covered chapter", () => {
    // Defensive: a Statistics question with no subtopic still gets the guide link
    const res = call({
      examName: "NDA",
      subjectName: "Mathematics",
      chapterName: "Statistics",
      subtopicName: null,
    });
    expect(res.guide).not.toBeNull();
    expect(res.notes).toBeNull();
  });
});

describe("getQuestionResources — NDA English (subtopic-grain playbooks)", () => {
  it("links the matching playbook by chapter+subtopic", () => {
    const res = call({
      examName: "NDA",
      subjectName: "English",
      chapterName: "Vocabulary",
      subtopicName: "Synonyms",
    });
    expect(res.guide).not.toBeNull();
    expect(res.guide!.href).toBe(
      "/guide/nda-english/playbooks/vocab-synonyms"
    );
  });

  it("returns no guide when the subtopic isn't covered by a playbook", () => {
    const res = call({
      examName: "NDA",
      subjectName: "English",
      chapterName: "Vocabulary",
      subtopicName: "Some Unmapped Subtopic XYZ",
    });
    expect(res.guide).toBeNull();
  });

  it("returns no guide for English when subtopic is null (playbooks are per-subtopic)", () => {
    const res = call({
      examName: "NDA",
      subjectName: "English",
      chapterName: "Vocabulary",
      subtopicName: null,
    });
    expect(res.guide).toBeNull();
  });

  it("returns no notes for English (no notes shipped)", () => {
    const res = call({
      examName: "NDA",
      subjectName: "English",
      chapterName: "Vocabulary",
      subtopicName: "Synonyms",
    });
    expect(res.notes).toBeNull();
  });
});

describe("getQuestionResources — NDA Physics (chapter-grain playbooks)", () => {
  it("links the playbook by chapter (subtopic-agnostic)", () => {
    const res = call({
      examName: "NDA",
      subjectName: "Physics",
      chapterName: "Sound",
      subtopicName: "Applications — SONAR, Transducers, Instruments",
    });
    expect(res.guide).not.toBeNull();
    expect(res.guide!.href).toBe("/guide/nda-physics/playbooks/sound");
  });

  it("links the playbook even when subtopic is null", () => {
    const res = call({
      examName: "NDA",
      subjectName: "Physics",
      chapterName: "Modern Physics",
      subtopicName: null,
    });
    expect(res.guide).not.toBeNull();
    expect(res.guide!.href).toBe("/guide/nda-physics/playbooks/modern-physics");
  });

  it("returns no guide for an unknown chapter", () => {
    const res = call({
      examName: "NDA",
      subjectName: "Physics",
      chapterName: "Time Machines",
      subtopicName: null,
    });
    expect(res.guide).toBeNull();
  });
});

describe("getQuestionResources — NDA Chemistry / Biology / Geography", () => {
  it("links NDA Chemistry playbook by chapter", () => {
    const res = call({
      examName: "NDA",
      subjectName: "Chemistry",
      chapterName: "Carbon and Its Compounds",
      subtopicName: "Allotropes of Carbon",
    });
    expect(res.guide!.href).toBe(
      "/guide/nda-chemistry/playbooks/carbon-and-its-compounds"
    );
  });

  it("links NDA Biology playbook by chapter", () => {
    const res = call({
      examName: "NDA",
      subjectName: "Biology",
      chapterName: "Cell Biology",
      subtopicName: "Cell Organelles",
    });
    expect(res.guide!.href).toBe("/guide/nda-biology/playbooks/cell-biology");
  });

  it("links NDA Geography playbook by chapter", () => {
    const res = call({
      examName: "NDA",
      subjectName: "Geography",
      chapterName: "Indian Geography — Economy, Resources and Transport",
      subtopicName: "Agriculture, Crops, Soils and Land Use",
    });
    expect(res.guide!.href).toBe(
      "/guide/nda-geography/playbooks/indian-geography-economy"
    );
  });
});

describe("getQuestionResources — NDA subjects without a guide", () => {
  it("returns null for an unknown NDA subject we haven't guided", () => {
    const res = call({
      examName: "NDA",
      subjectName: "Unknown Imaginary Subject",
      chapterName: "Anything",
      subtopicName: "Anything",
    });
    expect(res.guide).toBeNull();
    expect(res.notes).toBeNull();
  });
});

describe("getQuestionResources — NDA Economics (single-page landing, no playbooks)", () => {
  it("links the NDA Economics landing for every Economics question", () => {
    const res = call({
      examName: "NDA",
      subjectName: "Economics",
      chapterName: "Indian Economy",
      subtopicName: "Five Year Plans and Indian Planning",
    });
    expect(res.guide).not.toBeNull();
    expect(res.guide!.href).toBe("/guide/nda-economics");
    expect(res.guide!.label.toLowerCase()).toContain("economics");
    expect(res.notes).toBeNull();
  });

  it("still links the landing when subtopic is null (single-page guide is chapter-agnostic)", () => {
    const res = call({
      examName: "NDA",
      subjectName: "Economics",
      chapterName: "Indian Economy",
      subtopicName: null,
    });
    expect(res.guide).not.toBeNull();
    expect(res.guide!.href).toBe("/guide/nda-economics");
  });
});

describe("getQuestionResources — NDA History (per-chapter playbook)", () => {
  it("returns the chapter playbook chip for NDA History Modern India", () => {
    const res = call({
      examName: "NDA",
      subjectName: "History",
      chapterName: "Modern India",
      subtopicName: "Freedom Movement — INC, Gandhi and Independence",
    });
    expect(res.guide?.href).toBe("/guide/nda-history/playbooks/modern-india");
    expect(res.guide?.label).toBe("Playbook: Modern India");
    expect(res.notes).toBeNull();
  });

  it("returns null guide for an unknown NDA History chapter", () => {
    const res = call({
      examName: "NDA",
      subjectName: "History",
      chapterName: "Imaginary Chapter",
      subtopicName: null,
    });
    expect(res.guide).toBeNull();
  });
});

describe("getQuestionResources — NDA Current Affairs (single-page Template D, no playbooks)", () => {
  it.each([
    [
      "International Affairs and Relations",
      "India's Foreign Policy and Bilateral Relations",
    ],
    [
      "Government Schemes, Policy and Governance",
      "Health, Education and Welfare Schemes",
    ],
    [
      "Defence and Military Exercises",
      "Military Exercises — Bilateral and Multilateral",
    ],
    ["Sports", "Cricket — Records, Tournaments and Players"],
    ["Science and Technology", "Space Technology and Astronomy"],
    [
      "Awards, Honours, Books and Culture",
      "Civilian Awards, Honours and Educational Institutions",
    ],
    [
      "National Events, Persons and India General Knowledge",
      "Indian Economy, Geography and Resources",
    ],
    ["Environment, Ecology and Energy", "Ramsar Sites, Wetlands and Protected Areas"],
  ])(
    "links the NDA Current Affairs landing for chapter %s",
    (chapter, subtopic) => {
      const res = call({
        examName: "NDA",
        subjectName: "Current Affairs",
        chapterName: chapter,
        subtopicName: subtopic,
      });
      expect(res.guide).not.toBeNull();
      expect(res.guide!.href).toBe("/guide/nda-current-affairs");
      expect(res.guide!.label.toLowerCase()).toContain("current affairs");
      expect(res.notes).toBeNull();
    }
  );

  it("still links the landing when subtopic is null (single-page guide is chapter-agnostic)", () => {
    const res = call({
      examName: "NDA",
      subjectName: "Current Affairs",
      chapterName: "Sports",
      subtopicName: null,
    });
    expect(res.guide).not.toBeNull();
    expect(res.guide!.href).toBe("/guide/nda-current-affairs");
  });
});

describe("getQuestionResources — NDA Polity (per-chapter playbook)", () => {
  it("returns the chapter playbook chip for NDA Polity Government Structure", () => {
    const res = call({
      examName: "NDA",
      subjectName: "Polity",
      chapterName:
        "Government Structure — Parliament, Judiciary and Constitutional Bodies",
      subtopicName: "Constitutional Bodies and Offices",
    });
    expect(res.guide?.href).toBe(
      "/guide/nda-polity/playbooks/government-structure"
    );
    expect(res.guide?.label).toContain("Playbook:");
    expect(res.notes).toBeNull();
  });

  it("returns null guide for an unknown NDA Polity chapter", () => {
    const res = call({
      examName: "NDA",
      subjectName: "Polity",
      chapterName: "Imaginary Chapter",
      subtopicName: null,
    });
    expect(res.guide).toBeNull();
  });
});

describe("getQuestionResources — principle-tag override (Tier 1.5)", () => {
  it("replaces the generic NDA Maths chip with a principle-specific link when a TOP_11 slug is tagged", () => {
    const res = call(
      {
        examName: "NDA",
        subjectName: "Mathematics",
        chapterName: "Probability",
        subtopicName: "Conditional Probability and Bayes",
      },
      {
        principleSlugs: ["vieta-symmetric-roots"],
        conceptTags: [],
      }
    );
    expect(res.guide).not.toBeNull();
    expect(res.guide!.href).toBe(
      "/guide/nda-maths/principles/vieta-symmetric-roots"
    );
    expect(res.guide!.label.toLowerCase()).toContain("vieta");
  });

  it("uses the FIRST principle slug when a question has multiple", () => {
    const res = call(
      {
        examName: "NDA",
        subjectName: "Mathematics",
        chapterName: "Statistics",
        subtopicName: "Measures of Central Tendency — Mean, Median, Mode",
      },
      {
        principleSlugs: [
          "am-gm-mean-inequalities",
          "vieta-symmetric-roots",
        ],
        conceptTags: [],
      }
    );
    expect(res.guide!.href).toBe(
      "/guide/nda-maths/principles/am-gm-mean-inequalities"
    );
  });

  it("falls back to the generic NDA Maths chip when the principle slug isn't TOP_11", () => {
    const res = call(
      {
        examName: "NDA",
        subjectName: "Mathematics",
        chapterName: "Probability",
        subtopicName: "Conditional Probability and Bayes",
      },
      {
        principleSlugs: ["some-long-tail-principle-with-no-detail-page"],
        conceptTags: [],
      }
    );
    expect(res.guide).not.toBeNull();
    expect(res.guide!.href).toBe("/guide/nda-maths");
  });

  it("falls back to the playbook chip for NDA Physics (principle tags only exist for Maths today)", () => {
    const res = call(
      {
        examName: "NDA",
        subjectName: "Physics",
        chapterName: "Sound",
        subtopicName: "Applications — SONAR, Transducers, Instruments",
      },
      {
        principleSlugs: ["am-gm-mean-inequalities"],
        conceptTags: [],
      }
    );
    // Subject isn't Mathematics — principle override should not fire even
    // if a slug happens to be in TOP_11. The chapter playbook still wins.
    expect(res.guide!.href).toBe("/guide/nda-physics/playbooks/sound");
  });
});

describe("getQuestionResources — concept-tag override (Tier 1.5)", () => {
  it("replaces the generic Concept notes chip with a concept-anchored link", () => {
    const res = call(
      {
        examName: "NDA",
        subjectName: "Mathematics",
        chapterName: "Statistics",
        subtopicName: "Measures of Central Tendency — Mean, Median, Mode",
      },
      {
        principleSlugs: [],
        conceptTags: [
          {
            subtopicSlug: "central-tendency",
            conceptSlug: "arithmetic-mean-raw",
          },
        ],
      }
    );
    expect(res.notes).not.toBeNull();
    expect(res.notes!.href).toBe(
      "/notes/nda-maths/statistics/central-tendency#arithmetic-mean-raw"
    );
    expect(res.notes!.label.toLowerCase()).toContain("arithmetic");
  });

  it("uses the FIRST concept tag when a question has multiple", () => {
    const res = call(
      {
        examName: "NDA",
        subjectName: "Mathematics",
        chapterName: "Statistics",
        subtopicName: "Measures of Central Tendency — Mean, Median, Mode",
      },
      {
        principleSlugs: [],
        conceptTags: [
          {
            subtopicSlug: "central-tendency",
            conceptSlug: "arithmetic-mean-raw",
          },
          {
            subtopicSlug: "central-tendency",
            conceptSlug: "arithmetic-mean-grouped",
          },
        ],
      }
    );
    expect(res.notes!.href).toBe(
      "/notes/nda-maths/statistics/central-tendency#arithmetic-mean-raw"
    );
  });

  it("falls back to the generic Concept notes chip when the concept slug doesn't resolve", () => {
    const res = call(
      {
        examName: "NDA",
        subjectName: "Mathematics",
        chapterName: "Statistics",
        subtopicName: "Measures of Central Tendency — Mean, Median, Mode",
      },
      {
        principleSlugs: [],
        conceptTags: [
          { subtopicSlug: "central-tendency", conceptSlug: "bogus-slug" },
        ],
      }
    );
    expect(res.notes).not.toBeNull();
    expect(res.notes!.href).toBe(
      "/notes/nda-maths/statistics/central-tendency"
    );
  });

  it("applies both overrides when both tag kinds are present", () => {
    const res = call(
      {
        examName: "NDA",
        subjectName: "Mathematics",
        chapterName: "Vectors",
        subtopicName: "Dot Product and Angle",
      },
      {
        principleSlugs: ["am-gm-mean-inequalities"],
        conceptTags: [
          {
            subtopicSlug: "dot-product-angle",
            conceptSlug: "perpendicularity-test",
          },
        ],
      }
    );
    expect(res.guide!.href).toBe(
      "/guide/nda-maths/principles/am-gm-mean-inequalities"
    );
    expect(res.notes!.href).toContain(
      "/notes/nda-maths/vectors/dot-product-angle#"
    );
  });
});
