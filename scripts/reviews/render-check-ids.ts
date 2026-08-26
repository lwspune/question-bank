/**
 * Render-check an arbitrary set of questions (web KaTeX + Word OMML).
 *
 *   npx tsx scripts/reviews/render-check-ids.ts <runFile>
 *
 * <runFile> is a solution-rewrites run file (or any JSON array of objects
 * carrying `questionId`). Sibling of render-check-paper.ts for the case where
 * the changed rows are not a paper — e.g. a bank-wide sweep.
 *
 * Uses the REAL helpers (katex, findOmmlFailures), never a regex approximation.
 */
import { readFileSync } from "node:fs";
import { join, isAbsolute } from "node:path";
import katex from "katex";
import { createClient } from "@supabase/supabase-js";
import { findOmmlFailures } from "../../src/lib/export/ommlAudit";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const zones = (s: string): string[] => [...(s ?? "").matchAll(/\\\((.+?)\\\)/gs)].map((m) => m[1]);

async function main() {
  const arg = process.argv[2];
  if (!arg) {
    console.error("usage: render-check-ids.ts <runFile>");
    process.exit(2);
  }
  const path = isAbsolute(arg)
    ? arg
    : join(process.cwd(), "scripts", "reviews", "data", "solution-rewrites", `${arg}.json`);
  const ids: string[] = (JSON.parse(readFileSync(path, "utf8")) as any[]).map((r) => r.questionId);

  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const katexFails: string[] = [];
  const ommlFails: string[] = [];
  const ctrl: string[] = [];
  let fields = 0;
  let zoneCount = 0;

  // Chunk the .in() filter — it rides in the URL, so a few hundred uuids
  // exceeds the request-line limit and PostgREST answers a bare Bad Request.
  for (let i = 0; i < ids.length; i += 100) {
    const { data, error } = await db
      .from("questions")
      .select("id,question_number,text,solution")
      .in("id", ids.slice(i, i + 100));
    if (error) throw error;
    for (const q of data as any[]) {
      for (const [fld, v] of [
        ["text", q.text],
        ["solution", q.solution],
      ] as [string, string][]) {
        if (!v) continue;
        fields++;
        // eslint-disable-next-line no-control-regex
        if (/[\x00-\x08\x0B\x0C\x0E-\x1F]/.test(v)) ctrl.push(`Q${q.question_number} ${fld}`);
        for (const z of zones(v)) {
          zoneCount++;
          try {
            katex.renderToString(z, { throwOnError: true });
          } catch (e: any) {
            katexFails.push(`Q${q.question_number} ${fld}: ${String(e.message).slice(0, 80)}`);
          }
        }
        for (const f of findOmmlFailures(v))
          ommlFails.push(`Q${q.question_number} ${fld}: ${String((f as any).latex ?? f).slice(0, 70)}`);
      }
    }
  }

  console.log(`checked ${ids.length} question(s) | ${fields} fields | ${zoneCount} math zones`);
  const rep = (label: string, rows: string[]) => {
    console.log(`\n${label}: ${rows.length}`);
    rows.slice(0, 25).forEach((r) => console.log("  " + r));
  };
  rep("KaTeX failures", katexFails);
  rep("OMML failures", ommlFails);
  rep("control characters", ctrl);
  const bad = katexFails.length + ommlFails.length + ctrl.length;
  console.log(bad === 0 ? "\nPASS — renders on both surfaces" : `\nFAIL — ${bad} problem(s)`);
  process.exit(bad === 0 ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
