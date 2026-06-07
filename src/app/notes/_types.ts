/**
 * Editorial types for /notes — per-subtopic teaching content for digital-board
 * use AND student self-study. Notes are authored as TS modules under each
 * chapter's _data/ directory and rendered in two modes:
 *
 *  - Read mode (default, scrollable, indexable) — every concept rendered
 *    end-to-end with intuition + definition + formula + worked example +
 *    PYQ + trap, in sequence. Students can read top-to-bottom.
 *  - Present mode (full-bleed slide deck, keyboard nav) — same content
 *    paced as slides, projector-friendly, for live teaching.
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
  | "pc-geometric-counting-diagram";

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

/**
 * A single slide inside Present mode, derived from a SubtopicNote by
 * splitNoteIntoSlides. One concept unit produces between 2 and 5 slides
 * depending on which optional fields are populated.
 */
export type Slide =
  | { kind: "title"; title: string; definition: string }
  | { kind: "why"; whyItMatters: string }
  | {
      kind: "concept-intro";
      conceptName: string;
      intuition: string;
      definition: string;
      formula?: FormulaSpec;
    }
  | {
      kind: "visualization";
      conceptName: string;
      slug: VisualizationSlug;
    }
  | {
      kind: "authored-example";
      conceptName: string;
      example: AuthoredExample;
    }
  | {
      /**
       * Reference-variant core teaching slot — sits where `authored-example`
       * does for formula concepts. Emitted only for `ConceptUnitReference`.
       */
      kind: "reference-table";
      conceptName: string;
      table: ReferenceTable;
    }
  | {
      kind: "self-check";
      conceptName: string;
      example: AuthoredExample;
    }
  | {
      kind: "practice-set";
      conceptName: string;
      problems: PracticeProblem[];
    }
  | {
      kind: "pyq-example";
      conceptName: string;
      exampleId: string;
    }
  | { kind: "trap"; conceptName: string; trap: TrapCallout }
  | {
      kind: "concept-drill";
      conceptName: string;
      questionIds: string[];
    }
  | { kind: "drill"; subtopicName: string };
