"use client";

/**
 * Client sender for POST /api/activity/event. BEST EFFORT, like the practice
 * beacon: a lost ping must never surface to a student or break the
 * interaction it observes. `keepalive` lets a "checkout dismissed" survive the
 * navigation that usually follows it.
 *
 * The server dedupes views and impressions per day; this only avoids sending
 * the same one twice from one page instance.
 */
import type { Surface } from "./views";
import type { DownloadBox, PaywallGate, RepeatLineFrom, VIEW_BROWSERS } from "./clientEvents";
import type { DeclineReason } from "@/lib/billing/declineReasons";
import type { ChapterFixFrom } from "@/lib/drill/from";
import type { StartNextFrom } from "@/lib/me/startNext";

const ENDPOINT = "/api/activity/event";
const sent = new Set<string>();

type ClientEvent =
  | {
      kind: "surface_viewed";
      surface: Surface;
      browser?: (typeof VIEW_BROWSERS)[number];
      /** "subjectRoute/chapterSlug", handout surfaces only. */
      chapter?: string;
      /** The page address, reading surfaces only (lib/activity/views readingViewFor). */
      path?: string;
    }
  | {
      /** The chapter pages' Fix line seen (lib/drill/chapterFix). */
      kind: "surface_viewed";
      surface: "chapter_fix";
      chapterId: string;
      from: ChapterFixFrom;
    }
  | {
      /** Start next seen on its page (lib/me/startNext). */
      kind: "surface_viewed";
      surface: "start_next";
      from: StartNextFrom;
    }
  | {
      /** The stuck offer seen, or one of its buttons tapped (lib/questions/stuckOffer). */
      kind: "surface_viewed";
      surface: "stuck_offer";
      questionId: string;
      action: "shown" | "teach" | "easier" | "keep" | "returned" | "try_after";
    }
  | {
      /** The Review traps panel seen, opened (Show more) or its playbook link tapped. */
      kind: "surface_viewed";
      surface: "review_traps";
      chapterId: string;
      action: "shown" | "expand" | "playbook";
    }
  | {
      /** The repeat line seen, or its See all tapped (lib/questions/repeatLine). */
      kind: "surface_viewed";
      surface: "repeat_line";
      questionId: string;
      action: "shown" | "see_all";
      from: RepeatLineFrom;
    }
  | {
      /** A Start next chapter's Start tapped. */
      kind: "surface_viewed";
      surface: "start_next_tap";
      chapterId: string;
      from: StartNextFrom;
    }
  | {
      kind: "paywall_event";
      step: "shown" | "checkout_dismissed";
      gate: PaywallGate;
      planId?: string;
      box?: DownloadBox;
    }
  | {
      kind: "paywall_event";
      step: "declined";
      gate: PaywallGate;
      reason: DeclineReason;
      afterCheckout: boolean;
      /** Answered in the toast after the offer closed. */
      onClose?: boolean;
      planId?: string;
      box?: DownloadBox;
    };

export function sendActivity(event: ClientEvent): void {
  try {
    void fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
      keepalive: true,
    }).catch(() => {
      /* not worth surfacing */
    });
  } catch {
    /* hostile environment — drop silently */
  }
}

/** Send once per page instance (a re-render must not repeat an impression). */
export function sendActivityOnce(key: string, event: ClientEvent): void {
  if (sent.has(key)) return;
  sent.add(key);
  sendActivity(event);
}
