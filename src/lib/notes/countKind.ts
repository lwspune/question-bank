/**
 * Which questions a /notes chapter counts and drills.
 *
 * Past-year only by default (migration 0036): practice questions must never inflate an exam's
 * past-year weightage. SPI and AFCAT are the exceptions. SPI's bank is one past paper (2022) and
 * ten practice papers; AFCAT's Numerical Ability is ~97% practice around a few PYQs printed in a
 * book. A past-year count would print "0 PYQs" on most of their pages, so their notes count both
 * kinds and call them "questions". The cards, the drill count and link, and the intro-count gate
 * all read this one rule.
 */
import type { SourceKind } from "@/lib/questions/sourceTag";
import { getExamByName } from "@/lib/exam/examContext";

export type NotesCountKind = "pyq" | "all";

const ALL_KINDS: ReadonlySet<string> = new Set(["SPI", "AFCAT"]);

/**
 * Textbook boards (registry `boardExam`, 2026-11-23) count both kinds too: the book's
 * exercises ARE what a board student practises, and Class 9 and 11 have no past papers at all.
 * A board with past papers only (UP Board) has no textbook rows, so it stays past-year.
 */
export function notesCountKind(examName: string): NotesCountKind {
  if (ALL_KINDS.has(examName)) return "all";
  return getExamByName(examName)?.boardExam === true ? "all" : "pyq";
}

export function notesCountNoun(kind: NotesCountKind): "PYQs" | "questions" {
  return kind === "pyq" ? "PYQs" : "questions";
}

/** The /notes/<exam> hub's chapter-card count: "24 past questions" or, for an all-kinds exam, "542 questions". */
export function notesHubCountLabel(kind: NotesCountKind): "past questions" | "questions" {
  return kind === "pyq" ? "past questions" : "questions";
}

/** The line above a concept's featured question: only a past-paper row is "a real exam question". */
export function featuredLeadIn(kind: SourceKind): string {
  if (kind === "pyq") return "The same idea in a real exam question:";
  return `The same idea in a ${kind === "practice" ? "practice" : "textbook"} question:`;
}

/**
 * The `kind` a notes drill link passes to /browse. /browse filters to past-year rows by default,
 * and that filter applies to an explicit list of ids too, so without this an SPI drill would drop
 * its practice rows. Undefined for PYQ-only exams keeps their URLs byte-identical.
 */
export function notesBrowseKind(kind: NotesCountKind): "all" | undefined {
  return kind === "all" ? "all" : undefined;
}
