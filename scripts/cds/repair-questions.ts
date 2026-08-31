/**
 * Repair CDS English questions against the printed booklet, and re-stamp each
 * row's hash.
 *
 *   npx tsx scripts/cds/repair-questions.ts          # dry run
 *   npx tsx scripts/cds/repair-questions.ts --apply
 *
 * Two campaigns live here, sharing one set of guards rather than two copies:
 * the Eng_CDS_2019_2.pdf Sentence-Rearrangement set (8 rows), and two isolated
 * stem defects found while reviewing other sets (2020-2 Q20, 2025-1 Q86).
 *
 * WHY. An "ordering of sentences" item prints six sentences: S1 and S6 are the
 * fixed first and last, P/Q/R/S are the jumbled middle, and the ANSWER IS A
 * SEQUENCE OF THE MIDDLE FOUR. S6 is therefore load-bearing - it is the terminal
 * sentence every candidate ordering has to run into - and eight of this set's
 * nine rows carry a wrong one while still LOOKING complete.
 *
 * Found 2026-08-30 (see scripts/cds/audit-rearrangement.ts, which detects only
 * the copy classes and flagged 4 of the 7 it could see). Every correction below
 * was READ OFF THE PRINTED PAGE - Eng_CDS_2019_2.pdf, printed pp.10-13, rendered
 * because the booklet has no text layer - which is the only condition under which
 * scripts/cds/fix-keys.ts permits a stem repair.
 *
 * THREE KEYS MOVE, AND THEY MOVE AS A CONSEQUENCE OF THE STEM, NOT INSTEAD OF IT.
 * On Q49/Q50/Q51 the original pass answered correctly FOR THE CORRUPTION it was
 * given; with the printed S6 restored the sequence changes. This is the 2025-1
 * Q111 pattern: the stem is the root defect and the wrong key is its consequence.
 *
 * `content_hash` covers stem + options + answer (src/lib/upload/hash.ts), so all
 * three edits are made in ONE write and the hash re-stamped once, using the real
 * helper rather than a local re-implementation.
 *
 * Guarded: the stored hash must recompute from the row as it stands (else the row
 * is refused, not repaired), every declared line label must exist, every option
 * edit must name a real label, the key must be where we think it is, and the new
 * hash must not collide with another row of the same exam. A row already carrying
 * the repaired text is skipped as a no-op, so a re-run is safe.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { contentHash } from "../../src/lib/upload/hash";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error("missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");

/**
 * Replace one labelled sentence outright.
 *
 * ONLY `set`, deliberately. An earlier draft also offered `swap`, which is an
 * INVOLUTION - applying it twice restores the original - so the "already
 * repaired?" check, which works by applying the edits and comparing, can never
 * detect a completed swap and a re-run silently un-repairs the row. (It was the
 * keyFrom guard, not the no-op check, that caught this on the first re-run.)
 * A `set` is idempotent, so every repair here is safe to re-run.
 */
type LineEdit =
  | { kind: "set"; label: string; to: string }
  /**
   * Substring replacement on the whole stem, for questions that are not in the
   * labelled six-sentence form. Must match EXACTLY ONCE, or the repair is
   * refused rather than applied to a near-miss. Already-applied is detected by
   * `from` being absent while `to` is present, which keeps it idempotent.
   */
  | { kind: "replace"; from: string; to: string };

type Repair = {
  id: string;
  where: string;
  lines: LineEdit[];
  options?: { label: string; to: string }[];
  keyFrom?: string;
  keyTo?: string;
  why: string;
};

const REPAIRS: Repair[] = [
  {
    id: "78f8bb4b-4780-4e14-bfc6-bc0a562c63af",
    where: "Q48 Gandhiji at Newcastle",
    // Two defects at once: S6 held the printed P, and P held a sentence belonging
    // to a DIFFERENT QUESTION - Q52's "There is a range of strategies by which the
    // food is taken in and used by the organism", a food-digestion line inside a
    // Gandhiji item. Q/R/S were correct. Key unaffected: QRPS is right either way.
    lines: [
      {
        kind: "set",
        label: "S6",
        to: "The treatment that was meted out to these brave men and women in jail included starvation and whipping, and being forced to work in the mines by mounted military police.",
      },
      {
        kind: "set",
        label: "P",
        to: "During the course of the march, Gandhiji was arrested twice, released, arrested a third time and sent to jail.",
      },
    ],
    why: "S6 held the printed P; P held Q52's sentence. Restored from printed p10. Key (a) QRPS unchanged and correct: Q (employers retaliate) -> R (Gandhiji decides to march this army over the border) -> P (during the march he is arrested) -> S (morale high, they march on till jailed) -> S6 (the treatment in jail).",
  },
  {
    id: "0c9057e2-2108-444f-bd35-a0a408f0c322",
    where: "Q49 socialism and the Industrial Revolution",
    lines: [
      { kind: "set", label: "S6", to: "This is how socialism as a theory and practice came into being." },
      { kind: "set", label: "S", to: "The Industrial Revolution solved the question of production." },
    ],
    keyFrom: "D",
    keyTo: "B",
    why: "S6 and S were exchanged. With the printed text the sequence is (b) SRQP: S (the Industrial Revolution solved the question of production) -> R (it generated new wealth but could not solve distribution) -> Q (the gulf between haves and have-nots widened) -> P (socialism was a direct challenge to capitalism) -> S6 (this is how socialism came into being). 'It' in R refers to the IR in S, and 'such an exploitative economic structure' in P refers to the gulf in Q.",
  },
  {
    id: "a6449904-ccfa-4154-8223-d4ae949f815a",
    where: "Q50 institutions",
    lines: [
      {
        kind: "set",
        label: "S6",
        to: "It shows how important it is for a nation to build institutions for nurturing democracy.",
      },
    ],
    keyFrom: "A",
    keyTo: "D",
    why: "S6 was a byte-identical copy of S; the real S6 was lost. The stored (a) RPQS opens on R 'At the same time...' immediately after S1, with nothing to be simultaneous with, so it cannot be right. (d) QSRP keeps Q and S together - both 'They ...' clauses, and S's 'also' attaches directly to Q - then R introduces the reverse direction, then P's 'they mutually affect each other' gives S6's 'It shows' its antecedent.",
  },
  {
    id: "f52bf29e-45fe-4bd5-9ea1-325b55505ae6",
    where: "Q51 idioms",
    lines: [
      {
        kind: "set",
        label: "S6",
        to: "Idioms may also suggest a particular attitude of the person using them, for example, disapproval, humour, exasperation or admiration, so you must use them carefully.",
      },
      {
        kind: "set",
        label: "S",
        to: "One of the main problems students have with idioms is that it is often impossible to guess the meaning of an idiom from the words it contains.",
      },
    ],
    keyFrom: "C",
    keyTo: "D",
    why: "S6 and S were exchanged. With the printed text the sequence is (d) QPSR: Q (idioms are commonly used in all types of language) continues S1 naturally, then P (your language skills will increase), then S (the main problem is that meaning cannot be guessed), then R ('In addition, idioms often have a stronger meaning'), which chains into S6's 'may also suggest ... so you must use them carefully'. The stored (c) SRQP opens on the problem statement immediately after 'Idioms are a colourful and fascinating aspect of language', an abrupt pivot, and strands P before S6.",
  },
  {
    id: "3306750e-290a-4859-a221-1e81dcbd16de",
    where: "Q52 nutrition in organisms",
    lines: [
      {
        kind: "set",
        label: "S6",
        to: "What can be taken in and broken down depends on the body design and functioning.",
      },
    ],
    why: "S6 was a byte-identical copy of S; the real S6 was lost. Key (a) RQPS unchanged and correct.",
  },
  {
    id: "db853e13-465b-4ee9-839b-1626a971ed9b",
    where: "Q53 the Happy Prince",
    // The worst row of the set: S6 held the printed S, S held a sentence printed
    // NOWHERE on the page ("And the others laughed and were happy too."), and
    // options (c) and (d) were copied verbatim from Q52's option set.
    lines: [
      {
        // The bank also dropped the opening quote and the one after "heart".
        // Repaired while the row is open: the hash moves regardless, and a
        // faithful stem costs nothing extra.
        kind: "set",
        label: "S1",
        to: '"When I was alive and had a human heart," answered the statue, "I did not know what tears were, for I lived in the Palace of Sans-Souci where sorrow is not allowed to enter."',
      },
      {
        kind: "set",
        label: "S6",
        to: 'And now that I am dead they have set me up here so high that I can see all the ugliness and all the misery of my city, and though my heart is made of lead yet I cannot choose but weep."',
      },
      {
        kind: "set",
        label: "S",
        to: "In the daytime I played with my companions in the garden, and in the evening I led the dance in the Great Hall.",
      },
    ],
    options: [
      { label: "C", to: "PRQS" },
      { label: "D", to: "RPQS" },
    ],
    why: "S6 held the printed S; S held a sentence absent from the page; options (c) and (d) were Q52's. All restored from printed p12, the option letters confirmed at 420 dpi. Key (a) QSRP unchanged: only (a) ends on P 'So I lived, and so I died', which must immediately precede S6 'And now that I am dead ...'. Worth recording that Wilde's own order is SQRP, which this paper does not offer - a defect of the printed item, not of the transcription.",
  },
  {
    id: "b6b2383a-b84b-4434-9011-ef6fdee208a0",
    where: "Q54 Little Red Riding Hood",
    lines: [{ kind: "set", label: "S6", to: '"Does she live far off?" said the wolf.' }],
    why: "S6 was a copy of S with a word corrupted ('She MET immediately to go' for the printed 'She SET OUT immediately'); the real S6 was lost. Key (b) SRPQ unchanged and correct.",
  },
  {
    id: "9bd34df6-1c65-465e-8aa9-7681047417b3",
    where: "Q55 the man-eater",
    // THE WORST ROW OF THE SET: five of its six lines are wrong, and the printed
    // P ("I bitterly regretted the impulse ...") is absent from the bank
    // altogether. S6 held a mangled S; P held the printed S6 with "heard nor
    // seen" transposed; Q was rewritten down to a third of its length; R merged
    // the printed R with S and read "which I was looking" for "which I was
    // facing"; S was truncated mid-sentence. Only S1 survived.
    //
    // Caught only because the dry run printed EVERY line rather than the ones the
    // repair touched - an S6-only fix would have shipped a row still carrying
    // three mangled sentences while reporting it repaired.
    lines: [
      {
        kind: "set",
        label: "S6",
        to: "It was in this position my men an hour later found me fast asleep; of the tiger I had neither heard nor seen anything.",
      },
      {
        kind: "set",
        label: "P",
        to: "I bitterly regretted the impulse that had induced me to place myself at the man-eater's mercy.",
      },
      {
        kind: "set",
        label: "Q",
        to: "The length of road immediately in front of me was brilliantly lit by the moon, but to right and left the overhanging trees cast dark shadows, and when the night wind agitated the branches and the shadows moved, I saw a dozen tigers advancing on me.",
      },
      {
        kind: "set",
        label: "R",
        to: "As the grey dawn was lighting up the snowy range which I was facing, I rested my head on my drawn-up knees.",
      },
      {
        kind: "set",
        label: "S",
        to: "I lacked the courage to return to the village and admit I was too frightened to carry out my self-imposed task, and with teeth chattering, as much from fear as from cold, I sat out the long night.",
      },
    ],
    why: "Five of six lines were wrong and the printed P was missing entirely; all restored from printed p13. Key (a) QPSR unchanged and correct - S6's 'It was in this position' refers to R's 'I rested my head on my drawn-up knees', which fixes R immediately before S6.",
  },

  // ── Isolated stem defects found while reviewing other sets, 2026-08-30 ──────

  {
    id: "bd065553-6061-4902-8a47-8213ec6d6ffb",
    where: "2020-2 Q20 spotting errors — irrigation works",
    // THE 2025-1 Q111 PATTERN AGAIN: the stem is the root defect and the wrong
    // key is its consequence. Printed p6 gives part (a) as "Irrigation works HAVE
    // a special importance"; the bank dropped "have", leaving a verbless fragment
    // that reads as the error. The original pass then answered correctly FOR THAT
    // CORRUPTION and keyed (a). With the word restored, (a) is sound and the real
    // error is (b) "in AN agricultural COUNTRIES", an article/number mismatch.
    //
    // The stem and option (a) carry the same text, so BOTH are repaired - a
    // stem-only fix would leave the option contradicting the question it belongs to.
    lines: [
      {
        kind: "replace",
        from: "Irrigation works a special importance",
        to: "Irrigation works have a special importance",
      },
    ],
    options: [{ label: "A", to: "Irrigation works have a special importance" }],
    keyFrom: "A",
    keyTo: "B",
    why: "Part (a) lost the word 'have', which made it read as the error and drove the key to (a). Restored from printed p6; the error is (b) 'in an agricultural countries like India'.",
  },
  {
    id: "00fcaeb6-0a73-49d5-b005-bdf5529be3b8",
    where: "2025-1 Q86 discourse markers — Church/State registration",
    // A MEANING-INVERTING defect that does NOT move the key: the blank takes a
    // discourse marker, so (c) 'Later' is right either way. Repaired anyway
    // because the stem as stored asserts the opposite of what the page says, and
    // of what actually happened in Europe.
    lines: [
      {
        kind: "replace",
        from: "the Church took over the State registration of births, death, and marriages",
        to: "the State took over from the Church the registration of births, death, and marriages",
      },
    ],
    why: "The bank reversed the direction of the transfer. Printed p21 reads 'the process by which the State took over from the Church the registration of births, death, and marriages was complete by 1792 in Europe'. Key (c) Later unchanged and correct.",
  },
];

type Row = {
  id: string;
  org_id: string;
  exam_id: string;
  question_number: string | null;
  text: string;
  content_hash: string;
  options: { id: string; label: string; text: string; is_correct: boolean }[];
};

/** Split "S1: ...\nS6: ..." into ordered [label, text] pairs. */
function parseLines(stem: string): { label: string; text: string }[] {
  return stem.split("\n").map((line) => {
    const m = line.match(/^([A-Z][0-9]?)\s*:\s*(.*)$/);
    if (!m) throw new Error(`unparseable stem line: ${JSON.stringify(line)}`);
    return { label: m[1], text: m[2] };
  });
}

const render = (parts: { label: string; text: string }[]) =>
  parts.map((p) => `${p.label}: ${p.text}`).join("\n");

export function applyLineEdits(stem: string, edits: Extract<LineEdit, { kind: "set" }>[]): string {
  const parts = parseLines(stem);
  const at = (label: string) => {
    const i = parts.findIndex((p) => p.label === label);
    if (i === -1) throw new Error(`no ${label} line in stem`);
    return i;
  };
  for (const e of edits) parts[at(e.label)].text = e.to;
  return render(parts);
}

export function applyStemEdits(stem: string, edits: LineEdit[]): string {
  const replaces = edits.filter((e): e is Extract<LineEdit, { kind: "replace" }> => e.kind === "replace");
  const sets = edits.filter((e): e is Extract<LineEdit, { kind: "set" }> => e.kind === "set");
  let out = stem;
  for (const e of replaces) {
    const n = out.split(e.from).length - 1;
    if (n === 0) {
      if (out.includes(e.to)) continue; // already applied
      throw new Error(`stem does not contain ${JSON.stringify(e.from)} — refusing`);
    }
    if (n > 1) throw new Error(`stem contains ${JSON.stringify(e.from)} ${n} times — refusing`);
    out = out.split(e.from).join(e.to);
  }
  return sets.length ? applyLineEdits(out, sets) : out;
}

async function main() {
  const apply = process.argv.includes("--apply");
  const db = createClient(url!, key!, { auth: { persistSession: false } });

  let changed = 0;
  let skipped = 0;

  for (const r of REPAIRS) {
    const { data, error } = await db
      .from("questions")
      .select("id, org_id, exam_id, question_number, text, content_hash, options(id, label, text, is_correct)")
      .eq("id", r.id)
      .maybeSingle();
    if (error) throw new Error(`${r.where}: ${error.message}`);
    if (!data) throw new Error(`${r.where}: no such question ${r.id}`);
    const row = data as unknown as Row;

    const opts = [...row.options].sort((a, b) => a.label.localeCompare(b.label));
    const curKey = opts.find((o) => o.is_correct)?.label ?? "";

    const nextText = applyStemEdits(row.text, r.lines);
    const nextOpts = opts.map((o) => {
      const fix = r.options?.find((f) => f.label === o.label);
      return fix ? { ...o, text: fix.to } : o;
    });
    for (const f of r.options ?? []) {
      if (!opts.some((o) => o.label === f.label)) throw new Error(`${r.where}: no option ${f.label}`);
    }
    const nextKey = r.keyTo ?? curKey;

    const done =
      nextText === row.text &&
      nextOpts.every((o, i) => o.text === opts[i].text) &&
      nextKey === curKey;
    if (done) {
      console.log(`${r.where}: already repaired — skipping (no-op).`);
      skipped++;
      continue;
    }

    // Refuse a row whose stored hash does not recompute: something else has
    // edited it and the declared repair was not derived against this text.
    const recomputed = contentHash(row.text, opts.map((o) => o.text), curKey);
    if (recomputed !== row.content_hash) {
      throw new Error(
        `${r.where}: stored content_hash does not recompute from the row as it stands — refusing.`
      );
    }
    if (r.keyFrom !== undefined && curKey !== r.keyFrom) {
      throw new Error(`${r.where}: key is ${curKey}, expected ${r.keyFrom} — refusing.`);
    }

    const newHash = contentHash(nextText, nextOpts.map((o) => o.text), nextKey);
    const { data: clash } = await db
      .from("questions")
      .select("id")
      .eq("org_id", row.org_id)
      .eq("exam_id", row.exam_id)
      .eq("content_hash", newHash)
      .neq("id", row.id)
      .limit(1);
    if (clash?.length) throw new Error(`${r.where}: new hash collides with ${clash[0].id} — refusing.`);

    console.log(`\n${"=".repeat(72)}\n${r.where}  (${row.id})`);
    console.log(`  ${r.why}`);
    if (r.lines.every((e) => e.kind === "set")) {
      for (const line of parseLines(nextText)) {
        const before = parseLines(row.text).find((p) => p.label === line.label)?.text;
        const mark = before === line.text ? "   " : " * ";
        console.log(`${mark}${line.label}: ${line.text.slice(0, 96)}`);
      }
    } else {
      console.log(` * stem: ${JSON.stringify(row.text.slice(0, 110))}`);
      console.log(`      -> ${JSON.stringify(nextText.slice(0, 110))}`);
    }
    for (const f of r.options ?? []) {
      const before = opts.find((o) => o.label === f.label)!.text;
      console.log(` * option ${f.label}: ${JSON.stringify(before)} -> ${JSON.stringify(f.to)}`);
    }
    if (nextKey !== curKey) console.log(` * key: ${curKey} -> ${nextKey}`);
    console.log(`  hash ${row.content_hash.slice(0, 12)}… -> ${newHash.slice(0, 12)}…`);
    changed++;

    if (!apply) continue;

    const { error: e1 } = await db
      .from("questions")
      .update({ text: nextText, content_hash: newHash })
      .eq("id", row.id);
    if (e1) throw new Error(`${r.where}: ${e1.message}`);

    for (const f of r.options ?? []) {
      const target = opts.find((o) => o.label === f.label)!;
      const { error: e2 } = await db.from("options").update({ text: f.to }).eq("id", target.id);
      if (e2) throw new Error(`${r.where} option ${f.label}: ${e2.message}`);
    }
    if (nextKey !== curKey) {
      for (const o of opts) {
        const { error: e3 } = await db
          .from("options")
          .update({ is_correct: o.label === nextKey })
          .eq("id", o.id);
        if (e3) throw new Error(`${r.where} key ${o.label}: ${e3.message}`);
      }
    }
    console.log(`  applied.`);
  }

  console.log(`\n${changed} to change · ${skipped} already repaired`);
  if (!apply) console.log(`[dry run] pass --apply to write.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
