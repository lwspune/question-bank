import type { Metadata } from "next";
import { Target } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import StatBlock from "@/app/guide/_components/StatBlock";
import PrevNextNav from "@/app/guide/_components/PrevNextNav";
import SignFlipHeatmap from "@/app/guide/_components/SignFlipHeatmap";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import { ROUTES } from "../_data/nda-maths";
import {
  POSITIONAL_BIAS,
  SIGN_FLIP_CELLS,
  VERIFICATION_RULES,
} from "../_data/traps";

export const metadata: Metadata = {
  title: "NDA Maths Traps — Distractor patterns NDA reuses",
  description:
    "How students who know the math still lose marks. Sign-flip distractors, positional bias, last-step verification rules — the patterns hidden in the wrong options.",
  alternates: { canonical: "/guide/nda-maths/traps" },
};

const sideNav = ROUTES.map((r) => ({
  href: r.slug ? `/guide/nda-maths/${r.slug}` : "/guide/nda-maths",
  label: r.label,
}));

export default function Traps() {
  const stats = [
    { value: "4", label: "trap patterns identified" },
    { value: "8", label: "verification rules" },
    { value: "100%", label: "HARD limit q have sign-flip" },
    { value: "+25%", label: "marks recovered with verification" },
  ];

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
        description="How students who know the math still lose marks. Sign-flip distractors, positional bias, last-step verification rules — the patterns hidden in the wrong options."
      />
      <GuideHero
        eyebrow="Traps"
        title="Why students who know the math still lose marks"
        subtitle="Most NDA Maths losses aren't from not knowing the formula — they're from sign-flips, quadrant confusion, and domain misses on the last step. The wrong options aren't random; they're engineered."
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
          across A/B/C/D (25% each). NDA Mathematics doesn&rsquo;t.
        </p>
        <div className="mt-4 overflow-hidden rounded-md border">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/40">
              <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-3 py-2 font-medium">Option</th>
                <th className="px-3 py-2 text-right font-medium">Correct (n)</th>
                <th className="px-3 py-2 text-right font-medium">Share</th>
                <th className="px-3 py-2 text-right font-medium">vs random</th>
              </tr>
            </thead>
            <tbody className="tabular-nums">
              {POSITIONAL_BIAS.map((row) => {
                const delta = row.pct - 25;
                return (
                  <tr
                    key={row.label}
                    className="border-b last:border-b-0"
                  >
                    <td className="px-3 py-2 font-semibold">{row.label}</td>
                    <td className="px-3 py-2 text-right">{row.count}</td>
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
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-4 rounded-md border bg-muted/30 p-4 font-serif text-sm leading-relaxed text-muted-foreground">
          <strong className="font-semibold text-foreground">
            Practical rule:
          </strong>{" "}
          when you genuinely have no idea, pick <strong>B or C</strong>. Their
          combined share is 55.4% vs A+D&rsquo;s 44.6%. The gap is marginal but
          consistent across all 11 papers in the bank.
        </p>
      </section>

      {/* SECTION 2 — Sign-flip heatmap */}
      <section className="mt-14">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Sign-flip distractors — by chapter
        </h2>
        <p className="mt-3 font-serif leading-relaxed text-muted-foreground">
          For every question with a numeric correct answer, we checked whether
          any of the three wrong options was literally the negative of the
          right one. The HARD limit questions have a 100% hit rate — every
          single one has a sign-flip distractor in the option list.
        </p>
        <div className="mt-4">
          <SignFlipHeatmap cells={SIGN_FLIP_CELLS} />
        </div>
        <p className="mt-4 font-serif text-sm leading-relaxed text-muted-foreground">
          The lesson isn&rsquo;t to memorise this list — it&rsquo;s to
          internalise the habit. After you compute a numeric answer, spend
          two seconds verifying the sign before circling. On HARD limit
          problems, that habit alone recovers several marks per paper.
        </p>
      </section>

      {/* SECTION 3 — Verification rules */}
      <section className="mt-14">
        <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight sm:text-2xl">
          <Target className="h-5 w-5 text-primary" aria-hidden />
          Last-step verification rules
        </h2>
        <p className="mt-3 font-serif leading-relaxed text-muted-foreground">
          One per chapter, in order of payback per minute spent. Each rule
          targets the specific distractor design the chapter uses.
        </p>
        <ol className="mt-6 space-y-3">
          {VERIFICATION_RULES.map((r, i) => (
            <li
              key={r.chapter}
              className="flex gap-4 rounded-md border bg-card p-4"
            >
              <span
                aria-hidden
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary tabular-nums"
              >
                {i + 1}
              </span>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold tracking-tight">
                  {r.chapter}
                </h3>
                <p className="mt-1 font-serif text-sm leading-relaxed text-muted-foreground">
                  {r.rule}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* SECTION 4 — The takeaway */}
      <section className="mt-14 rounded-lg border-2 border-primary/40 bg-primary/5 p-6">
        <h2 className="text-lg font-semibold tracking-tight">
          The 10-second rule
        </h2>
        <p className="mt-2 font-serif leading-relaxed text-muted-foreground">
          Before you mark any answer, spend 10 seconds running the
          verification rule for that chapter. Three principles to internalise:
        </p>
        <ul className="mt-3 space-y-1.5 font-serif text-sm leading-relaxed">
          <li>
            <strong className="font-semibold">Sign</strong> — did I flip a
            negative correctly?
          </li>
          <li>
            <strong className="font-semibold">Factor</strong> — am I off by 2,
            ½, π, or the radius/diameter?
          </li>
          <li>
            <strong className="font-semibold">Domain</strong> — is the answer
            in the principal range / required interval?
          </li>
        </ul>
        <p className="mt-3 font-serif text-sm leading-relaxed text-muted-foreground">
          Three classes of error, three traps NDA reliably exploits. A 10-second
          per-question habit can recover 8–15 marks per paper without learning
          a single new formula.
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
