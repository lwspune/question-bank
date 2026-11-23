// The NCERT chapters and subtopics a UP subject files onto, read from the NCERT
// ingest's own declarations (scripts/ncert/config.ts CHAPTERS) for the CBSE exam
// of the same class. UP teaches from the NCERT books, so these are its chapters
// too, under the same names.
//
// DECLARED, not live: a subtopic shows in the DB only once a question uses it,
// so reading the live axis would refuse real names nobody has used yet (the
// cbse-12-pyq declaredSubtopics lesson).
import { CHAPTERS, EXAM_ID_CBSE_10, EXAM_ID_CBSE_12 } from "../ncert/config";
import type { UpSubject } from "./config";

export function NCERT_CHAPTERS_FOR(subject: UpSubject): Map<string, string[]> {
  const examId = subject.cls === 10 ? EXAM_ID_CBSE_10 : EXAM_ID_CBSE_12;
  const out = new Map<string, string[]>();
  for (const ch of Object.values(CHAPTERS)) {
    if (ch.examId !== examId || ch.subjectName !== subject.subjectName) continue;
    out.set(ch.chapterName, [...new Set([...(out.get(ch.chapterName) ?? []), ...ch.subtopics])]);
  }
  return out;
}
