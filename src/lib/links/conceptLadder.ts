/**
 * The "Learn on Concept Ladder" chip: from a past-year question to the Concept Ladder lesson
 * that teaches it (www.conceptladder.in, the sister app that teaches one concept at a time and
 * links back to these chapter pages). PYQ Vault is where students practise; Concept Ladder is
 * where they learn the idea behind a miss. Piloted on MHT-CET Circle (owner, 2026-10-19).
 *
 * Resolution, most specific first (the backlink wall in CLAUDE.md "Cross-link backlinks"):
 *   1. the question's /notes concept tag, if Concept Ladder teaches that concept;
 *   2. its subtopic, if the whole subtopic is one lesson;
 *   3. the chapter's map on Concept Ladder, which never names the wrong lesson.
 * A chapter not listed here gets no chip.
 *
 * Pure data and lookups, no DB. Lesson slugs are Concept Ladder's; the daily prod-contract
 * test `concept-ladder-urls` fetches every URL this file can produce, so a renamed lesson
 * fails there rather than becoming a dead link.
 */
import type { ResourceTags } from "./getResourceTagsForQuestions";

export const CONCEPT_LADDER = "https://www.conceptladder.in";

/** Tells Concept Ladder's logs where a visit came from. */
const REF = "ref=pyqvault";

type Lesson = { slug: string; title: string };

export type ConceptLadderChapter = {
  /** The Concept Ladder course and its chapter slug, for the chapter map. */
  course: string;
  courseChapter: string;
  /** The pool chapter the lessons live in (`/learn/<chapter>/<lesson>`). */
  chapter: string;
  title: string;
  /** /notes concept slug (globally unique, see CLAUDE.md) to the lesson that teaches it. */
  byConcept: Record<string, Lesson>;
  /** Note concepts Concept Ladder does not teach: these fall through to the subtopic. */
  noLesson: string[];
  /** Bank subtopic name to its lesson, only where the whole subtopic is one lesson. */
  bySubtopic: Record<string, Lesson>;
};

const C04: Lesson = { slug: "circle-from-conditions", title: "Finding a circle from conditions" };
const C07: Lesson = { slug: "condition-of-tangency", title: "Condition of tangency" };
const C08: Lesson = { slug: "tangents-from-a-point", title: "Tangents from a point" };
const C09: Lesson = { slug: "two-circles", title: "Two circles" };

/** Keyed `exam::subject::chapter`, the bank's names. */
export const conceptLadderChapters: Record<string, ConceptLadderChapter> = {
  "MHT-CET::Maths::Circle": {
    course: "mht-cet",
    courseChapter: "circle",
    chapter: "circle",
    title: "Circle",
    byConcept: {
      "cetcir-centre-radius-and-general-form": { slug: "general-equation", title: "The general equation" },
      "cetcir-diameter-form": { slug: "diameter-form", title: "Diameter form" },
      "cetcir-parametric-form": { slug: "parametric-form", title: "Parametric form" },
      "cetcir-concentric-circles": C04,
      "cetcir-touching-a-line-or-an-axis": C04,
      "cetcir-line-cutting-the-circle": C07,
      "cetcir-tangent-at-a-point": { slug: "tangent-at-a-point", title: "Tangent at a point" },
      "cetcir-tangent-with-a-given-slope": C07,
      "cetcir-tangents-from-an-external-point": C08,
      "cetcir-tangent-length-loci-and-the-diameter-tangent-result": C08,
      "cetcir-relative-position-and-common-tangents": C09,
      "cetcir-touching-conditions": C09,
    },
    noLesson: [
      "cetcir-points-on-a-circle-as-roots",
      "cetcir-greatest-and-least-distance",
      "cetcir-segment-area-and-circumcircle-facts",
    ],
    bySubtopic: {
      "Concentric Circles and Circles Touching a Line or an Axis": C04,
      "Two Circles \u2014 Touching, Common Tangents and Relative Position": C09,
    },
  },
};

export type LessonInput = { examName: string; subjectName: string; chapterName: string; subtopicName: string | null };

/** The Concept Ladder link for a question, or null when its chapter isn't linked. */
export function resolveLesson(input: LessonInput, tags?: ResourceTags): { href: string; label: string } | null {
  const ch = conceptLadderChapters[`${input.examName}::${input.subjectName}::${input.chapterName}`];
  if (!ch) return null;
  const lesson =
    tags?.conceptTags.map((t) => ch.byConcept[t.conceptSlug]).find(Boolean) ??
    (input.subtopicName ? ch.bySubtopic[input.subtopicName] : undefined);
  if (lesson) return { href: lessonHref(ch, lesson), label: `Learn: ${lesson.title}` };
  return { href: chapterHref(ch), label: `Learn: ${ch.title}` };
}

function lessonHref(ch: ConceptLadderChapter, lesson: Lesson): string {
  return `${CONCEPT_LADDER}/learn/${ch.chapter}/${lesson.slug}?course=${ch.course}&${REF}`;
}

function chapterHref(ch: ConceptLadderChapter): string {
  return `${CONCEPT_LADDER}/courses/${ch.course}/${ch.courseChapter}?${REF}`;
}

/** Every link the chip can make, with the name the page there should carry, for the prod-contract check. */
export function conceptLadderLinks(): { href: string; title: string }[] {
  const links = Object.values(conceptLadderChapters).flatMap((ch) => [
    { href: chapterHref(ch), title: ch.title },
    ...[...Object.values(ch.byConcept), ...Object.values(ch.bySubtopic)].map((l) => ({ href: lessonHref(ch, l), title: l.title })),
  ]);
  return [...new Map(links.map((l) => [l.href, l])).values()];
}
