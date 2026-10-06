/**
 * NDA 2017-II Maths Q86 (ad3c3dc8): stem x/|x| -> x/x, key B -> C
 * (2026-10-06, the owner's decision: "q86 x/x").
 *
 *   npx tsx scripts/reviews/apply-signum-printed-key-fix.ts            # dry run
 *   npx tsx scripts/reviews/apply-signum-printed-key-fix.ts --apply
 *
 * WHY. The UPSC booklet (Maths_2017_NDA2.pdf, English page 30) prints
 * f(x) = x/x, x != 0, with no modulus. As printed, f(x) = 1 for every x except
 * 0, where it is undefined: graph (c), the line y = 1 with a hole at the
 * origin. The bank had written the stem as x/|x| (the signum the setter may
 * have meant) and keyed (b), the step. Solved as printed, as with the three
 * NDA items ruled on 2026-10-04.
 *
 * The options became the printed graphs on 2026-10-05
 * (scripts/figures-fix/manifest/nda-2017-ii-maths-q86.json), which blanked the
 * option text without a rehash; that batch's backup holds the old texts, so
 * the stored hash is checked against them before anything is written.
 *
 * SAFETY: asserts the live hash, key and stem before writing; the uuid is kept.
 * AFTER --apply:
 *   npx tsx scripts/reviews/regrade-attempt.ts nda-2017-sep-maths --apply --allow-lower
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { contentHash } from "../../src/lib/upload/hash";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");
const ID = "ad3c3dc8-176b-45d9-a65f-dc93c748ab45";
const HASH_BEFORE = "c3cf10eb249c4fa56750bef243187055393c6eadfabb163f54c616a0e9cd5738";
const STEM_FROM = String.raw`\dfrac{x}{|x|}`;
const STEM_TO = String.raw`\dfrac{x}{x}`;

const SOLUTION = String.raw`As printed, \(f(x) = \dfrac{x}{x}\) with \(x \neq 0\). For every \(x \neq 0\) the fraction is \(1\), and at \(x = 0\) the function is not defined. So the graph is the line \(y = 1\) on both sides of the \(y\)-axis with a hole at \(x = 0\): graph (c). (Graph (b), the step from \(-1\) to \(+1\), is the graph of \(\dfrac{x}{|x|}\), which is not what the paper prints.) Matches option C.`;

const fail = (msg: string): never => {
  console.error("REFUSING: " + msg);
  process.exit(1);
};

async function main() {
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const { data, error } = await db
    .from("questions")
    .select("id, text, content_hash, options(label, text, is_correct)")
    .eq("id", ID)
    .single();
  if (error) throw error;
  const row = data as { text: string; content_hash: string; options: { label: string; text: string; is_correct: boolean }[] };

  if (row.content_hash !== HASH_BEFORE) fail(`hash is ${row.content_hash}; the row changed since review`);
  if (row.text.split(STEM_FROM).length - 1 !== 1) fail(`stem does not contain ${STEM_FROM} exactly once`);
  const opts = [...row.options].sort((a, b) => a.label.localeCompare(b.label));
  const key = opts.filter((o) => o.is_correct).map((o) => o.label);
  if (key.length !== 1 || key[0] !== "B") fail(`key is [${key.join(",")}], reviewed B`);

  // The stored hash predates the figure batch, which blanked options A-C.
  const backup = JSON.parse(
    readFileSync(join(__dirname, "../figures-fix/backup/nda-2017-ii-maths-q86.before.json"), "utf8")
  ) as { options: { label: string; text: string }[] }[];
  const oldText = new Map(backup[0].options.map((o) => [o.label, o.text]));
  const oldOptions = opts.map((o) => oldText.get(o.label) ?? o.text);
  if (contentHash(row.text, oldOptions, "B") !== HASH_BEFORE) fail("hash not reproducible from the pre-figure options");

  const newText = row.text.replace(STEM_FROM, STEM_TO);
  const hashAfter = contentHash(newText, opts.map((o) => o.text), "C");
  const { data: clash } = await db.from("questions").select("id").eq("content_hash", hashAfter);
  if ((clash ?? []).length > 0) fail("new hash collides");

  console.log(`stem ${STEM_FROM} -> ${STEM_TO} · key B -> C · solution rewritten · hash ${HASH_BEFORE.slice(0, 12)} -> ${hashAfter.slice(0, 12)}`);
  if (!APPLY) {
    console.log("DRY RUN. Re-run with --apply to write.");
    return;
  }

  for (const label of ["B", "C"]) {
    const { error: e } = await db.from("options").update({ is_correct: label === "C" }).eq("question_id", ID).eq("label", label);
    if (e) throw e;
  }
  const { error: qErr } = await db
    .from("questions")
    .update({ text: newText, solution: SOLUTION, content_hash: hashAfter })
    .eq("id", ID);
  if (qErr) throw qErr;

  const { error: rErr } = await db.from("question_reviews").insert({
    question_id: ID,
    reviewed_content_hash: hashAfter,
    method: "source_key_crosscheck",
    verdict: "key_fixed",
    run_label: "printed-key-2026-10-06",
    derived_model: "claude-opus-5-5",
    source: "live",
    note: "NDA 2017-II Q86. The UPSC scan (p30) prints f(x) = x/x, x != 0; the bank read x/|x|. Owner's decision 2026-10-06: solve as printed. f = 1 except at 0, graph (c). Stem repaired and key B -> C.",
  });
  if (rErr) throw rErr;
  console.log("written");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
