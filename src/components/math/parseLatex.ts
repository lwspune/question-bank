export type Segment = { type: "text" | "inline" | "block"; content: string };

export function parseLatex(input: string): Segment[] {
  if (!input) return [];

  // Order: block delimiters first so \[...\] beats \(...\) and $$...$$ beats $...$
  // when the regex engine has alternative matches at the same position.
  const pattern =
    /(\\\[[\s\S]+?\\\]|\$\$[\s\S]+?\$\$|\\\([\s\S]+?\\\)|\$[^$\n]+?\$)/g;

  const segments: Segment[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(input)) !== null) {
    if (match.index > lastIndex) {
      segments.push({
        type: "text",
        content: input.slice(lastIndex, match.index),
      });
    }
    const raw = match[0];
    if (raw.startsWith("\\[") || raw.startsWith("$$")) {
      segments.push({ type: "block", content: raw.slice(2, -2).trim() });
    } else if (raw.startsWith("\\(")) {
      segments.push({ type: "inline", content: raw.slice(2, -2).trim() });
    } else {
      segments.push({ type: "inline", content: raw.slice(1, -1).trim() });
    }
    lastIndex = match.index + raw.length;
  }

  if (lastIndex < input.length) {
    segments.push({ type: "text", content: input.slice(lastIndex) });
  }

  return segments;
}
