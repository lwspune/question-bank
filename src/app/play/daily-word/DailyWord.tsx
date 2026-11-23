"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Delete, Lightbulb, Share2 } from "lucide-react";
import { toast } from "sonner";
import KatexRenderer from "@/components/math/KatexRenderer";
import { useLocalStore, readLocal, writeLocal } from "@/components/play/useLocalStore";
import { useWordFile, DAILY_WORDS_URL } from "@/components/play/useWordFile";
import { confetti, floatText, replay, sfx, vibrate } from "@/components/play/sfx";
import { reportRound } from "@/components/play/report";
import { useViewerSession } from "@/lib/viewer/useViewerSession";
import { istDay, msToIstMidnight } from "@/lib/play/day";
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
  type Mark,
} from "@/lib/play/words/daily";

/**
 * Daily Word (2026-11-17; arcade look 2026-11-18): one past-paper word a day,
 * the same for everyone (lib/play/words/daily), 6 tries, a clue after 2.
 * Letters pop, tiles flip one by one, a short guess shakes, a win bounces.
 * The end card gives the meaning and where the word was asked; no exam
 * question (owner: games must not feel like an exam). No streak.
 */

const TILE: Record<Mark, string> = {
  b: "bg-[var(--pa-mint)] border-[var(--pa-mint)] text-[var(--pa-mint-ink)]",
  o: "bg-[var(--pa-mango)] border-[var(--pa-mango)] text-[var(--pa-mango-ink)]",
  g: "bg-[#3a335f] border-[#3a335f] text-[var(--pa-ink-dim)]",
};
const MARK_WORD: Record<Mark, string> = { b: "right place", o: "in the word, wrong place", g: "not in the word" };
const ROWS = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
const PRAISE = ["Genius!", "Brilliant!", "Great!", "Nice!", "Good!", "Phew!"];
const FLIP_MS = 260;

function countdown(): string {
  const ms = msToIstMidnight(new Date());
  const h = Math.floor(ms / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  return `${h} h ${m} min`;
}

export default function DailyWord() {
  const file = useWordFile(DAILY_WORDS_URL);
  const raw = useLocalStore(DAILY_KEY);
  const progress = useMemo(() => parseDaily(raw ?? null), [raw]);
  const { session } = useViewerSession();
  const [typed, setTyped] = useState("");
  const [message, setMessage] = useState("");
  // The row being revealed and how many of its tiles have flipped.
  const [reveal, setReveal] = useState<{ row: number; shown: number } | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  const today = useMemo(() => (file.status === "ready" ? istDay(new Date()) : ""), [file.status]);
  const entry = useMemo(() => (file.status === "ready" && today ? dailyWord(file.words, today) : null), [file, today]);
  const state = entry ? dayState(progress, today) : { guesses: [], done: false, solved: false };
  const len = entry?.word.length ?? 5;
  const revealing = reveal !== null && reveal.shown < len;
  // Keyboard colours wait until the row has finished flipping.
  const settledGuesses = revealing ? state.guesses.slice(0, -1) : state.guesses;
  const keys = entry ? keyMarks(settledGuesses, entry.word) : {};
  const clue = entry ? clueFor(entry) : null;
  const done = state.done && !revealing;

  const finishRow = useCallback(
    (row: number) => {
      if (!entry) return;
      const after = dayState(parseDaily(readLocal(DAILY_KEY)), today);
      if (after.solved) {
        replay(rowRefs.current[row], "pa-bounce");
        floatText(stageRef.current, PRAISE[Math.min(row, 5)], "pa-toast");
        sfx.win();
        vibrate(40);
        setTimeout(() => confetti(stageRef.current, 60), 200);
      } else if (after.done) {
        floatText(stageRef.current, `The word was ${entry.word.toUpperCase()}`, "pa-toast");
        sfx.lose();
      }
      if (after.done) {
        reportRound(
          !!session,
          { kind: "play_round", game: "daily_word", solved: after.solved, guesses: after.guesses.length },
          { solved: after.solved, guesses: after.guesses.length }
        );
      }
    },
    [entry, today, session]
  );

  // Flip the newest row's tiles one at a time.
  useEffect(() => {
    if (!reveal || reveal.shown >= len) return;
    const t = setTimeout(() => {
      sfx.flip(reveal.shown);
      const shown = reveal.shown + 1;
      setReveal({ row: reveal.row, shown });
      if (shown >= len) finishRow(reveal.row);
    }, reveal.shown === 0 ? 30 : FLIP_MS);
    return () => clearTimeout(t);
  }, [reveal, len, finishRow]);

  const submit = useCallback(() => {
    if (!entry || state.done || revealing) return;
    if (typed.length !== len) {
      setMessage(`The word has ${len} letters.`);
      floatText(stageRef.current, "Not enough letters", "pa-toast");
      replay(rowRefs.current[state.guesses.length], "pa-shake");
      sfx.bad();
      return;
    }
    const r = recordGuess(parseDaily(readLocal(DAILY_KEY)), today, typed, entry.word);
    if (!r.ok) return;
    const row = state.guesses.length;
    writeLocal(DAILY_KEY, serializeDaily(r.progress));
    const marks = scoreGuess(typed, entry.word);
    setMessage(`${typed.toUpperCase()}: ${marks.map((m, i) => `${typed[i].toUpperCase()} ${MARK_WORD[m]}`).join(", ")}.`);
    setTyped("");
    setReveal({ row, shown: 0 });
  }, [entry, state.done, state.guesses.length, revealing, typed, len, today]);

  const press = useCallback(
    (key: string) => {
      if (!entry || state.done || revealing) return;
      if (key === "enter") return submit();
      if (key === "back") return setTyped((t) => t.slice(0, -1));
      if (/^[a-z]$/.test(key)) {
        setTyped((t) => (t.length < len ? t + key : t));
        sfx.tick();
      }
    },
    [entry, state.done, revealing, submit, len]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      if (e.key === "Enter") {
        if (t?.tagName === "BUTTON") return;
        e.preventDefault();
        press("enter");
      } else if (e.key === "Backspace") press("back");
      else if (/^[a-zA-Z]$/.test(e.key)) press(e.key.toLowerCase());
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [press]);

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

  if (file.status === "error") {
    return <p className="rounded-xl bg-[var(--pa-night-2)] p-4 text-sm">Today&apos;s word did not load. Check your connection and reload the page.</p>;
  }

  return (
    <div ref={stageRef} className="pa-stage px-3 pb-4 pt-4">
      <p className="text-center text-sm pa-dim">
        Guess today&apos;s {len}-letter exam word in {MAX_GUESSES} tries.
      </p>

      <div className="mt-3 flex flex-col items-center gap-1.5" aria-label="Your guesses">
        {Array.from({ length: MAX_GUESSES }, (_, r) => {
          const guess = state.guesses[r];
          const isTyping = r === state.guesses.length && !state.done;
          const letters = guess ? guess.split("") : isTyping ? typed.split("") : [];
          const marks = guess && entry ? scoreGuess(guess, entry.word) : null;
          const shownUpTo = reveal && reveal.row === r ? reveal.shown : len;
          return (
            <div
              key={r}
              ref={(el) => {
                rowRefs.current[r] = el;
              }}
              className="flex gap-1.5"
              role="group"
              aria-label={guess ? `Guess ${r + 1}: ${guess.toUpperCase()}` : `Guess ${r + 1}${isTyping ? ", typing" : ", empty"}`}
            >
              {Array.from({ length: len }, (_, i) => {
                const ch = letters[i] ?? "";
                const m = marks && i < shownUpTo ? marks[i] : undefined;
                const flipping = reveal && reveal.row === r && i === reveal.shown - 1;
                return (
                  <div
                    key={`${i}-${ch}-${m ?? ""}`}
                    className={`pa-display grid h-[3.25rem] w-[3.25rem] place-items-center rounded-lg border-2 text-[1.75rem] font-extrabold uppercase ${
                      m ? TILE[m] : ch ? "border-[var(--pa-ink-dim)] pa-pop" : "border-[var(--pa-night-3)]"
                    } ${flipping ? "pa-flip" : ""}`}
                    aria-label={ch ? `${ch.toUpperCase()}${m ? `, ${MARK_WORD[m]}` : ""}` : undefined}
                  >
                    {ch}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        {message}
      </p>

      {entry && !done && (
        <div className="mx-auto mt-3 max-w-sm rounded-xl bg-black/20 px-3 py-2 text-center text-sm pa-dim">
          {state.guesses.length >= CLUE_AFTER && clue ? (
            <span className="flex items-start gap-2 text-left">
              <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-[var(--pa-mango)]" aria-hidden />
              {clue.kind === "sentence" ? (
                <span>
                  <b className="text-[var(--pa-mango)]">Clue:</b> it fits this exam sentence:{" "}
                  <KatexRenderer text={clue.text} className="font-serif text-[var(--pa-ink)]" />
                </span>
              ) : (
                <span>
                  <b className="text-[var(--pa-mango)]">Clue:</b> {clue.text}
                </span>
              )}
            </span>
          ) : (
            `A clue opens after ${CLUE_AFTER} guesses.`
          )}
        </div>
      )}

      {!done && (
        <div className="mt-4 space-y-1.5" aria-label="Keyboard">
          {ROWS.map((row, r) => (
            <div key={row} className="flex justify-center gap-1">
              {r === 2 && (
                <button type="button" onClick={() => press("enter")} className="h-12 min-w-[3.4rem] rounded-lg bg-[#4a417f] px-1 text-xs font-bold uppercase">
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
                    className={`h-12 max-w-[2.3rem] flex-1 touch-manipulation rounded-lg text-base font-bold uppercase ${m ? TILE[m] : "bg-[#4a417f] text-[var(--pa-ink)]"}`}
                  >
                    {k}
                  </button>
                );
              })}
              {r === 2 && (
                <button type="button" onClick={() => press("back")} aria-label="Delete letter" className="grid h-12 min-w-[3.4rem] place-items-center rounded-lg bg-[#4a417f]">
                  <Delete className="h-5 w-5" aria-hidden />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {entry && done && (
        <div className="pa-pop mx-auto mt-5 max-w-sm space-y-2 rounded-2xl bg-[var(--pa-night-3)] p-4 text-center">
          <p className="pa-display text-lg font-extrabold">{state.solved ? `Solved in ${state.guesses.length}!` : "Not this time"}</p>
          <p className="pa-display text-3xl font-extrabold uppercase tracking-[0.15em] text-[var(--pa-mint)]">{entry.word}</p>
          <p>
            {entry.kind === "synonym" ? "Means much the same as " : "The opposite of "}
            <b>{entry.options[entry.answer]}</b>.
          </p>
          <p className="text-xs pa-dim">
            Asked in {entry.exam}
            {entry.year ? ` ${entry.year}` : ""}
          </p>
          <pre className="m-0 text-lg leading-tight" aria-hidden>
            {shareText(today, state.guesses, entry.word, state.solved).split("\n").slice(1, -1).join("\n")}
          </pre>
          <button type="button" className="pa-btn inline-flex items-center gap-2 !text-lg" onClick={share}>
            <Share2 className="h-5 w-5" aria-hidden />
            Share
          </button>
          <p className="text-xs pa-dim">Next word in {countdown()}.</p>
        </div>
      )}
    </div>
  );
}
