/**
 * Prove the IPMAT Indore mock chain reconstructs — WITHOUT publishing anything.
 *
 *   npx tsx scripts/ipmat/mock-smoke.ts
 *
 * Read-only. Exits 1 if any of the five sittings fails to reconstruct.
 *
 * WHY THIS EXISTS. `scripts/mocks/build.ts` fetches rows with
 * `.eq("visibility", "PUBLIC")`, and every IPMAT row is PRIVATE until its keys
 * are derived — correctly, since a mock puts questions in front of a student.
 * So the real builder returns 0 rows and the five mocks cannot be created yet.
 *
 * That leaves the new machinery unexercised against real data: the blueprint,
 * the per-section marking, the source_file-suffix routing, the three-file
 * sitting and the grace row. The unit spec covers the pure core on synthetic
 * rows; this drives the SAME `buildMockPaper` over the REAL bank rows, read with
 * the service-role client so visibility does not hide them.
 *
 * It writes nothing and creates no `mock_tests` row. When the keys are derived
 * and the chapters flip PUBLIC, `npx tsx scripts/mocks/build.ts
 * --paper=ipmat-indore --apply --publish` is the only remaining step.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { IPMAT_INDORE_PAPER, sectionMarking } from "../../src/lib/mocks/blueprints";
import {
  buildMockPaper,
  validatePaperRows,
  type PaperQuestionRow,
} from "../../src/lib/mocks/reconstruct";
import { ipmatIndoreSittings, isGrace } from "../mocks/ipmatSittings";

function loadEnv() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

type Row = {
  id: string;
  question_number: string | null;
  source_file: string | null;
  visibility: string;
  question_format: string | null;
  subject_id: string;
  options: { label: string; is_correct: boolean }[];
  numeric_answer: number | null;
};

async function main() {
  loadEnv();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY in .env.local");
    process.exit(1);
  }
  const db = createClient(url, key, { auth: { persistSession: false } });
  const bp = IPMAT_INDORE_PAPER;

  const { data: exam } = await db.from("exams").select("id").eq("name", bp.examName).limit(1).maybeSingle();
  if (!exam) throw new Error(`exam not found: ${bp.examName}`);
  const { data: subjects } = await db.from("subjects").select("id, name").eq("exam_id", exam.id);
  const subjectName = new Map((subjects ?? []).map((s) => [s.id as string, s.name as string]));

  console.log(`${bp.paperLabel} — smoke over ${ipmatIndoreSittings().length} sittings`);
  console.log(`(read with the service-role client; every row is PRIVATE, so the real builder sees none)\n`);

  let failed = 0;
  for (const s of ipmatIndoreSittings()) {
    const files = [s.sourceFile, ...s.extraFiles];
    const raw: Row[] = [];
    for (let from = 0; ; from += 300) {
      const { data, error } = await db
        .from("questions")
        .select("id, question_number, source_file, visibility, question_format, subject_id, numeric_answer, options(label, is_correct)")
        .in("source_file", files)
        .order("source_file")
        .order("question_number")
        .range(from, from + 299);
      if (error) throw new Error(`read failed: ${error.message}`);
      if (!data || data.length === 0) break;
      raw.push(...(data as unknown as Row[]));
      if (data.length < 300) break;
    }

    const rows: PaperQuestionRow[] = raw.map((r) => {
      const correct = r.options?.find((o) => o.is_correct)?.label;
      const answer =
        r.question_format === "numeric"
          ? r.numeric_answer !== null
            ? ({ kind: "numeric", value: r.numeric_answer } as const)
            : null
          : correct
            ? ({ kind: "mcq", label: correct as "A" | "B" | "C" | "D" } as const)
            : null;
      return {
        id: r.id,
        sourceRow: Number(r.question_number),
        questionNumber: r.question_number,
        subjectName: subjectName.get(r.subject_id) ?? "?",
        sourceFile: r.source_file ?? undefined,
        answer,
        ...(isGrace(s.grace, r.source_file ?? undefined, r.question_number) ? { grace: true } : {}),
      };
    });

    const issues = validatePaperRows(bp, rows);
    if (issues.length) {
      failed++;
      console.log(`  x ${s.key}  ${rows.length} rows — ${issues.length} issue(s)`);
      for (const i of issues.slice(0, 4)) console.log(`      ${i}`);
      continue;
    }

    const snap = buildMockPaper(bp, rows, { year: s.year, month: null, slug: s.slug, title: s.title });
    const perSection = new Map<string, number>();
    const negs = new Map<string, Set<number>>();
    for (const q of snap.questions) {
      perSection.set(q.sectionKey, (perSection.get(q.sectionKey) ?? 0) + 1);
      (negs.get(q.sectionKey) ?? negs.set(q.sectionKey, new Set()).get(q.sectionKey)!).add(q.negMarks);
    }
    const graceN = snap.questions.filter((q) => q.grace).length;
    console.log(
      `  ok ${s.key}  ${snap.totalQuestions}q / ${snap.totalMarks}m  ` +
        bp.sections.map((x) => `${x.key}=${perSection.get(x.key) ?? 0}`).join(" ") +
        (graceN ? `  grace=${graceN}` : "")
    );
    // The assertion that matters: SA carries no penalty, the MCQ sections do.
    for (const sec of bp.sections) {
      const want = sectionMarking(bp, sec).wrong;
      const got = [...(negs.get(sec.key) ?? [])];
      if (got.length !== 1 || got[0] !== want) {
        failed++;
        console.log(`      ! ${sec.key} negMarks ${JSON.stringify(got)}, expected ${want}`);
      }
    }
  }

  console.log("");
  if (failed) {
    console.log(`MOCK SMOKE: FAIL (${failed})`);
    process.exit(1);
  }
  console.log("MOCK SMOKE: PASS — all five sittings reconstruct, and SA carries no negative marking.");
  console.log("Nothing was written. The mocks themselves need the rows PUBLIC, which needs the keys derived.");
}

void main();
