/**
 * V remembers the language a student asked for (2026-11-08, migration 0232).
 *
 * A student wrote "ans in hinglish always"; V promised "aage ke saare jawab
 * Hinglish mein honge", and the next chat, two hours later, was in English:
 * V kept nothing past a session, and the Ask V buttons send English. 8
 * students asked for a language 17 times in 60 days. set_language saves it on
 * the student's profile, and V is told it at the end of every reply's
 * instructions, so it holds in later chats and on button messages.
 */
import { describe, it, expect } from "vitest";
import { languageTool, languageLine, parseVLanguage } from "@/lib/chat/language";
import { buildSystemPrompt, buildSystemTail } from "@/lib/chat/facts";

function tool(over: { signedIn?: boolean; save?: (l: string) => Promise<boolean> } = {}) {
  const saved: string[] = [];
  const t = languageTool({
    signedIn: over.signedIn ?? true,
    save:
      over.save ??
      (async (l) => {
        saved.push(l);
        return true;
      }),
  });
  return { t, saved };
}

describe("parseVLanguage", () => {
  it("takes the four languages V speaks, and nothing else", () => {
    expect(parseVLanguage("hinglish")).toBe("hinglish");
    expect(parseVLanguage("mr")).toBe("mr");
    expect(parseVLanguage("french")).toBeNull();
    expect(parseVLanguage(null)).toBeNull();
  });
});

describe("set_language", () => {
  it("saves the language and tells V it now holds in later chats too", async () => {
    const { t, saved } = tool();
    const out = await t.run({ language: "hinglish" });
    expect(saved).toEqual(["hinglish"]);
    expect(out).toMatch(/saved/i);
    expect(out).toMatch(/later chats/i);
  });

  it("refuses a language V does not speak, saving nothing", async () => {
    const { t, saved } = tool();
    expect(await t.run({ language: "tamil" })).toMatch(/English, Hinglish, Hindi or Marathi/);
    expect(saved).toEqual([]);
  });

  it("signed out, saves nothing and tells V not to promise later chats", async () => {
    const { t, saved } = tool({ signedIn: false });
    const out = await t.run({ language: "hi" });
    expect(saved).toEqual([]);
    expect(out).toMatch(/do not promise/i);
  });

  it("when saving fails, keeps to it in this chat only", async () => {
    const { t } = tool({ save: async () => false });
    expect(await t.run({ language: "mr" })).toMatch(/this chat/i);
  });
});

describe("V's instructions", () => {
  it("tell V to save a language asked for every reply, and never to promise one it did not save", () => {
    const p = buildSystemPrompt({ exams: [], plans: [], bankTotal: 0, nav: [] });
    expect(p).toMatch(/call set_language/);
    expect(p).toMatch(/never promise a language for later chats/i);
  });

  it("name the saved language at the end, for button messages too", () => {
    expect(languageLine("hinglish")).toMatch(/Hinglish/);
    expect(languageLine("hinglish")).toMatch(/even to a button message/i);
    expect(buildSystemTail({ page: null, signedIn: true, language: "hinglish" })).toContain(languageLine("hinglish"));
    expect(buildSystemTail({ page: null, signedIn: true })).not.toMatch(/asked for every reply/i);
  });
});
