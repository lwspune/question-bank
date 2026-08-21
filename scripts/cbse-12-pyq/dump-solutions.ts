/**
 * Dump the rows of one paper that still need a solution, for an agent to author
 * from that paper's official CBSE marking scheme.
 *
 *   npx tsx scripts/cbse-12-pyq/dump-solutions.ts 2023-65-1-1
 *   npx tsx scripts/cbse-12-pyq/dump-solutions.ts 2023-65-1-1 --all   # incl. solved
 *
 * WHY THE SCHEME MUST BE READ AS AN IMAGE. Every marking scheme HAS a text
 * layer, including 2022's and 2025's whose question papers are pure scans — and
 * it is arithmetically lossy in a way that is invisible until you count:
 * across whole schemes `π` occurs ZERO times, `θ` ZERO times, and superscript
 * digits ZERO, in a Class-12 Maths paper full of trigonometry and definite
 * integrals. 2025 65/1/1 yields ONE `√` and no integral sign at all. Fractions
 * flatten across lines and matrices flatten to one row, so `adj A / |A|` arrives
 * as two unrelated lines. Read `out/<paperId>/ms/pNN.png`, never the text layer.
 *
 * THE PAIRING KEY IS content_hash, for the same reason attach-images.ts uses it:
 * a question is reprinted across up to three series and commits ONCE, keeping
 * whichever paper's source_file won the race, so the paper an agent is reading
 * is often NOT the source_file on the row it is solving.
 *
 * ALREADY-SOLVED ROWS ARE OMITTED BY DEFAULT, and that is what keeps the job
 * finite: 78 papers print 3,519 questions but only 1,766 distinct rows, so a
 * question solved from one series must not be re-solved from the next.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { contentHash, subjectiveContentHash } from "../../src/lib/upload/hash";
import { DATA, OUT, ORG_ID, EXAM_ID_CBSE_12 } from "./config";

type Q = {
  ref: string; questionNumber: string; section: string; marks: number;
  format: "mcq" | "subjective"; chapter: string; subtopic: string;
  stem: string; context?: string; options?: { label: string; text: string }[];
  answer?: string; _figure?: string; _flag?: string; _noCorrectOption?: boolean;
};

async function main() {
  const id = process.argv[2];
  const all = process.argv.includes("--all");
  if (!id) throw new Error("usage: dump-solutions.ts <paperId> [--all]");
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

  const paper = JSON.parse(readFileSync(join(DATA, `${id}.questions.json`), "utf8")) as
    { paper: string; year: number; questions: Q[] };

  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const withHash = paper.questions.map((q) => ({
    q,
    hash: q.format === "subjective"
      ? subjectiveContentHash(q.stem, q.context ?? null)
      : contentHash(q.stem, (q.options ?? []).map((o) => o.text), q.answer ?? ""),
  }));

  const state = new Map<string, { id: string; solved: boolean; kind: string }>();
  const hashes = withHash.map((w) => w.hash);
  for (let i = 0; i < hashes.length; i += 100) {
    const { data, error } = await client.from("questions")
      .select("id, content_hash, solution, question_kind")
      .eq("org_id", ORG_ID).eq("exam_id", EXAM_ID_CBSE_12)
      .in("content_hash", hashes.slice(i, i + 100));
    if (error) throw new Error(error.message);
    for (const r of data!) {
      state.set(r.content_hash as string, {
        id: r.id as string, solved: r.solution != null, kind: r.question_kind as string,
      });
    }
  }

  const out: unknown[] = [];
  const notes: string[] = [];
  let solved = 0, absent = 0, foreign = 0;
  for (const { q, hash } of withHash) {
    const s = state.get(hash);
    if (!s) { absent++; notes.push(`${q.ref}: no committed row (held out?)`); continue; }
    // A row that deduped into the TEXTBOOK corpus is not ours to solve — it is a
    // live PUBLIC practice row with its own NCERT solution. 2023 65/5/1 Q26 is one.
    if (s.kind !== "pyq") { foreign++; notes.push(`${q.ref}: lives in the bank as a '${s.kind}' row — not solved here`); continue; }
    if (s.solved && !all) { solved++; continue; }
    out.push({
      hash, ref: q.ref, questionNumber: q.questionNumber, marks: q.marks,
      format: q.format, chapter: q.chapter, subtopic: q.subtopic,
      stem: q.stem, ...(q.context ? { context: q.context } : {}),
      ...(q.options ? { options: q.options } : {}),
      ...(q.answer ? { answer: q.answer } : {}),
      // Carry the keyless assertion through. Without it an MCQ with four options
      // and no `answer` looks like a dump bug, and an agent may either invent a
      // key or waste the run doubting the file. There are 5 such rows and CBSE
      // itself acknowledges them ("Give 1 Mark to those who have attempted as
      // the correct option is not given").
      ...(q._noCorrectOption ? { noCorrectOption: true } : {}),
      ...(q._figure ? { figure: q._figure } : {}),
      solution: "",
    });
  }

  const msDir = join(OUT, id, "ms");
  const msPages = existsSync(msDir) ? require("node:fs").readdirSync(msDir).filter((f: string) => f.endsWith(".png")).length : 0;

  const path = join(DATA, `${id}.topaper.json`);
  writeFileSync(path, JSON.stringify({
    paper: paper.paper, year: paper.year, paperId: id,
    markingScheme: `out/${id}/ms/p00.png … p${String(msPages - 1).padStart(2, "0")}.png`,
    rows: out,
  }, null, 1));

  console.log(`${id}: ${paper.questions.length} printed | ${out.length} NEED a solution`);
  console.log(`  already solved elsewhere: ${solved} | absent: ${absent} | not a pyq row: ${foreign}`);
  console.log(`  marking scheme: ${msPages} rendered pages under out/${id}/ms/`);
  if (notes.length) for (const n of notes) console.log(`  ${n}`);
  console.log(`  -> ${path}`);
  if (!msPages) console.log(`  !! no marking-scheme renders — run: python scripts/cbse-12-pyq/prep.py ${paper.year} ${paper.paper.replace(/\//g, "-")}`);
}

main().catch((e) => { console.error(e.message ?? e); process.exit(1); });
