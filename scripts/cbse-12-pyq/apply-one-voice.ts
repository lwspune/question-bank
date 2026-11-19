/**
 * Rewrite the CBSE 12 Physics solutions that carry the marking-scheme scaffolding
 * into one voice (oneVoice.ts), in the source of record AND the bank (2026-11-19).
 *
 *   npx tsx --env-file=<.env.local> scripts/cbse-12-pyq/apply-one-voice.ts [--apply]
 *
 * Not apply-solutions.ts: that rewrites EVERY solution in a paper from the file,
 * which would undo any later in-place repair to a neighbouring row. This touches
 * only rows that carry the scaffolding, and each DB write is guarded on the text
 * it read. A row whose DB text differs from the file is transformed on its own
 * text and listed, so neither copy loses a later edit.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { DATA, ORG_ID, classOfPaperId } from "./config";
import { oneVoice } from "./oneVoice";
import { probeBoardAnswer } from "../lib/boardAnswerStyle";

const APPLY = process.argv.includes("--apply");
const PAPERS = ["2023-55-2-1", "2023-55-3-1"];
const MARK = /Added here, and not from the marking scheme|CBSE's marking scheme|the keyed option/;
const toFile = (doc: unknown) => JSON.stringify(doc, null, 1).replace(/\n/g, "\r\n");

async function main() {
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  let changed = 0;
  let written = 0;
  const notes: string[] = [];

  for (const id of PAPERS) {
    const path = join(DATA, `${id}.topaper.json`);
    const raw = readFileSync(path, "utf8");
    const doc = JSON.parse(raw) as { rows: { hash: string; ref: string; solution?: string }[] };
    if (toFile(doc) !== raw) throw new Error(`${path}: does not round-trip; refusing to rewrite it`);

    for (const r of doc.rows) {
      if (!r.solution || !MARK.test(r.solution)) continue;
      const fromFile = oneVoice(r.solution);
      for (const v of fromFile.review) notes.push(`${id} ${r.ref} REVIEW: ${v}`);
      for (const f of probeBoardAnswer(`${id} ${r.ref}`, fromFile.text)) {
        if (f.severity === "error") notes.push(`${f.ref} STYLE: ${f.reason}: ${f.quote}`);
      }
      if (/marking scheme|the scheme/i.test(fromFile.text)) {
        const m = /[^.]*(?:marking scheme|the scheme)[^.]*\.?/i.exec(fromFile.text)!;
        notes.push(`${id} ${r.ref} MENTIONS SCHEME: ${m[0].trim().slice(0, 140)}`);
      }

      const { data, error } = await db
        .from("questions")
        .select("id, solution")
        .eq("org_id", ORG_ID)
        .eq("exam_id", classOfPaperId(id).examId)
        .eq("question_kind", "pyq")
        .eq("content_hash", r.hash);
      if (error) throw new Error(error.message);
      if (data.length !== 1) throw new Error(`${id} ${r.ref}: hash resolves to ${data.length} rows`);
      const live = String(data[0].solution ?? "");
      const next = live === r.solution ? fromFile.text : oneVoice(live).text;
      if (live !== r.solution) notes.push(`${id} ${r.ref} DB differed from the file; transformed the DB text on its own`);
      changed++;
      r.solution = fromFile.text;
      if (!APPLY) continue;
      const { data: w, error: ue } = await db
        .from("questions")
        .update({ solution: next })
        .eq("id", data[0].id)
        .eq("solution", live)
        .select("id");
      if (ue) throw new Error(ue.message);
      if (w?.length === 1) written++;
      else notes.push(`${id} ${r.ref} SKIPPED: solution changed under us`);
    }
    if (APPLY) writeFileSync(path, toFile(doc));
  }

  for (const n of notes) console.log(n);
  console.log(`${APPLY ? "APPLIED" : "DRY RUN"}: ${changed} solutions${APPLY ? `, ${written} written` : ""}`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
