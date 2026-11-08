/**
 * The language a student asked V to answer in, kept on their profile
 * (student_profiles.v_language, migration 0232, 2026-11-08).
 *
 * Rule 10 has V match how the student wrote, which forgets a request: a
 * student wrote "ans in hinglish always", V promised it, and the next chat
 * two hours later was in English (V keeps nothing past a session, and the Ask
 * V buttons send English). set_language saves the request; the route reads it
 * with the student's exams and V is told it in the per-question instructions.
 *
 * Pure. Spec: tests/chat-language.test.ts.
 */
import type { VTool } from "./anthropic";

export const V_LANGUAGES = { en: "English", hinglish: "Hinglish", hi: "Hindi", mr: "Marathi" } as const;
export type VLanguage = keyof typeof V_LANGUAGES;

export function parseVLanguage(v: unknown): VLanguage | null {
  return typeof v === "string" && Object.prototype.hasOwnProperty.call(V_LANGUAGES, v) ? (v as VLanguage) : null;
}

/** Said at the end of V's instructions while a language is saved. */
export function languageLine(lang: VLanguage): string {
  return `The student asked for every reply in ${V_LANGUAGES[lang]}: reply in ${V_LANGUAGES[lang]}, even to a button message such as "Explain this question.", unless they now ask for another language.`;
}

export type LanguageToolDeps = {
  signedIn: boolean;
  /** Saves it on the student's own profile row; false when the write failed. */
  save: (lang: VLanguage) => Promise<boolean>;
};

export function languageTool(d: LanguageToolDeps): VTool {
  return {
    name: "set_language",
    logResult: true,
    description:
      'Save the language the student wants EVERY reply in, when they ask for it ("always Hinglish", "reply in Marathi", "English please"). Not for a single message written in another language.',
    input_schema: {
      type: "object",
      properties: {
        language: { type: "string", enum: Object.keys(V_LANGUAGES), description: "en, hinglish, hi (Hindi) or mr (Marathi)." },
      },
      required: ["language"],
    },
    run: async (input) => {
      const lang = parseVLanguage((input as { language?: unknown } | null)?.language);
      if (!lang) return "V answers in English, Hinglish, Hindi or Marathi only. Say so in one line, in their language.";
      const name = V_LANGUAGES[lang];
      if (!d.signedIn) {
        return `They are signed out, so it cannot be saved. Reply in ${name} in this chat, and do not promise later chats: say signing in lets you remember it.`;
      }
      const ok = await d.save(lang).catch(() => false);
      if (!ok) return `It could not be saved. Reply in ${name} in this chat only, and do not promise later chats.`;
      return `Saved: every reply will be in ${name}, in this chat and later chats. Say so in one short line, in ${name}, then answer anything else they asked.`;
    },
  };
}
