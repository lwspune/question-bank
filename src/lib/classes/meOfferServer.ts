/**
 * What /me's class card needs for one student (migrations 0282, 0285): which
 * offer to show (lib/classes/meOffer.ts pickClassOffer), what to fill in on a Yes, and
 * where Know more goes.
 *
 * Read with the service role, filtered on the user id: class_offer_answers and
 * class_interest have no policies (names and phone numbers). Shared by the
 * student's own /me and the staff view, like the rest of lib/me/load.ts.
 */
import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getEvergreenArticle } from "@/lib/blog/articles";
import { getExamBySlug } from "@/lib/exam/examContext";
import { isClassOffer, knowMoreExamFor, offerForExam, pickClassOffer, type ClassOffer } from "./meOffer";

export type ClassOfferCardData = {
  offer: ClassOffer;
  /** The 10-digit mobile on the account, to fill in, or null. */
  mobile: string | null;
  city: string | null;
  /** The exam's pattern-and-syllabus page, or null while none is published. */
  knowMoreHref: string | null;
  /** That exam's short name, for "Know more about ...". */
  knowMoreLabel: string;
};

export async function loadClassOffer(
  userId: string,
  targets: readonly string[],
  mainExam: string | null
): Promise<ClassOfferCardData | null> {
  // Most students fit no offer: no reads for them.
  if (![mainExam, ...targets].some((t) => t && offerForExam(t))) return null;
  const admin = createSupabaseAdminClient();
  const [profile, answers, leads] = await Promise.all([
    admin.from("student_profiles").select("user_role, mobile, city").eq("user_id", userId).maybeSingle(),
    admin.from("class_offer_answers").select("offer, answer").eq("user_id", userId).not("answer", "is", null),
    admin.from("class_interest").select("id", { count: "exact", head: true }).eq("user_id", userId),
  ]);
  for (const r of [profile, answers, leads]) if (r.error) throw new Error(r.error.message);

  const p = profile.data as { user_role: string | null; mobile: string | null; city: string | null } | null;
  const answered = new Set<ClassOffer>();
  for (const a of (answers.data ?? []) as { offer: string; answer: string | null }[]) {
    if (a.answer && isClassOffer(a.offer)) answered.add(a.offer);
  }

  const pick = pickClassOffer({
    mainExam,
    targets,
    role: p?.user_role ?? null,
    answered,
    hasLead: (leads.count ?? 0) > 0,
  });
  if (!pick) return null;

  const examSlug = knowMoreExamFor(pick.offer, pick.examSlug);
  // Best effort: without the article the card simply has no Know more.
  const article = await getEvergreenArticle(examSlug).catch(() => null);
  return {
    offer: pick.offer,
    mobile: p?.mobile?.match(/^91(\d{10})$/)?.[1] ?? null,
    city: p?.city ?? null,
    knowMoreHref: article ? `/exams/${examSlug}/syllabus` : null,
    knowMoreLabel: getExamBySlug(examSlug)?.displayName ?? examSlug,
  };
}
