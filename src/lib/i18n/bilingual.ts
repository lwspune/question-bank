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
 *
 * A canonical row is not always English: the MPSC Mains language papers print
 * their Marathi section in Marathi only, so those rows store Marathi as the
 * canonical text with no translation. `scriptLang` reads the canonical text's
 * script, so such a row is tagged `mr` rather than `en` — the tag becomes the
 * HTML `lang` attribute, which decides the voice a screen reader uses.
 *
 * HINDI (SSC CGL, 2026-10-20) is stored the same way, lang 'hi'. A question
 * carries at most ONE second language, so the switch's middle button means
 * "the other print": a stored "mr" picks the Hindi on an SSC page and a stored
 * "hi" picks the Marathi on an MPSC page, and one stored choice serves both.
 */

/** A second language a question can be printed in. */
export type AltLang = "mr" | "hi";
export type QuestionLang = "en" | AltLang | "both";
export type PrintedLang = "en" | AltLang;
type Label = "A" | "B" | "C" | "D" | "E";

export type Translation = {
  text: string;
  context: string | null;
  /** Absent on rows whose translation carries no solution. */
  solution?: string | null;
  options: Partial<Record<Label, string>>;
};

/** The minimum a surface needs to render a question bilingually. */
export type Bilingual = {
  text: string;
  context: string | null;
  options: { label: Label; text: string }[];
  translations?: Partial<Record<AltLang, Translation>>;
};

const ALT_LANGS: readonly AltLang[] = ["mr", "hi"];

/**
 * The choice before a reader has made one. Marathi readers are the MPSC and MH
 * SSC audience, so "both" (the booklet's order). Most SSC readers here read
 * English, so a Hindi page opens in English with Hindi one tap away (owner,
 * 2026-10-20). An exam can name its own default instead (`examDefault`, from
 * the registry's `defaultLang`): UP Board opens in Hindi, because its readers
 * are Hindi-medium (owner, 2026-11-17). A choice the reader makes is stored and
 * wins everywhere.
 */
export function defaultLangFor(alt: AltLang | null | undefined, examDefault?: QuestionLang | null): QuestionLang {
  if (examDefault) return examDefault;
  return alt === "hi" ? "en" : "both";
}

/** The switch's three buttons for a page whose second language is `alt`. */
export function switchLangs(alt: AltLang): QuestionLang[] {
  return ["en", alt, "both"];
}

/** Button labels — each in its own script, so a reader finds theirs at a glance. */
const ALT_LABELS: Record<AltLang, { name: string; english: string; both: string; heading: string }> = {
  mr: { name: "मराठी", english: "Marathi", both: "Both / दोन्ही", heading: "प्रश्नाची भाषा" },
  hi: { name: "हिन्दी", english: "Hindi", both: "Both / दोनों", heading: "प्रश्न की भाषा" },
};

export function langLabel(lang: QuestionLang, alt: AltLang): string {
  if (lang === "en") return "English";
  if (lang === "both") return ALT_LABELS[alt].both;
  return ALT_LABELS[lang].name;
}

/** "Question language" in the second language, for headings beside the English. */
export function langHeading(alt: AltLang): string {
  return ALT_LABELS[alt].heading;
}

/** The second language's English name, for prose ("Hindi and English"). */
export function altLangName(alt: AltLang): string {
  return ALT_LABELS[alt].english;
}

/** Either translated preference checks the middle button. */
export function isLangChecked(button: QuestionLang, pref: QuestionLang, alt: AltLang): boolean {
  if (button === alt) return isAltLang(pref);
  return button === pref;
}

function isAltLang(lang: QuestionLang): lang is AltLang {
  return lang === "mr" || lang === "hi";
}

export function parseLangPref(raw: string | null | undefined): QuestionLang | null {
  return raw === "en" || raw === "mr" || raw === "hi" || raw === "both" ? raw : null;
}

const DEVANAGARI = /[ऀ-ॿ]/g;
const LATIN = /[A-Za-z]/g;

/**
 * The printed language of a canonical text, by script: Marathi when Devanagari
 * letters outnumber Latin ones. LaTeX commands count as Latin, which is right —
 * a math-heavy stem is an English-section row. Hindi and Marathi share the
 * script, so `devanagari` names which one a Devanagari text is: Marathi unless
 * the question says otherwise, as the only Devanagari-canonical rows are MPSC's.
 */
export function scriptLang(text: string, devanagari: AltLang = "mr"): PrintedLang {
  const dev = text.match(DEVANAGARI)?.length ?? 0;
  const lat = text.match(LATIN)?.length ?? 0;
  return dev > lat ? devanagari : "en";
}

/** The second language this question is printed in, or null when English only. */
export function altLangOf(q: Pick<Bilingual, "translations">): AltLang | null {
  return ALT_LANGS.find((lang) => Boolean(q.translations?.[lang]?.text)) ?? null;
}

export function hasTranslation(q: Pick<Bilingual, "translations">): boolean {
  return altLangOf(q) !== null;
}

/** The second language of the first translated question in a list, if any. */
export function altLangOfAny(qs: Iterable<Pick<Bilingual, "translations">>): AltLang | null {
  for (const q of qs) {
    const alt = altLangOf(q);
    if (alt) return alt;
  }
  return null;
}

export function effectiveLang(pref: QuestionLang, q: Pick<Bilingual, "translations">): QuestionLang {
  const alt = altLangOf(q);
  if (!alt) return "en";
  return isAltLang(pref) ? alt : pref;
}

const order = (lang: QuestionLang, alt: AltLang): PrintedLang[] =>
  lang === "both" ? [alt, "en"] : [lang as PrintedLang];

export function stemVersions(
  q: Bilingual,
  pref: QuestionLang
): { lang: PrintedLang; text: string; context: string | null }[] {
  const alt = altLangOf(q) ?? "mr";
  const tr = q.translations?.[alt];
  return order(effectiveLang(pref, q), alt).map((lang) =>
    lang === alt && tr
      ? { lang, text: tr.text, context: tr.context }
      : { lang: scriptLang(q.text, alt), text: q.text, context: q.context }
  );
}

export function optionVersions(
  q: Bilingual,
  opt: { label: Label; text: string },
  pref: QuestionLang
): { lang: PrintedLang; text: string }[] {
  const alt = altLangOf(q) ?? "mr";
  const trText = q.translations?.[alt]?.options[opt.label];
  const langs = order(effectiveLang(pref, q), alt);
  const out = langs
    .map((lang) =>
      lang === alt ? (trText ? { lang, text: trText } : null) : { lang: scriptLang(opt.text, alt), text: opt.text }
    )
    .filter((v): v is { lang: PrintedLang; text: string } => v !== null);
  // A number or formula reads the same in both prints: show it once, as the
  // canonical row, rather than the same "5%" twice.
  if (out.length === 2 && out[0].text.trim() === out[1].text.trim()) return [out[1]];
  return out.length ? out : [{ lang: scriptLang(opt.text, alt), text: opt.text }];
}

/**
 * The solution in each chosen language, Marathi first for "both". A missing
 * Marathi solution falls back to English; a solution that exists only in
 * Marathi is shown whatever was chosen, since hiding it would hide the only
 * explanation there is. Empty when neither language has one.
 */
export function solutionVersions(
  q: Pick<Bilingual, "translations"> & { solution: string | null },
  pref: QuestionLang
): { lang: PrintedLang; text: string }[] {
  const alt = altLangOf(q) ?? "mr";
  const trSolution = q.translations?.[alt]?.solution;
  const text: Partial<Record<PrintedLang, string | null>> = {
    en: q.solution?.trim() ? q.solution : null,
    [alt]: trSolution?.trim() ? trSolution : null,
  };
  // The canonical solution is tagged by its script: a Marathi-only row's
  // solution is Marathi even though it sits in the "en" slot.
  const tag = (lang: PrintedLang): PrintedLang => (lang === "en" ? scriptLang(text.en as string, alt) : lang);
  const wanted = order(effectiveLang(pref, q), alt)
    .filter((lang) => text[lang])
    .map((lang) => ({ lang: tag(lang), text: text[lang] as string }));
  if (wanted.length) return wanted;
  const any = ([alt, "en"] as const).find((lang) => text[lang]);
  return any ? [{ lang: tag(any), text: text[any] as string }] : [];
}

type RawQuestionTranslation = { lang: string; text: string; context: string | null; solution?: string | null };
type RawOptionWithTranslations = { label: string; option_translations?: { lang: string; text: string }[] | null };

/**
 * Build `translations` from the rows PostgREST embeds
 * (`question_translations(...)` + `options(label, option_translations(...))`).
 * Undefined when there is no translation, so an English-only question's
 * view-model is unchanged.
 */
export function translationsFromRows(
  questionRows: RawQuestionTranslation[] | null | undefined,
  optionRows: RawOptionWithTranslations[] | null | undefined
): Partial<Record<AltLang, Translation>> | undefined {
  const out: Partial<Record<AltLang, Translation>> = {};
  for (const lang of ALT_LANGS) {
    const row = (questionRows ?? []).find((t) => t.lang === lang);
    if (!row) continue;
    const options: Partial<Record<Label, string>> = {};
    for (const o of optionRows ?? []) {
      const t = (o.option_translations ?? []).find((x) => x.lang === lang);
      if (t) options[o.label as Label] = t.text;
    }
    out[lang] = { text: row.text, context: row.context, ...(row.solution ? { solution: row.solution } : {}), options };
  }
  return Object.keys(out).length ? out : undefined;
}

const CANCELLED_LINES: Record<AltLang, string> = {
  mr: "हा प्रश्न आयोगाने अंतिम उत्तरतालिकेत रद्द केला आहे; कोणताही पर्याय बरोबर नाही.",
  hi: "यह प्रश्न आयोग ने अंतिम उत्तर कुंजी में रद्द कर दिया है; कोई भी विकल्प सही नहीं है।",
};

/**
 * The officially-cancelled notice's second line, in the question's own second
 * print language, or null for an English-only question. Until 2026-11-16 the
 * notice always printed the Marathi line, which showed Marathi on cancelled
 * CAPF, UPSC and RAS (Hindi) items too.
 */
export function cancelledLine(alt: AltLang | null): { lang: AltLang; text: string } | null {
  return alt ? { lang: alt, text: CANCELLED_LINES[alt] } : null;
}
