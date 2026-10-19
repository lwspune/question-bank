/**
 * Replay every question students typed to V through V's AI answer, without
 * storing anything, and write a question/answer table to review before the AI
 * is switched on (2026-10-15).
 *
 *   npx tsx scripts/chat/replay-typed.ts [--limit=N]
 *
 * Reads the typed questions (service role, read-only) and V's live facts (anon
 * client, as the route does), then calls Claude once or twice per question:
 * this SPENDS money, about a twentieth of a cent per question. Needs
 * ANTHROPIC_API_KEY in .env.local. Output: generated-papers/v-replay.md.
 */
import { join } from "node:path";
import { mkdirSync, writeFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
import { loadVContext } from "../../src/lib/chat/context";
import { readExamStrategyUncached } from "../../src/lib/chat/examStrategyServer";
import { askV } from "../../src/lib/chat/anthropic";
import { allowedReplyLinks } from "../../src/lib/chat/replyLinks";
import { readChapterLandingsUncached } from "../../src/lib/questions/landing";
import { readSubtopicIndexUncached, withSubtopics } from "../../src/lib/chat/subtopicIndex";
import { aiAnswerCostUsd } from "../../src/lib/chat/interactions";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

// Owner and end-to-end checks, not students.
const NOT_STUDENTS = [/^E2E-CHECK/i, /^test message$/i];

function cell(s: string): string {
  return s.replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
}

async function main() {
  const limitArg = process.argv.find((a) => a.startsWith("--limit="));
  const limit = limitArg ? Number(limitArg.split("=")[1]) : Infinity;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
  const anon = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { auth: { persistSession: false } });

  const { data, error } = await admin
    .from("chat_interactions")
    .select("message, created_at")
    .eq("event_type", "typed_question")
    .order("created_at", { ascending: true });
  if (error) throw new Error(error.message);
  const questions = (data ?? [])
    .map((r) => r.message as string)
    .filter((m) => !NOT_STUDENTS.some((re) => re.test(m)))
    .slice(0, limit);

  // The chapter list is the slow read; load it once for the whole run.
  const chapters = withSubtopics(await readChapterLandingsUncached(), await readSubtopicIndexUncached());
  console.log(`${questions.length} questions, ${chapters.length} chapter pages`);

  const rows: string[] = [];
  let tokensIn = 0;
  let tokensOut = 0;
  let cost = 0;
  let failed = 0;
  for (const [i, q] of questions.entries()) {
    const ctx = await loadVContext(anon, { loadChapters: async () => chapters, loadStrategy: readExamStrategyUncached });
    const r = await askV({ system: ctx.system, systemTail: ctx.systemTail, message: q, tools: ctx.tools });
    if (!r.ok) {
      failed++;
      rows.push(`| ${i + 1} | ${cell(q)} | FAILED: ${cell(r.error)} | | |`);
      console.log(`${i + 1}. FAILED ${r.error}`);
      continue;
    }
    tokensIn += r.tokensIn;
    tokensOut += r.tokensOut;
    cost += aiAnswerCostUsd(r);
    const links = allowedReplyLinks(r.reply, ctx.allowedPaths);
    rows.push(`| ${i + 1} | ${cell(q)} | ${cell(r.reply)} | ${links.join(" ")} | ${r.tokensIn}/${r.tokensOut} |`);
    console.log(`${i + 1}. ${q}\n   -> ${r.reply}`);
  }

  const answered = questions.length - failed;
  const md = [
    `# V replay, ${new Date().toISOString().slice(0, 10)}`,
    "",
    `${questions.length} typed questions, ${answered} answered, ${failed} failed. ` +
      `Tokens ${tokensIn} in at full price / ${tokensOut} out; $${cost.toFixed(4)} with the cache` +
      (answered ? ` ($${(cost / answered).toFixed(5)} an answer).` : "."),
    "",
    "Links = the paths that would be tappable (pages V was given).",
    "",
    "| # | Student typed | V replies | Links | Tokens in/out |",
    "|---|---|---|---|---|",
    ...rows,
    "",
  ].join("\n");
  const dir = join(process.cwd(), "generated-papers");
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "v-replay.md"), md);
  console.log(`\nWrote generated-papers/v-replay.md. Cost $${cost.toFixed(4)}.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
