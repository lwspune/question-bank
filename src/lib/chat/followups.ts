/**
 * Late answers from V (migration 0160). A file of approved answers, each tied
 * to the questions it answers (scripts/chat/followups/<date>.json), is matched
 * to the ONE signed-in student who typed all of those questions before the
 * file's cut-off. Account ids never live in the file: the repo is public.
 *
 * Pure. Spec: tests/chat-followups.test.ts. Writer: scripts/chat/followups.ts.
 */
import { pathsInReply } from "./replyLinks";

export type FollowupFile = {
  before: string;
  followups: { questions: string[]; reply: string }[];
};

export type PlannedFollowup = { userId: string; message: string; reply: string; links: string[] };

const REPLY_MAX = 4000;
const MESSAGE_MAX = 500;

export function parseFollowupFile(raw: unknown): { ok: true; file: FollowupFile } | { ok: false; message: string } {
  const o = (raw ?? {}) as { before?: unknown; followups?: unknown };
  if (typeof o.before !== "string" || Number.isNaN(Date.parse(o.before))) {
    return { ok: false, message: "`before` must be a date" };
  }
  if (!Array.isArray(o.followups)) return { ok: false, message: "`followups` must be a list" };
  const followups: FollowupFile["followups"] = [];
  for (const [i, f] of o.followups.entries()) {
    const e = (f ?? {}) as { questions?: unknown; reply?: unknown };
    const questions = Array.isArray(e.questions) ? e.questions.filter((q): q is string => typeof q === "string" && q.trim() !== "") : [];
    if (questions.length === 0) return { ok: false, message: `followup ${i + 1}: no questions` };
    if (typeof e.reply !== "string" || e.reply.trim() === "" || e.reply.length > REPLY_MAX) {
      return { ok: false, message: `followup ${i + 1}: reply must be 1 to ${REPLY_MAX} characters` };
    }
    if (questions.join("\n").length > MESSAGE_MAX) {
      return { ok: false, message: `followup ${i + 1}: questions over ${MESSAGE_MAX} characters together` };
    }
    followups.push({ questions, reply: e.reply });
  }
  return { ok: true, file: { before: o.before, followups } };
}

export function planFollowups(
  file: FollowupFile,
  typed: readonly { userId: string; message: string; createdAt: string }[],
  existing: readonly { userId: string; message: string }[]
): { insert: PlannedFollowup[]; alreadyDone: number; problems: string[] } {
  const cutoff = Date.parse(file.before);
  const asked = new Map<string, Set<string>>();
  for (const t of typed) {
    if (Date.parse(t.createdAt) >= cutoff) continue;
    const set = asked.get(t.userId) ?? new Set<string>();
    set.add(t.message);
    asked.set(t.userId, set);
  }
  const done = new Set(existing.map((e) => `${e.userId}\u0000${e.message}`));

  const insert: PlannedFollowup[] = [];
  const problems: string[] = [];
  let alreadyDone = 0;
  for (const f of file.followups) {
    const label = f.questions.join(" | ");
    const users = [...asked].filter(([, set]) => f.questions.every((q) => set.has(q))).map(([u]) => u);
    if (users.length === 0) {
      problems.push(`No student typed all of: ${label}`);
      continue;
    }
    if (users.length > 1) {
      problems.push(`More than one student typed all of: ${label}`);
      continue;
    }
    const message = f.questions.join("\n");
    if (done.has(`${users[0]}\u0000${message}`)) {
      alreadyDone++;
      continue;
    }
    insert.push({ userId: users[0], message, reply: f.reply, links: [...new Set(pathsInReply(f.reply))] });
  }
  return { insert, alreadyDone, problems };
}
