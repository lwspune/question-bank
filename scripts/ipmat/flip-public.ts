/**
 * Flip IPMAT rows to PUBLIC — PER CHAPTER, which is the roadmap's rule.
 *
 *   npx tsx scripts/ipmat/flip-public.ts                         # dry run, all three exams
 *   npx tsx scripts/ipmat/flip-public.ts --exam=ipmat-indore     # dry run, one exam
 *   npx tsx scripts/ipmat/flip-public.ts --exam=ipmat-indore --chapter="Algebra" --apply
 *   npx tsx scripts/ipmat/flip-public.ts --exam=ipmat-indore --apply   # every chapter of one exam
 *
 * Per chapter rather than one sweep, so a bad chapter is one revert rather than
 * a bank-wide one, and so the dry run reads as a checklist.
 *
 * SHIP RULE lives in `publish.ts` and is spec'd in tests/ipmat-publish: a row
 * goes PUBLIC iff it carries an answer of the kind its format uses, or it is a
 * DECLARED grace question. The grace allowance is NOT "unkeyed is fine" — that
 * could not tell a cancelled question from one whose key we failed to ingest —
 * it keys on the sitting registry in scripts/mocks/ipmatSittings.ts.
 *
 * ⚠ IT REFUSES TO PUBLISH AN UNSTAMPED ROW, for the reason in
 * stamp-provenance.ts: every key here is afterboards' third-party derivation,
 * IIM publishes none, and a row whose provenance was never recorded is
 * indistinguishable in the database from one nobody characterised. Run
 * `stamp-provenance.ts --apply` first. The gate keys on `derived_model`, a
 * structured column, not on a prose match that would rot when wording changes.
 *
 * ⚠ `.in()` IS CHUNKED AT 200. The lane this was modelled on updates with one
 * unchunked `.in(ids)`, which is safe only because its papers hold ≤58 rows;
 * IPMAT Indore has 670, and PostgREST puts the id list in the URL, so an
 * unchunked update would answer a bare `Bad Request`. Chunking a FILTER and
 * paging a RESULT are different limits — see the CLAUDE.md pitfall.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { IPMAT_EXAMS, type IpmatExamSlug } from "./config";
import { publishVerdict, type PublishCandidate } from "./publish";
import { ipmatIndoreSittings, isGrace } from "../mocks/ipmatSittings";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const CHUNK = 200;

/**
 * Every declared grace number across every sitting, flattened into one
 * predicate. Only Indore declares any today; the other two exams have no
 * sittings registry, so nothing there can be graced — which is correct, since
 * a cancelled question we have not declared is exactly what must stay held.
 */
function declaredGrace(sourceFile: string | undefined, questionNumber: string | null): boolean {
  return ipmatIndoreSittings().some((s) => isGrace(s.grace, sourceFile, questionNumber));
}

type Row = {
  id: string;
  question_number: string | null;
  source_file: string | null;
  question_format: string | null;
  numeric_answer: number | null;
  visibility: string;
  derived_model: string | null;
  chapter_id: string | null;
  options: { is_correct: boolean }[];
};

function makeClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
}

async function main() {
  const apply = process.argv.includes("--apply");
  const examArg = process.argv.find((a) => a.startsWith("--exam="))?.slice("--exam=".length) as
    | IpmatExamSlug
    | undefined;
  const chapterArg = process.argv.find((a) => a.startsWith("--chapter="))?.slice("--chapter=".length);
  const wanted = examArg ? IPMAT_EXAMS.filter((e) => e.slug === examArg) : IPMAT_EXAMS;
  if (wanted.length === 0) throw new Error(`unknown --exam=${examArg}`);

  const db = makeClient();
  const { data: examRows, error: exErr } = await db
    .from("exams")
    .select("id, name")
    .in("name", wanted.map((e) => e.examName));
  if (exErr) throw new Error(`exam read failed: ${exErr.message}`);
  const idByName = new Map((examRows ?? []).map((e) => [e.name as string, e.id as string]));

  // PAGED, not a bare `.select()`. The bank passed 1,000 chapters (1,033 today)
  // and PostgREST silently truncates there — the first version of this script
  // hit exactly that, and 287 JIPMAT rows landed under "(no chapter)" because
  // their chapter was row 1001+. It mislabels the per-chapter checklist this
  // script exists to produce, and `--chapter=` would silently miss them.
  const chapterName = new Map<string, string>();
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db.from("chapters").select("id, name").range(from, from + 999);
    if (error) throw new Error(`chapter read failed: ${error.message}`);
    if (!data?.length) break;
    for (const c of data) chapterName.set(c.id as string, c.name as string);
    if (data.length < 1000) break;
  }

  let grandFlip = 0;
  let grandHeld = 0;

  for (const exam of wanted) {
    const examId = idByName.get(exam.examName);
    if (!examId) throw new Error(`no exams row for "${exam.examName}"`);

    const rows: Row[] = [];
    for (let from = 0; ; from += 500) {
      const { data, error } = await db
        .from("questions")
        .select(
          "id, question_number, source_file, question_format, numeric_answer, visibility, derived_model, chapter_id, options(is_correct)"
        )
        .eq("exam_id", examId)
        .range(from, from + 499);
      if (error) throw new Error(`read failed: ${error.message}`);
      if (!data?.length) break;
      rows.push(...(data as unknown as Row[]));
      if (data.length < 500) break;
    }

    // Group by chapter so the flip is per chapter and the dry run is a checklist.
    const byChapter = new Map<string, Row[]>();
    for (const r of rows) {
      const name = chapterName.get(r.chapter_id ?? "") ?? "(no chapter)";
      if (chapterArg && name !== chapterArg) continue;
      (byChapter.get(name) ?? byChapter.set(name, []).get(name)!).push(r);
    }
    if (chapterArg && byChapter.size === 0) {
      throw new Error(`no chapter named ${JSON.stringify(chapterArg)} in ${exam.examName}`);
    }

    console.log(`\n=== ${exam.examName} — ${byChapter.size} chapter(s) ===`);

    for (const [name, chRows] of [...byChapter].sort((a, b) => a[0].localeCompare(b[0]))) {
      const candidates = chRows.filter((r) => r.visibility !== "PUBLIC");
      const decided = candidates.map((r) => {
        const cand: PublishCandidate = {
          questionNumber: r.question_number,
          sourceFile: r.source_file,
          questionFormat: r.question_format,
          numericAnswer: r.numeric_answer,
          hasCorrectOption: (r.options ?? []).some((o) => o.is_correct),
        };
        return { row: r, verdict: publishVerdict(cand, declaredGrace) };
      });

      const toFlip = decided.filter((d) => d.verdict.publish);
      const held = decided.filter((d) => !d.verdict.publish);
      const grace = toFlip.filter((d) => d.verdict.reason === "declared-grace");

      // The provenance gate — refuse rather than warn. See the header.
      const unstamped = toFlip.filter((d) => !d.row.derived_model);
      if (unstamped.length) {
        throw new Error(
          `refusing to publish "${name}" — ${unstamped.length} of ${toFlip.length} row(s) carry no ` +
            `derived_model stamp. Every key here is afterboards' derivation, so an unstamped ` +
            `published row records nothing about where its answer came from. Run ` +
            `\`npx tsx scripts/ipmat/stamp-provenance.ts --apply\` first. First few: ` +
            unstamped.slice(0, 6).map((d) => d.row.question_number).join(", ")
        );
      }

      grandFlip += toFlip.length;
      grandHeld += held.length;
      const already = chRows.length - candidates.length;
      console.log(
        `  ${name.padEnd(42)} ${String(toFlip.length).padStart(4)} → PUBLIC` +
          (grace.length ? `  (+${grace.length} grace)` : "") +
          (held.length ? `  · ${held.length} HELD` : "") +
          (already ? `  · ${already} already public` : "")
      );
      for (const h of held) {
        console.log(`       held: Q${h.row.question_number} (${h.row.source_file}) — ${h.verdict.reason}`);
      }

      if (!apply || toFlip.length === 0) continue;
      for (let i = 0; i < toFlip.length; i += CHUNK) {
        const ids = toFlip.slice(i, i + CHUNK).map((d) => d.row.id);
        const { error } = await db.from("questions").update({ visibility: "PUBLIC" }).in("id", ids);
        if (error) throw new Error(`flip failed on "${name}": ${error.message}`);
      }
    }
  }

  console.log("");
  if (!apply) {
    console.log(`[dry run] ${grandFlip} row(s) would go PUBLIC, ${grandHeld} would stay PRIVATE.`);
    console.log("          pass --apply to write.");
    return;
  }
  console.log(`flipped ${grandFlip} row(s) to PUBLIC; ${grandHeld} left PRIVATE.`);
}

void main();
