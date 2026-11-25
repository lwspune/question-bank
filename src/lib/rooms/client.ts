/**
 * Browser calls to /api/rooms/* (migration 0289). Each returns the JSON body or
 * throws an Error carrying the route's plain line, so the window can toast it.
 */
import type { RoomListItem } from "./list";
import type { RoomMessageView, RoomQuestionView } from "./view";
import type { RoomReportReason } from "./validate";

export type RoomSummaryView = RoomListItem & { last: { name: string; body: string; at: string } | null };
export type RoomsListResponse = { joined: RoomSummaryView[]; others: RoomListItem[]; unread: number };
export type RoomPage = { messages: RoomMessageView[]; pinned: RoomMessageView | null; hasMore: boolean };

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

export const setMembership = (slug: string, action: "join" | "leave") =>
  call<{ ok: true }>(`${base(slug)}/membership`, { method: "POST", body: JSON.stringify({ action }) });

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
