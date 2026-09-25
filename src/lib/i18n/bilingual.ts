/**
 * Which printed language(s) of a question to show — pure, shared by /browse,
 * the mock runner and the Word export (tests/bilingual.test.ts).
 *
 * The English row is canonical; a Marathi translation (migration 0118) is an
 * alternative presentation of the SAME question and key. A preference only
 * ever applies where Marathi exists: an English-only question renders in
 * English whatever the student chose, so the choice can be made once and
 * carried across a mixed page without blanking anything.
 *
 * "both" puts Marathi FIRST because that is the order the MPSC booklet prints.
 */

export type QuestionLang = "en" | "mr" | "both";
export type PrintedLang = "en" | "mr";
type Label = "A" | "B" | "C" | "D";

export type Translation = {
  text: string;
  context: string | null;
  options: Partial<Record<Label, string>>;
};

/** The minimum a surface needs to render a question bilingually. */
export type Bilingual = {
  text: string;
  context: string | null;
  options: { label: Label; text: string }[];
  translations?: { mr?: Translation };
};

export const QUESTION_LANGS: readonly QuestionLang[] = ["en", "mr", "both"];

/** Button labels — each in its own script, so a reader finds theirs at a glance. */
export const LANG_LABELS: Record<QuestionLang, string> = {
  en: "English",
  mr: "मराठी",
  both: "Both / दोन्ही",
};

export function parseLangPref(raw: string | null | undefined): QuestionLang | null {
  return raw === "en" || raw === "mr" || raw === "both" ? raw : null;
}

export function hasMarathi(q: Pick<Bilingual, "translations">): boolean {
  return Boolean(q.translations?.mr?.text);
}

export function effectiveLang(pref: QuestionLang, q: Pick<Bilingual, "translations">): QuestionLang {
  return hasMarathi(q) ? pref : "en";
}

const order = (lang: QuestionLang): PrintedLang[] => (lang === "both" ? ["mr", "en"] : [lang]);

export function stemVersions(
  q: Bilingual,
  pref: QuestionLang
): { lang: PrintedLang; text: string; context: string | null }[] {
  const mr = q.translations?.mr;
  return order(effectiveLang(pref, q)).map((lang) =>
    lang === "mr" && mr
      ? { lang, text: mr.text, context: mr.context }
      : { lang: "en" as const, text: q.text, context: q.context }
  );
}

export function optionVersions(
  q: Bilingual,
  opt: { label: Label; text: string },
  pref: QuestionLang
): { lang: PrintedLang; text: string }[] {
  const mrText = q.translations?.mr?.options[opt.label];
  const langs = order(effectiveLang(pref, q));
  const out = langs
    .map((lang) => (lang === "mr" ? (mrText ? { lang, text: mrText } : null) : { lang, text: opt.text }))
    .filter((v): v is { lang: PrintedLang; text: string } => v !== null);
  return out.length ? out : [{ lang: "en", text: opt.text }];
}

type RawQuestionTranslation = { lang: string; text: string; context: string | null };
type RawOptionWithTranslations = { label: string; option_translations?: { lang: string; text: string }[] | null };

/**
 * Build `translations` from the rows PostgREST embeds
 * (`question_translations(...)` + `options(label, option_translations(...))`).
 * Undefined when there is no Marathi, so an English-only question's
 * view-model is unchanged.
 */
export function translationsFromRows(
  questionRows: RawQuestionTranslation[] | null | undefined,
  optionRows: RawOptionWithTranslations[] | null | undefined
): { mr?: Translation } | undefined {
  const mr = (questionRows ?? []).find((t) => t.lang === "mr");
  if (!mr) return undefined;
  const options: Partial<Record<Label, string>> = {};
  for (const o of optionRows ?? []) {
    const t = (o.option_translations ?? []).find((x) => x.lang === "mr");
    if (t) options[o.label as Label] = t.text;
  }
  return { mr: { text: mr.text, context: mr.context, options } };
}
