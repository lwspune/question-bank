import HomeLanding, { HOME_METADATA } from "@/components/home/HomeLanding";

/**
 * The homepage, cached for everyone (2026-11-06). It used to read the session
 * during render to redirect signed-in people, which made every visit a fresh
 * server render (crawlers alone fetched it ~1.4K times a day). Middleware now
 * redirects signed-in visitors and serves a per-exam copy to a signed-out
 * visitor who chose an exam; this file reads nothing about the request.
 * tests/home-tutor-stay-static.test.ts keeps it that way.
 */
export const revalidate = 86400;

export const metadata = HOME_METADATA;

export default function Home() {
  return <HomeLanding chosen={null} />;
}
