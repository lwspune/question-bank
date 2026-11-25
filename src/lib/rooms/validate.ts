/**
 * Request bodies for /api/rooms/* (zod). Text rules live in lib/rooms/text;
 * here only the shape. Spec: tests/rooms-view.test.ts.
 */
import { z } from "zod";

export type Parsed<T> = { ok: true; value: T } | { ok: false; error: string };

const id = z.number().int().positive();

const Post = z.object({ body: z.string().max(4000), replyTo: id.nullable().optional() });
const Report = z.object({ messageId: id, reason: z.enum(["spam", "abuse", "personal", "off_topic", "other"]) });
const Answer = z.object({ messageId: id, optionId: z.uuid() });
const AskV = z.object({ messageId: id });

function parse<T>(schema: z.ZodType<T>, raw: unknown): Parsed<T> {
  const r = schema.safeParse(raw);
  return r.success ? { ok: true, value: r.data } : { ok: false, error: "Invalid request." };
}

export function parseRoomPost(raw: unknown): Parsed<{ body: string; replyTo: number | null }> {
  const r = parse(Post, raw);
  return r.ok ? { ok: true, value: { body: r.value.body, replyTo: r.value.replyTo ?? null } } : r;
}

export const parseRoomReport = (raw: unknown) => parse(Report, raw);
export const parseRoomAnswer = (raw: unknown) => parse(Answer, raw);
export const parseRoomAskV = (raw: unknown) => parse(AskV, raw);

export type RoomReportReason = z.infer<typeof Report>["reason"];
