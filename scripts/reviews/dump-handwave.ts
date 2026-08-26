/**
 * Dump every solution that ASSERTS a result instead of DERIVING it (RULE 5).
 *
 *   npx tsx scripts/reviews/dump-handwave.ts <subject> [outDir] [--batches=N]
 *
 * Scans a subject's PUBLIC solutions for the marker phrases in
 * scripts/mocks/NDA_MATHS_BLUEPRINT.md §5f and writes them out for rewriting.
 *
 * UNLIKE the blind pass, this dump DOES include the key and the current
 * solution — the answer is not in question here, the explanation is. The
 * rewriter's job is to produce the derivation that was skipped. If a rewriter
 * cannot reach the keyed answer, that is a finding to report, not a rewrite.
 *
 * Triage, not a verdict: a marker phrase is a reason to READ the row. Some are
 * legitimate (a genuinely standard result invoked by name, where deriving it is
 * out of scope for the question being asked).
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const MARKERS: [string, RegExp][] = [
  ["VERIFIED_NUMERICALLY", /verified numerically|\(verified/i],
  ["DEFERS_TO_SOURCE", /the printed solution|following the book|as printed|the book's own/i],
  ["ASSERTS_EVALUATION", /evaluating gives|simplifying gives|works out to|which gives the answer/i],
  ["IT_CAN_BE_SHOWN", /it can be shown|can be shown|standard result|well[- ]known result/i],
  ["VAGUE_WITNESS", /by an appropriate|suitable choice|appropriate matrix/i],
];

async function main() {
  const subject = process.argv[2] ?? "Mathematics";
  const outDir =
    process.argv[3] && !process.argv[3].startsWith("--")
      ? process.argv[3]
      : join(process.cwd(), "scripts", "reviews", "data", "handwave");
  const batches = Number(
    process.argv.find((a) => a.startsWith("--batches="))?.split("=")[1] ?? 6
  );

  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  // Resolve the subject FIRST and filter server-side. Scanning the whole bank
  // and filtering in JS pulls 51k wide rows and trips the statement timeout —
  // once `text`/`context` are in the payload it is a large read for ~80 hits.
  const { data: subj, error: subjErr } = await db
    .from("subjects")
    .select("id,name,exams!inner(name)")
    .eq("name", subject);
  if (subjErr) throw subjErr;
  const sid = (subj as any[]).find((s) =>
    String(s.exams?.name ?? "").toUpperCase().includes("NDA")
  )?.id;
  if (!sid) throw new Error(`no NDA subject named ${subject}`);

  // Narrow to the marker phrases in SQL too, so only candidate rows come back.
  const ILIKE = [
    "verified numerically",
    "(verified",
    "the printed solution",
    "following the book",
    "as printed",
    "evaluating gives",
    "simplifying gives",
    "works out to",
    "it can be shown",
    "can be shown",
    "standard result",
    "well-known result",
    "well known result",
    "by an appropriate",
    "suitable choice",
    "appropriate matrix",
  ];

  const rows: any[] = [];
  for (let from = 0; ; from += 500) {
    const { data, error } = await db
      .from("questions")
      .select(
        // `text` and `context` are REQUIRED — a rewriter cannot derive a
        // solution it cannot read the question for. Omitting `text` here once
        // produced a dump of 78 rows with every stem null.
        "id,question_number,question_kind,difficulty,text,context,solution,source_file," +
          "chapters(name),options(label,text,is_correct)"
      )
      .eq("visibility", "PUBLIC")
      .eq("subject_id", sid)
      .not("solution", "is", null)
      .or(ILIKE.map((p) => `solution.ilike.*${p}*`).join(","))
      .range(from, from + 499);
    if (error) throw error;
    if (!data?.length) break;
    rows.push(...data);
    if (data.length < 500) break;
  }

  const hits = rows
    .map((r) => {
      const sol = String(r.solution).replace(/\s+/g, " ");
      const flags = MARKERS.filter(([, re]) => re.test(sol)).map(([n]) => n);
      return { r, sol, flags };
    })
    .filter((x) => x.flags.length > 0)
    .map(({ r, sol, flags }) => ({
      questionId: r.id,
      qnum: String(r.question_number),
      chapter: r.chapters?.name ?? null,
      difficulty: r.difficulty,
      kind: r.question_kind,
      sourceFile: r.source_file,
      flags,
      stem: r.text ?? null,
      context: r.context ?? null,
      options: Object.fromEntries((r.options ?? []).map((o: any) => [o.label, o.text])),
      key: (r.options ?? []).find((o: any) => o.is_correct)?.label ?? null,
      currentSolution: sol,
    }));

  mkdirSync(outDir, { recursive: true });
  const per = Math.ceil(hits.length / batches);
  for (let i = 0; i < batches; i++) {
    const chunk = hits.slice(i * per, (i + 1) * per);
    if (!chunk.length) continue;
    writeFileSync(join(outDir, `handwave${i + 1}.json`), JSON.stringify(chunk, null, 1), "utf8");
    console.log(`handwave${i + 1}.json  ${chunk.length} rows`);
  }
  const byFlag: Record<string, number> = {};
  for (const h of hits) for (const f of h.flags) byFlag[f] = (byFlag[f] ?? 0) + 1;
  console.log(`\n${hits.length} rows flagged of ${rows.length} scanned`);
  console.log(byFlag);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
