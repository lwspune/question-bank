/**
 * One-off repair: replace two reader-addressing constructions in shipped
 * solutions with sentences that state the same thing AS the answer.
 *
 *   npx tsx scripts/mh-hsc-12-pyq/paper/fix-solution-asides.ts           # dry-run
 *   npx tsx scripts/mh-hsc-12-pyq/paper/fix-solution-asides.ts --apply
 *
 * ## What and why
 *
 * `SOLUTION_BRIEF.md` forbids an answer that addresses its reader or comments on
 * itself. `probeBoardAnswer` blocks the phrasings it knows ("worth noting", "By
 * the standard result", ...), and these two slipped past it because they are
 * phrased differently while doing exactly the same thing:
 *
 *  1. The LPP opener "The feasible region should be drawn on graph paper; the
 *     corner-point work below is the complete solution and names every vertex
 *     the sketch must show." — an instruction to the student plus a claim about
 *     the answer's own completeness.
 *  2. The circuit-construction closer "(There is no figure to draw here, so the
 *     circuit is described in words; the description above fixes it completely.)"
 *     — an apology for the medium.
 *
 * Both were flagged by the authoring passes that wrote them, and the second was
 * flagged independently by a later pass which declined to copy it. Neither is
 * wrong about the mathematics; both are the wrong voice.
 *
 * ## Safety
 *
 * `content_hash` covers the STEM, not the solution, so this is a plain UPDATE
 * rather than delete-and-re-commit. Rows are matched on their exact current
 * text and the script REFUSES a row whose text does not match, so a re-run after
 * an unrelated edit cannot silently clobber it.
 */
import { createClient } from "@supabase/supabase-js";
import { join } from "node:path";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

const LPP_OLD =
  "The feasible region should be drawn on graph paper; the corner-point work below is the complete solution and names every vertex the sketch must show.";
const LPP_NEW =
  "The feasible region is obtained by drawing each boundary line and keeping the side of it that satisfies its constraint. Its vertices are found below.";

const CIRCUIT_OLD =
  "\n\n(There is no figure to draw here, so the circuit is described in words; the description above fixes it completely.)";
const CIRCUIT_NEW =
  "\n\nThe lamp \\(L\\) therefore glows exactly when at least one of the two branches is closed, which is what the statement pattern asserts.";

const EDITS = [
  { what: "LPP opener", from: LPP_OLD, to: LPP_NEW },
  { what: "circuit closer", from: CIRCUIT_OLD, to: CIRCUIT_NEW },
];

async function main() {
  const apply = process.argv.includes("--apply");
  loadEnv();
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const { data, error } = await client
    .from("questions")
    .select("id, question_number, pyq_month, pyq_year, solution, source_file")
    .like("source_file", "MH_HSC_12_Maths_PYQ__%.pdf");
  if (error) throw new Error(error.message);

  const plan: { id: string; label: string; what: string; next: string }[] = [];
  for (const row of data ?? []) {
    const sol = String(row.solution ?? "");
    for (const edit of EDITS) {
      if (!sol.includes(edit.from)) continue;
      plan.push({
        id: String(row.id),
        label: `${row.pyq_month} ${row.pyq_year} ${row.question_number}`,
        what: edit.what,
        next: sol.replace(edit.from, edit.to),
      });
    }
  }

  if (!plan.length) {
    console.log("nothing to repair — no shipped solution carries either construction.");
    return;
  }
  for (const p of plan) console.log(`  ${p.label.padEnd(26)} ${p.what}`);

  if (!apply) {
    console.log(`\n[dry-run] ${plan.length} solution(s) would be rewritten. Pass --apply.`);
    return;
  }
  for (const p of plan) {
    const { error: uErr } = await client.from("questions").update({ solution: p.next }).eq("id", p.id);
    if (uErr) throw new Error(`${p.label}: ${uErr.message}`);
    console.log(`  rewrote ${p.label} (${p.what})`);
  }
  console.log(`\ndone. ${plan.length} solution(s) rewritten. content_hash is unaffected: it covers the stem.`);
}

main().catch((e) => {
  console.error(e.message ?? e);
  process.exit(1);
});
