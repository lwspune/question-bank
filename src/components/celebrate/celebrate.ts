"use client";

import { toast } from "sonner";

/**
 * Show one celebration (2026-10-04): a run, a milestone, beating the crowd.
 *
 * V SAYS IT (the user's call, same day). The message goes to V's speech bubble
 * above V's launcher (components/chat/VSays.tsx), not the top-of-screen toast,
 * so praise does not share a channel with "Added to paper", "Signed out" and
 * error messages — praise read as a system notice gets ignored. Errors and
 * system notices stay on the toast.
 *
 * WHERE V CANNOT SPEAK the toast is the fallback: V is not mounted on the
 * drill or the mock runner (lib/chat/placement), and steps aside while its chat
 * panel is open. The drill never calls this — V speaks inside its answer panel.
 *
 * A short WAIT before falling back: a page's own effects run before the root
 * layout's V has mounted (the mock result page's milestone fires on mount), so
 * a message that arrives first is held briefly for V to register.
 *
 * One at a time: V's bubble shows the latest message, and the fallback toast
 * shares one id, so nothing stacks. Sonner handles reduced motion and the live
 * region for the fallback; VSays does both for the bubble.
 */
export type VFace = "laugh" | "talk";
export type VMessage = { text: string; face: VFace };

const CELEBRATION_ID = "celebration";
const WAIT_FOR_V_MS = 800;

type Listener = (message: VMessage) => void;
let listener: Listener | null = null;
let pending: { message: VMessage; timer: ReturnType<typeof setTimeout> } | null = null;

/** V's bubble registers while it can speak; the return value unregisters. */
export function registerVSays(fn: Listener): () => void {
  listener = fn;
  if (pending) {
    clearTimeout(pending.timer);
    const { message } = pending;
    pending = null;
    fn(message);
  }
  return () => {
    if (listener === fn) listener = null;
  };
}

export function celebrate(text: string, face: VFace = "laugh"): void {
  const message = { text, face };
  if (listener) {
    listener(message);
    return;
  }
  if (pending) clearTimeout(pending.timer);
  pending = {
    message,
    timer: setTimeout(() => {
      pending = null;
      if (listener) listener(message);
      else toast.success(text, { id: CELEBRATION_ID, duration: 3000 });
    }, WAIT_FOR_V_MS),
  };
}

/** Gap between celebrations that land together, so each gets its own turn. */
const SEQUENCE_GAP_MS = 3200;

/** Several celebrations from one answer, shown one after another, in order. */
export function celebrateInTurn(messages: readonly VMessage[]): void {
  messages.forEach((m, i) => {
    if (i === 0) celebrate(m.text, m.face);
    else setTimeout(() => celebrate(m.text, m.face), i * SEQUENCE_GAP_MS);
  });
}
