/**
 * The badge and the screen-reader label on V's button. Unread replies keep
 * their own brand-coloured count, as before; otherwise a red count of what is
 * waiting inside V: the "Your day" card (2026-11-15) and a gift (2026-11-21).
 * Pure. Spec: tests/chat-gift.test.ts.
 */
export type LauncherState = { open: boolean; unread: number; dayDue: boolean; giftDue: boolean };

export type LauncherBadge = { tone: "reply" | "new"; count: number };

export function vLauncherBadge(s: LauncherState): LauncherBadge | null {
  if (s.open) return null;
  if (s.unread > 0) return { tone: "reply", count: s.unread };
  const count = (s.dayDue ? 1 : 0) + (s.giftDue ? 1 : 0);
  return count > 0 ? { tone: "new", count } : null;
}

export function vLauncherLabel(s: LauncherState): string {
  if (s.open) return "Close chat with V";
  if (s.unread > 0) return `Chat with V, ${s.unread} new ${s.unread === 1 ? "reply" : "replies"}`;
  if (s.giftDue) return "Chat with V, V has a gift for you";
  if (s.dayDue) return "Chat with V, your day is ready";
  return "Chat with V";
}
