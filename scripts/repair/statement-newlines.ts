/**
 * Repair run-on statement-list stems: put each numbered claim, and the closing
 * question, on its own line.
 *
 *   npx tsx scripts/repair/statement-newlines.ts                 # dry run
 *   npx tsx scripts/repair/statement-newlines.ts --exam=NDA      # scoped dry run
 *   npx tsx scripts/repair/statement-newlines.ts --apply         # write
 *   npx tsx scripts/repair/statement-newlines.ts --dump=<file>   # write proposals
 *   npx tsx scripts/repair/statement-newlines.ts --exams="A|B"   # allow-list exams
 *
 * `--exams` is an ALLOW-LIST and is how scope is controlled. Detection alone is
 * not sufficient: JEE Mains, NEET and MHT-CET were reviewed row by row and are
 * dominated by enumerations that only LOOK like statement lists (options named
 * in a parenthetical, reagent sequences, figure references), so those corpora
 * are excluded by name rather than by pattern.
 *   npx tsx scripts/repair/statement-newlines.ts --revert=<file> # undo a run
 *
 * DRY RUN IS THE DEFAULT and prints the exact before/after of every row --apply
 * would write, so the preview is truthful rather than indicative.
 *
 * WHY THE DATA AND NOT THE RENDERER. Both renderers already honour a real
 * newline — the Word exporter splits on `\n` into `TextRun({break:1})` and the
 * web renderer uses `white-space: pre-wrap`. Rows whose stems carry newlines
 * print correctly today, side by side with rows that do not, so the defect is
 * the stored text. See scripts/lib/statementLayout.ts for the detection rules
 * and the live traps each one exists for.
 *
 * ── content_hash IS DELIBERATELY LEFT UNTOUCHED ──────────────────────────────
 *
 * Dedup is `(org_id, exam_id, content_hash)` over sha256(normalised text +
 * sorted options + answer), and adding newlines changes the text. The hash is
 * NOT recomputed here, which is a knowing divergence from "the hash fingerprints
 * the stored row":
 *
 *   - Recomputing it would make a re-upload of the ORIGINAL source .xlsx (which
 *     still holds the flat text) hash to a value matching nothing, and insert a
 *     duplicate of every repaired row.
 *   - Leaving it means such a re-upload still hashes to the stored value, dedups,
 *     and skips — which is the behaviour we want.
 *
 * The source files are untracked (no .xlsx is in the repo), so there is no
 * upstream source of record to correct instead; the database is it.
 *
 * The cost is that `question_reviews.reviewed_content_hash` will NOT mark a
 * review stale after this edit. That is defensible — a line break changes no
 * claim, option or answer — but it is a real weakening, so it is recorded here
 * rather than left to be discovered. Do NOT "fix" the mismatch by recomputing
 * hashes: that reintroduces the duplicate hazard above.
 */
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { layoutStatements } from "../lib/statementLayout";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const SNAPSHOT_DIR = join(process.cwd(), "scripts", "repair", "data");

/** Broad pre-filter. The TS detector decides; this only bounds what we fetch. */
const LIKE_PATTERNS = ["% 1. %", "% I. %", "% (1) %"];

type Row = {
  id: string;
  text: string;
  chapters: { name: string; subjects: { name: string; exams: { name: string } | null } | null } | null;
};

type Flat = { id: string; text: string; exam: string; subject: string; chapter: string };

function flatten(r: Row): Flat {
  const subj = r.chapters?.subjects ?? null;
  return {
    id: r.id,
    text: r.text,
    exam: subj?.exams?.name ?? "(unknown)",
    subject: subj?.name ?? "(unknown)",
    chapter: r.chapters?.name ?? "(unknown)",
  };
}

async function fetchCandidates(client: SupabaseClient): Promise<Flat[]> {
  const byId = new Map<string, Flat>();
  const PAGE = 1000;
  for (const pattern of LIKE_PATTERNS) {
    for (let from = 0; ; from += PAGE) {
      const { data, error } = await client
        .from("questions")
        .select("id, text, chapters(name, subjects(name, exams(name)))")
        .eq("visibility", "PUBLIC")
        .eq("question_format", "mcq")
        .like("text", pattern)
        // Stable paging — LIMIT/OFFSET without ORDER BY may repeat or skip rows.
        .order("id", { ascending: true })
        .range(from, from + PAGE - 1);
      if (error) throw new Error(`fetch (${pattern}): ${error.message}`);
      for (const r of (data ?? []) as unknown as Row[]) {
        const f = flatten(r);
        if (f.text) byId.set(f.id, f);
      }
      if (!data || data.length < PAGE) break;
    }
  }
  return [...byId.values()].sort((a, b) => a.id.localeCompare(b.id));
}

function preview(s: string, n = 160): string {
  const one = s.replace(/\n/g, "⏎ ").replace(/\s+/g, " ");
  return one.length > n ? one.slice(0, n) + "…" : one;
}

async function revert(client: SupabaseClient, file: string, apply: boolean) {
  const snap = JSON.parse(readFileSync(file, "utf8")) as { id: string; before: string }[];
  console.log(`revert: ${snap.length} row(s) from ${file}${apply ? "" : "  [dry run]"}\n`);
  if (!apply) {
    for (const r of snap.slice(0, 5)) console.log(`  ${r.id}  ${preview(r.before)}`);
    console.log(`\n[dry-run] pass --apply to restore. Nothing written.`);
    return;
  }
  let n = 0;
  for (const r of snap) {
    const { error } = await client.from("questions").update({ text: r.before }).eq("id", r.id);
    if (error) throw new Error(`revert ${r.id}: ${error.message}`);
    n += 1;
  }
  console.log(`restored ${n} row(s).`);
}

async function main() {
  const args = process.argv.slice(2);
  const apply = args.includes("--apply");
  const examArg = args.find((a) => a.startsWith("--exam="))?.slice("--exam=".length);
  const revertArg = args.find((a) => a.startsWith("--revert="))?.slice("--revert=".length);
  const dumpArg = args.find((a) => a.startsWith("--dump="))?.slice("--dump=".length);
  const examsArg = args.find((a) => a.startsWith("--exams="))?.slice("--exams=".length);
  const allowed = examsArg ? new Set(examsArg.split("|").map((x) => x.trim())) : null;

  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  if (revertArg) return revert(client, revertArg, apply);

  const all = await fetchCandidates(client);
  const scoped = all
    .filter((r) => (examArg ? r.exam === examArg : true))
    .filter((r) => (allowed ? allowed.has(r.exam) : true));

  const changed: (Flat & { after: string })[] = [];
  let skippedTable = 0;
  let noChange = 0;
  for (const r of scoped) {
    const res = layoutStatements(r.text);
    if (res.skipped === "table") skippedTable += 1;
    else if (res.changed) changed.push({ ...r, after: res.text });
    else noChange += 1;
  }

  console.log(
    `\ncandidates ${scoped.length}${examArg ? ` (exam=${examArg})` : ""} · ` +
      `to repair ${changed.length} · already fine ${noChange} · skipped (has a table) ${skippedTable}\n`
  );

  const byExam = new Map<string, number>();
  for (const c of changed) {
    const k = `${c.exam} / ${c.subject}`;
    byExam.set(k, (byExam.get(k) ?? 0) + 1);
  }
  for (const [k, n] of [...byExam.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${String(n).padStart(4)}  ${k}`);
  }

  if (dumpArg) {
    // Every proposed rewrite, for review before anything is written.
    writeFileSync(dumpArg, JSON.stringify(changed, null, 2));
    console.log(`\ndumped ${changed.length} proposed rewrite(s) to ${dumpArg}`);
  }

  const SHOW = apply ? 3 : 8;
  console.log(`\n─── sample rewrites (${Math.min(SHOW, changed.length)} of ${changed.length}) ───`);
  for (const c of changed.slice(0, SHOW)) {
    console.log(`\n${c.id}  [${c.exam} / ${c.subject} / ${c.chapter}]`);
    console.log(`  before: ${preview(c.text)}`);
    console.log(`  after : ${preview(c.after)}`);
  }

  if (!apply) {
    console.log(`\n[dry-run] pass --apply to write. Nothing written.`);
    return;
  }
  if (changed.length === 0) {
    console.log(`\nnothing to do.`);
    return;
  }

  mkdirSync(SNAPSHOT_DIR, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const snapFile = join(SNAPSHOT_DIR, `statement-newlines-${stamp}.json`);
  writeFileSync(
    snapFile,
    JSON.stringify(
      changed.map((c) => ({ id: c.id, before: c.text, after: c.after })),
      null,
      2
    )
  );
  console.log(`\nsnapshot: ${snapFile}`);

  let written = 0;
  for (const c of changed) {
    // text ONLY — content_hash is left as-is on purpose (see the header).
    const { error } = await client.from("questions").update({ text: c.after }).eq("id", c.id);
    if (error) throw new Error(`update ${c.id}: ${error.message}`);
    written += 1;
  }
  console.log(`updated ${written} row(s).`);

  // Verify from the database rather than trusting the writes.
  const ids = changed.map((c) => c.id);
  const wanted = new Map(changed.map((c) => [c.id, c.after]));
  let mismatched = 0;
  for (let i = 0; i < ids.length; i += 200) {
    const { data, error } = await client
      .from("questions")
      .select("id, text")
      .in("id", ids.slice(i, i + 200));
    if (error) throw new Error(`verify: ${error.message}`);
    for (const r of data ?? []) if (r.text !== wanted.get(r.id as string)) mismatched += 1;
  }
  console.log(mismatched === 0 ? `verified ${ids.length} row(s) match.` : `⚠ ${mismatched} MISMATCH`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
