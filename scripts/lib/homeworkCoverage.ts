/**
 * Homework plan coverage against the live bank (2026-11-06): which PUBLIC past
 * questions of a planned subject the plan file has never seen (a new paper
 * ingested after the plan was built). Shared by `npm run homework:coverage`
 * and the daily prod check (tests/homework-plan-coverage.test.ts), and it asks
 * the same pure question homework:build does (lib/homework/newQuestions), so
 * none of the three can disagree.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import type { SupabaseClient } from "@supabase/supabase-js";
import { unplannedIds, type PlanFileShape } from "@/lib/homework/newQuestions";
import { sittingFor } from "@/lib/homework/sittings";

export type PlanFile = PlanFileShape & { slug: string; examName: string; subjectName: string; title: string; summary: string };

export type Unplanned = { id: string; sitting: string; chapter: string };

export type PlanCoverage = {
  slug: string;
  examName: string;
  subjectName: string;
  /** Null when the plan is not stored at all. */
  published: boolean | null;
  unplanned: Unplanned[];
};

export const PLAN_DATA_DIR = join(process.cwd(), "scripts", "homework", "data");

/** Every plan file in scripts/homework/data, by slug. */
export function readPlanFiles(dir = PLAN_DATA_DIR): PlanFile[] {
  return readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .sort()
    .map((f) => JSON.parse(readFileSync(join(dir, f), "utf8")) as PlanFile);
}

async function publicPyqIds(client: SupabaseClient, examId: string, subjectId: string): Promise<string[]> {
  const out: string[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await client
      .from("questions")
      .select("id")
      .eq("exam_id", examId)
      .eq("subject_id", subjectId)
      .eq("question_kind", "pyq")
      .eq("visibility", "PUBLIC")
      .order("id")
      .range(from, from + 999);
    if (error) throw new Error(`public pyq ids: ${error.message}`);
    out.push(...(data ?? []).map((r) => r.id as string));
    if (!data || data.length < 1000) return out;
  }
}

type Row = { id: string; pyq_year: number; pyq_month: string | null; pyq_note: string | null; chapter: { name: string } | null };

/** One plan file against the live bank. */
export async function readPlanCoverage(client: SupabaseClient, plan: PlanFile): Promise<PlanCoverage> {
  const { data: exam, error: e1 } = await client.from("exams").select("id").eq("name", plan.examName).maybeSingle();
  if (e1 || !exam) throw new Error(`${plan.slug}: no exam named ${plan.examName}`);
  const { data: subject, error: e2 } = await client
    .from("subjects")
    .select("id")
    .eq("exam_id", exam.id)
    .eq("name", plan.subjectName)
    .maybeSingle();
  if (e2 || !subject) throw new Error(`${plan.slug}: no subject ${plan.subjectName} in ${plan.examName}`);
  const { data: stored } = await client.from("homework_plans").select("published").eq("slug", plan.slug).maybeSingle();

  const ids = unplannedIds(plan, await publicPyqIds(client, exam.id, subject.id));
  const unplanned: Unplanned[] = [];
  for (let i = 0; i < ids.length; i += 200) {
    const { data, error } = await client
      .from("questions")
      .select("id, pyq_year, pyq_month, pyq_note, chapter:chapters(name)")
      .in("id", ids.slice(i, i + 200));
    if (error) throw new Error(`${plan.slug}: unplanned rows: ${error.message}`);
    for (const r of (data ?? []) as unknown as Row[]) {
      let sitting: string;
      try {
        sitting = sittingFor(plan.examName, r);
      } catch {
        sitting = `${r.pyq_year} ${r.pyq_note ?? r.pyq_month ?? ""}`.trim();
      }
      unplanned.push({ id: r.id, sitting, chapter: r.chapter?.name ?? "(none)" });
    }
  }
  return {
    slug: plan.slug,
    examName: plan.examName,
    subjectName: plan.subjectName,
    published: stored ? (stored.published as boolean) : null,
    unplanned,
  };
}

/** "12 new: 2 Apr 2027 S1 (12) | Matrices 3, Vectors 2, ..." */
export function describeUnplanned(list: readonly Unplanned[]): string {
  const count = (key: (u: Unplanned) => string) => {
    const m = new Map<string, number>();
    for (const u of list) m.set(key(u), (m.get(key(u)) ?? 0) + 1);
    return [...m.entries()].map(([k, n]) => `${k} (${n})`).join(", ");
  };
  return `${list.length} new: ${count((u) => u.sitting)} | chapters: ${count((u) => u.chapter)}`;
}
