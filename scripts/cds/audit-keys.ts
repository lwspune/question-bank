/**
 * CDS-scoped answer-key structural audit.
 *
 * WHY THIS EXISTS: `npm run audit:keys` (scripts/practice/audit-keys.ts) hard-filters
 * `.eq("question_kind", "practice")`, so it cannot see the CDS corpus, which is
 * `question_kind='pyq'`. Same shape as scripts/jee/audit-keys.ts, which points the
 * identical core at the JEE pyq corpus.
 *
 * KNOWN LIMIT, measured 2026-08-25 — do not read a clean run as "the keys are fine".
 * `concludedLetter` fires on only ~3% of CDS rows, because CDS solutions open
 * `Answer: D.` and the shared core has a pattern for `answer is X` but none for
 * `Answer:`. So the SOLN != KEY class is blind to ~97% of this corpus. Worse, the
 * defect that actually afflicts CDS is invisible to this probe BY CONSTRUCTION: a
 * correct answer transcribed into the wrong letter's slot leaves four well-formed
 * options and one flagged correct. 19 such wrong keys were found on 2026-08-25 by
 * reading the printed page, and this audit flagged none of them. It is a structural
 * probe (duplicate options, option count, key count) — nothing more.
 *
 * It IMPORTS `auditRow` (and `concludedLetter`, re-exported for the triage dump)
 * from scripts/practice/audit-keys.ts rather than reimplementing them, so this
 * runner cannot drift from the shipped probe.
 *
 * SIGNAL NOTE — read before acting on a SOLN!=KEY hit. CDS answers are LLM-derived
 * and every solution ends with a marker like
 *   [LLM-derived, confidence: HIGH; verify before PUBLIC]
 * and the solutions are ENGLISH PROSE about English-language questions. Both are
 * rich sources of false positives for `concludedLetter`, which reads a trailing
 * `(X)` or an `option X` / `Hence X` / `answer is X` as a concluded letter:
 *   - a solution that rules out a distractor BY LETTER,
 *   - the article "a" / the pronoun "A" at a sentence start,
 *   - grammar-question prose quoting the literal words "a", "an", "A",
 *   - a bracketed `(a)` citing the option under discussion mid-sentence.
 * Classify every hit by opening it. TRIAGE ONLY — never flip a key on this alone.
 *
 * READ-ONLY. Writes nothing to the database.
 *
 *   npx tsx scripts/cds/audit-keys.ts            # counts + row list
 *   npx tsx scripts/cds/audit-keys.ts --dump     # + full solution text per SOLN!=KEY hit
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { auditRow, concludedLetter } from "../practice/audit-keys";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const CDS_EXAM_ID = "07700c16-a2e3-4101-9f25-4c7956dd4882";

type Flag = {
  id: string;
  src: string;
  qnum: string;
  flag: string;
  vis: string;
  solution: string | null;
  options: { label: string; text: string; is_correct: boolean }[];
  stem: string;
};

async function main() {
  const dump = process.argv.includes("--dump");
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const PAGE = 500;
  let scanned = 0;
  const flags: Flag[] = [];
  const allRows: Flag[] = [];
  const visSeen: Record<string, number> = {};
  // Reach instrumentation. `auditRow` only reports SOLN!=KEY when
  // concludedLetter() returns a letter, so "0 hits" is ambiguous between "keys
  // are right" and "the probe never looked". Measure the denominator.
  const reach = { withSolution: 0, concluded: 0, agree: 0, disagree: 0, letters: {} as Record<string, number> };
  // A row can DISAGREE and still not be reported by auditRow, because DUP_OPT /
  // BLANK_OPTIONS / STRUCT short-circuit BEFORE the mismatch check. Capture
  // those separately or they are invisible in both the flag list and the counts.
  const disagreeRows: Flag[] = [];

  for (let from = 0; ; from += PAGE) {
    const { data, error } = await db
      .from("questions")
      .select("id, question_number, source_file, visibility, text, solution, options(label, text, is_correct, image_url)")
      .eq("exam_id", CDS_EXAM_ID)
      // MCQ only — mirrors the JEE runner; a subjective/numeric row has no options.
      .or("question_format.is.null,question_format.eq.mcq")
      .order("id")
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`read failed: ${error.message}`);
    const rows = (data ?? []) as any[];
    if (rows.length === 0) break;
    for (const row of rows) {
      scanned++;
      visSeen[row.visibility] = (visSeen[row.visibility] ?? 0) + 1;
      if (row.solution) reach.withSolution++;
      const cl = concludedLetter(row.solution);
      if (cl) {
        reach.concluded++;
        reach.letters[cl] = (reach.letters[cl] ?? 0) + 1;
        const k = (row.options ?? []).find((o: any) => o.is_correct)?.label ?? null;
        if (k === cl) reach.agree++;
        else reach.disagree++;
      }
      const flag = auditRow(row.options ?? [], row.solution);
      const rec: Flag = {
        id: row.id,
        src: row.source_file ?? "?",
        qnum: row.question_number ?? "?",
        flag: flag ?? "(none)",
        vis: row.visibility,
        solution: row.solution,
        options: (row.options ?? []).map((o: any) => ({ label: o.label, text: o.text, is_correct: o.is_correct })),
        stem: row.text ?? "",
      };
      allRows.push(rec);
      if (cl && cl !== ((row.options ?? []).find((o: any) => o.is_correct)?.label ?? null)) disagreeRows.push(rec);
      if (flag) flags.push(rec);
    }
    if (rows.length < PAGE) break;
  }

  console.log(`Scanned ${scanned} CDS MCQ question(s). By visibility: ${JSON.stringify(visSeen)}`);
  console.log(
    `\nPROBE REACH — how much of the corpus the SOLN!=KEY class can actually see:\n` +
      `  rows with a solution:                 ${reach.withSolution}\n` +
      `  rows where concludedLetter() fires:   ${reach.concluded}   <- the ONLY rows the key check can compare\n` +
      `    of those, agrees with the key:      ${reach.agree}\n` +
      `    of those, disagrees (SOLN!=KEY):    ${reach.disagree}\n` +
      `  rows the class is BLIND to:           ${scanned - reach.concluded}  (no letter concluded, or short-circuited by DUP/STRUCT/BLANK)\n` +
      `  concludedLetter distribution:         ${JSON.stringify(reach.letters)}\n` +
      `  NOTE: a 0 in "disagrees" is only meaningful in proportion to "fires".`
  );
  if (scanned === 0) {
    console.log("\n!  NOTHING SCANNED — check the exam_id. This is NOT a clean result.");
    process.exitCode = 1;
    return;
  }

  if (disagreeRows.length) {
    console.log(`\n===== SOLUTION/KEY DISAGREEMENTS (${disagreeRows.length}) — includes rows auditRow short-circuited =====`);
    for (const f of disagreeRows) {
      const key = f.options.find((o) => o.is_correct);
      console.log(`\n--- ${f.src} Q${f.qnum}  auditRowFlag=${f.flag}  id=${f.id}`);
      console.log(`STEM: ${f.stem.replace(/\s+/g, " ").slice(0, 300)}`);
      for (const o of [...f.options].sort((a, b) => a.label.localeCompare(b.label))) {
        console.log(`  (${o.label})${o.is_correct ? " *KEY*" : "      "} ${JSON.stringify(String(o.text ?? "").replace(/\s+/g, " ").slice(0, 140))}`);
      }
      console.log(`KEY=${key?.label ?? "?"}  concludedLetter=${concludedLetter(f.solution)}`);
      console.log(`SOLUTION: ${String(f.solution ?? "").replace(/\s+/g, " ")}`);
    }
  }

  // ---------------------------------------------------------------------
  // SUPPLEMENTARY, CDS-SPECIFIC KEY CHECK.
  //
  // This does NOT replace or reimplement `concludedLetter` — that shared core
  // is used above, unmodified. It exists because the shared core reaches only
  // ~3% of this corpus: CDS solutions are authored in one house style that
  // opens `Answer: X.`, and `concludedLetter` has no pattern for `Answer:` (it
  // has `answer is X`, which is a different string). So the shipped probe is
  // structurally near-blind here and "0 SOLN!=KEY" carries almost no evidence.
  //
  // Anchoring on the leading `Answer:` token is unambiguous in a way the
  // generic patterns are not: it is at position 0, it is the authoring
  // template, and it cannot collide with a mid-sentence "(a)" remark or with
  // the English article "a" — the two false-positive shapes this repo keeps
  // rediscovering. Reported separately and labelled as triage.
  // ---------------------------------------------------------------------
  const declared = { seen: 0, agree: 0, disagree: 0 };
  const declaredMismatch: Flag[] = [];
  for (const r of allRows) {
    const m = /^\s*(?:\*\*)?Answer\s*[:\-–]\s*\(?([A-Da-d])\)?(?=[)\.,;:\s]|$)/.exec(r.solution ?? "");
    if (!m) continue;
    declared.seen++;
    const key = r.options.find((o) => o.is_correct)?.label ?? null;
    if (key === m[1].toUpperCase()) declared.agree++;
    else {
      declared.disagree++;
      declaredMismatch.push(r);
    }
  }
  console.log(
    `\nSUPPLEMENTARY CHECK — leading "Answer: X" declaration vs stored key:\n` +
      `  rows declaring an answer letter: ${declared.seen} / ${scanned} (${((declared.seen / scanned) * 100).toFixed(1)}%)\n` +
      `    agrees with key:               ${declared.agree}\n` +
      `    DISAGREES with key:            ${declared.disagree}`
  );
  for (const f of declaredMismatch) {
    const key = f.options.find((o) => o.is_correct);
    console.log(`\n--- DECLARED-MISMATCH  ${f.src} Q${f.qnum}  auditRowFlag=${f.flag}  id=${f.id}`);
    console.log(`STEM: ${f.stem.replace(/\s+/g, " ").slice(0, 300)}`);
    for (const o of [...f.options].sort((a, b) => a.label.localeCompare(b.label))) {
      console.log(`  (${o.label})${o.is_correct ? " *KEY*" : "      "} ${JSON.stringify(String(o.text ?? "").replace(/\s+/g, " ").slice(0, 140))}`);
    }
    console.log(`KEY=${key?.label ?? "?"}`);
    console.log(`SOLUTION: ${String(f.solution ?? "").replace(/\s+/g, " ")}`);
  }

  // Confidence markers — CDS answers are LLM-derived and self-report confidence.
  const conf: Record<string, number> = {};
  for (const r of allRows) {
    const m = /confidence:\s*([A-Za-z]+)/.exec(r.solution ?? "");
    const k = m ? m[1].toUpperCase() : "(no marker)";
    conf[k] = (conf[k] ?? 0) + 1;
  }
  console.log(`\nLLM confidence markers across the corpus: ${JSON.stringify(conf)}`);

  // DUP_OPT severity split. For a TIMED, AUTO-GRADED mock this is the
  // distinction that matters: if the duplicate group CONTAINS the keyed
  // option, the grader marks a student wrong for choosing text that is
  // character-identical to the right answer. If the duplicate is among the
  // distractors only, the question still grades correctly — it is merely a
  // lost distractor. Computed from full option text, not a truncated display.
  const dupRows = allRows.filter((r) => r.flag === "DUP_OPT");
  if (dupRows.length) {
    const keyInDup: string[] = [];
    const distractorOnly: string[] = [];
    console.log(`\n===== DUP_OPT SEVERITY (${dupRows.length}) =====`);
    for (const f of dupRows) {
      const groups = new Map<string, string[]>();
      for (const o of f.options) {
        const t = (o.text ?? "").trim();
        groups.set(t, [...(groups.get(t) ?? []), o.label]);
      }
      const dupGroups = [...groups.entries()].filter(([, ls]) => ls.length > 1);
      const key = f.options.find((o) => o.is_correct)?.label ?? "?";
      const hit = dupGroups.some(([, ls]) => ls.includes(key));
      const desc = dupGroups.map(([t, ls]) => `${ls.sort().join("=")} ${JSON.stringify(t.slice(0, 60))}`).join("  |  ");
      const line = `${f.src} Q${f.qnum}  key=${key}  ${hit ? "KEY-IN-DUP" : "distractor-only"}  ${desc}`;
      (hit ? keyInDup : distractorOnly).push(line);
    }
    console.log(`\n  KEY IS INSIDE THE DUPLICATE GROUP — grader marks an identical answer wrong (${keyInDup.length}):`);
    for (const l of keyInDup.sort()) console.log(`    ${l}`);
    console.log(`\n  duplicate among DISTRACTORS only — grades correctly, lost distractor (${distractorOnly.length}):`);
    for (const l of distractorOnly.sort()) console.log(`    ${l}`);
  }

  // Near-duplicates: options differing only by case/punctuation/whitespace.
  // auditRow compares exact trimmed text, so "of some kind," vs "of some kind"
  // is invisible to it — yet for a grader it is the same defect class.
  const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "");
  const nearDup: string[] = [];
  for (const r of allRows) {
    if (r.flag === "DUP_OPT") continue;
    const g = new Map<string, string[]>();
    for (const o of r.options) {
      const k = norm(o.text ?? "");
      if (!k) continue;
      g.set(k, [...(g.get(k) ?? []), o.label]);
    }
    const d = [...g.entries()].filter(([, ls]) => ls.length > 1);
    if (!d.length) continue;
    const key = r.options.find((o) => o.is_correct)?.label ?? "?";
    const hit = d.some(([, ls]) => ls.includes(key));
    nearDup.push(
      `${r.src} Q${r.qnum}  key=${key}  ${hit ? "KEY-IN-NEARDUP" : "distractor-only"}  ` +
        d.map(([, ls]) => ls.sort().join("=")).join(",") +
        "  :: " +
        r.options.filter((o) => d.some(([, ls]) => ls.includes(o.label))).map((o) => `(${o.label})${JSON.stringify(String(o.text ?? "").slice(0, 55))}`).join(" ")
    );
  }
  console.log(`\n===== NEAR-DUPLICATE options (case/punctuation-insensitive) — INVISIBLE to auditRow (${nearDup.length}) =====`);
  for (const l of nearDup.sort().slice(0, 40)) console.log(`  ${l}`);
  if (nearDup.length > 40) console.log(`  ... and ${nearDup.length - 40} more`);

  // The 77 rows with no confidence marker are exactly the count of rows where
  // concludedLetter fired — check whether that is one population or a coincidence.
  const noMarker = allRows.filter((r) => !/confidence:/i.test(r.solution ?? ""));
  console.log(`\nRows with no confidence marker: ${noMarker.length}`);
  for (const r of noMarker.slice(0, 5)) {
    console.log(`  ${r.src} Q${r.qnum}: ${String(r.solution ?? "").replace(/\s+/g, " ").slice(0, 200)}`);
  }

  // Is the 77-row concludedLetter population the SAME as the 77 no-marker rows?
  {
    const noMark = new Set(allRows.filter((r) => !/confidence:/i.test(r.solution ?? "")).map((r) => r.id));
    const fired = new Set(allRows.filter((r) => concludedLetter(r.solution)).map((r) => r.id));
    let both = 0;
    for (const id of fired) if (noMark.has(id)) both++;
    console.log(
      `
Overlap check: concludedLetter fired on ${fired.size}, no-marker rows ${noMark.size}, in BOTH ${both}.` +
        `
  (If these coincide, the trailing "[LLM-derived, confidence: ...]" bracket is what suppresses the probe.)`
    );
  }

  const byType: Record<string, number> = {};
  const bySrc: Record<string, number> = {};
  for (const f of flags) {
    const t = f.flag.startsWith("SOLN") ? "SOLN!=KEY" : f.flag.startsWith("STRUCT") ? "STRUCT" : f.flag.startsWith("BLANK") ? "BLANK_OPTIONS" : f.flag;
    byType[t] = (byType[t] ?? 0) + 1;
    bySrc[f.src] = (bySrc[f.src] ?? 0) + 1;
  }
  console.log(`Flagged ${flags.length}: ${JSON.stringify(byType)}`);

  if (!flags.length) {
    console.log("\nNo structural flags.");
    return;
  }

  console.log("\nBy source file:");
  for (const [s, n] of Object.entries(bySrc).sort((a, b) => b[1] - a[1])) console.log(`  ${String(n).padStart(3)}  ${s}`);

  console.log("\nRows (TRIAGE — source-verify before fixing):");
  for (const f of [...flags].sort((a, b) => (a.src + a.qnum.padStart(4, "0")).localeCompare(b.src + b.qnum.padStart(4, "0")))) {
    console.log(`  Q${f.qnum}\t${f.vis}\t${f.flag}\t${f.src}`);
  }

  if (dump) {
    console.log("\n\n===== SOLN!=KEY DETAIL =====");
    for (const f of flags.filter((x) => x.flag.startsWith("SOLN"))) {
      const key = f.options.find((o) => o.is_correct);
      console.log(`\n--- ${f.src} Q${f.qnum}  ${f.flag}  id=${f.id}`);
      console.log(`STEM: ${f.stem.replace(/\s+/g, " ").slice(0, 260)}`);
      for (const o of [...f.options].sort((a, b) => a.label.localeCompare(b.label))) {
        console.log(`  (${o.label})${o.is_correct ? " *KEY*" : "      "} ${String(o.text ?? "").replace(/\s+/g, " ").slice(0, 120)}`);
      }
      console.log(`KEY=${key?.label ?? "?"}  concludedLetter=${concludedLetter(f.solution)}`);
      console.log(`SOLUTION: ${String(f.solution ?? "").replace(/\s+/g, " ")}`);
    }
    console.log("\n\n===== NON-SOLN DETAIL =====");
    for (const f of flags.filter((x) => !x.flag.startsWith("SOLN"))) {
      console.log(`\n--- ${f.src} Q${f.qnum}  ${f.flag}  id=${f.id}`);
      console.log(`STEM: ${f.stem.replace(/\s+/g, " ").slice(0, 260)}`);
      for (const o of [...f.options].sort((a, b) => a.label.localeCompare(b.label))) {
        console.log(`  (${o.label})${o.is_correct ? " *KEY*" : "      "} ${JSON.stringify(String(o.text ?? "").replace(/\s+/g, " ").slice(0, 120))}`);
      }
      console.log(`SOLUTION: ${String(f.solution ?? "").replace(/\s+/g, " ").slice(0, 400)}`);
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
