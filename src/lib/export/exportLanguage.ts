/**
 * Language pre-pass for the Word export (tests/export-language.test.ts).
 *
 * Rewrites each row's printable fields into the chosen language(s) BEFORE the
 * docx builder sees them, so the builder — its numbering, tables, OMML and
 * images — needs no language awareness at all. The answer key is untouched:
 * `isCorrect` stays on the same option, because a translation is a
 * presentation of one question, never a second one.
 *
 * "both" stacks Marathi above English in the stem (the booklet's order) and
 * joins options with " / " so each option stays one line in a two-column page.
 * The answer key's solution follows the same language choice.
 */
import { optionVersions, parseLangPref, solutionVersions, stemVersions, type QuestionLang } from "@/lib/i18n/bilingual";
import type { QuestionRow } from "@/lib/questions/query";

export function parseExportLang(raw: unknown): QuestionLang {
  return parseLangPref(typeof raw === "string" ? raw : null) ?? "en";
}

export function applyExportLanguage(rows: QuestionRow[], lang: QuestionLang): QuestionRow[] {
  if (lang === "en") return rows;
  return rows.map((q) => {
    const stems = stemVersions(q, lang);
    const contexts = stems.map((v) => v.context).filter((c): c is string => Boolean(c));
    return {
      ...q,
      text: stems.map((v) => v.text).join("\n\n"),
      context: contexts.length ? contexts.join("\n\n") : null,
      solution: solutionVersions(q, lang).map((v) => v.text).join("\n\n") || null,
      options: q.options.map((o) => ({
        ...o,
        text: optionVersions(q, o, lang)
          .map((v) => v.text)
          .join(" / "),
      })),
    };
  });
}
