import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { progressDestination } from "@/lib/me/progress";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Your progress",
  robots: { index: false },
};

/**
 * The Progress tab's address (2026-11-08): Papers (/performance) for a student
 * with a marked paper, so the projected score is the first thing they see;
 * else Chapters (/me/map), which counts practice too. One head-count read with
 * the student's own login (own-row RLS on mock_attempts); a failed read opens
 * Papers, whose own empty state offers a first test.
 */
export default async function ProgressPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login?next=/progress");

  const { count, error } = await createSupabaseServerClient()
    .from("mock_attempts")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id)
    .in("status", ["submitted", "expired"]);
  if (error) console.error("progress: attempts count failed", error.message);

  redirect(progressDestination(error ? true : (count ?? 0) > 0));
}
