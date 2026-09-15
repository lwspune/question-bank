/**
 * Where the facts come from.
 *
 * The blueprint says HOW MANY questions per chapter and what mix of genres. This
 * says WHAT TO READ to write them, and it is the half that was missing when the
 * Sep-2026 pool was authored.
 *
 * ## Why this file exists at all
 *
 * Nine of that pool's 100 questions — dated Feb-May 2026, the freshest and most
 * on-window material it had — were quarantined before commit and never shipped.
 * Not because they were wrong: because they were SINGLE-SOURCE and nobody
 * cross-checked them. The exclusion note in `scripts/practice-paper/config.ts`
 * says so in as many words, and names PIB / MEA / ISRO / padmaawards.gov.in as
 * what it wanted checked against. So sourcing, not the window, is what actually
 * bound that pool, and a brief that does not name sources leaves the author to
 * reinvent the roster each time.
 *
 * ## A MODEL'S OWN RECALL IS NOT A SOURCE
 *
 * The strongest hypothesis for the Sep-2026 pool's 2025 skew (53 of 88 rows
 * newest-2025, only 11 touching 2026) is that it was written from a model's
 * memory. Model recall is densest well BEFORE its cutoff and thins sharply
 * toward it, which produces exactly that shape — confident, well-formed,
 * systematically 12-18 months stale, and impossible to spot by reading the
 * questions, because a stale question reads exactly like a fresh one.
 *
 * Every dated question needs a URL fetched at authoring time. This is not a
 * quality nicety; it is the only thing that distinguishes the two.
 *
 * ## The two lanes need DIFFERENT sources
 *
 * A news feed cannot answer "what is REJUPAVE?" or "what does Seva Bhoj Yojana
 * reimburse?" — the evergreen genre (40% of seats) lives on scheme and
 * institution landing pages, not in press releases. Authoring both lanes off a
 * news sweep is a large part of why the Sep-2026 pool came in at 19% evergreen.
 *
 * ## Confidence
 *
 * Domains marked `verify: true` are ones this file is NOT certain about and that
 * should be confirmed on first use rather than trusted. The rest are long-lived
 * Government of India properties.
 */

export interface Source {
  name: string;
  url: string;
  why: string;
  /** Not certain this domain is current — confirm before relying on it. */
  verify?: boolean;
}

/** Sweep these for every pool, whatever the chapter. */
export const SPINE: Source[] = [
  {
    name: "PIB — Press Information Bureau",
    url: "https://pib.gov.in",
    why:
      "The spine. Ministry-wise, date-filterable release archive. UPSC Current-Affairs " +
      "questions are overwhelmingly PIB-shaped, because PIB is what the paper-setters read " +
      "too. Sweep it ministry by ministry across the window rather than by keyword.",
  },
  {
    name: "PRS Legislative Research",
    url: "https://prsindia.org",
    why:
      "Which Bills actually PASSED, versus which were merely introduced — a distinction news " +
      "coverage routinely blurs and a statement-format question turns on.",
  },
];

/** Dated lane: what happened, and when. */
export const DATED_BY_CHAPTER: Record<string, Source[]> = {
  "International Affairs and Relations": [
    {
      name: "MEA — Ministry of External Affairs",
      url: "https://mea.gov.in",
      why:
        "Joint statements, state visits, bilateral agreements, treaty texts. This is the " +
        "largest chapter by PYQ share (18%) and the one the Sep-2026 pool most under-filled.",
    },
  ],
  "Defence and Military Exercises": [
    {
      name: "Ministry of Defence / PIB Defence Wing",
      url: "https://mod.gov.in",
      why:
        "Exercise names and editions, ship and submarine commissionings, procurement " +
        "contracts. Note the PYQ pattern: across five years, 13 military-exercise questions " +
        "named 13 DIFFERENT exercises — breadth beats depth here.",
    },
  ],
  "Science and Technology": [
    { name: "ISRO", url: "https://www.isro.gov.in", why: "Missions, launch vehicles, satellites." },
    { name: "DRDO", url: "https://www.drdo.gov.in", why: "Missile and system trials." },
    {
      name: "DST — Department of Science & Technology",
      url: "https://dst.gov.in",
      why: "Fellowships and programmes. The Ramanujan Fellowship NDA II 2026 asked about lives here.",
    },
  ],
  "Government Schemes, Policy and Governance": [
    {
      name: "myScheme",
      url: "https://www.myscheme.gov.in",
      why: "Government scheme directory — the fastest way to enumerate what launched in the window.",
    },
    { name: "NITI Aayog", url: "https://www.niti.gov.in", why: "Policy documents, indices, reports." },
  ],
  "Environment, Ecology and Energy": [
    {
      name: "Ramsar Sites Information Service",
      url: "https://rsis.ramsar.org",
      why: "The authoritative site count and the newest designations — a recurring question shape.",
    },
    {
      name: "MoEFCC",
      url: "https://moef.gov.in",
      why: "Conservation programmes, species and habitat notifications.",
      verify: true,
    },
  ],
  "Awards, Honours, Books and Culture": [
    { name: "Padma Awards", url: "https://padmaawards.gov.in", why: "The official Padma list." },
    {
      name: "UNESCO World Heritage Centre",
      url: "https://whc.unesco.org",
      why: "Inscriptions and the running India count, including Intangible Cultural Heritage.",
    },
    {
      name: "Sahitya Akademi",
      url: "https://sahitya-akademi.gov.in",
      why: "Literary awards. For Jnanpith use Bharatiya Jnanpith's own announcement.",
      verify: true,
    },
  ],
  Sports: [
    {
      name: "Ministry of Youth Affairs & Sports",
      url: "https://yas.gov.in",
      why: "Khel Ratna and Arjuna lists, Khelo India editions, national sports policy.",
    },
  ],
  "National Events, Persons and India General Knowledge": [
    {
      name: "RBI",
      url: "https://www.rbi.org.in",
      why: "Monetary policy, financial-sector firsts.",
    },
    {
      name: "India.gov.in / Economic Survey and Budget documents",
      url: "https://www.india.gov.in",
      why: "Ranks, indices and national-level figures the paper likes to quote.",
    },
  ],
};

/** Evergreen lane: standing facts, which are NOT on a news feed. */
export const EVERGREEN_LANE: Source[] = [
  {
    name: "The scheme's own ministry landing page",
    url: "(per scheme)",
    why:
      "What it reimburses, which ministry runs it, whether it is Central Sector or Centrally " +
      "Sponsored. NDA II 2026's River Basin Management question turns on exactly that " +
      "distinction, and no news article carries it.",
  },
  {
    name: "myScheme",
    url: "https://www.myscheme.gov.in",
    why: "Structured scheme records — objectives, ministry, eligibility. Ideal for this lane.",
  },
  {
    name: "The institution's or alliance's own About page",
    url: "(per body)",
    why:
      "Membership lists, founding year, secretariat location. NDA II 2026 asked which country " +
      "is NOT a member of the International Big Cat Alliance — a membership list, not news.",
  },
  {
    name: "PIB explainers and background notes",
    url: "https://pib.gov.in",
    why: "PIB publishes standing background pieces as well as event releases; both lanes use it.",
  },
];

/** The rule that would have unblocked the nine quarantined questions. */
export const VERIFICATION_RULE = [
  "TWO independent sources per question, at least one of them PRIMARY (a ministry, an agency, " +
    "or the body itself). A news outlet reporting a press release is the same source twice.",
  "Record the URL and the access date on the question. A fact with no recorded source cannot " +
    "be re-checked later, and the Sep-2026 pool lost nine of its best questions to exactly that.",
  "Prefer a figure the source states outright over one derived from it — 'India has 99 Ramsar " +
    "sites' is checkable; 'India added 6 sites' invites an arithmetic error.",
  "For anything inside the last six months, expect to be corrected. Re-check before each reuse " +
    "rather than treating the pool as settled.",
];
