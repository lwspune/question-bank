"use client";

import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { usePublicPathname } from "@/lib/nav/usePublicPathname";
import { useCart } from "@/lib/cart/CartProvider";
import { vPlacement } from "@/lib/chat/placement";
import { vLauncherLabel } from "@/lib/chat/launcher";
import { hasAuthCookie } from "@/lib/viewer/useViewerSession";
import { readStoredChat } from "@/lib/chat/localChat";
import { PENDING_BUILD_KEY } from "@/lib/chat/pendingBuild";
import { ASK_V_EVENT, ASK_V_TEXT_EVENT } from "@/lib/chat/askVEvent";
import { loadWindowAtOnce, startFromEvent, type VStart } from "@/lib/chat/windowStart";
import { warmVFeatures } from "@/lib/chat/useVExplain";
import VLauncher from "./VLauncher";
import VLoadingFrame from "./VLoadingFrame";
import { useLauncherTucked } from "./useLauncherTucked";

// V's window: its own chunk, fetched on the first touch of the button, not with every page.
const loadWindow = () => import("./ChatWidget");
const ChatWidget = lazy(loadWindow);

const CLOSED_LABEL = vLauncherLabel({ open: false, unread: 0, dayDue: false, giftDue: false });

function pendingBuildWaits(): boolean {
  try {
    return sessionStorage.getItem(PENDING_BUILD_KEY) !== null;
  } catch {
    return false;
  }
}

/**
 * V's button on every page, without V's window (PAGE_WEIGHT_SPEC.md item 2,
 * 2026-11-24). Every page used to send the whole window (29.6 KB compressed,
 * 105.7 KB of code) to every visitor; few open it. This draws the same button
 * (VLauncher) and loads the window (ChatWidget):
 * - on the first touch, hover or focus of the button, so it is on its way while the finger lifts;
 * - on an Ask V event (a question's Ask V, the stuck offer, a Teach me button), handed on to the window;
 * - at once when something waits (lib/chat/windowStart loadWindowAtOnce): a
 *   signed-in visitor, an unread reply, a test half built before sign-in.
 * A tap before the window arrives shows its frame with a loading state.
 * Once mounted, the window draws the button and catches Ask V itself.
 */
export default function ChatLauncher() {
  const [start, setStart] = useState<VStart | null>(null);
  const seqRef = useRef(0);
  // Set by the window once it listens for Ask V itself.
  const readyRef = useRef(false);
  const pathname = usePublicPathname();
  const placement = vPlacement(pathname, useCart());

  function begin(make: (seq: number) => VStart | null) {
    const next = make(++seqRef.current);
    if (next) setStart(next);
  }

  useEffect(() => {
    // V's switchable buttons ("Teach me a chapter") wait for this read: asked with the page,
    // as the window always did, so the first tap shows them (one small request, shared).
    warmVFeatures();
    const storedUnread = readStoredChat()?.unread ?? 0;
    if (loadWindowAtOnce({ authCookie: hasAuthCookie(), storedUnread, pendingBuild: pendingBuildWaits() })) {
      begin((seq) => ({ kind: "quiet", seq }));
    }
    function onAsk(e: Event) {
      if (readyRef.current) return;
      begin((seq) => startFromEvent(e.type, (e as CustomEvent<unknown>).detail, seq));
    }
    window.addEventListener(ASK_V_EVENT, onAsk);
    window.addEventListener(ASK_V_TEXT_EVENT, onAsk);
    return () => {
      window.removeEventListener(ASK_V_EVENT, onAsk);
      window.removeEventListener(ASK_V_TEXT_EVENT, onAsk);
    };
  }, []);

  function warm() {
    void loadWindow();
    warmVFeatures();
  }

  // Before the window: today's closed button, or the window's frame once V was asked to open.
  const waiting = start !== null && start.kind !== "quiet";
  const [tucked] = useLauncherTucked(waiting);
  const fallback =
    placement.hidden ? null : (
      <VLauncher
        open={waiting}
        label={CLOSED_LABEL}
        tucked={tucked}
        badge={null}
        aboveCart={placement.aboveCart}
        onClick={() => begin((seq) => ({ kind: "open", seq }))}
        onWarm={warm}
      >
        {waiting && <VLoadingFrame onClose={() => begin((seq) => ({ kind: "quiet", seq }))} />}
      </VLauncher>
    );

  if (start === null) return fallback;
  return (
    <Suspense fallback={fallback}>
      <ChatWidget
        start={start}
        onReady={() => {
          readyRef.current = true;
        }}
      />
    </Suspense>
  );
}
