/**
 * Export every conversation with V as JSONL, one conversation per line
 * (migration 0159), for analysis and for preparing training data.
 *
 *   npm run chat:export            -> generated-papers/v-conversations.jsonl
 *   npm run chat:export -- --ai    only conversations with at least one AI reply
 *
 * Read-only, service role. Each line carries the conversation id, signed in or
 * not, when it started, and its messages (the page, V's source and the
 * student's thumbs where present). NEVER the account id: email addresses and
 * phone numbers were already removed before storing. The output folder is
 * gitignored; do not commit an export.
 */
import { join } from "node:path";
import { mkdirSync, writeFileSync } from "node:fs";
import { listConversationRows } from "../../src/lib/chat/interactionsAdmin";
import { conversationJsonl, groupConversations } from "../../src/lib/chat/conversation";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

async function main() {
  const aiOnly = process.argv.includes("--ai");
  const rows = await listConversationRows(1_000_000);
  let conversations = groupConversations(rows);
  if (aiOnly) conversations = conversations.filter((c) => c.turns.some((t) => t.source === "ai"));

  const dir = join(process.cwd(), "generated-papers");
  mkdirSync(dir, { recursive: true });
  const out = join(dir, "v-conversations.jsonl");
  writeFileSync(out, conversations.map(conversationJsonl).join("\n") + (conversations.length ? "\n" : ""));

  const turns = conversations.reduce((n, c) => n + c.turns.length, 0);
  const rated = rows.filter((r) => r.feedback === 1 || r.feedback === -1).length;
  console.log(
    `${conversations.length} conversations, ${turns} questions, ${rated} rated replies -> generated-papers/v-conversations.jsonl`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
