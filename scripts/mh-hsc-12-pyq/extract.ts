/**
 * Extract one chapter of the MH HSC Class-12 board-PYQ compilation to a draft
 * JSON, via pandoc.
 *
 *   npx tsx scripts/mh-hsc-12-pyq/extract.ts <chapterId>
 *
 * Writes out/<id>.draft.json — stems + options + provenance, with `subtopic`
 * left EMPTY. Assigning a subtopic is a per-question judgement against the
 * chapter's existing DB axis and is a separate reviewed step; emitting a
 * plausible guess here would be indistinguishable from a checked one.
 *
 * This is TEXT extraction, not vision: the source is born-digital .docx and
 * pandoc reproduces its math faithfully. That is the opposite of the sibling
 * TEXTBOOK pipeline (scripts/stateboard/), whose PDFs have a lossy text layer.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join } from "node:path";
import { OUT, DATA, requireChapter } from "./config";
import {
  parseProvenanceTag,
  normaliseMath,
  stripArtifacts,
  splitImage,
  stripBlockquote,
  stripLeakedOptionRun,
  type Provenance,
} from "./lib";

export type Draft = {
  ref: string;
  questionNumber: string;
  pyqYear: number;
  pyqMonth: string | null;
  format: "mcq" | "subjective";
  subtopic: "";
  stem: string;
  options?: { label: string; text: string }[];
  /** Filename inside the docx's word/media/, extracted by `npm run` step 2. */
  image?: string;
  /** Set when this is a KNOWN multiple-choice question whose option list the
   *  compilation lost. It currently reads as free-response, which is a silent
   *  downgrade — commit refuses such a row rather than shipping the wrong format. */
  pendingMcq?: string;
  /** The chapter this question actually belongs to, when the compilation filed
   *  it under another. Both known cases were CAUSED by a transcription defect:
   *  a stem that acquired an integral sign from its neighbour acquired that
   *  neighbour's chapter too. See defects.json -> chapterRelocations. */
  chapterOverride?: string;
};

/** A repair from data/defects.json, applied by ref. */
type Recovered = {
  ref: string;
  options?: Record<string, string>;
  stemFix?: { from: string; to: string; why: string };
};

/** A per-option correction for a question that HAS four options, one of them wrong. */
type OptionFix = {
  ref: string;
  options: Record<string, { from: string; to: string }>;
  why: string;
};

/**
 * Apply the adjudicated repairs for this chapter.
 *
 * Every repair REFUSES rather than force-applies: a stemFix whose `from` is not
 * the stem we actually extracted means the extraction changed under the
 * adjudication, and silently rewriting on a near-miss is how a repair lands on
 * the wrong question (the JEE `apply-stem-fixes` lesson).
 */
function applyRepairs(drafts: Draft[], chapterId: string): string[] {
  const defects = JSON.parse(readFileSync(join(DATA, "defects.json"), "utf8")) as {
    mcqOptionsLost: { recovered: Recovered[]; needVisionPass: { ref: string; tag: string }[] };
    optionsMistranscribed: { fixes: OptionFix[] };
    stemsMistranscribed: { fixes: { ref: string; from: string; to: string; consequence: string }[] };
    chapterRelocations: { moves: { ref: string; toChapter: string; why: string }[] };
  };
  const log: string[] = [];

  // A question whose option list was lost has no full (a)-(d) run, so splitOptions
  // reads it as free-response and it would ship as a SUBJECTIVE question — a
  // silent downgrade, invisible in every count. These are known MCQs awaiting a
  // vision pass, so name them loudly instead.
  for (const pending of defects.mcqOptionsLost.needVisionPass) {
    if (!pending.ref.startsWith(`${chapterId}#`)) continue;
    const d = drafts.find((x) => x.ref === pending.ref);
    if (!d) throw new Error(`defects.json names ${pending.ref}, which this extraction did not produce`);
    if (d.format === "mcq") {
      log.push(`${pending.ref}: NOW HAS OPTIONS — its needVisionPass entry is stale, remove it`);
      continue;
    }
    d.pendingMcq = pending.tag;
    log.push(`${pending.ref}: KNOWN MCQ with options still lost ${pending.tag} — needs a vision pass`);
  }

  for (const rec of defects.mcqOptionsLost.recovered) {
    if (!rec.ref.startsWith(`${chapterId}#`)) continue;
    const d = drafts.find((x) => x.ref === rec.ref);
    if (!d) throw new Error(`defects.json names ${rec.ref}, which this extraction did not produce`);

    if (rec.stemFix) {
      // EXACT, not fuzzy. defects.json carries the stem in its post-normalise
      // form precisely so this can be an equality — a tolerant comparison is
      // what lets a repair land on a question it was not adjudicated for.
      const want = rec.stemFix.from;
      if (d.stem !== want) {
        throw new Error(
          `${rec.ref}: stemFix.from does not match the extracted stem — REFUSING.\n` +
            `  adjudicated: ${want}\n  extracted:   ${d.stem}`,
        );
      }
      d.stem = rec.stemFix.to;
      log.push(`${rec.ref}: stem repaired (${rec.stemFix.why.slice(0, 60)}…)`);
    }

    if (rec.options) {
      if (d.options) throw new Error(`${rec.ref}: already has options — the defect is stale`);
      d.options = Object.entries(rec.options).map(([label, text]) => ({
        label: label.toUpperCase(),
        text: stripArtifacts(normaliseMath(text)),
      }));
      d.format = "mcq";
      // The options are no longer lost, so the pending marker must go. It is set
      // by the corrupted-label guard in splitOptions, and `buildRecords` REFUSES
      // to ship a pendingMcq row ("known MCQ … whose options are still lost") —
      // so leaving it set blocks the commit of the very row this just repaired.
      // thermodynamics#2 hit exactly that. The refusal still stands for the case
      // it exists for: a known MCQ nobody has recovered yet.
      delete d.pendingMcq;
      // Such a question is here BECAUSE its printed option block failed to parse
      // — one carries the labels (a)(b)(b)(c), a duplicated "b" and no "d" — so
      // the unparsed run is still glued to the stem and would render in full on
      // the card next to the real options.
      const cut = stripLeakedOptionRun(d.stem);
      if (cut !== d.stem) {
        d.stem = cut;
        log.push(`${rec.ref}: leaked option run cut from the stem`);
      }
      log.push(`${rec.ref}: ${d.options.length} options recovered from the printed paper`);
    }
  }

  // A stem the compilation copied wrong, where the question still READS as a
  // well-formed question. Nothing structural catches this class — options
  // intact, LaTeX balanced, arithmetic self-consistent — so each was found by
  // someone solving the question and getting an ugly or degenerate answer, then
  // settled against the printed page.
  for (const fix of defects.stemsMistranscribed.fixes) {
    if (!fix.ref.startsWith(`${chapterId}#`)) continue;
    const d = drafts.find((x) => x.ref === fix.ref);
    if (!d) throw new Error(`defects.json names ${fix.ref}, which this extraction did not produce`);
    // A fix whose `to` equals its `from` is a SILENT NO-OP that passes every
    // other check here: the exact-match guard is satisfied, the assignment runs,
    // the log prints "stem corrected", and the stem does not change. It happened
    // — an authoring script built `to` with .replace() against a needle the
    // shell had mangled, so the replace matched nothing and returned the input.
    // The row then shipped the corrupted stem with a correct-looking audit trail.
    if (fix.from === fix.to) {
      throw new Error(
        `${fix.ref}: stemFix from === to, so it corrects NOTHING. Its own note says the ` +
          `intended result is "${fix.consequence}". Rebuild the \`to\` field.`,
      );
    }
    if (d.stem !== fix.from) {
      throw new Error(
        `${fix.ref}: stem does not match the adjudicated text — REFUSING.\n` +
          `  adjudicated: ${fix.from}\n  extracted:   ${d.stem}`,
      );
    }
    d.stem = fix.to;
    log.push(`${fix.ref}: stem corrected against the printed paper (${fix.consequence})`);
  }

  for (const move of defects.chapterRelocations.moves) {
    if (!move.ref.startsWith(`${chapterId}#`)) continue;
    const d = drafts.find((x) => x.ref === move.ref);
    if (!d) throw new Error(`defects.json names ${move.ref}, which this extraction did not produce`);
    d.chapterOverride = move.toChapter;
    log.push(`${move.ref}: belongs to ${move.toChapter}, not this chapter`);
  }

  for (const fix of defects.optionsMistranscribed.fixes) {
    if (!fix.ref.startsWith(`${chapterId}#`)) continue;
    const d = drafts.find((x) => x.ref === fix.ref);
    if (!d?.options) throw new Error(`${fix.ref}: an option fix but no options — the defect is stale`);
    for (const [label, { from, to }] of Object.entries(fix.options)) {
      const opt = d.options.find((o) => o.label === label);
      // EXACT, and it must be the mis-transcribed text we adjudicated against.
      // If the extractor's output has moved, the fix was reasoned about a string
      // that no longer exists and applying it would be a guess.
      if (!opt || opt.text !== from) {
        throw new Error(
          `${fix.ref} option ${label}: does not match the adjudicated text — REFUSING.\n` +
            `  adjudicated: ${from}\n  extracted:   ${opt?.text ?? "(no such option)"}`,
        );
      }
      opt.text = to;
    }
    log.push(
      `${fix.ref}: options ${Object.keys(fix.options).join("+")} corrected against the printed paper`,
    );
  }
  return log;
}

/** A numbered item starts a question; pandoc emits "12. " at column 0. */
/**
 * A question start. Maths is a Word LIST, so pandoc emits "1.  "; the Physics
 * Semiconductor Devices chapter is plain paragraphs, so pandoc ESCAPES the dot
 * and emits "1\.  ". Accepting only the first form yields ZERO items for that
 * chapter — no error, just an empty extraction.
 */
export const ITEM = /^(\d+)\\?\.\s+/;
/**
 * An option label. Maths prints "(a)-(d)", Physics prints "(A)-(D)", and pandoc
 * escapes the parens wherever the run is not inside a list. Measured across the
 * Physics compilation, the lowercase-only rule found 8 marks corpus-wide
 * against 369 for this one — so every one of its ~89 MCQs would have shipped as
 * a free-response row with the option block still glued to the stem, which no
 * downstream gate catches (a subjective row is allowed to have no options).
 */
const OPT = /\\?\(([a-dA-D])\\?\)\s*/g;

export type TagFix = { ref: string; from: string; to: string; why: string };

/**
 * Repair a malformed provenance tag BEFORE it is parsed.
 *
 * Every other repair in this pipeline is keyed on a ref and applied to a draft
 * row. A broken tag cannot be, because parseProvenanceTag failing makes the
 * extractor DROP the item — so the row, and therefore the ref, never exists.
 * The problem is logged rather than silent, but the question is still absent
 * from the corpus until this runs.
 *
 * EXACT match, exactly once, or it throws. A fuzzy match is what lets a repair
 * land on a question it was never adjudicated for, and a silent no-op leaves a
 * fix that LOOKS applied — so a stale entry is an error, not a shrug.
 */
export function applyTagOverride(raw: string, ref: string, fixes: TagFix[]): string {
  const fix = fixes.find((f) => f.ref === ref);
  if (!fix) return raw;
  const hits = raw.split(fix.from).length - 1;
  if (hits !== 1) {
    throw new Error(
      `tag override for ${ref} is stale: expected exactly 1 occurrence of ${JSON.stringify(fix.from)}, found ${hits}. ` +
        `Either the source was corrected upstream or the item renumbered — re-adjudicate, do not loosen the match.`,
    );
  }
  return raw.replace(fix.from, fix.to);
}

/** A WHOLE-DOCUMENT repair, applied to pandoc's output before items are split. */
export type DocFix = { chapter: string; from: string; to: string; why: string };

/**
 * Repair the raw markdown BEFORE the item scan.
 *
 * `applyTagOverride` cannot reach this class: it runs per ITEM, and the whole
 * problem here is that no item was ever recognised. Semiconductors item 15
 * vanished from the bank because the compilation typed the numeral inside an
 * OMML equation, so pandoc emitted the line as `$15.\ Y = A + B$ is the …` —
 * a line starting with `$`, which ITEM cannot anchor on. Its question was
 * absorbed into item 14's stem and two board questions shipped as one row.
 *
 * NOTHING downstream can see that: the merged row is a well-formed MCQ with four
 * intact options, so the only trace is a GAP in the item numbering. That gap is
 * now the standing detector — the numbering should be contiguous once the
 * ledger's deliberate drops are accounted for.
 *
 * REFUSES on a stale or ambiguous match rather than silently doing nothing: a
 * no-op here would leave the question lost again with no signal, which is the
 * exact failure being repaired.
 */
export function applyDocumentRepairs(md: string, chapterId: string, fixes: DocFix[]): string {
  let out = md;
  for (const fix of fixes.filter((f) => f.chapter === chapterId)) {
    const hits = out.split(fix.from).length - 1;
    if (hits !== 1) {
      throw new Error(
        `document repair for ${chapterId} is stale or ambiguous: expected exactly 1 occurrence ` +
          `of ${JSON.stringify(fix.from)}, found ${hits}. Either the source was corrected ` +
          `upstream or the item renumbered — re-adjudicate against the printed page, do not ` +
          `loosen the match.`,
      );
    }
    out = out.replace(fix.from, fix.to);
  }
  return out;
}

const mathBalance = (s: string) => s.split("\\(").length - s.split("\\)").length;

/**
 * Repair math delimiters broken by cutting an option run out of a block.
 *
 * The compilation sometimes typesets the option LABEL inside the math zone —
 * `$(A)\ vt$ (B) $...$` — so the cut at "(A)" lands INSIDE the zone and leaves
 * the stem holding a dangling `\(` while option A holds an orphan `\)`. An
 * unbalanced delimiter is a KaTeX parse error that takes the whole card down,
 * and it is invisible to every later gate: the row is a well-formed MCQ with
 * four options. 18 of the 89 Physics MCQs are shaped this way.
 *
 * Only a CLEAN cut is repaired: an unmatched `\(` must be the last thing in its
 * fragment, in which case it belongs to the fragment that follows and is moved
 * there. Anything else is a genuinely malformed source and THROWS — a zone that
 * never closes must not be silently turned into something that merely parses.
 */
/** Brace balance, ignoring LaTeX's escaped literal braces. */
const braceBalance = (s: string) => {
  const bare = s.replace(/\\[{}]/g, "");
  return bare.split("{").length - bare.split("}").length;
};

/** Offset of the `\(` that this fragment leaves open, or -1. */
function lastUnmatchedOpen(s: string): number {
  const stack: number[] = [];
  for (let i = 0; i < s.length - 1; i += 1) {
    if (s[i] !== "\\") continue;
    if (s[i + 1] === "(") stack.push(i);
    else if (s[i + 1] === ")") stack.pop();
  }
  return stack.length ? stack[stack.length - 1] : -1;
}

/** A zone body carrying no content — whitespace and LaTeX thin spaces only. */
const isSpacingOnly = (s: string) => /^(?:\s|\\ |\\,|\\;|\\quad|\\qquad)*$/.test(s);

export function rebalanceAcrossCut(fragments: string[]): string[] {
  const out = [...fragments];
  for (let i = 0; i < out.length - 1; i += 1) {
    const open = mathBalance(out[i]);
    if (open <= 0) continue;
    if (open > 1) {
      throw new Error(
        `unbalanced math: fragment ${i} leaves ${open} zones open, which is not a shape this repairs — ` +
          `recover the options by hand via defects.json (${JSON.stringify(out[i].slice(-60))})`,
      );
    }
    const at = lastUnmatchedOpen(out[i]);
    const tail = out[i].slice(at + 2);
    // A zone holding only spacing is typesetting noise; closing it would leave
    // an empty \(\) on the card. Anything else is real content and must stay in
    // the fragment it was printed in — moving it would hand one option's text
    // to the next.
    out[i] = isSpacingOnly(tail) ? out[i].slice(0, at) : `${out[i]}\\)`;
    out[i + 1] = `\\(${out[i + 1]}`;
  }

  for (let i = 0; i < out.length; i += 1) {
    if (mathBalance(out[i]) !== 0) {
      throw new Error(
        `unbalanced math zone after rebalancing: fragment ${i} is ${mathBalance(out[i])} open ` +
          `(${JSON.stringify(out[i].slice(0, 80))})`,
      );
    }
    // A cut through a \text{...} group leaves valid delimiters and INVALID
    // LaTeX, which renders as a KaTeX error just the same. Refuse rather than
    // emit something that merely balances.
    if (braceBalance(out[i]) !== 0) {
      throw new Error(
        `unbalanced BRACES after rebalancing: fragment ${i} is ${braceBalance(out[i])} — the cut fell inside a ` +
          `group such as \\text{...}. Recover the options by hand via defects.json ` +
          `(${JSON.stringify(out[i].slice(0, 80))})`,
      );
    }
  }
  return out;
}

/**
 * Split a block into its stem and, if present, four options.
 *
 * `unsplittable` is set when a full A-D run IS present but the cut cannot be
 * made without emitting broken LaTeX. The row is returned unsplit and the
 * caller marks it as a known-pending MCQ — the same treatment a question whose
 * option list was lost already gets. It is deliberately NOT a throw: one
 * tangled question must not block the other twenty in its chapter, and a row
 * flagged pending is not a row that shipped as free-response by accident.
 */
export function splitOptions(block: string): {
  stem: string;
  options?: { label: string; text: string }[];
  unsplittable?: string;
} {
  const marks: { label: string; at: number; len: number; upper: boolean }[] = [];
  for (const m of block.matchAll(OPT)) {
    marks.push({
      label: m[1].toUpperCase(),
      at: m.index!,
      len: m[0].length,
      // The ORIGINAL case is what separates an option list from a sub-part list
      // in this source — see the corrupted-label guard below.
      upper: m[1] === m[1].toUpperCase(),
    });
  }
  // Require a full A-D run; a lone "(a)" is prose, not an option list. Anchor on
  // the first position whose next four labels are A,B,C,D rather than on the
  // first "A" anywhere: a matrix name or a surviving provenance fragment ahead
  // of the real run would otherwise make the whole block fail to split. Where a
  // block split under the old rule it still splits at the same place, since a
  // valid run beginning at the first "A" is necessarily the earliest valid run.
  const labels = marks.map((x) => x.label);
  const start = labels.findIndex((_, i) => labels.slice(i, i + 4).join("") === "ABCD");
  if (start < 0) {
    // No A-D run. Usually that is correct and the block really is prose — but it
    // is ALSO what a MISTYPED label looks like, and the two are indistinguishable
    // to every downstream gate: the row ships as free-response with its four
    // alternatives glued into the stem, and nothing fires, because a subjective
    // row is allowed to have no options. (thermodynamics-12-pyq#2 shipped that
    // way — the compilation typed the third label "(B)" for "(C)". promote.ts
    // then dropped the authoring pass's flag as stale, since probeRow cannot see
    // a defect whose whole effect is the ABSENCE of options.)
    //
    // The discriminator is CASE, and it was chosen by measuring rather than by
    // taste: across all 16 chapters exactly three subjective rows carry a run of
    // three or more labels, and TWO are sound questions whose "(a) (b) (c)" are
    // SUB-PART labels ("Define: (a) Inductive reactance (b) …"). This source
    // prints options uppercase and sub-parts lowercase, so requiring uppercase
    // fires on the one real defect and neither false positive. Fewer than three
    // is not a run at all — a lone "(A)" is a matrix name or stray prose.
    const upper = marks.filter((m) => m.upper);
    if (upper.length >= 3) {
      return {
        stem: block,
        unsplittable:
          `option labels do not form an A-D run — found ${upper.map((m) => m.label).join(", ")}. ` +
          `Settle against the printed page and repair via defects.json.`,
      };
    }
    return { stem: block };
  }
  const run = marks.slice(start, start + 4);
  const raw = [
    block.slice(0, run[0].at),
    ...run.map((mk, i) => {
      const from = mk.at + mk.len;
      const to = i + 1 < run.length ? run[i + 1].at : block.length;
      return block.slice(from, to);
    }),
  ];
  // Rebalance BEFORE cleaning: clean() trims, and the open zone has to still be
  // at the end of its fragment for the repair to be provably a clean cut.
  let parts: string[];
  try {
    parts = rebalanceAcrossCut(raw);
  } catch (e) {
    return { stem: block, unsplittable: (e as Error).message };
  }
  const [stem, ...opts] = parts;
  const options = run.map((mk, i) => ({ label: mk.label, text: clean(opts[i]) }));
  // The stem is returned UNCLEANED, exactly as before — main() normalises and
  // trims it downstream, and cleaning here would change the Maths output.
  return { stem, options };
}

function clean(s: string): string {
  return stripArtifacts(normaliseMath(s.replace(/^[>\s]+|[>\s]+$/g, "")));
}

function main() {
  const id = process.argv[2];
  const ch = requireChapter(id);
  if (ch.blockedOnTextbookChapter) {
    throw new Error(
      `${id} is blocked: its DB chapter does not exist yet. Run the textbook ingest for ` +
        `${ch.blockedOnTextbookChapter} first, then fill subtopics[] and drop the flag.`,
    );
  }

  // Force PIPE tables. pandoc's default markdown emits "simple tables" — a
  // dashed grid — which the project cannot parse and which ships as an
  // unreadable run of hyphens. Five probability-distribution tables were doing
  // exactly that. GFM pipe tables are what parseTableBlocks reads.
  const TARGET = "markdown-simple_tables-multiline_tables-grid_tables";
  const md = spawnSync("pandoc", ["-f", "docx", "-t", TARGET, "--wrap=none", ch.docx], {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  if (md.status !== 0) throw new Error(`pandoc failed: ${md.stderr}`);

  const defectsFile = JSON.parse(readFileSync(join(DATA, "defects.json"), "utf8")) as {
    tagsMalformed?: { fixes?: TagFix[] };
    itemNumberSwallowed?: { fixes?: DocFix[] };
  };
  const tagFixes = defectsFile.tagsMalformed?.fixes ?? [];

  // BEFORE the item scan — an item number swallowed into a math zone means no
  // item is recognised at all, so there is no row for a ref-keyed repair to
  // reach. See applyDocumentRepairs.
  const repaired = applyDocumentRepairs(md.stdout, ch.id, defectsFile.itemNumberSwallowed?.fixes ?? []);

  const lines = repaired.split("\n");
  const starts = lines.flatMap((l, i) => (ITEM.test(l) ? [i] : []));
  const drafts: Draft[] = [];
  const problems: string[] = [];

  starts.forEach((from, k) => {
    const to = k + 1 < starts.length ? starts[k + 1] : lines.length;
    const num = ITEM.exec(lines[from])![1];
    // Before parsing, not after: a tag that fails to parse drops the whole item,
    // so there is no row left for a ref-keyed repair to reach.
    const raw = applyTagOverride(lines.slice(from, to).join("\n"), `${ch.id}#${num}`, tagFixes);

    const prov: Provenance | null = parseProvenanceTag(raw);
    if (!prov) {
      problems.push(`item ${num}: NO PROVENANCE TAG`);
      return;
    }
    // Blockquote markers FIRST, while the block still has its line breaks — a
    // "> " is only identifiable at a line start, and once normaliseMath joins
    // the lines it is indistinguishable from a genuine `x > 3`.
    // Then drop the tag, lift the image, normalise, and split.
    // The tag's LEADING backslash is deliberately left in place. It looks like
    // an oversight and is load-bearing: where the compilation drops the printed
    // fill-in blank and leaves a bare ":" after the tag, that leftover backslash
    // is what forms the "\:" token stripArtifacts keys on to restore "______."
    // Consuming it here silently turned 8 Maths stems into "...is :".
    const body = stripBlockquote(raw).replace(ITEM, "").replace(/\[\s*Q\.[^\]]*\\?\]/, "");
    const { text, image } = splitImage(body);
    const { stem, options, unsplittable } = splitOptions(normaliseMath(text));
    // Two different reasons a row that IS an MCQ came back unsplit, and the
    // message has to say which — they need different repairs. Either way the row
    // is marked pending, and `buildRecords` REFUSES to ship a pending row as
    // free-response, so neither can become a silent format downgrade.
    const labelDefect = unsplittable?.includes("A-D run") ?? false;
    if (unsplittable) {
      problems.push(
        `item ${num}: ${labelDefect ? "MCQ OPTION LABELS CORRUPTED" : "MCQ OPTIONS TANGLED IN A MATH ZONE"} — ${unsplittable}`,
      );
    }

    drafts.push({
      // The FULL chapter id, so a ref here is the same string data/defects.json
      // and data/cross-chapter-duplicates.json already use.
      ref: `${ch.id}#${num}`,
      questionNumber: prov.questionNumber,
      pyqYear: prov.year,
      pyqMonth: prov.month,
      format: options ? "mcq" : "subjective",
      subtopic: "",
      stem: clean(stem),
      ...(options ? { options } : {}),
      ...(unsplittable
        ? { pendingMcq: labelDefect ? "with corrupted option labels" : "options tangled in a math zone" }
        : {}),
      ...(image ? { image } : {}),
    });
  });

  const repairs = applyRepairs(drafts, ch.id);

  mkdirSync(OUT, { recursive: true });
  const out = join(OUT, `${id}.draft.json`);
  writeFileSync(out, JSON.stringify(drafts, null, 2) + "\n");

  const mcq = drafts.filter((d) => d.format === "mcq").length;
  const imgs = drafts.filter((d) => d.image).length;
  console.log(`${ch.chapterName}: ${drafts.length} items (${mcq} mcq, ${drafts.length - mcq} subjective, ${imgs} with a figure)`);
  if (repairs.length) {
    console.log(`\n${repairs.length} repair(s) applied from data/defects.json:`);
    for (const r of repairs) console.log(`  ${r}`);
  }
  console.log(`sittings: ${[...new Set(drafts.map((d) => `${d.pyqMonth ?? "?"} ${d.pyqYear}`))].sort().join(" · ")}`);
  if (problems.length) {
    console.log(`\n${problems.length} problem(s):`);
    for (const p of problems) console.log(`  ${p}`);
  }
  console.log(`\n-> ${out}`);
  console.log("subtopic is EMPTY on every row by design — assign it in the reviewed step.");
}

// Guarded so the pure helpers above (ITEM, splitOptions) can be imported by a
// test without the CLI running and exiting on a missing chapter argument.
if (require.main === module) main();
