/**
 * Write scripts/mocks/data/spi-practice.json, the committed question list of every SPI practice
 * mock (practiceMocks.ts). Each transcript block is hashed exactly as commit.ts hashes it
 * (commitPayload) and found in the bank by content_hash. Read-only against the bank.
 *
 *   npx tsx scripts/spi/practice-mocks.ts          # dry run: counts, drops, nothing written
 *   npx tsx scripts/spi/practice-mocks.ts --write
 *
 * Then: npx tsx scripts/mocks/build-practice-mocks.ts --only=<slug> [--apply --publish]
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { parseTranscript } from "../ssc-cgl/lib";
import { commitPayload, figureFiles, type CommitRow } from "../ssc-cgl/rows";
import { EXAM_NAME, FIGURES, ORG_ID, TRANSCRIPTS, requirePaper } from "./config";
import { figurePaths, toRawRows } from "./lib";
import { SPI_PRACTICE_MOCKS, SPI_PRACTICE_NOTE, assemblePracticeMock, type NumberedRow } from "./practiceMocks";

const OUT_FILE = join(__dirname, "..", "mocks", "data", "spi-practice.json");
const CHUNK = 200; // .in() puts its list in the URL

function hashedRows(paperId: string): NumberedRow[] {
  const paper = requirePaper(paperId);
  const qs = parseTranscript(readFileSync(join(TRANSCRIPTS, `${paper.id}.txt`), "utf8"));
  const byNumber = new Map(qs.map((q) => [q.number, q]));
  return toRawRows(qs, paper).map((raw) => {
    const q = byNumber.get(raw.sourceRow)!;
    const row: CommitRow = { ...raw, flawed: q.flawed, figures: figurePaths(q, join(FIGURES, paper.id)) };
    const payload = commitPayload(row, figureFiles(row).map((f) => readFileSync(f)));
    return { paperId, number: q.number, hash: payload.contentHash, flawed: q.flawed };
  });
}

async function main() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const write = process.argv.includes("--write");
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const { data: exam, error: examErr } = await db.from("exams").select("id").eq("name", EXAM_NAME).single();
  if (examErr || !exam) throw new Error(`exam ${EXAM_NAME}: ${examErr?.message}`);

  const rows = SPI_PRACTICE_MOCKS.flatMap((m) => m.parts.flatMap((p) => hashedRows(p.paperId)));
  const hashes = [...new Set(rows.map((r) => r.hash))];
  const idByHash = new Map<string, string>();
  for (let i = 0; i < hashes.length; i += CHUNK) {
    const { data, error } = await db
      .from("questions")
      .select("id, content_hash")
      .eq("org_id", ORG_ID)
      .eq("exam_id", exam.id)
      .in("content_hash", hashes.slice(i, i + CHUNK));
    if (error) throw new Error(`questions: ${error.message}`);
    for (const r of data ?? []) idByHash.set(r.content_hash as string, r.id as string);
  }

  // Every miss at once: a miss means the transcript and the stored row have drifted apart.
  const misses = rows.filter((r) => !idByHash.has(r.hash)).map((r) => `${r.paperId} Q${r.number}`);
  if (misses.length) throw new Error(`no bank row has the content_hash of: ${misses.join(", ")}`);

  const out = SPI_PRACTICE_MOCKS.map((m) => {
    const { questions, dropped } = assemblePracticeMock(m, rows, idByHash);
    const grace = questions.filter((q) => q.grace).length;
    console.log(`${m.slug.padEnd(24)} ${questions.length} q, ${grace} grace${dropped.length ? `; left out: ${dropped.join(", ")}` : ""}`);
    return {
      key: m.key,
      slug: m.slug,
      title: m.title,
      examSlug: "spi",
      paperCode: "practice",
      sourceFile: m.parts.map((p) => requirePaper(p.paperId).sourceFile).join(" + "),
      note: SPI_PRACTICE_NOTE,
      questions,
    };
  });

  if (!write) return console.log("\n[dry run] pass --write to write", OUT_FILE);
  writeFileSync(OUT_FILE, JSON.stringify(out, null, 2) + "\n");
  console.log(`\nwrote ${out.length} mocks to ${OUT_FILE}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
