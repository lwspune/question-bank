/**
 * V's conversations (migration 0159): the rows of one conversation turned into
 * V's memory, a student's history, the dashboard's threads and the export.
 */
import { describe, it, expect } from "vitest";
import {
  cleanPagePath,
  isConversationId,
  modelHistory,
  historyTurns,
  groupConversations,
  conversationJsonl,
  unreadFollowups,
  toolCallsForStorage,
  currentSession,
  findReplyTarget,
  replyContext,
  quoteSnippet,
  SESSION_IDLE_MS,
  type ConversationRow,
} from "@/lib/chat/conversation";

const CID = "6f1c2a52-8a3e-4c5b-9d7e-1f2a3b4c5d6e";

function typed(at: string, message: string, reply: string, extra: Partial<ConversationRow> = {}): ConversationRow {
  return {
    id: `id-${at}`,
    eventType: "typed_question",
    questionId: null,
    createdAt: at,
    message,
    reply,
    replySource: "ai",
    replyLinks: null,
    feedback: null,
    conversationId: CID,
    pagePath: "/browse",
    signedIn: false,
    ...extra,
  };
}

function faq(at: string, questionId: string, reply: string): ConversationRow {
  return {
    id: `id-${at}`,
    eventType: "faq_click",
    questionId,
    createdAt: at,
    message: null,
    reply,
    replySource: "template",
    replyLinks: null,
    feedback: null,
    conversationId: CID,
    pagePath: "/",
    signedIn: false,
  };
}

describe("cleanPagePath", () => {
  it("keeps a plain site path", () => {
    expect(cleanPagePath("/questions/cbse-12/physics/atoms")).toBe("/questions/cbse-12/physics/atoms");
  });

  it("drops the query string and the fragment", () => {
    expect(cleanPagePath("/browse?exam=neet#top")).toBe("/browse");
  });

  it("refuses anything that is not a site path", () => {
    expect(cleanPagePath("https://evil.example/x")).toBeNull();
    expect(cleanPagePath("/a b")).toBeNull();
    expect(cleanPagePath("/" + "x".repeat(300))).toBeNull();
    expect(cleanPagePath(42)).toBeNull();
  });
});

describe("isConversationId", () => {
  it("accepts a uuid and nothing else", () => {
    expect(isConversationId(CID)).toBe(true);
    expect(isConversationId("not-a-uuid")).toBe(false);
    expect(isConversationId(undefined)).toBe(false);
  });
});

describe("modelHistory", () => {
  it("gives V the last two exchanges, oldest first, as user and assistant turns", () => {
    const rows = [
      typed("2026-10-15T10:00:00Z", "hi", "Hi! Which exam?"),
      typed("2026-10-15T10:01:00Z", "NEET PYQ", "NEET papers are on /mock."),
      typed("2026-10-15T10:02:00Z", "physics", "Which chapter?"),
    ];
    expect(modelHistory(rows)).toEqual([
      { role: "user", content: "NEET PYQ" },
      { role: "assistant", content: "NEET papers are on /mock." },
      { role: "user", content: "physics" },
      { role: "assistant", content: "Which chapter?" },
    ]);
  });

  it("reads a button tap as the question on the button", () => {
    expect(modelHistory([faq("2026-10-15T10:00:00Z", "mock-pass", "The pass is ₹99.")])).toEqual([
      { role: "user", content: "What's the Premium Pass?" },
      { role: "assistant", content: "The pass is ₹99." },
    ]);
  });

  it("skips opens, builder steps and rows with no reply", () => {
    const rows: ConversationRow[] = [
      { ...faq("2026-10-15T09:00:00Z", "exams", "x"), eventType: "launcher_open", questionId: null, reply: null, replySource: null },
      typed("2026-10-15T10:00:00Z", "old", "", { reply: null, replySource: null }),
    ];
    expect(modelHistory(rows)).toEqual([]);
  });

  it("sorts by time whatever order the rows arrive in", () => {
    const rows = [typed("2026-10-15T10:02:00Z", "b", "B"), typed("2026-10-15T10:01:00Z", "a", "A")];
    expect(modelHistory(rows).map((m) => m.content)).toEqual(["a", "A", "b", "B"]);
  });
});

// 2026-10-21 (owner): V apologised for replies about a DIFFERENT question, because nothing told it the
// remembered exchanges were about another one. A chat is a session that ends after an hour with no
// messages; V remembers only that session, and each remembered message names the question it was about.
describe("sessions (an hour with no messages ends one)", () => {
  const T = Date.parse("2026-10-21T10:00:00Z");
  const at = (min: number) => new Date(T + min * 60_000).toISOString();

  it("is an hour", () => {
    expect(SESSION_IDLE_MS).toBe(60 * 60 * 1000);
  });

  it("keeps the exchanges after the last gap of more than an hour", () => {
    const rows = [typed(at(0), "old", "O"), typed(at(61), "a", "A"), typed(at(100), "b", "B")];
    expect(currentSession(rows).map((r) => r.message)).toEqual(["a", "b"]);
  });

  it("keeps a gap of exactly an hour inside the session", () => {
    const rows = [typed(at(0), "a", "A"), typed(at(60), "b", "B")];
    expect(currentSession(rows).map((r) => r.message)).toEqual(["a", "b"]);
  });

  it("is over when the newest message is more than an hour before now", () => {
    const rows = [typed(at(0), "a", "A")];
    expect(currentSession(rows, T + 61 * 60_000)).toEqual([]);
    expect(currentSession(rows, T + 59 * 60_000).map((r) => r.message)).toEqual(["a"]);
  });

  it("ignores opens and rows with no reply when finding the gaps", () => {
    const open: ConversationRow = { ...faq(at(30), "x", "x"), eventType: "launcher_open", questionId: null, reply: null, replySource: null };
    const rows = [typed(at(0), "a", "A"), open, typed(at(90), "b", "B")];
    expect(currentSession(rows).map((r) => r.message)).toEqual(["b"]);
  });
});

describe("modelHistory labels each message with its question", () => {
  const Q1 = "11111111-1111-4111-8111-111111111111";

  it("starts a message about a question with that question's id", () => {
    const rows = [typed("2026-10-21T10:00:00Z", "Explain this question.", "Add them.", { askedQuestionId: Q1 })];
    expect(modelHistory(rows)[0]).toEqual({ role: "user", content: `[About question ${Q1}]\nExplain this question.` });
  });

  it("leaves a message about no question as it was", () => {
    expect(modelHistory([typed("2026-10-21T10:00:00Z", "hi", "Hi!")])[0]).toEqual({ role: "user", content: "hi" });
  });
});

describe("replies to an earlier message", () => {
  const Q1 = "11111111-1111-4111-8111-111111111111";
  const rows = [
    typed("2026-10-21T10:00:00Z", "Explain this question.", "Use the direction cosine rule.", { id: "r1", askedQuestionId: Q1 }),
    typed("2026-10-21T10:05:00Z", "hi", "Hi!", { id: "r2" }),
  ];

  it("finds the exchange replied to among the rows given, and nothing else", () => {
    expect(findReplyTarget(rows, "r1")?.reply).toBe("Use the direction cosine rule.");
    expect(findReplyTarget(rows, "nope")).toBeNull();
    expect(findReplyTarget(rows, null)).toBeNull();
  });

  it("does not take a row with no reply as a target", () => {
    const noReply = typed("2026-10-21T10:06:00Z", "x", "", { id: "r3", reply: null, replySource: null });
    expect(findReplyTarget([noReply], "r3")).toBeNull();
  });

  it("tells V what was asked, what it replied and which question it was about", () => {
    const c = replyContext(rows[0]);
    expect(c).toContain("replying to an earlier exchange");
    expect(c).toContain(`about question ${Q1}`);
    expect(c).toContain("Explain this question.");
    expect(c).toContain("Use the direction cosine rule.");
  });

  it("shows the quote above the student's message when the chat is rebuilt", () => {
    const reply = typed("2026-10-21T10:07:00Z", "why 60?", "Because cos is 1/2.", { id: "r4", replyToId: "r1" });
    const turns = historyTurns([...rows, reply]);
    expect(turns.at(-2)).toEqual({ role: "user", text: "why 60?", quote: "Use the direction cosine rule." });
  });

  it("drops the quote when the message replied to is not in the rows", () => {
    const reply = typed("2026-10-21T10:07:00Z", "why 60?", "Because.", { id: "r4", replyToId: "gone" });
    expect(historyTurns([reply])[0]).toEqual({ role: "user", text: "why 60?" });
  });
});

describe("quoteSnippet", () => {
  it("takes the first line", () => {
    expect(quoteSnippet("\nFirst line.\nSecond line.")).toBe("First line.");
  });

  it("cuts a long line with an ellipsis", () => {
    const s = quoteSnippet("x".repeat(300));
    expect(s.length).toBeLessThanOrEqual(141);
    expect(s.endsWith("…")).toBe(true);
  });

  it("never cuts inside maths", () => {
    const s = quoteSnippet("a".repeat(120) + " \\(\\log_7 x + \\log_7 y\\) and more text after it");
    expect(s).not.toContain("\\(");
  });
});

describe("late answers (migration 0160)", () => {
  function followup(at: string, seenAt: string | null): ConversationRow {
    return {
      ...typed(at, "NEET PYQ\nGive me othet chapter of phy", "Sorry for the wait! Try /browse."),
      eventType: "v_followup",
      replySource: "followup",
      replyLinks: ["/browse"],
      seenAt,
      signedIn: true,
    };
  }

  it("opens as the student's questions, then V's answer with its links", () => {
    expect(historyTurns([followup("2026-10-15T12:00:00Z", null)])).toEqual([
      { role: "user", text: "NEET PYQ\nGive me othet chapter of phy" },
      { role: "assistant", text: "Sorry for the wait! Try /browse.", links: ["/browse"], source: "followup" },
    ]);
  });

  it("is part of V's memory, so a reply to it makes sense", () => {
    expect(modelHistory([followup("2026-10-15T12:00:00Z", null)])).toEqual([
      { role: "user", content: "NEET PYQ\nGive me othet chapter of phy" },
      { role: "assistant", content: "Sorry for the wait! Try /browse." },
    ]);
  });

  it("counts the late answers the student has not opened yet", () => {
    expect(
      unreadFollowups([
        followup("2026-10-15T12:00:00Z", null),
        followup("2026-10-15T12:01:00Z", "2026-10-16T09:00:00Z"),
        typed("2026-10-15T12:02:00Z", "hi", "Hi!"),
      ])
    ).toBe(1);
  });
});

describe("historyTurns", () => {
  it("rebuilds the chat window: question, then V's reply with its id, links and feedback", () => {
    const rows = [
      typed("2026-10-15T10:00:00Z", "buy premium", "Buy at /pricing.", { replyLinks: ["/pricing"], feedback: 1 }),
    ];
    expect(historyTurns(rows)).toEqual([
      { role: "user", text: "buy premium" },
      { role: "assistant", text: "Buy at /pricing.", id: "id-2026-10-15T10:00:00Z", links: ["/pricing"], source: "ai", feedback: 1 },
    ]);
  });

  it("keeps the newest 30 messages", () => {
    const rows = Array.from({ length: 20 }, (_, i) =>
      typed(`2026-10-15T10:${String(i).padStart(2, "0")}:00Z`, `q${i}`, `a${i}`)
    );
    const turns = historyTurns(rows);
    expect(turns).toHaveLength(30);
    expect(turns[0].text).toBe("q5");
  });
});

describe("groupConversations", () => {
  it("groups rows into conversations, newest conversation first, turns in order", () => {
    const other = "11111111-2222-4333-8444-555555555555";
    const rows = [
      typed("2026-10-15T11:00:00Z", "later", "L", { conversationId: other, signedIn: true, pagePath: "/mock" }),
      typed("2026-10-15T10:01:00Z", "second", "S"),
      typed("2026-10-15T10:00:00Z", "first", "F"),
    ];
    const g = groupConversations(rows);
    expect(g.map((c) => c.conversationId)).toEqual([other, CID]);
    expect(g[1].turns.map((t) => t.question)).toEqual(["first", "second"]);
    expect(g[0].signedIn).toBe(true);
    expect(g[1].startedAt).toBe("2026-10-15T10:00:00Z");
  });

  it("carries the account the conversation belongs to, null when never signed in", () => {
    const UID = "aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee";
    const other = "11111111-2222-4333-8444-555555555555";
    const g = groupConversations([
      // Started signed out, then signed in: still that student's conversation.
      typed("2026-10-15T10:01:00Z", "second", "S", { signedIn: true, userId: UID }),
      typed("2026-10-15T10:00:00Z", "first", "F", { userId: null }),
      typed("2026-10-15T09:00:00Z", "anon", "A", { conversationId: other }),
    ]);
    expect(g.find((c) => c.conversationId === CID)?.userId).toBe(UID);
    expect(g.find((c) => c.conversationId === other)?.userId).toBeNull();
  });

  // 2026-10-23 (owner): the dashboard draws a conversation the way the student saw it.
  it("gives each turn what the student's window showed: the reply's links, the question card and the quote", () => {
    const Q1 = "11111111-1111-4111-8111-111111111111";
    const [conv] = groupConversations([
      typed("2026-10-21T10:00:00Z", "I picked (B). Explain this question.", "Use the direction cosine rule.", {
        id: "r1",
        askedQuestionId: Q1,
        replyLinks: ["/questions/cbse-12/maths/three-dimensional-geometry"],
      }),
      // A follow-up about the same question: the card stays on the tap, as in the window.
      typed("2026-10-21T10:07:00Z", "why 60?", "Because cos is 1/2.", { id: "r2", askedQuestionId: Q1, replyToId: "r1" }),
    ]);
    expect(conv.turns[0]).toMatchObject({
      links: ["/questions/cbse-12/maths/three-dimensional-geometry"],
      asked: { questionId: Q1, chose: "B" },
      quote: null,
    });
    expect(conv.turns[1]).toMatchObject({ links: [], asked: null, quote: "Use the direction cosine rule." });
  });

  it("leaves out conversations with nothing asked (a bare open)", () => {
    const open: ConversationRow = { ...faq("2026-10-15T09:00:00Z", "x", "x"), eventType: "launcher_open", questionId: null, reply: null, replySource: null };
    expect(groupConversations([open])).toEqual([]);
  });
});

describe("conversationJsonl", () => {
  it("writes one JSON line per conversation with no account id", () => {
    const [conv] = groupConversations([
      typed("2026-10-15T10:00:00Z", "atoms", "Atoms: /questions/cbse-12/physics/atoms", {
        feedback: -1,
        signedIn: true,
        userId: "aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee",
      }),
    ]);
    const line = JSON.parse(conversationJsonl(conv));
    expect(line).toEqual({
      conversation_id: CID,
      signed_in: true,
      started_at: "2026-10-15T10:00:00Z",
      messages: [
        { role: "user", content: "atoms", at: "2026-10-15T10:00:00Z", page: "/browse" },
        { role: "assistant", content: "Atoms: /questions/cbse-12/physics/atoms", source: "ai", feedback: -1 },
      ],
    });
  });
});

// 2026-10-18: what V searched, kept with the reply (migration 0167), so a "not found" can be explained.
describe("tool calls in the export", () => {
  it("puts V's searches on its reply, and leaves them off a reply that made none", () => {
    const calls = [{ name: "find_chapters", input: { query: "rotational dynamics", exam: "CBSE Class 12" }, result: "No chapter matched." }];
    const [conv] = groupConversations([
      typed("2026-10-18T06:13:00Z", "rotational dynamics", "Not found, try /browse", { toolCalls: calls }),
      typed("2026-10-18T06:14:00Z", "ok", "Bye"),
    ]);
    const line = JSON.parse(conversationJsonl(conv));
    expect(line.messages[1]).toMatchObject({ role: "assistant", tool_calls: calls });
    expect(line.messages[3]).not.toHaveProperty("tool_calls");
  });
});

describe("toolCallsForStorage", () => {
  const call = (i: number) => ({ name: "find_chapters", input: { query: `q${i}` }, result: "x" });

  it("is null when V made no call", () => {
    expect(toolCallsForStorage([])).toBeNull();
    expect(toolCallsForStorage(undefined)).toBeNull();
  });

  it("keeps at most ten calls, as the column allows", () => {
    expect(toolCallsForStorage(Array.from({ length: 12 }, (_, i) => call(i)))).toHaveLength(10);
  });

  // An oversized value would fail the CHECK and lose the whole row, question and all.
  it("drops the results, then gives up, rather than exceed the column's 8,000 bytes", () => {
    const big = [{ name: "find_chapters", input: { query: "a" }, result: "अ".repeat(2900) }];
    expect(toolCallsForStorage(big)).toEqual([{ name: "find_chapters", input: { query: "a" } }]);
    const huge = [{ name: "find_chapters", input: { query: "अ".repeat(3000) } }];
    expect(toolCallsForStorage(huge)).toBeNull();
  });
});
