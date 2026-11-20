# Maharashtra Scholarship (MSCE Pune), Class 4 / 5 / 7 / 8

The Maharashtra State Council of Examination's scholarship exams for Classes 5
(Pre Upper Primary, PUP) and 8 (Pre Secondary, PSS), Feb 2017 to Feb 2026, and,
after the GR of 17 Oct 2025, Classes 4 (Primary, PSE) and 7 (Upper Primary, UPS)
from Apr 2026. About 10 lakh children sit each sitting (MSCE press notes: Feb
2026 Class 5 + 8: 10,10,541; Apr 2026 Class 4 + 7: 10,91,252).

Four exams in one registry family, "MH Scholarship", split by class (the
AISSEE / Homi Bhabha pattern): `mh-scholarship-4`, `-5`, `-7`, `-8`. **Free**
(owner, 2026-11-20). Rows commit **PRIVATE**; publishing is the owner's call.

## The paper

Two papers per class, each **75 MCQs x 2 marks = 150 marks, 90 minutes**,
options printed `(1)`-`(4)` (stored A-D). The printed section fixes the subject
(`lib.ts` `sectionSubject`, gated in `merge.ts`):

| | Q1-25 | Q26-75 |
|---|---|---|
| Paper I (`-p1`) | English (first language, English medium) | Mathematics |
| Paper II (`-p2`) | **Marathi** (third language; Marathi-only rows, solutions in Marathi) | Intelligence Test |

**Two-answer questions.** Rule 5 on every paper: "Maximum 20% questions are
having two correct alternatives. Candidate has to darken both". The key prints
them `2&4`. The bank stores exactly one correct option (migrations 0001, 0119)
and a mock answer is one letter (0044), so **they are HELD** (owner, 2026-11-20):
transcribed, blind-solved and keyed, kept in `data/<id>.answers.json`
`heldTwoAnswer`, NOT committed, until a "select two" format exists. A paper is
therefore never whole, so there are **no mocks** yet.

**Key cells** (`lib.ts` `normaliseMsceKey`): `3` one answer; `2&4` both must be
marked (HELD); `1OR2` either earns the mark (committed: the letter the blind pass
reached, a notice naming both, grace in mocks); `*` cancelled ("* असे चिन्ह
दर्शविण्यात आलेले प्रश्न रद्द").

## Sources

**MSCE's own PDFs only**, English medium, Set A, harvested 2026-11-20 from
`2026.puppssmsce.in` (`/question-paper/<sitting>`, `/ans-key/<sitting>`) and
`2026-2.puppssmsce.in` (April 2026, Class 4/7). Those pages are built in the
browser, so curl sees no links: the list was read in Chrome into
`sources.tsv` (every file under `mscepuppss.s3.ap-south-1.amazonaws.com`). Saved
as `C:\Vilas\LWS_Pune\MH_Scholarship\papers\<id>.pdf` and `keys\<id>.key.pdf`.
Ids: `ms<class>-<year>-p<1|2>`.

Formats: 2018-2026 are typeset PDFs with a text layer whose maths and Marathi
come out garbled (read from the page, never the text layer); **2017 and 2020 are
scans** (no text); the 2020 files are short (8-15 pages): check them for missing
pages at their pre-pass. 2017 publishes sets A-D; later sittings Set A only.

## Pipeline (pilot ms8-2026, 2026-11-20)

```sh
npx tsx scripts/mh-scholarship/render.ts <id>                # 1. pages -> out/<id>/ (PowerShell python)
# set PAGES[<id>] in config.ts from the pages (p1 = cover, last = rough work)
# 2. TRANSCRIBE by band (agents, <=3 at once): data/<id>.b<N>.json (TRANSCRIPTION_BRIEF.md)
npx tsx scripts/mh-scholarship/merge.ts <id> --apply         # 3. gates incl. the section gate
python -P scripts/mh-scholarship/crop.py <id> --sheet        # 4. figures; LOOK at every crop
npx tsx scripts/mh-scholarship/dump-derive.ts <id>           # 5. blind packets -> out/derive/
# 6. ONE blind pass (owner): derived/<id>.a.pN.json (DERIVATION_BRIEF.md)
# 7. key: TWO independent reads of the Set A column, data/<id>.key.json and
#    data/<id>.key2.json (the second from a column crop, never from memory)
npx tsx scripts/mh-scholarship/keycheck.ts <id> [--apply]    # 8. refuses until the reads agree
npx tsx scripts/mh-scholarship/seed-subjects.ts <exam> --apply   # once per exam
npx tsx scripts/mh-scholarship/commit.ts <id> [--apply]      # 9. PRIVATE (cwd = main checkout)
```

Pure tests: `tests/mh-scholarship-lib.test.ts`.

**Two key reads, enforced (2026-11-20).** A single read of `ms8-2026-p1`'s key got
4 of 75 cells wrong (Q35, Q36, Q44, Q67) and a "second read" done from memory
repeated them; only the blind pass exposed them (HIGH 64/69 -> 68/69 once fixed).
`keycheck.ts` now refuses unless `key.json` and `key2.json` agree cell for cell
(`lib.ts` `keyReadDiff`); on `ms8-2026-p2` it caught a misread Q10 at once.
Crop the column with the scratch `keycols.py` method (Set A columns at x 0.09-0.21,
0.38-0.495, 0.66-0.78 of the page, y 0.23-0.925, 200 dpi).

## Per paper

- `ms8-2026-p1`: 66 committed PRIVATE (22 English + 44 Maths), 9 held
  (Q4, 13, 17, 26, 27, 30, 49, 58, 64). Blind 72/75. Q63 hand-solved (the pass
  miscounted a tick). Q68: MSCE counts (4.5, 6, 7.5) as a Pythagorean triplet
  (answer 4); key kept, notice + grace.
- `ms8-2026-p2`: 64 committed (Q12 cancelled, saved without a correct option); 9 two-answer
  held; Q30 and Q60 held as disputes with MSCE's key (`notices.json` `hold`, listed in
  `answers.json` `heldDisputed`); 5 either-answer items graced. Blind 69/74.

**April 2026, Class 4 and 7 (the exam as it now runs).** The two-answer rule is GONE:
rule 7 reads "If more than one circles are darkened ... the answer will not be accepted",
so every item is single-answer and the papers are whole (mocks possible).

- `ms7-2026-p1`: 75 committed (Q42 cancelled). Blind 74/74.
- `ms7-2026-p2`: 74 committed. **Q42 held** (options (1) and (4) printed identically; its
  transcription is in `data/ms7-2026-p2.held-items.json`; config `HELD`). Blind 73/74: Q34
  (Shirshasana) key kept, notice + grace. 5 either-answer items graced.
- `ms4-2026-p1`: 75 committed (Q15 cancelled: the stem asks to fill a blank the passage
  does not have). Blind 74/74. Q22, Q31 either-answer, graced.
- `ms4-2026-p2`: 75 committed. Blind 73/75: Q11 (शीरखुर्मा) and Q12 (Baban Shinde's poem)
  hand-solved to MSCE's key. Q70 either-answer, graced.

**The alphabet strip.** Every Paper II page prints `A B C D E | F G H I J | ... | U V W X Y`
(no Z) at the top. Items that say "the given alphabet series" mean THAT strip (Class 4
Q42 only works with it), so it goes into the stem as `[Series: the alphabet strip printed
at the top of the page: ...]` (TRANSCRIPTION_BRIEF.md section 1).

**Shared instructions and the sets gate.** If an item in the middle of a run carries the
run's instruction in its stem (because its own stem would otherwise be only a figure), merge
fails gate 3b. Give it the same `context` and leave the bracketed figure note as its stem
(also in TRANSCRIPTION_BRIEF.md section 1).
