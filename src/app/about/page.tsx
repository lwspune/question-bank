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
 * The "How the bank is built" section is the load-bearing one: the
 * verification story is both true and unfakeable, and it is the strongest
 * evidence the site has that a person did this work. Every figure in it is
 * asserted in CLAUDE.md and the Decisions log. If those numbers move, move
 * them here — they are deliberately conservative, stated as floors.
 */
import type { Metadata } from "next";
import Link from "next/link";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import { CONTACT_EMAIL } from "@/lib/brand";

export const revalidate = 86400;

const PAGE_TITLE = "About PYQ Vault";
const PAGE_DESCRIPTION =
  "PYQ Vault is a free past-year question bank for Indian entrance and board exams, " +
  "built and maintained by Vilas Shinde in Pune. Every answer in the bank is worked " +
  "out independently before a printed key is trusted.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: { title: PAGE_TITLE, description: PAGE_DESCRIPTION, type: "website" },
};

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

        <H2>How the bank is built</H2>
        <P>
          Papers are collected, transcribed question by question, and then —
          this is the part that takes the time — every answer is worked out
          again from scratch, before anyone looks at the printed key. Only then
          are the two compared. Where they disagree, the original booklet
          settles it.
        </P>
        <P>
          That sounds like excessive caution until you do it. Circulating answer
          keys for Indian entrance exams are wrong more often than most teachers
          expect, and a bank that copies them inherits every error. Working NDA
          II 2026 Mathematics this way, all 120 questions were solved before any
          key was available; 117 agreed with an independently produced key, and
          all three disagreements resolved against the key, not against us.
          Across the bank, roughly 235 wrong answer keys have been found and
          corrected this way.
        </P>
        <P>
          Textbooks get the same treatment. Checking the Balbharati Class 12
          Mathematics chapters against the book&rsquo;s own answers section
          turned up 151 corrections across 12 chapters, and the printed key was
          wrong about four times as often as our working was. Where the book is
          the one at fault we say so on the question rather than quietly
          changing it, because a student sitting with the book open needs to
          know which of you to believe.
        </P>
        <P>
          Nothing here is scraped. If a question is in the bank, someone read
          it, classified it and solved it.
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
          please tell me. A correction from someone holding the actual paper is
          worth more than any check we can run here, and it is how a good part
          of the list above got found in the first place.
        </P>
        <P>
          Write to{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=PYQ%20Vault%20correction`}
            className="text-brand-accent underline"
          >
            {CONTACT_EMAIL}
          </a>
          . Every page in the question bank and the notes also has a report
          button, which is faster because it tells me which question you mean.
        </P>

        <div className="mt-10 rounded-xl border bg-muted/30 p-5 text-sm">
          <p className="font-semibold tracking-tight text-foreground">
            PYQ Vault
          </p>
          <p className="mt-1 font-serif leading-relaxed text-muted-foreground">
            Vilas Shinde · Pune, Maharashtra, India
            <br />
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-brand-accent underline"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
