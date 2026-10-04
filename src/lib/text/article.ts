/**
 * "a" or "an" before a name, by its SOUND. Spec: tests/indefinite-article.test.ts.
 *
 * A leading all-caps word (NDA, MHT-CET, UPSC) is read letter by letter, so
 * what counts is how its first LETTER is said: A, E, F, H, I, L, M, N, O, R, S
 * and X start with a vowel sound ("an NDA"), the rest do not ("a CDS", "a
 * UPSC"). Acronyms said as a word are listed in SAID_AS_WORD and go by their
 * first letter like ordinary words.
 */
const VOWEL_SOUND_LETTERS = new Set("AEFHILMNORSX");
const SAID_AS_WORD = new Set(["NEET"]);

export function withArticle(name: string): string {
  const first = name.trim().split(/[\s-]/)[0] ?? "";
  const isAcronym = first.length >= 2 && first === first.toUpperCase() && /^[A-Z]+$/.test(first);
  const initial = first.charAt(0).toUpperCase();
  const vowelSound =
    isAcronym && !SAID_AS_WORD.has(first)
      ? VOWEL_SOUND_LETTERS.has(initial)
      : "AEIOU".includes(initial);
  return `${vowelSound ? "an" : "a"} ${name}`;
}
