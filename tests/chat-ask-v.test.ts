/**
 * askV (2026-10-15): one AI answer for V, with at most a few rounds of the
 * find_chapters tool. fetch is stubbed; no request leaves the machine.
 */
import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { askV, V_MODEL, type VTool } from "@/lib/chat/anthropic";

type Sent = { model: string; messages: { role: string; content: unknown }[]; tools?: unknown[]; output_config?: unknown };

function reply(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
}

const textTurn = (text: string, usage = { input_tokens: 100, output_tokens: 20 }) => ({
  stop_reason: "end_turn",
  content: [{ type: "text", text }],
  usage,
});

const toolTurn = (id: string, input: unknown) => ({
  stop_reason: "tool_use",
  content: [{ type: "tool_use", id, name: "find_chapters", input }],
  usage: { input_tokens: 80, output_tokens: 10 },
});

const tool: VTool = {
  name: "find_chapters",
  description: "Find chapter pages",
  input_schema: { type: "object", properties: { query: { type: "string" } }, required: ["query"] },
  run: vi.fn(async (input: unknown) => `found for ${JSON.stringify(input)}`),
};

let sent: Sent[] = [];
const ORIGINAL_KEY = process.env.ANTHROPIC_API_KEY;

beforeEach(() => {
  sent = [];
  process.env.ANTHROPIC_API_KEY = "test-key";
  (tool.run as ReturnType<typeof vi.fn>).mockClear();
});

afterEach(() => {
  vi.unstubAllGlobals();
  if (ORIGINAL_KEY === undefined) delete process.env.ANTHROPIC_API_KEY;
  else process.env.ANTHROPIC_API_KEY = ORIGINAL_KEY;
});

function stubTurns(...turns: unknown[]) {
  let i = 0;
  vi.stubGlobal(
    "fetch",
    vi.fn(async (_url: string, init: RequestInit) => {
      sent.push(JSON.parse(String(init.body)) as Sent);
      return reply(turns[Math.min(i++, turns.length - 1)]);
    })
  );
}

describe("askV", () => {
  it("uses the current Haiku at low effort", async () => {
    stubTurns(textTurn("Hi"));
    await askV({ system: "facts", message: "hi", tools: [tool] });
    expect(V_MODEL).toBe("claude-haiku-5-5");
    expect(sent[0].model).toBe("claude-haiku-5-5");
    expect(sent[0].output_config).toEqual({ effort: "low" });
  });

  it("returns the text of a plain answer with its token use", async () => {
    stubTurns(textTurn("Open /pricing.", { input_tokens: 500, output_tokens: 30 }));
    const r = await askV({ system: "facts", message: "price?", tools: [tool] });
    expect(r).toEqual({ ok: true, reply: "Open /pricing.", tokensIn: 500, tokensOut: 30 });
  });

  it("runs the tool, sends its result back and returns the final answer", async () => {
    stubTurns(toolTurn("t1", { query: "atoms" }), textTurn("Atoms: /questions/cbse-12/physics/atoms"));
    const r = await askV({ system: "facts", message: "atoms cbse", tools: [tool] });

    expect(tool.run).toHaveBeenCalledWith({ query: "atoms" });
    expect(sent).toHaveLength(2);
    const last = sent[1].messages.at(-1)!;
    expect(last.role).toBe("user");
    expect(last.content).toEqual([
      { type: "tool_result", tool_use_id: "t1", content: 'found for {"query":"atoms"}' },
    ]);
    expect(r).toEqual({
      ok: true,
      reply: "Atoms: /questions/cbse-12/physics/atoms",
      tokensIn: 180,
      tokensOut: 30,
    });
  });

  it("stops after three tool rounds instead of looping forever", async () => {
    stubTurns(toolTurn("a", { query: "x" }));
    const r = await askV({ system: "facts", message: "loop", tools: [tool] });
    expect(sent.length).toBeLessThanOrEqual(4);
    expect(r.ok).toBe(false);
  });

  it("reports an unknown tool to the model as an error instead of throwing", async () => {
    stubTurns(
      { stop_reason: "tool_use", content: [{ type: "tool_use", id: "z", name: "delete_all", input: {} }], usage: { input_tokens: 1, output_tokens: 1 } },
      textTurn("Sorry")
    );
    const r = await askV({ system: "facts", message: "x", tools: [tool] });
    expect(r.ok).toBe(true);
    expect(sent[1].messages.at(-1)!.content).toEqual([
      { type: "tool_result", tool_use_id: "z", content: "Unknown tool", is_error: true },
    ]);
  });

  it("sends the remembered exchanges before the new question", async () => {
    stubTurns(textTurn("Physics chapters for NEET: ..."));
    await askV({
      system: "facts",
      message: "give me other chapter of phy",
      tools: [tool],
      history: [
        { role: "user", content: "NEET PYQ" },
        { role: "assistant", content: "NEET papers are on /mock." },
      ],
    });
    expect(sent[0].messages).toEqual([
      { role: "user", content: "NEET PYQ" },
      { role: "assistant", content: "NEET papers are on /mock." },
      { role: "user", content: "give me other chapter of phy" },
    ]);
  });

  it("fails without a key and makes no request", async () => {
    delete process.env.ANTHROPIC_API_KEY;
    const f = vi.fn();
    vi.stubGlobal("fetch", f);
    const r = await askV({ system: "facts", message: "hi", tools: [tool] });
    expect(r.ok).toBe(false);
    expect(f).not.toHaveBeenCalled();
  });

  it("fails on an API error", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => reply({ error: { message: "overloaded" } }, 529)));
    const r = await askV({ system: "facts", message: "hi", tools: [tool] });
    expect(r.ok).toBe(false);
  });

  it("fails when the model refuses or returns no text", async () => {
    stubTurns({ stop_reason: "refusal", content: [], usage: { input_tokens: 1, output_tokens: 0 } });
    expect((await askV({ system: "facts", message: "hi", tools: [tool] })).ok).toBe(false);
  });
});
