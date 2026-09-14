/**
 * Structural probe over one paper's raw band files, BEFORE merge.
 *
 *   npx tsx scripts/nda-gat/check-bands.ts 2026-2
 *   npx tsx scripts/nda-gat/check-bands.ts 2026-2 --strict   # warnings fail too
 *
 * The per-band rules live in `checkBand`, imported from scripts/cds-maths — a
 * pure function driven by deliberately-broken fixtures in
 * tests/cds-maths-check-bands.test.ts. It exists as a shipped helper because on
 * a State Board run five agents each hand-rolled this checker and five shipped
 * the SAME bug in it.
 *
 * TWO THINGS A CLEAN RUN HERE DOES NOT MEAN.
 *
 * 1. It does not mean the paper is COVERED. Each band is checked against its own
 *    bandReport, so two bands that both stop short of their own last page are
 *    each internally consistent and both pass. `merge.ts` is the coverage gate —
 *    it reconciles the union against 1..150 and refuses on a gap.
 *
 * 2. It does not mean the TAXONOMY is right. `checkBand` takes a flat set of
 *    chapter names, so here it is given the union across all nine subjects and
 *    can only catch a chapter that exists NOWHERE. A Biology question filed
 *    under a Geography chapter passes it. That is the subject-scoped catalog
 *    gate in `merge.ts`, and it is the error a reader of /browse would never
 *    spot. This probe is a smoke test, not the gate.
 */
import { readdirSync, readFileSync } from "node:fs";
// checkBand lives in the sibling script, which guards its own main() behind
// `require.main === module`, so importing it runs nothing.
import { checkBand } from "../cds-maths/check-bands";
import type { Band } from "../cds-maths/lib";
import { DATA, catalog, requirePaper } from "./config";
import { validateSections, type GatTQ } from "./lib";

type Finding = { level: "ERROR" | "WARN"; where: string; msg: string };

/** Every long-form field of a question, for a whole-question glyph scan. */
function fieldsOf(q: GatTQ): string[] {
  return [q.stem ?? "", q.context ?? "", ...(q.options ?? []).map((o) => o.text ?? "")];
}

/**
 * Drop the shared probe's blanket `$` error where every dollar is ESCAPED.
 *
 * `checkBand` comes from a Mathematics pipeline, where a `$` is never legitimate
 * and banning it outright is exactly right. A GAT paper prints CURRENCY — "a
 * $ 2.6 billion uranium supply agreement" — so the rule has to distinguish the
 * hazard from the fix.
 *
 * The hazard is real and is why the blanket rule exists: a BARE `$` is a math
 * delimiter in this repo's renderer, and a single-`$` arm pairs two dollars and
 * swallows everything between them. That reached shipped content once (a UPSC
 * CSAT question where `$` was a puzzle operator, which silently ate its own
 * definition list).
 *
 * Four candidate repairs were measured against the real parser when that was
 * found, and BACKSLASH-ESCAPING THE BARE CHARACTER DOES NOT WORK — there is no
 * escape handling outside a math zone at all. `\(\$\)` renders a normal-width
 * dollar with the prose intact, and render-check.ts pins that form in its
 * self-test.
 *
 * So: suppress only when the question carries NO bare `$` anywhere. One
 * unescaped dollar and the whole question keeps the error.
 */
function suppressEscapedDollar(band: Band, findings: Finding[]): Finding[] {
  const clean = new Set<number>();
  for (const q of (band.questions ?? []) as GatTQ[]) {
    // A bare `$` is one not immediately preceded by a backslash.
    const bare = fieldsOf(q).some((f) => /(^|[^\\])\$/.test(f));
    if (!bare) clean.add(q.number);
  }
  return findings.filter((f) => {
    if (!f.msg.includes('contains "$"')) return true;
    const m = /\bQ(\d+)\b/.exec(f.where);
    return !(m && clean.has(Number(m[1])));
  });
}

function main() {
  const paper = requirePaper(process.argv[2]);
  const strict = process.argv.includes("--strict");

  // The UNION of chapter names across all nine subjects — see the header for
  // what this can and cannot catch.
  const cat = catalog();
  const chapters = new Set<string>();
  for (const subject of Object.keys(cat)) for (const ch of Object.keys(cat[subject])) chapters.add(ch);

  const bandRe = new RegExp(
    `^${paper.id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\.b[A-Za-z0-9]+\\.json$`
  );
  const files = readdirSync(DATA)
    .filter((f) => bandRe.test(f))
    .sort();
  if (!files.length) throw new Error(`no band files matching ${paper.id}.b<name>.json in ${DATA}`);

  const findings: Finding[] = [];
  for (const f of files) {
    let band: Band;
    try {
      band = JSON.parse(readFileSync(`${DATA}/${f}`, "utf8"));
    } catch (e) {
      findings.push({ level: "ERROR", where: f, msg: `does not parse: ${(e as Error).message}` });
      continue;
    }
    const got = suppressEscapedDollar(band, checkBand(band, chapters) as Finding[]);

    // Part A / Part B is checkable per band and is worth catching HERE rather
    // than at merge: it is almost always a whole run of questions, so an agent
    // that gets it wrong gets it wrong for its entire band and can fix the band
    // it still has in context.
    for (const msg of validateSections((band.questions ?? []) as GatTQ[])) {
      got.push({ level: "ERROR", where: band.band ?? f, msg });
    }

    // A missing `subject` is invisible to checkBand, which predates this paper.
    for (const q of (band.questions ?? []) as GatTQ[]) {
      if (!q.subject) got.push({ level: "ERROR", where: `${band.band} Q${q.number}`, msg: "no subject" });
    }

    findings.push(...got);
    const errs = got.filter((x) => x.level === "ERROR").length;
    console.log(
      `  ${f.padEnd(26)} ${String(band.questions?.length ?? 0).padStart(3)} q   ${errs} error(s), ${got.length - errs} warning(s)`
    );
  }

  const errors = findings.filter((f) => f.level === "ERROR");
  const warns = findings.filter((f) => f.level === "WARN");
  for (const list of [errors, warns]) {
    if (!list.length) continue;
    console.log(`\n${list[0].level}S (${list.length}):`);
    for (const f of list) console.log(`  ${f.where}: ${f.msg}`);
  }
  if (!findings.length) console.log(`\nclean: ${files.length} band file(s), no findings.`);

  if (errors.length || (strict && warns.length)) process.exit(1);
}

main();
