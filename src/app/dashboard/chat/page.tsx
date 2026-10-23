import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionSuperadmin } from "@/lib/auth";
import AppHeader from "@/components/AppHeader";
import StatCard from "@/app/dashboard/StatCard";
import { listAiUsageByDay, listChatInteractions, listConversationRows } from "@/lib/chat/interactionsAdmin";
import { groupConversations } from "@/lib/chat/conversation";
import { summarizeAiUsage, summarizeChatInteractions, type AiUsageSummary } from "@/lib/chat/interactions";
import { readChatSettings } from "@/lib/chat/settingsAdmin";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { namesForUsers } from "@/lib/supabase/authUsers";
import ChatSettingsForm from "./ChatSettingsForm";

export const dynamic = "force-dynamic";

/** Dollars, with a third decimal while V's bill is still cents. */
function usd(v: number): string {
  return `$${v.toFixed(v < 1 ? 3 : 2)}`;
}

/** One answer's cost is a few hundredths of a cent: five decimals. */
function usdPerAnswer(v: number): string {
  return `$${v.toFixed(5)}`;
}

/** "$0.00045, 12% up on the week before", flagged past COST_RISE_FLAG (lib/chat/interactions compareCostWeeks). */
function weekLine(usage: AiUsageSummary | null): string {
  if (!usage || usage.weeks.thisWeek.perAnswerUsd === null) return "—";
  const { thisWeek, change, flagged } = usage.weeks;
  const amount = usdPerAnswer(thisWeek.perAnswerUsd!);
  if (change === null) return amount;
  const pct = Math.round(Math.abs(change) * 100);
  return `${amount}, ${pct}% ${change >= 0 ? "up" : "down"} on the week before${flagged ? " (look into it)" : ""}`;
}

export default async function ChatUsagePage() {
  // Platform-wide data (not org-scoped) — superadmin only.
  if (!(await getSessionSuperadmin())) redirect("/browse");

  const [rows, settings, conversationRows, usageRows] = await Promise.all([
    listChatInteractions(),
    readChatSettings(createSupabaseAdminClient()),
    listConversationRows(),
    listAiUsageByDay(),
  ]);
  const summary = summarizeChatInteractions(rows);
  // Migration 0162: AI use summed per day in the database, so the cost has no row limit.
  const usage = usageRows ? summarizeAiUsage(usageRows, new Date()) : null;
  // Migration 0159: whole conversations, newest first; the page shows the latest 100.
  const conversations = groupConversations(conversationRows);
  const shownConversations = conversations.slice(0, 100);
  // Who is chatting: the student's name, linked to their page. Superadmin only.
  const names = await namesForUsers(
    createSupabaseAdminClient(),
    [...shownConversations.map((c) => c.userId), ...summary.typed.map((q) => q.userId)].filter(
      (id): id is string => id !== null
    )
  );
  const helpful = conversationRows.filter((r) => r.feedback === 1).length;
  const notHelpful = conversationRows.filter((r) => r.feedback === -1).length;
  // Migration 0160: late answers written, and how many students have opened theirs.
  const lateAnswers = conversationRows.filter((r) => r.eventType === "v_followup");
  const lateRead = lateAnswers.filter((r) => r.seenAt).length;
  const askRate =
    summary.totalOpens > 0 ? `${Math.round((summary.totalClicks / summary.totalOpens) * 100)}%` : "—";

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-4xl space-y-6 px-6 py-8">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">V usage</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            How often visitors open V, which questions they tap, what they type and what V
            answered. Counts are a floor: a blocked or dropped request leaves no row. AI cost
            is at list price.
          </p>
        </header>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <StatCard kind="numeric" value={summary.totalOpens} label="Times opened" />
          <StatCard kind="numeric" value={summary.totalClicks} label="Questions asked" />
          <StatCard kind="text" value={askRate} label="Questions per open" />
          <StatCard kind="numeric" value={summary.totalTyped} label="Typed questions" />
          <StatCard kind="text" value={usage ? String(usage.total.answers) : "—"} label="AI answers" />
          <StatCard kind="text" value={usage ? usd(usage.total.costUsd) : "—"} label="AI cost so far" />
          <StatCard kind="text" value={weekLine(usage)} label="Cost per answer, last 7 days" />
          <StatCard kind="numeric" value={conversations.length} label="Conversations" />
          <StatCard kind="numeric" value={helpful} label="Replies marked helpful" />
          <StatCard kind="numeric" value={notHelpful} label="Replies marked not helpful" />
          <StatCard kind="text" value={`${lateRead} of ${lateAnswers.length}`} label="Late answers read" />
        </div>

        <section className="rounded-lg border">
          <h2 className="border-b px-4 py-3 text-sm font-semibold">AI use by day (India time), last 30 days</h2>
          {!usage ? (
            <p className="px-4 py-6 text-sm text-muted-foreground">AI use could not be read just now.</p>
          ) : usage.days.length === 0 ? (
            <p className="px-4 py-6 text-sm text-muted-foreground">No AI answers in the last 30 days.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium">Day</th>
                    <th className="px-3 py-2 text-right font-medium">Answers</th>
                    <th className="px-3 py-2 text-right font-medium">Failed</th>
                    <th className="px-3 py-2 text-right font-medium">Input</th>
                    <th className="px-3 py-2 text-right font-medium">From cache</th>
                    <th className="px-3 py-2 text-right font-medium">Output</th>
                    <th className="px-3 py-2 text-right font-medium">Cache writes</th>
                    <th className="px-3 py-2 text-right font-medium">Cost</th>
                    <th className="px-3 py-2 text-right font-medium">Per answer</th>
                  </tr>
                </thead>
                <tbody className="divide-y tabular-nums">
                  {usage.days.map((d) => (
                    <tr key={d.day}>
                      <td className="px-3 py-2">{d.day}</td>
                      <td className="px-3 py-2 text-right">{d.answers}</td>
                      <td className="px-3 py-2 text-right">{d.failed}</td>
                      <td className="px-3 py-2 text-right">
                        {(d.tokensIn + d.cacheReadTokens + d.cacheWriteTokens).toLocaleString("en-IN")}
                      </td>
                      <td className="px-3 py-2 text-right">
                        {d.cachedShare === null ? "—" : `${Math.round(d.cachedShare * 100)}%`}
                      </td>
                      <td className="px-3 py-2 text-right">{d.tokensOut.toLocaleString("en-IN")}</td>
                      <td className="px-3 py-2 text-right">
                        {d.writeShare === null ? "—" : `${Math.round(d.writeShare * 100)}%`}
                      </td>
                      <td className="px-3 py-2 text-right">{usd(d.costUsd)}</td>
                      <td className="px-3 py-2 text-right">{d.costPerAnswer === null ? "—" : usdPerAnswer(d.costPerAnswer)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <p className="border-t px-4 py-2 text-xs text-muted-foreground">
            Failed = the student got the fixed reply after an AI answer broke part-way; its tokens still cost.
            &ldquo;From cache&rdquo; is the share of input read from the prompt cache at a tenth of the price;
            &ldquo;Cache writes&rdquo; the share written to it, the dear part (twice the price for the 1-hour cache, since
            2026-10-23). Per answer counts failed answers too.
            Calls made outside the site (tests, scripts) are not here: the Anthropic Console is the bill.
          </p>
        </section>

        <section className="rounded-lg border">
          <h2 className="border-b px-4 py-3 text-sm font-semibold">V&rsquo;s settings</h2>
          <ChatSettingsForm initial={settings} />
        </section>

        <section className="rounded-lg border">
          <h2 className="border-b px-4 py-3 text-sm font-semibold">Conversations, newest first</h2>
          {conversations.length === 0 ? (
            <p className="px-4 py-6 text-sm text-muted-foreground">No conversations kept yet.</p>
          ) : (
            <ul>
              {shownConversations.map((c) => (
                <li key={c.conversationId} className="border-t first:border-t-0">
                  <details className="group px-4 py-2">
                    <summary className="cursor-pointer list-none rounded-sm text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                      <span className="font-medium">{c.turns[0].question}</span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">
                        {new Date(c.startedAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" })}
                        {" · "}
                        {c.turns.length} {c.turns.length === 1 ? "question" : "questions"}
                        {" · "}
                        <Who userId={c.userId} signedIn={c.signedIn} names={names} />
                      </span>
                    </summary>
                    <ol className="mt-2 space-y-2">
                      {c.turns.map((t, i) => (
                        <li key={i} className="text-sm">
                          <p className="whitespace-pre-wrap break-words">
                            <span className="font-medium">Student: </span>
                            {t.question}
                            {t.page && <span className="ml-1 text-xs text-muted-foreground">(on {t.page})</span>}
                          </p>
                          <p className="mt-0.5 whitespace-pre-wrap break-words border-l-2 border-input pl-2 text-muted-foreground">
                            <span className="font-medium text-foreground">
                              {t.source === "ai" ? "V (AI): " : t.source === "template" ? "V (button): " : t.source === "followup" ? "V (late answer): " : "V (fixed reply): "}
                            </span>
                            {t.reply}
                            {t.feedback === 1 && <span className="ml-1 text-xs font-medium text-foreground">[helpful]</span>}
                            {t.feedback === -1 && <span className="ml-1 text-xs font-medium text-foreground">[not helpful]</span>}
                          </p>
                        </li>
                      ))}
                    </ol>
                  </details>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-lg border">
          <h2 className="border-b px-4 py-3 text-sm font-semibold">Practice-test builder</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-muted-foreground">
                <th scope="col" className="px-4 py-2 font-medium">Step</th>
                <th scope="col" className="px-4 py-2 text-right font-medium">Times</th>
              </tr>
            </thead>
            <tbody>
              {summary.builder.map((s) => (
                <tr key={s.step} className="border-t">
                  <td className="px-4 py-2">{s.label}</td>
                  <td className="px-4 py-2 text-right font-mono tabular-nums">
                    {s.count.toLocaleString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="rounded-lg border">
          <h2 className="border-b px-4 py-3 text-sm font-semibold">Questions by clicks</h2>
          {summary.byQuestion.length === 0 ? (
            <p className="px-4 py-6 text-sm text-muted-foreground">No questions asked yet.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-muted-foreground">
                  <th scope="col" className="px-4 py-2 font-medium">Question</th>
                  <th scope="col" className="px-4 py-2 text-right font-medium">Clicks</th>
                </tr>
              </thead>
              <tbody>
                {summary.byQuestion.map((q) => (
                  <tr key={q.id} className="border-t">
                    <td className="px-4 py-2">{q.label}</td>
                    <td className="px-4 py-2 text-right font-mono tabular-nums">
                      {q.count.toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        <section className="rounded-lg border">
          <h2 className="border-b px-4 py-3 text-sm font-semibold">All typed questions, newest first</h2>
          {summary.typed.length === 0 ? (
            <p className="px-4 py-6 text-sm text-muted-foreground">Nobody has typed a question yet.</p>
          ) : (
            <ul>
              {summary.typed.map((q, i) => (
                <li key={i} className="border-t px-4 py-2 text-sm first:border-t-0">
                  <p className="whitespace-pre-wrap break-words">{q.text}</p>
                  {q.reply && (
                    <p className="mt-1 whitespace-pre-wrap break-words border-l-2 border-input pl-2 text-muted-foreground">
                      <span className="font-medium text-foreground">
                        {q.replySource === "ai" ? "V (AI): " : q.replySource === "ai_failed" ? "V (fixed reply, AI failed): " : "V (fixed reply): "}
                      </span>
                      {q.reply}
                    </p>
                  )}
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {new Date(q.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" })}
                    {" · "}
                    <Who userId={q.userId} signedIn={q.signedIn} names={names} />
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </>
  );
}

/** The student's name linked to their page; "not signed in" when there is no account. */
function Who({ userId, signedIn, names }: { userId: string | null; signedIn: boolean; names: Map<string, string> }) {
  if (!userId) return <>{signedIn ? "signed in" : "not signed in"}</>;
  return (
    <Link
      href={`/dashboard/students/${userId}`}
      className="rounded-sm font-medium text-foreground underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {names.get(userId) ?? "signed in (account deleted)"}
    </Link>
  );
}
