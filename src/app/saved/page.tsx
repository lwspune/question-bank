import { redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Bookmark } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { getSessionUser, getSessionMember } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { queryQuestionsByIds } from "@/lib/questions/query";
import { listBookmarkIds } from "@/lib/bookmarks/service";
import QuestionCard from "../browse/QuestionCard";

export const metadata: Metadata = {
  title: "Saved questions",
  robots: { index: false },
};

export default async function SavedPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login?next=/saved");

  const db = createSupabaseServerClient();
  const [ids, member] = await Promise.all([listBookmarkIds(db, user.id), getSessionMember()]);
  const canEdit = Boolean(member); // org staff (ADMIN/TEACHER) can edit; students can't
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;

  const questions = ids.length ? await queryQuestionsByIds(db, ids) : [];
  // Preserve bookmark order (newest-first); queryQuestionsByIds may reorder.
  const byId = new Map(questions.map((q) => [q.id, q]));
  const ordered = ids
    .map((id) => byId.get(id))
    .filter((q): q is NonNullable<typeof q> => Boolean(q));

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          <Bookmark className="h-5 w-5 text-brand-accent" aria-hidden />
          Saved questions
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {ordered.length} saved.
        </p>

        {ordered.length === 0 ? (
          <p className="mt-8 rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
            No saved questions yet. Tap the bookmark icon on any question in{" "}
            <Link href="/browse" className="text-brand-accent underline">
              Browse
            </Link>{" "}
            to save it here.
          </p>
        ) : (
          <ol className="mt-6 space-y-3">
            {ordered.map((q, i) => (
              <li key={q.id}>
                <QuestionCard
                  question={q}
                  index={i + 1}
                  canEdit={canEdit}
                  isLoggedIn
                  includeExam
                  supabaseUrl={supabaseUrl}
                />
              </li>
            ))}
          </ol>
        )}
      </main>
    </>
  );
}
