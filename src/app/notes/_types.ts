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
 * A worked example with one or more steps hidden behind a click-to-reveal,
 * so the student attempts those steps before seeing the solution. Implements
 * the worked-example → faded → independent ramp (Sweller / Renkl).
 */
export type FadedExample = AuthoredExample & {
  /**
   * 0-based indexes of steps whose body is hidden until the student clicks.
   * Empty array means nothing is hidden (= same as a regular AuthoredExample).
   */
  hiddenStepIndexes: number[];
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
  | "cross-product-area";

export type TrapCallout = {
  /** Short trap headline. KaTeX-aware. */
  title: string;
  /** What goes wrong + how to avoid it. KaTeX-aware. */
  body: string;
};

export type ConceptUnit = {
  /**
   * Stable slug used for in-page anchors and (future) concept-tag joins to
   * questions. Lowercase, hyphenated, scoped within the subtopic.
   */
  slug: string;
  /** Display name shown as the section heading. */
  name: string;
  /** 1-2 sentences building the mental model. Plain language. */
  intuition: string;
  /** Formal statement. May be brief — the formula does the heavy lifting. */
  definition: string;
  /** Optional formula box. Some concepts (e.g. "always sort first") have no formula. */
  formula?: FormulaSpec;
  /**
   * Authored inline example with step-by-step working — written to teach
   * the concept simply, not pulled from the bank.
   */
  authoredExample: AuthoredExample;
  /**
   * Optional UUID of a real PYQ from the bank that applies this concept.
   * Rendered via the existing WorkedExampleCard so students can see how the
   * concept shows up on the actual exam. Stays editorial (TS-curated) — it
   * is the "featured" example, not a drill list.
   *
   * Drill-list questions are NOT carried on this type. They live in the
   * `question_concept_tags` DB table (migration 0021) and are resolved at
   * request time via `loadResolvedDrills`.
   */
  pyqExampleId?: string;
  /**
   * Optional faded follow-up to the worked authored example — same shape as
   * AuthoredExample plus indexes of steps hidden behind reveal. Sits between
   * the worked example and the self-check on the page.
   */
  fadedExample?: FadedExample;
  /**
   * Optional independent-practice problem rendered with the full solution
   * hidden behind a single reveal. The third rung in the worked → faded →
   * independent ramp.
   */
  selfCheckExample?: AuthoredExample;
  /**
   * Optional set of Level 1 mastery reps — short, procedurally-simple
   * problems for drilling the concept to fluency. Rendered as a compact
   * "Practice — Level 1" block after the self-check, each with per-rep
   * click-to-reveal.
   */
  practiceSet?: PracticeProblem[];
  /**
   * Optional inline visualization that explains the concept dynamically.
   * Rendered as a client island immediately after the concept intro. The
   * slug controls which component renders.
   */
  visualizationSlug?: VisualizationSlug;
  /** Optional gotchas specific to this concept. Rendered inline within the unit. */
  traps?: TrapCallout[];
};

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
      kind: "faded-example";
      conceptName: string;
      example: FadedExample;
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
