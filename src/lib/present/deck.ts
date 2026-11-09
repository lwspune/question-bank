/**
 * The flashcard deck's rules (owner, 2026-11-09). Pure; the overlay
 * (components/present/PresentSurface) asks these and renders.
 *
 * WHY: the "Project" overlay was built for a teacher's classroom board, one
 * question a screen with ← / → between them. The owner saw that it reads as a
 * deck of flashcards and opened it to everyone. A student's deck must still
 * keep every rule the card behind it keeps, or it becomes a way round them:
 * a revealed answer spends the same free answer (claim_reveal, 0228), and a
 * tapped MCQ is graded on the server and feeds Fix your mistakes.
 *
 * Spec: tests/present-deck.test.ts.
 */
import type { PracticeSurface } from "@/lib/questions/practiceBatch";
import type { SelfMarkSurface } from "@/lib/questions/selfMark";

/** The page the deck was opened from: a practice surface, or a mock review. */
export type DeckSurface = PracticeSurface | "mock";

/**
 * teach    staff: the projector as it was. Show answer on everything, nothing
 *          counted or recorded, so a tap in front of a class is never the
 *          teacher's own miss.
 * practice a student on the bank, a board reader, a guide or the question of
 *          the day: answers spend and record exactly as on the card.
 * review   a student on a marked mock: the answers are already on the page,
 *          so nothing is counted or recorded.
 */
export type DeckMode = "teach" | "practice" | "review";

export function deckMode(input: { isStaff: boolean; surface: DeckSurface }): DeckMode {
  if (input.isStaff) return "teach";
  return input.surface === "mock" ? "review" : "practice";
}

/** pick = tap an option; ticks = tick several, then Check; show = Show answer. */
export type DeckAnswerKind = "pick" | "ticks" | "show";

export type DeckFormat = "mcq" | "msq" | "subjective" | "numeric";

/**
 * How a card is answered (owner): an MCQ by tapping an option, never Show
 * answer; only a question with no options has Show answer. A cancelled
 * question has no right option and nothing to grade, so it shows its answer
 * and its note like a written one.
 */
export function deckAnswerKind(
  q: { format: DeckFormat; options: number; cancelled: boolean },
  mode: DeckMode
): DeckAnswerKind {
  if (mode === "teach" || q.options === 0 || q.cancelled) return "show";
  return q.format === "msq" ? "ticks" : "pick";
}

/**
 * Which counter a reveal spends, the same as the card it was opened from:
 * meter = the bank and board meter (signed-out wall + the signed-in daily
 * limit); daily = the daily limit alone (guide and notes examples never had a
 * signed-out wall); none = nothing counted.
 */
export type DeckGate = "meter" | "daily" | "none";

export function deckGate(mode: DeckMode, surface: DeckSurface): DeckGate {
  if (mode !== "practice") return "none";
  return surface === "guide" ? "daily" : "meter";
}

/**
 * Where "Did you know it?" (Understood / Review later) records, or null for no
 * question. Written answers only, on the surfaces the self-mark route takes.
 * Not numeric: the drill has no screen that takes a typed value, so Review
 * later would send it nowhere. Not an MCQ: the tap already said.
 */
export function deckSelfMarkSurface(
  q: { format: DeckFormat; hasSolution: boolean },
  mode: DeckMode,
  surface: DeckSurface
): SelfMarkSurface | null {
  if (mode !== "practice" || q.format !== "subjective" || !q.hasSolution) return null;
  return surface === "bank" || surface === "board" ? surface : null;
}

/** The wall a refused reveal meets: the daily limit signed in, sign-in signed out. */
export function deckWall(allowed: boolean, signedIn: boolean): "daily" | "signin" | null {
  if (allowed) return null;
  return signedIn ? "daily" : "signin";
}

/** Who opened the deck, for the `flashcards_open` event. */
export function deckRole(mode: DeckMode): "teacher" | "student" {
  return mode === "teach" ? "teacher" : "student";
}
