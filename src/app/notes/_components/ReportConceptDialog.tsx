"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Flag, Mail } from "lucide-react";
import { toast } from "sonner";
import { CONTACT_EMAIL } from "@/lib/brand";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import {
  CONCEPT_REPORT_CATEGORIES,
  CONCEPT_REPORT_CATEGORY_LABELS,
  REPORT_DETAILS_MAX,
  type ConceptReportCategory,
} from "@/lib/notes-reports/types";

/**
 * "Report this concept" affordance + dialog on a /notes concept card.
 *
 * Auth is resolved CLIENT-SIDE (browser supabase getUser) so the parent notes
 * page stays ISR-cached — we never read session cookies on the server for a
 * free notes page. Logged-in users get the report form; anon users get a
 * sign-in prompt with a mailto fallback (the concept identity is prefilled).
 *
 * The body POSTs only the slug pair + category + details; the server resolves
 * the concept identity + owning org from the shipped notes registry.
 */
type Props = {
  subtopicSlug: string;
  conceptSlug: string;
  conceptName: string;
};

const REPORT_EMAIL = CONTACT_EMAIL;

export default function ReportConceptDialog({
  subtopicSlug,
  conceptSlug,
  conceptName,
}: Props) {
  const [open, setOpen] = useState(false);
  const [authState, setAuthState] = useState<"unknown" | "in" | "out">(
    "unknown"
  );
  const [category, setCategory] =
    useState<ConceptReportCategory>("incorrect-content");
  const [details, setDetails] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Resolve login state once on mount, client-side only.
  useEffect(() => {
    let active = true;
    createSupabaseBrowserClient()
      .auth.getUser()
      .then(({ data }) => {
        if (active) setAuthState(data.user ? "in" : "out");
      })
      .catch(() => {
        if (active) setAuthState("out");
      });
    return () => {
      active = false;
    };
  }, []);

  function reset() {
    setCategory("incorrect-content");
    setDetails("");
    setSubmitting(false);
    setSubmitted(false);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting || submitted) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/notes/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subtopicSlug,
          conceptSlug,
          category,
          details: details.trim() || null,
        }),
      });
      if (res.status === 201) {
        toast.success("Report received. Thanks — we'll take a look.");
        setSubmitted(true);
        setTimeout(() => {
          setOpen(false);
          setTimeout(reset, 250);
        }, 800);
        return;
      }
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (res.status === 401) {
        // Session expired between mount and submit — fall back to the prompt.
        setAuthState("out");
        return;
      }
      if (res.status === 409) {
        toast.message(body.error ?? "You already reported this concept.");
        setSubmitted(true);
        return;
      }
      toast.error(body.error ?? `Report failed (${res.status})`);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Report failed — try again"
      );
    } finally {
      setSubmitting(false);
    }
  }

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) setTimeout(reset, 200);
  }

  const mailtoBody = `Concept: ${conceptName}%0A(subtopic: ${encodeURIComponent(
    subtopicSlug
  )} · concept: ${encodeURIComponent(conceptSlug)})%0A%0AWhat's wrong:%0A`;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:underline focus-visible:outline-none"
        >
          <Flag className="h-3 w-3" aria-hidden />
          Report this concept
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        {authState === "in" ? (
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <h2 className="text-base font-semibold tracking-tight">
                Report this concept
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Spotted something wrong with{" "}
                <span className="font-medium text-foreground">
                  {conceptName}
                </span>
                ? Help us fix it.
              </p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="concept-report-category" className="text-xs">
                What&apos;s wrong?
              </Label>
              <select
                id="concept-report-category"
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value as ConceptReportCategory)
                }
                disabled={submitting || submitted}
                className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              >
                {CONCEPT_REPORT_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {CONCEPT_REPORT_CATEGORY_LABELS[c]}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="concept-report-details" className="text-xs">
                Details{" "}
                <span className="font-normal text-muted-foreground">
                  (optional)
                </span>
              </Label>
              <textarea
                id="concept-report-details"
                value={details}
                onChange={(e) =>
                  setDetails(e.target.value.slice(0, REPORT_DETAILS_MAX))
                }
                disabled={submitting || submitted}
                rows={4}
                placeholder="What did you notice? Be as specific as possible."
                className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
              <p className="text-right text-[10px] tabular-nums text-muted-foreground">
                {details.length} / {REPORT_DETAILS_MAX}
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <DialogClose asChild>
                <Button type="button" variant="outline" size="sm">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" size="sm" disabled={submitting || submitted}>
                {submitted
                  ? "Reported"
                  : submitting
                  ? "Submitting…"
                  : "Submit report"}
              </Button>
            </div>
          </form>
        ) : authState === "unknown" ? (
          <div className="py-6 text-center text-sm text-muted-foreground">
            Loading…
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <h2 className="text-base font-semibold tracking-tight">
                Sign in to report
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                In-app reports require a signed-in account so we can follow up
                if needed.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <Button asChild size="sm">
                <Link href="/login">Sign in</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <a
                  href={`mailto:${REPORT_EMAIL}?subject=${encodeURIComponent(
                    `Report concept: ${conceptName}`
                  )}&body=${mailtoBody}`}
                  className="inline-flex items-center gap-1.5"
                >
                  <Mail className="h-3.5 w-3.5" aria-hidden />
                  Or report via email
                </a>
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
