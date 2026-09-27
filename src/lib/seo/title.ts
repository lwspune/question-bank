/**
 * Page titles that fit a search result.
 *
 * Bing's SEO report flags a title over ~70 characters ("Title too long", high
 * severity), and on 2026-09-27 1,198 of the 2,114 live pages were over — the
 * notes titles ran to 166 because each one stacked topic + exam + subject +
 * chapter + page type + brand. Search engines cut the tail, so the words a
 * searcher needs (the exam) were the ones lost.
 *
 * `fitTitle` builds a title from parts in priority order and gives up the
 * least useful ones first:
 *
 *   1. the lead (the page's own topic) — always kept
 *   2. required parts (exam, subject, page type) — always kept
 *   3. optional parts — dropped last-listed first
 *   4. the " · PYQ Vault" brand — dropped before any optional part
 *   5. only when nothing fits: the lead is cut at its first ":" / "—" / "–",
 *      and as a last resort truncated at a word
 *
 * The result is an ABSOLUTE title — use it as `title: { absolute: ... }` so the
 * root layout's "%s · PYQ Vault" template does not add the brand a second time.
 * Pure; spec in tests/seo-title.test.ts.
 */

export const TITLE_MAX = 70;
export const BRAND = "PYQ Vault";

const BRAND_SUFFIX = ` · ${BRAND}`;
const LEAD_SEPARATOR = " — ";
const LEAD_BREAKS = [": ", " — ", " – "];

export type TitlePart = string | { text: string; optional: true };

/** Cut a lead at its first colon or dash; unchanged if there is none. */
export function shortenLead(lead: string): string {
  let cut = -1;
  for (const b of LEAD_BREAKS) {
    const i = lead.indexOf(b);
    if (i > 0 && (cut === -1 || i < cut)) cut = i;
  }
  return cut > 0 ? lead.slice(0, cut).trim() : lead;
}

function compose(lead: string, parts: string[], brand: boolean): string {
  const tail = parts.join(" ");
  return `${lead}${tail ? LEAD_SEPARATOR + tail : ""}${brand ? BRAND_SUFFIX : ""}`;
}

/** Every candidate for one lead, most complete first. */
function candidates(lead: string, parts: TitlePart[]): string[] {
  const clean = parts
    .map((p) => (typeof p === "string" ? { text: p.trim(), optional: false } : { text: p.text.trim(), optional: true }))
    .filter((p) => p.text.length > 0);
  const optionalIdx = clean.map((p, i) => (p.optional ? i : -1)).filter((i) => i >= 0);

  const out: string[] = [];
  // k = how many optional parts are dropped, last-listed first.
  for (let k = 0; k <= optionalIdx.length; k++) {
    const dropped = new Set(optionalIdx.slice(optionalIdx.length - k));
    const kept = clean.filter((_, i) => !dropped.has(i)).map((p) => p.text);
    out.push(compose(lead, kept, true), compose(lead, kept, false));
  }
  return out;
}

export type FitTitleOptions = {
  max?: number;
  /**
   * Cut the lead at its first ":" / "—" when nothing else fits (default true).
   * Turn it off where siblings share a prefix ("Solution of a Triangle — …"),
   * so the words that tell them apart survive; the lead is then trimmed at a
   * word instead.
   */
  shortenLead?: boolean;
};

export function fitTitle(lead: string, parts: TitlePart[] = [], opts: FitTitleOptions = {}): string {
  const max = opts.max ?? TITLE_MAX;
  const leads = [lead.trim()];
  const short = shortenLead(leads[0]);
  if (opts.shortenLead !== false && short !== leads[0]) leads.push(short);

  for (const l of leads) {
    const hit = candidates(l, parts).find((t) => t.length <= max);
    if (hit) return hit;
  }

  // Last resort: the required parts alone don't leave room for the lead, so
  // truncate the (already shortened) lead at a word and mark the cut.
  const bare = candidates(leads[leads.length - 1], parts).pop()!;
  const suffix = bare.slice(leads[leads.length - 1].length);
  const room = max - suffix.length - 1; // 1 for the ellipsis
  const base = leads[leads.length - 1];
  let cut = base.slice(0, Math.max(room, 0));
  const lastSpace = cut.lastIndexOf(" ");
  if (lastSpace > 0 && base[cut.length] !== " ") cut = cut.slice(0, lastSpace);
  cut = cut.replace(/[\s,;:—–-]+$/, "");
  return `${cut}…${suffix}`;
}
