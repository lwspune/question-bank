"use client";

import { useCallback, useId, useState } from "react";
import Link from "next/link";
import { BookCheck, Download, FileText, Loader2, PenLine, Printer } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCheckout } from "@/components/billing/useCheckout";
import { trackFunnel } from "@/lib/analytics/trackFunnel";
import { formatRupees } from "@/lib/billing/plans";
import type { EbookStatus } from "@/lib/ebooks/status";
import { MAX_PRINT_NAME } from "@/lib/ebooks/coverName";
import { useEbookStatus } from "./EbookStatusContext";

/**
 * The buy box on a book's page (2026-10-20). The page is cached and the same
 * for everyone; this reads who is looking (EbookStatusContext, which asks
 * /api/ebooks/<slug>/status once for the box and the cover), then shows
 * one of three things: sign in to buy, buy (20% less with a pass), or
 * download plus "Want this as a printed book?" (Option A: a free tap, no
 * money; the owner's experiment for printed books).
 */
export default function EbookBuyBox({
  slug,
  title,
  listPrice,
  hasSample,
}: {
  slug: string;
  title: string;
  listPrice: string;
  hasSample: boolean;
}) {
  const { status, loadFailed, reload: load } = useEbookStatus();

  // Paid now or pending the webhook: either way, ask again what this visitor owns.
  const onDone = useCallback(() => void load(), [load]);
  const { start, busy } = useCheckout({ ebookSlug: slug, surface: "ebook", onDone });

  const here = `/store/${slug}`;

  return (
    <section aria-label={`Buy ${title}`} className="rounded-2xl border-2 border-brand-accent/30 bg-card p-5 shadow-sm">
      {!status && !loadFailed ? (
        <div className="space-y-3" aria-busy="true">
          <div className="h-9 w-24 animate-pulse rounded bg-muted" />
          <div className="h-10 w-full animate-pulse rounded bg-muted" />
        </div>
      ) : status?.owned ? (
        <Owned slug={slug} status={status} onChange={load} />
      ) : (
        <div>
          <p className="flex items-baseline gap-2">
            <span className="text-4xl font-semibold tracking-tight">
              {status ? formatRupees(status.pricePaise) : listPrice}
            </span>
            {status?.passHolder ? (
              <span className="text-sm text-muted-foreground line-through">{formatRupees(status.listPaise)}</span>
            ) : null}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {status?.passHolder ? "20% off with your Premium Pass. " : ""}One payment. The PDF is yours to keep.
          </p>
          {status?.namePlate ? (
            <p className="mt-3 flex items-start gap-2 rounded-lg bg-muted/50 px-3 py-2 text-xs">
              <PenLine className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-accent" aria-hidden />
              <span>
                {status.coverName ? (
                  <>
                    Your copy has <span className="font-semibold">{status.coverName}</span> printed on the cover. You can change
                    the name after buying.
                  </>
                ) : (
                  "Your copy has your name printed on the cover."
                )}
              </span>
            </p>
          ) : null}

          <div className="mt-4 space-y-2">
            {status?.signedIn ? (
              <Button variant="brand" className="w-full" onClick={start} disabled={busy}>
                {busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden /> : null}
                {busy ? "Opening checkout…" : `Buy for ${formatRupees(status.pricePaise)}`}
              </Button>
            ) : (
              <>
                <Button asChild variant="brand" className="w-full">
                  <Link href={`/login?next=${encodeURIComponent(here)}`}>Sign in to buy</Link>
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  New here?{" "}
                  <Link href={`/signup?next=${encodeURIComponent(here)}`} className="font-medium text-foreground hover:underline">
                    Create a free account
                  </Link>
                </p>
              </>
            )}
            {hasSample ? (
              <Button asChild variant="outline" className="w-full">
                <a href={`/api/ebooks/${slug}/sample`} onClick={() => trackFunnel("ebook_sample_click", { slug })}>
                  <FileText className="mr-2 h-4 w-4" aria-hidden />
                  Read a free chapter
                </a>
              </Button>
            ) : null}
          </div>

          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            Your copy carries your email address on every page. It is for your own study: sharing it is not allowed.
          </p>
          {loadFailed ? <p className="mt-2 text-xs text-destructive">Could not check your account. Refresh to try again.</p> : null}
        </div>
      )}
    </section>
  );
}

function Owned({ slug, status, onChange }: { slug: string; status: EbookStatus; onChange: () => Promise<void> }) {
  const [downloading, setDownloading] = useState(false);

  async function download() {
    setDownloading(true);
    try {
      const res = await fetch(`/api/ebooks/${slug}/download`, { method: "POST" });
      const body = (await res.json()) as { url?: string; left?: number; error?: string };
      if (!res.ok || !body.url) throw new Error(body.error || "Could not prepare your copy");
      window.location.href = body.url;
      toast.success(`Your book is downloading. ${body.left} download${body.left === 1 ? "" : "s"} left.`);
      await onChange();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not prepare your copy");
    } finally {
      setDownloading(false);
    }
  }

  const left = status.left ?? 0;
  return (
    <div>
      <p className="flex items-center gap-2 text-sm font-medium text-brand-accent">
        <BookCheck className="h-4 w-4" aria-hidden /> You own this book
      </p>
      <Button variant="brand" className="mt-3 w-full" onClick={download} disabled={downloading || left === 0}>
        {downloading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden /> : <Download className="mr-2 h-4 w-4" aria-hidden />}
        {downloading ? "Preparing your copy…" : "Download PDF"}
      </Button>
      <p className="mt-2 text-xs text-muted-foreground">
        {left === 0
          ? "You have used all 5 downloads. Write to us if you need another."
          : `${left} of 5 downloads left. The first one can take a few seconds.`}
      </p>
      {status.namePlate ? <CoverNameForm slug={slug} current={status.coverName} onChange={onChange} /> : null}
      <PrintInterest slug={slug} answered={status.printInterest} onChange={onChange} />
    </div>
  );
}

/** The name on the cover of the buyer's copy: the account's by default, theirs to change. */
function CoverNameForm({ slug, current, onChange }: { slug: string; current: string | null; onChange: () => Promise<void> }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(current ?? "");
  const [saving, setSaving] = useState(false);
  const inputId = useId();

  const save = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setSaving(true);
      try {
        const res = await fetch(`/api/ebooks/${slug}/name`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name }),
        });
        const body = (await res.json()) as { name?: string; error?: string };
        if (!res.ok || !body.name) throw new Error(body.error || "Could not save the name");
        toast.success(`Saved. Your next download has ${body.name} on the cover.`);
        setEditing(false);
        await onChange();
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Could not save the name");
      } finally {
        setSaving(false);
      }
    },
    [name, onChange, slug]
  );

  if (!editing) {
    return (
      <div className="mt-5 rounded-xl border bg-muted/40 p-4">
        <p className="flex items-center gap-2 text-sm font-medium">
          <PenLine className="h-4 w-4 text-brand-accent" aria-hidden />
          Name on the cover
        </p>
        <p className="mt-1 text-sm">
          {current ? <span className="font-semibold">{current}</span> : <span className="text-muted-foreground">Your email address</span>}
        </p>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="mt-3"
          onClick={() => {
            setName(current ?? "");
            setEditing(true);
          }}
        >
          Change name
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={save} className="mt-5 rounded-xl border bg-muted/40 p-4">
      <label htmlFor={inputId} className="flex items-center gap-2 text-sm font-medium">
        <PenLine className="h-4 w-4 text-brand-accent" aria-hidden />
        Name on the cover
      </label>
      <p className="mt-1 text-xs text-muted-foreground">In English letters, as you want it printed. Your next download carries it.</p>
      <div className="mt-2 flex gap-2">
        <Input
          id={inputId}
          autoComplete="name"
          maxLength={MAX_PRINT_NAME}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-9"
          autoFocus
        />
        <Button type="submit" size="sm" variant="brand" disabled={saving || !name.trim()}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" aria-label="Saving" /> : "Save"}
        </Button>
      </div>
      <Button type="button" size="sm" variant="ghost" className="mt-1 px-0 text-xs" onClick={() => setEditing(false)}>
        Cancel
      </Button>
    </form>
  );
}

function PrintInterest({
  slug,
  answered,
  onChange,
}: {
  slug: string;
  answered: EbookStatus["printInterest"];
  onChange: () => Promise<void>;
}) {
  const [pincode, setPincode] = useState(answered?.pincode ?? "");
  const [saving, setSaving] = useState(false);
  const inputId = useId();

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/ebooks/print-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, pincode }),
      });
      const body = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) throw new Error(body.error || "Could not save that");
      toast.success("Thanks. We will tell you if we print it.");
      await onChange();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save that");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={save} className="mt-5 rounded-xl border bg-muted/40 p-4">
      <p className="flex items-center gap-2 text-sm font-medium">
        <Printer className="h-4 w-4 text-brand-accent" aria-hidden />
        {answered ? "You asked for a printed copy" : "Want this as a printed book?"}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        {answered
          ? "Thanks. We will tell you if we print it. You can change your pincode below."
          : "Tap to tell us. It costs nothing, and helps us decide whether to print it."}
      </p>
      <label htmlFor={inputId} className="mt-3 block text-xs font-medium">
        Your pincode (optional)
      </label>
      <div className="mt-1 flex gap-2">
        <Input
          id={inputId}
          inputMode="numeric"
          autoComplete="postal-code"
          maxLength={6}
          pattern="[1-9][0-9]{5}"
          placeholder="411004"
          value={pincode}
          onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
          className="h-9"
        />
        <Button type="submit" size="sm" variant={answered ? "outline" : "brand"} disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" aria-label="Saving" /> : answered ? "Update" : "I want it"}
        </Button>
      </div>
    </form>
  );
}
