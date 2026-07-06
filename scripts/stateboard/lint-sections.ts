/**
 * board:lint — the /board section-structure gate.
 *
 *   npx tsx scripts/stateboard/lint-sections.ts        # (npm run board:lint)
 *
 * The /board reader renders a board textbook chapter in book order off the
 * section_* columns (migration 0043). This gate guarantees that structure is
 * intact for every board exam, so a future ingest physically can't ship a
 * chapter whose book layout is missing or broken. It fails (exit 1) when, for
 * any board exam's TEXTBOOK rows (question_kind='practice'):
 *   • a PUBLIC row is missing any section field (kind/group/label/seq), or
 *   • a chapter's PUBLIC section_seq values aren't contiguous 1..N (a gap means
 *     an outline block matched nothing / a chapter is half-backfilled).
 * PRIVATE practice rows missing section fields are warnings (staged, pre-flip).
 *
 * PYQ rows (question_kind='pyq') are exempt — board PYQs live on the year axis,
 * not the textbook-section axis.
 */
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { BOARD_EXAMS } from "../../src/lib/exam/examContext";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

type Row = {
  id: string;
  question_number: string | null;
  visibility: "PUBLIC" | "PRIVATE";
  section_kind: string | null;
  section_group: string | null;
  section_label: string | null;
  section_seq: number | null;
  chapter: { name: string } | { name: string }[] | null;
};

async function fetchPracticeRows(client: SupabaseClient, examId: string): Promise<Row[]> {
  const out: Row[] = [];
  const PAGE = 1000; // PostgREST caps a raw select at 1000 — page explicitly.
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await client
      .from("questions")
      .select(
        "id, question_number, visibility, section_kind, section_group, section_label, section_seq, chapter:chapters!chapter_id(name)"
      )
      .eq("exam_id", examId)
      .eq("question_kind", "practice")
      .order("id", { ascending: true })
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`board:lint query: ${error.message}`);
    const batch = (data ?? []) as Row[];
    out.push(...batch);
    if (batch.length < PAGE) break;
  }
  return out;
}

const chapterName = (r: Row): string => {
  const c = Array.isArray(r.chapter) ? r.chapter[0] : r.chapter;
  return c?.name ?? "(unknown chapter)";
};

async function main() {
  loadEnv();
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const errors: string[] = [];
  const warnings: string[] = [];
  let checked = 0;

  for (const exam of BOARD_EXAMS) {
    const { data: examRow } = await client.from("exams").select("id").eq("name", exam.examName).maybeSingle();
    if (!examRow) continue; // exam not seeded yet
    const rows = await fetchPracticeRows(client, (examRow as { id: string }).id);
    if (rows.length === 0) continue;
    checked += rows.length;

    // 1) Field completeness.
    for (const r of rows) {
      const missing = (["section_kind", "section_group", "section_label", "section_seq"] as const).filter(
        (k) => r[k] === null || r[k] === undefined
      );
      if (missing.length === 0) continue;
      const where = `${exam.displayName} / ${chapterName(r)} / ${r.question_number ?? r.id}`;
      const msg = `${where}: missing ${missing.join(", ")}`;
      if (r.visibility === "PUBLIC") errors.push(msg);
      else warnings.push(msg);
    }

    // 2) Per-chapter PUBLIC section_seq contiguity (1..N, no gaps).
    const byChapter = new Map<string, Set<number>>();
    for (const r of rows) {
      if (r.visibility !== "PUBLIC" || r.section_seq === null) continue;
      const key = chapterName(r);
      (byChapter.get(key) ?? byChapter.set(key, new Set()).get(key)!).add(r.section_seq);
    }
    for (const [chapter, seqSet] of byChapter) {
      const seqs = [...seqSet].sort((a, b) => a - b);
      const expected = Array.from({ length: seqs.length }, (_, i) => i + 1);
      if (seqs.join(",") !== expected.join(",")) {
        errors.push(
          `${exam.displayName} / ${chapter}: section_seq not contiguous 1..${seqs.length} (got ${seqs.join(",")})`
        );
      }
    }
  }

  console.log(`board:lint — checked ${checked} textbook (practice) rows across ${BOARD_EXAMS.length} board exam(s).`);
  if (warnings.length) {
    console.log(`\n${warnings.length} warning(s) (PRIVATE rows missing section structure — fine pre-flip):`);
    for (const w of warnings.slice(0, 20)) console.log(`  · ${w}`);
    if (warnings.length > 20) console.log(`  … +${warnings.length - 20} more`);
  }
  if (errors.length) {
    console.error(`\n✗ ${errors.length} error(s):`);
    for (const e of errors) console.error(`  ✗ ${e}`);
    console.error(`\nboard:lint FAILED — backfill the chapter (scripts/stateboard/backfill-sections.ts) before shipping.`);
    process.exit(1);
  }
  console.log("\n✓ board:lint passed — every PUBLIC board textbook question has intact book structure.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
