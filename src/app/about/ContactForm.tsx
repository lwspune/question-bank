"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CONTACT_MESSAGE_MAX } from "@/lib/contact/validate";

/**
 * The /about contact form. POSTs to /api/contact, which writes a row.
 *
 * It exists because a `mailto:` is only as good as the mailbox behind it, and
 * a correction from someone holding the actual paper is the one message we
 * cannot afford to lose. Mirrors RequestAccessForm's shape and conventions
 * (sonner toast + inline error, disabled-while-busy, explicit labels).
 */
export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  // Honeypot — hidden from humans and from assistive tech; bots fill it in.
  const [website, setWebsite] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message, website }),
      });
      if (!res.ok) {
        const json = (await res.json().catch(() => ({}))) as { error?: string };
        const msg = json.error ?? `Something went wrong (${res.status}).`;
        setError(msg);
        toast.error(msg);
        return;
      }
      setDone(true);
      toast.success("Message sent — thank you.");
    } catch {
      const msg = "Network error — please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-lg border bg-muted/30 p-6 text-center">
        <CheckCircle2 className="mx-auto h-8 w-8 text-brand-accent" aria-hidden />
        <h3 className="mt-3 text-lg font-semibold tracking-tight">Message received</h3>
        <p className="mx-auto mt-1 max-w-md font-serif text-sm leading-relaxed text-muted-foreground">
          Thanks — it has landed. If you reported a wrong answer, I check those
          against the original paper before changing anything, so a reply may
          take a few days.
        </p>
      </div>
    );
  }

  const textareaCls =
    "flex min-h-[110px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="ct-name">Your name *</Label>
          <Input
            id="ct-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={busy}
            required
            maxLength={80}
            autoComplete="name"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="ct-email">Email *</Label>
          <Input
            id="ct-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={busy}
            required
            maxLength={160}
            autoComplete="email"
            aria-describedby="ct-email-help"
          />
          <p id="ct-email-help" className="text-xs text-muted-foreground">
            So I can reply.
          </p>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="ct-phone">Phone</Label>
        <Input
          id="ct-phone"
          type="tel"
          inputMode="numeric"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={busy}
          placeholder="Optional"
          autoComplete="tel"
          aria-describedby="ct-phone-help"
        />
        <p id="ct-phone-help" className="text-xs text-muted-foreground">
          Optional — 10-digit Indian mobile, only if you would rather I call.
        </p>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="ct-message">Message *</Label>
        <textarea
          id="ct-message"
          className={textareaCls}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={busy}
          required
          maxLength={CONTACT_MESSAGE_MAX}
          placeholder="If it is a wrong answer, the exam, year and question number help me find it fast."
        />
        <p className="text-right text-xs tabular-nums text-muted-foreground">
          {message.length} / {CONTACT_MESSAGE_MAX}
        </p>
      </div>

      {/* Honeypot: off-screen rather than display:none (some bots skip hidden
          fields), aria-hidden + tabIndex -1 so no real user can reach it. */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="ct-website">Website</label>
        <input
          id="ct-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      {error ? (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      ) : null}

      <Button type="submit" disabled={busy} className="w-full sm:w-auto">
        {busy ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
