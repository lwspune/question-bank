/**
 * Revert three wrong key "corrections" on CDS English antonym questions, and fix
 * one solution that argues for the wrong letter.
 *
 *   npx tsx scripts/cds/apply-key-reverts.ts          # dry run
 *   npx tsx scripts/cds/apply-key-reverts.ts --apply
 *
 * WHY THIS EXISTS. fix-keys.ts blind-re-derived 27 CDS rows against "stem +
 * options only". Withholding the key is right; it also withheld the section
 * DIRECTIONS, and for a vocabulary item the directions are the question. Three of
 * its four fixes moved the key from the antonym to a synonym on sections whose
 * type is `antonyms`. Students sat the NDA GAT HARD mock against those keys.
 *
 * THE EVIDENCE IS IN THREE PLACES THAT AGREE: the section `type` in
 * scripts/cds/data/<paper>.sections.json, the row's stored `context` ("opposite in
 * meaning to the underlined word"), and the row's stored `subtopic` ("Antonyms").
 * All three are checked at run time below — this script will not write against a
 * row that fails any of them.
 *
 * `content_hash` COVERS THE ANSWER LETTER, so every key change re-stamps it using
 * the real helper (never a local re-implementation). `solution` is NOT a hash
 * input, so the Q55 solution rewrite is hash-neutral — asserted, not assumed.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { contentHash } from "../../src/lib/upload/hash";
import { recordReviews } from "../../src/lib/reviews/service";
import type { ReviewInput } from "../../src/lib/reviews/record";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const RUN_LABEL = "cds:antonym-key-revert-2026-08-22";

type Revert = {
  id: string;
  /** The key as fix-keys.ts left it — refuse if the row is not in this state. */
  from: string;
  /** The original, correct key. */
  to: string;
  word: string;
  why: string;
};

/**
 * Each `to` is the option that is the OPPOSITE of `word`; each `from` is a
 * synonym of it. See REVERTED in fix-keys.ts for the full reasoning.
 */
const REVERTS: Revert[] = [
  {
    id: "073d69fc-0611-4c10-99c7-8156db0c3c28",
    from: "A",
    to: "D",
    word: "magniloquent",
    why: "Section type `antonyms` (2022-1 Q68). 'Terse' (D) is the antonym; pompous/turgid/lofty are all synonyms of magniloquent.",
  },
  {
    id: "43ecdc7c-2d7f-4af1-8463-6e2f1ecb7ecd",
    from: "D",
    to: "B",
    word: "originates",
    why: "Section type `antonyms` (2021-2 Q83). 'Culminates' (B) is the antonym; emanates/initiates/inaugurates all carry the sense of beginning.",
  },
  {
    id: "4519eefc-b38a-462a-a033-d7e01e445385",
    from: "D",
    to: "B",
    word: "vulnerable",
    why: "Section type `antonyms` (2019-2 Q67). 'Impervious' (B) is the antonym; helpless/defenceless are synonyms and imperious is unrelated.",
  },
];

/**
 * The Q55 fix-keys correction was RIGHT (key A, 'about a'), but its solution text
 * was left arguing for B. Rewritten so the key and the reasoning agree.
 *
 * `expect` is matched exactly-once against the stored text before anything is
 * written: a rewrite that cannot find what it is replacing is refused rather than
 * force-applied.
 */
const SOLUTION_REWRITES: { id: string; expect: string; next: string; why: string }[] = [
  {
    id: "74727659-8411-49c4-8b33-cdbd2bd0130a",
    expect: "Answer: B.",
    next:
      "Answer: A. The noun phrase needs its article: \"A biography is about a person's life history.\" " +
      "Option (b) 'about' leaves \"about person's life history\", which is ungrammatical. " +
      "'For a' and 'with a' supply the article but the wrong preposition — a biography is written " +
      "*about* its subject, not for or with them.",
    why: "Key A is correct; the stored solution concluded B, so the printed answer key contradicted itself.",
  },
];

type Opt = { label: string; text: string; is_correct: boolean };

async function main() {
  const apply = process.argv.includes("--apply");
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  console.log(
    `CDS antonym key reverts — ${REVERTS.length} key(s), ${SOLUTION_REWRITES.length} solution rewrite(s)\n`
  );
  const reviews: ReviewInput[] = [];

  for (const r of REVERTS) {
    const { data: q, error } = await client
      .from("questions")
      .select("id, text, context, content_hash, options(label, text, is_correct), subtopics(name)")
      .eq("id", r.id)
      .single();
    if (error || !q) throw new Error(`load ${r.id}: ${error?.message ?? "not found"}`);

    const opts = (q.options ?? []) as Opt[];
    const current = opts.filter((o) => o.is_correct).map((o) => o.label);
    if (current.length !== 1 || current[0] !== r.from) {
      throw new Error(
        `${r.id}: expected key ${r.from}, found [${current.join(",")}] — refusing. ` +
          `The row is not in the state this revert was derived against.`
      );
    }
    if (!opts.some((o) => o.label === r.to)) throw new Error(`${r.id}: no option ${r.to}`);

    // The antonym claim is the whole basis of this revert — verify it against the
    // row itself rather than trusting the comment above.
    const ctx = (q.context ?? "").toLowerCase();
    const sub = ((q.subtopics as { name?: string } | null)?.name ?? "").toLowerCase();
    if (!ctx.includes("opposite in meaning")) {
      throw new Error(`${r.id}: context does not say "opposite in meaning" — refusing.`);
    }
    if (sub !== "antonyms") {
      throw new Error(`${r.id}: subtopic is "${sub}", expected "antonyms" — refusing.`);
    }

    const nextHash = contentHash(q.text as string, opts.map((o) => o.text), r.to);
    const fromText = opts.find((o) => o.label === r.from)?.text ?? "?";
    const toText = opts.find((o) => o.label === r.to)?.text ?? "?";
    console.log(`${r.id}  ${r.word}`);
    console.log(`  key ${r.from} (${fromText}) -> ${r.to} (${toText})`);
    console.log(`  ${r.why}`);
    console.log(`  hash ${(q.content_hash as string).slice(0, 12)}… -> ${nextHash.slice(0, 12)}…`);

    if (apply) {
      for (const o of opts) {
        const want = o.label === r.to;
        if (o.is_correct === want) continue;
        const { error: oe } = await client
          .from("options")
          .update({ is_correct: want })
          .eq("question_id", r.id)
          .eq("label", o.label);
        if (oe) throw new Error(`option ${o.label}: ${oe.message}`);
      }
      const { error: he } = await client
        .from("questions")
        .update({ content_hash: nextHash })
        .eq("id", r.id);
      if (he) throw new Error(`hash ${r.id}: ${he.message}`);
      console.log("  applied.");
    }
    // Hash stamped is the POST-edit value: this review's own edit is its output,
    // so stamping the old hash would make the row born stale.
    reviews.push({
      questionId: r.id,
      reviewedContentHash: nextHash,
      method: "source_key_crosscheck",
      verdict: "key_fixed",
      runLabel: RUN_LABEL,
      note: `Reverted a wrong 2026-08-21 blind fix. ${r.why} That pass was run without the section directions, so it answered the synonym question.`,
    });
    console.log();
  }

  for (const s of SOLUTION_REWRITES) {
    const { data: q, error } = await client
      .from("questions")
      .select("id, solution, content_hash")
      .eq("id", s.id)
      .single();
    if (error || !q) throw new Error(`load ${s.id}: ${error?.message ?? "not found"}`);

    const solution = (q.solution ?? "") as string;
    const hits = solution.split(s.expect).length - 1;
    if (hits !== 1) {
      throw new Error(`${s.id}: expected exactly one "${s.expect}", found ${hits} — refusing.`);
    }
    console.log(`${s.id}  solution rewrite`);
    console.log(`  ${s.why}`);
    console.log(`  was : ${solution.slice(0, 100)}…`);
    console.log(`  now : ${s.next.slice(0, 100)}…`);

    if (apply) {
      const { error: se } = await client
        .from("questions")
        .update({ solution: s.next })
        .eq("id", s.id);
      if (se) throw new Error(`solution ${s.id}: ${se.message}`);
      console.log("  applied.");
    }
    reviews.push({
      questionId: s.id,
      reviewedContentHash: q.content_hash as string,
      method: "source_key_crosscheck",
      verdict: "solution_rewritten",
      runLabel: RUN_LABEL,
      note: s.why,
    });
    console.log();
  }

  if (apply) {
    const res = await recordReviews(client, reviews);
    if (res.error) throw new Error(`question_reviews: ${res.error}`);
    console.log(
      `question_reviews: ${res.written} written (${res.accepted} accepted of ${res.attempted})` +
        (res.rejected.length ? `, ${res.rejected.length} rejected` : "")
    );
    for (const rej of res.rejected) console.log(`  rejected: ${JSON.stringify(rej)}`);
  } else {
    console.log(`[dry-run] would record ${reviews.length} question_reviews row(s).`);
    console.log("[dry-run] pass --apply to write.");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
