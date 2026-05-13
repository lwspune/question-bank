/**
 * Truncate text to at most `maxLen` characters, retreating to a safe spot
 * if the cut would land inside a LaTeX math delimiter pair. Appends an
 * ellipsis when truncation actually happens.
 *
 * Recognises (in delimiter-precedence order):
 *   - \[ … \]
 *   - $$ … $$
 *   - \( … \)
 *   - $ … $
 *
 * Used by the cart preview list so snippets render correctly via
 * KatexRenderer — half-open `\(…` would either misrender or fall through
 * as raw LaTeX.
 */
export function safeSnippet(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;

  // First scan the FULL text and record every math zone [start, end).
  const zones = findMathZones(text);

  // Find the largest cut <= maxLen that does NOT fall inside any zone.
  // We retreat to the zone's start if the proposed cut lands inside it.
  let cut = maxLen;
  for (const z of zones) {
    if (z.start < cut && cut < z.end) {
      cut = z.start;
      break;
    }
  }

  // Trim trailing whitespace and any partial backslash escape that was
  // cut off (e.g. landed on the `\` of `\(`).
  let body = text.slice(0, cut).trimEnd();
  body = body.replace(/\\$/, "");

  if (body.length === 0) {
    // Pathological case (e.g. maxLen lands before first zone but text
    // starts with whitespace). Fall back to the empty string + ellipsis.
    return "…";
  }
  return body + "…";
}

type Zone = { start: number; end: number };

function findMathZones(text: string): Zone[] {
  const zones: Zone[] = [];
  let i = 0;
  while (i < text.length) {
    // \[ … \]
    if (text[i] === "\\" && text[i + 1] === "[") {
      const close = text.indexOf("\\]", i + 2);
      if (close === -1) break;
      zones.push({ start: i, end: close + 2 });
      i = close + 2;
      continue;
    }
    // $$ … $$
    if (text[i] === "$" && text[i + 1] === "$") {
      const close = text.indexOf("$$", i + 2);
      if (close === -1) break;
      zones.push({ start: i, end: close + 2 });
      i = close + 2;
      continue;
    }
    // \( … \)
    if (text[i] === "\\" && text[i + 1] === "(") {
      const close = text.indexOf("\\)", i + 2);
      if (close === -1) break;
      zones.push({ start: i, end: close + 2 });
      i = close + 2;
      continue;
    }
    // $ … $  (single dollars — must not match the $$ already handled)
    if (text[i] === "$") {
      const close = text.indexOf("$", i + 1);
      if (close === -1) break;
      zones.push({ start: i, end: close + 1 });
      i = close + 1;
      continue;
    }
    i++;
  }
  return zones;
}
