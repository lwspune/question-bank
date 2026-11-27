/**
 * The /learn hub groups its courses by exam (2026-11-27: 27 courses over 10 exams, where it had 3),
 * and each exam's Learn link (EXAM_REGISTRY.learnPath) goes to its course, or to its group on the
 * hub when it has several. The registry is code and the courses are data, so this pins the two
 * together through the generated chapter-link file.
 */
import { describe, expect, it } from "vitest";
import { EXAM_REGISTRY } from "@/lib/exam/examContext";
import { LEARN_BANK_CHAPTERS } from "@/lib/learn/bankLinks.generated";
import { examAnchor, groupCoursesByExam, learnPathFor } from "@/lib/learn/hub";

const c = (exam: string, subject: string) => ({ slug: `${exam}-${subject}`, exam, subject });

describe("groupCoursesByExam", () => {
  it("groups by exam in the registry's order, subjects in Maths, Physics, Chemistry, Biology order", () => {
    const groups = groupCoursesByExam([c("mh-hsc-12", "biology"), c("nda", "maths"), c("mh-hsc-12", "maths"), c("mh-hsc-12", "chemistry"), c("mh-hsc-12", "physics")]);
    const order = (slug: string) => EXAM_REGISTRY.findIndex((e) => e.slug === slug);
    expect(groups.map((g) => g.exam)).toEqual(["nda", "mh-hsc-12"].sort((a, b) => order(a) - order(b)));
    const hsc = groups.find((g) => g.exam === "mh-hsc-12")!;
    expect(hsc.courses.map((x) => x.subject)).toEqual(["maths", "physics", "chemistry", "biology"]);
    expect(hsc.name).toBe(EXAM_REGISTRY.find((e) => e.slug === "mh-hsc-12")!.displayName);
  });

  it("puts an exam the registry does not know last, rather than dropping it", () => {
    const groups = groupCoursesByExam([c("zz-unknown", "maths"), c("nda", "maths")]);
    expect(groups.map((g) => g.exam)).toEqual(["nda", "zz-unknown"]);
  });
});

describe("learnPathFor", () => {
  it("one course: the course itself; several: the exam's group on the hub; none: nothing", () => {
    expect(learnPathFor("mh-sb-9", ["mh-sb-9-maths"])).toBe("/learn/mh-sb-9-maths");
    expect(learnPathFor("neet", ["neet-physics", "neet-chemistry"])).toBe(`/learn#${examAnchor("neet")}`);
    expect(learnPathFor("cds", [])).toBeUndefined();
  });
});

describe("EXAM_REGISTRY.learnPath matches the imported courses", () => {
  const byExam = new Map<string, Set<string>>();
  for (const key of Object.keys(LEARN_BANK_CHAPTERS)) {
    const course = key.split("/")[0];
    const exam = course.slice(0, course.lastIndexOf("-"));
    if (!byExam.has(exam)) byExam.set(exam, new Set());
    byExam.get(exam)!.add(course);
  }

  it("every exam with a course links to it, and no other exam claims one", () => {
    for (const e of EXAM_REGISTRY) expect(e.learnPath, e.slug).toBe(learnPathFor(e.slug, [...(byExam.get(e.slug) ?? [])]));
    expect(byExam.size).toBeGreaterThanOrEqual(10);
  });
});
