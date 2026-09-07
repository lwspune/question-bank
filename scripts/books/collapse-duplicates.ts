/**
 * Collapse a book's repeated questions, so a chapter prints each one ONCE with
 * a line saying how often it was asked.
 *
 *   npx tsx scripts/books/collapse-duplicates.ts --book=mht-cet-maths
 *   npx tsx scripts/books/collapse-duplicates.ts --book=mht-cet-maths --apply
 *   npx tsx scripts/books/collapse-duplicates.ts --book=mht-cet-maths --revert --apply
 *
 * IT ONLY TOUCHES GROUPS THE CORE CALLS SAFE. A group carrying any `review`
 * reason is listed and left exactly as it is — the answers disagree, the copies
 * are filed under two chapters, or the question lives in a figure the stem only
 * points at. Those need a person and the printed paper, and
 * `duplicate-report.ts` is where they are read.
 *
 * REFUSING A GROUP COSTS NOTHING, which is the property the whole design turns
 * on. Leaving a group alone means nothing is excluded, so every copy prints and
 * each speaks only for its own sitting — no badge, no special case, no stored
 * state that could contradict the decision later.
 *
 * IT EXCLUDES, IT NEVER DELETES. `book_questions.excluded` is a flag; the row
 * stays, struck through in the reader, and `--revert` puts it back. That is also
 * what makes the badge derivable: the sittings a printed question stands for are
 * exactly the sittings of the copies excluded in its favour.
 */
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { groupRepeats, type RecurrenceRow } from "../../src/lib/books/recurrence";
import {
  mhtCetSittingBySourceFile,
  mhtCetSittingOrdinals,
} from "../../src/lib/mocks/mhtcetSittings";
import { selectBook } from "./selectBook";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");
const REVERT = process.argv.includes("--revert");
const PAGE = 1000;

/** Marks a row this script excluded, so --revert can find exactly those. */
const NOTE_PREFIX = "collapsed:";

type Loaded = RecurrenceRow & { stemPreview: string };

async function main() {
  const book = selectBook();
  const client: SupabaseClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const { data: bookRow, error: bookErr } = await client
    .from("books")
    .select("id")
    .eq("slug", book.slug)
    .maybeSingle();
  if (bookErr) throw new Error(`books lookup failed - ${bookErr.message}`);
  if (!bookRow) throw new Error(`book "${book.slug}" has not been synced yet`);
  const bookId = bookRow.id as string;

  // ---- what the BOOK holds, not what the bank holds -----------------------
  // Exclusion is a decision about this book, so the scope must be the book's
  // own membership. A question the bank has and the book does not must not be
  // collapsed against one the book prints.
  type Stored = { question_id: string; excluded: boolean; note: string | null };
  const stored: Stored[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await client
      .from("book_questions")
      .select("question_id, excluded, note")
      .eq("book_id", bookId)
      .order("question_id")
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`book_questions read failed - ${error.message}`);
    const page = (data ?? []) as unknown as Stored[];
    stored.push(...page);
    if (page.length < PAGE) break;
  }

  if (REVERT) {
    const mine = stored.filter((r) => r.excluded && r.note?.startsWith(NOTE_PREFIX));
    console.log(`\n${book.title}\n${"-".repeat(72)}`);
    console.log(`  ${mine.length} row(s) were excluded by this script`);
    if (!APPLY) {
      console.log("  DRY RUN - pass --apply to restore them.\n");
      return;
    }
    for (const r of mine) {
      const { error } = await client
        .from("book_questions")
        .update({ excluded: false, note: null })
        .eq("book_id", bookId)
        .eq("question_id", r.question_id);
      if (error) throw new Error(`revert failed - ${error.message}`);
    }
    console.log(`  RESTORED ${mine.length} row(s).\n`);
    return;
  }

  // ---- the ordering + judgement facts, from the bank ----------------------
  const ids = stored.map((r) => r.question_id);
  const bySourceFile = mhtCetSittingBySourceFile();
  const ordinals = mhtCetSittingOrdinals();
  const rows: Loaded[] = [];
  // Chunked: `.in()` puts the list in the URL, which fails around 800 ids —
  // a different limit from the 1000-row page cap above, and only one is 1000.
  for (let i = 0; i < ids.length; i += 200) {
    const { data, error } = await client
      .from("questions")
      .select(
        "id, text, image_url, source_file, chapter:chapters!chapter_id(name), " +
          "subtopic:subtopics!subtopic_id(name), options(text, is_correct)"
      )
      .in("id", ids.slice(i, i + 200));
    if (error) throw new Error(`questions read failed - ${error.message}`);
    for (const q of (data ?? []) as unknown as Record<string, unknown>[]) {
      const sourceFile = (q.source_file as string) ?? null;
      const sitting = sourceFile ? bySourceFile.get(sourceFile) : undefined;
      const embed = (v: unknown): string | null => {
        const r = Array.isArray(v) ? v[0] : v;
        return r ? ((r as { name: string }).name ?? null) : null;
      };
      const text = (q.text as string) ?? "";
      rows.push({
        questionId: q.id as string,
        stem: text,
        stemPreview: text.replace(/\s+/g, " ").slice(0, 84),
        sittingOrdinal: sitting ? ordinals.get(sitting.key) ?? null : null,
        sittingLabel: sitting
          ? sitting.label
            ? `${sitting.year} - ${sitting.label}`
            : String(sitting.year)
          : `(unknown: ${sourceFile ?? "no source file"})`,
        chapter: embed(q.chapter) ?? "(none)",
        subtopic: embed(q.subtopic),
        answer:
          ((q.options as { text: string; is_correct: boolean }[]) ?? []).find((o) => o.is_correct)
            ?.text ?? null,
        hasFigure: q.image_url != null,
        preferred: sitting ? sitting.sourceFile === sourceFile : true,
      });
    }
  }

  const groups = groupRepeats(rows);
  const safe = groups.filter((g) => g.review.length === 0);
  const review = groups.filter((g) => g.review.length > 0);
  const alreadyExcluded = new Set(stored.filter((r) => r.excluded).map((r) => r.question_id));

  const writes: { questionId: string; note: string }[] = [];
  for (const g of safe) {
    for (const id of g.redundantIds) {
      if (alreadyExcluded.has(id)) continue; // idempotent
      const note =
        g.kind === "upload-duplicate"
          ? `${NOTE_PREFIX} the same paper uploaded twice (${g.sittings[0]}); this copy duplicates ${g.keeperId}`
          : `${NOTE_PREFIX} also asked in ${g.sittings.join(", ")}; collapsed into ${g.keeperId}`;
      writes.push({ questionId: id, note });
    }
  }

  const byId = new Map(rows.map((r) => [r.questionId, r]));
  console.log(`\n${book.title}\n${"-".repeat(72)}`);
  console.log(`  rows in the book              ${String(stored.length).padStart(5)}`);
  console.log(`  repeated-stem groups          ${String(groups.length).padStart(5)}`);
  console.log(`    safe -> collapse            ${String(safe.length).padStart(5)}`);
  console.log(`    flagged -> LEFT ALONE       ${String(review.length).padStart(5)}`);
  console.log(`  rows to exclude               ${String(writes.length).padStart(5)}`);
  console.log(`  already excluded              ${String(alreadyExcluded.size).padStart(5)}`);
  console.log(
    `  book will print               ${String(stored.length - alreadyExcluded.size - writes.length).padStart(5)}`
  );

  const badged = safe.filter((g) => g.kind === "repeat").length;
  console.log(`  questions earning a badge     ${String(badged).padStart(5)}`);

  if (review.length) {
    console.log(`\n  LEFT FOR REVIEW (run duplicate-report.ts to read them):`);
    for (const g of review.slice(0, 8)) {
      console.log(`    ${g.review.join(", ").padEnd(34)} ${byId.get(g.keeperId)?.stemPreview ?? ""}`);
    }
    if (review.length > 8) console.log(`    ... and ${review.length - 8} more`);
  }

  if (!APPLY) {
    console.log("\n  DRY RUN - pass --apply to write.\n");
    return;
  }

  for (const w of writes) {
    const { error } = await client
      .from("book_questions")
      .update({ excluded: true, note: w.note })
      .eq("book_id", bookId)
      .eq("question_id", w.questionId);
    if (error) throw new Error(`exclude failed - ${error.message}`);
  }
  console.log(`\n  APPLIED - ${writes.length} row(s) excluded.\n`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
