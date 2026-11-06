import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookMarked,
  BookOpen,
  CalendarDays,
  Compass,
  FileText,
  FlaskConical,
  GraduationCap,
  Layers,
  Landmark,
  Library,
  ListTree,
  NotebookPen,
  School,
  Stethoscope,
  Target,
  Timer,
} from "lucide-react";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import { getExamCatalogForRender } from "@/lib/exam/allExamStats";
import { countSummary } from "@/lib/exam/questionCounts";
import { examCardAnchor, homeExamChips } from "@/lib/exam/homeChips";
import HomeExamChips from "@/components/home/HomeExamChips";
import HowItWorks from "@/components/HowItWorks";
import ContinueCard from "@/components/visits/ContinueCard";
import ResultsStrip from "@/components/results/ResultsStrip";
import { loopFor } from "@/lib/education/howItWorks";
import { wwwNotesChapterCount } from "@/lib/notes/notesNav";
import { getExamBySlug, type ExamSlug } from "@/lib/exam/examContext";
import { groupExamFamilies, familyTotal, membersByStage } from "@/lib/exam/examFamily";
import { sortByDemand, withChosenExamFirst } from "@/lib/exam/demandOrder";

/**
 * The homepage body (2026-11-06). Rendered by `/` (no chosen exam) and by the
 * per-exam copies at /home-exam/<slug>, which middleware serves at `/` to a
 * signed-out visitor whose qb_exam cookie names an exam. Both are cached: this
 * component reads nothing about the request. Signed-in visitors never reach it;
 * middleware sends them to their own home (lib/supabase/middleware routeHome).
 */

// Title <= 70 and description <= 160 characters: Bing flags both past those
// lengths ("Title too long", "Meta Description too long or too short"), and
// search results cut the rest. The old description was 295 characters.
export const PAGE_TITLE = "PYQ Vault — Previous Year Question Papers for Entrance & Board Exams";
export const PAGE_DESCRIPTION =
  "Free previous year questions (PYQs) for NDA, MHT-CET, JEE, NEET, CDS, MPSC and Maharashtra " +
  "boards, with worked answers, chapter notes and timed mock tests.";

/** The homepage's metadata; the per-exam copies add noindex on top. */
export const HOME_METADATA: Metadata = {
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
    blurb: "National Defence Academy: Maths + GAT across nine subjects.",
  },
  "mht-cet": {
    Icon: FlaskConical,
    blurb: "Maharashtra CET: Physics, Chemistry and Maths, shift-wise papers from 2021 to 2026.",
  },
  "jee-mains": {
    Icon: Layers,
    blurb: "JEE Main: shift-wise Physics, Chemistry and Maths papers from 2021 to 2026, numeric answers included.",
  },
  neet: {
    Icon: Stethoscope,
    blurb: "NEET (UG): Physics, Chemistry, Botany and Zoology, with official keys and worked solutions.",
  },
  cds: {
    Icon: GraduationCap,
    blurb: "Combined Defence Services: English, General Knowledge and Elementary Maths papers.",
  },
  "foundation-course": {
    Icon: School,
    blurb: "Class 9/10 NCERT worksheets: Physics, Chemistry & Biology.",
  },
  "mh-hsc-12": {
    Icon: BookMarked,
    blurb: "Maharashtra State Board: Class 12 textbook solutions, book-faithful.",
  },
  "worksheets-11-12": {
    Icon: NotebookPen,
    blurb: "Class 11 and 12 Maths worksheets for NDA, every answer worked out again from scratch.",
  },
  "upsc-cse": {
    Icon: Landmark,
    blurb: "UPSC Civil Services Prelims: both papers of every sitting from 2017 to 2026, with UPSC's official keys.",
  },
  afcat: {
    Icon: Target,
    blurb: "AFCAT Numerical Ability, chapter by chapter: past questions, practice and notes.",
  },
  spi: {
    Icon: School,
    blurb: "Services Preparatory Institute entrance (Class 10): the 2022 paper and ten practice papers.",
  },
  uceed: {
    Icon: Compass,
    blurb: "UCEED, IIT Bombay's design entrance: every Part A paper from 2015 to 2026, each one also a timed mock.",
  },
};

const DEFAULT_EXAM_META = { Icon: BookOpen, blurb: "Previous year question bank." };

// Board-family cards. The six (board, class) exams render as two cards with
// their classes as links inside, rather than six competing tiles.
//
// A family card deliberately gets NO single destination: each member has its
// own exam home (pickExamCardHref), so a family href would either pick a class
// silently or drop the visitor in the unfiltered bank. The class links inside
// the card each open that class's home.
//
// No "Textbook"/"Worksheets" tag either — the members disagree (mh-ssc-10 is
// board PYQs, not a textbook corpus), so one tag for the card would be false.
const FAMILY_META: Record<string, { Icon: typeof BookOpen; blurb: string }> = {
  CBSE: {
    Icon: Library,
    blurb:
      "NCERT textbook solutions for Class 10, 11 and 12, plus CBSE board past papers.",
  },
  "Maharashtra State Board": {
    Icon: BookMarked,
    blurb:
      "Balbharati textbook solutions Class 9 to 12, plus SSC and HSC board past papers.",
  },
  MPSC: {
    Icon: Landmark,
    blurb:
      "Maharashtra PSC: State Services, Group B & C, Forest and Agriculture Service Prelims, plus the Mains language papers, keyed from MPSC's own answer keys.",
  },
  CISCE: {
    Icon: Library,
    blurb: "ICSE Class 10 and ISC Class 12 board papers from 2025 and 2026: Maths and Science, worked answers.",
  },
  IPMAT: {
    Icon: Compass,
    blurb: "IPMAT Indore, IPMAT Rohtak and JIPMAT past papers: Quant, Verbal and Logical Reasoning.",
  },
  "SSC CGL": {
    Icon: Landmark,
    blurb: "SSC CGL Tier I shifts from 2023 to 2025 and Tier II papers, answers checked against SSC's key.",
  },
};

type SurfacePreview = {
  href: string;
  title: string;
  blurb: string;
  Icon: typeof BookOpen;
};

// These nine render side by side in one grid, so a reader takes them in at a
// glance. They are therefore written in DELIBERATELY DIFFERENT shapes — a
// declarative pair, a question, a colon-list, a short pair, a contrast, an
// instruction. The original set were all "noun phrase — tricolon of features",
// and copies of one rhythm in one eyeful is what reads as machine-written. Keep
// them structurally unlike each other when editing.
//
// /questions and /mock joined on 2026-09-17 for CRAWLING as much as for readers:
// the homepage linked two internal destinations, and Search Console reported 12
// of 1,474 pages indexed with discovery running at ~0.41 URLs/day. Guarded by
// tests/crawl-entry-points.test.ts.
const SURFACES: SurfacePreview[] = [
  {
    href: "/browse",
    title: "Question bank",
    blurb:
      "Filter by exam, chapter, subtopic, difficulty and year. Try each question first, then open the answer and the worked solution.",
    Icon: Compass,
  },
  {
    href: "/guide",
    title: "Strategy guides",
    blurb:
      "Which chapters actually carry the marks? Every weightage and difficulty figure in these guides was counted off the papers themselves, not taken from a syllabus.",
    Icon: BookOpen,
  },
  {
    href: "/notes",
    title: "Teaching notes",
    // Chapter count is read from the nav index, never typed: www's chapters
    // only, the count /notes lists (the intl exams' notes live on intl).
    blurb:
      `One page per subtopic: the idea in plain language, the formula, a solved previous year question, and the traps that catch people. ${wwwNotesChapterCount()} chapters so far.`,
    Icon: NotebookPen,
  },
  {
    href: "/questions",
    title: "Questions by chapter",
    // Shape: a contrast, then the case for it. Not a feature list.
    blurb:
      "The same bank, addressed by chapter instead of by filter. Useful on the days you already know it is Quadratic Equations you need and nothing else.",
    Icon: ListTree,
  },
  {
    href: "/mock",
    title: "Timed mock tests",
    // Shape: an instruction, then what you are left holding. The only
    // second-person card in the grid — keep it that way.
    blurb:
      "Sit a real past paper against the real clock. When the timer stops you get a score, a section-by-section split, and every question you got wrong.",
    Icon: Timer,
  },
  {
    href: "/board",
    title: "Board textbook reader",
    blurb:
      "Balbharati and NCERT textbooks, read in book order. Solved examples, then the exercise, then miscellaneous, with worked answers throughout.",
    Icon: Library,
  },
  {
    href: "/question-papers",
    title: "Board past papers",
    // Shape: what it is, then the one thing that makes it worth opening.
    blurb:
      "Each paper as the board set it, section by section. Every question has a model answer you can open under it.",
    Icon: FileText,
  },
  {
    href: "/homework",
    title: "Daily homework",
    // Shape: a routine, then the extra it comes with.
    blurb:
      "A short set every day, chapter by chapter, until the subject is done. Every plan also lists each chapter's ten most-asked questions.",
    Icon: CalendarDays,
  },
  {
    href: "/drill",
    title: "Fix your mistakes",
    // Signed out, this asks you to sign in first: the queue is yours alone.
    blurb:
      "Five of the questions you got wrong, a few minutes a day. Get one right and it goes quiet; miss it and it comes back.",
    Icon: Target,
  },
];

export default async function HomeLanding({ chosen }: { chosen: ExamSlug | null }) {
  // Cached (24h): the page itself is cached too, but a revalidation still
  // reads these 12 head-counts. A failed load leaves the numbers out rather
  // than printing 0 (2026-10-08).
  const { catalog, countsKnown } = await getExamCatalogForRender();
  // Group the six (board, class) exams into two family cards. Presentation
  // only: every class link keeps the exact href it had before, and the hero's
  // exam COUNT below still reports 13 — we do have 13 corpora.
  // Most-chosen exams first (lib/exam/demandOrder), not the registry's NDA-first order.
  // ...and the visitor's own exam (qb_exam, set by the chips below) before all.
  // Middleware reads that cookie and picks the copy; this render never does.
  const examNodes = withChosenExamFirst(
    sortByDemand(groupExamFamilies(catalog.exams, (e) => getExamBySlug(e.slug))),
    chosen
  );

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

        {/*
          The one strong moment on the site (2026-10-04): the brand panel, with
          the product itself on the right. Both counts are read from the catalog
          this page already fetches, so the claim cannot drift from the bank,
          and both kinds are named (UX_REVIEW_TRIAGE.md D1).
        */}
        <section className="hero-brand mb-8 rounded-3xl px-5 py-7 sm:px-8 sm:py-10">
          {/* eslint-disable-next-line @next/next/no-img-element -- decorative static asset, 14 KB */}
          <img
            src="/icons/mark-256.webp"
            alt=""
            aria-hidden
            width={256}
            height={256}
            className="pointer-events-none absolute -right-10 -top-8 w-52 opacity-[0.14] sm:w-64"
          />
          <div className="relative grid items-center gap-8 md:grid-cols-[1.15fr_1fr]">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                Practise the questions your exam actually asks.
              </h1>
              <p className="mt-4 max-w-xl font-serif text-base leading-relaxed text-white/85 sm:text-lg">
                Every past paper, sorted by chapter, with worked answers. We find the chapters that cost you marks and bring your mistakes back until you get them right.
              </p>
              <ul className="mt-5 flex flex-wrap gap-2 text-xs font-semibold" aria-label="What is in the bank">
                {countsKnown && (
                  <>
                    <li className="rounded-full border border-white/25 bg-white/10 px-3 py-1 tabular-nums">
                      <span className="text-cyan-200">{catalog.totals.pyq.toLocaleString("en-IN")}</span> previous year questions
                    </li>
                    <li className="rounded-full border border-white/25 bg-white/10 px-3 py-1 tabular-nums">
                      <span className="text-cyan-200">{catalog.totals.practice.toLocaleString("en-IN")}</span> textbook and practice
                    </li>
                  </>
                )}
                <li className="rounded-full border border-white/25 bg-white/10 px-3 py-1 tabular-nums">
                  <span className="text-cyan-200">{catalog.exams.length}</span> exams · free to browse
                </li>
              </ul>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/browse"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#0f1d4a] shadow-lg transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1d4a]"
                >
                  <Compass className="h-4 w-4" aria-hidden />
                  Start practising free
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
                <Link
                  href="/mock"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/35 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1d4a]"
                >
                  <Timer className="h-4 w-4" aria-hidden />
                  Sit a real past paper
                </Link>
              </div>
            </div>
            {/* The product, not a description of it: a real 2026 NDA question
                answered on a bank card (public/marketing/, captured from the
                live card so it shows exactly what a student gets). */}
            {/* eslint-disable-next-line @next/next/no-img-element -- static marketing screenshot */}
            <img
              src="/marketing/answer-card.webp"
              alt="A 2026 NDA question on PYQ Vault with the correct answer marked and the worked solution below it"
              width={640}
              height={1198}
              className="mx-auto max-h-[340px] w-full max-w-sm rounded-2xl object-cover object-top shadow-2xl ring-1 ring-white/20 [mask-image:linear-gradient(to_bottom,black_75%,transparent)] md:max-h-none md:max-w-[340px] md:[mask-image:none]"
            />
          </div>
        </section>

        {/* A returning signed-out visitor's last notes topic or chapter page. */}
        <ContinueCard />

        {/* A8: pick an exam without scrolling past every card. */}
        <HomeExamChips chips={homeExamChips(examNodes)} />

        {/* A9: the loop /start teaches, rendered from the same object so it
            cannot describe a loop the app does not have. /start had one
            signed-in viewer in the week to 2026-10-02. */}
        <section className="mb-12" aria-labelledby="how-it-works">
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
            <h2 id="how-it-works" className="section-title text-xl font-semibold tracking-tight sm:text-2xl">
              How it works
            </h2>
            <Link
              href="/start"
              className="inline-flex items-center gap-1 rounded text-sm font-medium text-brand-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              More on this
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>
          <HowItWorks loop={loopFor(null)} compact />
        </section>

        {/* Exam catalog — the pick-your-exam front door. `/exams` lands here. */}
        <section id="exams" className="mb-12 scroll-mt-20">
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="section-title text-xl font-semibold tracking-tight sm:text-2xl">
              Choose your exam
            </h2>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {examNodes.map((node) => {
              if (node.kind === "family") {
                const meta = FAMILY_META[node.key] ?? DEFAULT_EXAM_META;
                const Icon = meta.Icon;
                // Each kind summed separately and named (UX_REVIEW_TRIAGE.md
                // A1), so the past-year figure matches what /browse shows.
                const familyCounts = {
                  pyq: familyTotal(node, (e) => e.counts.pyq),
                  practice: familyTotal(node, (e) => e.counts.practice),
                };
                const familySummary = countSummary(familyCounts);
                return (
                  <li key={node.key} id={examCardAnchor(node.key)} className="scroll-mt-20">
                    <div className="flex h-full flex-col rounded-lg border bg-card p-4">
                      <div className="mb-2 flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg icon-tile">
                          <Icon className="h-4 w-4" aria-hidden />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold tracking-tight">
                            {node.label}
                          </p>
                          {countsKnown && (
                            <p className="text-xs tabular-nums text-muted-foreground">
                              {familySummary ?? "Coming soon"}
                            </p>
                          )}
                        </div>
                      </div>
                      <p className="mt-1 font-serif text-sm leading-relaxed text-muted-foreground">
                        {meta.blurb}
                      </p>
                      {membersByStage(node).map((group) => (
                        <div key={group.stage ?? "all"}>
                          {group.stage && (
                            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                              {group.stage}
                            </p>
                          )}
                          <ul className={`${group.stage ? "mt-1.5" : "mt-3"} flex flex-wrap gap-1.5`}>
                            {group.members.map((cls) => (
                              <li key={cls.item.slug}>
                                <Link
                                  href={cls.item.href}
                                  // The visible text is "Class 9", which on its own
                                  // does not say which board — so the accessible
                                  // name carries it.
                                  aria-label={[node.label, group.stage, cls.label].filter(Boolean).join(" ")}
                                  className="inline-flex items-center gap-1 rounded-full border bg-background px-2.5 py-1 text-xs font-medium transition-colors hover:border-brand-accent/60 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                >
                                  {cls.label}
                                  <ArrowRight className="h-3 w-3 text-muted-foreground" aria-hidden />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </li>
                );
              }
              const exam = node.item;
              const meta = EXAM_META[exam.slug] ?? DEFAULT_EXAM_META;
              const Icon = meta.Icon;
              const tag = exam.boardExam
                ? "Textbook"
                : exam.practiceOnly
                  ? "Worksheets"
                  : null;
              return (
                <li key={exam.slug} id={examCardAnchor(exam.slug)} className="scroll-mt-20">
                  <Link
                    href={exam.href}
                    className="group flex h-full flex-col rounded-lg border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-accent"
                  >
                    <div className="mb-2 flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg icon-tile">
                        <Icon className="h-4 w-4" aria-hidden />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold tracking-tight">
                          {exam.displayName}
                        </p>
                        <p className="text-xs tabular-nums text-muted-foreground">
                          {countsKnown && (countSummary(exam.counts) ?? "Coming soon")}
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

        {/* Our students' newest published result (migration 0149). Below the
            exam list since 2026-11-02: it names one exam, so it should not be
            the first thing every other exam's student reads. */}
        <ResultsStrip className="mb-12" />

        {/* What's inside — surface previews */}
        <section className="mb-12">
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="section-title text-xl font-semibold tracking-tight sm:text-2xl">
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
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg icon-tile">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <h3 className="text-base font-semibold tracking-tight">
                      {title}
                    </h3>
                  </div>
                  <p className="mt-1 font-serif text-sm leading-relaxed text-muted-foreground">
                    {blurb}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary">
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
            For teachers: build a paper in two clicks
          </h2>
          <p className="mt-2 max-w-2xl font-serif text-sm leading-relaxed text-muted-foreground">
            Pick the chapters and difficulty you want. Check every question on
            screen, then download two files, ready to print: the question
            paper and a separate answer key.
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
