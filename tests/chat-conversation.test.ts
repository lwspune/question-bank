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

  it("leaves out conversations with nothing asked (a bare open)", () => {
    const open: ConversationRow = { ...faq("2026-10-15T09:00:00Z", "x", "x"), eventType: "launcher_open", questionId: null, reply: null, replySource: null };
    expect(groupConversations([open])).toEqual([]);
  });
});

describe("conversationJsonl", () => {
  it("writes one JSON line per conversation with no account id", () => {
    const [conv] = groupConversations([typed("2026-10-15T10:00:00Z", "atoms", "Atoms: /questions/cbse-12/physics/atoms", { feedback: -1 })]);
    const line = JSON.parse(conversationJsonl(conv));
    expect(line).toEqual({
      conversation_id: CID,
      signed_in: false,
      started_at: "2026-10-15T10:00:00Z",
      messages: [
        { role: "user", content: "atoms", at: "2026-10-15T10:00:00Z", page: "/browse" },
        { role: "assistant", content: "Atoms: /questions/cbse-12/physics/atoms", source: "ai", feedback: -1 },
      ],
    });
  });
});
