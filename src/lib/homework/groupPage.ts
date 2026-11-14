/**
 * One repeat or type group of a homework plan, ready to show: the plan, the
 * group and its questions as slots. Shared by the /homework/<plan>/group/<n>
 * page and GET /api/homework/group (the repeat line's panel, 2026-11-15), so
 * the two cannot drift. Null when the plan or group does not exist or has no
 * questions; logs and returns null when a question is unavailable.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { getPlanGroup } from "./query";
import { homeworkDayView } from "./dayView";
import { groupItems } from "./chapters";
import { loadBoardQuestions } from "@/lib/questionPapers/query";

export async function loadGroupPage(client: SupabaseClient, planSlug: string, n: number) {
  const page = await getPlanGroup(client, planSlug, n);
  if (!page || page.members.length === 0) return null;
  const items = groupItems(page.members);
  const questions = await loadBoardQuestions(client, items.map((it) => it.questionId));
  const view = homeworkDayView(items, questions);
  if (!view.ok) {
    console.error("homework group: questions unavailable", planSlug, n, view.missing);
    return null;
  }
  return { ...page, slots: view.slots };
}

export type GroupPage = NonNullable<Awaited<ReturnType<typeof loadGroupPage>>>;
