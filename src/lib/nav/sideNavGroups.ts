/**
 * Splits a side menu's items into runs under their group heading (2026-11-04).
 * An item with no group stays ungrouped, so a page that passes plain items
 * renders exactly as before. Pure; spec tests/side-nav-groups.test.ts.
 */
export type SideNavGroup = { label: string; href?: string };

export function sideNavSegments<I extends { href: string; group?: SideNavGroup }>(
  items: readonly I[]
): { group: SideNavGroup | null; items: I[] }[] {
  const out: { group: SideNavGroup | null; items: I[] }[] = [];
  for (const item of items) {
    const group = item.group ?? null;
    const last = out[out.length - 1];
    if (last && (last.group?.label ?? null) === (group?.label ?? null)) last.items.push(item);
    else out.push({ group, items: [item] });
  }
  return out;
}
