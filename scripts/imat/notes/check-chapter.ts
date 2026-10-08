/**
 * Check one IMAT notes chapter folder against the content contract BEFORE it
 * is registered: the same checkImatChapter the test suite runs.
 *
 *   npx tsx scripts/imat/notes/check-chapter.ts <subject>/<chapter-folder>
 *   e.g. npx tsx scripts/imat/notes/check-chapter.ts physics/fluids
 *
 * The folder's index.ts must export exactly one *_CHAPTER, one *_NOTES and
 * one *_SLUGS. Exits 1 on any problem. Read-only.
 */
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { checkImatChapter } from "../../../src/lib/sites/imat/notes/checks";
import { IMAT_NOTES_CHAPTERS } from "../../../src/lib/sites/imat/notes/registry";
import { loadBankChapters } from "./bank";
import type { ChapterNote, SubtopicNote } from "../../../src/app/notes/_types";

async function main() {
  const folder = process.argv[2];
  if (!folder) {
    console.error("usage: check-chapter.ts <subject>/<chapter-folder>");
    process.exit(2);
  }
  const dir = join(__dirname, "..", "..", "..", "src", "lib", "sites", "imat", "notes", folder);
  const mod = (await import(pathToFileURL(join(dir, "index.ts")).href)) as Record<string, unknown>;
  const pick = (suffix: string) => {
    const keys = Object.keys(mod).filter((k) => k.endsWith(suffix));
    if (keys.length !== 1) throw new Error(`index.ts must export exactly one *${suffix} (found ${keys.join(", ") || "none"})`);
    return mod[keys[0]];
  };
  const chapter = pick("_CHAPTER") as ChapterNote;
  const notes = pick("_NOTES") as Record<string, SubtopicNote>;
  const slugs = pick("_SLUGS") as string[];
  const chapterSlug = folder.split("/").pop()!;

  const bank = loadBankChapters();
  const problems = checkImatChapter({ chapterSlug, chapter, notes, slugs }, bank.get(chapter.chapterName));

  // Slug collisions with chapters already registered (other than this one).
  const others = IMAT_NOTES_CHAPTERS.filter((c) => c.chapter.chapterName !== chapter.chapterName);
  const taken = new Set(
    others.flatMap((c) => [...Object.keys(c.notes), ...Object.values(c.notes).flatMap((n) => n.concepts.map((k) => k.slug))])
  );
  for (const [slug, note] of Object.entries(notes)) {
    if (taken.has(slug)) problems.push(`page slug ${slug} is already used by another IMAT chapter`);
    for (const k of note.concepts) if (taken.has(k.slug)) problems.push(`concept slug ${k.slug} is already used`);
  }

  const concepts = Object.values(notes).reduce((n, s) => n + s.concepts.length, 0);
  if (problems.length) {
    console.log(`FAIL ${folder}: ${problems.length} problem(s)`);
    for (const p of problems) console.log(`  - ${p}`);
    process.exit(1);
  }
  console.log(`PASS ${folder}: ${Object.keys(notes).length} pages, ${concepts} concepts`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
