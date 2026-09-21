/**
 * Score a blind derivation against the source's key — Phase 3, step 2.
 *
 *   npx tsx scripts/ipmat/score-derive.ts -- --name=va-sample
 *   npx tsx scripts/ipmat/score-derive.ts -- --name=va-sample --pin
 *
 * Reads `data/derive/<name>.answers.json` and compares it with data/build.
 * `--pin` writes `<name>.score.json` so the number is frozen against the
 * commit the packet was built from.
 *
 * WHAT THIS NUMBER IS. Agreement with afterboards' own derivation, and only
 * that. It is NOT accuracy: on CDS General Knowledge the real score was 91.6%
 * where dual-blind agreement read 98-99%, because agreement bounds
 * disagreement risk and says nothing about correlated error. Every
 * disagreement is a LEAD — it implicates transcription, our pass, or theirs,
 * and which one needs a human to read the row.
 *
 * ADJUDICATING DESTROYS THE MEASUREMENT for that row, so pin the score before
 * fixing anything.
 */
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { scoreDerivation, isDerivable } from "./derive";
import type { BuiltQuestion } from "./build";

const BUILD_DIR = join(__dirname, "data", "build");
const DERIVE_DIR = join(__dirname, "data", "derive");

function arg(name: string): string | undefined {
  return process.argv.slice(2).find((a) => a.startsWith(`--${name}=`))?.split("=").slice(1).join("=");
}

function main() {
  const name = arg("name");
  if (!name) {
    console.error("need --name=<packet name>");
    process.exit(1);
  }
  const pin = process.argv.includes("--pin");

  const answersPath = join(DERIVE_DIR, `${name}.answers.json`);
  const packetPath = join(DERIVE_DIR, `${name}.packet.json`);
  if (!existsSync(answersPath)) {
    console.error(`no answers at ${answersPath}`);
    process.exit(1);
  }

  const answers = JSON.parse(readFileSync(answersPath, "utf8")) as Record<string, string>;
  const packet = existsSync(packetPath)
    ? (JSON.parse(readFileSync(packetPath, "utf8")) as { commit: string | null; rows: { id: string }[] })
    : null;

  const built: BuiltQuestion[] = [];
  for (const f of readdirSync(BUILD_DIR).filter((x) => x.endsWith(".json"))) {
    built.push(...(JSON.parse(readFileSync(join(BUILD_DIR, f), "utf8")) as BuiltQuestion[]));
  }

  // Score against the packet's rows only, so `unanswered` means "in this
  // packet and not derived" rather than "not in the whole corpus".
  const inPacket = packet ? new Set(packet.rows.map((r) => r.id)) : null;
  const scope = inPacket ? built.filter((r) => inPacket.has(r.sourceId)) : built;

  const res = scoreDerivation(scope, answers);

  console.log(`derivation: ${name}`);
  console.log(`  packet commit    ${packet?.commit ?? "(no packet on disk)"}`);
  console.log(`  packet rows      ${packet ? packet.rows.length : "(unknown)"}`);
  console.log(`  answers supplied ${Object.keys(answers).length}`);
  console.log("");
  console.log(`  scored           ${res.scored}`);
  console.log(`  agreed           ${res.agreed}`);
  console.log(
    `  AGREEMENT        ${res.agreementPct === null ? "n/a (nothing scored)" : res.agreementPct + "%"}   <-- agreement with the source, NOT accuracy`
  );
  console.log(`  unanswered       ${res.unanswered}`);
  if (res.invalid.length) console.log(`  unparseable      ${res.invalid.length} ${JSON.stringify(res.invalid.slice(0, 5))}`);
  if (res.unknownIds.length) console.log(`  unknown ids      ${res.unknownIds.length} ${JSON.stringify(res.unknownIds.slice(0, 5))}`);

  console.log("\n  by section (this is where the risk differs)");
  for (const [section, s] of Object.entries(res.bySection).sort()) {
    const pct = s.scored ? Math.round((s.agreed / s.scored) * 1000) / 10 : null;
    console.log(`    ${section.padEnd(5)} ${String(s.agreed).padStart(3)}/${String(s.scored).padEnd(3)}  ${pct === null ? "n/a" : pct + "%"}`);
  }

  console.log(`\n  LEADS (${res.disagreed.length}) — a disagreement is not a verdict on either side`);
  for (const d of res.disagreed) {
    console.log(
      `    ${d.exam} ${d.year} ${d.section} Q${String(d.questionNumber).padEnd(3)} ours=${d.ours.padEnd(4)} source=${d.source}`
    );
  }

  if (pin) {
    const dest = join(DERIVE_DIR, `${name}.score.json`);
    writeFileSync(
      dest,
      JSON.stringify(
        {
          name,
          scoredAt: new Date().toISOString(),
          packetCommit: packet?.commit ?? null,
          note:
            "AGREEMENT with afterboards' own derivation, not accuracy. Pinned BEFORE any " +
            "adjudication, because adjudicating a row destroys the measurement for it.",
          ...res,
        },
        null,
        1
      ) + "\n",
      "utf8"
    );
    console.log(`\npinned to ${dest}`);
  }
}

main();
