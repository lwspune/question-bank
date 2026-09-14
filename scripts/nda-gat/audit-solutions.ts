/**
 * Read the stored solutions back OUT of the bank and flag what a student should
 * never see.
 *
 *   npx tsx scripts/nda-gat/audit-solutions.ts <paperId>
 *
 * Runs AFTER commit, against the DATABASE rather than the JSON, because the
 * question it answers is "what did a student actually get?" — and between the
 * derivation file and the row sit `buildRecords`, `normalizeNewlines` and
 * `commitStaged`.
 *
 * ## Why this exists on THIS pipeline in particular
 *
 * The derivation brief splits two fields with different audiences: `reasoning`
 * is REVIEWER EVIDENCE (it must name the runner-up on a MED item and admit when
 * a fact is past the deriver's cutoff), and `solution` is STUDENT-FACING and
 * optional. `buildRecords` ships `solution ?? reasoning` — so **an agent that
 * writes only `reasoning` ships its reviewer notes to students.**
 *
 * That is not hypothetical. On the sibling CDS Mathematics corpus exactly this
 * put reviewer jargon in front of students on 161 published rows ("RUNNER-UP:
 * option C, if …", "Verified with sympy") before it was caught.
 *
 * And this paper's brief ACTIVELY ASKS for two things that must not ship: a
 * named runner-up, and an explicit admission that a current-affairs fact is at
 * or past the deriver's knowledge cutoff. Both are exactly right in `reasoning`
 * and wrong in a solution.
 *
 * ## Every rule below is triage, not a verdict
 *
 * A GAT paper can legitimately be ABOUT a language model, an answer key, or a
 * review committee — the Oswaal ingest flagged a perfectly good question about
 * "the world's first government-funded multimodal large language model". So this
 * prints a list for a human and exits 0 on findings; it fails only when it could
 * not read the paper at all.
 */
import { config as loadEnv } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { EXAM_ID, requirePaper } from "./config";

loadEnv({ path: ".env.local", override: true });

type Rule = { id: string; why: string; re: RegExp };

const RULES: Rule[] = [
  {
    id: "REVIEWER-RUNNER-UP",
    why: "the brief ASKS for a runner-up note in `reasoning`; it must not ship as the solution",
    re: /\brunner[- ]?up\b|\bwould have to be true\b/i,
  },
  {
    id: "REVIEWER-CUTOFF",
    why: "the brief ASKS a deriver to admit a cutoff in `reasoning`; a student must not read it",
    re: /\b(knowledge|training)\s+cut[- ]?off\b|\bpast my (reliable )?knowledge\b|\bbeyond my\b/i,
  },
  {
    id: "CONFIDENCE-LEAK",
    why: "a confidence flag is reviewer metadata",
    re: /\bconfidence\s*[:=]|\b(HIGH|MED|LOW)\s+confidence\b/i,
  },
  {
    id: "PROCESS-RESIDUE",
    why: "meta-commentary about deriving, verifying or reviewing",
    re: /\b(as an AI|language model|I am not certain|I cannot be sure|TODO|REVIEW:|FIXME)\b/i,
    // NOTE: "language model" is a KNOWN false-positive source — a GAT current-
    // affairs question can be about one. Read the hit.
  },
  {
    id: "KEY-REFERENCE",
    why: "there is NO answer key for this paper; a solution citing one is describing something that does not exist",
    re: /\b(answer key|official key|the key says|per the key)\b/i,
  },
  {
    id: "HAND-WAVE",
    why: "a solution must derive or explain its answer, not assert it",
    re: /\b(clearly|obviously|it is well known|standard result|by inspection)\b/i,
  },
  {
    id: "OPTION-LETTER-ONLY",
    why: "naming a letter without saying what it IS breaks the moment options are reordered",
    re: /^(the answer is )?\(?[A-D]\)?\.?$/i,
  },
];

async function main() {
  const paper = requirePaper(process.argv[2]);
  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const rows: { question_number: string | null; solution: string | null }[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await sb
      .from("questions")
      .select("question_number,solution")
      .eq("exam_id", EXAM_ID)
      .eq("source_file", paper.sourceFile)
      .range(from, from + 999);
    if (error) throw error;
    rows.push(...(data ?? []));
    if (!data || data.length < 1000) break;
  }

  if (!rows.length) {
    console.log(`no rows for ${paper.sourceFile} — has it been committed?`);
    process.exit(1);
  }

  const missing = rows.filter((r) => !String(r.solution ?? "").trim());
  console.log(`${paper.id}: ${rows.length} committed rows, ${missing.length} with no solution`);
  if (missing.length) {
    // A row with a correct key and NO working is invisible to every other gate —
    // board:lint checks structure, audit:keys skips a row with no solution, and
    // a NULL solution is legal. This repo shipped exactly that once.
    console.log(`  ! ${missing.map((r) => `Q${r.question_number}`).join(", ")}`);
  }

  const findings: string[] = [];
  for (const r of rows) {
    const sol = String(r.solution ?? "");
    if (!sol.trim()) continue;
    for (const rule of RULES) {
      const m = rule.re.exec(sol.trim());
      if (!m) continue;
      const at = Math.max(0, sol.indexOf(m[0]) - 40);
      findings.push(
        `  Q${String(r.question_number).padEnd(4)} ${rule.id.padEnd(20)} …${sol.slice(at, at + 120).replace(/\s+/g, " ")}…`
      );
    }
  }

  console.log(`\nFINDINGS (${findings.length}) — TRIAGE, not a verdict:`);
  for (const f of findings) console.log(f);
  if (!findings.length) console.log(`  none.`);
  console.log(
    `\nRead every hit. A GAT paper can legitimately be ABOUT a language model or an\n` +
      `answer key, so a match is a question, not a defect.`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
