/**
 * Notes integrity check (Phase 2 — DB-tag aware).
 *
 * Static (no-DB) pre-check, runs first:
 *   0. Subtopic slug GLOBALLY unique across ALL chapters. `question_concept_tags`
 *      keys on `subtopic_slug` alone (no chapter/subject column), and
 *      `loadConceptDrills` + the mastery checkpoint filter by it alone — so two
 *      chapters sharing a slug (e.g. `foundations`) cross-contaminate each
 *      other's drills + checkpoints. This catches the collision at build time,
 *      BEFORE any tag is inserted (the DB checks below only catch it after).
 *      See CLAUDE.md "Recurring pitfalls".
 *
 * For each /notes data module, validates against live Supabase state:
 *   1. The note's subtopicName resolves under (exam, subject, chapter)
 *      → catches silent breakage when the taxonomy is renamed or merged.
 *   2. Every concept's pyqExampleId resolves to a PUBLIC question
 *      → catches deleted UUIDs and PRIVATE-flipped rows.
 *   3. Every DB tag under (subtopic_slug) references a concept_slug that
 *      exists in the TS note module
 *      → catches orphan tags after a concept rename/removal.
 *   4. Each TS concept should have ≥1 DB-tagged PUBLIC question (soft warn)
 *      → catches missed tagging sessions for newly-authored concepts.
 *   5. A concept's worked example / self-check should be a DIFFERENT problem
 *      from its featured PYQ (soft warn, number-overlap heuristic)
 *      → catches the "worked example seeded from the featured PYQ" duplication.
 *
 * Checks 1-5 live in src/lib/notes/lintNotes.ts: a bulk loader (each table
 * read in a few chunked, paged requests) and the per-note checks over what it
 * loaded. Progress lines go to stderr; the report goes to stdout.
 *
 * Read-only: makes no writes. Exits non-zero when any check fails so it
 * can gate a CI step later if desired. Today: run manually.
 *
 * Usage:
 *   npx tsx scripts/notes-lint.ts
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY (or
 * service role) in env. Service role catches PRIVATE tags too (more thorough).
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { createClient } from "@supabase/supabase-js";
import { NOTES_CHAPTERS } from "../src/lib/notes/chapters";
import { checkNotes, loadLintSnapshot, type Issue, type NoteRef } from "../src/lib/notes/lintNotes";

function loadEnv() {
  const local = path.join(process.cwd(), ".env.local");
  if (fs.existsSync(local)) {
    const dotenv = require("dotenv");
    dotenv.config({ path: local, override: true });
  }
}

// Auto-derived from NOTES_CHAPTERS. Adding a chapter to the registry
// means it's automatically linted here too — no need to extend this list.
const NOTES: NoteRef[] = NOTES_CHAPTERS.flatMap((c) =>
  Object.entries(c.notes).map(([slug, note]) => ({
    path: `${c.subjectRoute}/${c.chapterSlug}/${slug}`,
    subtopicSlug: slug,
    exam: c.examName,
    subject: c.subjectName,
    chapter: c.chapter.chapterName,
    note,
  }))
);

async function main() {
  loadEnv();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    console.error(
      "missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local"
    );
    process.exit(2);
  }
  const supabase = createClient(url, key);

  const issues: Issue[] = [];

  // 0. GLOBAL subtopic-slug uniqueness (static, no DB). question_concept_tags
  //    keys on subtopic_slug alone, so a slug reused by two chapters silently
  //    cross-contaminates their drill lists + mastery checkpoints. Catch it
  //    here (build time) rather than after tags are inserted.
  const slugOwners = new Map<string, string[]>();
  for (const c of NOTES_CHAPTERS) {
    for (const slug of c.slugs) {
      const owners = slugOwners.get(slug) ?? [];
      owners.push(`${c.subjectRoute}/${c.chapterSlug}`);
      slugOwners.set(slug, owners);
    }
  }
  for (const [slug, owners] of slugOwners) {
    if (owners.length > 1) {
      issues.push({
        severity: "error",
        note: "GLOBAL",
        message: `subtopic slug "${slug}" is shared by ${owners.length} chapters (${owners.join(
          ", "
        )}) — subtopic slugs MUST be globally unique because question_concept_tags keys on subtopic_slug alone`,
      });
    }
  }

  // 0b. Paid chapters must render dynamically (static, no DB). The preview-gate
  //     reads session cookies; a statically-cached anon prerender would leak the
  //     preview to entitled users. Enforce force-dynamic + no `revalidate` on
  //     the subtopic wrapper. See NotesChapterRegistration.tier contract.
  for (const c of NOTES_CHAPTERS) {
    if (c.tier !== "paid") continue;
    const owner = `${c.subjectRoute}/${c.chapterSlug}`;
    const wrapper = path.join(
      process.cwd(),
      "src/app/notes",
      c.subjectRoute,
      c.chapterSlug,
      "[subtopicSlug]",
      "page.tsx"
    );
    if (!fs.existsSync(wrapper)) {
      issues.push({
        severity: "error",
        note: owner,
        message: `paid chapter wrapper not found at ${wrapper}`,
      });
      continue;
    }
    const src = fs.readFileSync(wrapper, "utf8");
    if (!/export\s+const\s+dynamic\s*=\s*["']force-dynamic["']/.test(src)) {
      issues.push({
        severity: "error",
        note: owner,
        message:
          'paid chapter [subtopicSlug]/page.tsx must `export const dynamic = "force-dynamic"` — the preview-gate reads cookies; static caching would leak the preview to entitled users',
      });
    }
    if (/export\s+const\s+revalidate\s*=/.test(src)) {
      issues.push({
        severity: "error",
        note: owner,
        message:
          "paid chapter [subtopicSlug]/page.tsx must NOT export `revalidate` — ISR caching is incompatible with per-user gating",
      });
    }
  }

  // 1-5. Per-note checks against the live bank: read in bulk first (a few
  //      chunked, paged requests per table), then checked in memory. One
  //      lookup per note took ~30 min at 2,220 notes; see lintNotes.ts.
  const snapshot = await loadLintSnapshot(supabase, NOTES, (line) =>
    console.error(`notes-lint: ${line}`)
  );
  issues.push(...checkNotes(NOTES, snapshot));

  const errors = issues.filter((i) => i.severity === "error");
  const warns = issues.filter((i) => i.severity === "warn");

  console.log(
    `notes-lint: checked ${NOTES.length} note(s) — ${errors.length} error(s), ${warns.length} warning(s)`
  );
  for (const i of issues) {
    const tag = i.severity === "error" ? "ERROR" : "WARN ";
    console.log(`  [${tag}] ${i.note}: ${i.message}`);
  }

  if (errors.length > 0) process.exit(1);
}

main().catch((err) => {
  console.error("notes-lint failed:", err);
  process.exit(2);
});
