"use client";

import Link from "next/link";
import { ArrowRight, Play, Target, TrendingUp } from "lucide-react";
import { trackFunnel } from "@/lib/analytics/trackFunnel";
import type { DayAction, DayCard } from "@/lib/chat/dayCard";
import { useIntlSite } from "@/lib/sites/useIntlSite";
import { progressPathFor } from "@/lib/sites/intl";

/**
 * V's "Your day" card (2026-11-15, lib/chat/dayCard.ts), under V's greeting
 * the first time a student opens V on a new day. The window reads it (GET
 * /api/chat/progress?view=day) and passes it in; this only draws it. One main
 * button: today's plan task, else Fix, else full progress.
 */
export default function VDayCard({ card, onNavigate }: { card: DayCard; onNavigate?: () => void }) {
  // Full progress is /me/map on intl, which serves no /performance (2026-11-19).
  const progressPath = progressPathFor(useIntlSite() ? "intl" : "pyqvault");
  const hrefOf = (a: DayAction) => (a.action === "performance" ? progressPath : a.href);
  function go(a: DayAction) {
    trackFunnel("v_day_tap", { action: a.action });
    onNavigate?.();
  }
  const Icon = card.primary.action === "plan" ? Play : card.primary.action === "drill" ? Target : ArrowRight;

  return (
    <section className="ml-9 mt-2 rounded-xl border bg-card p-3 text-sm shadow-sm" aria-label={card.title}>
      <div className="mb-2 flex items-start gap-2">
        <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
        <div className="min-w-0">
          <p className="font-semibold">{card.title}</p>
          <p className="text-xs text-muted-foreground">{card.subtitle}</p>
        </div>
      </div>

      <dl className="space-y-2">
        {card.rows.map((r) => (
          <div
            key={r.label}
            className={`rounded-lg px-2.5 py-1.5 ${r.tone === "today" ? "border border-brand-accent/25 bg-brand-accent/[0.08]" : "bg-muted/40"}`}
          >
            <dt className={`text-xs font-semibold ${r.tone === "today" ? "text-brand-accent" : "text-muted-foreground"}`}>{r.label}</dt>
            <dd className={`font-medium ${r.tone === "good" ? "text-emerald-700 dark:text-emerald-400" : ""}`}>{r.value}</dd>
            {r.detail && <dd className="mt-0.5 text-xs text-muted-foreground">{r.detail}</dd>}
          </div>
        ))}
      </dl>

      <div className="mt-3 flex flex-wrap gap-2">
        <Link
          href={hrefOf(card.primary)}
          onClick={() => go(card.primary)}
          className="inline-flex items-center gap-1 rounded-full bg-brand px-3.5 py-1.5 text-xs font-semibold text-brand-foreground shadow-sm transition-colors hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Icon className="h-3.5 w-3.5" aria-hidden />
          {card.primary.label}
        </Link>
        {card.secondary && (
          <Link
            href={hrefOf(card.secondary)}
            onClick={() => go(card.secondary!)}
            className="inline-flex items-center gap-1 rounded-full border border-brand-accent/25 bg-brand-accent/[0.06] px-3.5 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-brand-accent/45 hover:bg-brand-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {card.secondary.label}
            {card.secondary.action === "performance" && <ArrowRight className="h-3.5 w-3.5" aria-hidden />}
          </Link>
        )}
      </div>
    </section>
  );
}
