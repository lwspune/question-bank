/**
 * Verify a built GAT solution book AGAINST THE DATA, by reading the .docx back.
 *
 *   npx tsx scripts/nda-gat/verify-solution-book.ts 2026-2 [--file=<path>]
 *
 * The builder reporting "150 questions, 150 with a solution" proves only that it
 * thought so. This opens word/document.xml and checks what actually landed:
 *
 *  - every series has an answer-key grid AND a solutions section;
 *  - the key grid's letters, read back out of the table cells, agree with the
 *    committed map for that series, question by question — which is the claim
 *    the whole document exists to make;
 *  - each series' solutions restart at 1 and reach 150;
 *  - no OMML placeholder survived as literal text (the silent failure: Word
 *    renders "OMML_412" where a formula belongs);
 *  - math was actually emitted rather than every zone dropped.
 *
 * ## Its expectation comes from a DIFFERENT computation than the builder's
 *
 * `build-solution-book.ts` re-derives each sibling answer from `labels` plus the
 * base's derived answer, and only uses the map's `key` field as a cross-check.
 * This script does the reverse: it reads the map's `key` directly. So the two
 * agreeing is two independent routes through the data meeting at the printed
 * page, rather than one computation read twice.
 *
 * ## What it does NOT prove
 *
 * That the document LAYS OUT. Nothing here opens Word. It proves the file
 * builds, and proves what is in it; a human still has to look at it once.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import JSZip from "jszip";
import { DATA, QUESTIONS_PER_PAPER, dataPath, requirePaper } from "./config";
import { type Derivation } from "./lib";

function arg(name: string): string | undefined {
  return process.argv.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3);
}

/**
 * Text of every <w:t> in order — the document as a reader sees it.
 *
 * The `(?:\s[^>]*)?` is load-bearing and cost the sibling pipeline a debugging
 * round: `<w:t[^>]*>` ALSO matches `<w:tbl>`, `<w:tc>` and `<w:tr>`, because
 * `<w:t` is a prefix of every table tag. The lazy body then swallows each
 * table's whole preamble and every key-grid cell reads as one giant blob — so
 * the probe reports the key grids as EMPTY while the document is perfectly
 * correct. A probe that contradicts much stronger evidence beside it is usually
 * the thing that is wrong.
 */
function textRuns(xml: string): string[] {
  return [...xml.matchAll(/<w:t(?:\s[^>]*)?>([\s\S]*?)<\/w:t>/g)].map((m) =>
    m[1].replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
  );
}

async function main() {
  const paper = requirePaper(process.argv[2]);
  const file =
    arg("file") ??
    join(
      process.cwd(),
      "generated-papers",
      `NDA_${paper.id.replace(/-/g, "_")}_GAT_Solution_Key_All_Sets.docx`
    );

  const zip = await JSZip.loadAsync(readFileSync(file));
  const doc = zip.file("word/document.xml");
  if (!doc) throw new Error(`${file} has no word/document.xml — not a .docx?`);
  const xml = await doc.async("text");
  const runs = textRuns(xml);
  const problems: string[] = [];

  // --- Expected answers per series, straight from the committed data.
  const baseSeries = paper.base.series;
  const answers = JSON.parse(readFileSync(dataPath(paper.id, "answers"), "utf8")) as {
    derivations: Derivation[];
  };
  const expected = new Map<string, Map<number, string>>();
  expected.set(
    baseSeries,
    new Map(answers.derivations.map((d) => [d.number, (d.answer ?? "").toUpperCase()]))
  );
  // Siblings come from CONFIG, so a series whose map was never built fails here
  // rather than being silently omitted from the verification.
  for (const booklet of paper.variants) {
    const p = join(DATA, `${paper.id}-${booklet.series}.map.json`);
    const f = JSON.parse(readFileSync(p, "utf8")) as {
      key?: { number: number; answer: string }[];
    };
    if (!f.key?.length) {
      problems.push(`series ${booklet.series}: map has no derived key to verify against`);
      continue;
    }
    expected.set(
      booklet.series,
      new Map(f.key.map((k) => [k.number, (k.answer ?? "").toUpperCase()]))
    );
  }

  // --- The key grids. Cells alternate number, "(x)" — read them back in order.
  for (const [series, want] of expected) {
    const head = runs.indexOf(`Answer Key — Series ${series}`);
    if (head < 0) {
      problems.push(`series ${series}: no answer-key heading`);
      continue;
    }
    let end = runs.length;
    for (let i = head + 1; i < runs.length; i++) {
      if (/^(Answer Key|Solutions) — Series /.test(runs[i])) {
        end = i;
        break;
      }
    }
    const cells = runs.slice(head + 1, end);
    const got = new Map<number, string>();
    for (let i = 0; i + 1 < cells.length; i++) {
      const n = Number(cells[i]);
      const m = /^\(([a-d])\)$/.exec(cells[i + 1]);
      if (Number.isInteger(n) && n >= 1 && n <= QUESTIONS_PER_PAPER && m) {
        got.set(n, m[1].toUpperCase());
        i += 1;
      }
    }
    if (got.size !== QUESTIONS_PER_PAPER) {
      problems.push(
        `series ${series} key grid: read ${got.size} entries, expected ${QUESTIONS_PER_PAPER}`
      );
    }
    const wrong: number[] = [];
    for (const [n, a] of want) if (got.get(n) !== a) wrong.push(n);
    if (wrong.length) {
      problems.push(
        `series ${series} key grid disagrees with the data at ${wrong.length} question(s): ${wrong
          .slice(0, 12)
          .join(", ")}${wrong.length > 12 ? " ..." : ""}`
      );
    } else {
      console.log(
        `  Series ${series} key grid: ${got.size}/${QUESTIONS_PER_PAPER} entries, all agree with the data`
      );
    }
  }

  // --- The solution sections: present, and each restarting at 1.
  for (const series of expected.keys()) {
    const head = runs.indexOf(`Solutions — Series ${series}`);
    if (head < 0) {
      problems.push(`series ${series}: no solutions heading`);
      continue;
    }
    let end = runs.length;
    for (let i = head + 1; i < runs.length; i++) {
      if (/^(Answer Key|Solutions) — Series /.test(runs[i])) {
        end = i;
        break;
      }
    }
    const body = runs.slice(head + 1, end);
    const nums = body
      .map((t) => /^(\d+)\. $/.exec(t)?.[1])
      .filter((x): x is string => !!x)
      .map(Number);
    if (nums[0] !== 1) problems.push(`series ${series} solutions start at ${nums[0]}, not 1`);
    const seen = new Set(nums);
    const missing: number[] = [];
    for (let n = 1; n <= QUESTIONS_PER_PAPER; n++) if (!seen.has(n)) missing.push(n);
    if (missing.length) {
      problems.push(
        `series ${series} solutions missing question(s): ${missing.slice(0, 12).join(", ")}`
      );
    }
    const answered = body.filter((t) => /^\([a-d]\)$/.test(t)).length;
    if (answered !== QUESTIONS_PER_PAPER) {
      problems.push(
        `series ${series} solutions: ${answered} answer lines, expected ${QUESTIONS_PER_PAPER}`
      );
    }
    console.log(
      `  Series ${series} solutions: ${seen.size}/${QUESTIONS_PER_PAPER} numbered, ${answered} answer lines`
    );
  }

  // --- The silent failure: a placeholder that never became a formula.
  const leftover = xml.match(/OMML_\d+/g) ?? [];
  if (leftover.length) {
    problems.push(`${leftover.length} unconverted OMML placeholder(s) left in the document`);
  }
  const mathCount = (xml.match(/<m:oMath[ >]/g) ?? []).length;
  console.log(`  math zones converted: ${mathCount}, unconverted placeholders: ${leftover.length}`);

  if (problems.length) {
    console.log(`\nPROBLEMS (${problems.length}):`);
    for (const p of problems) console.log(`  ${p}`);
    process.exitCode = 1;
    return;
  }
  console.log("\nevery check passed");
  console.log(
    "NOT PROVEN: that the document lays out. Nothing here opens Word — open it once by hand."
  );
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
