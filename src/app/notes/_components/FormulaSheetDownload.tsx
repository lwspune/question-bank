"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, Sigma } from "lucide-react";
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
import { resolveExportAccess } from "@/lib/export/access";
import { filenameFromDisposition } from "@/lib/export/fileType";
import { useMobilePrompt } from "@/lib/profile/MobilePromptProvider";
import { trackFunnel, trackFunnelOnce } from "@/lib/analytics/trackFunnel";
import { sendActivityOnce } from "@/lib/activity/clientBeacon";
import { pricingHref } from "@/lib/billing/checkoutReturn";
import { gatePriceLine } from "@/lib/billing/gateCopy";
import type { ExportViewerAccess } from "@/lib/export/viewerAccess";
import PassOffer from "@/app/browse/PassOffer";

/**
 * Download a chapter's formula sheet as a PDF (2026-10-10): every formula,
 * reference table and trap of the chapter on one A4 sheet, the same content
 * as the on-screen revision sheet below, which stays free.
 *
 * The same gate as the past-paper box: pass holders and institute staff get
 * the file at once; a signed-in account gets ONE free sheet (its own free
 * file, apart from the free paper); everyone else meets the pass offer, sold
 * in place. The chapter landing is a cached page, so the box cannot be told
 * who is looking: it asks /api/export/access when opened, and again after a
 * sign-in or a payment.
 */
export default function FormulaSheetDownload({
  subjectRoute,
  chapterSlug,
  chapterName,
  /** What the sheet holds, for the box's description: "10 formulas · 2 tables · 14 traps". */
  summary,
}: {
  subjectRoute: string;
  chapterSlug: string;
  chapterName: string;
  summary: string;
}) {
  const [open, setOpen] = useState(false);
  const [access, setAccess] = useState<ExportViewerAccess | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const [wantPass, setWantPass] = useState(false);
  const [justBought, setJustBought] = useState(false);
  const [busy, setBusy] = useState(false);
  const [here, setHere] = useState<string | undefined>(undefined);
  const mobilePrompt = useMobilePrompt();
  const sheet = `${subjectRoute}/${chapterSlug}`;

  const loadAccess = useCallback(async () => {
    setLoadFailed(false);
    try {
      const res = await fetch(`/api/export/access?formula=${encodeURIComponent(sheet)}`, { cache: "no-store" });
      if (!res.ok) throw new Error(String(res.status));
      setAccess((await res.json()) as ExportViewerAccess);
    } catch {
      setLoadFailed(true);
    }
  }, [sheet]);

  useEffect(() => {
    if (!open) return;
    setHere(window.location.pathname);
    void loadAccess();
  }, [open, loadAccess]);

  const signedIn = access?.signedIn ?? false;
  const sheetAccess = access
    ? resolveExportAccess({
        kind: "formula",
        isSignedIn: access.signedIn,
        isStaff: access.isStaff,
        hasDownloadPass: access.hasDownloadPass,
        freeDownloadLeft: access.signedIn ? access.freeDownloadLeft : undefined,
      })
    : null;
  const canDownload = sheetAccess?.allowed === true;
  const onFree = sheetAccess?.allowed === true && sheetAccess.free === true;
  const showDownloadView = canDownload && !wantPass;
  const pass = access?.pass ?? null;

  // The download gate was seen: the denominator for pass sales from this box.
  useEffect(() => {
    if (!open || !access || canDownload) return;
    trackFunnelOnce("teacher_gate_shown", "formula", { signedIn, mode: "formula" });
    if (signedIn) sendActivityOnce("teacher_gate:formula", { kind: "paywall_event", step: "shown", gate: "teacher" });
  }, [open, access, canDownload, signedIn]);

  const onBought = useCallback(() => {
    setJustBought(true);
    setWantPass(false);
    void loadAccess();
  }, [loadAccess]);

  async function onDownload() {
    setBusy(true);
    try {
      const res = await fetch("/api/export/formula-sheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subjectRoute, chapterSlug }),
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
      a.download = filenameFromDisposition(res.headers.get("Content-Disposition"), `Formulas_${chapterSlug}.pdf`);
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast.success("Formula sheet downloaded");
      if (onFree) {
        trackFunnel("free_download_used", { kind: "formula" });
        void loadAccess();
      }
      mobilePrompt.requestPrompt("download");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Download failed");
    } finally {
      setBusy(false);
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
        <Button variant="brandOutline">
          <Sigma className="h-4 w-4" aria-hidden />
          Formula sheet (PDF)
        </Button>
      </DialogTrigger>
      <DialogContent className="flex max-h-[90dvh] flex-col gap-0 p-0 sm:max-w-lg">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>
            {showDownloadView || !access ? `${chapterName} formula sheet` : "Download formula sheets"}
          </DialogTitle>
          <DialogDescription>
            {!access
              ? summary
              : showDownloadView
                ? `One A4 PDF: ${summary}, grouped by subtopic.`
                : pass
                  ? !signedIn
                    ? summary
                    : wantPass
                      ? `${pass.label} includes:`
                      : `You've had your free formula sheet. ${pass.label} includes:`
                  : "Downloading formula sheets needs a pass."}
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
            <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-6 py-4 text-sm">
              {justBought && (
                <p role="status" className="rounded-md border border-brand-accent/30 bg-brand-accent/5 p-3">
                  Pass active. Your sheet is ready below.
                </p>
              )}
              {onFree && pass && (
                <div className="space-y-2 rounded-md border border-brand-accent/30 bg-brand-accent/5 p-3">
                  <p>
                    <strong>Your first formula sheet is free.</strong> This chapter&apos;s sheet stays yours to
                    download again.
                  </p>
                  <p className="text-muted-foreground">
                    After that, every chapter&apos;s sheet comes with {pass.label}: {gatePriceLine(pass)}.
                  </p>
                </div>
              )}
              <p className="text-muted-foreground">
                The same formulas and traps as the revision sheet on this page, laid out to print or keep on
                your phone.
              </p>
            </div>
            <DialogFooter className="shrink-0 flex-col gap-2 border-t bg-background px-6 py-4 sm:flex-row">
              <Button variant="outline" onClick={() => setOpen(false)} disabled={busy} className="w-full sm:w-auto">
                {busy ? "Working…" : "Done"}
              </Button>
              <Button variant="brand" onClick={onDownload} disabled={busy} className="w-full sm:w-auto">
                <Sigma className="h-4 w-4" aria-hidden />
                {busy ? "Preparing…" : "Download PDF"}
              </Button>
            </DialogFooter>
          </>
        ) : pass ? (
          <PassOffer
            pass={pass}
            isSignedIn={signedIn}
            freeAfterSignIn={!signedIn}
            returnTo={here}
            mode="formula"
            surface="formula_sheet"
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
