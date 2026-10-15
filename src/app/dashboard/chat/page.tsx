import { redirect } from "next/navigation";
import { getSessionSuperadmin } from "@/lib/auth";
import AppHeader from "@/components/AppHeader";
import StatCard from "@/app/dashboard/StatCard";
import { listChatInteractions, listConversationRows } from "@/lib/chat/interactionsAdmin";
import { groupConversations } from "@/lib/chat/conversation";
import { summarizeChatInteractions } from "@/lib/chat/interactions";
import { readChatSettings } from "@/lib/chat/settingsAdmin";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import ChatSettingsForm from "./ChatSettingsForm";

export const dynamic = "force-dynamic";

export default async function ChatUsagePage() {
  // Platform-wide data (not org-scoped) — superadmin only.
  if (!(await getSessionSuperadmin())) redirect("/browse");

  const [rows, settings, conversationRows] = await Promise.all([
    listChatInteractions(),
    readChatSettings(createSupabaseAdminClient()),
    listConversationRows(),
  ]);
  const summary = summarizeChatInteractions(rows);
  // Migration 0159: whole conversations, newest first; the page shows the latest 100.
  const conversations = groupConversations(conversationRows);
  const helpful = conversationRows.filter((r) => r.feedback === 1).length;
  const notHelpful = conversationRows.filter((r) => r.feedback === -1).length;
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
          <StatCard kind="numeric" value={summary.aiAnswers} label="AI answers" />
          <StatCard kind="text" value={`$${summary.aiCostUsd.toFixed(2)}`} label="AI cost so far" />
          <StatCard kind="numeric" value={conversations.length} label="Conversations" />
          <StatCard kind="numeric" value={helpful} label="Replies marked helpful" />
          <StatCard kind="numeric" value={notHelpful} label="Replies marked not helpful" />
        </div>

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
              {conversations.slice(0, 100).map((c) => (
                <li key={c.conversationId} className="border-t first:border-t-0">
                  <details className="group px-4 py-2">
                    <summary className="cursor-pointer list-none rounded-sm text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                      <span className="font-medium">{c.turns[0].question}</span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">
                        {new Date(c.startedAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" })}
                        {" · "}
                        {c.turns.length} {c.turns.length === 1 ? "question" : "questions"}
                        {" · "}
                        {c.signedIn ? "signed in" : "not signed in"}
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
                              {t.source === "ai" ? "V (AI): " : t.source === "template" ? "V (button): " : "V (fixed reply): "}
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
                        {q.replySource === "ai" ? "V (AI): " : "V (fixed reply): "}
                      </span>
                      {q.reply}
                    </p>
                  )}
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {new Date(q.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" })}
                    {" · "}
                    {q.signedIn ? "signed in" : "not signed in"}
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
