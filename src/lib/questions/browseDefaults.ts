/**
 * Decide whether a bare `/browse` (no `examId` in the URL) should scope itself
 * to the active-exam cookie and default the kind filter to "practice".
 *
 * The app is PYQ-first: the global `/browse` default is `kind: "pyq"` across all
 * exams. But a PRACTICE-ONLY exam (Foundation Course, Maharashtra State Board —
 * no PYQ corpus) would then show an empty/irrelevant PYQ list. The header "Bank"
 * tab already emits `/browse?examId=<uuid>` (which the page's URL-examId override
 * handles), but a typed or bookmarked bare `/browse` carries no `examId` — so the
 * practice default never fired for those entry paths. This closes that gap, and
 * ONLY for practice-only cookie exams (a PYQ-first exam cookie leaves bare
 * `/browse` untouched: all exams, PYQ default).
 */
export function shouldScopeToPracticeOnlyCookieExam(input: {
  /** Is `examId` present in the request URL? (URL selection always wins.) */
  urlHasExamId: boolean;
  /** Did the user pin a `kind` in the URL? (Never override an explicit choice.) */
  urlHasKind: boolean;
  /** Is the exam named by the `qb_exam` cookie a practice-only exam? */
  cookieExamIsPracticeOnly: boolean;
}): boolean {
  return (
    !input.urlHasExamId && !input.urlHasKind && input.cookieExamIsPracticeOnly
  );
}
