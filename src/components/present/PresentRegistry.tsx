"use client";

import { createContext, useContext, useMemo, useRef } from "react";
import type { PresentableQuestion } from "@/lib/present/viewModel";

/**
 * Lets the projection overlay step ← / → through the questions on the page
 * WITHOUT any surface having to hand every card a copy of the whole list.
 *
 * That copy is the thing being avoided, and it is not a micro-optimisation: on
 * /browse the list is server-rendered, so passing 25 cards a 25-question array
 * would serialise every stem, option and solution 25 times into the RSC
 * payload. The questions are already on the client — one copy each, inside the
 * card that renders them — so each card simply registers what it already holds
 * and the overlay reads the collected set when it opens.
 *
 * The registry lives in a ref rather than state on purpose: nothing renders
 * from it. It is read once, at the moment a teacher opens the overlay, so
 * registration must not cost a re-render of a 25-card list.
 *
 * Optional everywhere. A surface with no provider (a lone worked example in a
 * guide) simply gets an overlay with no arrows.
 */

type Entry = { order: number; question: PresentableQuestion };

type Registry = {
  /** Register a projectable question; returns its unregister function. */
  register: (key: string, order: number, question: PresentableQuestion) => () => void;
  /** The registered questions, in the order the page lays them out. */
  snapshot: () => PresentableQuestion[];
};

const PresentRegistryContext = createContext<Registry | null>(null);

export function PresentRegistry({ children }: { children: React.ReactNode }) {
  const entries = useRef(new Map<string, Entry>());

  const value = useMemo<Registry>(
    () => ({
      register(key, order, question) {
        entries.current.set(key, { order, question });
        return () => {
          entries.current.delete(key);
        };
      },
      snapshot() {
        return [...entries.current.values()]
          .sort((a, b) => a.order - b.order)
          .map((e) => e.question);
      },
    }),
    []
  );

  return (
    <PresentRegistryContext.Provider value={value}>{children}</PresentRegistryContext.Provider>
  );
}

export function usePresentRegistry(): Registry | null {
  return useContext(PresentRegistryContext);
}
