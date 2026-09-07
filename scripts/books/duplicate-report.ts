/**
 * Which questions an exam has asked more than once, and which of those a human
 * must adjudicate before the book collapses them.
 *
 *   npx tsx scripts/books/duplicate-report.ts
 *   npx tsx scripts/books/duplicate-report.ts --review        # only the work list
 *   npx tsx scripts/books/duplicate-report.ts --chapter=Vectors
 *
 * WHY IT READS THE BANK, NOT THE BOOK: it runs BEFORE the first sync, to size
 * and classify the problem. It is scoped by (exam, subject) exactly as the book
 * will be.
 *
 * TRIAGE, NOT A GATE. It exits 0 whatever it finds. A repeat is a property of
 * the exam — MHT-CET genuinely re-asks questions — so a non-zero count is the
 * expected state, not a failure.
 *
 * READ THE `review` LIST BEFORE COLLAPSING ANYTHING. A group flagged there is
 * one where identical stem text does not prove one question: the answers
 * disagree, the copies are filed under different chapters, or the question
 * lives in a figure the stem only points at.
 */
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  groupRepeats,
  type RecurrenceRow,
  type RepeatGroup,
} from "../../src/lib/books/recurrence";
import {
  mhtCetSittingBySourceFile,
  mhtCetSittingOrdinals,
} from "../../src/lib/mocks/mhtcetSittings";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const EXAM = "MHT-CET";
const SUBJECT = "Maths";
const PAGE = 1000;

function arg(name: string): string | undefined {
  return process.argv.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3);
}
const REVIEW_ONLY = process.argv.includes("--review");

type Loaded = RecurrenceRow & { sourceFile: string | null; stemPreview: string };

/**
 * Every PUBLIC PYQ of the subject, as recurrence rows.
 *
 * Paged: a bare `.select()` is capped at 1000 by PostgREST and this subject is
 * already past 2,200, so an un-paged read would silently classify a fraction of
 * the corpus and report a clean-looking undercount.
 */
async function load(client: SupabaseClient): Promise<Loaded[]> {
  const { data: exam } = await client.from("exams").select("id").eq("name", EXAM).maybeSingle();
  if (!exam) throw new Error(`exam "${EXAM}" not found`);
  const { data: subject } = await client
    .from("subjects")
    .select("id")
    .eq("name", SUBJECT)
    .eq("exam_id", exam.id as string)
    .maybeSingle();
  if (!subject) throw new Error(`subject "${SUBJECT}" not found under ${EXAM}`);

  const bySourceFile = mhtCetSittingBySourceFile();
  const ordinals = mhtCetSittingOrdinals();

  const rows: Loaded[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await client
      .from("questions")
      .select(
        "id, text, image_url, source_file, chapter:chapters!chapter_id(name), " +
          "subtopic:subtopics!subtopic_id(name), options(text, is_correct)"
      )
      .eq("subject_id", subject.id as string)
      .eq("visibility", "PUBLIC")
      .eq("question_kind", "pyq")
      .order("id")
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`questions read failed - ${error.message}`);
    const page = data ?? [];

    for (const q of page as unknown as Record<string, unknown>[]) {
      const sourceFile = (q.source_file as string) ?? null;
      const sitting = sourceFile ? bySourceFile.get(sourceFile) : undefined;
      const correct = ((q.options as { text: string; is_correct: boolean }[]) ?? []).find(
        (o) => o.is_correct
      );
      const embed = (v: unknown): string | null => {
        const row = Array.isArray(v) ? v[0] : v;
        return row ? ((row as { name: string }).name ?? null) : null;
      };
      const text = (q.text as string) ?? "";
      rows.push({
        questionId: q.id as string,
        stem: text,
        stemPreview: text.replace(/\s+/g, " ").slice(0, 96),
        sittingOrdinal: sitting ? ordinals.get(sitting.key) ?? null : null,
        sittingLabel: sitting
          ? sitting.label
            ? `${sitting.year} - ${sitting.label}`
            : String(sitting.year)
          : `(unknown: ${sourceFile ?? "no source file"})`,
        chapter: embed(q.chapter) ?? "(none)",
        subtopic: embed(q.subtopic),
        answer: correct?.text ?? null,
        hasFigure: q.image_url != null,
        // A copy under the sitting's PRIMARY label beats one under the
        // duplicate-upload label it was merged from.
        preferred: sitting ? sitting.sourceFile === sourceFile : true,
        sourceFile,
      });
    }
    if (page.length < PAGE) break;
  }
  return rows;
}

function describe(g: RepeatGroup, byId: Map<string, Loaded>): string {
  const keeper = byId.get(g.keeperId)!;
  const lines: string[] = [];
  lines.push(`  ${keeper.stemPreview}`);
  lines.push(
    `    ${g.kind === "repeat" ? `REPEAT x${g.sittings.length}` : "duplicate upload"}` +
      `  |  ${keeper.chapter} / ${keeper.subtopic ?? "(none)"}` +
      (g.review.length ? `  |  REVIEW: ${g.review.join(", ")}` : "")
  );
  for (const id of [g.keeperId, ...g.redundantIds]) {
    const r = byId.get(id)!;
    const mark = id === g.keeperId ? "keep" : "drop";
    lines.push(
      `    [${mark}] ${r.sittingLabel.padEnd(26)} ${r.chapter} / ${r.subtopic ?? "-"}`
    );
    // Answers are printed for EVERY member of a flagged group: an
    // answer-conflict is unreadable without seeing both sides of it.
    if (g.review.includes("answer-conflict")) {
      lines.push(`           ans: ${(r.answer ?? "(none)").replace(/\s+/g, " ").slice(0, 88)}`);
    }
  }
  return lines.join("\n");
}

async function main() {
  const client: SupabaseClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const chapterFilter = arg("chapter");
  const all = await load(client);
  const rows = chapterFilter ? all.filter((r) => r.chapter === chapterFilter) : all;
  const byId = new Map(rows.map((r) => [r.questionId, r]));
  const groups = groupRepeats(rows);

  const dup = groups.filter((g) => g.kind === "upload-duplicate");
  const rep = groups.filter((g) => g.kind === "repeat");
  const safe = groups.filter((g) => g.review.length === 0);
  const review = groups.filter((g) => g.review.length > 0);
  const removed = (gs: RepeatGroup[]) => gs.reduce((n, g) => n + g.redundantIds.length, 0);

  console.log(`\n${EXAM} ${SUBJECT}${chapterFilter ? ` / ${chapterFilter}` : ""}`);
  console.log("-".repeat(72));
  console.log(`  questions in scope            ${String(rows.length).padStart(5)}`);
  console.log(`  repeated-stem groups          ${String(groups.length).padStart(5)}`);
  console.log(`    A. one sitting, uploaded 2x ${String(dup.length).padStart(5)}   ` +
    `${String(removed(dup)).padStart(4)} rows  (no badge - asked once)`);
  console.log(`    B. genuine repeat           ${String(rep.length).padStart(5)}   ` +
    `${String(removed(rep)).padStart(4)} rows  (earns a badge)`);
  console.log(`  safe to collapse automatically ${String(safe.length).padStart(4)}   ` +
    `${String(removed(safe)).padStart(4)} rows`);
  console.log(`  NEEDS REVIEW                   ${String(review.length).padStart(4)}   ` +
    `${String(removed(review)).padStart(4)} rows`);
  console.log(`  book prints                   ${String(rows.length - removed(groups)).padStart(5)}`);

  const byReason = new Map<string, number>();
  for (const g of review) for (const r of g.review) byReason.set(r, (byReason.get(r) ?? 0) + 1);
  if (byReason.size) {
    console.log("\n  review reasons (a group can carry several):");
    for (const [reason, n] of [...byReason].sort((a, b) => b[1] - a[1])) {
      console.log(`    ${reason.padEnd(18)} ${String(n).padStart(4)}`);
    }
  }

  console.log(`\n${"=".repeat(72)}\nNEEDS REVIEW - adjudicate against the source paper before collapsing`);
  console.log("=".repeat(72));
  for (const g of review) console.log(`\n${describe(g, byId)}`);

  if (!REVIEW_ONLY) {
    console.log(`\n${"=".repeat(72)}\nSAFE - collapse without further checking\n${"=".repeat(72)}`);
    for (const g of safe) console.log(`\n${describe(g, byId)}`);
  }
  console.log("");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
