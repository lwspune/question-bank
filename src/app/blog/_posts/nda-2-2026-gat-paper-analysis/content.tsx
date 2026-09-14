/**
 * Body of the NDA II 2026 GAT paper analysis.
 *
 * Figures come from `_data/stats.ts` and are re-derived from production by
 * `tests/blog-nda2-2026-gat-stats.test.ts`. Change numbers there, not here.
 *
 * REGISTER: this is written to a candidate, not about one. The sibling Maths
 * post drifted into analyst voice ("the structural point is", "standard UPSC
 * furniture") and read as a newspaper column; the exam-hall callout was the one
 * paragraph pitched right. This post keeps that voice throughout, and uses
 * Indian English ("appeared for", "clear the exam") because that is what the
 * reader says.
 */
import Link from "next/link";
import { ArrowRight, Lightbulb, Timer } from "lucide-react";
import {
  BASELINE,
  ECONOMICS_RANGE,
  ENGLISH_CORE,
  ENGLISH_SPLIT,
  FORMAT_FIRST_SEEN,
  GK_DRIFT,
  HISTORY_POLITY_CROSSOVER,
  PAPER,
  SUBJECT_DIFFICULTY,
  SUBJECT_SPLIT,
  TRANSFORMATION_DEBUT,
  englishQuestionsIn,
  marksFor,
} from "./_data/stats";

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-14 text-2xl font-bold tracking-tight sm:text-3xl">{children}</h2>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 font-serif text-base leading-relaxed sm:text-lg">{children}</p>;
}

export default function NdaTwo2026GatAnalysis() {
  const coreEnglish = englishQuestionsIn(ENGLISH_CORE);
  const english = SUBJECT_SPLIT.find((s) => s.subject === "English")!;
  // Ranked by SHARE of hard questions, over subjects big enough for a share to
  // mean anything. Derived rather than written into the prose: an earlier draft
  // asserted Physics was second on share when it is third (29% against
  // History's 33%) — true only of the absolute count.
  const byHardShare = [...SUBJECT_DIFFICULTY]
    .filter((s) => s.count >= 9)
    .sort((a, b) => b.hard / b.count - a.hard / a.count);
  const [hardest, secondHardest] = byHardShare;
  const mostHardQuestions = [...SUBJECT_DIFFICULTY].sort((a, b) => b.hard - a.hard)[0];

  return (
    <div>
      <P>
        If you appeared for NDA II on 14 September, you already know what the General Ability Test
        does to you: {PAPER.questions} questions in {PAPER.minutes} minutes is one minute each, and
        there is no comfortable second pass. {PAPER.englishQuestions} questions of English, then{" "}
        {PAPER.gkQuestions} of General Knowledge spread across eight subjects.
      </P>
      <P>
        We hold every GAT paper since {BASELINE.fromYear} — {BASELINE.papers} sittings,{" "}
        {BASELINE.questions.toLocaleString("en-IN")} questions, each one sorted by subject. So
        rather than guessing what changed, we can check. Two things did change, one in each half of
        the paper, and both should change what you study next.
      </P>

      <H2>English is a third of the paper, and most of it is learnable</H2>
      <P>
        {english.count} questions means <strong>{marksFor(english.count)} of {PAPER.marks} marks</strong>{" "}
        before you touch a single GK question. Here is how those {english.count} broke up:
      </P>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[20rem] border-collapse text-sm">
          <caption className="sr-only">English chapters in the NDA II 2026 GAT paper</caption>
          <thead>
            <tr className="border-b text-left">
              <th scope="col" className="py-2 pr-4 font-semibold">Topic</th>
              <th scope="col" className="py-2 text-right font-semibold">Questions</th>
            </tr>
          </thead>
          <tbody>
            {ENGLISH_SPLIT.map((row) => {
              const core = (ENGLISH_CORE as readonly string[]).includes(row.chapter);
              return (
                <tr key={row.chapter} className={core ? "border-b bg-brand-accent/5" : "border-b"}>
                  <td className="py-2 pr-4">
                    {core ? <strong>{row.chapter}</strong> : row.chapter}
                  </td>
                  <td className="py-2 text-right tabular-nums">{row.count}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <P>
        Look at the top three: vocabulary, grammar and idioms came to{" "}
        <strong>{coreEnglish} of the {english.count}</strong> — {marksFor(coreEnglish)} marks. None
        of that asks you to understand a passage or reason about an argument. It asks whether you
        know the word, know the rule, know the phrase.
      </P>
      <P>
        That is genuinely good news, and students often miss why. This is the one block in the whole
        paper you can <em>finish</em> preparing. A word list ends. Grammar rules end. Compare that
        with Current Affairs, which never ends. If you are short on time, hours spent here pay back
        more reliably than hours spent anywhere else in the GAT.
      </P>

      <H2>The new thing in English: voice and speech</H2>
      <P>
        Now go looking for a question on active and passive voice, or direct and indirect speech, in
        the {TRANSFORMATION_DEBUT.sittingsWithNoneThrough2024} papers from {BASELINE.fromYear} to
        2024. You will not find one. Not a single question, in any of them.
      </P>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[24rem] border-collapse text-sm">
          <caption className="sr-only">
            Voice, speech and word-class questions by period
          </caption>
          <thead>
            <tr className="border-b text-left">
              <th scope="col" className="py-2 pr-4 font-semibold">Period</th>
              <th scope="col" className="py-2 pr-4 text-right font-semibold">Papers</th>
              <th scope="col" className="py-2 pr-4 text-right font-semibold">Voice &amp; speech</th>
              <th scope="col" className="py-2 text-right font-semibold">Word class</th>
            </tr>
          </thead>
          <tbody>
            {FORMAT_FIRST_SEEN.map((row) => (
              <tr key={row.era} className="border-b">
                <td className="py-2 pr-4">{row.era}</td>
                <td className="py-2 pr-4 text-right tabular-nums text-muted-foreground">
                  {row.papers}
                </td>
                <td className="py-2 pr-4 text-right tabular-nums">{row.transformation}</td>
                <td className="py-2 text-right tabular-nums">{row.wordClass}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-2 text-xs text-muted-foreground">
          Counted from the wording of the questions themselves, not from how we filed them.
        </p>
      </div>

      <P>
        They turn up first in {TRANSFORMATION_DEBUT.firstYear}, and since then they have appeared
        in every one of the {TRANSFORMATION_DEBUT.sittingsWithSomeSince2025} papers written. This
        one also asked you to name the word class of an underlined word — noun, adverb, conjunction
        — five times.
      </P>
      <P>
        This is exactly the kind of shift that old material misses. If your notes or your question
        bank are more than two years old, they were written for a paper that never asked this. The
        fix is small: the transformation rules are a closed set, you can learn them in a weekend,
        and they are now worth roughly {marksFor(3)}&ndash;{marksFor(4)} marks a paper.
      </P>

      <H2>History and Polity are now level pegging</H2>
      <P>
        For nine years, History was the bigger of the two. Not usually bigger —{" "}
        <strong>
          bigger in all {HISTORY_POLITY_CROSSOVER.historyAheadBefore2026} of the{" "}
          {HISTORY_POLITY_CROSSOVER.sittingsBefore2026} sittings
        </strong>{" "}
        from {BASELINE.fromYear} to 2025. Polity did not beat it once.
      </P>
      <P>
        In 2026 they tied. In both papers.
      </P>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[24rem] border-collapse text-sm">
          <caption className="sr-only">History and Polity questions per paper, by period</caption>
          <thead>
            <tr className="border-b text-left">
              <th scope="col" className="py-2 pr-4 font-semibold">Period</th>
              <th scope="col" className="py-2 pr-4 text-right font-semibold">Papers</th>
              <th scope="col" className="py-2 pr-4 text-right font-semibold">History</th>
              <th scope="col" className="py-2 text-right font-semibold">Polity</th>
            </tr>
          </thead>
          <tbody>
            {GK_DRIFT.map((row) => (
              <tr key={row.era} className="border-b">
                <td className="py-2 pr-4">{row.era}</td>
                <td className="py-2 pr-4 text-right tabular-nums text-muted-foreground">
                  {row.papers}
                </td>
                {/* toFixed so a whole number reads 16.0 beside 4.7, not 16. */}
                <td className="py-2 pr-4 text-right tabular-nums">
                  {row.historyPerPaper.toFixed(1)}
                </td>
                <td className="py-2 text-right tabular-nums">
                  {row.polityPerPaper.toFixed(1)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-2 text-xs text-muted-foreground">
          Questions per paper. 2020 has one paper, not two — NDA II 2020 was cancelled.
        </p>
      </div>

      <P>
        History has gone from 16 questions a paper to 9 or 10. Polity has doubled. If you are still
        giving History three times the hours you give Polity, you are preparing for the 2019 paper.
      </P>
      <P>
        One reason to trust this rather than take our word for it: NDA I 2026, held in April, was in
        our bank long before this September paper was. It shows the same tie, 10 and 10. So the
        change turns up in a paper we sorted months earlier, by a different route — it is not an
        artefact of how we handled this one.
      </P>

      <H2>What did not move — so do not over-correct</H2>
      <P>
        The rest of the GK half was remarkably steady, and that matters as much as the parts that
        shifted. Physics stayed the biggest GK subject at {
          SUBJECT_SPLIT.find((s) => s.subject === "Physics")!.count
        }, Geography at {SUBJECT_SPLIT.find((s) => s.subject === "Geography")!.count}, Chemistry at{" "}
        {SUBJECT_SPLIT.find((s) => s.subject === "Chemistry")!.count}, Biology at{" "}
        {SUBJECT_SPLIT.find((s) => s.subject === "Biology")!.count}. All of those are within a
        question or two of where they have sat for a decade. Nothing there needs rethinking.
      </P>
      <P>
        And Economics: <strong>one</strong> question. That is not unusual — across all{" "}
        {BASELINE.papers} papers it has never once crossed {ECONOMICS_RANGE.max}. Four marks. If a
        teacher or a book has you spending a week on it, that week is better spent on vocabulary.
      </P>

      <H2>Which subjects bit hardest</H2>
      <P>
        This is our reading of the paper rather than any official rating, so treat it as a guide and
        not a verdict. {hardest.subject} was the roughest block — {hardest.hard} of its{" "}
        {hardest.count} questions were hard ones and{" "}
        {hardest.easy === 0 ? "not a single one was easy" : `only ${hardest.easy} were easy`}.{" "}
        {secondHardest.subject} came next by share, though on only {secondHardest.count} questions,
        so do not read too much into it. {mostHardQuestions.subject} threw up the most hard
        questions outright — {mostHardQuestions.hard} of them. Biology was the kindest subject in
        the paper: no hard questions at all, and four easy ones out of ten.
      </P>
      <P>
        The Current Affairs result is the familiar lesson. It is the one subject that punishes
        last-minute cramming, because you cannot revise something you never read in the first place.
        Fifteen minutes a day for a year beats a fortnight of panic.
      </P>

      <div className="mt-6 flex gap-3 rounded-lg border border-sky-500/40 bg-sky-500/5 p-4">
        <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" aria-hidden />
        <div className="font-serif text-sm leading-relaxed">
          <p className="font-sans font-semibold">Worth knowing before you sit it: when to guess</p>
          <p className="mt-1">
            GAT gives +{PAPER.markPerQuestion} for a right answer and takes {PAPER.penaltyPerWrong}{" "}
            for a wrong one. Guess blindly between all four options and you gain 4 marks a quarter of
            the time and lose 1.33 the other three quarters — which comes to almost exactly zero. A
            blind guess neither helps nor hurts you. But <strong>rule out even one option</strong>{" "}
            and the odds move to one in three, and the same sum now comes out clearly positive. So:
            do not guess at random, and do not leave a question blank once you have eliminated
            something. That single habit is worth marks over 150 questions.
          </p>
        </div>
      </div>

      <H2>What to drill before NDA I 2027</H2>
      <ol className="mt-4 space-y-4 font-serif text-base sm:text-lg">
        <li>
          <strong>Your English word stock.</strong> Vocabulary and idioms alone were{" "}
          {englishQuestionsIn(["Vocabulary", "Idioms and Phrases"])} questions here. Finite, and it
          rewards daily repetition more than cleverness.{" "}
          <Link
            className="text-brand-accent underline underline-offset-4"
            href="/questions/nda/english/vocabulary"
          >
            Vocabulary PYQs
          </Link>{" "}
          ·{" "}
          <Link
            className="text-brand-accent underline underline-offset-4"
            href="/questions/nda/english/idioms-and-phrases"
          >
            Idioms PYQs
          </Link>
        </li>
        <li>
          <strong>Transformation grammar.</strong> Active and passive voice, direct and indirect
          speech, word classes. New since {TRANSFORMATION_DEBUT.firstYear}, small, and most older
          material skips it.{" "}
          <Link
            className="text-brand-accent underline underline-offset-4"
            href="/questions/nda/english/grammar"
          >
            Grammar PYQs
          </Link>{" "}
          ·{" "}
          <Link className="text-brand-accent underline underline-offset-4" href="/guide/nda-english">
            English strategy guide
          </Link>
        </li>
        <li>
          <strong>Polity, at the same level as History.</strong> Not more than History — the same.
          That is already a big change from how most timetables are built.{" "}
          <Link className="text-brand-accent underline underline-offset-4" href="/guide/nda-polity">
            Polity guide
          </Link>{" "}
          ·{" "}
          <Link className="text-brand-accent underline underline-offset-4" href="/guide/nda-history">
            History guide
          </Link>
        </li>
        <li>
          <strong>Physics and Geography.</strong> Together they were{" "}
          {SUBJECT_SPLIT.find((s) => s.subject === "Physics")!.count +
            SUBJECT_SPLIT.find((s) => s.subject === "Geography")!.count}{" "}
          questions — the largest GK block, and steady for ten years.{" "}
          <Link className="text-brand-accent underline underline-offset-4" href="/notes/nda-physics">
            Physics notes
          </Link>{" "}
          ·{" "}
          <Link className="text-brand-accent underline underline-offset-4" href="/notes/nda-geography">
            Geography notes
          </Link>
        </li>
        <li>
          <strong>Leave Economics alone.</strong> One question. Read a page, move on.
        </li>
      </ol>

      <H2>Sit the paper yourself</H2>
      <P>
        Reading about a paper is not the same as facing {PAPER.questions} questions with the clock
        running. The whole thing is on PYQ Vault as a timed mock — the real questions, a{" "}
        {PAPER.minutes}-minute timer, and the actual marking, so you find out what your pace and
        your guessing habits really cost you.
      </P>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href={`/mock/${PAPER.mockSlug}`}
          className="inline-flex items-center gap-2 rounded-md bg-brand px-4 py-2 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Timer className="h-4 w-4" aria-hidden />
          Take {PAPER.label} GAT as a timed mock
        </Link>
        <Link
          href="/blog/nda-2-2026-maths-paper-analysis"
          className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          The Maths paper, analysed
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>

      <p className="mt-10 border-t pt-6 text-xs leading-relaxed text-muted-foreground">
        Method: subject and topic counts come from PYQ Vault&rsquo;s NDA GAT corpus —{" "}
        {BASELINE.papers} sittings, {BASELINE.questions.toLocaleString("en-IN")} questions,{" "}
        {BASELINE.fromYear}&ndash;{BASELINE.toYear} — and are re-checked against the live bank by an
        automated test. The voice-and-speech counts are taken from the wording of the questions
        themselves rather than from our own topic labels, so that figure does not depend on how we
        filed anything. Difficulty is our own reading of this one paper and is not an official
        rating.
      </p>
    </div>
  );
}
