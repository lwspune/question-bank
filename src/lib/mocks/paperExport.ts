import type { MockRow } from "./query";

/**
 * A published past paper as a download (2026-10-07): the exact questions of
 * one sitting in printed order, each labelled with its section so the paper
 * and key carry the paper's own headings ("Physics", "Chemistry").
 *
 * Only a whole past paper qualifies. A chapter test or a practice paper is not
 * a paper anyone sat, and selling it as "the 6 April paper" would be false.
 */
export type MockPaperExport =
  | { ok: true; title: string; questionIds: string[]; sectionOf: Map<string, string> }
  | { ok: false; reason: string };

export function mockPaperExport(mock: MockRow): MockPaperExport {
  if (mock.source !== "pyq" || mock.scope !== "full") {
    return { ok: false, reason: "Only a whole past paper can be downloaded." };
  }
  const label = new Map(mock.sections.map((s) => [s.key, s.label]));
  const ordered = mock.questions.slice().sort((a, b) => a.position - b.position);
  return {
    ok: true,
    title: mock.title,
    questionIds: ordered.map((q) => q.questionId),
    sectionOf: new Map(ordered.map((q) => [q.questionId, label.get(q.sectionKey) ?? q.sectionKey])),
  };
}
