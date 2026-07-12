"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * WhatsApp opt-in card (Phase 3) — CAPTURE ONLY (no messages are sent yet).
 * Offered once, right after a mock, when a mobile is already on file. "Opt in"
 * and "No thanks" both stamp whatsapp_prompted_at server-side, so it's asked
 * once. The checkbox-free copy carries the marketing-consent purpose (DPDP).
 */
export default function WhatsappOptIn() {
  const [done, setDone] = useState(false);
  const [saving, setSaving] = useState(false);

  async function decide(optIn: boolean) {
    setSaving(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ whatsappOptIn: optIn }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Could not save.");
      if (optIn) toast.success("You're in — we'll send your weekly report on WhatsApp.");
      setDone(true);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save. Please try again.");
      setSaving(false);
    }
  }

  if (done) return null;

  return (
    <section className="mt-4 rounded-xl border border-brand-accent/30 bg-brand-accent/5 p-5">
      <div className="flex items-start gap-3">
        <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-brand-accent" aria-hidden />
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-semibold">Get your weekly weak-area report on WhatsApp</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            A short, weekly nudge on what to revise next — straight to your WhatsApp.
            By opting in you agree to be contacted by LWS per our{" "}
            <Link href="/privacy" className="underline underline-offset-2 hover:text-foreground" target="_blank">
              privacy policy
            </Link>
            .
          </p>
          <div className="mt-3 flex items-center gap-2">
            <Button type="button" variant="brand" size="sm" onClick={() => decide(true)} disabled={saving}>
              Send it to me
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => decide(false)}
              disabled={saving}
              className="text-muted-foreground"
            >
              <X className="h-3.5 w-3.5" aria-hidden />
              No thanks
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
