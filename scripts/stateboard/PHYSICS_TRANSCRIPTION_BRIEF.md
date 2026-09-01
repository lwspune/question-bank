# Physics transcription brief — MH State Board (Balbharati) Std XI / XII Physics

The contract every Physics transcription agent works to. Read it fully before
opening a page. It is deliberately separate from the Maths flow: this source
fails in ways the Maths books do not.

---

## 1. VISION ONLY. The text layer is a trap, and it is a QUIET one.

**Never** read a stem, an option, an answer or a formula out of the PDF text
layer. Read the rendered PNGs in `out/<id>/p-NN.png`. This is measured, not
cautious — across the 376-page Std XII volume:

- `√` occurs **zero** times. Radicals are vector-drawn.
- Superscript `²` occurs 4 times. Exponents are flattened to the baseline, so
  `m/s²` extracts as `m/s2` and `1.6 × 10⁻⁵` as `1.6 u 10-5`.
- **Greek is set in Symbol font and extracts as Latin letters.** Measured map:

  | extracts as | is really |
  |---|---|
  | `S` | π |
  | `q` | ° |
  | `u` | × |
  | `\|` | ≈ |
  | `Z` | ω |
  | `G` | δ |
  | `I` | φ |

That last one is why this brief exists. `x = 6 sin (100t + S/4)` and
`0.1 S2 x2 joule` are both **real extractions from the Oscillations exercise**,
and both read as perfectly well-formed equations in a variable `S`. Unlike the
Maths books — which yield a visibly broken `3 2` for `√3/2` — this corruption is
*plausible*. A text-first pass ships physics that is silently wrong.

Std XI fails differently but the verdict is the same: it keeps real Greek but
emits 572 private-use glyphs (U+F0xx) for vector arrows, so `B⃗` extracts as
`B ur` and `v⃗` as `v` with a stray trailing mark.

`dump-text.ts` is useful for **locating block boundaries and prose-only checks**.
Nothing else.

## 2. Layout

Pages are **TWO-COLUMN** (left column x≈85, right column x≈309). **Read the LEFT
column top-to-bottom, then the RIGHT.** Reading across the page scrambles
question order and can shred a worked example in half.

Verify the column count **per page yourself** — do not assume it from this brief
or from a neighbouring page.

## 3. Your band, and the territory next to it

You are given an explicit start and stop as `p<NN> y≈<Y>`. **A page boundary is
not a block boundary** — a section routinely starts mid-page.

**Report on territory you do not own.** If your band's first page opens
mid-question, or its last page continues past your stop, say so in your final
message. Do not transcribe it (that creates a duplicate ref and `merge.ts` will
throw), and do not silently drop it. A duplicate announces itself; a gap does
not, and every gate downstream is blind to a question that was never
transcribed.

## 4. What to emit

One file, `data/<id>.<band>.json`, an array of objects:

```json
{
  "ref":        "Solved Ex.5.1",
  "bucket":     "solved" | "exercise-mcq" | "exercise-subjective",
  "format":     "mcq" | "subjective",
  "subtopic":   "<exactly one of the chapter's canonical subtopics>",
  "difficulty": "EASY" | "MODERATE" | "HARD",
  "stem":       "...",
  "context":    "shared instruction for a set of sub-items (optional)",
  "setLabel":   "shared label tying sub-item siblings together (optional)",
  "options":    [{"label":"A","text":"..."}, ...],   // mcq only, exactly A-D
  "answer":     "A",                                  // mcq only, DERIVED by you
  "solution":   "...",                                // solved only
  "bookAnswer": "0.9548 Hz, 1.047 s"                  // see §6
}
```

Refs must be unique within the chapter and **section-prefixed**. Follow the
book's own numbering exactly — `Solved Ex.5.1`, `Ex Q.1 (iii)`, `Ex Q.9`.

## 5. Math → LaTeX

All math in `\( … \)` inline zones. No raw unicode math in any field —
`× ÷ √ ∴ ≈ π ω θ °` become `\times \div \sqrt{} \therefore \approx \pi \omega
\theta ^\circ`. Balance every delimiter; an unbalanced zone is rejected at commit.

A table (a truth table, a data table) becomes a **GFM pipe-table with a
`|---|---|` separator row** — the separator is mandatory and is what
distinguishes a real table from inline `|x|` math.

**Do not author LaTeX through a shell heredoc or `python -c`.** The shell eats
one backslash and Python string-escapes the rest, so `\frac`/`\theta` arrive as
control characters. Write the JSON with the Write tool.

## 6. `bookAnswer` — the book's own inline key

**There is NO answers section in either Physics volume.** What exists is a
partial, per-question key: the numericals print their own answer inline as
`[Ans: …]` immediately after the question.

- Transcribe that value **verbatim** into `bookAnswer`.
- **Never put it in `stem`.** It is the answer; a stem carrying it hands the
  student the answer and poisons the later blind check.
- If a question prints no `[Ans:]`, omit the field. Most theory questions have
  none. That is expected, not a gap.

These feed a real cross-check gate on the numerical half of the chapter — the
one place this source is better off than a key-less humanities book.

## 7. MCQ answers

You derive the answer yourself and put it in `answer`. There is **no printed MCQ
key anywhere in the book**, so there is nothing to copy and nothing to conform
to.

Transcribe the four options with total fidelity — **the option TEXT and its
LETTER both matter, and a swapped pair is undetectable downstream.** A later
blind re-derivation will solve each MCQ from scratch, but a blind pass *cannot*
catch a mis-slotted option: it derives correctly, finds that text at whatever
label you gave it, and confirms your wrong letter. Transcription fidelity is a
prerequisite control, not a parallel one.

## 8. Things that are NOT questions

Do not ingest: `Can you recall?`, `Do you know?`, `Remember this`, `Use your
brain power`, `Activity`, `Internet my friend`, `Try this`. These are teaching
boxes, open-ended prompts, or margin notes with no determinate answer.

A **solved example** is ingested only if the book prints its `Solution:`. Ingest
the book's own working as `solution` — do not rewrite it, and do not "improve"
its method.

## 9. Faithfulness beats tidiness

Transcribe **what is printed**, including a defect. If a stem looks wrong, is
self-contradictory, or its printed `[Ans:]` disagrees with what the question
asks, transcribe it faithfully and **report it in your final message**. Do not
silently repair it and do not solve the "intended" question instead — the
adjudication is made against the source page, by a human, later.

If the figure a question refers to is not readable, say so rather than inventing
what it shows.
