import HeaderBar from "@/components/header/HeaderBar";
import { getExamIdMap } from "@/lib/exam/examIdMap";
import { getNotesExamGroups } from "@/lib/notes/notesNav";

/**
 * Site navigation — a thin, CACHEABLE server shell around the client navs.
 *
 * This component is on every page, and it used to resolve the session and read
 * the `qb_exam` cookie during server render. Both are per-request operations, so
 * Next marked every page on the site dynamic: there were literally zero
 * prerendered HTML files on disk, and the `revalidate` settings on 77 notes
 * chapters, 10 guides, the homepage and the question landing pages had never
 * once taken effect. Every page served
 * `Cache-Control: private, no-cache, no-store`.
 *
 * All of that moved into HeaderBar, which runs in the browser and renders both
 * the top header and the phone tab bar. What remains here
 * is the exam-id map — public taxonomy, identical for every visitor, cached — so
 * nothing this component renders depends on WHO is asking. That is what makes a
 * shared cached copy both possible and safe.
 */
export default async function AppHeader() {
  const examIds = await getExamIdMap();
  // Which exams have notes — derived from the static notes registry, identical
  // for every visitor, so it keeps this shell cacheable. Computed here so the
  // registry never enters HeaderBar's client bundle.
  const notesExamSlugs = getNotesExamGroups().map((g) => g.slug);

  // HeaderBar owns the <header> element itself, because it also renders the
  // phone tab bar pinned to the bottom of the viewport — the two are siblings
  // sharing one resolution of the session and the exam cookie.
  return <HeaderBar examIds={examIds} notesExamSlugs={notesExamSlugs} />;
}
