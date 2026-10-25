# Triage brief: does this question's solution need an animated picture?

The contract for Wave 1 triage agents (scripts/visuals/README.md).

PYQ Vault is adding **animated solutions**: a picture drawn by code from the
question's own numbers, which moves step by step with the written solution.
Examples: a wheel turning twice while a counter climbs to 4π radians; a light
ray bending through a glass slab, drawn to scale; a parabola whose roots move
as a slider changes a parameter. You decide, for each question, whether such a
picture would help a student understand the solution.

## The four verdicts (pick exactly one)

- **animate**: a picture computed from the question's numbers would make the
  solution clearer, AND something in it changes or builds up step by step:
  motion, rotation, a ray's path, a value being swept, a construction drawn
  piece by piece, a graph or region whose shape is the point, a spatial set-up
  the student has to imagine (geometry, vectors, coordinates).
- **still**: one fixed picture is the right help and nothing needs to move: a
  circuit, an apparatus, a molecule's structure, a labelled diagram.
- **none**: a picture adds nothing: recall of a fact or name, a definition,
  units and dimensions, pure algebra or arithmetic where drawing it would not
  help, chemistry that is about names, reagents or properties.
- Do NOT use any other verdict.

Be strict. A picture is not "nice to have": choose animate or still only when
a student would understand THIS solution better with the picture than without.
Think as a teacher: judge what the picture would SHOW, not how the solution is
written. A solution written as algebra can still be about a shape (a locus, a
region, a tangent), and that is a picture question.

How this brief is used (calibration 2026-10-25, `calibration/2026-10-25/`):
Haiku reads every question first and its confident "none" is final; Sonnet
judges the rest; the main session reviews every "animate" when its scene is
drafted.

## For animate and still: name the situation

`situation` is a short kebab-case name for WHAT would be drawn, reusable
across many questions. Prefer one of these; invent a new one only if none fits:

rotation, circle-arc, circle-geometry, triangle, heights-distances,
quadratic-roots, function-graph, curve-sketch, area-between-curves,
line-in-plane, conic, number-line-intervals, inequality-region, lpp-region,
vectors-2d, vectors-3d, line-plane-3d, complex-plane, venn,
probability-tree, sample-grid, statistics-plot, sequence-pattern,
matrix-transform, projectile, motion-1d-graph, relative-motion,
forces-free-body, circular-motion, shm, waves, collisions, gravitation-orbit,
fluid-pressure, thermal-graph, gas-process-pv, ray-optics-mirror,
ray-optics-lens, refraction-slab, prism, wave-optics, circuit,
capacitor-network, field-lines, magnetic-force, em-induction, energy-levels,
radioactive-decay, semiconductor-band, logic-gates, titration-curve,
reaction-energy-profile, kinetics-graph, equilibrium-shift,
molecule-structure, crystal-lattice, orbital-shape, electrochem-cell,
periodic-trend.

For `none`, leave `situation` empty ("").

## Output

Write a JSON array to the output path you were given, one object per question,
in the input order:

```json
[{ "n": 12, "id": "<the question id>", "verdict": "animate", "situation": "projectile", "reason": "range and height depend on the launch angle; the path is the point", "confidence": "high" }]
```

- `reason`: at most 15 words, plain English.
- `confidence`: "high" or "low" (low = you could argue it either way).

## Rules

- Judge from each question's text, options and solution only.
- Read only the input file you were given; write only the output file.
- Do not run commands, open other files, or search the web.
- Keep your own messages short: when done, reply with one line saying how
  many questions you triaged and how many of each verdict.
