"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Download,
  FileText,
  Key,
  Presentation,
  Table,
} from "lucide-react";
import { toast } from "sonner";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { Filters } from "@/lib/questions/filters";
import LanguageSwitch from "@/components/i18n/LanguageSwitch";
import { useQuestionLang } from "@/lib/i18n/useQuestionLang";
import { useCart } from "@/lib/cart/CartProvider";
import type { PassCta } from "@/lib/billing/plans";
import { resolveExportAccess } from "@/lib/export/access";
import { extensionForContentType } from "@/lib/export/fileType";
import { useMobilePrompt } from "@/lib/profile/MobilePromptProvider";
import { trackFunnel, trackFunnelOnce } from "@/lib/analytics/trackFunnel";
import { sendActivityOnce } from "@/lib/activity/clientBeacon";
import { pricingHref } from "@/lib/billing/checkoutReturn";
import { gatePriceLine, gateTitle, selectionTitle } from "@/lib/billing/gateCopy";
import PassOffer from "./PassOffer";

type Mode = "filters" | "cart";
type Kind = "paper" | "key" | "tags" | "ppt";

// Per-kind download metadata: filename prefix, extension, success-toast label.
// The paper and key extension here is Word's; a PDF download overrides it.
const KIND_META: Record<Kind, { prefix: string; ext: string; label: string }> = {
  paper: { prefix: "QP", ext: "docx", label: "Question Paper" },
  key: { prefix: "Answers", ext: "docx", label: "Answer Key" },
  tags: { prefix: "Tags", ext: "xlsx", label: "Tagged sheet" },
  ppt: { prefix: "Slides", ext: "pptx", label: "Slides" },
};

export default function DownloadDialog({
  filters,
  totalCount,
  /** When opened from the cart panel, default to cart mode and disable mode-toggle. */
  initialMode,
  /** External open control — used by CartPanel which has its own button. */
  externalOpen,
  onExternalOpenChange,
  hideTrigger,
  /** Signed-in (any account). Alone it unlocks nothing; see resolveExportAccess. */
  isSignedIn = false,
  /** Org staff (ADMIN/TEACHER) — additionally unlocks the tagged sheet. */
  isStaff = false,
  /** Active Premium Pass — unlocks the paper + key (not slides or the sheet). */
  hasDownloadPass = false,
  /** Signed-in account that has not used its one free download (2026-10-04). */
  freeDownloadLeft = false,
  /** The pass on sale that unlocks downloads; null = none on sale, so no CTA. */
  downloadPass = null,
  /** The filtered exam prints Marathi + English (MPSC) — offer a print language. */
  bilingual = false,
}: {
  filters: Filters;
  totalCount: number;
  initialMode?: Mode;
  externalOpen?: boolean;
  onExternalOpenChange?: (open: boolean) => void;
  hideTrigger?: boolean;
  isSignedIn?: boolean;
  isStaff?: boolean;
  hasDownloadPass?: boolean;
  freeDownloadLeft?: boolean;
  downloadPass?: PassCta | null;
  bilingual?: boolean;
}) {
  // Paper + key need org staff or the pass; anyone else sees the pass offer
  // instead — derived from the same gate the API enforces. `who` is typed so a
  // renamed gate input fails to compile here rather than silently reading false.
  const who: Omit<Parameters<typeof resolveExportAccess>[0], "kind"> = {
    isSignedIn,
    isStaff,
    hasDownloadPass,
    freeDownloadLeft: isSignedIn ? freeDownloadLeft : undefined,
  };
  const paperAccess = resolveExportAccess({ kind: "paper", ...who });
  // PDF for everyone without staff access, Word for institute staff — the same
  // field the route reads, so the saved file's extension matches its bytes.
  const paperFormat = (paperAccess.allowed && paperAccess.format) || "docx";
  // On the one free download: the download view says so, offers the pass, and
  // a finished download refreshes the page so the box moves to the offer.
  const onFree = paperAccess.allowed && paperAccess.free === true;
  const router = useRouter();
  // "Get Premium Pass" tapped from the free download's line: show the offer.
  const [wantPass, setWantPass] = useState(false);
  const showDownloadView = paperAccess.allowed && !wantPass;
  const canDownload = paperAccess.allowed;
  const canTags = resolveExportAccess({ kind: "tags", ...who }).allowed;
  const canSlides = resolveExportAccess({ kind: "ppt", ...who }).allowed;
  const [internalOpen, setInternalOpen] = useState(false);
  const open = externalOpen ?? internalOpen;
  const setOpen = (v: boolean) => {
    if (onExternalOpenChange) onExternalOpenChange(v);
    else setInternalOpen(v);
  };

  const cart = useCart();
  const mobilePrompt = useMobilePrompt();
  const [mode, setMode] = useState<Mode>(initialMode ?? "filters");
  // This page with its filters, so a teacher lands back on the same selection
  // after buying the pass. Read from the browser (not useSearchParams, which
  // would bail /browse's static prerender); the dialog only renders on a click.
  const [here, setHere] = useState<string | undefined>(undefined);
  useEffect(() => {
    setHere(window.location.pathname + window.location.search);
  }, []);

  // The download gate was seen — the denominator for pass clicks. The event
  // names still say "teacher" (the gate's name until 2026-10-01) so the series
  // stays continuous. `mode` splits the two populations that matter — a
  // visitor who assembled a CART and then met the wall wanted a paper; one who
  // opened it from FILTERS may only have been looking.
  useEffect(() => {
    if (!open || canDownload) return;
    trackFunnelOnce("teacher_gate_shown", mode, { signedIn: isSignedIn, mode });
    if (isSignedIn) sendActivityOnce(`teacher_gate:${mode}`, { kind: "paywall_event", step: "shown", gate: "teacher" });
  }, [open, canDownload, mode, isSignedIn]);
  const [title, setTitle] = useState("PYQ Vault Export");
  const [includeSolutions, setIncludeSolutions] = useState(true);
  const [groupBySubtopic, setGroupBySubtopic] = useState(false);
  const [includeSourceTag, setIncludeSourceTag] = useState(false);
  // Shared with the cards: a teacher reading in Marathi prints in Marathi.
  const [lang, setLang] = useQuestionLang();
  const [busyKind, setBusyKind] = useState<Kind | null>(null);
  // Bought in this box: the refreshed page grants the pass, and the download
  // view says so once, so the buyer knows the next tap is a file.
  const [justBought, setJustBought] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filterCount = totalCount;
  const cartCount = cart.count;
  const activeCount = mode === "cart" ? cartCount : filterCount;
  const overCap = activeCount > 200;
  const busy = busyKind !== null;

  async function onDownload(kind: Kind) {
    setBusyKind(kind);
    setError(null);
    try {
      const exportOptions = {
        title,
        includeSolutions,
        groupBySubtopic,
        includeSourceTag,
        ...(bilingual ? { lang } : {}),
      };
      const body =
        mode === "cart"
          ? { kind, questionIds: cart.ids, options: exportOptions }
          : { kind, filters, options: exportOptions };
      const res = await fetch("/api/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const json = (await res.json().catch(() => ({}))) as {
          error?: string;
          retryAfter?: number;
        };
        const msg =
          res.status === 429 && json.retryAfter
            ? `Too many downloads. Try again in ${formatRetry(json.retryAfter)}.`
            : json.error ?? `Download failed (${res.status})`;
        setError(msg);
        toast.error(msg);
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const meta = KIND_META[kind];
      // From what the server sent: a PDF that failed to print arrives as Word.
      const ext = extensionForContentType(
        res.headers.get("Content-Type"),
        kind === "paper" || kind === "key" ? paperFormat : meta.ext
      );
      const a = document.createElement("a");
      a.href = url;
      a.download = `${meta.prefix}_${sanitize(title)}.${ext}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast.success(`${meta.label} downloaded`);
      if (onFree) {
        trackFunnel("free_download_used", { kind });
        router.refresh();
      }
      // Value moment: nudge a signed-in student with no mobile on file to add it.
      mobilePrompt.requestPrompt("download");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Download failed";
      setError(msg);
      toast.error(msg);
    } finally {
      setBusyKind(null);
    }
  }

  const cartAvailable = cart.hydrated && cartCount > 0;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {!hideTrigger && (
        <DialogTrigger asChild>
          <Button
            variant="brand"
            disabled={filterCount === 0}
            className="w-full sm:w-auto"
          >
            <Download className="h-4 w-4" aria-hidden />
            Download
            {filterCount > 0 && (
              <span className="ml-1 text-brand-foreground/80">
                · {filterCount.toLocaleString("en-IN")}
              </span>
            )}
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="flex max-h-[90dvh] flex-col gap-0 p-0 sm:max-w-xl">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>
            {showDownloadView
              ? `Download ${activeCount} question${activeCount === 1 ? "" : "s"}`
              : downloadPass
              ? isSignedIn
                ? gateTitle(activeCount, downloadPass.label)
                : selectionTitle(activeCount)
              : "Download papers with the pass"}
          </DialogTitle>
          <DialogDescription>
            {showDownloadView && paperFormat === "pdf" ? (
              "PDF files: the Question Paper and the Answer Key, set in one column so they read well on a phone and print cleanly."
            ) : showDownloadView ? (
              <>
                Word files: Question Paper and Answer Key (0.5″ margins, 2
                columns, Cambria 10pt)
                {canSlides
                  ? ", plus a PowerPoint deck (.pptx), one question per slide for projecting in class"
                  : ""}
                {canTags
                  ? ", and a tagged sheet (.xlsx) for nda-tracker, numbered to match the paper."
                  : "."}
              </>
            ) : downloadPass ? (
              !isSignedIn
                ? "The Question Paper and its Answer Key."
                : wantPass
                ? `${downloadPass.label} includes:`
                : `You've had your free paper. ${downloadPass.label} includes:`
            ) : (
              "Downloading question papers needs a pass."
            )}
          </DialogDescription>
        </DialogHeader>

        {!showDownloadView ? (
          downloadPass ? (
            <PassOffer
              pass={downloadPass}
              isSignedIn={isSignedIn}
              freeAfterSignIn={!isSignedIn}
              returnTo={here}
              mode={mode}
              onCancel={() => setOpen(false)}
              onBought={() => setJustBought(true)}
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
          )
        ) : (
        // min-h-0: a flex item's default min-height:auto refuses to shrink below
        // its content, so without it the body never clips, the dialog blows past
        // max-h-[90dvh], and the footer overlaps the last control.
        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-6 py-4">
          {justBought && (
            <p role="status" className="rounded-md border border-brand-accent/30 bg-brand-accent/5 p-3 text-sm">
              Pass active. Choose your files below.
            </p>
          )}
          {onFree && downloadPass && (
            <div className="space-y-2 rounded-md border border-brand-accent/30 bg-brand-accent/5 p-3 text-sm">
              <p>
                <strong>Your first paper is free:</strong> the Question Paper and its Answer Key, both files.
              </p>
              <p className="text-muted-foreground">
                After that, every paper with its key comes with {downloadPass.label}: {gatePriceLine(downloadPass)}.
              </p>
            </div>
          )}
          {cartAvailable && (
            <div
              role="group"
              aria-label="Question source"
              className="inline-flex w-full rounded-md border border-input bg-background p-0.5"
            >
              <ModeButton
                active={mode === "filters"}
                onClick={() => setMode("filters")}
                disabled={busy || filterCount === 0}
                label="Current filters"
                count={filterCount}
              />
              <ModeButton
                active={mode === "cart"}
                onClick={() => setMode("cart")}
                disabled={busy}
                label="Selected"
                count={cartCount}
              />
            </div>
          )}
          {overCap && (
            <div
              className="rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive"
              role="alert"
            >
              Too many questions for one export (cap is 200).{" "}
              {mode === "cart"
                ? "Remove some from your selection, then try again."
                : "Add a chapter or subtopic filter, then try again."}
            </div>
          )}
          <div className="space-y-1.5">
            <Label htmlFor="export-title">Document title</Label>
            <Input
              id="export-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={busy}
            />
          </div>
          {bilingual && (
            <div className="space-y-1.5">
              <p className="text-sm font-medium">Print language</p>
              <LanguageSwitch value={lang} onChange={setLang} />
              <p className="text-xs text-muted-foreground">
                Question Paper and Answer Key. &ldquo;Both&rdquo; prints Marathi above English, as the booklet does.
              </p>
            </div>
          )}
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={includeSolutions}
              onChange={(e) => setIncludeSolutions(e.target.checked)}
              disabled={busy}
              className="h-4 w-4"
            />
            <span>Include solutions in the Answer Key</span>
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={groupBySubtopic}
              onChange={(e) => setGroupBySubtopic(e.target.checked)}
              disabled={busy}
              className="h-4 w-4"
            />
            <span>Group by subtopic (section headings)</span>
          </label>
          <label className="flex cursor-pointer items-start gap-2 text-sm">
            <input
              type="checkbox"
              checked={includeSourceTag}
              onChange={(e) => setIncludeSourceTag(e.target.checked)}
              disabled={busy}
              className="mt-0.5 h-4 w-4"
            />
            <span>
              Cite the source after each question in the Question Paper
              <span className="block text-xs text-muted-foreground">
                e.g. [JEE Mains 2016]. Practice questions are left untagged.
              </span>
            </span>
          </label>
          {error && (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          )}
        </div>
        )}

        {/* Not sticky: the footer sits OUTSIDE the scrolling body, so it is
            always visible anyway — and `sticky bottom-0` is what let it ride up
            over the content once the body stopped clipping. flex-wrap keeps the
            4 buttons inside the dialog instead of overflowing its left edge. */}
        {(showDownloadView || !downloadPass) && (
        <DialogFooter className="shrink-0 flex-col gap-2 border-t bg-background px-6 py-4 sm:flex-row sm:flex-wrap">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={busy}
            className="w-full sm:w-auto"
          >
            {busy ? "Working…" : canDownload ? "Done" : "Cancel"}
          </Button>
          {canDownload && (
            <>
              {canTags && (
                <Button
                  variant="outline"
                  onClick={() => onDownload("tags")}
                  disabled={busy || overCap || activeCount === 0}
                  className="w-full sm:w-auto"
                >
                  <Table className="h-4 w-4" aria-hidden />
                  {busyKind === "tags" ? "Generating…" : "Tagged sheet"}
                </Button>
              )}
              {canSlides && (
                <Button
                  variant="outline"
                  onClick={() => onDownload("ppt")}
                  disabled={busy || overCap || activeCount === 0}
                  className="w-full sm:w-auto"
                >
                  <Presentation className="h-4 w-4" aria-hidden />
                  {busyKind === "ppt" ? "Generating…" : "Slides"}
                </Button>
              )}
              <Button
                variant="outline"
                onClick={() => onDownload("key")}
                disabled={busy || overCap || activeCount === 0}
                className="w-full sm:w-auto"
              >
                <Key className="h-4 w-4" aria-hidden />
                {busyKind === "key" ? "Generating…" : "Answer Key"}
              </Button>
              <Button
                variant="brand"
                onClick={() => onDownload("paper")}
                disabled={busy || overCap || activeCount === 0}
                className="w-full sm:w-auto"
              >
                <FileText className="h-4 w-4" aria-hidden />
                {busyKind === "paper" ? "Generating…" : "Question Paper"}
              </Button>
            </>
          )}
        </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}

function ModeButton({
  active,
  onClick,
  disabled,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  disabled: boolean;
  label: string;
  count: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      className={cn(
        "flex flex-1 items-center justify-center gap-1.5 rounded-sm px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-50",
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      <span>{label}</span>
      <span className="tabular-nums opacity-80">· {count.toLocaleString("en-IN")}</span>
    </button>
  );
}

function sanitize(s: string): string {
  return s.replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "_") || "export";
}

function formatRetry(seconds: number): string {
  if (seconds < 90) return `${seconds} seconds`;
  const minutes = Math.ceil(seconds / 60);
  if (minutes < 60) return `${minutes} minutes`;
  const hours = Math.ceil(minutes / 60);
  return `${hours} hour${hours === 1 ? "" : "s"}`;
}
