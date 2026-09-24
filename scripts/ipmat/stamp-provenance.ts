/**
 * Stamp ANSWER PROVENANCE on the IPMAT rows, before anything goes PUBLIC.
 *
 *   npx tsx scripts/ipmat/stamp-provenance.ts            # dry run
 *   npx tsx scripts/ipmat/stamp-provenance.ts --apply
 *   npx tsx scripts/ipmat/stamp-provenance.ts --exam=ipmat-indore --apply
 *
 * WHY. IIM Indore publishes no answer key and afterboards claims none, so every
 * key in this corpus is **afterboards' own derivation**, which we ingested. The
 * bank has no other row with that provenance: every existing `derived_model`
 * value names either OUR derivation ("claude-opus-5 …") or an official key
 * ("official UPSC provisional key …"). A third party's unofficial derivation is
 * a third thing, and leaving the column null would file these rows with the
 * ones nobody has characterised at all.
 *
 * The rule this follows is `[[derived-provenance-at-commit]]`: for a key-less
 * corpus provenance belongs at COMMIT, not at publish. This lane missed it at
 * commit, so it is being paid here — before the flip rather than after, which is
 * the ordering the CDS General Knowledge defect established.
 *
 * WHAT IT DOES NOT CLAIM. The per-row stamp says where the answer came from and
 * nothing about how good it is. The corpus-level measurement — 124 rows blind-
 * scored across all three subjects, 0 wrong keys, rate bounded under ~2.4% at
 * 95% — is a property of the SAMPLE, not of any given row, so it lives in
 * `data/derive/KEY_TRUST.md` and deliberately not in this string.
 *
 * It does NOT touch `pyq_note`, which carries the SITTING ("2024") and is what
 * `publicPyqNote` publishes. `derived_model` is internal: nothing in `src/`
 * renders it, so this is a structured record for us, not a student-facing
 * notice. `flip-public.ts` keys its gate on the column rather than on prose, so
 * the gate cannot break silently when wording changes.
 *
 * Idempotent: writes only where `derived_model` is absent, so a re-run is a
 * no-op.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { IPMAT_EXAMS, type IpmatExamSlug } from "./config";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

/** `.in()` puts the id list in the URL — chunk the FILTER, not the result. */
const CHUNK = 200;

export const DERIVED_MODEL =
  "afterboards.in (third-party derivation; IIM publishes no official key)";

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
  const wanted = examArg ? IPMAT_EXAMS.filter((e) => e.slug === examArg) : IPMAT_EXAMS;
  if (wanted.length === 0) throw new Error(`unknown --exam=${examArg}`);

  const db = makeClient();
  const { data: examRows, error: exErr } = await db
    .from("exams")
    .select("id, name")
    .in("name", wanted.map((e) => e.examName));
  if (exErr) throw new Error(`exam read failed: ${exErr.message}`);
  const idByName = new Map((examRows ?? []).map((e) => [e.name as string, e.id as string]));

  let totalNeeding = 0;
  let totalStamped = 0;

  for (const exam of wanted) {
    const examId = idByName.get(exam.examName);
    if (!examId) throw new Error(`no exams row for "${exam.examName}"`);

    const rows: { id: string; derived_model: string | null }[] = [];
    for (let from = 0; ; from += 500) {
      const { data, error } = await db
        .from("questions")
        .select("id, derived_model")
        .eq("exam_id", examId)
        .range(from, from + 499);
      if (error) throw new Error(`read failed: ${error.message}`);
      if (!data?.length) break;
      rows.push(...(data as typeof rows));
      if (data.length < 500) break;
    }

    const needing = rows.filter((r) => !r.derived_model);
    totalNeeding += needing.length;
    console.log(
      `${exam.examName.padEnd(14)} ${rows.length} rows · ${needing.length} unstamped` +
        (needing.length === 0 ? "  (already done)" : "")
    );
    if (!apply || needing.length === 0) continue;

    const stampedAt = new Date().toISOString();
    for (let i = 0; i < needing.length; i += CHUNK) {
      const ids = needing.slice(i, i + CHUNK).map((r) => r.id);
      const { error, count } = await db
        .from("questions")
        .update({ derived_model: DERIVED_MODEL, derived_at: stampedAt }, { count: "exact" })
        .in("id", ids);
      if (error) throw new Error(`stamp failed: ${error.message}`);
      totalStamped += count ?? 0;
    }
  }

  console.log("");
  if (!apply) {
    console.log(`[dry run] ${totalNeeding} row(s) would be stamped:`);
    console.log(`          derived_model = ${JSON.stringify(DERIVED_MODEL)}`);
    console.log("          pass --apply to write.");
    return;
  }
  console.log(`stamped ${totalStamped} row(s).`);
}

void main();
