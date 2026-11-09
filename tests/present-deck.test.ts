import { describe, it, expect } from "vitest";
import {
  deckMode,
  deckAnswerKind,
  deckGate,
  deckSelfMarkSurface,
  deckWall,
  deckRole,
} from "@/lib/present/deck";

/**
 * The flashcard deck's rules (owner, 2026-11-09). The overlay that teachers
 * project was opened to everyone because, one question a screen with arrows
 * between them, it reads as a deck of flashcards. Pinned here:
 *
 *  - WHO gets which deck: staff keep the projector as it was (Show answer,
 *    nothing counted or recorded, so a tap in front of a class is never the
 *    teacher's own miss); a student practises; a mock review is already
 *    marked, so its deck is free and records nothing.
 *  - HOW a card is answered (owner): an MCQ by tapping an option, never Show
 *    answer; a multiple-select by ticking and Check; only a question with no
 *    options (written, numeric) has Show answer.
 *  - WHICH counter a reveal spends: the same as the card it was opened from.
 *  - "Did you know it?" (Understood / Review later): written questions only,
 *    on the surfaces the self-mark route accepts. Numeric is left out because
 *    the drill has no screen that takes a typed value, so Review later would
 *    send it nowhere.
 */

describe("deckMode", () => {
  it("gives staff the projector, whatever page they open it from", () => {
    for (const surface of ["bank", "board", "guide", "daily", "mock"] as const) {
      expect(deckMode({ isStaff: true, surface })).toBe("teach");
    }
  });

  it("gives a student practice on every surface but a mock review", () => {
    for (const surface of ["bank", "board", "guide", "daily"] as const) {
      expect(deckMode({ isStaff: false, surface })).toBe("practice");
    }
    expect(deckMode({ isStaff: false, surface: "mock" })).toBe("review");
  });
});

describe("deckAnswerKind", () => {
  const mcq = { format: "mcq" as const, options: 4, cancelled: false };

  it("answers an MCQ by tapping an option in practice and review", () => {
    expect(deckAnswerKind(mcq, "practice")).toBe("pick");
    expect(deckAnswerKind(mcq, "review")).toBe("pick");
  });

  it("answers a multiple-select by ticking", () => {
    expect(deckAnswerKind({ ...mcq, format: "msq" }, "practice")).toBe("ticks");
  });

  it("uses Show answer for a question with no options", () => {
    expect(deckAnswerKind({ format: "subjective", options: 0, cancelled: false }, "practice")).toBe("show");
    expect(deckAnswerKind({ format: "numeric", options: 0, cancelled: false }, "practice")).toBe("show");
    // An MCQ row that lost its options cannot be tapped.
    expect(deckAnswerKind({ ...mcq, options: 0 }, "practice")).toBe("show");
  });

  it("uses Show answer for a cancelled question: no option is right, so there is nothing to grade", () => {
    expect(deckAnswerKind({ ...mcq, cancelled: true }, "practice")).toBe("show");
  });

  it("gives teachers Show answer on everything, MCQs included", () => {
    expect(deckAnswerKind(mcq, "teach")).toBe("show");
    expect(deckAnswerKind({ ...mcq, format: "msq" }, "teach")).toBe("show");
  });
});

describe("deckGate", () => {
  it("spends the card's own counter in practice", () => {
    expect(deckGate("practice", "bank")).toBe("meter");
    expect(deckGate("practice", "board")).toBe("meter");
    expect(deckGate("practice", "daily")).toBe("meter");
    // Guide and notes examples never had the signed-out wall: the daily limit alone.
    expect(deckGate("practice", "guide")).toBe("daily");
  });

  it("counts nothing for teachers or on a mock review", () => {
    expect(deckGate("teach", "bank")).toBe("none");
    expect(deckGate("review", "mock")).toBe("none");
  });
});

describe("deckSelfMarkSurface", () => {
  const written = { format: "subjective" as const, hasSolution: true };

  it("asks Did you know it? on a written answer in practice on the bank and board", () => {
    expect(deckSelfMarkSurface(written, "practice", "bank")).toBe("bank");
    expect(deckSelfMarkSurface(written, "practice", "board")).toBe("board");
  });

  it("does not ask without a model answer, on a numeric or MCQ, or off the bank and board", () => {
    expect(deckSelfMarkSurface({ ...written, hasSolution: false }, "practice", "bank")).toBeNull();
    expect(deckSelfMarkSurface({ format: "numeric", hasSolution: true }, "practice", "bank")).toBeNull();
    expect(deckSelfMarkSurface({ format: "mcq", hasSolution: true }, "practice", "bank")).toBeNull();
    expect(deckSelfMarkSurface(written, "practice", "guide")).toBeNull();
    expect(deckSelfMarkSurface(written, "practice", "daily")).toBeNull();
  });

  it("never asks a teacher, or on a review", () => {
    expect(deckSelfMarkSurface(written, "teach", "bank")).toBeNull();
    expect(deckSelfMarkSurface(written, "review", "mock")).toBeNull();
  });
});

describe("deckWall", () => {
  it("is nothing when the reveal went ahead", () => {
    expect(deckWall(true, true)).toBeNull();
    expect(deckWall(true, false)).toBeNull();
  });

  it("is the daily limit signed in and the sign-in wall signed out", () => {
    expect(deckWall(false, true)).toBe("daily");
    expect(deckWall(false, false)).toBe("signin");
  });
});

describe("deckRole", () => {
  it("names the opener for the open event", () => {
    expect(deckRole("teach")).toBe("teacher");
    expect(deckRole("practice")).toBe("student");
    expect(deckRole("review")).toBe("student");
  });
});
