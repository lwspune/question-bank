# MH-SSC-10 Marathi-medium papers: agent brief

The board prints every subject paper twice, English medium and Marathi medium.
The two are the SAME paper (same numbering, same options in the same order); only
the language differs. The English paper is already in the bank. Your job is to
add the Marathi print to it, in one of two lanes. Each lane is ONE paper.

Finished example of both lanes, read it first:
`scripts/mh-ssc-10/data/alg-2026.mr.json` (reading) and
`scripts/mh-ssc-10/data/alg-2026.mr-sol.json` (solutions).

Keep tool output small: never print a whole JSON file or a whole image folder
listing; read the pages one at a time.

---

## Lane 1: reading the Marathi print

**Input.** The rendered pages `scripts/mh-ssc-10/out/<paperId>/marathi/p-NN.png`,
and the numbering skeleton:

```
npx tsx scripts/mh-ssc-10/mr-skeleton.ts <paperId>
```

It lists every question's `ref` in paper order with its format, set label, whether
it has a shared passage (`context`), how many table lines its stem holds, how many
maths zones, and whether it has a figure.

**Do NOT open `data/<paperId>.questions.json` or any other English file.** The
point of this lane is that the Marathi wording comes from the board's Marathi
print. A reader holding the English text drifts into translating it, and a
translation is exactly what we must not store. The checker refuses a stem that is
mostly English.

**Output.** `scripts/mh-ssc-10/data/<paperId>.mr.json`: a JSON array, one object
per skeleton ref, in skeleton order:

```jsonc
{
  "ref": "Q1(A)(iii)",          // exactly the skeleton's ref
  "stem": "\\(4x + 5y = 19\\) चा आलेख काढण्यासाठी \\(x = 1\\) असतांना \\(y\\) ची किंमत किती ?",
  "context": "...",             // ONLY when the skeleton says passage=yes
  "options": [                  // ONLY for format=mcq: four, labels as printed
    { "label": "A", "text": "4" }, { "label": "B", "text": "3" },
    { "label": "C", "text": "2" }, { "label": "D", "text": "\\(-3\\)" }
  ],
  "note": "..."                 // optional: a print difference you noticed
}
```

### Rules

1. **Copy the print exactly**, the board's spelling included (`असतांना`, `किंमत`,
   `दुसऱ्या`). Do not modernise, correct or reword. Never write anything the
   paper does not print.
2. **The stem is the printed sub-question.** A block heading that only says
   how many to answer ("खालीलपैकी कोणत्याही दोन उपप्रश्न सोडवा") is not part of
   any stem; a heading that carries the INSTRUCTION does, when the item needs it
   to read as a question (rule 16).
3. **Activities (कृती) with a boxed working (उकल ...).** Transcribe only the
   question's own sentence(s), never the boxed working: it belongs in the
   solution. Exception: when the skeleton shows `tableLines > 0`, the English
   row carries a table in its stem; transcribe the printed table as a GFM
   pipe-table with the boxes left as empty cells (see `Q2(A)(iii)` in the
   example).
4. **Tables** (frequency tables, data for a graph): GFM pipe-tables, header row,
   then the `|---|---|` separator row (mandatory), then the data rows. Ranges as
   `135–140`.
5. **Maths in `\( ... \)` LaTeX**, the same way the example writes it: `x^2`,
   `\dfrac{-7}{5}`, `D_x`, `\sum x_i f_i`, `9\%`, `\ldots`. No Unicode maths
   symbols (× ÷ √ ° ∴ ≤ → ²) anywhere: use `\times`, `\sqrt{}`, `^\circ`,
   `\therefore`, `\le`, `\to`, `^2`. Chemical formulas too: `\(\mathrm{H_2O}\)`.
6. **Blanks** (dotted lines) are `____`.
7. **Options** keep the printed label: A-D on the Maths papers, `अ` `ब` `क` `ड`
   (with or without brackets) on the Science papers. Always exactly four.
8. **Sets** (passage=yes): the shared passage, map/graph instruction or source
   extract goes in `context`, word for word, IDENTICAL on every sibling with the
   same set label. The checker refuses siblings whose passages differ by a
   single character, so write it once and copy it.
9. **Figures** are shared with the English row and are not your concern. Never
   describe a figure in the stem. Words printed INSIDE a figure stay out.
10. **Numbers**: the paper body prints Latin digits; copy them as printed. The
    checker compares the numbers in each question with the English print and
    warns on a difference. A warning is fine when the print really differs (the
    English row sometimes folds a boxed activity's values into its stem); say so
    in `note`. A misread number is not fine: look again.
11. The supplementary papers (`-jul`, `-jun`) have a text layer, but it carries
    NO Marathi (the board used a non-Unicode font) and drops minus signs. Read
    everything from the image.
12. If a word is genuinely unreadable, give your best reading and say so in `note`.
13. **Printed sub-parts** inside one ref ((a)/(b)/(c), (1)/(2)): keep them in the
    stem, each on its own line, after the lead sentence.
14. **Given data printed only inside the उकल box** (the first line of a boxed
    activity stating "∠ABC = 90°, ∠C = θ" or "AB = 14 सेमी" when the question
    sentence does not): put those GIVEN lines in the stem, never the working
    that follows them. A student must be able to answer from the stem.
15. **Concept maps, flow charts, timelines** drawn as boxes: with `tableLines > 0`
    write them as a pipe-table (empty boxes = empty cells); otherwise keep the
    printed centre/title label as its own line after the instruction, since the
    question cannot be answered without it.
16. **A stem must read as a question on its own.** When the printed item is only
    a label, a list or a topic (odd one out: `ब्राझीलमधील नद्या :`; find the
    wrong pair; "write short notes" topics; true/false statements), put the
    block heading's instruction in front of it, as printed:
    `वेगळा घटक ओळखा : ब्राझीलमधील नद्या :`, `थोडक्यात टिपा लिहा : <topic>`,
    `चूक की बरोबर ते सकारण स्पष्ट करा : <statement>`. Leave out only the block's
    choice and marks ("कोणतेही दोन", the 4 in the margin). Where the printed
    pairs or items are options, they go in `options` in printed order (labels
    (i)-(iv) become A-D).
17. **Marathi words inside a formula**: keep Marathi outside `\( \)` wherever the
    sentence allows; where a label sits inside a formula, use `\text{}`:
    `\(m(\text{कंस } NS) = 125^\circ\)`.
18. Words the print sets in **bold** inside a question (एक, दोन) may be wrapped
    in `**...**`.
19. **A chart the English row writes out.** When the skeleton shows `mathZones`
    or `tableLines` on a row whose printed sentence has no maths (typically a
    flow chart or concept map, figure=yes), the English stem spells the chart
    out. Do the same with the print's own words and box labels, as one line of
    arrows: `स्निग्ध पदार्थ \(\rightarrow\) अ; कर्बोदके \(\rightarrow\) ...`.
    Boxes the print fills in are written; empty ones keep their printed label
    (अ, ब) or `____`. Words inside a PHOTO or a map stay out (rule 9).

**Then run** `npx tsx scripts/mh-ssc-10/mr-check.ts <paperId>` and fix every
ERROR. Report: question count, errors (must be 0), each warning with its reason.

---

## Lane 2: Marathi solutions

**Input.** `data/<paperId>.mr.json` (the Marathi questions, already checked) and
`data/<paperId>.questions.json` (the English paper: `answer` and `solution` per
ref). In this lane you DO read the English file: the English solutions are the
checked answers and yours must say the same thing.

**Output.** `scripts/mh-ssc-10/data/<paperId>.mr-sol.json`:
`[{ "ref": "Q1(A)(i)", "solution": "..." }, ...]`, one per ref.

### Rules

1. **Same answer, same working, same numbers.** Each Marathi solution carries
   the English solution's content: every step, every number, the same final
   answer. Add nothing (no new facts, examples or methods) and drop nothing. The
   checker warns when the numbers differ from the English solution's. A warning
   with a good reason is FINE (a unit written as a word, `चौसेमी`; a distractor
   named by its value; a number the English spells out): say the reason in your
   report. Never bend the Marathi to clear a warning; the warning is there to
   catch a changed step, nothing else.
2. **MCQ: end with `योग्य पर्याय: X.`** where X is the English `answer` letter
   (A-D, even on a Science paper that prints अ/ब/क/ड: the site shows A-D). The
   checker refuses any other ending or letter. Name no other option by its
   letter anywhere in the solution; call a distractor by its value.
3. **Use the paper's own Marathi words.** The Marathi questions are your
   glossary: if the print says `नमुना अवकाश`, `अंकगणिती श्रेढी`, `अपवर्तन`, write
   those, never a coinage. Otherwise use the Balbharati Marathi-medium textbook
   terms, for example: मूळ/मुळे (root), एकसामयिक समीकरणे, निश्चयक (determinant),
   घटना (event), संभाव्यता, पहिले पद, सामान्य फरक, मध्य (mean), मध्यक (median),
   बहुलक (mode), संचित वारंवारता, आयतालेख (histogram), वृत्तालेख (pie diagram),
   केंद्रीय कोन, करपात्र किंमत, दर्शनी किंमत (FV), बाजारभाव (MV), दलाली,
   समरूपता, पायथागोरसचे प्रमेय, स्पर्शिका, जीवा, त्रिकोणमिती, शंकू, गोल,
   गुरुत्वाकर्षण, विशिष्ट उष्माधारकता, अपवर्तनांक, भिंग, धातुविज्ञान,
   कार्बनी संयुगे, आनुवंशिकता, उत्क्रांती, परिसंस्था. When unsure of a term,
   keep the English word in brackets after the Marathi once: `विशिष्ट
   उष्माधारकता (specific heat capacity)`.
4. **Maths stays exactly the English solution's LaTeX** (`\(...\)`, `\dfrac`,
   `\therefore`, `\times`, `^\circ`). Units in Marathi outside maths: `रुपये`,
   `सेमी`, `मीटर`, `किग्रॅ`; inside maths keep the English solution's form.
5. **Tables** stay GFM pipe-tables with the `|---|` separator; translate the
   header and label cells, keep the values.
6. **Full Marathi sentences**, the voice a Marathi-medium Class 10 student would
   write in the exam. The checker refuses a solution that is mostly Latin letters.
7. **No em dashes** in anything you write. Use a full stop, colon, comma or
   brackets.
8. **Never carry over a note written for a reviewer** ("[Note: ... verify
   against the source figure]", "may alternatively be intended as ..."). It is
   not part of the answer: leave it out of the Marathi and report it, so the
   English one can be fixed too. The same for an ASIDE you know to be wrong (a
   wrong date or order, a self-contradiction): leave that sentence out when the
   answer stands without it, and report it. Never change the answer itself.
9. **Answer the question the MARATHI print asks.** The two prints occasionally
   ask a slightly different thing (a year where the English asks a decade,
   "which energy is it based on" where the English asks "which energy is
   made"). Open with the answer to the Marathi question, taken from the same
   facts and the same printed data, then carry the English answer's content.
   Report every such case.

**Then run** `npx tsx scripts/mh-ssc-10/mr-check.ts <paperId>` (it now also
checks the solutions) and fix every ERROR. Report: count, errors (must be 0),
each warning with its reason.

---

Neither lane writes to the database, renders pages or touches git. The main
session reviews every draft and alone runs `mr-commit.ts`.
