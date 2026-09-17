/**
 * Pure model behind the /superadmin tab strip.
 *
 * Kept OUT of the component because /superadmin is an auth-gated `ƒ` route that
 * `next build` never renders, and the strip is additionally gated on a click —
 * so the markup cannot be proven headlessly (CLAUDE.md: "build does NOT exercise
 * a DYNAMIC page's render", and the same blindness covers anything behind an
 * interaction). Everything decidable without a browser lives here and is tested:
 * the tab set, the default, the unread counts, the keyboard map.
 *
 * NO NEW DEPENDENCY: there is no Tabs primitive in `components/ui` and
 * `@radix-ui/react-tabs` is not installed. Three tabs is a roving-tabindex strip
 * and a `hidden` attribute, which does not clear the project's bar for adding a
 * package ("every new dependency must be justified by a clear capability gap").
 */

export type SuperadminTabId = "orgs" | "teachers" | "contact";

export type SuperadminTab = {
  id: SuperadminTabId;
  label: string;
};

/** Left-to-right order of the strip. `orgs` is first AND the default. */
export const SUPERADMIN_TABS: readonly SuperadminTab[] = [
  { id: "orgs", label: "Organisations" },
  { id: "teachers", label: "Teacher requests" },
  { id: "contact", label: "Contact messages" },
] as const;

/**
 * The console always opens the same way.
 *
 * The alternative considered — auto-select whichever queue has unread items —
 * was rejected: a page that opens somewhere different depending on data is
 * disorienting, and the burial problem it would solve is better solved by the
 * count badges, which are visible WITHOUT selecting the tab.
 */
export const DEFAULT_TAB_ID: SuperadminTabId = "orgs";

/**
 * Rows still awaiting triage, for the tab badge.
 *
 * Keys on `"new"` alone rather than a per-queue allow-list because that is the
 * one status the two queues share — contact_messages is new|read|replied|spam,
 * teacher_access_requests is new|contacted|provisioned|declined. Everything else
 * in either vocabulary means "a human has already looked at this".
 */
export function countNew(rows: readonly { status: string }[]): number {
  return rows.reduce((n, r) => (r.status === "new" ? n + 1 : n), 0);
}

/**
 * The APG tabs keyboard map: Left/Right wrap, Home/End jump to the ends.
 *
 * Returns `null` for a key this strip does not own, which the caller MUST treat
 * as "do not preventDefault" — swallowing Tab would trap focus inside the strip.
 */
export function nextTabIndex(current: number, key: string, total: number): number | null {
  if (total <= 0) return null;
  switch (key) {
    case "ArrowRight":
      return (current + 1) % total;
    case "ArrowLeft":
      // `(current - 1) % total` is -1 at index 0 — add `total` before the mod.
      return (current - 1 + total) % total;
    case "Home":
      return 0;
    case "End":
      return total - 1;
    default:
      return null;
  }
}
