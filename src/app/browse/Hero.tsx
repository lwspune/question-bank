import { Sparkles } from "lucide-react";

const SUPPORTED_EXAMS = ["MHT-CET", "NDA"];
const COMING_SOON_EXAMS = ["IPMAT", "CUET", "NEET", "JEE Main"];

export default function Hero({
  totalPublicQuestions,
}: {
  totalPublicQuestions: number;
}) {
  return (
    <section className="mb-8 rounded-xl border bg-gradient-to-br from-primary/5 via-background to-background p-6 shadow-sm sm:p-8">
      <h1
        className="animate-fade-in-up font-serif text-3xl font-semibold tracking-tight sm:text-4xl"
        style={{ animationDelay: "0ms" }}
      >
        Build a question paper in 60 seconds.
      </h1>
      <p
        className="mt-3 max-w-2xl animate-fade-in-up text-sm text-muted-foreground sm:text-base"
        style={{ animationDelay: "80ms" }}
      >
        Filter past-year questions by exam, chapter, difficulty, and year.
        Download the Question Paper + Answer Key as Word files. Free, no
        sign-up.
      </p>
      <div
        className="mt-5 animate-fade-in-up space-y-2 text-xs"
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
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
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
