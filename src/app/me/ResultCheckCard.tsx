"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { ArrowRight, PartyPopper, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { isShowableName, type ResultOutcome } from "@/lib/results/check";

/**
 * "Did you clear the NDA 2 2026 written exam?" on /me, for a few weeks after a
 * result is announced (migration 0149). The server decides WHETHER to show it
 * (pendingChecks); this card only asks and saves. A "yes" with consent is a
 * request to be shown: a superadmin reviews it before the name goes up.
 */
type Step = "ask" | "consent" | "thanks-shown" | "thanks-cleared" | "thanks-no" | "thanks-absent" | "gone";

export default function ResultCheckCard({
  announcementId,
  question,
  sitting,
  suggestedName,
  practiseHref,
}: {
  announcementId: string;
  question: string;
  sitting: string;
  suggestedName: string;
  practiseHref: string;
}) {
  const [step, setStep] = useState<Step>("ask");
  const [busy, setBusy] = useState(false);
  const [name, setName] = useState(suggestedName);
  const [show, setShow] = useState(true);
  const nameId = useId();
  const consentId = useId();

  async function save(outcome: ResultOutcome, extra: { showPublicly?: boolean; displayName?: string } = {}) {
    setBusy(true);
    try {
      const res = await fetch("/api/results/answer", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ announcementId, outcome, ...extra }),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(body.error ?? "Could not save your answer.");
      return true;
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not save your answer.");
      return false;
    } finally {
      setBusy(false);
    }
  }

  async function answer(outcome: "not_cleared" | "did_not_appear" | "dismissed") {
    if (!(await save(outcome))) return;
    if (outcome === "dismissed") {
      setStep("gone");
      return;
    }
    toast.success("Thanks for telling us.");
    setStep(outcome === "not_cleared" ? "thanks-no" : "thanks-absent");
  }

  async function saveCleared() {
    if (show && !isShowableName(name)) {
      toast.error("Enter your name as it should appear: letters and spaces only.");
      return;
    }
    const ok = await save("cleared", show ? { showPublicly: true, displayName: name } : { showPublicly: false });
    if (!ok) return;
    toast.success("Saved. Congratulations!");
    setStep(show ? "thanks-shown" : "thanks-cleared");
  }

  if (step === "gone") return null;

  return (
    <section aria-label="Your exam result" className="rounded-xl border bg-card p-4 sm:p-5">
      {step === "ask" && (
        <>
          <div className="flex items-start justify-between gap-3">
            <p className="font-semibold text-foreground">{question}</p>
            <button
              type="button"
              onClick={() => answer("dismissed")}
              disabled={busy}
              aria-label="Do not ask me about this result"
              className="rounded-md p-1 text-muted-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button variant="brand" size="sm" disabled={busy} onClick={() => setStep("consent")}>
              Yes, I cleared it
            </Button>
            <Button variant="outline" size="sm" disabled={busy} onClick={() => answer("not_cleared")}>
              No
            </Button>
            <Button variant="outline" size="sm" disabled={busy} onClick={() => answer("did_not_appear")}>
              I didn&apos;t appear
            </Button>
          </div>
        </>
      )}

      {step === "consent" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void saveCleared();
          }}
        >
          <p className="flex items-center gap-2 font-semibold text-foreground">
            <PartyPopper className="h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
            Congratulations! That&apos;s a real achievement.
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Can we show your name on our results page, with other students who cleared {sitting}?
          </p>
          <label htmlFor={nameId} className="mt-3 block text-sm font-medium text-foreground">
            Your name as it should appear
          </label>
          <input
            id={nameId}
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!show}
            maxLength={60}
            autoComplete="name"
            className="mt-1 w-full max-w-sm rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
          />
          <div className="mt-3 flex items-start gap-2 text-sm">
            <input
              id={consentId}
              type="checkbox"
              checked={show}
              onChange={(e) => setShow(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-[hsl(var(--brand))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <label htmlFor={consentId} className="text-muted-foreground">
              Yes, show my name on pyqvault.com/results. If you are under 18, ask a parent first.
            </label>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button type="submit" variant="brand" size="sm" disabled={busy}>
              Save
            </Button>
            <Button type="button" variant="ghost" size="sm" disabled={busy} onClick={() => setStep("ask")}>
              Back
            </Button>
          </div>
        </form>
      )}

      {step === "thanks-shown" && (
        <p className="text-sm text-foreground">
          Thank you, and well done. We&apos;ll check it and add your name to the results page.
        </p>
      )}
      {step === "thanks-cleared" && <p className="text-sm text-foreground">Thank you, and well done.</p>}
      {step === "thanks-absent" && <p className="text-sm text-foreground">Thanks. Good luck for your next sitting.</p>}
      {step === "thanks-no" && (
        <div className="text-sm">
          <p className="text-foreground">
            Thanks for telling us. One sitting doesn&apos;t decide this. The papers you practise now count for the next one.
          </p>
          <Link
            href={practiseHref}
            prefetch={false}
            className="mt-2 inline-flex items-center gap-1 rounded font-medium text-brand-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Sit a past paper
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>
      )}
    </section>
  );
}
