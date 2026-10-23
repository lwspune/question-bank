/**
 * Transport for V's AI answers. Raw fetch, no SDK: one endpoint and one small
 * tool loop don't justify @anthropic-ai/sdk under CLAUDE.md's dependency rule
 * ("prefer native APIs; every new dependency must be justified by a clear
 * capability gap"). Mirrors src/lib/email/resend.ts: key read from process.env
 * at CALL time (never module scope), never throws, returns a result type.
 *
 * NOT marked "server-only" for the same reason as resend.ts: belongs to route
 * handlers only, by convention, not by import restriction.
 *
 * 2026-10-15: Haiku 5.5 at low effort (chat does well at low; $0.10/$0.50 per
 * million tokens), plus V's tools, run here for at most MAX_TOOL_ROUNDS.
 *
 * 2026-10-16 prompt caching: the tools and the fixed instructions (`system`)
 * are marked for Anthropic's 5-minute cache, so a re-read costs a tenth of the
 * price (a first read in a quiet spell costs a quarter extra). The second call
 * of a chapter search always hits it, and students' follow-ups come in bursts.
 * Anything that changes per question goes in `systemTail`, AFTER the mark,
 * or it would make every request a miss.
 *
 * 2026-10-23 the 1-hour cache: the 5-minute one was written afresh for 58 of
 * 127 answers in a day, 39 of them 5-60 minutes after the previous answer. An
 * hour-long write costs 2x the input price instead of 1.25x, but those 39 turn
 * into reads at a tenth. 1-hour writes are counted apart (`cacheWrite1hTokens`,
 * migration 0180) because they are priced apart.
 * Spec: tests/chat-ask-v.test.ts.
 */
const ENDPOINT = "https://api.anthropic.com/v1/messages";
export const V_MODEL = "claude-haiku-5-5";
// Room for the reply plus Haiku 5.5's adaptive thinking, which counts against it.
const MAX_TOKENS = 2000;
const MAX_TOOL_ROUNDS = 3;

export function chatEnv(): { apiKey: string } {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY is not set");
  return { apiKey };
}

export type VTool = {
  name: string;
  description: string;
  input_schema: Record<string, unknown>;
  /** Returns the text the model reads back. */
  run: (input: unknown) => Promise<string>;
  /** Keep the start of what it returned with the reply (migration 0167). Off for a student's own results. */
  logResult?: boolean;
};

/** One tool call, kept with the reply (migration 0167) so a "not found" can be explained. */
export type ToolCallLog = { name: string; input: unknown; result?: string };

/** The start of a tool's result that is kept: a search's first lines say what it found. */
const LOGGED_RESULT_CHARS = 300;

export type AskVResult =
  | {
      ok: true;
      reply: string;
      /** Input at full price (not read from or written to the cache). */
      tokensIn: number;
      tokensOut: number;
      /** Input read from the cache (a tenth of the price) and written to it (a quarter extra). */
      cacheReadTokens: number;
      cacheWriteTokens: number;
      /** The part of `cacheWriteTokens` written for an hour: twice the input price. */
      cacheWrite1hTokens: number;
      toolCalls: ToolCallLog[];
    }
  /** Failed after `tokensIn`... were already spent (and billed) on earlier rounds: 0 when nothing came back. */
  | {
      ok: false;
      error: string;
      tokensIn: number;
      tokensOut: number;
      cacheReadTokens: number;
      cacheWriteTokens: number;
      cacheWrite1hTokens: number;
      toolCalls: ToolCallLog[];
    };

type ContentBlock =
  | { type: "text"; text?: string }
  | { type: "tool_use"; id: string; name: string; input: unknown }
  | { type: string; [k: string]: unknown };

type ApiResponse = {
  stop_reason?: string;
  content?: ContentBlock[];
  usage?: {
    input_tokens?: number;
    output_tokens?: number;
    cache_read_input_tokens?: number;
    cache_creation_input_tokens?: number;
    cache_creation?: { ephemeral_5m_input_tokens?: number; ephemeral_1h_input_tokens?: number };
  };
};

type Message = { role: "user" | "assistant"; content: unknown };

/**
 * One answer. The system prompt carries every fact;  carries the
 * conversation so far (read from the database by the route, never the device).
 * The model may call a tool; its result goes back and the model answers.
 */
export async function askV(input: {
  /** The fixed instructions, the same for every question: cached. */
  system: string;
  /** What changes per question (the page, signed out or not): sent after the cache mark. */
  systemTail?: string;
  message: string;
  tools: readonly VTool[];
  /** Earlier exchanges of this conversation, oldest first (lib/chat/conversation modelHistory). */
  history?: readonly { role: "user" | "assistant"; content: string }[];
}): Promise<AskVResult> {
  let tokensIn = 0;
  let tokensOut = 0;
  let cacheReadTokens = 0;
  let cacheWriteTokens = 0;
  let cacheWrite1hTokens = 0;
  const toolCalls: ToolCallLog[] = [];
  // Every failure carries what was already spent: a failed second round still billed the first.
  const fail = (error: string): AskVResult => ({
    ok: false,
    error,
    tokensIn,
    tokensOut,
    cacheReadTokens,
    cacheWriteTokens,
    cacheWrite1hTokens,
    toolCalls,
  });

  let apiKey: string;
  try {
    ({ apiKey } = chatEnv());
  } catch (e) {
    return fail((e as Error).message);
  }

  const toolDefs = input.tools.map(({ name, description, input_schema }) => ({ name, description, input_schema }));
  const messages: Message[] = [...(input.history ?? []), { role: "user", content: input.message }];
  const system = [
    { type: "text", text: input.system, cache_control: { type: "ephemeral", ttl: "1h" } },
    ...(input.systemTail ? [{ type: "text", text: input.systemTail }] : []),
  ];

  try {
    for (let round = 0; round <= MAX_TOOL_ROUNDS; round++) {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: V_MODEL,
          max_tokens: MAX_TOKENS,
          output_config: { effort: "low" },
          system,
          tools: toolDefs,
          messages,
        }),
      });

      if (!res.ok) {
        const body = await res.text().catch(() => "");
        return fail(`Anthropic API ${res.status}: ${body.slice(0, 300)}`);
      }

      const data = (await res.json()) as ApiResponse;
      tokensIn += data.usage?.input_tokens ?? 0;
      tokensOut += data.usage?.output_tokens ?? 0;
      cacheReadTokens += data.usage?.cache_read_input_tokens ?? 0;
      cacheWriteTokens += data.usage?.cache_creation_input_tokens ?? 0;
      cacheWrite1hTokens += data.usage?.cache_creation?.ephemeral_1h_input_tokens ?? 0;
      const content = data.content ?? [];

      if (data.stop_reason === "tool_use") {
        if (round === MAX_TOOL_ROUNDS) break;
        const calls = content.filter(
          (b): b is { type: "tool_use"; id: string; name: string; input: unknown } => b.type === "tool_use"
        );
        const results = await Promise.all(
          calls.map(async (call) => {
            const tool = input.tools.find((t) => t.name === call.name);
            const log: ToolCallLog = { name: call.name, input: call.input };
            toolCalls.push(log);
            if (!tool) return { type: "tool_result", tool_use_id: call.id, content: "Unknown tool", is_error: true };
            try {
              const content = await tool.run(call.input);
              if (tool.logResult) log.result = content.slice(0, LOGGED_RESULT_CHARS);
              return { type: "tool_result", tool_use_id: call.id, content };
            } catch (e) {
              return { type: "tool_result", tool_use_id: call.id, content: (e as Error).message, is_error: true };
            }
          })
        );
        messages.push({ role: "assistant", content }, { role: "user", content: results });
        continue;
      }

      if (data.stop_reason === "refusal") return fail("model refused");

      const reply = content
        .filter((b): b is { type: "text"; text: string } => b.type === "text" && typeof b.text === "string")
        .map((b) => b.text)
        .join("")
        .trim();
      if (!reply) return fail(`no text (stop_reason ${data.stop_reason ?? "none"})`);
      return { ok: true, reply, tokensIn, tokensOut, cacheReadTokens, cacheWriteTokens, cacheWrite1hTokens, toolCalls };
    }
    return fail(`still calling tools after ${MAX_TOOL_ROUNDS} rounds`);
  } catch (e) {
    return fail((e as Error).message);
  }
}
