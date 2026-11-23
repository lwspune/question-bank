# SSC CGL Tier I: reading the Hindi print (agent brief)

SSC prints every non-English question of a Tier I shift twice, English then Hindi, in
one cell. The English is already in the bank. You read the **Hindi print** of one slice
(one PART, 25 questions) and write it down exactly. The main session reviews every
block and alone writes the database. You never write to the database or touch git.

Keep tool output small: never print a whole folder listing or a whole draft back.

## Input: the only things you read

1. The Hindi sheets: `<OUT>/<shiftId>/hi-sheets/batch-NNN-MMM.png` (your prompt gives
   `<OUT>` and the batches that cover your range). Each question shows its number and
   PART, then SSC's Hindi stem and the Hindi options A-D. Nothing else.
2. The skeleton:

   ```
   npx tsx scripts/ssc-cgl/hi-skeleton.ts <shiftId> <first> <last>
   ```

   Per question: whether the English row has a passage, the English row's **maths**
   (`stem maths:`) and its **language-neutral options** (`A as given: \(7\)`).

**Do NOT read `scripts/ssc-cgl/transcripts/`, the `sheets/` folder, any English file, or
the database.** The Hindi must come from SSC's Hindi print. A reader holding the English
drifts into translating it, and a translation is exactly what we must not store. The
checker refuses a stem that is mostly Latin letters.

## Output

`<OUT>/<shiftId>/hi-drafts/part-<A|B|C>.txt`, plain text, one block per question in
order (not JSON: JSON loses backslashes):

```
Q 50
stem: **निम्नलिखित कथनों पर विचार कीजिए:**
1. जीएसटी परिषद जीएसटी दरों पर बाध्यकारी सिफारिशें करती है।
2. अनुच्छेद 246A राज्यों को वस्तुओं और सेवाओं की अंतर-राज्यीय आपूर्ति पर कानून बनाने की अनुमति देता है।
उपर्युक्त में से कौन सा/से **सही है/हैं**?
A: केवल 1
B: केवल 2
C: 1 और 2 दोनों
D: न तो 1 और न ही 2

Q 51
stem: समीकरण को संतुष्ट करने के लिए ? के स्थान पर क्या आएगा:

\((\sqrt{3} + 2)^2 = ? + 4\sqrt{3}\)
A: \(7\)
B: \(6\)
C: \(5\)
D: \(4\)

Q 53
stem: यदि \((P + Q)\) का \(25\%\) = \((P - Q)\) का \(75\%\) है, तो \(P : Q\) का अनुपात ज्ञात कीजिए।
A: \(1 : 2\)
B: \(2 : 1\)
C: \(1 : 3\)
D: \(3 : 1\)

Q 55
stem: एक दुकानदार ने एक घड़ी का मूल्य ₹800 अंकित किया। उसने इसे \(15\%\) छूट देकर बेचा। यदि बिक्री पर उसका लाभ \(20\%\) था, तो घड़ी का क्रय मूल्य क्या था?
A: ₹542.36
B: ₹536.47
C: ₹566.67
D: ₹596.34
```

A field runs until the next `stem:` / `context:` / `A:`-`D:` / `note:` line, so a stem
can span lines. Write `context:` only when the skeleton says `passage: yes`. `note:` is
optional, for the main session (see rules 7 and 8).

## Rules

1. **Copy the print exactly**, SSC's spelling included. Do not correct, modernise or
   reword. Never write anything the print does not show.
2. **Maths in `\( ... \)` LaTeX.** Where the skeleton gives the English row's maths,
   use those zones **verbatim** for the same formula (Q53 above: the English zones are
   `\(25\%\)`, `\((P + Q)\)`..., placed where the Hindi sentence has them). Where the
   English zone joins a formula with words the Hindi print orders differently, split it
   into the zones the Hindi needs, in the same LaTeX style. No Unicode maths symbols
   (× ÷ √ ° ≤ ² ∴) anywhere: `\times`, `\div`, `\sqrt{}`, `^\circ`, `\le`, `^2`.
3. **Options marked `as given`** are copied character for character from the skeleton
   (numbers, money, ratios, formulas read the same in both prints). Check them against
   the sheet anyway: if the Hindi print shows something else, write what it shows and
   add a `note:`.
4. **Line breaks as printed.** Numbered statements each on their own line. Where the
   print sets an instruction apart from what follows (a word list, an analogy, an
   equation on its own line), leave one blank line between them (Q51).
5. **Bold** what the print bolds, as `**...**` (Q50).
6. **English inside the Hindi print** (letter codes, word series like
   `LEAF : ? :: TIME : EMIT`, abbreviations) is copied as printed.
7. **The two prints sometimes say different things** (Q50: the Hindi says
   अंतर-राज्यीय, inter-state, where the English says intra-state). Write the Hindi as
   printed and add a `note:` naming the difference only if you happen to see it. You
   are not asked to compare.
8. A word you genuinely cannot read: give your best reading and say so in `note:`.
9. Figures belong to the English row; never describe a figure. Words printed inside a
   figure stay out.
10. A question printed in Hindi only, or a Hindi half that looks like the English
    (the sheet header names it), is written as printed with a `note:`.

## Then check

```
npx tsx scripts/ssc-cgl/hi-check.ts <shiftId> --file=<your draft> --partial
```

Fix every ERROR (a stem mostly in Latin letters, broken maths, not four options). A
WARNING that numbers differ between the prints: look at the sheet again; if the print
really differs, add a `note:`; a misread number is not fine.

Report back in under 15 lines: questions written, errors (must be 0), each warning
with one line on why it stands.
