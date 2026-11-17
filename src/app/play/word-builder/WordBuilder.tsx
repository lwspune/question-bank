"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Check, RotateCcw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import KatexRenderer from "@/components/math/KatexRenderer";
import BlockText from "@/components/math/BlockText";
import { useLocalStore, readLocal, writeLocal } from "@/components/play/useLocalStore";
import { useWordFile, WORDS_URL } from "@/components/play/useWordFile";
import { trackFunnel } from "@/lib/analytics/trackFunnel";
import { sendActivity } from "@/lib/activity/clientBeacon";
import { useViewerSession } from "@/lib/viewer/useViewerSession";
import type { WordEntry, WordKind } from "@/lib/play/words/extract";
import {
  BUILDER_KEY,
  GROUP_CHOICES,
  MASTERY_DAYS,
  addDays,
  answerInRound,
  dueCount,
  isDue,
  isMastered,
  istDay,
  parseBuilder,
  pickRound,
  recordAnswer,
  serializeBuilder,
  startRound,
  weekdayName,
  wordStatus,
  type BuilderProgress,
  type GroupChoice,
  type RoundState,
  type WordState,
  type WordStatus,
} from "@/lib/play/words/builder";

/**
 * Word Builder (2026-11-17): rounds of 10 real past-paper synonym and antonym
 * questions. A missed word comes back at the end of the round and the next
 * day; a word is mastered once it is right on 3 different days
 * (lib/play/words/builder). Game only: nothing here counts as bank practice.
 */

const GROUP_LABEL: Record<GroupChoice, string> = { all: "All", ssc: "SSC", nda: "NDA", cds: "CDS" };
const ASK: Record<WordKind, string> = {
  synonym: "Pick the word closest in meaning to",
  antonym: "Pick the word opposite in meaning to",
};
const LETTERS = ["A", "B", "C", "D", "E"];
const STATUS_STYLE: Record<WordStatus, string> = {
  New: "bg-sky-100 text-sky-900 dark:bg-sky-950 dark:text-sky-200",
  Learning: "bg-orange-100 text-orange-900 dark:bg-orange-950 dark:text-orange-200",
  Mastered: "bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200",
};

function load(): BuilderProgress {
  return parseBuilder(readLocal(BUILDER_KEY));
}
function save(p: BuilderProgress) {
  writeLocal(BUILDER_KEY, serializeBuilder(p));
}

/** "tomorrow" or "on Thursday". */
function when(due: string, today: string): string {
  return due === addDays(today, 1) ? "tomorrow" : `on ${weekdayName(due)}`;
}

function source(e: WordEntry): string {
  return [`Asked in ${e.exam}${e.year ? ` ${e.year}` : ""}`, e.note].filter(Boolean).join(" · ");
}

type Feedback = { picked: number; correct: boolean; firstTimeInRound: boolean; after: WordState; counted: boolean };
type Done = { words: string[]; firstTry: Record<string, boolean>; newlyMastered: number };

export default function WordBuilder() {
  const file = useWordFile(WORDS_URL);
  const raw = useLocalStore(BUILDER_KEY);
  const progress = useMemo(() => parseBuilder(raw ?? null), [raw]);
  const { session } = useViewerSession();

  const [view, setView] = useState<"menu" | "playing" | "done">("menu");
  const [today, setToday] = useState("");
  const [round, setRound] = useState<RoundState | null>(null);
  const [byWord, setByWord] = useState<Record<string, WordEntry>>({});
  const [roundWords, setRoundWords] = useState<string[]>([]);
  const [masteredBefore, setMasteredBefore] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [done, setDone] = useState<Done | null>(null);

  const group = progress.group;
  const pool = useMemo(
    () => (file.status === "ready" ? file.words.filter((w) => group === "all" || w.group === group) : []),
    [file, group]
  );

  const setGroup = (g: GroupChoice) => save({ ...load(), group: g });

  const begin = () => {
    const day = istDay(new Date());
    const p = load();
    const picked = pickRound(pool, p, day, Math.random);
    if (picked.length === 0) return;
    setToday(day);
    setByWord(Object.fromEntries(picked.map((e) => [e.word, e])));
    setRoundWords(picked.map((e) => e.word));
    setMasteredBefore(picked.filter((e) => p.words[e.word] && isMastered(p.words[e.word])).map((e) => e.word));
    setRound(startRound(picked.map((e) => e.word)));
    setFeedback(null);
    setDone(null);
    setView("playing");
    window.scrollTo({ top: 0 });
  };

  const current = round?.queue[0];
  const entry = current ? byWord[current] : undefined;

  const pick = (i: number) => {
    if (!entry || !round || feedback) return;
    const correct = i === entry.answer;
    const r = recordAnswer(load(), entry.word, correct, today);
    if (r.counted) save(r.progress);
    setFeedback({
      picked: i,
      correct,
      firstTimeInRound: !(entry.word in round.firstTry),
      after: r.progress.words[entry.word],
      counted: r.counted,
    });
  };

  const next = () => {
    if (!round || !feedback) return;
    const r = answerInRound(round, feedback.correct);
    setFeedback(null);
    if (r.queue.length > 0) {
      setRound(r);
      window.scrollTo({ top: 0 });
      return;
    }
    const final = load();
    const newlyMastered = roundWords.filter(
      (w) => final.words[w] && isMastered(final.words[w]) && !masteredBefore.includes(w)
    ).length;
    const firstTry = r.firstTry;
    const correct = Object.values(firstTry).filter(Boolean).length;
    const wrong = Object.values(firstTry).length - correct;
    setRound(null);
    setDone({ words: roundWords, firstTry, newlyMastered });
    setView("done");
    window.scrollTo({ top: 0 });
    trackFunnel("word_game_end", { game: "word_builder", correct, wrong, signedIn: !!session });
    if (session) sendActivity({ kind: "play_round", game: "word_builder", correct, wrong, mastered: newlyMastered });
  };

  if (view === "playing" && entry && round) {
    const again = entry.word in round.firstTry;
    const finished = Object.keys(round.firstTry).length;
    const number = Math.min(finished + (again ? 0 : 1), roundWords.length);
    const state = progress.words[entry.word];
    const chip = again ? "Back again" : !state ? "New word" : `${wordStatus(state, today)} word`;
    return (
      <div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Word {number} of {roundWords.length}
          </span>
          <button
            type="button"
            className="rounded px-2 py-1 font-medium hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => setView("menu")}
          >
            End round
          </button>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted" aria-hidden>
          <div className="h-full bg-brand transition-[width]" style={{ width: `${(finished / roundWords.length) * 100}%` }} />
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
          <span className="rounded-full bg-brand/10 px-2.5 py-1 text-brand-accent">
            {entry.exam} · {entry.kind === "synonym" ? "Synonym" : "Antonym"}
          </span>
          <span className="rounded-full border px-2.5 py-1 text-muted-foreground">{chip}</span>
        </div>

        <div className="mt-3 rounded-2xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">{ASK[entry.kind]}</p>
          <p className="mt-1 break-words font-serif text-3xl font-bold uppercase tracking-wide sm:text-4xl">{entry.word}</p>
          {entry.sentence && <KatexRenderer text={entry.sentence} className="mt-3 block font-serif text-base leading-relaxed" />}
          <p className="mt-3 text-xs text-muted-foreground">{source(entry)}</p>
        </div>

        <div className="mt-4 space-y-2.5" role="group" aria-label="Options">
          {entry.options.map((opt, i) => {
            const isAnswer = i === entry.answer;
            const isPicked = feedback?.picked === i;
            const tone = !feedback
              ? "border-input bg-card hover:border-brand-accent/50"
              : isAnswer
                ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40"
                : isPicked
                  ? "border-red-600 bg-red-50 dark:bg-red-950/40"
                  : "border-input bg-card opacity-70";
            return (
              <button
                key={i}
                type="button"
                disabled={!!feedback}
                onClick={() => pick(i)}
                className={`flex min-h-[3.25rem] w-full items-center gap-3 rounded-xl border-2 px-4 py-2 text-left font-serif text-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${tone}`}
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-muted font-sans text-sm font-semibold">{LETTERS[i]}</span>
                <KatexRenderer text={opt} className="flex-1" />
                {feedback && isAnswer && (
                  <span className="flex items-center gap-1 font-sans text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                    <Check className="h-4 w-4" aria-hidden /> Correct
                  </span>
                )}
                {feedback && isPicked && !isAnswer && (
                  <span className="flex items-center gap-1 font-sans text-sm font-semibold text-red-800 dark:text-red-300">
                    <X className="h-4 w-4" aria-hidden /> Your answer
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {!feedback && (
          <div className="mt-4 flex items-center justify-between gap-3">
            <span className="text-sm text-muted-foreground">Words you miss come back later in this round.</span>
            <Button variant="outline" onClick={() => pick(-1)}>
              I don&apos;t know
            </Button>
          </div>
        )}

        {feedback && (
          <div className="mt-4 space-y-3" aria-live="polite">
            <div className="rounded-2xl border bg-card p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Why</p>
              <BlockText text={entry.solution} solution className="mt-2 block font-serif leading-relaxed" />
            </div>
            <p className="flex items-start gap-2 rounded-xl border border-brand/30 bg-brand/5 p-3 text-sm">
              <RotateCcw className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
              <span>{feedbackLine(feedback, today)}</span>
            </p>
            <Button
              ref={(el) => el?.focus({ preventScroll: true })}
              className="h-12 w-full text-base"
              onClick={next}
            >
              {round.queue.length === 1 && feedback.correct ? "See the round" : "Next word"}
            </Button>
          </div>
        )}
      </div>
    );
  }

  if (view === "done" && done) {
    const right = Object.values(done.firstTry).filter(Boolean).length;
    const fresh = done.words.filter((w) => progress.words[w]?.first === today).length;
    const nextDue = dueCount(progress, addDays(today, 1));
    return (
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Round done</h1>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          {right} of {done.words.length} right first time.
          {fresh > 0 && ` ${fresh} new ${fresh === 1 ? "word" : "words"} started.`}
          {done.newlyMastered > 0 && ` ${done.newlyMastered} mastered.`}
        </p>
        <ul className="mt-4 divide-y rounded-2xl border bg-card">
          {done.words.map((w) => {
            const s = progress.words[w];
            if (!s) return null;
            const status = wordStatus(s, today);
            return (
              <li key={w} className="flex items-center gap-3 px-4 py-3">
                <span className="min-w-0 flex-1">
                  <span className="block font-serif font-bold uppercase tracking-wide">{w}</span>
                  <span className="block truncate text-sm text-muted-foreground">
                    {byWord[w] ? byWord[w].options[byWord[w].answer] : ""}
                  </span>
                </span>
                <span className="flex flex-col items-end gap-1.5">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${STATUS_STYLE[status]}`}>{status}</span>
                  <span className="flex gap-1" role="img" aria-label={`Right on ${s.right.length} of ${MASTERY_DAYS} days`}>
                    {Array.from({ length: MASTERY_DAYS }, (_, k) => (
                      <span key={k} className={`h-1.5 w-4 rounded-full ${k < s.right.length ? "bg-brand" : "bg-muted"}`} />
                    ))}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
        <p className="mt-3 text-sm text-muted-foreground">
          A word is mastered when you get it right on {MASTERY_DAYS} different days.
          {nextDue > 0 && ` Tomorrow ${nextDue} ${nextDue === 1 ? "word is" : "words are"} due.`}
        </p>
        <div className="mt-5 grid gap-2.5">
          <Button className="h-12 text-base" onClick={() => setView("menu")}>
            Back to Word Builder
          </Button>
          <Button asChild variant="outline" className="h-12 text-base">
            <Link href="/play">All games</Link>
          </Button>
        </div>
      </div>
    );
  }

  // The menu.
  const states = Object.values(progress.words);
  const loadedProgress = raw !== undefined;
  const dayNow = loadedProgress ? istDay(new Date()) : "";
  const due = loadedProgress ? pool.filter((e) => progress.words[e.word] && isDue(progress.words[e.word], dayNow)).length : 0;
  const fresh = pool.filter((e) => !progress.words[e.word]).length;
  const mastered = states.filter(isMastered).length;
  const learning = states.length - mastered;

  return (
    <div>
      <header className="hero-soft rounded-2xl px-5 py-6 text-center">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Word Builder</h1>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Real synonym and antonym questions from past papers. A word you miss comes back until you have it right on{" "}
          {MASTERY_DAYS} different days.
        </p>
      </header>

      <fieldset className="mt-5">
        <legend className="text-sm font-semibold">Words from</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {GROUP_CHOICES.map((g) => (
            <button
              key={g}
              type="button"
              aria-pressed={group === g}
              onClick={() => setGroup(g)}
              className={`h-10 rounded-full border px-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                group === g ? "border-brand bg-brand text-brand-foreground" : "bg-card hover:border-brand-accent/50"
              }`}
            >
              {GROUP_LABEL[g]}
            </button>
          ))}
        </div>
      </fieldset>

      <dl className="mt-5 grid grid-cols-3 gap-2 text-center">
        {[
          ["Due now", due],
          ["Learning", learning],
          ["Mastered", mastered],
        ].map(([k, v]) => (
          <div key={k} className="rounded-xl border bg-card px-2 py-3">
            <dt className="text-xs text-muted-foreground">{k}</dt>
            <dd className="mt-0.5 min-h-[1.75rem] text-xl font-bold">{loadedProgress ? v : ""}</dd>
          </div>
        ))}
      </dl>

      {file.status === "error" && (
        <p className="mt-5 rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-900 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
          The words did not load. Check your connection and reload the page.
        </p>
      )}

      <Button className="mt-5 h-12 w-full text-base" onClick={begin} disabled={file.status !== "ready" || due + fresh === 0}>
        {file.status === "loading" ? "Loading words…" : "Start a round"}
        {file.status === "ready" && <ArrowRight className="ml-1 h-4 w-4" aria-hidden />}
      </Button>
      {file.status === "ready" && (
        <p className="mt-2 text-center text-sm text-muted-foreground">
          {due + fresh === 0
            ? "Nothing due right now. Come back tomorrow, or pick another set of words."
            : `${Math.min(due, 10)} due ${Math.min(due, 10) === 1 ? "word" : "words"} first, then new ones. ${pool.length} words in this set.`}
        </p>
      )}
    </div>
  );
}

function feedbackLine(f: Feedback, today: string): string {
  const s = f.after;
  if (f.correct) {
    if (!f.counted) return s.due ? `Right. It still comes back ${when(s.due, today)}.` : "Right.";
    if (isMastered(s)) return `Mastered: right on ${MASTERY_DAYS} different days.`;
    return `Right on ${s.right.length} of ${MASTERY_DAYS} days. It comes back ${s.due ? when(s.due, today) : "later"}.`;
  }
  const again = s.due ? when(s.due, today) : "tomorrow";
  return f.firstTimeInRound
    ? `This word comes back at the end of this round, and again ${again}.`
    : `It comes back ${again}.`;
}
