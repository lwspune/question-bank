/**
 * Transport for the "V" FAQ chatbot. Raw fetch, no SDK — one REST endpoint
 * doesn't justify @anthropic-ai/sdk under CLAUDE.md's dependency rule ("prefer
 * native APIs; every new dependency must be justified by a clear capability
 * gap"). Mirrors src/lib/email/resend.ts: key read from process.env at CALL
 * time (never module scope), never throws, returns a result type instead.
 *
 * NOT marked "server-only" for the same reason as resend.ts — belongs to
 * route handlers only, by convention, not by import restriction.
 */
const ENDPOINT = "https://api.anthropic.com/v1/messages";
const MODEL = "claude-haiku-4-5";
const MAX_TOKENS = 400;

export function chatEnv(): { apiKey: string } {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY is not set");
  return { apiKey };
}

export type AskVResult = { ok: true; reply: string } | { ok: false; error: string };

/** One turn: a fixed system prompt (the assembled facts) + the user's message.
 *  No history — V is stateless by design (see the chatbot plan). */
export async function askV(systemPrompt: string, userMessage: string): Promise<AskVResult> {
  let apiKey: string;
  try {
    ({ apiKey } = chatEnv());
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        system: systemPrompt,
        messages: [{ role: "user", content: userMessage }],
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      return { ok: false, error: `Anthropic API ${res.status}: ${body.slice(0, 300)}` };
    }

    const data = (await res.json()) as {
      content?: { type: string; text?: string }[];
    };
    const reply = data.content
      ?.filter((block) => block.type === "text" && block.text)
      .map((block) => block.text)
      .join("")
      .trim();

    if (!reply) return { ok: false, error: "Anthropic API returned no text content" };
    return { ok: true, reply };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}
