import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Saved questions",
  robots: { index: false },
};

/**
 * The saved list lives on the Review tab since 2026-11-08
 * (/review?list=saved). This address stays because V, the welcome email and
 * old bookmarks link it; a signed-out visitor is sent to sign in from there.
 */
export default async function SavedPage() {
  permanentRedirect("/review?list=saved");
}
