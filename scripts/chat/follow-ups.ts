/**
 * V's follow-up share, a week at a time (the owner's measure of V as a study
 * partner; growth reading `v-follow-up`): of V's AI replies, the share the
 * student followed with another message within 30 minutes, repeat Ask V taps
 * on the same question left out (lib/chat/followUpShare.ts).
 *
 *   npm run v:followups               # the last 4 weeks, 7 days each, ending now
 *   npm run v:followups -- --weeks=8
 *
 * Read-only. Staff (org members, platform admins) are left out.
 */
import "../lib/serverOnly";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { FOLLOW_UP_MS, followUpShare, type FollowUpRow } from "../../src/lib/chat/followUpShare";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const DAY = 86_400_000;
const PAGE = 1000;

async function main() {
  const weeksArg = process.argv.find((a) => a.startsWith("--weeks="));
  const weeks = weeksArg ? Number(weeksArg.split("=")[1]) : 4;
  if (!Number.isInteger(weeks) || weeks < 1 || weeks > 26) throw new Error("--weeks must be 1 to 26");

  const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const staff = new Set<string>();
  for (const table of ["org_members", "platform_admins"] as const) {
    const { data, error } = await admin.from(table).select("user_id");
    if (error) throw new Error(`${table}: ${error.message}`);
    for (const r of data ?? []) staff.add(r.user_id as string);
  }

  const now = Date.now();
  const start = new Date(now - weeks * 7 * DAY).toISOString();
  const rows: FollowUpRow[] = [];
  // Paged by range: PostgREST returns at most 1000 rows a request.
  for (let offset = 0; ; offset += PAGE) {
    const { data, error } = await admin
      .from("chat_interactions")
      .select("user_id, conversation_id, created_at, reply_source, asked_question_id, asked_notes_item, page_path")
      .eq("event_type", "typed_question")
      .gte("created_at", start)
      .order("created_at")
      .order("id")
      .range(offset, offset + PAGE - 1);
    if (error) throw new Error(error.message);
    for (const r of data ?? []) {
      if (r.user_id && staff.has(r.user_id as string)) continue;
      rows.push({
        conversationId: r.conversation_id as string | null,
        createdAt: r.created_at as string,
        ai: r.reply_source === "ai",
        askedQuestionId: r.asked_question_id as string | null,
        askedNotesItem: r.asked_notes_item as string | null,
        pagePath: r.page_path as string | null,
      });
    }
    if ((data ?? []).length < PAGE) break;
  }

  console.log("V's AI replies followed up within 30 minutes (repeat taps on the same question left out)");
  for (let w = weeks; w >= 1; w--) {
    const from = new Date(now - w * 7 * DAY);
    const to = new Date(now - (w - 1) * 7 * DAY);
    const r = followUpShare(rows, { from: from.toISOString(), to: to.toISOString() });
    const open = to.getTime() + FOLLOW_UP_MS > now ? " (last 30 min still open)" : "";
    const day = (d: Date) => d.toISOString().slice(0, 10);
    console.log(
      `  ${day(from)} to ${day(to)}: ${r.pct === null ? "no replies" : `${r.pct}%`} (${r.followedUp} of ${r.replies}), ${r.repeatTapsLeftOut} repeat taps left out${open}`
    );
  }
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
