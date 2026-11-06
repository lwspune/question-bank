/**
 * What a scoped drill is narrowed to, and every line it says about that.
 *
 * Until 2026-11-06 the one scope was a mock attempt ("Fix these mistakes" on a
 * result page). /me's Weak spots adds a chapter. The page header, the end
 * screen and the empty state all read their words from `scopeCopy`, so the two
 * kinds cannot drift. Pure. Spec: tests/drill-scope-copy.test.ts.
 */
import { drillChapterHref, drillHref } from "./from";

export type DrillScope =
  | { kind: "attempt"; attemptId: string; title: string; mockSlug: string }
  | { kind: "chapter"; chapterId: string; title: string };

export type ScopeCopy = {
  /** Under the page heading: "From <paper or chapter>". */
  from: string;
  /** "from this paper" / "from this chapter", after a count. */
  unit: string;
  /** Another five from the same scope. */
  again: string;
  anotherLabel: string;
  /** Once the scope is empty: the general pool. */
  otherLabel: string;
  emptyTitle: string;
}

export function scopeCopy(scope: DrillScope): ScopeCopy {
  if (scope.kind === "chapter") {
    return {
      from: `From ${scope.title}`,
      unit: "from this chapter",
      again: drillChapterHref("again", scope.chapterId),
      anotherLabel: "Another five from this chapter",
      otherLabel: "Fix mistakes from other chapters",
      emptyTitle: "Nothing left to fix in this chapter",
    };
  }
  return {
    from: `From ${scope.title}`,
    unit: "from this paper",
    again: drillHref("again", scope.attemptId),
    anotherLabel: "Another five from this paper",
    otherLabel: "Fix mistakes from other papers",
    emptyTitle: "Nothing left to fix from this paper",
  };
}
