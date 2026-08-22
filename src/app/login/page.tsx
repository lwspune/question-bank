"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { BookOpen, Eye, EyeOff } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import { safeNextPath } from "@/lib/auth/redirect";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen md:grid-cols-2">
      {/* useSearchParams (reading `?next=`) must sit inside Suspense. */}
      <Suspense fallback={<section className="px-6 py-16" />}>
        <LoginSection />
      </Suspense>
      <BrandPanel />
    </main>
  );
}

function LoginSection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Where to land after login: a validated `?next=` (used by the sign-up gates
  // to return the student to the page they came from), else the dashboard —
  // which itself routes org staff to their console and students to /me.
  const next = safeNextPath(searchParams.get("next"), "/dashboard");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const supabase = createSupabaseBrowserClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setSubmitting(false);
      return;
    }
    router.replace(next);
    router.refresh();
  }

  return (
    <section className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2 md:hidden">
            <BookOpen className="h-5 w-5 text-primary" aria-hidden />
            <span className="text-sm font-semibold tracking-tight">
              PYQ Vault
            </span>
          </div>

          <header className="mb-6">
            <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Enter your email and password.
            </p>
          </header>

          <GoogleSignInButton next={next} />

          <div className="my-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-border" />
            <span className="text-xs uppercase tracking-wide text-muted-foreground">
              or
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>

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
                disabled={submitting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={submitting}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                  className={cn(
                    "absolute inset-y-0 right-0 flex w-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground",
                    submitting && "pointer-events-none opacity-50"
                  )}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" aria-hidden />
                  ) : (
                    <Eye className="h-4 w-4" aria-hidden />
                  )}
                </button>
              </div>
            </div>
            {error && (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            )}
            <Button
              type="submit"
              className="w-full"
              disabled={submitting || !email || !password}
            >
              {submitting ? "Signing in…" : "Sign in"}
            </Button>
          </form>

          <p className="mt-6 text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </section>
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
          <span>PYQ Vault</span>
        </div>
        {/*
          AUDIENCE-NEUTRAL ON PURPOSE. This panel used to read "For coaching
          staff. … A focused tool for teachers." — copy from when the paper
          builder was the whole product. Every route into /login is now a
          STUDENT path (the header Sign in, the /notes paywall, the question and
          concept report dialogs, /pricing, and /signup's "Go to sign in"), and
          the accounts match: 124 of 131 are non-staff. It also promised a Word
          download that has been teacher-gated since 2026-07-18, so a returning
          student read a promise the product would refuse.

          Both audiences sign in here, so this names what an account restores
          for everyone first, then attributes the download to teachers rather
          than dropping it. Positioning follows the homepage hero — do not
          invent a third one here.
        */}
        <div>
          <p className="font-serif text-3xl leading-snug tracking-tight lg:text-4xl">
            Pick up right where
            <br />
            you left off.
          </p>
          <p className="mt-4 max-w-md text-sm text-primary-foreground/70">
            Your saved questions, mock attempts and notes progress, all waiting
            for you. Teachers can also download question papers and answer keys
            as Word files.
          </p>
        </div>
        <p className="text-xs text-primary-foreground/50">
          Built on real past-year questions.
        </p>
      </div>
    </aside>
  );
}
