/**
 * Dump a chapter's MCQs into readable batches, ready for formula classification.
 *
 *   npm run formula:harvest -- "Matrices & Determinants"
 *   npm run formula:harvest -- "Vectors" --slug=vectors --batch=80
 *
 * Step 1 of the chapter-by-chapter pipeline (see README.md). It only prepares
 * the reading; the reading itself is the work, and it cannot be skipped — a
 * signature classifier measured against 768 hand labels on the pilot chapter
 * reached 59.2% precision and 45.0% recall.
 *
 * Chapter NAMES differ by exam for the same material ("Matrices &
 * Determinants" in NDA, "Determinants and Matrices" in MHT-CET, split into
 * "Matrices" and "Determinants" in CBSE), so every name you want is passed in
 * and they are pooled into one chapter.
 */
import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

const local = path.join(process.cwd(), ".env.local");
if (fs.existsSync(local))
  require("dotenv").config({ path: local, override: true });

type Row = {
  id: string;
  text: string;
  solution: string | null;
  difficulty: string;
  pyq_year: number | null;
  question_kind: string;
  exams: { name: string } | null;
  chapters: { name: string } | null;
  subtopics: { name: string } | null;
};

const squash = (s: string) => s.replace(/\s+/g, " ").trim();
const clip = (s: string, n: number) => (s.length <= n ? s : s.slice(0, n) + " …");

function arg(name: string, fallback: string): string {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : fallback;
}

async function main() {
  const names = process.argv.slice(2).filter((a) => !a.startsWith("--"));
  if (names.length === 0) {
    console.error(
      'usage: npm run formula:harvest -- "Chapter Name" ["Other Name" ...] [--slug=x] [--batch=80]'
    );
    process.exit(1);
  }
  const slug = arg(
    "slug",
    names[0].toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
  );
  const BATCH = Number(arg("batch", "80"));

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key)
    throw new Error("needs NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in .env.local");
  const db = createClient(url, key, { auth: { persistSession: false } });

  // Paged: PostgREST truncates a bare select at 1000 rows with no error, and a
  // chapter silently missing its tail would be invisible until someone counted.
  const all: Row[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db
      .from("questions")
      .select(
        "id, text, solution, difficulty, pyq_year, question_kind, exams!exam_id(name), chapters!chapter_id(name), subtopics!subtopic_id(name)"
      )
      .eq("visibility", "PUBLIC")
      .eq("question_format", "mcq")
      .range(from, from + 999);
    if (error) throw new Error(error.message);
    const page = (data ?? []) as unknown as Row[];
    all.push(...page.filter((r) => r.chapters && names.includes(r.chapters.name)));
    if (page.length < 1000) break;
  }

  // Stable order, so batch N holds the same questions on every re-run and a
  // partially-finished classification is resumable.
  all.sort((a, b) => a.id.localeCompare(b.id));

  const outDir = path.join(process.cwd(), "generated-papers", `formula-${slug}`);
  fs.mkdirSync(outDir, { recursive: true });

  for (let i = 0; i < all.length; i += BATCH) {
    const slice = all.slice(i, i + BATCH);
    const n = Math.floor(i / BATCH) + 1;
    const lines = slice.map((r, j) => {
      const meta = [
        r.exams?.name,
        r.question_kind,
        r.pyq_year ?? "—",
        r.difficulty,
        r.subtopics?.name ?? "—",
      ].join(" · ");
      return (
        `\n[${i + j + 1}] ${r.id}\n${meta}\n` +
        `Q: ${clip(squash(r.text ?? ""), 220)}\n` +
        `S: ${clip(squash(r.solution ?? "(no solution)"), 520)}\n`
      );
    });
    fs.writeFileSync(
      path.join(outDir, `batch-${String(n).padStart(2, "0")}.txt`),
      `# ${names.join(" / ")} — batch ${n} (${slice.length} questions)\n${lines.join("")}`
    );
  }

  const tally = new Map<string, number>();
  for (const r of all) {
    const k = `${r.exams?.name} · ${r.chapters?.name} · ${r.question_kind}`;
    tally.set(k, (tally.get(k) ?? 0) + 1);
  }
  console.log(`total: ${all.length}`);
  for (const [k, n] of [...tally].sort((a, b) => b[1] - a[1])) console.log(`  ${k}: ${n}`);
  const noSol = all.filter((r) => !r.solution || r.solution.length < 20).length;
  console.log(`rows with no usable solution: ${noSol}`);
  console.log(`batches: ${Math.ceil(all.length / BATCH)} -> ${outDir}`);
  console.log(`\nnext: read each batch and write scripts/formula/tags/${slug}.json`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
