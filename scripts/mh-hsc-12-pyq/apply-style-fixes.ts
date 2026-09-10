/**
 * Apply the adjudicated BOARD-ANSWER style fixes to already-shipped rows.
 *
 *   npx tsx scripts/mh-hsc-12-pyq/apply-style-fixes.ts          # dry-run
 *   npx tsx scripts/mh-hsc-12-pyq/apply-style-fixes.ts --apply
 *
 * These four rows shipped before `scripts/lib/boardAnswerStyle.ts` existed and
 * carry the defect it now blocks: a trailing parenthetical that names the other
 * options BY LETTER, and in one case an aside telling a marker what else would
 * be accepted. Naming a letter in prose is also what makes `audit:keys` misfire,
 * so this closes a live probe-noise source as well.
 *
 * THE FIX KEEPS THE TEACHING. Each parenthetical explains why the other options
 * fail, which is worth having; only the LETTERS go, replaced by the values they
 * name. Deleting the explanation would be the easy fix and the worse one.
 *
 * SAFE AS AN IN-PLACE UPDATE. `content_hash` covers stem + options + answer and
 * EXCLUDES `solution`, so editing a solution neither changes the row's identity
 * nor requires the delete-and-re-commit dance. (Contrast the escaped-bracket
 * item in the backfill ledger, which touches a STEM and therefore cannot be an
 * UPDATE.)
 *
 * Writes BOTH the committed JSON and the live row. Fixing only the database
 * leaves the next re-commit to revert it; fixing only the JSON leaves the
 * defect live. Refuses unless the two agree beforehand.
 *
 * ⚠ IT PATCHES `<id>.solutions.json`, NOT `<id>.questions.json`. The latter is
 * DERIVED — `merge.ts` rewrites it from the solutions file every time it runs —
 * so a fix written there survives only until the next merge. The first version
 * of this script patched the derived file and a routine `merge.ts` run silently
 * reverted all three trig-functions rows within the minute. Same shape as the
 * standing rule that `apply-errata` must be a chapter's LAST write: know which
 * file is upstream before editing either.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { EXAM_ID, CHAPTERS, DATA } from "./config";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

type Fix = { ref: string; from: string; to: string; why: string };

const FIXES: Fix[] = [
  {
    ref: "app-derivatives-12-pyq#24",
    why:
      "The closing bracket told a marker what else would be accepted. The CHECK it " +
      "opens with is exactly the convention this corpus uses and is kept; the " +
      "alternative-form remark is rewritten as advice to the student about their own " +
      "answer rather than to whoever is marking it.",
    from:
      "[The true value is \\(0.786397\\ldots\\), so the approximation is correct to four decimal places. " +
      "Leaving the answer as \\(\\frac{\\pi}{4} + 0.001\\) is also acceptable when no value of \\(\\pi\\) is given.]",
    to:
      "**Check:** the true value is \\(\\tan^{-1}(1.002) = 0.786397\\ldots\\), so the approximation is correct " +
      "to four decimal places. Since the paper supplies no value of \\(\\pi\\), the answer may equally be " +
      "left in the form \\(\\dfrac{\\pi}{4} + 0.001\\).",
  },
  {
    ref: "trig-functions-12-pyq#1",
    why: "Names the rejected values instead of their option letters.",
    from:
      "(Option D, \\(\\dfrac{3\\pi}{2}\\), is outside the principal branch and in any case " +
      "\\(\\cos\\dfrac{3\\pi}{2} = 0\\); options A and B give \\(+\\dfrac{1}{2}\\) and \\(\\dfrac{\\sqrt{3}}{2}\\).)",
    to:
      "The other values do not satisfy the equation: \\(\\cos\\dfrac{\\pi}{3} = +\\dfrac{1}{2}\\) and " +
      "\\(\\cos\\dfrac{\\pi}{6} = \\dfrac{\\sqrt{3}}{2}\\), while \\(\\dfrac{3\\pi}{2}\\) lies outside the " +
      "principal branch \\([0,\\ \\pi]\\) and in any case \\(\\cos\\dfrac{3\\pi}{2} = 0\\).",
  },
  {
    ref: "trig-functions-12-pyq#8",
    why: "Names the rejected values instead of their option letters.",
    from:
      "(Options A and D contain \\(\\dfrac{\\pi}{6}\\), where \\(\\cot x = +\\sqrt{3}\\); option B's " +
      "\\(\\dfrac{7\\pi}{6}\\) is in the third quadrant, where \\(\\cot x\\) is also \\(+\\sqrt{3}\\).)",
    to:
      "The rejected values fail on sign: \\(\\cot\\dfrac{\\pi}{6} = +\\sqrt{3}\\), and \\(\\dfrac{7\\pi}{6}\\) " +
      "lies in the third quadrant, where \\(\\cot x\\) is also \\(+\\sqrt{3}\\).",
  },
  {
    ref: "trig-functions-12-pyq#15",
    why: "Names the rejected values instead of their option letters.",
    from:
      "(Cosine is positive in the first and fourth quadrants, which rules out options A and D, whose second " +
      "angles \\(\\dfrac{5\\pi}{6}\\) and \\(\\dfrac{2\\pi}{3}\\) are in the second quadrant; option C's " +
      "\\(\\dfrac{7\\pi}{6}\\) is in the third.)",
    to:
      "Cosine is positive only in the first and fourth quadrants, so \\(\\dfrac{5\\pi}{6}\\) and " +
      "\\(\\dfrac{2\\pi}{3}\\), which lie in the second quadrant, and \\(\\dfrac{7\\pi}{6}\\), which lies in " +
      "the third, are all rejected.",
  },
];

type Row = { ref: string; stem: string; solution?: string };
type Sol = { ref: string; answer: string };
const chapterOf = (ref: string) => ref.split("#")[0];

async function main() {
  const apply = process.argv.includes("--apply");
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );

  const sols = new Map<string, Sol[]>();
  const problems: string[] = [];
  const planned: { fix: Fix; id: string; next: string }[] = [];

  for (const fix of FIXES) {
    const id = chapterOf(fix.ref);
    // UPSTREAM file. questions.json is regenerated from this one by merge.ts.
    if (!sols.has(id)) {
      sols.set(id, JSON.parse(readFileSync(join(DATA, `${id}.solutions.json`), "utf8")) as Sol[]);
    }
    const sol = sols.get(id)!.find((s) => s.ref === fix.ref);
    if (!sol?.answer) {
      problems.push(`${fix.ref}: not in ${id}.solutions.json, or has no answer`);
      continue;
    }
    // The derived file must currently agree with the upstream one, or a merge is
    // outstanding and the two records have already diverged.
    const qrows = JSON.parse(
      readFileSync(join(DATA, `${id}.questions.json`), "utf8"),
    ) as Row[];
    const row = qrows.find((r) => r.ref === fix.ref);
    if (!row?.solution) {
      problems.push(`${fix.ref}: not in ${id}.questions.json`);
      continue;
    }
    if (row.solution !== sol.answer) {
      problems.push(`${fix.ref}: questions.json disagrees with solutions.json — run merge.ts first`);
      continue;
    }
    const hits = sol.answer.split(fix.from).length - 1;
    if (hits !== 1) {
      problems.push(`${fix.ref}: ${hits} occurrences of the target text (need exactly 1)`);
      continue;
    }

    // The live row must match the JSON BEFORE the edit. If they already differ,
    // something else has touched this solution and the two records must be
    // reconciled by hand rather than overwritten.
    const { data, error } = await client
      .from("questions")
      .select("id,solution")
      .eq("exam_id", EXAM_ID)
      .eq("source_file", CHAPTERS[id].sourceFile)
      .eq("text", row.stem);
    if (error) throw error;
    if (data?.length !== 1) {
      problems.push(`${fix.ref}: matched ${data?.length ?? 0} live rows by stem (need exactly 1)`);
      continue;
    }
    const next = sol.answer.replace(fix.from, fix.to);
    // The live row must match the source BEFORE the edit — unless it is already
    // the fixed text, which is what a re-run after a partial application looks
    // like. Both are fine; anything else means something outside this script
    // touched the solution and the two records must be reconciled by hand.
    if (data[0].solution !== sol.answer && data[0].solution !== next) {
      problems.push(`${fix.ref}: the live solution matches neither the source nor the fix — reconcile by hand`);
      continue;
    }
    planned.push({ fix, id: data[0].id, next });
  }

  if (problems.length) throw new Error(`REFUSING (${problems.length}):\n  ${problems.join("\n  ")}`);

  for (const p of planned) {
    console.log(`\n${p.fix.ref}  (${p.id})`);
    console.log(`  why : ${p.fix.why}`);
    console.log(`  from: ${JSON.stringify(p.fix.from.slice(0, 110))}`);
    console.log(`  to  : ${JSON.stringify(p.fix.to.slice(0, 110))}`);
  }

  if (!apply) {
    console.log(`\n[dry-run] ${planned.length} fix(es) ready. Pass --apply to write JSON + database.`);
    return;
  }

  for (const p of planned) {
    const rows = sols.get(chapterOf(p.fix.ref))!;
    rows.find((s) => s.ref === p.fix.ref)!.answer = p.next;
    const { error } = await client.from("questions").update({ solution: p.next }).eq("id", p.id);
    if (error) throw error;
  }
  for (const [id, rows] of sols) {
    writeFileSync(join(DATA, `${id}.solutions.json`), JSON.stringify(rows, null, 2) + "\n");
  }
  console.log(`\napplied ${planned.length} fix(es) to ${sols.size} solutions file(s) and to the database.`);
  console.log(`NOW RUN merge.ts for: ${[...sols.keys()].join(", ")}`);
}

main().catch((e) => {
  console.error(e.message ?? e);
  process.exit(1);
});
