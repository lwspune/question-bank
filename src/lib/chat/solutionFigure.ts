/**
 * The solution's figure under V's explanation (owner, 2026-10-24). When V
 * explained a bank question and that question's stored solution has a figure
 * (questions.solution_image_url), the window shows it under the reply. V is
 * never told: its text stays as it is, and the figure is only added by the
 * window. Nothing new is stored either, so a figure added to a solution later
 * also shows in an older chat.
 *
 * Pure, and safe in client code. Spec: tests/chat-solution-figure.test.ts.
 */
import type { ToolCallLog } from "./anthropic";
import { publicImageUrl, storagePathOf } from "@/lib/storage/imageUrl";

const EXPLAINED_RE = /^Question ([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}) from /i;

/**
 * The bank question a reply actually explained: the last explain_question
 * call whose result is that question (questionTools explainView starts
 * "Question <id> from"). A refusal (signed out, out of free answers, not
 * found) starts otherwise, and a hint is get_question, so neither counts.
 */
export function explainedQuestionId(toolCalls: readonly ToolCallLog[] | null | undefined): string | null {
  let found: string | null = null;
  for (const c of toolCalls ?? []) {
    if (c.name !== "explain_question") continue;
    // The id the RESULT names: an Ask V tap pins the question, so the model's input id can differ (2026-11-08).
    const id = EXPLAINED_RE.exec(c.result ?? "")?.[1];
    if (id) found = id;
  }
  return found;
}

const FIGURE_MAX = 500;

/**
 * The link to show for a stored figure, or null. A turn kept on the device can
 * be edited, so only a picture in our bucket is shown, and always on our host.
 */
export function figureSrc(raw: unknown, supabaseUrl: string): string | null {
  if (typeof raw !== "string" || raw.length === 0 || raw.length > FIGURE_MAX) return null;
  const path = storagePathOf(raw);
  if (path === null || path.length === 0 || path.split("/").includes("..")) return null;
  return publicImageUrl(supabaseUrl, path);
}
