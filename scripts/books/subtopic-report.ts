/**
 * Measure whether a chapter can be grouped by subtopic (layout A).
 *
 *   npx tsx scripts/books/subtopic-report.ts
 *   npx tsx scripts/books/subtopic-report.ts --chapter=grammar
 *
 * WHY THIS EXISTS: `BookChapter.groupSubtopics` is gated on "no set spans a
 * subtopic", and the counts backing that rule live in a hand-written registry
 * comment. A number in a comment cannot be re-checked, and this bank grows —
 * so the gate is re-measured here instead, for every chapter at once, including
 * the ones already grouped.
 *
 * IT REPORTS TWO DIFFERENT THINGS, because "can we group this?" has two
 * answers depending on what a SET is in that chapter:
 *
 *   - a set whose shared `context` is a real PASSAGE (Reading Comprehension,
 *     Cloze) is order-locked: its questions are unanswerable away from it, so
 *     the set can never be split and grouping is decided by whether whole sets
 *     land in one subtopic;
 *   - a set whose `context` is just a repeated DIRECTIONS line carries no such
 *     constraint — the line is identical for every question under it, and
 *     layout A replaces it with one authored block line anyway.
 *
 * So the median context length is reported beside the spanning count: together
 * they say whether a spanning set is a blocker or merely a regrouping.
 *
 * THE HEADLINE COUNTS ARE MEASURED AGAINST BLOCKS, not raw subtopics, so a
 * chapter that merges several subtopics into one block (Grammar) reads clean
 * rather than reporting a permanent false alarm about the very grouping it
 * validated. The two detail modes below deliberately do the OPPOSITE and show
 * RAW subtopics — `--spanning` so you can see what a merge absorbed, and
 * `--directions` so you can judge each bank subtopic's wordings on their own.
 *
 * Read-only. SERVICE-ROLE, because the book tables are RLS-locked.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { selectBook } from "./selectBook";
import { loadBookChapter } from "../../src/lib/books/query";
import type { BookSection } from "../../src/lib/books/order";
import type { QuestionRow } from "../../src/lib/questions/query";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

function arg(name: string): string | undefined {
  return process.argv.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3);
}

function median(xs: number[]): number {
  if (xs.length === 0) return 0;
  const s = [...xs].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : Math.round((s[mid - 1] + s[mid]) / 2);
}

/**
 * A passage is not a length, it is a KIND — but length separates the two kinds
 * cleanly in this book (Directions lines run ~120-210 chars, passages ~1,000+),
 * so it is used as the discriminator and the raw number is always printed so a
 * reader can disagree with the call.
 */
const PASSAGE_CHARS = 400;

type SectionReport = {
  title: string;
  questions: number;
  sets: number;
  /** Sets whose questions do not all share one subtopic. */
  spanningSets: number;
  /** Questions living in such a set — the population a set-level grouping mislabels. */
  questionsInSpanningSets: number;
  medianContext: number;
  /** Fragments a QUESTION-level grouping would cut the sets into. */
  fragments: number;
  /**
   * Questions that would print under a block naming a subtopic that is NOT
   * theirs, if grouping used the EXISTING set-level mechanism (a set takes its
   * first question's subtopic). This is the direct harm, and it is much smaller
   * than `questionsInSpanningSets` whenever a spanning set is nearly pure.
   */
  mislabelled: number;
  subtopics: { name: string; questions: number; sets: number }[];
};

function analyseSection(
  section: BookSection,
  byId: Map<string, QuestionRow>,
  /**
   * Bank subtopic -> the BLOCK it prints under. Measuring against the raw
   * subtopics would report a chapter that merges some of them as permanently
   * "spanning" — a false alarm on the very chapter whose grouping is correct.
   * Empty for an ungrouped chapter, which is what you want when deciding.
   */
  blockOf: Map<string, string>
): SectionReport {
  const subtopicOf = (id: string) => {
    const name = byId.get(id)?.subtopic?.name ?? "(none)";
    return blockOf.get(name) ?? name;
  };

  let spanningSets = 0;
  let questionsInSpanningSets = 0;
  let fragments = 0;
  let mislabelled = 0;
  const contexts: number[] = [];
  const perSubtopic = new Map<string, { questions: number; sets: Set<string> }>();

  for (const set of section.sets) {
    const names = set.questionIds.map(subtopicOf);
    const distinct = new Set(names);
    if (distinct.size > 1) {
      spanningSets += 1;
      questionsInSpanningSets += set.questionIds.length;
    }
    // `toBlocks` files a whole set under its FIRST question's subtopic, so
    // every other question in it prints under a heading that is not its own.
    mislabelled += names.filter((n) => n !== names[0]).length;
    // A fragment is a RUN of consecutive questions sharing a subtopic: it is
    // what a question-level grouping would actually have to move as a unit.
    for (let i = 0; i < names.length; i++) {
      if (i === 0 || names[i] !== names[i - 1]) fragments += 1;
    }
    contexts.push((byId.get(set.questionIds[0])?.context ?? "").length);

    for (const id of set.questionIds) {
      const name = subtopicOf(id);
      const entry = perSubtopic.get(name) ?? { questions: 0, sets: new Set<string>() };
      entry.questions += 1;
      entry.sets.add(set.key);
      perSubtopic.set(name, entry);
    }
  }

  return {
    title: section.title,
    questions: section.sets.reduce((n, s) => n + s.questionIds.length, 0),
    sets: section.sets.length,
    spanningSets,
    questionsInSpanningSets,
    medianContext: median(contexts),
    fragments,
    mislabelled,
    subtopics: Array.from(perSubtopic.entries())
      .map(([name, v]) => ({ name, questions: v.questions, sets: v.sets.size }))
      .sort((a, b) => b.questions - a.questions),
  };
}

async function main() {
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const book = selectBook();
  const only = arg("chapter");
  const chapters = only ? book.chapters.filter((c) => c.slug === only) : book.chapters;
  if (only && chapters.length === 0) throw new Error(`no chapter with slug "${only}"`);

  for (const chapter of chapters) {
    const view = await loadBookChapter(client, book, chapter);
    const blockOf = new Map<string, string>();
    for (const def of chapter.groupSubtopics ?? []) {
      for (const member of def.members ?? [def.name]) blockOf.set(member, def.name);
    }
    const merged = (chapter.groupSubtopics ?? []).filter((d) => (d.members?.length ?? 0) > 1);
    const reports = view.sections.map((s) => analyseSection(s, view.questionsById, blockOf));

    const grouped = chapter.groupSubtopics ? "GROUPED" : "flat";
    const spanning = reports.reduce((n, r) => n + r.spanningSets, 0);
    const sets = reports.reduce((n, r) => n + r.sets, 0);
    const affected = reports.reduce((n, r) => n + r.questionsInSpanningSets, 0);
    const wrong = reports.reduce((n, r) => n + r.mislabelled, 0);
    const ctx = median(reports.map((r) => r.medianContext));
    const kind = ctx >= PASSAGE_CHARS ? "PASSAGE" : "directions-line";
    const distinct = new Set(reports.flatMap((r) => r.subtopics.map((s) => s.name))).size;

    console.log(`\n${"=".repeat(78)}`);
    console.log(
      `${chapter.name}  [${grouped}]  ${view.total} q · ${sets} sets · ${distinct} subtopics`
    );
    console.log(
      `  spanning ${spanning} sets (${affected} q) · ` +
        `${wrong} q would print under the WRONG heading · context ~${ctx} chars = ${kind}`
    );
    // Say so out loud: the counts above are measured against the BLOCKS, so a
    // reader does not mistake a merged chapter's clean result for the raw
    // subtopics being clean.
    for (const def of merged) {
      console.log(`  merged block "${def.name}" <- ${def.members!.join(" + ")}`);
    }

    for (const r of reports) {
      console.log(
        `  ${r.title.padEnd(9)} ${String(r.questions).padStart(4)} q  ` +
          `${String(r.sets).padStart(3)} sets  ` +
          `spanning ${String(r.spanningSets).padStart(3)}  ` +
          `frags ${String(r.fragments).padStart(4)}  ` +
          `ctx ~${String(r.medianContext).padStart(5)}`
      );
      for (const s of r.subtopics) {
        console.log(
          `      ${s.name.padEnd(52)} ${String(s.questions).padStart(4)} q  ${String(s.sets).padStart(3)} sets`
        );
      }
    }

    // `--directions` answers the OTHER registry decision: a block may carry one
    // authored Directions line only where every set under it genuinely shares
    // an instruction. Where the wordings differ but say the same thing, one
    // line is an improvement; where they describe different tasks, it would be
    // false — so the distinct wordings are printed rather than just counted.
    if (process.argv.includes("--directions")) {
      for (const section of view.sections) {
        const subtopicOf = (id: string) =>
          view.questionsById.get(id)?.subtopic?.name ?? "(none)";
        const byName = new Map<string, Map<string, number>>();
        for (const set of section.sets) {
          const name = subtopicOf(set.questionIds[0]);
          const dir = (view.questionsById.get(set.questionIds[0])?.context ?? "")
            .replace(/\s+/g, " ")
            .trim();
          const seen = byName.get(name) ?? new Map<string, number>();
          seen.set(dir, (seen.get(dir) ?? 0) + 1);
          byName.set(name, seen);
        }
        console.log(`\n  ${section.title} — Directions wordings per subtopic`);
        for (const [name, seen] of byName) {
          const total = [...seen.values()].reduce((a, b) => a + b, 0);
          console.log(`    ${name} — ${seen.size} distinct across ${total} sets`);
          // EVERY wording, never a top-N: authoring one line for the block is a
          // claim about every set under it, and the unseen tail is exactly
          // where a different task would be hiding.
          for (const [d, n] of [...seen.entries()].sort((a, b) => b[1] - a[1])) {
            console.log(`        ${String(n).padStart(2)}x ${JSON.stringify(d.slice(0, 96))}`);
          }
        }
      }
    }

    // `--spanning` shows the sets that block set-level grouping, question by
    // question. The COUNT says how big the problem is; only the sequence says
    // what KIND of problem it is — whether a set is nearly pure with one stray
    // question, or genuinely alternates subtopic every question.
    if (process.argv.includes("--spanning")) {
      for (const section of view.sections) {
        const subtopicOf = (id: string) =>
          view.questionsById.get(id)?.subtopic?.name ?? "(none)";
        const spanningSets = section.sets.filter(
          (s) => new Set(s.questionIds.map(subtopicOf)).size > 1
        );
        if (spanningSets.length === 0) continue;

        // Initials keep a 10-question sequence on one line; the legend below
        // makes them readable without inventing a code nobody can decode.
        const names = Array.from(
          new Set(section.sets.flatMap((s) => s.questionIds.map(subtopicOf)))
        ).sort();
        const letter = new Map(names.map((n, i) => [n, String.fromCharCode(65 + i)]));

        console.log(`\n  ${section.title} — ${spanningSets.length} spanning sets`);
        for (const n of names) console.log(`      ${letter.get(n)} = ${n}`);
        for (const set of spanningSets) {
          const seq = set.questionIds.map((id) => letter.get(subtopicOf(id))).join("");
          const tally = new Map<string, number>();
          for (const id of set.questionIds) {
            const n = subtopicOf(id);
            tally.set(n, (tally.get(n) ?? 0) + 1);
          }
          const biggest = Math.max(...tally.values());
          console.log(
            `    ${set.label.padEnd(16)} ${String(set.questionIds.length).padStart(3)} q  ` +
              `${seq.padEnd(22)} ${tally.size} subtopics, biggest ${biggest}`
          );
        }
      }
    }

    // The two exams' subtopic vocabularies must line up, or the contents table
    // grows a row per exam-specific spelling of the same idea.
    const [a, b] = reports;
    if (a && b) {
      const namesA = new Set(a.subtopics.map((s) => s.name));
      const namesB = new Set(b.subtopics.map((s) => s.name));
      const onlyA = [...namesA].filter((n) => !namesB.has(n));
      const onlyB = [...namesB].filter((n) => !namesA.has(n));
      if (onlyA.length || onlyB.length) {
        console.log(
          `  ! subtopics not shared — ${a.title} only: [${onlyA.join(", ") || "-"}] · ` +
            `${b.title} only: [${onlyB.join(", ") || "-"}]`
        );
      } else {
        console.log(`  = both exams use the same ${namesA.size} subtopic names`);
      }
    }
  }
  console.log();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
