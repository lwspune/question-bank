/**
 * Notes integrity check.
 *
 * For each /notes data module, validates against live Supabase state:
 *   1. The note's subtopicName resolves under (exam, subject, chapter)
 *      → catches silent breakage when the taxonomy is renamed or merged.
 *   2. Every concept's pyqExampleId resolves to a PUBLIC question
 *      → catches deleted UUIDs and PRIVATE-flipped rows.
 *
 * Read-only: makes no writes. Exits non-zero when any check fails so it
 * can gate a CI step later if desired. Today: run manually.
 *
 * Usage:
 *   npx tsx scripts/notes-lint.ts
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY (or
 * service role) in env. Anon is enough because all checks read PUBLIC rows.
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
  exam: string;
  subject: string;
  chapter: string;
  note: SubtopicNote;
};

// Every note ships its (exam, subject, chapter) context alongside its module.
// For NDA Maths Statistics today; new notes append here.
const NOTES: NoteRef[] = Object.entries(STATISTICS_NOTES).map(([slug, note]) => ({
  path: `nda-maths/statistics/${slug}`,
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
      issues.push({
        severity: "error",
        note: ref.path,
        message: `exam not found: ${ref.exam}`,
      });
      continue;
    }
    const { data: subject } = await supabase
      .from("subjects")
      .select("id")
      .eq("exam_id", exam.id)
      .eq("name", ref.subject)
      .maybeSingle();
    if (!subject) {
      issues.push({
        severity: "error",
        note: ref.path,
        message: `subject not found: ${ref.subject} under exam ${ref.exam}`,
      });
      continue;
    }
    const { data: chapter } = await supabase
      .from("chapters")
      .select("id")
      .eq("subject_id", subject.id)
      .eq("name", ref.chapter)
      .maybeSingle();
    if (!chapter) {
      issues.push({
        severity: "error",
        note: ref.path,
        message: `chapter not found: ${ref.chapter} under ${ref.subject}`,
      });
      continue;
    }
    const { data: sub } = await supabase
      .from("subtopics")
      .select("id")
      .eq("chapter_id", chapter.id)
      .eq("name", ref.note.subtopicName)
      .maybeSingle();
    if (!sub) {
      issues.push({
        severity: "error",
        note: ref.path,
        message: `subtopic not found: "${ref.note.subtopicName}" — taxonomy may have been renamed or merged`,
      });
    }

    // 2. Every referenced bank UUID (pyqExampleId + drillQuestionIds) must
    //    resolve AND be PUBLIC. Categorise issues by source so the message
    //    is precise.
    type Source =
      | { kind: "pyq"; conceptName: string }
      | { kind: "drill"; conceptName: string };
    const sources = new Map<string, Source[]>();
    const addSource = (id: string, src: Source) => {
      const arr = sources.get(id) ?? [];
      arr.push(src);
      sources.set(id, arr);
    };
    for (const c of ref.note.concepts) {
      if (c.pyqExampleId) addSource(c.pyqExampleId, { kind: "pyq", conceptName: c.name });
      for (const id of c.drillQuestionIds ?? []) {
        addSource(id, { kind: "drill", conceptName: c.name });
      }
    }
    const allIds = Array.from(sources.keys());

    if (allIds.length > 0) {
      const { data: rows } = await supabase
        .from("questions")
        .select("id, visibility")
        .in("id", allIds);
      const resolved = new Set((rows ?? []).map((r) => (r as { id: string }).id));
      const privateIds = new Set(
        (rows ?? [])
          .filter((r) => (r as { visibility: string }).visibility !== "PUBLIC")
          .map((r) => (r as { id: string }).id)
      );

      for (const id of allIds) {
        const srcs = sources.get(id) ?? [];
        for (const src of srcs) {
          const tag = src.kind === "pyq" ? "pyqExampleId" : "drillQuestionId";
          if (!resolved.has(id)) {
            issues.push({
              severity: "error",
              note: ref.path,
              message: `${tag} not found in bank: ${id} (concept "${src.conceptName}")`,
            });
          } else if (privateIds.has(id)) {
            issues.push({
              severity: "error",
              note: ref.path,
              message: `${tag} is PRIVATE — students won't see it: ${id} (concept "${src.conceptName}")`,
            });
          }
        }
      }
    }

    // 3. Soft warning: subtopic has questions in the bank we haven't referenced.
    if (sub) {
      const { count } = await supabase
        .from("questions")
        .select("id", { count: "exact", head: true })
        .eq("subtopic_id", sub.id)
        .eq("visibility", "PUBLIC");
      const bankCount = count ?? 0;
      if (bankCount > 0 && allIds.length === 0) {
        issues.push({
          severity: "warn",
          note: ref.path,
          message: `subtopic has ${bankCount} PUBLIC questions but the note references 0 PYQs — consider curating at least 1`,
        });
      } else if (bankCount > 0 && allIds.length < Math.min(8, bankCount / 4)) {
        issues.push({
          severity: "warn",
          note: ref.path,
          message: `subtopic has ${bankCount} PUBLIC questions; note references ${allIds.length} — consider tagging more concepts`,
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
