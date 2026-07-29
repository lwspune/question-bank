import HeaderBar from "@/components/header/HeaderBar";
import { getExamIdMap } from "@/lib/exam/examIdMap";

/**
 * Site header — a thin, CACHEABLE server shell around a client bar.
 *
 * This component is on every page, and it used to resolve the session and read
 * the `qb_exam` cookie during server render. Both are per-request operations, so
 * Next marked every page on the site dynamic: there were literally zero
 * prerendered HTML files on disk, and the `revalidate` settings on 77 notes
 * chapters, 10 guides, the homepage and the question landing pages had never
 * once taken effect. Every page served
 * `Cache-Control: private, no-cache, no-store`.
 *
 * All of that moved into HeaderBar, which runs in the browser. What remains here
 * is the exam-id map — public taxonomy, identical for every visitor, cached — so
 * nothing this component renders depends on WHO is asking. That is what makes a
 * shared cached copy both possible and safe.
 */
export default async function AppHeader() {
  const examIds = await getExamIdMap();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <HeaderBar examIds={examIds} />
    </header>
  );
}
