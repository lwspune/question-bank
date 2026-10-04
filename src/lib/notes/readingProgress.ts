/**
 * Read-outs for a long notes topic page: how far down the reader is, and which
 * concept they are in. Pure, so the scroll handlers stay trivial.
 * Spec: tests/notes-reading-progress.test.ts.
 */

/** 0 at the top, 1 at the bottom, clamped; a page that cannot scroll is read. */
export function readingProgress(input: {
  scrollY: number;
  scrollHeight: number;
  viewportHeight: number;
}): number {
  const scrollable = input.scrollHeight - input.viewportHeight;
  if (scrollable <= 0) return 1;
  return Math.min(1, Math.max(0, input.scrollY / scrollable));
}

/**
 * The section being read: the last one whose top (viewport-relative, as
 * getBoundingClientRect reports it) has reached the `line`. Before the first
 * section, the first one is current.
 */
export function activeSectionId(
  sections: { id: string; top: number }[],
  line: number
): string | null {
  if (sections.length === 0) return null;
  let current = sections[0].id;
  for (const s of sections) {
    if (s.top <= line) current = s.id;
  }
  return current;
}
