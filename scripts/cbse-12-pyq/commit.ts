/**
 * Commit one CBSE Class-12 board paper — PRIVATE, question_kind='pyq'.
 *
 *   npx tsx scripts/cbse-12-pyq/commit.ts 2025-65-5-1          # dry-run
 *   npx tsx scripts/cbse-12-pyq/commit.ts 2025-65-5-1 --apply  # write
 *
 * Run validate.ts FIRST — this script does not re-check chapter/subtopic names,
 * and a bad chapter name AUTO-CREATES a duplicate chapter rather than failing.
 *
 * PRIVATE + question_kind are set by a follow-up UPDATE scoped to source_file,
 * because commitStaged takes neither (visibility defaults to PUBLIC since
 * migration 0022, which is wrong for an unreviewed board transcription).
 *
 * ROLLBACK is a single statement, which is what makes this safe to re-run:
 *     delete from questions where source_file = '<sourceFile>';
 *
 * RE-COMMIT HAZARD: content_hash covers stem + options + ANSWER, so editing any
 * of those — including correcting a key — INSERTS a new row and orphans the old
 * one. Delete by source_file first. Editing only `solution` is safe; it is not
 * hashed. (The one deliberate exception is `context`: subjectiveContentHash is
 * context-aware, so a case-study sub-part's identity DOES move if its shared
 * passage is edited. Edit the passage and you must delete-and-recommit too.)
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { commitStaged } from "../../src/lib/upload/commit";
import { contentHash, subjectiveContentHash } from "../../src/lib/upload/hash";
import type { ParsedRowPayload, OptionLabel } from "../../src/lib/upload/validate";
import {
  DATA, ORG_ID, CREATED_BY, EXAM_ID_CBSE_12, SUBJECT_NAME, pyqNote, sourceFile,
} from "./config";

type Q = {
  ref: string; questionNumber: string; format: "mcq" | "subjective";
  chapter: string; subtopic: string; difficulty: string;
  stem: string; context?: string; solution?: string;
  options?: { label: string; text: string }[]; answer?: string;
  /** Explicit assertion that CBSE's marking scheme gives NO correct option. */
  _noCorrectOption?: boolean;
};
type Paper = { paper: string; year: number; questions: Q[] };

function buildRows(paper: Paper): ParsedRowPayload[] {
  const rows: ParsedRowPayload[] = [];
  const seen = new Set<string>();
  let sourceRow = 0;
  for (const q of paper.questions) {
    if (seen.has(q.ref)) throw new Error(`duplicate ref "${q.ref}"`);
    seen.add(q.ref);
    sourceRow++;
    const base = {
      sourceRow,
      questionNumber: q.questionNumber,
      subjectName: SUBJECT_NAME,
      chapterName: q.chapter,
      subtopicName: q.subtopic,
      text: q.stem,
      difficulty: q.difficulty as ParsedRowPayload["difficulty"],
      ...(q.context ? { context: q.context } : {}),
      ...(q.solution ? { solution: q.solution } : {}),
    };
    if (q.format === "subjective") {
      rows.push({
        ...base,
        questionFormat: "subjective",
        options: [],
        // Context-aware, so case-study siblings sharing a bare sub-item stem
        // ("Find dS/dx.") cannot dedup-collide across different case studies.
        contentHash: subjectiveContentHash(q.stem, q.context ?? null),
      });
      continue;
    }
    const opts = q.options ?? [];
    if (opts.length !== 4) throw new Error(`${q.ref}: mcq needs 4 options, has ${opts.length}`);
    // A keyless MCQ is allowed ONLY when the row asserts it deliberately. CBSE
    // does occasionally set a question whose correct answer is in none of its
    // options and says so in the marking scheme ("1 mark for any attempt as
    // correct answer is not given in any option" — 65/6/1 2025 Q16). We preserve
    // those rather than drop a real board question, per this project's standing
    // preserve-the-paper-defect convention.
    //
    // The opt-in is what makes it safe: a FORGOTTEN answer still throws, so
    // absence of a key can never silently become a keyless row.
    if (!q.answer && !q._noCorrectOption) {
      throw new Error(
        `${q.ref}: mcq has no answer. If CBSE's marking scheme genuinely gives no ` +
          `option, set "_noCorrectOption": true and record the scheme's wording in _flag.`
      );
    }
    if (q.answer && !opts.some((o) => o.label === q.answer)) {
      throw new Error(`${q.ref}: answer "${q.answer}" names no option`);
    }
    rows.push({
      ...base,
      questionFormat: "mcq",
      options: opts.map((o) => ({
        label: o.label as OptionLabel,
        text: o.text,
        isCorrect: o.label === q.answer,
      })),
      // `?? ""` for the deliberate keyless case above — the project's MCQ hash
      // includes the answer, so an unanswered row hashes with "" and would
      // re-hash if a key were ever added (which then needs delete-and-recommit).
      // Same handling as scripts/mh-hsc-12-pyq/lib.ts.
      contentHash: contentHash(q.stem, opts.map((o) => o.text), q.answer ?? ""),
    });
  }
  return rows;
}

async function main() {
  const id = process.argv[2];
  const apply = process.argv.includes("--apply");
  if (!id) throw new Error("usage: commit.ts <paperId> [--apply]");
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

  const paper = JSON.parse(readFileSync(join(DATA, `${id}.questions.json`), "utf8")) as Paper;
  const rows = buildRows(paper);
  const src = sourceFile(paper.year, paper.paper);

  console.log(`${paper.paper} (${paper.year}) — ${rows.length} rows`);
  console.log(`  source_file : ${src}`);
  console.log(`  mcq ${rows.filter((r) => r.questionFormat === "mcq").length} | subjective ${rows.filter((r) => r.questionFormat === "subjective").length}`);
  console.log(`  distinct content_hash: ${new Set(rows.map((r) => r.contentHash)).size} of ${rows.length}`);
  if (!apply) {
    console.log("\nDRY RUN — pass --apply to write.");
    return;
  }

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

  // ── PRE-FLIGHT: figure-dependent rows must never dedup SILENTLY ────────────
  // `image_url` is NOT part of content_hash, so two questions that differ ONLY
  // by their figure hash identically and commitStaged's upsert drops one without
  // a word. That is not hypothetical: 65/7/1 Q1 and 65/7/3 Q1 both read "The
  // given graph illustrates :" over the same four option texts and both key (A)
  // — but one graph is tan⁻¹ and the other sec⁻¹, so (A) denotes a DIFFERENT
  // function in each. Their hashes are byte-identical (verified).
  //
  // For a row whose stem says the figure IS the question, a hash match therefore
  // proves nothing. Refuse and let a human adjudicate; a genuine duplicate can
  // be re-run once its twin is confirmed identical.
  const figureRows = paper.questions
    .map((q, i) => ({ q, hash: rows[i].contentHash }))
    .filter(({ q }) => /REQUIRED/.test((q as { _figure?: string })._figure ?? ""));
  if (figureRows.length) {
    const { data: clashes, error: cErr } = await client
      .from("questions")
      .select("content_hash, source_file, question_number")
      .eq("org_id", ORG_ID)
      .eq("exam_id", EXAM_ID_CBSE_12)
      .in("content_hash", figureRows.map((f) => f.hash));
    if (cErr) throw new Error(`figure-collision pre-flight failed: ${cErr.message}`);
    // Adjudicated collisions: "same" lets the row dedup normally, "distinct"
    // means the hash cannot tell two real questions apart and the row is HELD
    // OUT rather than silently merged. Absent = unadjudicated = refuse.
    type Adj = { row: string; verdict: "same" | "distinct" };
    const adjPath = join(DATA, "hash-collisions.json");
    const adjudicated: Record<string, Adj["verdict"]> = Object.fromEntries(
      (JSON.parse(readFileSync(adjPath, "utf8")).collisions as Adj[]).map((c) => [c.row, c.verdict])
    );
    const held = new Set<string>();
    const foreign = (clashes ?? [])
      .filter((c) => c.source_file !== src)
      .filter((c) => {
        const mine = figureRows.find((f) => f.hash === c.content_hash);
        if (!mine) return false;
        const verdict = adjudicated[`${id}:${mine.q.ref}`];
        if (verdict === "same") return false; // confirmed duplicate — let it dedup
        if (verdict === "distinct") {
          held.add(mine.q.ref);
          return false; // held out below, not a blocker
        }
        return true; // unadjudicated — block
      });
    if (held.size) {
      for (const ref of held) {
        const i = paper.questions.findIndex((q) => q.ref === ref);
        rows.splice(i, 1);
        paper.questions.splice(i, 1);
      }
      console.log(
        `  HELD OUT ${held.size} adjudicated-distinct row(s): ${[...held].join(", ")}\n` +
          `    (different questions the content_hash cannot separate — see data/hash-collisions.json)`
      );
    }
    if (foreign.length) {
      console.error(
        `\n!! ${foreign.length} FIGURE-DEPENDENT row(s) already exist under another paper with the\n` +
          `   SAME content_hash. The hash cannot see the figure, so these may be different\n` +
          `   questions that would silently dedup. Adjudicate before committing:\n`
      );
      for (const c of foreign) {
        const mine = figureRows.find((f) => f.hash === c.content_hash)!;
        console.error(
          `   ${mine.q.ref} (${paper.paper})  vs  Q${c.question_number} of ${c.source_file}`
        );
      }
      console.error(
        `\n   If they ARE the same question, nothing is lost — re-run once confirmed.\n` +
          `   If they differ only by the printed figure, they need distinct rows.\n`
      );
      process.exit(1);
    }
  }

  const res = await commitStaged(client, {
    orgId: ORG_ID,
    examId: EXAM_ID_CBSE_12,
    filename: src,
    createdBy: CREATED_BY,
    rows,
    pyqYear: paper.year,
    // CBSE Class-12 board exams sit in Feb-March; this paper code's own sitting
    // month is not printed on the paper, so it is left NULL rather than guessed.
    pyqMonth: null,
    pyqNote: pyqNote(paper.year, paper.paper),
  });
  console.log(`\ninserted ${res.inserted} | skipped ${res.skipped} | failed ${res.failed}`);
  for (const e of res.errors) console.log(`  row ${e.sourceRow}: ${e.message}`);
  if (res.failed) process.exit(1);

  // ⚠ THE DANGEROUS WINDOW. commitStaged inserts at the table default, which is
  // PUBLIC since migration 0022 — so between the insert above and this UPDATE,
  // an unreviewed board transcription is LIVE on /browse. On the pilot run this
  // UPDATE hit a statement timeout (57014, the documented contention class) and
  // left 52 rows publicly visible until they were flipped by hand.
  //
  // So: retry, then VERIFY by reading back, and if anything is still PUBLIC say
  // so loudly with the exact SQL. Never report success from the absence of an
  // error — the pilot's failure was a returned error that the old code threw on
  // AFTER the rows were already live.
  // Flip BY PRIMARY KEY, never by source_file. `source_file` is UNINDEXED, so
  // `.eq("source_file", …)` is a Seq Scan over the whole questions table (55,553
  // rows to find 52; 1.27 s under EXPLAIN, and it exceeded the statement timeout
  // on both pilot runs). The ids are looked up through (org_id, exam_id,
  // content_hash) — the unique index from migration 0038 — so this is O(rows we
  // just wrote) instead of O(bank). An index on source_file would also fix it,
  // but questions is the most heavily written table here and this needs no
  // schema change at all.
  // ⚠ SCOPE THE LOOKUP TO THIS PAPER'S source_file. Without that filter this
  // flip corrupted a shipped row (2026-08-18): 2023 65/5/1 Q26 is verbatim an
  // NCERT solved example, so commitStaged SKIPPED the insert (the textbook row
  // already held that content_hash) — and the hash lookup then returned that
  // PRE-EXISTING practice row, which the flip dutifully set to PRIVATE + pyq.
  // A live, PUBLIC textbook question silently vanished from the public bank.
  //
  // The filter is what makes the flip touch only rows this commit owns. The
  // (org_id, exam_id, content_hash) index still drives the lookup; source_file
  // just narrows an already-tiny result set.
  const hashes = rows.map((r) => r.contentHash);
  const ids: string[] = [];
  for (let i = 0; i < hashes.length; i += 100) {
    const { data, error: sErr } = await client
      .from("questions")
      .select("id")
      .eq("org_id", ORG_ID)
      .eq("exam_id", EXAM_ID_CBSE_12)
      .eq("source_file", src)
      .in("content_hash", hashes.slice(i, i + 100));
    if (sErr) throw new Error(`id lookup failed: ${sErr.message}`);
    ids.push(...(data ?? []).map((d) => d.id as string));
  }
  // Fewer ids than rows is LEGITIMATE and expected: a row whose content already
  // exists under another source_file deduped away and is not ours to flip. More
  // ids than rows is impossible and would mean the filter failed.
  if (ids.length > rows.length) {
    throw new Error(`id lookup found ${ids.length} rows for ${rows.length} submitted — refusing to flip`);
  }
  if (ids.length < rows.length) {
    console.log(
      `  ${rows.length - ids.length} row(s) deduped into an EXISTING question under a different ` +
        `source_file — not flipped, and left exactly as they were.`
    );
  }
  for (let i = 0; i < ids.length; i += 100) {
    const { error: uErr } = await client
      .from("questions")
      .update({ visibility: "PRIVATE", question_kind: "pyq" })
      .in("id", ids.slice(i, i + 100));
    if (uErr) throw new Error(`flip failed: ${uErr.message}`);
  }

  // Verify by id too — same Seq Scan reason as the flip above.
  let stillPublic = 0;
  for (let i = 0; i < ids.length; i += 100) {
    const { count, error: vErr } = await client
      .from("questions")
      .select("id", { count: "exact", head: true })
      .in("id", ids.slice(i, i + 100))
      .eq("visibility", "PUBLIC");
    if (vErr) throw new Error(`could not VERIFY visibility: ${vErr.message}`);
    stillPublic += count ?? 0;
  }
  if (stillPublic) {
    console.error(
      `\n!! ${stillPublic} row(s) are STILL PUBLIC. Unreviewed content is live. Run now:\n` +
        `   update questions set visibility='PRIVATE', question_kind='pyq' where source_file='${src}';`
    );
    process.exit(1);
  }
  console.log(`verified: 0 rows PUBLIC for ${src}.`);
}

main().catch((e) => {
  console.error(e.message ?? e);
  process.exit(1);
});
