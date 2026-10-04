/**
 * Whether the chat launcher should be tucked away after a scroll, on phones
 * (UX_ACTION_PLAN.md A7). Pure, so the rule is tested apart from the widget.
 *
 * Hide on a real scroll down once past the top of the page; show on any real
 * scroll up, and always near the top. Movements under JITTER px change
 * nothing, so momentum scrolling and address-bar resizes do not flicker it.
 */
const TOP = 120;
const JITTER = 8;

export function launcherHiddenAfterScroll({
  prevY,
  y,
  hidden,
}: {
  prevY: number;
  y: number;
  hidden: boolean;
}): boolean {
  if (y <= TOP) return false;
  const delta = y - prevY;
  if (Math.abs(delta) < JITTER) return hidden;
  return delta > 0;
}
