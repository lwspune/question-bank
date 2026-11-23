# Military-school entrances: AISSEE, RMS CET, RIMC

One lane for the three entrances to India's military schools, five exams in the
registry family "Sainik & Military Schools" (stage = exam, label = the class it
admits to). All FREE (owner, 2026-11-17): `passScope: "free"` in the registry and
`exams.pass_scope = 'free'` on each row (`seed-exams.ts`).

| exam key | DB name | papers held | key |
|---|---|---|---|
| `aissee-6` | AISSEE Class 6 | 2020, 2022-2026 (English) | NTA final key 2022-2026 |
| `aissee-9` | AISSEE Class 9 | 2020, 2021 (Set A), 2022, 2024-2026 | NTA final key 2022-2026 (2023 key exists, paper not found) |
| `rms-cet-6` | RMS CET Class 6 | 2022, 2023, 2024 | none |
| `rms-cet-9` | RMS CET Class 9 | 2022, 2023, 2024 | none |
| `rimc` | RIMC | Jun 2018 - Jun 2023, 10 sessions (no Jun 2022) | none; WRITTEN papers |

## Sources

No issuing body publishes these openly: NTA shows the AISSEE booklet and key
only behind each candidate's login for about three days, the RMS site has
neither, and RIMC sells its old papers as a Rs 300 booklet. The owner chose
third-party re-hosts ("lets use 3p", 2026-11-17). Every paper here is AglaSem's
re-host of the ORIGINAL print, checked to be a scan or photo of the printed
booklet (NTA header, booklet code, serial), never a retyped copy.

AglaSem serves each document two ways, and **they are not equal**:

- **The original PDF**: `https://cdn.aglasem.com/aglasem-doc/<docId>/<docId>.pdf`
  (no sign-in). Saved as `C:\Vilas\LWS_Pune\Sainik_Schools\papers\_pdf\<exam>_<doc>.pdf`.
- **Viewer JPGs**: `.../<docId>/<n>.jpg`, saved as `papers\<exam>\<doc>\NN.jpg`.

**Render from the PDF.** The viewer JPGs are lossy re-encodes (~1075 px wide)
that DROP thin strokes: on AISSEE 2024 Q1-Q2 the JPG lost three operators (`=`
printed like `-`, `+` like `|`, a `-` vanished), and a transcriber reading the
JPG wrote `(a² - 1/a²)` where the PDF prints `(a² + 1/a²)`. The PDFs embed the
scan at 1.2-2.3x that resolution, and some are digital with a text layer
(AISSEE 2022 papers, every NTA key, RIMC Dec 2022 and Jun 2023). Set `pdf:` on
the paper in `config.ts` and `render.ts` uses it. Only `aissee-9-2025` stays on
JPGs: its figure regions were drawn on those renders and it is committed.

PDF page n = JPG n for the question papers; the KEY PDFs carry one extra cover
page, so a key page is found by its "Test Booklet Code" line, not by number.

## Keys (AISSEE)

NTA's final key prints one page per test-booklet code, options as 1-4, `DROP`
for a withdrawn item, and `1,2` where two options were accepted. The 2024 key
adds a legend (A=1,2 ... F=3,4, Z=DROP) for those cases; write such a cell in
`data/<id>.key.json` as NTA's meaning (`"1,2"`, `"DROP"`), which `lib.ts`
`normaliseNtaKey` reads. Each key is read twice by eye and diffed, then checked
against the key PDF's text layer. The read stays OUTSIDE the repo until both
blind passes are written.

## Pipeline (MCQ papers)

```sh
npx tsx scripts/milschool/render.ts <id>               # 1. pages + column crops -> out/<id>/
# 2. TRANSCRIBE by band (agents, <=3 at once): data/<id>.b<N>.json  (TRANSCRIPTION_BRIEF.md)
npx tsx scripts/milschool/merge.ts <id> --apply        # 3. gates -> data/<id>.merged.json
python -P scripts/milschool/crop.py <id> --sheet       # 4. figures; LOOK at every crop
npx tsx scripts/milschool/dump-derive.ts <id> 50       # 5. blind packets -> out/derive/
# 6. DERIVE TWICE (different agents): derived/<id>.{a,b}.pN.json  (DERIVATION_BRIEF.md)
npx tsx scripts/milschool/keycheck.ts <id> [--apply]   # 7a. keyed: score both passes, write answers
npx tsx scripts/milschool/crosstab.ts <id> [--apply]   # 7b. keyless: adjudicate every dispute by hand first
npx tsx scripts/milschool/seed-subjects.ts <exam> --apply   # once per exam
npx tsx scripts/milschool/commit.ts <id> [--apply]     # 8. commit PRIVATE
```

A figure's `clean` (in its band file) may be `false` or a number: the default
whitens anything lighter than 170, which erased the thin option lines of a
figure series (AISSEE 2025 Q58: `clean: 200`) and a dotted path (Q61: 225).
`erase: [[l, t, r, b]]` (fractions of the crop) whitens a reader's pen mark
inside a figure (AISSEE 2026 Q73). Look at the crop after every change.

Some scanned copies print the booklet's SERIAL NUMBER in grey digits down the
page (AISSEE Class 6 2026, Class 9 2025 and 2026), and it lands across figures.
It is grey, not the light-blue watermark `audit:watermark` measures, so no gate
catches it: look for it on every contact sheet. Fix it in this order: a darker
`clean` (100-110 cleared the halftone digits of the 2026 copies), then `erase`
boxes over digits in white space, and only where the digits cross printed
lines or labels, a redraw (`redraw.py`, every value from the print; Class 9
2025 Q14, Q36, Q37). Fixed 2026-11-18 on 22 figures; every other paper here
was checked and has none.

A copy that a reader has marked (ticks, highlighter, working in the margin) is
still the original print: the transcription brief tells agents to ignore every
mark, and blind solvers only ever see the transcribed text. Some copies carry a
COACHING institute's answer table on their last pages (AISSEE 2026 Class 9,
pages 30-31): those pages are left out of `pages` and never used.

A hand ruling on an item defective as printed goes in `data/<id>.notices.json`
(`{"73": {"notice": "...", "grace": true}}`): keycheck keeps the key's letter,
the notice goes above the solution, and `grace` adds it to the mock grace list.

To fix a committed row's text, correct the BAND file, re-run merge, then
`correct-in-place.ts <id> --q=<numbers> [--apply]`: it keeps ids, recomputes the
hash with the same builder as commit (`rows.ts`) and ends by checking every
live row of the paper against the build.

To fix a committed FIGURE (commit uploads one only when the row has none),
correct the band file, re-run merge and `crop.py`, look at the crop, then
`refigure.ts <id> --q=<numbers> [--apply]`: it uploads the new file and points
the row at it, leaving text, answer and hash alone.

## Written papers (RIMC Maths and English)

RIMC's Maths (30 problems, 200 marks) and English (125 marks) are marked step by
step, so they ride as `subjective` rows (`format: "written"` in config). Every
separately marked part is one row; the merge gate checks the marks total
against the printed maximum instead of an item count.

```sh
# 2. TRANSCRIBE (TRANSCRIPTION_BRIEF.md section 10), 3. merge, 4. crop, 5. dump-derive as above
# 6. two blind solutions per item: derived/<id>.{a,b}.pN.json (WRITTEN_DERIVATION_BRIEF.md)
npx tsx scripts/milschool/crosstab-written.ts <id> [--apply]   # 7. rule every dispute + weak agreement
npx tsx scripts/milschool/commit.ts <id> [--apply]             # 8. PRIVATE
```

- Rulings go in `data/<id>.adjudicated.json`: `pick` a/b, or `finalAnswer` +
  `solution` to rewrite, plus `why`, an optional student-facing `notice`, and
  `verified: false` where a fact could not be confirmed. Writing tasks
  (`open: true`) keep one sample answer and are never compared.
- A misprinted question is solved AS PRINTED when it can be (the answer the
  setter likely meant goes in the notice); only an impossible one is solved in
  its usual form.
- `RIMC_WRITTEN_HELD`: an item that cannot be answered keeps its transcription
  (its marks still count) but gets no packet and no row (Dec 2018 Maths Q25).
- `RIMC_PRINTED_MARKS`: a paper whose questions print more marks than its
  stated maximum (June 2021 English 130, Dec 2019 English 135).
- Short GK answers (fill-ins, true/false) are held on the GK paper and moved to
  `<gk id>-short` by `split-short.ts`.

## Status (2026-11-17)

All rows PRIVATE until `npx tsx scripts/milschool/publish.ts --apply` (dry run
without `--apply`; it refuses unless every paper holds exactly the rows commit.ts
writes, each with a solution). Then the mocks: `npx tsx scripts/mocks/build.ts
--paper=milschool --apply --publish`, 11 whole papers (MOCKS.md); the 7 papers
with a held question stay held, and RIMC gets none.

| Exam | Papers | Rows | Answers |
|---|---|---|---|
| AISSEE Class 6 / 9 | 6 + 6 | 700 + 900 | NTA final key; both blind passes scored against it |
| RMS CET Class 6 / 9 | 3 + 3 | 593 + 590 | no key: two blind passes, every dispute ruled by hand |
| RIMC (GK, Maths, English, 2018-2023) | 34 | 1,298 (567 written) | no key: as RMS; written items ruled part by part |

Held on purpose (config `held`): AISSEE C6 2023/2025 Q1-25 (Hindi language
section of a Hindi-medium copy, owner); the RMS items in config; RIMC 2020 Dec
GK Q75 (not printed) and Dec 2018 Maths Q25. The scan's printed serial number on 22 AISSEE
figures was cleared on 2026-11-18 (see the serial-number paragraph above).
