/**
 * The weekly gap list (2026-11-27, V_SPEC.md section 7 step 1a): V's replies
 * that deny a feature or say V has no information about the product. Each real
 * one is a fact V lacks: add it (in lib/chat/facts.ts, or as a V_FACT beside
 * the code it describes) and make the message a test case (`v:eval:seed` takes
 * the id printed here).
 *
 *   npm run v:denials                 the last 7 days
 *   npm run v:denials -- --days=30
 *
 * Read-only, service role. Staff (platform admins) are left out. Prints
 * message ids, never account ids. The classifier is scripts/lib/vDenials.ts;
 * a hit is a question, not a verdict.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { denialKind } from "../lib/vDenials";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const PAGE = 1000;

function arg(name: string): string | null {
  const a = process.argv.find((x) => x.startsWith(`--${name}=`));
  return a ? a.slice(name.length + 3) : null;
}

function short(s: string | null, n: number): string {
  const t = (s ?? "").replace(/\s+/g, " ").trim();
  return t.length > n ? `${t.slice(0, n - 1)}…` : t;
}

async function main() {
  const days = Number(arg("days") ?? 7);
  if (!Number.isInteger(days) || days < 1 || days > 90) throw new Error("--days: a whole number from 1 to 90");
  const since = new Date(Date.now() - days * 86_400_000).toISOString();

  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const { data: staff, error: staffErr } = await db.from("platform_admins").select("user_id");
  if (staffErr) throw new Error(staffErr.message);
  const staffIds = new Set((staff ?? []).map((r) => r.user_id as string));

  type Row = { id: string; created_at: string; user_id: string | null; page_path: string | null; message: string | null; reply: string | null };
  const rows: Row[] = [];
  // Paged: PostgREST stops at 1,000 rows without a word (CLAUDE.md pitfalls).
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await db
      .from("chat_interactions")
      .select("id, created_at, user_id, page_path, message, reply")
      .eq("event_type", "typed_question")
      .not("reply", "is", null)
      .gte("created_at", since)
      .order("created_at", { ascending: true })
      .range(from, from + PAGE - 1);
    if (error) throw new Error(error.message);
    rows.push(...((data ?? []) as Row[]));
    if (!data || data.length < PAGE) break;
  }

  const students = rows.filter((r) => !r.user_id || !staffIds.has(r.user_id));
  const hits = students.map((r) => ({ r, kind: denialKind(r.reply ?? "") })).filter((h) => h.kind !== null);

  console.log(`V's replies, last ${days} days: ${students.length} (staff left out). Denies or "no information": ${hits.length}.`);
  console.log("Each real gap: add the fact, then make the message a case (v:eval:seed takes the id).\n");
  for (const { r, kind } of hits) {
    const day = new Date(r.created_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
    console.log(`${day}  ${kind!.padEnd(7)}  ${r.id}  ${r.page_path ?? ""}`);
    console.log(`  asked: ${short(r.message, 110)}`);
    console.log(`  V:     ${short(r.reply, 170)}\n`);
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
