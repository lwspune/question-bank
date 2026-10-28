/**
 * Corrections from a review of a 120-question NDA Mathematics PDF export
 * (Sets, Functions, Sequences, Matrices, Complex Numbers, Trigonometry,
 * Logarithms), 2026-10-28.
 *
 *   npx tsx scripts/reviews/apply-nda-export-review-2026-10-28.ts            # dry run
 *   npx tsx scripts/reviews/apply-nda-export-review-2026-10-28.ts --apply
 *
 * TWO WRONG KEYS, each checked against the printed UPSC booklet
 * (C:\tmp\PYQPs\NDA\NDA_Maths_PYQPs) and re-derived:
 *
 *   d031dd73 (NDA II 2017 Q6)   B -> C. E-(E-(E-(E-(E-A)))) has FIVE "E-" in
 *     the booklet as in the bank, so the set is A' = (B u C)' = B' n C'. The old
 *     solution counted four complements and landed on A.
 *   e2408b9e (NDA II 2023 Q23)  C -> A. g(x) = x^2 on 0<=x<=4 and 3x on
 *     4<=x<=8: both pieces include x = 4 and give 16 and 12, so g is not a
 *     function. The old solution noticed 16 != 12 and called g valid anyway.
 *
 * UPSC prints no key with an NDA paper, so the .xlsx keys were a third party's
 * derivation, not an issued key; flipping them overrides no printed key.
 *
 * SEVEN SOLUTION FIXES (keys right): 2a5d1b7b, 8b626e5b, 6a7f1798, a9b88cbb,
 * 36f6b4af, 20d791a3, 12d160c4 -- each named below.
 *
 * ONE DEFECT PRESERVED: dfcd683a (NDA II 2019 Q66) option (d) reads "-19". The
 * booklet prints exactly that, so the bank stays verbatim; recorded as a review
 * row so the next reader does not "fix" it.
 *
 * SAFETY: same as apply-set-theory-key-fix.ts. Every precondition is asserted
 * and the script fails CLOSED. content_hash covers (text, options, answer), so
 * the two key flips recompute it; solution edits leave it alone. uuids are kept,
 * so mock snapshots, attempt answers and tags survive.
 *
 * AFTER APPLYING, re-grade both mocks (`mock_attempts` freezes its score):
 *   npx tsx scripts/reviews/regrade-attempt.ts nda-2017-sep-maths --apply --allow-lower
 *   npx tsx scripts/reviews/regrade-attempt.ts nda-2023-sep-maths --apply --allow-lower
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { contentHash } from "../../src/lib/upload/hash";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");
const RUN_LABEL = "nda-maths-export-review-2026-10-28";
const MODEL = "claude-opus-5-5";

type Row = {
  id: string;
  text: string;
  solution: string | null;
  content_hash: string;
  options: { label: string; text: string; is_correct: boolean }[];
};

type KeyFix = {
  kind: "key";
  id: string;
  hashBefore: string;
  from: string;
  to: string;
  stemMustMatch: RegExp;
  solution: string;
  note: string;
};

type SolutionFix = {
  kind: "solution";
  id: string;
  hashBefore: string;
  key: string;
  /** A whole new solution, or exact substring replacements on the live one. */
  solution?: string;
  replace?: [string, string][];
  note: string;
};

type Preserve = { kind: "preserve"; id: string; hashBefore: string; key: string; note: string };

const lines = (...l: string[]) => l.join("\n");

const FIXES: (KeyFix | SolutionFix | Preserve)[] = [
  {
    kind: "key",
    id: "d031dd73-3ad7-488a-980f-b481c1180842",
    hashBefore: "e126f86e312dbe5e5af51c40d693871b68b65bc494c162a2693fc68e183c6eaf",
    from: "B",
    to: "C",
    stemMustMatch: /E-\(E-\(E-\(E-\(E-A\)\)\)\)/,
    solution: lines(
      "Within the universal set \\(E\\), taking \\(E-X\\) gives the complement \\(X'\\), and complementing twice returns \\(X\\).",
      "The expression has five \\(E-\\) in all. Working outwards from the innermost bracket:",
      "\\(E-A=A'\\)",
      "\\(E-A'=A\\)",
      "\\(E-A=A'\\)",
      "\\(E-A'=A\\)",
      "\\(E-A=A'\\)",
      "An odd number of complements leaves the complement, so the set is \\(A'=(B\\cup C)'=B'\\cap C'\\) by De Morgan's law.",
      "Matches option C: \\(B'\\cap C'\\)."
    ),
    note:
      "Key B -> C. The printed NDA II 2017 booklet (Q6) reads E-(E-(E-(E-(E-A)))), five complements, " +
      "exactly as stored. Five complements give A' = (B u C)' = B' n C'. The old solution counted four " +
      "steps and concluded A = B u C. UPSC prints no key with the paper, so the .xlsx B was a third-party " +
      "derivation. Solution rewritten.",
  },
  {
    kind: "key",
    id: "e2408b9e-a1da-4e32-8c3e-0fe3eb7c4ae3",
    hashBefore: "05ff45662f94365be4cf0953d93f07c837bb5e50112e40db87f2cf8c0b1c268b",
    from: "C",
    to: "A",
    stemMustMatch: /3x,\\ 4\\le x\\le8/,
    solution: lines(
      "A rule is a function only if every \\(x\\) in its domain gets exactly one value. Where two pieces share an endpoint, both pieces apply there, so they must give the same value at that point.",
      "Statement 1: at \\(x=2\\) the pieces give \\(2^3=8\\) and \\(4\\cdot2=8\\). They agree, so \\(f\\) is a function. Statement 1 is correct.",
      "Statement 2: both pieces include \\(x=4\\) (\\(0\\le x\\le4\\) and \\(4\\le x\\le8\\)), and they give \\(4^2=16\\) and \\(3\\cdot4=12\\). So \\(4\\) has two images and \\(g\\) is not a function. Statement 2 is incorrect.",
      "The trap is to treat this as a question about continuity. A jump is allowed where only one piece applies; here both pieces claim \\(x=4\\).",
      "Only statement 1 is correct. Matches option A."
    ),
    note:
      "Key C -> A. The printed NDA II 2023 booklet (Q23) gives g(x) = x^2 for 0<=x<=4 and 3x for 4<=x<=8, " +
      "both closed at 4, exactly as stored. At x = 4 the pieces give 16 and 12, so g is not a function and " +
      "only statement 1 holds. The old solution saw 16 != 12, then called g valid because 'a function need " +
      "not be continuous', which misses that 4 has two images. Solution rewritten.",
  },
  {
    kind: "solution",
    id: "2a5d1b7b-2633-4e84-8979-6288daf01be1",
    hashBefore: "9154efc612f11e419a88fe6e9080a11b17e9ea4930260c45f426377ae40c2011",
    key: "C",
    replace: [["The point \\((-1,-i)\\)", "The point \\((-1,-1)\\)"]],
    note: "Key C confirmed. Solution named the point (-1,-i); the point of -1-i is (-1,-1).",
  },
  {
    kind: "solution",
    id: "8b626e5b-30e9-42af-b08f-50bb6d3255e0",
    hashBefore: "5eb584a7eca02bef4a573a0ec5d9266ff6a9af5501003b5a17c8cf81d40b78ec",
    key: "A",
    solution: lines(
      "Simplify the denominator: \\((1-i)^2=1-2i+i^2=-2i\\), so \\(1-(1-i)^2=1+2i\\) and \\(z=\\dfrac{1+2i}{1+2i}=1\\).",
      "\\(z=1\\) lies on the positive real axis, so its principal argument is \\(0\\). Matches option A: \\(0\\)."
    ),
    note: "Key A confirmed. Solution began 'From Q29', a question number from its source that means nothing on our surfaces; now self-contained.",
  },
  {
    kind: "solution",
    id: "6a7f1798-c168-4b90-ab29-7e60f292231d",
    hashBefore: "4dce0aae01b1acc921db160d4446ba5acae2051ffd894b395b17a43efb7ee9fe",
    key: "D",
    solution: lines(
      "A relation is a function only if each first element is paired with exactly one second element.",
      "Statement 1: \\(x=0,\\ y=0\\) gives \\((0,0)\\) and \\(x=0,\\ y=1\\) gives \\((0,-1)\\). The first element \\(0\\) has two images, so \\(f\\) is not a function.",
      "Statement 2: \\(x=2,\\ y=3\\) gives \\((6,5)\\) and \\(x=6,\\ y=1\\) gives \\((6,7)\\). The first element \\(6\\) has two images, so \\(f\\) is not a function.",
      "Neither statement is correct. Matches option D."
    ),
    note: "Key D confirmed. Statement 1's counterexample was wrong: x=1, y=-1 gives (-1,2), not (0,2). Replaced with (0,0) and (0,-1).",
  },
  {
    kind: "solution",
    id: "a9b88cbb-c631-42a6-baeb-19f4d1fff9cb",
    hashBefore: "cd70f816c6ce8a6254330746e537754a040dc9abbe170f73d93153dc5b4c05c9",
    key: "D",
    solution: lines(
      "Both implications fail in general; one counterexample each is enough.",
      "Statement 1: take \\(A=\\{1,2\\}\\), \\(B=\\{2,3\\}\\), \\(C=\\{2,4\\}\\). Then \\(A\\cap B=\\{2\\}=A\\cap C\\), but \\(B\\neq C\\).",
      "Statement 2: take \\(A=\\{1,2\\}\\), \\(B=\\{1\\}\\), \\(C=\\{2\\}\\). Then \\(A\\cup B=\\{1,2\\}=A\\cup C\\), but \\(B\\neq C\\).",
      "Neither statement is correct. Matches option D."
    ),
    note: "Key D confirmed. Solution said 'Similarly for (2)' with no counterexample; one added.",
  },
  {
    kind: "solution",
    id: "36f6b4af-f4ed-4b88-b650-f40e1ace6eba",
    hashBefore: "05d47118b7de689e6983eb63ed91f1fabde548145fd97fdf3149aea96ecdce2d",
    key: "C",
    replace: [["\\approx 2920", "= 2920"]],
    note: "Key C confirmed. 20440/7 = 2920 exactly; solution said 'approximately'.",
  },
  {
    kind: "solution",
    id: "20d791a3-ec5f-4ff6-ba98-e7bc43764ea9",
    hashBefore: "65f28819c59cdc8ea62702409b8b60ceaff7cdb6f6cc23e032e7e9cfd5ce0591",
    key: "B",
    solution: lines(
      "Group the terms: \\(iz^3+z^2-z+i=z^2(iz+1)-(z-i)\\).",
      "Since \\(-i(iz+1)=z-i\\), this is \\(z^2(iz+1)+i(iz+1)=(iz+1)(z^2+i)\\).",
      "So either \\(iz+1=0\\), giving \\(z=-\\dfrac{1}{i}=i\\), or \\(z^2=-i\\), giving \\(|z|^2=|-i|=1\\).",
      "Every root has \\(|z|=1\\), so \\((|z|+1)^2=(1+1)^2=4\\). Matches option B: \\(4\\)."
    ),
    note: "Key B confirmed. The old factorisation was wrong algebra and only tested z=i; now (iz+1)(z^2+i)=0, which shows every root has |z|=1.",
  },
  {
    kind: "solution",
    id: "12d160c4-21c1-4b90-a2c7-f4a2c3f8a1bb",
    hashBefore: "856839ebbb11f4e88c8a3f8599b0bcd4a8b35b64821e7c2052ae4cb6577362f2",
    key: "D",
    replace: [
      ["III: \\(YZ", "C: \\(YZ"],
      ["II: \\(XZ", "B: \\(XZ"],
      ["I: \\(ZY", "A: \\(ZY"],
    ],
    note: "Key D confirmed. Solution labelled the statements I, II, III; the question prints them A, B, C.",
  },
  {
    kind: "preserve",
    id: "dfcd683a-0e46-438b-b7c8-e90c7d567a81",
    hashBefore: "dfda1f0b0f3296e2893a999671a3211247033b3f012ea435980b27646c4292a2",
    key: "C",
    note:
      "Key C (0) confirmed. Option (d) reads -19; the printed NDA II 2019 booklet (Q66) prints exactly " +
      "-19, almost certainly UPSC's misprint of -1. Kept verbatim; no change.",
  },
];

const fail = (msg: string): never => {
  console.error("REFUSING: " + msg);
  process.exit(1);
};

function keyOf(r: Row): string[] {
  return r.options.filter((o) => o.is_correct).map((o) => o.label);
}

async function main() {
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const ids = FIXES.map((f) => f.id);
  const { data, error } = await db
    .from("questions")
    .select("id, text, solution, content_hash, options(label, text, is_correct)")
    .in("id", ids);
  if (error) throw error;
  const byId = new Map<string, Row>((data as Row[]).map((r) => [r.id, r]));

  // ---- preconditions + plan ------------------------------------------------
  type Write = { id: string; patch: Record<string, string>; flip?: { to: string }; review: Record<string, string> };
  const writes: Write[] = [];

  for (const f of FIXES) {
    const r = byId.get(f.id) ?? fail(`row ${f.id} not found`);
    if (r.content_hash !== f.hashBefore) fail(`${f.id.slice(0, 8)} content_hash changed since review`);
    const key = keyOf(r);
    const expectKey = f.kind === "key" ? f.from : f.key;
    if (key.length !== 1 || key[0] !== expectKey) fail(`${f.id.slice(0, 8)} key is [${key}], expected ${expectKey}`);

    if (f.kind === "key") {
      if (!f.stemMustMatch.test(r.text)) fail(`${f.id.slice(0, 8)} stem no longer matches the reviewed text`);
      const optTexts = [...r.options].sort((a, b) => a.label.localeCompare(b.label)).map((o) => o.text);
      if (contentHash(r.text, optTexts, f.from) !== r.content_hash)
        fail(`${f.id.slice(0, 8)} content_hash not reproducible from live columns`);
      const hashAfter = contentHash(r.text, optTexts, f.to);
      const { data: clash, error: ce } = await db.from("questions").select("id").eq("content_hash", hashAfter);
      if (ce) throw ce;
      if ((clash ?? []).length) fail(`${f.id.slice(0, 8)} flipped hash collides with ${clash![0].id}`);
      writes.push({
        id: f.id,
        patch: { content_hash: hashAfter, solution: f.solution },
        flip: { to: f.to },
        review: { reviewed_content_hash: hashAfter, method: "blind_rederivation", verdict: "key_fixed", note: f.note },
      });
      console.log(`${f.id.slice(0, 8)}  key ${f.from} -> ${f.to}, solution rewritten`);
    } else if (f.kind === "solution") {
      let next = f.solution;
      if (f.replace) {
        next = r.solution ?? fail(`${f.id.slice(0, 8)} has no solution to patch`);
        for (const [a, b] of f.replace) {
          if (next.split(a).length !== 2) fail(`${f.id.slice(0, 8)} expected exactly one "${a}" in the solution`);
          next = next.replace(a, b);
        }
      }
      writes.push({
        id: f.id,
        patch: { solution: next! },
        review: { reviewed_content_hash: r.content_hash, method: "solution_audit", verdict: "solution_rewritten", note: f.note },
      });
      console.log(`${f.id.slice(0, 8)}  solution ${f.replace ? "patched" : "rewritten"}`);
    } else {
      writes.push({
        id: f.id,
        patch: {},
        review: { reviewed_content_hash: r.content_hash, method: "solution_audit", verdict: "defect_preserved", note: f.note },
      });
      console.log(`${f.id.slice(0, 8)}  defect preserved (option "-19" as printed)`);
    }
  }

  console.log("\npreconditions OK");
  if (!APPLY) {
    console.log("DRY RUN. Re-run with --apply to write.");
    return;
  }

  // ---- writes ---------------------------------------------------------------
  // Options before the hash, as in apply-set-theory-key-fix.ts: a run that dies
  // between the two leaves a stale dedup fingerprint, never a wrong key.
  for (const w of writes) {
    if (w.flip) {
      const r = byId.get(w.id)!;
      for (const o of r.options) {
        const want = o.label === w.flip.to;
        if (o.is_correct === want) continue;
        const { error: e } = await db.from("options").update({ is_correct: want }).eq("question_id", w.id).eq("label", o.label);
        if (e) throw e;
      }
    }
    if (Object.keys(w.patch).length) {
      const { error: e } = await db.from("questions").update(w.patch).eq("id", w.id);
      if (e) throw e;
    }
  }

  const { error: re } = await db.from("question_reviews").insert(
    writes.map((w) => ({ question_id: w.id, run_label: RUN_LABEL, derived_model: MODEL, ...w.review }))
  );
  if (re) throw re;

  console.log(`APPLIED: ${writes.filter((w) => Object.keys(w.patch).length).length} questions updated, ${writes.length} review rows.`);
  console.log("\nNEXT:");
  console.log("  npx tsx scripts/reviews/regrade-attempt.ts nda-2017-sep-maths --apply --allow-lower");
  console.log("  npx tsx scripts/reviews/regrade-attempt.ts nda-2023-sep-maths --apply --allow-lower");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
