/**
 * Emit a blind derivation packet — Phase 3, step 1.
 *
 *   npx tsx scripts/ipmat/dump-derive.ts -- --name=va-sample --section=VA --size=60
 *   npx tsx scripts/ipmat/dump-derive.ts -- --name=qa-all --section=QA
 *   npx tsx scripts/ipmat/dump-derive.ts -- --name=lr --subject="Logical Reasoning" --size=40
 *   npx tsx scripts/ipmat/dump-derive.ts -- --name=s1 --exam=jipmat --size=40 --seed=7
 *
 * Writes `data/derive/<name>.packet.json` — stem, context and option TEXT, and
 * no answer of any kind. The answer key stays in data/build and is never read
 * by this script beyond deciding which rows are committable.
 *
 * The packet records the git commit it was built from, because the score is
 * only reproducible against a frozen corpus.
 */
import { execSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { buildPacket, isDerivable, stratifiedSample, strataOf } from "./derive";
import { resolveTaxonomy } from "./taxonomy";
import type { BuiltQuestion } from "./build";

const BUILD_DIR = join(__dirname, "data", "build");
const DERIVE_DIR = join(__dirname, "data", "derive");

function arg(name: string): string | undefined {
  return process.argv.slice(2).find((a) => a.startsWith(`--${name}=`))?.split("=").slice(1).join("=");
}

function headCommit(): string | null {
  try {
    return execSync("git rev-parse --short HEAD", { encoding: "utf8" }).trim();
  } catch {
    return null;
  }
}

function main() {
  const name = arg("name");
  if (!name || !/^[a-z0-9-]+$/.test(name)) {
    console.error("need --name=<kebab-case>");
    process.exit(1);
  }
  const section = arg("section");
  // Sampling by SUBJECT matters as much as by section: reasoning questions live
  // under the Logical Reasoning subject across ALL THREE exams, and 50 of them
  // sit inside Indore's quant SECTIONS. A `--section=LR` sample would miss those
  // and measure only two of the three exams.
  const subject = arg("subject");
  const exam = arg("exam");
  const size = arg("size") ? Number(arg("size")) : undefined;
  const seed = arg("seed") ? Number(arg("seed")) : 1;

  if (!existsSync(BUILD_DIR)) {
    console.error(`no built corpus at ${BUILD_DIR}\nrun: npx tsx scripts/ipmat/build.ts`);
    process.exit(1);
  }

  const built: BuiltQuestion[] = [];
  for (const f of readdirSync(BUILD_DIR).filter((x) => x.endsWith(".json"))) {
    built.push(...(JSON.parse(readFileSync(join(BUILD_DIR, f), "utf8")) as BuiltQuestion[]));
  }

  let pool = built.filter(isDerivable);
  if (exam) pool = pool.filter((r) => r.exam === exam);
  if (section) pool = pool.filter((r) => r.section === section);
  if (subject) {
    pool = pool.filter(
      (r) => resolveTaxonomy(r.sourceTopic, r.sourceSubTopic)?.subject === subject
    );
  }
  if (pool.length === 0) {
    console.error("no derivable rows matched those filters");
    process.exit(1);
  }

  let chosen = pool;
  if (size !== undefined) {
    if (!Number.isFinite(size) || size < 1) {
      console.error(`--size must be a positive number, got ${JSON.stringify(arg("size"))}`);
      process.exit(1);
    }
    // Sample on the ids, then map back — the sampler must not see answers either.
    const keyed = pool.map((r) => ({ id: r.sourceId, strata: strataOf(r) }));
    const picked = new Set(stratifiedSample(keyed, size, seed).map((x) => x.id));
    chosen = pool.filter((r) => picked.has(r.sourceId));
  }

  const packet = buildPacket(chosen, { commit: headCommit() });

  mkdirSync(DERIVE_DIR, { recursive: true });
  const dest = join(DERIVE_DIR, `${name}.packet.json`);
  writeFileSync(dest, JSON.stringify(packet, null, 1) + "\n", "utf8");

  // ---- report
  const bySection = new Map<string, number>();
  const byStrata = new Set<string>();
  for (const r of packet.rows) {
    bySection.set(r.section, (bySection.get(r.section) ?? 0) + 1);
    if (r.strata) byStrata.add(r.strata);
  }
  console.log(`wrote ${dest}`);
  console.log(`  rows        ${packet.rows.length} of ${pool.length} derivable`);
  console.log(`  commit      ${packet.commit ?? "(unknown)"}`);
  console.log(`  by section  ${JSON.stringify(Object.fromEntries(bySection))}`);
  console.log(`  strata      ${byStrata.size}`);
  console.log(`  mcq/numeric ${packet.rows.filter((r) => r.format === "mcq").length}/${packet.rows.filter((r) => r.format === "numeric").length}`);
  console.log("");
  console.log("Derive each row from the packet ALONE, then write your answers to");
  console.log(`  ${join(DERIVE_DIR, `${name}.answers.json`)}`);
  console.log('as {"<id>": "C", "<id>": "42", ...} and score with:');
  console.log(`  npx tsx scripts/ipmat/score-derive.ts -- --name=${name}`);
}

main();
