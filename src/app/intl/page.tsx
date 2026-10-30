import Link from "next/link";
import type { Metadata } from "next";
import { BookOpen, ClipboardCheck, ListChecks } from "lucide-react";
import IntlHeader from "@/components/header/IntlHeader";
import IntlFooter from "@/components/footer/IntlFooter";
import { EXAM_REGISTRY, type ExamEntry } from "@/lib/exam/examContext";
import { getCachedExamCatalog } from "@/lib/exam/allExamStats";
import { getNotesExamGroup } from "@/lib/notes/notesNav";
import { INTL_EXAMS, INTL_ORIGIN } from "@/lib/sites/intl";

/**
 * intl.pyqvault.com's home (2026-10-30). The middleware serves this page at
 * the intl host's "/", and www's /intl 308s here, so it has one address.
 */
export const revalidate = 86400;

const TITLE = "PYQ Vault International: IMAT past papers, notes and mock tests";
const DESCRIPTION =
  "Free IMAT practice: the ministry's past papers with worked solutions, original practice questions, notes for every chapter and timed mock tests.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: `${INTL_ORIGIN}/` },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${INTL_ORIGIN}/`, siteName: "PYQ Vault International", type: "website" },
};

/** What each international exam is, in a sentence, for its card. */
const ABOUT: Record<string, string> = {
  imat:
    "The International Medical Admissions Test for English-taught medicine and dentistry at Italy's public universities: 60 questions in 100 minutes across logic, reading, biology, chemistry, physics and maths.",
};

async function questionCounts(): Promise<Map<string, number>> {
  try {
    const catalog = await getCachedExamCatalog(EXAM_REGISTRY);
    return new Map(catalog.exams.map((e) => [e.slug, e.totalPublicQuestions]));
  } catch (err) {
    console.error("[intl home] catalogue unavailable", err);
    return new Map();
  }
}

export default async function IntlHome() {
  const counts = await questionCounts();
  return (
    <>
      <IntlHeader />
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <header className="hero-soft mb-10 rounded-2xl px-5 py-8 sm:px-8 sm:py-10">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Prepare for international entrance exams with real past papers
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Past papers with worked solutions, original practice questions, chapter notes and timed mocks
            that score you like the real exam. Free to browse.
          </p>
        </header>
        <div className="grid gap-6">
          {INTL_EXAMS.map((exam) => (
            <ExamCard key={exam.slug} exam={exam} questions={counts.get(exam.slug) ?? null} />
          ))}
        </div>
      </main>
      <IntlFooter />
    </>
  );
}

function ExamCard({ exam, questions }: { exam: ExamEntry; questions: number | null }) {
  const notes = getNotesExamGroup(exam.slug);
  const chapters = notes?.subjects.reduce((n, s) => n + s.chapterCount, 0) ?? 0;
  const actions = [
    {
      href: exam.notesPath ?? `/notes/${exam.slug}`,
      icon: BookOpen,
      title: "Notes",
      line: chapters > 0 ? `${chapters} chapters, every one with worked examples` : "Every chapter, with worked examples",
    },
    {
      href: `/mock/exam/${exam.slug}`,
      icon: ClipboardCheck,
      title: "Mock tests",
      line: "Timed, scored with the official marking",
    },
    {
      href: "/browse",
      icon: ListChecks,
      title: "Question bank",
      line: questions ? `${questions.toLocaleString("en-US")} questions with solutions` : "Every question, with solutions",
    },
  ];
  return (
    <section aria-labelledby={`exam-${exam.slug}`} className="rounded-2xl border bg-card p-6">
      <h2 id={`exam-${exam.slug}`} className="text-xl font-semibold">
        {exam.displayName}
      </h2>
      {ABOUT[exam.slug] && <p className="mt-2 text-sm text-muted-foreground">{ABOUT[exam.slug]}</p>}
      <ul className="mt-5 grid gap-3 sm:grid-cols-3">
        {actions.map((a) => (
          <li key={a.title}>
            <Link
              href={a.href}
              className="flex h-full items-start gap-3 rounded-xl border p-4 transition-colors hover:border-brand/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <a.icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-accent" aria-hidden />
              <span>
                <span className="block text-sm font-medium">{a.title}</span>
                <span className="mt-0.5 block text-xs text-muted-foreground">{a.line}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
