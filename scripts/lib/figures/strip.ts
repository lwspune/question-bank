/**
 * Remove a figure's prose stand-in once the real figure is attached.
 *
 * Some transcription passes wrote a figure out in words instead of keeping the
 * image ("[Diagram: a pendulum hangs from a single point…]"). Students saw a
 * paragraph where a drawing belongs (Clarity, 2026-10-02), and the owner
 * decided on 2026-10-03 that such rows get their real figure back with the
 * description removed. These helpers do the removal; scripts/figures-fix/
 * attaches the image.
 *
 * Both refuse rather than guess: an unclosed block or an ambiguous fragment
 * throws, because silently truncating a stem is worse than leaving it alone.
 */
const OPEN = /\[(?:figure|diagram|graph|image)\s*:/i;

/** Join the text either side of a removed span, keeping the strongest break. */
function join(left: string, right: string): string {
  const lw = left.match(/\s*$/)![0];
  const rw = right.match(/^\s*/)![0];
  const l = left.slice(0, left.length - lw.length);
  const r = right.slice(rw.length);
  if (!l || !r) return l + r;
  const newlines = ((lw + rw).match(/\n/g) ?? []).length;
  return l + (newlines >= 2 ? "\n\n" : newlines === 1 ? "\n" : " ") + r;
}

/** Remove every `[Figure: …]` / `[Diagram: …]` / `[Graph: …]` / `[Image: …]` block. */
export function stripFigureDescriptions(text: string): string {
  let out = text;
  for (;;) {
    const m = OPEN.exec(out);
    if (!m) return out;
    let depth = 0;
    let end = -1;
    for (let i = m.index; i < out.length; i++) {
      if (out[i] === "[") depth++;
      else if (out[i] === "]" && --depth === 0) {
        end = i;
        break;
      }
    }
    if (end < 0) throw new Error(`unclosed figure description at offset ${m.index}`);
    out = join(out.slice(0, m.index), out.slice(end + 1));
  }
}

/** Remove a fragment that must occur exactly once (for prose not in brackets). */
export function removeExactlyOnce(text: string, fragment: string): string {
  const at = text.indexOf(fragment);
  if (at < 0) throw new Error(`fragment not found: ${fragment.slice(0, 60)}`);
  if (text.indexOf(fragment, at + 1) >= 0) throw new Error(`fragment occurs more than once: ${fragment.slice(0, 60)}`);
  return join(text.slice(0, at), text.slice(at + fragment.length));
}
