/**
 * Where every CDS GK paper stands in the pipeline.
 *
 *   npx tsx scripts/cds-gs/status.ts
 *
 * Reads the filesystem and the database and prints one row per paper. Exists
 * because this is a 19-paper run through a 9-step pipeline, and "which papers
 * still need a derivation pass?" is otherwise a question you answer by squinting
 * at a directory listing.
 *
 * The DB column is the one that matters: a paper is only really done when its
 * rows are in the bank, and `data/` files are easy to mistake for progress.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { DATA, EXAM_ID, OUT, PAPERS, QUESTIONS_PER_PAPER, dataPath } from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

// The pipeline's files carry their rows under three different shapes — a bare
// array (merged questions, derivation passes), `{questions}` (a transcription
// band) and `{derivations}` (the reconciled answers). Counting only the first two
// made a fully-transcribed paper report zero, which is worse than no tracker:
// it reads as "not started" for work that is done.
const count = (path: string) => {
  try {
    const v = JSON.parse(readFileSync(path, "utf8"));
    if (Array.isArray(v)) return v.length;
    if (Array.isArray(v?.questions)) return v.questions.length;
    if (Array.isArray(v?.derivations)) return v.derivations.length;
    return 0;
  } catch {
    return 0;
  }
};

async function main() {
  loadEnv();
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const files = existsSync(DATA) ? readdirSync(DATA) : [];
  const ids = Object.keys(PAPERS);

  const rows = await Promise.all(
    ids.map(async (id) => {
      const paper = PAPERS[id];
      const bands = files.filter((f) => new RegExp(`^${id}\\.b\\d+\\.json$`).test(f));
      const bandQ = bands.reduce((a, f) => a + count(join(DATA, f)), 0);
      const merged = existsSync(dataPath(id, "questions")) ? count(dataPath(id, "questions")) : 0;
      const derivedDir = join(__dirname, "derived");
      const dFiles = existsSync(derivedDir) ? readdirSync(derivedDir) : [];
      const passA = dFiles.filter((f) => new RegExp(`^${id}\\.a\\.p\\d+\\.json$`).test(f))
        .reduce((a, f) => a + count(join(derivedDir, f)), 0);
      const passB = dFiles.filter((f) => new RegExp(`^${id}\\.b\\.p\\d+\\.json$`).test(f))
        .reduce((a, f) => a + count(join(derivedDir, f)), 0);
      const answers = existsSync(dataPath(id, "answers")) ? count(dataPath(id, "answers")) : 0;

      const { count: dbAll } = await client
        .from("questions")
        .select("id", { count: "exact", head: true })
        .eq("exam_id", EXAM_ID)
        .eq("source_file", paper.sourceFile);
      const { count: dbPub } = await client
        .from("questions")
        .select("id", { count: "exact", head: true })
        .eq("exam_id", EXAM_ID)
        .eq("source_file", paper.sourceFile)
        .eq("visibility", "PUBLIC");

      return { id, bands: bands.length, bandQ, merged, passA, passB, answers, db: dbAll ?? 0, pub: dbPub ?? 0,
               rendered: existsSync(join(OUT, id)) };
    })
  );

  const N = QUESTIONS_PER_PAPER;
  const mark = (n: number) => (n === 0 ? "  ·" : n === N ? String(n).padStart(3) : `${String(n).padStart(3)}!`);
  console.log(`\nCDS General Knowledge — ${ids.length} papers, ${N} questions each\n`);
  console.log(`  paper    px  bands   txn  merged   passA   passB  answr      DB  PUBLIC`);
  console.log(`  ${"-".repeat(70)}`);
  for (const r of rows) {
    console.log(
      `  ${r.id.padEnd(8)} ${(r.rendered ? "y" : "-").padStart(2)}  ${String(r.bands).padStart(5)}  ` +
        `${mark(r.bandQ)}   ${mark(r.merged)}    ${mark(r.passA)}    ${mark(r.passB)}   ${mark(r.answers)}  ` +
        `${mark(r.db)}     ${r.pub === 0 ? "  ·" : String(r.pub).padStart(3)}`
    );
  }
  const done = rows.filter((r) => r.db === N).length;
  const totalDb = rows.reduce((a, r) => a + r.db, 0);
  const totalPub = rows.reduce((a, r) => a + r.pub, 0);
  console.log(`  ${"-".repeat(70)}`);
  console.log(`  ${done}/${ids.length} papers committed · ${totalDb} rows in the bank · ${totalPub} PUBLIC`);
  console.log(`\n  "!" marks a count that is not ${N} — i.e. in progress or short.`);
  console.log(`  "px" is whether out/<id>/ still holds rendered pages (delete after commit; regenerable).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
