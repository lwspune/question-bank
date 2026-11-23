import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Your progress",
  robots: { index: false },
};

/**
 * The Progress tab's address: Papers (/performance). Kept for the avatar
 * menu's "Your progress" and old links. From 2026-11-08 it sent a student
 * with no marked paper to the map instead; since the map got its own tab
 * (2026-11-23) that would light up Map when they tapped Progress, so it
 * always opens Papers, whose own empty state offers a first test. The
 * sign-in check is /performance's own.
 */
export default function ProgressPage() {
  redirect("/performance");
}
