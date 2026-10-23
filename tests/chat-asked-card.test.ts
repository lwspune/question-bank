/**
 * The question card above an Ask V message (owner, 2026-10-23: "there should
 * be the question card above 'Explain this question'"). The student's turn
 * records WHICH question it was about; the card reads it, without its answer,
 * from /api/chat/question. Bank questions by id; notes practice questions by
 * their page and position. Pure parts: lib/chat/askVEvent.ts,
 * lib/chat/notesItem.ts notesItemCard, lib/chat/conversation.ts historyTurns.
 */
import { describe, it, expect } from "vitest";
import { askedCardOf, cardQuery, chosenIn, isAskVMessage, parseAskedCard } from "@/lib/chat/askVEvent";
import { notesItemCard } from "@/lib/chat/notesItem";
import { historyTurns, type ConversationRow } from "@/lib/chat/conversation";
import type { SubtopicNote } from "@/app/notes/_types";

const QID = "3bb486cc-61fa-47b6-ae1e-4e0d1cf009fa";
const NOTES_PAGE = "/notes/mht-cet-chemistry/halogen-derivatives/cethal-classification-and-properties";

describe("the Ask V message", () => {
  it("is recognised with or without a pick, and nothing else is", () => {
    expect(isAskVMessage("Explain this question.")).toBe(true);
    expect(isAskVMessage("I picked (C). Explain this question.")).toBe(true);
    expect(isAskVMessage("explain this question")).toBe(false);
    expect(isAskVMessage("hint")).toBe(false);
  });

  it("gives back the pick", () => {
    expect(chosenIn("I picked (E). Explain this question.")).toBe("E");
    expect(chosenIn("Explain this question.")).toBeNull();
  });
});

describe("askedCardOf", () => {
  it("a bank question: its id and the pick", () => {
    expect(askedCardOf({ questionId: QID, chose: "B" }, "/browse")).toEqual({ questionId: QID, chose: "B" });
  });

  it("a notes question: its position and the notes page it is on", () => {
    expect(askedCardOf({ notes: { concept: "benzylic", item: "practice", index: 1 }, chose: null }, NOTES_PAGE)).toEqual({
      notes: { concept: "benzylic", item: "practice", index: 1 },
      page: NOTES_PAGE,
    });
  });

  it("a notes question away from a notes page has no card", () => {
    expect(askedCardOf({ notes: { concept: "benzylic", item: "self" }, chose: null }, "/browse")).toBeNull();
  });
});

describe("parseAskedCard (the device's saved chat is not trusted)", () => {
  it("keeps a well-formed card", () => {
    expect(parseAskedCard({ questionId: QID, chose: null })).toEqual({ questionId: QID, chose: null });
    expect(parseAskedCard({ notes: { concept: "benzylic", item: "self" }, page: NOTES_PAGE })).toEqual({
      notes: { concept: "benzylic", item: "self" },
      page: NOTES_PAGE,
    });
  });

  it("drops anything else", () => {
    expect(parseAskedCard(undefined)).toBeNull();
    expect(parseAskedCard({ questionId: "not-an-id", chose: null })).toBeNull();
    expect(parseAskedCard({ questionId: QID, chose: "Z" })).toBeNull();
    expect(parseAskedCard({ notes: { concept: "Bad Slug!", item: "self" }, page: NOTES_PAGE })).toBeNull();
    expect(parseAskedCard({ notes: { concept: "benzylic", item: "self" }, page: "/browse" })).toBeNull();
  });
});

describe("cardQuery", () => {
  it("asks for a bank question by id", () => {
    expect(cardQuery({ questionId: QID, chose: "A" })).toBe(`id=${QID}`);
  });

  it("asks for a notes question by page and position", () => {
    expect(cardQuery({ notes: { concept: "benzylic", item: "practice", index: 1 }, page: NOTES_PAGE })).toBe(
      `page=${encodeURIComponent(NOTES_PAGE)}&concept=benzylic&item=practice&index=1`
    );
    expect(cardQuery({ notes: { concept: "benzylic", item: "self" }, page: NOTES_PAGE })).toBe(
      `page=${encodeURIComponent(NOTES_PAGE)}&concept=benzylic&item=self`
    );
  });
});

describe("historyTurns", () => {
  const row = (at: string, message: string, extra: Partial<ConversationRow> = {}): ConversationRow => ({
    id: `id-${at}`,
    eventType: "typed_question",
    questionId: null,
    createdAt: at,
    message,
    reply: "reply",
    replySource: "ai",
    replyLinks: null,
    feedback: null,
    conversationId: "6f1c2a52-8a3e-4c5b-9d7e-1f2a3b4c5d6e",
    pagePath: "/browse",
    signedIn: true,
    ...extra,
  });

  it("puts the card on the Ask V message only, not on the follow-ups about the same question", () => {
    const turns = historyTurns([
      row("2026-10-23T05:00:00Z", "I picked (A). Explain this question.", { askedQuestionId: QID }),
      row("2026-10-23T05:01:00Z", "why?", { askedQuestionId: QID }),
    ]);
    expect(turns[0]).toEqual({ role: "user", text: "I picked (A). Explain this question.", asked: { questionId: QID, chose: "A" } });
    expect(turns[2]).toEqual({ role: "user", text: "why?" });
  });

  it("has no card when the row does not say which question (before migration 0174, or a notes question)", () => {
    expect(historyTurns([row("2026-10-23T05:00:00Z", "Explain this question.")])[0]).toEqual({
      role: "user",
      text: "Explain this question.",
    });
  });
});

describe("notesItemCard", () => {
  const note = {
    title: "Classification and Properties",
    concepts: [
      {
        kind: "formula",
        slug: "benzylic",
        name: "Benzylic halides",
        intuition: "x",
        definition: "y",
        selfCheckExample: {
          prompt: "Which is **benzylic**?",
          options: ["Bromobenzene", "Benzyl bromide"],
          steps: ["Find the carbon carrying Br."],
          answer: "(B) Benzyl bromide",
        },
        practiceSet: [{ prompt: "Aryl: chlorobenzene or benzyl chloride?", answer: "Chlorobenzene", method: "Cl on the ring" }],
      },
    ],
  } as unknown as SubtopicNote;

  it("a self-check: its prompt and lettered options, and never its steps or answer", () => {
    const card = notesItemCard(note, { concept: "benzylic", item: "self" }, NOTES_PAGE)!;
    expect(card.text).toBe("Which is **benzylic**?");
    expect(card.options).toEqual([
      { label: "A", text: "Bromobenzene" },
      { label: "B", text: "Benzyl bromide" },
    ]);
    expect(card.where).toBe("Notes · Classification and Properties");
    expect(JSON.stringify(card)).not.toContain("Find the carbon");
    expect(JSON.stringify(card)).not.toContain("(B) Benzyl bromide");
  });

  it("a practice rep: its prompt only, never its answer or method", () => {
    const card = notesItemCard(note, { concept: "benzylic", item: "practice", index: 0 }, NOTES_PAGE)!;
    expect(card.text).toBe("Aryl: chlorobenzene or benzyl chloride?");
    expect(card.options).toEqual([]);
    expect(JSON.stringify(card)).not.toMatch(/Chlorobenzene"|Cl on the ring/);
  });

  it("null when the item is not on the page", () => {
    expect(notesItemCard(note, { concept: "nope", item: "self" }, NOTES_PAGE)).toBeNull();
    expect(notesItemCard(note, { concept: "benzylic", item: "practice", index: 4 }, NOTES_PAGE)).toBeNull();
  });
});
