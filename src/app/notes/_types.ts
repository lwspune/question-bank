/**
 * Editorial types for /notes — per-subtopic teaching content for student
 * self-study (and digital-board teaching). Notes are authored as TS modules
 * under each chapter's _data/ directory and rendered top-to-bottom (scrollable,
 * indexable): every concept end-to-end with intuition + definition + formula +
 * worked example + PYQ + trap, in sequence. (A slide-deck "Present mode" existed
 * until 2026-06-09 and was removed.)
 *
 * The atomic block is the ConceptUnit, not the subtopic. A subtopic is an
 * ordered list of concept units; each unit is a self-contained mini-lesson.
 */

export type FormulaSpec = {
  /** Short label shown above the formula, e.g. "Arithmetic Mean". */
  label: string;
  /** LaTeX source, rendered display-mode via KatexRenderer. */
  latex: string;
  /** Optional legend mapping symbol → meaning. Rendered as a tight list. */
  symbols?: { symbol: string; meaning: string }[];
};

export type AuthoredExample = {
  /** Question text, plain language. KaTeX-aware. */
  prompt: string;
  /**
   * Ordered worked-solution steps. Each rendered as a numbered row.
   * KaTeX-aware — inline math via \(...\), display math via \[...\].
   */
  steps: string[];
  /** Final answer, displayed prominently below the steps. KaTeX-aware. */
  answer: string;
};

/**
 * A single Level 1 mastery rep — a short, procedurally-simple practice
 * problem for drilling one concept to fluency. Authored (not bank-derived)
 * because per-concept EASY bank coverage is too thin and mastery reps are
 * best when procedurally near-identical. Lighter than AuthoredExample: an
 * answer plus an optional one-line method, no full step list.
 */
export type PracticeProblem = {
  /** Short question. KaTeX-aware. */
  prompt: string;
  /** Final answer, revealed on click. KaTeX-aware. */
  answer: string;
  /** Optional one-line method/hint shown with the answer. KaTeX-aware. */
  method?: string;
};

/**
 * The stable identifier of an interactive visualization component rendered
 * inline within a concept unit. The slug maps 1:1 to a client island under
 * `src/app/notes/_components/visualizations/`. Locked union — adding a new
 * visualization requires landing the component AND extending this union.
 */
export type VisualizationSlug =
  | "regression-line-fit"
  | "variance-squared-deviations"
  | "histogram-bin-slider"
  | "vector-addition"
  | "vector-projection"
  | "cross-product-area"
  | "dice-sum-grid"
  | "venn-two-events"
  | "probability-tree"
  // Statistics — batch 2
  | "skew-mean-median-mode"
  | "pie-chart-sectors"
  | "correlation-scatter"
  // Vectors — batch 2
  | "right-hand-rule-cross"
  | "unit-normal-vector"
  | "direction-cosines"
  | "triple-product-box"
  | "section-formula"
  | "triangle-centroid"
  | "parallelogram-diagonals"
  // Probability — batch 2
  | "exclusive-vs-independent"
  | "conditional-restrict"
  | "set-operations-venn"
  // Statistics — batch 3
  | "median-middle-value"
  | "mode-bar-plot"
  | "mean-balance-point"
  | "mean-deviation-spread"
  | "identify-regression-line"
  | "angle-between-regression-lines"
  // Vectors — batch 3
  | "component-form-basis"
  | "orthonormal-triple"
  | "torque-moment"
  | "position-displacement"
  | "magnitude-right-triangle"
  | "scalar-multiply"
  | "dot-product-work"
  // Probability — batch 3
  | "sample-space-event"
  | "coin-toss-tree"
  | "neither-complement-union"
  | "exhaustive-events-tiling"
  // NDA Physics — Sound chapter
  | "compression-rarefaction-wave"
  | "beats-envelope"
  | "ear-anatomy"
  | "frequency-spectrum-strip"
  | "echo-geometry"
  // MHT-CET Maths — Indefinite Integration chapter
  | "antiderivative-family"
  // NDA Maths — 3D Geometry chapter
  | "octants-coordinate-planes"
  | "line-plane-intersection"
  | "plane-with-normal"
  | "sphere-plane-tangency"
  | "angle-between-lines-3d"
  | "sphere-centre-radius-3d"
  // NDA Maths — Matrices & Determinants chapter
  | "determinant-as-area"
  | "cofactor-sign-grid"
  | "sarrus-rule"
  // NDA Physics — Electricity & Magnetism chapter
  | "field-lines-charge"
  | "iv-characteristic-graph"
  | "resistance-wire-geometry"
  | "resistors-series-parallel"
  | "emf-internal-resistance"
  | "magnetic-field-around-wire"
  | "flemings-left-hand-rule"
  | "magnetic-force-triad"
  | "bar-magnet-field-lines"
  | "solenoid-field-lines"
  // NDA Maths — Sequence & Series chapter
  | "am-gm-hm-means"
  // NDA Maths — Binomial Distribution chapter
  | "binomial-pmf-interactive"
  | "binomial-coefficient-tree"
  | "binomial-tail-shading"
  | "binomial-mean-spread"
  // NDA Maths — Functions chapter
  | "function-mapping-diagram"
  | "function-domain-range-graph"
  | "even-odd-symmetry"
  | "composition-machine"
  | "inverse-reflection-line"
  | "greatest-integer-staircase"
  // NDA Maths — Differentiation chapter
  | "diff-tangent-slope"
  | "diff-modulus-corner"
  | "diff-piecewise-join"
  // NDA Maths — Trigonometric Identities chapter
  | "trig-astc-quadrants"
  | "trig-amplitude-phase"
  // NDA Maths — Limits & Continuity chapter
  | "lim-discontinuity-types"
  | "lim-one-sided-approach"
  // NDA Maths — Application of Derivatives chapter
  | "aod-sign-of-derivative"
  | "aod-extrema-curve"
  // NDA Maths — Lines chapter
  | "lines-angle-between-diagram"
  | "lines-distance-point-line"
  // NDA Maths — Permutation & Combination chapter
  | "pc-geometric-counting-diagram"
  // NDA Maths — Complex Numbers chapter
  | "cn-argand-plane"
  | "cn-cube-roots-circle"
  // NDA Biology — Human Physiology chapter
  | "hp-heart-chambers"
  | "hp-eye-cross-section"
  | "hp-nephron-schematic"
  | "hp-reflex-arc"
  | "hp-lung-volumes"
  | "hp-alveolus-gas-exchange"
  // NDA Maths — Sets & Relations chapter
  | "sets-venn-two"
  | "sets-venn-three"
  | "sets-relation-digraph"
  | "sets-cartesian-grid"
  // NDA Maths — Definite Integration chapter
  | "defint-area-region"
  | "defint-kings-reflection"
  | "defint-greatest-integer-area"
  | "defint-absolute-value-fold"
  // NDA Maths — Differential Equations chapter
  | "defeq-family-of-curves"
  | "defeq-growth-decay"
  // NDA Maths — Quadratic Equations chapter
  | "qe-discriminant-parabola"
  | "qe-roots-in-interval"
  // NDA Maths — Binomial Theorem chapter
  | "bt-pascal-triangle"
  // NDA Maths — Properties of Triangle chapter
  | "pt-triangle-labeled"
  | "pt-circumcircle-incircle"
  // NDA Maths — Conics chapter
  | "conics-parabola-diagram"
  | "conics-ellipse-diagram"
  // NDA Maths — Inverse Trigonometry chapter
  | "it-principal-ranges"
  // NDA Maths — Trigonometric Equations chapter
  | "te-solution-counting"
  // NDA Maths — Circles chapter
  | "circ-circle-anatomy"
  | "circ-inscribed-angle"
  // NDA Maths — Applications of Integration chapter
  | "aoi-area-under-curve-region"
  | "aoi-area-between-curves-region"
  // NDA Maths — Height & Distance chapter
  | "hd-elevation-triangle"
  | "hd-shadow-sun"
  // NDA Chemistry
  | "carb-allotrope-structures"
  | "atom-bohr-shells"
  | "atom-periodic-trends"
  | "matt-states-of-matter"
  // NDA Chemistry — batch 2 (spatial-answer concepts)
  | "carb-micelle"
  | "carb-functional-groups"
  | "acid-ph-scale-strip"
  | "matt-distillation-apparatus"
  | "matt-colloid-tyndall"
  | "bond-ionic-covalent-formation"
  | "hyd-water-hydrogen-bonding"
  | "rxn-reaction-types"
  // NDA Physics — Light and Optics chapter
  | "opt-concave-mirror-rays"
  | "opt-convex-mirror-rays"
  | "opt-refraction-tir"
  | "opt-convex-lens-rays"
  | "opt-prism-dispersion"
  | "opt-human-eye"
  // NDA Physics — Laws of Motion chapter
  | "lmf-free-body-diagram"
  | "lmf-action-reaction-pair"
  | "lmf-resultant-parallelogram"
  | "lmf-friction-incline"
  // NDA Physics — Heat and Thermodynamics chapter
  | "ht-heat-transfer-modes"
  | "ht-pv-process-diagram"
  | "ht-anomalous-water-expansion"
  // NDA Physics — Modern Physics chapter
  | "mp-photoelectric-setup"
  | "mp-bohr-energy-levels"
  | "mp-radiation-penetration"
  // NDA Physics — Kinematics chapter
  | "kin-velocity-time-graph"
  | "kin-position-time-graph"
  | "kin-projectile-parabola"
  // NDA Physics — Fluid Mechanics chapter
  | "fluid-pressure-depth"
  | "surface-tension-meniscus"
  | "archimedes-floating-block"
  | "pascal-hydraulic-press"
  // NDA Physics — Work, Energy and Power chapter
  | "wep-work-at-angle"
  | "wep-energy-conservation-track"
  // NDA Physics — Gravitation chapter
  | "grav-kepler-orbit"
  | "grav-composite-sphere"
  | "grav-field-vs-potential"
  // NDA Physics — Units, Measurement and Dimensions chapter
  | "umd-least-count-ruler"
  // NDA Physics — Oscillations and Waves chapter
  | "osc-shm-displacement-time"
  | "osc-pendulum-restoring-force"
  | "osc-wave-types"
  // NDA Biology — Cell Biology chapter
  | "cell-fluid-mosaic-membrane"
  | "cell-animal-plant-structure"
  | "cell-organelle-map"
  | "cell-prokaryote-eukaryote"
  | "cell-osmosis-tonicity"
  // NDA Biology — Plant Biology chapter
  | "plant-photosynthesis-flow"
  | "plant-tropism-bending"
  | "plant-seed-parts"
  // NDA Biology — Microbiology and Disease chapter
  | "micro-pathogen-tree"
  | "micro-malaria-cycle"
  // NDA Biology — Reproduction chapter
  | "repro-flower-structure"
  | "repro-double-fertilisation"
  // NDA Biology — Ecology and Environment chapter
  | "eco-food-chain-pyramid"
  // NDA Biology — Biodiversity and Classification chapter
  | "biodiv-five-kingdoms"
  | "biodiv-plant-progression";

export type TrapCallout = {
  /** Short trap headline. KaTeX-aware. */
  title: string;
  /** What goes wrong + how to avoid it. KaTeX-aware. */
  body: string;
};

/**
 * One row of a reference table — N cell strings that line up with the
 * parent table's column headers. KaTeX-aware via inline `\(...\)`; renders
 * bold via `**text**` within cells (no block bullets — cells are inline).
 */
export type ReferenceRow = {
  /** N strings, must satisfy `cells.length === table.columns.length`. */
  cells: string[];
  /**
   * Optional amber-highlighted callout shown beneath the row — used for
   * trap-aware annotations like "watch the units" or "this is the answer
   * the bank tests, not the textbook one". KaTeX-aware, plain text.
   */
  noteAmber?: string;
  /**
   * Optional UUID of a PYQ that specifically tests this row's fact.
   * Surfaces as a small `[Q]` chip on the row when set. Per-row pyq
   * lookups are RESOLVED separately from the concept-level pyqExampleId
   * and don't replace it.
   */
  pyqExampleId?: string;
};

/**
 * A flat reference table — the "named-fact lookup" teaching primitive for
 * recall-heavy subtopics (Sound's frequency bands, transducer chain;
 * Modern Physics's scientist-discovery pairs; etc.). Discriminated by
 * `ConceptUnit.kind === "reference"` and rendered via
 * `_components/ReferenceTableBlock` in Read mode + as its own slide kind
 * in Present mode.
 */
export type ReferenceTable = {
  /**
   * 2–5 column headers. PLAIN TEXT — no LaTeX (the audit script enforces
   * this). Multi-column for domain-specific shapes:
   *   - Frequency bands: `["Band", "Range", "Examples"]`
   *   - Speed in media:  `["Medium", "Speed (m/s)"]`
   *   - Acronyms:        `["Acronym", "Expansion", "Uses"]`
   */
  columns: string[];
  /** ≥1 row; row.cells.length must equal columns.length. */
  rows: ReferenceRow[];
  /** Optional one-line caption shown beneath the table. KaTeX-aware. */
  caption?: string;
};

/**
 * Shared fields between formula- and reference-variant concept units.
 * Both variants get the practice ramp (self-check + Level 1 reps), the
 * featured PYQ, the visualization slot, and traps — the variant choice
 * only swaps the *core teaching* slot (formula+worked example vs. table).
 */
type ConceptUnitBase = {
  /**
   * Stable slug used for in-page anchors and concept-tag joins to
   * questions. Lowercase, hyphenated, scoped within the subtopic.
   */
  slug: string;
  /** Display name shown as the section heading. */
  name: string;
  /** 1-2 sentences building the mental model. Plain language. */
  intuition: string;
  /** Formal statement. RichText — supports bold + bullet definitions. */
  definition: string;
  /**
   * Optional UUID of a real PYQ from the bank that applies this concept.
   * Stays editorial (TS-curated) — drill-list questions live in the
   * `question_concept_tags` DB table (migration 0021), not on this type.
   */
  pyqExampleId?: string;
  /**
   * Optional independent-practice problem rendered with the full solution
   * hidden behind a single reveal — the independent-attempt rung after
   * the core teaching slot.
   */
  selfCheckExample?: AuthoredExample;
  /**
   * Optional set of Level 1 mastery reps — short, procedurally-simple
   * problems for drilling to fluency. For reference variant these are
   * single-fact recall reps ("Q: ultrasonic range? A: > 20 kHz").
   */
  practiceSet?: PracticeProblem[];
  /**
   * Optional inline visualization. Rendered as a client island
   * immediately after the concept intro.
   */
  visualizationSlug?: VisualizationSlug;
  /** Optional gotchas specific to this concept. Rendered inline. */
  traps?: TrapCallout[];
};

/**
 * Formula-variant ConceptUnit — the original shape. Core teaching slot is
 * an optional formula box + a required step-by-step authored example.
 * Used for technique-driven concepts (`v = fλ`, `\bar{x} = Σx/n`, etc.).
 */
export type ConceptUnitFormula = ConceptUnitBase & {
  kind: "formula";
  /** Optional formula box. Some "always sort first" concepts have none. */
  formula?: FormulaSpec;
  /**
   * Authored inline example with step-by-step working — written to teach
   * the concept simply, not pulled from the bank.
   */
  authoredExample: AuthoredExample;
};

/**
 * Reference-variant ConceptUnit — the named-fact lookup shape introduced
 * for Recall-strand chapters where the bank tests memorisation of a flat
 * table rather than a technique. Core teaching slot is a `ReferenceTable`
 * in place of formula+authored example. Practice/PYQ/traps slots still
 * apply: self-check becomes "hide a cell" recall, practice reps become
 * single-fact MCQ.
 */
export type ConceptUnitReference = ConceptUnitBase & {
  kind: "reference";
  /** The table — the core teaching content. */
  table: ReferenceTable;
};

/** Discriminated by `kind`. Adding a third variant is a breaking change. */
export type ConceptUnit = ConceptUnitFormula | ConceptUnitReference;

export type RelatedLink = {
  label: string;
  href: string;
};

export type SubtopicNote = {
  /** Canonical DB subtopic name. Resolved to UUID at request time. */
  subtopicName: string;
  /** Display title on the page. */
  title: string;
  /** Plain-language one-line definition for the hero. */
  oneLineDefinition: string;
  /**
   * 2-3 sentences: PYQ frequency + difficulty mix + why teachers/students
   * should care. Rendered under the hero. Empty string omits the section.
   */
  whyItMatters: string;
  /** The body: ordered list of concept units. */
  concepts: ConceptUnit[];
  /** Optional cross-refs to other notes or guide principles. */
  related?: RelatedLink[];
};

export type ChapterNote = {
  chapterName: string;
  title: string;
  intro: string;
  /** Ordered subtopic slugs for the chapter landing + side nav + prev/next. */
  subtopicOrder: string[];
};

