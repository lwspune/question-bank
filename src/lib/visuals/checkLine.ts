/**
 * Who sees the "Checked: ... Answer key: ..." line under an animated solution
 * (owner, 2026-11-09). It reports our own verification of the animation and
 * repeats the answer, which means nothing to a student, so only staff see it:
 * for a teacher it is the sign that an animation was checked before they use
 * it in class. A check that did not pass is shown to nobody.
 *
 * Display only: the check itself still runs for everyone (checkVisual), so
 * the player never trusts a visual whose check fails.
 *
 * Spec: tests/visuals-check-line.test.ts.
 */
export function showsCheckLine(input: { checkOk: boolean; isStaff: boolean }): boolean {
  return input.checkOk && input.isStaff;
}
