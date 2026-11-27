/** Subjects a Learn course can be (learn_courses.subject: migration 0192, chemistry and biology 0293), in the order the hub lists them. */
export const SUBJECT_NAMES: Record<string, string> = { maths: "Maths", physics: "Physics", chemistry: "Chemistry", biology: "Biology" };

export type LearnSubject = "maths" | "physics" | "chemistry" | "biology";

export const isLearnSubject = (s: unknown): s is LearnSubject => typeof s === "string" && Object.hasOwn(SUBJECT_NAMES, s);
