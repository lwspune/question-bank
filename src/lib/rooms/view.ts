/**
 * A room message as the window gets it. Never the author's user id (members
 * see a name only), and the daily question's answer only after the student
 * answered (lib/rooms/server attaches it). Pure. Spec: tests/rooms-view.test.ts.
 */
import { plainPreview } from "./list";
import { publicImageUrl } from "@/lib/storage/imageUrl";

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
  /** Team posts only (migration 0295). */
  image_path: string | null;
  image_alt: string | null;
};

export type RoomQuestionView = {
  id: string;
  /** "Chemistry · Chemical Kinetics · 2026": where the question comes from (owner, 2026-11-28). */
  label: string | null;
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
  /** A team post's picture (0295). Never on a student, V or system message. */
  image: { url: string; alt: string } | null;
};

const SNIPPET = 60;

/** An embedded `name` from a PostgREST join: one object, or an array for some joins. */
export function embeddedName(v: unknown): string | null {
  const one = Array.isArray(v) ? v[0] : v;
  return one && typeof one === "object" && "name" in one ? String((one as { name: unknown }).name) : null;
}

/** A daily question's subject, chapter and year, joined; whatever is missing is left out. */
export function questionLabel(q: { subject: string | null; chapter: string | null; year: number | null }): string | null {
  const parts = [q.subject, q.chapter, q.year != null ? String(q.year) : null].filter((p): p is string => !!p && p.trim() !== "");
  return parts.length ? parts.join(" · ") : null;
}

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
    /** For a picture's public address. */
    supabaseUrl?: string;
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
    image:
      row.author_kind === "team" && row.image_path && row.image_alt
        ? { url: publicImageUrl(ctx.supabaseUrl ?? "", row.image_path), alt: row.image_alt }
        : null,
  };
}
