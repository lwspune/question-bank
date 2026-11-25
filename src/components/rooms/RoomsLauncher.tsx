"use client";

/**
 * The exam rooms bubble, bottom LEFT (owner, 2026-11-25; V keeps the right).
 * Signed-in visitors only. The button is all every page carries: the window is
 * its own chunk, loaded on the first touch. The unread count is asked once a
 * visit and reused for 10 minutes (lib/rooms/poll), so the badge does not add
 * a request to every page view.
 */
import { Suspense, lazy, useEffect, useState } from "react";
import { MessagesSquare } from "lucide-react";
import { usePublicPathname } from "@/lib/nav/usePublicPathname";
import { useCart } from "@/lib/cart/CartProvider";
import { vPlacement } from "@/lib/chat/placement";
import { hasAuthCookie } from "@/lib/viewer/useViewerSession";
import { badgeCacheFresh } from "@/lib/rooms/poll";
import { badgeText } from "@/lib/rooms/list";
import { fetchRooms } from "@/lib/rooms/client";
import { useLauncherTucked } from "@/components/chat/useLauncherTucked";

const loadWindow = () => import("./RoomsWindow");
const RoomsWindow = lazy(loadWindow);

const BADGE_KEY = "qb_rooms_badge";

function readBadge(): number | null {
  try {
    const raw = sessionStorage.getItem(BADGE_KEY);
    if (!raw) return null;
    const { at, n } = JSON.parse(raw) as { at: number; n: number };
    return badgeCacheFresh(at, Date.now()) ? n : null;
  } catch {
    return null;
  }
}

function saveBadge(n: number) {
  try {
    sessionStorage.setItem(BADGE_KEY, JSON.stringify({ at: Date.now(), n }));
  } catch {
    // Private mode: the badge is asked again next page, nothing else breaks.
  }
}

export default function RoomsLauncher() {
  const pathname = usePublicPathname();
  const placement = vPlacement(pathname, useCart());
  const [signedIn, setSignedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(0);
  const [tucked] = useLauncherTucked(open);

  useEffect(() => {
    if (!hasAuthCookie()) return;
    setSignedIn(true);
    const cached = readBadge();
    if (cached !== null) {
      setUnread(cached);
      return;
    }
    fetchRooms()
      .then((r) => {
        setUnread(r.unread);
        saveBadge(r.unread);
      })
      .catch(() => {
        // The badge is a hint; the window shows the real list.
      });
  }, []);

  if (!signedIn || placement.hidden) return null;

  const badge = badgeText(unread);
  const label = unread > 0 ? `Exam rooms, ${unread} unread` : "Exam rooms";

  return (
    <div className="chat-launcher-offset fixed left-4 z-50 print:hidden">
      {open && (
        <Suspense fallback={null}>
          <RoomsWindow
            onClose={() => setOpen(false)}
            onUnread={(n) => {
              setUnread(n);
              saveBadge(n);
            }}
          />
        </Suspense>
      )}
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
    </div>
  );
}
