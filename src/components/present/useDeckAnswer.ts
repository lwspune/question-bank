"use client";

import { useRef, useState } from "react";
import { useSignedIn } from "@/components/auth/useSignedIn";
import { useCardRevealMeter, useDailyRevealGate, type RevealPick } from "@/components/reveal/useRevealMeter";
import { recordPractice } from "@/components/reveal/practiceBeacon";
import { useMobilePrompt } from "@/lib/profile/MobilePromptProvider";
import { trackFunnel } from "@/lib/analytics/trackFunnel";
import { gradePick } from "@/lib/questions/bankVerdict";
import { toPickLabel, type PracticeSurface } from "@/lib/questions/practiceBatch";
import {
  deckAnswerKind,
  deckGate,
  deckWall,
  type DeckAnswerKind,
  type DeckMode,
  type DeckSurface,
} from "@/lib/present/deck";
import type { PresentableQuestion } from "@/lib/present/viewModel";

/**
 * One flashcard's answer state, and the taps that change it (2026-11-09).
 *
 * The reveal goes through the SAME counter as the card the deck was opened
 * from (lib/present/deck `deckGate`): the bank and board meter, or the guide's
 * daily gate. Those keep one store per page, so an answer opened here is
 * already open on the card behind it and is never counted twice. A tapped
 * option travels with the reveal and is graded on the server, which is what
 * sends a wrong one to Fix your mistakes. Teachers and mock reviews count and
 * record nothing.
 *
 * The state is keyed by the card: stepping to the next card starts it fresh in
 * the same render, so the previous card's answer can never flash on the next.
 */
type CardState = {
  key: string;
  shown: boolean;
  picked: string | null;
  ticks: string[];
  wall: "daily" | "signin" | null;
  /** Re-keys the wall on every refused tap, so it visibly replays. */
  wallTaps: number;
};

function fresh(key: string): CardState {
  return { key, shown: false, picked: null, ticks: [], wall: null, wallTaps: 0 };
}

export type DeckAnswer = {
  kind: DeckAnswerKind;
  shown: boolean;
  picked: string | null;
  ticks: string[];
  wall: "daily" | "signin" | null;
  wallTaps: number;
  pending: boolean;
  /** The surface the walls and their links are attributed to. */
  wallSurface: PracticeSurface;
  pick: (label: string) => void;
  toggleTick: (label: string) => void;
  check: () => void;
  /** Show answer; for a teacher, Show / Hide. */
  show: () => void;
};

export function useDeckAnswer(q: PresentableQuestion, mode: DeckMode, surface: DeckSurface): DeckAnswer {
  const kind = deckAnswerKind({ format: q.format, options: q.options.length, cancelled: q.cancelled }, mode);
  const gate = deckGate(mode, surface);
  // A mock review never asks the meter (gate "none"); the hook still has to be
  // called, and "bank" is only a placeholder there.
  const wallSurface: PracticeSurface = surface === "mock" ? "bank" : surface;
  const meter = useCardRevealMeter(wallSurface, q.examName ?? "", q.questionId);
  const { signedIn, loading } = useSignedIn();
  const dailyGate = useDailyRevealGate(signedIn, loading, "guide");
  const mobilePrompt = useMobilePrompt();

  const [stored, setStored] = useState<CardState>(() => fresh(q.key));
  const card = stored.key === q.key ? stored : fresh(q.key);
  const update = (patch: Partial<CardState>) =>
    setStored((prev) => ({ ...(prev.key === q.key ? prev : fresh(q.key)), ...patch }));

  // A second tap while the server decides does nothing.
  const pendingRef = useRef(false);
  const [pending, setPending] = useState(false);

  /** The tapped option as a pick the server grades; none for a cancelled question. */
  function pickFor(label: string): RevealPick | undefined {
    const chose = toPickLabel(label);
    if (!chose || q.cancelled) return undefined;
    const verdict = gradePick(chose, {
      format: q.format,
      cancelled: q.cancelled,
      options: q.options.map((o) => ({ label: o.label, isCorrect: o.isCorrect })),
    });
    return { label: chose, correct: verdict?.correct ?? null };
  }

  /** Ask the card's counter; true when the answer may open. */
  async function reveal(label?: string): Promise<boolean> {
    if (pendingRef.current) return false;
    let allowed = true;
    let wallSignedIn = signedIn;
    if (gate !== "none") {
      pendingRef.current = true;
      setPending(true);
      try {
        if (gate === "meter") {
          allowed = await meter.attemptReveal(q.questionId, label ? pickFor(label) : undefined, q.topic);
          wallSignedIn = meter.signedIn;
          if (allowed) mobilePrompt.notifyReveal();
        } else {
          allowed = await dailyGate(q.questionId);
          // As on the guide's own card: a plain reveal, no pick graded.
          if (allowed) recordPractice(q.questionId, signedIn, "guide");
        }
      } finally {
        pendingRef.current = false;
        setPending(false);
      }
    }
    const wall = deckWall(allowed, wallSignedIn);
    if (wall) {
      update({ wall, wallTaps: card.wallTaps + 1 });
      return false;
    }
    trackFunnel("flashcards_answer", { surface, kind });
    return true;
  }

  return {
    kind,
    ...card,
    pending,
    wallSurface,
    pick(label) {
      if (kind !== "pick") return;
      // Answered already: a later tap only moves the pick, as on the card.
      if (card.shown) {
        update({ picked: label });
        return;
      }
      void reveal(label).then((ok) => {
        if (ok) update({ shown: true, picked: label, wall: null });
      });
    },
    toggleTick(label) {
      if (kind !== "ticks" || card.shown) return;
      const ticks = card.ticks.includes(label) ? card.ticks.filter((l) => l !== label) : [...card.ticks, label].sort();
      update({ ticks });
    },
    check() {
      if (kind !== "ticks" || card.shown || card.ticks.length === 0) return;
      // Like the card's Check answer: a reveal with no pick, so nothing reaches the drill.
      void reveal().then((ok) => {
        if (ok) update({ shown: true, wall: null });
      });
    },
    show() {
      if (mode === "teach") {
        update({ shown: !card.shown });
        return;
      }
      if (card.shown) return;
      void reveal().then((ok) => {
        if (ok) update({ shown: true, wall: null });
      });
    },
  };
}
