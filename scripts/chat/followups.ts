/**
 * Write V's late answers (migration 0160) from an approved file.
 *
 *   npx tsx scripts/chat/followups.ts --file=scripts/chat/followups/2026-10-15.json          # DRY RUN
 *   npx tsx scripts/chat/followups.ts --file=scripts/chat/followups/2026-10-15.json --apply  # writes
 *
 * Each answer is matched to the ONE signed-in student who typed all of its
 * questions before the file's cut-off (lib/chat/followups.ts), and gets its
 * own conversation id, so the student's chat window opens it as a
 * conversation with an unread badge the next time they visit signed in.
 * Re-running adds nothing (a student who already has the answer is skipped).
 * Every link in every answer is checked against the live site first; one that
 * does not answer 200 stops the run. Prints no account ids.
 */
import { join } from "node:path";
import { readFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import { parseFollowupFile, planFollowups } from "../../src/lib/chat/followups";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const SITE = "https://www.pyqvault.com";

async function main() {
  const fileArg = process.argv.find((a) => a.startsWith("--file="));
  if (!fileArg) throw new Error("--file=<path> is required");
  const apply = process.argv.includes("--apply");

  const parsed = parseFollowupFile(JSON.parse(readFileSync(fileArg.slice("--file=".length), "utf8")));
  if (!parsed.ok) throw new Error(parsed.message);

  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const [{ data: typedRows, error: typedErr }, { data: doneRows, error: doneErr }] = await Promise.all([
    db
      .from("chat_interactions")
      .select("user_id, message, created_at")
      .eq("event_type", "typed_question")
      .not("user_id", "is", null)
      .lt("created_at", parsed.file.before),
    db.from("chat_interactions").select("user_id, message").eq("event_type", "v_followup"),
  ]);
  if (typedErr) throw new Error(typedErr.message);
  if (doneErr) throw new Error(doneErr.message);

  const plan = planFollowups(
    parsed.file,
    (typedRows ?? []).map((r) => ({ userId: r.user_id as string, message: r.message as string, createdAt: r.created_at as string })),
    (doneRows ?? []).map((r) => ({ userId: r.user_id as string, message: r.message as string }))
  );

  // Every link must be a live page: a follow-up that 404s is worse than none.
  const links = [...new Set(plan.insert.flatMap((p) => p.links))];
  const dead: string[] = [];
  for (const link of links) {
    const res = await fetch(`${SITE}${link}`, { method: "GET", redirect: "manual" });
    if (res.status !== 200) dead.push(`${link} -> ${res.status}`);
  }

  console.log(`${plan.insert.length} to write, ${plan.alreadyDone} already written, ${plan.problems.length} problems`);
  for (const p of plan.insert) console.log(`  - "${p.message.replace(/\n/g, " | ")}" -> ${p.reply.slice(0, 60)}...`);
  for (const p of plan.problems) console.log(`  PROBLEM: ${p}`);
  console.log(`${links.length} links checked${dead.length ? `, DEAD: ${dead.join(", ")}` : ", all 200"}`);
  if (dead.length > 0) throw new Error("dead links: fix the file before applying");

  if (!apply) {
    console.log("\nDry run. Add --apply to write.");
    return;
  }
  for (const p of plan.insert) {
    const { error } = await db.from("chat_interactions").insert({
      event_type: "v_followup",
      user_id: p.userId,
      conversation_id: randomUUID(),
      message: p.message,
      reply: p.reply,
      reply_source: "followup",
      reply_links: p.links.length > 0 ? p.links.slice(0, 10) : null,
    });
    if (error) throw new Error(`insert failed: ${error.message}`);
  }
  console.log(`Wrote ${plan.insert.length} follow-ups.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
