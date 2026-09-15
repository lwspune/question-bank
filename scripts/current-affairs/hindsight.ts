/**
 * After a sitting: how much of the authored pool the real paper actually touched.
 *
 *   npx tsx scripts/current-affairs/hindsight.ts nda-2-2026
 *   npx tsx scripts/current-affairs/hindsight.ts nda-2-2026 --min=0.05
 *
 * Read-only. Writes a full report to `generated-papers/` and appends one row to
 * the committed ledger at `scripts/current-affairs/HINDSIGHT.md`, so the hit
 * rate accumulates across sittings instead of being re-derived by hand each time
 * (which is how this one was first measured).
 *
 * ## The matcher is a READING LIST, not a verdict
 *
 * `topicSimilarity` scores subject tokens with the question scaffold stripped,
 * because "Consider the following statements ... is/are correct" is shared by a
 * large slice of the corpus and would otherwise dominate. Even so, a high score
 * means "read these two side by side" — whether the pool question would have
 * HELPED a student answer the paper question is a judgement only a reader can
 * make. The Sep-2026 run scored zero real hits and that WAS the finding; do not
 * lower the threshold to make a future report look better.
 */
import { appendFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { rankMatches } from "@/lib/currentAffairs/overlap";
import { classifyGenre, newestEventDate, eventLag } from "@/lib/currentAffairs/window";
import { admin, loadBySourceFile } from "./db";
import { requireSitting } from "./config";

/** Below this, the shared tokens are noise rather than a shared subject. */
const DEFAULT_MIN = 0.08;

const LEDGER = join(process.cwd(), "scripts", "current-affairs", "HINDSIGHT.md");

function flagNumber(name: string, fallback: number): number {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  if (!hit) return fallback;
  const v = Number(hit.split("=")[1]);
  return Number.isFinite(v) ? v : fallback;
}

function oneLine(s: string, max = 120): string {
  const flat = s.replace(/\s+/g, " ").trim();
  return flat.length > max ? `${flat.slice(0, max - 1)}...` : flat;
}

async function main() {
  const sitting = requireSitting(process.argv[2]);
  const minScore = flagNumber("min", DEFAULT_MIN);

  if (!sitting.paperSourceFile) {
    console.log(`${sitting.label} has no paper ingested yet — nothing to look back at.`);
    return;
  }
  if (!sitting.poolSourceFile) {
    console.log(
      `${sitting.label} had no authored pool, so there is no hit rate to measure. ` +
        `(That is a fact about the sitting, not a failure of this script.)`
    );
    return;
  }

  const db = admin();
  const [pool, paper] = await Promise.all([
    loadBySourceFile(db, sitting.poolSourceFile),
    loadBySourceFile(db, sitting.paperSourceFile),
  ]);

  if (paper.length === 0) {
    console.log(
      `No Current-Affairs rows carry source_file = ${JSON.stringify(sitting.paperSourceFile)}. ` +
        `Check the spelling against the bank.`
    );
    return;
  }

  const candidates = pool.map((r) => ({ id: r.id, text: `${r.text} ${r.solution ?? ""}` }));
  const byId = new Map(pool.map((r) => [r.id, r]));

  const rows = paper.map((q) => {
    const matches = rankMatches(`${q.text} ${q.solution ?? ""}`, candidates, 3).filter(
      (m) => m.score >= minScore
    );
    const event = newestEventDate(`${q.text} ${q.solution ?? ""}`);
    return {
      q,
      matches,
      genre: classifyGenre(`${q.text} ${q.solution ?? ""}`),
      lag: event ? eventLag(event, sitting.examMonth) : null,
    };
  });

  const hits = rows.filter((r) => r.matches.length > 0);

  const L: string[] = [];
  L.push(`# Hindsight — ${sitting.label}`);
  L.push("");
  L.push(`- pool: \`${sitting.poolSourceFile}\` — ${pool.length} questions`);
  L.push(`- paper: \`${sitting.paperSourceFile}\` — ${paper.length} Current-Affairs questions`);
  L.push(`- candidates scoring at or above ${minScore}: **${hits.length} of ${paper.length}**`);
  L.push("");
  L.push(
    `A score is a READING LIST, never a verdict. Read each pair below and decide whether the ` +
      `pool question would actually have helped; the number only says the two share subject words.`
  );
  L.push("");

  for (const r of rows) {
    L.push(`## Q${r.q.id.slice(0, 8)} — ${r.genre}${r.lag ? ` · ${r.lag.minMonths === r.lag.maxMonths ? `${r.lag.minMonths}m` : `${r.lag.minMonths}-${r.lag.maxMonths}m`} before the exam` : ""}`);
    L.push("");
    L.push(`> ${oneLine(r.q.text, 260)}`);
    L.push("");
    if (r.matches.length === 0) {
      L.push(`**No pool candidate.** Nothing in the pool shares this question's subject.`);
    } else {
      for (const m of r.matches) {
        const src = byId.get(m.id);
        L.push(
          `- **${m.score.toFixed(3)}** (${m.sharedTokens.join(", ")}) — ` +
            `${oneLine(src?.text ?? m.text)}`
        );
      }
    }
    L.push("");
  }

  const outDir = join(process.cwd(), "generated-papers");
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, `ca-hindsight-${sitting.slug}.md`);
  writeFileSync(outPath, `${L.join("\n")}\n`, "utf8");

  // The committed ledger: one row per sitting, so the hit rate accumulates.
  if (!existsSync(LEDGER)) {
    writeFileSync(
      LEDGER,
      [
        "# Current-Affairs pool — hindsight ledger",
        "",
        "One row per sitting, appended by `scripts/current-affairs/hindsight.ts`.",
        "",
        "**CANDIDATES IS NOT HITS.** A candidate is a pool question that shares subject tokens",
        "with a paper question — a reading list. Whether it would actually have helped a student",
        "is a judgement, so the script writes `—` in ADJUDICATED and a human fills it in after",
        "reading `generated-papers/ca-hindsight-<slug>.md`. A row still showing `—` has been",
        "measured but not read, and its rate means nothing yet.",
        "",
        "| Sitting | Pool | Paper CA q | Candidates | Cand. rate | Adjudicated hits | Measured |",
        "|---|---:|---:|---:|---:|---|---|",
        "",
      ].join("\n"),
      "utf8"
    );
  }
  const rate = paper.length ? `${((hits.length / paper.length) * 100).toFixed(0)}%` : "-";
  appendFileSync(
    LEDGER,
    `| ${sitting.label} | ${pool.length} | ${paper.length} | ${hits.length} | ${rate} | ` +
      `— | ${new Date().toISOString().slice(0, 10)} |\n`,
    "utf8"
  );

  console.log(`\nHINDSIGHT — ${sitting.label}`);
  console.log(`  pool       ${sitting.poolSourceFile} (${pool.length} q)`);
  console.log(`  paper      ${sitting.paperSourceFile} (${paper.length} CA q)`);
  console.log(`  candidates ${hits.length} of ${paper.length} at score >= ${minScore}`);
  for (const r of rows) {
    const top = r.matches[0];
    console.log(
      `  ${top ? top.score.toFixed(3) : "  -  "}  ${oneLine(r.q.text, 78)}`
    );
  }
  console.log(`\n  report  ${outPath}`);
  console.log(`  ledger  ${LEDGER}`);
  console.log(`\n  A score is a reading list. Open the report before believing the rate.\n`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
