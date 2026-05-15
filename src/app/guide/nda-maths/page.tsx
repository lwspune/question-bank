import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import StatBlock from "@/app/guide/_components/StatBlock";
import BrowseLink from "@/app/guide/_components/BrowseLink";
import PrevNextNav from "@/app/guide/_components/PrevNextNav";
import { OVERVIEW, ROUTES } from "./_data/nda-maths";

/** Pages with full content as of this commit. Other section cards get a
 * "Coming soon" tag so readers know what to expect. */
const LIVE_SLUGS = new Set([
  "strategy",
  "principles",
  "compound-tricks",
  "trends",
  "traps",
]);

export const metadata: Metadata = {
  title: "NDA Mathematics — Strategy Guide",
  description:
    "How NDA Mathematics actually works. A 1,320-question analysis of the 2021–2026 papers — principles, strategy, traps, and how to score 100+.",
  alternates: { canonical: "/guide/nda-maths" },
};

export default function NdaMathsLanding() {
  const sideNav = ROUTES.map((r) => ({
    href: r.slug ? `/guide/nda-maths/${r.slug}` : "/guide/nda-maths",
    label: r.label,
  }));

  const stats = [
    { value: OVERVIEW.totalQ.toLocaleString("en-IN"), label: "Past-year questions" },
    { value: String(OVERVIEW.papers), label: "Papers (2021–2026)" },
    { value: String(OVERVIEW.chapters), label: "Chapters" },
    { value: String(OVERVIEW.principles), label: "Principle atoms" },
  ];

  // Skip the overview row for the inner-cards grid — that's this page.
  const sectionCards = ROUTES.filter((r) => r.slug !== "");

  return (
    <GuideShell
      guideTitle="NDA Mathematics Guide"
      sideNav={sideNav}
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { label: "NDA Mathematics" },
      ]}
    >
      <GuideHero
        eyebrow="NDA Mathematics Guide"
        title="How NDA Mathematics actually works"
        subtitle="A 1,320-question analysis of every paper from 2021 to 2026. We mapped the principles, the compound tricks, the year-on-year drift, and the distractor traps — so you can study what the exam actually tests, not what a textbook tells you to."
      >
        <StatBlock stats={stats} />
      </GuideHero>

      <BrowseLink examId={undefined} className="mt-2">
        Browse the full question bank
      </BrowseLink>

      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          What&rsquo;s inside
        </h2>
        <p className="mt-2 max-w-2xl font-serif text-sm leading-relaxed text-muted-foreground sm:text-base">
          Five sections, each answering a different question a student walks
          in with. Read top-to-bottom or jump to what you need.
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {sectionCards.map((r) => {
            const href = `/guide/nda-maths/${r.slug}`;
            const isLive = LIVE_SLUGS.has(r.slug);
            return (
              <li key={r.slug}>
                <Link
                  href={href}
                  className="group block rounded-lg border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-accent"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold tracking-tight">
                        {r.label}
                      </h3>
                      {!isLive && (
                        <span className="inline-flex items-center rounded-full border border-dashed bg-muted/40 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                          Coming soon
                        </span>
                      )}
                    </div>
                    <ArrowRight
                      className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                      aria-hidden
                    />
                  </div>
                  <p className="mt-1.5 font-serif text-sm leading-relaxed text-muted-foreground">
                    {r.blurb}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-12 rounded-lg border bg-muted/30 p-5">
        <h2 className="text-base font-semibold tracking-tight">
          Why we built this
        </h2>
        <div className="mt-2 space-y-2 font-serif text-sm leading-relaxed text-muted-foreground">
          <p>
            Most NDA Maths preparation is generic — practice everything,
            hope something sticks. We took the opposite approach: we
            extracted every question from every paper since 2021, classified
            them by the underlying principle, and looked at the patterns.
          </p>
          <p>
            Every claim on this site is verifiable. Click any &ldquo;Drill these
            X questions →&rdquo; link and you&rsquo;ll see the exact set we&rsquo;re
            talking about.
          </p>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Data snapshot: {new Date(OVERVIEW.asOf).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}.
          {" "}Numbers refresh as new papers land.
        </p>
      </section>

      <PrevNextNav
        next={{
          href: "/guide/nda-maths/strategy",
          label: "Strategy — Score 100+ in 50 hours",
        }}
      />
    </GuideShell>
  );
}
