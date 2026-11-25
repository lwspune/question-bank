"use client";

/**
 * The exam rooms bubble, bottom LEFT (owner, 2026-11-25; V keeps the right).
 * Signed-in visitors only. The button is all every page carries: the window is
 * its own chunk, loaded on the first touch. The unread count and whether the
 * button is hidden come from one GET /api/rooms a visit, shared through
 * lib/rooms/store with the account menu's Exam rooms entry and the Account card.
 *
 * Hidden for focused study (migration 0290): the button stays away until the
 * time on the account passes (it comes back by itself on an open page) or the
 * student turns it back on; the account menu still opens the rooms meanwhile.
 */
import { Suspense, lazy, useEffect, useState } from "react";
import { MessagesSquare } from "lucide-react";
import { toast } from "sonner";
import { usePublicPathname } from "@/lib/nav/usePublicPathname";
import { useCart } from "@/lib/cart/CartProvider";
import { vPlacement } from "@/lib/chat/placement";
import { hasAuthCookie } from "@/lib/viewer/useViewerSession";
import { badgeCacheFresh } from "@/lib/rooms/poll";
import { badgeText } from "@/lib/rooms/list";
import { buttonHidden, hiddenToast, msUntilShown, type HideMode } from "@/lib/rooms/button";
import { fetchRooms, setRoomsButton } from "@/lib/rooms/client";
import { OPEN_ROOMS_EVENT, readRoomsState, saveRoomsState, useRoomsState } from "@/lib/rooms/store";
import { useLauncherTucked } from "@/components/chat/useLauncherTucked";

const loadWindow = () => import("./RoomsWindow");
const RoomsWindow = lazy(loadWindow);

export default function RoomsLauncher() {
  const pathname = usePublicPathname();
  const placement = vPlacement(pathname, useCart());
  const state = useRoomsState();
  const [signedIn, setSignedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [, setTick] = useState(0);
  const [tucked] = useLauncherTucked(open);

  useEffect(() => {
    if (!hasAuthCookie()) return;
    setSignedIn(true);
    const cached = readRoomsState();
    if (!cached || !badgeCacheFresh(cached.at, Date.now())) {
      fetchRooms()
        .then((r) => saveRoomsState({ unread: r.unread, hiddenUntil: r.hiddenUntil }))
        .catch(() => {
          // The badge is a hint; the window shows the real list.
        });
    }
    function onOpen() {
      void loadWindow();
      setOpen(true);
    }
    window.addEventListener(OPEN_ROOMS_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_ROOMS_EVENT, onOpen);
  }, []);

  // A 2-hour hide ends by itself on an open page.
  const hiddenUntil = state?.hiddenUntil ?? null;
  useEffect(() => {
    const ms = msUntilShown(hiddenUntil, Date.now());
    if (ms === null) return;
    const t = setTimeout(() => setTick((n) => n + 1), Math.min(ms + 500, 2 ** 31 - 1));
    return () => clearTimeout(t);
  }, [hiddenUntil]);

  async function hide(mode: Exclude<HideMode, "show">) {
    try {
      const r = await setRoomsButton(mode);
      saveRoomsState({ hiddenUntil: r.hiddenUntil });
      setOpen(false);
      toast(hiddenToast(r.hiddenUntil ?? ""), {
        action: {
          label: "Undo",
          onClick: () => {
            setRoomsButton("show")
              .then((u) => saveRoomsState({ hiddenUntil: u.hiddenUntil }))
              .catch(() => toast.error("Could not show it again. Use the account menu."));
          },
        },
      });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not save.");
    }
  }

  if (!signedIn || placement.hidden) return null;

  const hidden = buttonHidden(hiddenUntil, Date.now());
  const unread = state?.unread ?? 0;
  const badge = badgeText(unread);
  const label = unread > 0 ? `Exam rooms, ${unread} unread` : "Exam rooms";

  if (hidden && !open) return null;

  return (
    <div className="chat-launcher-offset fixed left-4 z-50 print:hidden">
      {open && (
        <Suspense fallback={null}>
          <RoomsWindow onClose={() => setOpen(false)} onUnread={(n) => saveRoomsState({ unread: n })} onHide={hide} />
        </Suspense>
      )}
      {!hidden && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          onPointerEnter={() => void loadWindow()}
          onTouchStart={() => void loadWindow()}
          onFocus={() => void loadWindow()}
          aria-label={label}
          aria-expanded={open}
          title="Exam rooms"
          tabIndex={tucked ? -1 : undefined}
          className={`relative ${open ? "hidden" : "flex"} h-11 w-11 items-center justify-center rounded-full bg-background text-foreground shadow-lg transition-[transform,opacity] duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transition-none sm:h-14 sm:w-14 ${
            tucked ? "pointer-events-none translate-y-[160%] opacity-0" : ""
          }`}
        >
          <MessagesSquare className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
          {badge && (
            <span
              aria-hidden
              className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[11px] font-semibold leading-none text-white ring-2 ring-background"
            >
              {badge}
            </span>
          )}
        </button>
      )}
    </div>
  );
}
