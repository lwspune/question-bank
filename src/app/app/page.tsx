/**
 * /app — how to install PYQ Vault on a phone (2026-11-14, growth registry
 * "install-app").
 *
 * WHY IT EXISTS. About 8 students in four weeks asked whether PYQ Vault has an
 * app ("Tum playstore pe ho", "How to download Pyq vault application"). It
 * installs from the website already (public/manifest.webmanifest), but nothing
 * offered it, so V explained it to each one by hand. This page is the one link
 * V, the account menu, the footer and a reply to a student can all give.
 *
 * STATIC AND INDEXABLE. Every set of steps is plain text here; the client card
 * on top only picks the one this visitor's phone needs and holds the Install
 * button. No cookies or session at render, so it prerenders and is cached.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { EllipsisVertical, Share } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import InstallCard from "./InstallCard";

export const revalidate = 86400;

const PAGE_TITLE = "Get the PYQ Vault app";
const PAGE_DESCRIPTION =
  "Install PYQ Vault on your Android phone or iPhone straight from the website. It opens from its own icon, " +
  "updates itself and takes almost no space. No Play Store download needed.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/app" },
  openGraph: { title: PAGE_TITLE, description: PAGE_DESCRIPTION, type: "website" },
};

const QUESTIONS: { q: string; a: React.ReactNode }[] = [
  {
    q: "Is PYQ Vault on the Play Store or App Store?",
    a: "Not yet. This is the same PYQ Vault, installed from the website. There is nothing to download from a store, it takes almost no space, and it updates itself.",
  },
  {
    q: "Do I need to sign in again?",
    a: "On Android, no: the app shares Chrome's sign-in. On iPhone, sign in once inside the app, and it keeps you signed in after that.",
  },
  {
    q: "Can I get reminders?",
    a: (
      <>
        Yes. Open the app, go to{" "}
        <Link href="/account" className="text-brand-accent underline">
          Account
        </Link>{" "}
        and turn on reminders. On iPhone, reminders work only from the installed app.
      </>
    ),
  },
  {
    q: "Something does not work well on my phone",
    a: (
      <>
        Tell us what happens and on which page, on the{" "}
        <Link href="/contact" className="text-brand-accent underline">
          contact page
        </Link>
        , and we will fix it.
      </>
    ),
  },
];

export default function AppPage() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-2xl px-4 pb-16 pt-8 sm:px-6">
        <header>
          <h1 className="text-3xl font-bold tracking-tight">{PAGE_TITLE}</h1>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            PYQ Vault installs on your phone like an app, straight from the website. It opens from its own icon, in its
            own window, without the browser&rsquo;s address bar.
          </p>
        </header>

        <div className="mt-6">
          <InstallCard />
        </div>

        <section aria-labelledby="android-steps" className="mt-10">
          <h2 id="android-steps" className="text-lg font-semibold">
            On Android
          </h2>
          <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm leading-relaxed">
            <li>Open www.pyqvault.com in Chrome.</li>
            <li>
              Tap the menu <EllipsisVertical className="inline h-4 w-4 align-text-bottom" aria-label="three dots" /> at
              the top right.
            </li>
            <li>
              Tap <strong>Install app</strong> or <strong>Add to Home screen</strong>, then Install.
            </li>
          </ol>
        </section>

        <section aria-labelledby="iphone-steps" className="mt-8">
          <h2 id="iphone-steps" className="text-lg font-semibold">
            On iPhone or iPad
          </h2>
          <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm leading-relaxed">
            <li>Open www.pyqvault.com in Safari.</li>
            <li>
              Tap Share <Share className="inline h-4 w-4 align-text-bottom" aria-label="the Share button" />.
            </li>
            <li>
              Tap <strong>Add to Home Screen</strong>, then Add.
            </li>
          </ol>
        </section>

        <section aria-labelledby="app-questions" className="mt-10">
          <h2 id="app-questions" className="text-lg font-semibold">
            Questions
          </h2>
          <dl className="mt-3 space-y-4">
            {QUESTIONS.map(({ q, a }) => (
              <div key={q}>
                <dt className="text-sm font-medium">{q}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{a}</dd>
              </div>
            ))}
          </dl>
        </section>
      </main>
      <Footer />
    </>
  );
}
