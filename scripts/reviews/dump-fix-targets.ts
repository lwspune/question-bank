/**
 * Dump the rows a review flagged, with everything needed to author a fix.
 *
 *   npx tsx scripts/reviews/dump-fix-targets.ts
 *
 * Reads scripts/reviews/data/chunks/FINDINGS.json (questionId + issue + the
 * reviewer's proposed fix) and writes FIX_TARGETS.json carrying the CURRENT
 * stored stem, options and solution alongside it — so a fix is authored against
 * what is actually in the database, not against a paraphrase of it.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const CHUNKS = join(process.cwd(), "scripts", "reviews", "data", "findings", "2026-08-16-papers");

type Finding = { questionNumber: string; questionId: string; issue: string; evidence: string; proposedFix: string };

(async () => {
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const findings: Finding[] = JSON.parse(readFileSync(join(CHUNKS, "FINDINGS.json"), "utf8"));
  const ids = [...new Set(findings.map((f) => f.questionId).filter(Boolean))];

  const { data, error } = await db
    .from("questions")
    .select("id, question_number, source_file, content_hash, text, solution, chapters(name), options(label, text, is_correct)")
    .in("id", ids);
  if (error) throw error;

  const byId = new Map((data ?? []).map((q: any) => [q.id, q]));
  const out = findings.map((f) => {
    const q: any = byId.get(f.questionId);
    return {
      ...f,
      found: Boolean(q),
      chapter: q?.chapters?.name ?? null,
      sourceFile: q?.source_file ?? null,
      contentHash: q?.content_hash ?? null,
      stem: q?.text ?? null,
      options: q?.options ?? [],
      currentSolution: q?.solution ?? null,
    };
  });

  const missing = out.filter((r) => !r.found);
  writeFileSync(join(CHUNKS, "FIX_TARGETS.json"), JSON.stringify(out, null, 2), "utf8");
  console.log(`${out.length} target(s) written; ${missing.length} not found in DB`);
  for (const m of missing) console.log(`  ! ${m.questionNumber} ${m.questionId}`);

  const bySrc = new Map<string, number>();
  for (const r of out) bySrc.set(r.sourceFile ?? "?", (bySrc.get(r.sourceFile ?? "?") ?? 0) + 1);
  console.log(`\nby source file:`);
  for (const [s, n] of [...bySrc].sort((a, b) => b[1] - a[1])) console.log(`  ${String(n).padStart(3)}  ${s}`);
})();
