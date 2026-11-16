/**
 * /score-calculator/<exam>: a free answer-key score calculator (growth
 * registry "score-calculator", 2026-11-16).
 *
 * STATIC AND CACHED. On key day thousands arrive within hours, so the page
 * renders once and is served as a copy: no cookie or session read here (that
 * would make every visit a fresh render). It re-reads only which keys are
 * loaded, every 5 minutes, through a cached read. The checking happens in the
 * client card, which calls /api/score/<exam>.
 *
 * One page per exam because students search by exam name. A calculator gets a
 * page only once it is `live` (lib/scoreCalc/score.ts): SSC waits for its
 * browser reader.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import { LIVE_CALCULATORS, calculatorBySlug } from "@/lib/scoreCalc/score";
import { listJeeKeySittings } from "@/lib/scoreCalc/jeeKeys";
import JeeCalculator from "./JeeCalculator";

export const revalidate = 300;
export const dynamicParams = false;

export function generateStaticParams() {
  return LIVE_CALCULATORS.map((c) => ({ slug: c.slug }));
}

const COPY: Record<string, { title: string; description: string; h1: string; lead: string }> = {
  "jee-main": {
    title: "JEE Main 2027 Score Calculator (Answer Key)",
    description:
      "Paste your JEE Main response sheet link and get your score on NTA's answer key in seconds: Physics, Chemistry and Maths marks, right, wrong and blank, with +4 and -1 marking.",
    h1: "JEE Main score calculator",
    lead: "Paste your response sheet link. We mark it against NTA's answer key, subject by subject, with +4 for right and -1 for wrong.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const copy = COPY[slug];
  if (!copy) return {};
  return {
    title: copy.title,
    description: copy.description,
    alternates: { canonical: `/score-calculator/${slug}` },
    openGraph: { title: copy.title, description: copy.description, type: "website" },
  };
}

const QUESTIONS = [
  {
    q: "Is this my official score?",
    a: "It is what NTA's key gives your answers, using NTA's marking. Your official result also converts marks to a percentile across shifts, which no calculator can do until NTA publishes it.",
  },
  {
    q: "What if NTA changes the key?",
    a: "NTA puts out a provisional key, takes challenges, then publishes a final key. We load both. Check again after the final key; your sheet is marked against the newest one.",
  },
  {
    q: "What happens to my sheet?",
    a: "It is read once to count your marks and is not kept. We keep only your marks, without your name, so we can show how others scored. Signing in saves the score to your account.",
  },
  {
    q: "What about a question NTA dropped?",
    a: "NTA gives full marks for a dropped question to everyone in that shift, and we do the same. Where NTA accepts two answers, either one counts as right.",
  },
];

export default async function ScoreCalculatorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const calc = calculatorBySlug(slug);
  const copy = COPY[slug];
  if (!calc || !calc.live || !copy) notFound();

  // "Key is out" = a key loaded for a sitting in the last 45 days.
  let keyLoaded = false;
  try {
    const cutoff = new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    keyLoaded = (await listJeeKeySittings()).some((k) => k.sitting >= cutoff);
  } catch (e) {
    console.error("[score-calculator] key list read failed", e);
  }

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-2xl px-4 pb-16 pt-8 sm:px-6">
        <header>
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-accent">Free score calculator</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">{copy.h1}</h1>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">{copy.lead}</p>
        </header>

        <div className="mt-6">
          <JeeCalculator keyLoaded={keyLoaded} practiceHref={calc.practiceHref} />
        </div>

        <section className="mt-10">
          <h2 className="text-lg font-semibold">How to get your response sheet link</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed">
            <li>Go to jeemain.nta.nic.in and log in with your application number and password.</li>
            <li>Open the answer key challenge page and choose to view your response sheet (question paper with your responses).</li>
            <li>Copy the address of that page from your browser&rsquo;s address bar and paste it above.</li>
          </ol>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-semibold">Questions</h2>
          <div className="mt-3 flex flex-col gap-2">
            {QUESTIONS.map((x) => (
              <details key={x.q} className="rounded-lg border bg-card p-4">
                <summary className="cursor-pointer font-medium">{x.q}</summary>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{x.a}</p>
              </details>
            ))}
          </div>
        </section>

        <p className="mt-10 text-sm text-muted-foreground">
          Preparing for Session 2?{" "}
          <Link href="/exams/jee-mains" className="text-brand-accent underline">
            Every JEE Main past question, chapter by chapter
          </Link>
          .
        </p>
      </main>
      <Footer />
    </>
  );
}
