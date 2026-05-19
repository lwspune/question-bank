import Link from "next/link";
import { ArrowRight, Atom, BookOpen, Compass, FlaskConical, Globe, Landmark, Languages, Leaf, Newspaper, NotebookPen, Scale, Sparkles, TrendingUp } from "lucide-react";

const SUPPORTED_EXAMS = ["MHT-CET", "NDA"];
const COMING_SOON_EXAMS = ["IPMAT", "CUET", "NEET", "JEE Main"];

export default function Hero({
  totalPublicQuestions,
}: {
  totalPublicQuestions: number;
}) {
  return (
    <section className="mb-6 rounded-xl border bg-gradient-to-br from-primary/5 via-background to-background p-4 shadow-sm sm:mb-8 sm:p-8">
      <div
        className="mb-3 flex animate-fade-in-up flex-wrap items-center gap-2 sm:mb-4"
        style={{ animationDelay: "0ms" }}
      >
        <Link
          href="/nda"
          className="group inline-flex items-center gap-1.5 rounded-full border border-primary/50 bg-primary/15 px-2.5 py-1 text-xs font-semibold text-primary transition-colors hover:border-primary/70 hover:bg-primary/20"
        >
          <Compass className="h-3 w-3" aria-hidden />
          <span>NDA preparation home</span>
          <ArrowRight
            className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </Link>
        <Link
          href="/guide/nda-maths"
          className="group inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary transition-colors hover:border-primary/50 hover:bg-primary/15"
        >
          <BookOpen className="h-3 w-3" aria-hidden />
          <span>
            New: <span className="font-semibold">NDA Maths strategy guide</span>
          </span>
          <ArrowRight
            className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </Link>
        <Link
          href="/guide/nda-english"
          className="group inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary transition-colors hover:border-primary/50 hover:bg-primary/15"
        >
          <Languages className="h-3 w-3" aria-hidden />
          <span>
            New: <span className="font-semibold">NDA English strategy guide</span>
          </span>
          <ArrowRight
            className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </Link>
        <Link
          href="/guide/nda-physics"
          className="group inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary transition-colors hover:border-primary/50 hover:bg-primary/15"
        >
          <Atom className="h-3 w-3" aria-hidden />
          <span>
            New: <span className="font-semibold">NDA Physics strategy guide</span>
          </span>
          <ArrowRight
            className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </Link>
        <Link
          href="/guide/nda-chemistry"
          className="group inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary transition-colors hover:border-primary/50 hover:bg-primary/15"
        >
          <FlaskConical className="h-3 w-3" aria-hidden />
          <span>
            New: <span className="font-semibold">NDA Chemistry strategy guide</span>
          </span>
          <ArrowRight
            className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </Link>
        <Link
          href="/guide/nda-biology"
          className="group inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary transition-colors hover:border-primary/50 hover:bg-primary/15"
        >
          <Leaf className="h-3 w-3" aria-hidden />
          <span>
            New: <span className="font-semibold">NDA Biology strategy guide</span>
          </span>
          <ArrowRight
            className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </Link>
        <Link
          href="/guide/nda-geography"
          className="group inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary transition-colors hover:border-primary/50 hover:bg-primary/15"
        >
          <Globe className="h-3 w-3" aria-hidden />
          <span>
            New: <span className="font-semibold">NDA Geography strategy guide</span>
          </span>
          <ArrowRight
            className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </Link>
        <Link
          href="/guide/nda-history"
          className="group inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary transition-colors hover:border-primary/50 hover:bg-primary/15"
        >
          <Landmark className="h-3 w-3" aria-hidden />
          <span>
            New: <span className="font-semibold">NDA History strategy guide</span>
          </span>
          <ArrowRight
            className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </Link>
        <Link
          href="/guide/nda-polity"
          className="group inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary transition-colors hover:border-primary/50 hover:bg-primary/15"
        >
          <Scale className="h-3 w-3" aria-hidden />
          <span>
            New: <span className="font-semibold">NDA Polity strategy guide</span>
          </span>
          <ArrowRight
            className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </Link>
        <Link
          href="/guide/nda-economics"
          className="group inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary transition-colors hover:border-primary/50 hover:bg-primary/15"
        >
          <TrendingUp className="h-3 w-3" aria-hidden />
          <span>
            New: <span className="font-semibold">NDA Economics strategy guide</span>
          </span>
          <ArrowRight
            className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </Link>
        <Link
          href="/guide/nda-current-affairs"
          className="group inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary transition-colors hover:border-primary/50 hover:bg-primary/15"
        >
          <Newspaper className="h-3 w-3" aria-hidden />
          <span>
            New: <span className="font-semibold">NDA Current Affairs strategy guide</span>
          </span>
          <ArrowRight
            className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </Link>
        <Link
          href="/notes/nda-maths/statistics"
          className="group inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary transition-colors hover:border-primary/50 hover:bg-primary/15"
        >
          <NotebookPen className="h-3 w-3" aria-hidden />
          <span>
            New: <span className="font-semibold">Statistics teaching notes</span>
          </span>
          <ArrowRight
            className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </Link>
      </div>
      <h1
        className="animate-fade-in-up font-serif text-2xl font-semibold tracking-tight sm:text-4xl"
        style={{ animationDelay: "0ms" }}
      >
        Build a question paper in 60 seconds.
      </h1>
      <p
        className="mt-2 max-w-2xl animate-fade-in-up text-sm text-muted-foreground sm:mt-3 sm:text-base"
        style={{ animationDelay: "80ms" }}
      >
        Filter past-year questions by exam, chapter, difficulty, and year.
        Download the Question Paper + Answer Key as Word files. Free, no
        sign-up.
      </p>
      <div
        className="mt-3 animate-fade-in-up space-y-2 text-xs sm:mt-5"
        style={{ animationDelay: "160ms" }}
      >
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border bg-card px-2.5 py-1 font-medium shadow-sm">
            {totalPublicQuestions.toLocaleString("en-IN")} public questions
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
          <span className="text-muted-foreground">Available now:</span>
          {SUPPORTED_EXAMS.map((e) => (
            <span
              key={e}
              className="rounded-full bg-emerald-100 px-2 py-0.5 font-medium text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300"
            >
              {e}
            </span>
          ))}
        </div>
        {/* "Coming soon" hidden on mobile so the first question card lands
            in the initial viewport. Desktop has the room. */}
        <div className="hidden flex-wrap items-center gap-x-2 gap-y-1.5 sm:flex">
          <span className="inline-flex items-center gap-1 text-muted-foreground">
            <Sparkles className="h-3 w-3" aria-hidden />
            Coming soon:
          </span>
          {COMING_SOON_EXAMS.map((e) => (
            <span
              key={e}
              className="rounded-full border border-border/60 bg-background px-2 py-0.5 font-medium text-muted-foreground"
            >
              {e}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
