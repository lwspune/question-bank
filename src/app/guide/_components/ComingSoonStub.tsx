import { Construction } from "lucide-react";
import GuideShell from "./GuideShell";
import GuideHero from "./GuideHero";
import PrevNextNav from "./PrevNextNav";
import type { SideNavItem } from "./GuideSideNav";

type Props = {
  guideTitle: string;
  sideNav: SideNavItem[];
  /** "NDA Mathematics" → matches the breadcrumb to the section landing. */
  parentLabel: string;
  parentHref: string;
  pageLabel: string;
  pageTitle: string;
  pageSubtitle: string;
  /** Short pitch describing what this section will cover. */
  comingDescription: string;
  prev: { href: string; label: string };
  next?: { href: string; label: string };
};

/**
 * Stub page used during phased rollout — keeps the side nav working without a
 * 404 and tells the reader what's coming. Real content replaces this in
 * later phases.
 */
export default function ComingSoonStub({
  guideTitle,
  sideNav,
  parentLabel,
  parentHref,
  pageLabel,
  pageTitle,
  pageSubtitle,
  comingDescription,
  prev,
  next,
}: Props) {
  return (
    <GuideShell
      guideTitle={guideTitle}
      sideNav={sideNav}
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: parentHref, label: parentLabel },
        { label: pageLabel },
      ]}
    >
      <GuideHero
        eyebrow={pageLabel}
        title={pageTitle}
        subtitle={pageSubtitle}
      />
      <section className="rounded-lg border-2 border-dashed bg-muted/30 p-6 text-center">
        <Construction
          className="mx-auto h-8 w-8 text-muted-foreground"
          aria-hidden
        />
        <h2 className="mt-3 text-base font-semibold tracking-tight">
          Section in progress
        </h2>
        <p className="mx-auto mt-2 max-w-md font-serif text-sm leading-relaxed text-muted-foreground">
          {comingDescription}
        </p>
      </section>
      <PrevNextNav prev={prev} next={next} />
    </GuideShell>
  );
}
