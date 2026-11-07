/**
 * The short label a chapter page's button shows on a phone (2026-11-07):
 * three full-width buttons took three rows above the questions, so on a phone
 * they are compact pills. The full label stays on wider screens.
 *
 * Pure. Spec: tests/chip-label.test.ts.
 */
export function chipLabel(label: string): string {
  const colon = label.indexOf(":");
  if (colon > 0) return label.slice(0, colon); // "Playbook: Cell Biology"
  if (/ strategy$/.test(label)) return "Strategy"; // "NDA Maths strategy"
  if (label === "Concept notes") return "Notes";
  return label;
}
