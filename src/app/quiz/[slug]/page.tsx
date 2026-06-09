import { notFound } from "next/navigation";
import type { Metadata } from "next";
import AppHeader from "@/components/AppHeader";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getPublicQuizBySlug } from "@/lib/quiz/publicQuiz";
import QuizTaker from "./QuizTaker";

// ISR: the public payload is anon + stable, so cache it. A newly-published quiz
// renders on first hit (dynamicParams default). The admin client reads
// server-side and the answer key is stripped before any HTML is produced.
export const revalidate = 3600;

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const quiz = await getPublicQuizBySlug(createSupabaseAdminClient(), params.slug);
  if (!quiz) return { title: "Quiz not found" };
  const subject = [quiz.exam, quiz.subject].filter(Boolean).join(" ");
  const desc = `Take this free ${quiz.questions.length}-question ${subject} quiz${
    quiz.chapter ? ` on ${quiz.chapter}` : ""
  } — instant score the moment you finish. PYQ-based recall practice from PYQ Vault.`;
  return {
    title: quiz.title,
    description: desc,
    alternates: { canonical: `/quiz/${params.slug}` },
    openGraph: { title: quiz.title, description: desc, url: `/quiz/${params.slug}` },
    twitter: { card: "summary_large_image", title: quiz.title, description: desc },
  };
}

export default async function PublicQuizPage({ params }: { params: Params }) {
  const quiz = await getPublicQuizBySlug(createSupabaseAdminClient(), params.slug);
  if (!quiz) notFound();
  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        <QuizTaker slug={params.slug} quiz={quiz} />
      </main>
    </>
  );
}
