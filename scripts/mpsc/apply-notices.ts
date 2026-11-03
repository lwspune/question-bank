/**
 * Write each paper's owner-settled notices (config.ts `notices`, Prelims and
 * Mains) onto the LIVE rows: the notice heads the question's solution, in the
 * language the row is printed in, and heads the Marathi translation's solution
 * too. A worked solution keeps its working under the notice.
 *
 * Why not commit.ts: re-running it sets the whole paper PRIVATE (it is the
 * ingest path, not an edit path). This touches `solution` only, which is outside
 * content_hash, so a question's identity cannot change.
 *
 *   npx tsx scripts/mpsc/apply-notices.ts                 # dry run, every paper
 *   npx tsx scripts/mpsc/apply-notices.ts --only=ssp-2013 # one paper (Prelims or Mains id)
 *   npx tsx scripts/mpsc/apply-notices.ts --apply         # write (run `npm run db:backup` first)
 *
 * Idempotent: a solution that already heads with its notice is left alone. A
 * notice whose row cannot be found stops the run before anything is written.
 * Grace in the mocks comes from the same `notices` (scripts/mocks/mpscSittings.ts,
 * mpscMainsSittings.ts): rebuild the affected mocks after this.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { ALL_PAPERS } from "./config";
import { PAPERS as MAINS_PAPERS, sourceFileFor } from "../mpsc-mains/config";
import { noticeTextFor, withNotice } from "./notice";

type Target = { paperId: string; sourceFile: string; n: number; rowNotice: (text: string) => string; mr: string | null };

function targets(only?: string): Target[] {
  const out: Target[] = [];
  for (const p of ALL_PAPERS) {
    if (only && p.id !== only) continue;
    for (const [n, v] of Object.entries(p.notices ?? {})) {
      out.push({ paperId: p.id, sourceFile: p.sourceFile, n: Number(n), rowNotice: (text) => noticeTextFor(text, v), mr: v.mr });
    }
  }
  for (const p of MAINS_PAPERS) {
    if (p.dropped || (only && p.id !== only)) continue;
    for (const [n, text] of Object.entries(p.notices ?? {})) {
      // A Mains row has no translation; a joint paper's notice covers each exam's copy.
      for (const exam of p.exams) out.push({ paperId: p.id, sourceFile: sourceFileFor(p, exam), n: Number(n), rowNotice: () => text, mr: null });
    }
  }
  return out;
}

async function main() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const apply = process.argv.includes("--apply");
  const only = process.argv.find((a) => a.startsWith("--only="))?.slice(7);
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const all = targets(only);
  if (!all.length) throw new Error(only ? `no notices for "${only}"` : "no notices configured");

  // Read every row first: a notice that names no row stops the run before any write.
  type Plan = { t: Target; id: string; solution: string | null; tr: string | null };
  const plans: Plan[] = [];
  const missing: string[] = [];
  for (const sourceFile of [...new Set(all.map((t) => t.sourceFile))]) {
    const mine = all.filter((t) => t.sourceFile === sourceFile);
    // One paper's rows by source_file alone (adding a question_number filter timed out).
    const { data, error } = await db.from("questions").select("id, question_number, text, solution").eq("source_file", sourceFile);
    if (error) throw new Error(`${sourceFile}: ${error.message}`);
    const wanted = new Set(mine.map((t) => String(t.n)));
    const ids = (data ?? []).filter((r) => wanted.has(String(r.question_number))).map((r) => r.id);
    const trs = new Map<string, string | null>();
    if (ids.length) {
      const { data: tr, error: tErr } = await db.from("question_translations").select("question_id, solution").eq("lang", "mr").in("question_id", ids);
      if (tErr) throw new Error(`${sourceFile} translations: ${tErr.message}`);
      for (const r of tr ?? []) trs.set(r.question_id, r.solution);
    }
    for (const t of mine) {
      const rows = (data ?? []).filter((r) => String(r.question_number) === String(t.n));
      if (rows.length !== 1) {
        missing.push(`${sourceFile} Q${t.n} (${rows.length} rows)`);
        continue;
      }
      const r = rows[0];
      const rowNew = withNotice(r.solution, t.rowNotice(r.text));
      const trNew = t.mr && trs.has(r.id) ? withNotice(trs.get(r.id), t.mr) : null;
      plans.push({ t, id: r.id, solution: rowNew, tr: trNew });
    }
  }
  if (missing.length) throw new Error(`notice with no single row, nothing written:\n  ${missing.join("\n  ")}`);

  const rowWrites = plans.filter((p) => p.solution !== null);
  const trWrites = plans.filter((p) => p.tr !== null);
  console.log(`notices ${all.length} · rows ${plans.length} · solutions to write ${rowWrites.length} · translations to write ${trWrites.length}`);
  console.log(`  already headed by their notice: ${plans.length - rowWrites.length} row(s)`);
  if (!apply) {
    for (const p of rowWrites.slice(0, 3)) console.log(`\n${p.t.sourceFile} Q${p.t.n}\n${p.solution}`);
    console.log("\n[dry run] pass --apply to write.");
    return;
  }

  let wrote = 0;
  for (const p of rowWrites) {
    const { error } = await db.from("questions").update({ solution: p.solution }).eq("id", p.id);
    if (error) throw new Error(`${p.t.sourceFile} Q${p.t.n}: ${error.message} (wrote ${wrote} before this)`);
    wrote++;
  }
  let wroteTr = 0;
  for (const p of trWrites) {
    const { error } = await db.from("question_translations").update({ solution: p.tr }).eq("question_id", p.id).eq("lang", "mr");
    if (error) throw new Error(`${p.t.sourceFile} Q${p.t.n} (mr): ${error.message} (wrote ${wroteTr} before this)`);
    wroteTr++;
  }
  console.log(`wrote ${wrote} solution(s) and ${wroteTr} Marathi solution(s)`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
