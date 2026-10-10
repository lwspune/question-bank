/**
 * PYQ Vault students' exam results, as the public pages show them (migration
 * 0149, 2026-10-10). Pure: no I/O.
 *
 * Names are listed alphabetically inside a group, never ranked: a results wall
 * celebrates everyone who cleared, it is not a leaderboard (CLAUDE.md,
 * engagement gate).
 */

export type ResultStage = "written" | "ssb" | "final";

export type PublicResult = {
  examSlug: string;
  examName: string;
  /** As printed on the page, e.g. "NDA 2 2026". */
  sitting: string;
  stage: ResultStage;
  name: string;
};

export type ResultGroup = {
  examSlug: string;
  examName: string;
  sitting: string;
  stage: ResultStage;
  names: string[];
};

/** "Written exam cleared", for a group's heading. */
export const STAGE_LABEL: Record<ResultStage, string> = {
  written: "Written exam cleared",
  ssb: "Recommended at the SSB",
  final: "Final merit list",
};

/** One group per sitting and stage, in the order the loader gave them. */
export function groupResults(results: readonly PublicResult[]): ResultGroup[] {
  const groups: ResultGroup[] = [];
  const byKey = new Map<string, ResultGroup>();
  for (const r of results) {
    const key = `${r.examSlug}\u0000${r.sitting}\u0000${r.stage}`;
    let g = byKey.get(key);
    if (!g) {
      g = { examSlug: r.examSlug, examName: r.examName, sitting: r.sitting, stage: r.stage, names: [] };
      byKey.set(key, g);
      groups.push(g);
    }
    g.names.push(r.name);
  }
  for (const g of groups) g.names.sort((a, b) => a.localeCompare(b, "en"));
  return groups;
}

/** The one-line strip: "6 PYQ Vault students cleared the NDA 2 2026 written exam". */
export function resultHeadline(g: ResultGroup): string {
  const n = g.names.length;
  const who = `${n} PYQ Vault ${n === 1 ? "student" : "students"}`;
  switch (g.stage) {
    case "written":
      return `${who} cleared the ${g.sitting} written exam`;
    case "ssb":
      return `${who} ${n === 1 ? "was" : "were"} recommended at the ${g.sitting} SSB`;
    case "final":
      return `${who} made the ${g.sitting} final merit list`;
  }
}

/** "KB" for "Kushil Basumatary": the circle on a name card (no photos yet). */
export function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  const first = parts[0][0];
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}
