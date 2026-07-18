"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, GraduationCap } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RequestAccessForm() {
  const [name, setName] = useState("");
  const [institute, setInstitute] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/teacher-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, institute, email, mobile, city, message, consent }),
      });
      if (!res.ok) {
        const json = (await res.json().catch(() => ({}))) as { error?: string };
        const msg = json.error ?? `Something went wrong (${res.status}).`;
        setError(msg);
        toast.error(msg);
        return;
      }
      setDone(true);
      toast.success("Request sent — we'll be in touch.");
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
        <h2 className="mt-3 text-lg font-semibold">Request received</h2>
        <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
          Thanks — we&apos;ll review your request and reach out to set up your
          teacher account. In the meantime, browsing, timed mock tests and notes
          are all free.
        </p>
        <Button asChild variant="outline" className="mt-4">
          <Link href="/browse">Back to the bank</Link>
        </Button>
      </div>
    );
  }

  const textareaCls =
    "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="ta-name">Your name *</Label>
        <Input
          id="ta-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={busy}
          required
          autoComplete="name"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="ta-institute">Institute / coaching centre</Label>
        <Input
          id="ta-institute"
          value={institute}
          onChange={(e) => setInstitute(e.target.value)}
          disabled={busy}
          placeholder="Optional"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="ta-mobile">Mobile *</Label>
          <Input
            id="ta-mobile"
            type="tel"
            inputMode="numeric"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            disabled={busy}
            required
            autoComplete="tel"
            placeholder="10-digit number"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="ta-email">Email</Label>
          <Input
            id="ta-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={busy}
            autoComplete="email"
            placeholder="Optional"
          />
        </div>
      </div>
      <p className="-mt-2 text-xs text-muted-foreground">
        We&apos;ll usually reach you on WhatsApp or a call — your mobile is required.
      </p>

      <div className="space-y-1.5">
        <Label htmlFor="ta-city">City</Label>
        <Input
          id="ta-city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={busy}
          placeholder="Optional"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="ta-message">Anything else?</Label>
        <textarea
          id="ta-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={busy}
          maxLength={1000}
          className={textareaCls}
          placeholder="Which exams do you teach? How many students?"
        />
      </div>

      <label className="flex cursor-pointer items-start gap-2 text-sm">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          disabled={busy}
          className="mt-0.5 h-4 w-4"
        />
        <span className="text-muted-foreground">
          I agree to be contacted about teacher access and accept the{" "}
          <Link href="/privacy" className="text-brand-accent underline">
            privacy policy
          </Link>
          .
        </span>
      </label>

      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      <Button type="submit" variant="brand" disabled={busy} className="w-full sm:w-auto">
        <GraduationCap className="h-4 w-4" aria-hidden />
        {busy ? "Sending…" : "Request teacher access"}
      </Button>
    </form>
  );
}
