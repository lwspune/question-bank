"use client";

import { useEffect, useRef, useState } from "react";
import { Presentation } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useIsStaff } from "@/lib/viewer/useViewerSession";
import { cn } from "@/lib/utils";
import type { PresentableQuestion } from "@/lib/present/viewModel";
import { usePresentRegistry } from "./PresentRegistry";
import PresentSurface from "./PresentSurface";

/**
 * "Project" — opens one question full-screen on a classroom board, with the
 * space below it left blank to work the solution out on.
 *
 * TEACHER-ONLY, and that is a PRODUCT decision rather than a security one. The
 * question it projects is already on the page in front of whoever clicked; the
 * overlay reveals nothing new. It is scoped to org staff because it is a
 * teaching instrument — the same reasoning that puts the Word paper and the
 * .pptx deck behind `resolveExportAccess`. Nothing here is load-bearing for
 * confidentiality, so resolving staff in the browser is sufficient.
 *
 * Resolving it in the browser is also the only option available. Three of the
 * four surfaces that mount this button (`/board`, `/notes`, and the 317
 * `/questions` landing pages) are ISR-cached and read no identity during server
 * render — a server-side gate here would silently de-cache them, which is a
 * regression this project has already paid for once. `useIsStaff` shares
 * AppHeader's single `/api/me/header` request, so the button costs no extra
 * round trip and anonymous visitors issue none at all.
 *
 * Renders NOTHING until identity resolves, so a student never sees a control
 * flash and vanish.
 */
export default function PresentButton({
  question,
  /** Page position, used only to order the ← / → walk-through. */
  order = 0,
  supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  className,
}: {
  question: PresentableQuestion;
  order?: number;
  supabaseUrl?: string;
  className?: string;
}) {
  const { isStaff } = useIsStaff();
  const registry = usePresentRegistry();
  const [open, setOpen] = useState(false);
  // Which question is on screen. Starts at the one clicked and moves with the
  // arrows, so a teacher can walk a list without closing and re-opening.
  const [current, setCurrent] = useState<PresentableQuestion>(question);
  const [siblings, setSiblings] = useState<PresentableQuestion[] | undefined>(undefined);

  // Registration is unconditional — it runs before the staff check below, so the
  // walk-through list is complete regardless of the order identity resolves in.
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

  if (!isStaff) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) {
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
        aria-label="Project this question on the board"
        title="Project on board"
        className={cn(
          "inline-flex shrink-0 items-center gap-1.5 rounded-md border px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className
        )}
      >
        <Presentation className="h-3.5 w-3.5" aria-hidden />
        Project
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
        />
      </DialogContent>
    </Dialog>
  );
}
