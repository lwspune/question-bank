/**
 * Animated solutions (owner, 2026-10-25): a picture drawn from the question's
 * own numbers that moves with the solution step by step, and works out the
 * answer itself so a wrong picture cannot be attached.
 *
 * A scene is pure: given its params and how far the solution has got, it
 * returns a list of shapes. The client renders them as SVG; tests measure
 * them. Colours are TONES the renderer maps to theme variables, so a scene
 * never names a colour and both themes stay right.
 */

export type Tone = "fg" | "muted" | "line" | "brand" | "amber" | "good" | "bad" | "glass" | "soft" | "goodSoft" | "card";

export interface Style {
  stroke?: Tone;
  fill?: Tone;
  width?: number;
  dash?: string;
  opacity?: number;
  cap?: "round" | "butt";
}

export type Shape =
  | ({ kind: "line"; x1: number; y1: number; x2: number; y2: number } & Style)
  | ({ kind: "circle"; cx: number; cy: number; r: number } & Style)
  | ({ kind: "rect"; x: number; y: number; w: number; h: number; rx?: number } & Style)
  | ({ kind: "path"; d: string } & Style)
  | ({ kind: "polyline"; points: [number, number][] } & Style)
  /** A line of typeset maths (KaTeX), for the algebra-steps scene. `tex` may mark terms with \htmlClass{viz-mark-1..3}. */
  | { kind: "math"; x: number; y: number; w: number; h: number; tex: string; tone: Tone; size?: number; opacity?: number }
  | {
      kind: "text";
      x: number;
      y: number;
      text: string;
      tone: Tone;
      size?: number;
      weight?: 400 | 600 | 700;
      anchor?: "start" | "middle" | "end";
      italic?: boolean;
      opacity?: number;
    };

/** How far the solution has got: beats played so far, the last one at progress t. */
export interface FrameState {
  played: readonly string[];
  t: number;
  /** The slider's value, for a scene that has one. */
  slider: number | undefined;
}

export interface Slider {
  label: string;
  min: number;
  max: number;
  step: number;
  initial: number;
}

export interface Scene<P = unknown> {
  id: string;
  /** Everything this scene can show, in its natural order. A visual picks and groups them. */
  beats: readonly string[];
  /** Validate raw params; an error string names what is wrong. */
  parse(raw: unknown): P | { error: string };
  /** The answer the scene works out from its own model (the self-check). */
  check(p: P): number;
  /** One plain sentence saying what the check found, for under the picture. */
  checkText(p: P, value: number): string;
  viewBox(p: P): { w: number; h: number };
  frame(p: P, state: FrameState): Shape[];
  /** Milliseconds for one beat's animation. */
  duration?(beat: string): number;
  slider?(p: P): Slider;
  status?(p: P, value: number): { text: string; tone: "good" | "bad" | "muted" };
}

export interface VisualStep {
  /** Index of the solution sentence this step starts at. */
  from: number;
  beats: string[];
}

/** What questions.solution_visual stores (migration 0184). */
export interface SolutionVisual {
  v: 1;
  scene: string;
  params: unknown;
  steps: VisualStep[];
  /** solutionFingerprint() of the solution the steps were mapped against. */
  fingerprint: string;
  answer: { value: number; label: string; tolerance?: number };
}
