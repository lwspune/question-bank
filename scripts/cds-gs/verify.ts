/**
 * Post-commit verification for one CDS GK paper — every check in one command.
 *
 *   npx tsx scripts/cds-gs/verify.ts <paperId>
 *
 * Exists because this runs 19 times. Doing it by hand per paper is how a check
 * gets skipped on paper 12 and nobody notices.
 *
 * Reads the LIVE ROWS, not the data files. That distinction is the point: the
 * data files are what we meant to commit, and the database is what actually
 * landed. Only the second one is evidence.
 *
 * Exits non-zero if anything fails, so it can gate a loop over papers.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { EXAM_ID, QUESTIONS_PER_PAPER, catalog, requirePaper } from "./config";
import { normalizeNewlines } from "../../src/lib/text/normalizeNewlines";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

type Row = {
  question_number: string;
  text: string;
  solution: string | null;
  visibility: string;
  question_kind: string;
  subjects: { name: string } | null;
  chapters: { name: string } | null;
  subtopics: { name: string } | null;
  options: { label: string; text: string; is_correct: boolean }[];
};

async function main() {
  const paper = requirePaper(process.argv[2]);
  loadEnv();
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  // Page the read — a bare .select() is capped at 1000 by PostgREST, and while
  // 120 rows is far under that, this file gets copied.
  const rows: Row[] = [];
  for (let from = 0; ; from += 500) {
    const { data, error } = await client
      .from("questions")
      .select(
        "question_number, text, solution, visibility, question_kind, " +
          "subjects(name), chapters(name), subtopics(name), options(label, text, is_correct)"
      )
      .eq("exam_id", EXAM_ID)
      .eq("source_file", paper.sourceFile)
      .range(from, from + 499);
    if (error) throw new Error(`read failed: ${error.message}`);
    rows.push(...((data ?? []) as unknown as Row[]));
    if (!data || data.length < 500) break;
  }

  const fail: string[] = [];
  const warn: string[] = [];
  const cat = catalog();

  // 1. coverage, both ways
  const nums = rows.map((r) => Number(r.question_number)).sort((a, b) => a - b);
  const seen = new Set(nums);
  const missing: number[] = [];
  for (let n = 1; n <= QUESTIONS_PER_PAPER; n++) if (!seen.has(n)) missing.push(n);
  if (missing.length) fail.push(`missing Q: ${missing.join(", ")}`);
  const extra = nums.filter((n) => n < 1 || n > QUESTIONS_PER_PAPER);
  if (extra.length) fail.push(`out-of-range Q: ${extra.join(", ")}`);
  const dupes = nums.filter((n, i) => nums[i - 1] === n);
  if (dupes.length) fail.push(`duplicate Q: ${[...new Set(dupes)].join(", ")}`);

  for (const r of rows) {
    const n = r.question_number;
    // 2. exactly one correct option, four distinct options
    const opts = r.options ?? [];
    const correct = opts.filter((o) => o.is_correct);
    if (opts.length !== 4) fail.push(`Q${n}: ${opts.length} option(s), expected 4`);
    if (correct.length !== 1) fail.push(`Q${n}: ${correct.length} correct option(s), expected 1`);
    const labels = opts.map((o) => o.label).sort().join("");
    if (opts.length === 4 && labels !== "ABCD") fail.push(`Q${n}: option labels are "${labels}"`);
    const texts = opts.map((o) => (o.text ?? "").replace(/\s+/g, " ").trim().toLowerCase());
    if (texts.some((t) => !t)) fail.push(`Q${n}: blank option text`);
    if (new Set(texts).size !== texts.length) warn.push(`Q${n}: duplicate option text — check the page`);

    // 3. every row has a derived solution carrying its provenance
    if (!r.solution || !r.solution.trim()) fail.push(`Q${n}: no solution`);
    else if (!/no official key/i.test(r.solution)) {
      warn.push(`Q${n}: solution is missing the derived-answer provenance bracket`);
    }

    // 4. taxonomy is in the catalog, and the chapter belongs to ITS OWN subject
    const subject = r.subjects?.name;
    const chapter = r.chapters?.name;
    const subtopic = r.subtopics?.name;
    if (!subject || !chapter) fail.push(`Q${n}: missing subject or chapter`);
    else if (!cat[subject]) fail.push(`Q${n}: subject "${subject}" not in catalog`);
    else if (!cat[subject][chapter]) fail.push(`Q${n}: "${chapter}" is not a chapter of "${subject}"`);
    else if (subtopic && !cat[subject][chapter].includes(subtopic)) {
      warn.push(`Q${n}: subtopic "${subtopic}" not listed under ${subject} / ${chapter}`);
    }

    // 5. kind + visibility
    if (r.question_kind !== "pyq") fail.push(`Q${n}: question_kind is "${r.question_kind}"`);
    if (r.visibility !== "PRIVATE") {
      warn.push(`Q${n}: visibility is ${r.visibility} — this corpus has no key and should stay PRIVATE until published deliberately`);
    }

    // 6a. TAB / VT / FF anywhere in long-form text.
    //
    // Checked SEPARATELY from the generic control-character sweep below, which
    // exempts tab, newline and carriage return as ordinarily-legitimate. That
    // exemption is right for a file and WRONG for a question stem: nothing in
    // this corpus's long-form text is ever tab-separated — prose, inline LaTeX
    // and GFM pipe-tables all use pipes and spaces — so a tab here is always
    // damage.
    //
    // It is a live failure mode, not a hypothetical. Authoring through a shell
    // heredoc silently eats a backslash level and turns a LaTeX command into the
    // control character its escape names: one agent's `\text{th}` reached its own
    // output file as a literal TAB. It survived that agent's control-character
    // probe for exactly the reason above — the probe exempted 0x09 — and was
    // caught only by reading the stored value back. Two other agents produced VT
    // and FF the same way on other papers.
    //
    // Measured at the time this was added: 0 occurrences across all 1,680
    // committed rows, so this guards the papers still to come rather than
    // repairing anything.
    for (const [field, v] of [["stem", r.text], ["solution", r.solution ?? ""]] as [string, string][]) {
      const hit = [...v].find((ch) => ch === "\t" || ch === "\v" || ch === "\f");
      if (hit) {
        const code = hit.codePointAt(0)!.toString(16).padStart(2, "0");
        fail.push(`Q${n} ${field}: control character U+00${code.toUpperCase()} in long-form text (likely a shell-eaten LaTeX escape)`);
      }
    }

    // 6. render hazards the standing audits also cover, checked here per-paper
    for (const [field, v] of [["stem", r.text], ["solution", r.solution ?? ""]] as [string, string][]) {
      const open = (v.match(/\\\(/g) || []).length;
      const close = (v.match(/\\\)/g) || []).length;
      if (open !== close) fail.push(`Q${n} ${field}: unbalanced \\( ${open} vs \\) ${close}`);
      // Reuse the PRODUCTION normaliser rather than a second hand-rolled check.
      // This line used to be `v.includes("\\n")`, which flags ANY LaTeX command
      // beginning with n. It fired on `\\neq` inside a math zone and reported a
      // perfectly clean row as FAILED, while `commitStaged`'s own guard stayed
      // silent throughout — correctly, because that guard uses this helper.
      //
      // Two checks of one invariant that can disagree is exactly what
      // textGuard.ts warns against: "detection reuses normalizeNewlines itself
      // rather than a second regex, so the guard can never disagree with the
      // normaliser." When a probe contradicts the production guard, the probe
      // is the thing that is wrong.
      if (normalizeNewlines(v) !== v) fail.push(`Q${n} ${field}: literal backslash-n`);
      // Control characters are checked by CODE POINT, not by a regex. A regex
      // character class for this range has to CONTAIN the control bytes it
      // matches -- the first version of this line did, invisibly -- so the probe
      // became an instance of the very corruption it exists to find, and any tool
      // that touched the file could silently break it.
      const ctrl = [...v].find((ch) => {
        const c = ch.codePointAt(0)!;
        return c < 32 && c !== 9 && c !== 10 && c !== 13;
      });
      if (ctrl) fail.push(`Q${n} ${field}: control character U+${ctrl.codePointAt(0)!.toString(16).toUpperCase().padStart(4, "0")}`);
      if (v.includes("�")) fail.push(`Q${n} ${field}: U+FFFD replacement character`);
      // a pipe row with no separator anywhere renders as literal pipes
      const lines = v.split("\n");
      for (let i = 0; i < lines.length; i++) {
        if (!/^\s*\|.*\|\s*$/.test(lines[i])) continue;
        const rest = lines.slice(i).join("\n");
        if (!/^\s*\|[\s:-]*-[\s:|-]*\|\s*$/m.test(rest)) {
          fail.push(`Q${n} ${field}: pipe table with no |---|---| separator`);
        }
        break;
      }
    }
  }

  const mix = new Map<string, number>();
  for (const r of rows) mix.set(r.subjects?.name ?? "?", (mix.get(r.subjects?.name ?? "?") ?? 0) + 1);

  console.log(`\n${paper.id} — ${rows.length} live rows (${paper.sourceFile})`);
  for (const [s, n] of [...mix.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${s.padEnd(18)} ${String(n).padStart(3)}`);
  }
  if (warn.length) {
    console.log(`\nWARN (${warn.length}):`);
    for (const w of warn) console.log(`  ${w}`);
  }
  if (fail.length) {
    console.log(`\nFAIL (${fail.length}):`);
    for (const f of fail) console.log(`  ${f}`);
    console.log(`\n${paper.id}: FAILED`);
    process.exit(1);
  }
  console.log(`\n${paper.id}: OK — ${rows.length}/${QUESTIONS_PER_PAPER} rows, all checks passed.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
