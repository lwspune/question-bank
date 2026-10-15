/**
 * The competitor analysis, written as data (2026-10-15, owner's request).
 * /dashboard/competitors renders it.
 *
 * One AUDIENCE (a group of students, e.g. Maharashtra 12th science) has its
 * own competitors, a fixed feature checklist marked for each competitor and for
 * us, and a shortlist of ideas ranked by `ideaScore`. Like the growth registry,
 * it changes by commit: a re-check is an edit with a new `checkedOn`.
 *
 * The rules in `validateAudience` are what keep it honest: a "yes" about a
 * competitor needs a link, a "have" about us needs a route, and "unknown" is a
 * real answer (better than a guess). Pure: no React, no DB.
 * Spec: tests/competitors-registry.test.ts.
 */

/** What we know about a competitor on one feature. */
export type Mark = "yes" | "partial" | "no" | "unknown";

/**
 * Where we stand. `hidden` = we have it but students do not find it (they ask
 * for it), so the fix is pointing them to it, not building it again.
 */
export type OurStatus = "have" | "hidden" | "partial" | "missing";

export type FeatureGroup = "content" | "practice" | "feedback" | "help" | "access";

export const FEATURE_GROUPS: { id: FeatureGroup; label: string }[] = [
  { id: "content", label: "Content" },
  { id: "practice", label: "Practice" },
  { id: "feedback", label: "Feedback" },
  { id: "help", label: "Help" },
  { id: "access", label: "Access" },
];

export type Competitor = {
  id: string;
  name: string;
  url: string;
  kind: "app" | "coaching" | "content-site" | "books";
  /** What it costs, as found, with the source in `summary` or a mark. */
  price: string;
  summary: string;
};

export type CompetitorMark = {
  mark: Mark;
  /** Required for yes and partial: the page that shows it. */
  evidence?: string;
  note?: string;
};

export type Feature = {
  id: string;
  group: FeatureGroup;
  name: string;
  ours: OurStatus;
  /** The route (or routes) where we have it. Required unless `missing`. */
  oursWhere?: string;
  oursNote?: string;
  /** One entry per competitor id. */
  marks: Record<string, CompetitorMark>;
};

export type IdeaStatus = "proposed" | "planned" | "building" | "shipped" | "declined";

export type Idea = {
  id: string;
  title: string;
  featureIds: string[];
  /** 1..5: how many students want it, from the evidence below. */
  demand: number;
  /** 1..5: how well it fits what we already are and have. */
  fit: number;
  /** 1..5: build cost (1 = a day, 5 = months or a new team). */
  cost: number;
  why: string;
  /** What shows students want it: rival features, what they type to V, searches. */
  demandEvidence: string[];
  next: string;
  status: IdeaStatus;
};

export type DecidedAgainst = { featureId: string; reason: string };

export type Audience = {
  id: string;
  name: string;
  /** Exam slugs from EXAM_REGISTRY. */
  exams: string[];
  whyPicked: string;
  /** ISO day the competitor facts were last read. */
  checkedOn: string;
  competitors: Competitor[];
  features: Feature[];
  ideas: Idea[];
  decidedAgainst: DecidedAgainst[];
  /** What the comparison taught us, a sentence each. */
  takeaways: string[];
  /** Checks that need a person (a blocked site, ChatGPT, app reviews). */
  toCheckByHand: string[];
};

/**
 * A product outside every audience we compare (other exams, other countries)
 * with something worth borrowing. Kept out of the feature table on purpose: a
 * column of "no"s for exams it never covered would say nothing.
 */
export type WatchItem = {
  id: string;
  name: string;
  url: string;
  /** What it covers, in a few words. */
  covers: string;
  whyNotCompared: string;
  /** What we could borrow, a sentence each. */
  lessons: string[];
  checkedOn: string;
};

export function ideaScore(i: Idea): number {
  return (i.demand * i.fit) / i.cost;
}

const CLOSED: IdeaStatus[] = ["shipped", "declined"];

/** Open ideas first, highest score first, ties by id. Returns a new array. */
export function rankIdeas(ideas: Idea[]): Idea[] {
  return [...ideas].sort((a, b) => {
    const closed = Number(CLOSED.includes(a.status)) - Number(CLOSED.includes(b.status));
    if (closed !== 0) return closed;
    const score = ideaScore(b) - ideaScore(a);
    if (score !== 0) return score;
    return a.id.localeCompare(b.id);
  });
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function duplicates(ids: string[]): string[] {
  const seen = new Set<string>();
  const dup = new Set<string>();
  for (const id of ids) (seen.has(id) ? dup : seen).add(id);
  return [...dup];
}

/** Every rule the data breaks, one line each. Empty = valid. */
export function validateAudience(a: Audience): string[] {
  const problems: string[] = [];
  if (!ISO_DATE.test(a.checkedOn)) problems.push(`${a.id}: checkedOn "${a.checkedOn}" is not YYYY-MM-DD`);

  const competitorIds = a.competitors.map((c) => c.id);
  const featureIds = a.features.map((f) => f.id);
  for (const [what, ids] of [
    ["competitor", competitorIds],
    ["feature", featureIds],
    ["idea", a.ideas.map((i) => i.id)],
  ] as const) {
    for (const id of duplicates([...ids])) problems.push(`${a.id}: duplicate ${what} id ${id}`);
  }

  for (const c of a.competitors) {
    if (!c.url.startsWith("https://")) problems.push(`competitor ${c.id}: url must be https`);
  }

  for (const f of a.features) {
    if (f.ours !== "missing" && !f.oursWhere) {
      problems.push(`feature ${f.id}: ours is "${f.ours}" but says nowhere where (oursWhere)`);
    }
    for (const cid of competitorIds) {
      if (!f.marks[cid]) problems.push(`feature ${f.id}: no mark for competitor ${cid}`);
    }
    for (const [cid, m] of Object.entries(f.marks)) {
      if (!competitorIds.includes(cid)) problems.push(`feature ${f.id}: mark for unlisted competitor ${cid}`);
      if ((m.mark === "yes" || m.mark === "partial") && !m.evidence) {
        problems.push(`feature ${f.id} / ${cid}: "${m.mark}" needs a link (evidence)`);
      }
      if (m.evidence && !m.evidence.startsWith("https://")) {
        problems.push(`feature ${f.id} / ${cid}: evidence must be an https link`);
      }
    }
  }

  const against = new Set(a.decidedAgainst.map((d) => d.featureId));
  for (const d of a.decidedAgainst) {
    if (!featureIds.includes(d.featureId)) problems.push(`decided against: unknown feature ${d.featureId}`);
  }

  for (const i of a.ideas) {
    for (const fid of i.featureIds) {
      if (!featureIds.includes(fid)) problems.push(`idea ${i.id}: unknown feature ${fid}`);
      if (against.has(fid)) problems.push(`idea ${i.id}: feature ${fid} is decided against`);
    }
    for (const k of ["demand", "fit", "cost"] as const) {
      const v = i[k];
      if (!Number.isInteger(v) || v < 1 || v > 5) problems.push(`idea ${i.id}: ${k} must be a whole number 1..5`);
    }
    if (i.demandEvidence.length === 0) problems.push(`idea ${i.id}: no demand evidence`);
  }

  return problems;
}

/** Every rule the watch list breaks, one line each. Empty = valid. */
export function validateWatchList(items: WatchItem[]): string[] {
  const problems: string[] = [];
  for (const id of duplicates(items.map((w) => w.id))) problems.push(`watch list: duplicate id ${id}`);
  for (const w of items) {
    if (!w.url.startsWith("https://")) problems.push(`watch ${w.id}: url must be https`);
    if (w.lessons.length === 0) problems.push(`watch ${w.id}: needs at least one lesson`);
    if (!ISO_DATE.test(w.checkedOn)) problems.push(`watch ${w.id}: checkedOn "${w.checkedOn}" is not YYYY-MM-DD`);
  }
  return problems;
}
