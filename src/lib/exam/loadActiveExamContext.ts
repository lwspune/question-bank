import { cookies } from "next/headers";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import {
  DEFAULT_EXAM_SLUG,
  EXAM_REGISTRY,
  getExamBySlug,
  isExamSlug,
  resolveBankHref,
  resolveGuidesHref,
  resolveNotesHref,
  resolveBoardHref,
  isBoardExam,
  type ExamSlug,
} from "./examContext";

const COOKIE_NAME = "qb_exam";

export type ActiveExamContext = {
  /** The slug currently driving nav routing. Always one of EXAM_REGISTRY. */
  slug: ExamSlug;
  /** The DB UUID for this exam, or null if the exam isn't seeded yet. */
  examId: string | null;
  /** Pre-computed nav destinations for the active exam. */
  bankHref: string;
  guidesHref: string;
  notesHref: string;
  boardHref: string;
  /** True when the active exam is a school board — surfaces the "Board" tab. */
  showBoard: boolean;
};

/**
 * Server-only — reads the `qb:exam` cookie, validates it against the
 * registry, falls back to the default, then resolves the exam UUID against
 * the live `exams` table. Used by `AppHeader` to feed `PrimaryNav` props.
 *
 * Uses the cookie-free anon client so this helper itself doesn't force
 * dynamic rendering on pages that would otherwise be static (the cookie
 * read does — but the header is already part of every page).
 */
export async function loadActiveExamContext(): Promise<ActiveExamContext> {
  const cookieStore = cookies();
  const raw = cookieStore.get(COOKIE_NAME)?.value;
  const slug: ExamSlug = isExamSlug(raw) ? raw : DEFAULT_EXAM_SLUG;
  const entry = getExamBySlug(slug);

  let examId: string | null = null;
  if (entry) {
    try {
      const supabase = createSupabaseAnonClient();
      const { data } = await supabase
        .from("exams")
        .select("id")
        .eq("name", entry.examName)
        .maybeSingle();
      examId = data?.id ?? null;
    } catch {
      // Network/RLS failure shouldn't break the header. Bank tab silently
      // falls back to /browse (no examId filter).
      examId = null;
    }
  }

  return {
    slug,
    examId,
    bankHref: resolveBankHref(examId),
    guidesHref: resolveGuidesHref(slug),
    notesHref: resolveNotesHref(slug),
    boardHref: resolveBoardHref(slug),
    showBoard: isBoardExam(slug),
  };
}

export { EXAM_REGISTRY };
