/**
 * The notice a question carries when the owner judged MPSC's key doubtful, or
 * the question defective as printed: the key is KEPT, the notice heads the
 * solution, and the mock awards the question to every candidate. Every notice
 * ends by saying so, in its own language.
 */
export function notice(en: string, mr: string) {
  return { en: noticeEn(en), mr: noticeMr(mr) };
}

/** The English notice alone (an English-only row: a Mains English question, a CSAT English passage). */
export function noticeEn(en: string) {
  return `**Notice:** ${en} In PYQ Vault mocks this question is awarded to every candidate.`;
}

/** The Marathi notice alone (a Marathi-only row). */
export function noticeMr(mr: string) {
  return `**सूचना:** ${mr} PYQ Vault च्या सराव परीक्षांमध्ये या प्रश्नाचे गुण सर्व उमेदवारांना दिले जातात.`;
}

/**
 * A row's solution once its notice heads it; null when it already does (so a
 * re-run writes nothing). A worked solution keeps its working under the notice.
 */
export function withNotice(existing: string | null | undefined, notice: string): string | null {
  const body = (existing ?? "").trim();
  if (body.startsWith(notice)) return null;
  return body ? `${notice}\n\n${body}` : notice;
}

/**
 * The notice in the language a row is printed in: Marathi when most of its
 * letters are Devanagari (a Marathi-only CSAT passage), else English. A majority,
 * not "any Devanagari", because an English question may quote a Marathi word.
 */
export function noticeTextFor(rowText: string, n: { en: string; mr: string }): string {
  const deva = (rowText.match(/[ऀ-ॿ]/g) ?? []).length;
  const latin = (rowText.match(/[A-Za-z]/g) ?? []).length;
  return deva > latin ? n.mr : n.en;
}
