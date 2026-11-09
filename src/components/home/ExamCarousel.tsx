"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { ArrowRight, BookOpen, Briefcase, ChevronLeft, ChevronRight, FlaskConical, Landmark, Pause, Play, Shield } from "lucide-react";
import type { ExamGoal } from "@/lib/exam/examContext";
import { slotStyle, wrapOffset } from "@/lib/exam/showcaseSlots";
import type { ShowcaseCard } from "@/lib/exam/examShowcase";
import { setExamCookie } from "@/lib/exam/examCookie";

/**
 * The 3D ring of exam cards in the homepage's navy panel (2026-11-09).
 *
 * The server render is the finished picture: card 0 in front, every other
 * card placed by slotStyle, every exam a real link. This component then:
 * moves to the next card every 4.5 s (the white bar in the active dot is the
 * timer, so pausing its animation pauses the ring), and lets the visitor swipe,
 * drag, use the arrows or the arrow keys, or pause it. With Reduce motion on
 * it never moves by itself (WCAG 2.2.2 asks for a pause control on anything
 * that moves on its own for more than 5 s; the button is always there).
 */

const GOAL_ICON: Record<ExamGoal, typeof Shield> = {
  defence: Shield,
  science: FlaskConical,
  government: Landmark,
  boards: BookOpen,
  management: Briefcase,
};
const GOAL_SHORT: Record<ExamGoal, string> = {
  defence: "Defence",
  science: "Science",
  government: "Government",
  boards: "School board",
  management: "Management",
};
/** Faint symbols that drift behind each card, from the subjects each goal tests. */
const GOAL_GLYPHS: Record<ExamGoal, string[]> = {
  defence: ["sin θ", "∫", "π", "dy/dx"],
  science: ["F = ma", "∑", "λ", "ATP"],
  government: ["GDP", "Art. 21", "%", "∴"],
  boards: ["|A|", "dx", "Δ", "H₂O"],
  management: ["%", "÷", "x̄", "∴"],
};

const fmt = (n: number) => n.toLocaleString("en-IN");
const COUNT_LABEL: Record<ShowcaseCard["countKind"], string> = {
  pyq: "past-year questions",
  practice: "practice questions",
  mixed: "questions",
};

function usePrefersReducedMotion(): boolean {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduce;
}

/** Rolls the front card's count up when it comes to the front (never on first load). */
function RollingCount({ value, roll }: { value: number; roll: number }) {
  const [shown, setShown] = useState(value);
  useEffect(() => {
    if (roll === 0) return;
    const from = Math.round(value * 0.6);
    const t0 = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / 700);
      setShown(Math.round(from + (value - from) * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [roll, value]);
  return <>{fmt(shown)}</>;
}

export default function ExamCarousel({ cards }: { cards: ShowcaseCard[] }) {
  const n = cards.length;
  const reduce = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [dragPos, setDragPos] = useState<number | null>(null);
  const [rolls, setRolls] = useState(0);
  const [announce, setAnnounce] = useState("");
  const stageRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; id: number; moved: boolean; gap: number } | null>(null);
  const suppressClick = useRef(false);

  const playing = !reduce && !userPaused;

  const go = useCallback(
    (to: number, byUser: boolean) => {
      const next = ((to % n) + n) % n;
      setActive(next);
      setRolls((r) => r + 1);
      if (byUser) setAnnounce(`${cards[next].name}, ${next + 1} of ${n}`);
    },
    [cards, n]
  );

  const resetTilt = () => {
    const face = stageRef.current?.querySelector<HTMLElement>("[data-active] .sc-face");
    face?.style.setProperty("--tx", "0deg");
    face?.style.setProperty("--ty", "0deg");
  };

  /** Pixels between neighbouring cards, measured from the live layout. */
  const measureGap = (): number => {
    const stage = stageRef.current;
    const card = stage?.querySelector<HTMLElement>(".sc-card");
    if (!stage || !card) return 240;
    const w = stage.clientWidth;
    const cw = card.offsetWidth;
    return w < 640 ? cw * 0.86 : Math.min(cw * 0.78, w * 0.3);
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    drag.current = { x: e.clientX, id: e.pointerId, moved: false, gap: measureGap() };
  };
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (d) {
      const dx = e.clientX - d.x;
      if (!d.moved && Math.abs(dx) > 6) {
        d.moved = true;
        resetTilt();
        try {
          stageRef.current?.setPointerCapture(d.id);
        } catch {
          /* capture is a nicety; dragging still works without it */
        }
      }
      if (d.moved) setDragPos(active - dx / d.gap);
      return;
    }
    if (reduce || e.pointerType !== "mouse") return;
    const face = stageRef.current?.querySelector<HTMLElement>("[data-active] .sc-face");
    if (!face) return;
    const r = face.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) {
      resetTilt();
      return;
    }
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    face.style.setProperty("--ty", `${((px - 0.5) * 16).toFixed(1)}deg`);
    face.style.setProperty("--tx", `${((0.5 - py) * 12).toFixed(1)}deg`);
    face.style.setProperty("--gx", `${(px * 100).toFixed(0)}%`);
    face.style.setProperty("--gy", `${(py * 100).toFixed(0)}%`);
  };
  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    drag.current = null;
    if (!d?.moved) return;
    suppressClick.current = true;
    const dx = e.clientX - d.x;
    let steps = Math.round(-dx / d.gap);
    if (steps === 0 && Math.abs(dx) > 40) steps = dx < 0 ? 1 : -1;
    setDragPos(null);
    go(active + steps, true);
  };

  // A tap on a side card brings it forward instead of following its link; a
  // tap that ended a drag does nothing.
  const onClickCapture = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (suppressClick.current) {
      suppressClick.current = false;
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    const card = (e.target as HTMLElement).closest<HTMLElement>("[data-card-index]");
    if (!card || card.hasAttribute("data-active")) return;
    e.preventDefault();
    e.stopPropagation();
    go(Number(card.dataset.cardIndex), true);
  };

  const onKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(active + 1, true);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(active - 1, true);
    }
  };

  if (n === 0) return null;
  const pos = dragPos ?? active;

  return (
    <div
      className="sc-ring"
      data-paused={hovered || undefined}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => {
        setHovered(false);
        resetTilt();
      }}
      onFocus={() => setHovered(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHovered(false);
      }}
    >
      <div
        ref={stageRef}
        className="sc-stage"
        data-dragging={dragPos !== null || undefined}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Exams. Use the left and right arrow keys to move."
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        onKeyDown={onKeyDown}
      >
        {cards.map((card, i) => {
          const d = wrapOffset(i, pos, n);
          const s = slotStyle(d);
          const front = i === active;
          const style = {
            "--d": d,
            "--z": s.z,
            "--ry": s.rotateY,
            "--s": s.scale,
            "--shade": s.shade,
            zIndex: s.zIndex,
          } as CSSProperties;
          return (
            <ShowcaseCardView
              key={card.key}
              card={card}
              index={i}
              front={front}
              hidden={s.hidden}
              style={style}
              roll={front ? rolls : 0}
            />
          );
        })}
        <div className="sc-floor" aria-hidden />
      </div>

      <div className="sc-controls">
        <button type="button" className="sc-round" onClick={() => go(active - 1, true)} aria-label="Previous exam">
          <ChevronLeft className="h-4 w-4" aria-hidden />
        </button>
        <div className="sc-dots">
          {cards.map((card, i) => (
            <button
              key={card.key}
              type="button"
              className="sc-dot"
              aria-label={`Show ${card.name}`}
              aria-current={i === active ? "true" : "false"}
              onClick={() => go(i, true)}
            >
              <span
                key={`${active}-${playing}`}
                className="sc-dot-fill"
                data-run={(i === active && playing) || undefined}
                onAnimationEnd={() => {
                  if (i === active && playing && dragPos === null) go(active + 1, false);
                }}
              />
            </button>
          ))}
        </div>
        <button type="button" className="sc-round" onClick={() => go(active + 1, true)} aria-label="Next exam">
          <ChevronRight className="h-4 w-4" aria-hidden />
        </button>
        <button
          type="button"
          className="sc-round"
          onClick={() => setUserPaused((p) => !p)}
          aria-pressed={userPaused}
          aria-label={userPaused ? "Play the exam slideshow" : "Pause the exam slideshow"}
          hidden={reduce}
        >
          {userPaused ? <Play className="h-4 w-4" aria-hidden /> : <Pause className="h-4 w-4" aria-hidden />}
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {announce}
      </p>
    </div>
  );
}

function ShowcaseCardView({
  card,
  index,
  front,
  hidden,
  style,
  roll,
}: {
  card: ShowcaseCard;
  index: number;
  front: boolean;
  hidden: boolean;
  style: CSSProperties;
  roll: number;
}) {
  const Icon = GOAL_ICON[card.goal];
  const tab = front ? 0 : -1;
  return (
    <article
      className="sc-card"
      style={style}
      data-card-index={index}
      data-active={front || undefined}
      data-hidden={hidden || undefined}
      aria-hidden={!front}
      aria-roledescription="slide"
      aria-label={card.name}
    >
      <div className="sc-face" data-goal={card.goal}>
        <div className="sc-pat" aria-hidden />
        <div className="sc-glyphs" aria-hidden>
          {GOAL_GLYPHS[card.goal].map((g, k) => (
            <span key={g} style={{ "--k": k } as CSSProperties}>
              {g}
            </span>
          ))}
        </div>

        <div className="sc-layer sc-row">
          <span className="sc-tile">
            <Icon className="h-5 w-5" aria-hidden />
          </span>
          <span className="sc-goal">{GOAL_SHORT[card.goal]}</span>
        </div>

        <div className="sc-layer">
          <p className="sc-name" data-long={card.name.length > 18 ? "2" : card.name.length > 12 ? "1" : undefined}>
            {card.name}
          </p>
          <p className="sc-sub">
            {card.years ? `Past papers ${card.years.from} to ${card.years.to}` : "Practice questions"}
          </p>
        </div>

        <p className="sc-layer sc-count">
          <b>
            <RollingCount value={card.count} roll={roll} />
          </b>
          {COUNT_LABEL[card.countKind]}
        </p>

        {card.years && (
          <div className="sc-layer" aria-hidden>
            <div className="sc-bars">
              {card.years.bars.map((b, k) => (
                <i key={b.year} style={{ "--h": `${Math.max(4, b.height * 100)}%`, "--b": k } as CSSProperties} />
              ))}
            </div>
            <div className="sc-axis">
              <span>{card.years.bars[0]?.year}</span>
              <span>questions by year</span>
              <span>{card.years.bars[card.years.bars.length - 1]?.year}</span>
            </div>
          </div>
        )}

        {/* A family card's class buttons already fill that space. */}
        {card.subjects.length > 0 && card.members.length === 0 && (
          <div className="sc-layer sc-subjects">
            {card.subjects.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        )}

        {card.topChapter && (
          <p className="sc-layer sc-most">
            Biggest chapter:{" "}
            <Link href={card.topChapter.href} tabIndex={tab} prefetch={false}>
              {card.topChapter.name}
            </Link>
          </p>
        )}

        <div className="sc-layer sc-actions">
          {card.href ? (
            <Link
              href={card.href}
              className="sc-cta"
              tabIndex={tab}
              prefetch={false}
              onClick={() => {
                // Remembered like the "Pick your exam" chips: the next visit
                // opens with this exam first.
                if (card.rememberSlug) setExamCookie(card.rememberSlug);
              }}
            >
              Practise {card.name}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          ) : (
            <div className="sc-members">
              {card.members.map((m) => (
                <Link key={m.href} href={m.href} tabIndex={tab} prefetch={false} aria-label={`${card.name} ${m.label}`}>
                  {m.label}
                </Link>
              ))}
              {card.moreMembers > 0 && (
                <a href={card.moreHref ?? "#exams"} className="sc-more" tabIndex={tab}>
                  +{card.moreMembers} more
                </a>
              )}
            </div>
          )}
        </div>
        <div className="sc-shade" aria-hidden />
      </div>
    </article>
  );
}
