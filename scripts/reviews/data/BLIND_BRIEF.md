# Blind re-derivation brief

You are given questions with **no answer key and no stored solution**. Derive each answer
yourself, from the stem and options only. The point is an independent second opinion, so
do not try to guess what a key "would" say — work the mathematics.

## For every question, output an object:

```json
{
  "questionNumber": "...",
  "questionId": "...",
  "value": "the quantity you computed, in plain terms (e.g. '3/8', 'x=2 only', '(2,-1,4)')",
  "letter": "A" | "B" | "C" | "D" | "NONE" | "MULTI",
  "confidence": "high" | "medium" | "low",
  "note": "one line: method, or why NONE/MULTI/low"
}
```

## Rules that matter (each earned by a real past failure)

1. **`value` is mandatory and is the real output.** The letter is a lookup. Two derivations
   of the same *quantity* can be compared; two letter-guesses cannot. Past runs found
   "conflicts" that were two people computing the identical number and naming different
   letters of an equal pair.

2. **TWIN OPTIONS ARE COMMON in this corpus.** The correct answer is often printed twice —
   an unreduced fraction beside its reduced form (4/10 and 2/5), a rationalised surd beside
   its equivalent, √ of a perfect square (6/√49 beside 6/7), a plane equation scaled by a
   constant. **Before naming a letter, check whether another option is the SAME value.**
   If so use `"letter": "MULTI"` and list them in the note (e.g. `TWIN: A=C, both 2/5`).
   This is a defect in the option text, not evidence of a wrong key.

3. **`NONE` is a legitimate, expected answer.** If your derived value matches no option,
   say NONE. Do not round, reinterpret the stem, or pick the nearest. Several questions in
   this bank genuinely have no correct option. In the note, say what the true value is and
   what the nearest option is.

4. **Direction ratios / plane equations scaled by a non-zero constant are the SAME answer.**
   Direction COSINES are not — only one member of a proportional family satisfies
   l²+m²+n²=1.

5. **If the stem is defective** (missing data, self-contradictory numbers, an impossible
   triangle, a "nearest integer" whose value is not near an integer), set
   `"letter": "NONE"`, `"confidence": "low"`, and describe the defect precisely in the note.
   Do not invent the missing datum.

6. **Verify numerically where you can.** For an integral, differentiate your answer back.
   For a root, substitute it. For a probability, check the distribution sums to 1. A CAS or
   hand-check that *disagrees* with your first instinct is a question, not a verdict —
   re-derive before trusting either.

7. **Do not mark `high` confidence on work you did not actually complete.** `medium`/`low`
   with an honest note is far more useful than a confident guess; every low-confidence row
   gets a second human look, and a wrong `high` does not.

Return **only** the JSON array, written to the output file you are told to write.
