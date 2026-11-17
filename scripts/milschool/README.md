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

## Status

- **aissee-9-2025** (code H): 150 rows PRIVATE, 13 figures, 2026-11-17. Each
  blind pass 146/148 against NTA's final key, HIGH 141/141; both flagged the two
  items NTA dropped (Q10, Q68). The two shared misses (Q58, Q61) were faint
  figures, solved by hand from the page. Q100: NTA accepted (2) and (3), grace.
  Transcribed from the viewer JPGs (before the PDF lesson): answers all agree
  with the key, but stem text was not re-read against the PDF.
