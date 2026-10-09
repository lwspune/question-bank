import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { getSessionSuperadmin } from "@/lib/auth";
import { getImatChapter, getImatSubject } from "@/lib/sites/imat/notes/registry";
import ConceptUnitCard from "@/app/notes/_components/ConceptUnitCard";
import SubtopicSummary from "@/app/notes/_components/SubtopicSummary";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "IMAT notes preview",
  robots: { index: false, follow: false },
};

type Params = { params: { subjectRoute: string; chapterSlug: string; subtopicSlug: string } };

/**
 * One IMAT notes page, drawn by the same concept card as PYQ Vault's /notes.
 * No featured past question and no drill (every IMAT row is PRIVATE), and no
 * report button (the report API only knows PYQ Vault's slugs).
 */
export default async function ImatSubtopicPreview({ params }: Params) {
  if (!(await getSessionSuperadmin())) redirect("/browse");
  const subject = getImatSubject(params.subjectRoute);
  const entry = getImatChapter(params.subjectRoute, params.chapterSlug);
  const note = entry?.notes[params.subtopicSlug];
  if (!subject || !entry || !note) notFound();

  const order = entry.chapter.subtopicOrder;
  const at = order.indexOf(params.subtopicSlug);
  const base = `/dashboard/imat-notes/${entry.subjectRoute}/${entry.chapterSlug}`;
  const prev = at > 0 ? order[at - 1] : null;
  const next = at < order.length - 1 ? order[at + 1] : null;

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-3xl space-y-8 px-4 py-8 sm:px-6">
        <Link
          href={base}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
          {entry.chapter.chapterName}
        </Link>
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-accent">
            {subject.subjectDisplay} · page {at + 1} of {order.length}
          </p>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{note.title}</h1>
          <p className="font-serif text-lg leading-relaxed">{note.oneLineDefinition}</p>
          <p className="text-sm text-muted-foreground">{note.whyItMatters}</p>
        </header>

        <div className="space-y-8">
          {note.concepts.map((c, i) => (
            <ConceptUnitCard
              key={c.slug}
              concept={c}
              subtopicSlug={params.subtopicSlug}
              index={i + 1}
              total={note.concepts.length}
              pyqExample={null}
              drillQuestionIds={[]}
              showReport={false}
            />
          ))}
        </div>

        <SubtopicSummary note={note} />

        <nav className="flex flex-wrap justify-between gap-3 border-t pt-6" aria-label="Pages in this chapter">
          {prev ? (
            <Link
              href={`${base}/${prev}`}
              className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-brand-accent hover:bg-brand/10"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
              {entry.notes[prev].title}
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={`${base}/${next}`}
              className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-brand-accent hover:bg-brand/10"
            >
              {entry.notes[next].title}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          )}
        </nav>
      </main>
    </>
  );
}
