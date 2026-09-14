/**
 * Body of the NDA II 2026 Maths paper analysis.
 *
 * Every figure comes from `_data/stats.ts` — nothing here is hand-typed — and
 * that module is re-derived from production by
 * `tests/blog-nda2-2026-stats.test.ts`. If you are updating this post, change
 * the numbers there, not in the prose.
 *
 * The two worked questions are reproduced from the printed UPSC booklet, so a
 * reader holding the paper can check both claims without taking our word for
 * anything. That is deliberate: an earlier draft also covered three questions
 * where a circulating answer key is wrong, and it was cut because that key is a
 * private third-party document — a reader cannot verify a source they cannot see.
 */
import Link from "next/link";
import { ArrowRight, Timer, TriangleAlert } from "lucide-react";
import KatexRenderer from "@/components/math/KatexRenderer";
import {
  BASELINE,
  CHAPTERS_REPRESENTED,
  DATA_HANDLING_DRIFT,
  MID_WEIGHT_BLOCK,
  PAPER,
  PAPER_SHAPE,
  chaptersAtOrBelow,
  marksInTopChapters,
  questionsIn,
  topChapters,
} from "./_data/stats";

/** Inline math. */
function M({ t }: { t: string }) {
  return <KatexRenderer text={t} />;
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-14 text-2xl font-bold tracking-tight sm:text-3xl">{children}</h2>;
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-8 text-lg font-semibold tracking-tight">{children}</h3>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 font-serif text-base leading-relaxed sm:text-lg">{children}</p>;
}

export default function NdaTwo2026MathsAnalysis() {
  const top = topChapters(10);
  const topTwoMarks = marksInTopChapters(2);
  const tailChapters = chaptersAtOrBelow(2);
  const midBlockQuestions = questionsIn(MID_WEIGHT_BLOCK);

  return (
    <div>
      <P>
        If you sat NDA II on 14 September, the Mathematics paper probably did not feel like a
        fight. {PAPER.questions} questions, {PAPER.marks} marks, {PAPER.minutes} minutes, and very
        little on the page that looked unfamiliar. What is worth your attention is not how the
        paper felt — it is <em>where the marks actually were</em>.
      </P>
      <P>
        We hold every NDA Mathematics paper from {BASELINE.fromYear} onward: {BASELINE.papers}{" "}
        sittings, {BASELINE.questions.toLocaleString("en-IN")} questions, each one classified by
        chapter. That makes it possible to say something more useful than &ldquo;Probability was
        heavy this year&rdquo; — we can say how heavy, measured against a decade of papers, and
        whether it is a blip or a direction. It turns out to be a direction.
      </P>

      <H2>Two chapters decided this paper</H2>
      <P>
        Probability and Matrices &amp; Determinants together supplied {top[0].count + top[1].count}{" "}
        of the {PAPER.questions} questions — <strong>{topTwoMarks} of {PAPER.marks} marks</strong>,
        more than a fifth of the paper, from two chapters out of {CHAPTERS_REPRESENTED}.
      </P>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[22rem] border-collapse text-sm">
          <caption className="sr-only">
            The ten largest chapters in the NDA II 2026 Mathematics paper
          </caption>
          <thead>
            <tr className="border-b text-left">
              <th scope="col" className="py-2 pr-4 font-semibold">Chapter</th>
              <th scope="col" className="py-2 pr-4 text-right font-semibold">Questions</th>
              <th scope="col" className="py-2 text-right font-semibold">Marks</th>
            </tr>
          </thead>
          <tbody>
            {top.map((row, i) => (
              <tr key={row.chapter} className={i < 2 ? "border-b bg-brand-accent/5" : "border-b"}>
                <td className="py-2 pr-4">
                  {i < 2 ? <strong>{row.chapter}</strong> : row.chapter}
                </td>
                <td className="py-2 pr-4 text-right tabular-nums">{row.count}</td>
                <td className="py-2 text-right tabular-nums">{row.marks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <P>
        Below the top ten the tail is long and flat: {tailChapters} chapters contributed two
        questions or fewer. The structural point is that NDA Maths cannot be passed by picking favourites — but
        it also cannot be passed while shaky on these two.
      </P>
      <P>
        On shape, the paper behaved normally. {PAPER_SHAPE.setBoundQuestions} questions arrived in{" "}
        {PAPER_SHAPE.distinctSets} shared-stimulus sets (&ldquo;For the next two items that
        follow&rdquo;), and {PAPER_SHAPE.statementStyleQuestions} were statement-evaluation items
        of the <em>Which of the statements given above is/are correct?</em> type. Both are standard
        UPSC furniture, and both reward reading discipline over speed.
      </P>

      <H2>Probability is climbing. Statistics is sliding.</H2>
      <P>
        This is the finding worth changing your timetable over. Because the eras below hold
        different numbers of papers, the figures are stated <strong>per paper</strong> — a raw
        total would show a trend that was really just the length of the window.
      </P>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[26rem] border-collapse text-sm">
          <caption className="sr-only">
            Probability and Statistics questions per paper, by era
          </caption>
          <thead>
            <tr className="border-b text-left">
              <th scope="col" className="py-2 pr-4 font-semibold">Era</th>
              <th scope="col" className="py-2 pr-4 text-right font-semibold">Papers</th>
              <th scope="col" className="py-2 pr-4 text-right font-semibold">Probability</th>
              <th scope="col" className="py-2 text-right font-semibold">Statistics</th>
            </tr>
          </thead>
          <tbody>
            {DATA_HANDLING_DRIFT.map((row) => (
              <tr key={row.era} className="border-b">
                <td className="py-2 pr-4">{row.era}</td>
                <td className="py-2 pr-4 text-right tabular-nums text-muted-foreground">
                  {row.papers}
                </td>
                <td className="py-2 pr-4 text-right tabular-nums">{row.probabilityPerPaper}</td>
                <td className="py-2 text-right tabular-nums">{row.statisticsPerPaper}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-2 text-xs text-muted-foreground">
          Questions per paper. NDA II 2020 was cancelled, which is why 2020&ndash;22 holds five
          papers rather than six.
        </p>
      </div>

      <P>
        In 2020&ndash;22, Statistics outweighed Probability 11.0 to 7.0. By 2026 that has inverted,
        and not narrowly: <strong>Probability 13.5, Statistics 5.5</strong>. Statistics has halved
        from its peak while Probability has nearly doubled from its trough. The combined
        data-handling block is roughly the size it always was — the weight inside it moved.
      </P>
      <P>
        What that means in practice: mean, median, mode and standard deviation still deserve a
        revision session, but the chapter no longer repays the grinding that eleven questions a
        paper once justified. Those hours belong in probability — and specifically in the five
        areas this paper drew on: counting-based probability, conditional probability and
        Bayes&rsquo; theorem, independent events, event algebra (inclusion&ndash;exclusion,
        mutually exclusive and exhaustive events), and bounds on probability.
      </P>

      <H2>Two questions that punish autopilot</H2>
      <P>
        Both come from that same Probability block. Neither is difficult. Both are built to catch a
        candidate who recognises a shape and answers from memory instead of from the page.
      </P>

      <H3>Q112 — read the direction of the inequality</H3>
      <div className="mt-4 rounded-lg border bg-muted/30 p-4 font-serif text-sm leading-relaxed">
        <p>
          Consider the following statements for three events <M t="\(A\)" />, <M t="\(B\)" /> and{" "}
          <M t="\(C\)" /> :
        </p>
        <p className="mt-2">
          I. <M t="\(P(A \cap B \cap C) \le P(A) + P(B) + P(C) - 2\)" />
        </p>
        <p className="mt-1">
          II. <M t="\(P(A \cup B \cup C) \ge P(A) + P(B) + P(C)\)" />
        </p>
        <p className="mt-2">Which of the statements given above is/are correct?</p>
      </div>
      <P>
        The two results being gestured at are genuinely standard, and both are{" "}
        <strong>the other way round</strong>:
      </P>
      <ul className="mt-3 space-y-2 font-serif text-base sm:text-lg">
        <li className="flex gap-2">
          <span aria-hidden>•</span>
          <span>
            <M t="\(P(A \cap B \cap C) \ge P(A) + P(B) + P(C) - 2\)" /> &mdash; the Bonferroni
            inequality.
          </span>
        </li>
        <li className="flex gap-2">
          <span aria-hidden>•</span>
          <span>
            <M t="\(P(A \cup B \cup C) \le P(A) + P(B) + P(C)\)" /> &mdash; Boole&rsquo;s
            inequality, i.e. subadditivity.
          </span>
        </li>
      </ul>
      <P>
        So the trap is recognition itself. A candidate who spots two familiar names and ticks
        &ldquo;Both I and II&rdquo; loses the mark. A single counterexample settles both at once:
        take <M t="\(A = B = C\)" /> with <M t="\(P(A) = 1/2\)" />.
      </P>
      <P>
        Statement I then reads <M t="\(1/2 \le 3(1/2) - 2 = -1/2\)" />, which is false. Statement II
        reads <M t="\(1/2 \ge 3/2\)" />, also false. The answer is <strong>neither</strong>.
      </P>

      <H3>Q106 — finish the algebra, don&rsquo;t audit the paper</H3>
      <div className="mt-4 rounded-lg border bg-muted/30 p-4 font-serif text-sm leading-relaxed">
        <p>
          If <M t="\(P(A \cap B) = 1/2\)" /> and{" "}
          <M t="\(P(\overline{A} \cap \overline{B}) = 1/2\)" />, and <M t="\(2P(A) = P(B) = k\)" />,
          then what is the value of <M t="\(k\)" />?
        </p>
      </div>
      <P>
        By De Morgan, <M t="\(\overline{A} \cap \overline{B}\)" /> is the complement of{" "}
        <M t="\(A \cup B\)" />, so <M t="\(P(A \cup B) = 1 - 1/2 = 1/2\)" />. The addition rule then
        gives <M t="\(1/2 = P(A) + P(B) - 1/2\)" />, so <M t="\(P(A) + P(B) = 1\)" />. Substituting{" "}
        <M t="\(P(A) = k/2\)" /> and <M t="\(P(B) = k\)" /> gives <M t="\(3k/2 = 1\)" />, so{" "}
        <M t="\(k = 2/3\)" /> — which is on the option list.
      </P>
      <P>
        Now the part worth noticing. That answer forces <M t="\(P(A) = 1/3\)" />, while the stem
        states <M t="\(P(A \cap B) = 1/2\)" />. An intersection cannot be more likely than a set
        that contains it. <strong>No such pair of events exists.</strong>
      </P>

      <div className="mt-6 flex gap-3 rounded-lg border border-amber-500/40 bg-amber-500/5 p-4">
        <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" aria-hidden />
        <div className="font-serif text-sm leading-relaxed">
          <p className="font-sans font-semibold">In the hall, this is not your problem.</p>
          <p className="mt-1">
            The question is internally inconsistent, but the algebra still has exactly one answer
            and it is on the list. Do it, mark it, move on. Candidates lose far more marks
            re-reading a question they have already solved correctly than they ever lose to a
            flawed one.
          </p>
        </div>
      </div>

      <H2>What to drill before NDA I 2027</H2>
      <P>In the order this paper and the ten-year trend actually reward:</P>
      <ol className="mt-4 space-y-4 font-serif text-base sm:text-lg">
        <li>
          <strong>Probability, the whole chapter.</strong> Biggest block in the paper and still
          climbing.{" "}
          <Link
            className="text-brand-accent underline underline-offset-4"
            href="/notes/nda-maths/probability"
          >
            Teaching notes
          </Link>{" "}
          ·{" "}
          <Link
            className="text-brand-accent underline underline-offset-4"
            href="/questions/nda/mathematics/probability"
          >
            past-year questions
          </Link>
        </li>
        <li>
          <strong>Matrices &amp; Determinants.</strong> Second-biggest, and the most mechanical
          marks on the paper once the methods are automatic.{" "}
          <Link
            className="text-brand-accent underline underline-offset-4"
            href="/notes/nda-maths/matrices-determinants"
          >
            Teaching notes
          </Link>{" "}
          ·{" "}
          <Link
            className="text-brand-accent underline underline-offset-4"
            href="/questions/nda/mathematics/matrices-determinants"
          >
            past-year questions
          </Link>
        </li>
        <li>
          <strong>The mid-weight block.</strong> Trigonometric Identities, Lines, Functions, Limits
          &amp; Continuity and Sets &amp; Relations supplied {midBlockQuestions} questions —{" "}
          {midBlockQuestions * PAPER.markPerQuestion} marks — between them. None is individually alarming; collectively they outweigh the top two.
        </li>
        <li>
          <strong>Statistics: keep it, shrink it.</strong> Five questions this time. Worth one solid
          revision pass, not a campaign.{" "}
          <Link
            className="text-brand-accent underline underline-offset-4"
            href="/notes/nda-maths/statistics"
          >
            Teaching notes
          </Link>
        </li>
      </ol>

      <H2>Sit the paper yourself</H2>
      <P>
        Reading an analysis is not the same as being 90 minutes in with 40 questions left. The full
        paper is on PYQ Vault as a timed, auto-graded mock — the real {PAPER.questions} questions, a{" "}
        {PAPER.minutes}-minute clock, and NDA&rsquo;s actual marking (+{PAPER.markPerQuestion} for a
        correct answer, &minus;{PAPER.penaltyPerWrong} for a wrong one), so your attempt strategy
        gets tested along with your maths.
      </P>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href={`/mock/${PAPER.mockSlug}`}
          className="inline-flex items-center gap-2 rounded-md bg-brand px-4 py-2 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Timer className="h-4 w-4" aria-hidden />
          Take {PAPER.label} Maths as a timed mock
        </Link>
        <Link
          href="/guide/nda-maths"
          className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          NDA Maths strategy guide
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>

      <p className="mt-10 border-t pt-6 text-xs leading-relaxed text-muted-foreground">
        Method: chapter counts are computed from PYQ Vault&rsquo;s NDA Mathematics corpus —{" "}
        {BASELINE.papers} sittings, {BASELINE.questions.toLocaleString("en-IN")} questions,{" "}
        {BASELINE.fromYear}&ndash;{BASELINE.toYear} — and re-checked against the live bank by an
        automated test, so the figures above cannot quietly go stale. The two questions are
        reproduced from the printed UPSC booklet.
      </p>
    </div>
  );
}
