// The per-question repair record for AFCAT, keyed by question id ("01-17") in
// data/<chapter>.overrides.json. The Worksheets override plus the two fields an
// authored row carries that a worksheet row gets from its file: subtopic and
// difficulty. Every entry carries a `reason` — it is the adjudication record.
import type { WorksheetOverride } from "../worksheets/lib";
import type { Difficulty } from "../../src/lib/upload/validate";

export type AfcatOverride = WorksheetOverride & {
  subtopic?: string;
  difficulty?: Difficulty;
};

/** One pass-1 verdict, as the agent returns it (see AGENT_BRIEF.md). */
export type Pass1Verdict = {
  id: string;
  derived: string; // A..D or X
  value: string;
  confidence: "high" | "medium" | "low";
  note?: string;
  subtopic: string;
  difficulty: Difficulty;
  solution: string;
};
