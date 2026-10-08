# CBSE Class 12 BIOLOGY board PYQ — one paper, end to end

You own ONE paper (`<paperId>`, e.g. `2025-57-4-1`). Take it from the PDF to
committed rows with applied solutions, then report. Several agents run at once,
each on a different paper.

## Read first (in this order, all of them)

1. `scripts/cbse-12-pyq/TRANSCRIPTION_BRIEF.md` — the transcription contract.
2. `scripts/cbse-12-pyq/SCIENCE_ADDENDUM.md` — §0-§6, and **§7 (Biology)**,
   which overrides anything above it for this subject.
3. `scripts/cbse-12-pyq/SOLUTION_BRIEF.md` — the solution contract.
4. The PILOT, a finished Biology paper to copy the shape from:
   `scripts/cbse-12-pyq/data/2024-57-1-1.questions.json` and
   `scripts/cbse-12-pyq/data/2024-57-1-1.topaper.json` (its solutions).

## Steps

```
python scripts/cbse-12-pyq/prep.py <year> <57-s-n> --subject=biology [--against <57-s-1>]
      -> out/<paperId>/{pNN.png, ms/pNN.png, contact.png}
[transcribe]                    -> data/<paperId>.questions.json   (Write tool only)
npx tsx scripts/cbse-12-pyq/validate.ts <paperId>                   (must be clean)
npx tsx scripts/cbse-12-pyq/commit.ts   <paperId> --apply           (must say 0 failed, 0 PUBLIC)
npx tsx scripts/cbse-12-pyq/dump-solutions.ts <paperId>
[author]                        -> data/_sol_<paperId>.txt          (plain-text sidecar, see the pilot's shape below)
python scripts/cbse-12-pyq/merge-solutions.py <paperId>
npx tsx scripts/cbse-12-pyq/prescreen-letters.ts <paperId>         (must say clean)
npx tsx scripts/cbse-12-pyq/apply-solutions.ts <paperId> --apply
```

Run every command from the repo root, `C:\Users\vilas\Downloads\Question_Bank`.
Set `PYTHONIOENCODING=utf-8` for the Python steps.

**Never re-run `dump-solutions` after `apply-solutions`.** It lists only rows
still needing a solution, so it rewrites your `.topaper.json` with zero rows and
the committed file loses your authored text (2023 57/1/3 hit this; `--full`
rebuilds it as a mirror of the database). If you must edit a solution after
applying, edit the sidecar and the `.topaper.json` together and re-apply.

The sidecar is blocks of `===<ref>===` followed by the solution text, single
backslashes (`\(\text{F}_2\)`), no escaping. `merge-solutions.py` refuses a
missing or extra ref.

**A FOLLOWER (set 2 or 3 of a series)** passes `--against <series opener>` to
prep.py and compares against the opener's committed
`data/<opener>.questions.json`. Reuse the opener's stem, context and option text
BYTE FOR BYTE where your page shows the same question, so the row dedups at
commit. Confirm on your own page first (TRANSCRIPTION_BRIEF §6). Re-authored
questions are common (SCIENCE_ADDENDUM §6): transcribe what YOUR page prints.
`dump-solutions` will then list only the rows your paper owns; solve those.

**The REQUIRED-figure collision guard (followers hit it).** If `commit.ts`
refuses because a `_figure: REQUIRED` row shares a content_hash with an
already-committed row, render BOTH papers' pages and compare the drawings. If
they are the same drawing, append an entry to the `collisions` array of
`data/hash-collisions.json` in the shape the earlier entries use (`row`,
`clashesWith`, `verdict: "same"`, `evidence`), then re-run the commit. If the
drawings DIFFER, the questions differ: record `verdict: "different"` and report
it, do not force the commit. This is the ONE shared file you may edit, and other
agents may edit it at the same moment: use the Edit tool only (never rewrite the
file), read it immediately before editing, and if the Edit is refused because
the file changed, read it again and re-apply.

## Biology specifics (from §7, repeated because they are the commonest misses)

- Straight quotes; scientific names plain text; `\(\text{F}_1\)`, `\(\times\)`,
  `\(\text{X}^{\text{c}}\)`; raised dots `\(2{\cdot}4\)`; tables as GFM pipe tables.
- Section A key from the scheme, read on the IMAGE and cross-checked against the
  scheme's text layer (extract it yourself with PyMuPDF). Report both reads.
- MCQ solutions END with `So the answer is option (C) <option text>.`;
  assertion-reason with `..., which is option (C).` Never "(A)"/"(R)" for the
  statements: write "the Assertion", "the Reason".
- `_figure` on every row whose stem or context points at a printed drawing,
  classified REQUIRED / ILLUSTRATIVE / DECORATIVE with `Page idx N`. Withhold in
  the note whatever the drawing decides.
- **`_drawFigure` (new):** on every row that asks the STUDENT to draw or sketch a
  diagram, add `"_drawFigure": "<what is drawn and the labels a marker wants>"`.
  Do not crop anything; the book figure is attached centrally later. The
  solution still gives a labelled description of the diagram (pilot Q31a/Q31b).
- **`_outOfSyllabus` (mostly 2022):** a question on content the rationalised
  NCERT book REMOVED (e.g. organism adaptations, found on 2022 57/2/1 Q5) is
  filed on the closest live subtopic with `"_outOfSyllabus": "<the removed
  topic>"`, and listed in your report. Never invent a subtopic. DECIDED
  2026-10-08: organism adaptations / responses to abiotic factors are filed on
  chapter `Organism and its Environment [Outdated]`, subtopic `Responses to
  Abiotic Factors and Adaptations` (the Chemistry `Surface Chemistry
  [Outdated]` precedent; never edit the stem). NOT out of syllabus:
  plant tissue culture, micropropagation, somaclones, meristem culture,
  somatic hybridisation and the pomato. The old "Strategies for Enhancement
  in Food Production" chapter was dropped, but these moved into Ch.10
  Biotechnology and its Applications (lebo110 p1-2, Reprint 2026-27); file
  them on Biotechnological Applications in Agriculture with no
  `_outOfSyllabus`.
- A scheme defect gets a `[CBSE marking scheme: ...]` bracket; an unconditional
  award gets `_cbseVoided` and one opening line in the solution.
- No em dash in anything you write (solutions, notes). Copied paper text keeps
  its own punctuation.

## Do NOT

- run `figure-groups.ts`, `extract_figures.py`, `contact_figures.py` or
  `attach-images.ts` (shared manifests; figures are done centrally after the wave);
- edit any shared file: the briefs, `config.ts`, `figure-picks.json`,
  `figures.json`, `figure-groups.json`, any other paper's data;
- run `git add`, `git commit` or any git command that writes;
- `flip-public.ts` — everything stays PRIVATE;
- author JSON or LaTeX through a shell heredoc, `sed`, `python -c` or `node -e`
  (backslashes get eaten). Use the Write/Edit tools. Prefix any scratch file
  with your paper id.

## Report (short)

English page map used; rows written (MCQ / subjective / alternatives); marks
total; the 16 key letters from the image and whether the text layer agreed;
every `_flag`, `_cbseVoided`, `_figure`, `_drawFigure`; for a follower, how many
rows matched the opener and deduped at commit; anything that failed or that you
could not do.
