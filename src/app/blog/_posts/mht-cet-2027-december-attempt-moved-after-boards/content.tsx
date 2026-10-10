/**
 * Body of the MHT-CET 2027 dates post (published 2026-10-10).
 *
 * News first, then the one thing we can add that a news site cannot: how much
 * of an MHT-CET paper the boards already cover, measured on 40 real papers.
 * Every number comes from `_data/stats.ts`, which a prod-contract test
 * re-derives from the bank. The dates are REPORTS of 9 October 2026 with no
 * CET Cell notice yet, and the post says so wherever a date appears. When the
 * CET Cell publishes the schedule, update TIMELINE and the FAQ in
 * src/lib/blog/posts.ts, and set `dateModified`.
 */
import Link from "next/link";
import { ArrowRight, Info, Timer } from "lucide-react";
import {
  CHAPTER_COUNTS,
  SUBJECTS,
  TIMELINE,
  WINDOW,
  marksShare,
  perPaper,
  topChaptersOf,
  type Subject,
  type TimelineStatus,
} from "./_data/stats";

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-14 text-2xl font-bold tracking-tight sm:text-3xl">{children}</h2>;
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-8 text-lg font-semibold tracking-tight">{children}</h3>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 font-serif text-base leading-relaxed sm:text-lg">{children}</p>;
}

function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mt-4 list-disc space-y-2 pl-6 font-serif text-base leading-relaxed sm:text-lg">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

const STATUS_LABEL: Record<TimelineStatus, string> = {
  announced: "Announced (board's probable schedule)",
  reported: "Reported, not yet notified",
  "not announced": "Not announced",
};

const LINK = "font-medium text-brand-accent underline underline-offset-2 hover:text-brand-accent/80";

const SUBJECT_LABEL: Record<Subject, string> = { Physics: "Physics", Chemistry: "Chemistry", Maths: "Mathematics" };

export default function MhtCet2027DatesPost() {
  const share = marksShare();
  const totalQuestions = CHAPTER_COUNTS.reduce((a, r) => a + r.questions, 0);
  const xiMarksPerPaper = SUBJECTS.reduce(
    (a, s) => a + perPaper(s, "XI") * (s === "Maths" ? 2 : 1),
    0
  );

  return (
    <div>
      <div className="flex gap-3 rounded-lg border bg-muted/30 p-4">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
        <div className="font-serif text-base leading-relaxed">
          <p className="font-sans text-sm font-semibold">In short</p>
          <p className="mt-1">
            MHT-CET 2027 will not have an exam in December 2026. Reports on 9 October 2026 say both
            attempts are now expected after the HSC boards, between March and May 2027, at least four
            weeks apart, and the better of your two scores counts for admission. The State CET Cell
            has not yet published the dates.
          </p>
        </div>
      </div>

      <H2>What changed</H2>
      <P>
        MHT-CET 2027 will have two attempts. Until this week the plan was a first attempt in
        December 2026 and a second in April 2027, and CET Cell Commissioner Dileep Sardesai had
        earlier pointed to a first-attempt window of 15 December 2026 to 15 January 2027.
      </P>
      <P>
        On 9 October 2026, several education news sites reported that the state has dropped the
        December attempt after feedback from parents, admission counsellors and educationists. Their
        concern was timing: a December exam would land just before the HSC practicals in January and
        the pre-board tests, so students would be preparing for the entrance test and the boards at
        the same time. Both attempts are now expected after the HSC written papers end.
      </P>
      <P>
        The outlets word it differently. Some say the December attempt is cancelled; others say it
        is postponed and describe the final decision as pending. They agree on what matters to you:
        no MHT-CET exam in December, and two attempts after the boards.
      </P>

      <H2>MHT-CET 2027 and HSC 2027 dates so far</H2>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[22rem] border-collapse text-sm">
          <caption className="sr-only">MHT-CET 2027 and HSC 2027 dates as of 10 October 2026</caption>
          <thead>
            <tr className="border-b text-left">
              <th scope="col" className="py-2 pr-4 font-semibold">When</th>
              <th scope="col" className="py-2 pr-4 font-semibold">What</th>
              <th scope="col" className="py-2 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {TIMELINE.map((t) => (
              <tr key={t.what} className="border-b align-top">
                <td className="py-2 pr-4">{t.when}</td>
                <td className="py-2 pr-4 font-medium">{t.what}</td>
                <td className="py-2 text-muted-foreground">{STATUS_LABEL[t.status]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        HSC dates are the Maharashtra board&rsquo;s probable schedule of 17 September 2026; the
        subject-wise timetable is still to come. MHT-CET dates are news reports. We will update this
        table when the CET Cell publishes its schedule.
      </p>

      <H3>Known so far</H3>
      <Bullets
        items={[
          "No MHT-CET attempt in December 2026.",
          "Two attempts, both after the HSC written papers (which end on 16 March 2027).",
          "At least four weeks between the two attempts.",
          "The better of the two scores is used for admission.",
          "No change to the syllabus has been reported, and MHT-CET still has no negative marking.",
        ]}
      />
      <H3>Not announced yet</H3>
      <Bullets
        items={[
          "The exact dates of either attempt.",
          "Registration dates, fees and the information brochure.",
        ]}
      />
      <P>
        Both will appear on the State CET Cell&rsquo;s site,{" "}
        <a href="https://cetcell.mahacet.org" className={LINK} rel="noopener">
          cetcell.mahacet.org
        </a>
        . Until then, treat any specific MHT-CET date you see as a guess.
      </P>

      <H2>How much of MHT-CET do the boards already cover?</H2>
      <P>
        With the boards now first, the useful question is how much of your board revision counts
        for MHT-CET as well. Board revision means the Std XII book; the Std XI book is not on the HSC
        paper. So we took every MHT-CET PCM paper we hold from {WINDOW.fromYear} to {WINDOW.toYear} (
        {WINDOW.papers} papers, {totalQuestions.toLocaleString("en-IN")} questions) and filed each
        chapter under the Balbharati book it comes from.
      </P>
      <P>
        <strong>About {share.XII}% of the marks</strong> came from chapters found only in the Std XII
        book. <strong>About {share.XI}%</strong> came from chapters found only in the Std XI book, and
        the other {share.both}% from chapters that draw on both. That matches the CET Cell&rsquo;s own
        guide of roughly 80% Std XII and 20% Std XI.
      </P>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[24rem] border-collapse text-sm">
          <caption className="sr-only">
            MHT-CET questions per paper by Balbharati book, {WINDOW.fromYear} to {WINDOW.toYear}
          </caption>
          <thead>
            <tr className="border-b text-left">
              <th scope="col" className="py-2 pr-4 font-semibold">Subject</th>
              <th scope="col" className="py-2 pr-4 text-right font-semibold">Std XII chapters</th>
              <th scope="col" className="py-2 pr-4 text-right font-semibold">Both books</th>
              <th scope="col" className="py-2 text-right font-semibold">Std XI chapters</th>
            </tr>
          </thead>
          <tbody>
            {SUBJECTS.map((s) => (
              <tr key={s} className="border-b">
                <th scope="row" className="py-2 pr-4 text-left font-normal">
                  {SUBJECT_LABEL[s]}
                </th>
                <td className="py-2 pr-4 text-right tabular-nums">{perPaper(s, "XII")}</td>
                <td className="py-2 pr-4 text-right tabular-nums">{perPaper(s, "both")}</td>
                <td className="py-2 text-right tabular-nums font-semibold">{perPaper(s, "XI")}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-2 text-xs text-muted-foreground">
          Average questions per paper, out of 50 per subject. Mathematics questions carry 2 marks,
          Physics and Chemistry 1, for 200 marks in all.
        </p>
      </div>

      <P>
        So board revision covers roughly seven marks in ten directly. The Std XI chapters are the
        part the boards will not test: about {Math.round(xiMarksPerPaper)} marks a paper on average.
        That is the work to plan for, because it will not happen by itself while you revise for HSC.
      </P>

      <H3>The Std XI chapters that carry the most questions</H3>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {SUBJECTS.map((s) => (
          <div key={s} className="rounded-lg border p-4">
            <p className="text-sm font-semibold">{SUBJECT_LABEL[s]}</p>
            <ul className="mt-2 space-y-1 text-sm">
              {topChaptersOf(s, "XI", 4).map((r) => (
                <li key={r.chapter} className="flex justify-between gap-3">
                  <span>{r.chapter}</span>
                  <span className="shrink-0 tabular-nums text-muted-foreground">
                    {(r.questions / WINDOW.papers).toFixed(1)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-2 text-xs text-muted-foreground">Average questions per paper, {WINDOW.fromYear} to {WINDOW.toYear}.</p>

      <H2>How to use the new timeline</H2>
      <H3>Now to January: one syllabus, two exams</H3>
      <P>
        Your Std XII chapters are both your board syllabus and most of MHT-CET, so the work counts
        twice. Practise them as multiple-choice questions as well as board answers: MHT-CET rewards
        speed on a chapter you know, the board rewards a full written answer. Keep a fixed weekly
        slot for the Std XI chapters above, starting with the ones at the top of each list.
      </P>
      <H3>February and March: the boards</H3>
      <P>
        From the practicals in late January to the last written paper on 16 March, the boards come
        first. This is exactly what the change was meant to give you.
      </P>
      <H3>After the boards: Std XI first, then full papers</H3>
      <P>
        In the weeks between the boards and the first attempt, close the Std XI gaps first, then sit
        full timed papers. MHT-CET has no negative marking, so answer every question, even when you
        have to guess.
      </P>
      <H3>Between the two attempts</H3>
      <P>
        Use the first attempt as a diagnosis. Fix the chapters it showed up as weak, sit more full
        papers, and go into the second attempt knowing that only your better score counts.
      </P>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/mock/exam/mht-cet"
          className="inline-flex items-center gap-2 rounded-md bg-brand px-4 py-2 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Timer className="h-4 w-4" aria-hidden />
          Past MHT-CET papers as timed mocks
        </Link>
        <Link
          href="/notes/mht-cet"
          className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          MHT-CET chapter notes
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
        <Link
          href="/formula/mht-cet"
          className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Formula sheets by chapter
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
        <Link
          href="/guide/mht-cet"
          className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Subject strategy guides
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>

      <H2>Sources</H2>
      <Bullets
        items={[
          <a key="ci" href="https://www.careerindia.com/news/mht-cet-2027-both-attempts-after-class-12-board-exams-066835.html" className={LINK} rel="noopener">
            Careerindia: MHT-CET 2027, both attempts after Class 12 board exams (9 October 2026)
          </a>,
          <a key="c360" href="https://engineering.careers360.com/articles/is-mht-cet-2027-december-attempt-cancelled-check-cet-cell-update" className={LINK} rel="noopener">
            Careers360: Is the MHT-CET 2027 December attempt cancelled? (9 October 2026)
          </a>,
          <a key="cd" href="https://www.collegedekho.com/news/mht-cet-2027-december-attempt-cancelled-both-sessions-after-boards-80234/" className={LINK} rel="noopener">
            CollegeDekho: December attempt cancelled, both sessions after Class 12 boards
          </a>,
          <a key="hsc" href="https://www.careerindia.com/news/maharashtra-board-2027-exam-dates-hsc-ssc-schedule-011-65775.html" className={LINK} rel="noopener">
            Careerindia: Maharashtra Board 2027 HSC and SSC schedule
          </a>,
          <a key="cet" href="https://cetcell.mahacet.org" className={LINK} rel="noopener">
            State CET Cell, Maharashtra (official site for the final dates)
          </a>,
        ]}
      />

      <p className="mt-10 border-t pt-6 text-xs leading-relaxed text-muted-foreground">
        Method: the book split counts every PCM question in PYQ Vault&rsquo;s {WINDOW.papers}{" "}
        MHT-CET papers from {WINDOW.fromYear} to {WINDOW.toYear}. Each chapter is filed under the
        Balbharati book its questions are mapped to in our syllabus map: one book when at least three
        quarters of its mapped questions point only there, &ldquo;both books&rdquo; otherwise, and by
        its chapter title where too few are mapped. An automated test re-checks the figures against
        the live question bank, so they cannot quietly go stale.
      </p>
    </div>
  );
}
