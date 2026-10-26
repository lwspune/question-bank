# Fit brief: can the coordinate-geometry scene show this solution?

PYQ Vault draws animated solutions from a question's own numbers. The
**coordinate-geometry** scene draws points, circles, parabolas, ellipses,
hyperbolas and straight lines on a true-scale grid, and can MEASURE exactly
these answers:

1. **distance**: between two points; from a point to a line; the shortest
   distance from a point to a circle or a conic; between a line and a circle;
   between two circles; between two parallel lines.
2. **yIntercept / xIntercept / slope** of one line (a line through two known
   points, a line with a known equation, the tangent at a point, or a tangent
   from a point to a circle or conic).
3. **radius** of a circle.
4. **locusRadius**: a point moves round a circle; the point dividing the
   segment from a FIXED point to the moving point in a ratio traces a circle;
   its radius.
5. **chordLength**: the chord a line cuts on a circle or conic.
6. **tangentLength**: length of the tangent from a point to a circle.
7. **area** of a triangle or polygon from its vertices.
8. **angle** between two lines (the acute one, or the obtuse one when the key
   is obtuse), reported as the angle itself or its tan, cos or sin. The lines
   may be given separately or as ONE pair equation (ax² + 2hxy + by² + ... = 0):
   the scene splits a pair itself. The two lines must cross somewhere sensible
   to draw (not parallel).

A pair of PARALLEL lines from one equation (9x² − 24xy + 16y² ... = 0) fits
**distance** when the key is the distance between them.

A key that is one of these SQUARED or MULTIPLIED by a number ("(AB)² =",
"6 × area", "(2β)²") still fits: name the measured kind.

For each question decide which ONE of these the answer is, or `no`. Fit only
when the KEYED answer is that one measured number. An equation as the answer
(of a circle, a tangent, a locus) is `no` unless the key is a single measured
number from the list. Counting things (how many common tangents), angles
other than between two lines, eccentricity, a parameter value (find k), a
joint equation as the answer, the point where two lines meet, and anything
else are `no`.

Lean towards fitting when unsure: a later step checks every fit in detail and
drops the ones that do not work. But do not force it.

## Output

Write a JSON array to your output path, one object per question, input order:

```json
[{ "n": 3, "id": "<id>", "fit": "distance", "note": "point (11,6) to circle centre (-1,1) r 5", "figureNeeded": "none" }]
```

- `fit`: distance, yIntercept, xIntercept, slope, radius, locusRadius,
  chordLength, tangentLength, area, angle or no.
- `note`: at most 12 words.

Read only your input file, write only your output file, run nothing. When
done, reply in one line with the count of each fit.

## Also: does the question need a picture it does not have?

Each question shows `stemImage` (true when a picture is attached to the
question) and marks options that carry a picture with `[IMAGE]`. Add
`"figureNeeded"` to every object: `"none"`, or `"stem"` / `"options"` when the
question cannot be FULLY answered without a picture it does not have (it says
"as shown in the figure" and there is no picture; the options are diagrams
with no image). Add `"figureNote"` (at most 12 words) saying what is missing.
A question that merely could use a picture, but is complete as written, is
`"none"`.

## Also: is the stored solution wrong?

Add `"solutionWrong"`: `"none"`, or at most 20 words saying what is wrong when
a step of the solution is false (a wrong sign, a wrong value, a claim that
does not hold), even if it still reaches the keyed answer. Do not report
terse or badly worded solutions, only false ones.
