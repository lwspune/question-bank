/**
 * The /mock/exam/<exam> hub: papers listed right on the page under type tabs,
 * and the one paper a signed-in student should open next.
 *
 * The hub was a picker of three type cards, so seeing a paper took another
 * tap. It now shows each type's newest few (in the order the type's own page
 * uses) with "Show all" linking to that page, which keeps the long list off
 * the hub: a full list of NDA's 36 papers under 10 year headings is why the
 * picker was introduced. Pure; spec tests/mock-hub.test.ts.
 */
import type { MockAttemptSummary } from "@/lib/mocks/attempted";
import { groupMocksForType, mocksOfType, type MockTypeSlug } from "@/lib/mocks/catalogue";
import type { MockListItem } from "@/lib/mocks/query";

/** Papers shown per tab before "Show all". */
export const HUB_MOCK_ROWS = 5;

/** "NDA 2026 (II) — Paper I — Mathematics" -> "2026 (II) · Paper I · Mathematics". */
export function shortMockTitle(title: string, examName: string): string {
  const s = title.startsWith(`${examName} `) ? title.slice(examName.length + 1) : title;
  return s.replace(/\s+—\s+/g, " · ");
}

/** One type's first rows, in its list page's order, and how many it has in all. */
export function hubRows(
  type: MockTypeSlug,
  mocks: MockListItem[],
  n = HUB_MOCK_ROWS
): { items: MockListItem[]; total: number } {
  const ordered = groupMocksForType(type, mocksOfType(mocks, type)).flatMap((g) => g.items);
  return { items: ordered.slice(0, n), total: ordered.length };
}

export type NextMock = { kind: "resume" | "next"; mockId: string };

/**
 * The card on top of the hub. A mock with time still on its clock comes
 * first, wherever it sits (only its timer is at stake); otherwise the newest
 * past paper never sat. Null once every past paper has been sat: there is
 * nothing obvious to suggest, and the list below still has everything.
 *
 * `pastNewestFirst` and `allIds` are this exam's mock ids in page order.
 */
export function pickNextMock(
  pastNewestFirst: readonly string[],
  allIds: readonly string[],
  summaries: ReadonlyMap<string, MockAttemptSummary>
): NextMock | null {
  const live = allIds.find((id) => summaries.get(id)?.live === true);
  if (live) return { kind: "resume", mockId: live };
  const fresh = pastNewestFirst.find((id) => {
    const s = summaries.get(id);
    return !s || (s.count === 0 && !s.live);
  });
  return fresh ? { kind: "next", mockId: fresh } : null;
}
