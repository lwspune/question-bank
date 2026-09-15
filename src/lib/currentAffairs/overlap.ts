/**
 * Topic overlap between an authored pool and the paper that was actually set.
 *
 * ## A READING LIST, NEVER A VERDICT
 *
 * The same limit `scripts/nda-gat/dedup-check.ts` records for its fuzzy arm, and
 * sharper here. A Current-Affairs stem is mostly scaffold — "Consider the
 * following statements regarding X ... Which of the statements given above
 * is/are correct ?" is shared by a large slice of the corpus — so a plain
 * token-overlap score puts two questions about unrelated subjects near the top
 * on SHAPE alone.
 *
 * Hence `subjectTokens`: the scaffold is stripped and the score runs on the
 * nouns that name the topic. A high score means "read these two"; it does not
 * mean the pool prepared a student for the paper question, which only a human
 * comparing the two answers can say. Do not tighten the threshold to make a
 * report look clean — the Sep-2026 hindsight run found zero real hits and that
 * WAS the finding.
 */

/**
 * The question scaffold, plus ordinary English function words.
 *
 * Roman numeral statement labels are here because "iii" and "viii" survive the
 * minimum-length rule and would otherwise match across every multi-statement
 * question in the corpus.
 */
const STOPWORDS = new Set<string>([
  // statement / option scaffold
  "consider", "following", "statements", "statement", "given", "above", "below",
  "correct", "incorrect", "select", "answer", "answers", "using", "code", "codes",
  "regarding", "respect", "reference", "relation", "related", "which", "what",
  "who", "whom", "whose", "when", "where", "how", "why", "list", "match", "pairs",
  "pair", "arrange", "identify", "chronological", "order", "one", "none", "only",
  "both", "neither", "nor", "all", "any", "some", "each", "every", "true", "false",
  "option", "options", "choose", "mark", "tick",
  // roman numeral labels
  "iii", "iv", "vi", "vii", "viii", "ix", "xi", "xii",
  // function words
  "the", "and", "for", "are", "was", "were", "been", "being", "have", "has", "had",
  "with", "that", "this", "these", "those", "from", "into", "onto", "upon", "over",
  "under", "between", "among", "amongst", "during", "before", "after", "since",
  "until", "about", "against", "through", "throughout", "within", "without",
  "also", "such", "than", "then", "there", "their", "them", "they", "its", "it's",
  "not", "but", "can", "could", "will", "would", "shall", "should", "may", "might",
  "must", "does", "did", "done", "doing", "being", "other", "others", "same",
  "following", "above", "per", "via", "well", "very", "more", "most", "less",
  "least", "many", "much", "few", "several", "various", "including", "include",
  "includes", "known", "called", "named", "termed", "said", "given",
]);

/**
 * Dotted acronyms are collapsed BEFORE tokenising: "U.A.E." splits into three
 * one-letter tokens that the length rule then discards, silently losing the one
 * word that identified the topic.
 */
function collapseAcronyms(s: string): string {
  return s.replace(/\b(?:[A-Za-z]\.){2,}/g, (m) => m.replace(/\./g, ""));
}

/**
 * The words that name the topic: proper nouns, acronyms, years, distinctive
 * terms. Scaffold and function words are gone; order of first appearance is
 * preserved so a report can show them.
 */
export function subjectTokens(text: string): string[] {
  const src = collapseAcronyms(text ?? "").toLowerCase();
  const out: string[] = [];
  const seen = new Set<string>();
  for (const raw of src.split(/[^a-z0-9]+/)) {
    if (!raw) continue;
    // A 4-digit year is a topic word; other short tokens are noise.
    const isYear = /^(19|20)[0-9]{2}$/.test(raw);
    if (!isYear && raw.length < 3) continue;
    if (STOPWORDS.has(raw)) continue;
    if (seen.has(raw)) continue;
    seen.add(raw);
    out.push(raw);
  }
  return out;
}

/** Jaccard over subject tokens. 0 when either side has none — never NaN. */
export function topicSimilarity(a: string, b: string): number {
  const ta = new Set(subjectTokens(a));
  const tb = new Set(subjectTokens(b));
  if (ta.size === 0 || tb.size === 0) return 0;
  let shared = 0;
  for (const t of ta) if (tb.has(t)) shared += 1;
  if (shared === 0) return 0;
  return shared / (ta.size + tb.size - shared);
}

export interface Candidate {
  id: string;
  text: string;
}

export interface Match extends Candidate {
  score: number;
  sharedTokens: string[];
}

/**
 * The best candidates for one question, highest first.
 *
 * Zero-scoring candidates are DROPPED rather than listed at the bottom: padding
 * a list to a fixed length invites a reader to treat the last entry as a weak
 * match when it shares nothing at all.
 */
export function rankMatches(text: string, candidates: Candidate[], limit = 5): Match[] {
  const mine = new Set(subjectTokens(text));
  return candidates
    .map((c) => {
      const theirs = subjectTokens(c.text);
      return {
        ...c,
        score: topicSimilarity(text, c.text),
        sharedTokens: theirs.filter((t) => mine.has(t)),
      };
    })
    .filter((m) => m.score > 0)
    .sort((a, b) => b.score - a.score || a.id.localeCompare(b.id))
    .slice(0, limit);
}
