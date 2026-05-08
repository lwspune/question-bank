/**
 * Reads the reference MHT-CET Excel and emits supabase/seed/taxonomy.json:
 * the distinct (Exam, Subject, Chapter, Subtopic) tuples that the seed script
 * will upsert into the database.
 *
 * Run once locally: `npm run extract:taxonomy`
 * Output is committed to the repo so seed is reproducible without the source xlsx.
 */
import * as XLSX from "xlsx";
import * as fs from "node:fs";
import * as path from "node:path";

const SOURCE_XLSX =
  process.env.TAXONOMY_SOURCE ||
  "C:/Vilas/LWS_Pune/MHT-CET/MHT_CET_2025_PCM.xlsx";
const OUTPUT_JSON = path.join(
  __dirname,
  "..",
  "supabase",
  "seed",
  "taxonomy.json"
);

type Row = Record<string, unknown>;

type Taxonomy = {
  exams: Array<{
    name: string;
    subjects: Array<{
      name: string;
      chapters: Array<{
        name: string;
        orderIndex: number;
        subtopics: string[];
      }>;
    }>;
  }>;
};

function s(v: unknown): string {
  return typeof v === "string" ? v.trim() : v == null ? "" : String(v).trim();
}

function main() {
  if (!fs.existsSync(SOURCE_XLSX)) {
    throw new Error(`Source Excel not found at ${SOURCE_XLSX}`);
  }
  const wb = XLSX.readFile(SOURCE_XLSX);
  const sheet = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json<Row>(sheet, { defval: "" });

  // Build nested maps preserving insertion order (chapter order matters).
  const exams = new Map<
    string,
    Map<
      string,
      Map<string, { orderIndex: number; subtopics: Set<string> }>
    >
  >();

  for (const row of rows) {
    const examName = s(row["Course"]);
    const subjectName = s(row["Subject"]);
    const chapterName = s(row["Chapter"]);
    const subtopicName = s(row["Subtopic"]);
    if (!examName || !subjectName || !chapterName) continue;

    if (!exams.has(examName)) exams.set(examName, new Map());
    const subjects = exams.get(examName)!;
    if (!subjects.has(subjectName)) subjects.set(subjectName, new Map());
    const chapters = subjects.get(subjectName)!;
    if (!chapters.has(chapterName)) {
      chapters.set(chapterName, {
        orderIndex: chapters.size,
        subtopics: new Set(),
      });
    }
    if (subtopicName) {
      chapters.get(chapterName)!.subtopics.add(subtopicName);
    }
  }

  const taxonomy: Taxonomy = {
    exams: Array.from(exams.entries()).map(([examName, subjects]) => ({
      name: examName,
      subjects: Array.from(subjects.entries()).map(([subjectName, chapters]) => ({
        name: subjectName,
        chapters: Array.from(chapters.entries()).map(([chapterName, info]) => ({
          name: chapterName,
          orderIndex: info.orderIndex,
          subtopics: Array.from(info.subtopics),
        })),
      })),
    })),
  };

  fs.mkdirSync(path.dirname(OUTPUT_JSON), { recursive: true });
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(taxonomy, null, 2) + "\n");

  const stats = {
    exams: taxonomy.exams.length,
    subjects: taxonomy.exams.reduce((n, e) => n + e.subjects.length, 0),
    chapters: taxonomy.exams.reduce(
      (n, e) => n + e.subjects.reduce((m, s) => m + s.chapters.length, 0),
      0
    ),
    subtopics: taxonomy.exams.reduce(
      (n, e) =>
        n +
        e.subjects.reduce(
          (m, s) =>
            m + s.chapters.reduce((k, c) => k + c.subtopics.length, 0),
          0
        ),
      0
    ),
  };
  console.log(`Wrote ${OUTPUT_JSON}`);
  console.log(`  exams=${stats.exams} subjects=${stats.subjects} chapters=${stats.chapters} subtopics=${stats.subtopics}`);
}

main();
