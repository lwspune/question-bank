/**
 * One AI answer from V: build its context, send the message with V's memory
 * and, when the student pressed Reply, the exchange they replied to, then keep
 * only the links V was given. The reply comes back with its links made plain.
 *
 * Shared by POST /api/chat/typed and V's test runner (scripts/chat/eval/run.ts,
 * V_SPEC.md, 2026-10-22), so a test replays the same path a student's
 * question takes. Each caller passes its own data sources: the route the
 * student's login, the runner stand-ins that write nothing.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { loadVContext } from "./context";
import { askV, type AskVResult } from "./anthropic";
import { allowedReplyLinks, plainLinks } from "./replyLinks";
import type { ModelTurn } from "./conversation";

export type VContextOptions = NonNullable<Parameters<typeof loadVContext>[1]>;

export async function answerWithV(input: {
  anon: SupabaseClient;
  context: VContextOptions;
  /** The message as stored (masked); what V is told about a Reply goes in `replyTo`. */
  message: string;
  /** replyContext(target) when the student replied to an earlier exchange, else null. */
  replyTo: string | null;
  history: ModelTurn[];
}): Promise<AskVResult & { links: string[] }> {
  const ctx = await loadVContext(input.anon, input.context);
  const result = await askV({
    system: ctx.system,
    systemTail: ctx.systemTail,
    message: input.replyTo ? `${input.replyTo}\n\n${input.message}` : input.message,
    tools: ctx.tools,
    history: input.history,
  });
  if (!result.ok) return { ...result, links: [] };
  const reply = plainLinks(result.reply);
  return { ...result, reply, links: allowedReplyLinks(reply, ctx.allowedPaths) };
}
