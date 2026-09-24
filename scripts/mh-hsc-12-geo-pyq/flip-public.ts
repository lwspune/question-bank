/**
 * Flip the ANSWERED subset of a committed MH HSC Class-12 Geography board paper
 * to PUBLIC.
 *
 *   npx tsx scripts/mh-hsc-12-geo-pyq/flip-public.ts <paperId>          # dry-run
 *   npx tsx scripts/mh-hsc-12-geo-pyq/flip-public.ts <paperId> --apply  # write
 *
 * Ship rule: a row is PUBLIC iff it carries an answer.
 *   - MCQ  → has a correct option set (a DERIVED key).
 *   - subjective → solution IS NOT NULL (an AUTHORED model answer).
 * A row with neither stays PRIVATE.
 *
 * ⚠ IT ALSO REFUSES TO PUBLISH AN UNSTAMPED ROW. Every answer on this lane is
 * ours — a board question paper prints no key and no solutions — so a published
 * answer that does not announce itself reads to a student as an official board
 * key. That defect was caught on CDS General Knowledge at the publish gate, one
 * step too late, so the check here is a REFUSAL rather than a warning and keys
 * on `derived_model` (a structured column written by stamp-provenance.ts) rather
 * than on a prose match, which would break silently when wording changes.
 *
 * This paper corpus carries NO figures — every one of the six papers was read
 * page by page and the only graphics are the map and graph of Q4(B), whose
 * content is inlined as text in the question's `context`. So there is no
 * snapCrop verify-gate to clear here, unlike the Geometry lane this was copied
 * from. Pass --except=<refs> to hold specific question_numbers PRIVATE anyway.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { EXAM_ID, requirePaper } from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

async function main() {
  const id = process.argv[2];
  const apply = process.argv.includes("--apply");
  const exceptArg = process.argv.find((a) => a.startsWith("--except="));
  const except = exceptArg ? exceptArg.slice("--except=".length).split(",").map((s) => s.trim()).filter(Boolean) : [];
  const paper = requirePaper(id);
  loadEnv();

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  // Answered rows: subjective with a solution, OR mcq with a correct option.
  const { data: rows, error } = await client
    .from("questions")
    .select("id, question_number, question_format, solution, derived_model, options(is_correct)")
    .eq("exam_id", EXAM_ID)
    .eq("source_file", paper.sourceFile);
  if (error) throw new Error(`read failed: ${error.message}`);

  const answered = (rows ?? []).filter((r) => {
    if (except.includes(r.question_number ?? "")) return false;
    if (r.question_format === "subjective") return r.solution != null && r.solution !== "";
    return (r.options ?? []).some((o: { is_correct: boolean }) => o.is_correct);
  });
  const total = rows?.length ?? 0;
  console.log(`Geography ${paper.month} ${paper.year} (${id}): ${answered.length}/${total} rows answered → PUBLIC candidates.`);

  // Every answer here is derived or authored by us, so every published row must
  // say so. Refuse rather than warn — see the header.
  const unstamped = answered.filter((r) => !r.derived_model);
  if (unstamped.length) {
    throw new Error(
      `refusing to publish — ${unstamped.length} of ${answered.length} answered row(s) carry no ` +
        `derived_model stamp, so they would read as an official board key. Run ` +
        `stamp-provenance.ts ${id} --apply first. First few: ` +
        unstamped.slice(0, 8).map((r) => r.question_number).join(", ")
    );
  }
  if (except.length) console.log(`  holding PRIVATE (--except): ${except.join(", ")}`);

  if (!apply) {
    console.log("[dry-run] pass --apply to flip these to PUBLIC.");
    return;
  }
  if (answered.length === 0) {
    console.log("nothing to flip.");
    return;
  }

  const { error: uErr, count } = await client
    .from("questions")
    .update({ visibility: "PUBLIC" }, { count: "exact" })
    .in("id", answered.map((r) => r.id));
  if (uErr) throw new Error(`flip failed: ${uErr.message}`);
  console.log(`flipped ${count} rows to PUBLIC.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
