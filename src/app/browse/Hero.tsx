export default function Hero({
  totalPublicQuestions,
}: {
  totalPublicQuestions: number;
}) {
  const stats = [
    { value: totalPublicQuestions.toLocaleString("en-IN"), label: "public questions" },
    { value: "Free", label: "to browse, forever" },
  ];

  return (
    <section className="mb-5 rounded-xl border bg-gradient-to-br from-brand-accent/10 via-background to-background p-4 shadow-sm sm:mb-6 sm:p-6">
      <h1
        className="animate-fade-in-up font-serif text-2xl font-semibold tracking-tight sm:text-4xl"
        style={{ animationDelay: "0ms" }}
      >
        Practice every past-year question.
      </h1>
      <p
        className="mt-2 max-w-2xl animate-fade-in-up text-sm text-muted-foreground sm:mt-3 sm:text-base"
        style={{ animationDelay: "80ms" }}
      >
        Filter thousands of real PYQs by exam, chapter, difficulty and year.
        Preview free, reveal answers, save what matters — or download a full
        paper + answer key.
      </p>

      {/* Stat band — gives the hero weight + the brand accent its first
          appearance on the page. */}
      <dl
        className="mt-4 flex animate-fade-in-up flex-wrap gap-x-6 gap-y-2 sm:mt-5"
        style={{ animationDelay: "120ms" }}
      >
        {stats.map((s) => (
          <div key={s.label} className="flex items-baseline gap-1.5">
            <dt className="sr-only">{s.label}</dt>
            <dd className="text-xl font-semibold tabular-nums tracking-tight text-brand-accent sm:text-2xl">
              {s.value}
            </dd>
            <span className="text-xs text-muted-foreground sm:text-sm">
              {s.label}
            </span>
          </div>
        ))}
      </dl>
    </section>
  );
}
