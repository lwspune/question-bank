/**
 * Attach the board-paper figure crops to their questions.
 *
 *   npx tsx scripts/mh-hsc-12-pyq/paper/attach-figures.ts <paperId|--all>          # dry-run
 *   npx tsx scripts/mh-hsc-12-pyq/paper/attach-figures.ts <paperId|--all> --apply
 *
 * For a `reconcile` paper this REPLACES an image on a row that is already PUBLIC:
 * the bank's circuits came out of the compilation's word/media/ and are speckled,
 * skewed photocopies (512x276 and 437x210), while the printed papers give clean
 * typeset line art at 786x477 and 787x410.
 *
 * THREE PROPERTIES THIS RELIES ON, each because writing to shipped rows is not
 * the same as inserting new ones:
 *
 *  1. ONLY A HUMAN-VERIFIED CROP IS ATTACHED. The file must have an entry in
 *     data/figures/verified.json with verdict "clean". `crop-figures.ts` never
 *     writes that entry; geometry finding a figure is not the same as the crop
 *     being right, and on the NCERT Class-10 run 6 of 22 numerically-clean crops
 *     were visibly wrong.
 *
 *  2. IT NEVER OVERWRITES THE OLD OBJECT. The new crop goes to a new,
 *     provenance-bearing storage key (`paper-<paperId>-<ref>.png`), so the
 *     compilation's original stays where it is and the change is undone by
 *     pointing `image_url` back at it. An `upsert: true` onto the existing key
 *     would make this one-way.
 *
 *  3. IT REFUSES AN AMBIGUOUS MATCH. `question_number` is not unique in this
 *     corpus — the 2024 and 2025 circuits are BOTH "Q. 15" — and both 2024
 *     sittings (March and July) share a `pyq_year`. So a reconcile paper matches
 *     the COMPILATION's rows and a new paper matches its own `source_file`; more
 *     than one hit refuses, because a wrong figure is worse than no figure.
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { DATA, EXAM_ID, PAPERS, requirePaper, type Paper } from "./config";
import { normaliseRef } from "./lib";

const BUCKET = "question-images";
const PREFIX = "logic-12-pyq"; // every figure in this corpus is a Mathematical Logic circuit
const MAX_BYTES = 1_000_000; // Supabase object cap
const FIGURES = join(DATA, "figures");

type Verified = {
  figures: Record<string, { ref: string; page: number; px: string; verdict: string; note?: string }>;
};

type Plan = {
  paperId: string;
  ref: string;
  file: string;
  bytes: number;
  questionId: string;
  key: string;
  previous: string | null;
};

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

/** One factory, so the helper below can name the client's exact inferred type.
 *  `SupabaseClient` with default generics is NOT the same type createClient
 *  returns here, and typing the parameter with it collapses every row to
 *  `never` — which reads as "this column does not exist". */
function makeClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
}
type Db = ReturnType<typeof makeClient>;

const slug = (ref: string) => ref.replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "").toLowerCase();

async function planFor(
  client: Db,
  paper: Paper,
  verified: Verified,
  plan: Plan[],
  problems: string[],
  skipped: string[],
) {
  for (const ref of paper.figureRefs) {
    const fileName = `${paper.id}.${slug(ref)}.png`;
    const file = join(FIGURES, fileName);

    if (!existsSync(file)) {
      problems.push(`${paper.id} ${ref}: no crop at ${fileName} — run crop-figures.ts first`);
      continue;
    }
    const entry = verified.figures[fileName];
    if (!entry) {
      problems.push(`${paper.id} ${ref}: ${fileName} has no entry in verified.json — nobody has looked at this crop`);
      continue;
    }
    if (entry.verdict !== "clean") {
      problems.push(`${paper.id} ${ref}: verified.json records verdict "${entry.verdict}", not "clean"`);
      continue;
    }
    const bytes = readFileSync(file).length;
    if (bytes > MAX_BYTES) {
      problems.push(`${paper.id} ${ref}: ${bytes} bytes, over the ${MAX_BYTES} cap`);
      continue;
    }

    // Which rows this paper's questions live on. A reconcile paper's questions
    // were committed by the COMPILATION pipeline under its own source_file; a
    // new paper owns rows under its own. See property 3 in the header.
    let q = client
      .from("questions")
      .select("id, question_number, image_url, source_file, visibility")
      .eq("exam_id", EXAM_ID)
      .eq("pyq_year", paper.year)
      .eq("question_kind", "pyq");

    q = paper.bankStatus === "reconcile" ? q.like("source_file", "MH_HSC_12_Maths_PYQ__%") : q.eq("source_file", paper.sourceFile);

    const { data, error } = await q;
    if (error) throw new Error(error.message);

    // question_number spellings are inconsistent in the shipped rows
    // ("Q. 15", "Q. 1. iii.", "Q. 1. (iv)"), so match on the canonical form.
    const hits = (data ?? []).filter((r) => normaliseRef(String(r.question_number ?? "")) === ref);

    if (!hits.length) {
      skipped.push(
        `${paper.id} ${ref}: no row yet` +
          (paper.bankStatus === "new" ? ` — this sitting has not been ingested (expected at this stage)` : ``),
      );
      continue;
    }
    if (hits.length > 1) {
      problems.push(`${paper.id} ${ref}: matches ${hits.length} rows — ambiguous, refusing`);
      continue;
    }

    plan.push({
      paperId: paper.id,
      ref,
      file,
      bytes,
      questionId: String(hits[0].id),
      key: `${PREFIX}/paper-${paper.id}-${slug(ref)}.png`,
      previous: (hits[0].image_url as string | null) ?? null,
    });
  }
}

async function main() {
  const arg = process.argv[2];
  const apply = process.argv.includes("--apply");
  if (!arg) {
    console.error(`usage: tsx scripts/mh-hsc-12-pyq/paper/attach-figures.ts <paperId|--all> [--apply]`);
    console.error(`known: ${Object.keys(PAPERS).join(", ")}`);
    process.exit(1);
  }
  loadEnv();

  const verified = JSON.parse(readFileSync(join(FIGURES, "verified.json"), "utf8")) as Verified;
  const client = makeClient();

  const plan: Plan[] = [];
  const problems: string[] = [];
  const skipped: string[] = [];
  for (const id of arg === "--all" ? Object.keys(PAPERS) : [arg]) {
    await planFor(client, requirePaper(id), verified, plan, problems, skipped);
  }

  for (const p of plan) {
    const kind = p.previous ? "REPLACE" : "ATTACH";
    console.log(`  ${kind.padEnd(8)} ${p.paperId} ${p.ref.padEnd(7)} ${(p.bytes / 1024).toFixed(1).padStart(6)} KB -> ${p.key}`);
    if (p.previous) console.log(`           was: ${p.previous}`);
  }
  for (const s of skipped) console.log(`  skip     ${s}`);

  if (problems.length) {
    console.log(`\n${problems.length} problem(s):`);
    for (const p of problems) console.log(`  ${p}`);
    throw new Error("refusing to attach — resolve the problems above first.");
  }
  if (!plan.length) {
    console.log(`\nnothing to do.`);
    return;
  }
  if (!apply) {
    const replacing = plan.filter((p) => p.previous).length;
    console.log(
      `\n[dry-run] ${plan.length} figure(s) ready` +
        (replacing ? `, ${replacing} of them REPLACING an image on an already-PUBLIC row` : ``) +
        `. Pass --apply to write.`,
    );
    return;
  }

  for (const p of plan) {
    const { error: upErr } = await client.storage
      .from(BUCKET)
      .upload(p.key, readFileSync(p.file), { contentType: "image/png", upsert: true });
    if (upErr) throw new Error(`${p.ref}: upload failed — ${upErr.message}`);
    const { data: pub } = client.storage.from(BUCKET).getPublicUrl(p.key);
    const { error } = await client.from("questions").update({ image_url: pub.publicUrl }).eq("id", p.questionId);
    if (error) throw new Error(`${p.ref}: ${error.message}`);
    console.log(`  ${p.previous ? "replaced" : "attached"} ${p.paperId} ${p.ref} -> ${pub.publicUrl}`);
    if (p.previous) console.log(`     revert by setting image_url back to: ${p.previous}`);
  }
  console.log(`\ndone. ${plan.length} figure(s) written.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
