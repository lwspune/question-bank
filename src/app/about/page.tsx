/**
 * /about — the page that puts a person behind the bank.
 *
 * WHY IT EXISTS: until 2026-09-16 nothing on the public site named a human.
 * The Footer read "From the team at PYQ Vault", the blog's JSON-LD set
 * `author` to the ORGANISATION, and there was no about/contact/team page at
 * all. Feedback that the site "looks like it was written by AI" is usually
 * shorthand for "I can't find anyone behind this", and anonymity is the part
 * of that no amount of copy-editing fixes.
 *
 * A "How the bank is built" section (the blind-re-derivation story, with the
 * NDA II 2026 117/120 figure and the ~235 corrected keys) shipped here on
 * 2026-09-16 and was REMOVED the same day at the owner's request. It is not
 * missing by oversight — do not restore it as a fix. If that story is wanted
 * again, it belongs on a page of its own rather than in the middle of a
 * who-am-I page; the figures are in CLAUDE.md and the Decisions log.
 */
import type { Metadata } from "next";
import { Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import { CONTACT_EMAIL } from "@/lib/brand";
import ContactForm from "./ContactForm";

export const revalidate = 86400;

const PAGE_TITLE = "About PYQ Vault";
const PAGE_DESCRIPTION =
  "PYQ Vault is a free past-year question bank for Indian entrance and board exams, " +
  "built and maintained by Vilas Shinde in Pune. What the site costs to use, how to " +
  "report a wrong answer, and how to get in touch.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: { title: PAGE_TITLE, description: PAGE_DESCRIPTION, type: "website" },
};

const LINKEDIN_URL = "https://www.linkedin.com/in/vilas-shinde-26b98474/";
const INSTAGRAM_URL = "https://www.instagram.com/vilasvshinde/";

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-10 text-lg font-semibold tracking-tight sm:text-xl">
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 font-serif text-base leading-relaxed text-muted-foreground">
      {children}
    </p>
  );
}

export default function AboutPage() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-2xl px-6 pb-16 pt-8">
        <header>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
            About
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Who is behind PYQ Vault
          </h1>
          <p className="mt-4 font-serif text-base leading-relaxed text-muted-foreground sm:text-lg">
            PYQ Vault is built and maintained by{" "}
            <strong className="text-foreground">Vilas Shinde</strong>, in Pune.
            It is a free, public bank of past-year questions for Indian entrance
            and board exams.
          </p>
        </header>

        <H2>Why it exists</H2>
        <P>
          Most students prepare by sitting whole papers. That tells you your
          score. It does not tell you that eleven of your fourteen lost marks
          came from two subtopics you have been avoiding since Class 11.
        </P>
        <P>
          So the papers here are taken apart rather than served whole. Every
          question is filed by exam, subject, chapter, subtopic, difficulty and
          the year it was asked, which means you can practise the one thing you
          keep getting wrong instead of another full sitting. The whole papers
          are still here, timed and auto-graded, for when you want them.
        </P>

        <H2>What is free, and what needs an account</H2>
        <P>
          Reading is free and needs no account at all: the whole question bank,
          every answer and explanation, all the strategy guides, all the notes,
          and the textbook reader. You can use the site indefinitely without
          telling us anything about yourself.
        </P>
        <P>
          A free account exists for the things that have to remember you, which
          is sitting a timed mock and having the score kept, saving questions,
          and tracking which notes you have worked through. The one genuinely
          restricted thing is downloading a question paper and answer key as
          Word files. That is a teacher&rsquo;s tool rather than a
          student&rsquo;s, so it needs a teacher account. If you teach and want
          one,{" "}
          <Link href="/request-access" className="text-brand-accent underline">
            request access here
          </Link>
          .
        </P>

        <H2>Corrections</H2>
        <P>
          If you find a wrong answer, a mangled question or a bad explanation,
          please tell me. A correction from someone holding the actual paper
          is worth more than any check we can run from here.
        </P>
        <P>
          Every page in the question bank and the notes also has a report
          button, which is faster than this form because it tells me exactly
          which question you mean.
        </P>

        <H2>Write to me</H2>
        <P>
          This goes straight to me. I read everything, though I am one person,
          so a reply can take a few days.
        </P>
        <div className="mt-5 rounded-xl border bg-card p-5 sm:p-6">
          <ContactForm />
        </div>

        <div className="mt-10 rounded-xl border bg-muted/30 p-5 text-sm">
          <p className="font-semibold tracking-tight text-foreground">
            PYQ Vault
          </p>
          <p className="mt-1 font-serif leading-relaxed text-muted-foreground">
            Vilas Shinde · Pune, Maharashtra, India
            <br />
            Or by email:{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-brand-accent underline"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
          <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 font-serif text-muted-foreground">
            <span>Follow me:</span>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-brand-accent underline"
            >
              <Linkedin aria-hidden className="h-3.5 w-3.5" />
              LinkedIn
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-brand-accent underline"
            >
              <Instagram aria-hidden className="h-3.5 w-3.5" />
              Instagram
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
