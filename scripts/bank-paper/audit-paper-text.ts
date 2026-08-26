/**
 * Run the paper-text rules (./paper-text.ts) against a built paper.
 *
 *   npx tsx scripts/bank-paper/audit-paper-text.ts <paperId> [<paperId> ...]
 *
 * A thin CLI over `auditPaperText` — deliberately NOT a second implementation.
 * `build.ts` runs the same function as a gate before an apply, and an audit that
 * disagreed with the gate would be worse than no audit: the first draft of this
 * file carried its own looser copies of the rules and reported eight violations
 * that were all false positives ("reducing agent", "seen clearly").
 *
 * Exits 1 if any BLOCKING rule fires, so it works in a script; P5 and P6 are
 * reported without failing, because both need a human read.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { auditPaperText, type PaperTextRow } from "./paper-text";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error("missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");

const paperIds = process.argv.slice(2);
if (!paperIds.length) throw new Error("usage: audit-paper-text.ts <paperId> [...]");

async function main() {
  const db = createClient(url!, key!, { auth: { persistSession: false } });
  let blocking = 0;

  for (const paperId of paperIds) {
    const { data: paper } = await db.from("papers").select("title").eq("id", paperId).maybeSingle();
    const { data: mem, error } = await db
      .from("paper_questions").select("question_id").eq("paper_id", paperId);
    if (error) throw new Error(error.message);
    const ids = (mem ?? []).map((m) => m.question_id as string);

    const rows: PaperTextRow[] = [];
    for (let i = 0; i < ids.length; i += 200) {
      const { data, error: qErr } = await db
        .from("questions")
        .select("id, question_number, text, context, solution, image_url, chapters(name, subjects(name)), options(text)")
        .in("id", ids.slice(i, i + 200));
      if (qErr) throw new Error(qErr.message);
      for (const q of (data ?? []) as any[]) {
        rows.push({
          id: q.id,
          where: `${q.chapters?.subjects?.name ?? "?"} / ${q.chapters?.name ?? "?"} Q${q.question_number ?? "?"}`,
          stem: q.text ?? "",
          context: q.context ?? null,
          solution: q.solution ?? null,
          optionsText: (q.options ?? []).map((o: { text: string }) => o.text).join(" || "),
          hasImage: !!q.image_url,
        });
      }
    }

    const violations = auditPaperText(rows);
    const block = violations.filter((v) => v.blocking);
    blocking += block.length;

    console.log(`\n=== ${paper?.title ?? paperId} — ${rows.length} question(s) ===`);
    if (!violations.length) {
      console.log("PASS — no rule violations.");
      continue;
    }
    console.log(`${violations.length} violation(s), ${block.length} blocking:`);
    for (const v of violations) {
      console.log(`  ${v.blocking ? "BLOCK" : "note "} ${v.rule.padEnd(28)} ${v.where}`);
      console.log(`         ${v.detail}`);
    }
  }

  if (blocking) {
    console.log(`\n${blocking} blocking violation(s) across ${paperIds.length} paper(s).`);
    process.exitCode = 1;
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
