/**
 * Cross-tabulate a blind re-derivation pass against the paper's stored keys.
 *
 *   npx tsx scripts/reviews/crosstab-paper.ts <tag>       # e.g. p1 | p2 | p3
 *
 * WHY THIS IS NOT A VERDICT. It is a WORK LIST. A letter disagreement is a
 * hypothesis about a wrong key, and on this bank the hypothesis is wrong more
 * often than it is right — the dominant defect here is the TWIN, where the
 * correct answer is printed twice and the deriver simply named the other copy.
 * So every non-AGREE row is opened by hand before anything is changed.
 *
 * Buckets:
 *   AGREE        blind letter == stored key
 *   FLIP?        blind letter != stored key, and no option duplicates the key
 *   FLIP?TWIN    blind letter != stored key, but the two option TEXTS look equal
 *                -> almost always a printing defect in the option, not a wrong key
 *   NONE         deriver found no correct option (or reported a defective stem)
 *   MULTI        deriver reported duplicate options
 *   LOWCONF      deriver agreed but flagged low confidence
 *   MISSING      no derivation came back for this question
 */
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const DATA = join(process.cwd(), "scripts", "reviews", "data");
const RUN = "2026-08-16-papers";

const PAPERS: Record<string, string> = {
  p1: "paper-95b50231-b106-4fcf-b3b3-3cb46483fa6b",
  p2: "paper-97ede96e-69cd-4715-bccc-f61efd837fea",
  p3: "paper-5db793ae-7e65-450e-94c2-65c2fe9f6f60",
};

type Opt = { label: string; text: string; is_correct?: boolean };
type AuditRow = { questionId: string; questionNumber: string | null; text: string | null; options: Opt[]; solution: string | null };
type BlindRow = { questionId: string; questionNumber?: string; value?: string; letter?: string; confidence?: string; note?: string };

/** Loose equality on option text: strip whitespace/LaTeX noise, then compare. */
function norm(s: string): string {
  return s
    .replace(/\\(left|right|,|;|!|\s)/g, "")
    .replace(/[\s{}()$]/g, "")
    .replace(/\\dfrac|\\tfrac|\\frac/g, "F")
    .toLowerCase();
}

function main() {
  const tag = process.argv[2];
  const file = PAPERS[tag];
  if (!file) throw new Error(`usage: crosstab-paper.ts <${Object.keys(PAPERS).join("|")}>`);

  const auditPath = join(DATA, "audit-run", `${file}.audit.json`);
  if (!existsSync(auditPath)) throw new Error(`missing audit dump: ${auditPath}`);
  const audit: AuditRow[] = JSON.parse(readFileSync(auditPath, "utf8"));
  const byId = new Map(audit.map((r) => [r.questionId, r]));

  // Explicit prefix+suffix filter rather than a glob: a loose pattern over a
  // directory that also holds inputs and other papers' outputs is how one pass's
  // results silently get merged into another's.
  const chunkDir = join(DATA, "blind", RUN);
  const outs = readdirSync(chunkDir)
    .filter((f) => f.startsWith(`${tag}.blind.`) && f.endsWith(".out.json"))
    .map((f) => join(chunkDir, f));
  if (!outs.length) throw new Error(`no blind outputs matching ${tag}.blind.*.out.json`);
  const blind: BlindRow[] = outs.flatMap((p) => JSON.parse(readFileSync(p, "utf8")) as BlindRow[]);
  const blindById = new Map(blind.map((r) => [r.questionId, r]));

  console.log(`\n${tag}: ${audit.length} question(s) in dump, ${blind.length} derivation(s) from ${outs.length} file(s)\n`);

  const buckets: Record<string, string[]> = {
    "FLIP?": [], "FLIP?TWIN": [], NONE: [], MULTI: [], LOWCONF: [], MISSING: [], AGREE: [],
  };

  for (const a of audit) {
    const b = blindById.get(a.questionId);
    const qn = a.questionNumber ?? a.questionId.slice(0, 8);
    if (!b) { buckets.MISSING.push(`${qn}`); continue; }

    const key = a.options.find((o) => o.is_correct)?.label ?? "?";
    const got = (b.letter ?? "").trim().toUpperCase();
    const line = `${qn.padEnd(16)} key=${key}  blind=${got.padEnd(5)} value=${(b.value ?? "").slice(0, 60)}  ${b.note ?? ""}`;

    if (got === "NONE") { buckets.NONE.push(line); continue; }
    if (got === "MULTI") { buckets.MULTI.push(line); continue; }
    if (got === key) {
      if ((b.confidence ?? "").toLowerCase() === "low") buckets.LOWCONF.push(line);
      else buckets.AGREE.push(line);
      continue;
    }
    // Disagreement: is the derived option textually the same as the keyed one?
    const keyOpt = a.options.find((o) => o.is_correct);
    const gotOpt = a.options.find((o) => o.label === got);
    const twin = keyOpt && gotOpt && norm(keyOpt.text) === norm(gotOpt.text);
    buckets[twin ? "FLIP?TWIN" : "FLIP?"].push(line);
  }

  for (const k of ["FLIP?", "NONE", "MULTI", "FLIP?TWIN", "LOWCONF", "MISSING"]) {
    if (!buckets[k].length) continue;
    console.log(`--- ${k}  (${buckets[k].length}) ---`);
    for (const l of buckets[k]) console.log("  " + l);
    console.log();
  }
  // MISSING is NOT a finding. A row carries no derivation when it was skipped at
  // dump time for already holding a blind confirmation — counting those as work
  // to do would make a fully-reviewed paper look like it had 77 open problems.
  const flagged = Object.entries(buckets)
    .filter(([k]) => k !== "AGREE" && k !== "MISSING")
    .reduce((n, [, v]) => n + v.length, 0);
  console.log(`AGREE: ${buckets.AGREE.length}`);
  console.log(`needs a human look: ${flagged}`);
  if (buckets.MISSING.length) {
    console.log(`not derived in this pass: ${buckets.MISSING.length} (skipped as already blind-confirmed, or never dispatched)`);
  }
  console.log();
}

main();
