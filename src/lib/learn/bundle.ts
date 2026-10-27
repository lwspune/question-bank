/**
 * Reads the bundle Concept Ladder's `npm run export:pyqvault` writes (bundle.json +
 * manifest.json) and checks it before `npm run learn:import` writes anything. Pure: no DB.
 *
 * The database checks the content itself (cycles, one correct option, misconception tags);
 * this checks what only the bundle can say: that it came from Concept Ladder's gates (verified,
 * clean tree, a commit), that each course names a PYQ Vault exam, and that every concept a
 * course names is in the bundle. Translations are dropped: none are imported yet.
 */
import { isExamSlug } from "@/lib/exam/examContext";

export type LearnCourseChapter = {
  slug: string;
  title: string;
  standard: number;
  pyqvault: string | null;
  parts: { chapter: string; concepts: string[] }[];
};

export type LearnCourse = {
  slug: string;
  title: string;
  exam: string;
  subject: "maths" | "physics";
  standard: number;
  chapters: LearnCourseChapter[];
};

/** Concept Ladder's seed payload; only the fields checked here are typed. */
export type LearnChapterPayload = {
  slug: string;
  title: string;
  concepts: { code: string; items: { code: string; verified: boolean }[]; translations?: unknown[] }[];
};

export type ReadBundle = {
  commit: string;
  exportedAt: string;
  courses: LearnCourse[];
  chapters: LearnChapterPayload[];
  warnings: string[];
};

type Manifest = {
  source?: unknown;
  commit?: unknown;
  dirty?: unknown;
  exportedAt?: unknown;
  verified?: unknown;
  chapters?: unknown;
};

export function readBundle(manifestIn: unknown, bundleIn: unknown): ReadBundle {
  const manifest = (manifestIn ?? {}) as Manifest;
  const bundle = (bundleIn ?? {}) as { courses?: LearnCourse[]; chapters?: LearnChapterPayload[] };
  const errors: string[] = [];

  if (manifest.source !== "concept-ladder") errors.push(`manifest source is ${String(manifest.source)}, not concept-ladder`);
  if (manifest.verified !== true) errors.push("manifest does not say the verifier passed");
  if (manifest.dirty !== false) errors.push("exported from a working tree with uncommitted changes");
  if (typeof manifest.commit !== "string" || !/^[0-9a-f]{40}$/.test(manifest.commit)) errors.push("manifest has no commit");
  if (typeof manifest.exportedAt !== "string" || Number.isNaN(Date.parse(manifest.exportedAt))) errors.push("manifest has no export time");

  const courses = bundle.courses ?? [];
  const chapters = bundle.chapters ?? [];
  const codes = new Map(chapters.map((c) => [c.slug, new Set(c.concepts.map((k) => k.code))]));

  const listed = Array.isArray(manifest.chapters) ? [...manifest.chapters].sort().join(",") : "";
  if (listed !== [...codes.keys()].sort().join(",")) errors.push("manifest chapter list does not match the bundle");

  for (const course of courses) {
    if (!isExamSlug(course.exam)) errors.push(`course ${course.slug}: no PYQ Vault exam ${course.exam}`);
    if (course.slug !== `${course.exam}-${course.subject}`) errors.push(`course slug ${course.slug} is not <exam>-<subject>`);
    for (const ch of course.chapters) {
      for (const part of ch.parts) {
        const known = codes.get(part.chapter);
        if (!known) {
          errors.push(`course ${course.slug} chapter ${ch.slug}: pool chapter ${part.chapter} is not in the bundle`);
          continue;
        }
        for (const code of part.concepts) {
          if (!known.has(code)) errors.push(`course ${course.slug} chapter ${ch.slug}: no concept ${part.chapter}/${code}`);
        }
      }
    }
  }

  for (const ch of chapters) {
    const unverified = ch.concepts.flatMap((c) => c.items).filter((i) => i.verified !== true).length;
    if (unverified) errors.push(`${ch.slug}: ${unverified} unverified item(s)`);
  }

  if (errors.length) throw new Error(`bundle refused:\n  ${errors.join("\n  ")}`);

  const warnings: string[] = [];
  const stripped = chapters.map((ch) => {
    const translated = ch.concepts.filter((c) => (c.translations ?? []).length > 0).length;
    if (translated) warnings.push(`${ch.slug}: ${translated} concept translation(s) not imported`);
    return { ...ch, concepts: ch.concepts.map((c) => ({ ...c, translations: [] })) };
  });

  return { commit: manifest.commit as string, exportedAt: manifest.exportedAt as string, courses, chapters: stripped, warnings };
}
