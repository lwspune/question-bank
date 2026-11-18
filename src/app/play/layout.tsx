import type { ReactNode } from "react";
import { Baloo_2 } from "next/font/google";
import "./arcade.css";

/**
 * /play's own look (2026-11-18): a dark game theme and a rounded display face,
 * so the games read as games and not as the study app (owner, 2026-11-17:
 * "current games look like exam"). Scoped to /play by this layout; the rest of
 * the site never loads the font or the stylesheet.
 */
const display = Baloo_2({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-arcade", display: "swap" });

export default function PlayLayout({ children }: { children: ReactNode }) {
  return <div className={display.variable}>{children}</div>;
}
