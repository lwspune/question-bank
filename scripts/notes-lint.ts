/**
 * Notes integrity check (Phase 2 — DB-tag aware).
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
import { STATISTICS_CHAPTER, STATISTICS_NOTES } from "../src/app/notes/nda-maths/statistics/_data";
import type { SubtopicNote } from "../src/app/notes/_types";

function loadEnv() {
  const local = path.join(process.cwd(), ".env.local");
  if (fs.existsSync(local)) {
    const dotenv = require("dotenv");
    dotenv.config({ path: local, override: true });
  }
}

type Issue = { severity: "error" | "warn"; note: string; message: string };

type NoteRef = {
  /** Display path used in messages. */
  path: string;
  /** Stable URL slug used as `subtopic_slug` in question_concept_tags. */
  subtopicSlug: string;
  exam: string;
  subject: string;
  chapter: string;
  note: SubtopicNote;
};

// Every note ships its (exam, subject, chapter) context alongside its module.
// For NDA Maths Statistics today; new notes append here.
const NOTES: NoteRef[] = Object.entries(STATISTICS_NOTES).map(([slug, note]) => ({
  path: `nda-maths/statistics/${slug}`,
  subtopicSlug: slug,
  exam: "NDA",
  subject: "Mathematics",
  chapter: STATISTICS_CHAPTER.chapterName,
  note,
}));

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

  for (const ref of NOTES) {
    // 1. Resolve subtopic via the same name-keyed path the page uses at request time.
    const { data: exam } = await supabase
      .from("exams")
      .select("id")
      .eq("name", ref.exam)
      .maybeSingle();
    if (!exam) {
      issues.push({ severity: "error", note: ref.path, message: `exam not found: ${ref.exam}` });
      continue;
    }
    const { data: subject } = await supabase
      .from("subjects").select("id").eq("exam_id", exam.id).eq("name", ref.subject).maybeSingle();
    if (!subject) {
      issues.push({ severity: "error", note: ref.path, message: `subject not found: ${ref.subject} under exam ${ref.exam}` });
      continue;
    }
    const { data: chapter } = await supabase
      .from("chapters").select("id").eq("subject_id", subject.id).eq("name", ref.chapter).maybeSingle();
    if (!chapter) {
      issues.push({ severity: "error", note: ref.path, message: `chapter not found: ${ref.chapter} under ${ref.subject}` });
      continue;
    }
    const { data: sub } = await supabase
      .from("subtopics").select("id").eq("chapter_id", chapter.id).eq("name", ref.note.subtopicName).maybeSingle();
    if (!sub) {
      issues.push({
        severity: "error",
        note: ref.path,
        message: `subtopic not found: "${ref.note.subtopicName}" — taxonomy may have been renamed or merged`,
      });
    }

    // 2. Every pyqExampleId must resolve AND be PUBLIC.
    const pyqIds: { id: string; conceptName: string }[] = [];
    for (const c of ref.note.concepts) {
      if (c.pyqExampleId) pyqIds.push({ id: c.pyqExampleId, conceptName: c.name });
    }
    if (pyqIds.length > 0) {
      const { data: rows } = await supabase
        .from("questions")
        .select("id, visibility")
        .in("id", pyqIds.map((p) => p.id));
      const resolved = new Set((rows ?? []).map((r) => (r as { id: string }).id));
      const privateIds = new Set(
        (rows ?? [])
          .filter((r) => (r as { visibility: string }).visibility !== "PUBLIC")
          .map((r) => (r as { id: string }).id)
      );
      for (const p of pyqIds) {
        if (!resolved.has(p.id)) {
          issues.push({
            severity: "error",
            note: ref.path,
            message: `pyqExampleId not found in bank: ${p.id} (concept "${p.conceptName}")`,
          });
        } else if (privateIds.has(p.id)) {
          issues.push({
            severity: "error",
            note: ref.path,
            message: `pyqExampleId is PRIVATE — students won't see it: ${p.id} (concept "${p.conceptName}")`,
          });
        }
      }
    }

    // 3 + 4. DB-tag integrity: orphan concept_slugs (error) + untagged TS concepts (warn).
    const { data: tagRows } = await supabase
      .from("question_concept_tags")
      .select("concept_slug, question_id")
      .eq("subtopic_slug", ref.subtopicSlug);
    const knownConceptSlugs = new Set(ref.note.concepts.map((c) => c.slug));
    const taggedConceptSlugs = new Set<string>();
    for (const row of (tagRows ?? []) as { concept_slug: string; question_id: string }[]) {
      taggedConceptSlugs.add(row.concept_slug);
      if (!knownConceptSlugs.has(row.concept_slug)) {
        issues.push({
          severity: "error",
          note: ref.path,
          message: `DB tag has unknown concept_slug "${row.concept_slug}" (question ${row.question_id}) — concept renamed or removed?`,
        });
      }
    }
    for (const c of ref.note.concepts) {
      if (!taggedConceptSlugs.has(c.slug)) {
        issues.push({
          severity: "warn",
          note: ref.path,
          message: `concept "${c.name}" (slug "${c.slug}") has 0 tagged questions in question_concept_tags — run a tagging session`,
        });
      }
    }
  }

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
