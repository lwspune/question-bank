/**
 * Post-commit verification: which question numbers of a paper actually landed?
 *
 *   npx tsx scripts/nda-mock/verify.ts m7 m6
 *
 * `commit.ts` reports inserted/skipped counts, but a count cannot say WHICH
 * number is absent — and a paper that shares questions with an earlier mock will
 * legitimately be short, because `content_hash` is unique per (org, exam) so the
 * twin was deduped into the paper that got there first. This prints the gap list
 * plus where each gap's twin lives, so "short by 9" can be read as either
 * expected overlap or a lost question.
 */
import { join } from "node:path";
import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
import { requirePaper, DATA, EXAM_ID, SUBJECT_NAME } from "./config";
import { buildRecords, type MockQuestion, type Catalog } from "./lib";
import type { ExtractedQuestion } from "./extract";
import type { Adjudicated } from "./adjudicate";

async function main() {
  require("dotenv").config({
    path: join(process.cwd(), ".env.local"),
    override: true,
  });
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const { data: subject } = await client
    .from("subjects")
    .select("id")
    .eq("exam_id", EXAM_ID)
    .eq("name", SUBJECT_NAME)
    .single();
  const { data: chapters } = await client
    .from("chapters")
    .select("name,subtopics(name)")
    .eq("subject_id", subject!.id);
  const catalog: Catalog = {};
  for (const c of chapters ?? []) {
    catalog[c.name] = ((c.subtopics ?? []) as { name: string }[]).map((s) => s.name);
  }

  for (const id of process.argv.slice(2)) {
    const paper = requirePaper(id);
    const { data: rows } = await client
      .from("questions")
      .select("question_number,visibility,question_kind")
      .eq("exam_id", EXAM_ID)
      .eq("source_file", paper.sourceFile);

    const have = new Set((rows ?? []).map((r) => Number(r.question_number)));
    const missing: number[] = [];
    for (let n = 1; n <= paper.questionCount; n++) if (!have.has(n)) missing.push(n);

    const vis = [...new Set((rows ?? []).map((r) => r.visibility))];
    const kind = [...new Set((rows ?? []).map((r) => r.question_kind))];
    console.log(`\n=== ${paper.label} (${paper.sourceFile}) ===`);
    console.log(
      `bank rows: ${rows?.length ?? 0} / ${paper.questionCount}   visibility=${vis}   kind=${kind}`,
    );
    if (!missing.length) {
      console.log("every question number present.");
      continue;
    }

    // Re-derive each missing number's hash and look for its twin anywhere in the
    // exam: a hit is expected dedup, a miss is a genuinely lost question.
    const extracted: ExtractedQuestion[] = JSON.parse(
      readFileSync(join(DATA, `${paper.id}.extract.json`), "utf8"),
    );
    const adj = new Map(
      (JSON.parse(readFileSync(join(DATA, `${paper.id}.adjudication.json`), "utf8")) as Adjudicated[]).map(
        (a) => [a.number, a],
      ),
    );
    const questions: MockQuestion[] = extracted.map((e) => {
      const a = adj.get(e.number);
      return {
        number: e.number,
        numberLabel: e.numberLabel,
        stem: e.stem,
        options: e.options,
        context: e.context,
        setLabel: e.setLabel,
        solution: e.solution,
        answer: a?.resolved ?? null,
        chapter: a?.chapter ?? "",
        subtopic: a?.subtopic ?? "",
        difficulty: a?.difficulty ?? "MODERATE",
      };
    });
    const built = buildRecords(questions, catalog, {
      subjectName: SUBJECT_NAME,
    });
    const hashOf = new Map(built.rows.map((r) => [Number(r.questionNumber), r.contentHash]));

    const { data: twins } = await client
      .from("questions")
      .select("content_hash,source_file,question_number")
      .eq("exam_id", EXAM_ID)
      .in("content_hash", missing.map((n) => hashOf.get(n)).filter(Boolean) as string[]);
    const byHash = new Map((twins ?? []).map((t) => [t.content_hash, t]));

    console.log(`missing ${missing.length}: ${missing.join(", ")}`);
    for (const n of missing) {
      const h = hashOf.get(n);
      const twin = h ? byHash.get(h) : undefined;
      if (!h) console.log(`  Q${n}: NOT BUILT — held, or no resolved answer`);
      else if (twin) console.log(`  Q${n}: deduped -> ${twin.source_file} Q${twin.question_number}`);
      else console.log(`  Q${n}: LOST — built a row, but nothing in the bank carries its hash`);
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
