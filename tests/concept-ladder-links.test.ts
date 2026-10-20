import { describe, it, expect } from "vitest";
import { getQuestionResources } from "@/lib/links/questionResources";
import { conceptLadderChapters } from "@/lib/links/conceptLadder";
import { MHTCET_CIRCLE_NOTES } from "@/app/notes/mht-cet-maths/circle/_data";

// The "Learn on Concept Ladder" chip (owner, 2026-10-19): a PYQ links to the Concept Ladder
// lesson that teaches it. Piloted on MHT-CET Circle.
const CL = "https://www.conceptladder.in";
const circle = (subtopicName: string | null) => ({ examName: "MHT-CET", subjectName: "Maths", chapterName: "Circle", subtopicName });
const tagged = (subtopicSlug: string, conceptSlug: string) => ({ principleSlugs: [], conceptTags: [{ subtopicSlug, conceptSlug }] });

const TANGENTS = "Tangents — At a Point, With a Given Slope, From an External Point and Their Loci";
const DISTANCE = "Distance From a Point to a Circle — Greatest, Least, a Line Cutting the Circle and the Segment Area";
const TWO_CIRCLES = "Two Circles — Touching, Common Tangents and Relative Position";
const EQUATION = "Equation of a Circle — Centre-Radius, General, Diameter and Parametric Forms";

describe("the Concept Ladder chip", () => {
  it("links a question's note concept to the lesson that teaches it, in the MHT-CET course", () => {
    const res = getQuestionResources(circle(TANGENTS), tagged("cetcir-tangents", "cetcir-tangent-at-a-point"));
    expect(res.lesson).toEqual({
      href: `${CL}/learn/circle/tangent-at-a-point?course=mht-cet&ref=pyqvault`,
      label: "Learn: Tangent at a point",
    });
  });

  it("falls back to the subtopic when it is one lesson", () => {
    const res = getQuestionResources(circle(TWO_CIRCLES));
    expect(res.lesson?.href).toBe(`${CL}/learn/circle/two-circles?course=mht-cet&ref=pyqvault`);
  });

  it("falls back to the chapter map when the subtopic spans lessons", () => {
    expect(getQuestionResources(circle(EQUATION)).lesson).toEqual({
      href: `${CL}/courses/mht-cet/circle?ref=pyqvault`,
      label: "Learn: Circle",
    });
  });

  it("never guesses a lesson for a note concept Concept Ladder doesn't teach", () => {
    const res = getQuestionResources(circle(DISTANCE), tagged("cetcir-distance-to-a-circle", "cetcir-greatest-and-least-distance"));
    expect(res.lesson?.href).toBe(`${CL}/courses/mht-cet/circle?ref=pyqvault`);
  });

  it("shows no chip outside the pilot", () => {
    expect(getQuestionResources({ ...circle(null), chapterName: "Straight Line" }).lesson).toBeNull();
    expect(getQuestionResources({ ...circle(TANGENTS), examName: "NDA", subjectName: "Mathematics" }).lesson).toBeNull();
  });
});

describe("the Concept Ladder map", () => {
  const notes = Object.values(MHTCET_CIRCLE_NOTES);
  const map = conceptLadderChapters["MHT-CET::Maths::Circle"];

  it("decides every Circle note concept: a lesson, or deliberately none", () => {
    const decided = new Set([...Object.keys(map.byConcept), ...map.noLesson]);
    const concepts = notes.flatMap((n) => n.concepts.map((c) => c.slug));
    expect(concepts.filter((s) => !decided.has(s))).toEqual([]);
    expect([...decided].filter((s) => !concepts.includes(s))).toEqual([]);
  });

  it("names only real subtopics", () => {
    const names = notes.map((n) => n.subtopicName);
    expect(Object.keys(map.bySubtopic).filter((s) => !names.includes(s))).toEqual([]);
  });
});
