import type { Metadata } from "next";
import { Map as MapIcon, Radar, ArrowRight } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import StatBlock from "@/app/guide/_components/StatBlock";
import PrevNextNav from "@/app/guide/_components/PrevNextNav";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import BrowseLink from "@/app/guide/_components/BrowseLink";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { resolveTaxonomy } from "@/lib/guide/resolveTaxonomy";
import { ROUTES } from "../_data/nda-physics";
import {
  NCERT_MAP,
  UNMAPPED_NCERT,
  signalStatus,
  SIGNAL_SNAPSHOT,
  type NcertRef,
  type SignalStatus,
} from "../_data/ncert-map";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "NCERT → NDA Physics chapter map — which NCERT chapter is which",
  description:
    "Map every NCERT Class 9–12 physics chapter to the NDA Physics chapter that tests it, with a one-click drill into the question bank. Plus a Class-12 watch-list — topics that would signal a syllabus drift early.",
  alternates: { canonical: "/guide/nda-physics/ncert-map" },
};

const sideNav = ROUTES.map((r) => ({
  href: r.slug ? `/guide/nda-physics/${r.slug}` : "/guide/nda-physics",
  label: r.label,
}));

const allRefs = NCERT_MAP.flatMap((r) => r.ncert);
const NCERT_COUNT = allRefs.length;
const WATCHLIST_COUNT = allRefs.filter(
  (r) => r.signal && signalStatus(r.signal) !== "live"
).length;

const CLASS_TINT: Record<number, string> = {
  9: "bg-sky-50 text-sky-700 ring-sky-200 dark:bg-sky-950/40 dark:text-sky-300 dark:ring-sky-900",
  10: "bg-violet-50 text-violet-700 ring-violet-200 dark:bg-violet-950/40 dark:text-violet-300 dark:ring-violet-900",
  11: "bg-indigo-50 text-indigo-700 ring-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:ring-indigo-900",
  12: "bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-200 dark:bg-fuchsia-950/40 dark:text-fuchsia-300 dark:ring-fuchsia-900",
};

const STATUS_META: Record<
  SignalStatus,
  { label: (ref: NcertRef) => string; cls: string }
> = {
  live: {
    label: (r) => `active · last ${r.signal!.lastSeen}`,
    cls: "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:ring-emerald-900",
  },
  watch: {
    label: (r) => `watch · last seen ${r.signal!.lastSeen}`,
    cls: "bg-amber-50 text-amber-800 ring-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:ring-amber-900",
  },
  dormant: {
    label: () => "dormant · not yet seen",
    cls: "bg-muted text-muted-foreground ring-border",
  },
};

function NcertChip({ item: r }: { item: NcertRef }) {
  const status = r.signal ? signalStatus(r.signal) : null;
  return (
    <span className="inline-flex flex-wrap items-center gap-1.5">
      <span
        className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${CLASS_TINT[r.cls]}`}
      >
        <span className="font-semibold tabular-nums">Cl {r.cls}</span>
        <span className="font-serif">{r.name}</span>
      </span>
      {status && (
        <span
          className={`rounded px-1.5 py-0.5 text-[11px] font-medium ring-1 ring-inset ${STATUS_META[status].cls}`}
        >
          {STATUS_META[status].label(r)}
        </span>
      )}
    </span>
  );
}

export default async function NcertMapPage() {
  const supabase = createSupabaseAnonClient();
  const taxonomy = await resolveTaxonomy(supabase, "NDA", "Physics");

  const stats = [
    { value: String(NCERT_MAP.length), label: "NDA Physics chapters" },
    { value: String(NCERT_COUNT), label: "NCERT chapters mapped" },
    { value: "9–12", label: "NCERT classes spanned" },
    { value: String(WATCHLIST_COUNT), label: "Class-12 watch-list topics" },
  ];

  return (
    <GuideShell
      guideTitle="NDA Physics Guide"
      sideNav={sideNav}
      landingHref="/guide/nda-physics"
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: "/guide/nda", label: "NDA" },
        { href: "/guide/nda-physics", label: "NDA Physics" },
        { label: "NCERT Map" },
      ]}
    >
      <GuideJsonLd
        type="Article"
        path="/guide/nda-physics/ncert-map"
        headline="NCERT → NDA Physics chapter map"
        description="Every NCERT Class 9–12 physics chapter mapped to the NDA Physics chapter that tests it, with a Class-12 watch-list for early syllabus-drift signals."
      />
      <GuideHero
        eyebrow="NCERT Map"
        title="Which NCERT chapter is which NDA chapter"
        subtitle="NDA's 14 physics chapters are broad, exam-shaped buckets — each absorbs several narrower NCERT chapters across Classes 9 to 12. Find your NCERT chapter here, then drill its questions in the bank."
      >
        <StatBlock stats={stats} />
      </GuideHero>

      {/* How to read this page */}
      <section className="mt-10 rounded-lg border-l-4 border-primary bg-primary/5 p-5">
        <h2 className="flex items-center gap-2 text-base font-semibold tracking-tight">
          <MapIcon className="h-4 w-4 text-primary" aria-hidden />
          How to read this map
        </h2>
        <ul className="mt-3 space-y-2 font-serif text-sm leading-relaxed text-foreground/90">
          <li className="flex gap-2">
            <span
              aria-hidden
              className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/60"
            />
            <span>
              Each row is one <strong>NDA chapter</strong> and the{" "}
              <strong>NCERT chapters</strong> it covers. A{" "}
              <span className="font-semibold">Cl 9–12</span> badge tells you
              which class the topic is taught in. Most NDA chapters bundle 2–5
              NCERT chapters — that bundling is deliberate, not a defect.
            </span>
          </li>
          <li className="flex gap-2">
            <span
              aria-hidden
              className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/60"
            />
            <span>
              <strong>No NDA chapter name matches NCERT exactly</strong> except
              Gravitation, Sound, and Work-Energy-Power — so searching the bank
              by NCERT title won&rsquo;t find anything. This page is the
              translation layer. Use the drill button on each row.
            </span>
          </li>
        </ul>
      </section>

      {/* Watch-list legend */}
      <section className="mt-6 rounded-lg border border-amber-200 bg-amber-50/50 p-5 dark:border-amber-900 dark:bg-amber-950/20">
        <h2 className="flex items-center gap-2 text-base font-semibold tracking-tight">
          <Radar className="h-4 w-4 text-amber-700 dark:text-amber-400" aria-hidden />
          The Class-12 watch-list — an early-warning instrument
        </h2>
        <p className="mt-2 font-serif text-sm leading-relaxed text-foreground/90">
          A large slice of NDA Physics already maps to NCERT{" "}
          <strong>Class 12</strong> (Ray &amp; Wave Optics, Current Electricity,
          EMI, AC, all of Modern Physics). If a Class-12 topic that&rsquo;s been
          quiet starts recurring in recent papers, that&rsquo;s a leading signal
          of a syllabus shift — and a cue to build notes/practice for it. So
          every tracked Class-12 topic carries its bank recency:
        </p>
        <ul className="mt-3 flex flex-wrap gap-2 text-[11px] font-medium">
          <li className={`rounded px-2 py-1 ring-1 ring-inset ${STATUS_META.live.cls}`}>
            active — seen in a recent paper
          </li>
          <li className={`rounded px-2 py-1 ring-1 ring-inset ${STATUS_META.watch.cls}`}>
            watch — tested before, now cold
          </li>
          <li className={`rounded px-2 py-1 ring-1 ring-inset ${STATUS_META.dormant.cls}`}>
            dormant — mapped, never yet seen
          </li>
        </ul>
        <p className="mt-3 font-serif text-xs leading-relaxed text-muted-foreground">
          We don&rsquo;t pre-write content for dormant topics — chasing a signal
          that isn&rsquo;t there is as wrong as ignoring one that is. The map is
          the detector; content follows when a topic goes active. Recency
          snapshot: {SIGNAL_SNAPSHOT} from the live PYQ bank.
        </p>
      </section>

      {/* The map */}
      <section className="mt-8 space-y-3">
        {NCERT_MAP.map((row) => {
          const chap = taxonomy.chapters.get(row.ndaChapter);
          const hasNcert = row.ncert.length > 0;
          return (
            <div
              key={row.ndaChapter}
              className="rounded-lg border bg-card p-5"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-semibold tracking-tight text-foreground">
                    {row.ndaChapter}
                  </h3>
                  {hasNcert ? (
                    <div className="mt-3 flex flex-col gap-2">
                      {row.ncert.map((r) => (
                        <NcertChip key={r.name} item={r} />
                      ))}
                    </div>
                  ) : (
                    <p className="mt-2 font-serif text-sm italic text-muted-foreground">
                      No NCERT 9–12 chapter — NDA-syllabus-specific.
                    </p>
                  )}
                  {row.note && (
                    <p className="mt-3 font-serif text-xs leading-relaxed text-muted-foreground">
                      {row.note}
                    </p>
                  )}
                </div>
                {chap && (
                  <div className="shrink-0">
                    <BrowseLink
                      examId={taxonomy.examId}
                      subjectId={taxonomy.subjectId}
                      chapterIds={[chap.id]}
                      variant="outline"
                    >
                      Drill in bank
                    </BrowseLink>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </section>

      {/* Reverse gap — NCERT chapters with no NDA home */}
      {UNMAPPED_NCERT.length > 0 && (
        <section className="mt-10 rounded-md border bg-muted/30 p-5">
          <h2 className="text-base font-semibold tracking-tight">
            NCERT chapters NDA barely tests
          </h2>
          <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
            The map runs both ways. These NCERT chapters have effectively no NDA
            home — listed so you don&rsquo;t over-invest in them for this exam.
          </p>
          <ul className="mt-3 space-y-2">
            {UNMAPPED_NCERT.map((u) => (
              <li key={u.name} className="flex gap-2 text-sm">
                <ArrowRight
                  className="mt-1 h-3.5 w-3.5 shrink-0 text-muted-foreground"
                  aria-hidden
                />
                <span className="font-serif text-foreground/90">
                  <span
                    className={`mr-2 rounded px-1.5 py-0.5 text-[11px] font-medium ring-1 ring-inset ${CLASS_TINT[u.cls]}`}
                  >
                    Cl {u.cls}
                  </span>
                  <strong className="font-semibold">{u.name}</strong> — {u.note}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <PrevNextNav
        prev={{ href: "/guide/nda-physics/traps", label: "Traps" }}
        next={{ href: "/guide/nda-physics", label: "Back to Overview" }}
      />
    </GuideShell>
  );
}
