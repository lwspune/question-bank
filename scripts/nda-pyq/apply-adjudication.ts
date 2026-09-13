/**
 * Record a hand adjudication of a key disagreement into `<id>.answers.json`.
 *
 *   npx tsx scripts/nda-pyq/apply-adjudication.ts 2026-2
 *   npx tsx scripts/nda-pyq/apply-adjudication.ts 2026-2 --apply
 *
 * The adjudications are DATA below, one per disputed question, each asserting
 * the state it expects to find. That is what makes the edit re-runnable and
 * reviewable: a hand-edit of a 120-row JSON leaves no record of what was
 * decided or why, and this repo has already had an adjudication silently
 * overwrite the losing argument that justified it.
 *
 * TWO RULES, both from the sibling pipelines:
 *
 *  1. When the KEY wins, BOTH `answer` AND `value` are overridden. Overriding
 *     only `answer` leaves the row asserting one option as a letter and a
 *     different one in plain words — that shipped once on cds-maths and was
 *     caught by someone reading the row, not by any check.
 *  2. The adjudication is APPENDED to `reasoning`, never replacing it. The
 *     original derivation is the evidence for why the call was close, and a
 *     `reasoning` that reads as self-contradictory is the audit trail working.
 *
 * `solution` is deliberately NOT touched. It is student-facing; a third-party
 * key and our disagreement with it are process, and the brief keeps process out
 * of the field a learner reads.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dataPath, requirePaper } from "./config";
import type { Derivation } from "./lib";

type Adjudication = {
  number: number;
  /** The state this edit expects to find — refuses if the file has moved on. */
  expectDerived: string | null;
  key: string;
  /** "ours" = our derivation stands and the KEY is defective. "key" = we were wrong. */
  winner: "ours" | "key";
  /** Only when winner === "key". */
  newValue?: string;
  note: string;
};

const ADJUDICATIONS: Record<string, Adjudication[]> = {
  "2026-2": [
    {
      number: 4,
      expectDerived: "A",
      key: "B",
      winner: "ours",
      note:
        "ADJUDICATED against the printed page (p02, printed p3): the context reads " +
        "'the ratio 1 : 2 : 7' and the stem 'What is sin A . cos B equal to?', with " +
        "options (a) 1/4 (b) 1/2 (c) 1 (d) 2 — the transcription is faithful. " +
        "A = 18 deg and B = 36 deg, and sin(18) cos(36) = [(sqrt5-1)/4][(sqrt5+1)/4] " +
        "= 4/16 = 1/4 EXACTLY (verified to 40 dps). The external key's 1/2 is exactly " +
        "what the product-to-sum identity gives WITHOUT its factor of one half: " +
        "2 sin X cos Y = sin(X+Y) + sin(X-Y) yields 2 sin18 cos36 = sin54 - sin18 = 1/2. " +
        "So the key is wrong by a dropped factor of 2 and our answer stands.",
    },
    {
      number: 11,
      expectDerived: "C",
      key: "A",
      winner: "ours",
      note:
        "ADJUDICATED against the printed page (p04, printed p5): the stem reads " +
        "'6 sin(pi/18) - 8 sin^3(pi/18)' with options (a) 1/4 (b) 1/2 (c) 1 (d) 2 — " +
        "faithful. 6 sin t - 8 sin^3 t = 2(3 sin t - 4 sin^3 t) = 2 sin 3t, and at " +
        "t = pi/18 that is 2 sin(pi/6) = 1 EXACTLY (verified to 40 dps). The external " +
        "key's 1/4 is what a HALF of sin 3t gives instead of TWICE it — a factor-of-four " +
        "slip on the same triple-angle identity. Our answer stands. " +
        "Worth recording: Q4 and Q11 carry an IDENTICAL option set (1/4, 1/2, 1, 2) and " +
        "the key is wrong on both, in each case by a power-of-two factor on a standard " +
        "identity. Whether that is one careless pass or two independent slips cannot be " +
        "told from the key alone, so it is noted rather than asserted.",
    },
    {
      number: 62,
      expectDerived: "C",
      key: "A",
      winner: "ours",
      note:
        "ADJUDICATED against the printed page (p24, printed p25): statement II reads " +
        "'The minimum value of cos a + cos b + cos g is 1' and the options are " +
        "(a) I only (b) II only (c) Both I and II (d) Neither I nor II — faithful. " +
        "Because b = 90 - a, cos b = sin a, so cos^2 a + cos^2 b = 1 and the " +
        "direction-cosine identity FORCES cos g = 0. Both statements are therefore about " +
        "the same expression cos a + sin a on a in [0, 90], whose range is [1, sqrt 2]: " +
        "max sqrt 2 at a = 45 (statement I) and min 1 at a = 0 or a = 90 (statement II). " +
        "Both endpoints are legitimate lines — a = 0 is the x-axis, direction cosines " +
        "(1,0,0), which satisfies a + b = 90 and sums to exactly 1 (verified). " +
        "The key's 'I only' requires statement II to be false, which needs the " +
        "axis-aligned cases excluded; nothing in the question excludes them, and " +
        "direction angles are conventionally in [0,180]. " +
        "THIS IS THE ONE OF THE THREE THAT RESTS ON A READING RATHER THAN ARITHMETIC, " +
        "and the blind pass NAMED 'I only' as its runner-up in advance, on exactly this " +
        "ground. If a later key still says 'I only', this row is the first to revisit.",
    },
  ],
};

function main() {
  const paper = requirePaper(process.argv[2]);
  const apply = process.argv.includes("--apply");
  const list = ADJUDICATIONS[paper.id] ?? [];
  if (!list.length) throw new Error(`no adjudications recorded for ${paper.id}`);

  const path = dataPath(paper.id, "answers");
  if (!existsSync(path)) throw new Error(`missing ${path}`);
  const file = JSON.parse(readFileSync(path, "utf8")) as {
    reconciled?: number[];
    derivations: Derivation[];
  };
  const byNumber = new Map(file.derivations.map((d) => [d.number, d]));

  const errors: string[] = [];
  let changed = 0;
  for (const a of list) {
    const d = byNumber.get(a.number);
    if (!d) {
      errors.push(`Q${a.number}: no derivation`);
      continue;
    }
    const already = (file.reconciled ?? []).includes(a.number);
    if (already) {
      console.log(`  Q${a.number}: already reconciled — skipping (idempotent)`);
      continue;
    }
    if (d.answer !== a.expectDerived) {
      errors.push(
        `Q${a.number}: expected the derivation to say ${a.expectDerived} but it says ${d.answer} — ` +
          `the file has moved on since this adjudication was written. Refusing.`
      );
      continue;
    }
    console.log(
      `  Q${a.number}: derived=${d.answer} key=${a.key} -> ${a.winner === "ours" ? "OUR ANSWER STANDS (key defective)" : `KEY WINS, answer ${a.key}`}`
    );
    if (apply) {
      if (a.winner === "key") {
        d.answer = a.key;
        if (!a.newValue) {
          errors.push(`Q${a.number}: winner is "key" but no newValue given — value would go stale`);
          continue;
        }
        d.value = a.newValue;
      }
      d.reasoning = `${d.reasoning}\n\n${a.note}`;
      file.reconciled = [...(file.reconciled ?? []), a.number].sort((x, y) => x - y);
      changed += 1;
    }
  }

  if (errors.length) {
    console.log(`\nERRORS (${errors.length}):`);
    for (const e of errors) console.log(`  ${e}`);
    throw new Error("refusing to write.");
  }
  if (!apply) {
    console.log(`\n[dry-run] pass --apply to record ${list.length} adjudication(s). Nothing written.`);
    return;
  }
  writeFileSync(path, JSON.stringify(file, null, 2) + "\n", "utf8");
  console.log(`\nwrote ${path} — reconciled: [${(file.reconciled ?? []).join(", ")}] (${changed} changed)`);
}

main();
