/**
 * IMAT notes: the contract for the niche site's teaching notes.
 *
 * The notes reuse the /notes data shapes (SubtopicNote, ConceptUnit) so the
 * shared renderer draws them, but they live in their own registry,
 * IMAT_NOTES_CHAPTERS, because PYQ Vault must show nothing of IMAT
 * (NICHE_SITES_SPEC.md). Everything NOTES_CHAPTERS feeds (nav, sitemap,
 * /notes index, notes-lint) never sees them.
 *
 * Two differences from PYQ Vault notes, both pinned by checkImatChapter:
 *   1. No featured past question (`pyqExampleId`). Every IMAT row is PRIVATE,
 *      and 2011-2022 can never be published, so the notes are fully authored.
 *   2. The exam-transfer rung is the self-check, written as an IMAT item:
 *      five options, one correct, the correct letter varying across a chapter.
 */
import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { NOTES_CHAPTERS } from "@/lib/notes/chapters";
import { IMAT_NOTES_CHAPTERS, IMAT_NOTES_SUBJECTS } from "@/lib/sites/imat/notes/registry";
import { checkImatChapter } from "@/lib/sites/imat/notes/checks";
import { loadBankChapters } from "../scripts/imat/notes/bank";

const ROOT = process.cwd();
const BANK = loadBankChapters(join(ROOT, "scripts", "imat", "data"));

function listFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? listFiles(p) : [p];
  });
}

describe("IMAT notes stay off PYQ Vault", () => {
  it("NOTES_CHAPTERS carries no IMAT chapter", () => {
    expect(
      NOTES_CHAPTERS.filter((c) => c.examName === "IMAT" || c.subjectRoute.startsWith("imat"))
    ).toEqual([]);
  });

  it("only the IMAT tree and its staff preview import the IMAT notes", () => {
    const allowed = [join("src", "lib", "sites", "imat"), join("src", "app", "dashboard", "imat-notes")];
    const offenders = listFiles(join(ROOT, "src"))
      .filter((f) => /\.(ts|tsx)$/.test(f))
      .filter((f) => readFileSync(f, "utf8").includes("sites/imat/notes"))
      .map((f) => relative(ROOT, f))
      .filter((f) => !allowed.some((a) => f.startsWith(a)));
    expect(offenders).toEqual([]);
  });
});

describe("IMAT notes registry", () => {
  it("files every chapter under the subject the bank gives it", () => {
    for (const c of IMAT_NOTES_CHAPTERS) {
      expect(c.examName).toBe("IMAT");
      expect(BANK.get(c.chapter.chapterName)?.subject, c.chapter.chapterName).toBe(c.subjectName);
      const subject = IMAT_NOTES_SUBJECTS.find((s) => s.subjectRoute === c.subjectRoute);
      expect(subject?.subjectName, c.subjectRoute).toBe(c.subjectName);
    }
  });

  it("covers every chapter in the bank, exactly once", () => {
    const names = IMAT_NOTES_CHAPTERS.map((c) => c.chapter.chapterName);
    expect(new Set(names).size).toBe(names.length);
    expect([...BANK.keys()].filter((n) => !names.includes(n))).toEqual([]);
  });

  it("keeps chapter slugs unique within a subject", () => {
    const keys = IMAT_NOTES_CHAPTERS.map((c) => `${c.subjectRoute}/${c.chapterSlug}`);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it("keeps page and concept slugs globally unique, apart from PYQ Vault's", () => {
    const pyqvSub = new Set(NOTES_CHAPTERS.flatMap((c) => Object.keys(c.notes)));
    const pyqvConcept = new Set(
      NOTES_CHAPTERS.flatMap((c) => Object.values(c.notes).flatMap((n) => n.concepts.map((k) => k.slug)))
    );
    const sub = IMAT_NOTES_CHAPTERS.flatMap((c) => Object.keys(c.notes));
    const concept = IMAT_NOTES_CHAPTERS.flatMap((c) =>
      Object.values(c.notes).flatMap((n) => n.concepts.map((k) => k.slug))
    );
    expect(sub.filter((s, i) => sub.indexOf(s) !== i)).toEqual([]);
    expect(concept.filter((s, i) => concept.indexOf(s) !== i)).toEqual([]);
    expect(sub.filter((s) => pyqvSub.has(s))).toEqual([]);
    expect(concept.filter((s) => pyqvConcept.has(s))).toEqual([]);
  });
});

describe("IMAT notes content", () => {
  for (const c of IMAT_NOTES_CHAPTERS) {
    it(`${c.subjectRoute}/${c.chapterSlug} meets the content contract`, () => {
      expect(checkImatChapter(c, BANK.get(c.chapter.chapterName))).toEqual([]);
    });
  }
});

describe("checkImatChapter", () => {
  const base = IMAT_NOTES_CHAPTERS[0];
  const bank = () => BANK.get(base.chapter.chapterName);
  const firstConcept = () => Object.values(base.notes)[0].concepts[0];

  it("rejects a featured past question", () => {
    const concept = { ...firstConcept(), pyqExampleId: "00000000-0000-0000-0000-000000000000" };
    const [slug, note] = Object.entries(base.notes)[0];
    const notes = { ...base.notes, [slug]: { ...note, concepts: [concept, ...note.concepts.slice(1)] } };
    expect(checkImatChapter({ ...base, notes }, bank()).join("\n")).toMatch(/pyqExampleId/);
  });

  it("rejects a self-check without five options, and a wrong intro count", () => {
    const c = firstConcept();
    const concept = { ...c, selfCheckExample: { ...c.selfCheckExample!, options: ["a", "b"] } };
    const [slug, note] = Object.entries(base.notes)[0];
    const notes = { ...base.notes, [slug]: { ...note, concepts: [concept, ...note.concepts.slice(1)] } };
    const chapter = { ...base.chapter, intro: base.chapter.intro + " It has 999 past questions." };
    const out = checkImatChapter({ ...base, chapter, notes }, bank()).join("\n");
    expect(out).toMatch(/5 options/);
    expect(out).toMatch(/claims 999/);
  });

  it("rejects maths KaTeX cannot render and an em dash", () => {
    const c = firstConcept();
    const concept = { ...c, intuition: "Broken \\(\\frac{1}{\\) here — and a dash." };
    const [slug, note] = Object.entries(base.notes)[0];
    const notes = { ...base.notes, [slug]: { ...note, concepts: [concept, ...note.concepts.slice(1)] } };
    const out = checkImatChapter({ ...base, notes }, bank()).join("\n");
    expect(out).toMatch(/intuition/);
    expect(out).toMatch(/dash/);
  });
});
