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
    mcqOptionsLost: { recovered: Recovered[] };
    optionsMistranscribed: { fixes: OptionFix[] };
  };
  const log: string[] = [];

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
      log.push(`${rec.ref}: ${d.options.length} options recovered from the printed paper`);
    }
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
const ITEM = /^(\d+)\.\s+/;
const OPT = /\\?\(([a-d])\\?\)\s*/g;

/** Split a block into its stem and, if present, four options. */
export function splitOptions(block: string): { stem: string; options?: { label: string; text: string }[] } {
  const marks: { label: string; at: number; len: number }[] = [];
  for (const m of block.matchAll(OPT)) {
    marks.push({ label: m[1].toUpperCase(), at: m.index!, len: m[0].length });
  }
  // Require a full A-D run; a lone "(a)" is prose, not an option list.
  const labels = marks.map((x) => x.label);
  const start = labels.indexOf("A");
  if (start < 0 || labels.slice(start, start + 4).join("") !== "ABCD") {
    return { stem: block };
  }
  const run = marks.slice(start, start + 4);
  const stem = block.slice(0, run[0].at);
  const options = run.map((mk, i) => {
    const from = mk.at + mk.len;
    const to = i + 1 < run.length ? run[i + 1].at : block.length;
    return { label: mk.label, text: clean(block.slice(from, to)) };
  });
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

  const md = spawnSync("pandoc", ["-f", "docx", "-t", "markdown", "--wrap=none", ch.docx], {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  if (md.status !== 0) throw new Error(`pandoc failed: ${md.stderr}`);

  const lines = md.stdout.split("\n");
  const starts = lines.flatMap((l, i) => (ITEM.test(l) ? [i] : []));
  const drafts: Draft[] = [];
  const problems: string[] = [];

  starts.forEach((from, k) => {
    const to = k + 1 < starts.length ? starts[k + 1] : lines.length;
    const raw = lines.slice(from, to).join("\n");
    const num = ITEM.exec(lines[from])![1];

    const prov: Provenance | null = parseProvenanceTag(raw);
    if (!prov) {
      problems.push(`item ${num}: NO PROVENANCE TAG`);
      return;
    }
    // Drop the tag itself, then lift the image, then normalise, then split.
    const body = raw.replace(ITEM, "").replace(/\[\s*Q\.[^\]]*\\?\]/, "");
    const { text, image } = splitImage(body);
    const { stem, options } = splitOptions(normaliseMath(text));

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

main();
