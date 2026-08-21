/**
 * Map a question's taxonomy (exam/subject/chapter/subtopic names) to the
 * strategy-guide playbook page and the /notes subtopic page that explain
 * the question's lever, when those resources exist.
 *
 * Pure function — no DB calls. The lookup tables are built at module load
 * from the editorial PLAYBOOKS arrays and the notes subtopicSlugRegistry.
 *
 * Granularity differs per guide template:
 *   - NDA Maths (Template A): no per-chapter playbook page. Link to overview.
 *   - NDA English (Template B): playbooks are per-subtopic. Match (chapter, subtopic).
 *   - NDA Physics/Chemistry/Biology/Geography: playbooks are per-chapter. Match chapter.
 *
 * Notes coverage is whatever NOTES_CHAPTERS registers — all exams, all
 * subjects (MHT-CET Maths + Chemistry, NDA Maths/Physics/Chemistry/Biology/
 * Geography, JEE Mains Maths). Add a chapter there and its chip appears; there
 * is no per-exam allow-list here to update. Guides are still NDA-only.
 */

import { PLAYBOOKS as NDA_ENGLISH_PLAYBOOKS } from "@/app/guide/nda-english/_data/playbooks";
import { PLAYBOOKS as NDA_PHYSICS_PLAYBOOKS } from "@/app/guide/nda-physics/_data/playbooks";
import { PLAYBOOKS as NDA_CHEMISTRY_PLAYBOOKS } from "@/app/guide/nda-chemistry/_data/playbooks";
import { PLAYBOOKS as NDA_BIOLOGY_PLAYBOOKS } from "@/app/guide/nda-biology/_data/playbooks";
import { PLAYBOOKS as NDA_GEOGRAPHY_PLAYBOOKS } from "@/app/guide/nda-geography/_data/playbooks";
import { PLAYBOOKS as NDA_HISTORY_PLAYBOOKS } from "@/app/guide/nda-history/_data/playbooks";
import { PLAYBOOKS as NDA_POLITY_PLAYBOOKS } from "@/app/guide/nda-polity/_data/playbooks";
import { getSubtopicNotesEntry } from "@/lib/notes/subtopicSlugRegistry";
import { getNotesChapterEntry } from "./notesIndex";
import { getPrincipleName, getConceptName } from "./tagNames";
import type { ResourceTags } from "./getResourceTagsForQuestions";

export type ResourceLink = {
  href: string;
  label: string;
};

export type QuestionResources = {
  guide: ResourceLink | null;
  notes: ResourceLink | null;
};

export type ResourceInput = {
  examName: string;
  subjectName: string;
  chapterName: string;
  subtopicName: string | null;
};

// ─── Lookup tables (built once at module load) ────────────────────────────

type PlaybookEntry = { slug: string; name: string };

function buildChapterMap(
  playbooks: ReadonlyArray<{ slug: string; name: string; chapter: string }>
): Map<string, PlaybookEntry> {
  const map = new Map<string, PlaybookEntry>();
  for (const p of playbooks) {
    map.set(p.chapter, { slug: p.slug, name: p.name });
  }
  return map;
}

function buildSubtopicMap(
  playbooks: ReadonlyArray<{
    slug: string;
    name: string;
    chapter: string;
    subtopics: readonly string[];
  }>
): Map<string, PlaybookEntry> {
  const map = new Map<string, PlaybookEntry>();
  for (const p of playbooks) {
    for (const sub of p.subtopics) {
      map.set(`${p.chapter}::${sub}`, { slug: p.slug, name: p.name });
    }
  }
  return map;
}

// English is the one playbook guide keyed by (chapter, subtopic).
const NDA_ENGLISH_BY_SUBTOPIC = buildSubtopicMap(NDA_ENGLISH_PLAYBOOKS);

/**
 * Chapter-keyed playbook guides. Adding a chapter-keyed subject is now a
 * one-row change here (import its PLAYBOOKS above + append an entry) — no new
 * switch case. Maths (principle override), English (subtopic-keyed) and the
 * single-page landings stay special-cased in resolveGuide.
 */
const CHAPTER_KEYED_GUIDES: ReadonlyArray<{
  subject: string;
  guideSlug: string;
  playbooks: ReadonlyArray<{ slug: string; name: string; chapter: string }>;
}> = [
  { subject: "Physics", guideSlug: "nda-physics", playbooks: NDA_PHYSICS_PLAYBOOKS },
  { subject: "Chemistry", guideSlug: "nda-chemistry", playbooks: NDA_CHEMISTRY_PLAYBOOKS },
  { subject: "Biology", guideSlug: "nda-biology", playbooks: NDA_BIOLOGY_PLAYBOOKS },
  { subject: "Geography", guideSlug: "nda-geography", playbooks: NDA_GEOGRAPHY_PLAYBOOKS },
  { subject: "History", guideSlug: "nda-history", playbooks: NDA_HISTORY_PLAYBOOKS },
  { subject: "Polity", guideSlug: "nda-polity", playbooks: NDA_POLITY_PLAYBOOKS },
];

const CHAPTER_KEYED_BY_SUBJECT = new Map<
  string,
  { guideSlug: string; byChapter: Map<string, PlaybookEntry> }
>(
  CHAPTER_KEYED_GUIDES.map((g) => [
    g.subject,
    { guideSlug: g.guideSlug, byChapter: buildChapterMap(g.playbooks) },
  ])
);

/** Single-page guide landings (no playbooks array) — subject → fixed link. */
const SINGLE_PAGE_GUIDES: Record<string, ResourceLink> = {
  Economics: { href: "/guide/nda-economics", label: "NDA Economics strategy" },
  "Current Affairs": {
    href: "/guide/nda-current-affairs",
    label: "NDA Current Affairs strategy",
  },
};

// ─── Public API ───────────────────────────────────────────────────────────

export function getQuestionResources(
  input: ResourceInput,
  tags?: ResourceTags
): QuestionResources {
  return {
    guide: resolveGuide(input, tags),
    notes: resolveNotes(input, tags),
  };
}

function resolveGuide(
  input: ResourceInput,
  tags?: ResourceTags
): ResourceLink | null {
  if (input.examName !== "NDA") return null;

  // Mathematics (Template A) — no per-chapter playbook page. When the question
  // carries a TOP_PRINCIPLES principle tag, link to that principle's deep-dive; first
  // tag wins, non-TOP_PRINCIPLES slugs fall through to the overview.
  if (input.subjectName === "Mathematics") {
    const principleHit = firstResolvedPrinciple(tags?.principleSlugs);
    if (principleHit) {
      return {
        href: `/guide/nda-maths/principles/${principleHit.slug}`,
        label: `Lever: ${principleHit.name}`,
      };
    }
    return { href: "/guide/nda-maths", label: "NDA Maths strategy" };
  }

  // English (Template B) — playbooks keyed by (chapter, subtopic).
  if (input.subjectName === "English") {
    if (!input.subtopicName) return null;
    const hit = NDA_ENGLISH_BY_SUBTOPIC.get(
      `${input.chapterName}::${input.subtopicName}`
    );
    return hit ? playbookLink("nda-english", hit) : null;
  }

  // Single-page landings (Economics, Current Affairs) — chapter-agnostic.
  const singlePage = SINGLE_PAGE_GUIDES[input.subjectName];
  if (singlePage) return singlePage;

  // Chapter-keyed playbook guides (physics/chemistry/biology/geography/
  // history/polity) — registry lookup.
  const ck = CHAPTER_KEYED_BY_SUBJECT.get(input.subjectName);
  if (ck) {
    const hit = ck.byChapter.get(input.chapterName);
    return hit ? playbookLink(ck.guideSlug, hit) : null;
  }

  return null;
}

function playbookLink(guideSlug: string, entry: PlaybookEntry): ResourceLink {
  return {
    href: `/guide/${guideSlug}/playbooks/${entry.slug}`,
    label: `Playbook: ${entry.name}`,
  };
}

function resolveNotes(
  input: ResourceInput,
  tags?: ResourceTags
): ResourceLink | null {
  // No exam/subject gate. Until 2026-08-21 this was hard-coded to NDA +
  // Mathematics, a leftover from when those were the only notes that existed;
  // it hid the chip for 3,788 questions across MHT-CET Maths + Chemistry, NDA
  // Physics/Chemistry/Biology/Geography and JEE Mains Maths, all of which have
  // shipped notes. Coverage is now decided by the registry alone: a chapter
  // that has notes gets a chip, one that does not returns null.
  if (!input.subtopicName) return null;

  const scope = {
    examName: input.examName,
    subjectName: input.subjectName,
  };
  const chapter = getNotesChapterEntry(scope, input.chapterName);
  if (!chapter) return null;

  // Scoped by chapter too — a subtopic NAME repeats both across exams
  // ("Integration by Parts") and across chapters of one subject ("Physical vs
  // Chemical Changes"), so the bare name does not identify a note.
  const entry = getSubtopicNotesEntry(
    { ...scope, chapterName: input.chapterName },
    input.subtopicName
  );
  if (!entry) return null;

  // Tier 1.5 — concept-tag override: anchor-jump to the specific concept
  // within the subtopic notes page. First tag wins; tags that don't resolve
  // (renamed concept, etc.) fall through to the generic chip.
  const conceptHit = firstResolvedConcept(tags?.conceptTags);
  if (conceptHit) {
    return {
      href: `/notes/${chapter.subjectRoute}/${chapter.chapterSlug}/${conceptHit.subtopicSlug}#${conceptHit.conceptSlug}`,
      label: `Concept: ${conceptHit.name}`,
    };
  }

  return {
    href: `/notes/${chapter.subjectRoute}/${chapter.chapterSlug}/${entry.subtopicSlug}`,
    label: "Concept notes",
  };
}

function firstResolvedPrinciple(
  slugs: string[] | undefined
): { slug: string; name: string } | null {
  if (!slugs || slugs.length === 0) return null;
  for (const slug of slugs) {
    const name = getPrincipleName(slug);
    if (name) return { slug, name };
  }
  return null;
}

function firstResolvedConcept(
  conceptTags: ResourceTags["conceptTags"] | undefined
):
  | { subtopicSlug: string; conceptSlug: string; name: string }
  | null {
  if (!conceptTags || conceptTags.length === 0) return null;
  for (const t of conceptTags) {
    const name = getConceptName(t.subtopicSlug, t.conceptSlug);
    if (name) {
      return {
        subtopicSlug: t.subtopicSlug,
        conceptSlug: t.conceptSlug,
        name,
      };
    }
  }
  return null;
}
