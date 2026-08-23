/**
 * Crosstab the Foundation Course blind derivations against the stored keys,
 * then (with --apply) write the derived working into `questions.solution` and
 * record the agreements in `question_reviews`.
 *
 * THREE THINGS THIS DELIBERATELY DOES NOT DO:
 *
 *  - It never writes a solution to a row whose key it DISAGREES with. A worked
 *    solution that concludes a different letter than the stored key is the
 *    exact defect `audit:keys` exists to catch, and shipping one would be worse
 *    than leaving the key bare.
 *  - It never touches options, stem or answer — only `solution`, which is NOT
 *    part of `content_hash`, so no row's identity moves and nothing has to be
 *    deleted and re-committed.
 *  - It records no verdict for a disagreement or an abstention. The Foundation
 *    Course has no official key either, so a mismatch means two derivations
 *    differ and nobody has concluded anything.
 *
 *   npx tsx scripts/bank-paper/apply-gk-derivations.ts <dir>           # report
 *   npx tsx scripts/bank-paper/apply-gk-derivations.ts <dir> --apply
 */
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
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
if (!dir) throw new Error("usage: apply-gk-derivations.ts <dir> [--apply]");

const RUN_LABEL = "bank-paper:foundation-gk-blind-2026-08-23";
const BAD_UNICODE = /[×÷≈→²³√θπ≤≥°∞∫Σ±]/;

type Blind = { id: string; chapter: string; difficulty: string; hasImage: boolean; stem: string };
type Derived = { id: string; derived: string | null; confidence: string; why: string; solution: string };

const read = <T>(f: string): T => JSON.parse(readFileSync(join(dir, f), "utf8")) as T;

async function main() {
  const blind = read<Blind[]>("blind.json");
  const stored = read<{ id: string; storedKey: string | null }[]>("stored-keys.json");
  const files = readdirSync(dir).filter((f) => f.startsWith("derived_") && f.endsWith(".json"));
  const derived: Derived[] = files.flatMap((f) => read<Derived[]>(f));

  const meta = new Map(blind.map((b) => [b.id, b]));
  const keyOf = new Map(stored.map((s) => [s.id, s.storedKey]));
  const derOf = new Map<string, Derived>();
  for (const d of derived) if (!derOf.has(d.id)) derOf.set(d.id, d);

  const agree: Derived[] = [];
  const disagree: { b: Blind; stored: string | null; d: Derived }[] = [];
  const abstain: { b: Blind; d: Derived }[] = [];
  const notDerived: Blind[] = [];
  const dirty: string[] = [];

  for (const b of blind) {
    const d = derOf.get(b.id);
    if (!d) { notDerived.push(b); continue; }
    if (!d.derived) { abstain.push({ b, d }); continue; }
    const k = keyOf.get(b.id) ?? null;
    if (d.derived !== k) { disagree.push({ b, stored: k, d }); continue; }
    // Style guards on what we are about to store as a student-facing solution.
    const sol = d.solution ?? "";
    if (!sol.trim()) dirty.push(`${b.id} empty solution`);
    else if (BAD_UNICODE.test(sol)) dirty.push(`${b.id} unicode maths in solution`);
    else if ((sol.match(/\\\(/g) ?? []).length !== (sol.match(/\\\)/g) ?? []).length)
      dirty.push(`${b.id} unbalanced LaTeX in solution`);
    else agree.push(d);
  }

  const covered = blind.length - notDerived.length;
  const pct = (n: number) => (covered ? `${((100 * n) / covered).toFixed(1)}%` : "n/a");
  console.log(`crosstab — ${covered} of ${blind.length} candidates derived (${files.join(", ")})`);
  if (notDerived.length) console.log(`  NOT DERIVED: ${notDerived.length}`);
  console.log(`AGREE     ${String(agree.length).padStart(3)}  ${pct(agree.length)}   (solution passes style checks)`);
  console.log(`DISAGREE  ${String(disagree.length).padStart(3)}  ${pct(disagree.length)}`);
  console.log(`ABSTAIN   ${String(abstain.length).padStart(3)}  ${pct(abstain.length)}   (deriver could not answer — usually a figure)`);
  if (dirty.length) {
    console.log(`REJECTED  ${String(dirty.length).padStart(3)}  — agreed on the key but the solution failed a style check:`);
    for (const x of dirty) console.log(`    ${x}`);
  }

  const bySubject = new Map<string, { a: number; n: number }>();
  for (const b of blind) {
    const s = b.chapter.slice(0, 3);
    const cur = bySubject.get(s) ?? { a: 0, n: 0 };
    cur.n += 1;
    if (agree.some((d) => d.id === b.id)) cur.a += 1;
    bySubject.set(s, cur);
  }
  console.log(`\nby subject:`);
  for (const [s, v] of [...bySubject].sort()) {
    console.log(`  ${s}  ${String(v.a).padStart(3)}/${String(v.n).padEnd(3)} usable  ${((100 * v.a) / v.n).toFixed(0)}%`);
  }

  if (disagree.length) {
    console.log(`\n${disagree.length} DISAGREEMENT(S) — a mismatch is a question, not a verdict:`);
    for (const r of disagree) {
      console.log(`  ${r.b.chapter.padEnd(42)} stored=${r.stored} derived=${r.d.derived} (${r.d.confidence})`);
    }
    writeFileSync(
      join(dir, "disagreements.json"),
      JSON.stringify(
        disagree.map((r) => ({ ...r.b, storedKey: r.stored, derived: r.d.derived, confidence: r.d.confidence, why: r.d.why })),
        null, 1
      ),
      "utf8"
    );
  }
  if (abstain.length) {
    console.log(`\n${abstain.length} ABSTENTION(S):`);
    for (const r of abstain) console.log(`  ${r.b.chapter.padEnd(42)} figure=${r.b.hasImage}  ${r.d.why.slice(0, 90)}`);
  }

  // Ids that are safe to build a paper from — agreed AND solution-clean.
  writeFileSync(join(dir, "usable-ids.json"), JSON.stringify(agree.map((d) => d.id), null, 1), "utf8");
  console.log(`\n${agree.length} usable id(s) -> ${join(dir, "usable-ids.json")}`);

  if (!apply) {
    console.log(`\n[report only] pass --apply to write solutions + record reviews.`);
    return;
  }

  const db = createClient(url!, key!, { auth: { persistSession: false } });

  // 1. solutions — `solution` is not in content_hash, so this cannot move a row's identity.
  let wrote = 0;
  for (const d of agree) {
    const { error } = await db.from("questions").update({ solution: d.solution }).eq("id", d.id);
    if (error) { console.log(`  solution FAILED ${d.id}: ${error.message}`); continue; }
    wrote += 1;
  }
  console.log(`solutions written: ${wrote}/${agree.length}`);

  // 2. reviews — hash read LIVE and AFTER the solution write, so it fingerprints
  //    the row as reviewed. (solution is not hashed, so it is unchanged either way.)
  const ids = agree.map((d) => d.id);
  const hash = new Map<string, string>();
  for (let i = 0; i < ids.length; i += 200) {
    const { data, error } = await db.from("questions").select("id, content_hash").in("id", ids.slice(i, i + 200));
    if (error) throw new Error(error.message);
    for (const q of data ?? []) hash.set(q.id as string, q.content_hash as string);
  }
  const inputs: ReviewInput[] = agree
    .filter((d) => hash.has(d.id))
    .map((d) => ({
      questionId: d.id,
      reviewedContentHash: hash.get(d.id)!,
      method: "blind_rederivation",
      verdict: "confirmed",
      runLabel: RUN_LABEL,
      note:
        `Blind re-derivation (key withheld at dump time) agreed with the stored key; ` +
        `the derivation was also stored as the question's solution, which this corpus lacked. ` +
        `Deriver self-confidence: ${d.confidence}.`,
    }));
  const res = await recordReviews(db, inputs);
  console.log(`reviews: attempted ${res.attempted} · accepted ${res.accepted} · written ${res.written}`);
  for (const r of res.rejected) console.log(`   REJECTED ${JSON.stringify(r)}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
