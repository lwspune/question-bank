/**
 * askV (2026-10-15): one AI answer for V, with at most a few rounds of the
 * find_chapters tool. fetch is stubbed; no request leaves the machine.
 */
import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { askV, V_MODEL, type VTool } from "@/lib/chat/anthropic";

type Sent = {
  model: string;
  system?: unknown;
  messages: { role: string; content: unknown }[];
  tools?: unknown[];
  output_config?: unknown;
};

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
    expect(r).toEqual({
      ok: true,
      reply: "Open /pricing.",
      tokensIn: 500,
      tokensOut: 30,
      cacheReadTokens: 0,
      cacheWriteTokens: 0,
      cacheWrite1hTokens: 0,
      toolCalls: [],
    });
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
      cacheReadTokens: 0,
      cacheWriteTokens: 0,
      cacheWrite1hTokens: 0,
      toolCalls: [{ name: "find_chapters", input: { query: "atoms" } }],
    });
  });

  // 2026-10-18: a "not found" could not be explained, since what V searched was never kept.
  it("keeps what each tool was asked and, for a tool that says so, what it returned, cut short", async () => {
    const logged: VTool = { ...tool, logResult: true, run: async () => "x".repeat(1000) };
    stubTurns(toolTurn("t1", { query: "rotational dynamics", exam: "CBSE Class 12" }), textTurn("Not found."));
    const r = await askV({ system: "facts", message: "rotational dynamics", tools: [logged] });
    expect(r.toolCalls).toEqual([
      { name: "find_chapters", input: { query: "rotational dynamics", exam: "CBSE Class 12" }, result: "x".repeat(300) },
    ]);
  });

  it("keeps the tool calls of an answer that failed part-way", async () => {
    stubTurns(toolTurn("a", { query: "x" }));
    const r = await askV({ system: "facts", message: "loop", tools: [tool] });
    expect(r.ok).toBe(false);
    expect(r.toolCalls.length).toBeGreaterThan(0);
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

  it("marks the fixed instructions for the 1-hour cache and sends the per-question part after them", async () => {
    // 1 hour, not 5 minutes (2026-10-23): 39 of 58 cache writes came 5-60 minutes after the previous answer.
    stubTurns(textTurn("Hi"));
    await askV({ system: "fixed facts", systemTail: "The student is on /notes.", message: "hi", tools: [tool] });
    expect(sent[0].system).toEqual([
      { type: "text", text: "fixed facts", cache_control: { type: "ephemeral", ttl: "1h" } },
      { type: "text", text: "The student is on /notes." },
    ]);
  });

  it("sends only the cached block when there is no per-question part", async () => {
    stubTurns(textTurn("Hi"));
    await askV({ system: "fixed facts", message: "hi", tools: [tool] });
    expect(sent[0].system).toEqual([{ type: "text", text: "fixed facts", cache_control: { type: "ephemeral", ttl: "1h" } }]);
  });

  it("counts 1-hour cache writes apart, since they cost 2x the input price instead of 1.25x", async () => {
    stubTurns(
      {
        ...toolTurn("t1", { query: "atoms" }),
        usage: {
          input_tokens: 40,
          output_tokens: 10,
          cache_creation_input_tokens: 2800,
          cache_read_input_tokens: 0,
          cache_creation: { ephemeral_5m_input_tokens: 0, ephemeral_1h_input_tokens: 2800 },
        },
      },
      { ...textTurn("Atoms"), usage: { input_tokens: 300, output_tokens: 20, cache_read_input_tokens: 2800 } }
    );
    const r = await askV({ system: "facts", message: "atoms", tools: [tool] });
    expect(r).toMatchObject({ ok: true, cacheWriteTokens: 2800, cacheWrite1hTokens: 2800, cacheReadTokens: 2800 });
  });

  it("adds up cached reads and writes across tool rounds, apart from full-price input", async () => {
    stubTurns(
      {
        ...toolTurn("t1", { query: "atoms" }),
        usage: { input_tokens: 40, output_tokens: 10, cache_creation_input_tokens: 2800, cache_read_input_tokens: 0 },
      },
      {
        ...textTurn("Atoms"),
        usage: { input_tokens: 300, output_tokens: 20, cache_creation_input_tokens: 0, cache_read_input_tokens: 2800 },
      }
    );
    const r = await askV({ system: "facts", message: "atoms", tools: [tool] });
    expect(r).toMatchObject({ ok: true, tokensIn: 340, tokensOut: 30, cacheWriteTokens: 2800, cacheReadTokens: 2800 });
  });

  it("reports the tokens already spent when a later round fails, since they are billed", async () => {
    let i = 0;
    vi.stubGlobal(
      "fetch",
      vi.fn(async (_url: string, init: RequestInit) => {
        sent.push(JSON.parse(String(init.body)) as Sent);
        return i++ === 0
          ? reply({
              ...toolTurn("t1", { query: "atoms" }),
              usage: { input_tokens: 80, output_tokens: 10, cache_creation_input_tokens: 2800, cache_read_input_tokens: 0 },
            })
          : reply({ error: { message: "overloaded" } }, 529);
      })
    );
    const r = await askV({ system: "facts", message: "atoms", tools: [tool] });
    expect(r).toMatchObject({ ok: false, tokensIn: 80, tokensOut: 10, cacheWriteTokens: 2800, cacheReadTokens: 0 });
  });

  it("reports zero spent when it fails before any reply", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => reply({ error: { message: "overloaded" } }, 529)));
    const r = await askV({ system: "facts", message: "hi", tools: [tool] });
    expect(r).toMatchObject({ ok: false, tokensIn: 0, tokensOut: 0, cacheReadTokens: 0, cacheWriteTokens: 0 });
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
