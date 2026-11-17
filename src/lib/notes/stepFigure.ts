/**
 * The notes stepper's state: which step of an animated figure is showing, and
 * whether it is playing. Pure, so its edges are pinned by
 * tests/notes-step-figure.test.ts; the component (StepFigure) only wires it to
 * buttons and a timer.
 *
 * A figure opens on its OVERVIEW, the last step, because that is the complete
 * picture: it is what a reader skimming the page, the print view and the notes
 * ebooks should see. Play from there replays the process from the start.
 */

export type StepState = { step: number; playing: boolean };

export type StepAction =
  | { type: "play" }
  | { type: "pause" }
  | { type: "tick" }
  | { type: "next" }
  | { type: "prev" }
  | { type: "goto"; step: number };

/** How long each step stays on screen while playing, in milliseconds. */
export const STEP_MS = 2400;

export function initialStepState(total: number): StepState {
  return { step: Math.max(0, total - 1), playing: false };
}

export function stepReducer(state: StepState, action: StepAction, total: number): StepState {
  const last = Math.max(0, total - 1);
  const clamp = (n: number) => Math.min(last, Math.max(0, n));
  switch (action.type) {
    case "play":
      return { step: state.step >= last ? 0 : state.step, playing: true };
    case "pause":
      return { step: state.step, playing: false };
    case "tick": {
      if (!state.playing) return state;
      const step = clamp(state.step + 1);
      return { step, playing: step < last };
    }
    case "next":
      return { step: clamp(state.step + 1), playing: false };
    case "prev":
      return { step: clamp(state.step - 1), playing: false };
    case "goto":
      return { step: clamp(action.step), playing: false };
  }
}
