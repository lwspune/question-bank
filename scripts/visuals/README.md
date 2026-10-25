# Animated solutions

A picture drawn from the question's own numbers that moves with the solution,
step by step, and works out the answer itself. Owner, 2026-10-25: build it,
JEE Mains and MHT-CET first; never delete or overwrite an earlier solution.

Students see it as the **Animated** view of the solution, with a switch to
**Still**: the solution exactly as before (text + any still figure). The choice
is remembered on the device. A question without a visual shows Still only, as
it always has. Surfaces: /browse and the /questions landing pages, mock review,
drill, and under V's explanation (there it plays on its own, since V's words
are not the stored solution).

## Pieces

| Piece | Where |
|---|---|
| Scenes (pure: params -> shapes, plus the self-check) | `src/lib/visuals/scenes/`, listed in `registry.ts` |
| Stored format, step-to-sentence mapping, fingerprint | `src/lib/visuals/visual.ts`, `types.ts` |
| Column + shape CHECK | `questions.solution_visual`, migration 0184 |
| Player, Animated/Still switch, remembered choice | `src/components/visuals/`, `src/lib/visuals/viewPref.ts` |
| Batch checks | `src/lib/visuals/batch.ts` |
| Coverage | `src/lib/visuals/coverage.ts`, `npm run visuals:coverage` |
| Tests | `tests/visuals-*.test.ts`, `tests/solution-visual-db.test.ts`, `tests/chat-solution-visual.test.ts` |

## The rules that make it safe at scale

1. **The scene checks itself.** Each scene computes the answer from its own
   model (the slab scene measures the shift it drew). `checkVisual` refuses a
   visual whose answer differs, and `usableVisual` drops it on the server, so
   a wrong picture never reaches a student.
2. **The solution text is never changed.** A step names the sentence it starts
   at; the text beside the picture is the stored solution cut there. The visual
   carries a fingerprint of that solution: if the solution is edited later, the
   steps drop away (the picture still plays) and coverage reports it `stale`.
   A solution that is WRONG is corrected first, never drawn around (owner,
   2026-10-25): write the fix into `solution-fixes/<batch>.json` and run
   `visuals:fix-solutions`, which writes only `solution`, refuses if the stored
   text changed since, keeps content_hash and records a review. Then draft the
   visual against the corrected text.
   A wrong KEY or STEM is not fixed by the lane: it goes on
   `NEEDS_OWNER.md` (owner, 2026-10-25: "if you are not able to fix a question
   add it to the report"), and every progress report names the new rows.
3. **The key is compared at apply time.** `visuals:run` refuses an MCQ visual
   whose named option is not the database key, and a numeric one whose answer
   is off the stored numeric answer.
4. **Look at every sheet.** The check proves the numbers; only the eye sees a
   label on a ray or a picture that teaches the wrong thing.
5. **No component for one question.** A situation gets a scene once 30+
   questions share it. Until then a question is `noFit`, and the noFit pile
   picks the next scene to build.

## A batch

`data/<name>.json`:

```json
{
  "visuals": [{ "id": "<question uuid>", "option": "B", "visual": { "v": 1, "scene": "...", "params": {}, "steps": [{ "from": 0, "beats": ["..."] }], "fingerprint": "<8 hex>", "answer": { "value": 2, "label": "2" } } }],
  "decided": [{ "id": "<question uuid>", "verdict": "none", "reason": "recall: names the reagent" }]
}
```

- `option` for MCQs (compared with the key); omit for numeric questions.
- `fingerprint` = `solutionFingerprint(<the stored solution>)`.
- `steps[k].from` = the sentence index (`sentenceStarts`) where step k begins;
  `beats` = what the scene animates during that step, each beat at most once.
- `decided` verdicts: `still` (a still figure is the right picture: hand it to
  the solution-figures waves), `none` (a picture adds nothing), `noFit` (no
  scene fits yet; say which situation).

```sh
npm run visuals:run -- <name>            # check + review sheet in generated-papers/visuals/<name>.html; writes nothing
npm run visuals:run -- <name> --apply    # writes solution_visual only
npm run visuals:coverage                 # JEE Mains + MHT-CET; --exam="..." / --all
npm run visuals:figures -- --exam="..." --chapter="..."   # stems/options pointing at a picture they lack: add the figure, don't just note it
npm run visuals:fix-solutions -- <batch> [--apply]        # correct wrong solutions found on the way (solution-fixes/<batch>.json)
```

## Part of ingestion

For a subject that has scenes, visuals are part of ingesting new questions
(owner, 2026-10-25), not a later wave. The ingestion agents draft each new
question's verdict, and its visual where the verdict is "animate", in the same
pass as the transcription and solution. The main session runs `visuals:run`
on the draft batch, looks at the sheet, and applies it with the questions.
Wave 1 exams: JEE Mains and MHT-CET (every subject; the triage decides per question).
