/**
 * Apply adjudicated ANSWER-KEY corrections to the CDS transcription JSONs.
 *
 *   npx tsx scripts/cds/apply-key-fixes.ts            # dry-run
 *   npx tsx scripts/cds/apply-key-fixes.ts --apply    # write
 *
 * WHY THESE EXIST — the defect class, found 2026-08-25
 * ----------------------------------------------------
 * Nine CDS questions had two or more character-identical options. That looked
 * like OCR noise; it was not. In five of them the transcriber had copied the
 * CORRECT option's text into the WRONG letter's slot and then keyed that
 * letter. So the duplicate was a SYMPTOM of a wrong key, not an independent
 * defect — the answer as CONTENT was right, the answer as a LETTER was wrong.
 *
 * That makes the repair two-sided and order-dependent: restoring the printed
 * option text (done separately, in the *.questions.json option edits) MOVES the
 * correct answer to a different letter, so a text-only repair leaves the key
 * pointing at a genuine distractor — strictly worse than the duplicate it fixed,
 * because the duplicate at least tripped `audit:keys` while the mis-key does not.
 *
 * Each entry below asserts BOTH the current (wrong) key and the expected new
 * one, and refuses the whole batch on any mismatch — so re-running after the
 * fix is a no-op rather than a second, blind rewrite.
 *
 * EVIDENCE: `printed` records the option letter→text as read off the source
 * booklet at 6-7x, and `why` states what decides the answer. The two
 * sentence-ordering rows were re-derived independently from the S1/S6 frame
 * before being accepted; the spelling and grammar rows are decidable from the
 * option set alone.
 */
import { join } from "node:path";
import { readFileSync, writeFileSync } from "node:fs";
import { dataPath, requirePaper } from "./config";

type Fix = {
  paper: string;
  number: number;
  from: string;
  to: string;
  why: string;
};

export const KEY_FIXES: Fix[] = [
  {
    paper: "2017-1",
    number: 64,
    from: "C",
    to: "D",
    why:
      "Sentence ordering. S1 (teaching over) -> R (terminal exam begins) -> P " +
      "('That will end on October 13') -> Q (stay at Lonavla) -> S (repair work) " +
      "-> S6 ('For this ... a longer stay is necessary'). R P Q S is printed (d); " +
      "printed (c) is R P S Q. The pre-repair (c) slot wrongly held the text 'R P Q S'.",
  },
  {
    paper: "2020-1",
    number: 97,
    from: "A",
    to: "B",
    why:
      "Spelling-select. Printed options: (a) Psudonym, (b) Pseudonym, " +
      "(c) Pseudanym, (d) Seeudonym. Only (b) is correctly spelt.",
  },
  {
    paper: "2020-2",
    number: 119,
    from: "A",
    to: "C",
    why:
      "Spelling-select. Printed options: (a) Dipthteria, (b) Diptheria, " +
      "(c) Diphtheria, (d) Diphthria. Only (c) is correctly spelt.",
  },
  {
    paper: "2021-2",
    number: 59,
    from: "A",
    to: "C",
    why:
      "Sentence ordering. S1 (different people, different hobbies) -> S (hobby " +
      "is a leisure-time activity) -> R (you use leisure in creative activity) -> " +
      "Q ('In due course THAT becomes your hobby') -> P ('Thus ... as many people, " +
      "so many hobbies') -> S6. S R Q P is printed (c). Printed (a) is P Q R S, " +
      "which puts Q's 'that' before any antecedent. The pre-repair (a) slot " +
      "wrongly held the text 'S R Q P'.",
  },
  {
    paper: "2024-2",
    number: 112,
    from: "B",
    to: "C",
    why:
      "Sentence improvement. 'Circumnavigate' is transitive and takes no " +
      "preposition, so (a) 'circumnavigated about' and (b) 'circumnavigated on' " +
      "are both wrong; (c) 'circumnavigated' is the improvement.",
  },
  {
    paper: "2020-2",
    number: 80,
    from: "D",
    to: "A",
    why:
      "Antonyms section ('opposite in meaning'), stem word 'confidants'. Printed " +
      "(a) opponents, (b) intimate, (c) close friend, (d) colleague. Only " +
      "'opponents' is an opposite; (b) and (c) are synonyms and (d) is a neutral " +
      "associate. The key had been derived while our (a) wrongly held (b)'s text, " +
      "so the real answer was invisible to the derivation.",
  },
  // ── The match-list block. These three are the defect the duplicate screen is
  // BLIND to: a swap or rotation of the option codes leaves four distinct
  // strings, so nothing flagged them. Each pairing below was re-derived from the
  // question's own List-I/List-II content, independently of the transcription.
  {
    paper: "2025-2",
    number: 80,
    from: "A",
    to: "B",
    why:
      "Match-list. Noun=Intuition(2), Verb=Intuit(4), Adverb=Intuitively(3), " +
      "Adjective=Intuitive(1) => A-2,B-4,C-3,D-1 = printed (b). Printed (a) is " +
      "A-2,B-3,C-4,D-1, which mis-pairs Verb and Adverb.",
  },
  {
    paper: "2025-2",
    number: 106,
    from: "A",
    to: "C",
    why:
      "Match-list. Feat=an achievement requiring great courage(4), Fate=the " +
      "development of events outside a person's control(1), Fathom=used to " +
      "measure depth of water(2), Faux pas=an embarrassing mistake(3) => " +
      "A-4,B-1,C-2,D-3 = printed (c). Printed (a) swaps Fate and Fathom.",
  },
  {
    paper: "2025-2",
    number: 110,
    from: "A",
    to: "B",
    why:
      "Match-list. Devious=skilful in using underhand tactics(2), Devolution=" +
      "transfer of power from higher to lower government(3), Detriment=the state " +
      "of being harmed or damaged(4), Detract=cause something to seem less " +
      "valuable(1) => A-2,B-3,C-4,D-1 = printed (b). Printed (a) swaps Devious " +
      "and Detract.",
  },
  // ── NOT a new adjudication: this MIRRORS a correction that already exists in
  // the database back into the source of record. A previous session fixed this
  // key live (run `cds:antonym-key-revert-2026-08-22`) and never wrote it to the
  // JSON, so source and DB disagreed — and because `content_hash` covers the
  // answer, the next re-commit would have INSERTED the JSON's wrong version and
  // left the correct live row looking superseded. `resync.ts` would then have
  // deleted the right row and kept the wrong one; it refused only because this
  // question is used in a teacher's paper. Fixing the source closes the loop.
  {
    paper: "2021-1",
    number: 55,
    from: "B",
    to: "A",
    why:
      "Stem: 'A biography is _______ person's life history.' The blank precedes " +
      "the bare noun \"person's\", so it must supply the article: (a) 'about a' " +
      "gives 'about a person's life history', while (b) 'about' gives 'about " +
      "person's life history'. The JSON's stored reasoning misread the stem as " +
      "already containing 'a'. The LIVE key is already A and is correct; this " +
      "entry exists to make the source agree with it.",
  },
  // ── The 2025-1 Q71-80 block: SEVEN of ten rows carried another question's
  // code table. Cause is layout, not reading: that page prints three questions
  // and three `Code:` tables in two columns, and in column flow the
  // right-column-top table belongs to the question whose lists END the left
  // column — not to the question printed beside it. The transcriber paired by
  // physical adjacency. The assignment is forced by the data rather than
  // assumed: under column flow every derived pairing lands on exactly one
  // printed row, and under the adjacency reading none of them does.
  {
    paper: "2025-1",
    number: 71,
    from: "D",
    to: "B",
    why:
      "Vernacular=language of ordinary people(2), Rhetoric=intended to influence(1), " +
      "Parlance=used by a particular group(4), Jargon=specialized communication(3) " +
      "=> A-2,B-1,C-4,D-3 = printed (b).",
  },
  {
    paper: "2025-1",
    number: 72,
    from: "D",
    to: "A",
    why:
      "Internecine=between people of the same community(3), Revoke=cancelling an " +
      "agreement(1), Exonerate=clear from accusation(2), Venerable=valued and " +
      "respected(4) => A-3,B-1,C-2,D-4 = printed (a).",
  },
  {
    paper: "2025-1",
    number: 73,
    from: "D",
    to: "C",
    why:
      "Atonement=making amends(4), Sacrilege=contaminating a holy place(2), " +
      "Clawback=retrieving money already paid(1), Bandwagon=involvement of a large " +
      "number(3) => A-4,B-2,C-1,D-3 = printed (c).",
  },
  {
    paper: "2025-1",
    number: 74,
    from: "D",
    to: "C",
    why:
      "Felony=serious crime(3), Restitution=return a lost or stolen article(2), " +
      "Chagrin=distressed on account of humiliation(4), Diatribe=long written " +
      "criticism(1) => A-3,B-2,C-4,D-1 = printed (c).",
  },
  {
    paper: "2025-1",
    number: 75,
    from: "C",
    to: "D",
    why:
      "Wrangle=complicated and prolonged argument(3), Wacky=amusing and strange(2), " +
      "Codex=an ancient text(4), Postscript=additional piece added to the main " +
      "text(1) => A-3,B-2,C-4,D-1 = printed (d).",
  },
  {
    paper: "2025-1",
    number: 77,
    from: "A",
    to: "B",
    why:
      "Ex gratia=done for free(2), Suo moto=on his own motion(3), Arraignment=state " +
      "the charges in court(4), Locus standi=right to bring an action(1) => " +
      "A-2,B-3,C-4,D-1 = printed (b).",
  },
  // NOTE: 2025-1 Q78 is deliberately ABSENT. Its option set was corrupted too,
  // but printed (d) is `1 4 2 3` in BOTH Q77's and Q78's tables, so the wrong
  // table still yielded the right letter and its key D is correct. It is the
  // reason check 3 (label->text ORDER) is mandatory: a key-only check passes
  // this row, and a set-only check would have flagged it and moved the key WRONG.
  {
    paper: "2024-2",
    number: 103,
    from: "C",
    to: "B",
    why:
      "School of fish(4), paddling of ducks(3), colony of ants(1), flock of " +
      "crows(2) => A-4,B-3,C-1,D-2 = printed (b). Our (c) held A-4,B-1,C-3,D-2, " +
      "which pairs ducks with 'colony'.",
  },
  {
    paper: "2024-1",
    number: 101,
    from: "A",
    to: "B",
    why:
      "Attache=diplomatic support staff(3), Aperitif=a drink just before a meal(4), " +
      "Avant-garde=new and experimental(1), Alibi=proven fact of being elsewhere(2) " +
      "=> A-3,B-4,C-1,D-2 = printed (b). Q101 and Q102 print the SAME four rows " +
      "with (a) and (b) transposed, and our Q101 carried Q102's ordering — four " +
      "distinct strings, identical as a set, wrong as an order.",
  },
  {
    paper: "2024-1",
    number: 104,
    from: "D",
    to: "C",
    why:
      "Deja vu=feeling of having experienced the present(2), Faux pas=tactless " +
      "remark or act(3), En route=during the course of a journey(4), Laissez-faire=" +
      "policy of minimal governmental interference(1) => A-2,B-3,C-4,D-1 = printed (c).",
  },
  {
    paper: "2018-2",
    number: 115,
    from: "C",
    to: "D",
    why:
      "Reported speech. A universal truth keeps the present tense while the " +
      "pronoun backshifts, so the correct report is '... that the Sun rises " +
      "everyday for all of them', printed (d). Found by the repair pass, NOT by " +
      "the duplicate screen: this row's duplicate is A=D while the key sat on C, " +
      "so 'key inside the duplicate group' did not flag it.",
  },
];

function main() {
  const apply = process.argv.includes("--apply");
  const byPaper = new Map<string, Fix[]>();
  for (const f of KEY_FIXES) {
    requirePaper(f.paper); // fail fast on an unknown paper id
    byPaper.set(f.paper, [...(byPaper.get(f.paper) ?? []), f]);
  }

  const problems: string[] = [];
  const planned: string[] = [];
  const writes = new Map<string, string>();

  for (const [paper, fixes] of byPaper) {
    const path = dataPath(paper, "questions");
    const raw = readFileSync(path, "utf8");
    // Edit the raw text, NOT a JSON round-trip: these files are CRLF with their
    // own layout, so re-serialising rewrites all ~90 KB and buries a one-letter
    // key change in thousands of diff lines nobody can review.
    let text = raw;
    const rows = JSON.parse(raw) as {
      number: number;
      answer: string;
      options: { label: string; text: string }[];
    }[];
    for (const f of fixes) {
      const row = rows.find((r) => r.number === f.number);
      if (!row) {
        problems.push(`${paper} Q${f.number}: not found in ${path}`);
        continue;
      }
      if (row.answer === f.to) {
        planned.push(`  = ${paper} Q${f.number}  already ${f.to} (no-op)`);
        continue;
      }
      if (row.answer !== f.from) {
        problems.push(
          `${paper} Q${f.number}: expected current key "${f.from}" but found "${row.answer}" ` +
            `— the row has changed since this fix was adjudicated; re-verify before applying`
        );
        continue;
      }
      const target = row.options.find((o) => o.label === f.to);
      if (!target) {
        problems.push(`${paper} Q${f.number}: no option labelled "${f.to}"`);
        continue;
      }
      // The whole point of the repair was to make the options distinct; if the
      // new key is still inside a duplicate group the text repair did not land.
      const dupOf = row.options.filter(
        (o) => o.label !== f.to && o.text.trim() === target.text.trim()
      );
      if (dupOf.length > 0) {
        problems.push(
          `${paper} Q${f.number}: new key ${f.to} still duplicates ` +
            `${dupOf.map((o) => o.label).join("/")} — repair the option text first`
        );
        continue;
      }
      // Locate this row's own `"answer"` in the raw text: the first one that
      // follows its `"number": N,`. Both anchors are asserted unique so a
      // prefix collision (e.g. "number": 6 inside "number": 64) cannot silently
      // retarget the edit.
      const numAnchor = `"number": ${f.number},`;
      const occurrences = text.split(numAnchor).length - 1;
      if (occurrences !== 1) {
        problems.push(
          `${paper} Q${f.number}: anchor '${numAnchor}' occurs ${occurrences} times — refusing to guess`
        );
        continue;
      }
      const at = text.indexOf(numAnchor);
      const ansRe = /"answer":\s*"([A-D])"/g;
      ansRe.lastIndex = at;
      const m = ansRe.exec(text);
      if (!m || m[1] !== f.from) {
        problems.push(
          `${paper} Q${f.number}: raw text after the anchor reads answer "${m?.[1] ?? "?"}", expected "${f.from}"`
        );
        continue;
      }
      text =
        text.slice(0, m.index) +
        `"answer": "${f.to}"` +
        text.slice(m.index + m[0].length);
      planned.push(`  ✓ ${paper} Q${f.number}  ${f.from} → ${f.to}   "${target.text}"`);
    }
    if (text !== raw) writes.set(path, text);
  }

  planned.forEach((p) => console.log(p));
  if (problems.length > 0) {
    console.log(`\n✗ REFUSING (${problems.length}):`);
    problems.forEach((p) => console.log(`    ${p}`));
    process.exit(1);
  }
  if (!apply) {
    console.log(`\n[dry-run] ${KEY_FIXES.length} fix(es) checked. Re-run with --apply.`);
    return;
  }
  for (const [path, body] of writes) writeFileSync(path, body, "utf8");
  console.log(`\n✓ wrote ${writes.size} file(s).`);
}

if (require.main === module) main();
