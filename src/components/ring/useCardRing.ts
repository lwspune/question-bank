"use client";

import {
  useCallback,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";

/**
 * The 3D card ring's movement, shared by the homepage exam ring
 * (components/home/ExamCarousel) and the /play subject ring
 * (app/play/PlayHub), 2026-11-17. Which card is in front, swipe and drag
 * (snapping to the nearest card), a tap on a side card bringing it forward
 * instead of following its link, and the arrow keys. Each ring draws its own
 * cards with lib/exam/showcaseSlots and the .sc-* classes in globals.css.
 */
export function useCardRing({
  count,
  initial = 0,
  onMove,
  onDragStart,
  onHoverMove,
}: {
  count: number;
  initial?: number;
  /** After the front card changes; byUser is false for the ring's own timer. */
  onMove?: (next: number, byUser: boolean) => void;
  onDragStart?: () => void;
  /** A pointer move that is not a drag (the homepage tilts its front card). */
  onHoverMove?: (e: ReactPointerEvent<HTMLDivElement>, stage: HTMLDivElement) => void;
}) {
  const [active, setActive] = useState(initial);
  const [dragPos, setDragPos] = useState<number | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; id: number; moved: boolean; gap: number } | null>(null);
  const suppressClick = useRef(false);

  const go = useCallback(
    (to: number, byUser: boolean) => {
      const next = ((to % count) + count) % count;
      setActive(next);
      onMove?.(next, byUser);
    },
    [count, onMove]
  );

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
        onDragStart?.();
        try {
          stageRef.current?.setPointerCapture(d.id);
        } catch {
          /* capture is a nicety; dragging still works without it */
        }
      }
      if (d.moved) setDragPos(active - dx / d.gap);
      return;
    }
    if (stageRef.current) onHoverMove?.(e, stageRef.current);
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

  return {
    active,
    /** Where the ring is drawn: fractional while dragging. */
    pos: dragPos ?? active,
    dragging: dragPos !== null,
    go,
    stageRef,
    stageHandlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
      onClickCapture,
      onKeyDown,
    },
  };
}
