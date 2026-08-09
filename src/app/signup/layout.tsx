import type { Metadata } from "next";

/**
 * Metadata for /signup. See src/app/login/layout.tsx for the full reasoning —
 * same cause (a "use client" page cannot export `metadata`), same fix.
 *
 * `follow: true` deliberately: the page is not worth indexing, but the links it
 * carries (back to /login, /privacy) should still pass through.
 */
export const metadata: Metadata = {
  title: "Create your account",
  robots: { index: false, follow: true },
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
