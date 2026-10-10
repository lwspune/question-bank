"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { isShowableName } from "@/lib/results/check";
import type { AnnouncementOption, StudentResultRow } from "@/lib/results/admin";

const fieldClass =
  "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";
const NEW = "__new";

const OUTCOME_LABEL: Record<StudentResultRow["outcome"], string> = {
  cleared: "Cleared",
  not_cleared: "Did not clear",
  did_not_appear: "Did not appear",
  dismissed: "Dismissed the card",
};

/**
 * "Mark result" on a student's page (migration 0149): staff who know the
 * student cleared, and have their consent, publish the name in one step. It
 * then shows on /results, the homepage, /pricing and that exam's hub pages at
 * once. Writes through the superadmin-only /api/admin/results route.
 */
export default function ResultControl({
  userId,
  suggestedName,
  options,
  exams,
  results,
}: {
  userId: string;
  suggestedName: string;
  options: AnnouncementOption[];
  /** For a new result: the student's chosen exams first. */
  exams: { slug: string; name: string }[];
  results: StudentResultRow[];
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [pick, setPick] = useState(options[0]?.id ?? NEW);
  const [examSlug, setExamSlug] = useState(exams[0]?.slug ?? "");
  const [sitting, setSitting] = useState("");
  const [stage, setStage] = useState("written");
  const [name, setName] = useState(suggestedName);
  const [consent, setConsent] = useState(false);

  async function post(body: Record<string, unknown>): Promise<boolean> {
    setBusy(true);
    try {
      const res = await fetch("/api/admin/results", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      const out = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(out.error ?? "Could not save.");
      return true;
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not save.");
      return false;
    } finally {
      setBusy(false);
    }
  }

  async function onMark(e: React.FormEvent) {
    e.preventDefault();
    if (!isShowableName(name)) {
      toast.error("Enter the name as it should appear: letters and spaces only.");
      return;
    }
    const target = pick === NEW ? { newResult: { examSlug, sitting, stage } } : { announcementId: pick };
    if (await post({ action: "mark", userId, displayName: name, consent, ...target })) {
      toast.success(`${name.trim()} is on the results page.`);
      setOpen(false);
      setConsent(false);
      router.refresh();
    }
  }

  async function onTakeDown(r: StudentResultRow) {
    if (await post({ action: "unpublish", id: r.id })) {
      toast.success(`${r.name ?? "Name"} taken down.`);
      router.refresh();
    }
  }

  return (
    <div className="space-y-3">
      {results.length === 0 ? (
        <p className="text-sm text-muted-foreground">No results recorded.</p>
      ) : (
        <ul className="space-y-2">
          {results.map((r) => (
            <li key={r.id} className="flex flex-wrap items-center justify-between gap-2 text-sm">
              <span>
                <span className="font-medium">{r.label}</span>
                <span className="text-muted-foreground">
                  {" "}
                  · {OUTCOME_LABEL[r.outcome]}
                  {r.published ? ` · on /results as "${r.name}"` : r.name ? " · waiting for review" : ""}
                  {r.source === "staff" ? " · added by staff" : ""}
                </span>
              </span>
              {r.published && (
                <Button size="sm" variant="outline" onClick={() => onTakeDown(r)} disabled={busy}>
                  Take down
                </Button>
              )}
            </li>
          ))}
        </ul>
      )}

      <Button size="sm" variant="brand" onClick={() => setOpen(true)} disabled={busy}>
        <Trophy className="mr-1.5 h-4 w-4" aria-hidden />
        Mark result
      </Button>

      <Dialog open={open} onOpenChange={(v) => !busy && setOpen(v)}>
        <DialogContent>
          <form onSubmit={onMark} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Mark result</DialogTitle>
              <DialogDescription>
                The name goes on /results, the homepage, Pricing and that exam&apos;s pages at once. You can take it down here.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-1.5">
              <Label htmlFor="rc-result">Result</Label>
              <select id="rc-result" className={fieldClass} value={pick} onChange={(e) => setPick(e.target.value)} disabled={busy}>
                {options.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.label}
                  </option>
                ))}
                <option value={NEW}>+ New result</option>
              </select>
            </div>

            {pick === NEW && (
              <div className="space-y-3 rounded-md border p-3">
                <div className="space-y-1.5">
                  <Label htmlFor="rc-exam">Exam</Label>
                  <select id="rc-exam" className={fieldClass} value={examSlug} onChange={(e) => setExamSlug(e.target.value)} disabled={busy}>
                    {exams.map((x) => (
                      <option key={x.slug} value={x.slug}>
                        {x.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="rc-sitting">Sitting</Label>
                  <Input
                    id="rc-sitting"
                    placeholder="e.g. CDS 2 2026"
                    value={sitting}
                    onChange={(e) => setSitting(e.target.value)}
                    disabled={busy}
                    maxLength={40}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="rc-stage">Stage</Label>
                  <select id="rc-stage" className={fieldClass} value={stage} onChange={(e) => setStage(e.target.value)} disabled={busy}>
                    <option value="written">Written exam cleared</option>
                    <option value="ssb">Recommended at the SSB</option>
                    <option value="final">Final merit list</option>
                  </select>
                </div>
                <p className="text-xs text-muted-foreground">
                  Students who chose this exam will also be asked on their home page, for three weeks, whether they cleared it.
                </p>
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="rc-name">Name to show</Label>
              <Input id="rc-name" value={name} onChange={(e) => setName(e.target.value)} disabled={busy} maxLength={60} />
              <p className="text-xs text-muted-foreground">Letters and spaces only, the way the student wants it shown.</p>
            </div>

            <div className="flex items-start gap-2 text-sm">
              <input
                id="rc-consent"
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                disabled={busy}
                className="mt-0.5 h-4 w-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <Label htmlFor="rc-consent" className="font-normal text-muted-foreground">
                The student agreed to be shown (and a parent, if they are under 18).
              </Label>
            </div>

            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setOpen(false)} disabled={busy}>
                Cancel
              </Button>
              <Button type="submit" variant="brand" disabled={busy || !consent}>
                {busy && <Loader2 className="mr-1.5 h-4 w-4 animate-spin" aria-hidden />}
                Publish
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
