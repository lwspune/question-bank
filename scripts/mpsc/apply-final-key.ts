/**
 * Move a LIVE paper from MPSC's first answer key to its final key, in place
 * (first used 2026-11-04 for ssp-2025, which shipped on the first key).
 *
 *   npx tsx scripts/mpsc/extract.py keys <id>; npx tsx scripts/mpsc/keys.ts <id> --write
 *   npx tsx scripts/mpsc/apply-final-key.ts <id>          # dry run: the plan
 *   npx tsx scripts/mpsc/apply-final-key.ts <id> --apply  # write (run `npm run db:backup` first)
 *
 * Why not commit.ts: it is the ingest path and sets the paper PRIVATE. This keeps
 * every row's id and changes only what the key decides: the correct option, the
 * content_hash (it covers the answer, so it is recomputed with the lane's own
 * builder), cancelled_note for a newly cancelled question, and the solution:
 *  - a re-keyed question with a notice (config notices / keyDoubtNotices.ts) gets
 *    the notice, English and Marathi, exactly as commit.ts would write it;
 *  - any other re-keyed question needs a worked solution in
 *    data/<id>.final-key-solutions.json (English; Marathi solution cleared);
 *  - a cancelled question carries no solution, like every other cancelled row.
 * Each write is conditional on the row's old content_hash. Rebuild the paper's
 * mock afterwards (grace comes from cancelled rows and notices).
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { normalizeNewlines } from "../../src/lib/text/normalizeNewlines";
import { validateRow } from "../../src/lib/upload/validate";
import { dataPath, examIdFor, requirePaper } from "./config";
import { cancelledNoteFor, planFinalKey, type LiveRow } from "./finalKey";
import { buildRecords, questionSolution, type BilingualQuestion, type KeyLetter } from "./lib";

async function main() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const args = process.argv.slice(2);
  const paper = requirePaper(args.find((a) => !a.startsWith("--")));
  const apply = args.includes("--apply");
  const nl = (s: string) => normalizeNewlines(s);

  const questions: BilingualQuestion[] = JSON.parse(readFileSync(dataPath(paper.id, "merged"), "utf8")).questions;
  const keyFile = JSON.parse(readFileSync(dataPath(paper.id, "key"), "utf8"));
  const key: Record<number, KeyLetter> = keyFile.key;
  const graded: Record<number, number[]> = keyFile.graded ?? {};
  const notices = paper.notices ?? {};
  const cancelledNote = cancelledNoteFor(paper.pyqNote);

  // The records commit.ts would write today, hashed the same way.
  const { rows, errors: buildErrors } = buildRecords(questions, key, cancelledNote, graded, notices);
  if (buildErrors.length) throw new Error(buildErrors.join("\n"));
  const built = rows.map((r) => {
    const v = validateRow({ ...r, question: nl(r.question), ...(r.context ? { context: nl(r.context) } : {}) });
    if (v.errors.length) throw new Error(`Q${r.questionNumber}: ${v.errors.join("; ")}`);
    return { n: Number(r.questionNumber), answer: r.answer, contentHash: v.parsed!.contentHash };
  });

  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const { data, error } = await db
    .from("questions")
    .select("id, question_number, content_hash, cancelled_note, options(id, label, is_correct)")
    .eq("exam_id", examIdFor(paper))
    .eq("source_file", paper.sourceFile);
  if (error) throw new Error(error.message);
  type Opt = { id: string; label: string; is_correct: boolean };
  const optsById = new Map<string, Opt[]>();
  const live: LiveRow[] = (data ?? []).map((q) => {
    const opts = q.options as Opt[];
    optsById.set(q.id, opts);
    return {
      n: Number(q.question_number),
      id: q.id,
      contentHash: q.content_hash,
      answer: opts.filter((o) => o.is_correct).map((o) => o.label).join(""),
      cancelled: q.cancelled_note != null,
    };
  });

  const plan = planFinalKey(live, built);
  const solFile = join(dataPath(paper.id, "merged"), "..", `${paper.id}.final-key-solutions.json`);
  const worked: Record<string, string> = existsSync(solFile) ? JSON.parse(readFileSync(solFile, "utf8")).solutions : {};
  const errors = [...plan.errors];
  const writes = plan.changes.map((c) => {
    let en: string | null = null;
    let mr: string | null = null;
    if (c.kind === "rekey") {
      const n = notices[c.n];
      if (n) {
        const s = questionSolution(undefined, graded[c.n], n)!;
        en = s.en;
        mr = s.mr;
      } else if (worked[c.n]) en = worked[c.n];
      else errors.push(`Q${c.n}: re-keyed ${c.from} -> ${c.to} with no notice and no worked solution in ${solFile}`);
    }
    return { ...c, en: en && nl(en), mr: mr && nl(mr) };
  });

  console.log(`${paper.id} "${paper.pyqNote}": ${live.length} live rows, ${built.length} built`);
  for (const w of writes)
    console.log(`  Q${w.n} ${w.kind} ${w.from} -> ${w.to}  solution: ${w.en ? (notices[w.n] ? "notice (EN+MR)" : "worked (EN)") : "none"}`);
  if (errors.length) {
    for (const e of errors) console.log(`  - ${e}`);
    throw new Error(`${errors.length} problem(s), nothing written`);
  }
  if (!writes.length) return console.log("nothing to change");
  if (!apply) return console.log("[dry-run] pass --apply to write.");

  for (const w of writes) {
    const opts = optsById.get(w.id)!;
    // Clear every correct option first: a cancelled row may hold none (0119),
    // and a re-keyed row must never hold two.
    const { error: e1 } = await db.from("options").update({ is_correct: false }).eq("question_id", w.id);
    if (e1) throw new Error(`Q${w.n} options: ${e1.message}`);
    if (w.kind === "rekey") {
      const target = opts.find((o) => o.label === w.to);
      if (!target) throw new Error(`Q${w.n}: no option ${w.to}`);
      const { error: e2 } = await db.from("options").update({ is_correct: true }).eq("id", target.id);
      if (e2) throw new Error(`Q${w.n} option ${w.to}: ${e2.message}`);
    }
    const { data: upd, error: e3 } = await db
      .from("questions")
      .update({
        content_hash: w.newHash,
        solution: w.en,
        ...(w.kind === "cancel" ? { cancelled_note: cancelledNote } : {}),
      })
      .eq("id", w.id)
      .eq("content_hash", w.oldHash)
      .select("id");
    if (e3 || upd?.length !== 1) throw new Error(`Q${w.n}: question update ${e3?.message ?? "matched no row (hash moved?)"}`);
    const { error: e4 } = await db.from("question_translations").update({ solution: w.mr }).eq("question_id", w.id).eq("lang", "mr");
    if (e4) throw new Error(`Q${w.n} Marathi solution: ${e4.message}`);
    console.log(`  Q${w.n}: written`);
  }
  console.log(`${writes.length} row(s) moved to the final key. Rebuild this paper's mock next.`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
