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
    expect(notesChapterTitle(c)).toBe("Alkanes — MHT-CET Chemistry Chapter Notes · PYQ Vault");
  });

  it("never show the retired 'digital board' phrase", () => {
    expect(titles.filter((t) => /digital board/i.test(t.title))).toEqual([]);
  });
});
