/**
 * Apply the hand adjudication in `<id>.adjudication.json` to `<id>.answers.json`.
 *
 *   npx tsx scripts/nda-gat/apply-adjudication.ts 2026-2
 *   npx tsx scripts/nda-gat/apply-adjudication.ts 2026-2 --apply
 *
 * The VERDICTS live in the adjudication file, which is the source of truth and
 * carries the reasoning. This script holds only what that file cannot: the
 * REWRITTEN SOLUTION for each row whose answer changes.
 *
 * ## Why this pipeline rewrites `solution` where the Maths one does not
 *
 * `scripts/nda-pyq/apply-adjudication.ts` deliberately leaves `solution` alone,
 * on the grounds that it is student-facing and the key dispute is process. That
 * is right THERE because a Maths derivation carries no separate solution field
 * that reaches the DB. Here it does: `buildRecords` ships `solution ?? reasoning`,
 * so all 150 rows already hold an authored, student-facing solution.
 *
 * On the six rows where the answer changes, that solution currently ARGUES FOR
 * THE ANSWER BEING OVERTURNED. Shipping it would produce a question whose own
 * worked solution contradicts its key — the SOLN-vs-KEY defect class this repo
 * documents and sweeps for. So the solution is rewritten, and the rewrite is
 * held here beside the assertion of what it replaces.
 *
 * ## The honesty rule on a rewritten solution
 *
 * Two of these six (145, 149) are recall rows where we deferred to two agreeing
 * keys WITHOUT independently holding the fact. The old solutions asserted a
 * confident narrative for an answer now judged wrong — which is precisely the
 * failure mode that makes a fluent invention worse than an absence. So a rewrite
 * states the adjudicated answer and gives only context that is independently
 * true. Where the replacement fact is not held, the solution says the statement
 * is incorrect as printed and does NOT invent what the correct one would be.
 * An honest gap beats a plausible fabrication.
 *
 * Every entry asserts the answer AND the solution it expects to find, so the
 * script is idempotent, re-runnable, and refuses if the file has moved on.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dataPath, requirePaper } from "./config";
import type { Derivation } from "./lib";

type Rewrite = {
  number: number;
  expectAnswer: string;
  newAnswer: string;
  newValue: string;
  /** A distinctive fragment of the solution being REPLACED — asserted, not matched loosely. */
  expectSolutionFragment: string;
  newSolution: string;
};

const REWRITES: Record<string, Rewrite[]> = {
  "2026-2": [
    {
      number: 90,
      expectAnswer: "C",
      newAnswer: "D",
      newValue: "all four pairs are correctly matched",
      expectSolutionFragment: "So **three** of the four pairs are correctly matched.",
      newSolution:
        "Classify each example by asking what is dispersed **in** what. " +
        "**I — Cloud → Aerosol.** Liquid water droplets dispersed in a gas. " +
        "**II — Mud → Sol.** Fine solid particles dispersed in a liquid. " +
        "**III — Milk → Emulsion.** Liquid fat droplets dispersed in another liquid. " +
        "**IV — Rubber → Foam.** Foam rubber is a gas dispersed in a solid, and the standard " +
        "classification table used at this level lists it under **foam**, alongside sponge and " +
        "pumice stone. All four pairs are therefore correctly matched.\n\n" +
        "[Note: some texts draw a finer distinction and call a gas dispersed in a solid a " +
        "*solid foam*, reserving *foam* for a gas in a liquid such as soap lather or whipped " +
        "cream. Under that stricter reading pair IV would not match and the answer would be " +
        "three. The table this question is set from does not make that split.]",
    },
    {
      number: 91,
      expectAnswer: "C",
      newAnswer: "A",
      newValue: "I only",
      expectSolutionFragment: "Hence statements I and III are correct.",
      newSolution:
        "The breakdown of glucose to pyruvate — glycolysis — takes place in the cytoplasm and " +
        "is common to both aerobic and anaerobic respiration, so **statement I is correct**. " +
        "Aerobic respiration breaks glucose down completely to carbon dioxide and water and " +
        "releases far more energy (about 36-38 ATP per glucose) than the anaerobic pathway " +
        "(about 2), so **statement II is the reverse of the truth**. " +
        "**Statement III is marked incorrect** because it is an absolute claim: anaerobic " +
        "respiration in yeast produces ethanol **and carbon dioxide**, so carbon dioxide is not " +
        "released *only* in aerobic respiration. Hence I only.\n\n" +
        "[Note: the stem frames the statements 'in relation to respiration in animals', and " +
        "within that framing statement III is defensible — the anaerobic pathway in animal " +
        "muscle yields lactic acid and no carbon dioxide, which would make the answer 'I and " +
        "III'. The accepted answer treats III as a general claim about respiration rather than " +
        "one restricted to animals. A student who argued from the stem's own scope has not " +
        "made an error of biology.]",
    },
    {
      number: 124,
      expectAnswer: "C",
      newAnswer: "D",
      newValue: "I, II and III",
      expectSolutionFragment: "Statement II is not right as stated",
      newSolution:
        "Three of Britain's advantages are standard in accounts of the Industrial Revolution. " +
        "**Coal and iron ore were plentifully available** at the start of industrialisation, " +
        "along with lead, copper and tin (statement I). Britain was **lucky in possessing " +
        "excellent coking coal and high-grade iron ore in the same basins**, often in the same " +
        "seams, so the two could be brought together cheaply (statement III). And the **blast " +
        "furnace came into use at the beginning of the eighteenth century** (statement II) — " +
        "the reference is to Abraham Darby's breakthrough of 1709, smelting iron with coke " +
        "instead of charcoal, which is what made the blast furnace an industrial proposition " +
        "and is the date the standard narrative gives. All three statements are correct.",
    },
    {
      number: 144,
      expectAnswer: "B",
      newAnswer: "D",
      newValue: "II and III",
      expectSolutionFragment: "the 2026 slate was not composed only of women",
      newSolution:
        "The 'Green Nobel' is the **Goldman Environmental Prize**. " +
        "**Statement I is wrong**: it has been awarded **every year** since 1990, not every " +
        "alternate year. **Statement II is correct**, and holds of every edition by design — " +
        "the prize goes to **six winners a year, one from each of six inhabited regions**: " +
        "Africa, Asia, Europe, Islands and Island Nations, North America, and South and Central " +
        "America. In 2026 the Asian recipient was **Borim Kim of South Korea**. " +
        "**Statement III is also correct**: 2026 was the first year in the prize's history in " +
        "which **all six winners were women**. The answer is II and III.",
    },
    {
      number: 145,
      expectAnswer: "A",
      newAnswer: "B",
      newValue: "India and Canada",
      expectSolutionFragment: "The agreement was signed between **India and Russia**",
      newSolution:
        "The agreement was signed between **India and Canada**. Canada is among the world's " +
        "largest uranium producers, and civil nuclear cooperation between the two countries was " +
        "restored by the India-Canada Nuclear Cooperation Agreement, under which Canadian " +
        "uranium has been supplied to Indian reactors. Option D can be set aside on general " +
        "grounds: Australia and Canada are both major uranium **exporters**, so a supply " +
        "agreement between the two of them would not be the natural transaction.",
    },
    {
      number: 149,
      expectAnswer: "A",
      newAnswer: "C",
      newValue: "II and III only",
      expectSolutionFragment: "All three statements are therefore correct.",
      newSolution:
        "The **Khelo India Tribal Games** are one of the verticals of the **Khelo India " +
        "Scheme**, the Government of India's flagship sports-development programme, alongside " +
        "the Youth Games, University Games, Winter Games and Para Games — so **statement III is " +
        "correct**. **'Morveer' was the official mascot**, so **statement II is correct**. " +
        "**Statement I is not correct as printed**: the inaugural edition was not organised " +
        "across the two States named in it. The answer is II and III only.",
    },
  ],
};

function main() {
  const paper = requirePaper(process.argv[2]);
  const apply = process.argv.includes("--apply");
  const rewrites = REWRITES[paper.id] ?? [];
  if (!rewrites.length) throw new Error(`no rewrites recorded for ${paper.id}`);

  const adjPath = dataPath(paper.id, "adjudication");
  const ansPath = dataPath(paper.id, "answers");
  for (const p of [adjPath, ansPath]) if (!existsSync(p)) throw new Error(`missing ${p}`);

  const adj = JSON.parse(readFileSync(adjPath, "utf8")) as {
    keepOurs: { number: number }[];
    flippedToOurs: { number: number }[];
    acceptKeys: { number: number; centurion: string }[];
    unresolved: { number: number }[];
  };
  const file = JSON.parse(readFileSync(ansPath, "utf8")) as {
    reconciled?: number[];
    derivations: Derivation[];
  };

  if (adj.unresolved.length) {
    throw new Error(
      `${adj.unresolved.length} row(s) still unresolved (${adj.unresolved
        .map((r) => "Q" + r.number)
        .join(", ")}) — settle them before applying.`
    );
  }

  // The adjudication file decides WHICH rows change; this script only supplies the text.
  const shouldChange = new Set(adj.acceptKeys.map((r) => r.number));
  const haveRewrite = new Set(rewrites.map((r) => r.number));
  const missing = [...shouldChange].filter((n) => !haveRewrite.has(n));
  const extra = [...haveRewrite].filter((n) => !shouldChange.has(n));
  if (missing.length || extra.length) {
    throw new Error(
      `rewrites disagree with the adjudication: ` +
        `${missing.length ? `no rewrite for Q${missing.join(", Q")}. ` : ""}` +
        `${extra.length ? `rewrite for Q${extra.join(", Q")} which the adjudication does not change.` : ""}`
    );
  }

  const byNumber = new Map(file.derivations.map((d) => [d.number, d]));
  const errors: string[] = [];
  let changed = 0;

  for (const r of rewrites) {
    const d = byNumber.get(r.number);
    if (!d) {
      errors.push(`Q${r.number}: no derivation`);
      continue;
    }
    if ((file.reconciled ?? []).includes(r.number)) {
      console.log(`  Q${r.number}: already applied — skipping (idempotent)`);
      continue;
    }
    if (d.answer !== r.expectAnswer) {
      errors.push(
        `Q${r.number}: expected answer ${r.expectAnswer}, found ${d.answer} — file has moved on. Refusing.`
      );
      continue;
    }
    const key = adj.acceptKeys.find((a) => a.number === r.number)!;
    if (key.centurion !== r.newAnswer) {
      errors.push(
        `Q${r.number}: rewrite says ${r.newAnswer} but the adjudication says ${key.centurion}. Refusing.`
      );
      continue;
    }
    if (!(d.solution ?? "").includes(r.expectSolutionFragment)) {
      errors.push(
        `Q${r.number}: the solution being replaced does not contain its asserted fragment — refusing rather than overwriting text this rewrite was not written against.`
      );
      continue;
    }
    console.log(`  Q${r.number}: ${d.answer} -> ${r.newAnswer}  (answer, value and solution)`);
    if (apply) {
      d.answer = r.newAnswer;
      d.value = r.newValue;
      d.solution = r.newSolution;
      d.reasoning = `${d.reasoning}\n\nADJUDICATED ${d.answer} — see data/${paper.id}.adjudication.json for the evidence and the dissent. The solution was rewritten at the same time, because a solution left arguing the overturned answer would contradict its own key.`;
      file.reconciled = [...(file.reconciled ?? []), r.number].sort((x, y) => x - y);
      changed += 1;
    }
  }

  if (errors.length) {
    console.log(`\nERRORS (${errors.length}):`);
    for (const e of errors) console.log(`  ${e}`);
    throw new Error("refusing to write.");
  }
  const unchanged = adj.keepOurs.length + adj.flippedToOurs.length;
  console.log(
    `\n${rewrites.length} row(s) change; ${unchanged} adjudicated row(s) keep our answer and need no write.`
  );
  if (!apply) {
    console.log(`[dry-run] pass --apply. Nothing written.`);
    return;
  }
  writeFileSync(ansPath, JSON.stringify(file, null, 2) + "\n", "utf8");
  console.log(`wrote ${ansPath} — reconciled: [${(file.reconciled ?? []).join(", ")}] (${changed} changed)`);
}

main();
