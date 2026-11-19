# Homi Bhabha (Dr. Homi Bhabha Balvaidnyanik Competition), Std VI and IX

Phase I written test of the Greater Bombay Science Teachers' Association's
(MSTA) science competition: **100 one-mark MCQs, (A)-(D), 90 minutes**, no
negative marking printed, English or Marathi medium. Std IX: Physics,
Chemistry, Biology, then science GK. Syllabus: Maharashtra State Board science
books (Std IX: 60% Std 9, 20% Std 8, 10% Std 7, 10% GK; Std VI the same over
Std 4-6). Phases II-IV (practical, interview, project) are not ingested.

Two exams in one registry family, split by class (the AISSEE pattern):
`homi-bhabha-6` and `homi-bhabha-9`.

## Sources (scouted 2026-11-19)

**Every paper is MSTA's own print from msta.in** (the no-transcribed-sources
rule). Several files are no longer linked from MSTA's pages but are still
served there; they were found through the Wayback Machine's list of the site's
uploads (`web.archive.org/cdx/search/cdx?url=msta.in/wp-content/uploads/*`).
Saved as `C:\Vilas\LWS_Pune\Homi_Bhabha\papers\<name>`; the `-mr` file is the
Marathi booklet of the same paper. Every URL below is under
`https://msta.in/wp-content/uploads/`.

| Paper | Exam date | English file (msta.in) | Marathi file | Key |
|---|---|---|---|---|
| `hb-9-2010` | 4 Sep 2010 | `2016/06/9th_english.pdf` | `2016/06/9th_marathi.pdf` | none |
| `hb-6-2010` | 4 Sep 2010 | `2016/06/6th_english.pdf` | `2016/06/6th_marathi.pdf` | none |
| `hb-9-2017` | 16 Sep 2017 | `2023/08/DHBBVC-Theory-Question-Papers-IX-English.pdf` p1-15 | `...-IX-Marathi.pdf` | none |
| `hb-9-2018` | 6 Oct 2018 | same file, p16-30 | same | none |
| `hb-6-2018` | 6 Oct 2018 | `2023/08/DHBBVC-Theory-Question-Papers-VI-English.pdf` p1-15 | `...-VI-Marathi.pdf` | none |
| `hb-6-2017` | 16 Sep 2017 | same file, p16-30 | same | none |
| `hb-9-2021-jan` | 24 Jan 2021 (online) | `2021/01/Model-answers-9th-english.pdf` | `2021/01/Model-answers-9th-marathi.pdf` | ticked in the paper ("updated answer key") |
| `hb-9-2021-nov` | 21 Nov 2021 (online) | `2021/12/21Nov-9th-English-.pdf` | `2021/12/21Nov-9th-Marathi-.pdf` | "Correct Option(s)" under each question |
| `hb-9-2021-dec` | 19 Dec 2021 (online) | `2022/01/9th-eng-med-19th-dec-2021-revised-answrkey-.pdf` | `2022/01/9th-mar-med-19th-dec-2021-revised-Answerkey-.pdf` | same |
| `hb-6-2021-nov` | 28 Nov 2021 (online) | `2021/12/28Nov-6th-English-.pdf` | `2021/12/28Nov-6th-Marathi-.pdf` | same |
| `hb-6-2021-dec` | 16 Dec 2021 (online) | `2022/01/6th-eng-med-16th-dec-2021-revised-answerkey-.pdf` | **none posted** | same |
| `hb-9-2024` | 30 Nov 2024 | `2024/12/Revised-9th-English_1511_1824Hrs.pdf` | `2024/12/Revised-9th-Marathi_1511_1824Hrs.pdf` | `2024/12/UPDATED-ANSWER-KEY-IX-ENG-MAR.pdf` |
| `hb-6-2024` | 30 Nov 2024 | `2024/12/Revised-6th-English_1511_1500Hrs.pdf` | `2024/12/Revised-6th-Marathi_1511_1500Hrs.pdf` | `2024/12/ANSWER-KEY-VI-ENGLISH-MARATHI-WITH-WATERMARK.pdf` |

`2021/02/Updated-answer-key-DHBBC20-21-9th-english.pdf` is the same file as the
January 2021 paper (identical bytes).

**Keys with no booklet anywhere** (kept in `papers\keys\*-no-paper.pdf`,
unused): 2022-23 (`2022/12/DHBBVC-2022-23-REVISED-ANSWER-KEY-{IX,VI}.pdf`),
2023-24 (`2023/11/DHBBVC-2023-24-{IX,VI}-FINAL-ANSWER-KEY.pdf`), 2025-26
(`2025/11/Revised-Std-{IX,VI}-English-Marathi-2025-26*.pdf`). The owner has no
2025-26 booklet either. Should a booklet for one of these sittings turn up,
its key is already here.

**Not used:** neevexaminfo.com's 2011-2016 "test papers" are coaching RETYPES
(a "Pearl Program" header, options relabelled (a)-(d)); ALLEN's and
Resonance's keys (2018, 2019) carry no paper.

**Copyright.** The booklets print "Copyright reserved. This test or any part
thereof may not be reproduced in any form". MSTA posts them openly, and the
owner chose to ingest them (2026-11-19).

**Formats differ by year.** 2010/2017/2018 are scans of the printed booklet
(no text layer); 2024 is a digital PDF with a text layer (use it to check a
reading, never as the reading: its ligatures drop letters, "Ques ons"); the
2021 online exams are MSTA's print-out of its question bank, one column, the
key printed or ticked under each question. **Transcribers ignore those marks**
(TRANSCRIPTION_BRIEF.md), and the key is read from them by the main session
only, into `data/<id>.key.json`, after both blind passes exist.

## Pipeline

Copied from `scripts/milschool/` (MCQ path; its written-paper and Hindi code
left out) plus the Marathi path of `scripts/mh-ssc-10/`.

```sh
npx tsx scripts/homi-bhabha/render.ts <id>                # 1. whole pages -> out/<id>/ (PowerShell python has PyMuPDF)
# 2. TRANSCRIBE by band (agents, <=3 at once): data/<id>.b<N>.json  (TRANSCRIPTION_BRIEF.md)
npx tsx scripts/homi-bhabha/merge.ts <id> --apply         # 3. gates -> data/<id>.merged.json
python -P scripts/homi-bhabha/crop.py <id> --sheet        # 4. figures; LOOK at every crop
npx tsx scripts/homi-bhabha/dump-derive.ts <id> 50        # 5. blind packets -> out/derive/
# 6. DERIVE TWICE (different agents): derived/<id>.{a,b}.pN.json  (DERIVATION_BRIEF.md)
npx tsx scripts/homi-bhabha/keycheck.ts <id> [--apply]    # 7a. keyed papers (2021, 2024)
npx tsx scripts/homi-bhabha/crosstab.ts <id> [--apply]    # 7b. keyless (2010, 2017, 2018): rule every dispute by hand first
npx tsx scripts/homi-bhabha/seed-exams.ts --apply         # once: both exam rows
npx tsx scripts/homi-bhabha/seed-subjects.ts <exam> --apply
npx tsx scripts/homi-bhabha/commit.ts <id> [--apply]      # 8. commit PRIVATE
# Marathi (after the English rows exist):
npx tsx scripts/homi-bhabha/render.ts <id> --marathi      # out/<id>-mr/
npx tsx scripts/homi-bhabha/mr-skeleton.ts <id>           # numbering for the reader, no English wording
# reading agent -> data/<id>.mr.json, solution agent -> data/<id>.mr-sol.json (MARATHI_BRIEF.md)
npx tsx scripts/homi-bhabha/mr-check.ts <id>
npx tsx scripts/homi-bhabha/mr-commit.ts <id> [--apply]
```

A key's letters (A-D, "B or C", "DROP") are read twice by eye and diffed, and
kept OUTSIDE the repo until both blind passes are written; `lib.ts`
`normaliseKey` refuses an unreadable cell or a short key.

## Figures that read badly as scanned

A band file's `figure` may name a lane PNG that crop.py uses instead of the
page crop; then `refigure.ts <id> --q=N,... --apply` (cwd = the main checkout)
re-uploads a committed row's figure. Show the owner a before/after sheet first.

- `cleaned`: `cleaned/<id>/qNNN.png`, the printed figure re-rendered at 300 dpi,
  faint strokes darkened (tone curve, paper white from 238) and trimmed to its
  ink. Every mark is the printed one. 2010's scan shows the next page through,
  so its stored crops were darkened instead of re-rendered. Used for every
  figure of 2010, 2017 and 2018 except the three below.
- `redrawn`: `redrawn/<id>/qNNN.png` from `redraw.py`, only where the print
  settles every value: 2018 Q10 (velocity-time graph), Q21 and Q72 (Venns).
  2017 Q11 reads fine cleaned; 2017 Q75's stigma branches are too small to
  count for certain, so it is not redrawn.

## Key notes per paper

- `hb-9-2023`: **the only copy is Neev IIT-Medical's re-typing** (owner
  exception, 2026-11-19; provenance stays here and in config, never on a
  student's screen). Two columns, their branding on every page, and two traps:
  **the retype leaks answers** (Q3's last statement ended "... T. 1, 4", which
  is option A, MSTA's answer: transcribers drop and list any such fragment)
  and **page 10's right column is MSTA's key pasted in** (blanked from
  out/hb-9-2023/p10*.png before the blind passes; the PDF itself is never
  shown to a solver). The retyper's own slips were corrected in the band files
  (40 fixes: spellings, "AI"/"NaCI", plain-digit formulas, Q47's W/M mix-up,
  Q81's option "2, 3, 5" for "2, 3, 4", Q88's cut-off stem finished from its
  options). **Q25 held**: the ray diagram is not in the retype. Blind passes
  against MSTA's final key: 90/99 and 93/99, HIGH 158/159, so the text is the
  real paper. Shared misses Q34, Q84, Q94 follow the key by hand; Q13, Q24,
  Q31, Q44, Q60, Q80 carry a notice and grace. Figures: Q3, Q55, Q88 redrawn,
  the rest cleaned from the embedded images (option tables left out).

- `hb-9-2021-jan`: MSTA's print-out cuts off the right edge of some pasted
  stems. Kept where the meaning survives (shown as "…", with a notice: Q8,
  Q17, Q19, Q20, Q30, Q36, Q60); **Q18 held** (half of both statements lost).
  **Q82 carries no tick in either copy** (MSTA: "Give full credit"; no option
  is the expected bird-flu strain), so it is DROP in the key: a withdrawn row
  awarded to everyone. **Q84**: the English copy ticks A, the Marathi copy D;
  A is right (carrier x normal gives 50% carriers, 50% normal), so the key
  is A.
- `hb-9-2021-nov`, `hb-9-2021-dec`: key read from the English and Marathi
  copies' blue "Correct Option(s)" lines. **A strip count can lie:** on Dec
  the Marathi strips held one spurious line and missed Q100's, so the total
  looked right and Q91-100 were shifted one place (both blind passes missed
  the same 7 at HIGH confidence, which is what exposed it). Q91-100 were then
  read from the English pages directly. Rule: when both passes miss a RUN of
  consecutive items, suspect the key read before the questions.

## Status

2026-11-19: sources saved, lane scaffolded on `feat/homi-bhabha`. Nothing
transcribed, no exam rows, no registry entry. Pilot: `hb-9-2024`.
