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
 * Notes coverage today: NDA Maths Statistics + Vectors only. Other subjects
 * fall back to null. Add a new chapter by extending NDA_MATHS_NOTES_CHAPTERS.
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

const NDA_ENGLISH_BY_SUBTOPIC = buildSubtopicMap(NDA_ENGLISH_PLAYBOOKS);
const NDA_PHYSICS_BY_CHAPTER = buildChapterMap(NDA_PHYSICS_PLAYBOOKS);
const NDA_CHEMISTRY_BY_CHAPTER = buildChapterMap(NDA_CHEMISTRY_PLAYBOOKS);
const NDA_BIOLOGY_BY_CHAPTER = buildChapterMap(NDA_BIOLOGY_PLAYBOOKS);
const NDA_GEOGRAPHY_BY_CHAPTER = buildChapterMap(NDA_GEOGRAPHY_PLAYBOOKS);
const NDA_HISTORY_BY_CHAPTER = buildChapterMap(NDA_HISTORY_PLAYBOOKS);
const NDA_POLITY_BY_CHAPTER = buildChapterMap(NDA_POLITY_PLAYBOOKS);

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

  switch (input.subjectName) {
    case "Mathematics": {
      // Tier 1.5 — when this question is tagged with a TOP_11 principle,
      // link to the principle's deep-dive page instead of the generic
      // overview. First tag wins; non-TOP_11 slugs fall through.
      const principleHit = firstResolvedPrinciple(tags?.principleSlugs);
      if (principleHit) {
        return {
          href: `/guide/nda-maths/principles/${principleHit.slug}`,
          label: `Lever: ${principleHit.name}`,
        };
      }
      // Template A — no per-chapter playbook page. Link to the overview.
      return {
        href: "/guide/nda-maths",
        label: "NDA Maths strategy",
      };
    }

    case "English": {
      if (!input.subtopicName) return null;
      const key = `${input.chapterName}::${input.subtopicName}`;
      const hit = NDA_ENGLISH_BY_SUBTOPIC.get(key);
      if (!hit) return null;
      return playbookLink("nda-english", hit);
    }

    case "Physics":
      return chapterPlaybookLink("nda-physics", input.chapterName, NDA_PHYSICS_BY_CHAPTER);

    case "Chemistry":
      return chapterPlaybookLink("nda-chemistry", input.chapterName, NDA_CHEMISTRY_BY_CHAPTER);

    case "Biology":
      return chapterPlaybookLink("nda-biology", input.chapterName, NDA_BIOLOGY_BY_CHAPTER);

    case "Geography":
      return chapterPlaybookLink("nda-geography", input.chapterName, NDA_GEOGRAPHY_BY_CHAPTER);

    case "History":
      return chapterPlaybookLink("nda-history", input.chapterName, NDA_HISTORY_BY_CHAPTER);

    case "Polity":
      return chapterPlaybookLink("nda-polity", input.chapterName, NDA_POLITY_BY_CHAPTER);

    default:
      // Economics, Current Affairs — no guide yet.
      return null;
  }
}

function chapterPlaybookLink(
  guideSlug: string,
  chapterName: string,
  lookup: Map<string, PlaybookEntry>
): ResourceLink | null {
  const hit = lookup.get(chapterName);
  if (!hit) return null;
  return playbookLink(guideSlug, hit);
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
  if (input.examName !== "NDA") return null;
  if (input.subjectName !== "Mathematics") return null;
  if (!input.subtopicName) return null;

  const chapter = getNotesChapterEntry(input.chapterName);
  if (!chapter) return null;

  const entry = getSubtopicNotesEntry(input.subtopicName);
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
