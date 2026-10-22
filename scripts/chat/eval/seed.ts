/**
 * Make or update V's test cases from labelled messages (V_SPEC.md, migration 0176).
 *
 *   npx tsx scripts/chat/eval/seed.ts <labels.json>            dry run: prints what it would write
 *   npx tsx scripts/chat/eval/seed.ts <labels.json> --apply    writes v_eval_cases
 *
 * labels.json: [{ "id": "<chat_interactions id>", "job": "find", "expect": {...},
 * "good": "what a good reply does", "verdict": "pass|fail|unclear", "active": true }]
 * Keep that file OUT of the repo (the repository is public): the scratchpad or
 * generated-papers/. The message, page, signed-in state, the student's exams,
 * the question Ask V was tapped on, V's memory and a Reply's context are all
 * read from the stored row here, never typed by hand. Re-running updates the
 * case made from the same row. Reads and writes with the service role.
 */
import { join } from "node:path";
import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
import { readConversation } from "../../../src/lib/chat/interactionsAdmin";
import { currentSession, modelHistory, replyContext } from "../../../src/lib/chat/conversation";
import { profileFieldsFromRow } from "../../../src/lib/header-session";
import { askedOf, parseExpect, V_JOBS, type VJob } from "../../lib/vEval";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

type Label = { id: string; job: VJob; expect?: unknown; good: string; verdict: "pass" | "fail" | "unclear"; active?: boolean };

function readLabels(path: string): Label[] {
  const raw = JSON.parse(readFileSync(path, "utf8")) as unknown;
  if (!Array.isArray(raw)) throw new Error("labels: a list");
  return raw.map((l, i) => {
    const where = `label ${i + 1} (${(l as { id?: string }).id ?? "?"})`;
    const label = l as Label;
    if (typeof label.id !== "string") throw new Error(`${where}: id`);
    if (!V_JOBS.includes(label.job)) throw new Error(`${where}: job ${label.job}`);
    if (typeof label.good !== "string" || label.good.length === 0 || label.good.length > 1000) throw new Error(`${where}: good`);
    if (!["pass", "fail", "unclear"].includes(label.verdict)) throw new Error(`${where}: verdict`);
    const e = parseExpect(label.expect ?? {});
    if (!e.ok) throw new Error(`${where}: expect: ${e.error}`);
    return { ...label, expect: e.value };
  });
}

async function main() {
  const file = process.argv[2];
  if (!file || file.startsWith("--")) throw new Error("usage: seed.ts <labels.json> [--apply]");
  const apply = process.argv.includes("--apply");
  const labels = readLabels(file);

  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const ids = labels.map((l) => l.id);
  const rows: Record<string, unknown>[] = [];
  // Chunked: a long .in() list overflows the request line (CLAUDE.md pitfalls).
  for (let i = 0; i < ids.length; i += 100) {
    const { data, error } = await db
      .from("chat_interactions")
      .select("id, created_at, user_id, conversation_id, page_path, message, reply, tool_calls, asked_question_id, reply_to_id")
      .in("id", ids.slice(i, i + 100));
    if (error) throw new Error(error.message);
    rows.push(...(data ?? []));
  }
  const byId = new Map(rows.map((r) => [r.id as string, r]));

  const { data: existing, error: exErr } = await db.from("v_eval_cases").select("id, source_interaction_id");
  if (exErr) throw new Error(exErr.message);
  const caseBySource = new Map((existing ?? []).map((c) => [c.source_interaction_id as string, c.id as string]));

  const profiles = new Map<string, string[]>();
  let made = 0;
  let updated = 0;
  for (const l of labels) {
    const r = byId.get(l.id);
    if (!r) throw new Error(`no stored message ${l.id}`);
    const message = r.message as string;
    const userId = r.user_id as string | null;
    const createdAt = r.created_at as string;

    let profileExams: string[] = [];
    if (userId) {
      if (!profiles.has(userId)) {
        const { data } = await db.from("student_profiles").select("stage, target_exams").eq("user_id", userId).maybeSingle();
        profiles.set(userId, profileFieldsFromRow(data).targetExams);
      }
      profileExams = profiles.get(userId)!;
    }

    // V's memory and a Reply's context as the route built them: the session before this message.
    let history: unknown[] = [];
    let replyTo: string | null = null;
    if (r.conversation_id) {
      const before = (await readConversation(db, r.conversation_id as string)).filter((c) => c.createdAt < createdAt);
      const session = currentSession(before, Date.parse(createdAt));
      history = modelHistory(session);
      const target = r.reply_to_id ? session.find((c) => c.id === r.reply_to_id) : undefined;
      if (target) replyTo = replyContext(target);
    }

    const asked = askedOf({
      message,
      askedQuestionId: r.asked_question_id as string | null,
      toolCalls: r.tool_calls as { name: string; input: unknown }[] | null,
    });
    const row = {
      source_interaction_id: l.id,
      job: l.job,
      message,
      page_path: r.page_path,
      signed_in: userId !== null,
      profile_exams: profileExams,
      asked_question_id: asked?.id ?? null,
      asked_chose: asked?.chose ?? null,
      history,
      reply_to: replyTo,
      expect: l.expect,
      good_reply: l.good,
      original_reply: r.reply,
      original_verdict: l.verdict,
      active: l.active ?? true,
    };
    const caseId = caseBySource.get(l.id);
    if (!apply) {
      console.log(`${caseId ? "update" : "new   "} ${l.job.padEnd(16)} ${message.slice(0, 70).replace(/\s+/g, " ")}`);
    } else if (caseId) {
      const { error } = await db.from("v_eval_cases").update(row).eq("id", caseId);
      if (error) throw new Error(`${l.id}: ${error.message}`);
    } else {
      const { error } = await db.from("v_eval_cases").insert(row);
      if (error) throw new Error(`${l.id}: ${error.message}`);
    }
    if (caseId) updated++;
    else made++;
  }
  console.log(`${labels.length} labels: ${made} new, ${updated} updated${apply ? "" : " (dry run, nothing written; add --apply)"}.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
