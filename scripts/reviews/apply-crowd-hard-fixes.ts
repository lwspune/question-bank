/**
 * The "beat the crowd" key check (2026-10-04): fixes and review records for
 * every question the tiered crowd message could fire on.
 *
 *   npx tsx scripts/reviews/apply-crowd-hard-fixes.ts            # dry run
 *   npx tsx scripts/reviews/apply-crowd-hard-fixes.ts --apply
 *
 * SCOPE. Pooled question_item_stats with attempted >= 20 and a wrong share
 * >= 70%: 94 questions on 2026-10-04 (59 NDA Maths, 16 NDA English, the rest
 * GK, CDS English and practice sets). Each was re-derived by hand; the six
 * whose answer turns on wording were read against the UPSC scan.
 *
 * WHY THIS SET. A question most students get wrong is exactly where a wrong
 * key hides (all 45 questions at 80%+ wrong had a distractor as the most-picked
 * option), and the tiered message would otherwise say "Genius" to a student
 * for agreeing with a wrong key. Only a question recorded here as checked can
 * carry the message (lib/celebrate/crowd.ts).
 *
 * WHAT IT CHANGES, all verified against the source paper:
 *   1ee4d0d6  NDA 2018-I Q34   key B -> D (S P R Q); labels match the scan
 *   8390d73a  NDA 2017-I Q77   statement 2 lost its "=": the paper prints
 *                              "... - 4(fofof)(1) = (fof)(0)", true (6 = 6),
 *                              so the key moves A -> C
 *   35482460  NDA 2023-II Q25  stem said f(x)f(y); the paper prints f(x)/f(y).
 *                              Key D unchanged
 * plus five solutions whose working was wrong under a right key.
 *
 * WHAT IT DOES NOT CHANGE: three items where the paper as printed and the
 * setter's evident intent disagree (2023-II Q24, 2022-I Q42, 2019-II Q42),
 * with no official UPSC key in hand to adjudicate. They are recorded as
 * `unverifiable` with the argument, for the owner's decision.
 *
 * SAFETY: every edited row's live hash, key and the substring being replaced
 * are asserted before any write, and the script refuses on any mismatch. The
 * uuid is kept, so mocks (which store ids only), tags and attempts survive.
 * AFTER --apply, regrade the two mocks whose keys moved:
 *   npx tsx scripts/reviews/regrade-attempt.ts nda-2017-apr-maths --apply --allow-lower
 *   npx tsx scripts/reviews/regrade-attempt.ts nda-2018-apr-gat --apply --allow-lower
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { contentHash } from "../../src/lib/upload/hash";
import { CROWD_REVIEW_RUNS } from "../../src/lib/celebrate/crowd";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");
export const RUN_LABEL = CROWD_REVIEW_RUNS[0];
const MODEL = "claude-opus-5-5";
const MIN_N = 20;
const MIN_WRONG = 0.7;
const EXPECTED_SET_SIZE = 94;

type Edit = {
  id: string;
  /** Exact substring of `text` to replace, and its replacement. */
  stem?: { from: string; to: string };
  key?: { from: string; to: string };
  solution?: string;
  verdict: "key_fixed" | "stem_fixed" | "solution_rewritten";
  note: string;
};

const EDITS: Edit[] = [
  {
    id: "1ee4d0d6-1477-4142-a47c-687c9db1a415",
    key: { from: "B", to: "D" },
    verdict: "key_fixed",
    note: "NDA 2018-I Q34. Labels and options checked against the UPSC scan (p6). S continues S1 with 'its members', P completes S, R opens the next sentence and Q completes it; S6 refers back to the qualities in Q. Order S P R Q = (d). Stored key B (Q R S P) cannot follow S1. 19 of 23 tracker students picked D.",
    solution: String.raw`S1 introduces the Indian Civil Service, and S continues it: "Its members exercised vast power". P completes that sentence: "and often participated in the making of policy". R then opens a new sentence, "They developed certain traditions of", which Q completes: "independence, integrity and hard work". S6, "though these qualities obviously served British, and not Indian interests", refers back to the qualities named in Q. The order is S P R Q. Matches option D.`,
  },
  {
    id: "8390d73a-c1d8-4766-b0ba-0aae25046f3b",
    stem: { from: String.raw` - (f\circ f)(0)\)`, to: String.raw` = (f\circ f)(0)\)` },
    key: { from: "A", to: "C" },
    verdict: "key_fixed",
    note: "NDA 2017-I Q77. The UPSC scan (p27) prints statement 2 as (fofof)(-1) - 4(fofof)(1) = (fof)(0); the bank had lost the '=' and so asserted nothing. Both sides equal 6, so statement 2 is true and the answer is (c) Both. Stem repaired and key moved A -> C.",
    solution: String.raw`\(f(x) = x^2 - 3\), so \(f(1) = f(-1) = -2\) and \(f(-2) = 1\). Then \((f\circ f\circ f)(1) = f(f(-2)) = f(1) = -2\), and in the same way \((f\circ f\circ f)(-1) = -2\). Statement 1 is correct.
Statement 2: the left side is \(-2 - 4(-2) = 6\). The right side is \((f\circ f)(0) = f(-3) = 9 - 3 = 6\). The two agree, so statement 2 is correct.
Both statements are correct. Matches option C.`,
  },
  {
    id: "35482460-2fde-4684-819e-2f2230a2a8b1",
    stem: { from: String.raw`\(f(x-y)=f(x)f(y)\)`, to: String.raw`\(f(x-y)=\frac{f(x)}{f(y)}\)` },
    verdict: "stem_fixed",
    note: "NDA 2023-II Q25. The paper (UPSC scan, and the LWS Gyanam .docx) prints f(x-y) = f(x)/f(y); the bank had f(x)f(y), which forces f(x)^2 = 1 and contradicts f(1) = 0.5. Key D (31/64) unchanged.",
    solution: String.raw`Put \(x = y\): \(f(0) = \frac{f(x)}{f(x)} = 1\). Put \(x = 0\): \(f(-y) = \frac{1}{f(y)}\). Then \(f(x+y) = f(x-(-y)) = \frac{f(x)}{f(-y)} = f(x)\,f(y)\), so \(f(n) = f(1)^n = \left(\frac{1}{2}\right)^n\).
\(f(2)+f(3)+f(4)+f(5)+f(6) = \frac{1}{4}+\frac{1}{8}+\frac{1}{16}+\frac{1}{32}+\frac{1}{64} = \frac{31}{64}\). Matches option D.`,
  },
  {
    id: "a9ff826f-fa9f-49da-82f5-85f401afecf7",
    verdict: "solution_rewritten",
    note: "NDA 2017-I. Key D right; the old solution called f-g the identity, but (f-g)(x) = -x on irrationals.",
    solution: String.raw`\((f-g)(x) = f(x) - g(x)\). For rational \(x\) this is \(x - 0 = x\); for irrational \(x\) it is \(0 - x = -x\).
One-one: two rationals, or two irrationals, with the same image are equal. A rational \(a\) and an irrational \(b\) cannot share an image, because \(a = -b\) would make \(b\) rational.
Onto: a rational \(t\) is the image of \(t\), and an irrational \(t\) is the image of \(-t\), which is irrational.
So \(f-g\) is one-one and onto. Matches option D.`,
  },
  {
    id: "45481b26-cb41-4152-a540-e0878cac2853",
    verdict: "solution_rewritten",
    note: "LWS mock 6. Key A right; the old solution said f'(x) > 0 for all x, but 1 - sin x is 0 at x = pi/2 + 2n pi.",
    solution: String.raw`\(f'(x) = 1 - \sin x \ge 0\) for every \(x\), and it equals 0 only at the isolated points \(x = \frac{\pi}{2} + 2n\pi\). A derivative that is never negative and is zero only at isolated points makes the function strictly increasing on all of \(\mathbb{R}\). Matches option A.`,
  },
  {
    id: "e2894b68-d7be-4e60-9f10-fd099f3ea067",
    verdict: "solution_rewritten",
    note: "NDA 2021-II. Key C (8) right; the old solution put the centres at (+-r, +-r, +-r), which is a sphere touching the coordinate PLANES.",
    solution: String.raw`Let the centre be \((a, b, c)\). Its distance from the x-axis is \(\sqrt{b^2+c^2}\), from the y-axis \(\sqrt{a^2+c^2}\) and from the z-axis \(\sqrt{a^2+b^2}\). Touching all three axes means each distance is \(r\), which gives \(a^2 = b^2 = c^2 = \frac{r^2}{2}\), so each of \(a, b, c\) is \(\pm\frac{r}{\sqrt{2}}\). The three independent signs give \(2^3 = 8\) spheres. Matches option C.`,
  },
  {
    id: "add0a84e-a0cb-487c-a56d-1222c01938ab",
    verdict: "solution_rewritten",
    note: "NDA 2024-I. Key D right; the old working trailed off mid-line before the conclusion.",
    solution: String.raw`\(f(g(x)) = a(cx+d) - b = acx + ad - b\) and \(g(f(x)) = c(ax-b) + d = acx - bc + d\). They are equal for all \(x\), so \(ad - b = d - bc\).
Then \(f(d) + g(b) = (ad - b) + (cb + d) = (d - bc) + bc + d = 2d\). Matches option D.`,
  },
  {
    id: "65d9638b-d893-4ba3-8ab6-86f5c966fafb",
    verdict: "solution_rewritten",
    note: "LWS weekly mock 1. Key D right; the old solution opened with a bolded wrong value before computing the right one.",
    solution: String.raw`\(np = 4\) and \(npq = 3\) give \(q = \frac{3}{4}\), \(p = \frac{1}{4}\) and \(n = 16\).
\(P(X = 1) = \binom{16}{1}\left(\frac{1}{4}\right)\left(\frac{3}{4}\right)^{15} = 4\left(\frac{3}{4}\right)^{15}\).
None of options A, B and C equals this (C states the parameters, not a probability), so the answer is D.`,
  },
];

/** Reviewed and left as they are: the key is not settled, or the item has two
 *  defensible answers. Never eligible for the crowd message. */
const UNVERIFIABLE: Record<string, string> = {
  "7847127c-3651-487c-bb83-d72e74769154":
    "NDA 2023-II Q24. The UPSC scan (p9) prints statement 1 as A = (A u B) u (A - B), which is false (it equals A u B). As printed the answer is (b) 2 and 3 only; the stored key (d) assumes the setter meant (A n B) u (A - B), as the Gyanam key does. No official key in hand: owner's decision.",
  "bd3068d7-fb0e-4eee-83a3-4e767d2c5416":
    "NDA 2022-I Q42. The UPSC scan (p15) prints statement 1 as: x not in (A u B) => x not in A OR x not in B. As printed it is TRUE (not in A and not in B implies not in A or not in B), so the answer is (a) 1 only; the stored key (d) treats it as the De Morgan trap the setter probably intended. No official key in hand: owner's decision.",
  "167fd0a7-6dc0-4495-ad7e-30c437e26e90":
    "NDA 2019-II Q42. Printed with no range for theta (UPSC scan p13). tan + cot is negative for obtuse theta, so 'can never be less than 2' is false as printed and the answer is (a) 1 only; the stored key (c) assumes theta acute. No official key in hand: owner's decision.",
  "1f29eadb-b776-48c6-8eaa-7c051da8185a": "LWS GAT mock W011. 'To sum up' (key) and 'In any case' both complete the sentence; two defensible answers.",
  "c6523886-cc52-45c1-aed7-13043b458d9d": "LWS GAT mock W011. 'Therefore' and 'Consequently' both fit naturally; the key 'Incidentally' rests on eliminating them as a pair. Item is defective.",
  "eddb22e6-b46c-4d51-af19-1a674d69c297": "NDA 2026-I. 'until you see the light turn green' (A) is as correct as the keyed 'till you see the green light' (B).",
  "613bd0e0-da66-45c7-860a-34b39eed2f69": "NDA 2026-I. 'until he sends me the bill again' (B) is as correct as the keyed 'unless ...' (D).",
  "1e8b1979-a816-4c48-8ee8-c24559e97bf6": "CDS 2017-II (derived key). 'clear away' (key) and 'clear up' are both idiomatic for suspicion dispersing.",
  "7ee66b80-f2b8-42a4-b824-fdf78150048d": "Cadetprep worksheet. 'An angle in radians is twice its value in degrees' has only x = 0 as a solution; the keyed 114.59 deg is 2 radians in degrees. Stem needs re-authoring.",
};

type Row = {
  id: string;
  text: string;
  content_hash: string;
  options: { label: string; text: string; is_correct: boolean }[];
};

const fail = (msg: string): never => {
  console.error("REFUSING: " + msg);
  process.exit(1);
};

async function main() {
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  // The reviewed set, recomputed from live stats so a drift is caught.
  const pooled = new Map<string, { a: number; c: number }>();
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db
      .from("question_item_stats")
      .select("question_id, attempted, correct")
      .range(from, from + 999);
    if (error) throw error;
    for (const r of data ?? []) {
      const p = pooled.get(r.question_id) ?? { a: 0, c: 0 };
      p.a += r.attempted ?? 0;
      p.c += r.correct ?? 0;
      pooled.set(r.question_id, p);
    }
    if ((data ?? []).length < 1000) break;
  }
  const set = [...pooled].filter(([, p]) => p.a >= MIN_N && 1 - p.c / p.a >= MIN_WRONG).map(([id]) => id);
  if (set.length !== EXPECTED_SET_SIZE) fail(`set is ${set.length}, reviewed ${EXPECTED_SET_SIZE}; re-review before recording`);
  for (const id of [...EDITS.map((e) => e.id), ...Object.keys(UNVERIFIABLE)]) {
    if (!set.includes(id)) fail(`${id} is not in the reviewed set`);
  }

  const rows = new Map<string, Row>();
  for (let i = 0; i < set.length; i += 100) {
    const { data, error } = await db
      .from("questions")
      .select("id, text, content_hash, options(label, text, is_correct)")
      .in("id", set.slice(i, i + 100));
    if (error) throw error;
    for (const r of (data ?? []) as Row[]) rows.set(r.id, r);
  }
  if (rows.size !== set.length) fail(`read ${rows.size} of ${set.length} rows`);

  // ---- preconditions for every edit ---------------------------------------
  const plan: { edit: Edit; row: Row; text: string; key: string; hashAfter: string }[] = [];
  for (const edit of EDITS) {
    const row = rows.get(edit.id)!;
    const opts = [...row.options].sort((a, b) => a.label.localeCompare(b.label));
    const keyNow = opts.filter((o) => o.is_correct).map((o) => o.label);
    if (keyNow.length !== 1) fail(`${edit.id} has ${keyNow.length} keyed options`);
    const optTexts = opts.map((o) => o.text);
    if (contentHash(row.text, optTexts, keyNow[0]) !== row.content_hash) fail(`${edit.id} hash not reproducible`);
    if (edit.key && keyNow[0] !== edit.key.from) fail(`${edit.id} key is ${keyNow[0]}, reviewed ${edit.key.from}`);
    let text = row.text;
    if (edit.stem) {
      const n = text.split(edit.stem.from).length - 1;
      if (n !== 1) fail(`${edit.id} stem substring found ${n} times`);
      text = text.replace(edit.stem.from, edit.stem.to);
    }
    const key = edit.key?.to ?? keyNow[0];
    const hashAfter = contentHash(text, optTexts, key);
    if (hashAfter !== row.content_hash) {
      const { data: clash } = await db.from("questions").select("id").eq("content_hash", hashAfter);
      if ((clash ?? []).length > 0) fail(`${edit.id} new hash collides with ${(clash ?? []).map((c) => c.id).join(",")}`);
    }
    plan.push({ edit, row, text, key, hashAfter });
    console.log(
      `${edit.id.slice(0, 8)}  ${edit.verdict.padEnd(18)} ${edit.key ? `key ${edit.key.from}->${edit.key.to} ` : ""}${edit.stem ? "stem " : ""}${edit.solution ? "solution" : ""}`
    );
  }
  const confirmed = set.filter((id) => !EDITS.some((e) => e.id === id) && !(id in UNVERIFIABLE));
  console.log(`\nconfirmed ${confirmed.length} · edited ${EDITS.length} · unverifiable ${Object.keys(UNVERIFIABLE).length}`);

  if (!APPLY) {
    console.log("\nDRY RUN. Re-run with --apply to write.");
    return;
  }

  // ---- writes --------------------------------------------------------------
  for (const p of plan) {
    if (p.edit.key) {
      // Options first: a run that dies between the two writes leaves a stale
      // dedupe fingerprint, never a wrong key in front of a student.
      for (const label of [p.edit.key.from, p.edit.key.to]) {
        const { error } = await db
          .from("options")
          .update({ is_correct: label === p.edit.key.to })
          .eq("question_id", p.edit.id)
          .eq("label", label);
        if (error) throw error;
      }
    }
    const patch: Record<string, string> = { content_hash: p.hashAfter };
    if (p.edit.stem) patch.text = p.text;
    if (p.edit.solution) patch.solution = p.edit.solution;
    const { error } = await db.from("questions").update(patch).eq("id", p.edit.id);
    if (error) throw error;
  }

  const reviewRows = [
    ...plan.map((p) => ({ id: p.edit.id, hash: p.hashAfter, verdict: p.edit.verdict, note: p.edit.note })),
    ...Object.entries(UNVERIFIABLE).map(([id, note]) => ({ id, hash: rows.get(id)!.content_hash, verdict: "unverifiable", note })),
    ...confirmed.map((id) => ({
      id,
      hash: rows.get(id)!.content_hash,
      verdict: "confirmed",
      note: "Re-derived by hand (not blind: the key was visible). Key holds.",
    })),
  ].map((r) => ({
    question_id: r.id,
    reviewed_content_hash: r.hash,
    method: "structural_probe",
    verdict: r.verdict,
    run_label: RUN_LABEL,
    derived_model: MODEL,
    source: "live",
    note: r.note,
  }));
  const { error: revErr } = await db
    .from("question_reviews")
    .upsert(reviewRows, { onConflict: "question_id,run_label,reviewed_content_hash", ignoreDuplicates: true });
  if (revErr) throw revErr;
  console.log(`\nwritten: ${plan.length} edits, ${reviewRows.length} review rows (${RUN_LABEL})`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
