"use client";

import { useEffect, useRef, useState } from "react";
import { Presentation } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useIsStaff } from "@/lib/viewer/useViewerSession";
import { cn } from "@/lib/utils";
import { trackFunnel } from "@/lib/analytics/trackFunnel";
import { deckMode, deckRole, type DeckSurface } from "@/lib/present/deck";
import type { PresentableQuestion } from "@/lib/present/viewModel";
import { usePresentRegistry } from "./PresentRegistry";
import PresentSurface from "./PresentSurface";

/**
 * The board icon on a question card. Staff get the classroom projector: one
 * question full-screen, the space below left blank to work the solution out
 * on. Everyone else gets the same screen as a deck of flashcards
 * (2026-11-09, the owner's call): one question a screen, ← / → through the
 * page's questions, each answered by the card's own rules (lib/present/deck).
 *
 * Icon only, by the owner's choice; the label is for screen readers.
 *
 * Who is staff is resolved in the browser, which is the only option: three of
 * the four surfaces that mount this button (`/board`, `/notes`, and the 317
 * `/questions` landing pages) are ISR-cached and read no identity during
 * server render, so a server-side check would de-cache them. Nothing here is
 * load-bearing for confidentiality either way: a student's answers go through
 * the same counter as the card's, and a teacher's question is already on the
 * page. `useIsStaff` shares AppHeader's single `/api/me/header` request.
 *
 * The button renders for everyone from the first paint, so the cached HTML
 * and the hydrated page agree.
 */
export default function PresentButton({
  question,
  /** Page position, used only to order the ← / → walk-through. */
  order = 0,
  supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  className,
  surface,
}: {
  question: PresentableQuestion;
  order?: number;
  supabaseUrl?: string;
  className?: string;
  /**
   * The page this card is on, which decides the counter a student's answer
   * spends. Required with no default on purpose: a default is how /board's
   * reveals were once recorded as the bank's (see useRevealMeter).
   */
  surface: DeckSurface;
}) {
  const { isStaff } = useIsStaff();
  const mode = deckMode({ isStaff, surface });
  const registry = usePresentRegistry();
  const [open, setOpen] = useState(false);
  // Which question is on screen. Starts at the one clicked and moves with the
  // arrows, so a teacher can walk a list without closing and re-opening.
  const [current, setCurrent] = useState<PresentableQuestion>(question);
  const [siblings, setSiblings] = useState<PresentableQuestion[] | undefined>(undefined);

  // Registration is unconditional, for every viewer, so the walk-through list
  // is complete whoever opens it.
  //
  // Keyed on the question's IDENTITY (its key), not on the object: several
  // callers build the view-model inline during render, so an object-keyed effect
  // would unregister and re-register on every parent re-render — and /board
  // re-renders its whole chapter on each answer reveal. The ref keeps the value
  // current without making it a dependency.
  const latest = useRef(question);
  latest.current = question;
  useEffect(() => {
    if (!registry) return;
    return registry.register(latest.current.key, order, latest.current);
  }, [registry, question.key, order]);

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) {
          trackFunnel("flashcards_open", { surface, role: deckRole(mode) });
          // Re-opening always starts from the card that was clicked, not
          // wherever the last walk-through happened to end. The sibling list is
          // snapshotted here rather than subscribed to: the page behind the
          // overlay cannot change while it is open.
          setCurrent(question);
          setSiblings(registry?.snapshot());
        }
      }}
    >
      {/* DialogTrigger, not a bare onClick: this Dialog is CONTROLLED, and a
          handler that calls setOpen(true) itself never routes through
          onOpenChange — so the sibling snapshot below would never be taken and
          the walk-through arrows would never appear. */}
      <DialogTrigger
        aria-label={mode === "teach" ? "Project this question on the board" : "Practise these questions as flashcards"}
        title={mode === "teach" ? "Project on board" : "Flashcards"}
        className={cn(
          // Borderless round icon, 36 px (2026-11-10): three bordered squares in
          // a question card's tag row crowded it on a phone.
          "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className
        )}
      >
        <Presentation className="h-4 w-4" aria-hidden />
      </DialogTrigger>

      <DialogContent
        hideCloseButton
        // Override the centred, max-w-lg default: this fills the panel.
        className="left-0 top-0 h-[100dvh] w-screen max-w-none translate-x-0 translate-y-0 gap-0 rounded-none border-0 p-0 sm:rounded-none"
      >
        <PresentSurface
          question={current}
          siblings={siblings}
          supabaseUrl={supabaseUrl}
          onNavigate={setCurrent}
          mode={mode}
          surface={surface}
        />
      </DialogContent>
    </Dialog>
  );
}
