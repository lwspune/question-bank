import type { Metadata } from "next";
import Link from "next/link";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getOwnProfile } from "@/lib/profile/service";
import { normaliseFrom } from "@/lib/tutor/interest";
import TutorInterestForm from "./TutorInterestForm";

/**
 * The 1:1 tutoring interest check (owner, 2026-10-27; migration 0190): a few
 * taps that measure demand before anything is built. Signed-in only since
 * 2026-10-28, so every Yes is someone we can reach; a Yes from an account with
 * no city or no mobile on file is asked for them last. Kept out of search: it offers
 * nothing yet, so it should not rank for "tutoring".
 */
export const metadata: Metadata = {
  title: "1:1 tutoring",
  description: "Tell us whether you would want 1:1 tutoring, as a student or as a teacher.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/tutor" },
};

export const dynamic = "force-dynamic";

export default async function TutorPage({ searchParams }: { searchParams: { from?: string } }) {
  const user = await getSessionUser();
  const profile = user ? await getOwnProfile(createSupabaseServerClient(), user.id) : null;
  const from = normaliseFrom(searchParams.from);
  const here = encodeURIComponent(from ? `/tutor?from=${from}` : "/tutor");

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-xl px-4 py-8 sm:px-6">
        <header className="hero-soft rounded-2xl px-5 py-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">1:1 tutoring</h1>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
            We are thinking of adding one-to-one tutoring. A few quick taps tell us whether to build it.
          </p>
        </header>
        {user ? (
          <TutorInterestForm hasMobile={!!profile?.mobile} hasCity={!!profile?.city} />
        ) : (
          <section className="mt-6 rounded-xl border bg-card p-6 text-center">
            <h2 className="text-lg font-semibold">Sign in to answer</h2>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
              We ask you to sign in so we can tell you if 1:1 tutoring opens.
            </p>
            <div className="mt-5 grid gap-3">
              <Button asChild variant="brand" className="h-12 w-full text-base">
                <Link href={`/login?next=${here}`}>Sign in</Link>
              </Button>
              <Button asChild variant="outline" className="h-12 w-full text-base">
                <Link href={`/signup?next=${here}`}>Create a free account</Link>
              </Button>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
