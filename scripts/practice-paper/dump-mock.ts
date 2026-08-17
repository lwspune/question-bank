/**
 * One-off: dump a published mock test's questions in snapshot (position) order —
 * stem + context + options (printed order, with is_correct) + stored solution +
 * subject/chapter/subtopic/difficulty — to C:/tmp/mock_<slug>.json.
 *
 * Used by the lws-test-ingest flow when a printed paper turns out to be a sitting
 * the bank already holds as PYQs: the tagged Excel is then built FROM these rows
 * (no re-derivation), per the skill's "all/mostly duplicate" branch.
 *
 *   npx tsx scripts/practice-paper/dump-mock.ts <slug>
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

async function main() {
  const slug = process.argv[2];
  if (!slug) throw new Error("pass <mock slug>");

  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );

  const { data: mock, error: e0 } = await db
    .from("mock_tests")
    .select("id, slug, title, questions")
    .eq("slug", slug)
    .single();
  if (e0) throw e0;

  const refs = (mock!.questions as any[])
    .slice()
    .sort((a, b) => a.position - b.position);

  const ids = refs.map((r) => r.questionId);
  const qs: any[] = [];
  for (let i = 0; i < ids.length; i += 100) {
    const { data, error } = await db
      .from("questions")
      .select(
        "id, question_number, text, context, solution, difficulty, visibility, question_kind, source_file, set_id, pyq_year, pyq_month, subject:subjects(name), chapter:chapters(name), subtopic:subtopics(name), options(label, text, is_correct)",
      )
      .in("id", ids.slice(i, i + 100));
    if (error) throw error;
    qs.push(...(data ?? []));
  }

  const byId = new Map(qs.map((q) => [q.id, q]));
  const rows = refs.map((r, i) => {
    const q = byId.get(r.questionId);
    if (!q) return { n: i + 1, id: r.questionId, missing: true };
    const opts = (q.options ?? []).sort((a: any, b: any) => a.label.localeCompare(b.label));
    return {
      n: i + 1,
      id: q.id,
      questionNumber: q.question_number,
      sectionKey: r.sectionKey,
      subject: q.subject?.name ?? null,
      chapter: q.chapter?.name ?? null,
      subtopic: q.subtopic?.name ?? null,
      difficulty: q.difficulty,
      visibility: q.visibility,
      kind: q.question_kind,
      sourceFile: q.source_file,
      setId: q.set_id,
      pyq: `${q.pyq_month ?? ""} ${q.pyq_year ?? ""}`.trim(),
      context: q.context ?? null,
      stem: q.text,
      optA: opts.find((o: any) => o.label === "A")?.text ?? null,
      optB: opts.find((o: any) => o.label === "B")?.text ?? null,
      optC: opts.find((o: any) => o.label === "C")?.text ?? null,
      optD: opts.find((o: any) => o.label === "D")?.text ?? null,
      answer: opts.find((o: any) => o.is_correct)?.label ?? null,
      nCorrect: opts.filter((o: any) => o.is_correct).length,
      nOptions: opts.length,
      solution: q.solution ?? null,
    };
  });

  mkdirSync("C:/tmp/nda2024sep", { recursive: true });
  const path = `C:/tmp/nda2024sep/mock_${slug}.json`;
  writeFileSync(path, JSON.stringify(rows, null, 1), "utf-8");
  console.log(`${rows.length} rows -> ${path}`);

  const bad = rows.filter((r: any) => r.missing || r.nCorrect !== 1 || r.nOptions !== 4);
  if (bad.length) console.log("WARN:", bad.map((b: any) => `${b.n}(opts=${b.nOptions},correct=${b.nCorrect})`).join(" "));
  const bySubject: Record<string, number> = {};
  for (const r of rows as any[]) bySubject[r.subject ?? "?"] = (bySubject[r.subject ?? "?"] ?? 0) + 1;
  console.log("subjects:", JSON.stringify(bySubject));
  console.log("kinds:", JSON.stringify([...new Set(rows.map((r: any) => `${r.kind}/${r.visibility}`))]));
}

main().catch((e) => { console.error(e); process.exit(1); });
