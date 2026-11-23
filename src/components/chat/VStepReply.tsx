"use client";

/**
 * V's explanation as a bubble per step (owner, 2026-11-15; replaced "Teach me
 * step by step"): the opening line, each numbered step, then the ending.
 * Tapping a step shows Explain and Reply under it; tapping it again, or
 * another step, moves or closes them. Nothing shows until the student taps:
 * the owner picked this over chips under every step, which put 8 to 12 chips
 * under one explanation.
 *
 * A fresh reply grows a bubble at a time, as V's other replies grow a line at
 * a time (lib/chat/reveal stepDelayMs); a tap, or reduced motion, shows it all.
 * Without `onTap` (the dashboard, or a signed-out visitor) the bubbles are
 * drawn the same but cannot be tapped.
 *
 * A step is a button, so its text is drawn without links (a link inside a
 * button is not allowed); the opening and the ending keep theirs.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { CircleHelp, Reply } from "lucide-react";
import type { ReplyParts } from "@/lib/chat/stepChips";
import { stepDelayMs } from "@/lib/chat/reveal";
import VReplyText from "./VReplyText";
import VFace, { type VAvatar } from "./VFace";
import { V_BUBBLE } from "./chatStyles";

const CHIP =
  "inline-flex h-8 items-center gap-1.5 rounded-full border border-border bg-card px-3 text-xs font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50";

/** V_BUBBLE's shape without its border and fill, so a tapped step can swap both without two classes competing. */
const STEP_SHAPE =
  "flex whitespace-pre-wrap break-words rounded-2xl rounded-bl-md px-3.5 py-2 text-left text-sm text-card-foreground shadow-sm";

type Unit = { kind: "intro" | "outro"; text: string } | { kind: "step"; text: string; step: number };

export default function VStepReply({
  parts,
  links,
  labels,
  avatar,
  reveal = false,
  tapped = null,
  busy = false,
  onTap,
  onExplain,
  onReply,
  onNavigate,
  onGrow,
  onDone,
}: {
  parts: ReplyParts;
  links?: string[];
  labels?: Readonly<Record<string, string>>;
  avatar: VAvatar;
  /** A fresh reply: grow a bubble at a time. */
  reveal?: boolean;
  /** The step whose chips show, 0-based. */
  tapped?: number | null;
  /** V is answering: the chips wait. */
  busy?: boolean;
  /** A step was tapped (0-based). None = the steps cannot be tapped. */
  onTap?: (step: number) => void;
  onExplain?: (step: number) => void;
  onReply?: (step: number) => void;
  onNavigate?: () => void;
  /** A bubble was added: keep the list scrolled to the bottom. */
  onGrow?: () => void;
  /** Every bubble is out: what goes under the reply may show. */
  onDone?: () => void;
}) {
  const units = useMemo<Unit[]>(
    () => [
      ...(parts.intro ? [{ kind: "intro" as const, text: parts.intro }] : []),
      ...parts.steps.map((text, step) => ({ kind: "step" as const, text, step })),
      ...(parts.outro ? [{ kind: "outro" as const, text: parts.outro }] : []),
    ],
    [parts]
  );
  const [shown, setShown] = useState(reveal ? 1 : units.length);
  const done = useRef(!reveal);

  useEffect(() => {
    if (reveal && window.matchMedia("(prefers-reduced-motion: reduce)").matches) setShown(units.length);
  }, [reveal, units.length]);

  useEffect(() => {
    if (!reveal) return;
    onGrow?.();
    if (shown >= units.length) {
      if (!done.current) {
        done.current = true;
        onDone?.();
      }
      return;
    }
    const t = setTimeout(() => setShown((n) => n + 1), stepDelayMs(units[shown - 1].text));
    return () => clearTimeout(t);
    // onGrow and onDone are fresh each render; the units and the count drive this.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shown, units, reveal]);

  const growing = shown < units.length;
  const canTap = !!onTap && !growing;

  return (
    <div
      className="space-y-1.5"
      onClick={growing ? () => setShown(units.length) : undefined}
      aria-busy={growing}
    >
      {units.slice(0, shown).map((u, i) => {
        const face =
          i === 0 ? (
            <VFace avatar={avatar} className="h-7 w-7 shrink-0 object-contain" />
          ) : (
            <span className="w-7 shrink-0" aria-hidden />
          );
        if (u.kind !== "step") {
          return (
            <div key={i} className="flex items-end gap-2">
              {face}
              <div className={V_BUBBLE}>
                <VReplyText text={u.text} links={links} labels={labels} onNavigate={onNavigate} />
              </div>
            </div>
          );
        }
        const open = canTap && tapped === u.step;
        const label = `Step ${u.step + 1}`;
        const body = (
          <>
            <span
              className="mr-2 mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-brand-accent"
              aria-hidden
            >
              {u.step + 1}
            </span>
            <span className="min-w-0">
              <VReplyText text={u.text} />
            </span>
          </>
        );
        return (
          <div key={i}>
            <div className="flex items-end gap-2">
              {face}
              {canTap ? (
                <button
                  type="button"
                  onClick={() => onTap!(u.step)}
                  aria-expanded={open}
                  aria-label={`${label}. Tap to ask about this step`}
                  className={`${STEP_SHAPE} transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    open ? "border-2 border-brand-accent bg-accent" : "border border-border/70 bg-card hover:bg-accent/60"
                  }`}
                >
                  {body}
                </button>
              ) : (
                <div className={`${V_BUBBLE} flex`}>{body}</div>
              )}
            </div>
            {open && (
              <div className="ml-9 mt-1.5 flex flex-wrap gap-1.5">
                <button type="button" disabled={busy} onClick={() => onExplain?.(u.step)} aria-label={`Explain step ${u.step + 1}`} className={CHIP}>
                  <CircleHelp className="h-3.5 w-3.5" aria-hidden />
                  Explain
                </button>
                <button type="button" disabled={busy} onClick={() => onReply?.(u.step)} aria-label={`Reply to step ${u.step + 1}`} className={CHIP}>
                  <Reply className="h-3.5 w-3.5" aria-hidden />
                  Reply
                </button>
              </div>
            )}
          </div>
        );
      })}
      {canTap && tapped === null && <p className="ml-9 px-1 text-xs text-muted-foreground">Stuck on a step? Tap it.</p>}
    </div>
  );
}
