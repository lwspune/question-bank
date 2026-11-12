import AppHeader from "@/components/AppHeader";
import Breadcrumbs, { type Crumb } from "@/components/nav/Breadcrumbs";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { GuideSideNavRail, GuideSideNavSheet, type SideNavItem } from "./GuideSideNav";

type Props = {
  guideTitle: string;
  sideNav: SideNavItem[];
  breadcrumbs: Crumb[];
  children: React.ReactNode;
  /** Landing route — passed through to GuideSideNav so the "Overview" link
   *  doesn't activate on every sub-route. Defaults to the first nav item's
   *  href. */
  landingHref?: string;
  /** Optional right-hand rail, shown from `xl` up (the notes topic page's
   *  "On this page"). Pages without one keep the two-column layout. */
  rail?: React.ReactNode;
  /** List pages (2026-11-10): the content uses the full width beside the side
   *  nav, for three cards across. Reading pages leave it off and keep a
   *  comfortable line length. */
  wide?: boolean;
  /** The phone side-nav button's label (default "Sections"). */
  sideNavLabel?: string;
};

/**
 * Page shell for every /guide/* route. AppHeader + breadcrumbs + side nav +
 * content. The side nav renders twice from one list: a Sheet button in the
 * breadcrumb row below `lg`, and a sticky rail from `lg` up.
 */
export default function GuideShell({
  guideTitle,
  sideNav,
  breadcrumbs,
  children,
  landingHref,
  rail,
  wide,
  sideNavLabel,
}: Props) {
  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-7xl px-4 pb-16 pt-4 sm:px-6 sm:pt-8">
        {/* The Sections button shares the breadcrumb row below `lg` (2026-11-10):
            as its own full-width row it pushed every page's content down. */}
        <div className="flex items-center justify-between gap-2">
          <Breadcrumbs items={breadcrumbs} className="min-w-0 flex-1" />
          <GuideSideNavSheet guideTitle={guideTitle} items={sideNav} landingHref={landingHref} sheetLabel={sideNavLabel} />
        </div>
        <div
          className={cn(
            "mt-4 flex flex-col gap-4 sm:mt-6 lg:mt-8 lg:grid lg:grid-cols-[16rem_1fr] lg:gap-10",
            rail && "xl:grid-cols-[14rem_minmax(0,1fr)_12rem] xl:gap-8"
          )}
        >
          <GuideSideNavRail guideTitle={guideTitle} items={sideNav} landingHref={landingHref} />
          <article className={cn("min-w-0", wide ? "max-w-none" : "max-w-3xl")}>{children}</article>
          {rail && <aside className="hidden xl:block">{rail}</aside>}
        </div>
      </main>
      <Footer />
    </>
  );
}
