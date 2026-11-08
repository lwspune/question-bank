import Link from "next/link";
import QuestionCard from "../browse/QuestionCard";
import type { QuestionRow } from "@/lib/questions/query";

/**
 * The saved list, as /saved showed it until 2026-11-08 (newest save first).
 * A list the student keeps: saving a question does not put it in To fix.
 */
export default function SavedList({
  cards,
  canEdit,
  supabaseUrl,
}: {
  cards: QuestionRow[];
  canEdit: boolean;
  supabaseUrl: string;
}) {
  if (cards.length === 0) {
    return (
      <p className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
        No saved questions yet. Tap the bookmark icon on any question in{" "}
        <Link href="/browse" prefetch={false} className="text-brand-accent underline">
          Browse
        </Link>{" "}
        or in a mock review to keep it here for revision week.
      </p>
    );
  }
  return (
    <ol className="space-y-3">
      {cards.map((q, i) => (
        <li key={q.id}>
          <QuestionCard question={q} index={i + 1} canEdit={canEdit} isLoggedIn includeExam supabaseUrl={supabaseUrl} />
        </li>
      ))}
    </ol>
  );
}
