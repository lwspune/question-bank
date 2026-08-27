/**
 * Correct a wrong answer key on a CDS English question, and re-stamp its hash.
 *
 *   npx tsx scripts/cds/fix-keys.ts          # dry run
 *   npx tsx scripts/cds/fix-keys.ts --apply
 *
 * WHY THIS EXISTS. The CDS corpus was ingested from scanned booklets that carry
 * NO printed answer key, so every answer is LLM-derived — which is why all 2,280
 * rows are still PRIVATE pending a human spot-check. A blind re-derivation of the
 * 27 rows the NDA GAT HARD mock wanted to draw found 10 defective (37%), and the
 * dominant failure is stark: the key names the ANTONYM of the target word.
 *
 * ONLY keys with a single unambiguous correct answer are corrected here. A
 * question whose remaining options are all defensible, or whose correct answer is
 * not among the options at all, is NOT "corrected" — picking a winner there would
 * manufacture a key rather than fix one. Those are excluded from the paper
 * instead, and listed at the bottom of this file so the next reader inherits the
 * finding rather than re-deriving it.
 *
 * ⚠ A BLIND PASS ON A VOCABULARY ITEM MUST BE GIVEN THE DIRECTIONS. Three of the
 * four fixes below were WRONG and have been reverted (see REVERTED). The pass ran
 * against "stem + options only" — which withholds the key, correctly, but ALSO
 * withheld the section directions. For an antonym item the directions ARE the
 * question: "John is a magniloquent person" plus four words is not a question, it
 * is a word list, and an agent with no directions answers the synonym question
 * every time. Withhold the KEY. Never withhold the TASK.
 *
 * `content_hash` COVERS THE ANSWER LETTER (see src/lib/upload/hash.ts), so
 * flipping a key silently invalidates the row's dedup identity: a later re-ingest
 * of the same question would hash differently and insert a SECOND copy. Every fix
 * therefore re-stamps the hash using the real helper — never a local re-implementation.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { contentHash } from "../../src/lib/upload/hash";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

type Fix = {
  id: string;
  from: string;
  to: string;
  why: string;
  /**
   * OPTIONAL stem repair, applied in the same write as the key flip so the hash
   * is re-stamped once over both.
   *
   * Guarded the same way the key is: `stemFrom` must match the stored text
   * EXACTLY or the fix is refused, so a re-run cannot repair a row twice or
   * repair a row it was not derived against.
   *
   * ⚠ ONLY permitted when the correct text was READ OFF THE SOURCE BOOKLET.
   * UNFIXABLE below records the opposing case ("repairing it to what makes the
   * key fit, which the repair policy forbids without the source booklet") — the
   * distinction is the page, not the plausibility. A stem repair that makes the
   * STORED key fit is the forbidden move; one that proves the stored key wrong,
   * from the page, is the permitted one.
   */
  stemFrom?: string;
  stemTo?: string;
};

/**
 * Blind-re-derived 2026-08-21 against stem + options only, key withheld.
 *
 * Only the Q55 grammar fix survives. The three vocabulary "fixes" were reverted
 * 2026-08-22 — see REVERTED below and the ⚠ in the header.
 */
const FIXES: Fix[] = [
  {
    id: "74727659-8411-49c4-8b33-cdbd2bd0130a",
    from: "B",
    to: "A",
    why: "'A biography is ___ person's life history' — keyed 'about', which leaves the sentence ungrammatical ('about person's life history'). Only 'about a' supplies the article the noun phrase needs. (Section type is fill-blank-grammar, so no directions ambiguity: this fix stands.)",
  },
  {
    // 2025-1 Q111, cloze set fecd882e…:S15. Found 2026-08-27 while topping up the
    // set for NDA GAT Mock 3, and VERIFIED against the printed booklet
    // (Eng_CDS_2025_1.pdf, printed p27 — rendered, no text layer).
    //
    // The stem is the root defect and the wrong key is its consequence: the
    // transcription quoted the sentence around blank *114* ("give us ___
    // magnificent examples of the ... eye"), and the original LLM pass then
    // answered for THAT sentence — its stored reasoning says so outright,
    // "a present participle adjective 'moving' fits before 'magnificent
    // examples'". Printed p28 confirms that sentence belongs to 114, whose own
    // stem and key ('observant') are correct and untouched.
    //
    // The page prints blank 111 at the passage opening:
    //   111. ____ (a) Moved (b) Moving (c) Having moved (d) Moves
    //        by the charm of Nature around him, man has expressed his
    //        appreciation of it in works of art produced by him.
    // "Moved by the charm of Nature ..., man has expressed ..." — a past
    // participle adjunct, since man is acted upon. (b) is the wrong voice, (c)
    // would need "Having been moved", (d) is a finite verb.
    //
    // Derived BLIND (key and stored solution withheld at query time) before the
    // page was opened, and the page then agreed.
    id: "38e775fc-98b3-493d-a498-b1037b39efce",
    from: "B",
    to: "A",
    stemFrom: 'Blank (111): "... give us ___ magnificent examples of the ... eye and the trained hand ..."',
    stemTo: 'Blank (111): "___ by the charm of Nature around him, man has expressed his appreciation of it in works of art produced by him."',
    why: "2025-1 Q111 cloze: the stem quoted blank 114's sentence, and the key was derived from that corruption. Printed p27 puts blank 111 at the passage opening — 'Moved by the charm of Nature around him, man has expressed ...' — so the answer is the past participle (a) Moved, not (b) Moving.",
  },
];

/**
 * FIXES THAT WERE THEMSELVES WRONG, reverted by apply-key-reverts.ts.
 *
 * All three sit in sections whose type in scripts/cds/data/*.sections.json is
 * `antonyms`, whose stored `context` reads "opposite in meaning to the underlined
 * word", and whose stored `subtopic` is literally "Antonyms". The blind pass never
 * saw any of that, so it answered the synonym question — and each `why` below
 * gives the game away by rejecting the original key BECAUSE it is "the exact
 * antonym", which on an antonym paper is the reason to KEEP it.
 *
 * The option sets settle it. Read as antonym questions each has exactly one
 * defensible answer and three synonyms of the target word; read as synonym
 * questions each has THREE defensible answers. The fix pass even noticed this and
 * recorded it as "the option set is weak even after the fix" — that weakness was
 * the symptom of reading the wrong task, not a flaw in the question.
 *
 * ⚠ DO NOT MOVE THESE BACK INTO `FIXES`. After the revert each row is once again
 * in exactly the `from` state the guard above expects, so a re-run would reapply
 * the bad fix silently rather than failing closed.
 */
export const REVERTED: (Fix & { reverted: string })[] = [
  {
    id: "43ecdc7c-2d7f-4af1-8463-6e2f1ecb7ecd",
    from: "B",
    to: "D",
    why: "'This river originates from the Ganges' — keyed 'culminates', which means to REACH AN END, the opposite of originates. 'Emanates' (issues/flows from) is the only option carrying the sense; 'initiates' and 'inaugurates' are transitive and take an object.",
    reverted:
      "2021-2 Q83 is section type `antonyms`. 'Culminates' IS the answer precisely because it means to reach an end; 'emanates', 'initiates' and 'inaugurates' all carry the sense of beginning and are the three distractors. Key restored to B.",
  },
  {
    id: "073d69fc-0611-4c10-99c7-8156db0c3c28",
    from: "D",
    to: "A",
    why: "'magniloquent' keyed 'terse' — the exact antonym (magniloquent is speaking in a high-flown, bombastic way; terse is brief). 'Pompous' is the standard gloss. NOTE: 'turgid' and 'lofty' are also defensible, so the option set is weak even after the fix.",
    reverted:
      "2022-1 Q68 is section type `antonyms`. 'Terse' is the answer BECAUSE it is the exact antonym; pompous, turgid and lofty are three synonyms of magniloquent, which is why they read as 'also defensible' under a synonym reading. Key restored to D.",
  },
  {
    id: "4519eefc-b38a-462a-a033-d7e01e445385",
    from: "B",
    to: "D",
    why: "'vulnerable people' keyed 'impervious' — the exact antonym (impervious is impenetrable). 'Defenceless' is the closest synonym. NOTE: 'helpless' is also arguable, so the option set is weak even after the fix.",
    reverted:
      "2019-2 Q67 is section type `antonyms`. 'Impervious' is the answer BECAUSE it is the exact antonym; 'helpless' and 'defenceless' are both synonyms of vulnerable (hence 'also arguable') and 'imperious' is the unrelated distractor. Key restored to B.",
  },
];

/**
 * Defects a key change CANNOT repair — recorded, not fixed. Repairing these would
 * mean rewriting options or a stem, i.e. authoring new content and calling it a
 * correction. They are excluded from the paper in scripts/bank-paper/build.ts.
 */
export const UNFIXABLE: { id: string; why: string }[] = [
  { id: "1e9c3614-697e-4699-8131-b73baf9e595f", why: "Legal-terms match list: the correct mapping is A-2, B-3, C-4, D-1 (ex gratia = done for free; suo moto = on his own motion) and NO option offers it. The key swaps ex gratia and suo moto." },
  { id: "44be04c1-0a94-4811-8f04-05e489a2ad31", why: "Depose/Deplore/Deport: only sentence 3 uses its word correctly ('enthusiastically deplore the salutary impact' is self-contradictory), and '3 only' is not among the options." },
  { id: "88466cd1-95c8-44fe-8e43-5170b89efa78", why: "Stem is corrupt: 'Change from Passive to Active voice: They was to be a good cricketer' is neither passive nor grammatical. Repairing it to 'He was said to be...' would be repairing to what makes the key fit, which the repair policy forbids without the source booklet." },
  { id: "3bf1b011-af7a-4a30-8d52-bfd46aa98fc7", why: "'Continuously': keyed 'waves lapped continuously', but 'water flowing from a leaking tap continuously' is equally defensible — and lapping waves are arguably continual (repeated) rather than continuous. Two correct answers." },
  { id: "30273487-3b88-4370-a595-fff81eb513b8", why: "'not to be verbose': keyed 'exaggerate', which is a verb where an adjective is needed and is not a synonym of verbose. 'Succinct' is its antonym. No option is correct." },
  { id: "6c43498b-0192-446c-bd8a-e7ab02741672", why: "immanent/imminent: keyed 'Neither', but sentence 1 ('human rights is immanent in the constitution' = inherent) reads as correct usage, which would make it '1 only'. Genuinely disputed; not safe to flip." },
];

async function main() {
  const apply = process.argv.includes("--apply");
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  console.log(
    `CDS key corrections — ${FIXES.length} fix(es), ${UNFIXABLE.length} recorded as unfixable, ` +
      `${REVERTED.length} reverted as wrong (see REVERTED)\n`
  );

  for (const fix of FIXES) {
    const { data: q, error: qErr } = await client
      .from("questions")
      .select("id, text, content_hash, options(label, text, is_correct)")
      .eq("id", fix.id)
      .single();
    if (qErr || !q) throw new Error(`load ${fix.id}: ${qErr?.message ?? "not found"}`);

    const opts = (q.options ?? []) as { label: string; text: string; is_correct: boolean }[];
    const current = opts.filter((o) => o.is_correct).map((o) => o.label);

    // ALREADY APPLIED is a no-op, not a failure. Without this the guard below
    // makes the whole script un-runnable the moment any fix has been applied —
    // it throws on fix #1 and never reaches the rest — so a later correction
    // could not be added to this file at all. Distinguish three states:
    //   in `to` (and, for a stem fix, already repaired) -> skip
    //   in `from`                                       -> apply
    //   anything else                                   -> refuse
    const stemDone = fix.stemTo === undefined || q.text === fix.stemTo;
    if (current.length === 1 && current[0] === fix.to && stemDone) {
      console.log(`${fix.id}  already ${fix.to} — skipping (no-op).\n`);
      continue;
    }
    if (current.length !== 1 || current[0] !== fix.from) {
      // Fail closed: the row is not in the state this fix was derived against.
      throw new Error(`${fix.id}: expected key ${fix.from}, found [${current.join(",")}] — refusing.`);
    }
    if (!opts.some((o) => o.label === fix.to)) throw new Error(`${fix.id}: no option ${fix.to}`);

    // Same fail-closed guard as the key: the stored stem must be EXACTLY the text
    // this fix was derived against, so a re-run is a refusal rather than a second
    // repair applied to already-repaired text.
    if ((fix.stemFrom === undefined) !== (fix.stemTo === undefined)) {
      throw new Error(`${fix.id}: stemFrom and stemTo must be given together`);
    }
    if (fix.stemFrom !== undefined && q.text !== fix.stemFrom) {
      throw new Error(
        `${fix.id}: stem does not match stemFrom — refusing.\n  stored: ${JSON.stringify(q.text)}\n  expected: ${JSON.stringify(fix.stemFrom)}`
      );
    }
    const nextText = fix.stemTo ?? (q.text as string);

    const nextHash = contentHash(nextText, opts.map((o) => o.text), fix.to);
    console.log(`${fix.id}  ${fix.from} -> ${fix.to}`);
    if (fix.stemTo) {
      console.log(`  stem: ${JSON.stringify(fix.stemFrom)}\n     -> ${JSON.stringify(fix.stemTo)}`);
    }
    console.log(`  ${fix.why}`);
    console.log(`  hash ${(q.content_hash as string).slice(0, 12)}… -> ${nextHash.slice(0, 12)}…`);

    if (apply) {
      for (const o of opts) {
        const want = o.label === fix.to;
        if (o.is_correct === want) continue;
        const { error } = await client
          .from("options").update({ is_correct: want })
          .eq("question_id", fix.id).eq("label", o.label);
        if (error) throw new Error(`option ${o.label}: ${error.message}`);
      }
      const { error } = await client
        .from("questions")
        .update(fix.stemTo ? { content_hash: nextHash, text: nextText } : { content_hash: nextHash })
        .eq("id", fix.id);
      if (error) throw new Error(`hash ${fix.id}: ${error.message}`);
      console.log("  applied.");
    }
    console.log();
  }

  console.log("NOT fixable by a key change (excluded from the paper instead):");
  for (const u of UNFIXABLE) console.log(`  ${u.id}\n    ${u.why}`);

  if (!apply) console.log("\n[dry-run] pass --apply to write.");
}

main().catch((e) => { console.error(e); process.exit(1); });
