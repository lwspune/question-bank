/**
 * One-off normaliser for the pythagoras-10 transcription fragments.
 *
 * Three vision agents transcribed this chapter in parallel and diverged on two
 * conventions. Rather than hand-edit the fragments (which loses the record of
 * WHAT was normalised and WHY), the reconciliation is a script that reports
 * every change it makes and is safe to re-run.
 *
 *   npx tsx scripts/mh-ssc-10-text/normalise-bands.ts          # dry run
 *   npx tsx scripts/mh-ssc-10-text/normalise-bands.ts --apply
 *
 * 1. THE CHALLENGING-QUESTION GLYPH. The book marks harder questions with a
 *    superscript STAR. The PDF text layer renders that Wingdings byte as `«`,
 *    and my transcription brief wrongly told agents to write `«` — so band A,
 *    which read the page and used `★`, was right and the brief was wrong. This
 *    note is appended to the STEM and is therefore student-facing: it must
 *    describe the glyph the student can see on the page. Normalised to `★`.
 *
 * 2. ORTHOGRAPHIC TYPOS IN STEMS. The bands disagreed on policy — one corrected
 *    "parellel", another shipped "hypotenus" verbatim. The house rule (set when
 *    the Class-11 spine corrected 10 heading typos) is: correct a defect where
 *    NOTHING FACTUAL TURNS ON IT, and preserve-and-flag any defect that changes
 *    a claim. A misspelling in a stem is the former. All four are recorded in
 *    the errata register regardless, so the correction is never silent.
 *
 * Deliberately NOT normalised: the two "complete the activity" questions keep
 * the book's empty boxes in the STEM with the filled version in `solution`.
 * The blanks ARE the question — filling them into the stem turns the question
 * into its own answer. (This is the mh-sb-11 precedent read correctly: there it
 * was the book's own printed SOLUTION that carried blanks, and those were
 * filled so PUBLIC ships whole worked solutions rather than holes.)
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { DATA } from "./config";

const APPLY = process.argv.includes("--apply");

/** `\b<literal>\b`, with regex metacharacters in the literal escaped. */
function wordBoundary(literal: string): RegExp {
  return new RegExp(`\\b${literal.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "g");
}

/** Stem typo fixes, keyed by ref.
 *
 * ⚠ MATCHING IS WORD-BOUNDARY ANCHORED, AND THAT IS LOAD-BEARING, NOT TIDINESS.
 * The first version used a plain substring match and was NOT IDEMPOTENT: "hypotenus"
 * is a PREFIX of its own replacement "hypotenuse", so a second run matched inside
 * the text the first run had just written and produced "hypotenusee". That reached
 * the database. The other two fixes survived only by luck — their search strings
 * happen not to be substrings of their replacements.
 *
 * A repair that is applied twice must be a no-op the second time. With `\b` on both
 * ends, "hypotenus" no longer matches inside "hypotenuse" (the following `e` is a
 * word character), so re-running genuinely changes nothing — and the apply-twice
 * check below PROVES that per fix rather than assuming it.
 *
 * `from` must match EXACTLY ONCE, so the table cannot silently rot if a fragment is
 * re-transcribed. */
const TYPO_FIXES: { ref: string; from: string; to: string; note: string }[] = [
  { ref: "PS2 Q.1 (7)", from: "hypotenus", to: "hypotenuse", note: "'hypotenus' — missing final 'e'" },
  { ref: "PS2 Q.2 (3)", from: "the length a diagonal", to: "the length of a diagonal", note: "'the length a diagonal' — dropped 'of'" },
  { ref: "PS2 Q.16", from: "equilatral", to: "equilateral", note: "'equilatral' — misspelling" },
];

function main() {
  // The TRANSCRIPTION FRAGMENTS, named explicitly. An earlier version globbed
  // `pythagoras-10.*.json` minus a couple of suffixes, which worked only while
  // those were the only files in data/. As soon as the solution, mcq-verify and
  // topaper artifacts landed it started reading rows with no `stem` at all —
  // the identical over-broad-glob failure this session fixed in merge.ts, in a
  // script written after that fix. A glob over a shared directory fails OPEN;
  // name what you mean.
  const files = ["solved-a", "ex21", "solved-b", "ex22", "ps2"].map((s) => `pythagoras-10.${s}.json`);

  let glyphFixed = 0;
  const typosApplied = new Set<string>();
  let typosChanged = 0;

  for (const f of files) {
    const path = join(DATA, f);
    const rows = JSON.parse(readFileSync(path, "utf8")) as { ref: string; stem: string }[];
    let touched = false;

    for (const row of rows) {
      // 1. glyph
      if (row.stem.includes("marked « (challenging)")) {
        row.stem = row.stem.replace("marked « (challenging)", "marked ★ (challenging)");
        console.log(`  glyph  ${f} :: ${row.ref}  « → ★`);
        glyphFixed++;
        touched = true;
      }
      // 2. typos
      for (const fix of TYPO_FIXES) {
        if (row.ref !== fix.ref) continue;
        const re = wordBoundary(fix.from);
        const hits = (row.stem.match(re) ?? []).length;
        if (hits === 0) {
          if (row.stem.includes(fix.to)) {
            typosApplied.add(fix.ref); // already normalised — re-run is a no-op
            continue;
          }
          throw new Error(`typo fix for ${fix.ref} matched NOTHING: "${fix.from}"`);
        }
        if (hits > 1) throw new Error(`typo fix for ${fix.ref} matched ${hits}x (must be exactly 1): "${fix.from}"`);
        const after = row.stem.replace(re, fix.to);
        // Applying twice must change nothing. Proven, not assumed — the bug this
        // guards against shipped to the database.
        if (after.replace(re, fix.to) !== after) {
          throw new Error(`typo fix for ${fix.ref} is NOT IDEMPOTENT: applying "${fix.from}" -> "${fix.to}" twice keeps changing the text`);
        }
        row.stem = after;
        console.log(`  typo   ${f} :: ${row.ref}  ${fix.note}`);
        typosChanged++;
        typosApplied.add(fix.ref);
        touched = true;
      }
    }

    if (touched && APPLY) writeFileSync(path, JSON.stringify(rows, null, 2) + "\n", "utf8");
  }

  const missing = TYPO_FIXES.filter((t) => !typosApplied.has(t.ref));
  if (missing.length) throw new Error(`typo fixes never found their row: ${missing.map((m) => m.ref).join(", ")}`);

  // Report CHANGES MADE separately from rows merely verified. The original summary
  // conflated the two ("3 typo fix(es)" printed identically whether a fix was
  // applied or was already clean), and that ambiguity is precisely what let a
  // double-application slip through unnoticed on a re-run.
  const changed = glyphFixed + typosChanged;
  console.log(
    `\nchanged ${changed} (${glyphFixed} glyph, ${typosChanged} typo) · verified-already-clean ${typosApplied.size - typosChanged}`
  );
  if (changed === 0) console.log("no-op — inputs were already normalised.");
  console.log(APPLY ? (changed === 0 ? "nothing written." : "WRITTEN.") : "dry run — pass --apply to write.");
}

main();
