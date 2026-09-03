/**
 * board:order — write BOOK order into `chapters.order_index`.
 *
 *   npm run board:order              # dry run: print the proposed order, write nothing
 *   npm run board:order -- --apply   # write
 *   npm run board:order -- --exam="Maharashtra HSC Class 12"   # scope to one exam
 *
 * WHY. `order_index` is written by src/lib/upload/taxonomy.ts as `max + 1` when
 * a chapter auto-creates, so it records INGEST order, not book order — and for
 * the exams built by parallel agents it is degenerate (ties and gaps), which
 * means the caller's tiebreak decides and the order is effectively arbitrary.
 * `/board`'s exam hub and `/browse`'s chapter dropdown both sort on it.
 *
 * The book position comes from each pipeline's own config (see ./order.ts for
 * the derivation and why it can't come from the questions themselves).
 *
 * ⚠ RE-RUN THIS AFTER AN INGEST. A newly auto-created chapter still lands at
 * `max + 1`, i.e. at the end, whatever its position in the book.
 *
 * ⚠ THIS ALSO REORDERS THE /browse CHAPTER DROPDOWN for these exams
 * (src/lib/questions/taxonomy.ts `listChapters` sorts on the same column). That
 * is intended — it is the same list — but it is a second shipped surface, and
 * it is cached (TAXONOMY_TTL_SECONDS), so the change is not instant.
 */
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { bookSortKey, assignChapterOrder, type ChapterSource } from "./order";
import { CHAPTERS as SB12, EXAM_ID as SB12_EXAM } from "../stateboard/config";
import { CHAPTERS as SB11, EXAM_ID as SB11_EXAM } from "../mh-sb-11/config";
import { CHAPTERS as SB9, EXAM_ID as SB9_EXAM } from "../mh-sb-9/config";
import { CHAPTERS as SSC10, EXAM_ID as SSC10_EXAM } from "../mh-ssc-10-text/config";
import { CHAPTERS as NCERT, EXAM_ID_CBSE_12 } from "../ncert/config";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

type ConfigChapter = ChapterSource & { chapterName: string; subjectName: string; examId?: string };

/**
 * Every pipeline that feeds /board. `examId` is the fallback for configs whose
 * chapters don't carry one; ncert's do (it serves CBSE 11 AND 12 off one file),
 * so a per-chapter `examId` wins.
 */
const PIPELINES: { name: string; examId: string; chapters: Record<string, ConfigChapter> }[] = [
  { name: "stateboard", examId: SB12_EXAM, chapters: SB12 },
  { name: "mh-sb-11", examId: SB11_EXAM, chapters: SB11 },
  { name: "mh-sb-9", examId: SB9_EXAM, chapters: SB9 },
  { name: "mh-ssc-10-text", examId: SSC10_EXAM, chapters: SSC10 },
  { name: "ncert", examId: EXAM_ID_CBSE_12, chapters: NCERT as Record<string, ConfigChapter> },
];

type DbChapter = {
  id: string;
  name: string;
  order_index: number | null;
  subject: { id: string; name: string; exam_id: string };
};

/** Chapter → its book sort key, keyed `examId\u0000subject\u0000chapter`. */
function buildConfigIndex(): { keys: Map<string, number>; unplaceable: string[] } {
  const keys = new Map<string, number>();
  const unplaceable: string[] = [];
  for (const p of PIPELINES) {
    for (const [id, c] of Object.entries(p.chapters)) {
      const sortKey = bookSortKey(c);
      const k = `${c.examId ?? p.examId}\u0000${c.subjectName}\u0000${c.chapterName}`;
      if (sortKey === null) {
        unplaceable.push(`${p.name}/${id} (${c.chapterName}) — no chapter number in the filename and no pages[]`);
        continue;
      }
      // Two config entries claiming one chapter would silently make the order
      // depend on iteration order. It has never happened; say so if it does.
      const prev = keys.get(k);
      if (prev !== undefined && prev !== sortKey) {
        throw new Error(`two config entries disagree on the book position of "${c.chapterName}": ${prev} vs ${sortKey}`);
      }
      keys.set(k, sortKey);
    }
  }
  return { keys, unplaceable };
}

async function fetchChapters(client: SupabaseClient, examIds: string[]): Promise<DbChapter[]> {
  const { data, error } = await client
    .from("chapters")
    .select("id, name, order_index, subject:subjects!subject_id(id, name, exam_id)")
    .order("id", { ascending: true });
  if (error) throw new Error(`board:order chapters query: ${error.message}`);
  const flat = (v: unknown) => (Array.isArray(v) ? v[0] : v) as DbChapter["subject"] | undefined;
  return ((data ?? []) as { id: string; name: string; order_index: number | null; subject: unknown }[])
    .map((r) => ({ ...r, subject: flat(r.subject)! }))
    .filter((r) => r.subject && examIds.includes(r.subject.exam_id));
}

/** Chapters that actually have /board rows — the set the reconciliation guards. */
async function fetchBoardChapterIds(client: SupabaseClient, examIds: string[]): Promise<Set<string>> {
  const ids = new Set<string>();
  const PAGE = 1000; // PostgREST caps a raw select at 1000 — page explicitly.
  for (const examId of examIds) {
    for (let from = 0; ; from += PAGE) {
      const { data, error } = await client
        .from("questions")
        .select("chapter_id")
        .eq("exam_id", examId)
        .eq("visibility", "PUBLIC")
        .not("section_seq", "is", null)
        .range(from, from + PAGE - 1);
      if (error) throw new Error(`board:order board-rows query: ${error.message}`);
      const rows = (data ?? []) as { chapter_id: string | null }[];
      for (const r of rows) if (r.chapter_id) ids.add(r.chapter_id);
      if (rows.length < PAGE) break;
    }
  }
  return ids;
}

async function main() {
  const apply = process.argv.includes("--apply");
  const examFilter = process.argv.find((a) => a.startsWith("--exam="))?.slice("--exam=".length);

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY required (.env.local)");
  const client = createClient(url, key, { auth: { persistSession: false } });

  const { keys, unplaceable } = buildConfigIndex();
  if (unplaceable.length) {
    console.error("REFUSING — config entries whose book position cannot be derived:");
    for (const u of unplaceable) console.error(`  • ${u}`);
    process.exit(1);
  }

  const examIds = [...new Set(PIPELINES.map((p) => p.examId).concat(Object.values(NCERT).map((c) => (c as ConfigChapter).examId!)))].filter(
    Boolean
  );
  const { data: exams } = await client.from("exams").select("id, name").in("id", examIds);
  const examName = new Map(((exams ?? []) as { id: string; name: string }[]).map((e) => [e.id, e.name]));

  const chapters = await fetchChapters(client, examIds);
  const boardChapterIds = await fetchBoardChapterIds(client, examIds);

  // ── Reconcile BOTH ways ────────────────────────────────────────────────────
  // A DB chapter that HAS /board rows but no config entry is a hard stop: it is
  // on the hub, so it will be ordered, and ordering it by anything but the book
  // is the bug this script exists to fix. A config entry with no DB chapter is
  // just not ingested yet — reported, not fatal.
  const orphanBoard: string[] = [];
  const seenConfigKeys = new Set<string>();
  for (const c of chapters) {
    const k = `${c.subject.exam_id}\u0000${c.subject.name}\u0000${c.name}`;
    if (keys.has(k)) seenConfigKeys.add(k);
    else if (boardChapterIds.has(c.id)) {
      orphanBoard.push(`${examName.get(c.subject.exam_id) ?? c.subject.exam_id} · ${c.subject.name} · ${c.name}`);
    }
  }
  if (orphanBoard.length) {
    console.error("REFUSING — these chapters have /board rows but no pipeline config names them:");
    for (const o of orphanBoard) console.error(`  • ${o}`);
    console.error("\nA chapter on the hub with no book position would be ordered arbitrarily. Add it to its config.");
    process.exit(1);
  }
  const notIngested = [...keys.keys()].filter((k) => !seenConfigKeys.has(k));

  // ── Assign, per subject ────────────────────────────────────────────────────
  const bySubject = new Map<string, { exam: string; subject: string; rows: DbChapter[] }>();
  for (const c of chapters) {
    const exam = examName.get(c.subject.exam_id) ?? c.subject.exam_id;
    if (examFilter && exam !== examFilter) continue;
    const g = bySubject.get(c.subject.id) ?? { exam, subject: c.subject.name, rows: [] };
    g.rows.push(c);
    bySubject.set(c.subject.id, g);
  }

  const updates: { id: string; orderIndex: number }[] = [];
  const groups = [...bySubject.values()].sort((a, b) => a.exam.localeCompare(b.exam) || a.subject.localeCompare(b.subject));
  for (const g of groups) {
    const ordered = assignChapterOrder(
      g.rows.map((c) => ({
        name: c.name,
        sortKey: keys.get(`${c.subject.exam_id}\u0000${c.subject.name}\u0000${c.name}`) ?? null,
        currentOrderIndex: c.order_index,
        id: c.id,
      }))
    ) as (ReturnType<typeof assignChapterOrder>[number] & { id: string })[];

    console.log(`\n${g.exam} · ${g.subject}`);
    for (const c of ordered) {
      const row = g.rows.find((r) => r.id === c.id)!;
      const moved = row.order_index !== c.orderIndex ? ` (was ${row.order_index ?? "null"})` : "";
      const tag = c.sortKey === null ? "  [not in the book — sorted after]" : boardChapterIds.has(c.id) ? "" : "  [config-named, no /board rows yet]";
      console.log(`  ${String(c.orderIndex).padStart(2)}. ${c.name}${moved}${tag}`);
      if (row.order_index !== c.orderIndex) updates.push({ id: c.id, orderIndex: c.orderIndex });
    }
  }

  if (notIngested.length) {
    console.log(`\nConfig entries with no chapter in the DB yet (${notIngested.length}) — not an error:`);
    for (const k of notIngested) {
      const [examId, subject, chapter] = k.split("\u0000");
      console.log(`  • ${examName.get(examId) ?? examId} · ${subject} · ${chapter}`);
    }
  }

  console.log(`\n${updates.length} chapter(s) would move across ${groups.length} subject(s).`);
  if (!apply) {
    console.log("Dry run — nothing written. Re-run with --apply to write.");
    return;
  }
  for (const u of updates) {
    const { error } = await client.from("chapters").update({ order_index: u.orderIndex }).eq("id", u.id);
    if (error) throw new Error(`board:order update ${u.id}: ${error.message}`);
  }
  console.log(`Applied ${updates.length} update(s).`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
