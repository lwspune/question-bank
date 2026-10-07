"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Download, FileText, Key, Loader2 } from "lucide-react";
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
import LanguageSwitch from "@/components/i18n/LanguageSwitch";
import { useQuestionLang } from "@/lib/i18n/useQuestionLang";
import { resolveExportAccess } from "@/lib/export/access";
import { filenameFromDisposition } from "@/lib/export/fileType";
import { useMobilePrompt } from "@/lib/profile/MobilePromptProvider";
import { trackFunnel, trackFunnelOnce } from "@/lib/analytics/trackFunnel";
import { sendActivityOnce } from "@/lib/activity/clientBeacon";
import { pricingHref } from "@/lib/billing/checkoutReturn";
import { gatePriceLine } from "@/lib/billing/gateCopy";
import type { ExportViewerAccess } from "@/lib/export/viewerAccess";
import PassOffer from "@/app/browse/PassOffer";
import { cn } from "@/lib/utils";

type Kind = "paper" | "key";

/**
 * Download one past paper whole: its question paper and its answer key, as
 * two files (2026-10-07). The same gate as /browse (pass, or the one free
 * download), sold in place by the same PassOffer.
 *
 * It sits on cached pages, so it cannot be told who is looking. It asks
 * /api/export/access when opened, and asks again after a sign-in or a payment.
 */
export default function PaperDownload({
  slug,
  paperTitle,
  bilingual = false,
  variant = "button",
}: {
  slug: string;
  paperTitle: string;
  /** The exam prints Marathi + English (MPSC): offer a print language. */
  bilingual?: boolean;
  /** "button": full width, under Start test. "row": compact, in a list. */
  variant?: "button" | "row";
}) {
  const [open, setOpen] = useState(false);
  const [access, setAccess] = useState<ExportViewerAccess | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const [wantPass, setWantPass] = useState(false);
  const [justBought, setJustBought] = useState(false);
  const [busyKind, setBusyKind] = useState<Kind | null>(null);
  const [here, setHere] = useState<string | undefined>(undefined);
  const [lang, setLang] = useQuestionLang();
  const mobilePrompt = useMobilePrompt();

  const loadAccess = useCallback(async () => {
    setLoadFailed(false);
    try {
      const res = await fetch(`/api/export/access?mockSlug=${encodeURIComponent(slug)}`, { cache: "no-store" });
      if (!res.ok) throw new Error(String(res.status));
      setAccess((await res.json()) as ExportViewerAccess);
    } catch {
      setLoadFailed(true);
    }
  }, [slug]);

  useEffect(() => {
    if (!open) return;
    setHere(window.location.pathname);
    void loadAccess();
  }, [open, loadAccess]);

  const signedIn = access?.signedIn ?? false;
  const paperAccess = access
    ? resolveExportAccess({
        kind: "paper",
        isSignedIn: access.signedIn,
        isStaff: access.isStaff,
        hasDownloadPass: access.hasDownloadPass,
        freeDownloadLeft: access.signedIn ? access.freeDownloadLeft : undefined,
      })
    : null;
  const canDownload = paperAccess?.allowed === true;
  const onFree = paperAccess?.allowed === true && paperAccess.free === true;
  const isWord = paperAccess?.allowed === true && paperAccess.format === "docx";
  const showDownloadView = canDownload && !wantPass;
  const pass = access?.pass ?? null;

  // The download gate was seen: the denominator for pass sales from this box.
  useEffect(() => {
    if (!open || !access || canDownload) return;
    trackFunnelOnce("teacher_gate_shown", "mock", { signedIn, mode: "mock" });
    if (signedIn) sendActivityOnce("teacher_gate:mock", { kind: "paywall_event", step: "shown", gate: "teacher" });
  }, [open, access, canDownload, signedIn]);

  const onBought = useCallback(() => {
    setJustBought(true);
    setWantPass(false);
    void loadAccess();
  }, [loadAccess]);

  async function onDownload(kind: Kind) {
    setBusyKind(kind);
    try {
      const res = await fetch("/api/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind,
          mockSlug: slug,
          options: { includeSolutions: true, ...(bilingual ? { lang } : {}) },
        }),
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
      a.download = filenameFromDisposition(
        res.headers.get("Content-Disposition"),
        `${kind === "paper" ? "QP" : "Answers"}_${slug}.pdf`
      );
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast.success(kind === "paper" ? "Question paper downloaded" : "Answer key downloaded");
      if (onFree) {
        trackFunnel("free_download_used", { kind });
        void loadAccess();
      }
      mobilePrompt.requestPrompt("download");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Download failed");
    } finally {
      setBusyKind(null);
    }
  }

  const busy = busyKind !== null;

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
        {variant === "row" ? (
          <Button variant="brand" size="sm" aria-label={`Download ${paperTitle}`}>
            <Download className="h-4 w-4" aria-hidden />
            Download
          </Button>
        ) : (
          <Button variant="brandOutline" size="lg" className="w-full">
            <Download className="h-4 w-4" aria-hidden />
            Download paper and answer key
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="flex max-h-[90dvh] flex-col gap-0 p-0 sm:max-w-lg">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>{showDownloadView || !access ? "Download this paper" : "Download past papers"}</DialogTitle>
          <DialogDescription>
            {!access
              ? paperTitle
              : showDownloadView
                ? `${paperTitle}. ${isWord ? "Word files" : "PDF files"}: the question paper, and its answer key with solutions.`
                : pass
                  ? !signedIn
                    ? "Your first paper is free: the question paper and its answer key."
                    : wantPass
                      ? `${pass.label} includes:`
                      : `You've had your free paper. ${pass.label} includes:`
                  : "Downloading past papers needs a pass."}
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
                  Pass active. Choose your files below.
                </p>
              )}
              {onFree && pass && (
                <div className="space-y-2 rounded-md border border-brand-accent/30 bg-brand-accent/5 p-3">
                  <p>
                    <strong>Your first paper is free:</strong> the question paper and its answer key, both files.
                  </p>
                  <p className="text-muted-foreground">
                    After that, every paper with its key comes with {pass.label}: {gatePriceLine(pass)}.
                  </p>
                </div>
              )}
              {bilingual && (
                <div className="space-y-2">
                  <p className="font-medium">Print language</p>
                  <LanguageSwitch value={lang} onChange={setLang} size="md" />
                </div>
              )}
            </div>
            <DialogFooter className="shrink-0 flex-col gap-2 border-t bg-background px-6 py-4 sm:flex-row">
              <Button variant="outline" onClick={() => setOpen(false)} disabled={busy} className="w-full sm:w-auto">
                {busy ? "Working…" : "Done"}
              </Button>
              <Button
                variant="outline"
                onClick={() => onDownload("key")}
                disabled={busy}
                className={cn("w-full sm:w-auto", busyKind === "key" && "cursor-wait")}
              >
                <Key className="h-4 w-4" aria-hidden />
                {busyKind === "key" ? "Preparing…" : "Answer key"}
              </Button>
              <Button
                variant="brand"
                onClick={() => onDownload("paper")}
                disabled={busy}
                className={cn("w-full sm:w-auto", busyKind === "paper" && "cursor-wait")}
              >
                <FileText className="h-4 w-4" aria-hidden />
                {busyKind === "paper" ? "Preparing…" : "Question paper"}
              </Button>
            </DialogFooter>
          </>
        ) : pass ? (
          <PassOffer
            pass={pass}
            isSignedIn={signedIn}
            freeAfterSignIn={!signedIn}
            returnTo={here}
            mode="mock"
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
