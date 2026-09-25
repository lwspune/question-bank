/**
 * The phone navigation: five labelled tabs, identical for every visitor.
 *
 * WHY IT EXISTS. Below `sm` (640px — every phone in portrait) the primary nav
 * hides its labels, so a phone got a row of bare icons: Bank as a compass,
 * three near-identical book glyphs for Guides/Board/Books, and the brand mark
 * using the SAME `BookOpen` icon as the Guides tab. Worse, the row grew with
 * permissions — a superadmin who is also org staff reached ten tap targets in
 * 360px. PrimaryNav's own comment had predicted that as the width to watch.
 *
 * WHY IT IS ROLE-INDEPENDENT. Papers (org staff) and Books (superadmin) are
 * deliberately absent and live in the account menu below `sm` instead. That is
 * what makes the bar a FIXED five: the crush above was caused by a nav whose
 * shape moved with permissions, and a bar that cannot change shape cannot
 * reproduce it. It also serves the actual split — those two surfaces are
 * desktop work for ten staff, against three hundred students whose dominant
 * activity is sitting mocks. `resolveMobileTabs` therefore takes no session,
 * and a test pins its arity so nobody can quietly add one.
 *
 * WHY FIVE. Both the iOS tab bar and Material's bottom navigation cap at five
 * destinations. At 360px that is 72px per tab, and the longest label ("Guides")
 * sets to roughly 45px, so nothing truncates.
 *
 * The ids are `ActiveTab`'s, not a second vocabulary, so `getActiveTab` can be
 * compared directly — and the hrefs come from the same `resolveExamNav` the
 * desktop nav uses, so the two can never disagree about where a tab goes.
 */
import type { ActiveTab } from "@/lib/exam/examContext";
import type { ExamNav } from "@/lib/exam/examNav";

/** The subset of primary-nav tabs that appears on a phone. */
export type MobileTabId = Extract<
  ActiveTab,
  "bank" | "guides" | "notes" | "mock" | "board"
>;

export type MobileTab = {
  id: MobileTabId;
  label: string;
  href: string;
};

/** Render order, left to right. */
export const MOBILE_TAB_IDS: readonly MobileTabId[] = [
  "bank",
  "guides",
  "notes",
  "mock",
  "board",
] as const;

/** iOS and Material both stop here; past it, touch targets go under ~44px. */
export const MAX_MOBILE_TABS = 5;

/**
 * The five tabs for a visitor's chosen exam (or for no choice at all).
 *
 * One parameter, on purpose — see the role note above.
 */
export function resolveMobileTabs(nav: ExamNav): MobileTab[] {
  return [
    { id: "bank", label: "Bank", href: nav.bankHref },
    { id: "guides", label: "Guides", href: nav.guidesHref },
    { id: "notes", label: "Notes", href: nav.notesHref },
    { id: "mock", label: "Mocks", href: nav.mockHref },
    { id: "board", label: "Board", href: nav.boardHref },
  ];
}

/**
 * Whether a tab owns the current route.
 *
 * `active` comes from `getActiveTab`, which returns null for routes outside the
 * primary surfaces and `"papers"` / `"books"` for the two this bar doesn't
 * carry. All three cases correctly light nothing.
 */
export function isMobileTabActive(
  tab: MobileTabId,
  active: ActiveTab | null
): boolean {
  return active === tab;
}
