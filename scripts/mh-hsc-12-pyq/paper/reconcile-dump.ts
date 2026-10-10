/**
 * Lay a RECONCILE paper's bank rows beside its transcription, question by
 * question, for the human review that decides each correction.
 *
 *   npx tsx scripts/mh-hsc-12-pyq/paper/reconcile-dump.ts <paperId>
 *     -> out/<id>/reconcile.md   (read this)
 *     -> out/<id>/reconcile.json (bank rows + transcription records, for tooling)
 *
 * READ-ONLY. reconcile-diff.ts compares STEMS only, so a row it calls identical
 * can still differ in its context, its options or its key, and those are part
 * of the fingerprint. This shows every field the fingerprint covers, plus the
 * fingerprint itself, so a pairing is decided from the whole row.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { EXAM_ID, requirePaper, questionsJsonPath, pagesDir } from "./config";
import { catalogFor } from "./catalog";
import { grammarFor } from "./lib";
import { buildPaperRecords, type PaperQuestion } from "../../mh-ssc-10/lib";

const envLocal = join(process.cwd(), ".env.local");
if (existsSync(envLocal)) require("dotenv").config({ path: envLocal, override: true });

type BankRow = {
  id: string;
  question_number: string | null;
  text: string;
  context: string | null;
  solution: string | null;
  content_hash: string;
  question_format: string;
  visibility: string;
  pyq_month: string | null;
  image_url: string | null;
  chapter: { name: string } | { name: string }[] | null;
  options: { label: string; text: string; is_correct: boolean }[];
};

/** "Q. 28(ii)" and "Q.2.iii" -> the printed question number, "28" / "2". */
const topNumber = (ref: string) => /(\d+)/.exec(ref)?.[1] ?? "?";
const chapterOf = (r: BankRow) => (Array.isArray(r.chapter) ? r.chapter[0]?.name : r.chapter?.name) ?? "?";

async function main() {
  const id = process.argv[2];
  if (!id) throw new Error("usage: reconcile-dump.ts <paperId>");
  const paper = requirePaper(id);
  if (paper.bankStatus !== "reconcile") throw new Error(`${id} is not a reconcile paper`);
  const g = grammarFor(paper.subject);

  const questions = JSON.parse(readFileSync(questionsJsonPath(id), "utf8")) as PaperQuestion[];
  const { rows: records } = buildPaperRecords(catalogFor(paper.subject), questions);

  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const { data: subj, error: sErr } = await db
    .from("subjects").select("id").eq("exam_id", EXAM_ID).eq("name", paper.subject).single();
  if (sErr || !subj) throw new Error(`subject ${paper.subject}: ${sErr?.message}`);
  const { data, error } = await db
    .from("questions")
    .select(
      "id, question_number, text, context, solution, content_hash, question_format, visibility, pyq_month, image_url, chapter:chapters!chapter_id(name), options(label, text, is_correct)",
    )
    .eq("subject_id", subj.id)
    .eq("question_kind", "pyq")
    .eq("pyq_year", paper.year)
    .in("pyq_month", [...new Set([paper.month, paper.bankMonth ?? paper.month])]);
  if (error) throw new Error(error.message);
  const bank = (data ?? []) as unknown as BankRow[];
  for (const b of bank) b.options = [...(b.options ?? [])].sort((x, y) => x.label.localeCompare(y.label));

  // Every transcription fingerprint that already sits on SOME row of the exam,
  // so an absorbed ref (a verbatim repeat filed under another sitting) shows.
  const hashes = records.map((r) => r.contentHash);
  const elsewhere = new Map<string, { id: string; source_file: string; question_number: string; visibility: string }>();
  for (let i = 0; i < hashes.length; i += 150) {
    const { data: hit, error: hErr } = await db
      .from("questions")
      .select("id, content_hash, source_file, question_number, visibility")
      .eq("exam_id", EXAM_ID)
      .in("content_hash", hashes.slice(i, i + 150));
    if (hErr) throw new Error(hErr.message);
    for (const h of hit ?? []) elsewhere.set(h.content_hash as string, h as never);
  }

  const groups = new Map<string, { bank: BankRow[]; paper: number[] }>();
  const group = (n: string) => groups.get(n) ?? groups.set(n, { bank: [], paper: [] }).get(n)!;
  bank.forEach((b) => group(topNumber(b.question_number ?? "")).bank.push(b));
  questions.forEach((q, i) => group(topNumber(q.ref)).paper.push(i));

  const out: string[] = [];
  out.push(`# ${id} — ${paper.subject} ${paper.month} ${paper.year} (${paper.thirdParty ? "THIRD-PARTY reproduction" : "board print"})`);
  out.push(`bank rows ${bank.length} (pyq_month ${paper.bankMonth ?? paper.month}) · transcription rows ${questions.length}\n`);
  const opts = (o: { label: string; text: string }[] | undefined) => (o ?? []).map((x) => `(${x.label}) ${x.text}`).join("  ");

  for (const n of [...groups.keys()].sort((a, b) => Number(a) - Number(b))) {
    const { bank: bs, paper: ps } = groups.get(n)!;
    out.push(`## Q.${n}   bank ${bs.length} · paper ${ps.length}`);
    for (const b of bs) {
      const match = records.findIndex((r) => r.contentHash === b.content_hash);
      out.push(`- BANK ${b.id} \`${b.question_number}\` [${chapterOf(b)}] ${b.visibility}${b.image_url ? " IMG" : ""}${match >= 0 ? `  == HASH MATCH ${questions[match].ref}` : ""}`);
      if (b.context) out.push(`  - ctx: ${b.context}`);
      out.push(`  - stem: ${b.text}`);
      if (b.options.length) out.push(`  - opts: ${opts(b.options)}  key ${b.options.find((o) => o.is_correct)?.label ?? "-"}`);
    }
    for (const i of ps) {
      const q = questions[i];
      const r = records[i];
      const other = elsewhere.get(r.contentHash);
      out.push(`- PAPER \`${q.ref}\` [${q.chapter}]${other ? `  == ON ROW ${other.id} (${other.source_file} ${other.question_number} ${other.visibility})` : ""}`);
      if (q.context) out.push(`  - ctx: ${q.context}`);
      out.push(`  - stem: ${q.stem}`);
      if (q.options?.length) out.push(`  - opts: ${opts(q.options)}  key ${q.answer ?? "-"}`);
    }
    out.push("");
  }

  const dir = pagesDir(id);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "reconcile.md"), out.join("\n"));
  writeFileSync(
    join(dir, "reconcile.json"),
    JSON.stringify({ paper: id, bank, records: records.map((r, i) => ({ ref: questions[i].ref, contentHash: r.contentHash })) }, null, 1),
  );
  const matched = bank.filter((b) => records.some((r) => r.contentHash === b.content_hash)).length;
  console.log(`${id}: bank ${bank.length} · paper ${questions.length} · hash-matched ${matched} -> ${join(dir, "reconcile.md")}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
