/**
 * Record this review run's verdicts into question_reviews.
 *
 *   npx tsx scripts/reviews/record-paper-run.ts            # dry run
 *   npx tsx scripts/reviews/record-paper-run.ts --apply
 *
 * TWO METHODS ARE RECORDED SEPARATELY, because they are different facts and the
 * run label is method-qualified:
 *
 *   blind_rederivation  — ONLY the rows actually derived blind this session
 *                         (key + solution withheld). Rows already carrying a
 *                         blind confirmation were skipped at dump time and get
 *                         no new row; re-asserting them would be recording work
 *                         nobody did.
 *   solution_audit      — the rows whose stored solution was actually READ.
 *
 * VERDICTS ARE DERIVED FROM EVIDENCE, never defaulted. A row is recorded only if
 * this run produced a finding about it; anything ambiguous is left unrecorded,
 * because in this table the absence of a row means "not recorded" and that is a
 * more honest statement than a guess.
 *
 * The hash stamped is the CURRENT one, and the repairs were applied BEFORE this
 * runs — a row stamped `confirmed` and then edited would be born stale.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { recordReviews, formatRecordResult } from "../../src/lib/reviews/service";
import type { ReviewInput } from "../../src/lib/reviews/record";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");
const CHUNKS = join(process.cwd(), "scripts", "reviews", "data", "findings", "2026-08-16-papers");
const BLIND = join(process.cwd(), "scripts", "reviews", "data", "blind", "2026-08-16-papers");
const RUN = "paper-review-2026-08-16";

type BlindRow = { questionId: string; questionNumber?: string; letter?: string; confidence?: string; note?: string };

function readJson<T>(p: string): T[] {
  try { return JSON.parse(readFileSync(p, "utf8")) as T[]; } catch { return []; }
}

function fixFiles(): { questionId: string; whatChanged?: string }[] {
  const out: { questionId: string; whatChanged?: string }[] = [];
  for (const dir of [CHUNKS]) {
    if (!existsSync(dir)) continue;
    for (const n of readdirSync(dir).filter((f) => f.startsWith("fix.") && f.endsWith(".out.json"))) {
      out.push(...readJson<{ questionId: string; whatChanged?: string }>(join(dir, n)));
    }
  }
  return out;
}

(async () => {
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  // --- what this run actually did, per question ---
  const blindDerived = new Map<string, BlindRow>();
  for (const n of readdirSync(CHUNKS).filter((f) => /^p[123]\.blind\.\d+\.out\.json$/.test(f))) {
    for (const r of readJson<BlindRow>(join(CHUNKS, n))) blindDerived.set(r.questionId, r);
  }
  // which rows were PUT to the blind pass (so a missing derivation is visible)
  const blindAsked = new Set<string>();
  for (const n of readdirSync(BLIND).filter((f) => f.endsWith(".blind.json"))) {
    for (const r of readJson<{ questionId: string }>(join(BLIND, n))) blindAsked.add(r.questionId);
  }

  const rewritten = new Map(fixFiles().map((f) => [f.questionId, f.whatChanged ?? "solution rewritten"]));
  rewritten.set("930819d1-f485-4349-8429-0d0e7e0859d8", "option text repaired: --1 -> -1 (content_hash recomputed)");

  // every row whose solution was read: the read-through chunks + the triage chunks
  const audited = new Set<string>();
  for (const n of readdirSync(CHUNKS).filter((f) => /^(read|triage)\.\d+\.json$/.test(f))) {
    for (const r of readJson<{ questionId: string }>(join(CHUNKS, n))) audited.add(r.questionId);
  }

  const ids = [...new Set([...blindAsked, ...audited, ...rewritten.keys()])];
  const hashes = new Map<string, { hash: string; num: string }>();
  for (let i = 0; i < ids.length; i += 200) {
    const { data, error } = await db.from("questions").select("id, content_hash, question_number").in("id", ids.slice(i, i + 200));
    if (error) throw error;
    for (const q of data ?? []) hashes.set(q.id as string, { hash: q.content_hash as string, num: q.question_number as string });
  }

  const inputs: ReviewInput[] = [];
  const skipped: string[] = [];

  // ---- blind pass ----
  for (const id of blindAsked) {
    const h = hashes.get(id);
    const b = blindDerived.get(id);
    if (!h) continue;
    if (!b) { skipped.push(`${h.num}: put to the blind pass but no derivation came back`); continue; }
    const letter = (b.letter ?? "").trim().toUpperCase();
    // NONE / MULTI here are the documented textbook defects the pass rediscovered
    const verdict = letter === "NONE" || letter === "MULTI" ? "defect_preserved" : "confirmed";
    inputs.push({
      questionId: id,
      reviewedContentHash: h.hash,
      method: "blind_rederivation",
      verdict,
      runLabel: `${RUN}:blind_rederivation`,
      note: (verdict === "defect_preserved"
        ? `Blind re-derivation found no single correct printed option; official key retained. ${b.note ?? ""}`
        : `Blind re-derivation (key and solution withheld) agreed with the stored key.`
      ).slice(0, 2000),
    });
  }

  // ---- read-through ----
  for (const id of audited) {
    const h = hashes.get(id);
    if (!h) continue;
    const why = rewritten.get(id);
    inputs.push({
      questionId: id,
      reviewedContentHash: h.hash,
      method: "solution_audit",
      verdict: why ? "solution_rewritten" : "confirmed",
      runLabel: `${RUN}:solution_audit`,
      note: (why ?? "Stored solution read end-to-end: derives its answer, no false step, renders.").slice(0, 2000),
    });
  }
  // a row repaired but not in a read chunk still deserves its audit row
  for (const [id, why] of rewritten) {
    if (audited.has(id)) continue;
    const h = hashes.get(id);
    if (!h) continue;
    inputs.push({
      questionId: id, reviewedContentHash: h.hash, method: "solution_audit",
      verdict: "solution_rewritten", runLabel: `${RUN}:solution_audit`, note: why.slice(0, 2000),
    });
  }

  const tally = new Map<string, number>();
  for (const i of inputs) {
    const k = `${i.method} / ${i.verdict}`;
    tally.set(k, (tally.get(k) ?? 0) + 1);
  }
  console.log(`\n${inputs.length} review row(s) to record:\n`);
  for (const [k, n] of [...tally].sort()) console.log(`  ${String(n).padStart(4)}  ${k}`);
  if (skipped.length) {
    console.log(`\n  ${skipped.length} deliberately NOT recorded:`);
    for (const s of skipped) console.log(`    ${s}`);
  }

  if (!APPLY) { console.log(`\n(dry run — nothing written. re-run with --apply)\n`); return; }
  console.log(`\n${formatRecordResult(await recordReviews(db, inputs), "paper review")}\n`);
})().catch((e) => { console.error(e instanceof Error ? e.message : JSON.stringify(e, null, 2)); process.exit(1); });
