/**
 * Whether the crumb at `index` (0 = first after Home) is hidden on a phone.
 *
 * A phone shows Home and the parent only: the crumb a student taps to go up a
 * level. The current page is named by the heading below, and a full trail
 * wrapped to two or three lines on a phone. A one-crumb trail keeps its crumb.
 * Hidden crumbs stay in the HTML; Breadcrumbs hides them with CSS below `sm`.
 * Spec: tests/breadcrumb-phone.test.ts.
 */
export function crumbHiddenOnPhone(index: number, count: number): boolean {
  if (count <= 1) return false;
  return index !== count - 2;
}
