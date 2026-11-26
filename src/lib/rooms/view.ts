/**
 * A room message as the window gets it. Never the author's user id (members
 * see a name only), and the daily question's answer only after the student
 * answered (lib/rooms/server attaches it). Pure. Spec: tests/rooms-view.test.ts.
 */
import { plainPreview } from "./list";

/** A system line's kind (migration 0291): a first join, or a daily-question answer. */
export type RoomSystemEvent = "joined" | "answered";

export type RoomMessageRow = {
  id: number;
  author_kind: "student" | "team" | "v" | "system";
  user_id: string | null;
  display_name: string;
  body: string;
  reply_to: number | null;
  question_id: string | null;
  pinned: boolean;
  created_at: string;
  system_event: RoomSystemEvent | null;
};

export type RoomQuestionView = {
  id: string;
  text: string;
  context: string | null;
  options: { id: string; label: string; text: string }[];
  /** Present once the viewer answered. */
  answered: { optionId: string; correct: boolean; correctOptionId: string | null; solution: string | null } | null;
};

export type RoomMessageView = {
  id: number;
  kind: "student" | "team" | "v" | "system";
  /** Set on a system line only. */
  event: RoomSystemEvent | null;
  name: string;
  body: string;
  at: string;
  own: boolean;
  pinned: boolean;
  replyTo: { id: number; name: string; snippet: string } | null;
  canAskV: boolean;
  question: RoomQuestionView | null;
};

const SNIPPET = 60;

function snippetOf(body: string): string {
  const flat = plainPreview(body);
  return flat.length > SNIPPET ? `${flat.slice(0, SNIPPET).trimEnd()}…` : flat;
}

export function toMessageView(
  row: RoomMessageRow,
  ctx: {
    viewerId: string;
    /** Message ids V has already answered. */
    repliedByV: ReadonlySet<number>;
    /** Messages a reply may quote, by id. */
    byId: ReadonlyMap<number, Pick<RoomMessageRow, "id" | "display_name" | "body">>;
    question?: RoomQuestionView | null;
  }
): RoomMessageView {
  const parent = row.reply_to != null ? ctx.byId.get(row.reply_to) : undefined;
  return {
    id: row.id,
    kind: row.author_kind,
    event: row.author_kind === "system" ? row.system_event : null,
    name: row.display_name,
    body: row.body,
    at: row.created_at,
    own: (row.author_kind === "student" || row.author_kind === "system") && row.user_id === ctx.viewerId,
    pinned: row.pinned,
    replyTo: parent ? { id: parent.id, name: parent.display_name, snippet: snippetOf(parent.body) } : null,
    canAskV: row.author_kind === "student" && !ctx.repliedByV.has(row.id),
    question: ctx.question ?? null,
  };
}
