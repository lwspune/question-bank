"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, MailCheck } from "lucide-react";
import {
  AUTH_INPUT_CLASS,
  AUTH_SUBMIT_CLASS,
  AuthBrandPanel,
  AuthCard,
  AuthLogo,
} from "@/components/auth/AuthLayout";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { signUpErrorMessage, validateSignup } from "@/lib/auth/credentials";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GoogleAuthButton from "@/components/auth/GoogleAuthButton";
import { cn } from "@/lib/utils";
import { REFERRAL_FRIEND_PCT } from "@/lib/referrals/referral";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmSent, setConfirmSent] = useState(false);
  // Honour ?next= (e.g. a quiz CTA → /pricing) and ?utm_source= (attribution:
  // which quiz drove this signup). Read from window to avoid a useSearchParams
  // Suspense boundary on this client page.
  const [next, setNext] = useState("/browse");
  const [signupSource, setSignupSource] = useState<string | undefined>(undefined);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const n = params.get("next");
    if (n && n.startsWith("/")) setNext(n);
    setSignupSource(params.get("utm_source") ?? undefined);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const validation = validateSignup({ email, password, confirm });
    if (!validation.ok) {
      setError(validation.message);
      return;
    }

    setSubmitting(true);
    const supabase = createSupabaseBrowserClient();
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: signupSource ? { data: { signup_source: signupSource } } : undefined,
    });

    if (signUpError) {
      setError(signUpErrorMessage(signUpError));
      setSubmitting(false);
      return;
    }

    // With "Confirm email" OFF, signUp returns a live session → straight in.
    // A brand-new account always hits the one-time intent capture first, then
    // continues to `next` (/welcome self-guards for anyone already onboarded).
    // If a project leaves confirmation ON, there's no session; show the
    // check-your-email state instead of failing silently.
    if (data.session) {
      router.replace(`/welcome?next=${encodeURIComponent(next)}`);
      router.refresh();
      return;
    }
    setConfirmSent(true);
    setSubmitting(false);
  }

  return (
    <main className="grid min-h-screen md:grid-cols-2">
      <section className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <AuthLogo />
          <AuthCard>
          {confirmSent ? (
            <div className="space-y-4" role="status">
              <MailCheck className="h-8 w-8 text-primary" aria-hidden />
              <h1 className="text-2xl font-semibold tracking-tight">
                Check your email
              </h1>
              <p className="text-sm text-muted-foreground">
                We sent a confirmation link to{" "}
                <span className="font-medium">{email}</span>. Click it to
                finish creating your account, then sign in.
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link href="/login">Go to sign in</Link>
              </Button>
            </div>
          ) : (
            <>
              <header className="mb-6">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Create your account
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Free to start. Build papers, save reports, and unlock more.
                </p>
                {/* A friend's invite link (/r/<code>, 0249) lands here tagged as a referral. */}
                {signupSource === "referral" && (
                  <p className="mt-3 rounded-md bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
                    Your friend&apos;s invite: {REFERRAL_FRIEND_PCT}% off your first pass.
                  </p>
                )}
              </header>

              <GoogleAuthButton next={next} signupSource={signupSource} />

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
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={submitting}
                    className={AUTH_INPUT_CLASS}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={submitting}
                      className={cn(AUTH_INPUT_CLASS, "pr-10")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
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
                <div className="space-y-2">
                  <Label htmlFor="confirm">Confirm password</Label>
                  <Input
                    id="confirm"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="new-password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    disabled={submitting}
                    className={AUTH_INPUT_CLASS}
                  />
                </div>
                {error && (
                  <p className="text-sm text-destructive" role="alert">
                    {error}
                  </p>
                )}
                <Button
                  type="submit"
                  className={AUTH_SUBMIT_CLASS}
                  disabled={submitting || !email || !password || !confirm}
                >
                  {submitting ? "Creating account…" : "Create account"}
                </Button>
              </form>

              <p className="mt-6 text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-foreground underline-offset-4 hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </>
          )}
          </AuthCard>
        </div>
      </section>

      <BrandPanel />
    </main>
  );
}

function BrandPanel() {
  return (
    <AuthBrandPanel
      heading={
        <>
          Real previous year questions.
          <br />
          Built for your exam.
        </>
      }
      body="Filter by exam, chapter and difficulty, download a paper + answer key, and study with grounded notes and strategy guides."
      footer="Free to start. No card required."
    />
  );
}
