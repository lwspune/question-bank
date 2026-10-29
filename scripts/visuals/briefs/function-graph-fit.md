# Fit brief: can the function-graph scene show this solution?

PYQ Vault draws animated solutions from a question's own numbers. The
**function-graph** scene plots y = f(x) and can show exactly six things:

1. **crossings**: how many solutions an equation f(x) = g(x) has on an
   interval (the curve meets a line or another curve, the points are counted).
2. **slopePoint**: the one point on a curve where the tangent (or the normal)
   has a given slope or is parallel to a given line.
3. **increasingOn**: on which interval (or union of up to 3 intervals) a
   function is increasing.
4. **decreasingOn**: the same, decreasing.
5. **slopePoints**: SEVERAL points on a curve with the same given tangent
   slope (the key lists two points, or asks how many there are, or the sum of
   their x or y).
6. **extrema**: the local maxima and/or minima of a function (the points or
   the values), or its greatest/least value on a closed interval; also a
   word problem whose solution reduces it to one function of one variable on
   a stated interval and asks for the largest or least value or where it
   occurs.
7. **roots**: the real zeros of a fully numeric function or polynomial (find
   the zeros, solve the quadratic, verify the relationship between zeros and
   coefficients), or the sum or product of those zeros. Not: complex zeros, a
   letter left in f (k, p), an expression of the zeros (α² + β²), forming a
   polynomial from given zeros, or a word problem whose answer is not a zero.

For each question decide which ONE of these the solution is really about, or
`no` if none fits. Fit only when the whole question is answered by that
picture: an area, a rate of change in time, a tangent's equation, Rolle's theorem,
a maximum of a function of two variables, or anything else is `no`.

Lean towards fitting when unsure: a later step checks every fit in detail and
drops the ones that do not work. But do not force it.

## Output

Write a JSON array to your output path, one object per question, input order:

```json
[{ "n": 3, "id": "<id>", "fit": "increasingOn", "note": "f'(x) = -sin4x; asks where f rises" }]
```

- `fit`: crossings, slopePoint, slopePoints, increasingOn, decreasingOn, extrema, roots or no.
- `note`: at most 12 words.
- `situation` (every `fit: "no"`): one camelCase word for what the question
  asks, so the questions no scene fits can be counted by what a new one would
  unlock. Use the run's list when its addendum gives one; otherwise pick from
  `findK` (a letter's value), `rootExpr` (an expression of roots), `formEquation`,
  `wordProblem`, `identity`, `division`, `proof`, `recall` (a fact or definition),
  `graphGiven` (read from a printed figure), or a new word that names a picture
  you would want ("twoLinesMeet", "wave", "circuit"), else `other`.

Read only your input file, write only your output file, run nothing. When
done, reply in one line with the count of each fit.

## Also: does the question need a picture it does not have?

Each question shows `stemImage` (true when a picture is attached to the
question) and marks options that carry a picture with `[IMAGE]`. Add
`"figureNeeded"` to every object: `"none"`, or `"stem"` / `"options"` when the
question cannot be FULLY answered without a picture it does not have (it says
"as shown in the figure" and there is no picture; the options are diagrams
with no image; a needed graph or circuit is missing). Add `"figureNote"` (at
most 12 words) saying what is missing. A question that merely could use a
picture, but is complete as written, is `"none"`.

## Also: is the stored solution wrong?

Add `"solutionWrong"`: `"none"`, or at most 20 words saying what is wrong when
a step of the solution is false (a wrong sign, a wrong value, a claim that
does not hold), even if it still reaches the keyed answer. Do not report
terse or badly worded solutions, only false ones. If the KEY itself looks
wrong, or the question cannot be answered as printed, say so here too.
