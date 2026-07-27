/**
 * Commit a syllabus-fit screen into `question_audience_exclusions` (0062).
 *
 *   npx tsx scripts/relevance/commit.ts <file>          # dry-run (default)
 *   npx tsx scripts/relevance/commit.ts <file> --apply  # write
 *
 * `<file>` is a basename under scripts/relevance/data/ (with or without .json).
 *
 * Input carries ONLY the exclusions — the questions a student taught the
 * NDA ∪ CET syllabus cannot solve. Passing questions are never written; they
 * are the complement of this list within a REVIEWED chapter, and the reviewed
 * scope lives in src/lib/relevance/config.ts. After screening a new chapter you
 * must do BOTH: commit its exclusions here AND append the chapter to
 * REVIEWED_CHAPTERS. Committing only the exclusions leaves the chapter looking
 * unscreened; appending only the chapter silently marks its drops as passing.
 *
 * Idempotent: upserts on (question_id, audience), so a re-run is a no-op and a
 * corrected blocking_tool overwrites in place.
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { AUDIENCE, isBlockingTool, BLOCKING_TOOLS } from "../../src/lib/relevance/config";

type Exclusion = { questionId: string; blockingTool: string; note?: string };
type ScreenFile = {
  audience?: string;
  scope?: string;
  screenedOn?: string;
  exclusions: Exclusion[];
};

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

async function main() {
  const arg = process.argv[2];
  const apply = process.argv.includes("--apply");
  if (!arg) {
    console.error("usage: tsx scripts/relevance/commit.ts <file> [--apply]");
    process.exit(1);
  }
  const base = arg.endsWith(".json") ? arg : `${arg}.json`;
  const path = join(process.cwd(), "scripts", "relevance", "data", base);
  if (!existsSync(path)) {
    console.error(`no such screen file: ${path}`);
    process.exit(1);
  }
  loadEnv();

  const screen: ScreenFile = JSON.parse(readFileSync(path, "utf8"));
  const audience = screen.audience ?? AUDIENCE;
  const rows = screen.exclusions ?? [];

  // Validate BEFORE touching the DB — a typo'd blocking tool would otherwise
  // land as free text the UI can't label (the column is deliberately not a DB
  // enum, so this is the only gate).
  const problems: string[] = [];
  const seen = new Set<string>();
  for (const [i, r] of rows.entries()) {
    if (!UUID_RE.test(r.questionId ?? "")) problems.push(`[${i}] bad questionId: ${r.questionId}`);
    if (!isBlockingTool(r.blockingTool))
      problems.push(
        `[${i}] unknown blockingTool '${r.blockingTool}' — add it to BLOCKING_TOOLS in src/lib/relevance/config.ts first`
      );
    if (seen.has(r.questionId)) problems.push(`[${i}] duplicate questionId ${r.questionId}`);
    seen.add(r.questionId);
    if (r.note && r.note.length > 500) problems.push(`[${i}] note exceeds 500 chars`);
  }
  if (problems.length > 0) {
    console.error(`\n${problems.length} problem(s):`);
    for (const p of problems) console.error(`  ${p}`);
    process.exit(1);
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY required");
  const db = createClient(url, key, { auth: { persistSession: false } });

  // Every excluded question must exist and belong to the exam being screened —
  // a stale id from an edited/re-ingested source would otherwise insert a row
  // pointing at nothing (the FK would reject it, but the message is opaque).
  const ids = rows.map((r) => r.questionId);
  const { data: found, error: findErr } = await db
    .from("questions")
    .select("id, exam:exams!exam_id(name), chapter:chapters!chapter_id(name)")
    .in("id", ids);
  if (findErr) throw new Error(`question lookup: ${findErr.message}`);
  const foundIds = new Set((found ?? []).map((r) => (r as { id: string }).id));
  const missing = ids.filter((id) => !foundIds.has(id));
  if (missing.length > 0) {
    console.error(`\n${missing.length} questionId(s) not in the bank:`);
    for (const m of missing) console.error(`  ${m}`);
    process.exit(1);
  }

  const byTool = new Map<string, number>();
  for (const r of rows) byTool.set(r.blockingTool, (byTool.get(r.blockingTool) ?? 0) + 1);

  console.log(`\n${screen.scope ?? base}`);
  console.log(`audience: ${audience}   exclusions: ${rows.length}`);
  for (const [tool, n] of [...byTool].sort((a, b) => b[1] - a[1]))
    console.log(`  ${String(n).padStart(3)}  ${BLOCKING_TOOLS[tool as keyof typeof BLOCKING_TOOLS]}`);

  if (!apply) {
    console.log("\nDRY RUN — nothing written. Re-run with --apply.");
    return;
  }

  const { error } = await db.from("question_audience_exclusions").upsert(
    rows.map((r) => ({
      question_id: r.questionId,
      audience,
      blocking_tool: r.blockingTool,
      note: r.note ?? null,
    })),
    { onConflict: "question_id,audience" }
  );
  if (error) throw new Error(`upsert: ${error.message}`);

  const { count } = await db
    .from("question_audience_exclusions")
    .select("*", { count: "exact", head: true })
    .eq("audience", audience);
  console.log(`\nWrote ${rows.length}. Total exclusions for '${audience}': ${count}.`);
  console.log("Reminder: append the screened chapter(s) to REVIEWED_CHAPTERS in src/lib/relevance/config.ts.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
