import type { Metadata } from "next";
import { Target, AlertTriangle, Flame, Microscope, Compass } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import StatBlock from "@/app/guide/_components/StatBlock";
import PrevNextNav from "@/app/guide/_components/PrevNextNav";
import SignFlipHeatmap from "@/app/guide/_components/SignFlipHeatmap";
import WorkedExampleCard from "@/app/guide/_components/WorkedExampleCard";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { loadWorkedExamples } from "@/lib/guide/loadWorkedExamples";
import { ROUTES } from "../_data/nda-maths";
import {
  POSITIONAL_BIAS,
  POSITIONAL_BIAS_BY_DIFFICULTY,
  SIGN_FLIP_CELLS,
  FACTOR2_CELLS,
  FACTOR2_EXAMPLE_IDS,
  SIGN_FLIP_EXAMPLE_IDS,
  DOMAIN_MISS_EXAMPLE_IDS,
  CASE_STUDY,
  VERIFICATION_RULES,
  TRAP_HEADLINE,
} from "../_data/traps";

export const metadata: Metadata = {
  title: "NDA Maths Traps — Distractor patterns NDA reuses",
  description:
    "How students who know the math still lose marks. Factor-of-2 errors, sign-flip distractors, quadrant confusion, domain misses on the last step — measured against the live 2,160-question bank with worked examples.",
  alternates: { canonical: "/guide/nda-maths/traps" },
};

const sideNav = ROUTES.map((r) => ({
  href: r.slug ? `/guide/nda-maths/${r.slug}` : "/guide/nda-maths",
  label: r.label,
}));

export default async function Traps() {
  const supabase = createSupabaseAnonClient();
  const exampleIds = [
    ...FACTOR2_EXAMPLE_IDS,
    ...SIGN_FLIP_EXAMPLE_IDS,
    ...DOMAIN_MISS_EXAMPLE_IDS,
    CASE_STUDY.questionId,
  ];
  const examples = await loadWorkedExamples(supabase, exampleIds);
  const byId = new Map(examples.map((e) => [e.id, e] as const));

  const factor2Examples = FACTOR2_EXAMPLE_IDS.map((id) => byId.get(id)).filter(
    (x): x is NonNullable<typeof x> => x !== undefined
  );
  const signFlipExamples = SIGN_FLIP_EXAMPLE_IDS.map((id) => byId.get(id)).filter(
    (x): x is NonNullable<typeof x> => x !== undefined
  );
  const domainExamples = DOMAIN_MISS_EXAMPLE_IDS.map((id) => byId.get(id)).filter(
    (x): x is NonNullable<typeof x> => x !== undefined
  );
  const caseStudyExample = byId.get(CASE_STUDY.questionId);

  const stats = [
    { value: String(TRAP_HEADLINE.categories), label: "trap categories" },
    {
      value: `${TRAP_HEADLINE.topFactor2.pct}%`,
      label: "top factor-of-2 cell",
    },
    {
      value: `${TRAP_HEADLINE.topSignFlip.pct}%`,
      label: "top sign-flip cell",
    },
    {
      value: String(TRAP_HEADLINE.rules),
      label: "verification rules",
    },
  ];

  // Group verification rules by trap category they catch.
  const ruleGroups = {
    sign: VERIFICATION_RULES.filter((r) => r.catches === "sign"),
    factor: VERIFICATION_RULES.filter((r) => r.catches === "factor"),
    quadrant: VERIFICATION_RULES.filter((r) => r.catches === "quadrant"),
    domain: VERIFICATION_RULES.filter((r) => r.catches === "domain"),
    framing: VERIFICATION_RULES.filter((r) => r.catches === "framing"),
    index: VERIFICATION_RULES.filter((r) => r.catches === "index"),
  };

  return (
    <GuideShell
      guideTitle="NDA Mathematics Guide"
      sideNav={sideNav}
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: "/guide/nda-maths", label: "NDA Mathematics" },
        { label: "Traps" },
      ]}
    >
      <GuideJsonLd
        type="Article"
        path="/guide/nda-maths/traps"
        headline="NDA Maths Traps — Distractor patterns NDA reuses"
        description="How students who know the math still lose marks. Factor-of-2 errors, sign-flip distractors, quadrant confusion, domain misses — measured against the live bank with worked examples."
      />
      <GuideHero
        eyebrow="Traps"
        title="Why students who know the math still lose marks"
        subtitle="Most NDA Maths losses aren't from not knowing the formula — they're from factor-of-2 slips, sign-flips, quadrant confusion, and domain misses on the last step. Every claim on this page is measured against the live 2,160-question bank."
      >
        <StatBlock stats={stats} />
      </GuideHero>

      {/* SECTION 1 — Positional bias */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          The positional bias in correct answers
        </h2>
        <p className="mt-3 font-serif leading-relaxed text-muted-foreground">
          A purely random paper would have the correct answer evenly split
          across A/B/C/D (25% each). NDA Mathematics doesn&rsquo;t — overall
          B and C lead by ~3pp, and the bias <em>flattens</em> on HARD: A
          catches up to C, B drops below both, D stays the rarest at every
          difficulty.
        </p>

        {/* Overall + by-difficulty matrix */}
        <div className="mt-4 overflow-x-auto rounded-md border">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/40">
              <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-3 py-2 font-medium">Option</th>
                <th className="px-3 py-2 text-right font-medium">Overall</th>
                <th className="px-3 py-2 text-right font-medium">vs random</th>
                <th className="px-3 py-2 text-right font-medium">EASY (n)</th>
                <th className="px-3 py-2 text-right font-medium">MOD (n)</th>
                <th className="px-3 py-2 text-right font-medium">HARD (n)</th>
              </tr>
            </thead>
            <tbody className="tabular-nums">
              {POSITIONAL_BIAS.map((row) => {
                const delta = row.pct - 25;
                const byDiff = POSITIONAL_BIAS_BY_DIFFICULTY.find(
                  (d) => d.label === row.label
                )!;
                return (
                  <tr
                    key={row.label}
                    className="border-b last:border-b-0"
                  >
                    <td className="px-3 py-2 font-semibold">{row.label}</td>
                    <td className="px-3 py-2 text-right">{row.pct}%</td>
                    <td
                      className={`px-3 py-2 text-right ${
                        delta > 0
                          ? "text-emerald-700 dark:text-emerald-400"
                          : "text-rose-700 dark:text-rose-400"
                      }`}
                    >
                      {delta > 0 ? "+" : ""}
                      {delta.toFixed(1)}pp
                    </td>
                    <td className="px-3 py-2 text-right text-muted-foreground">
                      {byDiff.easy}
                    </td>
                    <td className="px-3 py-2 text-right text-muted-foreground">
                      {byDiff.moderate}
                    </td>
                    <td className="px-3 py-2 text-right font-medium">
                      {byDiff.hard}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-md border bg-muted/30 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              If the question feels easy or moderate
            </p>
            <p className="mt-1 font-serif text-sm leading-relaxed">
              When stuck, pick <strong>B or C</strong>. Combined share on
              EASY+MODERATE is ~56%, vs A+D&rsquo;s ~44%.
            </p>
          </div>
          <div className="rounded-md border border-rose-500/40 bg-rose-500/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-rose-700 dark:text-rose-400">
              If the question feels HARD
            </p>
            <p className="mt-1 font-serif text-sm leading-relaxed">
              The bias flattens. <strong>C (134 q) and A (132 q) are nearly
              tied, B drops to 121 q, D the rarest at 100 q.</strong> When
              stuck on HARD, pick A or C — the &ldquo;B/C&rdquo; rule is
              weaker here.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2 — Factor-of-2 trap (the dominant one) */}
      <section className="mt-14">
        <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight sm:text-2xl">
          <Flame className="h-5 w-5 text-primary" aria-hidden />
          The dominant trap: factor-of-2 distractors
        </h2>
        <p className="mt-3 font-serif leading-relaxed text-muted-foreground">
          For every question with a numeric correct answer, we checked whether
          any wrong option was exactly 2× or ½× the right one. <strong>8
          chapter × difficulty cells exceed 60%</strong> — this is the most
          common distractor pattern in NDA Maths, ahead of sign-flips. The
          mistakes it catches: forgetting the ½ in triangle area, radius vs
          diameter, magnitude vs component sum, and the double-counting of
          arrangements in P&amp;C.
        </p>
        <div className="mt-4">
          <SignFlipHeatmap cells={FACTOR2_CELLS} rateLabel="Factor-of-2 rate" />
        </div>

        {factor2Examples.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-semibold tracking-tight">
              Worked examples
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Click to reveal options. Notice how the wrong options sit at
              exactly 2× or ½× the correct value.
            </p>
            <div className="mt-3 space-y-4">
              {factor2Examples.map((ex, i) => (
                <WorkedExampleCard key={ex.id} rank={i + 1} example={ex} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* SECTION 3 — Sign-flip trap */}
      <section className="mt-14">
        <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight sm:text-2xl">
          <AlertTriangle className="h-5 w-5 text-primary" aria-hidden />
          Sign-flip distractors
        </h2>
        <p className="mt-3 font-serif leading-relaxed text-muted-foreground">
          The second-most-common distractor shape. For every numeric answer,
          we checked whether any wrong option was literally the negative of
          the right one. Limits and Differentiation lead — <strong>46% of
          HARD limit questions</strong> include a sign-flip wrong option, and
          Differentiation has it at ≈25% across all three difficulty bands.
        </p>
        <div className="mt-4">
          <SignFlipHeatmap cells={SIGN_FLIP_CELLS} rateLabel="Sign-flip rate" />
        </div>

        {signFlipExamples.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-semibold tracking-tight">
              Worked examples
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              The wrong option differs from the correct one by exactly one
              minus sign. Spend two seconds verifying the sign before circling.
            </p>
            <div className="mt-3 space-y-4">
              {signFlipExamples.map((ex, i) => (
                <WorkedExampleCard key={ex.id} rank={i + 1} example={ex} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* SECTION 4 — Domain miss (inverse trig) */}
      <section className="mt-14">
        <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight sm:text-2xl">
          <Compass className="h-5 w-5 text-primary" aria-hidden />
          Domain misses (inverse trig)
        </h2>
        <p className="mt-3 font-serif leading-relaxed text-muted-foreground">
          Inverse trig has narrow principal ranges: sin⁻¹ is [−π/2, π/2],
          cos⁻¹ is [0, π], tan⁻¹ is (−π/2, π/2). Distractors are engineered
          to look correct if you ignore the range constraint. The fix is to
          always check that your computed angle lies inside the principal
          interval before circling.
        </p>
        {domainExamples.length > 0 && (
          <div className="mt-6 space-y-4">
            {domainExamples.map((ex, i) => (
              <WorkedExampleCard key={ex.id} rank={i + 1} example={ex} />
            ))}
          </div>
        )}
      </section>

      {/* SECTION 5 — Anatomy of a 4-trap question */}
      <section className="mt-14">
        <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight sm:text-2xl">
          <Microscope className="h-5 w-5 text-primary" aria-hidden />
          Anatomy of a 4-trap question
        </h2>
        <p className="mt-3 font-serif leading-relaxed text-muted-foreground">
          One HARD question, four engineered options. Each wrong option
          represents a distinct trap shape — sign-flip, factor, or a
          combination. The dissection below shows how each route gets a
          student to the wrong answer.
        </p>

        {caseStudyExample && (
          <div className="mt-4 space-y-4">
            <WorkedExampleCard rank={1} example={caseStudyExample} />
            <div className="rounded-lg border bg-card p-5">
              <h3 className="text-sm font-semibold tracking-tight">
                What each option is doing
              </h3>
              <ul className="mt-3 space-y-3">
                {CASE_STUDY.options.map((o) => {
                  const isCorrect = o.trap === "correct";
                  return (
                    <li
                      key={o.label}
                      className={`flex gap-3 rounded-md border p-3 ${
                        isCorrect
                          ? "border-emerald-500/40 bg-emerald-500/5"
                          : "bg-muted/30"
                      }`}
                    >
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold tabular-nums ${
                          isCorrect
                            ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {o.label}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold tracking-tight">
                          <span
                            className={
                              isCorrect
                                ? "text-emerald-700 dark:text-emerald-400"
                                : "text-foreground"
                            }
                          >
                            {o.trap}
                          </span>
                        </p>
                        <p className="mt-0.5 font-serif text-sm leading-relaxed text-muted-foreground">
                          {o.why}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </section>

      {/* SECTION 6 — Verification rules, grouped by trap they catch */}
      <section className="mt-14">
        <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight sm:text-2xl">
          <Target className="h-5 w-5 text-primary" aria-hidden />
          Verification rules — one per chapter
        </h2>
        <p className="mt-3 font-serif leading-relaxed text-muted-foreground">
          Grouped by the trap shape they defend against. Run the rule for
          the relevant chapter before circling.
        </p>

        <div className="mt-6 space-y-6">
          {(
            [
              { key: "sign", title: "Sign verification", rules: ruleGroups.sign },
              { key: "factor", title: "Factor verification", rules: ruleGroups.factor },
              { key: "quadrant", title: "Quadrant verification", rules: ruleGroups.quadrant },
              { key: "domain", title: "Domain verification", rules: ruleGroups.domain },
              { key: "framing", title: "Framing verification", rules: ruleGroups.framing },
              { key: "index", title: "Index verification", rules: ruleGroups.index },
            ] as const
          )
            .filter((g) => g.rules.length > 0)
            .map((g) => (
              <div key={g.key}>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  {g.title}
                </h3>
                <ol className="mt-2 space-y-2">
                  {g.rules.map((r) => (
                    <li
                      key={r.chapter}
                      className="flex gap-3 rounded-md border bg-card p-3"
                    >
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-semibold tracking-tight">
                          {r.chapter}
                        </h4>
                        <p className="mt-0.5 font-serif text-sm leading-relaxed text-muted-foreground">
                          {r.rule}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
        </div>
      </section>

      {/* SECTION 7 — Time-budgeted verification protocol */}
      <section className="mt-14 rounded-lg border-2 border-primary/40 bg-primary/5 p-6">
        <h2 className="text-lg font-semibold tracking-tight">
          The time-budgeted verification protocol
        </h2>
        <p className="mt-2 font-serif leading-relaxed text-muted-foreground">
          Verification quality scales with how much time you have left.
          Pick the deepest check the budget allows — don&rsquo;t skip
          verification entirely.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-md border bg-card p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              30 seconds left
            </p>
            <p className="mt-1 text-sm font-semibold tracking-tight">
              Sign only
            </p>
            <p className="mt-1 font-serif text-xs leading-relaxed text-muted-foreground">
              Did I flip a negative? Is the answer positive when it should be?
            </p>
          </div>
          <div className="rounded-md border bg-card p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              60 seconds left
            </p>
            <p className="mt-1 text-sm font-semibold tracking-tight">
              Sign + factor
            </p>
            <p className="mt-1 font-serif text-xs leading-relaxed text-muted-foreground">
              Sign check, then: am I off by 2, ½, π, or the radius/diameter?
            </p>
          </div>
          <div className="rounded-md border bg-card p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              90 seconds left
            </p>
            <p className="mt-1 text-sm font-semibold tracking-tight">
              Full protocol
            </p>
            <p className="mt-1 font-serif text-xs leading-relaxed text-muted-foreground">
              Sign + factor + quadrant + domain. Run the chapter&rsquo;s
              verification rule from Section 6.
            </p>
          </div>
        </div>
        <p className="mt-4 font-serif text-sm leading-relaxed text-muted-foreground">
          <strong className="font-semibold text-foreground">
            The habit, not the rule.
          </strong>{" "}
          Three classes of error, three traps NDA reliably exploits. A
          10-second verification habit per question can recover several marks
          per paper without learning a single new formula.
        </p>
      </section>

      <PrevNextNav
        prev={{ href: "/guide/nda-maths/trends", label: "Trends" }}
        next={{
          href: "/guide/nda-maths",
          label: "Back to Overview",
        }}
      />
    </GuideShell>
  );
}
