import AppHeader from "@/components/AppHeader";
import Breadcrumbs, { type Crumb } from "@/components/nav/Breadcrumbs";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import GuideSideNav, { type SideNavItem } from "./GuideSideNav";

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
};

/**
 * Page shell for every /guide/* route. AppHeader + breadcrumbs + side nav +
 * content. GuideSideNav self-toggles between a Sheet trigger (mobile) and a
 * sticky aside (desktop) based on the lg breakpoint, so it can be rendered
 * once.
 */
export default function GuideShell({
  guideTitle,
  sideNav,
  breadcrumbs,
  children,
  landingHref,
  rail,
}: Props) {
  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 sm:pt-8">
        <Breadcrumbs items={breadcrumbs} />
        <div
          className={cn(
            "mt-6 flex flex-col gap-4 lg:mt-8 lg:grid lg:grid-cols-[16rem_1fr] lg:gap-10",
            rail && "xl:grid-cols-[14rem_minmax(0,1fr)_12rem] xl:gap-8"
          )}
        >
          <GuideSideNav
            guideTitle={guideTitle}
            items={sideNav}
            landingHref={landingHref}
          />
          <article className="min-w-0 max-w-3xl">{children}</article>
          {rail && <aside className="hidden xl:block">{rail}</aside>}
        </div>
      </main>
      <Footer />
    </>
  );
}
