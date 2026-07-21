import { describe, expect, it } from "vitest";
import { NOTES_CHAPTERS } from "@/lib/notes/chapters";
import {
  buildChapterLearnPath,
  buildLearnPath,
  canonicalSubjectName,
  corpusForSubject,
  getChapterByName,
  getSubtopicByName,
  getSubtopicBySlug,
} from "@/lib/notes/goLinks";

// Pull a real (chapter, subtopicSlug, concept) triple from the registry so the
// test tracks live content instead of hard-coded slugs.
const sampleChapter = NOTES_CHAPTERS[0];
const sampleSubtopicSlug = sampleChapter.slugs[0];
const sampleNote = sampleChapter.notes[sampleSubtopicSlug];
const sampleConceptSlug = sampleNote.concepts[0].slug;
const sampleChapterName = sampleChapter.chapter.chapterName;
const sampleSubtopicName = sampleNote.subtopicName;

describe("getSubtopicBySlug", () => {
  it("resolves a known notes subtopic slug to its full location", () => {
    const loc = getSubtopicBySlug(sampleSubtopicSlug);
    expect(loc).not.toBeNull();
    expect(loc).toMatchObject({
      examName: sampleChapter.examName,
      subjectName: sampleChapter.subjectName,
      subjectRoute: sampleChapter.subjectRoute,
      chapterSlug: sampleChapter.chapterSlug,
      chapterName: sampleChapter.chapter.chapterName,
      subtopicSlug: sampleSubtopicSlug,
      subtopicName: sampleNote.subtopicName,
    });
    expect(loc!.conceptSlugs).toContain(sampleConceptSlug);
  });

  it("returns null for an unknown slug", () => {
    expect(getSubtopicBySlug("not-a-real-subtopic-slug")).toBeNull();
  });

  it("returns null for empty / nullish input", () => {
    expect(getSubtopicBySlug(null)).toBeNull();
    expect(getSubtopicBySlug(undefined)).toBeNull();
    expect(getSubtopicBySlug("")).toBeNull();
  });

  it("every notes subtopic slug is globally unique (one location each)", () => {
    const seen = new Set<string>();
    for (const ch of NOTES_CHAPTERS) {
      for (const slug of ch.slugs) {
        expect(seen.has(slug), `duplicate subtopic slug: ${slug}`).toBe(false);
        seen.add(slug);
      }
    }
  });
});

describe("buildLearnPath", () => {
  it("builds the subtopic notes path with a valid concept anchor", () => {
    const path = buildLearnPath(sampleSubtopicSlug, sampleConceptSlug);
    expect(path).toBe(
      `/notes/${sampleChapter.subjectRoute}/${sampleChapter.chapterSlug}/${sampleSubtopicSlug}#${sampleConceptSlug}`
    );
  });

  it("drops the anchor when the concept is unknown for the subtopic", () => {
    const path = buildLearnPath(sampleSubtopicSlug, "bogus-concept-slug");
    expect(path).toBe(
      `/notes/${sampleChapter.subjectRoute}/${sampleChapter.chapterSlug}/${sampleSubtopicSlug}`
    );
  });

  it("omits the anchor entirely when no concept is given", () => {
    const path = buildLearnPath(sampleSubtopicSlug);
    expect(path).toBe(
      `/notes/${sampleChapter.subjectRoute}/${sampleChapter.chapterSlug}/${sampleSubtopicSlug}`
    );
    expect(path).not.toContain("#");
  });

  it("returns null when the subtopic slug doesn't resolve", () => {
    expect(buildLearnPath("not-real", "x")).toBeNull();
    expect(buildLearnPath(null)).toBeNull();
  });

  it("resolves by DB name when given a name + chapter (exam path)", () => {
    const path = buildLearnPath(sampleSubtopicName, null, sampleChapterName);
    expect(path).toBe(
      `/notes/${sampleChapter.subjectRoute}/${sampleChapter.chapterSlug}/${sampleSubtopicSlug}`
    );
  });

  it("returns null for a name with no chapter context", () => {
    expect(buildLearnPath(sampleSubtopicName)).toBeNull();
  });
});

describe("getSubtopicByName (exam path)", () => {
  it("resolves a (chapterName, subtopicName) pair", () => {
    const loc = getSubtopicByName(sampleChapterName, sampleSubtopicName);
    expect(loc?.subtopicSlug).toBe(sampleSubtopicSlug);
  });

  it("returns null for unknown names or missing args", () => {
    expect(getSubtopicByName(sampleChapterName, "Nope")).toBeNull();
    expect(getSubtopicByName(null, sampleSubtopicName)).toBeNull();
    expect(getSubtopicByName(sampleChapterName, null)).toBeNull();
  });
});

describe("getChapterByName (chapter-level path)", () => {
  it("resolves a shipped chapter name to its location", () => {
    const loc = getChapterByName(sampleChapterName);
    expect(loc).not.toBeNull();
    expect(loc?.chapterSlug).toBe(sampleChapter.chapterSlug);
    expect(loc?.subjectRoute).toBe(sampleChapter.subjectRoute);
  });

  it("returns null for unknown / missing input", () => {
    expect(getChapterByName("No Such Chapter XYZ")).toBeNull();
    expect(getChapterByName("")).toBeNull();
    expect(getChapterByName(null)).toBeNull();
    expect(getChapterByName(undefined)).toBeNull();
  });
});

describe("buildChapterLearnPath", () => {
  it("builds the chapter-level notes index path", () => {
    expect(buildChapterLearnPath(sampleChapterName)).toBe(
      `/notes/${sampleChapter.subjectRoute}/${sampleChapter.chapterSlug}`
    );
  });

  it("returns null when the chapter has no notes", () => {
    expect(buildChapterLearnPath("No Such Chapter XYZ")).toBeNull();
    expect(buildChapterLearnPath(null)).toBeNull();
  });
});

describe("subject helpers", () => {
  it("canonicalSubjectName maps the Maths alias, passes others through", () => {
    expect(canonicalSubjectName("Maths")).toBe("Mathematics");
    expect(canonicalSubjectName("Mathematics")).toBe("Mathematics");
    expect(canonicalSubjectName("English")).toBe("English");
    expect(canonicalSubjectName("  Maths ")).toBe("Mathematics");
  });

  it("corpusForSubject picks practice for Maths, pyq otherwise", () => {
    expect(corpusForSubject("Maths")).toBe("practice");
    expect(corpusForSubject("Mathematics")).toBe("practice");
    expect(corpusForSubject("English")).toBe("pyq");
    expect(corpusForSubject("Physics")).toBe("pyq");
  });
});
