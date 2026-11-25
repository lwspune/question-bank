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
import type { DownloadBox, NotesDrillLink, PaywallGate, RepeatLineFrom, VIEW_BROWSERS } from "./clientEvents";
import type { DeclineReason } from "@/lib/billing/declineReasons";
import type { ChapterFixFrom } from "@/lib/drill/from";
import type { StartNextFrom } from "@/lib/me/startNext";
import type { TeachChapterFrom } from "@/lib/chat/teachChapter";
import type { VisitReport } from "@/lib/learn/visit";

const ENDPOINT = "/api/activity/event";
const sent = new Set<string>();

export type ClientEvent =
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
      /** Home's Study time card seen, or This week opened (lib/studyTime/report). */
      kind: "surface_viewed";
      surface: "study_time";
      action: "seen" | "week";
    }
  | {
      /** The Study time card's suggestion shown or tapped, with its chapter. */
      kind: "surface_viewed";
      surface: "study_time";
      action: "next_shown" | "next_tap";
      chapterId: string;
    }
  | {
      /** The Visuals gallery (2026-11-23): a subject's page, or a visual opened, practised or read in notes. */
      kind: "surface_viewed";
      surface: "visuals";
      action: "page" | "open" | "practise" | "notes";
      subject: string;
      slug?: string;
    }
  | {
      /** A "Teach me" button seen or tapped (lib/chat/teachChapter, 2026-11-21). */
      kind: "surface_viewed";
      surface: "teach_chapter";
      action: "shown" | "tap";
      from: TeachChapterFrom;
      chapterId?: string;
    }
  | {
      /** The stuck offer seen, or one of its buttons tapped (lib/questions/stuckOffer). */
      kind: "surface_viewed";
      surface: "stuck_offer";
      questionId: string;
      action: "shown" | "teach" | "easier" | "keep" | "returned" | "try_after" | "teach_close" | "full_notes" | "learn_open" | "learn_close";
    }
  | {
      /** A notes drill link's panel opened, paged, closed or left for /browse (lib/notes/drillPanel). */
      kind: "surface_viewed";
      surface: "notes_drill";
      action: "open" | "more" | "close" | "full_page";
      link: NotesDrillLink;
      subtopic: string;
    }
  | {
      /** V's check-in (lib/chat/checkIn): asked, each tap, a chapter picked, Another chapter, a button followed. */
      kind: "surface_viewed";
      surface: "v_checkin";
      action: "shown" | "well" | "stuck" | "short" | "chapter" | "other" | "go";
    }
  | {
      /** V's gift (lib/chat/gift): its badge seen, the box shown and opened, the gift's button tapped. */
      kind: "surface_viewed";
      surface: "v_gift";
      gift: "trial" | "points";
      action: "badge" | "shown" | "open" | "activate" | "pricing";
    }
  | {
      /** A teaching moment under a bank answer seen (lib/questions/teachingMoment). */
      kind: "surface_viewed";
      surface: "teaching_moment";
      moment: "same_mistake";
      questionId: string;
      action: "shown";
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
      action: "shown" | "see_all" | "close" | "full_page";
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
      step: "shown" | "checkout_dismissed" | "dismissed";
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
    }
  | {
      /** A finished /play round (lib/play, migration 0267). */
      kind: "play_round";
      level: number;
      correct: number;
      wrong: number;
      points: number;
      cleared: boolean;
    }
  | { kind: "play_round"; game: "number_rain"; world: number; score: number; blasts: number; missed: number }
  | { kind: "play_round"; game: "word_groups"; puzzle: number; won: boolean; mistakes: number }
  | { kind: "play_round"; game: "launch"; level: number; hit: boolean; shots: number }
  | { kind: "play_round"; game: "element_hunt"; world: number; score: number; right: number; wrong: number }
  | { kind: "play_round"; game: "timeline"; pack: string; placed: number; won: boolean }
  | { kind: "play_round"; game: "pin_it"; pack: string; score: number }
  | ({
      /** One visit to a Learn lesson (lib/learn/visit, migration 0288). */
      kind: "learn_visit";
      path: string;
      visit: string;
      place: "page" | "v";
    } & VisitReport)
  | {
      /** A finished Daily Word (lib/play/words/daily). */
      kind: "play_round";
      game: "daily_word";
      solved: boolean;
      guesses: number;
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
