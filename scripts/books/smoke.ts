/**
 * Drive the /books loaders the way the pages do.
 *
 *   npx tsx scripts/books/smoke.ts
 *   npx tsx scripts/books/smoke.ts --chapter=vocabulary
 *
 * WHY THIS EXISTS: every /books route is auth-gated and `force-dynamic`, so
 * `next build` never executes one. A green build proves those pages COMPILE
 * and nothing more — the loaders, the ordering and the set grouping are all
 * unexercised by the gate. This runs them against the live bank and asserts
 * the invariants that matter, so "it works" rests on a measurement rather than
 * on the build being green.
 *
 * Read-only. SERVICE-ROLE, because `books`/`book_questions` are RLS-locked
 * (enabled, no policies) and unreachable by any other key — the same client the
 * superadmin-gated pages use.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { NDA_CDS_ENGLISH, bookExams } from "../../src/lib/books/registry";
import { loadBookChapter, loadBookOverview } from "../../src/lib/books/query";
import { chapterContents, numberChapter } from "../../src/lib/books/print";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

function arg(name: string): string | undefined {
  return process.argv.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3);
}

const problems: string[] = [];
function check(ok: boolean, message: string) {
  if (!ok) problems.push(message);
}

async function main() {
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const book = NDA_CDS_ENGLISH;
  const overview = await loadBookOverview(client, book);

  console.log(`\n${book.title}`);
  console.log(`${"-".repeat(64)}`);
  for (const row of overview.chapters) {
    const split = bookExams(book).map((e) => `${e} ${String(row.byExam[e] ?? 0).padStart(4)}`).join("  ");
    console.log(`  ${row.chapter.name.padEnd(24)} ${split}   total ${String(row.total).padStart(4)}`);
    check(row.total > 0, `${row.chapter.name}: renders EMPTY — the registry name may not match the bank`);
  }
  console.log(`  ${"".padEnd(24)} ${"".padEnd(20)}   TOTAL ${String(overview.total).padStart(4)}`);

  const only = arg("chapter");
  const chapters = only
    ? book.chapters.filter((c) => c.slug === only)
    : book.chapters;
  if (only && chapters.length === 0) {
    throw new Error(`no chapter with slug "${only}"`);
  }

  console.log(`\nChapter detail`);
  console.log(`${"-".repeat(64)}`);
  for (const chapter of chapters) {
    const view = await loadBookChapter(client, book, chapter);
    const summary = overview.chapters.find((c) => c.chapter.slug === chapter.slug)!;

    // The section contract: both halves, always, in NDA-then-CDS order.
    check(
      view.sections.map((s) => s.title).join(" | ") === "NDA PYQ | CDS PYQ",
      `${chapter.name}: section order is ${view.sections.map((s) => s.title).join(" | ")}`
    );

    // The TOC must not disagree with the chapter it links to.
    check(
      view.total === summary.total,
      `${chapter.name}: TOC says ${summary.total}, chapter renders ${view.total}`
    );

    for (const section of view.sections) {
      const ids = section.sets.flatMap((s) => s.questionIds);
      check(
        ids.length === section.questionCount,
        `${chapter.name}/${section.title}: count ${section.questionCount} != ${ids.length} ids`
      );
      check(
        new Set(ids).size === ids.length,
        `${chapter.name}/${section.title}: a question appears more than once`
      );
      check(
        section.questionCount === (summary.byExam[section.exam] ?? 0),
        `${chapter.name}/${section.title}: ${section.questionCount} vs TOC ${summary.byExam[section.exam]}`
      );

      // Every question the reader will try to draw must have been fetched —
      // a miss renders as a silently absent question, not an error.
      for (const id of ids) {
        if (!view.questionsById.has(id)) {
          problems.push(`${chapter.name}/${section.title}: question ${id} was ordered but not fetched`);
          break;
        }
      }

      // Layout A: where a chapter groups by subtopic, the blocks must account
      // for EVERY set. A subtopic present in the data but missing from the
      // registry list is appended rather than dropped, and this is what proves
      // it — silently losing questions is the failure mode that matters.
      if (section.blocks) {
        const inBlocks = section.blocks.flatMap((b) => b.sets.map((s) => s.key));
        check(
          inBlocks.length === section.sets.length,
          `${chapter.name}/${section.title}: blocks hold ${inBlocks.length} sets, section has ${section.sets.length}`
        );
        check(
          new Set(inBlocks).size === inBlocks.length,
          `${chapter.name}/${section.title}: a set appears in more than one block`
        );
        const blockQs = section.blocks.reduce((n, b) => n + b.questionCount, 0);
        check(
          blockQs === section.questionCount,
          `${chapter.name}/${section.title}: blocks hold ${blockQs} questions, section has ${section.questionCount}`
        );
      }

      // Sets must be non-decreasing by year: the half reads oldest-first.
      let lastYear = -Infinity;
      for (const set of section.sets) {
        const year = set.year ?? Infinity;
        check(
          year >= lastYear,
          `${chapter.name}/${section.title}: ${set.label} breaks chronological order`
        );
        lastYear = year;

        // Every question in a set shares the set's passage; if the first one
        // carries a context and a sibling carries a different one, the group
        // is wrong and the reader would print the wrong passage above it.
        const texts = new Set(
          set.questionIds.map((id) => view.questionsById.get(id)?.context ?? "")
        );
        check(
          texts.size <= 1,
          `${chapter.name}/${section.title}: ${set.label} groups questions with DIFFERENT contexts`
        );
      }
    }

    // ---- the printed chapter: numbering + its contents table ----
    // The contents is what a reader navigates by, and a wrong range is
    // invisible on the page: every question is still present and the table
    // still looks complete. So it is checked against the numbering it claims
    // to describe, on real chapters, here.
    const numbering = numberChapter(view.sections, view.excludedIds);
    const contents = chapterContents(view.sections, numbering);

    const covered = contents.columns
      .flatMap((c) =>
        c.range ? [...Array(c.range.to - c.range.from + 1)].map((_, i) => c.range!.from + i) : []
      )
      .sort((a, b) => a - b);
    check(
      covered.length === numbering.total &&
        covered.every((n, i) => n === i + 1),
      `${chapter.name}: contents covers ${covered.length} numbers, chapter prints ${numbering.total} — a gap or overlap between the halves`
    );

    for (const section of view.sections) {
      const column = contents.columns.findIndex((c) => c.key === section.key);
      check(column >= 0, `${chapter.name}/${section.title}: no contents column`);

      for (const block of section.blocks ?? []) {
        const live = block.sets
          .flatMap((s) => s.questionIds)
          .filter((id) => !view.excludedIds.includes(id)).length;
        const cell = contents.rows.find((r) => r.name === block.name)?.cells[column] ?? null;
        if (live === 0) continue; // an entirely-excluded block prints nothing and lists nothing
        check(
          cell != null && cell.count === live,
          `${chapter.name}/${section.title}: contents says ${cell?.count ?? "nothing"} for ${block.name}, the book prints ${live}`
        );
        // Contiguity is what lets a range stand in for a list of numbers.
        check(
          cell == null || cell.to - cell.from + 1 === cell.count,
          `${chapter.name}/${section.title}: ${block.name} spans ${cell!.from}-${cell!.to} but holds ${cell!.count} — the block is not consecutive in the numbering`
        );
      }
    }

    for (const section of view.sections) {
      if (!section.blocks) continue;
      const shape = section.blocks
        .map((b) => `${b.name} ${b.questionCount}${b.directions ? "*" : ""}`)
        .join("  |  ");
      console.log(`    ${section.title.padEnd(10)} ${shape}`);
    }

    // The contents as it will print, so a reader of this output sees the same
    // ranges the book does.
    const head = contents.columns.map((c) => c.title.padStart(14)).join("");
    console.log(`    ${"CONTENTS".padEnd(26)}${head}`);
    for (const row of contents.rows) {
      const cells = row.cells
        .map((c) => (c ? `Q.${c.from}-${c.to}` : "—").padStart(14))
        .join("");
      console.log(`    ${row.name.padEnd(26)}${cells}`);
    }
    const totals = contents.columns
      .map((c) => (c.range ? `Q.${c.range.from}-${c.range.to}` : "—").padStart(14))
      .join("");
    console.log(`    ${"All questions".padEnd(26)}${totals}`);

    const first = view.sections[0];
    const second = view.sections[1];
    console.log(
      `  ${chapter.name.padEnd(24)} ${String(first.sets.length).padStart(3)} sets / ${String(first.questionCount).padStart(4)} q` +
        `   |   ${String(second.sets.length).padStart(3)} sets / ${String(second.questionCount).padStart(4)} q` +
        `   first: ${first.sets[0]?.label ?? "—"}  last: ${second.sets.at(-1)?.label ?? "—"}`
    );
  }

  console.log();
  if (problems.length) {
    console.error(`FAIL — ${problems.length} problem(s):`);
    for (const p of problems) console.error(`  ! ${p}`);
    process.exit(1);
  }
  console.log("OK — every check passed.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
