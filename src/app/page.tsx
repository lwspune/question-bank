import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookMarked,
  BookOpen,
  Compass,
  FlaskConical,
  GraduationCap,
  Layers,
  Library,
  NotebookPen,
  School,
  Sparkles,
  Stethoscope,
  Target,
} from "lucide-react";
import { redirect } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import GuideHero from "@/app/guide/_components/GuideHero";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import { getSessionMember, getSessionUser } from "@/lib/auth";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { getExamCatalog } from "@/lib/exam/allExamStats";

export const revalidate = 86400;

const PAGE_TITLE =
  "PYQ Vault — Past-Year Question Papers for Indian Entrance & Board Exams";
const PAGE_DESCRIPTION =
  "Free past-year question banks for NDA, MHT-CET, JEE Mains, NEET, CDS and " +
  "Maharashtra State Board. Filter by chapter, difficulty and year, then " +
  "download a question paper + answer key — plus strategy guides and " +
  "concept-by-concept teaching notes. Free, no sign-up.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    type: "website",
  },
};

// Per-exam card icon + one-line pitch. Keyed by slug so it stays in sync with
// EXAM_REGISTRY without hard-coding the exam order here.
const EXAM_META: Record<
  string,
  { Icon: typeof BookOpen; blurb: string }
> = {
  nda: {
    Icon: Target,
    blurb: "National Defence Academy — Maths + GAT across nine subjects.",
  },
  "mht-cet": {
    Icon: FlaskConical,
    blurb: "Maharashtra CET — Physics, Chemistry & Maths, shift-wise PYQs.",
  },
  "jee-mains": {
    Icon: Layers,
    blurb: "JEE Mains — shift-wise PCM past papers.",
  },
  neet: {
    Icon: Stethoscope,
    blurb: "NEET (UG) — Physics, Chemistry, Botany & Zoology with keys.",
  },
  cds: {
    Icon: GraduationCap,
    blurb: "Combined Defence Services — English past papers.",
  },
  "foundation-course": {
    Icon: School,
    blurb: "Class 9/10 NCERT worksheets — Physics, Chemistry & Biology.",
  },
  "mh-hsc-12": {
    Icon: BookMarked,
    blurb: "Maharashtra State Board — Class 12 textbook solutions, book-faithful.",
  },
};

const DEFAULT_EXAM_META = { Icon: BookOpen, blurb: "Past-year question bank." };

type SurfacePreview = {
  href: string;
  title: string;
  blurb: string;
  Icon: typeof BookOpen;
};

const SURFACES: SurfacePreview[] = [
  {
    href: "/browse",
    title: "Question bank",
    blurb:
      "Filter by exam, chapter, subtopic, difficulty and PYQ year — then download a Question Paper + Answer Key as Word files.",
    Icon: Compass,
  },
  {
    href: "/guide/nda",
    title: "Strategy guides",
    blurb:
      "Evidence-led, per-subject guides built from the live bank — chapter strategy, playbooks, year-on-year drift and the traps that recur.",
    Icon: BookOpen,
  },
  {
    href: "/notes",
    title: "Teaching notes",
    blurb:
      "Concept-by-concept notes with intuition, formula, a worked PYQ and a one-click drill of every past-year question on that subtopic.",
    Icon: NotebookPen,
  },
  {
    href: "/board",
    title: "Board textbook reader",
    blurb:
      "State Board textbooks read exercise-by-exercise in physical book order — solved examples, exercises and miscellaneous, with worked answers.",
    Icon: Library,
  },
];

export default async function Home() {
  // Signed-in users keep their existing fast paths — only anonymous visitors
  // see the landing page. Admins → dashboard; orphan students → dashboard.
  const member = await getSessionMember();
  if (member) redirect("/dashboard");
  const user = await getSessionUser();
  if (user) redirect("/dashboard");

  const supabase = createSupabaseAnonClient();
  const catalog = await getExamCatalog(supabase);

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-5xl px-4 pb-16 pt-6 sm:px-6 sm:pt-8">
        <GuideJsonLd
          type="CollectionPage"
          path="/"
          headline={PAGE_TITLE}
          description={PAGE_DESCRIPTION}
        />

        <GuideHero
          eyebrow="PYQ Vault"
          title="Past-year question papers for Indian entrance & board exams"
          subtitle="One home for the past-year question bank, strategy guides and concept notes — across seven exams. Free, no sign-up, anonymous-friendly."
        />

        {/* Live total + primary CTA */}
        <section className="mb-12 rounded-xl border bg-card p-5 shadow-sm sm:p-6">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full border bg-background px-2.5 py-1 font-semibold tabular-nums">
              <Sparkles className="h-3.5 w-3.5 text-brand-accent" aria-hidden />
              {catalog.totalPublicQuestions.toLocaleString("en-IN")} questions
            </span>
            <span className="text-muted-foreground">
              {catalog.exams.length} exams · free to browse & download
            </span>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/browse"
              className="inline-flex items-center gap-2 rounded-md bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground shadow-sm transition-colors hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Compass className="h-4 w-4" aria-hidden />
              Browse the question bank
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
            <Link
              href="/guide/nda"
              className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <BookOpen className="h-4 w-4" aria-hidden />
              Explore the guides
            </Link>
          </div>
        </section>

        {/* Exam catalog — the pick-your-exam front door */}
        <section className="mb-12">
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Choose your exam
            </h2>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {catalog.exams.map((exam) => {
              const meta = EXAM_META[exam.slug] ?? DEFAULT_EXAM_META;
              const Icon = meta.Icon;
              const tag = exam.boardExam
                ? "Textbook"
                : exam.practiceOnly
                  ? "Worksheets"
                  : null;
              return (
                <li key={exam.slug}>
                  <Link
                    href={exam.href}
                    className="group flex h-full flex-col rounded-lg border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-accent"
                  >
                    <div className="mb-2 flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <Icon className="h-4 w-4" aria-hidden />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold tracking-tight">
                          {exam.displayName}
                        </p>
                        <p className="text-xs tabular-nums text-muted-foreground">
                          {exam.totalPublicQuestions > 0
                            ? `${exam.totalPublicQuestions.toLocaleString("en-IN")} questions`
                            : "Coming soon"}
                          {tag && (
                            <span className="ml-1.5 rounded-full border px-1.5 py-0.5 text-[10px] uppercase tracking-wide">
                              {tag}
                            </span>
                          )}
                        </p>
                      </div>
                      <ArrowRight
                        className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </div>
                    <p className="mt-1 font-serif text-sm leading-relaxed text-muted-foreground">
                      {meta.blurb}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        {/* What's inside — surface previews */}
        <section className="mb-12">
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              What&rsquo;s inside
            </h2>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {SURFACES.map(({ href, title, blurb, Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="group flex h-full flex-col rounded-lg border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-accent"
                >
                  <div className="mb-2 flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <h3 className="text-base font-semibold tracking-tight">
                      {title}
                    </h3>
                  </div>
                  <p className="mt-1 font-serif text-sm leading-relaxed text-muted-foreground">
                    {blurb}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Open
                    <ArrowRight className="h-3 w-3" aria-hidden />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Closing banner */}
        <section className="rounded-xl border border-dashed bg-muted/30 p-5 sm:p-6">
          <h2 className="text-base font-semibold tracking-tight">
            Build a paper in two clicks
          </h2>
          <p className="mt-2 max-w-2xl font-serif text-sm leading-relaxed text-muted-foreground">
            Filter the bank by exam, chapter, difficulty and PYQ year — then
            sign in to download the Question Paper + Answer Key as Word files.
          </p>
          <Link
            href="/browse"
            className="mt-4 inline-flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm font-semibold transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Compass className="h-4 w-4" aria-hidden />
            Open the question bank
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
