/**
 * The English rows of one Tier I shift, as the Hindi lane needs them (IO).
 *
 * A row is found by source_file + question_number, except a question SSC
 * repeated from an earlier shift: per-exam dedup stored it once, under the
 * earlier shift, and repeats.json names that row. The English section (PART-D)
 * prints no Hindi, so it is left out.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { PaperQuestion } from "../mh-ssc-10/lib";
import { EXAM_ID, type Shift } from "./config";

export const HINDI_DIR = join(__dirname, "hindi"); // committed: the Hindi readings, the source of record
export const hindiPath = (shiftId: string) => join(HINDI_DIR, `${shiftId}.txt`);

export type EnglishRow = {
  number: number;
  questionId: string;
  /** Another shift's row, reached through repeats.json. */
  repeatOf?: string;
  optionIds: Record<string, string>;
  paper: PaperQuestion;
};

type Raw = {
  id: string;
  question_number: string | null;
  text: string;
  context: string | null;
  solution: string | null;
  options: { id: string; label: string; text: string; is_correct: boolean }[];
};

const SELECT = "id, question_number, text, context, solution, options(id, label, text, is_correct)";

function toRow(r: Raw, number: number, repeatOf?: string): EnglishRow {
  const options = [...r.options].sort((a, b) => a.label.localeCompare(b.label));
  return {
    number,
    questionId: r.id,
    ...(repeatOf ? { repeatOf } : {}),
    optionIds: Object.fromEntries(options.map((o) => [o.label, o.id])),
    paper: {
      ref: String(number),
      format: "mcq",
      chapter: "",
      subtopic: "",
      difficulty: "",
      stem: r.text,
      ...(r.context ? { context: r.context } : {}),
      options: options.map((o) => ({ label: o.label, text: o.text })),
      answer: options.find((o) => o.is_correct)?.label,
      ...(r.solution ? { solution: r.solution } : {}),
    },
  };
}

export async function loadEnglishRows(client: SupabaseClient, shift: Shift & { id: string }): Promise<EnglishRow[]> {
  const { data, error } = await client
    .from("questions")
    .select(SELECT)
    .eq("exam_id", EXAM_ID)
    .eq("source_file", shift.sourceFile);
  if (error) throw new Error(`read ${shift.sourceFile}: ${error.message}`);
  const rows = ((data ?? []) as unknown as Raw[]).map((r) => toRow(r, Number(r.question_number)));

  const repeatsFile = join(__dirname, "repeats.json");
  const repeats: { number: number; questionId: string; first: string }[] = existsSync(repeatsFile)
    ? (JSON.parse(readFileSync(repeatsFile, "utf8"))[shift.id] ?? [])
    : [];
  if (repeats.length) {
    const { data: rep, error: repErr } = await client
      .from("questions")
      .select(SELECT)
      .in("id", repeats.map((r) => r.questionId));
    if (repErr) throw new Error(`read repeats: ${repErr.message}`);
    for (const r of repeats) {
      const raw = ((rep ?? []) as unknown as Raw[]).find((x) => x.id === r.questionId);
      if (!raw) throw new Error(`${shift.id} Q${r.number}: repeat row ${r.questionId} not found`);
      rows.push(toRow(raw, r.number, r.first));
    }
  }

  // Tier I is four parts of 25; PART-D (76-100) is English Comprehension.
  return rows.filter((r) => r.number <= 75).sort((a, b) => a.number - b.number);
}
