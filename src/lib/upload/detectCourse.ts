import type { ParsedRow } from "./parser";

export type CourseDetection =
  | { kind: "none" }
  | { kind: "uniform"; value: string }
  | { kind: "mixed"; values: string[] };

export function detectCourse(rows: ParsedRow[]): CourseDetection {
  // Map of lowercase-key → first-seen original casing.
  const firstSeen = new Map<string, string>();

  for (const row of rows) {
    const raw = row.course?.trim();
    if (!raw) continue;
    const key = raw.toLowerCase();
    if (!firstSeen.has(key)) firstSeen.set(key, raw);
  }

  if (firstSeen.size === 0) return { kind: "none" };
  if (firstSeen.size === 1) {
    const [value] = firstSeen.values();
    return { kind: "uniform", value };
  }
  return { kind: "mixed", values: Array.from(firstSeen.values()) };
}
