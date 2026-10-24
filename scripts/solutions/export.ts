/**
 * Export a batch of answer-only questions for blind solving
 * (SOLUTIONS_BACKFILL_SPEC.md, section 5 step 2). Read-only.
 *
 *   npx tsx scripts/solutions/export.ts --batch=pilot --exam="NEET:40" --exam="IPMAT Indore:20"
 *   npx tsx scripts/solutions/export.ts --batch=neet-1 --exam=NEET --slice=35
 *   ... --replace    re-export an existing batch (refused once it holds drafts)
 *
 * Writes generated-papers/solutions/<batch>/ (gitignored):
 *   questions-NN.json  one slice each, what a solver reads. NO key in it.
 *   images/            each question's picture, so a solver can open it
 *   key.json           { id: key }, for apply.ts and the dispute review only.
 *                      A drafting agent is never given this file.
 *   skipped.md         rows left out, and why (cancelled, no key, ...)
 *   style.json         a dozen solutions each exam already has: the house style
 *
 * Order within an exam: questions students asked V about, then questions in a
 * published mock, then by subject and chapter so a slice reads as one topic.
 * Questions of one passage stay in one slice (`slices`).
 */
import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { readAllPages } from "../../src/lib/supabase/readAllPages";
import { downloadImage } from "../../src/lib/storage/images";
import { referencesFigure } from "../lib/figureRefs";
import { keyOf, skipReason, slices, type BankRow } from "./lib";

type Row = BankRow & {
  question_kind: string;
  subject: { name: string } | null;
  chapter: { name: string } | null;
};

const SELECT =
  "id, question_format, question_kind, visibility, publish_blocked, cancelled_note, solution, numeric_answer, " +
  "image_url, text, context, set_id, subject:subjects(name), chapter:chapters(name), options(label, text, is_correct)";

function args() {
  const get = (k: string) => process.argv.find((a) => a.startsWith(`--${k}=`))?.slice(k.length + 3);
  const batch = get("batch");
  if (!batch || !/^[a-z0-9-]+$/.test(batch)) throw new Error("--batch=<name> (lowercase letters, digits, dashes) is required");
  const exams = process.argv
    .filter((a) => a.startsWith("--exam="))
    .map((a) => {
      const v = a.slice(7);
      const m = v.match(/^(.*):(\d+)$/);
      return m ? { name: m[1], limit: Number(m[2]) } : { name: v, limit: Infinity };
    });
  if (!exams.length) throw new Error('--exam="<exam name>[:limit]" is required (repeatable)');
  return { batch, exams, slice: Number(get("slice") ?? 35), kind: get("kind") };
}

async function priorityIds(db: SupabaseClient) {
  const asked = await readAllPages<{ asked_question_id: string }>((f, t) =>
    db.from("chat_interactions").select("asked_question_id").not("asked_question_id", "is", null).order("id").range(f, t)
  );
  const mocks = await readAllPages<{ questions: { questionId: string }[] }>((f, t) =>
    db.from("mock_tests").select("questions").eq("status", "published").order("id").range(f, t)
  );
  return {
    asked: new Set(asked.map((r) => r.asked_question_id)),
    inMock: new Set(mocks.flatMap((m) => (m.questions ?? []).map((q) => q.questionId))),
  };
}

async function main() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const { batch, exams, slice, kind } = args();
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const dir = join(process.cwd(), "generated-papers", "solutions", batch);
  // A re-export over an old one would leave its extra slices behind. Refuse,
  // or with --replace start clean, but never once drafts exist: they are work.
  if (existsSync(dir) && readdirSync(dir).length) {
    if (!process.argv.includes("--replace")) throw new Error(`${dir} already exists: pick a new --batch, or pass --replace`);
    const drafts = readdirSync(dir).filter((f) => f.startsWith("drafts-"));
    if (drafts.length) throw new Error(`refusing --replace: ${dir} holds drafts (${drafts.join(", ")})`);
    rmSync(dir, { recursive: true });
  }
  mkdirSync(join(dir, "images"), { recursive: true });
  const { asked, inMock } = await priorityIds(db);
  const rank = (id: string) => (asked.has(id) ? 0 : inMock.has(id) ? 1 : 2);

  const picked: (Row & { exam: string })[] = [];
  const skipped: string[] = [];
  const style: Record<string, { question: string; solution: string }[]> = {};
  for (const exam of exams) {
    const { data: e, error } = await db.from("exams").select("id").eq("name", exam.name).single();
    if (error || !e) throw new Error(`exam "${exam.name}" not found`);
    const rows = await readAllPages<Row>((f, t) => {
      let q = db
        .from("questions")
        .select(SELECT)
        .eq("exam_id", e.id)
        .eq("visibility", "PUBLIC")
        .or("solution.is.null,solution.eq.");
      if (kind) q = q.eq("question_kind", kind);
      return q.order("id").range(f, t) as unknown as PromiseLike<{ data: Row[] | null; error: { message: string } | null }>;
    });
    const fillable: Row[] = [];
    for (const r of rows) {
      const why = skipReason(r);
      if (why) skipped.push(`| ${r.id} | ${exam.name} | ${why} |`);
      else fillable.push(r);
    }
    fillable.sort(
      (a, b) =>
        rank(a.id) - rank(b.id) ||
        (a.subject?.name ?? "").localeCompare(b.subject?.name ?? "") ||
        (a.chapter?.name ?? "").localeCompare(b.chapter?.name ?? "")
    );
    // Take whole passages up to the limit, so a passage is never cut at the edge.
    const taken: Row[] = [];
    for (const group of slices(fillable, 1)) {
      if (taken.length >= exam.limit) break;
      taken.push(...group);
    }
    picked.push(...taken.map((r) => ({ ...r, exam: exam.name })));
    // A few solutions the bank already holds for this exam: the house style, since a
    // drafting agent has no database to read them from.
    const { data: styled } = await db
      .from("questions")
      .select("text, solution")
      .eq("exam_id", e.id)
      .eq("visibility", "PUBLIC")
      .not("solution", "is", null)
      .neq("solution", "")
      .limit(12);
    style[exam.name] = (styled ?? []).map((s) => ({ question: s.text, solution: s.solution }));
    console.log(`${exam.name}: ${rows.length} without a solution · ${fillable.length} fillable · took ${taken.length}`);
  }

  const key: Record<string, string> = {};
  const parts = slices(picked, slice);
  let images = 0;
  for (const [i, part] of parts.entries()) {
    const out = [];
    for (const r of part) {
      key[r.id] = keyOf(r) as string;
      let image: string | null = null;
      if (r.image_url) {
        const ext = r.image_url.match(/\.(png|jpe?g|gif|webp|svg)(?:\?|$)/i)?.[1] ?? "png";
        image = join(dir, "images", `${r.id}.${ext}`);
        writeFileSync(image, await downloadImage(db, r.image_url));
        images++;
      }
      out.push({
        id: r.id,
        exam: r.exam,
        subject: r.subject?.name ?? null,
        chapter: r.chapter?.name ?? null,
        format: r.question_format,
        context: r.context,
        text: r.text,
        options: r.question_format === "mcq" ? r.options.map((o) => ({ label: o.label, text: o.text })).sort((a, b) => a.label.localeCompare(b.label)) : [],
        image,
        pointsAtFigure: !r.image_url && referencesFigure(r.text, r.context),
      });
    }
    writeFileSync(join(dir, `questions-${String(i + 1).padStart(2, "0")}.json`), JSON.stringify(out, null, 2));
  }
  writeFileSync(join(dir, "key.json"), JSON.stringify(key, null, 2));
  writeFileSync(join(dir, "style.json"), JSON.stringify(style, null, 2));
  writeFileSync(join(dir, "skipped.md"), `# Skipped at export: ${batch}\n\n| id | exam | why |\n|---|---|---|\n${skipped.join("\n")}\n`);
  console.log(`batch ${batch}: ${picked.length} questions in ${parts.length} slice(s), ${images} image(s), ${skipped.length} skipped -> ${dir}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
