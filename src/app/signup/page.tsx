"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen, Eye, EyeOff, MailCheck } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { validateSignup } from "@/lib/auth/credentials";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import { cn } from "@/lib/utils";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmSent, setConfirmSent] = useState(false);

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
    });

    if (signUpError) {
      setError(signUpError.message);
      setSubmitting(false);
      return;
    }

    // With "Confirm email" OFF, signUp returns a live session → straight in.
    // If a project leaves confirmation ON, there's no session; show the
    // check-your-email state instead of failing silently.
    if (data.session) {
      router.replace("/browse");
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
          <div className="mb-8 flex items-center gap-2 md:hidden">
            <BookOpen className="h-5 w-5 text-primary" aria-hidden />
            <span className="text-sm font-semibold tracking-tight">
              Question Bank
            </span>
          </div>

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
              </header>

              <GoogleSignInButton next="/browse" />

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
                      className="pr-10"
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
        </div>
      </section>

      <BrandPanel />
    </main>
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
            Real past-year questions.
            <br />
            Built for your exam.
          </p>
          <p className="mt-4 max-w-md text-sm text-primary-foreground/70">
            Filter by exam, chapter and difficulty, download a paper + answer
            key, and study with grounded notes and strategy guides.
          </p>
        </div>
        <p className="text-xs text-primary-foreground/50">
          Free to start — no card required.
        </p>
      </div>
    </aside>
  );
}
