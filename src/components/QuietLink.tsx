"use client";

import Link from "next/link";
import { useState, type ComponentProps, type FocusEvent, type MouseEvent, type TouchEvent } from "react";

type LinkProps = ComponentProps<typeof Link>;
type Handlers = Pick<LinkProps, "onMouseEnter" | "onTouchStart" | "onFocus">;

/**
 * The caller's own hover, touch and focus handlers, each also marking intent.
 * Pure, so the composition is tested without a DOM (tests/quiet-link.test.ts).
 */
export function intentHandlers(own: Handlers, onIntent: () => void) {
  return {
    onMouseEnter: (e: MouseEvent<HTMLAnchorElement>) => {
      onIntent();
      own.onMouseEnter?.(e);
    },
    onTouchStart: (e: TouchEvent<HTMLAnchorElement>) => {
      onIntent();
      own.onTouchStart?.(e);
    },
    onFocus: (e: FocusEvent<HTMLAnchorElement>) => {
      onIntent();
      own.onFocus?.(e);
    },
  };
}

/**
 * A Link the router does not fetch in advance when it scrolls into view, only
 * once the student shows intent: a finger on it, a mouse over it, keyboard
 * focus (PAGE_WEIGHT_SPEC.md item 1). Next's own pattern for this
 * (docs/01-app/02-guides/prefetching.md, HoverPrefetchLink), plus touch and
 * focus, since most students are on a phone.
 *
 * For links a student rarely taps from where they are: the footer, the
 * header's Store, Visuals and Play buttons. Measured 2026-11-24, the footer
 * alone made a notes page fetch 57 more pages when scrolled to its foot. Not
 * for the study tabs, whose tap should stay instant.
 *
 * The rendered anchor is identical to a plain Link's, so a search engine reads
 * the same page.
 */
export default function QuietLink({ onMouseEnter, onTouchStart, onFocus, ...props }: LinkProps) {
  const [active, setActive] = useState(false);
  return (
    <Link
      {...props}
      prefetch={active ? null : false}
      {...intentHandlers({ onMouseEnter, onTouchStart, onFocus }, () => setActive(true))}
    />
  );
}
