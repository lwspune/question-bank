"use client";

/**
 * "Exam rooms" in the account menu (owner, 2026-11-25; mockup H3): the way in
 * that stays when the rooms button is hidden for focused study. Shows the
 * unread count, and while hidden, when the button comes back plus "Show button
 * now". Reads the shared rooms state (lib/rooms/store): no request of its own.
 */
import * as Popover from "@radix-ui/react-popover";
import { MessagesSquare } from "lucide-react";
import { toast } from "sonner";
import { buttonHidden, hiddenLabel } from "@/lib/rooms/button";
import { setRoomsButton } from "@/lib/rooms/client";
import { openRoomsWindow, saveRoomsState, useRoomsState } from "@/lib/rooms/store";

export default function ExamRoomsMenuItem({ className }: { className: string }) {
  const state = useRoomsState();
  const unread = state?.unread ?? 0;
  const hidden = state ? buttonHidden(state.hiddenUntil, Date.now()) : false;

  // Shows at once, saves in the background; a failed save hides it again.
  async function showNow() {
    const before = state?.hiddenUntil ?? null;
    saveRoomsState({ hiddenUntil: null });
    toast.success("Rooms button is back.");
    try {
      const r = await setRoomsButton("show");
      saveRoomsState({ hiddenUntil: r.hiddenUntil });
    } catch (e) {
      saveRoomsState({ hiddenUntil: before });
      toast.error(e instanceof Error ? `Could not show the button: ${e.message}` : "Could not show the button.");
    }
  }

  return (
    <div>
      <Popover.Close asChild>
        <button type="button" onClick={openRoomsWindow} className={className}>
          <MessagesSquare className="h-4 w-4" aria-hidden />
          Exam rooms
          {unread > 0 && (
            <span className="ml-auto rounded-full bg-red-600 px-2 py-0.5 text-xs font-semibold tabular-nums text-white">
              <span className="sr-only">Unread: </span>
              {unread > 9 ? "9+" : unread}
            </span>
          )}
        </button>
      </Popover.Close>
      {hidden && state?.hiddenUntil && (
        <div className="flex items-center justify-between gap-2 pb-2 pl-9 pr-3 text-xs">
          <span className="text-muted-foreground">{hiddenLabel(state.hiddenUntil)}</span>
          <button
            type="button"
            onClick={showNow}
            className="rounded-sm font-semibold text-brand-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Show button now
          </button>
        </div>
      )}
    </div>
  );
}
