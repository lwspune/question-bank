/**
 * The short line that stands in for a chapter's full `intro` wherever there is
 * no room for it: the subject-landing card, the chapter `<meta description>`
 * and the chapter JSON-LD description.
 *
 * One `intro` string used to serve all four surfaces plus the chapter hero it
 * was actually written for. That made the listing card a wall of prose (mean
 * 171 words per intro, max 267 — `/notes/nda-maths` rendered ~5,100 words of it
 * across 30 cards) and shipped a ~1,100-char meta description on all 84 chapter
 * pages. It was also plainly wrong on the card: 18 of 84 intros say "below" or
 * "the subtopics that follow", which on a listing points at the NEXT CHAPTER.
 *
 * The hero still gets the full `intro` — it is the one surface that wants it.
 */

/**
 * The first sentence of `text`, or all of it if there is no terminator.
 *
 * Deliberately naive: it cuts at the first `.`/`!`/`?` FOLLOWED BY WHITESPACE,
 * so a decimal ("2.5 metres") is safe because no space follows its point. An
 * abbreviation that does take a space ("e.g. ") would cut early — that is left
 * uncaught here and caught instead by the 8-word floor in
 * tests/notes-card-blurb.test.ts, which forces an authored `cardBlurb`.
 *
 * A paren-aware variant was tried and REJECTED: across the 84 shipped chapters
 * it changed exactly one result (nda-geography/climatology) and made it worse,
 * 42 words to 75. That chapter authors its own blurb.
 */
export function firstSentence(text: string): string {
  const t = text.trim();
  const m = /[.!?](?=\s)/.exec(t);
  return m ? t.slice(0, m.index + 1) : t;
}

/**
 * The card blurb for a chapter: its authored `cardBlurb` when it has one,
 * otherwise the first sentence of its `intro`. A blank/whitespace `cardBlurb`
 * counts as absent, so a half-finished edit falls back rather than rendering an
 * empty card.
 */
export function chapterCardBlurb(chapter: {
  intro: string;
  cardBlurb?: string;
}): string {
  const authored = chapter.cardBlurb?.trim();
  return authored ? authored : firstSentence(chapter.intro);
}
