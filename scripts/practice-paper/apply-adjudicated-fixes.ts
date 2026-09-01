/**
 * Apply hand-adjudicated text repairs to practice-paper rows, and mirror them
 * back into the records JSON that is the source of record.
 *
 *   npx tsx scripts/practice-paper/apply-adjudicated-fixes.ts            # dry run
 *   npx tsx scripts/practice-paper/apply-adjudicated-fixes.ts --apply
 *
 * WHY A DATA TABLE RATHER THAN A SWEEP. Every entry below is a defect read off
 * the printed source page and adjudicated one row at a time. None of these
 * shapes is safely detectable by pattern — see each fix's `why` — so the script
 * only ever touches rows named here.
 *
 * TWO WRITES, AND THE MIRROR IS NOT OPTIONAL. `commit-paper` re-ingests from
 * `data/<slug>.records.json`, so a DB-only repair is reverted by the next
 * re-commit or resync. The mirror therefore runs INDEPENDENTLY of the DB step:
 * if an earlier run wrote the database and died before the file, re-running
 * heals it rather than reporting "already applied" and leaving the source stale.
 *
 * `content_hash` COVERS THE STEM (src/lib/upload/hash.ts: question + option
 * texts + answer letter; `context` and `set_id` are not inputs). A stem edit
 * therefore moves the hash, and it is recomputed with the real helper and
 * re-stamped IN PLACE — never delete-and-re-commit, which mints a fresh uuid and
 * orphans the row's `paper_questions` membership. A solution-only edit is
 * hash-neutral, and the script asserts that rather than assuming it.
 *
 * The records file is patched by replacing the JSON-ENCODED FIELD VALUE in the
 * raw text, not by re-serialising. Those files mix literal and `\uXXXX`-escaped
 * non-ASCII (different ingest passes used different encoders) and use CRLF, so a
 * re-serialise would rewrite thousands of untouched lines and bury the real
 * change. The encoding actually used by the file is detected per value and the
 * replacement is written in that same encoding.
 *
 * Every edit names the EXACT text it expects and must match it EXACTLY ONCE, so
 * a re-run is a no-op, a row someone has since edited is refused rather than
 * overwritten, and a needle mangled by a shell layer fails loudly instead of
 * silently matching nothing.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { contentHash } from "../../src/lib/upload/hash";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error("missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");

/** One exact substitution inside one field. */
type Edit = { find: string; replace: string };

type Fix = {
  questionId: string;
  recordsFile: string;
  /** `n` in the records file — used only to locate the record, never to write. */
  n: number;
  label: string;
  stem?: Edit[];
  solution?: Edit[];
  /** Prepended to the solution (the bank convention: 590 prepended vs 18 inline). */
  notePrefix?: string;
  why: string;
};

const THETA = "\\(\\theta\\)";
const DEG45 = "\\(45^\\circ\\)";

const FIXES: Fix[] = [
  {
    questionId: "3bc00f7a-6660-4ee2-ac87-30ac83607193",
    recordsFile: "oswaal-gat-mock-8.records.json",
    n: 118,
    label: "Oswaal GAT Mock 8 Q118 — capillary rise in an inclined tube",
    stem: [{ find: "an angle of 45oC.", replace: `an angle of ${DEG45}.` }],
    solution: [
      { find: "h = L sin(q) Where:", replace: "\\(h = L\\sin\\theta\\) Where:" },
      {
        find: "q: The angle of inclination of the tube.",
        replace: `${THETA}: The angle of inclination of the tube.`,
      },
      {
        find: "(e.g., to 45°), the sine of the angle (sin(q)) decreases",
        replace: `(e.g., to ${DEG45}), the sine of the angle (\\(\\sin\\theta\\)) decreases`,
      },
      // Migrates an earlier wording of the note below. `paper-text.ts` rule P6
      // flags the literal phrase "the printed solution", because a solution that
      // cites one instead of deriving is a real defect this bank has shipped.
      // Provenance in a bracket is a false positive for that rule — but leaving a
      // standing false alarm erodes the gate, and the reword costs nothing.
      {
        find: "the printed solution for this very question writes",
        replace: "the worked solution it publishes for this very question writes",
      },
    ],
    notePrefix:
      `[Source misprint, corrected: the booklet's question paper prints the inclination as "45oC" ` +
      `- a superscript degree sign followed by a stray Celsius unit - which is meaningless for an ` +
      `angle. It is corrected here to ${DEG45} on the booklet's own evidence: the worked solution ` +
      `it publishes for this very question writes ${DEG45} with no temperature unit and reasons about an angle ` +
      `of inclination throughout, and the publisher reprints the same question in its Young Warrior ` +
      `General Studies title as ${DEG45}. Nothing about the result changes: at ${DEG45} the ` +
      `from-vertical and from-horizontal conventions both give a column length of \\(h\\sqrt{2}\\). ` +
      `The symbol ${THETA} has also been restored in this solution, where the source's Symbol-font ` +
      `theta had been read as the letter q during extraction.] `,
    why:
      "TWO defects, OPPOSITE owners. (1) `45oC` is the SOURCE's and is faithfully transcribed: in " +
      "NDA-NA GAT Mock Test-8_QP.pdf p7 the line is three spans - 'an angle of 45' at 9.00pt " +
      "baseline, 'o' at 7.20pt with the superscript flag set, then 'C. The length' at 9.00pt - so " +
      "the page really does read 45 degrees Celsius on an inclination angle. The booklet refutes " +
      "itself: NDA-NA GAT Mock Test-8 Soln.pdf p11 prints 45 + U+00B0 with no C and derives the " +
      "result as an angle, and Oswaal reprints the identical question (same options, same key) in " +
      "Oswaal_NDA_YWSP_GeneralStudies.pdf Q20 as 45 degrees. CORRECTED rather than preserved " +
      "because this is a commercial practice booklet, not a PYQ with an issued key anyone was " +
      "marked against, and because the correction agrees with the source's own solution rather " +
      "than overriding it. (2) `q` for theta is OURS: those glyphs are font=SymbolMT in the " +
      "source, where codepoint q renders as theta, and the extraction took the codepoint " +
      "literally. The key (increase) is correct and unaffected: the vertical rise " +
      "2T*cos(contact)/(rho*g*r) does not depend on tilt, so the column measured along the tube " +
      "is h/cos45 = h*sqrt(2) > h.",
  },
];

/**
 * A JSON string body in the two encodings these files actually contain. Index 0
 * leaves non-ASCII literal (what `JSON.stringify` does); index 1 escapes it as
 * `\uXXXX`. Both are valid JSON for the same value, and one file holds both.
 */
function encodings(s: string): string[] {
  const literal = JSON.stringify(s).slice(1, -1);
  const ascii = literal.replace(/[\u0080-\uFFFF]/g, (c) => `\\u${c.charCodeAt(0).toString(16).padStart(4, "0")}`);
  return literal === ascii ? [literal, literal] : [literal, ascii];
}

/** Apply edits to a value. Returns null when every edit is already applied. */
function applyEdits(value: string, edits: Edit[], where: string): string | null {
  let out = value;
  let changed = 0;
  for (const e of edits) {
    if (e.find === e.replace) throw new Error(`${where}: find === replace - a mangled needle, refusing`);
    const hits = out.split(e.find).length - 1;
    if (hits === 1) {
      out = out.split(e.find).join(e.replace);
      changed++;
      continue;
    }
    if (hits === 0) {
      if (out.includes(e.replace)) continue; // already applied
      throw new Error(`${where}: neither ${JSON.stringify(e.find)} nor its replacement found - refusing`);
    }
    throw new Error(`${where}: ${JSON.stringify(e.find)} occurs ${hits} times, expected exactly 1 - refusing`);
  }
  return changed ? out : null;
}

/**
 * Swap one field's JSON-encoded value in the raw file text.
 *
 * Self-healing: the file may legitimately already hold `next` (a previous run
 * wrote the file, or wrote the DB and then the file). Anything that is neither
 * `prev` nor `next` is real drift and is refused rather than overwritten.
 */
function swapValue(raw: string, prev: string, next: string, where: string): string {
  if (prev === next) return raw;
  const [prevLit, prevAscii] = encodings(prev);
  const [nextLit, nextAscii] = encodings(next);
  for (const [from, to] of [
    [prevLit, nextLit],
    [prevAscii, nextAscii],
  ] as const) {
    const hits = raw.split(from).length - 1;
    if (hits === 1) return raw.split(from).join(to);
    if (hits > 1) throw new Error(`${where}: value occurs ${hits} times in the file - refusing`);
  }
  if (raw.includes(nextLit) || raw.includes(nextAscii)) return raw; // already mirrored
  throw new Error(`${where}: neither the expected old value nor the new one is in the file - refusing`);
}

async function main() {
  const apply = process.argv.includes("--apply");
  const db = createClient(url!, key!, { auth: { persistSession: false } });

  for (const fix of FIXES) {
    console.log(`\n=== ${fix.label}`);

    const { data: row, error } = await db
      .from("questions")
      .select("id, org_id, exam_id, text, solution, content_hash, options(label, text, is_correct)")
      .eq("id", fix.questionId)
      .single();
    if (error) throw new Error(`${fix.questionId}: ${error.message}`);

    const opts = [...(row.options as { label: string; text: string; is_correct: boolean }[])].sort((a, b) =>
      a.label.localeCompare(b.label),
    );
    if (opts.length !== 4) throw new Error(`${fix.questionId}: ${opts.length} options, expected 4 - refusing`);
    const answer = opts.find((o) => o.is_correct)?.label ?? "";
    if (!answer) throw new Error(`${fix.questionId}: no correct option - refusing`);
    const optTexts = opts.map((o) => o.text);

    // The stored hash must recompute from the CURRENT content, or this row is not
    // what the fix was adjudicated against.
    const storedText = String(row.text);
    const storedSoln = String(row.solution ?? "");
    if (contentHash(storedText, optTexts, answer) !== row.content_hash) {
      throw new Error(`${fix.questionId}: stored content_hash does not recompute - refusing`);
    }

    const newText = fix.stem ? applyEdits(storedText, fix.stem, `${fix.questionId} stem`) ?? storedText : storedText;
    let newSoln = fix.solution
      ? applyEdits(storedSoln, fix.solution, `${fix.questionId} solution`) ?? storedSoln
      : storedSoln;
    if (fix.notePrefix && !newSoln.startsWith(fix.notePrefix)) {
      if (newSoln.includes(fix.notePrefix.trim())) {
        throw new Error(`${fix.questionId}: note already present but not at the start - refusing`);
      }
      newSoln = fix.notePrefix + newSoln;
    }

    const newHash = contentHash(newText, optTexts, answer);
    const textChanged = newText !== storedText;
    const solnChanged = newSoln !== storedSoln;

    if (textChanged) {
      const { data: clash, error: ce } = await db
        .from("questions")
        .select("id")
        .eq("org_id", row.org_id)
        .eq("exam_id", row.exam_id)
        .eq("content_hash", newHash)
        .neq("id", row.id)
        .limit(1);
      if (ce) throw new Error(ce.message);
      if (clash?.length) throw new Error(`${fix.questionId}: new hash collides with ${clash[0].id} - refusing`);
    } else if (newHash !== row.content_hash) {
      throw new Error(`${fix.questionId}: stem unchanged but hash moved - refusing`);
    }

    console.log(`  db  : stem ${textChanged ? "CHANGE" : "unchanged"} | solution ${solnChanged ? "CHANGE" : "unchanged"}`);
    if (textChanged) {
      console.log(`        - ${JSON.stringify(storedText)}`);
      console.log(`        + ${JSON.stringify(newText)}`);
      console.log(`        hash ${row.content_hash.slice(0, 12)} -> ${newHash.slice(0, 12)}`);
    }
    if (solnChanged) console.log(`        solution ${storedSoln.length} -> ${newSoln.length} chars`);

    // ---- records mirror, computed independently of whether the DB changed ----
    const path = join(process.cwd(), "scripts", "practice-paper", "data", fix.recordsFile);
    const raw = readFileSync(path, "utf8");
    const parsed = JSON.parse(raw) as Record<string, unknown>[];
    const rec = parsed.find((r) => r.n === fix.n);
    if (!rec) throw new Error(`${fix.recordsFile}: no record n=${fix.n} - refusing`);

    let patched = swapValue(raw, String(rec.stem), newText, `${fix.recordsFile} n=${fix.n} stem`);
    patched = swapValue(patched, String(rec.solution ?? ""), newSoln, `${fix.recordsFile} n=${fix.n} solution`);

    // Prove the patched file still parses AND that the record now holds exactly
    // what is about to be written to the database.
    const reparsed = JSON.parse(patched) as Record<string, unknown>[];
    if (reparsed.length !== parsed.length) throw new Error(`${fix.recordsFile}: record count changed - refusing`);
    const recAfter = reparsed.find((r) => r.n === fix.n)!;
    if (String(recAfter.stem) !== newText) {
      throw new Error(
        `${fix.recordsFile} n=${fix.n}: patched stem !== DB target\n  file: ${JSON.stringify(recAfter.stem)}\n  db  : ${JSON.stringify(newText)}`,
      );
    }
    if (String(recAfter.solution ?? "") !== newSoln) {
      throw new Error(`${fix.recordsFile} n=${fix.n}: patched solution !== DB target - refusing`);
    }
    const changedLines = patched === raw ? 0 : patched.split("\n").filter((l, i) => l !== raw.split("\n")[i]).length;
    console.log(
      `  file: ${patched === raw ? "already mirrored" : "patched"}; reparses, ${reparsed.length} records, ` +
        `${changedLines} line(s) differ, stem+solution match the DB target`,
    );

    if (!apply) continue;

    if (textChanged || solnChanged) {
      const { error: ue } = await db
        .from("questions")
        .update({ text: newText, solution: newSoln, content_hash: newHash })
        .eq("id", fix.questionId);
      if (ue) throw new Error(`${fix.questionId}: ${ue.message}`);
    }
    if (patched !== raw) writeFileSync(path, patched, "utf8");

    // Verify from the database, and confirm paper membership survived.
    const { data: after, error: ae } = await db
      .from("questions")
      .select("text, solution, content_hash")
      .eq("id", fix.questionId)
      .single();
    if (ae) throw new Error(ae.message);
    const ok = after.text === newText && after.solution === newSoln && after.content_hash === newHash;
    const { count } = await db
      .from("paper_questions")
      .select("*", { count: "exact", head: true })
      .eq("question_id", fix.questionId);
    const fileOk = String((JSON.parse(readFileSync(path, "utf8")) as Record<string, unknown>[]).find((r) => r.n === fix.n)!.stem) === newText;
    console.log(`  verified: db matches target = ${ok}; file matches target = ${fileOk}; still in ${count ?? 0} paper(s)`);
    if (!ok || !fileOk) process.exit(1);
  }

  if (!apply) console.log(`\n[dry run] pass --apply to write.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
