"use client";

import { useState } from "react";
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
import {
  REPORT_CATEGORIES,
  REPORT_CATEGORY_LABELS,
  REPORT_DETAILS_MAX,
  type ReportCategory,
} from "@/lib/reports/types";

/**
 * "Report question" affordance + dialog.
 *
 * Logged-in users: opens a form to pick a category + add optional details,
 * POSTs to /api/questions/[id]/reports, toasts on success.
 *
 * Anon users: opens a small dialog explaining sign-in is required, with
 * a mailto fallback so the existing email path remains discoverable.
 */
type Props = {
  questionId: string;
  isLoggedIn: boolean;
};

const REPORT_EMAIL = CONTACT_EMAIL;

export default function ReportQuestionDialog({
  questionId,
  isLoggedIn,
}: Props) {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<ReportCategory>("wrong-answer");
  const [details, setDetails] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function reset() {
    setCategory("wrong-answer");
    setDetails("");
    setSubmitting(false);
    setSubmitted(false);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting || submitted) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/questions/${questionId}/reports`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category,
          details: details.trim() || null,
        }),
      });
      if (res.status === 201) {
        toast.success("Report received. Thanks — we'll take a look.");
        setSubmitted(true);
        setTimeout(() => {
          setOpen(false);
          // Defer reset to next tick so the dialog closes cleanly first
          setTimeout(reset, 250);
        }, 800);
        return;
      }
      const body = (await res.json().catch(() => ({}))) as {
        error?: string;
      };
      if (res.status === 409) {
        toast.message(body.error ?? "You already reported this question.");
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
    if (!next) {
      // Reset on close so re-opening starts fresh
      setTimeout(reset, 200);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:underline"
        >
          <Flag className="h-3 w-3" aria-hidden />
          Report
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        {isLoggedIn ? (
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <h2 className="text-base font-semibold tracking-tight">
                Report this question
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Help us keep the bank accurate. Reports go to the admins who own
                this question.
              </p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="report-category" className="text-xs">
                What&apos;s wrong?
              </Label>
              <select
                id="report-category"
                value={category}
                onChange={(e) => setCategory(e.target.value as ReportCategory)}
                disabled={submitting || submitted}
                className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              >
                {REPORT_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {REPORT_CATEGORY_LABELS[c]}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="report-details" className="text-xs">
                Details{" "}
                <span className="font-normal text-muted-foreground">
                  (optional)
                </span>
              </Label>
              <textarea
                id="report-details"
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
              <Button
                type="submit"
                size="sm"
                disabled={submitting || submitted}
              >
                {submitted
                  ? "Reported"
                  : submitting
                  ? "Submitting…"
                  : "Submit report"}
              </Button>
            </div>
          </form>
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
                  href={`mailto:${REPORT_EMAIL}?subject=Report%20question&body=Question%20ID%3A%20${encodeURIComponent(
                    questionId
                  )}%0A%0A`}
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
