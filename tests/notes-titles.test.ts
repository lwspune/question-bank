import { describe, it, expect } from "vitest";
import { NOTES_CHAPTERS } from "@/lib/notes/chapters";
import { getNotesExamGroups } from "@/lib/notes/notesNav";
import { TITLE_MAX } from "@/lib/seo/title";
import {
  notesSubtopicTitle,
  notesChapterTitle,
  notesSubjectTitle,
  notesExamTitle,
  NOTES_INDEX_TITLE,
  notesChapterDescription,
  notesSubjectDescription,
  notesExamDescription,
  NOTES_INDEX_DESCRIPTION,
} from "@/lib/notes/titles";

/**
 * Every /notes <title>, built from the live registry: none over the length a
 * search result shows, and no two pages sharing one. A duplicate title tells a
 * search engine two pages are the same page.
 */
function allNotesTitles(): { where: string; title: string }[] {
  const out: { where: string; title: string }[] = [{ where: "/notes", title: NOTES_INDEX_TITLE }];
  for (const g of getNotesExamGroups()) out.push({ where: `/notes/${g.slug}`, title: notesExamTitle(g.examName) });
  const subjects = new Map<string, string>();
  for (const c of NOTES_CHAPTERS) {
    subjects.set(c.subjectRoute, c.subjectDisplay);
    const base = `/notes/${c.subjectRoute}/${c.chapterSlug}`;
    out.push({ where: base, title: notesChapterTitle(c) });
    for (const slug of Object.keys(c.notes)) {
      out.push({ where: `${base}/${slug}`, title: notesSubtopicTitle(c, slug)! });
    }
  }
  for (const [route, display] of subjects) out.push({ where: `/notes/${route}`, title: notesSubjectTitle(display) });
  return out;
}

describe("/notes titles", () => {
  const titles = allNotesTitles();

  it("covers the registry", () => {
    expect(titles.length).toBeGreaterThan(500);
  });

  it(`are all ${TITLE_MAX} characters or less`, () => {
    const long = titles.filter((t) => t.title.length > TITLE_MAX).map((t) => `${t.title.length} ${t.where} | ${t.title}`);
    expect(long).toEqual([]);
  });

  it("are all distinct", () => {
    const seen = new Map<string, string[]>();
    for (const t of titles) seen.set(t.title, [...(seen.get(t.title) ?? []), t.where]);
    const dups = [...seen].filter(([, w]) => w.length > 1).map(([t, w]) => `${t} <- ${w.join(", ")}`);
    expect(dups).toEqual([]);
  });

  it("name a chapter page as the chapter, not as one of its topics", () => {
    const c = NOTES_CHAPTERS.find((x) => x.subjectRoute === "mht-cet-chemistry" && x.chapterSlug === "alkanes")!;
    expect(notesChapterTitle(c)).toBe("Alkanes: MHT-CET Chemistry Notes (Free PDF) · PYQ Vault");
  });

  /**
   * 2026-10-15: asked "where can I get NDA maths notes", ChatGPT answered
   * "free NDA Maths notes PDF chapter-wise" and named three other sites. Ours
   * were titled "Teaching Notes" and never said free, chapter-wise or PDF,
   * though every chapter has a free PDF handout. Titles use the words students
   * search, and no em dash.
   */
  it("title hubs in the words students search", () => {
    expect(notesSubjectTitle("NDA Maths")).toBe("NDA Maths Notes: Free Chapter-wise PDF · PYQ Vault");
    expect(notesExamTitle("NDA")).toBe("NDA Notes: Free Chapter-wise PDF · PYQ Vault");
    expect(NOTES_INDEX_TITLE).toBe("Free Chapter-wise Notes for Entrance & Board Exams (PDF)");
  });

  it("never say 'Teaching' or carry an em dash on a hub or chapter page", () => {
    const hubsAndChapters = titles.filter((t) => t.where.split("/").length <= 4);
    expect(hubsAndChapters.filter((t) => /teaching|\u2014/i.test(t.title))).toEqual([]);
  });

  it("keep 'Free PDF' on nearly every chapter page, dropping it only when the name is too long", () => {
    // 17 of 266 on 2026-10-15, all long names ("Chemical Bonding and Molecular
    // Structure"). There the exam and subject win: they are what a student types.
    const chapters = NOTES_CHAPTERS.map((c) => notesChapterTitle(c));
    const without = chapters.filter((t) => !t.includes("Free PDF"));
    expect(without.length / chapters.length).toBeLessThan(0.1);
    for (const t of chapters) expect(t).toMatch(/Notes/);
  });

  it("describe every hub and chapter as free notes with a PDF, the key words first", () => {
    const descs = [
      NOTES_INDEX_DESCRIPTION,
      ...getNotesExamGroups().map((g) => notesExamDescription(g.examName, g.subjects.length, g.subjects.reduce((n, s) => n + s.chapterCount, 0))),
      notesSubjectDescription("NDA Maths", 30),
      ...NOTES_CHAPTERS.map((c) => notesChapterDescription(c)),
    ];
    for (const d of descs) {
      expect(d.slice(0, 60)).toMatch(/free/i);
      expect(d).toMatch(/PDF/);
      // The generated lead only: a chapter's own authored line follows it unchanged.
      expect(d.split(". ")[0]).not.toMatch(/\u2014/);
    }
    expect(notesSubjectDescription("NDA Maths", 30)).toBe(
      "Free chapter-wise NDA Maths notes: 30 chapters, each with worked examples, formulas and the traps that cost marks. Read online, or download any chapter as a PDF with a free sign-in."
    );
    expect(notesSubjectDescription("X", 1)).toContain("1 chapter, ");
  });

  it("never show the retired 'digital board' phrase", () => {
    expect(titles.filter((t) => /digital board/i.test(t.title))).toEqual([]);
  });
});
