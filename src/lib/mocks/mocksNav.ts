/**
 * Cross-exam navigation model for /mock, mirroring notesNav.ts. Derived from
 * EXAM_REGISTRY's `hasMocks` flag, so the left-rail exam switcher (All exams ·
 * NDA · NEET …) and the statically pre-rendered per-exam routes stay in sync
 * with the registry — a new exam's mocks surface in nav just by flipping
 * `hasMocks`, no hand-edited nav.
 *
 * Pure (no DB / no React); unit-tested in tests/mocks-nav.test.ts. The mock
 * DATA still comes from the DB (getPublishedMocks); this only shapes the nav.
 */

import { EXAM_REGISTRY, type ExamSlug } from "@/lib/exam/examContext";
import { MOCK_TYPES, mocksOfType, type MockTypeSlug } from "@/lib/mocks/catalogue";
// Type-only: keeps this module pure (no DB import at runtime).
import type { MockListItem } from "@/lib/mocks/query";

export type MockExamNav = {
  slug: ExamSlug;
  /** Short label for the rail, e.g. "NDA". */
  displayName: string;
  /** Canonical exam name from the DB / registry, e.g. "NDA" — used to filter
   *  published mocks for the per-exam page. */
  examName: string;
};

/** Exams that have published mock tests (`hasMocks`), in EXAM_REGISTRY order. */
export function getMockExams(): MockExamNav[] {
  return EXAM_REGISTRY.filter((e) => e.hasMocks === true).map((e) => ({
    slug: e.slug,
    displayName: e.displayName,
    examName: e.examName,
  }));
}

/** One mock exam by slug; null for an unknown slug OR an exam with no mocks. */
export function getMockExam(slug: string): MockExamNav | null {
  const e = EXAM_REGISTRY.find((x) => x.slug === slug && x.hasMocks === true);
  return e ? { slug: e.slug, displayName: e.displayName, examName: e.examName } : null;
}

/**
 * A registry FAMILY with two or more mock exams, shown as ONE rail link and ONE
 * /mock card that opens a family page (/mock/exam/<slug>). MPSC has six mock
 * exams (Prelims + five Mains); listed flat they buried the rest of the rail.
 * A family with a single mock exam stays that exam — a page holding one card
 * would be a detour.
 */
export type MockFamilyNav = {
  /** "mpsc" — the family name lowercased; tested never to collide with an exam slug. */
  slug: string;
  /** "MPSC" — the registry `family`. */
  name: string;
  /** Members by `familyStage` in first-seen registry order; `stage: null` when the family has none. */
  stages: { stage: string | null; members: MockExamNav[] }[];
};

export function getMockFamilies(): MockFamilyNav[] {
  const byFamily = new Map<string, MockFamilyNav>();
  for (const e of EXAM_REGISTRY) {
    if (e.hasMocks !== true || !e.family) continue;
    let fam = byFamily.get(e.family);
    if (!fam) {
      fam = { slug: e.family.toLowerCase(), name: e.family, stages: [] };
      byFamily.set(e.family, fam);
    }
    const stage = e.familyStage ?? null;
    let group = fam.stages.find((s) => s.stage === stage);
    if (!group) {
      group = { stage, members: [] };
      fam.stages.push(group);
    }
    group.members.push({ slug: e.slug, displayName: e.displayName, examName: e.examName });
  }
  return [...byFamily.values()].filter((f) => f.stages.reduce((n, s) => n + s.members.length, 0) >= 2);
}

export function getMockFamily(slug: string): MockFamilyNav | null {
  return getMockFamilies().find((f) => f.slug === slug) ?? null;
}

/** The collapsed family a mock exam belongs to; null for a lone exam. */
export function mockFamilyOf(examSlug: string): MockFamilyNav | null {
  return getMockFamilies().find((f) => f.stages.some((s) => s.members.some((m) => m.slug === examSlug))) ?? null;
}

const familyMembers = (f: MockFamilyNav) => f.stages.flatMap((s) => s.members);

/**
 * Left-rail items for every /mock surface: "All exams", then registry order —
 * a lone exam as itself, a collapsed family as ONE link that stays active on
 * each member's own page (`alsoActive`).
 */
export function mockSideNav(): { href: string; label: string; alsoActive?: string[] }[] {
  const out: { href: string; label: string; alsoActive?: string[] }[] = [{ href: "/mock", label: "All exams" }];
  const seen = new Set<string>();
  for (const e of getMockExams()) {
    const fam = mockFamilyOf(e.slug);
    if (!fam) {
      out.push({ href: `/mock/exam/${e.slug}`, label: e.displayName });
    } else if (!seen.has(fam.slug)) {
      seen.add(fam.slug);
      out.push({
        href: `/mock/exam/${fam.slug}`,
        label: fam.name,
        alsoActive: familyMembers(fam).map((m) => `/mock/exam/${m.slug}`),
      });
    }
  }
  return out;
}

/** Slugs to statically pre-render for /mock/exam/[examSlug] — exams and family pages. */
export function mockExamSlugs(): string[] {
  return [...getMockExams().map((e) => e.slug as string), ...getMockFamilies().map((f) => f.slug)];
}

/**
 * The mock exams as prose, for /mock's indexed <title> + description:
 * "NDA", "NDA and NEET", "NDA, CDS and NEET". "and", not "&": an exam's own
 * name can hold an ampersand ("MPSC Group B & C"). Derived rather than hand-written
 * because the hardcoded "NDA & NEET" copy went stale the moment a third exam
 * shipped — an indexed page naming two exams while serving three. Registry
 * order, so the output is deterministic.
 */
export function mockExamNames(): string {
  // The rail's entries, so a collapsed family is named once ("MPSC").
  const names = mockSideNav().slice(1).map((n) => n.label);
  if (names.length === 0) return "";
  if (names.length === 1) return names[0];
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

/** One exam's card on the /mock picker. Every number is DERIVED from the rows
 *  /mock already fetches, so a new sitting updates the card by itself. */
export type MockExamCard = MockExamNav & {
  /** Published mocks for this exam, ALL types. 0 renders as "coming soon". */
  count: number;
  /**
   * How many of each type, so the card can name them separately ("36 past
   * papers · 27 practice mocks") instead of a single total that hides the
   * difference between the real thing and a simulation of it.
   */
  byType: Record<MockTypeSlug, number>;
  /**
   * Oldest / newest SITTING; both 0 when this exam has published no past paper.
   *
   * PAST PAPERS ONLY. The span is printed beside the exam name as a claim about
   * real sittings, and no other type has one — an assembled paper is built, not
   * sat. Reading a stray year off one would widen a span that says otherwise.
   */
  firstYear: number;
  lastYear: number;
  /** Distinct papers a sitting is made of — NDA 2 (Maths + GAT), CDS/NEET 1. */
  paperCount: number;
};

/**
 * The /mock exam picker's model, in EXAM_REGISTRY order.
 *
 * /mock used to render every published mock as one flat exam -> year -> card
 * list — 63 cards under 29 headings, ~7 screens on desktop and ~11 on mobile,
 * with the exam filter living only in a rail that is a Sheet below `lg`. Its
 * ordering was also an accident: it sorted on newest year and fell through to
 * a localeCompare tiebreak, and since all three exams have a 2026 sitting the
 * tiebreak decided the page. That put CDS (6 attempts) above NDA (252) and
 * disagreed with the rail beside it, which has always been registry order.
 *
 * So this is a picker, matching /notes' index and /guide's picker — /mock was
 * the only cross-exam surface that dumped every leaf. Per-exam listing already
 * lived at /mock/exam/[slug], which until now was linked from nowhere.
 *
 * Rows whose examName is not a mock-exam are IGNORED rather than dropped
 * silently into a void: tests/mocks-registry.test.ts is the standing probe
 * that stops such a row existing, because the flat list used to render
 * whatever the DB returned and a picker cannot.
 */
export function buildMockExamCards(mocks: MockListItem[]): MockExamCard[] {
  return getMockExams().map((exam) => {
    const mine = mocks.filter((m) => m.examName === exam.examName);
    const years = mocksOfType(mine, "past-papers")
      .map((m) => m.pyqYear)
      .filter((y): y is number => typeof y === "number");
    const byType = Object.fromEntries(
      MOCK_TYPES.map((t) => [t.slug, mocksOfType(mine, t.slug).length])
    ) as Record<MockTypeSlug, number>;
    return {
      ...exam,
      count: mine.length,
      byType,
      firstYear: years.length ? Math.min(...years) : 0,
      lastYear: years.length ? Math.max(...years) : 0,
      paperCount: new Set(mine.map((m) => m.paperCode)).size,
    };
  });
}

/** One /mock picker entry: a lone exam, or a collapsed family summing its members. */
export type MockCatalogueEntry =
  | { kind: "exam"; card: MockExamCard }
  | { kind: "family"; family: MockFamilyNav; card: MockExamCard; memberSlugs: ExamSlug[] };

/**
 * The /mock picker in registry order, each collapsed family folded into ONE
 * entry at its first member's position. The family card's numbers are summed /
 * spanned over its members' cards, so they stay derived like every other card.
 */
export function buildMockCatalogueEntries(mocks: MockListItem[]): MockCatalogueEntry[] {
  const cards = buildMockExamCards(mocks);
  const out: MockCatalogueEntry[] = [];
  const seen = new Set<string>();
  for (const card of cards) {
    const fam = mockFamilyOf(card.slug);
    if (!fam) {
      out.push({ kind: "exam", card });
      continue;
    }
    if (seen.has(fam.slug)) continue;
    seen.add(fam.slug);
    const memberSlugs = familyMembers(fam).map((m) => m.slug);
    const mine = cards.filter((c) => memberSlugs.includes(c.slug));
    const firsts = mine.map((c) => c.firstYear).filter((y) => y > 0);
    const lasts = mine.map((c) => c.lastYear).filter((y) => y > 0);
    const byType = Object.fromEntries(
      MOCK_TYPES.map((t) => [t.slug, mine.reduce((n, c) => n + c.byType[t.slug], 0)])
    ) as Record<MockTypeSlug, number>;
    out.push({
      kind: "family",
      family: fam,
      memberSlugs,
      card: {
        slug: card.slug,
        displayName: fam.name,
        examName: fam.name,
        count: mine.reduce((n, c) => n + c.count, 0),
        byType,
        firstYear: firsts.length ? Math.min(...firsts) : 0,
        lastYear: lasts.length ? Math.max(...lasts) : 0,
        paperCount: mine.length,
      },
    });
  }
  return out;
}
