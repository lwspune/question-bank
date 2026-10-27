/**
 * A Learn lesson's content shapes, copied from Concept Ladder (src/content/types.ts, afca8bf).
 * The lesson body is stored as jsonb in learn_concepts.body (migration 0192).
 *
 * Text fields are KaTeX-aware: `$…$` inline math, `$$…$$` display math, `**…**` bold.
 */

/** A point in the complex plane as [real part, imaginary part]. */
export type Pt = [number, number];

/** A convex or co-convex piece of the plane; a region is the overlap of its shapes. */
export type Shape =
  | { kind: "disc"; centre: Pt; r: number }
  | { kind: "outsideDisc"; centre: Pt; r: number }
  /** Keeps the side on the left when walking from the first point to the second. */
  | { kind: "halfPlane"; through: [Pt, Pt] }
  /** Angles in degrees, anticlockwise from `from` to `to`. */
  | { kind: "sector"; centre: Pt; from: number; to: number };

export type FigureElement = {
  /**
   * When the element appears. In a worked example or solution, the step
   * (1-based) that introduces it; on the idea slide, the order it animates in.
   * Omitted: shown from the start.
   */
  step?: number;
  /** Plain text, no LaTeX: "z", "1 + 2i", "|z| = 3". */
  label?: string;
  /** Where the label sits relative to its anchor (default "ne"). */
  labelAt?: "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";
  /** Colour role (default: accent for the main object). */
  tone?: "accent" | "muted" | "good" | "bad";
} & (
  /** `hollow` marks an excluded point (e.g. the start of a ray). */
  | { kind: "point"; at: Pt; hollow?: boolean }
  /** An arrow; `from` defaults to the origin. */
  | { kind: "vector"; from?: Pt; to: Pt }
  /** `ticks` marks equal sides: 1 to 3 short strokes across its middle, the same count on each equal side. */
  | { kind: "segment"; from: Pt; to: Pt; dashed?: boolean; ticks?: 1 | 2 | 3 }
  /** The whole line through two points, clipped to the view. */
  | { kind: "line"; through: [Pt, Pt]; dashed?: boolean }
  /** Starts at `from` (excluded) in the direction `angle`, in degrees. */
  | { kind: "ray"; from: Pt; angle: number }
  | { kind: "circle"; centre: Pt; r: number; dashed?: boolean }
  /** Axis-aligned: `rx` along the real axis, `ry` along the imaginary axis. */
  | { kind: "ellipse"; centre: Pt; rx: number; ry: number; dashed?: boolean }
  /**
   * One branch of a hyperbola, clipped to the view. `axis` is the direction
   * it opens along; `branch` picks the side (+1: right or up). Vertices at
   * centre ± a along that axis; `b` is the other semi-axis.
   */
  | { kind: "hyperbola"; centre: Pt; a: number; b: number; axis: "x" | "y"; branch: 1 | -1; dashed?: boolean }
  /**
   * A polyline through `points`, clipped to the view: a function's graph, a
   * parabola. The author's helper computes the points (enough to look smooth).
   * Mark open or closed ends with `point` elements.
   */
  | { kind: "curve"; points: Pt[]; dashed?: boolean }
  /** Angles in degrees, anticlockwise from `from` to `to`. */
  | { kind: "arc"; centre: Pt; r: number; from: number; to: number }
  /**
   * An arm of length `r` turning about `centre` (default the origin) from `from` (default 0)
   * to `to` degrees, tracing the angle it sweeps. Positive is anticlockwise; past a full turn
   * the trace winds outward. It rotates at a steady pace when it animates; still, it shows the
   * terminal arm. Its label sits at the arm's tip.
   */
  | { kind: "turn"; centre?: Pt; r: number; from?: number; to: number }
  /** A small arc marking an angle at `at`, anticlockwise from `from` to `to` degrees. */
  | { kind: "angle"; at: Pt; from: number; to: number }
  /** A right angle's square mark at `at`, between the arms at `from` and `from` + 90 degrees. */
  | { kind: "rightAngle"; at: Pt; from: number }
  /** Text alone, anchored at a point. */
  | { kind: "label"; at: Pt }
  /** Shaded overlap of the shapes. */
  | { kind: "region"; within: Shape[] }
);

/** A figure on the Argand plane or the xy-plane, drawn with axes. Equal scale on both axes, except in a chart. */
export type Figure = {
  /** Read by screen readers in place of the picture: what it shows, in words. */
  alt: string;
  /**
   * "argand" (default): Re and Im, imaginary ticks. "xy": x and y, plain numbers.
   * "none": no axes or grid (Venn diagrams).
   */
  axes?: "argand" | "xy" | "none";
  /** The visible window: real parts from x[0] to x[1], imaginary parts from y[0] to y[1]. */
  view: { x: [number, number]; y: [number, number] };
  /**
   * A data chart (histogram, frequency polygon): x and y scale separately to a 400 × 240
   * plot, and both axes run along its bottom and left edges, numbered every `x` and `y`
   * units from the view's start. Round shapes don't belong in a chart (they would stretch).
   */
  chart?: { x: number; y: number; xTitle?: string; yTitle?: string };
  elements: FigureElement[];
};

/** Shown after the learner answers. Steps are inline text, like worked-example steps. */
export type Solution = {
  steps: string[];
  /** Elements may carry `step` to appear alongside that step. */
  figure?: Figure;
};

/**
 * A formal slide: text whose bold lead-in titles it, with a figure that plays through like the
 * idea slide's; or a title and points revealed one per click, figure step n with point n
 * (AUTHORING.md 20).
 */
export type FormalSection = { body: string; figure?: Figure } | { title: string; points: string[]; figure?: Figure };

export type WorkedExample = {
  prompt: string;
  steps: string[];
  answer: string;
  /** Element `step`s match the worked steps (1-based). */
  figure?: Figure;
};

/** A concept's lesson: the hook, then the explanation (Concept Ladder's `Concept`, the parts a lesson shows). */
export type LessonBody = {
  hook: { prompt: string; reveal: string };
  explanation: {
    intuition: string | string[];
    formal: string | FormalSection[];
    worked: WorkedExample;
    figure?: Figure;
    visualSpec: string;
  };
};
