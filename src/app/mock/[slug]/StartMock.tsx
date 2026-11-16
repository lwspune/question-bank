"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Play, Loader2, Lock } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import LanguageSwitch from "@/components/i18n/LanguageSwitch";
import { altLangName, langHeading, type AltLang } from "@/lib/i18n/bilingual";
import { useQuestionLang } from "@/lib/i18n/useQuestionLang";
import type { MockStartState, TestUnit } from "@/lib/mocks/quota";
import type { PassCta } from "@/lib/billing/plans";
import { sendActivityOnce } from "@/lib/activity/clientBeacon";
import { pricingHref } from "@/lib/billing/checkoutReturn";
import { lockedPassLine } from "@/lib/mocks/passLine";
import { useDiscountedPass, VaultPointsOfferNote } from "@/components/billing/useFixPoints";
import { formatTimeLeft } from "@/lib/mocks/startPage";

/**
 * Starts (or resumes) an attempt, then routes into the runner.
 *
 * On a bilingual paper (MPSC prints Marathi + English, SSC Hindi + English) the student picks the
 * language to sit it in first. The choice is the shared page-wide preference,
 * so the runner opens in it — and can still switch mid-test, as the printed
 * booklet lets a candidate read either version at any time.
 *
 * Free-test limits (migrations 0120 + 0134): past the free mocks, or the free
 * chapter tests (counted separately), the Start button becomes a pass card. The
 * page decides from my_mock_quota(); a 402 from the start route (a stale page,
 * a second tab) flips it here too. On an exam that frees marked papers only
 * (0256, IMAT) a marked paper says it is free, and any other paper shows the
 * pass card naming the free ones.
 */
export default function StartMock({
  slug,
  altLang = null,
  startState = { kind: "open" },
  mockPass = null,
  unit = "mock",
  isPastPaper = false,
  invite = null,
  resumeSecsLeft = null,
  freePapers = [],
}: {
  /** The exam's papers marked free (0256), named on a pass-only card. */
  freePapers?: { slug: string; title: string }[];
  /** Time left on the student's open attempt (lib/mocks/startPage); null = none open. */
  resumeSecsLeft?: number | null;
  slug: string;
  /** A friend's invite code (migration 0166): sent with the start so the paper starts free. */
  invite?: string | null;
  /** A whole past paper: the pass card also offers its PDF download. */
  isPastPaper?: boolean;
  /** A chapter test or a full mock: which free count this paper uses. */
  unit?: TestUnit;
  /** The paper's second print language, or null when it prints English only. */
  altLang?: AltLang | null;
  startState?: MockStartState;
  /** The pass on sale for unlimited mocks; null = none (the card links to /pricing). */
  mockPass?: PassCta | null;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useQuestionLang(altLang);
  const [state, setState] = useState<MockStartState>(startState);
  const resume = resumeSecsLeft !== null;

  async function start() {
    setLoading(true);
    try {
      const res = await fetch(`/api/mock/${slug}/start`, {
        method: "POST",
        ...(invite ? { headers: { "Content-Type": "application/json" }, body: JSON.stringify({ with: invite }) } : {}),
      });
      const data = await res.json();
      if (res.status === 402) {
        setState({ kind: "locked", limit: state.kind === "free" ? state.limit : 0, unit });
        const gate = unit === "chapter_test" ? "chapter_test" : "mock_limit";
        sendActivityOnce(`${gate}:${slug}`, { kind: "paywall_event", step: "shown", gate });
        setLoading(false);
        return;
      }
      if (!res.ok) throw new Error(data.error ?? "Could not start the test.");
      if (data.resumed) toast.info("Resuming your in-progress attempt.");
      router.push(`/mock/${slug}/attempt/${data.attemptId}`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not start the test.");
      setLoading(false);
    }
  }

  const button = (
    <Button variant="brand" size="lg" className="w-full" onClick={start} disabled={loading}>
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
      ) : (
        <Play className="h-4 w-4" aria-hidden />
      )}
      {loading ? "Starting…" : resume ? `Resume test · ${formatTimeLeft(resumeSecsLeft)} left` : "Start test"}
    </Button>
  );
  const resumeNote = resume ? (
    <p className="mt-2 text-center text-xs text-muted-foreground">Your answers so far are saved.</p>
  ) : null;
  if (state.kind === "locked") {
    return (
      <MockPassCard
        limit={state.limit}
        unit={state.unit}
        pass={mockPass}
        slug={slug}
        isPastPaper={isPastPaper}
        passOnly={state.passOnly === true}
        freePapers={freePapers}
      />
    );
  }
  const freeNote =
    state.kind === "free_paper" ? (
      <p className="mt-2 text-center text-xs text-muted-foreground">This paper is free to try.</p>
    ) : state.kind === "free" ? (
      <p className="mt-2 text-center text-xs text-muted-foreground">
        {state.left === 1
          ? `This is your last free ${testNoun(state.unit, 1)}.`
          : `You have ${state.left} of ${state.limit} free ${testNoun(state.unit, 2)} left.`}
      </p>
    ) : null;
  if (!altLang) {
    return (
      <div>
        {button}
        {resume ? resumeNote : freeNote}
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-card p-4">
        <p className="text-sm font-medium">
          Question language <span lang={altLang} className="text-muted-foreground">/ {langHeading(altLang)}</span>
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          The paper prints its questions in {altLangName(altLang)} and English. You can switch at any time during the
          test.
        </p>
        <LanguageSwitch value={lang} onChange={setLang} alt={altLang} size="md" className="mt-3" />
      </div>
      {button}
      {resume ? resumeNote : freeNote}
    </div>
  );
}

/** "mock test(s)" or "chapter test(s)". */
function testNoun(unit: TestUnit, n: number): string {
  const noun = unit === "chapter_test" ? "chapter test" : "mock test";
  return n === 1 ? noun : `${noun}s`;
}

function MockPassCard({
  limit,
  unit,
  pass: offered,
  slug,
  isPastPaper,
  passOnly = false,
  freePapers = [],
}: {
  limit: number;
  unit: TestUnit;
  pass: PassCta | null;
  slug: string;
  isPastPaper: boolean;
  /** No free count opens this paper; only its exam's free papers are free (0256). */
  passOnly?: boolean;
  freePapers?: { slug: string; title: string }[];
}) {
  // Fix Points (0245) lower the price shown; /pricing and the order route follow.
  const pass = useDiscountedPass(offered);
  const plural = testNoun(unit, 2);
  return (
    <div className="rounded-lg border-2 border-brand-accent/40 bg-card p-5 text-center">
      <Lock className="mx-auto h-5 w-5 text-brand-accent" aria-hidden />
      <p className="mt-2 font-semibold">
        {passOnly
          ? "This paper comes with the pass"
          : limit > 0
            ? `You've used your ${limit} free ${plural}`
            : `You've used your free ${plural}`}
      </p>
      {passOnly && freePapers.length > 0 && (
        <p className="mt-1 text-sm text-muted-foreground">
          Free to try:{" "}
          {freePapers.map((p, i) => (
            <span key={p.slug}>
              {i > 0 && (i === freePapers.length - 1 ? " and " : ", ")}
              <Link href={`/mock/${p.slug}`} className="font-medium text-brand-accent underline underline-offset-2">
                {p.title}
              </Link>
            </span>
          ))}
          .
        </p>
      )}
      <p className="mt-1 text-sm text-muted-foreground">
        {lockedPassLine({ pass, plural, isPastPaper })}
        Retaking a test you&apos;ve already started stays free.
      </p>
      <Button asChild variant="brand" size="lg" className="mt-4 w-full">
        {/* Back to this paper after paying, not to /account. */}
        <Link href={pricingHref(pass?.urlKey ?? null, `/mock/${slug}`)}>
          {pass ? `Get the ${pass.label}: ${pass.price}` : "See passes"}
        </Link>
      </Button>
      {pass && <VaultPointsOfferNote planId={pass.planId} className="mt-2 text-xs font-medium text-emerald-700 dark:text-emerald-400" />}
    </div>
  );
}
