"use client";

import { useState } from "react";
import { BookOpen, Mail } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Status = "idle" | "sending" | "sent" | "error";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError(null);

    const supabase = createSupabaseBrowserClient();
    const { error: signInError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });

    if (signInError) {
      setError(signInError.message);
      setStatus("error");
      return;
    }
    setStatus("sent");
  }

  function reset() {
    setStatus("idle");
    setError(null);
  }

  return (
    <main className="grid min-h-screen md:grid-cols-2">
      <section className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2 md:hidden">
            <BookOpen className="h-5 w-5 text-primary" aria-hidden />
            <span className="text-sm font-semibold tracking-tight">
              Question Bank
            </span>
          </div>

          {status === "sent" ? (
            <SentState email={email} onUseDifferent={reset} />
          ) : (
            <FormState
              email={email}
              setEmail={setEmail}
              onSubmit={onSubmit}
              sending={status === "sending"}
              error={error}
            />
          )}
        </div>
      </section>

      <BrandPanel />
    </main>
  );
}

function FormState({
  email,
  setEmail,
  onSubmit,
  sending,
  error,
}: {
  email: string;
  setEmail: (v: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  sending: boolean;
  error: string | null;
}) {
  return (
    <>
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          We&apos;ll email you a magic link.
        </p>
      </header>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@school.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={sending}
          />
        </div>
        {error && (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}
        <Button
          type="submit"
          className="w-full"
          disabled={sending || !email}
        >
          {sending ? "Sending…" : "Send magic link"}
        </Button>
      </form>
    </>
  );
}

function SentState({
  email,
  onUseDifferent,
}: {
  email: string;
  onUseDifferent: () => void;
}) {
  return (
    <div className="text-center">
      <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 duration-500 animate-in zoom-in-50">
        <Mail className="h-6 w-6 text-primary" aria-hidden />
      </div>
      <h1 className="text-2xl font-semibold tracking-tight">
        Check your inbox
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        We sent a sign-in link to{" "}
        <span className="font-medium text-foreground">{email}</span>. Click the
        link to continue. The link expires in 1 hour.
      </p>
      <button
        type="button"
        onClick={onUseDifferent}
        className="mt-6 text-sm font-medium text-primary hover:underline"
      >
        Use a different email
      </button>
    </div>
  );
}

function BrandPanel() {
  return (
    <aside
      aria-hidden
      className="relative hidden overflow-hidden bg-primary md:block"
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.18), transparent 50%), radial-gradient(circle at 70% 80%, rgba(255,255,255,0.12), transparent 60%)",
        }}
      />
      <div className="relative flex h-full flex-col justify-between p-12 text-primary-foreground">
        <div className="flex items-center gap-2 text-sm font-semibold tracking-tight">
          <BookOpen className="h-5 w-5" aria-hidden />
          <span>Question Bank</span>
        </div>
        <div>
          <p className="font-serif text-3xl leading-snug tracking-tight lg:text-4xl">
            Build a question paper in
            <br />
            two minutes flat.
          </p>
          <p className="mt-4 max-w-md text-sm text-primary-foreground/70">
            For coaching staff. Filter by exam, chapter and difficulty, then
            download a Question Paper + Answer Key as Word files.
          </p>
        </div>
        <p className="text-xs text-primary-foreground/50">
          A focused tool for teachers.
        </p>
      </div>
    </aside>
  );
}
