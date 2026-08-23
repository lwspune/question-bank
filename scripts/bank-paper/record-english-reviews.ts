/**
 * Persist the CDS English blind re-derivation into `question_reviews`.
 *
 * WHY. The check that produced this evidence lives in a scratch directory that
 * will be deleted. Without a row, the next session finds only the stale
 * "CDS ENGLISH WAS TRIED AND REJECTED" comment in build.ts and re-litigates the
 * whole thing — which is precisely the failure migration 0074 exists to prevent
 * ("NO ROW means NOT RECORDED, which is not the same as not reviewed").
 *
 * WHAT IS AND IS NOT RECORDED. Only rows where the blind derivation AGREED with
 * the stored key are written, as `confirmed`. A disagreement gets NO ROW: this
 * corpus has no official key, so a mismatch means two derivations differ and
 * nobody has concluded anything. Writing a verdict there would assert an outcome
 * no one reached — the same rule the report-triage emitter follows.
 *
 * The confidence the DERIVING agent assigned itself is kept in `note`, because
 * it turned out to be predictive (HIGH agreed 71/72; every disagreement but one
 * was MED) and a later pass will want to know which rows carried it.
 *
 *   npx tsx scripts/bank-paper/record-english-reviews.ts <dir>          # dry run
 *   npx tsx scripts/bank-paper/record-english-reviews.ts <dir> --apply
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { recordReviews } from "../../src/lib/reviews/service";
import type { ReviewInput } from "../../src/lib/reviews/record";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error("missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");

const dir = process.argv[2];
const apply = process.argv.includes("--apply");
if (!dir) throw new Error("usage: record-english-reviews.ts <dir> [--apply]");

const RUN_LABEL = "bank-paper:cds-english-blind-2026-08-23";

type Blind = { id: string; chapter: string; sourceFile: string | null; questionNumber: string | null };
type Derived = { id: string; derived: string; confidence: string; why: string };

const read = <T>(f: string): T => JSON.parse(readFileSync(join(dir, f), "utf8")) as T;

async function main() {
  const blind = read<Blind[]>("blind.json");
  const stored = read<{ id: string; storedKey: string | null }[]>("stored-keys.json");
  const derived: Derived[] = readdirSync(dir)
    .filter((f) => f.startsWith("derived_") && f.endsWith(".json"))
    .flatMap((f) => read<Derived[]>(f));

  const meta = new Map(blind.map((b) => [b.id, b]));
  const keyOf = new Map(stored.map((s) => [s.id, s.storedKey]));
  const derOf = new Map(derived.map((d) => [d.id, d]));

  const db = createClient(url!, key!, { auth: { persistSession: false } });

  // The hash must be read LIVE, not carried from the dump — it fingerprints the
  // question AS REVIEWED, so a stem repaired later makes the verdict queryably
  // stale rather than silently trusted.
  const ids = blind.map((b) => b.id);
  const hash = new Map<string, string>();
  for (let i = 0; i < ids.length; i += 200) {
    const { data, error } = await db
      .from("questions")
      .select("id, content_hash")
      .in("id", ids.slice(i, i + 200));
    if (error) throw new Error(error.message);
    for (const q of data ?? []) hash.set(q.id as string, q.content_hash as string);
  }

  const inputs: ReviewInput[] = [];
  const skipped: string[] = [];
  for (const b of blind) {
    const d = derOf.get(b.id);
    const k = keyOf.get(b.id) ?? null;
    const where = `${b.chapter} ${b.sourceFile} Q${b.questionNumber}`;
    if (!d) {
      skipped.push(`${where} — no derivation`);
      continue;
    }
    if (d.derived !== k) {
      skipped.push(`${where} — DISPUTED (stored ${k}, derived ${d.derived}); no verdict recorded`);
      continue;
    }
    const h = hash.get(b.id);
    if (!h) {
      skipped.push(`${where} — no content_hash found`);
      continue;
    }
    inputs.push({
      questionId: b.id,
      reviewedContentHash: h,
      method: "blind_rederivation",
      verdict: "confirmed",
      runLabel: RUN_LABEL,
      note:
        `Blind re-derivation WITH the directions/context supplied, agreed with the stored key. ` +
        `Deriver self-confidence: ${d.confidence}. ` +
        `Run re-tested the build.ts claim that CDS English carries a 33% defect rate; ` +
        `that check had omitted the directions field and mis-read antonym items as synonym items.`,
    });
  }

  console.log(`run label: ${RUN_LABEL}`);
  console.log(`blind rows      : ${blind.length}`);
  console.log(`to record       : ${inputs.length}  (verdict=confirmed, method=blind_rederivation)`);
  console.log(`NOT recorded    : ${skipped.length}`);
  for (const s of skipped) console.log(`   - ${s}`);

  if (!apply) {
    console.log(`\n[dry-run] pass --apply to write. Nothing inserted.`);
    return;
  }
  const res = await recordReviews(db, inputs);
  console.log(
    `\nattempted ${res.attempted} · accepted ${res.accepted} · written ${res.written}`
  );
  for (const r of res.rejected) console.log(`   REJECTED ${JSON.stringify(r)}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
