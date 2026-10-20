/**
 * Abusive messages to V (owner, 2026-10-20): one calm line, then silence.
 * Before, V answered "GAND MAARA" with "Koi baat nahi! Batao kis exam..."
 * and kept the conversation going, and anything it says back to abuse can
 * end up in a screenshot.
 *
 * Checked before the AI is called, so a match costs nothing and the model
 * never sees it. Whole words only: "gand" sits inside "Gandhi", "cunt" inside
 * "Scunthorpe". Letters repeated for effect ("fuuuck") are folded first, so
 * every word below is written with its repeats already folded. The model has
 * a backup rule (facts.ts, rule 13) for whatever this list misses.
 *
 * Pure. Spec: tests/chat-abuse.test.ts.
 */

export const ABUSE_REPLY =
  "I'm here to help with your studies. Ask me about a chapter or exam whenever you're ready.";

const WORDS = [
  // English
  "fuck", "fucking", "fucker", "fuckof", "motherfucker", "fck", "fuk", "fuc",
  "bitch", "bastard", "asshole", "cunt", "slut", "whore",
  // Hindi and Marathi in Latin letters
  "chutiya", "chutiye", "chutiyapa", "chutia", "madarchod", "madarchot", "bhenchod", "behenchod", "bhanchod",
  "bhosdi", "bhosdike", "bhosadike", "bhosda", "gand", "gandu", "lund", "lauda", "lavda", "lawda", "loda",
  "randi", "harami", "haramkhor", "zhavadya", "zavadya", "zhav", "aighalya", "bhadwa", "bhadva", "bhikarchot", "lavdya",
  // Devanagari
  "चूतिया", "चुतिया", "चूतिये", "मादरचोद", "भेनचोद", "बहनचोद", "बहेनचोद", "भोसडी", "भोसडीके", "भोसड़ीके",
  "गांड", "गाँड", "गांडू", "लंड", "लौडा", "लवडा", "रंडी", "हरामी", "हरामखोर", "झवाड्या", "भडवा", "भडव्या",
].map(fold);

const WORD_SET: ReadonlySet<string> = new Set(WORDS);

/** Lower case with runs of one letter folded to one ("fuuuck" -> "fuck", "gaand" -> "gand"). */
function fold(word: string): string {
  return word.toLowerCase().replace(/(.)\1+/gu, "$1");
}

export function isAbusive(text: string): boolean {
  const words = text.match(/[\p{L}\p{M}]+/gu) ?? [];
  return words.some((w) => WORD_SET.has(fold(w)));
}

/** The calm line the first time in a conversation; null (no reply at all) once it has been said. */
export function abuseReply(earlierReplies: readonly (string | null)[]): string | null {
  return earlierReplies.includes(ABUSE_REPLY) ? null : ABUSE_REPLY;
}
