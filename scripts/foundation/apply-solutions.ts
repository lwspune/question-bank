/**
 * Write blind-derived solutions back onto Foundation Course questions.
 *
 *   npx tsx scripts/foundation/apply-solutions.ts <label>            # dry run
 *   npx tsx scripts/foundation/apply-solutions.ts <label> --apply
 *
 * Reads <label>.blind.json (the packet, which carries ref -> id), plus
 * <label>.derivedA.json and <label>.derivedB.json — two INDEPENDENT blind passes.
 *
 * A row is written only when ALL of these hold:
 *   1. both passes derived the same letter, and
 *   2. that letter equals the stored key, and
 *   3. the row currently has no solution.
 * Anything else is HELD and reported. That is the point: a disagreement between
 * two blind derivations and the stored key is a finding for a human to adjudicate,
 * not something a script should resolve by picking a side.
 *
 * GUARDS, each defending a failure this repo has actually shipped:
 *  - ref -> id PAIRING is re-derived from the packet, never positional. An agent
 *    that drops one row and pads the tail produces a PERMUTATION: the id set and
 *    the count both still match while every solution lands on the wrong question.
 *  - control characters and U+FFFD are refused. Authoring through a shell heredoc
 *    eats a backslash and leaves a TAB or VT where a LaTeX command belonged, which
 *    passes every delimiter check and renders as garbage.
 *  - double-escaped LaTeX is refused — it satisfies a balance check and prints as
 *    literal markup on the page.
 *
 * `solution` is NOT a content_hash input, so nothing here changes dedup identity.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { recordReviews } from "../../src/lib/reviews/service";
import type { ReviewInput } from "../../src/lib/reviews/record";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const BS = String.fromCharCode(92);

/**
 * Built from escape SEQUENCES, never literal bytes. A regex typed with real
 * control characters in it is itself the corruption this guard looks for, and it
 * is invisible in review — the first draft of this file shipped a NUL byte here.
 */
const CONTROL_RE = new RegExp("[\u0000-\u0008\u000B\u000C\u000E-\u001F]");
const REPLACEMENT_CHAR = "�";

function reject(solution: string): string | null {
  if (!solution || solution.trim().length === 0) return "empty solution";
  if (CONTROL_RE.test(solution)) return "contains a control character";
  if (solution.includes(REPLACEMENT_CHAR)) return "contains U+FFFD (mojibake)";
  if (solution.includes(BS + BS + "(")) return "double-escaped LaTeX";
  if (solution.includes("LLM-derived") || solution.includes("verify before PUBLIC")) {
    return "carries an internal provenance marker";
  }
  if (/\[[^\]]*\b(TODO|REVIEW)\b[^\]]*\]/i.test(solution)) return "carries a TODO/REVIEW bracket";
  return null;
}

async function main() {
  const label = process.argv[2];
  const apply = process.argv.includes("--apply");
  if (!label || label.startsWith("--")) throw new Error("usage: apply-solutions.ts <label> [--apply]");

  const dir = join("scripts", "foundation", "data");
  const packet = JSON.parse(readFileSync(join(dir, `${label}.blind.json`), "utf-8")) as any[];
  const A = JSON.parse(readFileSync(join(dir, `${label}.derivedA.json`), "utf-8")) as any[];
  const B = JSON.parse(readFileSync(join(dir, `${label}.derivedB.json`), "utf-8")) as any[];

  const idByRef = new Map<string, string>(packet.map((p) => [p.ref, p.id]));
  const aByRef = new Map(A.map((x) => [x.ref, x]));
  const bByRef = new Map(B.map((x) => [x.ref, x]));

  // Every ref in either pass must be a ref the packet actually issued.
  for (const r of [...aByRef.keys(), ...bByRef.keys()]) {
    if (!idByRef.has(r)) throw new Error(`unknown ref "${r}" — not in the packet. Refusing.`);
  }

  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const write: { ref: string; id: string; answer: string; solution: string; hash: string }[] = [];
  const held: { ref: string; why: string }[] = [];

  for (const p of packet) {
    const a = aByRef.get(p.ref);
    const b = bByRef.get(p.ref);
    if (!a || !b) {
      held.push({ ref: p.ref, why: `missing from pass ${!a ? "A" : "B"}` });
      continue;
    }
    if (a.derivedAnswer == null || b.derivedAnswer == null) {
      held.push({ ref: p.ref, why: "a pass marked it unanswerable" });
      continue;
    }
    if (a.derivedAnswer !== b.derivedAnswer) {
      held.push({ ref: p.ref, why: `passes disagree: A=${a.derivedAnswer} B=${b.derivedAnswer}` });
      continue;
    }

    const { data: q, error } = await client
      .from("questions")
      .select("id, solution, content_hash, options(label, is_correct)")
      .eq("id", p.id)
      .single();
    if (error || !q) throw new Error(`load ${p.id}: ${error?.message ?? "not found"}`);

    if (q.solution && String(q.solution).trim().length > 0) {
      held.push({ ref: p.ref, why: "already has a solution — refusing to clobber" });
      continue;
    }
    const stored = (q.options ?? [])
      .filter((o: any) => o.is_correct)
      .map((o: any) => o.label as string);
    if (stored.length !== 1) {
      held.push({ ref: p.ref, why: `stored key is [${stored.join(",")}], expected exactly one` });
      continue;
    }
    if (stored[0] !== a.derivedAnswer) {
      held.push({
        ref: p.ref,
        why: `BOTH blind passes derived ${a.derivedAnswer}, stored key is ${stored[0]} — needs human adjudication`,
      });
      continue;
    }
    const bad = reject(a.solution ?? "");
    if (bad) {
      held.push({ ref: p.ref, why: `solution rejected: ${bad}` });
      continue;
    }

    write.push({
      ref: p.ref,
      id: p.id,
      answer: a.derivedAnswer,
      solution: (a.solution as string).trim(),
      hash: q.content_hash as string,
    });
  }

  console.log(`${label}: ${write.length} to write, ${held.length} held\n`);
  for (const w of write) console.log(`  write ${w.ref}  key ${w.answer}  ${w.solution.length} chars`);
  if (held.length) {
    console.log("\nHELD — not written:");
    for (const h of held) console.log(`  ${h.ref}: ${h.why}`);
  }

  if (!apply) {
    console.log("\n[dry-run] pass --apply to write.");
    return;
  }

  const reviews: ReviewInput[] = [];
  for (const w of write) {
    const { error } = await client
      .from("questions")
      .update({ solution: w.solution })
      .eq("id", w.id);
    if (error) throw new Error(`solution ${w.id}: ${error.message}`);
    reviews.push({
      questionId: w.id,
      reviewedContentHash: w.hash,
      method: "blind_rederivation",
      verdict: "confirmed",
      runLabel: `foundation:${label}-blind-2026-08-22`,
      note:
        `Two independent blind passes (key and stored answer withheld; directions and figure supplied) ` +
        `both derived ${w.answer}, matching the stored key. Solution authored from that derivation; ` +
        `the row previously had none.`,
    });
  }
  console.log(`\n${write.length} solution(s) written.`);

  const res = await recordReviews(client, reviews);
  if (res.error) throw new Error(`question_reviews: ${res.error}`);
  console.log(`question_reviews: ${res.written} written (${res.accepted} of ${res.attempted})`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
