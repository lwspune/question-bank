/**
 * Standing structural probe over a paper's transcription band files.
 *
 *   npx tsx scripts/cds-maths/check-bands.ts <paperId>
 *   npx tsx scripts/cds-maths/check-bands.ts <paperId> --strict   # exit 1 on WARN too
 *
 * WHY THIS EXISTS. On the State Board Chemistry run five agents independently
 * hand-rolled the same band checker, and five shipped the SAME bug in it —
 * producing a clean pass over zero zones. Every one caught it only by forcing a
 * broken fixture to go red first. The conclusion recorded there was that the
 * brief should SHIP the helper rather than have each agent rebuild it. This is
 * that helper.
 *
 * It runs BEFORE merge.ts, on the raw band files, and checks the things merge.ts
 * structurally cannot: merge.ts sees the merged question list, so it can never
 * see a band whose own report contradicts its contents, and it does not look at
 * glyphs at all.
 *
 * `checkBand` is pure and exported, and tests/cds-maths-check-bands.test.ts
 * drives each rule with a deliberately broken fixture. A clean run here means
 * nothing unless those tests can go red — which is the mistake this file exists
 * to stop being repeated.
 */
import { readdirSync, readFileSync } from "node:fs";
import { DATA, catalog, requirePaper } from "./config";
import { findLatexImbalance, type Band, type TQ } from "./lib";

type Finding = { level: "ERROR" | "WARN"; where: string; msg: string };

/**
 * Unicode characters that must never reach a stem: every one of them has a
 * LaTeX form, and mixing the two makes the corpus unsearchable and renders
 * inconsistently between the web and the Word export.
 *
 * The middle dot U+00B7 is here for a second reason — this booklet prints it as
 * a DECIMAL SEPARATOR (`37·5`), and left in place a derivation pass can read it
 * as multiplication. See TRANSCRIPTION_BRIEF.md; the bank-wide convention is a
 * full stop.
 */
const BANNED_GLYPHS: [string, string][] = [
  ["√", "\\sqrt{}"],
  ["²", "^2"],
  ["³", "^3"],
  ["½", "\\frac{1}{2}"],
  ["¼", "\\frac{1}{4}"],
  ["π", "\\pi"],
  ["θ", "\\theta"],
  ["°", "^\\circ"],
  ["≤", "\\le"],
  ["≥", "\\ge"],
  ["≠", "\\ne"],
  ["×", "\\times"],
  ["÷", "\\div"],
  ["∠", "\\angle"],
  ["△", "\\triangle"],
  ["∆", "\\triangle"],
  ["∞", "\\infty"],
  ["∑", "\\sum"],
  ["·", "a full stop, if it is a decimal separator"],
  ["�", "(replacement character — the source read failed)"],
];

/**
 * Real LaTeX commands beginning with "n". Used only to tell `\ne` apart from a
 * literal newline escape — see the backslash-n rule below. Kept deliberately
 * small: a command not listed here is flagged, and a false alarm on an exotic
 * command is cheap, while a missed literal `\n` renders as visible garbage.
 */
const LATEX_N_COMMANDS = new Set([
  "ne", "neq", "nabla", "not", "notin", "nu", "ni", "neg", "nearrow", "nwarrow",
  "newline", "nolimits", "nonumber", "nsubseteq", "nsupseteq", "nparallel",
  "ncong", "nmid", "nleq", "ngeq", "nsim", "nrightarrow", "nleftarrow",
]);

/** Exported for tests. Pure: findings for one band file's parsed contents. */
export function checkBand(band: Band, chapters: Set<string>): Finding[] {
  const out: Finding[] = [];
  const at = (n: number | string, msg: string, level: Finding["level"] = "ERROR") =>
    out.push({ level, where: `${band.band} Q${n}`, msg });

  if (!Array.isArray(band.questions) || !band.questions.length) {
    out.push({ level: "ERROR", where: band.band, msg: "no questions" });
    return out;
  }

  const numbers = band.questions.map((q) => q.number);
  const dupes = numbers.filter((n, i) => numbers.indexOf(n) !== i);
  if (dupes.length) out.push({ level: "ERROR", where: band.band, msg: `duplicate question numbers: ${[...new Set(dupes)].join(", ")}` });

  // The band's own report is the only thing that can catch a question NOBODY
  // owns, so a report that disagrees with its own contents is worse than none.
  const reported = band.bandReport?.numbersFound ?? [];
  const missingFromReport = numbers.filter((n) => !reported.includes(n));
  const reportedNotPresent = reported.filter((n) => !numbers.includes(n));
  if (missingFromReport.length || reportedNotPresent.length) {
    out.push({
      level: "ERROR",
      where: band.band,
      msg:
        `bandReport.numbersFound disagrees with questions[]` +
        (missingFromReport.length ? ` — present but unreported: ${missingFromReport.join(", ")}` : "") +
        (reportedNotPresent.length ? ` — reported but absent: ${reportedNotPresent.join(", ")}` : ""),
    });
  }

  for (const q of band.questions as TQ[]) {
    const labels = q.options.map((o) => o.label);
    if (labels.join(",") !== "A,B,C,D") at(q.number, `option labels are [${labels.join(",")}], expected A,B,C,D`);
    if (q.options.some((o) => !o.text?.trim())) at(q.number, "an option is blank");

    // Case-SENSITIVE: see lib.ts norm(). `2r^2` and `2R^2` are different options.
    const texts = q.options.map((o) => (o.text ?? "").replace(/\s+/g, " ").trim());
    for (let i = 0; i < texts.length; i++) {
      for (let j = i + 1; j < texts.length; j++) {
        if (texts[i] && texts[i] === texts[j]) {
          // A real printed duplicate is a source defect worth shipping a flag
          // for, not a transcription bug — so WARN, and check the page.
          at(q.number, `options ${labels[i]} and ${labels[j]} carry identical text — verify against the page`, "WARN");
        }
      }
    }

    if (!chapters.has(q.chapter)) at(q.number, `chapter "${q.chapter}" is not in catalog.json`);

    if (q.hasFigure && !q.figureNote?.trim()) at(q.number, "hasFigure is set but figureNote is empty — the crop operator has nothing to work from");
    if (!q.hasFigure && q.figureNote) at(q.number, "figureNote is set but hasFigure is not", "WARN");

    if (q.setLabel && !q.context?.trim()) at(q.number, "setLabel with no context");
    if (q.context?.trim() && !q.setLabel) at(q.number, "context with no setLabel", "WARN");

    // An answer must not exist anywhere in a transcription file. This is the
    // whole basis of the later blind pass.
    for (const banned of ["answer", "correct", "solution", "key"]) {
      if (banned in (q as unknown as Record<string, unknown>)) {
        at(q.number, `field "${banned}" is present — a transcription must not carry an answer`);
      }
    }

    const fields: [string, string | undefined][] = [
      ["stem", q.stem],
      ["context", q.context],
      ...q.options.map((o) => [`option ${o.label}`, o.text] as [string, string]),
    ];
    for (const [name, val] of fields) {
      if (!val) continue;
      const imbalance = findLatexImbalance(val);
      if (imbalance) at(q.number, `${name}: ${imbalance}`);
      // eslint-disable-next-line no-control-regex
      if (/[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(val)) {
        at(q.number, `${name}: contains a control character - a shell heredoc ate a backslash`);
      }
      // A literal backslash-n where a newline belongs.
      //
      // This rule is fiddly and both obvious versions are wrong. `\n` blindly
      // flags `\ne`, `\neq` and `\nabla` — the false positive that fired on a
      // transcription agent's own hand-rolled probe here. But `\n` followed by
      // "not a letter" MISSES the commonest real case, `"one\nline two"`, where
      // the escape is followed by ordinary prose. So: take the whole
      // backslash-word token and flag it unless it is a real LaTeX command.
      for (const token of val.match(/\\n[a-zA-Z]*/g) ?? []) {
        if (!LATEX_N_COMMANDS.has(token.slice(1))) {
          at(q.number, `${name}: contains a literal backslash-n ("${token}")`);
        }
      }
      if (/\$/.test(val)) at(q.number, `${name}: contains "$" — use \\( ... \\), never $ math`);
      if (/\\\[/.test(val)) at(q.number, `${name}: contains "\\[" — display math is not used here`);
      for (const [glyph, better] of BANNED_GLYPHS) {
        if (val.includes(glyph)) at(q.number, `${name}: contains "${glyph}" — write ${better}`);
      }
    }
  }
  return out;
}

function main() {
  const paper = requirePaper(process.argv[2]);
  const strict = process.argv.includes("--strict");
  const chapters = new Set(Object.keys(catalog()));

  // A CLEAN RUN HERE DOES NOT MEAN THE PAPER IS COVERED. Each band is checked
  // against its OWN bandReport, so two bands that both stop short of their own
  // last page are each internally consistent and both pass. That happened on
  // 2021-I: Q21-27 and Q75-80 were printed on pages b1 and b3 owned, absent
  // from every band file, and invisible here. `merge.ts` is the gate for that
  // -- it reconciles the union against 1..QUESTIONS_PER_PAPER and REFUSES to
  // write on a gap. Do not read a green check-bands as "the paper is complete".
  // Band suffixes are ALPHANUMERIC, not numeric. Every shipped paper used
  // b1..b6, so the pattern was `b\d+` -- and a paper transcribed with bA..bD
  // matched NOTHING, so this probe threw "no band files" instead of checking
  // them. The failure is loud rather than silent, which is the only reason it
  // was caught, and it was caught by an agent rather than by a run.
  const bandRe = new RegExp(`^${paper.id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\.b[A-Za-z0-9]+\\.json$`);
  const files = readdirSync(DATA).filter((f) => bandRe.test(f)).sort();
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
    const got = checkBand(band, chapters);
    findings.push(...got);
    const errs = got.filter((x) => x.level === "ERROR").length;
    const warns = got.length - errs;
    console.log(`  ${f.padEnd(24)} ${String(band.questions?.length ?? 0).padStart(3)} q   ${errs} error(s), ${warns} warning(s)`);
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

if (require.main === module) main();
