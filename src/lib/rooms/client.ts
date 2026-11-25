/**
 * Browser calls to /api/rooms/* (migration 0289). Each returns the JSON body or
 * throws an Error carrying the route's plain line, so the window can toast it.
 */
import type { RoomListItem } from "./list";
import type { RoomMessageView, RoomQuestionView } from "./view";
import type { RoomReportReason } from "./validate";

export type RoomSummaryView = RoomListItem & { last: { name: string; body: string; at: string } | null };
export type RoomsListResponse = { joined: RoomSummaryView[]; others: RoomListItem[]; unread: number; hiddenUntil: string | null };
export type RoomPage = { messages: RoomMessageView[]; pinned: RoomMessageView | null; hasMore: boolean; nickname: string };

async function call<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: init?.body ? { "Content-Type": "application/json" } : undefined,
    cache: "no-store",
  });
  const json = (await res.json().catch(() => ({}))) as { error?: string } & T;
  if (!res.ok) throw new Error(json.error ?? "Something went wrong. Please try again.");
  return json;
}

const base = (slug: string) => `/api/rooms/${encodeURIComponent(slug)}`;

export const fetchRooms = () => call<RoomsListResponse>("/api/rooms");

export const joinRoom = (slug: string, nickname: string) =>
  call<{ ok: true }>(`${base(slug)}/membership`, { method: "POST", body: JSON.stringify({ action: "join", nickname }) });

export const renameInRoom = (slug: string, nickname: string) =>
  call<{ ok: true; nickname: string }>(`${base(slug)}/membership`, { method: "POST", body: JSON.stringify({ action: "rename", nickname }) });

export const leaveRoom = (slug: string) =>
  call<{ ok: true }>(`${base(slug)}/membership`, { method: "POST", body: JSON.stringify({ action: "leave" }) });

// keepalive: the button hides at once (RoomsLauncher), so the student may close
// the tab before this save lands; keepalive lets the request finish anyway.
export const setRoomsButton = (mode: "show" | "2h" | "off") =>
  call<{ ok: true; hiddenUntil: string | null }>("/api/rooms/button", {
    method: "POST",
    body: JSON.stringify({ mode }),
    keepalive: true,
  });

export const fetchPage = (slug: string, cursor: { after?: number; before?: number } = {}) => {
  const qs = cursor.after ? `?after=${cursor.after}` : cursor.before ? `?before=${cursor.before}` : "";
  return call<RoomPage>(`${base(slug)}/messages${qs}`);
};

export const sendMessage = (slug: string, body: string, replyTo: number | null) =>
  call<{ message: RoomMessageView }>(`${base(slug)}/messages`, { method: "POST", body: JSON.stringify({ body, replyTo }) });

export const reportMessage = (slug: string, messageId: number, reason: RoomReportReason) =>
  call<{ ok: true }>(`${base(slug)}/report`, { method: "POST", body: JSON.stringify({ messageId, reason }) });

export const answerQuestion = (slug: string, messageId: number, optionId: string) =>
  call<{ question: RoomQuestionView }>(`${base(slug)}/answer`, { method: "POST", body: JSON.stringify({ messageId, optionId }) });

export const askVInRoom = (slug: string, messageId: number) =>
  call<{ message?: RoomMessageView; skipped?: boolean; error?: string }>(`${base(slug)}/ask-v`, {
    method: "POST",
    body: JSON.stringify({ messageId }),
  });
