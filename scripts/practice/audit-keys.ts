/**
 * Practice-bank answer-key audit — a fast, zero-LLM structural probe that flags
 * questions whose stored key/options are likely wrong. Built after the 2026-07
 * LWS-Maths-Mock-5 review surfaced systemic option-order/value scrambling in the
 * vision-transcribed practice ingest (159 flagged, 140 real corrections).
 *
 * It flags three classes:
 *   SOLN≠KEY  — the stored solution concludes a DIFFERENT option letter than the
 *               is_correct flag (the option-scramble / wrong-key signal). This is
 *               HIGH-signal but NOT proof: the solution may just mention another
 *               letter mid-derivation, OR the solution (not the key) may be wrong.
 *   DUP_OPT   — two option texts are identical (a dropped/duplicated distractor).
 *   STRUCT    — not exactly 4 options or not exactly 1 correct.
 *
 * Known false positives (verify before "fixing"): genuine multi-answer questions
 * whose book key itself lists two letters (STRUCT 2-correct is then faithful);
 * questions where the book itself prints two identical options (DUP is faithful);
 * option-less worked-examples (STRUCT 0-opt). ALWAYS source-verify a flag against
 * the book before flipping a key — see scripts/practice/README.md.
 *
 *   npx tsx scripts/practice/audit-keys.ts                 # whole practice bank
 *   npx tsx scripts/practice/audit-keys.ts Vectors         # filter source_file by substring
 *   npm run audit:keys -- Conics
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

/** The LAST option letter a solution explicitly concludes with, or null. */
export function concludedLetter(sol: string | null): string | null {
  if (!sol) return null;
  // The trailing lookahead requires the letter to END a token (delimiter or EOL),
  // so "Hence continuous" / "option carbonyl" no longer match the following word's
  // first letter — a real letter-conclusion is always followed by )/./,/;/:/space/EOL.
  const END = "(?=[)\\.,;:\\s]|$)";
  // Assertion-Reason questions label their two statements (A) and (R). Their
  // solution restates the chosen option verbatim ("Both (A) and (R) are true but
  // (R) is not the correct explanation of (A)") and so ENDS in `(A)` — which the
  // bare trailing-letter pattern read as "concludes option A". `(R)` is never an
  // option letter (options are A-D), so `(A)` + `(R)` together mark A-R labels.
  // Only the bare-trailing pattern is suppressed; an explicit "Hence (C)" /
  // "answer is (C)" in an A-R solution is still a real conclusion.
  const assertionReason = /\(A\)/.test(sol) && /\(R\)/.test(sol);
  // A solution that walks EVERY choice in turn ("For option (A) ... For option
  // (B) ... (C) ... (D)") ends on the last option EXAMINED, not the answer —
  // its real conclusion is a trailing phrase like "A, B & D only". Three or
  // more distinct `option (X)` letters marks the enumeration, so drop that
  // pattern; the explicit "Hence"/"answer is" forms still apply.
  const optionLetters = new Set(
    [...sol.matchAll(/option\s*\(?([A-Da-d])\)?(?=[)\.,;:\s]|$)/g)].map((m) => m[1].toUpperCase()),
  );
  const enumerating = optionLetters.size >= 3;
  // A solution may RULE OUT a choice by name ("so option A fails") long before it
  // states its real conclusion. Reading that as the conclusion inverts the test,
  // so drop an `option X` immediately followed by a rejecting verb.
  const REJECT = "(?!\\s*(?:fails?|is\\s+(?:wrong|incorrect|false)|cannot|does\\s+not|would\\s+not))";
  const pats = [
    new RegExp(`Hence[,\\s]*\\(?([A-Da-d])\\)?${END}`, "g"),
    ...(enumerating ? [] : [new RegExp(`option\\s*\\(?([A-Da-d])\\)?${END}${REJECT}`, "g")]),
    new RegExp(`answer\\s*is\\s*\\(?([A-Da-d])\\)?${END}`, "g"),
    // The house style for authored solutions is "the correct choice is B" (a bare
    // leading option letter trips this very probe, so prompts forbid it). Without
    // this pattern the probe cannot see the conclusion it asked authors to write.
    new RegExp(`correct\\s+(?:choice|option|answer)\\s+is\\s*\\(?([A-Da-d])\\)?${END}`, "g"),
    ...(assertionReason ? [] : [/\(([A-Da-d])\)\s*\.?\s*$/g]),
  ];
  let last: string | null = null;
  for (const re of pats) { let m: RegExpExecArray | null; while ((m = re.exec(sol))) last = m[1].toUpperCase(); }
  return last;
}

/**
 * `image_url` is optional: callers that never have picture options (the practice
 * bank) can omit it and behave exactly as before.
 */
type Opt = { label: string; text: string; is_correct: boolean; image_url?: string | null };
export function auditRow(opts: Opt[], solution: string | null): string | null {
  const sorted = [...opts].sort((a, b) => a.label.localeCompare(b.label));
  const correct = sorted.filter((o) => o.is_correct);
  const texts = sorted.map((o) => (o.text ?? "").trim());
  const dup = texts.length !== new Set(texts).size;
  const concluded = concludedLetter(solution);
  const key = correct[0]?.label ?? null;
  if (sorted.length !== 4 || correct.length !== 1) return `STRUCT(${sorted.length}opt,${correct.length}corr)`;
  // An option is USABLE if it has text or an image. Judge that per option, not
  // across the row: a mixed row (three structure images + one "Both (a) and (c)")
  // is legitimate, while a row with a blank, image-less option is unusable no
  // matter what its siblings carry — and in two live cases that blank option was
  // the KEY.
  const empties = sorted.filter((o) => !(o.text ?? "").trim() && !o.image_url);
  if (empties.length) return `BLANK_OPTIONS(${empties.map((o) => o.label).join("")})`;
  // A picture-option row stores its choices as images, so its texts are empty BY
  // CONSTRUCTION and collide as "duplicates". Not a defect, and it drowned the
  // real signal (49 such flags in JEE Physics alone hid one genuine one).
  const pictures = sorted.filter((o) => !(o.text ?? "").trim() && o.image_url);
  if (pictures.length) {
    const urls = pictures.map((o) => o.image_url);
    if (urls.length !== new Set(urls).size) return "DUP_OPT_IMAGE";
    const worded = texts.filter((t) => t !== "");
    return worded.length !== new Set(worded).size ? "DUP_OPT" : "IMAGE_OPTIONS";
  }
  if (dup) return "DUP_OPT";
  if (concluded && key && concluded !== key) return `SOLN_${concluded}!=KEY_${key}`;
  return null;
}

async function main() {
  const filter = process.argv[2];
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const PAGE = 1000;
  let from = 0, scanned = 0;
  const flags: { src: string; qnum: string; flag: string; vis: string }[] = [];
  for (;;) {
    let q = db.from("questions")
      .select("question_number, source_file, visibility, solution, options(label, text, is_correct)")
      .eq("question_kind", "practice")
      // MCQ only — subjective/numeric practice rows legitimately have no options
      .or("question_format.is.null,question_format.eq.mcq")
      .order("id").range(from, from + PAGE - 1);
    if (filter) q = q.like("source_file", `%${filter}%`);
    const { data, error } = await q;
    if (error) throw error;
    if (!data || data.length === 0) break;
    for (const row of data as any[]) {
      scanned++;
      const flag = auditRow(row.options ?? [], row.solution);
      if (flag) flags.push({ src: row.source_file ?? "?", qnum: row.question_number, flag, vis: row.visibility });
    }
    if (data.length < PAGE) break;
    from += PAGE;
  }

  const byType: Record<string, number> = {};
  const bySrc: Record<string, number> = {};
  for (const f of flags) {
    const t = f.flag.startsWith("SOLN") ? "SOLN≠KEY" : f.flag.startsWith("STRUCT") ? "STRUCT" : f.flag;
    byType[t] = (byType[t] ?? 0) + 1;
    bySrc[f.src] = (bySrc[f.src] ?? 0) + 1;
  }
  console.log(`Scanned ${scanned} practice questions${filter ? ` (source ~ "${filter}")` : ""}`);
  console.log(`Flagged ${flags.length}:`, JSON.stringify(byType));
  if (flags.length) {
    console.log("\nBy source file:");
    for (const [s, n] of Object.entries(bySrc).sort((a, b) => b[1] - a[1])) console.log(`  ${String(n).padStart(3)}  ${s}`);
    console.log("\nRows (source-verify before fixing — see the header + README):");
    for (const f of flags.sort((a, b) => (a.src + a.qnum).localeCompare(b.src + b.qnum))) {
      console.log(`  Q${f.qnum}\t${f.vis}\t${f.flag}\t${f.src}`);
    }
  }
}
if (require.main === module) main().catch((e) => { console.error(e); process.exit(1); });
