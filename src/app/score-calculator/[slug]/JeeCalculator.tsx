"use client";

/**
 * The JEE Main calculator on /score-calculator/jee-main: paste the response
 * sheet link, get the score (POST /api/score/jee). No sign-in needed to see
 * the score; signing in only saves it. The page around this is static.
 */
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Bell, Check, Loader2, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trackFunnel } from "@/lib/analytics/trackFunnel";
import { JEE_MAINS_PAPER } from "@/lib/mocks/blueprints";
import { scoreInsights } from "@/lib/scoreCalc/insights";
import { formatMarks, scoreShareText, sittingLabel, type SittingInfo } from "@/lib/scoreCalc/display";
import type { Score } from "@/lib/scoreCalc/score";

const CALC = "jee-main";
const PAGE = `/score-calculator/${CALC}`;
const LINK_KEY = "score-calc:jee-link";

type Result = { sitting: SittingInfo; score: Score; saved: boolean };

export default function JeeCalculator({ keyLoaded, practiceHref }: { keyLoaded: boolean; practiceHref: string }) {
  const [url, setUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [alertBusy, setAlertBusy] = useState(false);
  const router = useRouter();

  // Coming back from sign-in: put the link back so one tap re-checks and saves.
  useEffect(() => {
    try {
      const kept = sessionStorage.getItem(LINK_KEY);
      if (kept) {
        setUrl(kept);
        sessionStorage.removeItem(LINK_KEY);
      }
    } catch {
      /* storage blocked: the student pastes again */
    }
  }, []);

  async function check(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/score/jee", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json().catch(() => null);
      if (!data?.ok) {
        const msg = data?.error ?? "Something went wrong. Try again.";
        setError(msg);
        toast.error(msg);
        trackFunnel("score_calc_check", { calc: CALC, outcome: "error" });
        return;
      }
      setResult({ sitting: data.sitting, score: data.score, saved: data.saved });
      toast.success("Your score is ready.");
      trackFunnel("score_calc_check", { calc: CALC, outcome: "scored" });
    } catch {
      const msg = "Could not reach PYQ Vault. Check your connection and try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setBusy(false);
    }
  }

  async function askForAlert() {
    setAlertBusy(true);
    try {
      const res = await fetch("/api/score/alert", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ calculator: CALC }),
      });
      if (res.status === 401) {
        trackFunnel("score_calc_alert", { calc: CALC, outcome: "signin" });
        router.push(`/login?next=${encodeURIComponent(PAGE)}`);
        return;
      }
      if (!res.ok) throw new Error();
      trackFunnel("score_calc_alert", { calc: CALC, outcome: "saved" });
      toast.success("Done. We will tell you the day NTA publishes the key.");
    } catch {
      toast.error("Could not save that. Try again.");
    } finally {
      setAlertBusy(false);
    }
  }

  async function share() {
    if (!result) return;
    const text = scoreShareText({
      title: "JEE Main",
      total: result.score.total,
      max: result.score.max,
      keyStatus: result.sitting.keyStatus,
      slug: CALC,
    });
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ text });
        trackFunnel("score_calc_share", { calc: CALC, via: "share" });
      } catch {
        /* closed the share sheet */
      }
      return;
    }
    trackFunnel("score_calc_share", { calc: CALC, via: "whatsapp" });
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  }

  function signInToSave() {
    try {
      sessionStorage.setItem(LINK_KEY, url);
    } catch {
      /* storage blocked */
    }
    router.push(`/login?next=${encodeURIComponent(PAGE)}`);
  }

  return (
    <div className="flex flex-col gap-4">
      {!keyLoaded && (
        <section className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-amber-950 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-100">
          <p className="font-semibold">NTA&rsquo;s answer key for the January 2027 exam is not out yet</p>
          <p className="mt-1 text-sm leading-relaxed">
            The exam runs 22 to 30 January. NTA usually puts the key out a few days after the last paper.
          </p>
          <Button className="mt-3 w-full sm:w-auto" onClick={askForAlert} disabled={alertBusy}>
            {alertBusy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Bell className="h-4 w-4" aria-hidden />}
            Tell me when it&rsquo;s out
          </Button>
        </section>
      )}

      <form onSubmit={check} className="rounded-xl border bg-card p-4 sm:p-6">
        <Label htmlFor="sheet-link" className="text-sm font-semibold">
          Your response sheet link
        </Label>
        <Input
          id="sheet-link"
          type="url"
          inputMode="url"
          required
          placeholder="https://cdn3.digialm.com/..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="mt-2"
        />
        <p className="mt-2 text-xs text-muted-foreground">
          Log in at jeemain.nta.nic.in, open your response sheet, and copy the address of that page.
        </p>
        <Button type="submit" className="mt-4 w-full" size="lg" disabled={busy || url.trim().length < 10}>
          {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
          {busy ? "Checking your sheet" : "Check my score"}
        </Button>
        {error && (
          <p role="alert" className="mt-3 text-sm text-red-700 dark:text-red-300">
            {error}
          </p>
        )}
      </form>

      {result && <ResultView result={result} onShare={share} onSignIn={signInToSave} practiceHref={practiceHref} />}
    </div>
  );
}

function ResultView({
  result,
  onShare,
  onSignIn,
  practiceHref,
}: {
  result: Result;
  onShare: () => void;
  onSignIn: () => void;
  practiceHref: string;
}) {
  const { score, sitting } = result;
  const lines = scoreInsights(JEE_MAINS_PAPER, score);
  const weakest = [...score.sections].sort((a, b) => a.marks / a.max - b.marks / b.max)[0];

  return (
    <section aria-live="polite" className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        JEE Main · {sittingLabel(sitting)} · NTA&rsquo;s {sitting.keyStatus === "final" ? "final" : "provisional"} key
      </p>

      <div className="rounded-2xl bg-primary p-5 text-primary-foreground">
        <p className="text-sm opacity-80">Your score</p>
        <p className="mt-1 flex items-baseline gap-2">
          <span className="text-5xl font-bold leading-none">{formatMarks(score.total)}</span>
          <span className="text-lg opacity-80">/ {formatMarks(score.max)}</span>
        </p>
        <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
          <Stat label="Right" value={score.right + score.bonus} />
          <Stat label={`Wrong (−${formatMarks(score.negative)})`} value={score.wrong} />
          <Stat label="Left blank" value={score.blank} />
        </dl>
        {score.bonus > 0 && (
          <p className="mt-3 text-xs opacity-80">
            Includes {score.bonus} question{score.bonus > 1 ? "s" : ""} NTA dropped: full marks to everyone in your shift.
          </p>
        )}
      </div>

      <div className="rounded-xl border bg-card p-4 sm:p-6">
        <h2 className="text-base font-semibold">Subject by subject</h2>
        <ul className="mt-3 flex flex-col gap-3">
          {score.sections.map((s) => (
            <li key={s.key}>
              <div className="flex justify-between text-sm">
                <span>{s.label}</span>
                <span className="font-semibold">
                  {formatMarks(s.marks)} / {formatMarks(s.max)}
                </span>
              </div>
              <div className="mt-1.5 h-2 rounded bg-muted" aria-hidden>
                <div
                  className={`h-2 rounded ${s.key === weakest.key ? "bg-orange-700" : "bg-brand"}`}
                  style={{ width: `${Math.max(0, (s.marks / s.max) * 100)}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {s.right + s.bonus} right · {s.wrong} wrong · {s.blank} blank
              </p>
            </li>
          ))}
        </ul>
      </div>

      {lines.length > 0 && (
        <div className="rounded-xl border bg-card p-4 sm:p-6">
          <h2 className="text-base font-semibold">What this means</h2>
          {lines.map((l) => (
            <p key={l} className="mt-2 text-sm leading-relaxed">
              {l}
            </p>
          ))}
        </div>
      )}

      <div className="rounded-xl border border-brand/30 bg-brand/5 p-4 sm:p-6">
        <h2 className="text-base font-semibold">Session 2 is in April</h2>
        <p className="mt-2 text-sm leading-relaxed">
          Every JEE Main shift from 2021 to 2026 is here as a timed mock, with solutions. Start with {weakest.label}.
        </p>
        <Button asChild size="lg" className="mt-3 w-full">
          <Link href={practiceHref}>Practise past papers</Link>
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" size="lg" onClick={onShare}>
          <Share2 className="h-4 w-4" aria-hidden />
          Share score
        </Button>
        {result.saved ? (
          <p className="flex items-center justify-center gap-2 rounded-md border text-sm">
            <Check className="h-4 w-4" aria-hidden />
            Saved
          </p>
        ) : (
          <Button variant="outline" size="lg" onClick={onSignIn}>
            Sign in to save
          </Button>
        )}
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg bg-white/10 p-2.5">
      <dt className="order-2 text-xs opacity-80">{label}</dt>
      <dd className="text-xl font-bold">{value}</dd>
    </div>
  );
}
