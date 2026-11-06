// Shared by prep.ts, pending.ts and settle.ts: the plan files (pairs/*.json),
// the settled runs (data/*.json) and the questions a run's chapters hold now.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { ChapterRef, SettledFile } from "@/lib/crossExam/settled";
import { isRunOf, type IdSets } from "@/lib/crossExam/pending";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

export const DATA_DIR = join(process.cwd(), "scripts/cross-exam/data");
export const PLAN_DIR = join(process.cwd(), "scripts/cross-exam/pairs");
export const WORK_DIR = "generated-papers/cross-exam";

export type PlanRun = { slug: string; targets: string[]; board: string[] };
export type Plan = { exam: string; subject: string; boardExams: Record<string, string>; runs: PlanRun[] };

export function readPlan(path: string): Plan {
  return JSON.parse(readFileSync(path, "utf8")) as Plan;
}

export function planRun(plan: Plan, slug: string): PlanRun {
  const run = plan.runs.find((r) => r.slug === slug);
  if (!run) throw new Error(`no run ${slug} in the plan`);
  return run;
}

/** The plan's chapter names as full references. A board entry is "<class key>|<chapter>". */
export function runRefs(plan: Plan, run: PlanRun): { targets: ChapterRef[]; board: ChapterRef[] } {
  return {
    targets: run.targets.map((chapter) => ({ exam: plan.exam, subject: plan.subject, chapter })),
    board: run.board.map((b) => {
      const [cls, chapter] = b.split("|");
      const exam = plan.boardExams[cls];
      if (!exam) throw new Error(`board "${b}": no boardExams entry for "${cls}"`);
      return { exam, subject: plan.subject, chapter };
    }),
  };
}

/** Every settled run of a slug, as written in scripts/cross-exam/data. */
export function settledRuns(slug: string): SettledFile[] {
  return readdirSync(DATA_DIR)
    .filter((f) => isRunOf(slug, f))
    .map((f) => JSON.parse(readFileSync(join(DATA_DIR, f), "utf8")) as SettledFile);
}

export function dataFileNames(): string[] {
  return readdirSync(DATA_DIR).filter((f) => f.endsWith(".json"));
}

export function serviceClient(): SupabaseClient {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
}

async function chapterId(c: SupabaseClient, ref: ChapterRef): Promise<string> {
  const { data: ex } = await c.from("exams").select("id").eq("name", ref.exam).single();
  if (!ex) throw new Error(`no exam ${ref.exam}`);
  const { data: sub } = await c.from("subjects").select("id").eq("exam_id", ex.id).eq("name", ref.subject).single();
  if (!sub) throw new Error(`no subject ${ref.exam} / ${ref.subject}`);
  const { data: ch } = await c.from("chapters").select("id").eq("subject_id", sub.id).eq("name", ref.chapter).single();
  if (!ch) throw new Error(`no chapter ${ref.exam} / ${ref.subject} / ${ref.chapter}`);
  return ch.id as string;
}

/** A chapter's PUBLIC questions (past-paper only when pyqOnly), every page of them. */
export async function chapterRows<T>(c: SupabaseClient, ref: ChapterRef, pyqOnly: boolean, select: string): Promise<T[]> {
  const id = await chapterId(c, ref);
  const out: T[] = [];
  for (let from = 0; ; from += 1000) {
    let q = c.from("questions").select(select).eq("chapter_id", id).eq("visibility", "PUBLIC");
    if (pyqOnly) q = q.eq("question_kind", "pyq");
    const { data, error } = await q.order("id").range(from, from + 999);
    if (error) throw new Error(`${ref.chapter}: ${error.message}`);
    out.push(...((data ?? []) as unknown as T[]));
    if ((data ?? []).length < 1000) break;
  }
  return out;
}

/** The ids a run's chapters hold now: the exam side's past questions, every board question. */
export async function currentIds(c: SupabaseClient, refs: { targets: ChapterRef[]; board: ChapterRef[] }): Promise<IdSets> {
  const ids = async (list: ChapterRef[], pyqOnly: boolean) =>
    (await Promise.all(list.map((r) => chapterRows<{ id: string }>(c, r, pyqOnly, "id")))).flat().map((r) => r.id);
  return { targets: await ids(refs.targets, true), board: await ids(refs.board, false) };
}

/** What every settled run of the slug read. */
export function doneSets(slug: string): IdSets[] {
  return settledRuns(slug).map((f) => f.reviewed);
}
