/**
 * Repair NDA 2024 (II) Maths Q32 — a transcription defect in a LIVE mock.
 *
 *   npx tsx scripts/reviews/fix-nda-2024-sep-q32.ts            # dry run
 *   npx tsx scripts/reviews/fix-nda-2024-sep-q32.ts --apply
 *
 * Found by the RULE 5 hand-wave sweep: the stored solution derived
 * 1/x + 1/y + 1/z = 0 and then asserted "Actually the standard result is
 * x + y + z = 0" — a non-sequitur contradicting its own working.
 *
 * SOURCE-VERIFIED against the printed paper (Maths_2024_NDA2.pdf, p13 of the
 * booklet / index 6, question 32). The paper prints QUOTIENTS:
 *     x/cos(theta) = y/cos(2pi/3 - theta) = z/cos(2pi/3 + theta)
 * Our bank had PRODUCTS (x cos(theta) = ...), which inverts the relation.
 *
 * Why the key does NOT move, and why that matters here:
 *   printed stem  -> x + y + z = k[cos(t) + 2cos(2pi/3)cos(t)] = 0 identically
 *   our stem      -> x + y + z varies with theta (-3k at 0, -4.83k at 0.3)
 * So (b) 0 was right all along and only the stem was wrong. The question is
 * live in the published mock `nda-2024-sep-maths` and 4 students have already
 * answered it; because the key is unchanged, no attempt needs re-grading and
 * nobody was mis-marked. The row id is preserved so the mock's question ref
 * stays valid — a new id would leave the mock rendering a blank question.
 *
 * content_hash IS recomputed: the stem is part of the dedup preimage.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { contentHash } from "../../src/lib/upload/hash";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");
const ID = "f905fcb5-906a-4db5-a29c-43ed4cd184ad";

const OLD_STEM =
  "If \\(x\\cos\\theta=y\\cos\\!\\left(\\dfrac{2\\pi}{3}-\\theta\\right)=z\\cos\\!\\left(\\dfrac{2\\pi}{3}+\\theta\\right)\\), then what is \\(x+y+z\\) equal to?";

const NEW_STEM =
  "If \\(\\dfrac{x}{\\cos\\theta}=\\dfrac{y}{\\cos\\!\\left(\\dfrac{2\\pi}{3}-\\theta\\right)}=\\dfrac{z}{\\cos\\!\\left(\\dfrac{2\\pi}{3}+\\theta\\right)}\\), then what is \\(x+y+z\\) equal to?";

const NEW_SOLUTION =
  "Let the common value be \\(k\\), so \\(x = k\\cos\\theta\\), \\(y = k\\cos\\!\\left(\\dfrac{2\\pi}{3}-\\theta\\right)\\) and \\(z = k\\cos\\!\\left(\\dfrac{2\\pi}{3}+\\theta\\right)\\).\n\n" +
  "Add the last two using \\(\\cos(A-B) + \\cos(A+B) = 2\\cos A\\cos B\\) with \\(A = \\dfrac{2\\pi}{3}\\), \\(B = \\theta\\):\n" +
  "\\(\\cos\\!\\left(\\dfrac{2\\pi}{3}-\\theta\\right) + \\cos\\!\\left(\\dfrac{2\\pi}{3}+\\theta\\right) = 2\\cos\\dfrac{2\\pi}{3}\\cos\\theta = 2\\left(-\\dfrac12\\right)\\cos\\theta = -\\cos\\theta\\).\n\n" +
  "Therefore \\(x + y + z = k\\left[\\cos\\theta + \\left(-\\cos\\theta\\right)\\right] = 0\\), for every \\(\\theta\\) and every \\(k\\). Hence (B).";

async function main() {
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
  const { data, error } = await db
    .from("questions")
    .select("id,question_number,text,solution,content_hash,options(label,text,is_correct)")
    .eq("id", ID)
    .single();
  if (error || !data) throw error ?? new Error("not found");
  const q = data as any;

  if (q.text !== OLD_STEM) {
    console.error("REFUSE: stored stem is not the one this fix was written against.");
    console.error("  stored: " + JSON.stringify(q.text));
    console.error("  expect: " + JSON.stringify(OLD_STEM));
    process.exit(1);
  }
  const key = (q.options as any[]).find((o) => o.is_correct)?.label;
  if (key !== "B") {
    console.error(`REFUSE: key is ${key}, expected B — adjudicate before touching this row.`);
    process.exit(1);
  }

  const opts = (q.options as any[]).map((o) => o.text as string);
  const before = contentHash(q.text, opts, key);
  const after = contentHash(NEW_STEM, opts, key);
  if (before !== q.content_hash) {
    console.error("REFUSE: stored content_hash does not match the stored text — investigate.");
    process.exit(1);
  }

  console.log(`Q${q.question_number} (NDA 2024 Sep, live in mock nda-2024-sep-maths)`);
  console.log("  stem  -> " + NEW_STEM);
  console.log("  key    B UNCHANGED (0) — no attempt needs re-grading");
  console.log(`  hash   ${q.content_hash.slice(0, 10)} -> ${after.slice(0, 10)}`);
  console.log("  soln  -> " + NEW_SOLUTION.replace(/\n/g, " ").slice(0, 160));

  if (!APPLY) {
    console.log("\nDRY RUN — re-run with --apply.");
    return;
  }
  const up = await db
    .from("questions")
    .update({ text: NEW_STEM, solution: NEW_SOLUTION, content_hash: after })
    .eq("id", ID);
  if (up.error) throw up.error;
  console.log("\napplied.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
