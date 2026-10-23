"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { revealSteps, stepDelayMs } from "@/lib/chat/reveal";
import VReplyText from "./VReplyText";

/**
 * A fresh reply from V, shown a line at a time in its one bubble (owner,
 * 2026-10-23: one line after another is easier to take in than a block).
 * The first line shows at once; each next one after a pause long enough to
 * read the last (lib/chat/reveal). A tap shows the rest. With reduced motion
 * the whole reply shows at once. Replies from history never come here.
 */
export default function VRevealReply({
  text,
  links,
  onNavigate,
  onGrow,
  onDone,
}: {
  text: string;
  links?: string[];
  onNavigate?: () => void;
  /** The bubble grew: keep the list scrolled to the bottom. */
  onGrow?: () => void;
  /** Every line is out: the card and thumbs under the reply may show. */
  onDone: () => void;
}) {
  const steps = useMemo(() => revealSteps(text), [text]);
  const [shown, setShown] = useState(1);
  const done = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setShown(steps.length);
  }, [steps.length]);

  useEffect(() => {
    onGrow?.();
    if (shown >= steps.length) {
      if (!done.current) {
        done.current = true;
        onDone();
      }
      return;
    }
    const t = setTimeout(() => setShown((n) => n + 1), stepDelayMs(steps[shown - 1]));
    return () => clearTimeout(t);
    // onGrow and onDone are fresh each render; the steps and the count drive this.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shown, steps]);

  return (
    <span
      onClick={() => setShown(steps.length)}
      aria-busy={shown < steps.length}
      className={shown < steps.length ? "cursor-pointer" : undefined}
    >
      <VReplyText text={steps.slice(0, shown).join("").replace(/\n+$/, "")} links={links} onNavigate={onNavigate} />
    </span>
  );
}
