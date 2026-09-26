import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, FileText, Trophy, CheckCircle2, XCircle, MinusCircle, LogIn, Info } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { createSupabaseAnonClient, createSupabaseServerClient } from "@/lib/supabase/server";
import { getSessionUser, getSessionMember } from "@/lib/auth";
import { getMockBySlug, getUserAttempts } from "@/lib/mocks/query";
import { markingCopy } from "@/lib/mocks/marking";
import { mockKindNote } from "@/lib/mocks/catalogue";
import StartMock from "./StartMock";
import { getExamByName } from "@/lib/exam/examContext";
import ShareMock from "./ShareMock";
import AttemptsList from "../_components/AttemptsList";
import { listMyAssignments } from "@/lib/assignments/service";

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const mock = await getMockBySlug(createSupabaseAnonClient(), params.slug);
  if (!mock) return { title: "Mock test not found" };
  return {
    title: `${mock.title} — timed mock test`,
    description: `Sit the ${mock.title} as a full-length timed mock: ${mock.totalQuestions} questions, ${mock.totalMarks} marks, ${Math.round(mock.durationSecs / 60)} minutes, instant scoring.`,
    alternates: { canonical: `/mock/${params.slug}` },
  };
}

export default async function MockInstructions({ params }: { params: Params }) {
  const mock = await getMockBySlug(createSupabaseAnonClient(), params.slug);
  if (!mock) notFound();
  const [user, member] = await Promise.all([getSessionUser(), getSessionMember()]);
  const myAttempts = user
    ? await getUserAttempts(createSupabaseServerClient(), user.id, mock.id)
    : [];
  // Set by a teacher? One line under the title, only for a student in a batch
  // this paper was assigned to (ENGAGEMENT_SPEC.md C1). Best-effort.
  const assigned = user
    ? await listMyAssignments(user.id)
        .then((rows) => rows.find((a) => a.mockId === mock.id) ?? null)
        .catch(() => null)
    : null;

  const mins = Math.round(mock.durationSecs / 60);
  // Copy is derived, not hard-coded: MHT-CET has NO negative marking, and the
  // old wording asserted a penalty and told the reader to "skip if unsure" —
  // advice that costs marks when a blank scores the same as a wrong answer.
  const marking = markingCopy(mock.marking);
  // Stated for EVERY type, past papers included — see mockKindNote. This is the
  // screen someone reaches from a shared link, with no route to tell them what
  // they are about to sit.
  const kindNote = mockKindNote({
    source: mock.source,
    scope: mock.scope,
    examName: mock.examName,
    totalQuestions: mock.totalQuestions,
  });

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        <Link href="/mock" className="text-sm text-muted-foreground hover:text-foreground">
          ← All mock tests
        </Link>

        <h1 className="mt-4 text-2xl font-bold tracking-tight">{mock.title}</h1>
        {assigned && (
          <p
            className={
              "mt-2 text-sm font-medium " +
              (assigned.done
                ? "text-emerald-600 dark:text-emerald-400"
                : assigned.state === "overdue"
                  ? "text-red-600 dark:text-red-400"
                  : "text-brand-accent")
            }
          >
            {assigned.done ? "Done" : assigned.label} {"\u00b7"} set by your teacher for {assigned.batchName}
            {assigned.note ? ` ${"\u00b7"} ${assigned.note}` : ""}
          </p>
        )}

        {/* Org staff (admins/teachers) get a copy-able share link for students. */}
        {member && <ShareMock slug={mock.slug} />}

        <div className="mt-6 grid grid-cols-3 gap-3">
          <Stat icon={FileText} value={String(mock.totalQuestions)} label="questions" />
          <Stat icon={Trophy} value={String(mock.totalMarks)} label="marks" />
          <Stat icon={Clock} value={`${mins}`} label="minutes" />
        </div>

        <p className="mt-6 flex items-start gap-2 rounded-lg border bg-muted/40 p-4 text-sm text-muted-foreground">
          <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <span>{kindNote}</span>
        </p>

        <section className="mt-6 rounded-lg border bg-card p-5">
          <h2 className="text-sm font-semibold">Instructions</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
              <span><strong className="text-foreground">{marking.correctValue}</strong> marks for every correct answer.</span>
            </li>
            <li className="flex items-start gap-2">
              <XCircle
                className={`mt-0.5 h-4 w-4 shrink-0 ${marking.hasPenalty ? "text-red-600" : "text-muted-foreground"}`}
                aria-hidden
              />
              <span><strong className="text-foreground">{marking.wrongValue}</strong> {marking.wrongNote}</span>
            </li>
            <li className="flex items-start gap-2">
              <MinusCircle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
              <span><strong className="text-foreground">0</strong> {marking.unattemptedAdvice}</span>
            </li>
            <li className="flex items-start gap-2">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
              <span>The <strong className="text-foreground">{mins}-minute</strong> timer starts when you begin and auto-submits at zero. You can jump between questions and flag them for review.</span>
            </li>
          </ul>
        </section>

        <div className="mt-6">
          {user ? (
            <StartMock slug={mock.slug} bilingual={getExamByName(mock.examName)?.bilingual === true} />
          ) : (
            <div className="rounded-lg border border-dashed p-5 text-center">
              <p className="text-sm text-muted-foreground">Sign in to take this timed mock and save your score.</p>
              <Button asChild variant="brand" className="mt-3">
                <Link href={`/login?next=/mock/${mock.slug}`}>
                  <LogIn className="h-4 w-4" aria-hidden />
                  Sign in to start
                </Link>
              </Button>
            </div>
          )}
        </div>

        {myAttempts.length > 0 && (
          <section className="mt-8">
            <h2 className="mb-3 text-sm font-semibold">Your attempts</h2>
            <AttemptsList attempts={myAttempts} showMock={false} />
          </section>
        )}
      </main>
    </>
  );
}

function Stat({ icon: Icon, value, label }: { icon: typeof Clock; value: string; label: string }) {
  return (
    <div className="rounded-lg border bg-card p-3 text-center">
      <Icon className="mx-auto h-4 w-4 text-brand-accent" aria-hidden />
      <div className="mt-1 text-xl font-bold tabular-nums">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
