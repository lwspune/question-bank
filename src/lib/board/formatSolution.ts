/**
 * Put each sentence of a model answer on its own line for the /board reader.
 *
 * Solutions are authored as one run-on paragraph ("Here … . Differentiate … , we
 * get … . Therefore … . Hence … ."), which reads as a cluttered wall in a
 * derivation. This breaks at sentence boundaries so each step lands on its own
 * line. PURE — the KatexRenderer renders the injected "\n" as a line break (its
 * text segments use white-space: pre-wrap).
 *
 * A single left-to-right scan (no regex, no placeholders):
 *  - Math zones (\(...\), \[...\]) are copied through VERBATIM, so a period or
 *    decimal inside math (e.g. \(x = 1.5\)) is never a break candidate.
 *  - A break happens only at a sentence-ender (. ? !) FOLLOWED BY whitespace and
 *    then a capital letter, an open paren, or the start of a math zone — so an
 *    abbreviation like "w. r. t. x" (lowercase next) or "3.5" (no space / digit)
 *    stays intact.
 */
function isMathOpen(text: string, i: number): boolean {
  return text[i] === "\\" && (text[i + 1] === "(" || text[i + 1] === "[");
}

export function breakSentences(text: string | null | undefined): string {
  if (!text) return "";
  const n = text.length;
  let out = "";
  let i = 0;

  while (i < n) {
    // Copy a whole math zone verbatim.
    if (isMathOpen(text, i)) {
      const close = text[i + 1] === "(" ? "\\)" : "\\]";
      const end = text.indexOf(close, i + 2);
      const stop = end === -1 ? n : end + 2;
      out += text.slice(i, stop);
      i = stop;
      continue;
    }

    const ch = text[i];
    if (ch === "." || ch === "?" || ch === "!") {
      // Look past the whitespace run to the next sentence's first char.
      let j = i + 1;
      while (j < n && /\s/.test(text[j])) j++;
      const hadSpace = j > i + 1;
      const startsSentence =
        j < n && (/[A-Z(]/.test(text[j]) || isMathOpen(text, j));
      if (hadSpace && startsSentence) {
        out += ch + "\n";
        i = j;
        continue;
      }
    }

    out += ch;
    i++;
  }

  return out;
}
