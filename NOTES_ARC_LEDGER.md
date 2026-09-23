# NOTES_ARC_LEDGER.md — per-chapter teaching-arc audit record

`/notes` chapters are gated on structure (taxonomy, tags, LaTeX, counts) and on
vocabulary order (`notes:arc`). **Nothing gates whether a chapter teaches well.**
This file is the record of chapters that have been read end-to-end as a learner
would read them, what that found, and what is still open.

It is a record of **judgement**, not of counts. Every number an audit produces
is live in the bank or in a probe, and a number copied into prose here would be
wrong within a few ingests — the same failure this project has logged repeatedly.
So: no counts in the table. Run the probes.

---

## What an arc audit checks

The eight classes below all came out of the first audit
(`nda-maths/lines`, 2026-09-22). Each one was a real defect that every existing
gate was green on. Use them as the checklist for the next chapter.

**Ladder defects — the rungs of a concept unit collapsing into each other.**

1. **Self-check IS the featured PYQ.** The student "attempts" a problem, reveals
   it, then meets the identical question below relabelled as a past-year item.
   The transfer test becomes a re-read. *Now caught by `notes:lint` check #5 —
   see the note under "Probes" below.*
2. **The worked example leaks the PYQ's answer.** Not the same problem, but its
   intermediate values printed as given data. A genuine rehearsal repeats the
   *method* with different numbers; this repeats the *numbers*.
3. **The worked example does not demonstrate the concept's own technique.** The
   definition teaches a general method and the example uses a special-case
   shortcut, so the taught method is worked zero times.
4. **Gradient cliff.** Worked example → self-check → PYQ jumps a whole class of
   difficulty with nothing in between, or the PYQ needs a technique the concept
   never teaches.

**Order defects — the chapter promising an arc it does not have.**

5. **Backward edges.** A concept uses a tool taught later. Build the dependency
   graph from what each concept *uses*, not from what its title says. `notes:arc`
   catches the notation and vocabulary forms of this; it cannot see a dependency
   that lives in a `selfCheckExample.steps` list.
6. **Symbol collisions.** The same letter bound to two different things within a
   few lines — `a` as a coefficient and as an intercept, `θ` as an inclination
   and as a normal angle. `FormulaSpec.symbols` exists for exactly this and most
   chapters do not use it.

**Truth defects — correct-but-incomplete phrasing that builds a wrong belief.**

7. **A definition its own PYQ punishes.** The rule is stated without the caveat
   the exam question turns on, so a student applying what they were taught gets
   it wrong and concludes the notes lied.
8. **Drilling an untaught fact.** A `practiceSet` rep on something defined in a
   later concept. A rep on a fact the reader has not met is not retrieval; it is
   a memorised string.

---

## Probes — where the live numbers come from

| Question | Command |
|---|---|
| Which chapters have a self-check or worked example that is its own PYQ? | `npm run notes:lint` — filter for "re-uses the featured PYQ" |
| Which chapters use a symbol or term before defining it? | `npm run notes:arc` (`-- --terms` adds the noisier vocabulary class) |
| Which chapter intros state a stale count, or re-list the cards below them? | `npm run notes:intro` |
| Which concepts teach a formula the bank's solutions use but the notes do not? | `npm run notes:coverage <subjectRoute> <chapterSlug>` |

None of these reads a chapter as a *learner*. They narrow the queue; they do not
do the audit. Classes 2, 3, 4 and 7 above have no probe at all today and were
found only by reading.

---

## Audited chapters

| Chapter | Audited | Verdict | Still open |
|---|---|---|---|
| `nda-maths/lines` | 2026-09-22 | Reworked — 3 blocking, 8 major fixed | Split `lines-slope-and-forms` (8 facts in one unit, 9 tag rows to re-key); re-point the area PYQ off its unbridged HARD jump |

Every other chapter in `NOTES_CHAPTERS` is **unaudited**. That is a statement
about this file, not about those chapters.

### Suggested order for the next audits

Pick from the `notes:lint` duplication list, heaviest chapters first — a chapter
with several duplicate rungs is one where the ladder was systematically
collapsed, not a one-off slip. As of 2026-09-22 the head of that list was
`mht-cet-maths/line-and-plane`, `nda-maths/binomial-theorem`,
`mht-cet-maths/vectors` and `mht-cet-maths/applications-of-derivative`.
Re-run the probe rather than trusting that sentence.

---

## Arc-level items — NOT chapter fixes

These change the authoring or render contract for every chapter and are
therefore gated behind a 360 and explicit sign-off. Logged here so they are not
silently actioned during a chapter audit.

- **Practice rungs are collapsed by default and sign-in-gated.** The default
  reading path is intuition → definition → formula → worked example → PYQ →
  traps, with the self-check and the reps behind a disclosure. Two of the four
  rungs are opt-in, and for an anonymous reader the gated material is sometimes
  load-bearing for the ungated PYQ below it. Candidate fix: open the disclosure
  by default for signed-in students.
- **Traps render last, after the PYQ.** Several traps are prerequisites rather
  than postscripts — the intercept-form "RHS must be 1" rule is needed to
  survive its own featured question. Moving the block is one JSX change across
  all chapters; promoting individual prerequisite traps into `definition` is a
  per-concept editorial fix and is what `nda-maths/lines` did.
- **No `requires` field.** A concept cannot declare which concepts it depends
  on, so `notes:arc` can only infer dependencies from prose. A
  `requires?: string[]` of concept slugs would let the probe assert that every
  dependency appears earlier in `subtopicOrder`.
