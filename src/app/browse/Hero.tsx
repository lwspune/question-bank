import { Sparkles } from "lucide-react";

const SUPPORTED_EXAMS = ["MHT-CET"];
const COMING_SOON_EXAMS = ["NDA", "IPMAT", "CUET", "NEET", "JEE Main"];

export default function Hero({
  totalPublicQuestions,
}: {
  totalPublicQuestions: number;
}) {
  return (
    <section className="mb-8 rounded-xl border bg-gradient-to-br from-primary/5 via-background to-background p-6 sm:p-8">
      <h1 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
        Build a question paper in 60 seconds.
      </h1>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
        Filter past-year questions by exam, chapter, difficulty, and year.
        Download the Question Paper + Answer Key as Word files. Free, no
        sign-up.
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs">
        <span className="inline-flex items-center gap-1.5 rounded-full border bg-card px-2.5 py-1 font-medium">
          {totalPublicQuestions.toLocaleString("en-IN")} public questions
        </span>
        <span className="text-muted-foreground">Available now:</span>
        {SUPPORTED_EXAMS.map((e) => (
          <span
            key={e}
            className="rounded-full bg-emerald-100 px-2 py-0.5 font-medium text-emerald-800"
          >
            {e}
          </span>
        ))}
        <span className="text-muted-foreground">·</span>
        <span className="inline-flex items-center gap-1 text-muted-foreground">
          <Sparkles className="h-3 w-3" aria-hidden />
          Coming soon:
        </span>
        {COMING_SOON_EXAMS.map((e) => (
          <span
            key={e}
            className="rounded-full bg-muted px-2 py-0.5 font-medium text-muted-foreground"
          >
            {e}
          </span>
        ))}
      </div>
    </section>
  );
}
