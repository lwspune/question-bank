"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Check, Delete, Lightbulb, Share2, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import KatexRenderer from "@/components/math/KatexRenderer";
import BlockText from "@/components/math/BlockText";
import { useLocalStore, readLocal, writeLocal } from "@/components/play/useLocalStore";
import { useWordFile, DAILY_WORDS_URL } from "@/components/play/useWordFile";
import { trackFunnel } from "@/lib/analytics/trackFunnel";
import { sendActivity } from "@/lib/activity/clientBeacon";
import { useViewerSession } from "@/lib/viewer/useViewerSession";
import { BUILDER_KEY, istDay, parseBuilder, recordAnswer, serializeBuilder } from "@/lib/play/words/builder";
import {
  CLUE_AFTER,
  DAILY_KEY,
  clueFor,
  MAX_GUESSES,
  dailyWord,
  dayState,
  keyMarks,
  parseDaily,
  recordGuess,
  scoreGuess,
  serializeDaily,
  shareText,
  shortDate,
  type Mark,
} from "@/lib/play/words/daily";

/**
 * Daily Word (2026-11-17): one past-paper word a day, the same for everyone
 * (lib/play/words/daily), 6 tries, a clue after 2. Once it ends, the student
 * answers the real exam question and the word joins their Word Builder list.
 * No streak, on purpose. Game only.
 */

const TILE: Record<Mark, string> = {
  b: "bg-blue-700 text-white border-blue-700",
  o: "bg-orange-700 text-white border-orange-700",
  g: "bg-slate-500 text-white border-slate-500",
};
const MARK_WORD: Record<Mark, string> = { b: "right place", o: "in the word, wrong place", g: "not in the word" };
const ROWS = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
const LETTERS = ["A", "B", "C", "D", "E"];

export default function DailyWord() {
  const file = useWordFile(DAILY_WORDS_URL);
  const raw = useLocalStore(DAILY_KEY);
  const progress = useMemo(() => parseDaily(raw ?? null), [raw]);
  const { session } = useViewerSession();
  const [typed, setTyped] = useState("");
  const [message, setMessage] = useState("");
  const [examPick, setExamPick] = useState<number | null>(null);

  // The file only loads in the browser, so the day is read there: the cached HTML is the same for everyone.
  const today = useMemo(() => (file.status === "ready" ? istDay(new Date()) : ""), [file.status]);
  const entry = useMemo(
    () => (file.status === "ready" && today ? dailyWord(file.words, today) : null),
    [file, today]
  );
  const state = entry ? dayState(progress, today) : { guesses: [], done: false, solved: false };
  const len = entry?.word.length ?? 5;
  const keys = entry ? keyMarks(state.guesses, entry.word) : {};
  const clue = entry ? clueFor(entry) : null;

  const submit = useCallback(() => {
    if (!entry || state.done) return;
    if (typed.length !== len) {
      setMessage(`The word has ${len} letters.`);
      return;
    }
    const r = recordGuess(parseDaily(readLocal(DAILY_KEY)), today, typed, entry.word);
    if (!r.ok) return;
    writeLocal(DAILY_KEY, serializeDaily(r.progress));
    setTyped("");
    const after = dayState(r.progress, today);
    const marks = scoreGuess(typed, entry.word);
    setMessage(
      after.solved
        ? `Solved in ${after.guesses.length}.`
        : `${typed.toUpperCase()}: ${marks.map((m, i) => `${typed[i].toUpperCase()} ${MARK_WORD[m]}`).join(", ")}.`
    );
    if (after.done) {
      trackFunnel("word_game_end", { game: "daily_word", solved: after.solved, guesses: after.guesses.length, signedIn: !!session });
      if (session) sendActivity({ kind: "play_round", game: "daily_word", solved: after.solved, guesses: after.guesses.length });
    }
  }, [entry, state.done, typed, len, today, session]);

  const press = useCallback(
    (key: string) => {
      if (!entry || state.done) return;
      if (key === "enter") return submit();
      if (key === "back") return setTyped((t) => t.slice(0, -1));
      if (/^[a-z]$/.test(key)) setTyped((t) => (t.length < len ? t + key : t));
    },
    [entry, state.done, submit, len]
  );

  // A physical keyboard types too, except while focus is in a text field.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      if (e.key === "Enter") {
        // Let a focused button handle its own Enter.
        if (t?.tagName === "BUTTON") return;
        e.preventDefault();
        press("enter");
      } else if (e.key === "Backspace") press("back");
      else if (/^[a-zA-Z]$/.test(e.key)) press(e.key.toLowerCase());
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [press]);

  const answerExam = (i: number) => {
    if (!entry || examPick !== null) return;
    setExamPick(i);
    const r = recordAnswer(parseBuilder(readLocal(BUILDER_KEY)), entry.word, i === entry.answer, today);
    if (r.counted) writeLocal(BUILDER_KEY, serializeBuilder(r.progress));
  };

  const share = async () => {
    if (!entry) return;
    const text = shareText(today, state.guesses, entry.word, state.solved);
    try {
      if (navigator.share) {
        await navigator.share({ text });
        return;
      }
      await navigator.clipboard.writeText(text);
      toast.success("Result copied. Paste it anywhere.");
    } catch (e) {
      if ((e as Error)?.name === "AbortError") return;
      toast.error("Could not share. Try again.");
    }
  };

  const header = (
    <header className="text-center">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Daily Word</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {today ? `${shortDate(today)}: ` : ""}guess today&apos;s {entry ? len : 5}-letter exam word in {MAX_GUESSES} tries.
      </p>
    </header>
  );

  if (file.status === "error") {
    return (
      <div>
        {header}
        <p className="mt-6 rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-900 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
          Today&apos;s word did not load. Check your connection and reload the page.
        </p>
      </div>
    );
  }

  const rows = Array.from({ length: MAX_GUESSES }, (_, r) => {
    const guess = state.guesses[r];
    if (guess && entry) {
      const marks = scoreGuess(guess, entry.word);
      return { letters: guess.split(""), marks, label: `Guess ${r + 1}: ${guess.toUpperCase()}` };
    }
    if (r === state.guesses.length && !state.done) {
      return { letters: typed.split(""), marks: null, label: `Guess ${r + 1}, typing` };
    }
    return { letters: [] as string[], marks: null, label: `Guess ${r + 1}, empty` };
  });

  return (
    <div>
      {header}

      <div className="mt-5 flex flex-col items-center gap-1.5" aria-label="Your guesses">
        {rows.map((row, r) => (
          <div key={r} className="flex gap-1.5" role="group" aria-label={row.label}>
            {Array.from({ length: len }, (_, i) => {
              const ch = row.letters[i] ?? "";
              const m = row.marks?.[i];
              const cls = m
                ? TILE[m]
                : ch
                  ? "border-foreground/70 bg-card"
                  : "border-input bg-card";
              return (
                <div
                  key={i}
                  className={`grid h-12 w-12 place-items-center rounded-md border-2 text-2xl font-bold uppercase sm:h-14 sm:w-14 ${cls}`}
                  aria-label={ch ? `${ch.toUpperCase()}${m ? `, ${MARK_WORD[m]}` : ""}` : undefined}
                >
                  {ch}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {message}
      </p>
      {message && !state.done && /letters\.$/.test(message) && (
        <p className="mt-2 text-center text-sm font-medium text-orange-800 dark:text-orange-300">{message}</p>
      )}

      {entry && !state.done && state.guesses.length >= CLUE_AFTER && (
        <div className="mt-4 flex items-start gap-2 rounded-xl border bg-card p-3 text-sm">
          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
          {clue?.kind === "sentence" ? (
            <span>
              <b>Clue:</b> the word fits in this exam sentence:{" "}
              <KatexRenderer text={clue.text} className="font-serif" />
            </span>
          ) : (
            <span>
              <b>Clue:</b> {clue?.text}
            </span>
          )}
        </div>
      )}
      {entry && !state.done && state.guesses.length < CLUE_AFTER && (
        <p className="mt-4 text-center text-sm text-muted-foreground">A clue opens after {CLUE_AFTER} guesses.</p>
      )}

      {!state.done && (
        <div className="mt-5 space-y-1.5" aria-label="Keyboard">
          {ROWS.map((row, r) => (
            <div key={row} className="flex justify-center gap-1">
              {r === 2 && (
                <button
                  type="button"
                  onClick={() => press("enter")}
                  className="h-14 min-w-[3.25rem] rounded-md bg-muted px-2 text-xs font-bold uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Enter
                </button>
              )}
              {row.split("").map((k) => {
                const m = keys[k];
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() => press(k)}
                    aria-label={m ? `${k.toUpperCase()}, ${MARK_WORD[m]}` : k.toUpperCase()}
                    className={`h-14 max-w-[2.5rem] flex-1 rounded-md text-base font-bold uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      m ? TILE[m] : "bg-muted"
                    }`}
                  >
                    {k}
                  </button>
                );
              })}
              {r === 2 && (
                <button
                  type="button"
                  onClick={() => press("back")}
                  aria-label="Delete letter"
                  className="grid h-14 min-w-[3.25rem] place-items-center rounded-md bg-muted px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Delete className="h-5 w-5" aria-hidden />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {entry && state.done && (
        <div className="mt-6 space-y-4">
          <p className="text-center text-lg font-bold">
            {state.solved ? `Solved in ${state.guesses.length}` : `Today's word was ${entry.word.toUpperCase()}`}
          </p>

          <div className="rounded-2xl border bg-card p-5">
            <p className="font-serif text-2xl font-bold uppercase tracking-wide">{entry.word}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Asked as {entry.kind === "synonym" ? "a synonym" : "an antonym"} question. Answer it below to see what it means.
            </p>
          </div>

          <div className="rounded-2xl border bg-card p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Now answer it the way the exam asked</p>
            <p className="mt-2 font-serif">
              {entry.kind === "synonym" ? "Select the word closest in meaning to " : "Select the word opposite in meaning to "}
              <b className="uppercase">{entry.word}</b>
            </p>
            {entry.sentence && <KatexRenderer text={entry.sentence} className="mt-2 block font-serif text-sm leading-relaxed" />}
            <div className="mt-3 grid gap-2" role="group" aria-label="Options">
              {entry.options.map((opt, i) => {
                const isAnswer = i === entry.answer;
                const tone =
                  examPick === null
                    ? "border-input hover:border-brand-accent/50"
                    : isAnswer
                      ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40"
                      : examPick === i
                        ? "border-red-600 bg-red-50 dark:bg-red-950/40"
                        : "border-input opacity-70";
                return (
                  <button
                    key={i}
                    type="button"
                    disabled={examPick !== null}
                    onClick={() => answerExam(i)}
                    className={`flex min-h-[2.75rem] items-center gap-3 rounded-xl border-2 bg-card px-3 text-left font-serif transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${tone}`}
                  >
                    <span className="font-sans text-sm font-semibold text-muted-foreground">{LETTERS[i]}</span>
                    <KatexRenderer text={opt} className="flex-1" />
                    {examPick !== null && isAnswer && <Check className="h-4 w-4 text-emerald-700 dark:text-emerald-300" aria-label="Correct" />}
                    {examPick === i && !isAnswer && <X className="h-4 w-4 text-red-700 dark:text-red-300" aria-label="Your answer" />}
                  </button>
                );
              })}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Asked in {entry.exam}
              {entry.year ? ` ${entry.year}` : ""}
              {entry.note ? ` · ${entry.note}` : ""}
            </p>
            {examPick !== null && (
              <div className="mt-3 border-t pt-3" aria-live="polite">
                <BlockText text={entry.solution} solution className="block font-serif text-sm leading-relaxed" />
                <p className="mt-3 rounded-lg bg-brand/5 p-2.5 text-sm">
                  Added to your <Link href="/play/word-builder" className="font-semibold text-brand-accent underline-offset-2 hover:underline">Word Builder</Link> list. It comes back there until you know it.
                </p>
              </div>
            )}
          </div>

          <Button className="h-12 w-full text-base" onClick={share}>
            <Share2 className="mr-2 h-4 w-4" aria-hidden />
            Share my grid
          </Button>
          <p className="text-center text-sm text-muted-foreground">A new word opens at midnight, India time.</p>
          <Button asChild variant="outline" className="h-12 w-full text-base">
            <Link href="/play">All games</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
