"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Download, FileText, FileType2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { resolveExportAccess, type PaperFormat } from "@/lib/export/access";
import { filenameFromDisposition } from "@/lib/export/fileType";
import { useMobilePrompt } from "@/lib/profile/MobilePromptProvider";
import { trackFunnel, trackFunnelOnce } from "@/lib/analytics/trackFunnel";
import { sendActivityOnce } from "@/lib/activity/clientBeacon";
import { pricingHref } from "@/lib/billing/checkoutReturn";
import { gatePriceLine } from "@/lib/billing/gateCopy";
import type { ExportViewerAccess } from "@/lib/export/viewerAccess";
import PassOffer from "@/app/browse/PassOffer";
import { cn } from "@/lib/utils";

/**
 * Download one homework day (2026-10-09): its five questions as one file,
 * with no answers. Institute staff choose Word or PDF; everyone else gets the
 * PDF, through the same gate as /browse and past papers (the pass, or the one
 * free paper), sold in place by the same PassOffer.
 *
 * It sits on a cached page, so it asks /api/export/access who is looking when
 * it opens, and again after a sign-in or a payment.
 */
export default function HomeworkDownload({
  planSlug,
  day,
  planTitle,
}: {
  planSlug: string;
  day: number;
  planTitle: string;
}) {
  const [open, setOpen] = useState(false);
  const [access, setAccess] = useState<ExportViewerAccess | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const [wantPass, setWantPass] = useState(false);
  const [justBought, setJustBought] = useState(false);
  const [busy, setBusy] = useState<PaperFormat | null>(null);
  const [here, setHere] = useState<string | undefined>(undefined);
  const mobilePrompt = useMobilePrompt();
  const dayTitle = `Daily Homework #${day}`;

  const loadAccess = useCallback(async () => {
    setLoadFailed(false);
    try {
      const res = await fetch(`/api/export/access?homework=${encodeURIComponent(`${planSlug}:${day}`)}`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error(String(res.status));
      setAccess((await res.json()) as ExportViewerAccess);
    } catch {
      setLoadFailed(true);
    }
  }, [planSlug, day]);

  useEffect(() => {
    if (!open) return;
    setHere(window.location.pathname);
    void loadAccess();
  }, [open, loadAccess]);

  const signedIn = access?.signedIn ?? false;
  const gate = access
    ? resolveExportAccess({
        kind: "paper",
        isSignedIn: access.signedIn,
        isStaff: access.isStaff,
        hasDownloadPass: access.hasDownloadPass,
        freeDownloadLeft: access.signedIn ? access.freeDownloadLeft : undefined,
      })
    : null;
  const canDownload = gate?.allowed === true;
  const onFree = gate?.allowed === true && gate.free === true;
  const isStaff = access?.isStaff === true;
  const showDownloadView = canDownload && !wantPass;
  const pass = access?.pass ?? null;

  useEffect(() => {
    if (!open || !access || canDownload) return;
    trackFunnelOnce("teacher_gate_shown", "homework", { signedIn, mode: "homework" });
    if (signedIn) sendActivityOnce("teacher_gate:homework", { kind: "paywall_event", step: "shown", gate: "teacher" });
  }, [open, access, canDownload, signedIn]);

  const onBought = useCallback(() => {
    setJustBought(true);
    setWantPass(false);
    void loadAccess();
  }, [loadAccess]);

  async function onDownload(format: PaperFormat) {
    setBusy(format);
    try {
      const res = await fetch("/api/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "paper", homework: { slug: planSlug, day }, options: { format } }),
      });
      if (!res.ok) {
        const json = (await res.json().catch(() => ({}))) as { error?: string };
        toast.error(json.error ?? `Download failed (${res.status})`);
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filenameFromDisposition(res.headers.get("Content-Disposition"), `Homework_${day}.${format}`);
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast.success(`${dayTitle} downloaded`);
      if (onFree) {
        trackFunnel("free_download_used", { kind: "paper" });
        void loadAccess();
      }
      mobilePrompt.requestPrompt("download");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Download failed");
    } finally {
      setBusy(null);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) {
          setWantPass(false);
          setJustBought(false);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="brand" size="sm" aria-label={`Download ${dayTitle}`}>
          <Download className="h-4 w-4" aria-hidden />
          Download
        </Button>
      </DialogTrigger>
      <DialogContent className="flex max-h-[90dvh] flex-col gap-0 p-0 sm:max-w-lg">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>{showDownloadView || !access ? `Download ${dayTitle}` : "Download homework"}</DialogTitle>
          <DialogDescription>
            {!access
              ? planTitle
              : showDownloadView
                ? `${planTitle}: the day's questions, without answers.`
                : pass
                  ? !signedIn
                    ? planTitle
                    : wantPass
                      ? `${pass.label} includes:`
                      : `You've had your free download. ${pass.label} includes:`
                  : "Downloading homework needs a pass."}
          </DialogDescription>
        </DialogHeader>

        {!access ? (
          <div className="flex min-h-[120px] items-center justify-center px-6 py-4 text-sm text-muted-foreground">
            {loadFailed ? (
              <div className="space-y-3 text-center">
                <p>Couldn&apos;t load your download options.</p>
                <Button variant="outline" size="sm" onClick={() => void loadAccess()}>
                  Try again
                </Button>
              </div>
            ) : (
              <Loader2 className="h-5 w-5 animate-spin" aria-label="Loading" />
            )}
          </div>
        ) : showDownloadView ? (
          <>
            {(justBought || (onFree && pass)) && (
              <div className="space-y-2 px-6 py-4 text-sm">
                {justBought && (
                  <p role="status" className="rounded-md border border-brand-accent/30 bg-brand-accent/5 p-3">
                    Pass active. Download below.
                  </p>
                )}
                {onFree && pass && (
                  <div className="space-y-2 rounded-md border border-brand-accent/30 bg-brand-accent/5 p-3">
                    <p>
                      <strong>Your first download is free.</strong>
                    </p>
                    <p className="text-muted-foreground">
                      After that, every day comes with {pass.label}: {gatePriceLine(pass)}.
                    </p>
                  </div>
                )}
              </div>
            )}
            <DialogFooter className="mt-4 shrink-0 flex-col gap-2 border-t bg-background px-6 py-4 sm:flex-row">
              <Button variant="outline" onClick={() => setOpen(false)} disabled={busy !== null} className="w-full sm:w-auto">
                {busy ? "Working…" : "Done"}
              </Button>
              {isStaff && (
                <Button
                  variant="outline"
                  onClick={() => onDownload("docx")}
                  disabled={busy !== null}
                  className={cn("w-full sm:w-auto", busy === "docx" && "cursor-wait")}
                >
                  <FileType2 className="h-4 w-4" aria-hidden />
                  {busy === "docx" ? "Preparing…" : "Word"}
                </Button>
              )}
              <Button
                variant="brand"
                onClick={() => onDownload("pdf")}
                disabled={busy !== null}
                className={cn("w-full sm:w-auto", busy === "pdf" && "cursor-wait")}
              >
                <FileText className="h-4 w-4" aria-hidden />
                {busy === "pdf" ? "Preparing…" : "PDF"}
              </Button>
            </DialogFooter>
          </>
        ) : pass ? (
          <PassOffer
            pass={pass}
            isSignedIn={signedIn}
            freeAfterSignIn={!signedIn}
            returnTo={here}
            mode="homework"
            surface="paper_download"
            onCancel={() => setOpen(false)}
            onBought={onBought}
            onSignedIn={loadAccess}
          />
        ) : (
          <div className="flex-1 space-y-3 overflow-y-auto px-6 py-4 text-sm text-muted-foreground">
            <p>
              See{" "}
              <Link href={pricingHref(null, here)} className="font-medium text-foreground underline">
                pricing
              </Link>{" "}
              for what is on sale.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
