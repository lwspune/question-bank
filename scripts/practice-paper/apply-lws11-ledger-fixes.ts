/**
 * Backfill-ledger actions approved 2026-09-12, after a 360 that EXCLUDED half the candidates.
 *
 *   A. Two wrong keys: a sentence-initial conjunctive adverb keyed as a CONJUNCTION.
 *      - cf616452 "My parents lent me the money. Otherwise I could not have afforded the trip."
 *      - 8dc988c7 "Men have become inept. Therefore, life force has chosen women ..."
 *      Both stems carry a FULL STOP, so there are no "two clauses" for a conjunction to join,
 *      and both rows' own solutions say so while keying otherwise. Decisive corroboration:
 *      4fdedce7 is a CDS PYQ with a stem identical to cf616452's, the same four options in the
 *      same order, keyed Adverb.
 *      DELIBERATELY NOT TOUCHED (the 360's does-it-really-apply guard): caa621f1 ("She worked
 *      hard yet she didn't pass") is ONE sentence where `yet` genuinely coordinates two clauses,
 *      and cf19b44a ("Still water runs deep") is a genuine attributive adjective.
 *
 *   B. Eight duplicate PAIRS, one member withdrawn to PRIVATE each. Keep-rule, applied
 *      uniformly: most downstream history wins (attempts > concept tags > papers), ties broken
 *      on content quality. Four of the pairs are a `practice` row duplicating a real `pyq` row,
 *      and in every one of those the PYQ carries the attempts and the concept tag.
 *
 * A key flip changes content_hash (it covers stem + sorted options + answer), so the hash is
 * recomputed with the REAL helper and re-stamped IN PLACE — never delete-and-reinsert, which
 * would mint a new uuid and orphan any paper_questions row.
 *
 * Withdrawal is a visibility-only UPDATE: ids survive, and org staff can still read their own
 * org's PRIVATE rows, so a paper containing a withdrawn row keeps building.
 *
 *   npx tsx scripts/practice-paper/_lws11-backfill.ts [--apply]
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { contentHash } from "../../src/lib/upload/hash";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");
const RUN_LABEL = "backfill:2026-09-12-lws11-ledger";

type Flip = { id: string; from: string; to: string; solution: string; why: string };

const FLIPS: Flip[] = [
  {
    id: "cf616452-130f-4b32-868d-3c379e528c56",
    from: "Conjunction",
    to: "Adverb",
    solution:
      "The sentence before it ends with a full stop, so there are not two clauses here — there are two SENTENCES, and a conjunction cannot join across a sentence boundary.\n" +
      "'Otherwise' is freely movable inside its own clause: \"I could not otherwise have afforded the trip.\" No conjunction can be moved like that.\n" +
      "It is therefore a conjunctive adverb — it links the two sentences in meaning while remaining an adverb in form.\n" +
      "Matches option B.",
    why: "keyed Conjunction; its own solution claimed 'it connects the two clauses' but the stem carries a full stop. CDS PYQ 4fdedce7 has an identical stem, the same options in the same order, and keys Adverb.",
  },
  {
    id: "8dc988c7-1a5f-4086-a9b6-2c30771efbb7",
    from: "conjunction",
    to: "adverb",
    solution:
      "The preceding sentence ends with a full stop, so 'Therefore' is not joining two clauses within one sentence — it opens a new sentence.\n" +
      "It is movable within its own clause (\"life force has therefore chosen women...\"), which a conjunction is not.\n" +
      "That makes it a conjunctive adverb: it signals result while remaining an adverb in form.\n" +
      "Matches option C.",
    why: "keyed conjunction while its own solution called it 'a conjunctive adverb'; the stem carries a full stop so there are no two clauses to join. Same construction the bank keys Adverb at e681c7b2, 8dc76e24 and 750e3779.",
  },
];

/** pair label -> [keep, withdraw] with the reason the keeper won. */
const WITHDRAW: { pair: string; keep: string; drop: string; why: string }[] = [
  { pair: "geo-atmosphere-structure", keep: "f599d030-be6e-4ef8-9169-67a93c03af62", drop: "77c5e8fb-d3db-49fe-87aa-51b4f7d4afb6",
    why: "keeper is the PYQ and carries 24 attempts, a concept tag and a bookmark; the withdrawn row is a later practice copy with no history" },
  { pair: "geo-atmosphere-heating", keep: "62e229f9-8a73-410c-9b81-51ed03348fa7", drop: "5177f9a7-514d-4ab0-8e42-4f9ddcf19cfb",
    why: "keeper is the PYQ with 5 attempts and a concept tag" },
  { pair: "geo-lapse-rate", keep: "47d0a514-17ab-429e-97fa-f299374b6e11", drop: "3eb3f757-a09f-4c63-9eca-05973ebb4be5",
    why: "keeper is the PYQ with 3 attempts and a concept tag" },
  { pair: "geo-troposphere", keep: "c5cfefae-0299-4e30-82e7-a34bf95b7e4d", drop: "5b718a49-32a5-4b14-9d5d-a5ad2322e1a6",
    why: "keeper is the PYQ with 9 attempts and a concept tag" },
  { pair: "geo-water-cycle", keep: "18d3294f-5992-4f27-b8ba-2baae6e64fad", drop: "eeb1e660-748d-4e5d-ae26-cb5f55be989b",
    why: "both practice with no attempts; keeper is in a paper and the withdrawn row is in none" },
  { pair: "eng-bottom-line", keep: "3df8e481-1540-4d28-a917-15a251a380f3", drop: "3403a601-00ff-4f45-8d9f-26223ecbc9f5",
    why: "identical sentence; keeper spells 'bottom line' correctly where the withdrawn row prints 'bottomline'" },
  { pair: "maths-binomial-alt-sum", keep: "4ea0df6c-9b5b-43c5-acb3-796cb4c40574", drop: "4eed4f19-027b-45e3-b95a-c69e7bb6290d",
    why: "neither has history; keeper's LaTeX is cleaner (the withdrawn row prints a stray '\\ldots..')" },
  { pair: "maths-min-sum-reciprocals", keep: "b6375fba-0590-4b0d-ab12-c08cf8ed715b", drop: "eaeaa47a-49e1-40c1-a642-0bbdf96d61c5",
    why: "byte-identical stems and the same answer; keeper is in a paper and the withdrawn row is in none" },
];

async function main() {
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  console.log(APPLY ? "APPLYING\n" : "DRY RUN — nothing written\n");

  // ---------- A. key flips ----------
  for (const f of FLIPS) {
    const { data: q, error } = await db.from("questions").select("id, text, context, content_hash").eq("id", f.id).single();
    if (error || !q) throw new Error(`${f.id}: ${error?.message ?? "not found"}`);
    const { data: opts } = await db.from("options").select("id, label, text, is_correct").eq("question_id", f.id).order("label");
    if (!opts || opts.length !== 4) throw new Error(`${f.id}: expected 4 options, got ${opts?.length}`);

    const cur = opts.find((o) => o.is_correct);
    const next = opts.find((o) => o.text.trim().toLowerCase() === f.to.toLowerCase());
    // assert the BEFORE state, so a re-run or a changed row refuses rather than double-applying
    if (!cur || cur.text.trim().toLowerCase() !== f.from.toLowerCase())
      throw new Error(`${f.id}: expected current key "${f.from}", found "${cur?.text}"`);
    if (!next) throw new Error(`${f.id}: no option matching "${f.to}"`);

    const optTexts = opts.map((o) => o.text);
    // SELF-CHECK: the helper must reproduce the row's EXISTING hash from its CURRENT key before
    // its output for a new key is trusted. A silently wrong call would store a hash that dedup
    // can never match, and nothing downstream would notice.
    const reHash = contentHash(q.text, optTexts, cur.label);
    if (reHash !== q.content_hash)
      throw new Error(
        `${f.id}: contentHash self-check FAILED — recomputed ${reHash.slice(0, 12)} from the current ` +
          `key but the row stores ${q.content_hash.slice(0, 12)}. Refusing to write a hash I cannot reproduce.`,
      );
    const newHash = contentHash(q.text, optTexts, next.label);

    console.log(`FLIP ${f.id}`);
    console.log(`   ${cur.label} "${cur.text}"  ->  ${next.label} "${next.text}"`);
    console.log(`   hash ${q.content_hash.slice(0, 12)} -> ${newHash.slice(0, 12)}`);
    console.log(`   why: ${f.why}`);

    if (APPLY) {
      const u1 = await db.from("options").update({ is_correct: false }).eq("id", cur.id);
      if (u1.error) throw u1.error;
      const u2 = await db.from("options").update({ is_correct: true }).eq("id", next.id);
      if (u2.error) throw u2.error;
      const u3 = await db.from("questions").update({ solution: f.solution, content_hash: newHash }).eq("id", f.id);
      if (u3.error) throw u3.error;
      const r = await db.from("question_reviews").insert({
        question_id: f.id,
        run_label: RUN_LABEL,
        method: "blind_rederivation",
        verdict: "key_fixed",
        reviewed_content_hash: newHash,
        note: f.why.slice(0, 500),
      });
      if (r.error) console.log(`   (review row not written: ${r.error.message})`);
      console.log("   applied.");
    }
    console.log();
  }

  // ---------- B. duplicate withdrawals ----------
  for (const w of WITHDRAW) {
    for (const [role, id] of [["keep", w.keep], ["drop", w.drop]] as const) {
      const { data, error } = await db.from("questions").select("id, visibility").eq("id", id).single();
      if (error || !data) throw new Error(`${w.pair} ${role} ${id}: ${error?.message ?? "not found"}`);
      if (role === "keep" && data.visibility !== "PUBLIC") throw new Error(`${w.pair}: keeper ${id} is ${data.visibility}, expected PUBLIC`);
    }
    console.log(`WITHDRAW ${w.pair}: ${w.drop} -> PRIVATE   (keep ${w.keep})`);
    console.log(`   why: ${w.why}`);
    if (APPLY) {
      const u = await db.from("questions").update({ visibility: "PRIVATE" }).eq("id", w.drop).eq("visibility", "PUBLIC");
      if (u.error) throw u.error;
      console.log("   applied.");
    }
  }
  console.log(`\n${FLIPS.length} key flip(s), ${WITHDRAW.length} withdrawal(s)` + (APPLY ? " — written" : " — dry run"));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
